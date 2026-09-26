// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


//   const API_URL = import.meta.env.VITE_API_URL;

// const StockReport: React.FC = () => {
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all'); // all, low, over, optimal
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('name'); // name, stock, value

//    const [stockReport, setStockReport] = useState([]);

//   // Combined stock data (items + components)
//   const stockData = [
//     // Items
//     {
//       id: 'ITEM001',
//       name: 'Laptop Dell XPS 15',
//       type: 'Item',
//       stock: 45,
//       unit: 'pcs',
//       minStock: 20,
//       maxStock: 100,
//       purchasePrice: 65000,
//       sellingPrice: 75000,
//       location: 'Rack A-01',
//       supplier: 'Dell India',
//       lastUpdated: '2024-01-15'
//     },
//     {
//       id: 'ITEM002',
//       name: 'HP LaserJet Printer',
//       type: 'Item',
//       stock: 23,
//       unit: 'pcs',
//       minStock: 10,
//       maxStock: 50,
//       purchasePrice: 12000,
//       sellingPrice: 15500,
//       location: 'Rack B-03',
//       supplier: 'HP India',
//       lastUpdated: '2024-01-14'
//     },
//     {
//       id: 'ITEM003',
//       name: 'Logitech Mouse',
//       type: 'Item',
//       stock: 156,
//       unit: 'pcs',
//       minStock: 50,
//       maxStock: 200,
//       purchasePrice: 450,
//       sellingPrice: 650,
//       location: 'Rack C-02',
//       supplier: 'Logitech',
//       lastUpdated: '2024-01-15'
//     },
//     {
//       id: 'ITEM004',
//       name: 'Samsung Monitor 24"',
//       type: 'Item',
//       stock: 18,
//       unit: 'pcs',
//       minStock: 15,
//       maxStock: 40,
//       purchasePrice: 8500,
//       sellingPrice: 11500,
//       location: 'Rack A-04',
//       supplier: 'Samsung',
//       lastUpdated: '2024-01-13'
//     },
//     {
//       id: 'ITEM005',
//       name: 'Seagate 1TB HDD',
//       type: 'Item',
//       stock: 67,
//       unit: 'pcs',
//       minStock: 30,
//       maxStock: 120,
//       purchasePrice: 3200,
//       sellingPrice: 4200,
//       location: 'Rack D-01',
//       supplier: 'Seagate',
//       lastUpdated: '2024-01-15'
//     },
//     // Components
//     {
//       id: 'COMP001',
//       name: 'Intel i7 Processor',
//       category: 'CPU',
//       stock: 89,
//       unit: 'pcs',
//       minStock: 30,
//       maxStock: 150,
//       purchasePrice: 18500,
//       sellingPrice: 22000,
//       location: 'Rack E-01',
//       supplier: 'Intel Corp',
//       lastUpdated: '2024-01-15'
//     },
//     {
//       id: 'COMP002',
//       name: '8GB DDR4 RAM',
//       type: 'Component',
//       stock: 234,
//       unit: 'pcs',
//       minStock: 100,
//       maxStock: 400,
//       purchasePrice: 2800,
//       sellingPrice: 3500,
//       location: 'Rack E-02',
//       supplier: 'Samsung',
//       lastUpdated: '2024-01-15'
//     },
//     {
//       id: 'COMP003',
//       name: '512GB SSD',
//       type: 'Component',
//       stock: 67,
//       unit: 'pcs',
//       minStock: 40,
//       maxStock: 200,
//       purchasePrice: 4200,
//       sellingPrice: 5500,
//       location: 'Rack E-03',
//       supplier: 'Western Digital',
//       lastUpdated: '2024-01-14'
//     },
//     {
//       id: 'COMP004',
//       name: 'Motherboard B460',
//       type: 'Component',
//       stock: 34,
//       unit: 'pcs',
//       minStock: 20,
//       maxStock: 80,
//       purchasePrice: 6800,
//       sellingPrice: 8500,
//       location: 'Rack F-01',
//       supplier: 'ASUS',
//       lastUpdated: '2024-01-13'
//     },
//     {
//       id: 'COMP005',
//       name: 'Cooling Fan',
//       type: 'Component',
//       stock: 156,
//       unit: 'pcs',
//       minStock: 60,
//       maxStock: 250,
//       purchasePrice: 550,
//       sellingPrice: 899,
//       location: 'Rack F-02',
//       supplier: 'Cooler Master',
//       lastUpdated: '2024-01-15'
//     }
//   ];



