import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientRegistration from './pages/PatientRegistration';
import DoctorPrescription from './pages/DoctorPrescription';
import Pharmacy from './pages/Pharmacy';
import UserManagement from './pages/UserManagement';
import './App.css';

// Create a RoleBasedRedirect component
const RoleBasedRedirect = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Redirect based on role
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
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Root path redirects based on role */}
            <Route path="/" element={
              <PrivateRoute>
                <RoleBasedRedirect />
              </PrivateRoute>
            } />
            
            {/* Dashboard - accessible to all except receptionists */}
            <Route path="/dashboard" element={
              <PrivateRoute allowedRoles={['doctor', 'pharmacist', 'admin']}>
                <Dashboard />
              </PrivateRoute>
            } />
            
            <Route path="/register-patient" element={
              <PrivateRoute allowedRoles={['receptionist', 'admin']}>
                <PatientRegistration />
              </PrivateRoute>
            } />
            
            <Route path="/prescription" element={
              <PrivateRoute allowedRoles={['doctor', 'admin']}>
                <DoctorPrescription />
              </PrivateRoute>
            } />
            
            <Route path="/pharmacy" element={
              <PrivateRoute allowedRoles={['pharmacist', 'admin']}>
                <Pharmacy />
              </PrivateRoute>
            } />
            
            <Route path="/manage-users" element={
              <PrivateRoute allowedRoles={['admin']}>
                <UserManagement />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;