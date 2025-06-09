import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useDashboardContext } from '../../context/DashboardContext';
import ChartCard from './ChartCard';
import { TimeRange } from '../../types';
import { getTimeRangeData } from '../../utils/dataUtils';

interface AreaChartWidgetProps {
  title: string;
  timeRange: TimeRange;
}

const AreaChartWidget: React.FC<AreaChartWidgetProps> = ({ title, timeRange }) => {
  const { revenueData } = useDashboardContext();
  const data = getTimeRangeData(revenueData, timeRange);

  const gradientId = `areaGradient-${title.replace(/\s+/g, '')}`;

  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
          />
          <YAxis 
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              borderColor: '#d1d5db',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              color: '#374151' 
            }}
            itemStyle={{ color: '#10b981' }}
            labelStyle={{ color: '#374151' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#10b981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill={`url(#${gradientId})`} 
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default AreaChartWidget;