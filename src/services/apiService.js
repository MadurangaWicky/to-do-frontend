
import axios from 'axios';
import API_CONFIG from '../config/apiConfig';


const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);

    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {

        console.log('Unauthorized access');
      }
      

      return Promise.reject({
        status,
        message: data?.message || 'An error occurred',
        code: data?.code || null,
        data
      });
    } else if (error.request) {
   
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your connection.',
        code: null
      });
    } else {
  
      return Promise.reject({
        status: 0,
        message: error.message || 'An unexpected error occurred',
        code: null
      });
    }
  }
);


export const authAPI = {
  register: async (userData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.USER.REGISTER, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.USER.LOGIN, credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post(API_CONFIG.ENDPOINTS.USER.LOGOUT);
    return response.data;
  },

  updateUser: async (userData) => {
    const response = await api.put(API_CONFIG.ENDPOINTS.USER.UPDATE, userData);
    return response.data;
  },

  deleteUser: async () => {
    const response = await api.delete(API_CONFIG.ENDPOINTS.USER.DELETE);
    return response.data;
  },

  updateCardLimit: async (limit) => {
    const response = await api.put(`${API_CONFIG.ENDPOINTS.USER.CARD_LIMIT}/${limit}`);
    return response.data;
  },

  test: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.USER.TEST);
    return response.data;
  },

  getUserInfo: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.USER.INFO);
    return response.data;
  }
};


export const taskAPI = {
  createTask: async (taskData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.TASKS.CREATE, taskData);
    return response.data;
  },

  getAllTasks: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.TASKS.GET_ALL);
    return response.data;
  },

  updateTask: async (taskId, taskData) => {
    const response = await api.put(`${API_CONFIG.ENDPOINTS.TASKS.UPDATE}/${taskId}`, taskData);
    return response.data;
  },

  deleteTask: async (taskId) => {
    const response = await api.delete(`${API_CONFIG.ENDPOINTS.TASKS.DELETE}/${taskId}`);
    return response.data;
  }
};

export default api;