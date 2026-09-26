




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface CashEntry {
  _id: string;
  openingCash: {
    note500: number;
    note200: number;
    note100: number;
    note50: number;
    note20: number;
    note10: number;
    coins: number;
    online: number;
  };
  totalSales: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// API URL from environment
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get auth headers
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

const DailyCashSummary: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<CashEntry[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination states
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rowsPerPageOptions] = useState([25, 50, 100, 200]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  

  const [summary, setSummary] = useState({
    totalCash: 0,
    totalOnline: 0,
    grandTotal: 0,
    totalEntries: 0,
  });

  const calculateTotals = (entries: CashEntry[]) => {
    const summary = entries.reduce(
      (acc, entry) => {
        const cashTotal = 
          (entry.openingCash?.note500 * 500 || 0) +
          (entry.openingCash?.note200 * 200 || 0) +
          (entry.openingCash?.note100 * 100 || 0) +
          (entry.openingCash?.note50 * 50 || 0) +
          (entry.openingCash?.note20 * 20 || 0) +
          (entry.openingCash?.note10 * 10 || 0) +
          (entry.openingCash?.coins || 0);
        
        const onlineTotal = entry.openingCash?.online || 0;
        
        return {
          totalCash: acc.totalCash + cashTotal,
          totalOnline: acc.totalOnline + onlineTotal,
          grandTotal: acc.grandTotal + (entry.totalSales || 0),
          totalEntries: acc.totalEntries + 1,
        };
      },
      { totalCash: 0, totalOnline: 0, grandTotal: 0, totalEntries: 0 }
    );
    setSummary(summary);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.get(`${API_URL}/dailycash`, {
        params: {
          page,
          limit: rowsPerPage,
        },
        ...getAuthHeaders(),
      });
      
      if (res.data?.success === true) {
        const entries = res.data.data || [];
        setData(entries);
        setTotalEntries(res.data.total || 0);
        setTotalPages(res.data.pages || 1);
        calculateTotals(entries);
        toast.success("Successfully");
      } else if (res.data?.success === false && res.data?.message === 'Unauthorized') {
        toast.error("login again");
        navigate('/login');
      } else {
        toast.error(res?.data?.message || res?.data?.errors || 'Failed');
        setData([]);
      }
    } catch (error: any) {
      if (error.response?.data?.message === 'Unauthorized') {
        setError('login again');
        localStorage.removeItem('erptoken');
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Failed to fetch data');
      }
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      
      const res = await axios.delete(`${API_URL}/dailycash/${id}`, getAuthHeaders());
      
      if (res.data?.success === true) {
        await fetchData();
        setDeleteDialogOpen(false);
      } else if (res.data?.success === false && res.data?.message === 'Unauthorized') {
        setError('login again');
        localStorage.removeItem('erptoken');
        navigate('/login');
      } else {
        setError(res.data?.message || 'Failed to delete entry');
      }
    } catch (error: any) {
      console.error("Error deleting entry:", error);
      if (error.response?.data?.message === 'Unauthorized') {
        setError('login again');
        localStorage.removeItem('erptoken');
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Failed to delete entry');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      setLoading(true);
      
      // Delete one by one since no bulk delete endpoint
      for (const entry of data) {
        await axios.delete(`${API_URL}/dailycash/${entry._id}`, getAuthHeaders());
      }
      
      await fetchData();
      setDeleteAllDialogOpen(false);
    } catch (error: any) {
      console.error("Error deleting all entries:", error);
      if (error.response?.data?.message === 'Unauthorized') {
        setError('login again');
        localStorage.removeItem('erptoken');
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Failed to delete all entries');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && data.length === 0) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="h-16 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-500 bg-clip-text text-transparent mb-2">
            Daily Cash Summary
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Track and manage daily cash collections
          </p>
          {data.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Showing {data.length} of {totalEntries} entries
            </p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => navigate("/dailycash/create")}
            className="px-4 md:px-6 py-2.5 border-2 border-blue-400 text-blue-500 rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <span>➕</span>
            Create
          </button>

          <button
            onClick={fetchData}
            className="px-4 md:px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <span>🔄</span>
            Refresh
          </button>

          <button
            onClick={() => setDeleteAllDialogOpen(true)}
            disabled={data.length === 0}
            className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <span>🗑️</span>
            Delete All
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex justify-between items-center">
          <p className="text-red-700 text-sm">{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* Summary Cards with Hover Effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Entries Card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-purple-600 hover:to-purple-700 cursor-pointer group">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl group-hover:scale-110 transition-transform">💰</span>
            <p className="text-sm opacity-90 group-hover:opacity-100">Total Entries</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold group-hover:scale-110 transition-transform inline-block">{totalEntries}</p>
          <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            📊 Total number of entries
          </div>
        </div>

        {/* Total Cash Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-green-600 hover:to-green-700 cursor-pointer group">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl group-hover:scale-110 transition-transform">💰</span>
            <p className="text-sm opacity-90 group-hover:opacity-100">Total Cash</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold group-hover:scale-110 transition-transform inline-block">₹ {summary.totalCash.toLocaleString()}</p>
          <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            💵 Physical cash total
          </div>
        </div>

        {/* Total Online Card */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-5 text-white shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-pink-600 hover:to-pink-700 cursor-pointer group">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl group-hover:scale-110 transition-transform">📈</span>
            <p className="text-sm opacity-90 group-hover:opacity-100">Total Online</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold group-hover:scale-110 transition-transform inline-block">₹ {summary.totalOnline.toLocaleString()}</p>
          <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            💳 Online payments total
          </div>
        </div>

        {/* Grand Total Card */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-5 text-white shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-orange-500 hover:to-orange-600 cursor-pointer group">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl group-hover:scale-110 transition-transform">💰</span>
            <p className="text-sm opacity-90 group-hover:opacity-100">Grand Total</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold group-hover:scale-110 transition-transform inline-block">₹ {summary.grandTotal.toLocaleString()}</p>
          <div className="mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            💰 Cash + Online total
          </div>
        </div>
      </div>

      {/* Rows Per Page Selector */}
      {data.length > 0 && (
        <div className="mb-4 flex justify-end">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="border-none focus:outline-none text-sm font-medium text-gray-700 bg-transparent"
            >
              {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
        </div>
      )}

      {/* Table Section - Desktop */}
      <div className="hidden lg:block bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-3 py-4 text-center text-sm font-bold text-white">Date</th>
                   <th className="px-3 py-4 text-center text-sm font-bold text-white">Collect Person</th>
                <th className="px-3 py-4 text-center text-sm font-bold text-white">₹500</th>
                <th className="px-3 py-4 text-center text-sm font-bold text-white">₹200</th>
                <th className="px-3 py-4 text-center text-sm font-bold text-white">₹100</th>
                <th className="px-3 py-4 text-center text-sm font-bold text-white">₹50</th>
                <th className="px-3 py-4 text-center text-sm font-bold text-white">₹20</th>
                <th className="px-3 py-4 text-center text-sm font-bold text-white">₹10</th>
                <th className="px-3 py-4 text-center text-sm font-bold text-white">Coins</th>
                <th className="px-3 py-4 text-center text-sm font-bold text-white">Online</th>
                <th className="px-3 py-4 text-center text-sm font-bold text-white">Total</th>
                <th className="px-3 py-4 text-center text-sm font-bold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-3 py-12 text-center">
                    <p className="text-lg text-gray-500 mb-2">No entries found</p>
                    <p className="text-sm text-gray-400 mb-4">Click "Create" to add your first entry</p>
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row._id} className="hover:bg-blue-50 transition-all hover:scale-[1.01] hover:shadow-md">
                    <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-gray-300 rounded-full text-xs">
                        {formatDate(row.date)}
                      </span>
                    </td>
                     <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-blue-300 text-blue-700 rounded-full text-xs">
                        {"mahesh nayak"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-blue-300 text-blue-700 rounded-full text-xs">
                        {row.openingCash?.note500 || 0}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-blue-300 text-blue-700 rounded-full text-xs">
                        {row.openingCash?.note200 || 0}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-blue-300 text-blue-700 rounded-full text-xs">
                        {row.openingCash?.note100 || 0}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-blue-300 text-blue-700 rounded-full text-xs">
                        {row.openingCash?.note50 || 0}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-blue-300 text-blue-700 rounded-full text-xs">
                        {row.openingCash?.note20 || 0}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-blue-300 text-blue-700 rounded-full text-xs">
                        {row.openingCash?.note10 || 0}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-pink-300 text-pink-700 rounded-full text-xs">
                        {row.openingCash?.coins || 0}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-cyan-300 text-cyan-700 rounded-full text-xs">
                        ₹ {row.openingCash?.online?.toLocaleString() || 0}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <p className="font-bold text-green-600">₹ {row.totalSales?.toLocaleString() || 0}</p>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => navigate(`/dailycash/edit/${row._id}`)}
                          disabled={loading}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-all hover:-translate-y-0.5"
                          title="Edit"
                        >
                          <span className="text-lg">✏️</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedId(row._id);
                            setDeleteDialogOpen(true);
                          }}
                          disabled={loading}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all hover:-translate-y-0.5"
                          title="Delete"
                        >
                          <span className="text-lg">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {data.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
            <p className="text-lg text-gray-500 mb-2">No entries found</p>
            <p className="text-sm text-gray-400 mb-4">Click "Create" to add your first entry</p>
          </div>
        ) : (
          data.map((row) => (
            <div key={row._id} className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="px-3 py-1 border border-gray-300 rounded-full text-xs">
                      {formatDate(row.date)}
                    </span>
                  </div>
                  <p className="font-bold text-green-600">₹ {row.totalSales?.toLocaleString() || 0}</p>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">₹500</p>
                    <span className="px-2 py-1 border border-blue-300 text-blue-700 rounded-full text-xs inline-block mt-1">
                      {row.openingCash?.note500 || 0}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">₹200</p>
                    <span className="px-2 py-1 border border-blue-300 text-blue-700 rounded-full text-xs inline-block mt-1">
                      {row.openingCash?.note200 || 0}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">₹100</p>
                    <span className="px-2 py-1 border border-blue-300 text-blue-700 rounded-full text-xs inline-block mt-1">
                      {row.openingCash?.note100 || 0}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">₹50</p>
                    <span className="px-2 py-1 border border-blue-300 text-blue-700 rounded-full text-xs inline-block mt-1">
                      {row.openingCash?.note50 || 0}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">₹20</p>
                    <span className="px-2 py-1 border border-blue-300 text-blue-700 rounded-full text-xs inline-block mt-1">
                      {row.openingCash?.note20 || 0}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">₹10</p>
                    <span className="px-2 py-1 border border-blue-300 text-blue-700 rounded-full text-xs inline-block mt-1">
                      {row.openingCash?.note10 || 0}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Coins</p>
                    <span className="px-2 py-1 border border-pink-300 text-pink-700 rounded-full text-xs inline-block mt-1">
                      {row.openingCash?.coins || 0}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Online</p>
                    <span className="px-2 py-1 border border-cyan-300 text-cyan-700 rounded-full text-xs inline-block mt-1">
                      ₹{row.openingCash?.online?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => navigate(`/dailycash/edit/${row._id}`)}
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>✏️</span> Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(row._id);
                      setDeleteDialogOpen(true);
                    }}
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>🗑️</span> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalEntries > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, totalEntries)} of {totalEntries} entries
          </div>
          
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ⏮️ First
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ◀️ Prev
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (page <= 3) {
                  pageNum = idx + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = page - 2 + idx;
                }
                
                return (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'border border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next ▶️
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Last ⏭️
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this entry? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={() => selectedId && handleDelete(selectedId)}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm hover:from-red-600 hover:to-red-700"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Confirmation Modal */}
      {deleteAllDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">Delete All Entries</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete ALL entries? This action cannot be undone and all data will be permanently lost.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteAllDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm hover:from-red-600 hover:to-red-700"
                disabled={loading}
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyCashSummary;