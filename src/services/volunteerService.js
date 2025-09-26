import { getToken } from "./authService";
import axiosInstance from "./axiosInstance";

const API = "https://eventbooking-b888.onrender.com";

export async function getEventUsers(eventId) {
  const res = await axiosInstance.get(`${API}/events/${eventId}/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  
  // Ensure consistent shape
  return {
    users: res.data.users || [],
    volunteers: res.data.volunteers || []
  };
}


/**
 * Assign a volunteer to an event
 * @param {string} eventId - UUID of the event
 * @param {string} studentId - UUID of the student
 */
export async function assignVolunteer(eventId, studentId) {
  try {
    const res = await axiosInstance.post(
      `${API}/volunteers/${eventId}/${studentId}`,
      {},
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

/**
 * Remove a volunteer from an event
 * @param {string} eventId - UUID of the event
 * @param {string} studentId - UUID of the student
 */
export async function removeVolunteer(eventId, studentId) {
  try {
    const res = await axiosInstance.delete(`${API}/volunteers/${eventId}/${studentId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
