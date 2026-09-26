import React, { useState } from 'react';

const ProfitEstimationReport: React.FC = () => {
  const [period, setPeriod] = useState('monthly');

  const profitData = [
    { category: 'Electronics', revenue: 450000, cost: 320000, profit: 130000, margin: 28.9 },
    { category: 'Accessories', revenue: 280000, cost: 180000, profit: 100000, margin: 35.7 },
    { category: 'Storage', revenue: 190000, cost: 130000, profit: 60000, margin: 31.6 },
    { category: 'Networking', revenue: 120000, cost: 85000, profit: 35000, margin: 29.2 },
    { category: 'Components', revenue: 320000, cost: 240000, profit: 80000, margin: 25.0 },
  ];

  const totalRevenue = profitData.reduce((acc, item) => acc + item.revenue, 0);
  const totalCost = profitData.reduce((acc, item) => acc + item.cost, 0);
  const totalProfit = profitData.reduce((acc, item) => acc + item.profit, 0);
  const avgMargin = (totalProfit / totalRevenue * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">💰 Profit Estimation Report</h1>
            <p className="text-gray-600 mt-1">Analyze profits across categories and time periods</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <select 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-blue-100 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-red-100 text-sm">Total Cost</p>
          <p className="text-3xl font-bold">₹{totalCost.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-green-100 text-sm">Total Profit</p>
          <p className="text-3xl font-bold">₹{totalProfit.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-purple-100 text-sm">Profit Margin</p>
          <p className="text-3xl font-bold">{avgMargin}%</p>
        </div>
      </div>

      {/* Category-wise Profit Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">Category-wise Profit Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue (₹)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Cost (₹)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Profit (₹)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Margin (%)</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Trend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {profitData.map((item) => (
                <tr key={item.category} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">₹{item.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">₹{item.cost.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-green-600">₹{item.profit.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.margin > 30 ? 'bg-green-100 text-green-800' : 
                      item.margin > 25 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.margin}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-green-500">↑ 12%</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 font-semibold">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Total</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">₹{totalRevenue.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">₹{totalCost.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-right text-green-600">₹{totalProfit.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-right text-gray-900">{avgMargin}%</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Profit Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Profit Trend</h3>
          <div className="h-64 flex items-end space-x-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => {
              const height = Math.floor(Math.random() * 70) + 20;
              return (
                <div key={month} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-green-500 rounded-t-lg" style={{ height: `${height}%` }}></div>
                  <span className="text-xs mt-2 text-gray-600">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Profitable Items</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Laptop Dell XPS 15</p>
                <p className="text-xs text-gray-500">Sold: 45 units</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">₹4,50,000</p>
                <p className="text-xs text-gray-500">Margin: 32%</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Samsung Monitor 24"</p>
                <p className="text-xs text-gray-500">Sold: 18 units</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">₹1,80,000</p>
                <p className="text-xs text-gray-500">Margin: 28%</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Logitech Mouse</p>
                <p className="text-xs text-gray-500">Sold: 156 units</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">₹1,56,000</p>
                <p className="text-xs text-gray-500">Margin: 45%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitEstimationReport;