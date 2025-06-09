import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover-lift transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-600 font-medium text-sm">{title}</h3>
        <div className="p-2 rounded-lg bg-green-50">
          <div className="text-green-600">
            {icon}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
        <div className="flex items-center">
          <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
            {isPositive ? (
              <ArrowUpRight size={16} className="mr-1" />
            ) : (
              <ArrowDownRight size={16} className="mr-1" />
            )}
            {Math.abs(change)}%
          </span>
          <span className="text-gray-500 text-sm ml-2">vs previous</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;