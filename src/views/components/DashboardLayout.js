import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  User, 
  Settings,
  LogOut,
  Menu,
  X,
  Plus
} from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: location.pathname === '/dashboard'
    },
    {
      name: 'My Events',
      href: '/dashboard/events',
      icon: Calendar,
      current: location.pathname === '/dashboard/events'
    },
    {
      name: 'Create Event',
      href: '/dashboard/create-event',
      icon: Plus,
      current: location.pathname === '/dashboard/create-event'
    },
    {
      name: 'Messages',
      href: '/dashboard/messages',
      icon: MessageSquare,
      current: location.pathname === '/dashboard/messages'
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: User,
      current: location.pathname === '/dashboard/profile'
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
            Event <span className="text-primary">Hive</span>
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
          <Link to="/login" className="nav-item">
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Top bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <button 
              className="menu-button"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>
            <h1 className="page-title">
              {navigation.find(item => item.current)?.name || 'Dashboard'}
            </h1>
          </div>
          
          <div className="top-bar-right">
            <Link to="/dashboard/create-event" className="btn btn-primary">
              <Plus size={16} />
              Create Event
            </Link>
            
            <div className="user-menu">
              <div className="user-avatar">
                <span>JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="page-content">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;