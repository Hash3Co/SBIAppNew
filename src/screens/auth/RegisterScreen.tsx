import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../context/AuthenticationContext';
import { SecureInput } from '../../components/common/SecureInput';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';
import { UserRole } from '../../types';
import { showToast } from '../../components/Toast';

export const RegisterScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('sme');
  const [businessName, setBusinessName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmValid, setIsConfirmValid] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!fullName || !isEmailValid || !isPasswordValid || !isConfirmValid) {
      showToast('Please fill in all fields correctly', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (role === 'sme' && !businessName) {
      showToast('Please enter your business name', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await register({ email, password, fullName, role, businessName });
      showToast('Registration successful!', 'success');
    } catch (error: any) {
      showToast(error.message || 'Registration failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const checkConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    setIsConfirmValid(text === password && text.length > 0);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}><Text style={styles.logo}>SBI App</Text><Text style={styles.tagline}>Create Account</Text></View>
        <View style={styles.form}>
          <View style={styles.roleSelector}>
            <TouchableOpacity style={[styles.roleButton, role === 'sme' && styles.roleButtonActive]} onPress={() => setRole('sme')}>
              <Text style={[styles.roleText, role === 'sme' && styles.roleTextActive]}>SME</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.roleButton, role === 'investor' && styles.roleButtonActive]} onPress={() => setRole('investor')}>
              <Text style={[styles.roleText, role === 'investor' && styles.roleTextActive]}>Investor</Text>
            </TouchableOpacity>
          </View>
          <SecureInput label="Full Name" placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />
          <SecureInput label="Email" placeholder="Enter your email" validationType="email" value={email} onChangeText={setEmail} onValidChange={(valid, val) => { setIsEmailValid(valid); setEmail(val); }} keyboardType="email-address" />
          {role === 'sme' && <SecureInput label="Business Name" placeholder="Enter your business name" value={businessName} onChangeText={setBusinessName} />}
          <SecureInput label="Password" placeholder="Create a password" validationType="password" value={password} onChangeText={setPassword} onValidChange={(valid, val) => { setIsPasswordValid(valid); setPassword(val); if (confirmPassword) setIsConfirmValid(val === confirmPassword); }} secureTextEntry />
          <SecureInput label="Confirm Password" placeholder="Confirm your password" value={confirmPassword} onChangeText={checkConfirmPassword} secureTextEntry />
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
            <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.gradientButton}>
              <Text style={styles.registerButtonText}>{isLoading ? 'Creating Account...' : 'Sign Up'}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.loginLink}>Login</Text></TouchableOpacity>
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
  registerButton: { marginTop: SPACING.lg, marginBottom: SPACING.xl },
  gradientButton: { paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg, alignItems: 'center' },
  registerButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold' },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: SPACING.lg, marginBottom: SPACING.xxxl },
  loginText: { color: COLORS.gray600 },
  loginLink: { color: COLORS.primary, fontWeight: 'bold' },
});