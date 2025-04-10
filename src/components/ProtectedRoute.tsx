
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  requireAuth = false // Set to false by default
}) => {
  const { user, profile, loading, hasRole } = useAuth();
  
  // Wait for authentication loading
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  // Check if user is authenticated
  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Check if user has the required role
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
