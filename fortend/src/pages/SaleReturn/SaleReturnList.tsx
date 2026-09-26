import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface SaleReturn {
  _id: string;
  saleId: { _id: string; grandTotal: number; date: string } | string;
  customerId: {
    _id: string;
    name?: string;
    companyName?: string;
    mobile?: string;
    phone?: string;
  } | string;
  returnType: "Full Cancel" | "Partial Return";
  returnItems: {
    productId: string;
    itemName: string;
    mrp: number;
    rate: number;
    originalQuantity: number;
    returnQuantity: number;
    returnAmount: number;
  }[];
  originalTotal: number;
  returnTotal: number;
  reason: string;
  performedByName: string;
  returnDate: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

const SaleReturnList: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<SaleReturn[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<SaleReturn | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterType, setFilterType] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rowsPerPageOptions] = useState([25, 50, 100, 200]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = { page, limit: rowsPerPage };
      if (fromDate) params.from = fromDate;
      if (toDate) params.to = toDate;
      if (filterType) params.returnType = filterType;

      const res = await axios.get(`${API_URL}/sale-return`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setData(res.data.data || []);
        setTotalEntries(res.data.total || 0);
        setTotalPages(res.data.pages || 1);
      } else if (
        res.data?.success === false &&
        res.data?.message === "Unauthorized"
      ) {
        toast.error("Please login again");
        navigate("/login");
      } else {
        toast.error(res?.data?.message || "Failed to fetch returns");
        setData([]);
      }
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        setError(error.response?.data?.message || "Failed to fetch data");
      }
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, fromDate, toDate, filterType]);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${API_URL}/sale-return/${id}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Sale return deleted");
        await fetchData();
        setDeleteDialogOpen(false);
      } else {
        toast.error(res.data?.message || "Failed to delete");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const getCustomerName = (c: any): string => {
    if (typeof c === "object" && c !== null) {
      return c.companyName || c.name || "-";
    }
    return "-";
  };

  const getCustomerPhone = (c: any): string => {
    if (typeof c === "object" && c !== null) {
      return c.phone || c.mobile || "";
    }
    return "";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalReturnedAmount = data.reduce(
    (s, r) => s + (r.returnTotal || 0),
    0
  );

  if (loading && data.length === 0) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="h-16 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
        <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-red-500 bg-clip-text text-transparent mb-2">
            Sale Returns
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            All cancelled and returned invoices
          </p>
          {data.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Showing {data.length} of {totalEntries} returns
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => navigate("/sale/invoice-list")}
            className="px-4 md:px-6 py-2.5 border-2 border-red-400 text-red-500 rounded-xl hover:bg-red-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <span>↩️</span>
            New Return (from Sale)
          </button>

          <button
            onClick={fetchData}
            className="px-4 md:px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <span>🔄</span>
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-5 bg-white rounded-2xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Type
            </label>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white"
            >
              <option value="">All Types</option>
              <option value="Full Cancel">Full Cancel</option>
              <option value="Partial Return">Partial Return</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFromDate("");
                setToDate("");
                setFilterType("");
                setPage(1);
              }}
              className="px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
            >
              <span>♻️</span>
              Reset
            </button>
          </div>
        </div>
      </div>

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

      {/* Summary + rows per page */}
      {data.length > 0 && (
        <div className="mb-4 flex justify-between items-center flex-wrap gap-3">
          <div className="text-sm font-semibold text-red-700 bg-red-50 px-4 py-2 rounded-xl border border-red-200">
            Total Returned (this page): ₹ {totalReturnedAmount.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="border-none focus:outline-none text-sm font-medium text-gray-700 bg-transparent"
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden lg:block bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-3 py-4 text-sm font-bold text-white">
                  Return Date
                </th>
                <th className="px-3 py-4 text-sm font-bold text-white">
                  Customer
                </th>
                <th className="px-3 py-4 text-sm font-bold text-white">
                  Type
                </th>
                <th className="px-3 py-4 text-sm font-bold text-white">
                  Items
                </th>
                <th className="px-3 py-4 text-sm font-bold text-white">
                  Original Total
                </th>
                <th className="px-3 py-4 text-sm font-bold text-white">
                  Return Total
                </th>
                <th className="px-3 py-4 text-sm font-bold text-white">
                  By
                </th>
                <th className="px-3 py-4 text-sm font-bold text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-12 text-center">
                    <p className="text-lg text-gray-500 mb-2">
                      No returns found
                    </p>
                    <p className="text-sm text-gray-400">
                      Go to Sale List and click "Return" to create one
                    </p>
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={row._id}
                    className="hover:bg-blue-50 transition-all hover:scale-[1.01] hover:shadow-md"
                  >
                    <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-gray-300 rounded-full text-xs">
                        {formatDate(row.returnDate)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="font-semibold text-gray-800 text-sm">
                        {getCustomerName(row.customerId)}
                      </div>
                      {getCustomerPhone(row.customerId) && (
                        <div className="text-xs text-gray-500">
                          {getCustomerPhone(row.customerId)}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center">
                      {row.returnType === "Full Cancel" ? (
                        <span className="px-3 py-1 border border-red-300 text-red-700 bg-red-50 rounded-full text-xs font-medium">
                          ❌ Full Cancel
                        </span>
                      ) : (
                        <span className="px-3 py-1 border border-orange-300 text-orange-700 bg-orange-50 rounded-full text-xs font-medium">
                          ↩️ Partial
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-3 py-1 border border-purple-300 text-purple-700 rounded-full text-xs">
                        {row.returnItems.length} items
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center text-sm text-gray-700">
                      ₹ {row.originalTotal.toLocaleString()}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="font-bold text-red-600 text-base">
                        ₹ {row.returnTotal.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center text-xs text-gray-600">
                      {row.performedByName || "System"}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedReturn(row);
                            setViewDialogOpen(true);
                          }}
                          className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg transition-all hover:-translate-y-0.5"
                          title="View"
                        >
                          <span className="text-lg">👁️</span>
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

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {data.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
            <p className="text-lg text-gray-500 mb-2">No returns found</p>
          </div>
        ) : (
          data.map((row) => (
            <div
              key={row._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {getCustomerName(row.customerId)}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatDate(row.returnDate)}
                    </p>
                  </div>
                  {row.returnType === "Full Cancel" ? (
                    <span className="px-2 py-1 border border-red-300 text-red-700 bg-red-50 rounded-full text-xs">
                      ❌ Cancel
                    </span>
                  ) : (
                    <span className="px-2 py-1 border border-orange-300 text-orange-700 bg-orange-50 rounded-full text-xs">
                      ↩️ Partial
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <p className="text-gray-500">Items:</p>
                  <p className="text-right">{row.returnItems.length}</p>
                  <p className="text-gray-500">Original:</p>
                  <p className="text-right">
                    ₹ {row.originalTotal.toLocaleString()}
                  </p>
                  <p className="text-gray-500">Returned:</p>
                  <p className="text-right font-bold text-red-600">
                    ₹ {row.returnTotal.toLocaleString()}
                  </p>
                  <p className="text-gray-500">By:</p>
                  <p className="text-right text-xs">
                    {row.performedByName || "System"}
                  </p>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setSelectedReturn(row);
                      setViewDialogOpen(true);
                    }}
                    className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 flex items-center justify-center gap-1"
                  >
                    <span>👁️</span> View
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(row._id);
                      setDeleteDialogOpen(true);
                    }}
                    className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 flex items-center justify-center gap-1"
                  >
                    <span>🗑️</span> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalEntries > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-500">
            Showing {(page - 1) * rowsPerPage + 1} to{" "}
            {Math.min(page * rowsPerPage, totalEntries)} of {totalEntries}{" "}
            entries
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              ⏮️ First
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              ◀️ Prev
            </button>

            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                let pageNum;
                if (totalPages <= 5) pageNum = idx + 1;
                else if (page <= 3) pageNum = idx + 1;
                else if (page >= totalPages - 2) pageNum = totalPages - 4 + idx;
                else pageNum = page - 2 + idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium ${
                      page === pageNum
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                        : "border border-gray-200 bg-white hover:bg-gray-50"
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
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              Next ▶️
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              Last ⏭️
            </button>
          </div>
        </div>
      )}

      {/* ============== VIEW MODAL ============== */}
      {viewDialogOpen && selectedReturn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div
              className={`text-white px-6 py-4 rounded-t-2xl flex justify-between items-center ${
                selectedReturn.returnType === "Full Cancel"
                  ? "bg-gradient-to-r from-red-500 to-red-600"
                  : "bg-gradient-to-r from-orange-500 to-orange-600"
              }`}
            >
              <div>
                <h2 className="text-xl font-bold">
                  {selectedReturn.returnType}
                </h2>
                <p className="text-xs opacity-90">
                  {formatDate(selectedReturn.returnDate)} • By:{" "}
                  {selectedReturn.performedByName || "System"}
                </p>
              </div>
              <button
                onClick={() => setViewDialogOpen(false)}
                className="text-2xl hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {/* Customer */}
              <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                  Customer
                </p>
                <p className="font-bold text-gray-800">
                  {getCustomerName(selectedReturn.customerId)}
                </p>
                {getCustomerPhone(selectedReturn.customerId) && (
                  <p className="text-sm text-gray-600">
                    📞 {getCustomerPhone(selectedReturn.customerId)}
                  </p>
                )}
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Original Total</p>
                  <p className="text-lg font-bold text-gray-800">
                    ₹ {selectedReturn.originalTotal.toLocaleString()}
                  </p>
                </div>
                <div className="bg-red-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Returned Total</p>
                  <p className="text-lg font-bold text-red-600">
                    ₹ {selectedReturn.returnTotal.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full">
                  <thead className="bg-slate-700 text-white">
                    <tr>
                      <th className="px-3 py-2 text-xs font-bold text-left">
                        #
                      </th>
                      <th className="px-3 py-2 text-xs font-bold text-left">
                        Item
                      </th>
                      <th className="px-3 py-2 text-xs font-bold text-center">
                        MRP
                      </th>
                      <th className="px-3 py-2 text-xs font-bold text-center">
                        Rate
                      </th>
                      <th className="px-3 py-2 text-xs font-bold text-center">
                        Orig Qty
                      </th>
                      <th className="px-3 py-2 text-xs font-bold text-center">
                        Return Qty
                      </th>
                      <th className="px-3 py-2 text-xs font-bold text-center">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedReturn.returnItems.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 text-sm">{idx + 1}</td>
                        <td className="px-3 py-2 text-sm font-medium">
                          {item.itemName}
                        </td>
                        <td className="px-3 py-2 text-sm text-center">
                          ₹ {item.mrp}
                        </td>
                        <td className="px-3 py-2 text-sm text-center">
                          ₹ {item.rate}
                        </td>
                        <td className="px-3 py-2 text-sm text-center">
                          {item.originalQuantity}
                        </td>
                        <td className="px-3 py-2 text-sm text-center font-bold text-red-600">
                          {item.returnQuantity}
                        </td>
                        <td className="px-3 py-2 text-sm text-center font-bold text-green-600">
                          ₹ {item.returnAmount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Reason */}
              {selectedReturn.reason && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl mb-4">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Reason
                  </p>
                  <p className="text-sm text-gray-700">
                    {selectedReturn.reason}
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setViewDialogOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this return record? This will make
              the items available to return again.
            </p>
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
    </div>
  );
};

export default SaleReturnList;