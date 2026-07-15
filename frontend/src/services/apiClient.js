import axios from 'axios';

// Base API URL config
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cache map for GET requests
const responseCache = new Map();

// Helper to generate cache key
const getCacheKey = (config) => {
  return `${config.method}:${config.url}:${JSON.stringify(config.params || {})}`;
};

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // If it's a GET request and cache is enabled (or by default for GETs unless specified)
    if (config.method === 'get' && config.cache !== false) {
      const cacheKey = getCacheKey(config);
      const cachedResponse = responseCache.get(cacheKey);

      if (cachedResponse) {
        // Return a custom promise resolving with the cached data
        config.adapter = () => {
          return Promise.resolve({
            data: cachedResponse.data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
          });
        };
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    const { config } = response;
    
    // Cache the response if it was a successful GET request
    if (config.method === 'get' && config.cache !== false && response.status === 200) {
      const cacheKey = getCacheKey(config);
      responseCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
    }
    return response;
  },
  async (error) => {
    const { config, response } = error;
    
    // Auto-retry configuration on transient network errors
    if (!config || !config.retry) {
      // Set default retry parameters
      config.retry = 2;
      config.retryDelay = 1000;
    }
    
    // Track retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we should retry (only on network errors or 5xx server errors, up to retry limit)
    const isNetworkOrServerError = !response || (response.status >= 500 && response.status <= 599);
    
    if (isNetworkOrServerError && config.__retryCount < config.retry) {
      config.__retryCount += 1;
      
      // Delay before retrying
      const delay = new Promise((resolve) => {
        setTimeout(resolve, config.retryDelay);
      });
      
      await delay;
      // Re-run the request
      return apiClient(config);
    }
    
    // Global error handler logging
    console.error('API Error:', {
      url: config?.url,
      status: response?.status,
      message: error?.message,
    });
    
    return Promise.reject(error);
  }
);

// Helper function to generate abort controllers
export const createAbortController = () => {
  return new AbortController();
};

export default apiClient;
