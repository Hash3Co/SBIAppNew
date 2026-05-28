import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

export const AnalyticsScreen = ({ navigation }: any) => {
  const stats = [
    { label: 'Profile Views', value: '1,234', change: '+12%', icon: 'visibility' },
    { label: 'Matches', value: '23', change: '+5', icon: 'people' },
    { label: 'Messages', value: '45', change: '+8', icon: 'message' },
    { label: 'Course Progress', value: '65%', change: '+15%', icon: 'school' },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.statsGrid}>
          {stats.map(stat => (
            <View key={stat.label} style={styles.statCard}>
              <Icon name={stat.icon} size={24} color={COLORS.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={[styles.statChange, stat.change.startsWith('+') ? styles.positive : styles.negative]}>{stat.change}</Text>
            </View>
          ))}
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Profile Performance</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>Chart visualization would appear here</Text>
          </View>
        </View>

        <View style={styles.insightsCard}>
          <Text style={styles.cardTitle}>Key Insights</Text>
          <View style={styles.insightItem}><Icon name="trending-up" size={20} color={COLORS.success} /><Text style={styles.insightText}>Your profile is in the top 15% of all profiles</Text></View>
          <View style={styles.insightItem}><Icon name="people" size={20} color={COLORS.primary} /><Text style={styles.insightText}>You've been matched with 23 potential investors</Text></View>
          <View style={styles.insightItem}><Icon name="school" size={20} color={COLORS.info} /><Text style={styles.insightText}>Complete financial literacy course to boost score</Text></View>
        </View>
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
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md, marginBottom: SPACING.lg },
  statCard: { flex: 1, minWidth: '45%', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, alignItems: 'center', ...SHADOWS.md },
  statValue: { fontSize: TYPOGRAPHY.sizes.xxl, fontWeight: 'bold', color: COLORS.gray800, marginTop: SPACING.sm },
  statLabel: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray600, marginTop: 2 },
  statChange: { fontSize: TYPOGRAPHY.sizes.xs, marginTop: 4 },
  positive: { color: COLORS.success },
  negative: { color: COLORS.error },
  chartCard: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.lg, ...SHADOWS.md },
  cardTitle: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.gray800, marginBottom: SPACING.md },
  chartPlaceholder: { height: 200, backgroundColor: COLORS.gray100, borderRadius: BORDER_RADIUS.md, justifyContent: 'center', alignItems: 'center' },
  chartText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray500 },
  insightsCard: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, ...SHADOWS.md },
  insightItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  insightText: { flex: 1, fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray700 },
});