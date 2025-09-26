import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { getCurrentUser, logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);   // 👈 track logged-in user
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [location]); 
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

    const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

 
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'My Events', href: '/my-events' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
  <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
    <div className="container">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="logo">
          Uni <span className="text-primary">Fest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-menu desktop-nav">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.href} 
              className={`nav-link ${location.pathname === link.href ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="header-actions desktop-actions">
          {user ? (
            <>
              <span className="user-name">Hi, {user.name || user.email}</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.href} 
                className={`mobile-nav-link ${location.pathname === link.href ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mobile-nav-actions">
            {user ? (
              <>
                <span className="user-name">Hi, {user.name || user.email}</span>
                <button className="btn btn-outline mobile-btn" onClick={handleLogout}>
                  Logout
                </button>
                <Link to="/dashboard" className="btn btn-secondary mobile-btn">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline mobile-btn">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary mobile-btn">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  </header>
);

};

export default Header;
