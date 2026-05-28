import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useTraining } from '../../context/TrainingContext';

export const CourseLibraryScreen = ({ navigation }: any) => {
  const { courses, enrolledCourses } = useTraining();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Business', 'Finance', 'Pitching', 'Marketing'];

  const filteredCourses = selectedCategory === 'all' ? courses : courses.filter(c => c.category === selectedCategory);

  const renderCourseCard = ({ item }: any) => {
    const isEnrolled = enrolledCourses.some(c => c.id === item.id);
    return (
      <TouchableOpacity style={styles.courseCard} onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}>
        <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.courseThumbnail}>
          <Icon name="school" size={40} color={COLORS.white} />
        </LinearGradient>
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.courseInstructor}>{item.instructor}</Text>
          <View style={styles.courseMeta}>
            <View style={styles.metaItem}><Icon name="schedule" size={14} color={COLORS.gray500} /><Text style={styles.metaText}>{item.duration}</Text></View>
            <View style={styles.metaItem}><Icon name="bar-chart" size={14} color={COLORS.gray500} /><Text style={styles.metaText}>{item.level}</Text></View>
          </View>
          {isEnrolled && item.progress > 0 && (<View style={styles.progressBar}><View style={[styles.progressFill, { width: `${item.progress}%` }]} /></View>)}
          <TouchableOpacity style={[styles.enrollButton, isEnrolled && styles.enrolledButton]}>
            <Text style={[styles.enrollText, isEnrolled && styles.enrolledText]}>{isEnrolled ? 'Continue' : 'Enroll'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <Text style={styles.headerTitle}>Training Library</Text>
        <Text style={styles.headerSubtitle}>Learn to get funding ready</Text>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map(cat => (
          <TouchableOpacity key={cat} style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]} onPress={() => setSelectedCategory(cat)}>
            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList data={filteredCourses} renderItem={renderCourseCard} keyExtractor={item => item.id} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xxl },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.xxl, fontWeight: 'bold', color: COLORS.white },
  headerSubtitle: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.white, opacity: 0.9, marginTop: SPACING.xs },
  categoriesScroll: { paddingHorizontal: SPACING.lg, marginTop: SPACING.lg },
  categoryChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, backgroundColor: COLORS.gray100, borderRadius: BORDER_RADIUS.round, marginRight: SPACING.sm },
  categoryChipActive: { backgroundColor: COLORS.primary },
  categoryText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray700 },
  categoryTextActive: { color: COLORS.white },
  listContent: { padding: SPACING.lg, paddingTop: SPACING.md },
  courseCard: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, marginBottom: SPACING.md, overflow: 'hidden', ...SHADOWS.md, flexDirection: 'row' },
  courseThumbnail: { width: 100, height: 100, justifyContent: 'center', alignItems: 'center' },
  courseInfo: { flex: 1, padding: SPACING.md },
  courseTitle: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold', color: COLORS.gray800 },
  courseInstructor: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray500, marginTop: 2 },
  courseMeta: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.xs, marginBottom: SPACING.sm },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 10, color: COLORS.gray500 },
  progressBar: { height: 4, backgroundColor: COLORS.gray200, borderRadius: BORDER_RADIUS.round, overflow: 'hidden', marginVertical: SPACING.sm },
  progressFill: { height: '100%', backgroundColor: COLORS.success, borderRadius: BORDER_RADIUS.round },
  enrollButton: { backgroundColor: COLORS.primary, paddingVertical: 6, borderRadius: BORDER_RADIUS.sm, alignItems: 'center', marginTop: SPACING.xs },
  enrolledButton: { backgroundColor: COLORS.gray100 },
  enrollText: { fontSize: 12, color: COLORS.white, fontWeight: '500' },
  enrolledText: { color: COLORS.primary },
});