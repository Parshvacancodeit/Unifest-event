import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '/Users/parshvapatel/Event-Management-System/src/App.css';

// Public pages
import LandingPage from "./views/pages/LandingPage";
import AboutPage from "./views/pages/AboutPage";
import ContactPage from "./views/pages/ContactPage";
import EventsPage from "./views/pages/EventsPage";
import EventDetailPage from "./views/pages/EventDetailPage";
import EventRegistrationPage from "./views/pages/EventRegistrationPage";
import LoginPage from "./views/pages/LoginPage";
import RegisterPage from "./views/pages/RegisterPage";
import NotFoundPage from "./views/pages/NotFoundPage";

// Admin Dashboard
import DashboardLayout from "./views/components/DashboardLayout";
import DashboardHome from "./views/Admin/DashboardHome";
import AdminEventsPage from "./views/Admin/AdminEventsPage";
import VolunteersPage from "./views/Admin/VolunteersPage";
import RegistrationsPage from "./views/Admin/RegistrationsPage";
import MyRegisteredEvents from "./views/pages/MyRegisteredEvents";

// ProtectedRoute
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* ---------------- PUBLIC ROUTES ---------------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/my-events" element={<MyRegisteredEvents />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/event/:id/register" element={<EventRegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ---------------- ADMIN DASHBOARD ROUTES ---------------- */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="events" element={<AdminEventsPage />} />
          <Route path="volunteers" element={<VolunteersPage />} />
          <Route path="registrations" element={<RegistrationsPage />} />
        </Route>

        {/* ---------------- 404 PAGE ---------------- */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
