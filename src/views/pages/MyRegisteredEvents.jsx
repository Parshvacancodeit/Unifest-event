import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRegistrations } from "../../services/registrationService";
import { getEvents } from "../../services/eventService";
import { AiOutlineArrowRight } from "react-icons/ai";
import Header from "../components/Header";
import "./MyRegisteredEvents.css"; // new CSS

const MyRegisteredEvents = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortOrder, setSortOrder] = useState("latest");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegisteredEvents();
  }, [sortOrder]);

  const fetchRegisteredEvents = async () => {
    try {
      const myRegistrations = await getMyRegistrations();
      const allEvents = await getEvents();

      let registeredEvents = myRegistrations
        .map((reg) => allEvents.find((e) => e.id === reg.event_id))
        .filter(Boolean);

      if (sortOrder === "latest") {
        registeredEvents.sort(
          (a, b) => new Date(b.date_time) - new Date(a.date_time)
        );
      } else {
        registeredEvents.sort(
          (a, b) => new Date(a.date_time) - new Date(b.date_time)
        );
      }

      setEvents(registeredEvents);
      setRegistrations(myRegistrations);
    } catch (error) {
      console.error("Error fetching registered events:", error);
    }
  };

  const loadMore = () => setVisibleCount((prev) => prev + 4);

  const goToEventDetail = (event) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  // Filter upcoming events
  const upcomingEvents = events.filter(
    (e) => e && new Date(e.date_time) > new Date()
  );

  return (
    <>
      <Header />

      <div className="container">
        <h2 className="section-title">My Registered Events</h2>

        <div className="sort-filter-container">
          <button
            className="btn btn-outline"
            onClick={() =>
              setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"))
            }
          >
            Sort by {sortOrder === "latest" ? "Oldest" : "Latest"}
          </button>
        </div>

        <div className="events-grid">
          {events.slice(0, visibleCount).map((event) => (
            <div key={event.id} className="event-cards">
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="event-card-image"
                />
              )}
              <div className="event-card-content">
                <div className="event-card-header">
                  <h3 className="event-card-title">{event.title}</h3>
                  <div className="event-card-price">
                    {event.fees > 0 ? `₹${event.fees}` : "Free"}
                  </div>
                </div>

                <div className="event-card-details">
                  <div className="event-card-date">
                    {new Date(event.date_time).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="event-card-location">
                    {event.location || "TBD"}
                  </div>
                  <div className="event-card-description">
                    {event.description || "No description available."}
                  </div>
                  <div className="event-card-capacity">
                    Capacity: {event.capacity || "Unlimited"}
                  </div>
                  <div className="event-card-volunteers">
                    Volunteers: {event.volunteers?.length || 0}
                  </div>
                  <div className="event-card-type">
                    <span className="category-badge">{event.event_type}</span>
                  </div>
                </div>

                <button
                  className="event-arrow-btn"
                  onClick={() => goToEventDetail(event)}
                  title="View Event Details"
                >
                  <AiOutlineArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < events.length && (
          <button className="load-more-btn btn btn-primary" onClick={loadMore}>
            Load More
          </button>
        )}

        <div className="mt-12">
          <h2 className="section-title">Upcoming Events Around You</h2>

          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-card">
                {event.image_url && (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="event-card-image"
                  />
                )}
                <div className="event-card-content">
                  <div className="event-card-header">
                    <h3 className="event-card-title">{event.title}</h3>
                    <div className="event-card-price">
                      {event.fees > 0 ? `₹${event.fees}` : "Free"}
                    </div>
                  </div>

                  <div className="event-card-details">
                    <div className="event-card-date">
                      {new Date(event.date_time).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="event-card-location">
                      {event.location || "TBD"}
                    </div>
                    <div className="event-card-description">
                      {event.description || "No description available."}
                    </div>
                    <div className="event-card-capacity">
                      Capacity: {event.capacity || "Unlimited"}
                    </div>
                    <div className="event-card-volunteers">
                      Volunteers: {event.volunteers?.length || 0}
                    </div>
                    <div className="event-card-type">
                      <span className="category-badge">{event.event_type}</span>
                    </div>
                  </div>

                  <button
                    className="event-arrow-btn"
                    onClick={() => goToEventDetail(event)}
                    title="View Event Details"
                  >
                    <AiOutlineArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRegisteredEvents;
