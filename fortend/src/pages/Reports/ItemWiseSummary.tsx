import React, { useState } from 'react';

const ItemWiseSummary: React.FC = () => {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table'); // table, card, analytics

  // Enhanced item data with more fields
  const items = [
    {
      id: 'ITEM001',
      name: 'Laptop Dell XPS 15',
      category: 'Electronics',
      stock: 45,
      unit: 'pcs',
      minStock: 20,
      maxStock: 100,
      purchasePrice: 65000,
      sellingPrice: 75000,
      sales: 28,
      purchase: 35,
      revenue: 2100000,
      cost: 1820000,
      profit: 280000,
      location: 'Rack A-01',
      supplier: 'Dell India',
      lastSold: '2024-01-15',
      turnover: 0.62,
      margin: 13.3,
      status: 'Active'
    },
    {
      id: 'ITEM002',
      name: 'HP LaserJet Printer',
      category: 'Electronics',
      stock: 23,
      unit: 'pcs',
      minStock: 10,
      maxStock: 50,
      purchasePrice: 12000,
      sellingPrice: 15500,
      sales: 15,
      purchase: 12,
      revenue: 232500,
      cost: 180000,
      profit: 52500,
      location: 'Rack B-03',
      supplier: 'HP India',
      lastSold: '2024-01-14',
      turnover: 0.65,
      margin: 22.6,
      status: 'Active'
    },
    {
      id: 'ITEM003',
      name: 'Logitech Mouse',
      category: 'Accessories',
      stock: 156,
      unit: 'pcs',
      minStock: 50,
      maxStock: 200,
      purchasePrice: 450,
      sellingPrice: 650,
      sales: 89,
      purchase: 95,
      revenue: 57850,
      cost: 40050,
      profit: 17800,
      location: 'Rack C-02',
      supplier: 'Logitech',
      lastSold: '2024-01-15',
      turnover: 0.57,
      margin: 30.8,
      status: 'Active'
    },
    {
      id: 'ITEM004',
      name: 'Samsung Monitor 24"',
      category: 'Electronics',
      stock: 18,
      unit: 'pcs',
      minStock: 15,
      maxStock: 40,
      purchasePrice: 8500,
      sellingPrice: 11500,
      sales: 12,
      purchase: 10,
      revenue: 138000,
      cost: 102000,
      profit: 36000,
      location: 'Rack A-04',
      supplier: 'Samsung',
      lastSold: '2024-01-13',
      turnover: 0.67,
      margin: 26.1,
      status: 'Active'
    },
    {
      id: 'ITEM005',
      name: 'Seagate 1TB HDD',
      category: 'Storage',
      stock: 67,
      unit: 'pcs',
      minStock: 30,
      maxStock: 120,
      purchasePrice: 3200,
      sellingPrice: 4200,
      sales: 45,
      purchase: 40,
      revenue: 189000,
      cost: 144000,
      profit: 45000,
      location: 'Rack D-01',
      supplier: 'Seagate',
      lastSold: '2024-01-15',
      turnover: 0.67,
      margin: 23.8,
      status: 'Active'
    },
    {
      id: 'ITEM006',
      name: 'iPhone 13 Cover',
      category: 'Accessories',
      stock: 234,
      unit: 'pcs',
      minStock: 100,
      maxStock: 500,
      purchasePrice: 180,
      sellingPrice: 299,
      sales: 156,
      purchase: 180,
      revenue: 46644,
      cost: 28080,
      profit: 18564,
      location: 'Rack H-01',
      supplier: 'Local Supplier',
      lastSold: '2024-01-15',
      turnover: 0.67,
      margin: 39.8,
      status: 'Active'
    },
    {
      id: 'ITEM007',
      name: 'USB-C Hub',
      category: 'Accessories',
      stock: 89,
      unit: 'pcs',
      minStock: 40,
      maxStock: 150,
      purchasePrice: 550,
      sellingPrice: 899,
      sales: 67,
      purchase: 55,
      revenue: 60233,
      cost: 36850,
      profit: 23383,
      location: 'Rack H-02',
      supplier: 'Anker',
      lastSold: '2024-01-14',
      turnover: 0.75,
      margin: 38.8,
      status: 'Active'
    },
    {
      id: 'ITEM008',
      name: 'Wireless Keyboard',
      category: 'Accessories',
      stock: 34,
      unit: 'pcs',
      minStock: 25,
      maxStock: 80,
      purchasePrice: 950,
      sellingPrice: 1499,
      sales: 28,
      purchase: 30,
      revenue: 41972,
      cost: 26600,
      profit: 15372,
      location: 'Rack C-03',
      supplier: 'Logitech',
      lastSold: '2024-01-12',
      turnover: 0.82,
      margin: 36.6,
      status: 'Active'
    },
    {
      id: 'ITEM009',
      name: 'External DVD Drive',
      category: 'Storage',
      stock: 12,
      unit: 'pcs',
      minStock: 15,
      maxStock: 40,
      purchasePrice: 1800,
      sellingPrice: 2499,
      sales: 8,
      purchase: 5,
      revenue: 19992,
      cost: 14400,
      profit: 5592,
      location: 'Rack D-02',
      supplier: 'LG',
      lastSold: '2024-01-10',
      turnover: 0.67,
      margin: 28.0,
      status: 'Low Stock'
    },
    {
      id: 'ITEM010',
      name: 'Network Switch 8-Port',
      category: 'Networking',
      stock: 28,
      unit: 'pcs',
      minStock: 20,
      maxStock: 60,
      purchasePrice: 2200,
      sellingPrice: 3299,
      sales: 18,
      purchase: 15,
      revenue: 59382,
      cost: 39600,
      profit: 19782,
      location: 'Rack E-04',
      supplier: 'TP-Link',
      lastSold: '2024-01-13',
      turnover: 0.64,
      margin: 33.3,
      status: 'Active'
    }
  ];

  const categories = ['all', ...new Set(items.map(item => item.category))];

  // Filter and sort logic
  const filteredItems = items.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch(sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'stock': return b.stock - a.stock;
      case 'sales': return b.sales - a.sales;
      case 'profit': return b.profit - a.profit;
      case 'margin': return b.margin - a.margin;
      default: return 0;
    }
  });

  // Calculate totals
  const totalItems = items.length;
  const totalStock = items.reduce((acc, item) => acc + item.stock, 0);
  const totalSales = items.reduce((acc, item) => acc + item.sales, 0);
  const totalRevenue = items.reduce((acc, item) => acc + item.revenue, 0);
  const totalProfit = items.reduce((acc, item) => acc + item.profit, 0);
  const avgMargin = (totalProfit / totalRevenue * 100).toFixed(1);

  console.log(avgMargin);
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">📦 Item-wise Summary Report</h1>
        <p className="text-gray-600 mt-1">Comprehensive analysis of item performance and profitability</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-blue-100 text-sm">Total Items</p>
          <p className="text-3xl font-bold">{totalItems}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-green-100 text-sm">Total Stock</p>
          <p className="text-3xl font-bold">{totalStock}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-purple-100 text-sm">Total Sales</p>
          <p className="text-3xl font-bold">{totalSales}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-yellow-100 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold">₹{(totalRevenue/100000).toFixed(1)}L</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-red-100 text-sm">Total Profit</p>
          <p className="text-3xl font-bold">₹{(totalProfit/100000).toFixed(1)}L</p>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search by item name or ID..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="stock">Sort by Stock</option>
              <option value="sales">Sort by Sales</option>
              <option value="profit">Sort by Profit</option>
              <option value="margin">Sort by Margin</option>
            </select>
          </div>
          <div className="md:w-32">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
            >
              <option value="table">Table View</option>
              <option value="card">Card View</option>
              <option value="analytics">Analytics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Sales</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue (₹)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Profit (₹)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Margin %</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Turnover</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Sold</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">ID: {item.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`text-sm font-medium ${
                        item.stock < item.minStock ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {item.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      ₹{(item.revenue/1000).toFixed(0)}K
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-green-600">
                      ₹{(item.profit/1000).toFixed(0)}K
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.margin > 30 ? 'bg-green-100 text-green-800' :
                        item.margin > 20 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.margin}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {item.turnover.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.lastSold).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Card View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-xs text-gray-500">ID: {item.id}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.stock < item.minStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.stock} {item.unit}
                  </span>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm font-medium">{item.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Supplier</p>
                    <p className="text-sm font-medium">{item.supplier}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-xs text-gray-600">Sales</p>
                    <p className="text-lg font-bold text-blue-600">{item.sales}</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-xs text-gray-600">Revenue</p>
                    <p className="text-lg font-bold text-green-600">₹{(item.revenue/1000).toFixed(0)}K</p>
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <p className="text-xs text-gray-600">Profit</p>
                    <p className="text-lg font-bold text-purple-600">₹{(item.profit/1000).toFixed(0)}K</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Margin:</span>
                  <span className={`font-bold ${
                    item.margin > 30 ? 'text-green-600' : item.margin > 20 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {item.margin}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics View */}
      {viewMode === 'analytics' && (
        <div className="space-y-6">
          {/* Category Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Category Performance</h3>
            <div className="space-y-4">
              {categories.filter(c => c !== 'all').map(cat => {
                const catItems = items.filter(i => i.category === cat);
                const catRevenue = catItems.reduce((acc, i) => acc + i.revenue, 0);
                const catProfit = catItems.reduce((acc, i) => acc + i.profit, 0);
                const catMargin = (catProfit / catRevenue * 100).toFixed(1);
                
                return (
                  <div key={cat}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-700">{cat}</span>
                      <span className="text-sm text-gray-600">
                        ₹{(catRevenue/100000).toFixed(1)}L | Margin: {catMargin}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(catRevenue / totalRevenue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Performers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🏆 Top 5 by Revenue</h3>
              <div className="space-y-3">
                {items
                  .sort((a, b) => b.revenue - a.revenue)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </span>
                        <span className="text-sm text-gray-800">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-green-600">₹{(item.revenue/1000).toFixed(0)}K</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">💰 Top 5 by Profit</h3>
              <div className="space-y-3">
                {items
                  .sort((a, b) => b.profit - a.profit)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </span>
                        <span className="text-sm text-gray-800">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-purple-600">₹{(item.profit/1000).toFixed(0)}K</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Stock Status Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {items.filter(i => i.stock >= i.minStock && i.stock <= i.maxStock).length}
                </p>
                <p className="text-sm text-gray-600">Optimal Stock</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  {items.filter(i => i.stock > i.maxStock).length}
                </p>
                <p className="text-sm text-gray-600">Over Stock</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">
                  {items.filter(i => i.stock < i.minStock).length}
                </p>
                <p className="text-sm text-gray-600">Low Stock</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemWiseSummary;