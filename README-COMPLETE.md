# Event Hive - Complete Event Management System

## 🚀 Project Overview

Event Hive is a comprehensive event management platform built with React that allows users to discover, create, and manage events. The platform features a modern, responsive design with complete mobile navigation and admin capabilities.

## ✨ Features Completed

### 🏠 Core Pages
- **Landing Page**: Modern hero section with featured events, categories, testimonials, and platform statistics
- **About Page**: Comprehensive company information with team members, timeline, and values
- **Contact Page**: Multi-step contact form with office locations and FAQ section
- **Events Page**: Event listing with filtering and search capabilities
- **Event Detail Page**: Detailed event information with registration links

### 📝 Registration & Management
- **Event Registration**: Multi-step registration wizard with personal info, address, and confirmation
- **Volunteer Management**: Complete volunteer management system with role assignment and applications
- **Create Event Page**: Event creation form for organizers
- **Dashboard**: Admin dashboard with analytics and management tools

### 👤 User Features
- **Authentication**: Login and registration pages
- **Profile Management**: User profile with settings and preferences
- **Messages**: Communication system for users and organizers

### 🎨 Design & UX
- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- **Icon-Free Navigation**: No external icon dependencies (Lucide React removed)
- **Custom Components**: Hamburger menu, star ratings, and form elements
- **Modern UI**: Clean, professional design with hover effects and animations

## 🏗️ Architecture

### Component Structure
```
src/
├── views/
│   ├── components/
│   │   ├── Header.js/css - Responsive navigation header
│   │   └── DashboardLayout.js/css - Admin layout wrapper
│   └── pages/
│       ├── LandingPage.js/css - Home page
│       ├── AboutPage.js/css - Company information
│       ├── ContactPage.js/css - Contact forms and info
│       ├── EventsPage.js/css - Event listings
│       ├── EventDetailPage.js/css - Individual event details
│       ├── EventRegistrationPage.js/css - Registration wizard
│       ├── VolunteerManagementPage.js/css - Admin volunteer tools
│       ├── CreateEventPage.js/css - Event creation
│       ├── DashboardPage.js/css - Admin dashboard
│       ├── ProfilePage.js/css - User profile
│       ├── MessagesPage.js/css - Communication system
│       └── NotFoundPage.js/css - 404 error page
├── models/ - Data models for Event, User, Booking, Message
├── viewModels/ - React hooks for state management
└── utils/ - Helper functions and utilities
```

### Routing System
- **Public Routes**: Landing, About, Contact, Events, Event Details, Auth
- **Protected Routes**: Dashboard, Profile, Messages, Event Creation
- **Registration Flow**: Dynamic routing with event ID parameters
- **Admin Routes**: Volunteer management and analytics

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd event-hive-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production
```bash
npm run build
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENVIRONMENT=development
```

### Port Configuration
The app runs on port 3000 by default. To change:
```bash
PORT=3001 npm start
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

All components are built mobile-first with progressive enhancement for larger screens.

## 🎯 Key Features

### Navigation System
- **Mobile**: Hamburger menu with slide-out navigation
- **Desktop**: Horizontal navigation with hover effects
- **No Icons**: Custom CSS-based hamburger animation, no external dependencies

### Event Registration
- **Step 1**: Personal information collection
- **Step 2**: Address and contact details
- **Step 3**: Review and confirmation
- **Validation**: Real-time form validation with error handling

### Volunteer Management
- **Volunteer List**: View and manage volunteer applications
- **Role Assignment**: Assign volunteers to specific event roles
- **Application Review**: Accept/reject volunteer applications
- **Progress Tracking**: Monitor volunteer engagement and performance

### Admin Dashboard
- **Analytics**: Event performance and attendance metrics
- **Event Management**: Create, edit, and manage events
- **User Management**: Monitor user registrations and engagement
- **Financial Overview**: Revenue and booking analytics

## 🔨 Development

### Code Style
- **React Hooks**: Functional components with hooks for state management
- **CSS Modules**: Scoped styling with component-specific CSS files
- **Responsive Design**: Mobile-first approach with flexbox and grid
- **Accessibility**: ARIA labels and semantic HTML structure

### State Management
- **Local State**: useState for component-level state
- **Custom Hooks**: Reusable view models for complex state logic
- **Props Drilling**: Managed through component composition

### Testing
- **Unit Tests**: Jest and React Testing Library
- **Integration Tests**: User flow testing
- **E2E Tests**: Cypress for end-to-end scenarios

## 🌐 Deployment

### Production Build
```bash
npm run build
```

### Static Hosting
The build folder can be deployed to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

### Environment Setup
Ensure production environment variables are configured for:
- API endpoints
- Authentication services
- Analytics tracking
- Error monitoring

## 🔍 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 📋 TODO / Future Enhancements

- [ ] Payment integration for event tickets
- [ ] Real-time chat system
- [ ] Email notification system
- [ ] Advanced analytics dashboard
- [ ] Social media integration
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Calendar integration
- [ ] Advanced search filters
- [ ] Event recommendation system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React.js team for the framework
- Unsplash for high-quality event images
- Design inspiration from modern event platforms
- Community contributors and testers

## 📞 Support

For support and questions:
- Email: support@eventhive.com
- Documentation: [docs.eventhive.com](https://docs.eventhive.com)
- Issues: [GitHub Issues](https://github.com/your-repo/event-hive/issues)

---

**Event Hive** - Bringing people together through exceptional events. 🎉
