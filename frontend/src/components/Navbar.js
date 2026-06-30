import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Custom SVG Icons (same as before)
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const PatientIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PrescriptionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const PharmacyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <path d="m14 9-4 6h8l-4-6Z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const getRoleBasedMenu = () => {
    const commonMenu = [
      // { label: '', path: '/', icon: <HomeIcon /> },
    ];

    switch(user.role) {
      case 'receptionist':
        return [
          ...commonMenu,
          { label: 'Register Patient', path: '/register-patient', icon: <PatientIcon /> },
        ];
      case 'doctor':
        return [
          ...commonMenu,
          { label: 'Write Prescription', path: '/prescription', icon: <PrescriptionIcon /> },
        ];
      case 'pharmacist':
        return [
          ...commonMenu,
          { label: 'Pharmacy', path: '/pharmacy', icon: <PharmacyIcon /> },
        ];
      case 'admin':
        return [
          ...commonMenu,
          { label: 'Register Patient', path: '/register-patient', icon: <PatientIcon /> },
          { label: 'Write Prescription', path: '/prescription', icon: <PrescriptionIcon /> },
          { label: 'Pharmacy', path: '/pharmacy', icon: <PharmacyIcon /> },
          { label: 'Manage Users', path: '/manage-users', icon: <UsersIcon /> },
        ];
      default:
        return commonMenu;
    }
  };

  const menuItems = getRoleBasedMenu();

  const getUserRoleLabel = (role) => {
    const labels = {
      'receptionist': 'Receptionist',
      'doctor': 'Doctor',
      'pharmacist': 'Pharmacist',
      'admin': 'Administrator'
    };
    return labels[role] || role;
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="navbar-container">
          {/* Brand Section with Image Logo */}
          <div className="navbar-brand">
            <div className="brand-logo">
              {/* Replace with your actual image logo path */}
              <div className="logo-image-container">
                <img 
                  src="/logo.png" // Change this to your logo path
                  alt="YPH Hospital Logo"
                  className="logo-image"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback text logo */}
                <div className="fallback-logo">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 6v12" />
                    <path d="M17 9v6" />
                    <path d="M7 9v6" />
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 12h18" />
                  </svg>
                  <div className="brand-text">
                    <span className="brand-primary">YPH</span>
                    <span className="brand-secondary">HOSPITAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-desktop">
            <div className="nav-menu">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="nav-link"
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="user-section">
              <div className="user-info">
                <div className="user-avatar">
                  {user.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <div className="user-name">{user.full_name}</div>
                  <div className="user-role">{getUserRoleLabel(user.role)}</div>
                </div>
              </div>
              <button 
                className="logout-button"
                onClick={handleLogout}
              >
                <LogoutIcon />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`navbar-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-user-info">
            <div className="user-avatar">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <div className="user-name">{user.full_name}</div>
              <div className="user-role">{getUserRoleLabel(user.role)}</div>
            </div>
          </div>

          <div className="mobile-nav-menu">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="mobile-nav-link"
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                <span className="mobile-nav-label">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mobile-actions">
            <button 
              className="mobile-logout-button"
              onClick={handleLogout}
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind navbar */}
      <div className="navbar-spacer" />

      <style jsx>{`
        .navbar {
          background: #000000;
          color: #ffffff;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .navbar.scrolled {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        /* Spacer to push content down below navbar */
        .navbar-spacer {
          height: 70px; /* Same as navbar height */
          width: 100%;
        }

        @media (max-width: 768px) {
          .navbar-spacer {
            height: 64px; /* Adjusted for mobile */
          }
        }

        @media (max-width: 480px) {
          .navbar-spacer {
            height: 60px; /* Adjusted for small mobile */
          }
        }

        @media (max-width: 360px) {
          .navbar-spacer {
            height: 56px; /* Adjusted for extra small mobile */
          }
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          height: 70px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Brand Section with Image Logo */
        .navbar-brand {
          display: flex;
          align-items: center;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-image-container {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 40px;
        }

        .logo-image {
          height: 40px;
          width: auto;
          object-fit: contain;
          border-radius: 4px;
        }

        .fallback-logo {
          display: none; /* Hidden by default, shown if image fails */
          align-items: center;
          gap: 12px;
        }

        .fallback-logo svg {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 8px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .brand-primary {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.5px;
        }

        .brand-secondary {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 1px;
        }

        /* Desktop Navigation */
        .navbar-desktop {
          display: flex;
          align-items: center;
          gap: 40px;
          flex: 1;
          justify-content: space-between;
          margin-left: 40px;
        }

        @media (max-width: 1024px) {
          .navbar-desktop {
            display: none;
          }
        }

        .nav-menu {
          display: flex;
          gap: 8px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: transparent;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-label {
          white-space: nowrap;
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          color: #ffffff;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          white-space: nowrap;
        }

        .user-role {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .logout-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Mobile Menu Toggle */
        .mobile-menu-toggle {
          display: none;
          background: transparent;
          border: none;
          padding: 8px;
          cursor: pointer;
          color: #ffffff;
        }

        @media (max-width: 1024px) {
          .mobile-menu-toggle {
            display: block;
          }
        }

        /* Mobile Navigation */
        .navbar-mobile {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          background: #000000;
          padding: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar-mobile.open {
          max-height: calc(100vh - 70px);
          padding: 20px 0;
        }

        .mobile-user-info {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 20px;
        }

        .mobile-nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 24px;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: transparent;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          width: 100%;
        }

        .mobile-nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .mobile-nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
        }

        .mobile-nav-label {
          flex: 1;
        }

        .mobile-actions {
          padding: 20px 24px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 20px;
        }

        .mobile-logout-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .mobile-logout-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 16px;
            height: 64px;
          }

          .navbar-mobile {
            top: 64px;
          }

          .navbar-mobile.open {
            max-height: calc(100vh - 64px);
          }

          .logo-image {
            height: 36px;
          }

          .fallback-logo svg {
            width: 36px;
            height: 36px;
          }

          .brand-primary {
            font-size: 16px;
          }

          .brand-secondary {
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 0 12px;
            height: 60px;
          }

          .navbar-mobile {
            top: 60px;
          }

          .navbar-mobile.open {
            max-height: calc(100vh - 60px);
          }

          .logo-image {
            height: 32px;
          }

          .fallback-logo {
            gap: 8px;
          }

          .fallback-logo svg {
            width: 32px;
            height: 32px;
          }

          .brand-primary {
            font-size: 14px;
          }

          .brand-secondary {
            font-size: 10px;
            letter-spacing: 0.5px;
          }

          .mobile-user-info,
          .mobile-nav-menu,
          .mobile-actions {
            padding: 0 16px;
          }

          .mobile-nav-link {
            padding: 12px 14px;
            font-size: 15px;
          }

          .mobile-logout-button {
            padding: 12px;
            font-size: 15px;
          }
        }

        @media (max-width: 360px) {
          .navbar-container {
            padding: 0 10px;
            height: 56px;
          }

          .navbar-mobile {
            top: 56px;
          }

          .navbar-mobile.open {
            max-height: calc(100vh - 56px);
          }

          .logo-image {
            height: 28px;
          }

          .fallback-logo {
            gap: 6px;
          }

          .fallback-logo svg {
            width: 28px;
            height: 28px;
          }

          .brand-text {
            display: none;
          }
        }

        /* Active Link Style */
        .nav-link.active,
        .mobile-nav-link.active {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          font-weight: 600;
        }

        /* Animation for mobile menu */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar-mobile.open .mobile-nav-link {
          animation: slideDown 0.3s ease forwards;
        }

        .navbar-mobile.open .mobile-nav-link:nth-child(1) { animation-delay: 0.1s; }
        .navbar-mobile.open .mobile-nav-link:nth-child(2) { animation-delay: 0.15s; }
        .navbar-mobile.open .mobile-nav-link:nth-child(3) { animation-delay: 0.2s; }
        .navbar-mobile.open .mobile-nav-link:nth-child(4) { animation-delay: 0.25s; }
        .navbar-mobile.open .mobile-nav-link:nth-child(5) { animation-delay: 0.3s; }
      `}</style>
    </>
  );
};

export default Navbar;