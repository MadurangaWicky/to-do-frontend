
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import Dashboard from '../components/Dashboard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const [authMode, setAuthMode] = useState('login');

  const handleToggleMode = () => {
    setAuthMode(prev => prev === 'login' ? 'register' : 'login');
  };


  if (loading) {
    return <LoadingSpinner />;
  }


  console.log('HomePage render - isAuthenticated:', isAuthenticated, 'user:', user, 'loading:', loading);


  if (isAuthenticated && user) {
    return <Dashboard />;
  }


  return (
    <AuthForm 
      mode={authMode}
      onToggleMode={handleToggleMode}
    />
  );
};

export default HomePage;