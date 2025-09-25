import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import pages
import LandingPage from './views/pages/LandingPage';
import AboutPage from './views/pages/AboutPage';
import ContactPage from './views/pages/ContactPage';
import LoginPage from './views/pages/LoginPage';
import RegisterPage from './views/pages/RegisterPage';
import DashboardPage from './views/pages/DashboardPage';
import EventsPage from './views/pages/EventsPage';
import EventDetailPage from './views/pages/EventDetailPage';
import EventRegistrationPage from './views/pages/EventRegistrationPage';
import CreateEventPage from './views/pages/CreateEventPage';
import MessagesPage from './views/pages/MessagesPage';
import ProfilePage from './views/pages/ProfilePage';
import VolunteerManagementPage from './views/pages/VolunteerManagementPage';
import NotFoundPage from './views/pages/NotFoundPage';
import DashboardLayout from './views/components/DashboardLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/event/:id/register" element={<EventRegistrationPage />} />
          
          {/* Protected routes - Dashboard with layout */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="create-event" element={<CreateEventPage />} />
            <Route path="volunteer-management/:id" element={<VolunteerManagementPage />} />
          </Route>
          
          {/* Redirect /home to dashboard */}
          <Route path="/home" element={<Navigate to="/dashboard" replace />} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
