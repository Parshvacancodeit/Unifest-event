import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Plus, 
  Users, 
  LogOut,
  Menu,
  X,
  User,
  Settings
} from 'lucide-react';
import './DashboardLayout.css';
import { logout } from "../../services/authService"; // 👈 import your service


const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // inside DashboardLayout
const navigate = useNavigate();

const handleLogout = () => {
  logout();         // clear storage & tokens in one place
  navigate("/");    // redirect to login
};





  // Admin navigation (only necessary tabs for admin)
  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: location.pathname === '/dashboard'
    },
    {
      name: 'Events',
      href: '/dashboard/events',
      icon: Calendar,
      current: location.pathname === '/dashboard/events'
    },
    {
      name: 'Volunteers',
      href: '/dashboard/volunteers',
      icon: Users,
      current: location.pathname === '/dashboard/volunteers'
    },
    {
      name: 'Registrations',
      href: '/dashboard/registrations',
      icon: Users,
      current: location.pathname === '/dashboard/registrations'
    }
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-layout">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            Uni <span className="text-primary">Fest</span>
          </Link>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`nav-item ${item.current ? 'nav-item-active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
  <Link to="/dashboard/settings" className="nav-item">
    <Settings size={20} />
    <span>Settings</span>
  </Link>
  
  <button onClick={handleLogout} className="nav-item logout-btn">
    <LogOut size={20} />
    <span>Logout</span>
  </button>
</div>

      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Top bar */}
       

        {/* Page content */}
        <main className="page-content">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
