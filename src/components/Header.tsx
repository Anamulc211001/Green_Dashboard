import React from 'react';
import { MenuIcon, X, Download } from 'lucide-react';
import TimeRangeSelector from './TimeRangeSelector';
import { TimeRange } from '../types';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  sidebarOpen, 
  setSidebarOpen,
  timeRange,
  setTimeRange
}) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 p-2 rounded-lg text-gray-500 hover:text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-green rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-xs text-gray-500">by Md Anamul Haque</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <TimeRangeSelector 
            selected={timeRange} 
            onChange={setTimeRange} 
          />
          
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-green hover:bg-gradient-green-dark rounded-lg text-white text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;