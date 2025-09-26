import React, { useEffect, useState } from "react";
import { getEvents, getEventUsers } from "../../services/eventService";
import "./DashboardHome.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function DashboardHome() {
  const [events, setEvents] = useState([]);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselVisible = 4; // number of events visible at once

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await getEvents();
      let volunteers = 0;
      let registrations = 0;

      const eventsWithRegs = await Promise.all(
        data.map(async (event) => {
          const usersData = await getEventUsers(event.id);
          volunteers += usersData.volunteers?.length || 0;
          registrations += usersData.total_count || 0;
          return { ...event, totalRegistrations: usersData.total_count };
        })
      );

      const sortedEvents = eventsWithRegs.sort(
        (a, b) => new Date(a.date_time) - new Date(b.date_time)
      );

      setEvents(sortedEvents);
      setTotalVolunteers(volunteers);
      setTotalRegistrations(registrations);
      setUpcomingEvents(sortedEvents.slice(0, 5));
    } catch (err) {
      console.error(err);
      alert("Failed to fetch dashboard data");
    }
  }

  // Carousel handlers
  const handleNext = () => {
    setCarouselIndex((prev) =>
      Math.min(prev + 1, events.length - carouselVisible)
    );
  };
  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="dashboard-home container-full">
      <h1 className="dashboard-title mb-6">Dashboard Overview</h1>

      {/* Full-width Stats Card */}
      <div className="stats-card mb-6">
        <div className="stat-item">
          <h4>Total Events</h4>
          <p>{events.length}</p>
        </div>
        <div className="stat-item">
          <h4>Total Volunteers</h4>
          <p>{totalVolunteers}</p>
        </div>
        <div className="stat-item">
          <h4>Total Registrations</h4>
          <p>{totalRegistrations}</p>
        </div>
      </div>

      {/* Upcoming Events Timeline */}
      <h2 className="section-title mb-4">Upcoming Events</h2>
      <div className="timeline mb-6">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>{event.title}</h4>
              <p className="text-muted">
                {new Date(event.date_time).toLocaleDateString()}
              </p>
              <p className="text-muted">{event.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* All Events Carousel */}
      <h2 className="section-title mb-4">All Events</h2>
      <div className="carousel-container">
        {carouselIndex > 0 && (
          <button className="carousel-btn left" onClick={handlePrev}>
            <FaChevronLeft />
          </button>
        )}
        <div className="carousel">
          {events
            .slice(carouselIndex, carouselIndex + carouselVisible)
            .map((event) => (
              <div key={event.id} className="event-card">
                <img
                  src={event.image_url || "/placeholder.jpg"}
                  alt={event.title}
                />
                <div className="event-info">
                  <h4>{event.title}</h4>
                  <p className="text-muted">
                    {new Date(event.date_time).toLocaleDateString()}
                  </p>
                  <p className="text-muted">{event.event_type}</p>
                  <p className="text-muted">
                    Registrations: {event.totalRegistrations}
                  </p>
                </div>
              </div>
            ))}
        </div>
        {carouselIndex + carouselVisible < events.length && (
          <button className="carousel-btn right" onClick={handleNext}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
