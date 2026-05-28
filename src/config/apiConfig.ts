// For development, use local backend. For production, use api.sbiapp.com
const isDevelopment = __DEV__; // React Native's built-in global

export const API_CONFIG = {
  baseURL: isDevelopment 
    ? 'http://192.168.56.1:8000/api'  //  machine IP
    : 'https://sbi-app.onrender.com/api',
  timeout: 30000,
  retryCount: 3,
  retryDelay: 1000,
};
