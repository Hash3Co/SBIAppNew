import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthenticationContext';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

export const InvestorDashboard = ({ navigation }: any) => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [matches] = useState([
    { id: '1', name: 'Tech Solutions Ltd', industry: 'Technology', matchScore: 92, impact: 'High' },
    { id: '2', name: 'Green Energy Africa', industry: 'Energy', matchScore: 88, impact: 'Very High' },
    { id: '3', name: 'AgriFresh', industry: 'Agriculture', matchScore: 85, impact: 'Medium' },
  ]);

  const impactMetrics = [
    { title: 'Jobs Created', value: '1,247', change: '+12.5%', icon: 'work', color: COLORS.success },
    { title: 'SMEs Supported', value: '89', change: '+8.3%', icon: 'store', color: COLORS.primary },
    { title: 'CO₂ Reduced', value: '3,452', change: '+23.1%', icon: 'eco', color: COLORS.info },
    { title: 'Women-Led', value: '34', change: '+15.2%', icon: 'female', color: COLORS.secondary },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.fullName || 'Investor'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="notifications-none" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.metricsGrid}>
        {impactMetrics.map(metric => (
          <View key={metric.title} style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
              <Icon name={metric.icon} size={24} color={metric.color} />
            </View>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricTitle}>{metric.title}</Text>
            <Text style={[styles.metricChange, { color: metric.change.startsWith('+') ? COLORS.success : COLORS.error }]}>
              {metric.change}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.esgCard}>
        <View style={styles.esgHeader}>
          <Icon name="verified" size={24} color={COLORS.success} />
          <Text style={styles.esgTitle}>ESG Impact Score</Text>
        </View>
        <View style={styles.esgScoreContainer}>
          <Text style={styles.esgScore}>86</Text>
          <Text style={styles.esgMax}>/100</Text>
        </View>
        <View style={styles.esgBar}>
          <View style={[styles.esgProgress, { width: '86%' }]} />
        </View>
        <View style={styles.esgBreakdown}>
          <View style={styles.esgItem}><View style={[styles.esgDot, { backgroundColor: '#27ae60' }]} /><Text style={styles.esgItemText}>Environmental: 82</Text></View>
          <View style={styles.esgItem}><View style={[styles.esgDot, { backgroundColor: '#3498db' }]} /><Text style={styles.esgItemText}>Social: 91</Text></View>
          <View style={styles.esgItem}><View style={[styles.esgDot, { backgroundColor: '#f39c12' }]} /><Text style={styles.esgItemText}>Governance: 85</Text></View>
        </View>
      </View>

      <View style={styles.matchesCard}>
        <Text style={styles.sectionTitle}>High-Impact Matches</Text>
        {matches.map(match => (
          <TouchableOpacity key={match.id} style={styles.matchItem} onPress={() => navigation.navigate('Matching')}>
            <View style={styles.matchInfo}>
              <Text style={styles.matchName}>{match.name}</Text>
              <Text style={styles.matchIndustry}>{match.industry}</Text>
            </View>
            <View style={styles.matchStats}>
              <Text style={[styles.matchScore, { color: match.matchScore >= 85 ? COLORS.success : COLORS.warning }]}>{match.matchScore}%</Text>
              <View style={styles.matchImpact}><Icon name="eco" size={12} color={COLORS.success} /><Text style={styles.matchImpactText}>{match.impact}</Text></View>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('Matching')}>
          <Text style={styles.viewAllText}>View All Matches →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.portfolioCard}>
        <Text style={styles.sectionTitle}>Portfolio Summary</Text>
        <View style={styles.portfolioStats}>
          <View style={styles.portfolioStat}><Text style={styles.portfolioStatValue}>M 12.4M</Text><Text style={styles.portfolioStatLabel}>Total Invested</Text></View>
          <View style={styles.portfolioDivider} />
          <View style={styles.portfolioStat}><Text style={styles.portfolioStatValue}>18</Text><Text style={styles.portfolioStatLabel}>Active Deals</Text></View>
          <View style={styles.portfolioDivider} />
          <View style={styles.portfolioStat}><Text style={styles.portfolioStatValue}>24.5%</Text><Text style={styles.portfolioStatLabel}>Avg ROI</Text></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xxl },
  welcomeText: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.white, opacity: 0.9 },
  userName: { fontSize: TYPOGRAPHY.sizes.xxl, fontWeight: 'bold', color: COLORS.white, marginTop: SPACING.xs },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: SPACING.lg, gap: SPACING.md },
  metricCard: { flex: 1, minWidth: '45%', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, ...SHADOWS.sm },
  metricIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  metricValue: { fontSize: TYPOGRAPHY.sizes.xxl, fontWeight: 'bold', color: COLORS.gray900 },
  metricTitle: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray600, marginTop: SPACING.xs },
  metricChange: { fontSize: 10, marginTop: SPACING.xs },
  esgCard: { backgroundColor: COLORS.white, margin: SPACING.lg, padding: SPACING.lg, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.md },
  esgHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md, gap: SPACING.sm },
  esgTitle: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.gray800 },
  esgScoreContainer: { flexDirection: 'row', alignItems: 'baseline', marginBottom: SPACING.md },
  esgScore: { fontSize: 48, fontWeight: 'bold', color: COLORS.primary },
  esgMax: { fontSize: TYPOGRAPHY.sizes.lg, color: COLORS.gray400 },
  esgBar: { height: 8, backgroundColor: COLORS.gray200, borderRadius: BORDER_RADIUS.round, overflow: 'hidden', marginBottom: SPACING.md },
  esgProgress: { height: '100%', backgroundColor: COLORS.success, borderRadius: BORDER_RADIUS.round },
  esgBreakdown: { flexDirection: 'row', justifyContent: 'space-between', marginTop: SPACING.sm },
  esgItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  esgDot: { width: 8, height: 8, borderRadius: 4 },
  esgItemText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray600 },
  matchesCard: { backgroundColor: COLORS.white, marginHorizontal: SPACING.lg, marginBottom: SPACING.lg, padding: SPACING.lg, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.md },
  sectionTitle: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.gray800, marginBottom: SPACING.md },
  matchItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  matchInfo: { flex: 1 },
  matchName: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: '500', color: COLORS.gray800 },
  matchIndustry: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray500, marginTop: 2 },
  matchStats: { alignItems: 'flex-end' },
  matchScore: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold' },
  matchImpact: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  matchImpactText: { fontSize: 10, color: COLORS.success },
  viewAllButton: { marginTop: SPACING.md, alignItems: 'center' },
  viewAllText: { color: COLORS.primary, fontSize: TYPOGRAPHY.sizes.sm, fontWeight: '500' },
  portfolioCard: { backgroundColor: COLORS.white, marginHorizontal: SPACING.lg, marginBottom: SPACING.xxxl, padding: SPACING.lg, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.md },
  portfolioStats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  portfolioStat: { flex: 1, alignItems: 'center' },
  portfolioStatValue: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.primary },
  portfolioStatLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray500, marginTop: 4 },
  portfolioDivider: { width: 1, height: 40, backgroundColor: COLORS.gray200 },
});