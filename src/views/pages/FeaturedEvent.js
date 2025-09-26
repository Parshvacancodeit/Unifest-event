import React, { useEffect, useState } from "react";
import { getEvents } from "../../services/eventService";
import { registerForEvent, getMyRegistrations } from "../../services/registrationService";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, IndianRupee, Ticket } from "lucide-react";

const FeaturedEvent = () => {
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetchFeaturedEvent();
  }, []);

  const fetchFeaturedEvent = async () => {
    try {
      const events = await getEvents();
      if (events.length > 0) {
        const randomIndex = Math.floor(Math.random() * events.length);
        const event = events[randomIndex];
        setFeaturedEvent(event);

        const myRegistrations = await getMyRegistrations();
        const isAlreadyRegistered = myRegistrations.some(
          (reg) => reg.event_id === event.id
        );
        setRegistered(isAlreadyRegistered);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleRegister = async () => {
    if (!featuredEvent) return;
    setRegistering(true);
    try {
      await registerForEvent(featuredEvent.id);
      setRegistered(true);
      alert("You have successfully registered for the event!");
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("You have already registered or registration failed.");
    } finally {
      setRegistering(false);
    }
  };

  useEffect(() => {
    if (featuredEvent?.image_url) {
      const img = new Image();
      img.src = featuredEvent.image_url;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true);
    }
  }, [featuredEvent]);

  if (!featuredEvent) return <p>Loading featured event...</p>;

  return (
    <section className="featured-events">
      <div className="container">
        <div className="section-header">
          <h2>
            Featured <span className="text-primary">Event</span>
          </h2>
        </div>

        <div className="featured-event-card">
          <div className="featured-event-image">
            {!imageLoaded && <p>Loading image...</p>}
            {imageLoaded && featuredEvent.image_url && (
              <img src={featuredEvent.image_url} alt={featuredEvent.title} />
            )}
            <div className="featured-overlay">
              <div className="featured-badge">Featured Event</div>
            </div>
          </div>

          <div className="featured-event-content">
            <h3 className="featured-event-title">{featuredEvent.title}</h3>
            <p className="featured-event-description">{featuredEvent.description}</p>

            <div className="featured-event-details-grid">
              <div className="event-detail highlight">
                <Calendar size={18} />
                <span>
                  {new Date(featuredEvent.date_time).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="event-detail highlight">
                <MapPin size={18} />
                <span>{featuredEvent.location || "TBD"}</span>
              </div>
              <div className="event-detail">
                <Users size={18} />
                <span>{featuredEvent.capacity} attendees</span>
              </div>
              <div className="event-detail">
                <IndianRupee size={18} />
                <span>{featuredEvent.fees > 0 ? `₹${featuredEvent.fees}` : "Free"}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="event-tags">
              <span className="event-tag">{featuredEvent.event_type}</span>
              {featuredEvent.tags?.map((tag, idx) => (
                <span key={idx} className="event-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="featured-event-footer">
              <Link to={`/event/${featuredEvent.id}`} className="btn">
                <Ticket size={18} /> View Details
              </Link>
              <button
                className="btn"
                onClick={handleRegister}
                disabled={registering || registered}
              >
                {registered
                  ? "You have already registered"
                  : registering
                  ? "Registering..."
                  : "Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;
