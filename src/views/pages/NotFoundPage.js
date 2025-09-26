import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              Event <span className="text-primary">Hive</span>
            </Link>
            
            <div className="header-actions">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Signup</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="error-content">
            <div className="error-illustration" role="img" aria-label="404 error illustration with animated character">
              <div className="error-number" aria-hidden="true">4</div>
              <div className="error-character" aria-hidden="true">
                <div className="character-face">
                  <div className="eye left-eye"></div>
                  <div className="eye right-eye"></div>
                  <div className="mouth"></div>
                </div>
                <div className="character-body"></div>
                <div className="character-person">
                  <div className="person-head"></div>
                  <div className="person-body"></div>
                  <div className="person-arms">
                    <div className="arm left-arm"></div>
                    <div className="arm right-arm"></div>
                  </div>
                  <div className="person-legs">
                    <div className="leg left-leg"></div>
                    <div className="leg right-leg"></div>
                  </div>
                </div>
              </div>
              <div className="error-number" aria-hidden="true">4</div>
              
              {/* Decorative elements */}
              <div className="decoration decoration-1" aria-hidden="true"></div>
              <div className="decoration decoration-2" aria-hidden="true"></div>
              <div className="decoration decoration-3" aria-hidden="true"></div>
            </div>
            
            <h1 className="error-title">Oops!</h1>
            <p className="error-message">
              We can't seem to find the page you are looking for
            </p>
            
            <Link to="/" className="btn btn-primary back-home-btn">
              Back to Homepage
            </Link>
          </div>
        </div>
      </main>

      {/* Social Media */}
      <section className="social-section">
        <div className="container">
          <p className="social-title">Follow us on</p>
          <div className="social-links">
            <a href="https://instagram.com/unifestr" className="social-link instagram" aria-label="Follow us on Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://facebook.com/unifestr" className="social-link facebook" aria-label="Follow us on Facebook">
              <Facebook size={24} />
            </a>
            <a href="https://linkedin.com/company/unifestr" className="social-link linkedin" aria-label="Follow us on LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="https://twitter.com/unifestr" className="social-link twitter" aria-label="Follow us on Twitter">
              <Twitter size={24} />
            </a>
            <a href="https://youtube.com/unifestr" className="social-link youtube" aria-label="Follow us on YouTube">
              <Youtube size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <Link to="/" className="footer-logo">
                  Event <span className="text-primary">Hive</span>
                </Link>
                
                <div className="newsletter">
                  <input 
                    type="email" 
                    placeholder="Enter your mail" 
                    aria-label="Email address for newsletter subscription"
                  />
                  <button className="btn btn-primary" aria-label="Subscribe to newsletter">
                    Subscribe
                  </button>
                </div>
              </div>
              
              <div className="footer-links">
                <div className="footer-column">
                  <h4>Company</h4>
                  <Link to="/home">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/services">Services</Link>
                  <Link to="/contact">Get in touch</Link>
                  <Link to="/faq">FAQs</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <p>© 2023 Uni Fest. All rights reserved.</p>
              <p>Non Copyrighted © 2023 Upload by rich technologies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;