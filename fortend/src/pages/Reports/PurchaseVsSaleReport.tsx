import React, { useState } from 'react';

const PurchaseVsSaleReport: React.FC = () => {
  const [period, setPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2024');

  const [viewType, setViewType] = useState('comparison'); // comparison, trend, analysis

  // Mock data for purchases vs sales
  const purchaseVsSaleData = [
    { 
      month: 'Jan', 
      purchases: 450000, 
      sales: 520000, 
      profit: 70000,
      purchaseCount: 45,
      saleCount: 52,
      topProduct: 'Laptop Dell',
      category: 'Electronics'
    },
    { 
      month: 'Feb', 
      purchases: 520000, 
      sales: 480000, 
      profit: -40000,
      purchaseCount: 52,
      saleCount: 48,
      topProduct: 'Printer',
      category: 'Electronics'
    },
    { 
      month: 'Mar', 
      purchases: 480000, 
      sales: 610000, 
      profit: 130000,
      purchaseCount: 48,
      saleCount: 61,
      topProduct: 'Monitor',
      category: 'Electronics'
    },
    { 
      month: 'Apr', 
      purchases: 580000, 
      sales: 550000, 
      profit: -30000,
      purchaseCount: 58,
      saleCount: 55,
      topProduct: 'Mouse',
      category: 'Accessories'
    },
    { 
      month: 'May', 
      purchases: 550000, 
      sales: 620000, 
      profit: 70000,
      purchaseCount: 55,
      saleCount: 62,
      topProduct: 'SSD',
      category: 'Storage'
    },
    { 
      month: 'Jun', 
      purchases: 620000, 
      sales: 580000, 
      profit: -40000,
      purchaseCount: 62,
      saleCount: 58,
      topProduct: 'RAM',
      category: 'Memory'
    },
    { 
      month: 'Jul', 
      purchases: 580000, 
      sales: 650000, 
      profit: 70000,
      purchaseCount: 58,
      saleCount: 65,
      topProduct: 'Processor',
      category: 'CPU'
    },
    { 
      month: 'Aug', 
      purchases: 650000, 
      sales: 620000, 
      profit: -30000,
      purchaseCount: 65,
      saleCount: 62,
      topProduct: 'Keyboard',
      category: 'Accessories'
    },
    { 
      month: 'Sep', 
      purchases: 620000, 
      sales: 710000, 
      profit: 90000,
      purchaseCount: 62,
      saleCount: 71,
      topProduct: 'Laptop',
      category: 'Electronics'
    },
    { 
      month: 'Oct', 
      purchases: 710000, 
      sales: 680000, 
      profit: -30000,
      purchaseCount: 71,
      saleCount: 68,
      topProduct: 'Printer',
      category: 'Electronics'
    },
    { 
      month: 'Nov', 
      purchases: 680000, 
      sales: 820000, 
      profit: 140000,
      purchaseCount: 68,
      saleCount: 82,
      topProduct: 'Monitor',
      category: 'Electronics'
    },
    { 
      month: 'Dec', 
      purchases: 820000, 
      sales: 950000, 
      profit: 130000,
      purchaseCount: 82,
      saleCount: 95,
      topProduct: 'Gaming Laptop',
      category: 'Electronics'
    },
  ];

  // Category-wise data
  const categoryData = [
    { category: 'Electronics', purchases: 2450000, sales: 2980000, profit: 530000, margin: 21.6 },
    { category: 'Accessories', purchases: 1250000, sales: 1420000, profit: 170000, margin: 13.6 },
    { category: 'Storage', purchases: 850000, sales: 920000, profit: 70000, margin: 8.2 },
    { category: 'Memory', purchases: 620000, sales: 580000, profit: -40000, margin: -6.5 },
    { category: 'CPU', purchases: 580000, sales: 650000, profit: 70000, margin: 12.1 },
  ];

  // Calculate totals
  const totalPurchases = purchaseVsSaleData.reduce((acc, item) => acc + item.purchases, 0);
  const totalSales = purchaseVsSaleData.reduce((acc, item) => acc + item.sales, 0);
  const totalProfit = purchaseVsSaleData.reduce((acc, item) => acc + item.profit, 0);
  const avgRatio = (totalSales / totalPurchases * 100).toFixed(1);
  
  // Profitable months count
  const profitableMonths = purchaseVsSaleData.filter(item => item.profit > 0).length;
  const lossMonths = purchaseVsSaleData.filter(item => item.profit < 0).length;

  // Get chart max value for scaling
  const maxValue = Math.max(
    ...purchaseVsSaleData.map(d => Math.max(d.purchases, d.sales))
  );

  return (
    <div className="space-y-6">
      {/* Header with Title and Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">📊 Purchase vs Sale Report</h1>
            <p className="text-gray-600 mt-1">Compare purchasing trends with sales performance</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <select 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
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
          <p className="text-sm text-gray-500">Total Purchases</p>
          <p className="text-2xl font-bold text-gray-800">₹{(totalPurchases / 100000).toFixed(1)}L</p>
          <p className="text-xs text-gray-500 mt-1">{purchaseVsSaleData.length} purchase orders</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-2xl font-bold text-green-600">₹{(totalSales / 100000).toFixed(1)}L</p>
          <p className="text-xs text-gray-500 mt-1">{purchaseVsSaleData.length} sale invoices</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Net Profit/Loss</p>
          <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalProfit >= 0 ? '+' : ''}₹{(totalProfit / 100000).toFixed(1)}L
          </p>
          <p className="text-xs text-gray-500 mt-1">Margin: {avgRatio}%</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Performance</p>
          <p className="text-2xl font-bold text-yellow-600">{profitableMonths}/{profitableMonths + lossMonths}</p>
          <p className="text-xs text-gray-500 mt-1">{profitableMonths} profitable months</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewType('comparison')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewType === 'comparison' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📊 Monthly Comparison
          </button>
          <button
            onClick={() => setViewType('trend')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewType === 'trend' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📈 Trend Analysis
          </button>
          <button
            onClick={() => setViewType('analysis')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewType === 'analysis' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📑 Category Analysis
          </button>
        </div>
      </div>

      {/* Monthly Comparison View */}
      {viewType === 'comparison' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Monthly Purchase vs Sale Comparison</h3>
            <span className="text-sm text-gray-500">Values in ₹ Lakhs</span>
          </div>
          
          {/* Chart View */}
          <div className="p-6">
            <div className="h-80 flex items-end space-x-2">
              {purchaseVsSaleData.map((data) => {
                const purchaseHeight = (data.purchases / maxValue) * 100;
                const saleHeight = (data.sales / maxValue) * 100;
                
                return (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex space-x-1">
                      {/* Purchase Bar */}
                      <div className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                          style={{ height: `${purchaseHeight * 2}px` }}
                          title={`Purchases: ₹${(data.purchases / 100000).toFixed(1)}L`}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">P</span>
                      </div>
                      
                      {/* Sale Bar */}
                      <div className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-green-500 rounded-t-lg transition-all hover:bg-green-600"
                          style={{ height: `${saleHeight * 2}px` }}
                          title={`Sales: ₹${(data.sales / 100000).toFixed(1)}L`}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">S</span>
                      </div>
                    </div>
                    
                    {/* Month Label */}
                    <span className="text-xs font-medium text-gray-600 mt-2">{data.month}</span>
                    
                    {/* Profit/Loss Indicator */}
                    {data.profit > 0 ? (
                      <span className="text-xs text-green-600 mt-1">↑</span>
                    ) : (
                      <span className="text-xs text-red-600 mt-1">↓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Purchases (₹)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Sales (₹)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Difference</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">P/S Ratio</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Top Product</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {purchaseVsSaleData.map((data) => {
                  const difference = data.sales - data.purchases;
                  const ratio:any = (data.sales / data.purchases * 100).toFixed(1);
                  
                  return (
                    <tr key={data.month} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {data.month} 2024
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        ₹{(data.purchases / 100000).toFixed(1)}L
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        ₹{(data.sales / 100000).toFixed(1)}L
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                        difference >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {difference >= 0 ? '+' : ''}₹{(difference / 100000).toFixed(1)}L
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {ratio}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ratio >= 100 
                            ? 'bg-green-100 text-green-800' 
                            : ratio >= 90 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {ratio >= 100 ? 'Profitable' : ratio >= 90 ? 'Average' : 'Loss'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {data.topProduct}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Trend Analysis View */}
      {viewType === 'trend' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Purchase Trend (Monthly)</h3>
            <div className="h-64">
              <div className="flex items-end h-48 space-x-2">
                {purchaseVsSaleData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t-lg"
                      style={{ height: `${(data.purchases / maxValue) * 150}px` }}
                    ></div>
                    <span className="text-xs mt-2 text-gray-600">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Purchase Trend: +12.5% from last year
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sale Trend (Monthly)</h3>
            <div className="h-64">
              <div className="flex items-end h-48 space-x-2">
                {purchaseVsSaleData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-green-500 rounded-t-lg"
                      style={{ height: `${(data.sales / maxValue) * 150}px` }}
                    ></div>
                    <span className="text-xs mt-2 text-gray-600">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Sale Trend: +18.2% from last year
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Best Performing Month</p>
                <p className="text-xl font-bold text-blue-600">December</p>
                <p className="text-xs text-blue-600 mt-1">Sales: ₹9.5L | Profit: ₹1.3L</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-800 font-medium">Worst Performing Month</p>
                <p className="text-xl font-bold text-red-600">February</p>
                <p className="text-xs text-red-600 mt-1">Sales: ₹4.8L | Loss: ₹0.4L</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-800 font-medium">Average P/S Ratio</p>
                <p className="text-xl font-bold text-purple-600">{avgRatio}%</p>
                <p className="text-xs text-purple-600 mt-1">Above 100% is profitable</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Analysis View */}
      {viewType === 'analysis' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">Category-wise Purchase vs Sale Analysis</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Purchases (₹)</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Sales (₹)</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Profit/Loss</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Margin</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Performance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categoryData.map((category) => {
                    const profitPercent = ((category.sales - category.purchases) / category.purchases * 100).toFixed(1);
                    
                    return (
                      <tr key={category.category} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {category.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                          ₹{(category.purchases / 100000).toFixed(1)}L
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                          ₹{(category.sales / 100000).toFixed(1)}L
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                          category.profit >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {category.profit >= 0 ? '+' : ''}₹{(category.profit / 100000).toFixed(1)}L
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            category.margin > 15 ? 'bg-green-100 text-green-800' :
                            category.margin > 5 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {category.margin}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  parseFloat(profitPercent) > 15 ? 'bg-green-500' :
                                  parseFloat(profitPercent) > 5 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(100, Math.abs(parseFloat(profitPercent)))}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs text-gray-600">{profitPercent}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <span className="text-green-600 text-xl">💡</span>
                <div>
                  <p className="font-medium text-gray-800">Increase Electronics Inventory</p>
                  <p className="text-sm text-gray-600">Electronics showing 21.6% profit margin. Consider increasing stock by 20% for next quarter.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-600 text-xl">⚠️</span>
                <div>
                  <p className="font-medium text-gray-800">Review Memory Category</p>
                  <p className="text-sm text-gray-600">Memory category showing losses (-6.5%). Review pricing strategy and supplier contracts.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600 text-xl">📊</span>
                <div>
                  <p className="font-medium text-gray-800">Seasonal Buying Pattern</p>
                  <p className="text-sm text-gray-600">Sales peak in Nov-Dec. Plan bulk purchases in Sep-Oct to meet demand.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 flex flex-wrap justify-end gap-2">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export to Excel
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export to PDF
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Report
        </button>
      </div>
    </div>
  );
};

export default PurchaseVsSaleReport;