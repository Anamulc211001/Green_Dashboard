import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Trends from './pages/Trends';
import Users from './pages/Users';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { DashboardProvider } from './context/DashboardContext';
import { TimeRange } from './types';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  return (
    <DashboardProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
          <Header 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar open={sidebarOpen} />
            <main className="flex-1 overflow-auto p-6 bg-gray-50">
              <Routes>
                <Route path="/" element={<Dashboard timeRange={timeRange} />} />
                <Route path="/analytics" element={<Analytics timeRange={timeRange} />} />
                <Route path="/reports" element={<Reports timeRange={timeRange} />} />
                <Route path="/trends" element={<Trends timeRange={timeRange} />} />
                <Route path="/users" element={<Users timeRange={timeRange} />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </DashboardProvider>
  );
}

export default App;