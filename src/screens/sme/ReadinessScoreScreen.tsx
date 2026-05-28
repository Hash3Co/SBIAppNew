import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

export const ReadinessScoreScreen = ({ navigation }: any) => {
  const score = 65;
  const categories = [
    { name: 'Business Plan', score: 80, icon: 'description', color: COLORS.success },
    { name: 'Financial Health', score: 55, icon: 'attach-money', color: COLORS.warning },
    { name: 'Team Strength', score: 70, icon: 'people', color: COLORS.info },
    { name: 'Market Potential', score: 60, icon: 'trending-up', color: COLORS.warning },
    { name: 'Legal Compliance', score: 45, icon: 'gavel', color: COLORS.error },
    { name: 'Pitch Deck', score: 85, icon: 'slideshow', color: COLORS.success },
  ];

  const getScoreColor = (s: number) => s >= 80 ? COLORS.success : s >= 60 ? COLORS.warning : COLORS.error;

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Readiness Score</Text>
      </LinearGradient>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Overall Funding Readiness</Text>
        <View style={styles.scoreCircle}>
          <Text style={[styles.scoreValue, { color: getScoreColor(score) }]}>{score}%</Text>
        </View>
        <View style={styles.scoreBar}>
          <View style={[styles.scoreProgress, { width: `${score}%`, backgroundColor: getScoreColor(score) }]} />
        </View>
        <Text style={styles.scoreMessage}>
          {score >= 80 ? 'Excellent! You are investment ready.' :
           score >= 60 ? 'Good progress. Complete recommended courses to improve.' :
           'Needs improvement. Focus on the areas below.'}
        </Text>
      </View>

      <View style={styles.categoriesCard}>
        <Text style={styles.cardTitle}>Breakdown by Category</Text>
        {categories.map(cat => (
          <View key={cat.name} style={styles.categoryItem}>
            <View style={styles.categoryHeader}>
              <Icon name={cat.icon} size={20} color={cat.color} />
              <Text style={styles.categoryName}>{cat.name}</Text>
              <Text style={[styles.categoryScore, { color: cat.color }]}>{cat.score}%</Text>
            </View>
            <View style={styles.categoryBar}>
              <View style={[styles.categoryProgress, { width: `${cat.score}%`, backgroundColor: cat.color }]} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.recommendationsCard}>
        <Text style={styles.cardTitle}>Recommended Actions</Text>
        <View style={styles.recommendation}>
          <Icon name="school" size={20} color={COLORS.primary} />
          <Text style={styles.recommendationText}>Complete "Financial Literacy" course (+15% score)</Text>
        </View>
        <View style={styles.recommendation}>
          <Icon name="description" size={20} color={COLORS.primary} />
          <Text style={styles.recommendationText}>Update your business plan (+10% score)</Text>
        </View>
        <View style={styles.recommendation}>
          <Icon name="gavel" size={20} color={COLORS.primary} />
          <Text style={styles.recommendationText}>Upload legal documents (+20% score)</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('CourseLibrary')}>
        <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.actionGradient}>
          <Text style={styles.actionButtonText}>Improve My Score →</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xxl, gap: SPACING.md },
  backButton: { padding: SPACING.sm },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.white },
  scoreCard: { backgroundColor: COLORS.white, margin: SPACING.lg, padding: SPACING.xl, borderRadius: BORDER_RADIUS.xl, ...SHADOWS.lg, alignItems: 'center' },
  scoreLabel: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray600, marginBottom: SPACING.md },
  scoreCircle: { marginVertical: SPACING.md },
  scoreValue: { fontSize: 64, fontWeight: 'bold' },
  scoreBar: { width: '100%', height: 8, backgroundColor: COLORS.gray200, borderRadius: BORDER_RADIUS.round, overflow: 'hidden', marginVertical: SPACING.md },
  scoreProgress: { height: '100%', borderRadius: BORDER_RADIUS.round },
  scoreMessage: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray600, textAlign: 'center', marginTop: SPACING.md },
  categoriesCard: { backgroundColor: COLORS.white, marginHorizontal: SPACING.lg, marginBottom: SPACING.lg, padding: SPACING.lg, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.md },
  cardTitle: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.gray800, marginBottom: SPACING.md },
  categoryItem: { marginBottom: SPACING.md },
  categoryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs, gap: SPACING.sm },
  categoryName: { flex: 1, fontSize: TYPOGRAPHY.sizes.sm, fontWeight: '500', color: COLORS.gray700 },
  categoryScore: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: 'bold' },
  categoryBar: { height: 6, backgroundColor: COLORS.gray200, borderRadius: BORDER_RADIUS.round, overflow: 'hidden' },
  categoryProgress: { height: '100%', borderRadius: BORDER_RADIUS.round },
  recommendationsCard: { backgroundColor: COLORS.white, marginHorizontal: SPACING.lg, marginBottom: SPACING.lg, padding: SPACING.lg, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.md },
  recommendation: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  recommendationText: { flex: 1, fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray700 },
  actionButton: { margin: SPACING.lg, marginBottom: SPACING.xxxl },
  actionGradient: { paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg, alignItems: 'center' },
  actionButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold' },
});