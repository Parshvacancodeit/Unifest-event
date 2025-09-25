// Event model for managing event data
class Event {
  constructor({
    id = null,
    title = '',
    description = '',
    image = '',
    location = '',
    venue = '',
    startTime = '',
    endTime = '',
    startDate = '',
    endDate = '',
    price = 0,
    category = '',
    organizer = '',
    attendees = 0,
    maxAttendees = 0,
    tags = [],
    status = 'active',
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.location = location;
    this.venue = venue;
    this.startTime = startTime;
    this.endTime = endTime;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.category = category;
    this.organizer = organizer;
    this.attendees = attendees;
    this.maxAttendees = maxAttendees;
    this.tags = tags;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Check if event is fully booked
  isFullyBooked() {
    return this.attendees >= this.maxAttendees;
  }

  // Get availability percentage
  getAvailabilityPercentage() {
    if (this.maxAttendees === 0) return 0;
    return ((this.maxAttendees - this.attendees) / this.maxAttendees) * 100;
  }

  // Format event date
  getFormattedDate() {
    return new Date(this.startDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Get formatted time
  getFormattedTime() {
    return `${this.startTime} - ${this.endTime}`;
  }

  // Convert to plain object
  toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      image: this.image,
      location: this.location,
      venue: this.venue,
      startTime: this.startTime,
      endTime: this.endTime,
      startDate: this.startDate,
      endDate: this.endDate,
      price: this.price,
      category: this.category,
      organizer: this.organizer,
      attendees: this.attendees,
      maxAttendees: this.maxAttendees,
      tags: this.tags,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export default Event;
