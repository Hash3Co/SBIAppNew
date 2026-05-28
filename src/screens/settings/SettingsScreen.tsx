import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useAuth } from '../../context/AuthenticationContext';
import { useTheme } from '../../context/ThemeContext';
import { showToast } from '../../components/Toast';

export const SettingsScreen = ({ navigation }: any) => {
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [biometric, setBiometric] = React.useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: async () => {
        await logout();
        showToast('Logged out successfully', 'success');
      }},
    ]);
  };

  const settingsSections = [
    { title: 'Preferences', items: [
      { icon: 'dark-mode', label: 'Dark Mode', type: 'switch', value: isDark, onValueChange: toggleTheme },
      { icon: 'notifications', label: 'Push Notifications', type: 'switch', value: notifications, onValueChange: setNotifications },
      { icon: 'fingerprint', label: 'Biometric Login', type: 'switch', value: biometric, onValueChange: setBiometric },
    ]},
    { title: 'Account', items: [
      { icon: 'person', label: 'Profile Information', type: 'link', onPress: () => navigation.navigate(user?.role === 'sme' ? 'SMEProfile' : 'InvestorProfile') },
      { icon: 'credit-card', label: 'Payment Methods', type: 'link', onPress: () => navigation.navigate('PaymentMethod') },
      { icon: 'history', label: 'Transaction History', type: 'link', onPress: () => navigation.navigate('PaymentHistory') },
      { icon: 'subscriptions', label: 'Subscription', type: 'link', onPress: () => navigation.navigate('Subscription') },
    ]},
    { title: 'Support', items: [
      { icon: 'help', label: 'Help Center', type: 'link', onPress: () => {} },
      { icon: 'privacy-tip', label: 'Privacy Policy', type: 'link', onPress: () => {} },
      { icon: 'description', label: 'Terms of Service', type: 'link', onPress: () => {} },
      { icon: 'mail', label: 'Contact Support', type: 'link', onPress: () => {} },
    ]},
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.fullName?.charAt(0) || 'U'}</Text>
        </View>
        <Text style={styles.userName}>{user?.fullName}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      {settingsSections.map(section => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionCard}>
            {section.items.map((item, idx) => (
              <TouchableOpacity key={idx} style={[styles.settingItem, idx === section.items.length - 1 && styles.lastItem]} onPress={item.type === 'link' ? item.onPress : undefined}>
                <View style={styles.settingLeft}><Icon name={item.icon} size={22} color={COLORS.primary} /><Text style={styles.settingLabel}>{item.label}</Text></View>
                {item.type === 'switch' ? <Switch value={item.value} onValueChange={item.onValueChange} trackColor={{ false: COLORS.gray300, true: COLORS.primary }} /> : <Icon name="chevron-right" size={20} color={COLORS.gray400} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LinearGradient colors={[COLORS.error, COLORS.error]} style={styles.logoutGradient}>
          <Icon name="logout" size={20} color={COLORS.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xxl },
  backButton: { padding: SPACING.sm, width: 40 },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.white },
  profileSection: { alignItems: 'center', marginTop: -SPACING.xxxl, marginBottom: SPACING.xl },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', ...SHADOWS.lg },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: COLORS.primary },
  userName: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.gray800, marginTop: SPACING.md },
  userEmail: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray500, marginTop: 2 },
  section: { marginBottom: SPACING.lg, paddingHorizontal: SPACING.lg },
  sectionTitle: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: '600', color: COLORS.gray500, marginBottom: SPACING.sm, textTransform: 'uppercase' },
  sectionCard: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, overflow: 'hidden', ...SHADOWS.sm },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  lastItem: { borderBottomWidth: 0 },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  settingLabel: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray800 },
  logoutButton: { marginHorizontal: SPACING.lg, marginTop: SPACING.md, marginBottom: SPACING.md },
  logoutGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg },
  logoutText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold' },
  versionText: { textAlign: 'center', fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray400, marginBottom: SPACING.xxxl },
});