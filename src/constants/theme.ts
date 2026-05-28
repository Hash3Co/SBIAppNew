export const COLORS = {
  primary: '#2c5282',
  primaryDark: '#1a3c5e',
  primaryLight: '#4a7c9c',
  secondary: '#f39c12',
  secondaryDark: '#e67e22',
  secondaryLight: '#f1c40f',
  success: '#27ae60',
  error: '#e74c3c',
  warning: '#f39c12',
  info: '#3498db',
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  background: '#f8fafc',
  backgroundDark: '#0f172a',
  card: '#ffffff',
  cardDark: '#1e293b',
};

export const TYPOGRAPHY = {
  fonts: { regular: 'System', medium: 'System', bold: 'System' },
  sizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24, xxxl: 32, huge: 42 },
  lineHeights: { xs: 16, sm: 20, md: 24, lg: 28, xl: 32, xxl: 36, huge: 48 },
};

export const SPACING = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32, huge: 40, massive: 48,
};

export const BORDER_RADIUS = { sm: 4, md: 8, lg: 12, xl: 16, xxl: 24, round: 999 };

export const SHADOWS = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 },
};

export const lightTheme = { dark: false, colors: { primary: COLORS.primary, background: COLORS.background, card: COLORS.card, text: COLORS.gray900, border: COLORS.gray200, notification: COLORS.error } };
export const darkTheme = { dark: true, colors: { primary: COLORS.primaryLight, background: COLORS.backgroundDark, card: COLORS.cardDark, text: COLORS.gray100, border: COLORS.gray700, notification: COLORS.error } };