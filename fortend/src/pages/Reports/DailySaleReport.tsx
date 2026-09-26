// import React, { useState } from 'react';

// const DailySaleReport: React.FC = () => {
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [viewType, setViewType] = useState('table'); // table, chart, summary

//   // Mock data
//   const sales = [
//     { id: 1, time: '09:30 AM', invoice: 'INV-001', customer: 'Rajesh Kumar', items: 3, amount: 4500, payment: 'Cash', status: 'Completed' },
//     { id: 2, time: '10:15 AM', invoice: 'INV-002', customer: 'Priya Singh', items: 2, amount: 3200, payment: 'Card', status: 'Completed' },
//     { id: 3, time: '11:00 AM', invoice: 'INV-003', customer: 'Amit Patel', items: 5, amount: 8900, payment: 'UPI', status: 'Completed' },
//     { id: 4, time: '11:45 AM', invoice: 'INV-004', customer: 'Sneha Reddy', items: 1, amount: 1800, payment: 'Cash', status: 'Completed' },
//     { id: 5, time: '12:30 PM', invoice: 'INV-005', customer: 'Vikram Mehta', items: 4, amount: 6700, payment: 'Credit', status: 'Pending' },
//     { id: 6, time: '01:15 PM', invoice: 'INV-006', customer: 'Anjali Gupta', items: 2, amount: 2800, payment: 'Card', status: 'Completed' },
//     { id: 7, time: '02:00 PM', invoice: 'INV-007', customer: 'Rahul Jain', items: 3, amount: 5200, payment: 'UPI', status: 'Completed' },
//     { id: 8, time: '02:45 PM', invoice: 'INV-008', customer: 'Deepa Nair', items: 2, amount: 3600, payment: 'Cash', status: 'Completed' },
//   ];

//   const totalAmount = sales.reduce((acc, sale) => acc + sale.amount, 0);
//   const totalItems = sales.reduce((acc, sale) => acc + sale.items, 0);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">📊 Daily Sale Report</h1>
//             <p className="text-gray-600 mt-1">View and analyze daily sales transactions</p>
//           </div>
          
//           {/* Date Picker */}
//           <div className="mt-4 md:mt-0 flex items-center space-x-2">
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//               Generate
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
//           <p className="text-sm text-gray-500">Total Sales</p>
//           <p className="text-2xl font-bold text-gray-800">{sales.length}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
//           <p className="text-sm text-gray-500">Total Amount</p>
//           <p className="text-2xl font-bold text-green-600">₹{totalAmount.toLocaleString()}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
//           <p className="text-sm text-gray-500">Total Items</p>
//           <p className="text-2xl font-bold text-purple-600">{totalItems}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
//           <p className="text-sm text-gray-500">Average Sale</p>
//           <p className="text-2xl font-bold text-yellow-600">₹{(totalAmount / sales.length).toFixed(0)}</p>
//         </div>
//       </div>

//       {/* View Toggle */}
//       <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setViewType('table')}
//             className={`px-4 py-2 rounded-lg ${viewType === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
//           >
//             📋 Table View
//           </button>
//           <button
//             onClick={() => setViewType('chart')}
//             className={`px-4 py-2 rounded-lg ${viewType === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
//           >
//             📊 Chart View
//           </button>
//           <button
//             onClick={() => setViewType('summary')}
//             className={`px-4 py-2 rounded-lg ${viewType === 'summary' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
//           >
//             📑 Summary
//           </button>
//         </div>
//       </div>

