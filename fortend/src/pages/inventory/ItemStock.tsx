import React, { useState } from 'react';

import { mockItems, mockComponents } from './mockData';

const ItemStock: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Items with their stock levels (ab ye mockData se aayega)
  const items = mockItems; // Direct mockData se le lo

  // Association data
  const associations = {
    'ITEM001': ['COMP001', 'COMP003', 'COMP005'],
    'ITEM002': ['COMP002', 'COMP004'],
    'ITEM003': ['COMP003'],
    'ITEM004': ['COMP001', 'COMP004'],
    'ITEM005': ['COMP002', 'COMP005'],
  };

  // Get unique categories for filter
  const categories = ['all', ...new Set(items.map(item => item.category))];

  // Filter and search logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Sorting logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const key = sortConfig.key as keyof typeof a;
    if (a[key] < b[key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getComponentsForItem = (itemId: string) => {
    const componentIds = associations[itemId as keyof typeof associations] || [];
    return mockComponents.filter(comp => componentIds.includes(comp.id));
  };

  // Get stock status class
  const getStockStatusClass = (stock: number, min: number, max: number) => {
    if (stock < min) return 'bg-red-100 text-red-800 border-red-200';
    if (stock > max) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getStockStatusText = (stock: number, min: number, max: number) => {
    if (stock < min) return 'Low Stock';
    if (stock > max) return 'Over Stock';
    return 'Optimal';
  };

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Stats */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Items</p>
          <p className="text-2xl font-bold text-gray-800">{items.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">In Stock</p>
          <p className="text-2xl font-bold text-green-600">
            {items.reduce((acc, item) => acc + item.stock, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Low Stock Items</p>
          <p className="text-2xl font-bold text-red-600">
            {items.filter(item => item.stock < item.minStock).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Categories</p>
          <p className="text-2xl font-bold text-purple-600">{categories.length - 1}</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search by name, ID, or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="md:w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-32">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setSortConfig(null);
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Table View */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('id')}
                >
                  ID {getSortIcon('id')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  Product Name {getSortIcon('name')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('category')}
                >
                  Category {getSortIcon('category')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('stock')}
                >
                  Stock {getSortIcon('stock')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min/Max
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('location')}
                >
                  Location {getSortIcon('location')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedItems.map((item) => (
                <React.Fragment key={item.id}>
                  <tr 
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedItem === item.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">
                          {item.stock}
                        </span>
                        <span className="text-xs text-gray-500">{item.unit}</span>
                      </div>
                      {/* Mini progress bar */}
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                        <div 
                          className={`h-1.5 rounded-full ${
                            item.stock < item.minStock ? 'bg-red-500' :
                            item.stock > item.maxStock ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(item.stock / item.maxStock) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.minStock} / {item.maxStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStockStatusClass(item.stock, item.minStock, item.maxStock)}`}>
                        {getStockStatusText(item.stock, item.minStock, item.maxStock)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-800 mr-2" title="View Details">
                        👁️
                      </button>
                      <button className="text-green-600 hover:text-green-800" title="Edit">
                        ✏️
                      </button>
                    </td>
                  </tr>
                  
                  {/* Association Chart Row - Shows when item is selected */}
                  {selectedItem === item.id && (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 bg-gray-50">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">
                              Components
                            </span>
                            🔗 {item.name} ke components
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {getComponentsForItem(item.id).map(comp => (
                              <div key={comp.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium text-gray-800">{comp.name}</p>
                                    <p className="text-xs text-gray-500">ID: {comp.id}</p>
                                  </div>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    comp.stock < comp.minStock ? 'bg-red-100 text-red-800' :
                                    comp.stock > comp.maxStock ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {comp.stock} {comp.unit}
                                  </span>
                                </div>
                                <div className="mt-2 text-xs text-gray-600">
                                  Supplier: {comp.supplier}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {getComponentsForItem(item.id).length === 0 && (
                            <p className="text-gray-500 text-center py-4">No components associated</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{sortedItems.length}</span> of{' '}
              <span className="font-medium">{items.length}</span> items
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Keep AssociationChart component if you want detailed view */}
      {/* {selectedItem && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🔗 Detailed Component Association: {items.find(i => i.id === selectedItem)?.name}
          </h2>
          
          <AssociationChart
            itemName={items.find(i => i.id === selectedItem)?.name || ''}
            components={getComponentsForItem(selectedItem)}
          />
        </div>
      )} */}
    </div>
  );
};

export default ItemStock;