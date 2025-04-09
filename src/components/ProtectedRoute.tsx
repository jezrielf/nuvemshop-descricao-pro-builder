
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
  requireAuth = true 
}) => {
  const { user, profile, loading, hasRole } = useAuth();
  
  // Aguarda o carregamento da autenticação
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  // Verifica se o usuário está autenticado
  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Verifica se o usuário tem a role necessária
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
