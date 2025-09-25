// Booking model for managing event bookings
class Booking {
  constructor({
    id = null,
    userId = null,
    eventId = null,
    ticketQuantity = 1,
    totalAmount = 0,
    bookingDate = new Date(),
    status = 'confirmed', // 'pending', 'confirmed', 'cancelled'
    paymentStatus = 'completed', // 'pending', 'completed', 'failed', 'refunded'
    paymentMethod = '',
    bookingReference = '',
    specialRequests = '',
    checkedIn = false,
    createdAt = new Date(),
    updatedAt = new Date()
  } = {}) {
    this.id = id;
    this.userId = userId;
    this.eventId = eventId;
    this.ticketQuantity = ticketQuantity;
    this.totalAmount = totalAmount;
    this.bookingDate = bookingDate;
    this.status = status;
    this.paymentStatus = paymentStatus;
    this.paymentMethod = paymentMethod;
    this.bookingReference = bookingReference;
    this.specialRequests = specialRequests;
    this.checkedIn = checkedIn;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Check if booking is active
  isActive() {
    return this.status === 'confirmed' && this.paymentStatus === 'completed';
  }

  // Check if booking can be cancelled
  canBeCancelled() {
    return this.status === 'confirmed' && !this.checkedIn;
  }

  // Generate booking reference
  generateBookingReference() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `BK-${timestamp}-${random}`.toUpperCase();
  }

  // Calculate refund amount (example: 90% if cancelled before event)
  calculateRefundAmount() {
    if (!this.canBeCancelled()) return 0;
    return Math.floor(this.totalAmount * 0.9); // 90% refund
  }

  // Format booking date
  getFormattedBookingDate() {
    return new Date(this.bookingDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Convert to plain object
  toObject() {
    return {
      id: this.id,
      userId: this.userId,
      eventId: this.eventId,
      ticketQuantity: this.ticketQuantity,
      totalAmount: this.totalAmount,
      bookingDate: this.bookingDate,
      status: this.status,
      paymentStatus: this.paymentStatus,
      paymentMethod: this.paymentMethod,
      bookingReference: this.bookingReference,
      specialRequests: this.specialRequests,
      checkedIn: this.checkedIn,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export default Booking;
