import React, { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-react';
import './MessagesPage.css';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with real data from API
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Thanks for organizing the music festival!',
      timestamp: '2 min ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      lastMessage: 'When does the tech conference start?',
      timestamp: '1h ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Michael Davis',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Great event yesterday! Looking forward to the next one.',
      timestamp: '3h ago',
      unread: 1,
      online: true
    },
    {
      id: 4,
      name: 'Emily Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Can I get a refund for the cancelled event?',
      timestamp: '5h ago',
      unread: 0,
      online: false
    }
  ]);

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        senderId: 1,
        text: 'Hi! I just wanted to say thank you for organizing such an amazing music festival!',
        timestamp: '10:30 AM',
        sent: false
      },
      {
        id: 2,
        senderId: 'me',
        text: 'Thank you so much! I\'m glad you enjoyed it. Your feedback means a lot to us.',
        timestamp: '10:32 AM',
        sent: true
      },
      {
        id: 3,
        senderId: 1,
        text: 'The sound quality was perfect and the lineup was incredible. Will there be another one next year?',
        timestamp: '10:35 AM',
        sent: false
      },
      {
        id: 4,
        senderId: 'me',
        text: 'Absolutely! We\'re already planning for next year. Stay tuned for announcements!',
        timestamp: '10:37 AM',
        sent: true
      },
      {
        id: 5,
        senderId: 1,
        text: 'Thanks for organizing the music festival!',
        timestamp: '10:40 AM',
        sent: false
      }
    ],
    2: [
      {
        id: 1,
        senderId: 2,
        text: 'Hi there! I registered for the tech conference but I can\'t find the schedule.',
        timestamp: '9:15 AM',
        sent: false
      },
      {
        id: 2,
        senderId: 'me',
        text: 'Hi Sarah! The schedule will be sent to all attendees 24 hours before the event.',
        timestamp: '9:18 AM',
        sent: true
      },
      {
        id: 3,
        senderId: 2,
        text: 'When does the tech conference start?',
        timestamp: '11:20 AM',
        sent: false
      }
    ]
  });

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      senderId: 'me',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));

    // Update conversation's last message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedChat.id
          ? { ...conv, lastMessage: messageText, timestamp: 'now' }
          : conv
      )
    );

    setMessageText('');
  };

  const selectChat = (conversation) => {
    setSelectedChat(conversation);
    // Mark messages as read
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversation.id
          ? { ...conv, unread: 0 }
          : conv
      )
    );
  };

  const currentMessages = selectedChat ? messages[selectedChat.id] || [] : [];

  return (
    <div className="messages-page">
      {/* Sidebar */}
      <div className="messages-sidebar">
        <div className="messages-header">
          <h2>Messages</h2>
        </div>

        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="conversations-list">
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              className={`conversation-item ${selectedChat?.id === conversation.id ? 'active' : ''}`}
              onClick={() => selectChat(conversation)}
            >
              <div className="conversation-avatar">
                <img src={conversation.avatar} alt={conversation.name} />
                {conversation.online && <div className="online-indicator"></div>}
              </div>
              
              <div className="conversation-content">
                <div className="conversation-header">
                  <h3 className="conversation-name">{conversation.name}</h3>
                  <span className="conversation-time">{conversation.timestamp}</span>
                </div>
                <div className="conversation-preview">
                  <p className="last-message">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <div className="unread-badge">{conversation.unread}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-area">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-user-info">
                <div className="chat-avatar">
                  <img src={selectedChat.avatar} alt={selectedChat.name} />
                  {selectedChat.online && <div className="online-indicator"></div>}
                </div>
                <div className="chat-user-details">
                  <h3>{selectedChat.name}</h3>
                  <p className="user-status">
                    {selectedChat.online ? 'Active now' : 'Last seen 2h ago'}
                  </p>
                </div>
              </div>

              <div className="chat-actions">
                <button className="chat-action-btn">
                  <Phone size={20} />
                </button>
                <button className="chat-action-btn">
                  <Video size={20} />
                </button>
                <button className="chat-action-btn">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="messages-container">
              <div className="messages-list">
                {currentMessages.map(message => (
                  <div
                    key={message.id}
                    className={`message ${message.sent ? 'sent' : 'received'}`}
                  >
                    {!message.sent && (
                      <div className="message-avatar">
                        <img src={selectedChat.avatar} alt={selectedChat.name} />
                      </div>
                    )}
                    <div className="message-content">
                      <div className="message-bubble">
                        <p>{message.text}</p>
                      </div>
                      <div className="message-timestamp">
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="message-input-form">
              <div className="message-input-container">
                <button type="button" className="attachment-btn">
                  <Paperclip size={20} />
                </button>
                
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="message-input"
                />
                
                <button type="button" className="emoji-btn">
                  <Smile size={20} />
                </button>
                
                <button
                  type="submit"
                  className="send-btn"
                  disabled={!messageText.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-content">
              <div className="no-chat-icon">💬</div>
              <h3>Select a conversation</h3>
              <p>Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;