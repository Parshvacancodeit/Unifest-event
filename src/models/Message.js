/**
 * Message Model
 * Represents a message in a conversation between users
 */
class Message {
  constructor({
    id,
    senderId,
    senderName,
    content,
    timestamp,
    isRead = false,
    messageType = 'text',
    attachment = null
  }) {
    this.id = id;
    this.senderId = senderId;
    this.senderName = senderName;
    this.content = content;
    this.timestamp = timestamp instanceof Date ? timestamp : new Date(timestamp);
    this.isRead = isRead;
    this.messageType = messageType; // 'text', 'image', 'file', 'audio'
    this.attachment = attachment;
    
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Get formatted timestamp
  getFormattedTime() {
    return this.timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get relative time (e.g., "2 minutes ago")
  getRelativeTime() {
    const now = new Date();
    const diffInMs = now - this.timestamp;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      return this.timestamp.toLocaleDateString();
    }
  }

  // Check if message was sent by current user
  isSentByMe() {
    return this.senderId === 'me';
  }

  // Check if message is recent (within last 5 minutes)
  isRecent() {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return this.timestamp > fiveMinutesAgo;
  }

  // Mark message as read
  markAsRead() {
    this.isRead = true;
    this.updatedAt = new Date();
    return this;
  }

  // Get message preview (first 50 characters)
  getPreview() {
    if (this.messageType !== 'text') {
      switch (this.messageType) {
        case 'image':
          return '📷 Image';
        case 'file':
          return '📎 File';
        case 'audio':
          return '🎵 Audio';
        default:
          return 'Message';
      }
    }
    
    return this.content.length > 50 
      ? this.content.substring(0, 47) + '...'
      : this.content;
  }

  // Validate message content
  validate() {
    const errors = [];

    if (!this.senderId) {
      errors.push('Sender ID is required');
    }

    if (!this.content || this.content.trim().length === 0) {
      if (this.messageType === 'text') {
        errors.push('Message content cannot be empty');
      }
    }

    if (this.content && this.content.length > 1000) {
      errors.push('Message content cannot exceed 1000 characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Convert to JSON for API calls
  toJSON() {
    return {
      id: this.id,
      senderId: this.senderId,
      senderName: this.senderName,
      content: this.content,
      timestamp: this.timestamp.toISOString(),
      isRead: this.isRead,
      messageType: this.messageType,
      attachment: this.attachment,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }

  // Get all message data
  getData() {
    return {
      id: this.id,
      senderId: this.senderId,
      senderName: this.senderName,
      content: this.content,
      timestamp: this.timestamp,
      isRead: this.isRead,
      messageType: this.messageType,
      attachment: this.attachment,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Create from JSON
  static fromJSON(json) {
    return new Message({
      id: json.id,
      senderId: json.senderId,
      senderName: json.senderName,
      content: json.content,
      timestamp: new Date(json.timestamp),
      isRead: json.isRead,
      messageType: json.messageType,
      attachment: json.attachment
    });
  }

  // Create a reply to this message
  createReply(replyContent, senderId, senderName) {
    return new Message({
      id: Date.now(),
      senderId,
      senderName,
      content: replyContent,
      timestamp: new Date(),
      isRead: false,
      messageType: 'text'
    });
  }
}

export default Message;