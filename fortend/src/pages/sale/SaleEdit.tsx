import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Chip,
  IconButton,
  CircularProgress,
  InputAdornment,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Search,
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  FiberManualRecord,
  Edit as EditIcon,
  ShoppingCart,
  ReceiptLong,
  Check as CheckIcon,
  Close as CloseIcon,

} from "@mui/icons-material";

interface Product {
  _id: string;
  itemName: string;
  mrp: number;
  rate: number;
  unit: string;
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

const DarkBanner = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px 24px",
  marginBottom: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  flexShrink: 0,
}));

const FormCard = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px",
  marginBottom: "16px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  flexShrink: 0,
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "42px",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#fbbf24", borderWidth: "1.5px" },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    padding: "10px 12px",
    "&::placeholder": { color: "#6b7280", opacity: 1 },
    "&::-webkit-calendar-picker-indicator": { filter: "invert(1)", cursor: "pointer" },
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
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  marginBottom: "16px",
}));

const TableScrollArea = styled(Box)(() => ({
  overflow: "auto",
  flex: 1,
  minHeight: 0,
  "&::-webkit-scrollbar": { width: "8px", height: "8px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(251, 191, 36, 0.3)",
    borderRadius: "8px",
  },
}));

const ItemsTable = styled("table")(() => ({
  width: "100%",
  borderCollapse: "collapse",
  "& thead": { backgroundColor: "#111827", position: "sticky", top: 0, zIndex: 5 },
  "& thead th": {
    backgroundColor: "#111827",
    color: "#9ca3af",
    fontWeight: 700,
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    padding: "16px 12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    whiteSpace: "nowrap",
    textAlign: "left",
  },
  "& tbody tr": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
  "& tbody tr:hover": { backgroundColor: "rgba(251, 191, 36, 0.05)" },
  "& tbody td": { color: "#e5e7eb", fontSize: "0.85rem", padding: "12px" },
}));

const SmallInput = styled("input")(() => ({
  width: "90px",
  padding: "8px 10px",
  borderRadius: "8px",
  backgroundColor: "#090d16",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "#ffffff",
  fontSize: "0.85rem",
  fontWeight: 700,
  textAlign: "center",
  outline: "none",
  "&:focus": { borderColor: "#fbbf24" },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&[type=number]": { MozAppearance: "textfield" },
}));

const FooterBar = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
  flexShrink: 0,
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(251, 191, 36, 0.3)",
  padding: "16px 24px",
  boxShadow: "0 8px 20px rgba(251, 191, 36, 0.1)",
}));

const InfoChip = styled(Box)(() => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px 10px",
  borderRadius: "999px",
  backgroundColor: "rgba(251, 191, 36, 0.1)",
  border: "1px solid rgba(251, 191, 36, 0.3)",
  color: "#fbbf24",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: 0.5,
}));

const SaleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [saleDate, setSaleDate] = useState<string>("");
  const [route, setRoute] = useState<string>("");
  const [routeOptions, setRouteOptions] = useState<string[]>([]);

  const [productSearch, setProductSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [currentQty, setCurrentQty] = useState<number>(1);
  const [currentRate, setCurrentRate] = useState<number>(0);

  const [rows, setRows] = useState<SaleRow[]>([]);

  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editBuffer, setEditBuffer] = useState<SaleRow | null>(null);

  const [saving, setSaving] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch routes
  const fetchRoutes = async () => {
    try {
      const res = await axios.get(`${API_URL}/route-direction-sale`, {
        params: { page: 1, limit: 1000 },
        ...getAuthHeaders(),
      });
      if (res.data?.success) {
        const unique:any = Array.from(
          new Set(
            (res.data.data || [])
              .map((d: any) => String(d.route || "").trim())
              .filter(Boolean)
          )
        );
        setRouteOptions(unique);
      }
    } catch (err) {
      console.error("Fetch routes error:", err);
    }
  };

  useEffect(() => {
    const fetchSale = async () => {
      try {
        setFetchLoading(true);
        const res = await axios.get(`${API_URL}/sale/${id}`, getAuthHeaders());
        if (res.data?.success === true) {
          const s = res.data.data || {};

          if (s.date) {
            const d = new Date(s.date);
            if (!isNaN(d.getTime())) {
              setSaleDate(d.toISOString().split("T")[0]);
            }
          }

          // ✅ Set route
          setRoute(s.route || "");

          const mappedRows: SaleRow[] = (s.items || []).map((it: any) => {
            const qty = Number(it?.quantity) || 0;
            const rate = Number(it?.rate) || 0;
            const total = Number(it?.totalAmount) > 0 ? Number(it.totalAmount) : qty * rate;
            return {
              productId: typeof it?.productId === "object" ? it?.productId?._id || "" : it?.productId || "",
              itemName: it?.itemName || "",
              mrp: Number(it?.mrp) || 0,
              rate,
              quantity: qty,
              totalAmount: total,
              unit: it?.unit || "",
            };
          });

          setRows(mappedRows);
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch sale");
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) fetchSale();
    fetchRoutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!productSearch.trim()) {
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

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setCurrentRate(p.rate);
    setCurrentQty(1);
    setProductSearch(p.itemName);
    setShowSearchResults(false);
  };

  const handleAddItem = () => {
    if (!selectedProduct) {
      toast.error("Please select an item first");
      return;
    }
    if (currentQty <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    const totalAmount = currentQty * currentRate;
    setRows([...rows, {
      productId: selectedProduct._id,
      itemName: selectedProduct.itemName,
      mrp: selectedProduct.mrp,
      rate: currentRate,
      quantity: currentQty,
      totalAmount,
      unit: selectedProduct.unit,
    }]);
    setSelectedProduct(null);
    setProductSearch("");
    setCurrentQty(1);
    setCurrentRate(0);
    setSearchResults([]);
    toast.success("Item added");
  };

  const startEditRow = (index: number) => {
    setEditingRowIndex(index);
    setEditBuffer({ ...rows[index] });
  };

  const cancelEditRow = () => {
    setEditingRowIndex(null);
    setEditBuffer(null);
  };

  const changeEditBuffer = (field: "rate" | "quantity" | "mrp" | "itemName", value: any) => {
    setEditBuffer((prev) => {
      if (!prev) return prev;
      const updated: SaleRow = { ...prev, [field]: value };
      updated.totalAmount = (Number(updated.quantity) || 0) * (Number(updated.rate) || 0);
      return updated;
    });
  };

  const saveEditRow = () => {
    if (editingRowIndex === null || !editBuffer) return;
    if (!editBuffer.itemName.trim()) {
      toast.error("Item name cannot be empty");
      return;
    }
    if (Number(editBuffer.quantity) < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    if (Number(editBuffer.rate) < 0) {
      toast.error("Rate cannot be negative");
      return;
    }
    const updatedRows = [...rows];
    updatedRows[editingRowIndex] = {
      ...editBuffer,
      mrp: Number(editBuffer.mrp) || 0,
      rate: Number(editBuffer.rate) || 0,
      quantity: Number(editBuffer.quantity) || 0,
      totalAmount: (Number(editBuffer.quantity) || 0) * (Number(editBuffer.rate) || 0),
    };
    setRows(updatedRows);
    setEditingRowIndex(null);
    setEditBuffer(null);
    toast.success("Item updated");
  };

  const removeRow = (index: number) => {
    if (editingRowIndex === index) {
      setEditingRowIndex(null);
      setEditBuffer(null);
    }
    setRows(rows.filter((_, i) => i !== index));
    toast.success("Item removed");
  };

  const grandTotal = rows.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  const handleSave = async () => {
    if (rows.length === 0) {
      toast.error("Please add at least one item");
      return;
    }
    if (editingRowIndex !== null) {
      toast.error("Please save or cancel the row you're editing first");
      return;
    }
    if (!route.trim()) {
      toast.error("Please enter/select a route");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        items: rows.map((r) => ({
          productId: r.productId,
          itemName: r.itemName,
          mrp: Number(r.mrp) || 0,
          rate: Number(r.rate) || 0,
          quantity: Number(r.quantity) || 0,
        })),
        totalValue: grandTotal,
        route: route.trim(),
        date: saleDate,
      };

      const res = await axios.put(`${API_URL}/sale/${id}`, payload, getAuthHeaders());

      if (res.data.success === true) {
        toast.success("Sale updated successfully! 🎉");
        setTimeout(() => navigate("/load-items"), 1200);
      } else if (res.data.message === "Unauthorized") {
        toast.error("Session expired!");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to update sale");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update sale");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate("/load-items");

  if (fetchLoading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#090d16", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2 }}>
        <CircularProgress sx={{ color: "#fbbf24" }} />
        <Typography sx={{ color: "#9ca3af" }}>Loading sale...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#090d16",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 1.5, md: 2.5 },
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        {/* HEADER */}
        <DarkBanner>
          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", md: "center" }} gap={2}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handleCancel}
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.8,
                  fontSize: "0.78rem",
                  "&:hover": { borderColor: "#fbbf24", color: "#fbbf24" },
                }}
              >
                Back
              </Button>

              <Box display="flex" alignItems="center" gap={1.2}>
                <Box sx={{ width: 42, height: 42, borderRadius: "12px", bgcolor: "#332208", color: "#fbbf24", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <EditIcon />
                </Box>
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <FiberManualRecord sx={{ fontSize: 10, color: "#fbbf24" }} />
                    <Typography sx={{ color: "#fbbf24", letterSpacing: 0.5, fontSize: "0.7rem", fontWeight: 700 }}>
                      Edit Mode
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight="800" sx={{ fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" } }}>
                    EDIT LOAD ITEM
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box display="flex" alignItems="flex-end" gap={1.5} flexWrap="wrap" sx={{ width: { xs: "100%", md: "auto" } }}>
              <Box sx={{ width: { xs: "100%", sm: 150 } }}>
                <FieldLabel>Sale Date *</FieldLabel>
                <StyledTextField fullWidth type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} size="small" />
              </Box>

              {/* ✅ Route dropdown */}
              <Box sx={{ width: { xs: "100%", sm: 220 } }}>
                <FieldLabel>Route *</FieldLabel>
                <Autocomplete
                  freeSolo
                  options={routeOptions}
                  value={route}
                  onChange={(_, v) => setRoute(v || "")}
                  onInputChange={(_, v) => setRoute(v || "")}
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select/type route"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          backgroundColor: "#090d16",
                          color: "#fff",
                          height: "42px",
                          padding: "0 8px",
                          "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
                          "&.Mui-focused fieldset": { borderColor: "#2dd4bf" },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "#fff",
                          fontSize: "0.82rem",
                          padding: "8px 4px",
                          "&::placeholder": { color: "#6b7280", opacity: 1 },
                        },
                      }}
                    />
                  )}
                  slotProps={{
                    paper: { sx: { bgcolor: "#111827", color: "#e5e7eb", "& .MuiAutocomplete-option": { fontSize: "0.82rem" } } },
                  }}
                />
              </Box>

              <InfoChip>
                <ReceiptLong sx={{ fontSize: 14 }} />
                ID: {id?.slice(-8) || "—"}
              </InfoChip>
            </Box>
          </Box>
        </DarkBanner>

        {/* ADD ITEM */}
        <FormCard>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Search sx={{ color: "#fbbf24", fontSize: 20 }} />
            <Typography sx={{ color: "#fbbf24", fontWeight: 800, fontSize: "0.85rem", letterSpacing: 1, textTransform: "uppercase" }}>
              Add New Item
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 5 }} ref={searchRef} sx={{ position: "relative" }}>
              <FieldLabel>Search Item</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="Type item name..."
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  if (selectedProduct) setSelectedProduct(null);
                }}
                onFocus={() => { if (searchResults.length > 0) setShowSearchResults(true); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#6b7280", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
              />

              {showSearchResults && searchResults.length > 0 && (
                <Box sx={{ position: "absolute", top: "100%", left: 0, right: 0, mt: 0.5, bgcolor: "#111827", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "10px", maxHeight: "280px", overflowY: "auto", zIndex: 50 }}>
                  {searchResults.map((p) => (
                    <Box key={p._id} onClick={() => handleSelectProduct(p)} sx={{ px: 2, py: 1.2, cursor: "pointer", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", "&:hover": { bgcolor: "rgba(251, 191, 36, 0.1)" }, "&:last-child": { borderBottom: "none" } }}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography sx={{ color: "#ffffff", fontSize: "0.85rem", fontWeight: 600 }}>{p.itemName}</Typography>
                        <Typography sx={{ color: "#9ca3af", fontSize: "0.75rem" }}>MRP: ₹{p.mrp}</Typography>
                      </Box>
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.3 }}>Rate: ₹{p.rate} / {p.unit}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FieldLabel>Item Name</FieldLabel>
              <StyledTextField fullWidth value={selectedProduct?.itemName || ""} disabled placeholder="Selected item" />
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>MRP</FieldLabel>
              <StyledTextField fullWidth value={selectedProduct?.mrp ?? ""} disabled placeholder="-" />
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>Rate</FieldLabel>
              <StyledTextField fullWidth type="number" value={currentRate || ""} onChange={(e) => setCurrentRate(Number(e.target.value))} disabled={!selectedProduct} inputProps={{ min: 0 }} />
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>Qty</FieldLabel>
              <StyledTextField fullWidth type="number" value={currentQty || ""} onChange={(e) => setCurrentQty(Number(e.target.value))} disabled={!selectedProduct} inputProps={{ min: 1 }} />
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>&nbsp;</FieldLabel>
              <Button fullWidth variant="contained" onClick={handleAddItem} disabled={!selectedProduct} sx={{ bgcolor: "#fbbf24", color: "#0d1527", fontWeight: 700, textTransform: "none", borderRadius: "10px", height: "42px", minWidth: "auto", px: 1, "&:hover": { bgcolor: "#f59e0b" } }}>
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </FormCard>

        {/* ITEMS TABLE */}
        <TableContainerDark>
          <Box display="flex" justifyContent="space-between" alignItems="center" px={3} py={1.6} sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <ReceiptLong sx={{ color: "#fbbf24", fontSize: 18 }} />
              <Typography sx={{ color: "#ffffff", fontWeight: 800, fontSize: "0.9rem" }}>
                LOAD ITEMS LIST
              </Typography>
            </Box>
            <Chip label={`${rows.length} item${rows.length !== 1 ? "s" : ""}`} size="small" sx={{ bgcolor: "rgba(251, 191, 36, 0.1)", color: "#fbbf24", border: "1px solid rgba(251, 191, 36, 0.3)", fontWeight: 700, fontSize: "0.7rem", height: "26px" }} />
          </Box>

          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th>Item Name</th>
                  <th style={{ textAlign: "center" }}>MRP</th>
                  <th style={{ textAlign: "center" }}>Rate</th>
                  <th style={{ textAlign: "center" }}>Quantity</th>
                  <th style={{ textAlign: "center" }}>Total Amount</th>
                  <th style={{ textAlign: "center", width: "130px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>
                      <ShoppingCart style={{ fontSize: 44, color: "#374151" }} />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}>No items added yet</Typography>
                    </td>
                  </tr>
                ) : (
                  rows.map((row, idx) => {
                    const isEditing = editingRowIndex === idx;
                    const displayRow = isEditing && editBuffer ? editBuffer : row;
                    return (
                      <tr key={idx} style={{ backgroundColor: isEditing ? "rgba(251, 191, 36, 0.06)" : "transparent" }}>
                        <td style={{ textAlign: "center", color: "#6b7280" }}>{idx + 1}</td>
                        <td>
                          {isEditing ? (
                            <input
                              type="text"
                              value={displayRow.itemName}
                              onChange={(e) => changeEditBuffer("itemName", e.target.value)}
                              style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", backgroundColor: "#090d16", border: "1px solid rgba(251, 191, 36, 0.4)", color: "#ffffff", fontSize: "0.85rem", outline: "none" }}
                            />
                          ) : (
                            <Typography sx={{ color: "#ffffff", fontWeight: 700, fontSize: "0.85rem" }}>{row.itemName}</Typography>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {isEditing ? (
                            <SmallInput type="number" value={displayRow.mrp} onChange={(e) => changeEditBuffer("mrp", Number(e.target.value))} min={0} />
                          ) : (
                            <Chip label={`₹ ${row.mrp}`} size="small" sx={{ bgcolor: "rgba(156, 163, 175, 0.1)", color: "#e5e7eb", border: "1px solid rgba(156, 163, 175, 0.2)", fontSize: "0.7rem", height: "24px" }} />
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {isEditing ? (
                            <SmallInput type="number" value={displayRow.rate} onChange={(e) => changeEditBuffer("rate", Number(e.target.value))} min={0} />
                          ) : (
                            <Typography sx={{ color: "#e5e7eb", fontWeight: 700, fontSize: "0.85rem" }}>₹ {row.rate}</Typography>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {isEditing ? (
                            <SmallInput type="number" value={displayRow.quantity} onChange={(e) => changeEditBuffer("quantity", Number(e.target.value))} min={1} />
                          ) : (
                            <Typography sx={{ color: "#e5e7eb", fontWeight: 700, fontSize: "0.85rem" }}>{row.quantity}</Typography>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography sx={{ color: "#34d399", fontWeight: 800, fontSize: "0.95rem" }}>
                            ₹ {Number(displayRow.totalAmount || 0).toLocaleString("en-IN")}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {isEditing ? (
                            <Box display="flex" justifyContent="center" gap={0.5}>
                              <Tooltip title="Save"><IconButton size="small" onClick={saveEditRow} sx={{ color: "#34d399" }}><CheckIcon fontSize="small" /></IconButton></Tooltip>
                              <Tooltip title="Cancel"><IconButton size="small" onClick={cancelEditRow} sx={{ color: "#9ca3af" }}><CloseIcon fontSize="small" /></IconButton></Tooltip>
                            </Box>
                          ) : (
                            <Box display="flex" justifyContent="center" gap={0.5}>
                              <Tooltip title="Edit"><IconButton size="small" onClick={() => startEditRow(idx)} disabled={editingRowIndex !== null} sx={{ color: "#fbbf24" }}><EditIcon fontSize="small" /></IconButton></Tooltip>
                              <Tooltip title="Remove"><IconButton size="small" onClick={() => removeRow(idx)} disabled={editingRowIndex !== null} sx={{ color: "#f43f5e" }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                            </Box>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </ItemsTable>
          </TableScrollArea>
        </TableContainerDark>

        {/* FOOTER */}
        <FooterBar>
          <Box>
            <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", mb: 0.3 }}>
              Grand Total
            </Typography>
            <Typography sx={{ color: "#fbbf24", fontWeight: 900, fontSize: { xs: "1.3rem", sm: "1.6rem" } }}>
              ₹ {grandTotal.toLocaleString("en-IN")}
            </Typography>
          </Box>

          <Box display="flex" gap={1.5} flexWrap="wrap">
            <Button variant="outlined" onClick={handleCancel} disabled={saving} sx={{ color: "#9ca3af", borderColor: "rgba(156, 163, 175, 0.3)", fontWeight: 700, textTransform: "none", borderRadius: "10px", px: 3, py: 1.2 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={saving ? <CircularProgress size={16} sx={{ color: "#0d1527" }} /> : <SaveIcon />}
              onClick={handleSave}
              disabled={saving || rows.length === 0}
              sx={{ bgcolor: "#fbbf24", color: "#0d1527", fontWeight: 800, textTransform: "none", borderRadius: "10px", px: 3, py: 1.2, "&:hover": { bgcolor: "#f59e0b" } }}
            >
              {saving ? "Updating..." : "Update Invoice"}
            </Button>
          </Box>
        </FooterBar>
      </Box>
    </Box>
  );
};

export default SaleEdit;