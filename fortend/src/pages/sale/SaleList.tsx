import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Pagination,
  Tooltip,
  Fab,
  Grid,
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  FiberManualRecord,
  Receipt,
  ShoppingCart,
  ArrowBack,
  Home as HomeIcon,
  Close as CloseIcon,
  AccountBalanceWallet,
  Functions,
  Inventory2,
  AltRoute,
} from "@mui/icons-material";

interface SaleItem {
  productId: string;
  itemName: string;
  mrp: number;
  rate: number;
  quantity: number;
  totalAmount?: number;
}

interface Sale {
  _id: string;
  items: SaleItem[];
  totalValue?: number;
  grandTotal?: number;
  route?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

// ===================== STYLED =====================

const DarkBanner = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "18px 20px",
  marginBottom: "14px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  flexShrink: 0,
}));

const FilterBar = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  flexShrink: 0,
}));

const AnalyticsBar = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(56, 189, 248, 0.25)",
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: "0 8px 24px rgba(56, 189, 248, 0.08)",
  flexShrink: 0,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background:
      "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent)",
  },
}));

const StatCard = styled(Box)<{ accent: string }>(({ accent }) => ({
  backgroundColor: "#111827",
  borderRadius: "12px",
  border: `1px solid ${accent}22`,
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  height: "100%",
  transition: "all 0.25s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: `${accent}66`,
  },
}));

const QuickFilterChip = styled(Button)<{ active?: boolean }>(
  ({ active }) => ({
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.75rem",
    padding: "8px 18px",
    minWidth: "auto",
    whiteSpace: "nowrap",
    backgroundColor: active ? "#38bdf8" : "rgba(56, 189, 248, 0.15)",
    color: active ? "#0d1527" : "#38bdf8",
    border: active ? "1px solid #38bdf8" : "1px solid rgba(56, 189, 248, 0.3)",
    "&:hover": {
      backgroundColor: active ? "#0ea5e9" : "rgba(56, 189, 248, 0.25)",
      borderColor: "#38bdf8",
    },
  })
);

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "44px",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
    "&:hover fieldset": { borderColor: "rgba(56, 189, 248, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#38bdf8",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    padding: "10px 12px",
    "&::-webkit-calendar-picker-indicator": {
      filter: "invert(1)",
      cursor: "pointer",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#9ca3af",
    fontSize: "0.8rem",
    "&.Mui-focused": { color: "#38bdf8" },
  },
}));

const TableContainerDark = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  overflow: "hidden",
  marginBottom: "16px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
}));

const TableScrollArea = styled(Box)(() => ({
  overflow: "auto",
  flex: 1,
  minHeight: 0,
  "&::-webkit-scrollbar": { width: "8px", height: "8px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(56, 189, 248, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.5)" },
  },
}));

const ItemsTable = styled("table")(() => ({
  width: "100%",
  minWidth: "820px",
  borderCollapse: "collapse",
  "& thead": {
    backgroundColor: "#111827",
    position: "sticky",
    top: 0,
    zIndex: 5,
  },
  "& thead th": {
    color: "#9ca3af",
    fontWeight: 700,
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    padding: "14px 12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    textAlign: "left",
    whiteSpace: "nowrap",
    backgroundColor: "#111827",
  },
  "& tbody tr": {
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.05)" },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "12px",
    whiteSpace: "nowrap",
  },
}));

// ===================== HELPERS =====================

const getSaleTotal = (sale: Sale): number => {
  if (typeof sale?.grandTotal === "number") return sale.grandTotal;
  if (typeof sale?.totalValue === "number") return sale.totalValue;
  if (Array.isArray(sale?.items)) {
    return sale.items.reduce(
      (sum, it) => sum + (Number(it?.quantity) || 0) * (Number(it?.rate) || 0),
      0
    );
  }
  return 0;
};

