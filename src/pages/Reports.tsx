import React, { useState } from 'react';
import { useDashboardContext } from '../context/DashboardContext';
import { TimeRange } from '../types';
import { 
  Download, 
  FileText, 
  Calendar, 
  Filter,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart
} from 'lucide-react';

interface ReportsProps {
  timeRange: TimeRange;
}

const Reports: React.FC<ReportsProps> = ({ timeRange }) => {
  const { stats } = useDashboardContext();
  const [selectedReport, setSelectedReport] = useState('sales');

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: <DollarSign size={16} /> },
    { id: 'users', name: 'User Report', icon: <Users size={16} /> },
    { id: 'products', name: 'Product Report', icon: <ShoppingCart size={16} /> },
    { id: 'performance', name: 'Performance Report', icon: <TrendingUp size={16} /> },
  ];

  const recentReports = [
    { name: 'Monthly Sales Summary', date: '2024-01-15', type: 'Sales', status: 'Ready' },
    { name: 'User Acquisition Report', date: '2024-01-14', type: 'Users', status: 'Ready' },
    { name: 'Product Performance Q4', date: '2024-01-13', type: 'Products', status: 'Processing' },
    { name: 'Revenue Analytics', date: '2024-01-12', type: 'Sales', status: 'Ready' },
    { name: 'Customer Segmentation', date: '2024-01-11', type: 'Users', status: 'Ready' },
  ];

  return (
    <div className="space-y-6 pb-6">
      <section>
        <h2 className="text-2xl font-bold mb-6">Reports & Analytics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Generator */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FileText className="text-blue-500" size={20} />
              Generate New Report
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Report Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {reportTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedReport(type.id)}
                      className={`p-3 rounded-lg border transition-colors flex items-center gap-2 ${
                        selectedReport === type.id
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                          : 'border-gray-600 hover:border-gray-500 text-gray-300'
                      }`}
                    >
                      {type.icon}
                      <span className="text-sm">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date Range
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>Last year</option>
                      <option>Custom range</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Format
                  </label>
                  <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Download size={16} />
                Generate Report
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Total Reports</span>
                  <span className="text-white font-medium">247</span>
                </div>
              </div>
              <div className="p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">This Month</span>
                  <span className="text-white font-medium">18</span>
                </div>
              </div>
              <div className="p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Scheduled</span>
                  <span className="text-white font-medium">5</span>
                </div>
              </div>
              <div className="p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Processing</span>
                  <span className="text-orange-400 font-medium">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reports */}
      <section className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Recent Reports</h3>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Report Name</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report, index) => (
                <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3 px-4 text-white">{report.name}</td>
                  <td className="py-3 px-4 text-gray-300">{report.type}</td>
                  <td className="py-3 px-4 text-gray-300">{report.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      report.status === 'Ready' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Reports;