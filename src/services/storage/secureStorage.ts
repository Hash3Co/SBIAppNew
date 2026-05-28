import * as Keychain from 'react-native-keychain';
import EncryptedStorage from 'react-native-encrypted-storage';

export class SecureStorage {
  private static instance: SecureStorage;
  
  static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  // Store JWT token with biometric protection
  async setToken(token: string): Promise<void> {
    if (!token || token.length < 10) throw new Error('Invalid token');
    
    await Keychain.setGenericPassword('auth_token', token, {
      service: 'com.sbiapp.auth',
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  }

  async getToken(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({ 
        service: 'com.sbiapp.auth' 
      });
      return credentials ? credentials.password : null;
    } catch {
      return null;
    }
  }

  // Store user data encrypted
  async setUserData<T>(key: string, data: T): Promise<void> {
    if (!key) throw new Error('Storage key required');
    
    const encrypted = JSON.stringify(data);
    await EncryptedStorage.setItem(`user_${key}`, encrypted);
  }

  async getUserData<T>(key: string): Promise<T | null> {
    try {
      const data = await EncryptedStorage.getItem(`user_${key}`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  // Store session fingerprint
  async setSessionFingerprint(fingerprint: string): Promise<void> {
    await EncryptedStorage.setItem('session_fingerprint', fingerprint);
  }

  async verifySessionFingerprint(fingerprint: string): Promise<boolean> {
    const stored = await EncryptedStorage.getItem('session_fingerprint');
    return stored === fingerprint;
  }

  // Clear all secure data
  async clearAll(): Promise<void> {
    await Keychain.resetGenericPassword({ service: 'com.sbiapp.auth' });
    await EncryptedStorage.clear();
  }

  // Store last activity timestamp
  async setLastActivity(): Promise<void> {
    await EncryptedStorage.setItem('last_activity', Date.now().toString());
  }

  async getLastActivity(): Promise<number> {
    const timestamp = await EncryptedStorage.getItem('last_activity');
    return timestamp ? parseInt(timestamp, 10) : Date.now();
  }
}

export const secureStorage = SecureStorage.getInstance();