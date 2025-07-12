
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      console.log('Checking authentication status...');
      

      await authAPI.test();
      console.log('Auth test successful - user is authenticated');
      
      setIsAuthenticated(true);
      
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        console.log('User loaded from localStorage:', userData);
      }
      
    } catch (error) {
      console.log('Auth test failed - user is NOT authenticated:', error.message);
      setIsAuthenticated(false);
      setUser(null);

      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      console.log('Attempting login for:', credentials.username);
      const response = await authAPI.login(credentials);
      console.log('Login successful');
      
      setIsAuthenticated(true);
      const userData = { username: credentials.username };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return response;
    } catch (error) {
      console.log('Login failed:', error.message);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('user');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration for:', userData.username);
      const response = await authAPI.register(userData);
      console.log('Registration successful');
      
      setIsAuthenticated(true);
      const userInfo = { username: userData.username };
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      return response;
    } catch (error) {
      console.log('Registration failed:', error.message);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('user');
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting logout...');
      await authAPI.logout();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      console.log('Clearing authentication state');
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};