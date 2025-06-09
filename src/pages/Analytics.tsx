import React from 'react';
import { useDashboardContext } from '../context/DashboardContext';
import AreaChartWidget from '../components/charts/AreaChartWidget';
import LineChartWidget from '../components/charts/LineChartWidget';
import BarChartWidget from '../components/charts/BarChartWidget';
import StatCard from '../components/StatCard';
import { TimeRange } from '../types';
import { 
  Eye, 
  MousePointer, 
  Clock, 
  Target,
  TrendingUp,
  Users
} from 'lucide-react';

interface AnalyticsProps {
  timeRange: TimeRange;
}

const Analytics: React.FC<AnalyticsProps> = ({ timeRange }) => {
  const { stats } = useDashboardContext();

  const analyticsStats = {
    pageViews: 45672,
    pageViewsChange: 15.2,
    clickThrough: 3.8,
    clickThroughChange: 0.4,
    avgSessionTime: 4.2,
    avgSessionTimeChange: -0.3,
    bounceRate: 42.1,
    bounceRateChange: -2.1,
  };

  return (
    <div className="space-y-8 pb-8">
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics Deep Dive</h2>
          <p className="text-gray-600">Comprehensive insights into your website performance and user behavior.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Page Views"
            value={analyticsStats.pageViews.toLocaleString()}
            change={analyticsStats.pageViewsChange}
            icon={<Eye size={20} />}
          />
          <StatCard
            title="Click-through Rate"
            value={`${analyticsStats.clickThrough}%`}
            change={analyticsStats.clickThroughChange}
            icon={<MousePointer size={20} />}
          />
          <StatCard
            title="Avg. Session Time"
            value={`${analyticsStats.avgSessionTime}m`}
            change={analyticsStats.avgSessionTimeChange}
            icon={<Clock size={20} />}
          />
          <StatCard
            title="Bounce Rate"
            value={`${analyticsStats.bounceRate}%`}
            change={analyticsStats.bounceRateChange}
            icon={<Target size={20} />}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover-lift transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="text-green-600" size={20} />
            Conversion Funnel
          </h3>
          <div className="space-y-4">
            {[
              { stage: 'Visitors', count: 12583, percentage: 100 },
              { stage: 'Product Views', count: 8945, percentage: 71 },
              { stage: 'Add to Cart', count: 3421, percentage: 27 },
              { stage: 'Checkout', count: 1876, percentage: 15 },
              { stage: 'Purchase', count: 1482, percentage: 12 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">{item.stage}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-900 font-semibold w-16 text-right">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover-lift transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="text-green-600" size={20} />
            User Engagement
          </h3>
          <div className="space-y-4">
            {[
              { metric: 'Daily Active Users', value: '8,432', change: '+12%' },
              { metric: 'Weekly Active Users', value: '24,891', change: '+8%' },
              { metric: 'Monthly Active Users', value: '89,234', change: '+15%' },
              { metric: 'User Retention (7d)', value: '68%', change: '+3%' },
              { metric: 'User Retention (30d)', value: '42%', change: '+1%' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">{item.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-semibold">{item.value}</span>
                  <span className="text-green-600 text-sm font-medium">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaChartWidget title="Revenue Analytics" timeRange={timeRange} />
        <LineChartWidget title="User Engagement Trends" timeRange={timeRange} />
      </section>

      <section>
        <BarChartWidget title="Performance by Category" timeRange={timeRange} />
      </section>
    </div>
  );
};

export default Analytics;