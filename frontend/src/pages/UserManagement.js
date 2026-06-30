import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

// Custom SVG Icons
const AddUserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8v6" />
    <path d="M22 11h-6" />
  </svg>
);

const DoctorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
    <path d="M12 17v.01" />
    <path d="M12 7v4" />
    <path d="M10 9h4" />
  </svg>
);

const ReceptionistIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M19 13h6" />
    <path d="M22 10v6" />
  </svg>
);

const PharmacistIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v20" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const AdminIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'doctor'
  });
  const [formErrors, setFormErrors] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://localhost/backend/api/users.php');
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    
    if (!formData.full_name) errors.full_name = 'Full name is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setActionLoading(true);
    
    try {
      const response = await axios.post('https://localhost/backend/api/users.php', formData);
      
      if (response.data.success) {
        fetchUsers();
        setFormData({ email: '', password: '', full_name: '', role: 'doctor' });
        setShowAddForm(false);
        setFormErrors({});
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setFormErrors({ submit: 'Failed to create user. Email might already exist.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    setActionLoading(true);
    
    try {
      const response = await axios.delete('https://localhost/backend/api/users.php', {
        data: { id: userId }
      });
      
      if (response.data.success) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    } finally {
      setActionLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'doctor': return <DoctorIcon />;
      case 'receptionist': return <ReceptionistIcon />;
      case 'pharmacist': return <PharmacistIcon />;
      case 'admin': return <AdminIcon />;
      default: return <DoctorIcon />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleLabel = (role) => {
    const labels = {
      'doctor': 'Doctor',
      'receptionist': 'Receptionist',
      'pharmacist': 'Pharmacist',
      'admin': 'Administrator'
    };
    return labels[role] || role;
  };

  return (
    <div className="user-management-page">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="user-management-wrapper">
          {/* Header Section */}
          <div className="management-header">
            <div className="header-content">
              <h1 className="page-title">User Management</h1>
              <p className="page-subtitle">
                Manage healthcare staff accounts and permissions
              </p>
            </div>
            
            <button 
              className="add-user-button"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <AddUserIcon />
              <span>{showAddForm ? 'Cancel' : 'Add New User'}</span>
            </button>
          </div>

          {/* Add User Form */}
          {showAddForm && (
            <div className="form-card">
              <div className="form-header">
                <h3>Create New Staff Account</h3>
                <p>Fill in the details to create a new user account</p>
              </div>
              
              <form onSubmit={handleSubmit} className="user-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <span>Full Name *</span>
                      {formErrors.full_name && <span className="error-text">{formErrors.full_name}</span>}
                    </label>
                    <input
                      type="text"
                      className={`form-input ${formErrors.full_name ? 'error' : ''}`}
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span>Email Address *</span>
                      {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                    </label>
                    <input
                      type="email"
                      className={`form-input ${formErrors.email ? 'error' : ''}`}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <span>Password *</span>
                      {formErrors.password && <span className="error-text">{formErrors.password}</span>}
                    </label>
                    <input
                      type="password"
                      className={`form-input ${formErrors.password ? 'error' : ''}`}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Enter password"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Role *</label>
                    <select
                      className="form-input"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="doctor">Doctor</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                </div>

                {formErrors.submit && (
                  <div className="error-message">
                    {formErrors.submit}
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <SpinnerIcon />
                        <span>Creating...</span>
                      </>
                    ) : 'Create Account'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Filters */}
          <div className="filters-section">
            <div className="search-container">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <button 
                className={`filter-button ${filterRole === 'all' ? 'active' : ''}`}
                onClick={() => setFilterRole('all')}
              >
                All Users
              </button>
              <button 
                className={`filter-button ${filterRole === 'doctor' ? 'active' : ''}`}
                onClick={() => setFilterRole('doctor')}
              >
                Doctors
              </button>
              <button 
                className={`filter-button ${filterRole === 'receptionist' ? 'active' : ''}`}
                onClick={() => setFilterRole('receptionist')}
              >
                Receptionists
              </button>
              <button 
                className={`filter-button ${filterRole === 'pharmacist' ? 'active' : ''}`}
                onClick={() => setFilterRole('pharmacist')}
              >
                Pharmacists
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="users-table-card">
            <div className="table-header">
              <h3>Staff Directory</h3>
              <span className="user-count">{filteredUsers.length} users</span>
            </div>
            
            {loading ? (
              <div className="loading-state">
                <div className="spinner">
                  <SpinnerIcon />
                </div>
                <p>Loading users...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="empty-state">
                <p>No users found</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((userItem) => (
                      <tr key={userItem.id}>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar">
                              {userItem.full_name.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-details">
                              <div className="user-name">{userItem.full_name}</div>
                              <div className="user-email">{userItem.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="role-badge">
                            {getRoleIcon(userItem.role)}
                            <span>{getRoleLabel(userItem.role)}</span>
                          </div>
                        </td>
                        <td>
                          <div className={`status-badge ${userItem.status}`}>
                            {userItem.status === 'active' ? 'Active' : 'Inactive'}
                          </div>
                        </td>
                        <td>
                          <div className="date-cell">
                            {new Date(userItem.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td>
                          <button 
                            className="delete-button"
                            onClick={() => handleDelete(userItem.id)}
                            disabled={actionLoading || userItem.role === 'admin'}
                            title={userItem.role === 'admin' ? 'Cannot delete admin accounts' : 'Delete user'}
                          >
                            <DeleteIcon />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Guidelines */}
          <div className="guidelines-card">
            <h3>Management Guidelines</h3>
            <div className="guidelines-list">
              <div className="guideline-item">
                <div className="guideline-number">01</div>
                <div className="guideline-text">
                  <strong>Access Control</strong>
                  <p>Assign roles based on job responsibilities and minimum required access.</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-number">02</div>
                <div className="guideline-text">
                  <strong>Password Security</strong>
                  <p>Require strong passwords and enable two-factor authentication when possible.</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-number">03</div>
                <div className="guideline-text">
                  <strong>Regular Audits</strong>
                  <p>Review user access quarterly and deactivate unused accounts promptly.</p>
                </div>
              </div>
              <div className="guideline-item">
                <div className="guideline-number">04</div>
                <div className="guideline-text">
                  <strong>Data Protection</strong>
                  <p>All accounts must comply with HIPAA and patient privacy regulations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .user-management-page {
          min-height: 100vh;
          background: #f8f9fa;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #000000;
        }

        .dashboard-container {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .user-management-wrapper {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Header */
        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 32px 0;
          border-bottom: 1px solid #e5e5e5;
        }

        .header-content {
          flex: 1;
        }

        .page-title {
          font-size: 32px;
          font-weight: 700;
          color: #000000;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }

        .page-subtitle {
          font-size: 16px;
          color: #666666;
          margin: 0;
        }

        .add-user-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .add-user-button:hover {
          background: #333333;
          transform: translateY(-1px);
        }

        /* Form Card */
        .form-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .form-header {
          margin-bottom: 32px;
        }

        .form-header h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 8px 0;
        }

        .form-header p {
          color: #666666;
          margin: 0;
          font-size: 14px;
        }

        .user-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 500;
          color: #000000;
        }

        .error-text {
          color: #dc3545;
          font-size: 12px;
        }

        .form-input {
          padding: 12px 16px;
          font-size: 14px;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          background: #ffffff;
          color: #000000;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #000000;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
        }

        .form-input.error {
          border-color: #dc3545;
        }

        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 40px;
        }

        .error-message {
          padding: 12px 16px;
          background: rgba(220, 53, 69, 0.05);
          border: 1px solid rgba(220, 53, 69, 0.2);
          border-radius: 8px;
          color: #dc3545;
          font-size: 14px;
        }

        .form-actions {
          display: flex;
          justify-content: center;
          margin-top: 16px;
        }

        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 200px;
        }

        .submit-button:hover:not(:disabled) {
          background: #333333;
          transform: translateY(-1px);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-button svg {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Filters */
        .filters-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          padding: 24px 0;
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          color: #000000;
          background: transparent;
        }

        .search-input::placeholder {
          color: #999999;
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-button {
          padding: 8px 16px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          color: #666666;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-button:hover {
          border-color: #000000;
          color: #000000;
        }

        .filter-button.active {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
        }

        /* Users Table */
        .users-table-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e5e5;
        }

        .table-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin: 0;
        }

        .user-count {
          font-size: 12px;
          color: #666666;
          background: #f5f5f5;
          padding: 4px 12px;
          border-radius: 12px;
        }

        .loading-state, .empty-state {
          padding: 60px 24px;
          text-align: center;
          color: #666666;
        }

        .spinner {
          display: inline-block;
          margin-bottom: 16px;
        }

        .spinner svg {
          animation: spin 1s linear infinite;
        }

        .table-container {
          overflow-x: auto;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
        }

        .users-table th {
          text-align: left;
          padding: 16px 24px;
          font-size: 12px;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e5e5e5;
          background: #fafafa;
        }

        .users-table td {
          padding: 16px 24px;
          border-bottom: 1px solid #f0f0f0;
        }

        .users-table tr:last-child td {
          border-bottom: none;
        }

        .users-table tr:hover {
          background: #fafafa;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #000000;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .user-name {
          font-weight: 500;
          color: #000000;
        }

        .user-email {
          font-size: 12px;
          color: #666666;
        }

        .role-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: #f5f5f5;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          color: #000000;
          width: fit-content;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          width: fit-content;
        }

        .status-badge.active {
          background: rgba(0, 0, 0, 0.05);
          color: #000000;
        }

        .status-badge.inactive {
          background: rgba(102, 102, 102, 0.05);
          color: #666666;
        }

        .date-cell {
          font-size: 14px;
          color: #000000;
        }

        .delete-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: transparent;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          color: #666666;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .delete-button:hover:not(:disabled) {
          background: rgba(220, 53, 69, 0.05);
          border-color: #dc3545;
          color: #dc3545;
        }

        .delete-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Guidelines */
        .guidelines-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e5e5;
        }

        .guidelines-card h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 24px 0;
        }

        .guidelines-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .guideline-item {
          display: flex;
          gap: 16px;
        }

        .guideline-number {
          font-size: 24px;
          font-weight: 700;
          color: #e5e5e5;
          line-height: 1;
        }

        .guideline-text {
          flex: 1;
        }

        .guideline-text strong {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 4px;
        }

        .guideline-text p {
          font-size: 13px;
          color: #666666;
          margin: 0;
          line-height: 1.5;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .dashboard-container {
            padding: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }

          .search-container {
            max-width: none;
          }

          .filter-buttons {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .management-header {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .page-title {
            font-size: 24px;
          }

          .add-user-button {
            width: 100%;
            justify-content: center;
          }

          .form-card,
          .users-table-card,
          .guidelines-card {
            padding: 20px;
          }

          .table-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .user-count {
            align-self: flex-start;
          }

          .users-table th,
          .users-table td {
            padding: 12px 16px;
          }

          .guidelines-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .dashboard-container {
            padding: 16px;
          }

          .management-header {
            padding: 24px 0;
          }

          .page-title {
            font-size: 20px;
          }

          .form-grid {
            gap: 16px;
          }

          .form-input {
            padding: 10px 14px;
            font-size: 13px;
          }

          .filter-buttons {
            overflow-x: auto;
            padding-bottom: 8px;
          }

          .filter-button {
            white-space: nowrap;
          }

          .user-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .user-avatar {
            width: 32px;
            height: 32px;
            font-size: 12px;
          }

          .delete-button span {
            display: none;
          }

          .delete-button {
            padding: 6px;
          }
        }

        @media (max-width: 360px) {
          .dashboard-container {
            padding: 12px;
          }

          .form-card,
          .users-table-card,
          .guidelines-card {
            padding: 16px;
          }

          .table-header,
          .users-table th,
          .users-table td {
            padding: 10px 12px;
          }

          .role-badge span {
            display: none;
          }

          .role-badge {
            padding: 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserManagement;
