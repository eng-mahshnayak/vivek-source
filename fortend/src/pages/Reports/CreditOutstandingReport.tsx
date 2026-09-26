import React, { useState } from 'react';

const CreditOutstandingReport: React.FC = () => {
  const [filter, setFilter] = useState('all'); // all, overdue, current
  const [selectedCustomer, setSelectedCustomer] = useState('all');

  // Mock data for credit customers
  const creditData = [
    {
      id: 1,
      customerId: 'CUST001',
      customerName: 'Rajesh Electronics',
      customerPhone: '9876543210',
      customerType: 'Retailer',
      invoiceNo: 'INV-2024-001',
      invoiceDate: '2024-01-01',
      dueDate: '2024-01-15',
      amount: 45000,
      paid: 20000,
      balance: 25000,
      lastPayment: '2024-01-10',
      status: 'Overdue',
      daysOverdue: 5
    },
    {
      id: 2,
      customerId: 'CUST002',
      customerName: 'Priya Stores',
      customerPhone: '9876543211',
      customerType: 'Retailer',
      invoiceNo: 'INV-2024-002',
      invoiceDate: '2024-01-05',
      dueDate: '2024-01-20',
      amount: 32000,
      paid: 32000,
      balance: 0,
      lastPayment: '2024-01-18',
      status: 'Paid',
      daysOverdue: 0
    },
    {
      id: 3,
      customerId: 'CUST003',
      customerName: 'Modern Traders',
      customerPhone: '9876543212',
      customerType: 'Wholesaler',
      invoiceNo: 'INV-2024-003',
      invoiceDate: '2023-12-15',
      dueDate: '2023-12-30',
      amount: 89000,
      paid: 40000,
      balance: 49000,
      lastPayment: '2024-01-05',
      status: 'Overdue',
      daysOverdue: 20
    },
    {
      id: 4,
      customerId: 'CUST004',
      customerName: 'City Mart',
      customerPhone: '9876543213',
      customerType: 'Retailer',
      invoiceNo: 'INV-2024-004',
      invoiceDate: '2024-01-10',
      dueDate: '2024-01-25',
      amount: 21000,
      paid: 5000,
      balance: 16000,
      lastPayment: '2024-01-12',
      status: 'Current',
      daysOverdue: 0
    },
    {
      id: 5,
      customerId: 'CUST005',
      customerName: 'Sharma General Store',
      customerPhone: '9876543214',
      customerType: 'Retailer',
      invoiceNo: 'INV-2024-005',
      invoiceDate: '2024-01-12',
      dueDate: '2024-01-27',
      amount: 16700,
      paid: 10000,
      balance: 6700,
      lastPayment: '2024-01-15',
      status: 'Current',
      daysOverdue: 0
    },
    {
      id: 6,
      customerId: 'CUST006',
      customerName: 'Gupta Electronics',
      customerPhone: '9876543215',
      customerType: 'Wholesaler',
      invoiceNo: 'INV-2024-006',
      invoiceDate: '2023-12-20',
      dueDate: '2024-01-04',
      amount: 53000,
      paid: 20000,
      balance: 33000,
      lastPayment: '2024-01-08',
      status: 'Overdue',
      daysOverdue: 15
    },
    {
      id: 7,
      customerId: 'CUST007',
      customerName: 'Patel & Co',
      customerPhone: '9876543216',
      customerType: 'Retailer',
      invoiceNo: 'INV-2024-007',
      invoiceDate: '2024-01-15',
      dueDate: '2024-01-30',
      amount: 38000,
      paid: 0,
      balance: 38000,
      lastPayment: '-',
      status: 'Current',
      daysOverdue: 0
    },
    {
      id: 8,
      customerId: 'CUST008',
      customerName: 'Verma Traders',
      customerPhone: '9876543217',
      customerType: 'Wholesaler',
      invoiceNo: 'INV-2024-008',
      invoiceDate: '2023-12-28',
      dueDate: '2024-01-12',
      amount: 92000,
      paid: 50000,
      balance: 42000,
      lastPayment: '2024-01-14',
      status: 'Overdue',
      daysOverdue: 7
    }
  ];

  // Calculate summary statistics
  const totalOutstanding = creditData.reduce((acc, curr) => acc + curr.balance, 0);
  const totalOverdue = creditData
    .filter(item => item.status === 'Overdue')
    .reduce((acc, curr) => acc + curr.balance, 0);
  const totalCurrent = creditData
    .filter(item => item.status === 'Current')
    .reduce((acc, curr) => acc + curr.balance, 0);
  
  const overdueCount = creditData.filter(item => item.status === 'Overdue').length;
  const paidCount = creditData.filter(item => item.status === 'Paid').length;

  // Customer-wise summary
  const customerSummary = creditData.reduce((acc: any, curr) => {
    if (!acc[curr.customerId]) {
      acc[curr.customerId] = {
        customerId: curr.customerId,
        customerName: curr.customerName,
        customerPhone: curr.customerPhone,
        customerType: curr.customerType,
        totalAmount: 0,
        paidAmount: 0,
        balance: 0,
        invoices: 0,
        overdueInvoices: 0
      };
    }
    acc[curr.customerId].totalAmount += curr.amount;
    acc[curr.customerId].paidAmount += curr.paid;
    acc[curr.customerId].balance += curr.balance;
    acc[curr.customerId].invoices += 1;
    if (curr.status === 'Overdue') {
      acc[curr.customerId].overdueInvoices += 1;
    }
    return acc;
  }, {});

  const customerList = Object.values(customerSummary);

  // Filter data
  const filteredData = creditData.filter(item => {
    if (filter === 'overdue') return item.status === 'Overdue';
    if (filter === 'current') return item.status === 'Current';
    return true;
  }).filter(item => {
    if (selectedCustomer === 'all') return true;
    return item.customerId === selectedCustomer;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">💳 Credit Outstanding Report</h1>
            <p className="text-gray-600 mt-1">Track customer credit and pending payments</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="current">Current</option>
              <option value="overdue">Overdue</option>
            </select>
            
            <select 
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">All Customers</option>
              {Object.values(customerSummary).map((cust: any) => (
                <option key={cust.customerId} value={cust.customerId}>
                  {cust.customerName}
                </option>
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
          <p className="text-sm text-gray-500">Total Outstanding</p>
          <p className="text-2xl font-bold text-gray-800">₹{totalOutstanding.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Across {creditData.length} invoices</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Current Credit</p>
          <p className="text-2xl font-bold text-yellow-600">₹{totalCurrent.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">Not due yet</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Overdue Amount</p>
          <p className="text-2xl font-bold text-red-600">₹{totalOverdue.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{overdueCount} overdue invoices</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Paid Invoices</p>
          <p className="text-2xl font-bold text-green-600">{paidCount}</p>
          <p className="text-xs text-gray-500 mt-1">Fully paid</p>
        </div>
      </div>

      {/* Customer-wise Summary */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">Customer-wise Credit Summary</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Credit</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Paid</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Balance</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Invoices</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Overdue</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerList.map((cust: any) => (
                <tr key={cust.customerId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{cust.customerName}</p>
                      <p className="text-xs text-gray-500">{cust.customerPhone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {cust.customerType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    ₹{cust.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">
                    ₹{cust.paidAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">
                    ₹{cust.balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                    {cust.invoices}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {cust.overdueInvoices > 0 ? (
                      <span className="text-red-600 font-medium">{cust.overdueInvoices}</span>
                    ) : (
                      <span className="text-green-600">0</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      cust.overdueInvoices > 0 
                        ? 'bg-red-100 text-red-800' 
                        : cust.balance > 0 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {cust.overdueInvoices > 0 ? 'At Risk' : cust.balance > 0 ? 'Active' : 'Cleared'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Invoice List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Invoice-wise Credit Details</h3>
          <span className="text-sm text-gray-500">
            {filteredData.length} invoices found
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount (₹)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Paid (₹)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Balance (₹)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.invoiceDate).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {item.invoiceNo}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.customerName}</p>
                      <p className="text-xs text-gray-500">{item.customerPhone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    ₹{item.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">
                    ₹{item.paid.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">
                    ₹{item.balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.dueDate).toLocaleDateString('en-IN')}
                    {item.daysOverdue > 0 && (
                      <span className="ml-2 text-xs text-red-600">({item.daysOverdue} days)</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      item.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.status !== 'Paid' && (
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Follow Up
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Reminder Section */}
      <div className="bg-blue-50 rounded-xl shadow-lg p-6 border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-3">📧 Send Payment Reminders</h4>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            Send to All Overdue
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
            Send to Selected
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
            Download Overdue List
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
            Schedule Reminders
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditOutstandingReport;