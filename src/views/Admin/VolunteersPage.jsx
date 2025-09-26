import React, { useEffect, useState } from "react";
import { getEvents } from "../../services/eventService";
import { assignVolunteer, removeVolunteer, getEventUsers } from "../../services/volunteerService";
import "./VolunteersPage.css";

export default function VolunteersPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventUsers, setEventUsers] = useState({}); // users available for assignment per event
  const [selectedUser, setSelectedUser] = useState({}); // selected user per event

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events
async function fetchEvents() {
  setLoading(true);
  try {
    const data = await getEvents();

    setEvents(data);

    // Fetch volunteers for all events initially
    data.forEach(event => fetchEventUsers(event.id));

  } catch (error) {
    console.error("Failed to fetch events:", error);
    alert("Error fetching events.");
  } finally {
    setLoading(false);
  }
}


  // Fetch users and volunteers for a specific event
  async function fetchEventUsers(eventId) {
    try {
      const { users, volunteers } = await getEventUsers(eventId);

      // Remove already assigned volunteers from dropdown
      const availableUsers = users.filter(
        u => !volunteers.some(v => v.id === u.id)
      );

      setEventUsers(prev => ({ ...prev, [eventId]: availableUsers }));

      setEvents(prev =>
        prev.map(ev => (ev.id === eventId ? { ...ev, volunteers } : ev))
      );
    } catch (error) {
      console.error("Failed to fetch event users:", error);
      alert("Error fetching users for this event.");
    }
  }

  // Assign volunteer
  async function handleAssign(eventId) {
    const studentId = selectedUser[eventId];
    if (!studentId) return alert("Please select a user to assign.");

    try {
      await assignVolunteer(eventId, studentId);

      // Update state optimistically
      const assignedUser = eventUsers[eventId].find(u => u.id === studentId);

      setEvents(prev =>
        prev.map(ev => {
          if (ev.id !== eventId) return ev;
          return {
            ...ev,
            volunteers: [...(ev.volunteers || []), assignedUser],
          };
        })
      );

      // Remove assigned user from dropdown
      setEventUsers(prev => ({
        ...prev,
        [eventId]: prev[eventId].filter(u => u.id !== studentId),
      }));

      // Clear selected user
      setSelectedUser(prev => ({ ...prev, [eventId]: "" }));

      alert("Volunteer assigned successfully!");
    } catch (error) {
      console.error("Assign error:", error);
      alert("Failed to assign volunteer.");
    }
  }

  // Remove volunteer
  async function handleRemove(eventId, studentId) {
    if (!window.confirm("Remove volunteer from this event?")) return;

    try {
      await removeVolunteer(eventId, studentId);

      // Optimistically remove from volunteers list
      setEvents(prev =>
        prev.map(ev => {
          if (ev.id !== eventId) return ev;
          return {
            ...ev,
            volunteers: ev.volunteers.filter(v => v.id !== studentId),
          };
        })
      );

      // Add removed volunteer back to dropdown
      const removedUser = await getEventUsers(eventId);
      const userToAdd = removedUser.users.find(u => u.id === studentId);
      if (userToAdd) {
        setEventUsers(prev => ({
          ...prev,
          [eventId]: [...(prev[eventId] || []), userToAdd],
        }));
      }

      alert("Volunteer removed successfully!");
    } catch (error) {
      console.error("Remove error:", error);
      alert("Failed to remove volunteer.");
    }
  }

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="volunteers-page container">
      <h1 className="volunteers-title">Volunteers Management</h1>
      <div className="volunteer-cards">
        {events.map(event => (
          <div key={event.id} className="volunteer-card">
            <h3>{event.title}</h3>

            <p>
              Volunteers:{" "}
              {event.volunteers?.length > 0
                ? event.volunteers.map(v => v.name).join(", ")
                : "None"}
              {event.volunteers?.length > 0 && ` (${event.volunteers.length})`}
            </p>

            <div className="volunteer-actions">
              {/* Assign volunteer dropdown */}
              <button
                className="assign-btn"
                onClick={() => fetchEventUsers(event.id)}
              >
                + Assign Volunteer
              </button>

              {eventUsers[event.id] && eventUsers[event.id].length > 0 && (
                <div className="dropdown-container">
                  <select
                    value={selectedUser[event.id] || ""}
                    onChange={e =>
                      setSelectedUser(prev => ({
                        ...prev,
                        [event.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select User</option>
                    {eventUsers[event.id].map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleAssign(event.id)}>Add</button>
                </div>
              )}

              {/* Remove volunteer buttons */}
              {event.volunteers?.map(v => (
                <button
                  key={v.id}
                  className="remove-btn"
                  onClick={() => handleRemove(event.id, v.id)}
                >
                  Remove {v.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
