
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <img src="/voli-logo.png" alt="VOLI" className="h-16 mb-8" />
        <div className="h-8 w-8 border-4 border-voli-primary border-t-transparent rounded-full animate-spin ml-4"></div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/welcome" />;
  }
  
  return <Navigate to="/login" />;
};

export default Index;
