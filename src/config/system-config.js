export const SYSTEM_CONFIG = {
  BASE_API_URL: import.meta.env.VITE_BASE_API_URL || "http://localhost:3000",
  BASE_CLIENT_URL: import.meta.env.VITE_BASE_CLIENT_URL || "http://localhost:5173",
  // Flag to indicate if we're using a mock API
  USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API === 'true' || false
};

export default SYSTEM_CONFIG;