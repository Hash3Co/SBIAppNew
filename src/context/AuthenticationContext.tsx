import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { secureStorage } from '../services/storage/secureStorage';
import { SecurityUtils } from '../utils/securityUtils';
import { apiClient } from '../services/api/client';
import { User, UserRole } from '../types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  verifySession: () => Promise<boolean>;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  businessName?: string;
}

const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) throw new Error('useAuth must be used within AuthenticationProvider');
  return context;
};

export const AuthenticationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await secureStorage.getToken();
      const savedUser = await secureStorage.getUserData<User>('user');
      const deviceFingerprint = await SecurityUtils.getDeviceFingerprint();
      const hashedFingerprint = await SecurityUtils.hashData(deviceFingerprint);
      const fingerprintValid = await secureStorage.verifySessionFingerprint(hashedFingerprint);

      if (token && savedUser && fingerprintValid) {
        setUser(savedUser);
        await secureStorage.setLastActivity();
      } else if (token || savedUser) {
        // Clean up partial session data
        await secureStorage.clearAll();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      await secureStorage.clearAll();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, role: UserRole) => {
    if (!SecurityUtils.validateEmail(email)) throw new Error('Invalid email format');
    const passwordCheck = SecurityUtils.validatePassword(password);
    if (!passwordCheck.valid) throw new Error(passwordCheck.message);

    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/login/', {
        email: SecurityUtils.sanitizeInput(email),
        password,
        role,
      });

      if (!response.data || !response.data.access) {
        throw new Error('Invalid login response');
      }

      const user: User = response.data.user || {
        id: response.data.user_id || uuidv4(),
        email: SecurityUtils.sanitizeInput(email),
        role,
        fullName: response.data.full_name || `${role} User`,
        isVerified: response.data.is_verified || false,
        createdAt: response.data.created_at || new Date().toISOString(),
        updatedAt: response.data.updated_at || new Date().toISOString(),
      };

      await secureStorage.setToken(response.data.access);
      await secureStorage.setUserData('user', user);
      const fingerprint = await SecurityUtils.getDeviceFingerprint();
      await secureStorage.setSessionFingerprint(await SecurityUtils.hashData(fingerprint));
      await secureStorage.setLastActivity();

      setUser(user);
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'Unable to login. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    if (!SecurityUtils.validateEmail(userData.email)) throw new Error('Invalid email format');
    const passwordCheck = SecurityUtils.validatePassword(userData.password);
    if (!passwordCheck.valid) throw new Error(passwordCheck.message);
    if (!userData.fullName || userData.fullName.length < 2) throw new Error('Full name required');
    if (userData.role === 'sme' && (!userData.businessName || userData.businessName.length < 2)) throw new Error('Business name required');
    if (SecurityUtils.hasSQLInjectionPattern(userData.fullName) || SecurityUtils.hasXSSPattern(userData.fullName)) throw new Error('Invalid characters');

    setIsLoading(true);
    try {
      const payload: any = {
        email: SecurityUtils.sanitizeInput(userData.email),
        password: userData.password,
        full_name: SecurityUtils.sanitizeInput(userData.fullName),
        role: userData.role,
      };

      if (userData.businessName) {
        payload.business_name = SecurityUtils.sanitizeInput(userData.businessName);
      }

      const response = await apiClient.post('/auth/register/', payload);

      if (!response.data || !response.data.access) {
        throw new Error('Invalid registration response');
      }

      const newUser: User = response.data.user || {
        id: response.data.user_id || uuidv4(),
        email: SecurityUtils.sanitizeInput(userData.email),
        role: userData.role,
        fullName: SecurityUtils.sanitizeInput(userData.fullName),
        isVerified: response.data.is_verified || false,
        createdAt: response.data.created_at || new Date().toISOString(),
        updatedAt: response.data.updated_at || new Date().toISOString(),
      };

      await secureStorage.setToken(response.data.access);
      await secureStorage.setUserData('user', newUser);
      const fingerprint = await SecurityUtils.getDeviceFingerprint();
      await secureStorage.setSessionFingerprint(await SecurityUtils.hashData(fingerprint));
      await secureStorage.setLastActivity();

      setUser(newUser);
    } catch (error) {
      Alert.alert('Registration Failed', error instanceof Error ? error.message : 'Unable to register. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await secureStorage.clearAll();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const verifySession = async (): Promise<boolean> => {
    try {
      const token = await secureStorage.getToken();
      const lastActivity = await secureStorage.getLastActivity();

      if (!token) {
        await logout();
        return false;
      }

      if (!lastActivity) {
        return true;
      }

      const inactiveTime = Date.now() - lastActivity;
      if (inactiveTime > 15 * 60 * 1000) {
        await logout();
        return false;
      }

      await secureStorage.setLastActivity();
      return true;
    } catch (error) {
      console.error('Session verification failed:', error);
      await logout();
      return false;
    }
  };

  return (
    <AuthenticationContext.Provider value={{ user, isLoading, login, register, logout, verifySession }}>
      {children}
    </AuthenticationContext.Provider>
  );
};