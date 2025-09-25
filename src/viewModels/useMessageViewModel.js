import { useState, useEffect, useCallback } from 'react';
import Message from '../models/Message';

export const useMessageViewModel = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Thanks for organizing the music festival!',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      lastMessage: 'When does the tech conference start?',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 3,
      name: 'Michael Davis',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Great event yesterday! Looking forward to the next one.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      unreadCount: 1,
      isOnline: true
    }
  ];

  // Mock messages data
  const mockMessages = {
    1: [
      new Message({
        id: 1,
        senderId: 1,
        senderName: 'John Smith',
        content: 'Hi! I just wanted to say thank you for organizing such an amazing music festival!',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        isRead: true
      }),
      new Message({
        id: 2,
        senderId: 'me',
        senderName: 'Me',
        content: 'Thank you so much! I\'m glad you enjoyed it. Your feedback means a lot to us.',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        isRead: true
      }),
      new Message({
        id: 3,
        senderId: 1,
        senderName: 'John Smith',
        content: 'The sound quality was perfect and the lineup was incredible. Will there be another one next year?',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: true
      }),
      new Message({
        id: 4,
        senderId: 'me',
        senderName: 'Me',
        content: 'Absolutely! We\'re already planning for next year. Stay tuned for announcements!',
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        isRead: true
      }),
      new Message({
        id: 5,
        senderId: 1,
        senderName: 'John Smith',
        content: 'Thanks for organizing the music festival!',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        isRead: false
      })
    ],
    2: [
      new Message({
        id: 1,
        senderId: 2,
        senderName: 'Sarah Johnson',
        content: 'Hi there! I registered for the tech conference but I can\'t find the schedule.',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        isRead: true
      }),
      new Message({
        id: 2,
        senderId: 'me',
        senderName: 'Me',
        content: 'Hi Sarah! The schedule will be sent to all attendees 24 hours before the event.',
        timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
        isRead: true
      }),
      new Message({
        id: 3,
        senderId: 2,
        senderName: 'Sarah Johnson',
        content: 'When does the tech conference start?',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        isRead: true
      })
    ]
  };

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setConversations(mockConversations);
      setMessages(mockMessages);
    } catch (err) {
      setError('Failed to fetch conversations');
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Send message
  const sendMessage = useCallback(async (conversationId, content) => {
    if (!content.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const newMessage = new Message({
        id: Date.now(),
        senderId: 'me',
        senderName: 'Me',
        content: content.trim(),
        timestamp: new Date(),
        isRead: true
      });

      // Add message to conversation
      setMessages(prevMessages => ({
        ...prevMessages,
        [conversationId]: [...(prevMessages[conversationId] || []), newMessage]
      }));

      // Update conversation's last message
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === conversationId
            ? {
                ...conv,
                lastMessage: content.trim(),
                timestamp: new Date()
              }
            : conv
        )
      );

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return newMessage;
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Mark messages as read
  const markAsRead = useCallback(async (conversationId) => {
    try {
      // Update unread count
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === conversationId
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );

      // Mark messages as read
      setMessages(prevMessages => ({
        ...prevMessages,
        [conversationId]: (prevMessages[conversationId] || []).map(message =>
          message.senderId !== 'me'
            ? new Message({ ...message.getData(), isRead: true })
            : message
        )
      }));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (err) {
      console.error('Error marking messages as read:', err);
    }
  }, []);

  // Delete conversation
  const deleteConversation = useCallback(async (conversationId) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setConversations(prevConversations =>
        prevConversations.filter(conv => conv.id !== conversationId)
      );
      
      setMessages(prevMessages => {
        const newMessages = { ...prevMessages };
        delete newMessages[conversationId];
        return newMessages;
      });

      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null);
      }
    } catch (err) {
      setError('Failed to delete conversation');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedConversation]);

  // Search conversations
  const searchConversations = useCallback((query) => {
    if (!query.trim()) return conversations;
    
    return conversations.filter(conv =>
      conv.name.toLowerCase().includes(query.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(query.toLowerCase())
    );
  }, [conversations]);

  // Get conversation messages
  const getConversationMessages = useCallback((conversationId) => {
    return messages[conversationId] || [];
  }, [messages]);

  // Get unread count
  const getTotalUnreadCount = useCallback(() => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  }, [conversations]);

  // Select conversation
  const selectConversation = useCallback((conversation) => {
    setSelectedConversation(conversation);
    if (conversation.unreadCount > 0) {
      markAsRead(conversation.id);
    }
  }, [markAsRead]);

  // Initialize - fetch conversations on mount
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Auto-update online status (simulate real-time updates)
  useEffect(() => {
    const interval = setInterval(() => {
      setConversations(prevConversations =>
        prevConversations.map(conv => ({
          ...conv,
          isOnline: Math.random() > 0.5 // Randomly toggle online status
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    // State
    conversations,
    messages,
    selectedConversation,
    loading,
    error,
    
    // Actions
    fetchConversations,
    sendMessage,
    markAsRead,
    deleteConversation,
    searchConversations,
    getConversationMessages,
    getTotalUnreadCount,
    selectConversation
  };
};