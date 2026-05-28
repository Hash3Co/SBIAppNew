import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const onboardingData = [
  { id: '1', title: 'Connect with Investors', description: 'Find the right investors who are interested in your industry and funding needs.', icon: 'people' },
  { id: '2', title: 'Get Funding Ready', description: 'Complete training courses and improve your readiness score to attract investors.', icon: 'school' },
  { id: '3', title: 'Secure Your Future', description: 'Get matched, pitch your business, and secure the funding you need to grow.', icon: 'trending-up' },
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else navigation.replace('Login');
  };

  const handleSkip = () => navigation.replace('Login');

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.iconGradient}><Icon name={item.icon} size={80} color={COLORS.white} /></LinearGradient>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList ref={flatListRef} data={onboardingData} renderItem={renderItem} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onMomentumScrollEnd={(event) => setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width))} keyExtractor={item => item.id} />
      <View style={styles.footer}>
        <View style={styles.pagination}>{onboardingData.map((_, index) => <View key={index} style={[styles.dot, currentIndex === index && styles.dotActive]} />)}</View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleSkip}><Text style={styles.skipText}>Skip</Text></TouchableOpacity>
          <TouchableOpacity onPress={handleNext}><LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.gradientButton}><Text style={styles.nextText}>{currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}</Text><Icon name="arrow-forward" size={20} color={COLORS.white} /></LinearGradient></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  slide: { width, padding: SPACING.xl, alignItems: 'center', justifyContent: 'center' },
  iconGradient: { width: 140, height: 140, borderRadius: 70, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xxxl },
  title: { fontSize: TYPOGRAPHY.sizes.xxl, fontWeight: 'bold', color: COLORS.gray900, textAlign: 'center', marginBottom: SPACING.lg },
  description: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray600, textAlign: 'center', lineHeight: 24, paddingHorizontal: SPACING.lg },
  footer: { padding: SPACING.xl, paddingBottom: SPACING.xxxl },
  pagination: { flexDirection: 'row', justifyContent: 'center', marginBottom: SPACING.xl },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gray300, marginHorizontal: SPACING.xs },
  dotActive: { width: 24, backgroundColor: COLORS.primary },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  skipText: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray500 },
  gradientButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.xl, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg, gap: SPACING.sm },
  nextText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold' },
});