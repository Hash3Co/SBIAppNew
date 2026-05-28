import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { showToast } from '../../components/Toast';

export const InvestorProfileScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('John Smith');
  const [companyName, setCompanyName] = useState('African Growth Capital');
  const [location, setLocation] = useState('Cape Town, SA');
  const [minInvestment, setMinInvestment] = useState('250000');
  const [maxInvestment, setMaxInvestment] = useState('2500000');
  const [interests, setInterests] = useState(['Technology', 'Fintech']);
  const [isEditing, setIsEditing] = useState(false);

  const allInterests = ['Technology', 'Fintech', 'Agriculture', 'Energy', 'Healthcare', 'Education', 'Manufacturing', 'Retail'];
  const locations = ['Cape Town, SA', 'Johannesburg, SA', 'Durban, SA', 'Maseru, Lesotho', 'Gaborone, Botswana'];

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    showToast('Profile updated successfully', 'success');
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Investor Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.editButton}>
          <Icon name={isEditing ? 'close' : 'edit'} size={24} color={COLORS.white} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.field}>
            <Text style={styles.label}>Full Name</Text>
            {isEditing ? <TextInput style={styles.input} value={fullName} onChangeText={setFullName} /> : <Text style={styles.value}>{fullName}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Company Name</Text>
            {isEditing ? <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} /> : <Text style={styles.value}>{companyName}</Text>}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Location</Text>
            {isEditing ? (
              <View style={styles.pickerContainer}>
                {locations.map(loc => (
                  <TouchableOpacity key={loc} style={[styles.pickerOption, location === loc && styles.pickerOptionActive]} onPress={() => setLocation(loc)}>
                    <Text style={[styles.pickerText, location === loc && styles.pickerTextActive]}>{loc}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : <Text style={styles.value}>{location}</Text>}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Preferences</Text>
          
          <View style={styles.row}>
            <View style={[styles.field, { flex: 1, marginRight: SPACING.md }]}>
              <Text style={styles.label}>Min Investment (M)</Text>
              {isEditing ? <TextInput style={styles.input} value={minInvestment} onChangeText={setMinInvestment} keyboardType="numeric" /> : <Text style={styles.value}>M {parseInt(minInvestment).toLocaleString()}</Text>}
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Max Investment (M)</Text>
              {isEditing ? <TextInput style={styles.input} value={maxInvestment} onChangeText={setMaxInvestment} keyboardType="numeric" /> : <Text style={styles.value}>M {parseInt(maxInvestment).toLocaleString()}</Text>}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Areas of Interest</Text>
            {isEditing ? (
              <View style={styles.interestsContainer}>
                {allInterests.map(interest => (
                  <TouchableOpacity key={interest} style={[styles.interestChip, interests.includes(interest) && styles.interestChipActive]} onPress={() => toggleInterest(interest)}>
                    <Text style={[styles.interestText, interests.includes(interest) && styles.interestTextActive]}>{interest}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.interestsContainer}>
                {interests.map(interest => <View key={interest} style={styles.interestBadge}><Text style={styles.interestBadgeText}>{interest}</Text></View>)}
              </View>
            )}
          </View>
        </View>

        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <LinearGradient colors={[COLORS.success, COLORS.success]} style={styles.saveGradient}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xxl },
  backButton: { padding: SPACING.sm },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.white },
  editButton: { padding: SPACING.sm },
  content: { padding: SPACING.lg },
  section: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.lg, ...SHADOWS.md },
  sectionTitle: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.gray800, marginBottom: SPACING.lg },
  field: { marginBottom: SPACING.md },
  label: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: '500', color: COLORS.gray600, marginBottom: SPACING.xs },
  value: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray900 },
  input: { borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray900, backgroundColor: COLORS.white },
  row: { flexDirection: 'row' },
  pickerContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  pickerOption: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, backgroundColor: COLORS.gray100, borderRadius: BORDER_RADIUS.round, marginBottom: SPACING.xs },
  pickerOptionActive: { backgroundColor: COLORS.primary },
  pickerText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray700 },
  pickerTextActive: { color: COLORS.white },
  interestsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  interestChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, backgroundColor: COLORS.gray100, borderRadius: BORDER_RADIUS.round },
  interestChipActive: { backgroundColor: COLORS.primary },
  interestText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray700 },
  interestTextActive: { color: COLORS.white },
  interestBadge: { backgroundColor: COLORS.primary + '20', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.round },
  interestBadgeText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.primary },
  saveButton: { marginTop: SPACING.md, marginBottom: SPACING.xxxl },
  saveGradient: { paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg, alignItems: 'center' },
  saveButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold' },
});