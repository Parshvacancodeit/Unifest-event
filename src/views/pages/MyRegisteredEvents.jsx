import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRegistrations } from "../../services/registrationService";
import { getEvents } from "../../services/eventService";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./EventsSection.css";
import Slider from "react-slick";
import Header from "../components/Header";

const MyRegisteredEvents = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortOrder, setSortOrder] = useState("latest"); // latest or oldest
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegisteredEvents();
  }, [sortOrder]);

  const fetchRegisteredEvents = async () => {
    try {
      const myRegistrations = await getMyRegistrations(); // [{event_id, ...}]
      const allEvents = await getEvents(); // [{id, title, date_time, ...}]

      // Map registered events by matching event_id
      let registeredEvents = myRegistrations
        .map((reg) => allEvents.find((e) => e.id === reg.event_id))
        .filter(Boolean); // remove nulls

      // Sort events
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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <Header />

      <div className="container mt-6">
        <h2 className="section-title">My Registered Events</h2>

        <div className="sort-filter-container" style={{ marginBottom: "2rem" }}>
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
          <Slider {...carouselSettings}>
            {events
              .filter((e) => e && new Date(e.date_time) > new Date())
              .map((event) => (
                <div key={event.id} className="category-card">
                  <div className="category-icon">
                    {event.image_url && <img src={event.image_url} alt={event.title} />}
                  </div>
                  <h3 className="category-name">{event.title}</h3>
                  <p className="category-count">
                    {new Date(event.date_time).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default MyRegisteredEvents;