const getItemTotal = (item: SaleItem): number => {
  if (typeof item?.totalAmount === "number") return item.totalAmount;
  return (Number(item?.quantity) || 0) * (Number(item?.rate) || 0);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatMoney = (n: number) =>
  `₹ ${(Number(n) || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

const toInputDate = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const getDatePreset = (
  preset: "thisMonth" | "lastMonth" | "today" | "yesterday"
): { from: string; to: string } => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();

  switch (preset) {
    case "today": {
      const d = toInputDate(now);
      return { from: d, to: d };
    }
    case "yesterday": {
      const yest = new Date(now);
      yest.setDate(now.getDate() - 1);
      const d = toInputDate(yest);
      return { from: d, to: d };
    }
    case "thisMonth": {
      const first = new Date(y, m, 1);
      const last = new Date(y, m + 1, 0);
      return { from: toInputDate(first), to: toInputDate(last) };
    }
    case "lastMonth": {
      const first = new Date(y, m - 1, 1);
      const last = new Date(y, m, 0);
      return { from: toInputDate(first), to: toInputDate(last) };
    }
  }
};

// ===================== MAIN =====================

const SaleList: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<Sale[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [grandTotal, setGrandTotal] = useState(0);

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [routeFilter, setRouteFilter] = useState("");
  const [appliedRoute, setAppliedRoute] = useState("");
  const [activePreset, setActivePreset] = useState<
    "thisMonth" | "lastMonth" | "today" | "yesterday" | ""
  >("");

  // Routes for dropdown
  const [routes, setRoutes] = useState<string[]>([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Fetch unique routes
  const fetchRoutes = async () => {
    try {
      const res = await axios.get(`${API_URL}/route-direction-sale`, {
        params: { page: 1, limit: 1000 },
        ...getAuthHeaders(),
      });
      if (res.data?.success) {
        const uniqueRoutes:any = Array.from(
          new Set(
            (res.data.data || [])
              .map((d: any) => String(d.route || "").trim())
              .filter(Boolean)
          )
        );
        setRoutes(uniqueRoutes);
      }
    } catch (err) {
      console.error("Fetch routes error:", err);
    }
  };

  // ===================== FETCH =====================
  const fetchData = async () => {
    try {
      setLoading(true);

      const params: any = { page, limit };
      if (appliedFrom) params.from = appliedFrom;
      if (appliedTo) params.to = appliedTo;
      if (appliedRoute) params.route = appliedRoute;

      const res = await axios.get(`${API_URL}/sale`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setData(res.data.data || []);
        setGrandTotal(Number(res.data.grandTotal) || 0);

        const count = res.data.total ?? res.data.count ?? 0;
        const pages =
          res.data.pages ?? Math.max(1, Math.ceil((count || 0) / limit));
        setTotalEntries(count);
        setTotalPages(pages);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Please login again");
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(res?.data?.message || "Failed to fetch sales");
        setData([]);
      }
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch data");
      }
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, appliedFrom, appliedTo, appliedRoute]);

  // ===================== FILTERS =====================
  const handleApplyFilters = () => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setAppliedRoute(routeFilter);
    setActivePreset("");
    setPage(1);
  };

  const handleClearFilters = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
    setRouteFilter("");
    setAppliedRoute("");
    setActivePreset("");
    setPage(1);
  };

  const handlePreset = (
    preset: "thisMonth" | "lastMonth" | "today" | "yesterday"
  ) => {
    const { from, to } = getDatePreset(preset);
    setFromDate(from);
    setToDate(to);
    setAppliedFrom(from);
    setAppliedTo(to);
    setActivePreset(preset);
    setPage(1);
  };

  const hasDateFilter = !!(appliedFrom || appliedTo);
  const hasRouteFilter = !!appliedRoute;
  const hasAnyFilter = hasDateFilter || hasRouteFilter;

  // ===================== ANALYTICS =====================
  const analytics = useMemo(() => {
    const pageCount = data.length;
    const pageSum = data.reduce((s, r) => s + getSaleTotal(r), 0);
    const total = grandTotal > 0 ? grandTotal : pageSum;

    const avgPerInvoice =
      totalEntries > 0
        ? total / totalEntries
        : pageCount > 0
        ? total / pageCount
        : 0;

    const totalItems = data.reduce((s, r) => s + (r.items?.length || 0), 0);
    const totalQty = data.reduce(
      (s, r) =>
        s +
        (r.items || []).reduce((q, i) => q + (Number(i.quantity) || 0), 0),
      0
    );

    return {
      total,
      count: totalEntries || pageCount,
      avgPerInvoice,
      totalItems,
      totalQty,
    };
  }, [data, grandTotal, totalEntries]);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${API_URL}/sale/${id}`, getAuthHeaders());
      if (res.data?.success === true) {
        toast.success("Sale deleted successfully");
        setDeleteDialogOpen(false);
        if (data.length === 1 && page > 1) setPage((p) => p - 1);
        else await fetchData();
      } else {
        toast.error(res.data?.message || "Failed to delete");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${API_URL}/sale/delete-all`,
        getAuthHeaders()
      );
      if (res.data?.success === true) {
        toast.success("All sales deleted");
        setDeleteAllDialogOpen(false);
        setPage(1);
        await fetchData();
      } else {
        toast.error(res.data?.message || "Failed to delete all");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete all failed");
    } finally {
      setLoading(false);
    }
  };

  const pageTotal = data.reduce((s, r) => s + getSaleTotal(r), 0);

  return (
    <Box
      sx={{
        minHeight: { xs: "100dvh", md: "85vh" },
        maxHeight: { md: "100vh" },
        overflow: { xs: "auto", md: "hidden" },
        bgcolor: "#090d16",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 1.5, md: 2.5 },
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          flex: { md: 1 },
          minHeight: 0,
        }}
      >
        {/* HEADER */}
        <DarkBanner>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            gap={2}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
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
                  py: 0.8,
                  fontSize: "0.78rem",
                  minWidth: "auto",
                  "&:hover": {
                    borderColor: "#38bdf8",
                    color: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box sx={{ minWidth: 0 }}>
                <Box display="flex" alignItems="center" gap={1} mb={0.3}>
                  <FiberManualRecord sx={{ fontSize: 10, color: "#10b981" }} />
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    sx={{
                      color: "#10b981",
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                    }}
                  >
                    Logistic Management
                  </Typography>
                </Box>

                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.35rem", md: "1.55rem" },
                    letterSpacing: 0.5,
                    lineHeight: 1.2,
                  }}
                >
                  Load Vehicle Details
                </Typography>

                {totalEntries > 0 && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#9ca3af", mt: 0.3, display: "block" }}
                  >
                    {totalEntries} total entries
                  </Typography>
                )}
              </Box>
            </Box>

            <Box
              display="flex"
              gap={1}
              flexWrap="wrap"
              sx={{
                width: { xs: "100%", md: "auto" },
                justifyContent: { xs: "stretch", md: "flex-end" },
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/sale/invoice")}
                sx={{
                  bgcolor: "#10b981",
                  color: "#ffffff",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.78rem",
                  flex: { xs: "1 1 45%", sm: "none" },
                  "&:hover": { bgcolor: "#059669" },
                }}
              >
                Load Vehicle
              </Button>

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchData}
                disabled={loading}
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.78rem",
                  flex: { xs: "1 1 45%", sm: "none" },
                  "&:hover": {
                    borderColor: "#38bdf8",
                    color: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>

              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteAllDialogOpen(true)}
                disabled={totalEntries === 0}
                sx={{
                  color: "#f43f5e",
                  borderColor: "rgba(244, 63, 94, 0.3)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.78rem",
                  flex: { xs: "1 1 100%", sm: "none" },
                  "&:hover": {
                    borderColor: "#f43f5e",
                    bgcolor: "rgba(244, 63, 94, 0.08)",
                  },
                }}
              >
                Delete All
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* ANALYTICS */}
        <AnalyticsBar>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard accent="#34d399">
                <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(52, 211, 153, 0.15)", color: "#34d399", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <AccountBalanceWallet sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
                    Total Sales{hasAnyFilter ? " (Filtered)" : ""}
                  </Typography>
                  <Typography sx={{ color: "#34d399", fontWeight: 900, fontSize: { xs: "1rem", sm: "1.15rem" }, mt: 0.3 }}>
                    {loading ? "..." : formatMoney(analytics.total)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#38bdf8">
                <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Receipt sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
                    Total Invoices
                  </Typography>
                  <Typography sx={{ color: "#38bdf8", fontWeight: 900, fontSize: { xs: "1rem", sm: "1.15rem" }, mt: 0.3 }}>
                    {loading ? "..." : analytics.count}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#c084fc">
                <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(192, 132, 252, 0.15)", color: "#c084fc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Inventory2 sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
                    Items Sold
                  </Typography>
                  <Typography sx={{ color: "#c084fc", fontWeight: 900, fontSize: { xs: "1rem", sm: "1.15rem" }, mt: 0.3 }}>
                    {loading ? "..." : analytics.totalItems}
                  </Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 600, mt: 0.2 }}>
                    Qty: {analytics.totalQty}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#fbbf24">
                <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(251, 191, 36, 0.15)", color: "#fbbf24", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Functions sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
                    Avg / Invoice
                  </Typography>
                  <Typography sx={{ color: "#fbbf24", fontWeight: 900, fontSize: { xs: "1rem", sm: "1.15rem" }, mt: 0.3 }}>
                    {loading ? "..." : formatMoney(analytics.avgPerInvoice)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
          </Grid>
        </AnalyticsBar>

        {/* FILTER BAR — Date + Route in same row */}
        <FilterBar>
          <Grid container spacing={1.5} alignItems="center">
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
              <StyledTextField
                type="date"
                size="small"
                fullWidth
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                label="From"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
              <StyledTextField
                type="date"
                size="small"
                fullWidth
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                label="To"
              />
            </Grid>
            {/* ✅ Route filter — right side of date */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Autocomplete
                freeSolo
                options={routes}
                value={routeFilter}
                onChange={(_, v) => setRouteFilter(v || "")}
                onInputChange={(_, v) => setRouteFilter(v || "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Route"
                    placeholder="Search route..."
                    InputLabelProps={{ shrink: true, ...params.InputLabelProps }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: "#090d16",
                        color: "#fff",
                        height: "44px",
                        padding: "0 8px",
                        "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
                        "&.Mui-focused fieldset": { borderColor: "#2dd4bf" },
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "#fff",
                        fontSize: "0.85rem",
                        padding: "8px 4px",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#9ca3af",
                        fontSize: "0.8rem",
                        "&.Mui-focused": { color: "#2dd4bf" },
                      },
                    }}
                  />
                )}
                slotProps={{
                  paper: {
                    sx: {
                      bgcolor: "#111827",
                      color: "#e5e7eb",
                      "& .MuiAutocomplete-option": {
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(45, 212, 191, 0.1)" },
                        "&.Mui-focused": { bgcolor: "rgba(45, 212, 191, 0.15)", color: "#2dd4bf" },
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Box display="flex" gap={1}>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  onClick={handleApplyFilters}
                  sx={{
                    bgcolor: "#10b981",
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    py: 1.1,
                    fontSize: "0.78rem",
                    "&:hover": { bgcolor: "#059669" },
                  }}
                >
                  Apply
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={handleClearFilters}
                  disabled={!hasAnyFilter && !fromDate && !toDate && !routeFilter}
                  sx={{
                    color: "#9ca3af",
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    py: 1.1,
                    fontSize: "0.78rem",
                    "&:hover": {
                      borderColor: "#f43f5e",
                      color: "#f43f5e",
                      bgcolor: "rgba(244, 63, 94, 0.08)",
                    },
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Quick chips */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1.5, alignItems: "center" }}>
            <Typography sx={{ color: "#9ca3af", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, mr: 0.5 }}>
              Quick:
            </Typography>
            <QuickFilterChip active={activePreset === "thisMonth"} onClick={() => handlePreset("thisMonth")}>
              This Month
            </QuickFilterChip>
            <QuickFilterChip active={activePreset === "lastMonth"} onClick={() => handlePreset("lastMonth")}>
              Last Month
            </QuickFilterChip>
            <QuickFilterChip active={activePreset === "today"} onClick={() => handlePreset("today")}>
              Today
            </QuickFilterChip>
            <QuickFilterChip active={activePreset === "yesterday"} onClick={() => handlePreset("yesterday")}>
              Yesterday
            </QuickFilterChip>

            <Box sx={{ ml: { md: "auto" }, display: "flex", gap: 1, flexWrap: "wrap" }}>
              {hasDateFilter && (
                <Chip
                  label={`Date: ${appliedFrom || "..."} → ${appliedTo || "..."}`}
                  size="small"
                  onDelete={() => {
                    setFromDate("");
                    setToDate("");
                    setAppliedFrom("");
                    setAppliedTo("");
                    setActivePreset("");
                    setPage(1);
                  }}
                  sx={{
                    bgcolor: "rgba(56, 189, 248, 0.15)",
                    color: "#38bdf8",
                    border: "1px solid rgba(56, 189, 248, 0.4)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "26px",
                    "& .MuiChip-deleteIcon": { color: "#38bdf8" },
                  }}
                />
              )}
              {hasRouteFilter && (
                <Chip
                  label={`Route: ${appliedRoute}`}
                  size="small"
                  onDelete={() => {
                    setRouteFilter("");
                    setAppliedRoute("");
                    setPage(1);
                  }}
                  sx={{
                    bgcolor: "rgba(45, 212, 191, 0.15)",
                    color: "#2dd4bf",
                    border: "1px solid rgba(45, 212, 191, 0.4)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "26px",
                    "& .MuiChip-deleteIcon": { color: "#2dd4bf" },
                  }}
                />
              )}
              {pageTotal > 0 && (
                <Chip
                  icon={<ShoppingCart sx={{ fontSize: 16, color: "#38bdf8 !important" }} />}
                  label={`Page Total: ₹ ${pageTotal.toLocaleString()}`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    color: "#38bdf8",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    height: "26px",
                  }}
                />
              )}
            </Box>
          </Box>
        </FilterBar>

        {/* TABLE */}
        <TableContainerDark>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
            px={{ xs: 2, sm: 3 }}
            py={1.8}
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
                letterSpacing: 0.5,
              }}
            >
              VEHICLE LOAD LIST
            </Typography>
            <Chip
              label={`${totalEntries} Entries`}
              size="small"
              sx={{
                bgcolor: "rgba(56, 189, 248, 0.1)",
                color: "#38bdf8",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: "26px",
              }}
            />
          </Box>

          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th>Route</th>
                  <th style={{ textAlign: "center" }}>Items</th>
                  <th style={{ textAlign: "center" }}>Total Qty</th>
                  <th style={{ textAlign: "center" }}>Grand Total</th>
                  <th style={{ textAlign: "center", width: "140px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "40px 12px" }}>
                      <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}>
                        Loading sales...
                      </Typography>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "40px 12px" }}>
                      <Receipt style={{ fontSize: 44, color: "#374151", marginBottom: 8 }} />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                        No sales found
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  data.map((row, idx) => {
                    const totalQty = (row.items || []).reduce(
                      (s, i) => s + (i.quantity || 0),
                      0
                    );
                    const rowTotal = getSaleTotal(row);

                    return (
                      <tr key={row._id}>
                        <td style={{ textAlign: "center", color: "#6b7280" }}>
                          {(page - 1) * limit + idx + 1}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Chip
                            label={formatDate(row.date)}
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
                        {/* ✅ Route column */}
                        <td>
                          {row.route ? (
                            <Chip
                              icon={<AltRoute sx={{ fontSize: 12 }} />}
                              label={row.route}
                              size="small"
                              sx={{
                                bgcolor: "rgba(45, 212, 191, 0.1)",
                                color: "#2dd4bf",
                                border: "1px solid rgba(45, 212, 191, 0.3)",
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                height: "24px",
                                maxWidth: 200,
                                "& .MuiChip-icon": { color: "#2dd4bf" },
                              }}
                            />
                          ) : (
                            <Typography sx={{ color: "#6b7280", fontSize: "0.78rem" }}>
                              —
                            </Typography>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Chip
                            label={`${(row.items || []).length} items`}
                            size="small"
                            sx={{
                              bgcolor: "rgba(192, 132, 252, 0.1)",
                              color: "#c084fc",
                              border: "1px solid rgba(192, 132, 252, 0.3)",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              height: "24px",
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Chip
                            label={totalQty}
                            size="small"
                            sx={{
                              bgcolor: "rgba(56, 189, 248, 0.1)",
                              color: "#38bdf8",
                              border: "1px solid rgba(56, 189, 248, 0.3)",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              height: "24px",
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography sx={{ color: "#34d399", fontWeight: 800, fontSize: "0.9rem" }}>
                            ₹ {rowTotal.toLocaleString()}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedSale(row);
                              setViewDialogOpen(true);
                            }}
                            sx={{ color: "#34d399" }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/sale/invoice/edit/${row._id}`)}
                            sx={{ color: "#38bdf8" }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedId(row._id);
                              setDeleteDialogOpen(true);
                            }}
                            sx={{ color: "#f43f5e" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </ItemsTable>
          </TableScrollArea>

          {/* PAGINATION */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              px: { xs: 2, sm: 3 },
              py: 1.6,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              <Typography sx={{ color: "#9ca3af", fontSize: "0.72rem", fontWeight: 600 }}>
                Rows:
              </Typography>
              {[10, 25, 50, 100].map((n) => (
                <Chip
                  key={n}
                  label={n}
                  size="small"
                  onClick={() => {
                    setLimit(n);
                    setPage(1);
                  }}
                  sx={{
                    bgcolor: limit === n ? "rgba(56, 189, 248, 0.2)" : "rgba(255, 255, 255, 0.05)",
                    color: limit === n ? "#38bdf8" : "#9ca3af",
                    border: limit === n ? "1px solid rgba(56, 189, 248, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "26px",
                    cursor: "pointer",
                  }}
                />
              ))}
              <Typography sx={{ color: "#6b7280", fontSize: "0.72rem", ml: 0.5 }}>
                {totalEntries > 0
                  ? `${(page - 1) * limit + 1}–${Math.min(page * limit, totalEntries)} of ${totalEntries}`
                  : "0 records"}
              </Typography>
            </Box>

            <Pagination
              count={Math.max(1, totalPages)}
              page={page}
              onChange={(_, v) => setPage(v)}
              disabled={loading}
              shape="rounded"
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#9ca3af",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)", color: "#38bdf8" },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(56, 189, 248, 0.2) !important",
                  color: "#38bdf8 !important",
                },
              }}
            />
          </Box>
        </TableContainerDark>
      </Box>

      {/* FAB */}
      <Tooltip title="Back to Dashboard" placement="left">
        <Fab
          onClick={() => navigate("/dashboard")}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1200,
            bgcolor: "#38bdf8",
            color: "#0d1527",
            width: 50,
            height: 50,
            boxShadow: "0 8px 24px rgba(56, 189, 248, 0.45)",
            "&:hover": { bgcolor: "#0ea5e9" },
          }}
        >
          <HomeIcon />
        </Fab>
      </Tooltip>

      {/* VIEW DIALOG */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#0d1527",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            m: { xs: 1.5, sm: 4 },
            width: { xs: "calc(100% - 24px)", sm: "100%" },
          },
        }}
      >
        {selectedSale && (
          <>
            <DialogTitle
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 2, sm: 3 },
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: "#0c2a3a", color: "#38bdf8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ViewIcon sx={{ fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography sx={{ color: "#38bdf8", fontWeight: 800, fontSize: "0.85rem", letterSpacing: 1, textTransform: "uppercase" }}>
                    Load Vehicle Details
                  </Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem", fontWeight: 500 }}>
                    {formatDate(selectedSale.date)}
                  </Typography>
                  {selectedSale.route && (
                    <Chip
                      icon={<AltRoute sx={{ fontSize: 11 }} />}
                      label={selectedSale.route}
                      size="small"
                      sx={{
                        mt: 0.5,
                        bgcolor: "rgba(45, 212, 191, 0.1)",
                        color: "#2dd4bf",
                        border: "1px solid rgba(45, 212, 191, 0.3)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        height: "20px",
                        "& .MuiChip-icon": { color: "#2dd4bf" },
                      }}
                    />
                  )}
                </Box>
              </Box>
              <IconButton onClick={() => setViewDialogOpen(false)} size="small" sx={{ color: "#9ca3af" }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ bgcolor: "#111827", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)", overflowX: "auto" }}>
                <Box
                  component="table"
                  sx={{
                    width: "100%",
                    minWidth: "560px",
                    borderCollapse: "collapse",
                    "& thead th": {
                      color: "#9ca3af",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      padding: "12px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      textAlign: "left",
                    },
                    "& tbody td": {
                      color: "#e5e7eb",
                      fontSize: "0.82rem",
                      padding: "12px",
                    },
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>#</th>
                      <th>Item</th>
                      <th style={{ textAlign: "center" }}>MRP</th>
                      <th style={{ textAlign: "center" }}>Rate</th>
                      <th style={{ textAlign: "center" }}>Qty</th>
                      <th style={{ textAlign: "center" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedSale.items || []).map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: "center" }}>{idx + 1}</td>
                        <td>{item.itemName}</td>
                        <td style={{ textAlign: "center" }}>₹ {item.mrp}</td>
                        <td style={{ textAlign: "center" }}>₹ {item.rate}</td>
                        <td style={{ textAlign: "center" }}>{item.quantity}</td>
                        <td style={{ textAlign: "center", color: "#34d399", fontWeight: 700 }}>
                          ₹ {getItemTotal(item).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Box>
              </Box>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Box sx={{ bgcolor: "rgba(52, 211, 153, 0.1)", border: "1px solid rgba(52, 211, 153, 0.3)", borderRadius: "12px", px: 2.5, py: 1.2, display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography sx={{ color: "#9ca3af", fontSize: "0.78rem" }}>Grand Total:</Typography>
                  <Typography sx={{ color: "#34d399", fontWeight: 800, fontSize: "1.2rem" }}>
                    ₹ {getSaleTotal(selectedSale).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: { xs: 2, sm: 2.5 }, borderTop: "1px solid rgba(255, 255, 255, 0.08)", gap: 1 }}>
              <Button onClick={() => setViewDialogOpen(false)} sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setViewDialogOpen(false);
                  navigate(`/sale/invoice/edit/${selectedSale._id}`);
                }}
                variant="contained"
                sx={{ bgcolor: "#38bdf8", color: "#fff", textTransform: "none", fontWeight: 700, borderRadius: "10px", px: 3 }}
              >
                Edit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* DELETE DIALOG */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            m: { xs: 1.5, sm: 4 },
            width: { xs: "calc(100% - 24px)", sm: "100%" },
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete this sale invoice?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            onClick={() => selectedId && handleDelete(selectedId)}
            variant="contained"
            sx={{ bgcolor: "#f43f5e", color: "#fff", textTransform: "none", fontWeight: 700, borderRadius: "10px", px: 3 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE ALL DIALOG */}
      <Dialog
        open={deleteAllDialogOpen}
        onClose={() => setDeleteAllDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            m: { xs: 1.5, sm: 4 },
            width: { xs: "calc(100% - 24px)", sm: "100%" },
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>Delete All Sales</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete ALL sale invoices?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setDeleteAllDialogOpen(false)} sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAll}
            variant="contained"
            sx={{ bgcolor: "#f43f5e", color: "#fff", textTransform: "none", fontWeight: 700, borderRadius: "10px", px: 3 }}
          >
            Delete All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SaleList;