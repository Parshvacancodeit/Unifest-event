import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Share2, Heart, Star, ArrowLeft, Ticket } from 'lucide-react';
import { getToken } from '../../services/authService'; // if needed
import axiosInstance from '../../services/axiosInstance'; // your axios instance
import './EventDetailPage.css';
import { registerForEvent, getMyRegistrations } from '../../services/registrationService';


const API = "https://eventbooking-b888.onrender.com";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [registering, setRegistering] = useState(false);
const [registered, setRegistered] = useState(false);

useEffect(() => {
  const checkRegistration = async () => {
    if (!event) return;
    try {
      const myRegistrations = await getMyRegistrations();
      const isAlreadyRegistered = myRegistrations.some(reg => reg.event_id === event.id);
      setRegistered(isAlreadyRegistered);
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };
  checkRegistration();
}, [event]);


  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`${API}/events/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const eventData = res.data;

        // Map API fields to your frontend structure
        const mappedEvent = {
          id: eventData.id,
          title: eventData.title,
          description: eventData.description,
          longDescription: eventData.description, // API has only description
          image: eventData.image_url,
          date: eventData.date_time,
          time: new Date(eventData.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: eventData.location,
          category: eventData.event_type,
          price: eventData.fees,
          organizer: eventData.created_by, // You can map to organizer name if available
          capacity: eventData.capacity,
          attendees: eventData.volunteers?.length || 0,
          rating: 0, // Not provided by API
          reviews: 0 // Not provided by API
        };

        setEvent(mappedEvent);
      } catch (error) {
        console.error("Failed to fetch event:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleBookTicket = () => {
    alert('Booking functionality would be implemented here!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleRegister = async () => {
  if (!event) return;
  setRegistering(true);
  try {
    await registerForEvent(event.id);
    setRegistered(true);
    alert("You have successfully registered for the event!");
  } catch (error) {
    console.error("Registration failed:", error);
    alert("You have already registered or registration failed.");
  } finally {
    setRegistering(false);
  }
};


  const toggleLike = () => setIsLiked(!isLiked);

  if (loading) return (
    <div className="event-detail-loading">
      <div className="loading-spinner"></div>
      <p>Loading event details...</p>
    </div>
  );

  if (!event) return (
    <div className="event-detail-error">
      <h2>Event not found</h2>
      <button onClick={() => navigate('/events')} className="btn btn-primary">
        Back to Events
      </button>
    </div>
  );

  return (
    <div className="event-detail-page">
      {/* Header */}
      <div className="event-detail-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="header-actions">
          <button onClick={handleShare} className="action-btn">
            <Share2 size={20} />
          </button>
          <button onClick={toggleLike} className={`action-btn ${isLiked ? 'liked' : ''}`}>
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="event-hero">
        <img src={event.image} alt={event.title} className="event-hero-image" />
        <div className="event-hero-overlay">
          <div className="event-category">{event.category}</div>
        </div>
      </div>

      {/* Event Content */}
      <div className="event-content">
        <div className="event-main">
          <h1 className="event-title">{event.title}</h1>
          
          {/* Rating */}
          <div className="event-rating">
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <Star 
                  key={index} 
                  size={16} 
                  fill={index < Math.floor(event.rating) ? '#FFD700' : 'none'} 
                  color="#FFD700"
                />
              ))}
              <span className="rating-text">
                {event.rating} ({event.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Event Info */}
          <div className="event-info-grid">
            <div className="event-info-item">
              <Calendar className="info-icon" size={20} />
              <div>
                <div className="info-label">Date</div>
                <div className="info-value">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>

            <div className="event-info-item">
              <Clock className="info-icon" size={20} />
              <div>
                <div className="info-label">Time</div>
                <div className="info-value">{event.time}</div>
              </div>
            </div>

            <div className="event-info-item">
              <MapPin className="info-icon" size={20} />
              <div>
                <div className="info-label">Location</div>
                <div className="info-value">{event.location}</div>
              </div>
            </div>

            <div className="event-info-item">
              <Users className="info-icon" size={20} />
              <div>
                <div className="info-label">Attendees</div>
                <div className="info-value">{event.attendees.toLocaleString()} / {event.capacity.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="event-description">
            <h2>About This Event</h2>
            <div className="description-content">
              {event.longDescription.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Organizer */}
          <div className="event-organizer">
            <h3>Organized by</h3>
            <div className="organizer-info">
              <div className="organizer-avatar">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Organizer" />
              </div>
              <div className="organizer-details">
                <div className="organizer-name">{event.organizer}</div>
                <div className="organizer-meta">Event Organizer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="event-sidebar">
          <div className="booking-card">
            <div className="price-section">
              <div className="price">₹{event.price}</div>
              <div className="price-label">per ticket</div>
            </div>

            <div className="availability">
              <div className="availability-bar">
                <div 
                  className="availability-fill" 
                  style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                ></div>
              </div>
              <div className="availability-text">
                {event.capacity - event.attendees} tickets remaining
              </div>
            </div>

            <button
  onClick={handleRegister}
  className="btn btn-primary btn-full"
  disabled={registering || registered}
>
  {registered
    ? "You have already registered"
    : registering
    ? "Registering..."
    : "Register"}
</button>


            <div className="booking-features">
              <div className="feature">✓ Instant confirmation</div>
              <div className="feature">✓ Mobile tickets</div>
              <div className="feature">✓ Free cancellation</div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="location-map">
            <h3>Event Location</h3>
            <div className="map-placeholder">
              <MapPin size={48} />
              <p>Interactive map would be here</p>
              <div className="location-address">{event.location}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
