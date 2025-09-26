import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './LandingPage.css';
import EventsSection from './EventsSection';
import "./events.css";
import FeaturedEvent from './FeaturedEvent';
import CategoryCarousel from './CategoryCarousel';
import { FaRegLightbulb, FaLock, FaChartLine } from "react-icons/fa";


const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  // Partner brands/organizations
  const partners = [
    'Microsoft', 'Google', 'Apple', 'Meta', 'Amazon',
    'Netflix', 'Spotify', 'Adobe', 'Salesforce'
  ];

  // Stats data
  const stats = [
    { number: '50K+', label: 'Events Created' },
    { number: '2M+', label: 'Tickets Sold' },
    { number: '500+', label: 'Cities Worldwide' },
    { number: '4.9', label: 'User Rating' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching:', { searchQuery, location, category });
  };

  return (
    <div className="landing-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
  <div className="hero-background">
    <img
      src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      alt="Event audience"
      className="hero-image"
    />
    <div className="hero-overlay"></div>
  </div>

  <div className="hero-content">
    <h1 className="hero-title">
      Discover Amazing Events
    </h1>
    <p className="hero-subtitle">
      Join millions of people discovering and creating incredible events.
    </p>

    <p className="hero-description">
      Find your next adventure or bring your vision to life.
    </p>

    <div className="search-form">
      <form onSubmit={handleSearch}>
        <div className="search-fields">
          <div className="search-field">
            <input
              type="text"
              placeholder="Event, activity, or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="search-field">
            <input
              type="text"
              placeholder="City or venue"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="search-field">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Any time</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="weekend">This weekend</option>
              <option value="week">This week</option>
            </select>
          </div>

          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>
    </div>
  </div>
</section>


      {/* Platform Statistics */}
      <section className="platform-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EventsSection />

      <FeaturedEvent/>

      
    

      {/* Create Event CTA */}
      <section className="create-event-cta">
  <div className="container">
    <div className="cta-content">
      
      {/* Text Section */}
      <div className="cta-text">
        <h2>Ready to Create Your Own Event?</h2>
        <p>
          Join thousands of event organizers who trust Uni Fest to bring their visions to life. Our powerful tools make event management simple and effective.
        </p>

        {/* Features */}
        <div className="cta-features">
          <div className="cta-feature">
            <div className="feature-icon"><FaRegLightbulb /></div>
            <span>Easy Event Setup</span>
          </div>
          <div className="cta-feature">
            <div className="feature-icon"><FaLock /></div>
            <span>Secure Payment Processing</span>
          </div>
          <div className="cta-feature">
            <div className="feature-icon"><FaChartLine /></div>
            <span>Real-time Analytics</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">Start Creating</Link>
          <Link to="/login" className="btn btn-outline">Login to Dashboard</Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="cta-image">
        <img src="/pablo-heimplatz-ZODcBkEohk8-unsplash.jpg" alt="Create Event Dashboard" />
      </div>
    </div>
  </div>
</section>


      {/* Partner Organizations */}
      <section className="partner-brands">
        <div className="container">
          <div className="section-header">
            <h2>Trusted by Leading <span className="text-primary">Organizations</span></h2>
            <p>Join thousands of companies and organizations using Uni Fest</p>
          </div>
          
          <div className="brands-grid">
            {partners.map((brand, index) => (
              <div key={index} className="brand-logo">
                <img 
                  src={`https://logo.clearbit.com/${brand.toLowerCase()}.com`} 
                  alt={`${brand} logo`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="brand-text" style={{display: 'none'}}>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Success Stories / Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Success <span className="text-primary">Stories</span></h2>
            <p>See how Uni Fest has helped organizers create amazing experiences</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star-symbol">★</span>
                  ))}
                </div>
                <p>"Uni Fest transformed how we manage our annual conference. The platform is intuitive, and our attendee engagement increased by 40%."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="John Smith" />
                <div>
                  <div className="author-name">John Smith</div>
                  <div className="author-title">Event Director, TechCorp</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star-symbol">★</span>
                  ))}
                </div>
                <p>"The analytics and reporting features gave us insights we never had before. We've sold 300% more tickets this year."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b85639c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Sarah Johnson" />
                <div>
                  <div className="author-name">Sarah Johnson</div>
                  <div className="author-title">Founder, Music Events Co.</div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star-symbol">★</span>
                  ))}
                </div>
                <p>"Setting up our first virtual conference was seamless. The support team was incredible, and our event was a huge success."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Mike Chen" />
                <div>
                  <div className="author-name">Mike Chen</div>
                  <div className="author-title">CEO, Innovation Hub</div>
                </div>
              </div>
            </div>
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
                  <input type="email" placeholder="Enter your mail" />
                  <button className="btn btn-primary">Subscribe</button>
                </div>
              </div>
              
              <div className="footer-links">
                <div className="footer-column">
                  <h4>Company</h4>
                  <Link to="/about">About</Link>
                  <Link to="/careers">Careers</Link>
                  <Link to="/contact">Contact</Link>
                </div>
                
                <div className="footer-column">
                  <h4>Support</h4>
                  <Link to="/help">Help Center</Link>
                  <Link to="/safety">Safety</Link>
                  <Link to="/guidelines">Guidelines</Link>
                </div>
                
                <div className="footer-column">
                  <h4>Legal</h4>
                  <Link to="/terms">Terms</Link>
                  <Link to="/privacy">Privacy</Link>
                  <Link to="/cookies">Cookies</Link>
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

export default LandingPage;