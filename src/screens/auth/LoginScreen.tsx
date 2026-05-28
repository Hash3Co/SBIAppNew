import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../context/AuthenticationContext';
import { SecureInput } from '../../components/common/SecureInput';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';
import { UserRole } from '../../types';
import { showToast } from '../../components/Toast';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('sme');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!isEmailValid || !isPasswordValid) {
      showToast('Please enter valid credentials', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password, role);
      showToast('Login successful!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logo}>SBI App</Text>
          <Text style={styles.tagline}>Welcome Back</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.roleSelector}>
            <TouchableOpacity style={[styles.roleButton, role === 'sme' && styles.roleButtonActive]} onPress={() => setRole('sme')}>
              <Text style={[styles.roleText, role === 'sme' && styles.roleTextActive]}>SME</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.roleButton, role === 'investor' && styles.roleButtonActive]} onPress={() => setRole('investor')}>
              <Text style={[styles.roleText, role === 'investor' && styles.roleTextActive]}>Investor</Text>
            </TouchableOpacity>
          </View>
          <SecureInput label="Email" placeholder="Enter your email" validationType="email" value={email} onChangeText={setEmail} onValidChange={(valid, val) => { setIsEmailValid(valid); setEmail(val); }} keyboardType="email-address" />
          <SecureInput label="Password" placeholder="Enter your password" validationType="password" value={password} onChangeText={setPassword} onValidChange={(valid, val) => { setIsPasswordValid(valid); setPassword(val); }} secureTextEntry />
          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginButton, (!isEmailValid || !isPasswordValid) && styles.loginButtonDisabled]} onPress={handleLogin} disabled={isLoading || !isEmailValid || !isPasswordValid}>
            <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={[styles.gradientButton, (!isEmailValid || !isPasswordValid || isLoading) && styles.gradientDisabled]}>
              <Text style={styles.loginButtonText}>{isLoading ? 'Logging in...' : 'Login'}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.registerLink}>Sign Up</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1, padding: SPACING.xl },
  header: { alignItems: 'center', marginTop: SPACING.xxxl, marginBottom: SPACING.xxxl },
  logo: { fontSize: TYPOGRAPHY.sizes.huge, fontWeight: 'bold', color: COLORS.primary, marginBottom: SPACING.sm },
  tagline: { fontSize: TYPOGRAPHY.sizes.lg, color: COLORS.gray600 },
  form: { flex: 1 },
  roleSelector: { flexDirection: 'row', backgroundColor: COLORS.gray100, borderRadius: BORDER_RADIUS.lg, padding: SPACING.xs, marginBottom: SPACING.xl },
  roleButton: { flex: 1, paddingVertical: SPACING.md, alignItems: 'center', borderRadius: BORDER_RADIUS.md },
  roleButtonActive: { backgroundColor: COLORS.white, ...Platform.select({ ios: { shadowColor: COLORS.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }, android: { elevation: 2 } }) },
  roleText: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray600, fontWeight: '500' },
  roleTextActive: { color: COLORS.primary, fontWeight: 'bold' },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: SPACING.xl },
  forgotPasswordText: { color: COLORS.primary, fontSize: TYPOGRAPHY.sizes.sm },
  loginButton: { marginBottom: SPACING.xl },
  loginButtonDisabled: { opacity: 0.6 },
  gradientButton: { paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg, alignItems: 'center' },
  gradientDisabled: { opacity: 0.5 },
  loginButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold' },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: SPACING.lg },
  registerText: { color: COLORS.gray600 },
  registerLink: { color: COLORS.primary, fontWeight: 'bold' },
});