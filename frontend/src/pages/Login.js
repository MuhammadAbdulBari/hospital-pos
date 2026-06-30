import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// Custom Minimalist SVG Icons
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2.42 12.71a.94.94 0 0 1 0-1.42C4.1 9.23 7.5 6 12 6s7.9 3.23 9.58 5.29a.94.94 0 0 1 0 1.42C19.9 14.77 16.5 18 12 18s-7.9-3.23-9.58-5.29Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.73 5.08A10.1 10.1 0 0 1 12 5c3.5 0 6.9 2.23 9.58 5.29.37.45.56 1.01.56 1.71 0 .7-.19 1.26-.56 1.71a13.2 13.2 0 0 1-2.16 2.14" />
    <path d="M6.52 6.52a10 10 0 0 0-2.1 2.77C2.42 12.71 2 13.27 2 14c0 .73.42 1.29 1.42 2.71C5.1 18.77 8.5 21 12 21c1.4 0 2.75-.23 4-.65" />
    <path d="m2 2 20 20" />
  </svg>
);

const HospitalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 6v12" />
    <path d="M17 9v6" />
    <path d="M7 9v6" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 12h18" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [activePanel, setActivePanel] = useState('form');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://localhost/backend/api/auth.php',
        { email: trimmedEmail, password: trimmedPassword },
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
      );

      console.log('Server response:', response.data);

      if (response.data.success) {
        login(response.data.user);
        navigate('/');
      } else {
        setError(response.data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Axios error:', err);
      if (err.response) {
        setError(err.response.data?.message || 'Authentication failed.');
      } else if (err.request) {
        setError('Unable to connect to server. Please check your network.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Geometric Background Pattern */}
      <div className="geometric-pattern" />
      
      {/* Main Container */}
      <div className="login-container">
        {/* Left Panel - Branding */}
        <div className="brand-panel">
          <div className="brand-header">
            <div className="brand-logo">
              <HospitalIcon />
              <h1 className="brand-name">
   Yasin Psychiatric Hospital

              </h1>
            </div>
            <p className="brand-tagline">Advanced Patient Management System</p>
          </div>

          <div className="brand-features">
            <div className="feature-item">
              <div className="feature-icon">▢</div>
              <div className="feature-text">
                <h4>Secure Access</h4>
                <p>End-to-end encrypted portal</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">▢</div>
              <div className="feature-text">
                <h4>HIPAA Compliant</h4>
                <p>Patient data protection</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">▢</div>
              <div className="feature-text">
                <h4>24/7 Access</h4>
                <p>Always available for staff</p>
              </div>
            </div>
          </div>

          <div className="brand-footer">
            <div className="security-badge">
              <ShieldIcon />
              <span>Secure Connection • Encrypted</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="form-panel">
          <div className="form-container">
            <div className="form-header">
              <h2>Professional Access</h2>
              <p>Sign in to your medical dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className={`input-group ${isFocused.email ? 'focused' : ''}`}>
                <label className="input-label">
                  <MailIcon />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused({ ...isFocused, email: true })}
                  onBlur={() => setIsFocused({ ...isFocused, email: false })}
                  placeholder="example@gmail.com"
                  required
                />
                <div className="input-line" />
              </div>

              <div className={`input-group ${isFocused.password ? 'focused' : ''}`}>
                <label className="input-label">
                  <LockIcon />
                  <span>Password</span>
                </label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused({ ...isFocused, password: true })}
                    onBlur={() => setIsFocused({ ...isFocused, password: false })}
                    placeholder="••••••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                <div className="input-line" />
              </div>

              {error && (
                <div className="error-container">
                  <div className="error-icon">!</div>
                  <p className="error-message">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className={`submit-button ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="button-spinner" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              <div className="form-footer">
                <div className="security-note">
                  <ShieldIcon />
                  <span>Protected healthcare information system</span>
                </div>
                <p className="assistance-text">
                  For technical assistance, contact IT support
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #000000;
        }

        .geometric-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(0, 0, 0, 0.02) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(0, 0, 0, 0.02) 0%, transparent 20%);
          pointer-events: none;
        }

        .login-container {
          display: flex;
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Brand Panel */
        .brand-panel {
          flex: 0 0 40%;
          background: #000000;
          color: #ffffff;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .brand-header {
          margin-bottom: 60px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .brand-name {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .brand-name span {
          color: #999999;
          font-weight: 400;
          display: block;
        }

        .brand-tagline {
          color: #cccccc;
          font-size: 16px;
          line-height: 1.5;
          max-width: 300px;
        }

        .brand-features {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .feature-icon {
          font-size: 24px;
          color: #ffffff;
          margin-top: 2px;
        }

        .feature-text h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #ffffff;
        }

        .feature-text p {
          font-size: 14px;
          color: #999999;
          line-height: 1.4;
        }

        .brand-footer {
          margin-top: 60px;
        }

        .security-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #666666;
        }

        /* Form Panel */
        .form-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: #ffffff;
        }

        .form-container {
          width: 100%;
          max-width: 420px;
        }

        .form-header {
          margin-bottom: 48px;
        }

        .form-header h2 {
          font-size: 32px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .form-header p {
          color: #666666;
          font-size: 16px;
        }

        /* Form Elements */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .input-group {
          position: relative;
        }

        .input-group.focused .input-label {
          color: #000000;
        }

        .input-group.focused .input-line {
          transform: scaleX(1);
          background: #000000;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #666666;
          margin-bottom: 8px;
          transition: color 0.2s ease;
        }

        .input-label svg {
          opacity: 0.6;
        }

        .input-group.focused .input-label svg {
          opacity: 1;
        }

        .form-input {
          width: 100%;
          padding: 16px 0;
          font-size: 16px;
          background: transparent;
          border: none;
          color: #000000;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
        }

        .form-input::placeholder {
          color: #999999;
        }

        .password-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
          color: #666666;
          transition: color 0.2s ease;
        }

        .password-toggle:hover {
          color: #000000;
        }

        .password-toggle svg {
          display: block;
        }

        .input-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: #e5e5e5;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .input-group::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: #e5e5e5;
        }

        /* Error State */
        .error-container {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .error-icon {
          width: 20px;
          height: 20px;
          background: #000000;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          flex-shrink: 0;
        }

        .error-message {
          color: #000000;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
        }

        /* Submit Button */
        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 18px;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          background: #000000;
          border: 2px solid #000000;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 8px;
        }

        .submit-button:hover:not(:disabled) {
          background: #333333;
          border-color: #333333;
          transform: translateY(-1px);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-button.loading {
          background: #333333;
        }

        .button-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Form Footer */
        .form-footer {
          margin-top: 20px;
          padding-top: 24px;
          border-top: 1px solid #f0f0f0;
        }

        .security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: #666666;
          text-align: center;
          margin-bottom: 12px;
        }

        .assistance-text {
          font-size: 12px;
          color: #999999;
          text-align: center;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .login-container {
            flex-direction: column;
          }

          .brand-panel {
            flex: none;
            padding: 40px;
            min-height: auto;
          }

          .form-panel {
            padding: 60px 40px;
          }

          .brand-features {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 24px;
          }

          .feature-item {
            flex: 1;
            min-width: 200px;
          }
        }

        @media (max-width: 768px) {
          .brand-panel {
            padding: 32px 24px;
          }

          .form-panel {
            padding: 40px 24px;
          }

          .form-header h2 {
            font-size: 28px;
          }

          .form-header p {
            font-size: 15px;
          }

          .brand-name {
            font-size: 20px;
          }

          .brand-features {
            flex-direction: column;
          }

          .feature-item {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .brand-panel {
            padding: 24px 20px;
          }

          .form-panel {
            padding: 32px 20px;
          }

          .form-header {
            margin-bottom: 32px;
          }

          .form-header h2 {
            font-size: 24px;
          }

          .login-form {
            gap: 24px;
          }

          .submit-button {
            padding: 16px;
            font-size: 15px;
          }

          .form-input {
            font-size: 15px;
          }

          .input-label {
            font-size: 13px;
          }

          .brand-tagline {
            font-size: 14px;
          }
        }

        @media (max-width: 360px) {
          .brand-panel {
            padding: 20px 16px;
          }

          .form-panel {
            padding: 24px 16px;
          }

          .brand-logo {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .form-header h2 {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
