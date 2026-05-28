import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

export const PortfolioScreen = ({ navigation }: any) => {
  const investments = [
    { id: '1', name: 'Tech Solutions Ltd', amount: 500000, date: '2024-01-15', equity: 15, status: 'active', return: 12.5 },
    { id: '2', name: 'Green Energy Africa', amount: 1250000, date: '2024-02-20', equity: 10, status: 'active', return: 8.2 },
    { id: '3', name: 'AgriFresh', amount: 350000, date: '2024-03-10', equity: 8, status: 'pending', return: 0 },
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const activeInvestments = investments.filter(i => i.status === 'active').length;

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Portfolio</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>M {totalInvested.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Invested</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{activeInvestments}</Text>
          <Text style={styles.statLabel}>Active Deals</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{investments.length}</Text>
          <Text style={styles.statLabel}>Total Deals</Text>
        </View>
      </View>

      <View style={styles.listCard}>
        <Text style={styles.cardTitle}>Investment History</Text>
        {investments.map(inv => (
          <TouchableOpacity key={inv.id} style={styles.investmentItem}>
            <View style={styles.investmentInfo}>
              <Text style={styles.investmentName}>{inv.name}</Text>
              <Text style={styles.investmentDate}>{inv.date}</Text>
            </View>
            <View style={styles.investmentDetails}>
              <Text style={styles.investmentAmount}>M {inv.amount.toLocaleString()}</Text>
              <Text style={styles.investmentEquity}>{inv.equity}% equity</Text>
              {inv.return > 0 && <Text style={styles.investmentReturn}>+{inv.return}% ROI</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xxl },
  backButton: { padding: SPACING.sm, width: 40 },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.white },
  statsCard: { backgroundColor: COLORS.white, margin: SPACING.lg, padding: SPACING.lg, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.md, flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: TYPOGRAPHY.sizes.xxl, fontWeight: 'bold', color: COLORS.primary },
  statLabel: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray600, marginTop: SPACING.xs },
  statDivider: { width: 1, height: 40, backgroundColor: COLORS.gray200 },
  listCard: { backgroundColor: COLORS.white, marginHorizontal: SPACING.lg, marginBottom: SPACING.xxxl, padding: SPACING.lg, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.md },
  cardTitle: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.gray800, marginBottom: SPACING.md },
  investmentItem: { paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.gray100, flexDirection: 'row', justifyContent: 'space-between' },
  investmentInfo: { flex: 1 },
  investmentName: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: '500', color: COLORS.gray800 },
  investmentDate: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray500, marginTop: 2 },
  investmentDetails: { alignItems: 'flex-end' },
  investmentAmount: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold', color: COLORS.success },
  investmentEquity: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray500, marginTop: 2 },
  investmentReturn: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.success, marginTop: 2 },
});