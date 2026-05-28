import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthenticationProvider } from './src/context/AuthenticationContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { TrainingProvider } from './src/context/TrainingContext';
import { PaymentProvider } from './src/context/PaymentContext';
import { SplashScreen } from './src/components/SplashScreen';
import { Toast } from './src/components/Toast';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { secureStorage } from './src/services/storage/secureStorage';
import { apiClient } from './src/services/api/client';

// Disable yellow box warnings in production
if (!__DEV__) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check API health
        await apiClient.get('/health').catch(() => console.log('API offline, using mock'));
        // Clear old sessions
        const lastActivity = await secureStorage.getLastActivity();
        const inactiveTime = Date.now() - lastActivity;
        if (inactiveTime > 24 * 60 * 60 * 1000) {
          await secureStorage.clearAll();
        }
      } catch (error) {
        console.error('Init error:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 1500);
      }
    };
    initializeApp();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider>
            <AuthenticationProvider>
              <TrainingProvider>
                <PaymentProvider>
                  <NavigationContainer>
                    <AppNavigator />
                    <Toast />
                  </NavigationContainer>
                </PaymentProvider>
              </TrainingProvider>
            </AuthenticationProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

export default App;