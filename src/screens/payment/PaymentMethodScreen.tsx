import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { showToast } from '../../components/Toast';

export const PaymentMethodScreen = ({ navigation }: any) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const savedMethods = [
    { id: '1', last4: '4242', brand: 'Visa', expiry: '12/25' },
    { id: '2', last4: '5555', brand: 'Mastercard', expiry: '08/26' },
  ];

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleAddCard = async () => {
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      showToast('Please fill all fields', 'error');
      return;
    }
    
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsAdding(false);
    showToast('Payment method added successfully', 'success');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Saved Cards</Text>
        {savedMethods.map(method => (
          <View key={method.id} style={styles.methodCard}>
            <Icon name="credit-card" size={24} color={COLORS.primary} />
            <View style={styles.methodInfo}>
              <Text style={styles.methodBrand}>{method.brand}</Text>
              <Text style={styles.methodDetails}>•••• {method.last4} • Expires {method.expiry}</Text>
            </View>
            <TouchableOpacity style={styles.methodAction}>
              <Icon name="more-vert" size={20} color={COLORS.gray500} />
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Add New Card</Text>
        <View style={styles.addCardForm}>
          <TextInput style={styles.input} placeholder="Card Number" placeholderTextColor={COLORS.gray400} value={cardNumber} onChangeText={text => setCardNumber(formatCardNumber(text))} keyboardType="numeric" maxLength={19} />
          <View style={styles.row}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="MM/YY" placeholderTextColor={COLORS.gray400} value={expiryDate} onChangeText={text => setExpiryDate(formatExpiry(text))} maxLength={5} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="CVV" placeholderTextColor={COLORS.gray400} value={cvv} onChangeText={setCvv} keyboardType="numeric" maxLength={4} secureTextEntry />
          </View>
          <TextInput style={styles.input} placeholder="Cardholder Name" placeholderTextColor={COLORS.gray400} value={cardholderName} onChangeText={setCardholderName} />

          <TouchableOpacity style={styles.addButton} onPress={handleAddCard} disabled={isAdding}>
            <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.addGradient}>
              <Text style={styles.addButtonText}>{isAdding ? 'Adding...' : 'Add Card'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.secureText}>
          <Icon name="lock" size={14} color={COLORS.success} /> Your payment info is securely encrypted
        </Text>
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
  sectionTitle: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.gray800, marginBottom: SPACING.md, marginTop: SPACING.lg },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOWS.sm, gap: SPACING.md },
  methodInfo: { flex: 1 },
  methodBrand: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: '500', color: COLORS.gray800 },
  methodDetails: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray500, marginTop: 2 },
  methodAction: { padding: SPACING.sm },
  addCardForm: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, ...SHADOWS.md },
  input: { borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray900, marginBottom: SPACING.md, backgroundColor: COLORS.white },
  row: { flexDirection: 'row', gap: SPACING.md },
  halfInput: { flex: 1 },
  addButton: { marginTop: SPACING.sm },
  addGradient: { paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg, alignItems: 'center' },
  addButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold' },
  secureText: { textAlign: 'center', marginTop: SPACING.xl, fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray500 },
});