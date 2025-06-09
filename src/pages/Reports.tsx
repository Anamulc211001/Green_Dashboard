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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Generator */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="text-green-500" size={20} />
              Generate New Report
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {reportTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedReport(type.id)}
                      className={`p-3 rounded-lg border transition-colors flex items-center gap-2 ${
                        selectedReport === type.id
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-green-300 text-gray-700'
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>Last year</option>
                      <option>Custom range</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format
                  </label>
                  <select className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Download size={16} />
                Generate Report
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Total Reports</span>
                  <span className="text-gray-900 font-medium">247</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">This Month</span>
                  <span className="text-gray-900 font-medium">18</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Scheduled</span>
                  <span className="text-gray-900 font-medium">5</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Processing</span>
                  <span className="text-orange-600 font-medium">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reports */}
      <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Report Name</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{report.name}</td>
                  <td className="py-3 px-4 text-gray-600">{report.type}</td>
                  <td className="py-3 px-4 text-gray-600">{report.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      report.status === 'Ready' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-green-600 hover:text-green-700 transition-colors">
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