import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useDashboardContext } from '../../context/DashboardContext';
import ChartCard from './ChartCard';
import { TimeRange } from '../../types';
import { getBarChartData } from '../../utils/dataUtils';

interface BarChartWidgetProps {
  title: string;
  timeRange: TimeRange;
  variant?: 'vertical' | 'horizontal';
}

const BarChartWidget: React.FC<BarChartWidgetProps> = ({ 
  title, 
  timeRange,
  variant = 'vertical'
}) => {
  const { categoryData, productData } = useDashboardContext();
  const isHorizontal = variant === 'horizontal';
  
  const rawData = title.includes('Category') ? categoryData : productData;
  const data = getBarChartData(rawData, timeRange, isHorizontal ? 5 : 8);
  
  const dataKey = isHorizontal ? 'value' : 'name';
  const barDataKey = isHorizontal ? 'name' : 'value';
  
  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 10, right: 10, left: isHorizontal ? 70 : 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            type={isHorizontal ? 'number' : 'category'}
            dataKey={isHorizontal ? undefined : dataKey}
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
            tickFormatter={isHorizontal ? (value) => `$${value.toLocaleString()}` : undefined}
          />
          <YAxis 
            type={isHorizontal ? 'category' : 'number'}
            dataKey={isHorizontal ? dataKey : undefined}
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#d1d5db' }}
            tickFormatter={!isHorizontal ? (value) => `$${value.toLocaleString()}` : undefined}
            width={isHorizontal ? 70 : 40}
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
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
          />
          <Bar 
            dataKey={barDataKey} 
            fill="#10b981" 
            radius={[4, 4, 0, 0]} 
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default BarChartWidget;