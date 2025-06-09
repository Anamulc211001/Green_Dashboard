import React, { useState } from 'react';
import { useDashboardContext } from '../context/DashboardContext';
import LineChartWidget from '../components/charts/LineChartWidget';
import AreaChartWidget from '../components/charts/AreaChartWidget';
import { TimeRange } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface TrendsProps {
  timeRange: TimeRange;
}

const Trends: React.FC<TrendsProps> = ({ timeRange }) => {
  const { stats } = useDashboardContext();
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const trendMetrics = [
    { id: 'revenue', name: 'Revenue', value: '$128,745', change: 12.3, icon: <TrendingUp size={16} /> },
    { id: 'users', name: 'Users', value: '12,583', change: 8.1, icon: <Activity size={16} /> },
    { id: 'conversion', name: 'Conversion', value: '3.2%', change: -0.5, icon: <Zap size={16} /> },
    { id: 'orders', name: 'Orders', value: '1,482', change: 4.2, icon: <TrendingUp size={16} /> },
  ];

  const insights = [
    {
      title: 'Revenue Growth Acceleration',
      description: 'Revenue growth has increased by 23% compared to last month, driven by higher conversion rates.',
      impact: 'High',
      trend: 'positive'
    },
    {
      title: 'User Acquisition Slowdown',
      description: 'New user acquisition has decreased by 8% this week. Consider reviewing marketing campaigns.',
      impact: 'Medium',
      trend: 'negative'
    },
    {
      title: 'Mobile Traffic Surge',
      description: 'Mobile traffic has increased by 45% over the past 30 days, now representing 68% of total traffic.',
      impact: 'High',
      trend: 'positive'
    },
    {
      title: 'Seasonal Pattern Detected',
      description: 'Weekend sales consistently outperform weekdays by 35%. Consider weekend-specific promotions.',
      impact: 'Medium',
      trend: 'positive'
    }
  ];

  const forecasts = [
    { metric: 'Revenue', current: '$128,745', predicted: '$142,890', confidence: '87%' },
    { metric: 'Users', current: '12,583', predicted: '13,420', confidence: '92%' },
    { metric: 'Orders', current: '1,482', predicted: '1,650', confidence: '84%' },
    { metric: 'Conversion Rate', current: '3.2%', predicted: '3.4%', confidence: '79%' },
  ];

  return (
    <div className="space-y-6 pb-6">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Trends & Insights</h2>
        
        {/* Trend Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {trendMetrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedMetric === metric.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">{metric.name}</span>
                <span className={`p-1 rounded ${selectedMetric === metric.id ? 'text-green-600' : 'text-gray-400'}`}>
                  {metric.icon}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">{metric.value}</span>
                <div className={`flex items-center text-sm ${
                  metric.change >= 0 ? 'text-green-600' : 'text-red-500'
                }`}>
                  {metric.change >= 0 ? (
                    <ArrowUpRight size={14} className="mr-1" />
                  ) : (
                    <ArrowDownRight size={14} className="mr-1" />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaChartWidget title="Revenue Trends" timeRange={timeRange} />
        <LineChartWidget title="User Growth Trends" timeRange={timeRange} />
      </section>

      {/* Insights and Forecasts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="text-green-500" size={20} />
            AI-Powered Insights
          </h3>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-gray-900 font-medium">{insight.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      insight.impact === 'High' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {insight.impact}
                    </span>
                    <span className={`${
                      insight.trend === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {insight.trend === 'positive' ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Forecasts */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="text-green-500" size={20} />
            30-Day Forecasts
          </h3>
          <div className="space-y-4">
            {forecasts.map((forecast, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">{forecast.metric}</span>
                  <span className="text-xs text-gray-500">
                    {forecast.confidence} confidence
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Current</div>
                    <div className="text-gray-900 font-medium">{forecast.current}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Predicted</div>
                    <div className="text-green-600 font-medium">{forecast.predicted}</div>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-green-500 h-1 rounded-full"
                    style={{ width: forecast.confidence }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trends;