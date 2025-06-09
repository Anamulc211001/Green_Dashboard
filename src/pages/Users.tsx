import React, { useState } from 'react';
import { useDashboardContext } from '../context/DashboardContext';
import { TimeRange } from '../types';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  TrendingUp
} from 'lucide-react';

interface UsersProps {
  timeRange: TimeRange;
}

const Users: React.FC<UsersProps> = ({ timeRange }) => {
  const { stats } = useDashboardContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const userStats = [
    { label: 'Total Users', value: '12,583', change: '+8.1%', icon: <UsersIcon className="text-green-500\" size={20} /> },
    { label: 'New Users', value: '1,247', change: '+12.3%', icon: <UserPlus className="text-green-500" size={20} /> },
    { label: 'Active Users', value: '8,432', change: '+5.7%', icon: <Activity className="text-green-500\" size={20} /> },
    { label: 'User Growth', value: '15.2%', change: '+2.1%', icon: <TrendingUp className="text-green-500" size={20} /> },
  ];

  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      status: 'Active',
      orders: 12,
      totalSpent: '$2,450'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      joinDate: '2024-01-10',
      lastActive: '1 day ago',
      status: 'Active',
      orders: 8,
      totalSpent: '$1,890'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      joinDate: '2024-01-08',
      lastActive: '3 days ago',
      status: 'Inactive',
      orders: 15,
      totalSpent: '$3,200'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      joinDate: '2024-01-05',
      lastActive: '5 hours ago',
      status: 'Active',
      orders: 6,
      totalSpent: '$980'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 567-8901',
      location: 'Chicago, IL',
      joinDate: '2024-01-03',
      lastActive: '1 week ago',
      status: 'Inactive',
      orders: 22,
      totalSpent: '$4,750'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         user.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-6">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
        
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">{stat.label}</span>
                {stat.icon}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-green-600 text-sm">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* User Table */}
      <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">All Users</h3>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <UserPlus size={16} />
              Add User
            </button>
          </div>
          
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={16} />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-gray-700 font-medium">User</th>
                <th className="text-left py-3 px-6 text-gray-700 font-medium">Contact</th>
                <th className="text-left py-3 px-6 text-gray-700 font-medium">Location</th>
                <th className="text-left py-3 px-6 text-gray-700 font-medium">Activity</th>
                <th className="text-left py-3 px-6 text-gray-700 font-medium">Orders</th>
                <th className="text-left py-3 px-6 text-gray-700 font-medium">Total Spent</th>
                <th className="text-left py-3 px-6 text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium">{user.name}</div>
                        <div className="text-gray-500 text-sm flex items-center gap-1">
                          <Calendar size={12} />
                          Joined {user.joinDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="text-gray-700 text-sm flex items-center gap-2">
                        <Mail size={12} />
                        {user.email}
                      </div>
                      <div className="text-gray-500 text-sm flex items-center gap-2">
                        <Phone size={12} />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-700 text-sm flex items-center gap-2">
                      <MapPin size={12} />
                      {user.location}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.status}
                      </span>
                      <div className="text-gray-500 text-xs">
                        Last active: {user.lastActive}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{user.orders}</td>
                  <td className="py-4 px-6 text-gray-900 font-medium">{user.totalSpent}</td>
                  <td className="py-4 px-6">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredUsers.length} of {users.length} users</span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors">
                Previous
              </button>
              <span className="px-3 py-1">1</span>
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;