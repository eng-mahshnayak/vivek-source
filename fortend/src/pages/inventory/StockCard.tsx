import React from 'react';

interface StockCardProps {
  title: string;
  stock: number;
  unit: string;
  minStock: number;
  maxStock: number;
  location: string;
  id: string;
  type: 'item' | 'component';
}

const StockCard: React.FC<StockCardProps> = ({
  title,
  stock,
  unit,
  minStock,
  maxStock,
  location,
  id,
  type
}) => {
  // Calculate stock percentage for progress bar
  const stockPercentage = Math.min((stock / maxStock) * 100, 100);
  
  // Determine stock status
  const getStockStatus = () => {
    if (stock < minStock) return { label: 'Low Stock', color: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500' };
    if (stock > maxStock) return { label: 'Over Stock', color: 'text-yellow-600', bg: 'bg-yellow-100', bar: 'bg-yellow-500' };
    return { label: 'In Stock', color: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500' };
  };

  const status = getStockStatus();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Card Header with Icon */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${type === 'item' ? 'bg-blue-100' : 'bg-purple-100'}`}>
              {type === 'item' ? (
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9h14M5 15h14M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
                </svg>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 line-clamp-1">{title}</h3>
              <p className="text-xs text-gray-500">ID: {id}</p>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${status.bg} ${status.color} font-medium`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Card Body - Stock Info */}
      <div className="p-4 space-y-3">
        {/* Main Stock Number */}
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold text-gray-800">{stock}</span>
          <span className="text-sm text-gray-500">{unit}</span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Min: {minStock}</span>
            <span>Max: {maxStock}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`${status.bar} h-2.5 rounded-full transition-all duration-500`}
              style={{ width: `${stockPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Location and Quick Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex space-x-1">
            <button className="p-1 hover:bg-blue-50 rounded transition-colors" title="Edit">
              <svg className="w-4 h-4 text-gray-500 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button className="p-1 hover:bg-green-50 rounded transition-colors" title="History">
              <svg className="w-4 h-4 text-gray-500 hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Footer with subtle pattern */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </div>
  );
};

export default StockCard;