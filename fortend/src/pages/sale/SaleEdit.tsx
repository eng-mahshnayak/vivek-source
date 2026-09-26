import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  categoryName: string;
}

interface Product {
  _id: string;
  itemName: string;
  mrp: number;
  rate: number;
  unit: string;
  categoryId: string | { _id: string; categoryName: string };
}

interface Customer {
  _id: string;
  name?: string;
  companyName?: string;
  mobile?: string;
  phone?: string;
}

interface SaleRow {
  productId: string;
  itemName: string;
  mrp: number;
  rate: number;
  quantity: number;
  totalAmount: number;
  unit: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

const SaleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Master data
  const [categories, setCategories] = useState<Category[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Selected
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [saleDate, setSaleDate] = useState<string>("");

  // Product search
  const [productSearch, setProductSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Current row
  const [currentQty, setCurrentQty] = useState<number>(1);
  const [currentRate, setCurrentRate] = useState<number>(0);

  // Sale rows
  const [rows, setRows] = useState<SaleRow[]>([]);

  // States
  const [saving, setSaving] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const searchRef = useRef<HTMLDivElement>(null);

  // ============== Fetch masters ==============
  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const [catRes, cusRes] = await Promise.all([
          axios.get(`${API_URL}/category`, {
            params: { page: 1, limit: 1000 },
            ...getAuthHeaders(),
          }),
          axios.get(`${API_URL}/customer`, {
            params: { page: 1, limit: 1000 },
            ...getAuthHeaders(),
          }),
        ]);

        if (catRes.data?.success) setCategories(catRes.data.data || []);
        if (cusRes.data?.success) setCustomers(cusRes.data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories/customers");
      }
    };
    fetchMasters();
  }, []);

  // ============== Fetch sale by id ==============
  useEffect(() => {
    const fetchSale = async () => {
      try {
        setFetchLoading(true);
        const res = await axios.get(`${API_URL}/sale/${id}`, getAuthHeaders());

        if (res.data?.success === true) {
          const s = res.data.data;

          // Set customer
          setSelectedCustomer(
            typeof s.customerId === "object" ? s.customerId._id : s.customerId
          );

          // Set date
          const d = new Date(s.date);
          const formattedDate = d.toISOString().split("T")[0];
          setSaleDate(formattedDate);

          // Set rows from existing items
          const mappedRows: SaleRow[] = (s.items || []).map((it: any) => ({
            productId:
              typeof it.productId === "object"
                ? it.productId._id
                : it.productId,
            itemName: it.itemName,
            mrp: it.mrp,
            rate: it.rate,
            quantity: it.quantity,
            totalAmount: it.totalAmount,
            unit: it.unit || "",
          }));
          setRows(mappedRows);
        }
      } catch (error: any) {
        console.error(error);
        if (error.response?.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(error.response?.data?.message || "Failed to fetch sale");
        }
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) fetchSale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ============== Outside click for search ==============
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ============== Search products ==============
  useEffect(() => {
    if (!productSearch.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const params: any = {
          search: productSearch,
          page: 1,
          limit: 20,
        };
        if (selectedCategory) params.categoryId = selectedCategory;

        const res = await axios.get(`${API_URL}/product`, {
          params,
          ...getAuthHeaders(),
        });

        if (res.data?.success) {
          setSearchResults(res.data.data || []);
          setShowSearchResults(true);
        }
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [productSearch, selectedCategory]);

  // ============== Fetch products when category changes ==============
  useEffect(() => {
    if (!selectedCategory) return;
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/product`, {
          params: { categoryId: selectedCategory, page: 1, limit: 1000 },
          ...getAuthHeaders(),
        });
        if (res.data?.success) {
          setSearchResults(res.data.data || []);
          setShowSearchResults(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // ============== Select product ==============
  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setCurrentRate(p.rate);
    setCurrentQty(1);
    setProductSearch(p.itemName);
    setShowSearchResults(false);
  };

  // ============== Add item ==============
  const handleAddItem = () => {
    if (!selectedProduct) {
      toast.error("Please select an item first");
      return;
    }
    if (currentQty <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    if (currentRate < 0) {
      toast.error("Rate cannot be negative");
      return;
    }

    const totalAmount = currentQty * currentRate;

    setRows([
      ...rows,
      {
        productId: selectedProduct._id,
        itemName: selectedProduct.itemName,
        mrp: selectedProduct.mrp,
        rate: currentRate,
        quantity: currentQty,
        totalAmount,
        unit: selectedProduct.unit,
      },
    ]);

    // Reset
    setSelectedProduct(null);
    setProductSearch("");
    setCurrentQty(1);
    setCurrentRate(0);
    setSearchResults([]);
  };

  // ============== Update row ==============
  const updateRow = (
    index: number,
    field: "quantity" | "rate",
    value: number
  ) => {
    const updated = [...rows];
    if (value < 0) value = 0;
    updated[index][field] = value;
    updated[index].totalAmount =
      Number(updated[index].quantity) * Number(updated[index].rate);
    setRows(updated);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const grandTotal = rows.reduce((sum, r) => sum + r.totalAmount, 0);

  // ============== Save (UPDATE) ==============
  const handleSave = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }
    if (rows.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        customerId: selectedCustomer,
        items: rows.map((r) => ({
          productId: r.productId,
          itemName: r.itemName,
          mrp: r.mrp,
          rate: r.rate,
          quantity: r.quantity,
        })),
        date: saleDate,
      };

      const res = await axios.put(`${API_URL}/sale/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
        },
      });

      if (res.data.success === true) {
        toast.success("Sale updated successfully! 🎉");
        setTimeout(() => navigate("/sale/invoice-list"), 1200);
      } else if (res.data.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to update sale");
      }
    } catch (error: any) {
      console.error(error);
      if (!error.response) {
        toast.error("Network error! Please check your connection");
      } else if (error.response?.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(error.response?.data?.message || "Failed to update sale");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!window.confirm("Discard changes?")) return;
    navigate("/sale/invoice-list");
  };

  if (fetchLoading) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="h-16 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
        <div className="h-64 bg-gray-200 rounded-2xl animate-pulse mb-4"></div>
        <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-500 bg-clip-text text-transparent mb-2">
          Edit Sale Invoice
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Update customer, items and quantities
        </p>
      </div>

      {/* ============== Top Info ============== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white"
            >
              <option value="">-- Select Customer --</option>
              {customers.map((c: any) => (
                <option key={c._id} value={c._id}>
                  {c.companyName || c.name}{" "}
                  {c.phone || c.mobile ? `(${c.phone || c.mobile})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sale Date
            </label>
            <input
              type="date"
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>
        </div>
      </div>

      {/* ============== Add Item Section ============== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>🔍</span> Add Item
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Category */}
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedProduct(null);
                setProductSearch("");
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="md:col-span-4 relative" ref={searchRef}>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Search Item
            </label>
            <input
              type="text"
              value={productSearch}
              onChange={(e) => {
                setProductSearch(e.target.value);
                if (selectedProduct) setSelectedProduct(null);
              }}
              onFocus={() => {
                if (searchResults.length > 0) setShowSearchResults(true);
              }}
              placeholder="Type item name..."
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />

            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-y-auto">
                {searchResults.map((p) => (
                  <button
                    key={p._id}
                    type="button"
                    onClick={() => handleSelectProduct(p)}
                    className="w-full text-left px-3 py-2.5 hover:bg-blue-50 border-b border-gray-100 last:border-0 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm text-gray-800">
                        {p.itemName}
                      </span>
                      <span className="text-xs text-gray-500">
                        MRP: ₹{p.mrp} / {p.unit}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Rate: ₹{p.rate}
                    </div>
                  </button>
                ))}
              </div>
            )}
            {showSearchResults &&
              productSearch.trim() &&
              searchResults.length === 0 && (
                <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-sm text-gray-500">
                  No items found
                </div>
              )}
          </div>

          {/* Item Name */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={selectedProduct?.itemName || ""}
              readOnly
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-700"
            />
          </div>

          {/* MRP */}
          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              MRP
            </label>
            <input
              type="text"
              value={selectedProduct?.mrp ?? ""}
              readOnly
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-700"
            />
          </div>

          {/* Rate */}
          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Rate
            </label>
            <input
              type="number"
              value={currentRate || ""}
              onChange={(e) => setCurrentRate(Number(e.target.value))}
              min={0}
              disabled={!selectedProduct}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm disabled:bg-gray-100"
            />
          </div>

          {/* Qty */}
          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Qty
            </label>
            <input
              type="number"
              value={currentQty || ""}
              onChange={(e) => setCurrentQty(Number(e.target.value))}
              min={1}
              disabled={!selectedProduct}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={handleAddItem}
            disabled={!selectedProduct}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
          >
            <span>➕</span> Add Item
          </button>
        </div>
      </div>

      {/* ============== Items Table ============== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="px-3 py-3 text-xs font-bold text-left">#</th>
                <th className="px-3 py-3 text-xs font-bold text-left">
                  Item Name
                </th>
                <th className="px-3 py-3 text-xs font-bold text-center">MRP</th>
                <th className="px-3 py-3 text-xs font-bold text-center">
                  Rate
                </th>
                <th className="px-3 py-3 text-xs font-bold text-center">
                  Quantity
                </th>
                <th className="px-3 py-3 text-xs font-bold text-center">
                  Total Amount
                </th>
                <th className="px-3 py-3 text-xs font-bold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-12 text-center">
                    <p className="text-lg text-gray-500 mb-2">
                      No items added yet
                    </p>
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition-colors">
                    <td className="px-3 py-2 text-sm text-gray-600">
                      {idx + 1}
                    </td>
                    <td className="px-3 py-2 text-sm font-medium text-gray-800">
                      {row.itemName}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className="px-2 py-1 border border-gray-300 rounded-full text-xs">
                        ₹ {row.mrp}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <input
                        type="number"
                        value={row.rate}
                        onChange={(e) =>
                          updateRow(idx, "rate", Number(e.target.value))
                        }
                        min={0}
                        className="w-20 px-2 py-1.5 border border-gray-300 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) =>
                          updateRow(idx, "quantity", Number(e.target.value))
                        }
                        min={1}
                        className="w-20 px-2 py-1.5 border border-gray-300 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className="font-bold text-green-600 text-sm">
                        ₹ {row.totalAmount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => removeRow(idx)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove"
                      >
                        <span className="text-lg">🗑️</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {rows.length > 0 && (
          <div className="border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-4">
            <div className="flex justify-end items-center gap-4">
              <span className="text-lg font-semibold text-gray-700">
                Grand Total :
              </span>
              <span className="text-2xl font-bold text-green-600">
                ₹ {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ============== Action Buttons ============== */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          onClick={handleCancel}
          disabled={saving}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={saving || rows.length === 0 || !selectedCustomer}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
        >
          {saving ? (
            <>
              <span className="animate-spin">⏳</span> Updating...
            </>
          ) : (
            <>
              <span>💾</span> Update Invoice
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SaleEdit;