import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import './DashboardPage.css';

const DashboardPage = () => {
  // Sample analytics data
  const weeklyRevenueData = [
    { week: '17', revenue: 2500, events: 5, attendees: 150 },
    { week: '18', revenue: 3200, events: 7, attendees: 200 },
    { week: '19', revenue: 2800, events: 6, attendees: 175 },
    { week: '20', revenue: 3500, events: 8, attendees: 225 },
    { week: '21', revenue: 3100, events: 7, attendees: 190 },
    { week: '22', revenue: 4200, events: 10, attendees: 280 },
    { week: '23', revenue: 3800, events: 9, attendees: 260 },
    { week: '24', revenue: 4500, events: 11, attendees: 320 },
    { week: '25', revenue: 4100, events: 10, attendees: 300 }
  ];

  const pieChartData = [
    { name: 'Your Event', value: 63, color: '#7C3AED' },
    { name: 'Instagram', value: 25, color: '#06B6D4' },
    { name: 'Other', value: 12, color: '#10B981' }
  ];

  const dailyTrafficData = [
    { day: '02', visitors: 1200 },
    { day: '04', visitors: 1800 },
    { day: '08', visitors: 2100 },
    { day: '12', visitors: 1600 },
    { day: '14', visitors: 2400 },
    { day: '16', visitors: 2800 },
    { day: '18', visitors: 2200 }
  ];

  const stats = [
    {
      title: 'Total Events',
      value: '75',
      change: '+12%',
      changeType: 'positive',
      icon: Calendar,
      color: 'primary'
    },
    {
      title: 'Tickets Sold',
      value: '1,234',
      change: '+5.2%',
      changeType: 'positive',
      icon: Users,
      color: 'success'
    },
    {
      title: 'Total Attendees',
      value: '2,847',
      change: '+8.1%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'warning'
    },
    {
      title: 'Total Revenue',
      value: '$25,670',
      change: '+15.3%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'info'
    }
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`stat-card stat-card-${stat.color}`}>
                <div className="stat-header">
                  <div className="stat-icon">
                    <Icon size={20} />
                  </div>
                  <div className={`stat-change ${stat.changeType}`}>
                    {stat.change}
                  </div>
                </div>
                
                <div className="stat-content">
                  <h3 className="stat-title">{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* Weekly Revenue Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Weekly Revenue</h3>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#7C3AED' }}></div>
                  <span>Revenue</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#06B6D4' }}></div>
                  <span>Events</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#10B981' }}></div>
                  <span>Attendees</span>
                </div>
              </div>
            </div>
            
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyRevenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="week" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#FFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="revenue" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Your Pie Chart</h3>
              <select className="chart-filter">
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            
            <div className="pie-chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="pie-chart-stats">
                {pieChartData.map((item, index) => (
                  <div key={index} className="pie-stat">
                    <div className="pie-stat-color" style={{ backgroundColor: item.color }}></div>
                    <div className="pie-stat-info">
                      <span className="pie-stat-label">{item.name}</span>
                      <span className="pie-stat-value">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Traffic */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Daily Traffic</h3>
              <div className="traffic-stats">
                <div className="traffic-stat">
                  <span className="traffic-value">2,579</span>
                  <span className="traffic-label">Visitors</span>
                </div>
                <div className="traffic-change">+24.5%</div>
              </div>
            </div>
            
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dailyTrafficData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#FFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#7C3AED" 
                    strokeWidth={3}
                    dot={{ fill: '#7C3AED', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#7C3AED' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Events Table */}
        <div className="recent-events">
          <div className="table-header">
            <h3>Recent Events</h3>
            <button className="btn btn-outline">View All</button>
          </div>
          
          <div className="events-table">
            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Attendees</th>
                  <th>Revenue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="event-info">
                      <div className="event-image">
                        <img src="/api/placeholder/40/40" alt="Event" />
                      </div>
                      <span>BestSeller Book Bootcamp</span>
                    </div>
                  </td>
                  <td>March 18, 2023</td>
                  <td>Lucknow</td>
                  <td>245</td>
                  <td>$2,450</td>
                  <td>
                    <span className="status-badge status-active">Active</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="event-info">
                      <div className="event-image">
                        <img src="/api/placeholder/40/40" alt="Event" />
                      </div>
                      <span>Tech Conference 2023</span>
                    </div>
                  </td>
                  <td>March 25, 2023</td>
                  <td>Mumbai</td>
                  <td>180</td>
                  <td>$1,800</td>
                  <td>
                    <span className="status-badge status-pending">Pending</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="event-info">
                      <div className="event-image">
                        <img src="/api/placeholder/40/40" alt="Event" />
                      </div>
                      <span>Music Festival</span>
                    </div>
                  </td>
                  <td>April 1, 2023</td>
                  <td>Delhi</td>
                  <td>520</td>
                  <td>$5,200</td>
                  <td>
                    <span className="status-badge status-completed">Completed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;