import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../services/eventService";
import { ArrowRight, Calendar, MapPin, Tag, Users, CreditCard } from "lucide-react";
import "./EventsSection.css";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const loadMore = () => setVisibleCount((prev) => prev + 4);

  const goToEventDetail = (event) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <section className="events-section">
      <h2 className="section-title">Upcoming Events</h2>
      <div className="events-grid">
        {events.slice(0, visibleCount).map((event) => (
          <div key={event.id} className="event-card">
            {event.image_url && (
              <img src={event.image_url} alt={event.title} className="event-image" />
            )}
            <div className="event-content">
              <div className="event-header">
                <h3 className="event-title">{event.title}</h3>
                <button 
                  className="event-arrow-btn" 
                  onClick={() => goToEventDetail(event)}
                  title="View Event Details"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
              <p className="event-description">{event.description}</p>
              
              <div className="event-info-grid">
  <div className="info-item calendar">
    <Calendar size={16} />
    <span>{new Date(event.date_time).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
  </div>
  <div className="info-item map">
    <MapPin size={16} /> <span>{event.location || "TBD"}</span>
  </div>
  <div className="info-item tag">
    <Tag size={16} /> <span>{event.event_type}</span>
  </div>
  <div className="info-item fees">
    <CreditCard size={16} /> <span>{event.fees > 0 ? `₹${event.fees}` : "Free"}</span>
  </div>
  <div className="info-item users">
    <Users size={16} /> <span>{event.capacity}</span>
  </div>
</div>

            </div>
          </div>
        ))}
      </div>
      {visibleCount < events.length && (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
    </section>
  );
};

export default EventsSection;
