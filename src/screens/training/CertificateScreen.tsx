import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useAuth } from '../../context/AuthenticationContext';
import { showToast } from '../../components/Toast';

export const CertificateScreen = ({ route, navigation }: any) => {
  const { courseId } = route.params;
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);

  const course = {
    title: 'Business Plan Development',
    completionDate: '2024-01-15',
    score: 92,
  };

  const handleShare = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
    
    try {
      await Share.share({
        message: `I completed "${course.title}" on SBI App with a score of ${course.score}%!`,
        title: 'Course Certificate',
      });
    } catch (error) {
      showToast('Failed to share certificate', 'error');
    }
  };

  const handleDownload = () => {
    showToast('Certificate downloaded', 'success');
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Certificate</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <View style={styles.certificateCard}>
        <View style={styles.certificateBorder}>
          <Icon name="emoji-events" size={60} color={COLORS.secondary} />
          <Text style={styles.certificateTitle}>Certificate of Completion</Text>
          <Text style={styles.certificateSubtitle}>This certificate is proudly presented to</Text>
          <Text style={styles.certificateName}>{user?.fullName || 'Student Name'}</Text>
          <Text style={styles.certificateText}>for successfully completing the course</Text>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <View style={styles.certificateDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Completion Date</Text>
              <Text style={styles.detailValue}>{course.completionDate}</Text>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Final Score</Text>
              <Text style={styles.detailValue}>{course.score}%</Text>
            </View>
          </View>
          <View style={styles.signatureLine}>
            <View style={styles.signature}><View style={styles.signatureBorder} /><Text style={styles.signatureText}>SBI App</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare} disabled={isGenerating}>
          <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.actionGradient}>
            <Icon name="share" size={20} color={COLORS.white} />
            <Text style={styles.actionButtonText}>{isGenerating ? 'Generating...' : 'Share'}</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <LinearGradient colors={[COLORS.success, COLORS.success]} style={styles.actionGradient}>
            <Icon name="download" size={20} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Download PDF</Text>
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
  certificateCard: { margin: SPACING.lg, backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.xl, ...SHADOWS.lg, overflow: 'hidden' },
  certificateBorder: { padding: SPACING.xxxl, alignItems: 'center', borderWidth: 2, borderColor: COLORS.secondary + '40', margin: SPACING.md, borderRadius: BORDER_RADIUS.lg },
  certificateTitle: { fontSize: TYPOGRAPHY.sizes.xxl, fontWeight: 'bold', color: COLORS.primary, marginTop: SPACING.md, textAlign: 'center' },
  certificateSubtitle: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray600, marginTop: SPACING.md },
  certificateName: { fontSize: 32, fontWeight: 'bold', color: COLORS.gray800, marginTop: SPACING.md, textAlign: 'center' },
  certificateText: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray600, marginTop: SPACING.md },
  courseTitle: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: '600', color: COLORS.secondary, marginTop: SPACING.sm, textAlign: 'center' },
  certificateDetails: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: SPACING.xl, paddingVertical: SPACING.md, borderTopWidth: 1, borderBottomWidth: 1, borderColor: COLORS.gray200 },
  detailItem: { alignItems: 'center', flex: 1 },
  detailLabel: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray500 },
  detailValue: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold', color: COLORS.gray800, marginTop: 4 },
  detailDivider: { width: 1, height: 30, backgroundColor: COLORS.gray200 },
  signatureLine: { marginTop: SPACING.xl, width: '100%', alignItems: 'center' },
  signature: { alignItems: 'center' },
  signatureBorder: { width: 150, borderBottomWidth: 1, borderBottomColor: COLORS.gray400, marginBottom: SPACING.xs },
  signatureText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray600 },
  actionButtons: { flexDirection: 'row', gap: SPACING.md, margin: SPACING.lg, marginBottom: SPACING.xxxl },
  shareButton: { flex: 1 },
  downloadButton: { flex: 1 },
  actionGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg },
  actionButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold' },
});