//       {/* Table View */}
//       {viewType === 'table' && (
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {sales.map((sale) => (
//                   <tr key={sale.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.time}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.invoice}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.customer}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.items}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹{sale.amount}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.payment}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 text-xs rounded-full ${
//                         sale.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {sale.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Chart View */}
//       {viewType === 'chart' && (
//         <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Hourly Sales Trend</h3>
//           <div className="h-64 flex items-end space-x-2">
//             {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((hour) => {
//               const height = Math.floor(Math.random() * 60) + 20;
//               return (
//                 <div key={hour} className="flex-1 flex flex-col items-center">
//                   <div className="w-full bg-blue-500 rounded-t-lg" style={{ height: `${height}%` }}></div>
//                   <span className="text-xs mt-2 text-gray-600">{hour}:00</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Summary View */}
//       {viewType === 'summary' && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Cash</span>
//                 <span className="font-medium">₹{(totalAmount * 0.4).toFixed(0)} (40%)</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Card</span>
//                 <span className="font-medium">₹{(totalAmount * 0.35).toFixed(0)} (35%)</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">UPI</span>
//                 <span className="font-medium">₹{(totalAmount * 0.25).toFixed(0)} (25%)</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Category-wise Sales</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Electronics</span>
//                 <span className="font-medium">₹{Math.floor(totalAmount * 0.5)} (50%)</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Accessories</span>
//                 <span className="font-medium">₹{Math.floor(totalAmount * 0.3)} (30%)</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Storage</span>
//                 <span className="font-medium">₹{Math.floor(totalAmount * 0.2)} (20%)</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '20%' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Export Buttons */}
//       <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 flex justify-end space-x-3">
//         <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
//           📥 Export to Excel
//         </button>
//         <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
//           📄 Export to PDF
//         </button>
//         <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//           🖨️ Print Report
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DailySaleReport;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DailySaleReport: React.FC = () => {

  const API_URL = import.meta.env.VITE_API_URL;

  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalAmount: 0,
    totalItems: 0,
    averageSale: 0
  });

  // Fetch sales data
  const fetchSalesData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/sell/report`, {
        params: {
          fromDate,
          toDate
        }
      });
      
      if (response.data.success) {

        console.log(response.data.data.summary,'response.data.data.sales');
        
        setSales(response.data.data.sales);
        setSummary(response.data.data.summary);
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount and when dates change
  useEffect(() => {
    fetchSalesData();
  }, [fromDate, toDate]);

  // Export to Excel
  const exportToExcel = () => {
    // Create CSV content
    const headers = ['Date', 'Invoice No', 'Customer', 'Items', 'Amount', 'Payment', 'Status'];
    const csvContent = [
      headers.join(','),
      ...sales.map((sale:any) => [
        new Date(sale.invoiceDate).toLocaleDateString(),
        sale.invoiceNumber,
        `"${sale?.supplierName}"`,
        sale.productDetails?.reduce((sum:any, p:any) => sum + p.quantity, 0) || 0,
        sale.grandTotal,
        sale.paymentMethod,
        sale.paymentStatus
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${fromDate}-to-${toDate}.csv`;
    a.click();
  };

  // Export to PDF (simple version - you can use pdf library)
  const exportToPDF = () => {
    window.print();
  };

  // Format currency
  const formatCurrency = (amount:any) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header with Date Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">📊 Daily Sale Report</h1>
            <p className="text-gray-600 mt-1">View and analyze daily sales transactions</p>
          </div>
          
          {/* Date Range Picker */}
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600 whitespace-nowrap">From:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600 whitespace-nowrap">To:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button 
              onClick={fetchSalesData}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-2xl font-bold text-gray-800">{summary.totalSales}</p>
          <p className="text-xs text-gray-400 mt-1">Transactions</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalAmount)}</p>
          <p className="text-xs text-gray-400 mt-1">Revenue</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Total Items</p>
          <p className="text-2xl font-bold text-purple-600">{summary.totalItems}</p>
          <p className="text-xs text-gray-400 mt-1">Products sold</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Average Sale</p>
          <p className="text-2xl font-bold text-yellow-600">{formatCurrency(summary.averageSale)}</p>
          <p className="text-xs text-gray-400 mt-1">Per transaction</p>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Sales Transactions ({fromDate} to {toDate})
          </h3>
          <span className="text-sm text-gray-600">
            {sales.length} records found
          </span>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading sales data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sales.length > 0 ? (
                  sales.map((sale:any) => {
                    const totalItems = sale.productDetails?.length || 0;
                    
                    return (
                      <tr key={sale._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(sale.invoiceDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {sale.invoiceNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {sale.supplierName || 'Walk-in Customer'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {totalItems}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {formatCurrency(sale.grandTotal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="capitalize">{sale.paymentMethod?.replace('_', ' ')}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                            sale.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                            sale.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {sale.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p>No sales found for selected date range</p>
                        <p className="text-sm text-gray-400 mt-1">Try selecting a different date range</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Export Buttons */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 flex justify-end space-x-3">
        <button 
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          disabled={sales.length === 0}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export to Excel
        </button>
        <button 
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          disabled={sales.length === 0}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export to PDF
        </button>
        <button 
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          disabled={sales.length === 0}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Report
        </button>
      </div>
    </div>
  );
};

export default DailySaleReport;