import React, { useState } from 'react';
import Header from '../components/Header';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('Contact form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  const contactInfo = [
    {
      title: 'General Support',
      description: 'Get help with your account, events, or platform questions',
      email: 'support@eventhive.com',
      hours: 'Mon-Fri 9AM-6PM EST'
    },
    {
      title: 'Business Inquiries',
      description: 'Partnership opportunities, enterprise solutions, and bulk licensing',
      email: 'business@eventhive.com',
      hours: 'Mon-Fri 9AM-5PM EST'
    },
    {
      title: 'Press & Media',
      description: 'Media inquiries, press kits, and interview requests',
      email: 'press@eventhive.com',
      hours: 'Mon-Fri 9AM-5PM EST'
    }
  ];

  const offices = [
    {
      city: 'New York',
      address: '123 Broadway, Suite 456',
      zipCode: 'New York, NY 10001',
      phone: '+1 (555) 123-4567'
    },
    {
      city: 'San Francisco',
      address: '789 Market Street, Floor 12',
      zipCode: 'San Francisco, CA 94103',
      phone: '+1 (555) 987-6543'
    },
    {
      city: 'London',
      address: '456 Oxford Street',
      zipCode: 'London W1C 1AP, UK',
      phone: '+44 20 7123 4567'
    }
  ];

  const faqs = [
    {
      question: 'How do I create an event?',
      answer: 'Creating an event is simple! Sign up for an account, click "Create Event" in your dashboard, fill in your event details, and publish. Our step-by-step guide will walk you through the process.'
    },
    {
      question: 'What are the fees for using Event Hive?',
      answer: 'We offer competitive pricing with no monthly fees. We charge a small percentage only when you sell paid tickets. Free events are always free to create and manage.'
    },
    {
      question: 'Can I customize my event page?',
      answer: 'Yes! You can customize your event page with your branding, images, descriptions, and even custom questions for attendees. Premium users get additional customization options.'
    },
    {
      question: 'How do I promote my event?',
      answer: 'Event Hive provides built-in promotional tools including social media sharing, email marketing, and our event discovery platform. We also offer premium marketing features for maximum visibility.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Yes, we have mobile apps for both iOS and Android that allow attendees to discover events, purchase tickets, and receive updates. Event organizers can also manage their events on the go.'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="contact-page">
        <Header />
        <div className="contact-success">
          <div className="container">
            <div className="success-content">
              <div className="success-icon">✓</div>
              <h1>Message Sent Successfully!</h1>
              <p>Thank you for contacting us. We've received your message and will get back to you within 24 hours.</p>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    company: '',
                    subject: '',
                    message: ''
                  });
                }}
                className="btn btn-primary"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <Header />
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-background">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Contact us" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1>Get in Touch</h1>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company">Company (Optional)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={errors.subject ? 'error' : ''}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="press">Press Inquiry</option>
                    <option value="feedback">Feature Request/Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Tell us how we can help you..."
                    rows="6"
                  />
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <h3>Contact Information</h3>
              <div className="contact-methods">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-method">
                    <h4>{info.title}</h4>
                    <p>{info.description}</p>
                    <a href={`mailto:${info.email}`} className="contact-email">{info.email}</a>
                    <span className="contact-hours">{info.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="office-locations">
        <div className="container">
          <div className="section-header">
            <h2>Our Offices</h2>
            <p>Visit us at one of our global locations</p>
          </div>
          <div className="offices-grid">
            {offices.map((office, index) => (
              <div key={index} className="office-card">
                <h3>{office.city}</h3>
                <div className="office-info">
                  <p>{office.address}</p>
                  <p>{office.zipCode}</p>
                  <a href={`tel:${office.phone}`} className="office-phone">{office.phone}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <div className="footer-logo">
                  Event <span className="text-primary">Hive</span>
                </div>
                <p>Bringing people together through unforgettable events.</p>
                <div className="newsletter">
                  <input type="email" placeholder="Enter your email" />
                  <button className="btn btn-primary">Subscribe</button>
                </div>
              </div>
              
              <div className="footer-links">
                <div className="footer-column">
                  <h4>Company</h4>
                  <a href="/about">About</a>
                  <a href="/careers">Careers</a>
                  <a href="/contact">Contact</a>
                  <a href="/press">Press</a>
                </div>
                
                <div className="footer-column">
                  <h4>Support</h4>
                  <a href="/help">Help Center</a>
                  <a href="/safety">Safety</a>
                  <a href="/guidelines">Guidelines</a>
                  <a href="/faq">FAQ</a>
                </div>
                
                <div className="footer-column">
                  <h4>Legal</h4>
                  <a href="/terms">Terms</a>
                  <a href="/privacy">Privacy</a>
                  <a href="/cookies">Cookies</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <p>© 2024 Event Hive. All rights reserved.</p>
              <p>Made with passion for connecting communities</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
