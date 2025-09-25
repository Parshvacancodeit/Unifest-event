import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Image, DollarSign, Users, Tag, Save, X } from 'lucide-react';
import './CreateEventPage.css';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    category: '',
    date: '',
    time: '',
    location: '',
    price: '',
    capacity: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Music',
    'Sports',
    'Technology',
    'Business',
    'Food & Drink',
    'Arts',
    'Health',
    'Travel',
    'Education',
    'Entertainment'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Event date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Event time is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Event location is required';
    }

    if (!formData.price) {
      newErrors.price = 'Ticket price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.capacity) {
      newErrors.capacity = 'Event capacity is required';
    } else if (isNaN(formData.capacity) || parseInt(formData.capacity) < 1) {
      newErrors.capacity = 'Please enter a valid capacity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Event created:', formData);
      alert('Event created successfully!');
      navigate('/dashboard/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
      navigate(-1);
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-header">
        <h1>Create New Event</h1>
        <button onClick={handleCancel} className="btn btn-secondary">
          <X size={20} />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="form-sections">
          {/* Basic Information */}
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-group">
              <label htmlFor="title">Event Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Short Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of your event"
                rows="3"
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <div className="error-message">{errors.description}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="longDescription">Full Description</label>
              <textarea
                id="longDescription"
                name="longDescription"
                value={formData.longDescription}
                onChange={handleInputChange}
                placeholder="Detailed description of your event, including what attendees can expect"
                rows="6"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <div className="select-wrapper">
                  <Tag className="select-icon" size={20} />
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={errors.category ? 'error' : ''}
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && <div className="error-message">{errors.category}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="image">Event Image URL</label>
                <div className="input-wrapper">
                  <Image className="input-icon" size={20} />
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="form-section">
            <h2>Date & Time</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Event Date</label>
                <div className="input-wrapper">
                  <Calendar className="input-icon" size={20} />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={errors.date ? 'error' : ''}
                  />
                </div>
                {errors.date && <div className="error-message">{errors.date}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="time">Start Time</label>
                <div className="input-wrapper">
                  <Clock className="input-icon" size={20} />
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={errors.time ? 'error' : ''}
                  />
                </div>
                {errors.time && <div className="error-message">{errors.time}</div>}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="form-section">
            <h2>Location</h2>
            
            <div className="form-group">
              <label htmlFor="location">Event Location</label>
              <div className="input-wrapper">
                <MapPin className="input-icon" size={20} />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter event location or address"
                  className={errors.location ? 'error' : ''}
                />
              </div>
              {errors.location && <div className="error-message">{errors.location}</div>}
            </div>
          </div>

          {/* Pricing & Capacity */}
          <div className="form-section">
            <h2>Pricing & Capacity</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Ticket Price ($)</label>
                <div className="input-wrapper">
                  <DollarSign className="input-icon" size={20} />
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={errors.price ? 'error' : ''}
                  />
                </div>
                {errors.price && <div className="error-message">{errors.price}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="capacity">Event Capacity</label>
                <div className="input-wrapper">
                  <Users className="input-icon" size={20} />
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="Maximum attendees"
                    min="1"
                    className={errors.capacity ? 'error' : ''}
                  />
                </div>
                {errors.capacity && <div className="error-message">{errors.capacity}</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Creating Event...
              </>
            ) : (
              <>
                <Save size={20} />
                Create Event
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;