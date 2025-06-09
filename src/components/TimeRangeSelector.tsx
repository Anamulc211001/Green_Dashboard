import React from 'react';
import { TimeRange } from '../types';

interface TimeRangeSelectorProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ selected, onChange }) => {
  const ranges: { value: TimeRange; label: string }[] = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '90d', label: '90d' },
    { value: '1y', label: '1y' },
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value)}
          className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all duration-200 ${
            selected === range.value
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-green-600'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;