import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

// Import components
import App from '../App';
import LandingPage from '../views/pages/LandingPage';
import LoginPage from '../views/pages/LoginPage';
import RegisterPage from '../views/pages/RegisterPage';
import DashboardPage from '../views/pages/DashboardPage';
import EventsPage from '../views/pages/EventsPage';
import CreateEventPage from '../views/pages/CreateEventPage';
import NotFoundPage from '../views/pages/NotFoundPage';

// Mock external dependencies
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  PieChart: ({ children }) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />
}));

// Helper function to render components with Router
const renderWithRouter = (component) => {
  return render(
    <Router>
      {component}
    </Router>
  );
};

describe('Event Hive Application Tests', () => {
  
  describe('Landing Page', () => {
    test('renders landing page with main sections', () => {
      renderWithRouter(<LandingPage />);
      
      expect(screen.getByText(/Event Hive/i)).toBeInTheDocument();
      expect(screen.getByText(/Create, Manage and Attend Events/i)).toBeInTheDocument();
      expect(screen.getByText(/Event Management/i)).toBeInTheDocument();
      expect(screen.getByText(/Ticketing/i)).toBeInTheDocument();
    });

    test('navigation links work correctly', () => {
      renderWithRouter(<LandingPage />);
      
      const loginLink = screen.getAllByText(/Login/i)[0];
      const signupLink = screen.getAllByText(/Sign Up/i)[0];
      
      expect(loginLink).toBeInTheDocument();
      expect(signupLink).toBeInTheDocument();
    });
  });

  describe('Authentication Pages', () => {
    test('login page renders correctly', () => {
      renderWithRouter(<LoginPage />);
      
      expect(screen.getByText(/Login to Your Account/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    });

    test('register page renders correctly', () => {
      renderWithRouter(<RegisterPage />);
      
      expect(screen.getByText(/Create Your Account/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    });
  });

  describe('Dashboard Page', () => {
    test('dashboard renders with statistics', () => {
      renderWithRouter(<DashboardPage />);
      
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Events/i)).toBeInTheDocument();
      expect(screen.getByText(/Active Events/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Attendees/i)).toBeInTheDocument();
    });

    test('charts are rendered', () => {
      renderWithRouter(<DashboardPage />);
      
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });
  });

  describe('Events Page', () => {
    test('events page renders with search and filters', () => {
      renderWithRouter(<EventsPage />);
      
      expect(screen.getByText(/All Events/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Search events.../i)).toBeInTheDocument();
      expect(screen.getByText(/All Categories/i)).toBeInTheDocument();
    });
  });

  describe('Create Event Page', () => {
    test('create event form renders correctly', () => {
      renderWithRouter(<CreateEventPage />);
      
      expect(screen.getByText(/Create New Event/i)).toBeInTheDocument();
      expect(screen.getByText(/Event Details/i)).toBeInTheDocument();
      expect(screen.getByText(/Date & Time/i)).toBeInTheDocument();
      expect(screen.getByText(/Location/i)).toBeInTheDocument();
    });

    test('form validation works', async () => {
      renderWithRouter(<CreateEventPage />);
      
      const createButton = screen.getByText(/Create Event/i);
      fireEvent.click(createButton);
      
      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByText(/Event name is required/i)).toBeInTheDocument();
      });
    });
  });

  describe('404 Page', () => {
    test('404 page renders correctly', () => {
      renderWithRouter(<NotFoundPage />);
      
      expect(screen.getByText(/Oops!/i)).toBeInTheDocument();
      expect(screen.getByText(/We can't seem to find the page you are looking for/i)).toBeInTheDocument();
      expect(screen.getByText(/Back to Homepage/i)).toBeInTheDocument();
    });

    test('social media links have proper accessibility', () => {
      renderWithRouter(<NotFoundPage />);
      
      expect(screen.getByLabelText(/Follow us on Instagram/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Follow us on Facebook/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Follow us on LinkedIn/i)).toBeInTheDocument();
    });
  });

  describe('App Routing', () => {
    test('app renders without crashing', () => {
      render(<App />);
      // Should render the landing page by default
      expect(screen.getByText(/Event Hive/i)).toBeInTheDocument();
    });
  });

});

describe('MVVM Architecture Tests', () => {
  
  describe('Event ViewModel', () => {
    test('should be properly structured', () => {
      // Test that the viewModel files exist and export the expected functions
      const useEventViewModel = require('../viewModels/useEventViewModel');
      expect(typeof useEventViewModel.default).toBe('function');
    });
  });

  describe('User ViewModel', () => {
    test('should be properly structured', () => {
      const useUserViewModel = require('../viewModels/useUserViewModel');
      expect(typeof useUserViewModel.default).toBe('function');
    });
  });

  describe('Message ViewModel', () => {
    test('should be properly structured', () => {
      const useMessageViewModel = require('../viewModels/useMessageViewModel');
      expect(typeof useMessageViewModel.default).toBe('function');
    });
  });

});

describe('Models Tests', () => {
  
  describe('Event Model', () => {
    test('Event class should be properly defined', () => {
      const Event = require('../models/Event').default;
      const event = new Event({
        id: '1',
        name: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        organizer: 'Test Organizer'
      });
      
      expect(event.id).toBe('1');
      expect(event.name).toBe('Test Event');
      expect(event.isValid()).toBe(true);
    });
  });

  describe('User Model', () => {
    test('User class should be properly defined', () => {
      const User = require('../models/User').default;
      const user = new User({
        id: '1',
        name: 'Test User',
        email: 'test@example.com'
      });
      
      expect(user.id).toBe('1');
      expect(user.name).toBe('Test User');
      expect(user.isValid()).toBe(true);
    });
  });

});
