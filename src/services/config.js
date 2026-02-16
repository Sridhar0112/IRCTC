const env = import.meta.env;

export const appConfig = {
  apiBaseUrl: env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  wsUrl: env.VITE_WS_URL || 'ws://localhost:8080/ws/seats',
  envName: env.MODE,
  enableBundleAnalyzer: env.VITE_BUNDLE_ANALYZE === 'true',
  buildVersion: env.VITE_BUILD_VERSION || 'dev',
};
