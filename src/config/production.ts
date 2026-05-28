
export const PRODUCTION_CONFIG = {
  // Set to false - NO mock data in production
  useMockData: false,
  
  // Your Supabase backend URL (running on your computer or deployed)
  // For now, using your computer's IP (since backend is local)
  
  API_URL: 'http://192.168.56.1/api', 
  
  // Feature flags
  enableBiometric: true,
  enablePushNotifications: false,
  enableAnalytics: true,
  enableCrashReporting: true,
  
  // App settings
  sessionTimeout: 15, // minutes
  maxLoginAttempts: 5,
};

