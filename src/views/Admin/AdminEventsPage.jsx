import React, { useEffect, useState } from "react";
import { getEvents, createEvent, updateEvent, deleteEvent, getEventUsers } from "../../services/eventService";
import "./AdminEventsPage.css";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    capacity: 0,
    location: "",
    eventType: "",
    fee: 0,
    imageFile: null
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events with total registrations
  async function fetchEvents() {
    try {
      const data = await getEvents();
      const eventsWithRegistrations = await Promise.all(
        data.map(async (event) => {
          try {
            const usersData = await getEventUsers(event.id);
            return { ...event, totalRegistrations: usersData.total_count };
          } catch (err) {
            console.error(`Failed to fetch users for event ${event.id}`, err);
            return { ...event, totalRegistrations: 0 };
          }
        })
      );
      setEvents(eventsWithRegistrations);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch events");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Open modal for creating a new event
  const handleOpenCreateModal = () => {
    setEditingEventId(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      capacity: 0,
      location: "",
      eventType: "",
      fee: 0,
      imageFile: null
    });
    setModalOpen(true);
  };

  // Open modal for editing an event
  const handleEdit = (event) => {
    setEditingEventId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date_time.split("T")[0],
      time: event.date_time.split("T")[1]?.substring(0, 5) || "",
      capacity: event.capacity,
      location: event.location,
      eventType: event.event_type,
      fee: event.fees,
      imageFile: null
    });
    setModalOpen(true);
  };

  // Create or update event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updates = {
        title: formData.title,
        description: formData.description,
        date_time: new Date(`${formData.date}T${formData.time}`).toISOString(),
        location: formData.location,
        capacity: parseInt(formData.capacity),
        event_type: formData.eventType,
        fees: parseFloat(formData.fee)
      };

      const payload = new FormData();
      payload.append("event_data", JSON.stringify(updates));

      if (formData.imageFile) payload.append("file", formData.imageFile);

      if (editingEventId) {
        await updateEvent(editingEventId, { ...updates, imageFile: formData.imageFile });
        setEditingEventId(null);
      } else {
        await createEvent(payload);
      }

      setModalOpen(false);
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        capacity: 0,
        location: "",
        eventType: "",
        fee: 0,
        imageFile: null
      });

      fetchEvents();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to submit event");
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        setEvents((prev) => prev.filter((e) => e.id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete event");
      }
    }
  };

  return (
    <div className="admin-events-page container">
      <div className="events-header">
        <h1>Events Management</h1>
        <button className="btn btn-primary" onClick={handleOpenCreateModal}>+ Create Event</button>
      </div>

      {/* Events Grid */}
      <div className="events-grid">
        {events.map((e) => (
          <div className="event-card" key={e.id}>
            <div className="event-card-header">
              <h3>{e.title}</h3>
              <button className="btn btn-outline" onClick={() => handleEdit(e)}>Edit</button>
              <button className="btn btn-outline" onClick={() => handleDelete(e.id)}>Delete</button>
            </div>
            <p className="event-description">{e.description}</p>
            <div className="event-details">
              <div><strong>Date & Time:</strong> {new Date(e.date_time).toLocaleString()}</div>
              <div><strong>Location:</strong> {e.location}</div>
              <div><strong>Capacity:</strong> {e.capacity}</div>
              <div><strong>Type:</strong> {e.event_type}</div>
              <div><strong>Fee:</strong> ₹{e.fees}</div>
              <div><strong>Volunteers:</strong> {e.volunteers?.length || 0}</div>
              <div><strong>Total Registrations:</strong> {e.totalRegistrations}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Create/Edit Event */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal modal-grid">
            <h2>{editingEventId ? "Update Event" : "Create Event"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
                <input name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} required />
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
                <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleInputChange} required />
                <input name="eventType" placeholder="Event Type" value={formData.eventType} onChange={handleInputChange} required />
                <input type="number" name="fee" placeholder="Event Fee" value={formData.fee} onChange={handleInputChange} />
                <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })} />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">{editingEventId ? "Update" : "Create"}</button>
                <button type="button" className="btn btn-outline" onClick={() => {
                  setModalOpen(false);
                  setEditingEventId(null);
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
