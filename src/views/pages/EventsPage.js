import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, ChevronDown } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import './EventsPage.css';

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Summer Music Festival 2024',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80',
      date: 'Saturday, July 15, 6:00PM',
      location: 'Central Park, NYC',
      price: '$89.99',
      category: 'PAID',
      type: 'offline'
    },
    {
      id: 2,
      title: 'Tech Innovation Summit 2024',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80',
      date: 'Monday, August 20, 9:00AM',
      location: 'Silicon Valley, CA',
      price: '$149.99',
      category: 'PAID',
      type: 'offline'
    },
    {
      id: 3,
      title: 'Digital Marketing Masterclass 2025',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80',
      date: 'Monday, Oct 28, 6:00PM',
      location: 'Online Event',
      price: 'FREE',
      category: 'FREE',
      type: 'online'
    },
    {
      id: 4,
      title: 'Startup Pitch Competition 2025',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80',
      date: 'Tuesday, Nov 5, 2:00PM',
      location: 'Innovation Hub, Bangalore',
      price: '₹2,000',
      category: 'PAID',
      type: 'offline'
    },
    {
      id: 5,
      title: 'AI & Machine Learning Conference',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80',
      date: 'Wednesday, Nov 12, 9:00AM',
      location: 'Tech Park, Chennai',
      price: '₹5,500',
      category: 'PAID',
      type: 'offline'
    },
    {
      id: 6,
      title: 'Creative Design Workshop',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80',
      date: 'Thursday, Nov 18, 4:00PM',
      location: 'Design Studio, Pune',
      price: '₹3,500',
      category: 'PAID',
      type: 'offline'
    },
    {
      id: 7,
      title: 'E-commerce Growth Strategies',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80',
      date: 'Friday, Nov 25, 5:30PM',
      location: 'Online Event',
      price: 'FREE',
      category: 'FREE',
      type: 'online'
    },
    {
      id: 8,
      title: 'Full Stack Development Bootcamp',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80',
      date: 'Saturday, Dec 2, 9:00AM',
      location: 'Tech Center, Hyderabad',
      price: '₹4,500',
      category: 'PAID',
      type: 'offline'
    },
    {
      id: 9,
      title: 'Social Media Marketing Workshop',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80',
      date: 'Sunday, Dec 10, 6:30PM',
      location: 'Online Event',
      price: 'FREE',
      category: 'FREE',
      type: 'online'
    }
  ];

  const stats = {
    totalEvents: '2k+',
    totalEventsHosted: '100+',
    description: 'Total Events Hosted',
    subtitle: 'Total Events Live'
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || 
                           (selectedCategory === 'free' && event.category === 'FREE') ||
                           (selectedCategory === 'paid' && event.category === 'PAID');
    const matchesType = selectedEventType === '' || event.type === selectedEventType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="events-page">
        {/* Hero Section */}
        <section className="events-hero">
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-subtitle">Thinking About Event Expectations</p>
              <h1 className="hero-title">
                Event<span className="text-primary">Hive</span>-ing<br />
                the Best.Day.<br />
                Ever.
              </h1>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">{stats.totalEvents}</div>
                  <div className="stat-label">{stats.description}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.totalEventsHosted}</div>
                  <div className="stat-label">{stats.subtitle}</div>
                </div>
              </div>
            </div>
            
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Event crowd" />
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="filters-section">
          <div className="filters-header">
            <h2>Events <span className="text-primary">around you</span></h2>
            
            <div className="filters-controls">
              <div className="filter-group">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Categories</option>
                  <option value="free">Free Events</option>
                  <option value="paid">Paid Events</option>
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>
              
              <div className="filter-group">
                <select 
                  value={selectedEventType}
                  onChange={(e) => setSelectedEventType(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Event type</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>
              
              <div className="filter-group">
                <select className="filter-select">
                  <option value="">Any category</option>
                  <option value="business">Business</option>
                  <option value="technology">Technology</option>
                  <option value="arts">Arts & Culture</option>
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>
        </section>

        {/* Events Grid */}
        <section className="events-grid-section">
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <Link to={`/event/${event.id}`} key={event.id} className="event-card">
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <span className={`event-category ${event.category.toLowerCase()}`}>
                    {event.category}
                  </span>
                </div>
                
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  
                  <div className="event-details">
                    <div className="event-date">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="event-location">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="event-price">
                      {event.price}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default EventsPage;