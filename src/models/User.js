// User model for managing user data
class User {
  constructor({
    id = null,
    name = '',
    email = '',
    password = '',
    role = 'user', // 'user', 'admin', 'organizer'
    avatar = '',
    bio = '',
    location = '',
    phone = '',
    socialLinks = {},
    eventsAttended = [],
    eventsCreated = [],
    preferences = {
      notifications: true,
      emailUpdates: true,
      categories: []
    },
    isActive = true,
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.avatar = avatar;
    this.bio = bio;
    this.location = location;
    this.phone = phone;
    this.socialLinks = socialLinks;
    this.eventsAttended = eventsAttended;
    this.eventsCreated = eventsCreated;
    this.preferences = preferences;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Check if user is admin
  isAdmin() {
    return this.role === 'admin';
  }

  // Check if user is organizer
  isOrganizer() {
    return this.role === 'organizer';
  }

  // Get full name
  getFullName() {
    return this.name;
  }

  // Get initials for avatar
  getInitials() {
    return this.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  // Add event to attended list
  addAttendedEvent(eventId) {
    if (!this.eventsAttended.includes(eventId)) {
      this.eventsAttended.push(eventId);
    }
  }

  // Remove event from attended list
  removeAttendedEvent(eventId) {
    this.eventsAttended = this.eventsAttended.filter(id => id !== eventId);
  }

  // Add event to created list
  addCreatedEvent(eventId) {
    if (!this.eventsCreated.includes(eventId)) {
      this.eventsCreated.push(eventId);
    }
  }

  // Convert to plain object (excluding password for security)
  toObject(includePassword = false) {
    const obj = {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      avatar: this.avatar,
      bio: this.bio,
      location: this.location,
      phone: this.phone,
      socialLinks: this.socialLinks,
      eventsAttended: this.eventsAttended,
      eventsCreated: this.eventsCreated,
      preferences: this.preferences,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    if (includePassword) {
      obj.password = this.password;
    }

    return obj;
  }
}

export default User;
