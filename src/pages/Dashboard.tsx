import React from 'react';
import { useDashboardContext } from '../context/DashboardContext';
import StatCard from '../components/StatCard';
import AreaChartWidget from '../components/charts/AreaChartWidget';
import BarChartWidget from '../components/charts/BarChartWidget';
import LineChartWidget from '../components/charts/LineChartWidget';
import PieChartWidget from '../components/charts/PieChartWidget';
import { TimeRange } from '../types';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart 
} from 'lucide-react';

interface DashboardProps {
  timeRange: TimeRange;
}

const Dashboard: React.FC<DashboardProps> = ({ timeRange }) => {
  const { stats } = useDashboardContext();

  return (
    <div className="space-y-8 pb-8">
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            change={stats.revenueChange}
            icon={<DollarSign size={20} />}
          />
          <StatCard
            title="Users"
            value={stats.users.toLocaleString()}
            change={stats.usersChange}
            icon={<Users size={20} />}
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            change={stats.conversionRateChange}
            icon={<TrendingUp size={20} />}
          />
          <StatCard
            title="Orders"
            value={stats.orders.toLocaleString()}
            change={stats.ordersChange}
            icon={<ShoppingCart size={20} />}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaChartWidget title="Revenue Trend" timeRange={timeRange} />
        <LineChartWidget title="User Growth" timeRange={timeRange} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BarChartWidget title="Sales by Category" timeRange={timeRange} />
        <BarChartWidget title="Top Products" timeRange={timeRange} variant="horizontal" />
        <PieChartWidget title="Traffic Sources" timeRange={timeRange} />
      </section>
    </div>
  );
};

export default Dashboard;