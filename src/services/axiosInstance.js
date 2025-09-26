// src/services/axiosInstance.js
import axios from "axios";
import { getToken, logout } from "./authService";

const API = "https://eventbooking-b888.onrender.com";

const axiosInstance = axios.create({
  baseURL: API,
});

// Attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired/invalid token


export default axiosInstance;
