import { getToken } from "./authService";
import axiosInstance from "./axiosInstance";

const API = "https://eventbooking-b888.onrender.com";

// -----------------------------
// Get all events
// -----------------------------
export async function getEvents() {
  const res = await axiosInstance.get(`${API}/events/all-events/`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
}

// -----------------------------
// Create event (Admin only)
// -----------------------------
export async function createEvent(eventData) {
  const res = await axiosInstance.post(`${API}/events/`, eventData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      // DO NOT set "Content-Type": "multipart/form-data"
      // Axios will automatically set correct boundary
    },
  });
  return res.data;
}


// -----------------------------
// Update event (Admin only)
// -----------------------------
export async function updateEvent(eventId, updates) {
  // updates shape:
  // {
  //   title?, description?, date_time?, location?,
  //   capacity?, event_type?, fees?, imageFile?
  // }

  const formData = new FormData();
  const { imageFile, ...updateFields } = updates;

  formData.append("updates", JSON.stringify(updateFields));
  if (imageFile) {
    formData.append("file", imageFile);
  }

  const res = await axiosInstance.put(`${API}/events/${eventId}`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

// -----------------------------
// Delete event (Admin only)
// -----------------------------
export async function deleteEvent(eventId) {
  await axiosInstance.delete(`${API}/events/${eventId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return true;
}

// -----------------------------
// Get Event Users
// -----------------------------
export async function getEventUsers(eventId) {
  const res = await axiosInstance.get(`${API}/events/${eventId}/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data; // returns { total_count, users, volunteers }
}
