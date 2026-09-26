import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface ReturnableItem {
  productId: string;
  itemName: string;
  mrp: number;
  rate: number;
  originalQuantity: number;
  alreadyReturned: number;
  availableToReturn: number;
  returnQuantity: number; // user input
  selected: boolean; // checkbox
}

interface Customer {
  _id: string;
  name?: string;
  companyName?: string;
  mobile?: string;
  phone?: string;
}

interface OriginalSale {
  _id: string;
  date: string;
  grandTotal: number;
  customerId: Customer;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

const SaleReturnCreate: React.FC = () => {
  const navigate = useNavigate();
  const { saleId } = useParams<{ saleId: string }>();

  const [sale, setSale] = useState<OriginalSale | null>(null);
  const [items, setItems] = useState<ReturnableItem[]>([]);
  const [returnType, setReturnType] = useState<"Full Cancel" | "Partial Return">(
    "Partial Return"
  );
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ============== Fetch returnable info ==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_URL}/sale-return/returnable/${saleId}`,
          getAuthHeaders()
        );

        if (res.data?.success) {
          setSale(res.data.data.sale);
          const mapped: ReturnableItem[] = res.data.data.returnableItems.map(
            (it: any) => ({
              ...it,
              returnQuantity: 0,
              selected: false,
            })
          );
          setItems(mapped);

          if (res.data.data.isFullyReturned) {
            toast.error("This sale is already fully returned");
          }
        } else {
          toast.error(res.data?.message || "Failed to load returnable info");
        }
      } catch (err: any) {
        console.error(err);
        if (err.response?.data?.message === "Unauthorized") {
          localStorage.removeItem("erptoken");
          navigate("/login");
        } else {
          toast.error("Failed to load data");
        }
      } finally {
        setLoading(false);
      }
    };

    if (saleId) fetchData();
  }, [saleId, navigate]);

  // ============== Handle item select ==============
  const toggleSelect = (index: number) => {
    const updated = [...items];
    updated[index].selected = !updated[index].selected;
    if (updated[index].selected) {
      // Prefill with max available for full cancel, else 1
      if (returnType === "Full Cancel") {
        updated[index].returnQuantity = updated[index].availableToReturn;
      } else {
        updated[index].returnQuantity =
          updated[index].returnQuantity || 1;
      }
    } else {
      updated[index].returnQuantity = 0;
    }
    setItems(updated);
  };

  // ============== Handle qty change ==============
  const handleQtyChange = (index: number, value: number) => {
    const updated = [...items];
    const max = updated[index].availableToReturn;

    if (value < 0) value = 0;
    if (value > max) value = max;

    updated[index].returnQuantity = value;
    updated[index].selected = value > 0;
    setItems(updated);
  };

  // ============== Handle return type change ==============
  const handleReturnTypeChange = (type: "Full Cancel" | "Partial Return") => {
    setReturnType(type);

    const updated = items.map((it) => {
      if (type === "Full Cancel") {
        return {
          ...it,
          selected: it.availableToReturn > 0,
          returnQuantity: it.availableToReturn,
        };
      }
      return {
        ...it,
        selected: false,
        returnQuantity: 0,
      };
    });
    setItems(updated);
  };

  // ============== Select All / Deselect All ==============
  const handleSelectAll = (select: boolean) => {
    const updated = items.map((it) => ({
      ...it,
      selected: select && it.availableToReturn > 0,
      returnQuantity: select
        ? returnType === "Full Cancel"
          ? it.availableToReturn
          : it.availableToReturn > 0
          ? 1
          : 0
        : 0,
    }));
    setItems(updated);
  };

  // ============== Computed ==============
  const selectedItems = items.filter((it) => it.selected && it.returnQuantity > 0);
  const returnTotal = selectedItems.reduce(
    (s, it) => s + it.returnQuantity * it.rate,
    0
  );

  const grandTotal = sale?.grandTotal || 0;

  const isFullyCancelling =
    items.length > 0 &&
    items.every(
      (it) => it.availableToReturn <= 0 || it.returnQuantity >= it.availableToReturn
    ) &&
    selectedItems.length === items.filter((it) => it.availableToReturn > 0).length;

  // ============== Save ==============
  const handleSave = async () => {
    if (!sale) return;

    if (selectedItems.length === 0) {
      toast.error("Please select at least one item to return");
      return;
    }

    // Validate: har selected item ki returnQuantity > 0
    for (const it of selectedItems) {
      if (it.returnQuantity <= 0) {
        toast.error(`Please enter quantity for ${it.itemName}`);
        return;
      }
      if (it.returnQuantity > it.availableToReturn) {
        toast.error(
          `Return qty for ${it.itemName} cannot exceed ${it.availableToReturn}`
        );
        return;
      }
    }

    try {
      setSaving(true);

      const payload = {
        saleId: sale._id,
        returnType: isFullyCancelling ? "Full Cancel" : "Partial Return",
        returnItems: selectedItems.map((it) => ({
          productId: it.productId,
          itemName: it.itemName,
          returnQuantity: it.returnQuantity,
        })),
        reason: reason.trim(),
      };

      const res = await axios.post(`${API_URL}/sale-return`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
        },
      });

      if (res.data.success === true) {
        toast.success(res.data.message || "Sale return created successfully! 🎉");
        setTimeout(() => navigate("/sale/return-list"), 1200);
      } else if (res.data.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to create return");
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
        toast.error(error.response?.data?.message || "Failed to create return");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="h-16 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
        <div className="h-64 bg-gray-200 rounded-2xl animate-pulse mb-4"></div>
        <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  if (!sale) {
    return (
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-700 font-medium">Sale not found</p>
          <button
            onClick={() => navigate("/sale/invoice-list")}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            Back to Sale List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-red-500 bg-clip-text text-transparent mb-2">
          Sale Return
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Cancel or partially return items from this sale
        </p>
      </div>

      {/* ============== Original Sale Info ============== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Customer
            </p>
            <p className="font-bold text-gray-800">
              {sale.customerId?.companyName || sale.customerId?.name || "-"}
            </p>
            <p className="text-xs text-gray-500">
              {sale.customerId?.phone || sale.customerId?.mobile || ""}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Sale Date
            </p>
            <p className="font-semibold text-gray-800">
              {new Date(sale.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
              Original Total
            </p>
            <p className="font-bold text-blue-600 text-lg">
              ₹ {grandTotal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* ============== Return Type ============== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>🔄</span> Return Type
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleReturnTypeChange("Full Cancel")}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              returnType === "Full Cancel"
                ? "border-red-500 bg-red-50"
                : "border-gray-200 hover:border-red-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <div>
                <p className="font-bold text-gray-800">Full Cancel</p>
                <p className="text-xs text-gray-500">
                  पूरी invoice cancel करें (सारे items पूरी qty)
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleReturnTypeChange("Partial Return")}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              returnType === "Partial Return"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 hover:border-orange-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">↩️</span>
              <div>
                <p className="font-bold text-gray-800">Partial Return</p>
                <p className="text-xs text-gray-500">
                  कुछ items की कुछ quantity वापस करें
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ============== Items Table ============== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-5">
        <div className="px-4 py-3 bg-slate-700 text-white flex justify-between items-center flex-wrap gap-2">
          <h2 className="font-semibold flex items-center gap-2">
            <span>📦</span> Select Items to Return
          </h2>
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => handleSelectAll(true)}
              className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30"
            >
              Select All
            </button>
            <button
              onClick={() => handleSelectAll(false)}
              className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-3 text-xs font-bold text-gray-700 text-center w-12">
                  ✓
                </th>
                <th className="px-3 py-3 text-xs font-bold text-gray-700 text-left">
                  Item Name
                </th>
                <th className="px-3 py-3 text-xs font-bold text-gray-700 text-center">
                  MRP
                </th>
                <th className="px-3 py-3 text-xs font-bold text-gray-700 text-center">
                  Rate
                </th>
                <th className="px-3 py-3 text-xs font-bold text-gray-700 text-center">
                  Original Qty
                </th>
                <th className="px-3 py-3 text-xs font-bold text-gray-700 text-center">
                  Already Returned
                </th>
                <th className="px-3 py-3 text-xs font-bold text-gray-700 text-center">
                  Available
                </th>
                <th className="px-3 py-3 text-xs font-bold text-gray-700 text-center">
                  Return Qty
                </th>
                <th className="px-3 py-3 text-xs font-bold text-gray-700 text-center">
                  Return Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-12 text-center text-gray-500">
                    No items in this sale
                  </td>
                </tr>
              ) : (
                items.map((item, idx) => {
                  const isDisabled = item.availableToReturn <= 0;
                  const returnAmount = item.returnQuantity * item.rate;

                  return (
                    <tr
                      key={idx}
                      className={`transition-colors ${
                        isDisabled
                          ? "bg-gray-100 opacity-60"
                          : item.selected
                          ? "bg-green-50"
                          : "hover:bg-blue-50"
                      }`}
                    >
                      <td className="px-3 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          disabled={isDisabled}
                          onChange={() => toggleSelect(idx)}
                          className="w-5 h-5 cursor-pointer accent-blue-600"
                        />
                      </td>
                      <td className="px-3 py-2 text-sm font-medium text-gray-800">
                        {item.itemName}
                        {isDisabled && (
                          <span className="ml-2 text-xs text-red-500">
                            (Fully Returned)
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center text-sm">
                        ₹ {item.mrp}
                      </td>
                      <td className="px-3 py-2 text-center text-sm">
                        ₹ {item.rate}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className="px-2 py-1 border border-gray-300 rounded-full text-xs">
                          {item.originalQuantity}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className="px-2 py-1 border border-orange-300 text-orange-700 rounded-full text-xs">
                          {item.alreadyReturned}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className="px-2 py-1 border border-blue-300 text-blue-700 rounded-full text-xs font-semibold">
                          {item.availableToReturn}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input
                          type="number"
                          value={item.returnQuantity || ""}
                          onChange={(e) =>
                            handleQtyChange(idx, Number(e.target.value))
                          }
                          disabled={isDisabled}
                          min={0}
                          max={item.availableToReturn}
                          placeholder="0"
                          className="w-20 px-2 py-1.5 border border-gray-300 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
                        />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className="font-bold text-red-600 text-sm">
                          ₹ {returnAmount.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        {selectedItems.length > 0 && (
          <div className="border-t-2 border-gray-200 bg-gradient-to-r from-red-50 to-orange-50 px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedItems.length} item(s) selected for return
              </span>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-700">
                  Return Total :
                </span>
                <span className="text-2xl font-bold text-red-600">
                  ₹ {returnTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============== Reason ============== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reason for Return
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g., Damaged item, Wrong item delivered, Customer changed mind..."
          rows={3}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none"
        />
      </div>

      {/* ============== Action Buttons ============== */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          onClick={() => navigate("/sale/invoice-list")}
          disabled={saving}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm font-medium"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={saving || selectedItems.length === 0}
          className={`px-6 py-2.5 text-white rounded-xl transition-all hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium ${
            isFullyCancelling
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          }`}
        >
          {saving ? (
            <>
              <span className="animate-spin">⏳</span> Saving...
            </>
          ) : (
            <>
              <span>{isFullyCancelling ? "❌" : "↩️"}</span>
              {isFullyCancelling ? "Full Cancel Invoice" : "Confirm Partial Return"}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SaleReturnCreate;