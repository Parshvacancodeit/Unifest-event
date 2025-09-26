import React, { useEffect, useState } from "react";
import { getEvents, getEventUsers } from "../../services/eventService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./RegistrationsPage.css";

export default function RegistrationsPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const data = await getEvents();

      const eventsWithUsers = await Promise.all(
        data.map(async (event) => {
          try {
            const usersData = await getEventUsers(event.id);
            return {
              ...event,
              totalRegistrations: usersData.total_count,
              users: usersData.users,
              volunteers: usersData.volunteers,
            };
          } catch (err) {
            console.error(err);
            return { ...event, totalRegistrations: 0, users: [], volunteers: [] };
          }
        })
      );

      setEvents(eventsWithUsers);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch events");
    }
  }

  // Export selected event data to Excel
  const exportToExcel = (event) => {
    const worksheetData = event.users.map((user) => ({
      Name: user.name,
      Email: user.email,
      Department: user.department,
      Year: user.year,
      Role: user.role,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    XLSX.writeFile(workbook, `${event.title}_Registrations.xlsx`);
  };

  return (
    <div className="registrations-page container">
      <h1 className="registrations-title">Registrations Overview</h1>

      <div className="event-cards-grid">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card"
            onClick={() =>
              setSelectedEvent(selectedEvent?.id === event.id ? null : event)
            }
          >
            <h3>{event.title}</h3>
            <p>Total Registrations: {event.totalRegistrations}</p>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="modal-backdrop" onClick={() => setSelectedEvent(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedEvent.title} - Registrations</h2>
            <button
              className="btn btn-primary"
              onClick={() => exportToExcel(selectedEvent)}
            >
              Download Excel
            </button>
            <div className="table-container">
              <table className="registrations-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEvent.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.department}</td>
                      <td>{user.year}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
