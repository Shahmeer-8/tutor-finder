import React from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface SimpleBarChartProps {
  data: DataPoint[];
  height?: number;
  className?: string;
  formatter?: (value: number) => string;
}

export function SimpleBarChart({ 
  data, 
  height = 200, 
  className = '',
  formatter = (val) => val.toString()
}: SimpleBarChartProps) {
  if (!data || data.length === 0) {
    return <div className={`flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg ${className}`} style={{ height }}>No data available</div>;
  }

  // Find max value to calculate bar heights
  const maxVal = Math.max(...data.map(d => d.value), 1); // fallback to 1 to avoid division by 0
  
  return (
    <div className={`relative flex items-end w-full gap-2 pt-6 ${className}`} style={{ height }}>
      {data.map((point, i) => {
        const barHeight = Math.max((point.value / maxVal) * 100, 2); // Minimum 2% height for visibility
        
        return (
          <div key={i} className="group relative flex flex-col items-center flex-1 h-full justify-end">
            {/* Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity z-10 pointer-events-none">
              {point.label}: {formatter(point.value)}
            </div>
            
            {/* Bar */}
            <div 
              className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors duration-300"
              style={{ height: `${barHeight}%` }}
            ></div>
            
            {/* Label */}
            <span className="text-[10px] text-gray-500 mt-2 truncate w-full text-center hidden sm:block">
              {point.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
