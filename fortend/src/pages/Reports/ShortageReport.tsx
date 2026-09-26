import React, { useState } from 'react';

const ShortageReport: React.FC = () => {
  const [urgencyFilter, setUrgencyFilter] = useState('all'); // all, high, medium, low
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for shortage items
  const shortageItems = [
    {
      id: 'ITEM004',
      name: 'Samsung Monitor 24"',
      category: 'Electronics',
      currentStock: 18,
      minRequired: 25,
      maxStock: 40,
      shortage: 7,
      unit: 'pcs',
      urgency: 'High',
      location: 'Rack A-04',
      lastOrdered: '2024-01-10',
      supplier: 'Samsung',
      leadTime: 5,
      dailyDemand: 3,
      estimatedStockout: '2024-01-25'
    },
    {
      id: 'ITEM009',
      name: 'External DVD Drive',
      category: 'Storage',
      currentStock: 12,
      minRequired: 20,
      maxStock: 40,
      shortage: 8,
      unit: 'pcs',
      urgency: 'High',
      location: 'Rack D-02',
      lastOrdered: '2024-01-05',
      supplier: 'LG',
      leadTime: 4,
      dailyDemand: 2,
      estimatedStockout: '2024-01-22'
    },
    {
      id: 'ITEM002',
      name: 'HP LaserJet Printer',
      category: 'Electronics',
      currentStock: 23,
      minRequired: 30,
      maxStock: 50,
      shortage: 7,
      unit: 'pcs',
      urgency: 'Medium',
      location: 'Rack B-03',
      lastOrdered: '2024-01-12',
      supplier: 'HP India',
      leadTime: 6,
      dailyDemand: 2,
      estimatedStockout: '2024-02-05'
    },
    {
      id: 'ITEM008',
      name: 'Wireless Keyboard',
      category: 'Accessories',
      currentStock: 34,
      minRequired: 40,
      maxStock: 80,
      shortage: 6,
      unit: 'pcs',
      urgency: 'Medium',
      location: 'Rack C-03',
      lastOrdered: '2024-01-08',
      supplier: 'Logitech',
      leadTime: 3,
      dailyDemand: 4,
      estimatedStockout: '2024-01-28'
    },
    {
      id: 'COMP001',
      name: 'Intel i7 Processor',
      category: 'CPU',
      currentStock: 89,
      minRequired: 100,
      maxStock: 150,
      shortage: 11,
      unit: 'pcs',
      urgency: 'Low',
      location: 'Rack E-01',
      lastOrdered: '2024-01-14',
      supplier: 'Intel Corp',
      leadTime: 7,
      dailyDemand: 5,
      estimatedStockout: '2024-02-10'
    },
    {
      id: 'COMP006',
      name: 'Power Supply 550W',
      category: 'Power',
      currentStock: 42,
      minRequired: 50,
      maxStock: 100,
      shortage: 8,
      unit: 'pcs',
      urgency: 'Medium',
      location: 'Rack F-03',
      lastOrdered: '2024-01-09',
      supplier: 'Corsair',
      leadTime: 5,
      dailyDemand: 3,
      estimatedStockout: '2024-02-01'
    },
    {
      id: 'ITEM001',
      name: 'Laptop Dell XPS 15',
      category: 'Electronics',
      currentStock: 45,
      minRequired: 50,
      maxStock: 100,
      shortage: 5,
      unit: 'pcs',
      urgency: 'Low',
      location: 'Rack A-01',
      lastOrdered: '2024-01-15',
      supplier: 'Dell India',
      leadTime: 8,
      dailyDemand: 2,
      estimatedStockout: '2024-02-15'
    }
  ];

  // Get unique categories
  const categories = ['all', ...new Set(shortageItems.map(item => item.category))];

  // Filter items
  const filteredItems = shortageItems.filter(item => {
    const matchesUrgency = urgencyFilter === 'all' || item.urgency === urgencyFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesUrgency && matchesCategory && matchesSearch;
  });

  // Calculate summary statistics
  const totalShortageItems = shortageItems.length;
  const totalShortageQuantity = shortageItems.reduce((acc, item) => acc + item.shortage, 0);
  const highUrgencyCount = shortageItems.filter(item => item.urgency === 'High').length;
  const estimatedLoss = shortageItems.reduce((acc, item) => {
    // Assuming average profit of ₹500 per item
    return acc + (item.shortage * 500);
  }, 0);

  // Group by urgency for chart
  const urgencyGroups = {
    High: shortageItems.filter(item => item.urgency === 'High').length,
    Medium: shortageItems.filter(item => item.urgency === 'Medium').length,
    Low: shortageItems.filter(item => item.urgency === 'Low').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">⚠️ Shortage Report</h1>
            <p className="text-gray-600 mt-1">Items below minimum stock level - Immediate action required</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Generate Purchase Order
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Items Below Min Stock</p>
          <p className="text-2xl font-bold text-gray-800">{totalShortageItems}</p>
          <p className="text-xs text-gray-500 mt-1">Need immediate attention</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <p className="text-sm text-gray-500">Total Shortage Quantity</p>
          <p className="text-2xl font-bold text-orange-600">{totalShortageQuantity}</p>
          <p className="text-xs text-gray-500 mt-1">Units needed</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">High Urgency Items</p>
          <p className="text-2xl font-bold text-yellow-600">{highUrgencyCount}</p>
          <p className="text-xs text-gray-500 mt-1">Order immediately</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Estimated Loss Risk</p>
          <p className="text-2xl font-bold text-purple-600">₹{estimatedLoss.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Potential profit loss</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search by item, ID, or supplier..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
            >
              <option value="all">All Urgency</option>
              <option value="High">High Urgency</option>
              <option value="Medium">Medium Urgency</option>
              <option value="Low">Low Urgency</option>
            </select>
          </div>
          <div className="md:w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Urgency Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-2">High Urgency</p>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-red-500 h-4 rounded-full"
                style={{ width: `${(urgencyGroups.High / totalShortageItems) * 100}%` }}
              ></div>
            </div>
            <span className="ml-3 text-sm font-bold text-red-600">{urgencyGroups.High}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-2">Medium Urgency</p>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-yellow-500 h-4 rounded-full"
                style={{ width: `${(urgencyGroups.Medium / totalShortageItems) * 100}%` }}
              ></div>
            </div>
            <span className="ml-3 text-sm font-bold text-yellow-600">{urgencyGroups.Medium}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-2">Low Urgency</p>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${(urgencyGroups.Low / totalShortageItems) * 100}%` }}
              ></div>
            </div>
            <span className="ml-3 text-sm font-bold text-green-600">{urgencyGroups.Low}</span>
          </div>
        </div>
      </div>

      {/* Shortage Items Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Items Below Minimum Stock</h3>
          <span className="text-sm text-gray-500">
            {filteredItems.length} items found
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Min Required</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Shortage</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Urgency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Est. Stockout</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
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
                      item.currentStock < item.minRequired ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {item.currentStock}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">{item.unit}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {item.minRequired}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-bold text-red-600">{item.shortage}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.urgency === 'High' ? 'bg-red-100 text-red-800' :
                      item.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm text-red-600 font-medium">
                      {new Date(item.estimatedStockout).toLocaleDateString('en-IN')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                      Reorder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Recommended Purchase Order</h3>
          <div className="space-y-3">
            {filteredItems
              .filter(item => item.urgency === 'High')
              .slice(0, 3)
              .map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-600">Order: {item.shortage + 5} units (with buffer)</p>
                  </div>
                  <span className="text-sm font-bold text-red-600">₹{(item.shortage * 1000).toLocaleString()}</span>
                </div>
              ))}
            <button className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
              Create Purchase Order
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Supplier-wise Shortage</h3>
          <div className="space-y-3">
            {Array.from(new Set(filteredItems.map(item => item.supplier))).map(supplier => {
              const supplierItems = filteredItems.filter(item => item.supplier === supplier);
              const totalShortage = supplierItems.reduce((acc, item) => acc + item.shortage, 0);
              
              return (
                <div key={supplier} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{supplier}</p>
                    <p className="text-xs text-gray-500">{supplierItems.length} items</p>
                  </div>
                  <span className="text-sm font-bold text-orange-600">{totalShortage} units</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortageReport;