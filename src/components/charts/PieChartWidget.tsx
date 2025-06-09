import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { useDashboardContext } from '../../context/DashboardContext';
import ChartCard from './ChartCard';
import { TimeRange } from '../../types';

interface PieChartWidgetProps {
  title: string;
  timeRange: TimeRange;
}

const PieChartWidget: React.FC<PieChartWidgetProps> = ({ title, timeRange }) => {
  const { trafficData } = useDashboardContext();
  const data = trafficData;
  
  const COLORS = ['#10b981', '#059669', '#047857', '#065f46', '#064e3b'];
  
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent 
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    
    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };
  
  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#10b981"
            dataKey="value"
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
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
            formatter={(value: number) => [`${value.toLocaleString()} (${((value/trafficData.reduce((acc, item) => acc + item.value, 0))*100).toFixed(1)}%)`, 'Visitors']}
          />
          <Legend 
            formatter={(value) => <span style={{ color: '#374151' }}>{value}</span>}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default PieChartWidget;