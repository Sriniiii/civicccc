import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { session, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }
  
  const isAdmin = user?.role === 'authority' || user?.role === 'ngo';

  if (!isAdmin) {
    // Redirect non-admin users to the dashboard
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
