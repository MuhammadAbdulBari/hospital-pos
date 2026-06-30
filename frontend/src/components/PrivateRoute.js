import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh'
      }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if user has access to this route
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect based on role if access denied
    switch(user.role) {
      case 'receptionist':
        return <Navigate to="/register-patient" />;
      case 'doctor':
        return <Navigate to="/prescription" />;
      case 'pharmacist':
        return <Navigate to="/pharmacy" />;
      case 'admin':
        return <Navigate to="/dashboard" />;
      default:
        return <Navigate to="/dashboard" />;
    }
  }

  return children;
};

export default PrivateRoute;