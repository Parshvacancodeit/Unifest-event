import axiosInstance from "./axiosInstance";
const API = "https://eventbooking-b888.onrender.com"; // replace with your backend URL

// Sign Up
export async function signUp(userData) {
  const res = await axiosInstance.post(`${API}/sign-up`, userData);
  return res.data;
}

// Sign In
export async function signIn({ email, password, role }) {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await axiosInstance.post(`${API}/login?role=${role}`, formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  // Save token
  localStorage.setItem("token", res.data.access_token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data;
}

// Logout
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Get token
export function getToken() {
  return localStorage.getItem("token");
}

// Get logged in user
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}
