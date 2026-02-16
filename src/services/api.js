import axios from 'axios';
import { appConfig } from './config';
import { logger } from './logger';

const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  logger.info('API request', { url: config.url, method: config.method });
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    logger.error('API error', { url: error?.config?.url, status: error?.response?.status });
    return Promise.reject(error);
  },
);

export default api;
