import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { countries, resourceTypes, marketplaceResources } from '../../constants/dummyData';

export const MarketplaceScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = marketplaceResources.filter(resource => {
    const matchesCountry = selectedCountry === 'All' || resource.country === selectedCountry;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || resource.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesType && matchesSearch;
  });

  const renderResourceItem = ({ item }: any) => (
    <TouchableOpacity key={item.id} style={styles.resourceCard}>
      <View style={styles.resourceHeader}>
        <View style={styles.resourceTypeBadge}><Text style={styles.resourceTypeText}>{item.type.toUpperCase()}</Text></View>
        <Text style={styles.resourceCountry}><Icon name="place" size={14} /> {item.country}</Text>
      </View>
      <Text style={styles.resourceTitle}>{item.title}</Text>
      <Text style={styles.resourceDescription} numberOfLines={2}>{item.description}</Text>
      <View style={styles.resourceFooter}>
        <Text style={styles.resourceSeller}>{item.seller}</Text>
        <Text style={styles.resourcePrice}>M {item.price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <Text style={styles.headerTitle}>Marketplace</Text>
        <Text style={styles.headerSubtitle}>Trade Resources & Export Tools</Text>
      </LinearGradient>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={COLORS.gray400} />
        <TextInput style={styles.searchInput} placeholder="Search resources..." placeholderTextColor={COLORS.gray400} value={searchQuery} onChangeText={setSearchQuery} />
      </View>
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Filter by Country</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {countries.map(country => (
            <TouchableOpacity key={country} style={[styles.countryChip, selectedCountry === country && styles.countryChipActive]} onPress={() => setSelectedCountry(country)}>
              <Text style={[styles.countryChipText, selectedCountry === country && styles.countryChipTextActive]}>{country}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.typeFilterSection}>
        {resourceTypes.map(type => (
          <TouchableOpacity key={type} style={[styles.typeButton, selectedType === type && styles.typeButtonActive]} onPress={() => setSelectedType(type)}>
            <Text style={[styles.typeButtonText, selectedType === type && styles.typeButtonTextActive]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList data={filteredResources} renderItem={renderResourceItem} keyExtractor={item => item.id} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false} ListEmptyComponent={<View style={styles.emptyState}><Icon name="store" size={64} color={COLORS.gray300} /><Text style={styles.emptyStateText}>No resources found</Text></View>} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xxl },
  headerTitle: { fontSize: TYPOGRAPHY.sizes.xxl, fontWeight: 'bold', color: COLORS.white },
  headerSubtitle: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.white, opacity: 0.9, marginTop: SPACING.xs },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: SPACING.lg, marginTop: -SPACING.lg, paddingHorizontal: SPACING.md, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.md },
  searchInput: { flex: 1, paddingVertical: SPACING.md, paddingLeft: SPACING.sm, fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray900 },
  filterSection: { padding: SPACING.lg },
  filterLabel: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: '500', color: COLORS.gray600, marginBottom: SPACING.sm },
  countryChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, backgroundColor: COLORS.gray100, borderRadius: BORDER_RADIUS.round, marginRight: SPACING.sm },
  countryChipActive: { backgroundColor: COLORS.primary },
  countryChipText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray700 },
  countryChipTextActive: { color: COLORS.white },
  typeFilterSection: { flexDirection: 'row', paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg, gap: SPACING.sm },
  typeButton: { flex: 1, paddingVertical: SPACING.sm, backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.md, borderWidth: 1, borderColor: COLORS.primary, alignItems: 'center' },
  typeButtonActive: { backgroundColor: COLORS.primary },
  typeButtonText: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.primary },
  typeButtonTextActive: { color: COLORS.white },
  listContent: { padding: SPACING.lg, paddingTop: 0 },
  resourceCard: { backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.sm },
  resourceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  resourceTypeBadge: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: BORDER_RADIUS.sm },
  resourceTypeText: { fontSize: 10, color: COLORS.white, fontWeight: 'bold' },
  resourceCountry: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray500 },
  resourceTitle: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold', color: COLORS.gray900, marginBottom: SPACING.xs },
  resourceDescription: { fontSize: TYPOGRAPHY.sizes.sm, color: COLORS.gray600, marginBottom: SPACING.md },
  resourceFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resourceSeller: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.gray500 },
  resourcePrice: { fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold', color: COLORS.success },
  emptyState: { alignItems: 'center', padding: SPACING.xxxl },
  emptyStateText: { fontSize: TYPOGRAPHY.sizes.lg, color: COLORS.gray500, marginTop: SPACING.md },
});