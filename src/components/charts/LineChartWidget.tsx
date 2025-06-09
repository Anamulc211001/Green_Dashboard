import React from 'react';
import { 
  LineChart, 
  Line, 
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

interface LineChartWidgetProps {
  title: string;
  timeRange: TimeRange;
}

const LineChartWidget: React.FC<LineChartWidgetProps> = ({ title, timeRange }) => {
  const { userData } = useDashboardContext();
  const data = getTimeRangeData(userData, timeRange);

  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
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
            formatter={(value: number) => [value.toLocaleString(), 'Users']}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ stroke: '#10b981', strokeWidth: 2, r: 4, fill: 'white' }}
            activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#10b981' }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default LineChartWidget;