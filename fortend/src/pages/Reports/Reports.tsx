import React from 'react';
import { Link } from 'react-router-dom';

const Reports: React.FC = () => {
  const reports = [
    {
      id: 1,
      title: 'Daily Sale Report',
      description: 'View daily sales transactions and revenue',
      icon: '📊',
      color: 'bg-blue-500',
      path: '/reports/daily-sale',
      stats: 'Today: ₹45,678'
    },

     {
      id: 2,
      title: 'Purchase vs Sale',
      description: 'Compare purchases with sales',
      icon: '📊',
      color: 'bg-indigo-500',
      path: '/reports/purchase-vs-sale',
      stats: 'Ratio: 1.2'
    },
   
    {
      id: 3,
      title: 'Stock Report',
      description: 'Complete inventory status with values',
      icon: '📈',
      color: 'bg-purple-500',
      path: '/reports/stock',
      stats: 'Value: ₹12,45,678'
    },
     {
      id: 4,
      title: 'Delivery Boy Collection',
      description: 'Collections from delivery personnel',
      icon: '🚚',
      color: 'bg-red-500',
      path: '/reports/delivery-boy',
      stats: 'Pending: ₹45,678'
    },
     {
      id: 5,
      title: 'Item-wise Summary',
      description: 'Stock levels and movement for each item',
      icon: '📦',
      color: 'bg-green-500',
      path: '/reports/item-wise',
      stats: '156 items'
    },
    {
      id: 6,
      title: 'Credit Outstanding',
      description: 'Pending customer payments',
      icon: '💳',
      color: 'bg-yellow-500',
      path: '/reports/credit',
      stats: 'Due: ₹2,34,567'
    },
   
    {
      id: 7,
      title: 'Shortage Report',
      description: 'Items below minimum stock level',
      icon: '⚠️',
      color: 'bg-orange-500',
      path: '/reports/shortage',
      stats: '12 items low'
    },
   
    {
      id: 8,
      title: 'Profit Estimation',
      description: 'Estimated profit calculations',
      icon: '💰',
      color: 'bg-pink-500',
      path: '/reports/profit',
      stats: 'Profit: ₹3,45,678'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">📊 Reports Dashboard</h1>
        <p className="text-gray-600 mt-1">Select a report to view detailed analytics</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Reports</p>
          <p className="text-2xl font-bold text-gray-800">8</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Last Generated</p>
          <p className="text-lg font-semibold text-gray-800">Today 10:30 AM</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Date Range</p>
          <p className="text-lg font-semibold text-gray-800">Jan 1 - Jan 31</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Export Format</p>
          <select className="mt-1 block w-full text-sm border-gray-300 rounded-md">
            <option>PDF</option>
            <option>Excel</option>
            <option>CSV</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {reports.map((report) => (
          <Link
            key={report.id}
            to={report.path}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
          >
            <div className={`${report.color} h-2`}></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{report.icon}</span>
                <span className="text-xs text-gray-400">ID: {report.id}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{report.stats}</span>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recently Generated Reports</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📄</span>
                <div>
                  <p className="font-medium text-gray-800">Daily Sale Report - {i} Jan 2024</p>
                  <p className="text-xs text-gray-500">Generated: Today 10:30 AM</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;