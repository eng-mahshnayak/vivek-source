import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Chip,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Add as AddIcon,
  Delete as DeleteIcon,
  Search,
  AssignmentReturn,
  Receipt,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface Product {
  _id: string;
  itemName: string;
  mrp: number;
  rate: number;
  unit?: string;
}

interface ReturnRow {
  productId: string;
  itemName: string;
  mrp: number;
  rate: number;
  quantity: number;
  totalAmount: number;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

// ===================== STYLED COMPONENTS =====================

const DarkBanner = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px 24px",
  marginBottom: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
}));

const FormCard = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px",
  marginBottom: "16px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "42px",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(56, 189, 248, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#38bdf8",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "10px 12px",
    "&::placeholder": {
      color: "#6b7280",
      opacity: 1,
    },
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&[type=number]": {
      MozAppearance: "textfield",
    },
  },
}));

const FieldLabel = styled(Typography)(() => ({
  color: "#9ca3af",
  fontWeight: 700,
  fontSize: "0.7rem",
  letterSpacing: 1,
  textTransform: "uppercase",
  marginBottom: "8px",
}));

const TableContainerDark = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  overflow: "hidden",
  marginBottom: "16px",
}));

const ItemsTable = styled("table")(() => ({
  width: "100%",
  borderCollapse: "collapse",
  "& thead": {
    backgroundColor: "#111827",
  },
  "& thead th": {
    color: "#9ca3af",
    fontWeight: 700,
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    padding: "16px 12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  "& tbody tr": {
    transition: "all 0.2s ease",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  "& tbody tr:hover": {
    backgroundColor: "rgba(56, 189, 248, 0.03)",
  },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "14px 12px",
    textAlign: "left",
  },
}));

const TotalCard = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(56, 189, 248, 0.3)",
  padding: "20px 28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  boxShadow: "0 8px 20px rgba(56, 189, 248, 0.1)",
}));

// ===================== MAIN COMPONENT =====================

