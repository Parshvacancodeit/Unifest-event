import { useState, useEffect, useCallback } from 'react';
import User from '../models/User';

export const useUserViewModel = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock user data
  const mockCurrentUser = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    bio: 'Event organizer passionate about creating memorable experiences.',
    location: 'New York, NY',
    joinedDate: '2022-01-15',
    role: 'organizer'
  };

  // Login
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication - in real app, validate credentials
      if (email && password) {
        const user = new User(mockCurrentUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user.toJSON()));
        localStorage.setItem('isAuthenticated', 'true');
        
        return user;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Register
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newUser = new User({
        ...userData,
        id: Date.now(),
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        joinedDate: new Date().toISOString().split('T')[0],
        role: 'user'
      });
      
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(newUser.toJSON()));
      localStorage.setItem('isAuthenticated', 'true');
      
      return newUser;
    } catch (err) {
      setError('Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }, []);

  // Update profile
  const updateProfile = useCallback(async (updates) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = new User({
        ...currentUser.toJSON(),
        ...updates
      });
      
      setCurrentUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser.toJSON()));
      
      return updatedUser;
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Change password
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock password validation
      if (currentPassword === 'password') {
        // In real app, update password on server
        return true;
      } else {
        throw new Error('Current password is incorrect');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user events (events created by user)
  const getUserEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user events data
      const mockUserEvents = [
        {
          id: 1,
          title: 'Summer Music Festival 2024',
          date: '2024-07-15',
          attendees: 2847,
          status: 'upcoming',
          image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 2,
          title: 'Tech Innovation Summit',
          date: '2024-05-20',
          attendees: 756,
          status: 'completed',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        }
      ];
      
      return mockUserEvents;
    } catch (err) {
      setError('Failed to fetch user events');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user bookings
  const getUserBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user bookings data
      const mockBookings = [
        {
          id: 1,
          eventId: 3,
          eventTitle: 'Food & Wine Festival',
          eventDate: '2024-09-10',
          bookingDate: '2024-08-15',
          status: 'confirmed',
          ticketCount: 2,
          totalAmount: 150.00
        }
      ];
      
      return mockBookings;
    } catch (err) {
      setError('Failed to fetch user bookings');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user statistics
  const getUserStats = useCallback(() => {
    if (!currentUser) return null;
    
    return {
      eventsOrganized: 24,
      totalAttendees: 12500,
      citiesReached: 8,
      averageRating: 4.9,
      totalRevenue: 125000,
      upcomingEvents: 3
    };
  }, [currentUser]);

  // Check authentication status on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isAuth = localStorage.getItem('isAuthenticated');
    
    if (storedUser && isAuth === 'true') {
      try {
        const userData = JSON.parse(storedUser);
        setCurrentUser(new User(userData));
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error parsing stored user data:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
  }, []);

  return {
    // State
    currentUser,
    users,
    loading,
    error,
    isAuthenticated,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    getUserEvents,
    getUserBookings,
    getUserStats
  };
};