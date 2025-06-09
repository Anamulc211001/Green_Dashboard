import React, { useState } from 'react';
import { 
  Bell, 
  Settings, 
  Check, 
  X, 
  AlertCircle, 
  Info, 
  CheckCircle,
  Clock,
  Filter,
  MoreVertical
} from 'lucide-react';

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Revenue Goal Achieved',
      message: 'Monthly revenue target of $125,000 has been reached 3 days early.',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Inventory Alert',
      message: 'Product "Wireless Earbuds Pro" has only 5 units remaining in stock.',
      time: '15 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'New User Registration',
      message: '127 new users registered in the last 24 hours.',
      time: '1 hour ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'error',
      title: 'Payment Processing Error',
      message: 'Failed to process 3 payments. Manual review required.',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 5,
      type: 'info',
      title: 'Weekly Report Ready',
      message: 'Your weekly analytics report is ready for download.',
      time: '3 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 6,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily database backup completed successfully.',
      time: '6 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 7,
      type: 'warning',
      title: 'High Server Load',
      message: 'Server CPU usage is at 85%. Consider scaling resources.',
      time: '8 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 8,
      type: 'info',
      title: 'Feature Update',
      message: 'New dashboard widgets are now available in the analytics section.',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={20} />;
      case 'error':
        return <X className="text-red-500" size={20} />;
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'high') return notif.priority === 'high';
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="space-y-6 pb-6">
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
            >
              <Check size={16} />
              Mark all read
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors">
              <Settings size={16} />
              Settings
            </button>
          </div>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-2xl font-bold text-white">{notifications.length}</p>
              </div>
              <Bell className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Unread</p>
                <p className="text-2xl font-bold text-white">{unreadCount}</p>
              </div>
              <AlertCircle className="text-orange-500" size={24} />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">High Priority</p>
                <p className="text-2xl font-bold text-white">
                  {notifications.filter(n => n.priority === 'high').length}
                </p>
              </div>
              <X className="text-red-500" size={24} />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Today</p>
                <p className="text-2xl font-bold text-white">
                  {notifications.filter(n => n.time.includes('hour') || n.time.includes('minute')).length}
                </p>
              </div>
              <Clock className="text-green-500" size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* Notifications List */}
      <section className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Recent Notifications</h3>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={16} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-700">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 hover:bg-gray-700/30 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.read ? 'bg-gray-700/20' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{notification.message}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {notification.time}
                      </span>
                      <span className={`px-2 py-1 rounded-full ${
                        notification.priority === 'high' 
                          ? 'bg-red-500/20 text-red-400'
                          : notification.priority === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {notification.priority} priority
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <X size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="p-12 text-center">
            <Bell className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! No new notifications to show.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Notifications;