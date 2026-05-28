import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../context/AuthenticationContext';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { Match, Course } from '../../types';
import { dummyMatches, dummyCourses } from '../../constants/dummyData';

export const SMEDashboard = ({ navigation }: any) => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [readinessScore, setReadinessScore] = useState(65);
  const [refreshing, setRefreshing] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(60);

  useEffect(() => {
    setMatches(dummyMatches.slice(0, 3));
    setCourses(dummyCourses.slice(0, 2));
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getScoreColor = (score: number) => score >= 80 ? COLORS.success : score >= 60 ? COLORS.warning : COLORS.error;

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <View><Text style={styles.welcomeText}>Welcome back,</Text><Text style={styles.userName}>{user?.fullName || 'SME User'}</Text></View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}><Icon name="notifications-none" size={24} color={COLORS.white} /></TouchableOpacity>
      </LinearGradient>
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>Funding Readiness Score</Text>
        <View style={styles.scoreCircle}><Text style={[styles.scoreValue, { color: getScoreColor(readinessScore) }]}>{readinessScore}%</Text></View>
        <View style={styles.scoreBar}><View style={[styles.scoreProgress, { width: `${readinessScore}%`, backgroundColor: getScoreColor(readinessScore) }]} /></View>
        <TouchableOpacity onPress={() => navigation.navigate('ReadinessScore')}><Text style={styles.improveButtonText}>Improve Your Score →</Text></TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}><Icon name="assignment" size={24} color={COLORS.primary} /><Text style={styles.cardTitle}>Profile Completion</Text></View>
        <View style={styles.completionBar}><View style={[styles.completionProgress, { width: `${profileCompletion}%` }]} /></View>
        <Text style={styles.completionText}>{profileCompletion}% Complete</Text>
        <TouchableOpacity style={styles.completeButton} onPress={() => navigation.navigate('SMEProfile')}><Text style={styles.completeButtonText}>Complete Your Profile</Text></TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}><Icon name="people" size={24} color={COLORS.primary} /><Text style={styles.cardTitle}>Potential Investors</Text></View>
        {matches.map(match => (
          <TouchableOpacity key={match.id} style={styles.matchItem} onPress={() => navigation.navigate('Matching')}>
            <View><Text style={styles.matchName}>{match.investorProfile?.fullName || 'Investor'}</Text><Text style={styles.matchScore}>Match: {match.matchScore}%</Text></View>
            <Icon name="chevron-right" size={20} color={COLORS.gray400} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('Matching')}><Text style={styles.viewAllText}>View All Matches</Text></TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={styles.cardHeader}><Icon name="school" size={24} color={COLORS.primary} /><Text style={styles.cardTitle}>Recommended for You</Text></View>
        {courses.map(course => (
          <TouchableOpacity key={course.id} style={styles.courseItem} onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}>
            <View><Text style={styles.courseTitle}>{course.title}</Text><Text style={styles.courseDuration}>{course.duration}</Text></View>
            <Icon name="play-circle-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate('CourseLibrary')}><Text style={styles.viewAllText}>Browse All Courses</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xxxl },
  welcomeText: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.white, opacity: 0.9 },
  userName: { fontSize: TYPOGRAPHY.sizes.xxl, fontWeight: 'bold', color: COLORS.white, marginTop: SPACING.xs },
  scoreCard: { backgroundColor: COLORS.white, margin: SPACING.lg, marginTop: -SPACING.xxxl, padding: SPACING.xl, borderRadius: BORDER_RADIUS.xl, ...SHADOWS.lg, alignItems: 'center' },
  scoreTitle: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray600, marginBottom: SPACING.md },
  scoreCircle: { marginVertical: SPACING.md },
  scoreValue: { fontSize: 48, fontWeight: 'bold' },
  scoreBar: { width: '100%', height: 8, backgroundColor: COLORS.gray200, borderRadius: BORDER_RADIUS.round, overflow: 'hidden', marginVertical: SPACING.md },
  scoreProgress: { height: '100%', borderRadius: BORDER_RADIUS.round },
  improveButtonText: { color: COLORS.primary, fontSize: TYPOGRAPHY.sizes.sm, fontWeight: '500', marginTop: SPACING.sm },
  card: { backgroundColor: COLORS.white, marginHorizontal: SPACING.lg, marginBottom: SPACING.lg, padding: SPACING.lg, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.md },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md },
  cardTitle: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.gray800, marginLeft: SPACING.sm },
  completionBar: { height: 8, backgroundColor: COLORS.gray200, borderRadius: BORDER_RADIUS.round, overflow: 'hidden', marginVertical: SPACING.md },
  completionProgress: { height: '100%', backgroundColor: COLORS.success, borderRadius: BORDER_RADIUS.round },
  completionText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray600, textAlign: 'center', marginBottom: SPACING.md },
  completeButton: { backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, alignItems: 'center' },
  completeButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.sm, fontWeight: '500' },
  matchItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  matchName: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: '500', color: COLORS.gray800 },
  matchScore: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.success, marginTop: SPACING.xs },
  viewAllButton: { marginTop: SPACING.md, alignItems: 'center' },
  viewAllText: { color: COLORS.primary, fontSize: TYPOGRAPHY.sizes.sm, fontWeight: '500' },
  courseItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  courseTitle: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: '500', color: COLORS.gray800 },
  courseDuration: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray500, marginTop: SPACING.xs },
});