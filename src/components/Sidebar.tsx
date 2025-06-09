import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart, 
  PieChart, 
  LineChart, 
  Settings, 
  Users, 
  Bell, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <BarChart size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <PieChart size={20} />, label: 'Reports', path: '/reports' },
    { icon: <LineChart size={20} />, label: 'Trends', path: '/trends' },
    { icon: <Users size={20} />, label: 'Users', path: '/users' },
    { icon: <Bell size={20} />, label: 'Notifications', path: '/notifications' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  if (!open) {
    return (
      <aside className="w-16 bg-white border-r border-gray-200 shadow-sm">
        <div className="py-6 flex flex-col items-center space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`p-3 w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'text-white bg-gradient-green shadow-md' 
                  : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
        <div className="mt-auto py-6 flex flex-col items-center border-t border-gray-200">
          <button className="p-3 w-12 h-12 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
            <LogOut size={20} />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-sm transition-all duration-300">
      <div className="py-6 px-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`mb-2 px-4 py-3 w-full flex items-center gap-3 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? 'text-white bg-gradient-green shadow-md' 
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-auto py-6 px-4 border-t border-gray-200">
        <button className="px-4 py-3 w-full flex items-center gap-3 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
          <LogOut size={20} />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;