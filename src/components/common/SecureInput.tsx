import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';
import { useSecureInput } from '../../hooks/useSecureInput';

interface SecureInputProps extends TextInputProps {
  label: string;
  validationType?: 'email' | 'password' | 'phone' | 'amount';
  onValidChange?: (isValid: boolean, value: string) => void;
}

export const SecureInput: React.FC<SecureInputProps> = ({ label, validationType, onValidChange, secureTextEntry, ...props }) => {
  const { value, error, isValid, onChange, setValue } = useSecureInput(props.value as string || '');
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeText = (text: string) => {
    onChange(text, validationType);
    onValidChange?.(isValid, text);
    props.onChangeText?.(text);
  };

  const getBorderColor = () => {
    if (error) return COLORS.error;
    if (isValid && value) return COLORS.success;
    return COLORS.gray200;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, { borderColor: getBorderColor() }]}>
        <TextInput
          {...props}
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor={COLORS.gray400}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={20} color={COLORS.gray500} />
          </TouchableOpacity>
        )}
        {isValid && value && !error && <Icon name="check-circle" size={20} color={COLORS.success} style={styles.statusIcon} />}
        {error && <Icon name="error" size={20} color={COLORS.error} style={styles.statusIcon} />}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.lg },
  label: { fontSize: TYPOGRAPHY.sizes.sm, fontWeight: '500', color: COLORS.gray700, marginBottom: SPACING.xs },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.md, borderWidth: 1, paddingHorizontal: SPACING.md },
  input: { flex: 1, paddingVertical: SPACING.md, fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray900 },
  eyeIcon: { padding: SPACING.sm },
  statusIcon: { marginLeft: SPACING.sm },
  errorText: { fontSize: TYPOGRAPHY.sizes.xs, color: COLORS.error, marginTop: SPACING.xs },
});