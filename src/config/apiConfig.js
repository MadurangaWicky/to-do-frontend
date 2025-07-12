
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  ENDPOINTS: {
    USER: {
      REGISTER: '/api/user/registration',
      LOGIN: '/api/user/login',
      LOGOUT: '/api/user/logout',
      UPDATE: '/api/user/update',
      DELETE: '/api/user/delete',
      CARD_LIMIT: '/api/user/card-limit',
      TEST: '/api/user/test',
      INFO: '/api/user/info'
    },
    TASKS: {
    }
  }
};

export default API_CONFIG;