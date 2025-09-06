
'use client';

import { useEffect, useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Define types for the API response
interface SummaryData {
  totalRevenue: number;
  subscriptions: number;
  activeUsers: number;
  activeNow: number;
}

interface ChartData {
  _id: string;
  count: number;
}

interface RecentUser {
  name: string;
  email: string;
  createdAt: string;
}

interface RecentGuestbook {
  name?: string;
  username?: string;
  createdAt: string;
}

interface RecentMessage {
  subject?: string;
  name: string;
  createdAt: string;
}

interface DashboardData {
  summary: SummaryData;
  charts: {
    userGrowth: ChartData[];
    visitorTrends: ChartData[];
    projectCategories: ChartData[];
    serviceStatuses: ChartData[];
  };
  recent: {
    users: RecentUser[];
    guestbooks: RecentGuestbook[];
    messages: RecentMessage[];
  };
}

interface ApiResponse {
  success: boolean;
  data: DashboardData;
  message?: string;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/stats');
        const result = await response.json() as ApiResponse;
        
        if (result.success) {
          setDashboardData(result.data);
        } else {
          setError(result.message || 'Unknown error occurred');
        }
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dashboardData) return <div>No data available</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(dashboardData.summary).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').replace('total', '')}</h3>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.charts.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Visitor Trends Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Visitor Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.charts.visitorTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Project Categories Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Projects by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.charts.projectCategories}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Service Request Status Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Service Request Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={dashboardData.charts.serviceStatuses} 
                dataKey="count" 
                nameKey="_id" 
                cx="50%" 
                cy="50%" 
                outerRadius={100} 
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Items Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
          <ul className="divide-y">
            {dashboardData.recent.users.map((user, index) => (
              <li key={index} className="py-2">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Guestbooks</h3>
          <ul className="divide-y">
            {dashboardData.recent.guestbooks.map((guest, index) => (
              <li key={index} className="py-2">
                <p className="font-medium">{guest.name || guest.username}</p>
                <p className="text-xs text-gray-400">
                  {new Date(guest.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Messages */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
          <ul className="divide-y">
            {dashboardData.recent.messages.map((message, index) => (
              <li key={index} className="py-2">
                <p className="font-medium">{message.subject || 'No Subject'}</p>
                <p className="text-sm text-gray-500">{message.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(message.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
