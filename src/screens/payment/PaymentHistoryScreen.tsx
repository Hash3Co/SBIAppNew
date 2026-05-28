import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

export const PaymentHistoryScreen = ({ navigation }: any) => {
  const transactions = [
    { id: '1', date: '2024-01-15', amount: 500, description: 'Pro SME Subscription', status: 'completed', type: 'subscription' },
    { id: '2', date: '2024-01-10', amount: 250, description: 'Basic SME Subscription', status: 'completed', type: 'subscription' },
    { id: '3', date: '2023-12-20', amount: 0, description: 'Free Trial - Basic SME', status: 'completed', type: 'trial' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return COLORS.success;
      case 'pending': return COLORS.warning;
      case 'failed': return COLORS.error;
      default: return COLORS.gray500;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment History</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Spent</Text>
            <Text style={styles.summaryValue}>M 750</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Active Since</Text>
            <Text style={styles.summaryValue}>Jan 2024</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Transaction History</Text>
        
        {transactions.map(transaction => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionIcon}>
              <Icon name={transaction.type === 'subscription' ? 'credit-card' : 'history'} size={24} color={COLORS.primary} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDescription}>{transaction.description}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <View style={styles.transactionRight}>
              <Text style={styles.transactionAmount}>M {transaction.amount}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>{transaction.status}</Text>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.downloadButton}>
          <LinearGradient colors={[COLORS.gray100, COLORS.gray200]} style={styles.downloadGradient}>
            <Icon name="download" size={20} color={COLORS.primary} />
            <Text style={styles.downloadText}>Download Statement</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xxl },
  backButton: { padding: SPACING.sm, width: 40 },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.white },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  summaryCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.lg, ...SHADOWS.md },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryLabel: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray500 },
  summaryValue: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.primary, marginTop: SPACING.xs },
  summaryDivider: { width: 1, height: 40, backgroundColor: COLORS.gray200 },
  sectionTitle: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.gray800, marginBottom: SPACING.md },
  transactionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOWS.sm, gap: SPACING.md },
  transactionIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primary + '10', justifyContent: 'center', alignItems: 'center' },
  transactionInfo: { flex: 1 },
  transactionDescription: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: '500', color: COLORS.gray800 },
  transactionDate: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray500, marginTop: 2 },
  transactionRight: { alignItems: 'flex-end' },
  transactionAmount: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold', color: COLORS.gray800 },
  statusBadge: { paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: BORDER_RADIUS.round, marginTop: 4 },
  statusText: { fontSize: 10, fontWeight: '500' },
  downloadButton: { marginTop: SPACING.lg },
  downloadGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg },
  downloadText: { color: COLORS.primary, fontSize: TYPOGRAPHY.sizes.md, fontWeight: '500' },
});