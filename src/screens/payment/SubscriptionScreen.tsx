import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useAuth } from '../../context/AuthenticationContext';
import { usePayment } from '../../context/PaymentContext';
import { showToast } from '../../components/Toast';

export const SubscriptionScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { subscriptionPlans, subscribe, isLoading, currentSubscription } = usePayment();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const filteredPlans = subscriptionPlans.filter(plan => plan.role === user?.role);

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      showToast('Please select a plan', 'error');
      return;
    }
    const success = await subscribe(selectedPlan, 'mock_payment_method');
    if (success) {
      showToast('Subscription activated!', 'success');
      navigation.goBack();
    } else {
      showToast('Subscription failed', 'error');
    }
  };

  const getPlanColor = (isPopular: boolean, isSelected: boolean) => {
    if (isSelected) return COLORS.primary;
    if (isPopular) return COLORS.warning;
    return COLORS.gray300;
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Icon name="arrow-back" size={24} color={COLORS.white} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Plan</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <View style={styles.content}>
        {filteredPlans.map(plan => (
          <TouchableOpacity key={plan.id} style={[styles.planCard, selectedPlan === plan.id && styles.planCardSelected]} onPress={() => setSelectedPlan(plan.id)}>
            {plan.isPopular && <View style={styles.popularBadge}><Text style={styles.popularText}>Most Popular</Text></View>}
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planPrice}>M {plan.price}<Text style={styles.planInterval}>/{plan.interval}</Text></Text>
            <Text style={styles.planDescription}>{plan.description}</Text>
            <View style={styles.featuresList}>
              {plan.features.map((feature, idx) => (
                <View key={idx} style={styles.featureItem}><Icon name="check-circle" size={16} color={COLORS.success} /><Text style={styles.featureText}>{feature}</Text></View>
              ))}
            </View>
            <View style={[styles.planRadio, { borderColor: getPlanColor(plan.isPopular, selectedPlan === plan.id) }]}>
              {selectedPlan === plan.id && <View style={[styles.planRadioSelected, { backgroundColor: getPlanColor(plan.isPopular, true) }]} />}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe} disabled={isLoading || !selectedPlan}>
          <LinearGradient colors={[COLORS.success, COLORS.success]} style={[styles.subscribeGradient, (!selectedPlan || isLoading) && styles.disabled]}>
            <Text style={styles.subscribeButtonText}>{isLoading ? 'Processing...' : 'Subscribe Now'}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {currentSubscription && (
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('PaymentHistory')}>
            <Text style={styles.cancelButtonText}>View Payment History →</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xl },
  backButton: { padding: SPACING.sm }, headerTitle: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.white },
  content: { padding: SPACING.lg },
  planCard: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.md, position: 'relative' },
  planCardSelected: { borderWidth: 2, borderColor: COLORS.primary },
  popularBadge: { position: 'absolute', top: -10, right: SPACING.lg, backgroundColor: COLORS.warning, paddingHorizontal: SPACING.md, paddingVertical: 4, borderRadius: BORDER_RADIUS.round },
  popularText: { fontSize: 10, color: COLORS.white, fontWeight: 'bold' },
  planName: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.gray800 },
  planPrice: { fontSize: 32, fontWeight: 'bold', color: COLORS.primary, marginTop: SPACING.xs },
  planInterval: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray500 },
  planDescription: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray500, marginTop: SPACING.xs },
  featuresList: { marginTop: SPACING.md, gap: SPACING.sm },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  featureText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray600 },
  planRadio: { position: 'absolute', top: SPACING.lg, right: SPACING.lg, width: 24, height: 24, borderRadius: 12, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  planRadioSelected: { width: 14, height: 14, borderRadius: 7 },
  subscribeButton: { marginTop: SPACING.xl, marginBottom: SPACING.md },
  subscribeGradient: { paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg, alignItems: 'center' },
  disabled: { opacity: 0.5 }, subscribeButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold' },
  cancelButton: { alignItems: 'center', marginBottom: SPACING.xxxl },
  cancelButtonText: { color: COLORS.gray500, fontSize: TYPOGRAPHY.sizes.sm },
});