const ReturnItemsEntry: React.FC = () => {
  const navigate = useNavigate();

  // Item form
  const [productSearch, setProductSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [mrp, setMrp] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [qty, setQty] = useState<number | "">("");

  // Rows
  const [rows, setRows] = useState<ReturnRow[]>([]);
  const [saving, setSaving] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // ============== Outside click handler ==============
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
    if (!productSearch.trim() || productSearch.length < 1) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(`${API_URL}/product`, {
          params: { search: productSearch, page: 1, limit: 20 },
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
  }, [productSearch]);

  // ============== Select product ==============
  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setProductSearch(p.itemName);
    setMrp(p.mrp || "");
    setRate(p.rate || "");
    setShowSearchResults(false);
  };

  // ============== Live return amount ==============
  const currentReturnAmount = (Number(rate) || 0) * (Number(qty) || 0);

  // ============== Add Return Item ==============
  const handleAddItem = () => {
    if (!selectedProduct) {
      toast.error("Please select an item first");
      return;
    }
    if (!qty || Number(qty) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
    if (!rate || Number(rate) < 0) {
      toast.error("Please enter a valid rate");
      return;
    }

    const quantity = Number(qty);
    const finalRate = Number(rate);
    const finalMrp = Number(mrp) || 0;
    const totalAmount = quantity * finalRate;

    setRows([
      ...rows,
      {
        productId: selectedProduct._id,
        itemName: selectedProduct.itemName,
        mrp: finalMrp,
        rate: finalRate,
        quantity,
        totalAmount,
      },
    ]);

    // Reset
    setSelectedProduct(null);
    setProductSearch("");
    setMrp("");
    setRate("");
    setQty("");
    setSearchResults([]);
    toast.success("Item added to return list");
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
    toast.success("Item removed");
  };

  const totalReturnValue = rows.reduce((sum, r) => sum + r.totalAmount, 0);

  // ============== SAVE ==============
  const handleSave = async () => {
    if (rows.length === 0) {
      toast.error("Please add at least one return item");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        items: rows.map((r) => ({
          productId: r.productId,
          itemName: r.itemName,
          mrp: r.mrp,
          rate: r.rate,
          quantity: r.quantity,
          totalAmount: r.totalAmount,
        })),
        totalReturnValue,
        date: new Date().toISOString().split("T")[0],
      };

      const res = await axios.post(
        `${API_URL}/return-items`,
        payload,
        getAuthHeaders()
      );


      console.log('==============res=====================');
      

      if (res.data?.success === true) {
        toast.success("Return entry saved successfully! 🎉");
        setTimeout(() => navigate("/dashboard"), 1200);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to save return");
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
        toast.error(error.response?.data?.message || "Failed to save return");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#090d16",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 1.5, md: 2.5 },
        color: "#ffffff",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>
        {/* ================= HEADER BANNER ================= */}
        <DarkBanner>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/dashboard")}
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.9,
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#38bdf8",
                    color: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box display="flex" alignItems="center" gap={1.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: "#0c2a3a",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AssignmentReturn />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                    letterSpacing: 0.5,
                  }}
                >
                  2. RETURN ITEMS ENTRY
                </Typography>
              </Box>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= FORM CARD ================= */}
        <FormCard>
          {/* Section heading */}
          <Box display="flex" alignItems="center" gap={1} mb={2.5}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "8px",
                bgcolor: "#0c2a3a",
                color: "#38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
              }}
            >
              📘
            </Box>
            <Typography
              sx={{
                color: "#38bdf8",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Log Returned / Unsold Stock
            </Typography>
          </Box>

          {/* Form Grid */}
          <Grid container spacing={2}>
            {/* ITEM NAME with search */}
            <Grid
              size={{ xs: 12, md: 3 }}
              ref={searchRef}
              sx={{ position: "relative" }}
            >
              <FieldLabel>Item Name</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="Select or type item name"
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  if (selectedProduct) setSelectedProduct(null);
                }}
                onFocus={() => {
                  if (searchResults.length > 0) setShowSearchResults(true);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#6b7280", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Search Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 0.5,
                    bgcolor: "#111827",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    maxHeight: "280px",
                    overflowY: "auto",
                    zIndex: 50,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {searchResults.map((p) => (
                    <Box
                      key={p._id}
                      onClick={() => handleSelectProduct(p)}
                      sx={{
                        px: 2,
                        py: 1.2,
                        cursor: "pointer",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                        "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
                        "&:last-child": { borderBottom: "none" },
                      }}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                        >
                          {p.itemName}
                        </Typography>
                        <Typography
                          sx={{ color: "#9ca3af", fontSize: "0.75rem" }}
                        >
                          MRP: ₹{p.mrp}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.3 }}
                      >
                        Rate: ₹{p.rate}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {showSearchResults &&
                productSearch.trim() &&
                searchResults.length === 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      mt: 0.5,
                      bgcolor: "#111827",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      p: 2,
                      zIndex: 50,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                      No items found
                    </Typography>
                  </Box>
                )}
            </Grid>

            {/* MRP */}
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <FieldLabel>MRP (₹)</FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="e.g. 10RS"
                value={mrp}
                onChange={(e) =>
                  setMrp(e.target.value === "" ? "" : Number(e.target.value))
                }
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* RATE */}
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <FieldLabel>Rate (₹)</FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="50"
                value={rate}
                onChange={(e) =>
                  setRate(e.target.value === "" ? "" : Number(e.target.value))
                }
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* QTY */}
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <FieldLabel>Qty Returned</FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="10"
                value={qty}
                onChange={(e) =>
                  setQty(e.target.value === "" ? "" : Number(e.target.value))
                }
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* RETURN AMOUNT (readonly display) */}
            <Grid size={{ xs: 6, sm: 12, md: 3 }}>
              <FieldLabel>Return Amount</FieldLabel>
              <Box
                sx={{
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: "#090d16",
                  border: "1px solid rgba(56, 189, 248, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 2,
                }}
              >
                <Typography
                  sx={{
                    color: currentReturnAmount > 0 ? "#38bdf8" : "#6b7280",
                    fontWeight: 800,
                    fontSize: "1rem",
                    letterSpacing: 0.5,
                  }}
                >
                  ₹{" "}
                  {currentReturnAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Add Button */}
          <Box display="flex" justifyContent="flex-end" mt={2.5}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddItem}
              sx={{
                bgcolor: "#3b82f6",
                color: "#ffffff",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                borderRadius: "10px",
                px: 3,
                py: 1.2,
                fontSize: "0.8rem",
                boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                "&:hover": {
                  bgcolor: "#2563eb",
                  boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
                },
              }}
            >
              Add Return Item
            </Button>
          </Box>
        </FormCard>

        {/* ================= RETURNED ITEMS SHEET ================= */}
        <TableContainerDark>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={2}
            sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "0.95rem",
                letterSpacing: 0.5,
              }}
            >
              RETURNED ITEMS SHEET
            </Typography>
            <Chip
              label={`${rows.length} Return Items`}
              size="small"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.05)",
                color: "#9ca3af",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: "26px",
              }}
            />
          </Box>

          {/* Table */}
          <Box sx={{ overflowX: "auto" }}>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th>Item Name</th>
                  <th style={{ textAlign: "center" }}>MRP</th>
                  <th style={{ textAlign: "center" }}>Rate (₹)</th>
                  <th style={{ textAlign: "center" }}>Qty Returned</th>
                  <th style={{ textAlign: "center" }}>Total Amount (₹)</th>
                  <th style={{ textAlign: "center", width: "80px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <Receipt
                        style={{
                          fontSize: 40,
                          color: "#374151",
                          marginBottom: 8,
                        }}
                      />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                        No return items logged yet
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
                      >
                        Add your first return item above
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  rows.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ textAlign: "center", color: "#6b7280" }}>
                        {idx + 1}
                      </td>
                      <td>
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {row.itemName}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Chip
                          label={`${row.mrp}RS`}
                          size="small"
                          sx={{
                            bgcolor: "rgba(156, 163, 175, 0.1)",
                            color: "#e5e7eb",
                            border: "1px solid rgba(156, 163, 175, 0.2)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            height: "24px",
                          }}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Typography
                          sx={{
                            color: "#fbbf24",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          ₹ {row.rate.toFixed(2)}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Typography
                          sx={{
                            color: "#38bdf8",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                          }}
                        >
                          {row.quantity}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Typography
                          sx={{
                            color: "#38bdf8",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                          }}
                        >
                          ₹{" "}
                          {row.totalAmount.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => removeRow(idx)}
                          sx={{
                            color: "#f43f5e",
                            "&:hover": {
                              bgcolor: "rgba(244, 63, 94, 0.1)",
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </ItemsTable>
          </Box>
        </TableContainerDark>

        {/* ================= TOTAL RETURN VALUE ================= */}
        <TotalCard>
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 800,
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              letterSpacing: 0.5,
            }}
          >
            TOTAL RETURN VALUE:
          </Typography>
          <Typography
            sx={{
              color: "#38bdf8",
              fontWeight: 900,
              fontSize: { xs: "1.5rem", sm: "1.9rem" },
              letterSpacing: 0.5,
              textShadow: "0 0 20px rgba(56, 189, 248, 0.4)",
            }}
          >
            ₹{" "}
            {totalReturnValue.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </TotalCard>

        {/* ================= ACTIONS ================= */}
        <Box
          display="flex"
          justifyContent="flex-end"
          gap={1.5}
          flexWrap="wrap"
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard")}
            disabled={saving}
            sx={{
              color: "#9ca3af",
              borderColor: "rgba(156, 163, 175, 0.3)",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.2,
              "&:hover": {
                borderColor: "#9ca3af",
                bgcolor: "rgba(156, 163, 175, 0.08)",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving || rows.length === 0}
            sx={{
              bgcolor: "#3b82f6",
              color: "#ffffff",
              fontWeight: 800,
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.2,
              boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
              "&:hover": {
                bgcolor: "#2563eb",
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(59, 130, 246, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {saving ? "Saving..." : "Save Return Entry"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReturnItemsEntry;