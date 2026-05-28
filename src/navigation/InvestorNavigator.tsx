import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { InvestorDashboard } from '../screens/investor/InvestorDashboard';
import { InvestorProfileScreen } from '../screens/investor/InvestorProfileScreen';
import { PortfolioScreen } from '../screens/investor/PortfolioScreen';
import { MatchingScreen } from '../screens/matching/MatchingScreen';
import { MarketplaceScreen } from '../screens/marketplace/MarketplaceScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { COLORS } from '../constants/theme';
import { ROUTES } from '../constants/routes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const InvestorTabs = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = '';
      if (route.name === 'Home') iconName = 'home';
      else if (route.name === 'Marketplace') iconName = 'store';
      else if (route.name === 'Portfolio') iconName = 'folder';
      else if (route.name === 'Profile') iconName = 'person';
      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: COLORS.gray400,
    tabBarStyle: { backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.gray200, height: 60, paddingBottom: 8, paddingTop: 8 },
    headerShown: false,
  })}>
    <Tab.Screen name="Home" component={InvestorDashboard} />
    <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
    <Tab.Screen name="Portfolio" component={PortfolioScreen} />
    <Tab.Screen name="Profile" component={InvestorProfileScreen} />
  </Tab.Navigator>
);

export const InvestorNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="InvestorTabs" component={InvestorTabs} />
    <Stack.Screen name={ROUTES.INVESTOR_PROFILE} component={InvestorProfileScreen} />
    <Stack.Screen name={ROUTES.PORTFOLIO} component={PortfolioScreen} />
    <Stack.Screen name={ROUTES.MATCHING} component={MatchingScreen} />
    <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
  </Stack.Navigator>
);