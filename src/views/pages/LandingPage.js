import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './LandingPage.css';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  // Featured events data
  const featuredEvents = [
    {
      id: 1,
      title: 'Global Music Festival 2025',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      date: '2025-10-15',
      time: '18:00',
      location: 'Madison Square Garden, NYC',
      price: 89.99,
      originalPrice: 120.00,
      category: 'Music',
      attendees: 15250,
      organizer: 'Global Events Productions',
      rating: 4.8,
      description: 'Experience the biggest music festival of the year featuring top international artists.',
      tags: ['Popular', 'Trending'],
      isFeatured: true
    },
    {
      id: 2,
      title: 'Tech Innovation Conference 2025',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      date: '2025-10-28',
      time: '09:00',
      location: 'Silicon Valley Convention Center',
      price: 199.99,
      originalPrice: 249.99,
      category: 'Technology',
      attendees: 3850,
      organizer: 'Innovation Hub SF',
      rating: 4.9,
      description: 'Join industry leaders and innovators discussing the future of technology.',
      tags: ['Professional', 'Networking'],
      isFeatured: true
    },
    {
      id: 3,
      title: 'Digital Marketing Summit',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      date: '2025-11-05',
      time: '14:00',
      location: 'Virtual Event',
      price: 0,
      originalPrice: 99.99,
      category: 'Business',
      attendees: 8500,
      organizer: 'Digital Marketing Alliance',
      rating: 4.7,
      description: 'Master the latest digital marketing strategies from industry experts.',
      tags: ['Free', 'Online'],
      isFeatured: true
    },
    {
      id: 4,
      title: 'Contemporary Art Exhibition',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      date: '2025-11-12',
      time: '11:00',
      location: 'Metropolitan Museum of Art',
      price: 35.00,
      originalPrice: 45.00,
      category: 'Arts & Culture',
      attendees: 1250,
      organizer: 'Metropolitan Arts Society',
      rating: 4.6,
      description: 'Explore cutting-edge contemporary art from emerging and established artists.',
      tags: ['Cultural', 'Exhibition'],
      isFeatured: false
    },
    {
      id: 5,
      title: 'Startup Pitch Competition',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      date: '2025-11-18',
      time: '18:30',
      location: 'Innovation District, Boston',
      price: 50.00,
      originalPrice: 75.00,
      category: 'Business',
      attendees: 850,
      organizer: 'Startup Accelerator Network',
      rating: 4.5,
      description: 'Watch promising startups pitch to top investors and industry experts.',
      tags: ['Competition', 'Entrepreneurship'],
      isFeatured: false
    },
    {
      id: 6,
      title: 'Gourmet Food & Wine Festival',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      date: '2025-11-25',
      time: '19:00',
      location: 'Napa Valley, California',
      price: 125.00,
      originalPrice: 150.00,
      category: 'Food & Drink',
      attendees: 680,
      organizer: 'Culinary Experiences Inc.',
      rating: 4.9,
      description: 'Indulge in exquisite cuisine and premium wines from renowned chefs and vintners.',
      tags: ['Premium', 'Luxury'],
      isFeatured: false
    }
  ];



  // Event categories
  const categories = [
    { name: 'Music', icon: '🎵', count: 245 },
    { name: 'Technology', icon: '💻', count: 189 },
    { name: 'Business', icon: '💼', count: 156 },
    { name: 'Arts & Culture', icon: '🎨', count: 98 },
    { name: 'Food & Drink', icon: '🍷', count: 112 },
    { name: 'Sports', icon: '⚽', count: 87 },
    { name: 'Health', icon: '🏥', count: 76 },
    { name: 'Education', icon: '📚', count: 134 }
  ];

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
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Event audience" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Amazing Events<br />
              <span className="hero-subtitle">Create, Manage & Attend</span>
            </h1>
            
            <p className="hero-description">
              Join millions of people discovering and creating incredible events. 
              Find your next adventure or bring your vision to life.
            </p>
            
            <div className="search-form">
              <form onSubmit={handleSearch}>
                <div className="search-fields">
                  <div className="search-field">
                    <label>Looking for</label>
                    <input
                      type="text"
                      placeholder="Event, activity, or keyword"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="search-field">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="City or venue"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  
                  <div className="search-field">
                    <label>When</label>
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
                    Search Events
                  </button>
                </div>
              </form>
            </div>
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

      {/* Featured Events */}
      <section className="featured-events">
        <div className="container">
          <div className="section-header">
            <div className="section-title">
              <h2>Featured <span className="text-primary">Events</span></h2>
              <p>Discover the most popular and trending events happening near you</p>
            </div>
            <div className="section-actions">
              <div className="category-filters">
                {categories.slice(0, 5).map((cat, index) => (
                  <button key={index} className="category-btn">
                    <span className="category-icon">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
              <Link to="/events" className="view-all-btn">
                View All →
              </Link>
            </div>
          </div>
          
          <div className="events-showcase">
            {/* Featured Event Hero */}
            <div className="featured-event-hero">
              <div className="featured-event-card">
                <div className="featured-event-image">
                  <img src={featuredEvents[0].image} alt={featuredEvents[0].title} />
                  <div className="featured-overlay">
                    <div className="featured-badge">Featured Event</div>
                    <div className="featured-rating">
                      <span className="star-symbol">★</span>
                      <span>{featuredEvents[0].rating}</span>
                    </div>
                  </div>
                </div>
                <div className="featured-event-content">
                  <div className="featured-event-meta">
                    <span className="event-category music">{featuredEvents[0].category}</span>
                    <div className="event-tags">
                      {featuredEvents[0].tags.map((tag, i) => (
                        <span key={i} className="event-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="featured-event-title">{featuredEvents[0].title}</h3>
                  <p className="featured-event-description">{featuredEvents[0].description}</p>
                  
                  <div className="featured-event-details">
                    <div className="event-detail">
                      <span className="detail-icon">📅</span>
                      <div>
                        <span className="detail-label">Date & Time</span>
                        <span className="detail-value">
                          {new Date(featuredEvents[0].date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}, {featuredEvents[0].time}
                        </span>
                      </div>
                    </div>
                    <div className="event-detail">
                      <span className="detail-icon">📍</span>
                      <div>
                        <span className="detail-label">Location</span>
                        <span className="detail-value">{featuredEvents[0].location}</span>
                      </div>
                    </div>
                    <div className="event-detail">
                      <span className="detail-icon">👥</span>
                      <div>
                        <span className="detail-label">Attendees</span>
                        <span className="detail-value">{featuredEvents[0].attendees.toLocaleString()}+ going</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="featured-event-footer">
                    <div className="event-price">
                      {featuredEvents[0].price === 0 ? (
                        <span className="price-free">FREE</span>
                      ) : (
                        <div className="price-info">
                          <span className="current-price">${featuredEvents[0].price}</span>
                          {featuredEvents[0].originalPrice > featuredEvents[0].price && (
                            <span className="original-price">${featuredEvents[0].originalPrice}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="event-actions">
                      <Link to={`/event/${featuredEvents[0].id}`} className="btn btn-primary">
                        <span className="ticket-icon">🎫</span>
                        Get Tickets
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Featured Events Grid */}
            <div className="events-grid">
              {featuredEvents.slice(1, 6).map((event) => (
                <Link to={`/event/${event.id}`} key={event.id} className="event-card">
                  <div className="event-card-image">
                    <img src={event.image} alt={event.title} loading="lazy" />
                    <div className="event-card-overlay">
                      <div className="event-badges">
                        <span className={`category-badge ${event.category.toLowerCase().replace(/\s+/g, '-')}`}>
                          {event.category}
                        </span>
                        {event.price === 0 && (
                          <span className="free-badge">FREE</span>
                        )}
                        {event.isFeatured && (
                          <span className="featured-badge">Featured</span>
                        )}
                      </div>
                      <div className="event-rating">
                        <span className="star-symbol">★</span>
                        <span>{event.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="event-card-content">
                    <div className="event-card-header">
                      <h3 className="event-card-title">{event.title}</h3>
                      <div className="event-card-price">
                        {event.price === 0 ? (
                          <span className="price-free">FREE</span>
                        ) : (
                          <div className="price-display">
                            <span className="current-price">${event.price}</span>
                            {event.originalPrice > event.price && (
                              <span className="original-price">${event.originalPrice}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="event-card-details">
                      <div className="event-card-date">
                        <span className="time-icon">🕐</span>
                        <span>
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}, {event.time}
                        </span>
                      </div>
                      
                      <div className="event-card-location">
                        <span className="location-icon">📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="event-card-footer">
                      <div className="event-organizer">
                        <span>by {event.organizer}</span>
                      </div>
                      <div className="event-attendees">
                        <span className="users-icon">👥</span>
                        <span>{event.attendees.toLocaleString()}+</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="event-categories">
        <div className="container">
          <div className="section-header">
            <h2>Explore by <span className="text-primary">Category</span></h2>
            <p>Find events that match your interests and passions</p>
          </div>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link to={`/events?category=${category.name.toLowerCase()}`} key={index} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.count} events</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Create Event CTA */}
      <section className="create-event-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Ready to Create Your Own Event?</h2>
              <p>Join thousands of event organizers who trust Event Hive to bring their visions to life. Our powerful tools make event management simple and effective.</p>
              <div className="cta-features">
                <div className="cta-feature">
                  <div className="feature-icon">🎯</div>
                  <span>Easy Event Setup</span>
                </div>
                <div className="cta-feature">
                  <div className="feature-icon">💳</div>
                  <span>Secure Payment Processing</span>
                </div>
                <div className="cta-feature">
                  <div className="feature-icon">📊</div>
                  <span>Real-time Analytics</span>
                </div>
              </div>
              <div className="cta-buttons">
                <Link to="/register" className="btn btn-primary">
                  Start Creating
                </Link>
                <Link to="/login" className="btn btn-outline">
                  Login to Dashboard
                </Link>
              </div>
            </div>
            
            <div className="cta-image">
              <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Create Event Dashboard" />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="partner-brands">
        <div className="container">
          <div className="section-header">
            <h2>Trusted by Leading <span className="text-primary">Organizations</span></h2>
            <p>Join thousands of companies and organizations using Event Hive</p>
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
            <p>See how Event Hive has helped organizers create amazing experiences</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star-symbol">★</span>
                  ))}
                </div>
                <p>"Event Hive transformed how we manage our annual conference. The platform is intuitive, and our attendee engagement increased by 40%."</p>
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
              <p>© 2023 Event Hive. All rights reserved.</p>
              <p>Non Copyrighted © 2023 Upload by rich technologies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;