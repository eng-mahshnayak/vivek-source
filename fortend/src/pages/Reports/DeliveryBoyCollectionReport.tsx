import React, { useState } from 'react';

const DeliveryBoyCollectionReport: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBoy, setSelectedBoy] = useState('all');
  const [viewType, setViewType] = useState('summary'); // summary, detailed, pending

  // Mock data for delivery boys
  const deliveryBoys = [
    {
      id: 'DB001',
      name: 'Rahul Kumar',
      phone: '9876543210',
      zone: 'North Zone',
      joinDate: '2023-01-15',
      status: 'Active'
    },
    {
      id: 'DB002',
      name: 'Sunita Sharma',
      phone: '9876543211',
      zone: 'South Zone',
      joinDate: '2023-03-20',
      status: 'Active'
    },
    {
      id: 'DB003',
      name: 'Vikram Singh',
      phone: '9876543212',
      zone: 'East Zone',
      joinDate: '2023-02-10',
      status: 'Active'
    },
    {
      id: 'DB004',
      name: 'Priya Patel',
      phone: '9876543213',
      zone: 'West Zone',
      joinDate: '2023-04-05',
      status: 'Inactive'
    },
    {
      id: 'DB005',
      name: 'Amit Verma',
      phone: '9876543214',
      zone: 'Central Zone',
      joinDate: '2023-05-12',
      status: 'Active'
    }
  ];

  // Mock collection data
  const collectionData = [
    {
      id: 1,
      boyId: 'DB001',
      boyName: 'Rahul Kumar',
      date: '2024-01-15',
      invoiceNo: 'INV-2024-001',
      customerName: 'Rajesh Electronics',
      amount: 4500,
      paymentMode: 'Cash',
      status: 'Collected',
      collectedAt: '03:30 PM'
    },
    {
      id: 2,
      boyId: 'DB001',
      boyName: 'Rahul Kumar',
      date: '2024-01-15',
      invoiceNo: 'INV-2024-002',
      customerName: 'Priya Stores',
      amount: 3200,
      paymentMode: 'UPI',
      status: 'Collected',
      collectedAt: '04:15 PM'
    },
    {
      id: 3,
      boyId: 'DB002',
      boyName: 'Sunita Sharma',
      date: '2024-01-15',
      invoiceNo: 'INV-2024-003',
      customerName: 'Modern Traders',
      amount: 8900,
      paymentMode: 'Cash',
      status: 'Collected',
      collectedAt: '02:00 PM'
    },
    {
      id: 4,
      boyId: 'DB002',
      boyName: 'Sunita Sharma',
      date: '2024-01-15',
      invoiceNo: 'INV-2024-004',
      customerName: 'City Mart',
      amount: 2100,
      paymentMode: 'Card',
      status: 'Pending',
      collectedAt: '-'
    },
    {
      id: 5,
      boyId: 'DB003',
      boyName: 'Vikram Singh',
      date: '2024-01-15',
      invoiceNo: 'INV-2024-005',
      customerName: 'Sharma General Store',
      amount: 6700,
      paymentMode: 'Cash',
      status: 'Collected',
      collectedAt: '12:30 PM'
    },
    {
      id: 6,
      boyId: 'DB003',
      boyName: 'Vikram Singh',
      date: '2024-01-15',
      invoiceNo: 'INV-2024-006',
      customerName: 'Gupta Electronics',
      amount: 5300,
      paymentMode: 'UPI',
      status: 'Collected',
      collectedAt: '01:45 PM'
    },
    {
      id: 7,
      boyId: 'DB004',
      boyName: 'Priya Patel',
      date: '2024-01-15',
      invoiceNo: 'INV-2024-007',
      customerName: 'Patel & Co',
      amount: 3800,
      paymentMode: 'Cash',
      status: 'Pending',
      collectedAt: '-'
    },
    {
      id: 8,
      boyId: 'DB005',
      boyName: 'Amit Verma',
      date: '2024-01-15',
      invoiceNo: 'INV-2024-008',
      customerName: 'Verma Traders',
      amount: 9200,
      paymentMode: 'Card',
      status: 'Collected',
      collectedAt: '05:00 PM'
    }
  ];

  // Calculate summary statistics
  const totalCollections = collectionData.reduce((acc, curr) => acc + curr.amount, 0);
  const collectedAmount = collectionData
    .filter(item => item.status === 'Collected')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const pendingAmount = collectionData
    .filter(item => item.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const cashCollected = collectionData
    .filter(item => item.paymentMode === 'Cash' && item.status === 'Collected')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const upiCollected = collectionData
    .filter(item => (item.paymentMode === 'UPI' || item.paymentMode === 'Card') && item.status === 'Collected')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Boy-wise summary
  const boySummary = deliveryBoys.map(boy => {
    const boyCollections = collectionData.filter(c => c.boyId === boy.id);
    const total = boyCollections.reduce((acc, curr) => acc + curr.amount, 0);
    const collected = boyCollections.filter(c => c.status === 'Collected').reduce((acc, curr) => acc + curr.amount, 0);
    const pending = boyCollections.filter(c => c.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);
    const count = boyCollections.length;
    
    return {
      ...boy,
      total,
      collected,
      pending,
      count,
      efficiency: total > 0 ? ((collected / total) * 100).toFixed(1) : '0'
    };
  });

  // Filter data based on selected boy
  const filteredData = selectedBoy === 'all' 
    ? collectionData 
    : collectionData.filter(item => item.boyId === selectedBoy);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🚚 Delivery Boy Collection Report</h1>
            <p className="text-gray-600 mt-1">Track collections from delivery personnel</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
            
            <select 
              value={selectedBoy}
              onChange={(e) => setSelectedBoy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Delivery Boys</option>
              {deliveryBoys.map(boy => (
                <option key={boy.id} value={boy.id}>{boy.name} - {boy.zone}</option>
              ))}
            </select>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Collections</p>
          <p className="text-2xl font-bold text-gray-800">₹{totalCollections.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{collectionData.length} transactions</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Collected Amount</p>
          <p className="text-2xl font-bold text-green-600">₹{collectedAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{((collectedAmount/totalCollections)*100).toFixed(1)}% collected</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Pending Amount</p>
          <p className="text-2xl font-bold text-red-600">₹{pendingAmount.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{((pendingAmount/totalCollections)*100).toFixed(1)}% pending</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Payment Split</p>
          <p className="text-sm font-medium text-gray-800">Cash: ₹{cashCollected.toLocaleString()}</p>
          <p className="text-sm font-medium text-gray-800">Digital: ₹{upiCollected.toLocaleString()}</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewType('summary')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewType === 'summary' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📊 Boy-wise Summary
          </button>
          <button
            onClick={() => setViewType('detailed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewType === 'detailed' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📋 Detailed Collections
          </button>
          <button
            onClick={() => setViewType('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewType === 'pending' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ⏳ Pending Collections
          </button>
        </div>
      </div>

      {/* Boy-wise Summary View */}
      {viewType === 'summary' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">Delivery Boy Performance Summary</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Boy Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zone</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total (₹)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Collected (₹)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Pending (₹)</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Efficiency</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {boySummary.map((boy) => (
                  <tr key={boy.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{boy.name}</p>
                        <p className="text-xs text-gray-500">{boy.phone} • ID: {boy.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {boy.zone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      ₹{boy.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-medium">
                      ₹{boy.collected.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600 font-medium">
                      ₹{boy.pending.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              parseFloat(boy.efficiency) > 80 ? 'bg-green-500' :
                              parseFloat(boy.efficiency) > 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${boy.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-600">{boy.efficiency}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        boy.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {boy.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detailed Collections View */}
      {viewType === 'detailed' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Detailed Collection Transactions</h3>
            <span className="text-sm text-gray-500">
              {filteredData.length} transactions found
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Boy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount (₹)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Mode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Collected At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(item.date).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {item.invoiceNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.boyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      ₹{item.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.paymentMode === 'Cash' ? 'bg-green-100 text-green-800' :
                        item.paymentMode === 'UPI' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {item.paymentMode}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'Collected' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.collectedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pending Collections View */}
      {viewType === 'pending' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">⏳ Pending Collections</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Boy</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount (₹)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Mode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Since</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {collectionData
                    .filter(item => item.status === 'Pending')
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {item.invoiceNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.boyName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">
                          ₹{item.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            {item.paymentMode}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2 days
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Follow Up
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-yellow-50 rounded-xl shadow-lg p-6 border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-3">Quick Actions</h4>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm">
                Send Reminder to All
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Generate Pending List
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                Mark as Collected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryBoyCollectionReport;