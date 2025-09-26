import React from 'react';
import Header from '../components/Header';
import './AboutPage.css';


const AboutPage = () => {


  

  const values = [
    {
      title: 'Community First',
      description: 'We believe in building meaningful connections and fostering vibrant communities through shared experiences.'
    },
    {
      title: 'Innovation',
      description: 'Constantly evolving our platform with cutting-edge technology to better serve our users.'
    },
    {
      title: 'Accessibility',
      description: 'Making event creation and discovery accessible to everyone, regardless of technical expertise.'
    },
    {
      title: 'Trust & Safety',
      description: 'Maintaining the highest standards of security and trust for all event organizers and attendees.'
    }
  ];

  return (
    <div className="about-page">
      <Header />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Team collaboration" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1>About Uni Fest</h1>
            <p className="hero-subtitle">
              We're on a mission to bring people together through unforgettable events. 
              Our platform empowers creators and connects communities worldwide.
            </p>
            
         
         
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Uni Fest was born from a simple observation: creating and discovering great events 
                shouldn't be complicated. In 2025, we  realized that while technology had 
                transformed many industries, event management was still fragmented and difficult to navigate.
              </p>
              <p>
                We set out to build a platform that would democratize event creation, making it possible 
                for anyone to organize successful events while helping attendees discover experiences 
                that truly matter to them.
              </p>
              <p>
                Today, Uni Fest serves millions of users across the globe, from intimate community 
                gatherings to large-scale festivals. We're proud to be part of countless memorable moments 
                and continue to innovate for the future of events.
              </p>
            </div>
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Team brainstorming" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="our-values">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      

      {/* Team Section */}
      

      {/* Mission Section */}
      

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
              <p>© 2024 Uni Fest. All rights reserved.</p>
              <p>Made with passion for connecting communities</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
