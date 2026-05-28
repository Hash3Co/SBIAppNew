import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { secureStorage } from '../storage/secureStorage';
import { SecurityUtils } from '../../utils/securityUtils';
import { API_CONFIG } from '../../config/apiConfig';


class ApiClient {
  private client: AxiosInstance;
  private static instance: ApiClient;
  private requestCount = 0;
  private lastRequestTime = 0;

  private constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Platform': 'mobile' },
    });
    this.setupInterceptors();
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) ApiClient.instance = new ApiClient();
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
      const now = Date.now();
      if (now - this.lastRequestTime < 100) {
        this.requestCount++;
        if (this.requestCount > 10) throw new Error('Too many requests. Please slow down.');
      } else {
        this.requestCount = 1;
        this.lastRequestTime = now;
      }

      const token = await secureStorage.getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;

      const deviceFingerprint = await SecurityUtils.getDeviceFingerprint();
      config.headers['X-Device-Fingerprint'] = await SecurityUtils.hashData(deviceFingerprint);
      config.headers['X-Request-ID'] = SecurityUtils.generateCSRFToken();
      config.headers['X-Timestamp'] = Date.now().toString();
      config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';

      if (config.data && typeof config.data === 'object') {
        const sanitized: any = {};
        for (const key in config.data) {
          if (typeof config.data[key] === 'string') {
            if (SecurityUtils.hasSQLInjectionPattern(config.data[key]) || SecurityUtils.hasXSSPattern(config.data[key])) {
              throw new Error('Invalid characters detected in input');
            }
            sanitized[key] = SecurityUtils.sanitizeInput(config.data[key]);
          } else {
            sanitized[key] = config.data[key];
          }
        }
        config.data = sanitized;
      }
      return config;
    }, error => Promise.reject(error));

    this.client.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) await secureStorage.clearAll();
        if (error.response?.status === 429) throw new Error('Rate limit exceeded');
        return Promise.reject(error);
      }
    );
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = ApiClient.getInstance().getClient();