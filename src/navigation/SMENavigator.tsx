import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SMEDashboard } from '../screens/sme/SMEDashboard';
import { SMEProfileScreen } from '../screens/sme/SMEProfileScreen';
import { MatchingScreen } from '../screens/matching/MatchingScreen';
import { MarketplaceScreen } from '../screens/marketplace/MarketplaceScreen';
import { CourseLibraryScreen } from '../screens/training/CourseLibraryScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { COLORS } from '../constants/theme';
import { ROUTES } from '../constants/routes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SMETabs = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = '';
      if (route.name === 'Home') iconName = 'home';
      else if (route.name === 'Marketplace') iconName = 'store';
      else if (route.name === 'Training') iconName = 'school';
      else if (route.name === 'Profile') iconName = 'person';
      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: COLORS.gray400,
    tabBarStyle: { backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.gray200, height: 60, paddingBottom: 8, paddingTop: 8 },
    headerShown: false,
  })}>
    <Tab.Screen name="Home" component={SMEDashboard} />
    <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
    <Tab.Screen name="Training" component={CourseLibraryScreen} />
    <Tab.Screen name="Profile" component={SMEProfileScreen} />
  </Tab.Navigator>
);

export const SMENavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SMETabs" component={SMETabs} />
    <Stack.Screen name={ROUTES.SME_PROFILE} component={SMEProfileScreen} />
    <Stack.Screen name={ROUTES.MATCHING} component={MatchingScreen} />
    <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
  </Stack.Navigator>
);