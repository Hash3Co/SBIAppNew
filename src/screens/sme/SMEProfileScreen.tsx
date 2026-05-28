import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { showToast } from '../../components/Toast';

export const SMEProfileScreen = ({ navigation }: any) => {
  const [businessName, setBusinessName] = useState('Tech Solutions Ltd');
  const [industry, setIndustry] = useState('Technology');
  const [location, setLocation] = useState('Maseru, Lesotho');
  const [description, setDescription] = useState('Innovative software development company');
  const [fundingNeeded, setFundingNeeded] = useState('500000');
  const [isEditing, setIsEditing] = useState(false);

  const industries = ['Technology', 'Agriculture', 'Energy', 'Manufacturing', 'Retail', 'Financial Services', 'Healthcare', 'Education'];
  const locations = ['Maseru, Lesotho', 'Johannesburg, SA', 'Cape Town, SA', 'Durban, SA', 'Bloemfontein, SA', 'Gaborone, Botswana'];

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
        <Text style={styles.headerTitle}>Business Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.editButton}>
          <Icon name={isEditing ? 'close' : 'edit'} size={24} color={COLORS.white} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.field}>
            <Text style={styles.label}>Business Name</Text>
            {isEditing ? (
              <TextInput style={styles.input} value={businessName} onChangeText={setBusinessName} placeholderTextColor={COLORS.gray400} />
            ) : (
              <Text style={styles.value}>{businessName}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Industry</Text>
            {isEditing ? (
              <View style={styles.pickerContainer}>
                {industries.map(ind => (
                  <TouchableOpacity key={ind} style={[styles.pickerOption, industry === ind && styles.pickerOptionActive]} onPress={() => setIndustry(ind)}>
                    <Text style={[styles.pickerText, industry === ind && styles.pickerTextActive]}>{ind}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.value}>{industry}</Text>
            )}
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
            ) : (
              <Text style={styles.value}>{location}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>
            {isEditing ? (
              <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} multiline numberOfLines={4} placeholderTextColor={COLORS.gray400} />
            ) : (
              <Text style={styles.value}>{description}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Funding Needed (M)</Text>
            {isEditing ? (
              <TextInput style={styles.input} value={fundingNeeded} onChangeText={setFundingNeeded} keyboardType="numeric" placeholderTextColor={COLORS.gray400} />
            ) : (
              <Text style={styles.value}>M {parseInt(fundingNeeded).toLocaleString()}</Text>
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
  section: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, ...SHADOWS.md },
  sectionTitle: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.gray800, marginBottom: SPACING.lg },
  field: { marginBottom: SPACING.lg },
  label: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: '500', color: COLORS.gray600, marginBottom: SPACING.xs },
  value: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray900 },
  input: { borderWidth: 1, borderColor: COLORS.gray200, borderRadius: BORDER_RADIUS.md, padding: SPACING.md, fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray900, backgroundColor: COLORS.white },
  textArea: { height: 100, textAlignVertical: 'top' },
  pickerContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  pickerOption: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, backgroundColor: COLORS.gray100, borderRadius: BORDER_RADIUS.round, marginBottom: SPACING.xs },
  pickerOptionActive: { backgroundColor: COLORS.primary },
  pickerText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray700 },
  pickerTextActive: { color: COLORS.white },
  saveButton: { marginTop: SPACING.xl, marginBottom: SPACING.xxxl },
  saveGradient: { paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg, alignItems: 'center' },
  saveButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold' },
});