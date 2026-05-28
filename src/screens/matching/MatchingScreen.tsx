import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

export const MatchingScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'matches' | 'suggestions'>('matches');
  
  const matches = [
    { id: '1', name: 'Tech Solutions Ltd', industry: 'Technology', matchScore: 92, location: 'Maseru', funding: 500000 },
    { id: '2', name: 'Green Energy Africa', industry: 'Energy', matchScore: 88, location: 'Johannesburg', funding: 1250000 },
    { id: '3', name: 'AgriFresh', industry: 'Agriculture', matchScore: 85, location: 'Bloemfontein', funding: 350000 },
  ];

  const suggestions = [
    { id: '4', name: 'FinTech Innovations', industry: 'Fintech', matchScore: 78, location: 'Cape Town', funding: 750000 },
    { id: '5', name: 'EduTech Africa', industry: 'Education', matchScore: 72, location: 'Durban', funding: 250000 },
  ];

  const data = activeTab === 'matches' ? matches : suggestions;

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Matching</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'matches' && styles.tabActive]} onPress={() => setActiveTab('matches')}>
          <Text style={[styles.tabText, activeTab === 'matches' && styles.tabTextActive]}>My Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'suggestions' && styles.tabActive]} onPress={() => setActiveTab('suggestions')}>
          <Text style={[styles.tabText, activeTab === 'suggestions' && styles.tabTextActive]}>Suggestions</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {data.map(item => (
          <View key={item.id} style={styles.matchCard}>
            <View style={styles.matchHeader}>
              <View>
                <Text style={styles.matchName}>{item.name}</Text>
                <Text style={styles.matchIndustry}>{item.industry}</Text>
              </View>
              <View style={[styles.matchScoreBadge, { backgroundColor: item.matchScore >= 85 ? COLORS.success + '20' : COLORS.warning + '20' }]}>
                <Text style={[styles.matchScoreText, { color: item.matchScore >= 85 ? COLORS.success : COLORS.warning }]}>{item.matchScore}%</Text>
              </View>
            </View>
            <View style={styles.matchDetails}>
              <View style={styles.detailItem}><Icon name="place" size={16} color={COLORS.gray500} /><Text style={styles.detailText}>{item.location}</Text></View>
              <View style={styles.detailItem}><Icon name="attach-money" size={16} color={COLORS.gray500} /><Text style={styles.detailText}>M {item.funding.toLocaleString()}</Text></View>
            </View>
            <View style={styles.matchActions}>
              <TouchableOpacity style={styles.connectButton}>
                <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.connectGradient}>
                  <Text style={styles.connectButtonText}>Connect</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <Icon name="message" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xxl },
  backButton: { padding: SPACING.sm, width: 40 },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.white },
  tabContainer: { flexDirection: 'row', backgroundColor: COLORS.white, marginHorizontal: SPACING.lg, marginTop: -SPACING.lg, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.md },
  tab: { flex: 1, paddingVertical: SPACING.md, alignItems: 'center', borderRadius: BORDER_RADIUS.lg },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray600 },
  tabTextActive: { color: COLORS.white, fontWeight: 'bold' },
  content: { padding: SPACING.lg },
  matchCard: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.md },
  matchHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  matchName: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold', color: COLORS.gray800 },
  matchIndustry: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray500, marginTop: 2 },
  matchScoreBadge: { paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: BORDER_RADIUS.round },
  matchScoreText: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: 'bold' },
  matchDetails: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.md },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray600 },
  matchActions: { flexDirection: 'row', gap: SPACING.md },
  connectButton: { flex: 1 },
  connectGradient: { paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, alignItems: 'center' },
  connectButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.sm, fontWeight: '500' },
  messageButton: { width: 40, height: 40, borderRadius: BORDER_RADIUS.md, borderWidth: 1, borderColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
});