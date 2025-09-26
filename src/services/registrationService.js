
import { getToken } from "./authService";
import axiosInstance from "./axiosInstance";

const API = "https://eventbooking-b888.onrender.com";

// Register for event (Student only)
export async function registerForEvent(eventId) {
  const res = await axiosInstance.post(
    `${API}/registrations/`,
    { event_id: eventId },
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );
  return res.data;
}

// Unregister from event
export async function unregisterFromEvent(eventId) {
  await axiosInstance.delete(`${API}/registrations/${eventId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return true;
}

// Get my registrations
export async function getMyRegistrations() {
  const res = await axiosInstance.get(`${API}/registrations/`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
}
