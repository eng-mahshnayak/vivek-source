import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  TextField,
  Chip,
  CircularProgress,
  InputAdornment,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Search,
  Save as SaveIcon,
  FiberManualRecord,
  Receipt,
  ShoppingCart,
  Clear as ClearIcon,
  SelectAll as SelectAllIcon,
  AltRoute,
} from "@mui/icons-material";

interface Product {
  _id: string;
  itemName: string;
  mrp: number;
  rate: number;
  unit: string;
}

interface RowState {
  productId: string;
  itemName: string;
  mrp: number;
  unit: string;
  rate: number;
  qty: number;
  selected: boolean;
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
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  flexShrink: 0,
}));

const FilterBar = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "14px 16px",
  marginBottom: "14px",
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
    "&.Mui-focused fieldset": { borderColor: "#38bdf8", borderWidth: "1.5px" },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    padding: "10px 12px",
    "&::placeholder": { color: "#6b7280", opacity: 1 },
    "&::-webkit-calendar-picker-indicator": { filter: "invert(1)", cursor: "pointer" },
  },
  "& .MuiInputLabel-root": {
    color: "#9ca3af",
    fontSize: "0.78rem",
    "&.Mui-focused": { color: "#38bdf8" },
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
    backgroundColor: "rgba(56, 189, 248, 0.3)",
    borderRadius: "8px",
  },
}));

const ItemsTable = styled("table")(() => ({
  width: "100%",
  minWidth: "820px",
  borderCollapse: "collapse",
  "& thead": { backgroundColor: "#111827", position: "sticky", top: 0, zIndex: 5 },
  "& thead th": {
    backgroundColor: "#111827",
    color: "#9ca3af",
    fontWeight: 700,
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "14px 12px",
    whiteSpace: "nowrap",
    textAlign: "left",
  },
  "& tbody tr": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
  "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
  "& tbody td": { color: "#e5e7eb", fontSize: "0.85rem", padding: "10px 12px" },
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
  "&:focus": { borderColor: "#38bdf8" },
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
  border: "1px solid rgba(52, 211, 153, 0.3)",
  padding: "16px 20px",
  boxShadow: "0 8px 20px rgba(52, 211, 153, 0.1)",
}));

const SaleInvoice: React.FC = () => {
  const navigate = useNavigate();

  const [saleDate, setSaleDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [route, setRoute] = useState<string>("");
  const [routeOptions, setRouteOptions] = useState<string[]>([]);

  const [rows, setRows] = useState<RowState[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch routes
  const fetchRoutes = async () => {
    try {
      const res = await axios.get(`${API_URL}/route-direction-sale`, {
        params: { page: 1, limit: 1000 },
        ...getAuthHeaders(),
      });
      if (res.data?.success) {
        const unique = Array.from(
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

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/product`, {
        params: { page: 1, limit: 10000 },
        ...getAuthHeaders(),
      });
      if (res.data?.success) {
        const products: Product[] = res.data.data || [];
        setRows(
          products.map((p) => ({
            productId: p._id,
            itemName: p.itemName,
            mrp: p.mrp || 0,
            unit: p.unit || "",
            rate: p.rate || 0,
            qty: 0,
            selected: false,
          }))
        );
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired!");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error: any) {
      console.error("Fetch products error:", error);
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRoutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleRow = (idx: number) => {
    setRows((prev) => {
      const copy = [...prev];
      copy[idx].selected = !copy[idx].selected;
      if (copy[idx].selected && (!copy[idx].qty || copy[idx].qty <= 0)) {
        copy[idx].qty = 1;
      }
      return copy;
    });
  };

  const updateRow = (idx: number, field: "rate" | "qty", value: number) => {
    setRows((prev) => {
      const copy = [...prev];
      if (value < 0) value = 0;
      copy[idx][field] = value;
      if (field === "qty" && value > 0) copy[idx].selected = true;
      return copy;
    });
  };

  const selectAll = () => {
    setRows((prev) =>
      prev.map((r) => ({
        ...r,
        selected: true,
        qty: r.qty && r.qty > 0 ? r.qty : 1,
      }))
    );
  };

  const clearAll = () => {
    setRows((prev) => prev.map((r) => ({ ...r, selected: false, qty: 0 })));
  };

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const s = search.trim().toLowerCase();
    return rows.filter((r) => r.itemName.toLowerCase().includes(s));
  }, [rows, search]);

  const selectedRows = rows.filter((r) => r.selected && r.qty > 0);
  const grandTotal = selectedRows.reduce(
    (sum, r) => sum + Number(r.rate) * Number(r.qty),
    0
  );
  const totalQty = selectedRows.reduce((sum, r) => sum + Number(r.qty), 0);

  const handleSave = async () => {
    if (selectedRows.length === 0) {
      toast.error("Please select at least one item");
      return;
    }
    if (!route.trim()) {
      toast.error("Please enter/select a route");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        items: selectedRows.map((r) => ({
          productId: r.productId,
          itemName: r.itemName,
          mrp: r.mrp,
          rate: Number(r.rate),
          quantity: Number(r.qty),
        })),
        route: route.trim(),
        date: saleDate,
      };

      const res = await axios.post(`${API_URL}/sale`, payload, getAuthHeaders());
      if (res.data.success === true) {
        toast.success(`${selectedRows.length} items loaded successfully! 🎉`);
        setTimeout(() => navigate("/load-items"), 1000);
      } else if (res.data.message === "Unauthorized") {
        toast.error("Session expired!");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to save");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (selectedRows.length > 0) {
      if (!window.confirm("Discard this sale?")) return;
    }
    navigate(-1);
  };

  return (
    <Box
      sx={{
        height: { xs: "100dvh", md: "100vh" },
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
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            gap={1.5}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.8,
                  fontSize: "0.78rem",
                  "&:hover": { borderColor: "#38bdf8", color: "#38bdf8" },
                }}
              >
                Back
              </Button>

              <Box display="flex" alignItems="center" gap={1.2}>
                <Box sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: "#0c2a3a", color: "#38bdf8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Receipt sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={0.2}>
                    <FiberManualRecord sx={{ fontSize: 10, color: "#10b981" }} />
                    <Typography sx={{ color: "#10b981", letterSpacing: 0.5, fontSize: "0.68rem", fontWeight: 700 }}>
                      Logistic Management
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight="800" sx={{ fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.4rem" }, lineHeight: 1.2 }}>
                    LOAD ITEMS
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              display="flex"
              gap={1}
              alignItems="flex-end"
              flexWrap="wrap"
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              {/* Date */}
              <Box sx={{ width: { xs: "100%", sm: 150 } }}>
                <FieldLabel>Sale Date *</FieldLabel>
                <StyledTextField
                  fullWidth
                  type="date"
                  value={saleDate}
                  onChange={(e) => setSaleDate(e.target.value)}
                  size="small"
                />
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
                    paper: {
                      sx: {
                        bgcolor: "#111827",
                        color: "#e5e7eb",
                        "& .MuiAutocomplete-option": { fontSize: "0.82rem" },
                      },
                    },
                  }}
                />
              </Box>

              {/* Grand Total */}
              <Box
                sx={{
                  minWidth: { xs: "100%", sm: 160 },
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(52, 211, 153, 0.08)",
                  border: "1px solid rgba(52, 211, 153, 0.35)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  px: 1.5,
                }}
              >
                <Typography sx={{ color: "#9ca3af", fontSize: "0.6rem", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", lineHeight: 1 }}>
                  Grand Total ({selectedRows.length} items · {totalQty} qty)
                </Typography>
                <Typography sx={{ color: "#34d399", fontWeight: 900, fontSize: "0.95rem", lineHeight: 1.2, mt: 0.3 }}>
                  ₹ {grandTotal.toLocaleString()}
                </Typography>
              </Box>

              {/* Save */}
              <Button
                variant="contained"
                startIcon={saving ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : <SaveIcon />}
                onClick={handleSave}
                disabled={saving || selectedRows.length === 0}
                sx={{
                  bgcolor: "#10b981",
                  color: "#ffffff",
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.78rem",
                  height: "42px",
                  "&:hover": { bgcolor: "#059669" },
                  "&.Mui-disabled": { bgcolor: "rgba(16, 185, 129, 0.3)", color: "rgba(255,255,255,0.5)" },
                }}
              >
                {saving ? "Saving..." : `Save (${selectedRows.length})`}
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* FILTER BAR */}
        <FilterBar>
          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={1.2} alignItems={{ xs: "stretch", sm: "center" }}>
            <StyledTextField
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#6b7280", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box display="flex" gap={1}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<SelectAllIcon sx={{ fontSize: 16 }} />}
                onClick={selectAll}
                sx={{ color: "#38bdf8", borderColor: "rgba(56, 189, 248, 0.4)", fontWeight: 700, textTransform: "none", borderRadius: "10px", px: 2, fontSize: "0.75rem" }}
              >
                Select All
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ClearIcon sx={{ fontSize: 16 }} />}
                onClick={clearAll}
                sx={{ color: "#f43f5e", borderColor: "rgba(244, 63, 94, 0.4)", fontWeight: 700, textTransform: "none", borderRadius: "10px", px: 2, fontSize: "0.75rem" }}
              >
                Clear All
              </Button>
            </Box>
          </Box>

          <Box display="flex" gap={1} flexWrap="wrap" mt={1.2} alignItems="center">
            <Chip label={`Total Products: ${rows.length}`} size="small" sx={{ bgcolor: "rgba(156, 163, 175, 0.1)", color: "#9ca3af", border: "1px solid rgba(156, 163, 175, 0.2)", fontWeight: 700, fontSize: "0.68rem", height: "26px" }} />
            <Chip label={`Selected: ${selectedRows.length}`} size="small" sx={{ bgcolor: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.3)", fontWeight: 700, fontSize: "0.68rem", height: "26px" }} />
            <Chip label={`Total Qty: ${totalQty}`} size="small" sx={{ bgcolor: "rgba(192, 132, 252, 0.1)", color: "#c084fc", border: "1px solid rgba(192, 132, 252, 0.3)", fontWeight: 700, fontSize: "0.68rem", height: "26px" }} />
          </Box>
        </FilterBar>

        {/* TABLE */}
        <TableContainerDark>
          <Box display="flex" justifyContent="space-between" alignItems="center" px={{ xs: 2, sm: 3 }} py={1.6} sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <Typography sx={{ color: "#ffffff", fontWeight: 800, fontSize: "0.9rem" }}>
              AVAILABLE PRODUCTS
            </Typography>
            <Chip label={`${selectedRows.length} selected`} size="small" sx={{ bgcolor: "rgba(52, 211, 153, 0.1)", color: "#34d399", border: "1px solid rgba(52, 211, 153, 0.3)", fontWeight: 700, fontSize: "0.7rem", height: "26px" }} />
          </Box>

          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "60px" }}>Select</th>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th>Item Name</th>
                  <th style={{ textAlign: "center" }}>MRP</th>
                  <th style={{ textAlign: "center" }}>Unit</th>
                  <th style={{ textAlign: "center" }}>Rate</th>
                  <th style={{ textAlign: "center" }}>Qty</th>
                  <th style={{ textAlign: "center" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "40px" }}>
                      <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "40px" }}>
                      <ShoppingCart style={{ fontSize: 44, color: "#374151" }} />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}>
                        {search ? "No items match your search" : "No products found"}
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row, idx) => {
                    const rowTotal = row.selected && row.qty > 0 ? Number(row.rate) * Number(row.qty) : 0;
                    const originalIdx = rows.findIndex((r) => r.productId === row.productId);
                    return (
                      <tr key={row.productId} style={{ backgroundColor: row.selected ? "rgba(52, 211, 153, 0.04)" : "transparent" }}>
                        <td style={{ textAlign: "center" }}>
                          <Checkbox checked={row.selected} onChange={() => toggleRow(originalIdx)} sx={{ color: "#6b7280", "&.Mui-checked": { color: "#34d399" } }} />
                        </td>
                        <td style={{ textAlign: "center", color: "#6b7280" }}>{idx + 1}</td>
                        <td><Typography sx={{ color: "#ffffff", fontWeight: 700, fontSize: "0.85rem" }}>{row.itemName}</Typography></td>
                        <td style={{ textAlign: "center" }}>
                          <Chip label={`₹ ${row.mrp}`} size="small" sx={{ bgcolor: "rgba(156, 163, 175, 0.1)", color: "#e5e7eb", border: "1px solid rgba(156, 163, 175, 0.2)", fontSize: "0.7rem", height: "24px" }} />
                        </td>
                        <td style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.78rem" }}>{row.unit || "-"}</td>
                        <td style={{ textAlign: "center" }}>
                          <SmallInput type="number" value={row.rate || ""} onChange={(e) => updateRow(originalIdx, "rate", Number(e.target.value))} placeholder="0" min={0} />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <SmallInput type="number" value={row.qty || ""} onChange={(e) => updateRow(originalIdx, "qty", Number(e.target.value))} placeholder="0" min={0} />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography sx={{ color: rowTotal > 0 ? "#34d399" : "#6b7280", fontWeight: 800, fontSize: "0.9rem" }}>
                            ₹ {rowTotal.toLocaleString()}
                          </Typography>
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
              Grand Total ({selectedRows.length} items · {totalQty} qty)
            </Typography>
            <Typography sx={{ color: "#34d399", fontWeight: 900, fontSize: { xs: "1.2rem", sm: "1.5rem" } }}>
              ₹ {grandTotal.toLocaleString()}
            </Typography>
          </Box>

          <Box display="flex" gap={1.2} flexWrap="wrap">
            <Button variant="outlined" onClick={handleCancel} disabled={saving} sx={{ color: "#9ca3af", borderColor: "rgba(156, 163, 175, 0.3)", fontWeight: 700, textTransform: "none", borderRadius: "10px", px: 3, py: 1.1 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={saving ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : <SaveIcon />}
              onClick={handleSave}
              disabled={saving || selectedRows.length === 0}
              sx={{ bgcolor: "#10b981", color: "#fff", fontWeight: 800, textTransform: "none", borderRadius: "10px", px: 3, py: 1.1, "&:hover": { bgcolor: "#059669" } }}
            >
              {saving ? "Saving..." : `Save ${selectedRows.length} Item${selectedRows.length !== 1 ? "s" : ""}`}
            </Button>
          </Box>
        </FooterBar>
      </Box>
    </Box>
  );
};

export default SaleInvoice;