import { useState, useEffect, useCallback } from 'react';
import Event from '../models/Event';

export const useEventViewModel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    date: '',
    location: '',
    priceRange: { min: 0, max: 1000 }
  });

  // Mock data - replace with actual API calls
  const mockEvents = [
    {
      id: 1,
      title: 'Summer Music Festival 2024',
      description: 'Join us for an unforgettable music festival featuring top artists from around the world.',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      date: '2024-07-15',
      time: '18:00',
      location: 'Central Park, New York',
      category: 'Music',
      price: 89.99,
      organizer: 'Music Events Inc.',
      capacity: 5000,
      attendees: 2847
    },
    {
      id: 2,
      title: 'Tech Innovation Summit 2024',
      description: 'Discover the latest trends in technology and innovation from industry leaders.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      date: '2024-08-20',
      time: '09:00',
      location: 'Silicon Valley, CA',
      category: 'Technology',
      price: 149.99,
      organizer: 'Tech Innovators',
      capacity: 1000,
      attendees: 756
    },
    {
      id: 3,
      title: 'Food & Wine Festival',
      description: 'Savor the finest cuisine and wines from renowned chefs and vineyards.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      date: '2024-09-10',
      time: '19:00',
      location: 'Napa Valley, CA',
      category: 'Food & Drink',
      price: 75.00,
      organizer: 'Culinary Masters',
      capacity: 800,
      attendees: 542
    }
  ];

  // Fetch events
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const eventInstances = mockEvents.map(eventData => new Event(eventData));
      setEvents(eventInstances);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create event
  const createEvent = useCallback(async (eventData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newEvent = new Event({
        ...eventData,
        id: Date.now(),
        attendees: 0
      });
      
      setEvents(prevEvents => [...prevEvents, newEvent]);
      return newEvent;
    } catch (err) {
      setError('Failed to create event');
      console.error('Error creating event:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update event
  const updateEvent = useCallback(async (eventId, updates) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === eventId
            ? new Event({ ...event.toJSON(), ...updates })
            : event
        )
      );
    } catch (err) {
      setError('Failed to update event');
      console.error('Error updating event:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete event
  const deleteEvent = useCallback(async (eventId) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    } catch (err) {
      setError('Failed to delete event');
      console.error('Error deleting event:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get event by ID
  const getEventById = useCallback((eventId) => {
    return events.find(event => event.id === parseInt(eventId));
  }, [events]);

  // Filter events
  const filteredEvents = useCallback(() => {
    return events.filter(event => {
      const matchesSearch = !filters.search || 
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.location.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = !filters.category || 
        event.category.toLowerCase() === filters.category.toLowerCase();
      
      const matchesDate = !filters.date || event.date === filters.date;
      
      const matchesLocation = !filters.location ||
        event.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesPrice = event.price >= filters.priceRange.min && 
        event.price <= filters.priceRange.max;
      
      return matchesSearch && matchesCategory && matchesDate && matchesLocation && matchesPrice;
    });
  }, [events, filters]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      date: '',
      location: '',
      priceRange: { min: 0, max: 1000 }
    });
  }, []);

  // Get event statistics
  const getEventStats = useCallback(() => {
    const totalEvents = events.length;
    const totalAttendees = events.reduce((sum, event) => sum + event.attendees, 0);
    const averagePrice = events.length > 0 
      ? events.reduce((sum, event) => sum + event.price, 0) / events.length 
      : 0;
    const categoryCounts = events.reduce((counts, event) => {
      counts[event.category] = (counts[event.category] || 0) + 1;
      return counts;
    }, {});

    return {
      totalEvents,
      totalAttendees,
      averagePrice: Math.round(averagePrice * 100) / 100,
      categoryCounts
    };
  }, [events]);

  // Initialize - fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    // State
    events: filteredEvents(),
    allEvents: events,
    loading,
    error,
    filters,
    
    // Actions
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    updateFilters,
    clearFilters,
    getEventStats
  };
};