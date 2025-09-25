import React from 'react';
import Header from '../components/Header';
import './AboutPage.css';

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'With over 10 years in event management, Sarah founded Event Hive to revolutionize how people discover and create events.'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Tech innovator with a passion for building scalable platforms that connect people and communities worldwide.'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'VP of Marketing',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Creative marketing strategist focused on building authentic connections between event organizers and attendees.'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Operations expert ensuring smooth event experiences and exceptional customer service for all users.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Event Hive Founded', description: 'Started with a vision to democratize event creation' },
    { year: '2021', event: '10,000 Events Created', description: 'Reached our first major milestone in event creation' },
    { year: '2022', event: 'Global Expansion', description: 'Expanded to serve events in 50+ countries worldwide' },
    { year: '2023', event: '1M+ Users', description: 'Built a thriving community of event creators and attendees' },
    { year: '2024', event: 'AI Integration', description: 'Launched intelligent event recommendation system' }
  ];

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
            <h1>About Event Hive</h1>
            <p className="hero-subtitle">
              We're on a mission to bring people together through unforgettable events. 
              Our platform empowers creators and connects communities worldwide.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Events Created</div>
              </div>
              <div className="stat">
                <div className="stat-number">2M+</div>
                <div className="stat-label">Happy Users</div>
              </div>
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Cities Worldwide</div>
              </div>
            </div>
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
                Event Hive was born from a simple observation: creating and discovering great events 
                shouldn't be complicated. In 2020, our founders realized that while technology had 
                transformed many industries, event management was still fragmented and difficult to navigate.
              </p>
              <p>
                We set out to build a platform that would democratize event creation, making it possible 
                for anyone to organize successful events while helping attendees discover experiences 
                that truly matter to them.
              </p>
              <p>
                Today, Event Hive serves millions of users across the globe, from intimate community 
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
      <section className="company-timeline">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Key milestones in our mission to connect the world through events</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3>{milestone.event}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="our-team">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate individuals behind Event Hive</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              To create a world where meaningful connections happen effortlessly. We believe that 
              great events have the power to bring people together, spark new ideas, and create 
              lasting memories that enrich our lives.
            </p>
            <div className="mission-features">
              <div className="feature">
                <h3>For Event Creators</h3>
                <p>Powerful tools to bring your vision to life with ease and confidence.</p>
              </div>
              <div className="feature">
                <h3>For Attendees</h3>
                <p>Discover events that align with your interests and connect with like-minded people.</p>
              </div>
              <div className="feature">
                <h3>For Communities</h3>
                <p>Foster stronger bonds and create shared experiences that matter.</p>
              </div>
            </div>
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

export default AboutPage;
