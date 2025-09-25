import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import './VolunteerManagementPage.css';

const VolunteerManagementPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('volunteers');
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [newRole, setNewRole] = useState({
    title: '',
    description: '',
    requirements: '',
    maxVolunteers: ''
  });

  // Mock data
  const event = {
    id: id || '1',
    title: 'Global Music Festival 2025',
    date: '2025-10-15',
    location: 'Madison Square Garden, NYC'
  };

  const volunteers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 123-4567',
      role: 'Event Coordinator',
      status: 'Active',
      joinDate: '2025-01-15',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      skills: ['Event Management', 'Leadership', 'Communication']
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@example.com',
      phone: '+1 (555) 987-6543',
      role: 'Security Coordinator',
      status: 'Active',
      joinDate: '2025-01-20',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      skills: ['Security', 'Crowd Control', 'First Aid']
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 (555) 456-7890',
      role: 'Registration Assistant',
      status: 'Pending',
      joinDate: '2025-02-01',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      skills: ['Customer Service', 'Organization', 'Data Entry']
    },
    {
      id: 4,
      name: 'David Rodriguez',
      email: 'david@example.com',
      phone: '+1 (555) 321-0987',
      role: 'Technical Support',
      status: 'Active',
      joinDate: '2025-01-25',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      skills: ['AV Equipment', 'IT Support', 'Problem Solving']
    }
  ];

  const volunteerRoles = [
    {
      id: 1,
      title: 'Event Coordinator',
      description: 'Oversee event operations and coordinate with different teams',
      requirements: 'Previous event management experience, leadership skills',
      maxVolunteers: 5,
      currentVolunteers: 1,
      responsibilities: ['Team coordination', 'Timeline management', 'Problem solving']
    },
    {
      id: 2,
      title: 'Security Coordinator',
      description: 'Ensure safety and security of all event attendees',
      requirements: 'Security experience, first aid certification preferred',
      maxVolunteers: 10,
      currentVolunteers: 1,
      responsibilities: ['Crowd control', 'Security checks', 'Emergency response']
    },
    {
      id: 3,
      title: 'Registration Assistant',
      description: 'Handle attendee registration and check-in process',
      requirements: 'Customer service skills, attention to detail',
      maxVolunteers: 8,
      currentVolunteers: 1,
      responsibilities: ['Check-in process', 'Badge distribution', 'Information desk']
    },
    {
      id: 4,
      title: 'Technical Support',
      description: 'Provide technical assistance for AV and IT equipment',
      requirements: 'Technical background, problem-solving skills',
      maxVolunteers: 6,
      currentVolunteers: 1,
      responsibilities: ['Equipment setup', 'Technical troubleshooting', 'AV support']
    }
  ];

  const handleSelectVolunteer = (volunteerId) => {
    setSelectedVolunteers(prev => 
      prev.includes(volunteerId) 
        ? prev.filter(id => id !== volunteerId)
        : [...prev, volunteerId]
    );
  };

  const handleAssignRole = () => {
    setShowAssignModal(true);
  };

  const handleCreateRole = () => {
    // Add new role logic
    console.log('Creating new role:', newRole);
    setNewRole({ title: '', description: '', requirements: '', maxVolunteers: '' });
  };

  const renderVolunteersTab = () => (
    <div className="volunteers-tab">
      <div className="tab-header">
        <div className="tab-info">
          <h3>Event Volunteers</h3>
          <p>Manage volunteers for {event.title}</p>
        </div>
        <div className="tab-actions">
          <button 
            className="btn btn-secondary"
            disabled={selectedVolunteers.length === 0}
            onClick={handleAssignRole}
          >
            Assign Role ({selectedVolunteers.length})
          </button>
          <button className="btn btn-primary">Invite Volunteers</button>
        </div>
      </div>

      <div className="volunteers-grid">
        {volunteers.map(volunteer => (
          <div key={volunteer.id} className="volunteer-card">
            <div className="volunteer-header">
              <input
                type="checkbox"
                checked={selectedVolunteers.includes(volunteer.id)}
                onChange={() => handleSelectVolunteer(volunteer.id)}
                className="volunteer-checkbox"
              />
              <div className="volunteer-avatar">
                <img src={volunteer.avatar} alt={volunteer.name} />
              </div>
              <div className={`status-badge ${volunteer.status.toLowerCase()}`}>
                {volunteer.status}
              </div>
            </div>
            
            <div className="volunteer-info">
              <h4>{volunteer.name}</h4>
              <p className="volunteer-role">{volunteer.role}</p>
              <div className="contact-info">
                <p>{volunteer.email}</p>
                <p>{volunteer.phone}</p>
              </div>
              <div className="join-date">
                Joined: {new Date(volunteer.joinDate).toLocaleDateString()}
              </div>
              
              <div className="volunteer-skills">
                <h5>Skills:</h5>
                <div className="skills-list">
                  {volunteer.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="volunteer-actions">
              <button className="btn-action">Edit</button>
              <button className="btn-action danger">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRolesTab = () => (
    <div className="roles-tab">
      <div className="tab-header">
        <div className="tab-info">
          <h3>Volunteer Roles</h3>
          <p>Manage available volunteer positions</p>
        </div>
        <div className="tab-actions">
          <button 
            className="btn btn-primary"
            onClick={handleCreateRole}
          >
            Create New Role
          </button>
        </div>
      </div>

      <div className="roles-grid">
        {volunteerRoles.map(role => (
          <div key={role.id} className="role-card">
            <div className="role-header">
              <h4>{role.title}</h4>
              <div className="role-capacity">
                {role.currentVolunteers}/{role.maxVolunteers} filled
              </div>
            </div>
            
            <div className="role-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(role.currentVolunteers / role.maxVolunteers) * 100}%` }}
                />
              </div>
            </div>

            <div className="role-description">
              <p>{role.description}</p>
            </div>

            <div className="role-requirements">
              <h5>Requirements:</h5>
              <p>{role.requirements}</p>
            </div>

            <div className="role-responsibilities">
              <h5>Responsibilities:</h5>
              <ul>
                {role.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            <div className="role-actions">
              <button className="btn btn-outline">Edit Role</button>
              <button className="btn btn-primary">Find Volunteers</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplicationsTab = () => (
    <div className="applications-tab">
      <div className="tab-header">
        <div className="tab-info">
          <h3>Volunteer Applications</h3>
          <p>Review pending volunteer applications</p>
        </div>
      </div>

      <div className="applications-list">
        {volunteers.filter(v => v.status === 'Pending').map(applicant => (
          <div key={applicant.id} className="application-card">
            <div className="applicant-info">
              <div className="applicant-avatar">
                <img src={applicant.avatar} alt={applicant.name} />
              </div>
              <div className="applicant-details">
                <h4>{applicant.name}</h4>
                <p>Applied for: {applicant.role}</p>
                <p>{applicant.email}</p>
                <p>Applied on: {new Date(applicant.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="application-actions">
              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-outline">Review</button>
              <button className="btn btn-secondary">Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="volunteer-management-page">
        <div className="page-header">
          <h1>Volunteer Management</h1>
          <p>{event.title} • {new Date(event.date).toLocaleDateString()} • {event.location}</p>
        </div>

        <div className="volunteer-tabs">
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'volunteers' ? 'active' : ''}`}
              onClick={() => setActiveTab('volunteers')}
            >
              Volunteers ({volunteers.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'roles' ? 'active' : ''}`}
              onClick={() => setActiveTab('roles')}
            >
              Roles ({volunteerRoles.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              Applications ({volunteers.filter(v => v.status === 'Pending').length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'volunteers' && renderVolunteersTab()}
            {activeTab === 'roles' && renderRolesTab()}
            {activeTab === 'applications' && renderApplicationsTab()}
          </div>
        </div>

        {/* Assign Role Modal */}
        {showAssignModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Assign Role</h3>
                <button onClick={() => setShowAssignModal(false)}>×</button>
              </div>
              <div className="modal-content">
                <p>Assign role to {selectedVolunteers.length} selected volunteer(s)</p>
                <select className="role-select">
                  <option value="">Select a role</option>
                  {volunteerRoles.map(role => (
                    <option key={role.id} value={role.id}>{role.title}</option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button onClick={() => setShowAssignModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button className="btn btn-primary">
                  Assign Role
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VolunteerManagementPage;