//    // Fetch sales data
//   const fetchSalesData = async () => {
//     try {
     
//       const response = await axios.get(`${API_URL}/inventorystock/report`, {
//         params: {
          
//         }
//       });
      
//       if (response.data.success) {

//         console.log(response.data.data,'response.data.data');
        
//         setStockReport(response.data.data);
        
//       }
//     } catch (error) {
//       console.error('Error fetching sales data:', error);
//     } 
//   };

//   // Load data on component mount and when dates change
//   useEffect(() => {
//     fetchSalesData();
//   }, []);



//   // Filter items
//   const filteredItems = stockData.filter(item => {
//     const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
//     const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
//     // Status filter
//     let matchesStatus = true;
//     if (statusFilter === 'low') matchesStatus = item.stock < item.minStock;
//     else if (statusFilter === 'over') matchesStatus = item.stock > item.maxStock;
//     else if (statusFilter === 'optimal') matchesStatus = item.stock >= item.minStock && item.stock <= item.maxStock;
    
//     return matchesCategory && matchesSearch && matchesStatus;
//   });

//   // Sort items
//   const sortedItems = [...filteredItems].sort((a, b) => {
//     switch(sortBy) {
//       case 'name':
//         return a.name.localeCompare(b.name);
//       case 'stock':
//         return b.stock - a.stock;
//       case 'value':
//         return (b.stock * b.purchasePrice) - (a.stock * a.purchasePrice);
//       default:
//         return 0;
//     }
//   });

//   // Calculate totals
//   const totalItems = stockData.filter(item => item.type === 'Item').length;
//   const totalComponents = stockData.filter(item => item.type === 'Component').length;
//   const totalStockValue = stockData.reduce((acc, item) => acc + (item.stock * item.purchasePrice), 0);
//   const totalSellingValue = stockData.reduce((acc, item) => acc + (item.stock * item.sellingPrice), 0);
//   const potentialProfit = totalSellingValue - totalStockValue;
  
  
  

//   // Get stock status
//   const getStockStatus = (stock: number, min: number, max: number) => {
//     if (stock < min) return { label: 'Low Stock', color: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500' };
//     if (stock > max) return { label: 'Over Stock', color: 'text-yellow-600', bg: 'bg-yellow-100', bar: 'bg-yellow-500' };
//     return { label: 'Optimal', color: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500' };
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
//         <h1 className="text-2xl font-bold text-gray-800">📈 Stock Report</h1>
//         <p className="text-gray-600 mt-1">Complete inventory status with stock values and analysis</p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
//           <p className="text-sm text-gray-500">Total Items</p>
//           <p className="text-2xl font-bold text-gray-800">{totalItems}</p>
//           <p className="text-xs text-gray-500 mt-1">Components: {totalComponents}</p>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
//           <p className="text-sm text-gray-500">Stock Value (Cost)</p>
//           <p className="text-2xl font-bold text-green-600">₹{(totalStockValue/100000).toFixed(2)}L</p>
//           <p className="text-xs text-gray-500 mt-1">Purchase price</p>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
//           <p className="text-sm text-gray-500">Selling Value</p>
//           <p className="text-2xl font-bold text-purple-600">₹{(totalSellingValue/100000).toFixed(2)}L</p>
//           <p className="text-xs text-gray-500 mt-1">Market price</p>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
//           <p className="text-sm text-gray-500">Potential Profit</p>
//           <p className="text-2xl font-bold text-yellow-600">₹{(potentialProfit/100000).toFixed(2)}L</p>
//           <p className="text-xs text-gray-500 mt-1">If all sold</p>
//         </div>
//       </div>

    

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <input
//               type="text"
//               placeholder="🔍 Search by name, ID, or supplier..."
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
         
         
//           <div className="md:w-48">
//             <select
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="name">Sort by Name</option>
//               <option value="stock">Sort by Stock</option>
//               {/* <option value="value">Sort by Value</option> */}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Stock Table */}
//       <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-gray-800">Complete Stock Details</h3>
//           <span className="text-sm text-gray-500">
//             {sortedItems.length} items • Value: ₹{(sortedItems.reduce((acc, item) => acc + (item.stock * item.purchasePrice), 0)/100000).toFixed(2)}L
//           </span>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stock</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Min/Max</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Purchase ₹</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Selling ₹</th>
//                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stock Value</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {sortedItems.map((item) => {
//                 const status = getStockStatus(item.stock, item.minStock, item.maxStock);
//                 const stockValue = item.stock * item.purchasePrice;
                
//                 return (
//                   <tr key={item.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div>
//                         <p className="font-medium text-gray-900">{item.name}</p>
//                         <p className="text-xs text-gray-500">ID: {item.id}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 py-1 text-xs rounded-full ${
//                         item.type === 'Item' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
//                       }`}>
//                         {item.type}
//                       </span>
//                     </td>
                  
//                     <td className="px-6 py-4 whitespace-nowrap text-right">
//                       <div className="flex items-center justify-end">
//                         <span className="text-sm font-medium text-gray-900">{item.stock}</span>
//                         <span className="text-xs text-gray-500 ml-1">{item.unit}</span>
//                       </div>
//                       <div className="w-20 h-1.5 bg-gray-200 rounded-full mt-1 ml-auto">
//                         <div 
//                           className={`${status.bar} h-1.5 rounded-full`}
//                           style={{ width: `${(item.stock / item.maxStock) * 100}%` }}
//                         ></div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
//                       {item.minStock} / {item.maxStock}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
//                       ₹{item.purchasePrice.toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
//                       ₹{item.sellingPrice.toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
//                       ₹{(stockValue/1000).toFixed(0)}K
//                     </td>
                 
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {item.location}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

     
//     </div>
//   );
// };

// export default StockReport;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const StockReport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name, stock, value
  const [stockData, setStockData] = useState([]);
  const [summary, setSummary] = useState({
    totalItems: 0,
    totalStockValue: 0,
    totalSellingValue: 0,
    potentialProfit: 0,
  });
  const [loading, setLoading] = useState(true);

  // Default values
  const DEFAULT_MIN_STOCK = 40;
  const DEFAULT_MAX_STOCK = 200;
  const DEFAULT_LOCATIONS = ['Rack A-01', 'Rack B-03', 'Rack C-02', 'Rack D-01', 'Rack E-03', 'Rack F-02'];

  // Fetch stock data
  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/inventorystock/report`, {
        params: {
          search: searchTerm,
          sortBy: sortBy
        }
      });
      
      if (response.data.success) {
        console.log(response.data.summery, 'response.data.data');
        
        // Transform backend data to match frontend format
        const transformedData = response.data.data.map((item:any, index:any) => {
          // Determine type based on productUnit
          const type = item.productUnit?.toLowerCase().includes('pcs') || 
                      item.productUnit?.toLowerCase().includes('nos') ? 'Item' : 'Component';
          
          // Generate consistent location based on id (so same item always gets same location)
          const locationIndex = (item.id?.length || index) % DEFAULT_LOCATIONS.length;
          const location = DEFAULT_LOCATIONS[locationIndex];
          
          // Calculate stock status
          const stock = item.currentStock || 0;
          const minStock = DEFAULT_MIN_STOCK;
          const maxStock = DEFAULT_MAX_STOCK;
          
          let status = 'optimal';
          if (stock < minStock) status = 'low';
          if (stock > maxStock) status = 'over';

          return {
            id: item._id,
            name: item?.productName,
            type: type,
            stock: stock,
            unit: item.productUnit || 'pcs',
            minStock: minStock,
            maxStock: maxStock,
            purchasePrice: item.buyAveragePrice*item.stockIn || 0,
            sellingPrice: item.sellAveragePrice*item.stockOut || 0,
            stockValue:  0,
            location: location,
            lastUpdated: "",
            status: status
          };
        });

        setStockData(transformedData);
        setSummary(response.data.summery);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchStockData();
  }, [searchTerm, sortBy]);

  // Filter and sort items (frontend filtering)
  const filteredItems = stockData.filter((item:any )=> {
    const matchesSearch = searchTerm === '' || 
                         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a:any, b:any) => {
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'stock':
        return b.stock - a.stock;
      case 'value':
        return b.stockValue - a.stockValue;
      default:
        return 0;
    }
  });

  // Get stock status
  const getStockStatus = (stock: number, min: number, max: number) => {
    if (stock < min) return { label: 'Low Stock', color: 'text-red-600', bg: 'bg-red-100', bar: 'bg-red-500' };
    if (stock > max) return { label: 'Over Stock', color: 'text-yellow-600', bg: 'bg-yellow-100', bar: 'bg-yellow-500' };
    return { label: 'Optimal', color: 'text-green-600', bg: 'bg-green-100', bar: 'bg-green-500' };
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format in Lakhs
  const formatInLakhs = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)}L`;
  };

  // Format in Thousands
  const formatInThousands = (amount: number) => {
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">📈 Stock Report</h1>
        <p className="text-gray-600 mt-1">Complete inventory status with stock values and analysis</p>
      </div> */}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Items</p>
          <p className="text-2xl font-bold text-gray-800">{summary?.totalItems}</p>
          <p className="text-xs text-gray-500 mt-1">Products in stock</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Stock Value (Cost)</p>
          <p className="text-2xl font-bold text-green-600">{formatInLakhs(summary?.totalStockValue)}</p>
          <p className="text-xs text-gray-500 mt-1">Purchase price</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Selling Value</p>
          <p className="text-2xl font-bold text-purple-600">{formatInLakhs(summary?.totalSellingValue)}</p>
          <p className="text-xs text-gray-500 mt-1">Market price</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Purchase Vlaue</p>
          <p className="text-2xl font-bold text-yellow-600">{formatInLakhs(summary?.potentialProfit)}</p>
          <p className="text-xs text-gray-500 mt-1">If all sold</p>
        </div>
      </div>

   

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search by product name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="stock">Sort by Stock</option>
              <option value="value">Sort by Value</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Complete Stock Details</h3>
          <span className="text-sm text-gray-500">
            {sortedItems.length} items • Value: {formatInLakhs(sortedItems.reduce((acc:any, item:any) => acc + item.stockValue, 0))}
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Min/Max</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Purchase ₹</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Selling ₹</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stock Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedItems.length > 0 ? (
                sortedItems.map((item:any) => {
                  const status = getStockStatus(item.stock, item.minStock, item.maxStock);
                  const stockValue = item.stock * item.purchasePrice;
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">ID: {item.id?.slice(-6)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.type === 'Item' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                    
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end">
                          <span className="text-sm font-medium text-gray-900">{item.stock}</span>
                          <span className="text-xs text-gray-500 ml-1">{item.unit}</span>
                        </div>
                        <div className="w-20 h-1.5 bg-gray-200 rounded-full mt-1 ml-auto">
                          <div 
                            className={`${status.bar} h-1.5 rounded-full`}
                            style={{ width: `${Math.min((item.stock / item.maxStock) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {item.minStock} / {item.maxStock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                        {formatCurrency(item.purchasePrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                        {formatCurrency(item.sellingPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        {formatInThousands(stockValue)}
                      </td>
                   
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.location}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p>No stock items found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockReport;