// src/components/auth/BiometricAuth.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';

// Add to package.json: "react-native-biometrics": "^3.0.1"

export const BiometricAuth = ({ onSuccess, onFailure }: any) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometryType, setBiometryType] = useState<string | null>(null);

  React.useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    const reactNativeBiometrics = new ReactNativeBiometrics();
    const { available, biometryType } = await reactNativeBiometrics.isSensorAvailable();
    
    setIsAvailable(available);
    if (available) {
      setBiometryType(biometryType === 'FaceID' ? 'Face ID' : 'Touch ID');
    }
  };

  const authenticate = async () => {
    const reactNativeBiometrics = new ReactNativeBiometrics();
    
    const { success, error } = await reactNativeBiometrics.simplePrompt({
      promptMessage: 'Authenticate to access SBI App',
      cancelButtonText: 'Cancel',
    });

    if (success) {
      onSuccess?.();
    } else {
      onFailure?.(error);
    }
  };

  if (!isAvailable) return null;

  return (
    <TouchableOpacity style={styles.biometricButton} onPress={authenticate}>
      <Icon 
        name={biometryType === 'Face ID' ? 'face' : 'fingerprint'} 
        size={24} 
        color={COLORS.primary} 
      />
      <Text style={styles.biometricText}>
        Login with {biometryType}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    padding: SPACING.md,
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.lg,
    marginVertical: SPACING.md,
  },
  biometricText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
});