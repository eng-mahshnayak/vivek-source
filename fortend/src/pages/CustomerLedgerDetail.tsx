import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,

  CircularProgress,
  Pagination,
  Tooltip,
  Fab,

} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Home as HomeIcon,
  Refresh as RefreshIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
  ShoppingCart,
  Payments,
  AccountBalanceWallet,
  Person,
  Add as AddIcon,
  Remove as RemoveIcon,
  ReceiptLong,
  Phone as PhoneIcon,
} from "@mui/icons-material";

// ===================== 🔥 DUMMY DATA TOGGLE =====================
const USE_DUMMY_DATA = true;

// ===================== TYPES =====================

interface LedgerEntry {
  _id: string;
  customerId: string;
  customerName: string;
  type: "credit" | "debit";
  description?: string;
  amount: number;
  date: string;
  reference?: string;
}

interface CustomerInfo {
  _id: string;
  customerName: string;
  phone?: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

// ===================== 🔥 DUMMY DATA =====================
const DUMMY_CUSTOMERS: Record<string, CustomerInfo> = {
  c1: { _id: "c1", customerName: "Gupta Traders", phone: "9876543210" },
  c2: { _id: "c2", customerName: "Sharma Kirana", phone: "9876501234" },
  c3: { _id: "c3", customerName: "Verma Store", phone: "9812345678" },
  c4: { _id: "c4", customerName: "Patel General Store", phone: "9898989898" },
  c5: { _id: "c5", customerName: "Khan Wholesale", phone: "9765432109" },
};

const DUMMY_ENTRIES: Record<string, LedgerEntry[]> = {
  c1: [
    { _id: "g1", customerId: "c1", customerName: "Gupta Traders", type: "credit", description: "Invoice INV-1042 — Noodles & Biscuits", amount: 8500, date: "2026-01-15", reference: "INV-1042" },
    { _id: "g2", customerId: "c1", customerName: "Gupta Traders", type: "credit", description: "Invoice INV-1046 — Flour & Sugar", amount: 7400, date: "2026-01-22", reference: "INV-1046" },
    { _id: "g3", customerId: "c1", customerName: "Gupta Traders", type: "debit", description: "UPI Payment — PhonePe", amount: 5000, date: "2026-01-24", reference: "UPI-9847321" },
    { _id: "g4", customerId: "c1", customerName: "Gupta Traders", type: "credit", description: "Invoice INV-1052 — Snacks", amount: 3200, date: "2026-01-28", reference: "INV-1052" },
    { _id: "g5", customerId: "c1", customerName: "Gupta Traders", type: "debit", description: "Cash Received", amount: 8000, date: "2026-02-01", reference: "CASH-001" },
  ],
  c2: [
    { _id: "s1", customerId: "c2", customerName: "Sharma Kirana", type: "credit", description: "Invoice INV-1043 — Oil & Rice", amount: 12500, date: "2026-01-16", reference: "INV-1043" },
    { _id: "s2", customerId: "c2", customerName: "Sharma Kirana", type: "debit", description: "Cash received at store", amount: 10000, date: "2026-01-25", reference: "CASH-002" },
    { _id: "s3", customerId: "c2", customerName: "Sharma Kirana", type: "credit", description: "Invoice INV-1047 — Dal & Masala", amount: 5600, date: "2026-01-29", reference: "INV-1047" },
    { _id: "s4", customerId: "c2", customerName: "Sharma Kirana", type: "debit", description: "UPI — GPay", amount: 4500, date: "2026-02-02", reference: "UPI-887766" },
  ],
  c3: [
    { _id: "v1", customerId: "c3", customerName: "Verma Store", type: "credit", description: "Invoice INV-1044 — Snacks & Cold Drinks", amount: 6200, date: "2026-01-18", reference: "INV-1044" },
    { _id: "v2", customerId: "c3", customerName: "Verma Store", type: "debit", description: "Cheque Payment — SBI #7829", amount: 4200, date: "2026-01-26", reference: "CHQ-7829" },
    { _id: "v3", customerId: "c3", customerName: "Verma Store", type: "credit", description: "Invoice INV-1048 — Biscuits & Tea", amount: 3200, date: "2026-01-30", reference: "INV-1048" },
  ],
  c4: [
    { _id: "p1", customerId: "c4", customerName: "Patel General Store", type: "credit", description: "Invoice INV-1045 — Rice bags", amount: 9800, date: "2026-01-19", reference: "INV-1045" },
    { _id: "p2", customerId: "c4", customerName: "Patel General Store", type: "debit", description: "UPI payment — GPay", amount: 6500, date: "2026-01-27", reference: "UPI-1122334" },
    { _id: "p3", customerId: "c4", customerName: "Patel General Store", type: "credit", description: "Invoice INV-1050 — Atta & Sugar", amount: 7800, date: "2026-02-03", reference: "INV-1050" },
  ],
  c5: [
    { _id: "k1", customerId: "c5", customerName: "Khan Wholesale", type: "credit", description: "Invoice INV-1049 — Bulk Order", amount: 22000, date: "2026-01-20", reference: "INV-1049" },
    { _id: "k2", customerId: "c5", customerName: "Khan Wholesale", type: "debit", description: "Bank Transfer — NEFT", amount: 15000, date: "2026-01-28", reference: "NEFT-4455" },
    { _id: "k3", customerId: "c5", customerName: "Khan Wholesale", type: "debit", description: "Cash payment", amount: 3000, date: "2026-02-04", reference: "CASH-003" },
  ],
};

// ===================== STYLED =====================

const DarkBanner = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px 24px",
  marginBottom: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  flexShrink: 0,
}));

const FilterBar = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "14px 20px",
  marginBottom: "16px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  flexShrink: 0,
}));

const StyledDateInput = styled("input")(() => ({
  borderRadius: "10px",
  backgroundColor: "#090d16",
  color: "#ffffff",
  fontSize: "0.8rem",
  fontWeight: 500,
  padding: "9px 12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  outline: "none",
  height: "38px",
  width: "100%",
  "&:hover": { borderColor: "rgba(56, 189, 248, 0.4)" },
  "&:focus": { borderColor: "#38bdf8" },
  "&::-webkit-calendar-picker-indicator": {
    filter: "invert(0.7)",
    cursor: "pointer",
  },
}));

const MetricCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
  backgroundColor: "#111827",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "14px 18px",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 12px 28px ${accentcolor}22`,
    borderColor: accentcolor,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
    backgroundColor: accentcolor,
  },
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
  "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(56, 189, 248, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.5)" },
  },
}));

const ItemsTable = styled("table")(() => ({
  width: "100%",
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
    transition: "all 0.2s ease",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "12px",
    textAlign: "left",
  },
}));

const TypeBadge = styled(Box)<{ type: "credit" | "debit" }>(({ type }) => {
  const isCredit = type === "credit";
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 10px",
    borderRadius: "20px",
    fontWeight: 700,
    fontSize: "0.68rem",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    backgroundColor: isCredit
      ? "rgba(56, 189, 248, 0.15)"
      : "rgba(244, 63, 94, 0.15)",
    color: isCredit ? "#38bdf8" : "#f43f5e",
    border: isCredit
      ? "1px solid rgba(56, 189, 248, 0.4)"
      : "1px solid rgba(244, 63, 94, 0.4)",
    "& svg": { fontSize: "14px" },
  };
});

// ===================== HELPERS =====================

const todayStr = () => new Date().toISOString().split("T")[0];
const firstOfMonthStr = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1)
    .toISOString()
    .split("T")[0];
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatCurrency = (amount: number) =>
  `₹ ${Math.abs(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// ===================== MAIN COMPONENT =====================

const CustomerLedgerDetail: React.FC = () => {
  const navigate = useNavigate();
  const { customerId } = useParams<{ customerId: string }>();

  const [customer, setCustomer] = useState<CustomerInfo | null>(null);
  const [allEntries, setAllEntries] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "credit" | "debit">("all");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // ===================== FETCH =====================
  const fetchData = async () => {
    if (!customerId) return;
    setLoading(true);

    // 🔥 DUMMY MODE
    if (USE_DUMMY_DATA) {
      setTimeout(() => {
        setCustomer(DUMMY_CUSTOMERS[customerId] || null);
        setAllEntries(DUMMY_ENTRIES[customerId] || []);
        setLoading(false);
      }, 250);
      return;
    }

    // 🔥 REAL MODE
    try {
      // Fetch customer info
      const cRes = await axios.get(`${API_URL}/customer/${customerId}`, getAuthHeaders());
      if (cRes.data?.success) {
        const c = cRes.data.data;
        setCustomer({
          _id: c._id,
          customerName: c.companyName || c.displayName || "Unknown",
          phone: c.phone || c.mobile,
        });
      }

      // Fetch ledger entries
      const lRes = await axios.get(
        `${API_URL}/customer-ledger/customer/${customerId}`,
        getAuthHeaders()
      );
      if (lRes.data?.success) {
        setAllEntries(lRes.data.data || []);
      } else {
        toast.error(lRes.data?.message || "Failed to load entries");
        setAllEntries([]);
      }
    } catch (err: any) {
      if (err.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(err.response?.data?.message || "Failed to load data");
      }
      setAllEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  // ===================== FILTERED + PAGINATED =====================
  const filteredEntries = useMemo(() => {
    let list = [...allEntries];

    if (appliedFrom) {
      list = list.filter((e) => new Date(e.date) >= new Date(appliedFrom));
    }
    if (appliedTo) {
      const to = new Date(appliedTo);
      to.setHours(23, 59, 59, 999);
      list = list.filter((e) => new Date(e.date) <= to);
    }
    if (typeFilter !== "all") {
      list = list.filter((e) => e.type === typeFilter);
    }

    // Sort by date ascending
    list.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return list;
  }, [allEntries, appliedFrom, appliedTo, typeFilter]);

  // Compute running balance on the FULL filtered list
  const entriesWithRunning = useMemo(() => {
    let running = 0;
    return filteredEntries.map((e) => {
      running += e.type === "credit" ? e.amount : -e.amount;
      return { ...e, runningBalance: running };
    });
  }, [filteredEntries]);

  const totalCount = entriesWithRunning.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const pageEntries = entriesWithRunning.slice(
    (page - 1) * limit,
    page * limit
  );

  // Summary (based on filtered list)
  const summary = useMemo(() => {
    const totalSell = filteredEntries
      .filter((e) => e.type === "credit")
      .reduce((s, e) => s + e.amount, 0);
    const totalPaid = filteredEntries
      .filter((e) => e.type === "debit")
      .reduce((s, e) => s + e.amount, 0);
    return {
      totalSell,
      totalPaid,
      balance: totalSell - totalPaid,
    };
  }, [filteredEntries]);

  // ===================== FILTERS =====================
  const handleApplyFilters = () => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
    setTypeFilter("all");
    setPage(1);
  };

  const applyQuickRange = (type: "today" | "week" | "month" | "all") => {
    const t = todayStr();
    if (type === "today") {
      setFromDate(t); setToDate(t); setAppliedFrom(t); setAppliedTo(t);
    } else if (type === "week") {
      const d = new Date(); d.setDate(d.getDate() - 6);
      const f = d.toISOString().split("T")[0];
      setFromDate(f); setToDate(t); setAppliedFrom(f); setAppliedTo(t);
    } else if (type === "month") {
      const f = firstOfMonthStr();
      setFromDate(f); setToDate(t); setAppliedFrom(f); setAppliedTo(t);
    } else {
      setFromDate(""); setToDate(""); setAppliedFrom(""); setAppliedTo("");
    }
    setPage(1);
  };

  const hasFilter = !!(
    appliedFrom ||
    appliedTo ||
    typeFilter !== "all"
  );

  // ===================== RENDER =====================
  return (
    <Box
      sx={{
        height: "85vh",
        maxHeight: "100vh",
        overflow: "hidden",
        bgcolor: "#090d16",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 1.5, md: 2 },
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
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* HEADER */}
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
                onClick={() => navigate("/customer-ledger")}
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
                Back
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
                  <Person />
                </Box>
                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={0.2}>
                    <Typography
                      sx={{
                        color: "#38bdf8",
                        letterSpacing: 0.5,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                      }}
                    >
                      Ledger Detail
                    </Typography>
                    {customer?.phone && (
                      <Chip
                        icon={<PhoneIcon sx={{ fontSize: 12 }} />}
                        label={customer.phone}
                        size="small"
                        sx={{
                          bgcolor: "rgba(56, 189, 248, 0.1)",
                          color: "#38bdf8",
                          border: "1px solid rgba(56, 189, 248, 0.3)",
                          fontWeight: 600,
                          fontSize: "0.65rem",
                          height: "20px",
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
                    }}
                  >
                    {customer?.customerName || "Customer"} — History
                  </Typography>
                </Box>
              </Box>
            </Box>

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
                px: 2.2,
                py: 1,
                fontSize: "0.8rem",
                "&:hover": {
                  borderColor: "#38bdf8",
                  color: "#38bdf8",
                  bgcolor: "rgba(56, 189, 248, 0.08)",
                },
              }}
            >
              Refresh
            </Button>
          </Box>
        </DarkBanner>

        {/* SUMMARY CARDS */}
        <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <MetricCard accentcolor="#38bdf8">
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Total Sell
                </Typography>
                <ShoppingCart sx={{ color: "#38bdf8", fontSize: 20 }} />
              </Box>
              <Typography sx={{ color: "#38bdf8", fontWeight: 800, fontSize: "1.3rem" }}>
                {formatCurrency(summary.totalSell)}
              </Typography>
              <Typography sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}>
                Credit / Udhaar
              </Typography>
            </MetricCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <MetricCard accentcolor="#f43f5e">
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Total Paid
                </Typography>
                <Payments sx={{ color: "#f43f5e", fontSize: 20 }} />
              </Box>
              <Typography sx={{ color: "#f43f5e", fontWeight: 800, fontSize: "1.3rem" }}>
                {formatCurrency(summary.totalPaid)}
              </Typography>
              <Typography sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}>
                Received
              </Typography>
            </MetricCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <MetricCard accentcolor={summary.balance > 0 ? "#34d399" : "#fbbf24"}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Balance
                </Typography>
                <AccountBalanceWallet
                  sx={{
                    color: summary.balance > 0 ? "#34d399" : "#fbbf24",
                    fontSize: 20,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  color: summary.balance > 0 ? "#34d399" : "#fbbf24",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                }}
              >
                {formatCurrency(summary.balance)}
              </Typography>
              <Typography sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}>
                {summary.balance > 0 ? "You'll receive" : "Settled"}
              </Typography>
            </MetricCard>
          </Grid>
        </Grid>

        {/* FILTER BAR */}
        <FilterBar>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.2}>
            <Box display="flex" alignItems="center" gap={0.8}>
              <FilterIcon sx={{ color: "#38bdf8", fontSize: 18 }} />
              <Typography
                sx={{
                  color: "#38bdf8",
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Filters
              </Typography>
            </Box>

            <Box sx={{ width: 150 }}>
              <StyledDateInput
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Box>
            <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
              to
            </Typography>
            <Box sx={{ width: 150 }}>
              <StyledDateInput
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Box>

            {/* Type filter */}
            <Box display="flex" gap={0.6}>
              {[
                { k: "all", label: "All", color: "#9ca3af" },
                { k: "credit", label: "Sell", color: "#38bdf8" },
                { k: "debit", label: "Paid", color: "#f43f5e" },
              ].map((t) => (
                <Chip
                  key={t.k}
                  label={t.label}
                  size="small"
                  onClick={() => {
                    setTypeFilter(t.k as any);
                    setPage(1);
                  }}
                  sx={{
                    bgcolor:
                      typeFilter === t.k
                        ? `${t.color}22`
                        : "rgba(255, 255, 255, 0.05)",
                    color: typeFilter === t.k ? t.color : "#9ca3af",
                    border:
                      typeFilter === t.k
                        ? `1px solid ${t.color}66`
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "32px",
                    cursor: "pointer",
                    "&:hover": { bgcolor: `${t.color}22`, color: t.color },
                  }}
                />
              ))}
            </Box>

            <Button
              size="small"
              variant="contained"
              onClick={handleApplyFilters}
              sx={{
                bgcolor: "#38bdf8",
                color: "#0d1527",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                height: "36px",
                fontSize: "0.75rem",
                "&:hover": { bgcolor: "#0ea5e9" },
              }}
            >
              Apply
            </Button>

            <Button
              size="small"
              variant="outlined"
              startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
              onClick={handleClearFilters}
              disabled={!hasFilter && !fromDate && !toDate}
              sx={{
                color: "#9ca3af",
                borderColor: "rgba(255, 255, 255, 0.15)",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 1.5,
                height: "36px",
                fontSize: "0.75rem",
                "&:hover": {
                  borderColor: "#f43f5e",
                  color: "#f43f5e",
                  bgcolor: "rgba(244, 63, 94, 0.08)",
                },
              }}
            >
              Clear
            </Button>

            <Box sx={{ display: "flex", gap: 0.7, ml: { md: "auto" }, flexWrap: "wrap" }}>
              {[
                { k: "today", label: "Today" },
                { k: "week", label: "7d" },
                { k: "month", label: "Month" },
                { k: "all", label: "All" },
              ].map((q) => (
                <Chip
                  key={q.k}
                  label={q.label}
                  size="small"
                  onClick={() => applyQuickRange(q.k as "today" | "week" | "month" | "all")}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    color: "#e5e7eb",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    height: "30px",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "rgba(56, 189, 248, 0.15)",
                      borderColor: "rgba(56, 189, 248, 0.4)",
                      color: "#38bdf8",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </FilterBar>

        {/* ENTRIES TABLE */}
        <TableContainerDark>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={1.5}
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: 0.5 }}>
              TRANSACTION HISTORY
            </Typography>
            <Chip
              label={`${totalCount} Entries`}
              size="small"
              sx={{
                bgcolor: "rgba(56, 189, 248, 0.1)",
                color: "#38bdf8",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: "24px",
              }}
            />
          </Box>

          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th style={{ textAlign: "center", width: "110px" }}>Date</th>
                  <th>Description</th>
                  <th style={{ textAlign: "center", width: "100px" }}>Type</th>
                  <th style={{ textAlign: "right", width: "140px" }}>Amount</th>
                  <th style={{ textAlign: "right", width: "150px" }}>Running Balance</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: 40 }}>
                      <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}>
                        Loading entries...
                      </Typography>
                    </td>
                  </tr>
                ) : pageEntries.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: 40 }}>
                      <ReceiptLong style={{ fontSize: 44, color: "#374151", marginBottom: 8 }} />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                        No entries found
                      </Typography>
                      <Typography sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}>
                        {hasFilter ? "Try changing the filters" : "No transaction history yet"}
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  pageEntries.map((row, idx) => {
                    const isCredit = row.type === "credit";
                    const positive = row.runningBalance >= 0;
                    return (
                      <tr key={row._id}>
                        <td style={{ textAlign: "center", color: "#6b7280" }}>
                          {(page - 1) * limit + idx + 1}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography sx={{ color: "#9ca3af", fontSize: "0.78rem" }}>
                            {formatDate(row.date)}
                          </Typography>
                        </td>
                        <td>
                          <Typography sx={{ color: "#e5e7eb", fontSize: "0.85rem" }}>
                            {row.description || "-"}
                          </Typography>
                          {row.reference && (
                            <Typography sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.2 }}>
                              Ref: {row.reference}
                            </Typography>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <TypeBadge type={isCredit ? "credit" : "debit"}>
                            {isCredit ? (
                              <AddIcon fontSize="inherit" />
                            ) : (
                              <RemoveIcon fontSize="inherit" />
                            )}
                            {isCredit ? "Sell" : "Paid"}
                          </TypeBadge>
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                            color: isCredit ? "#38bdf8" : "#f43f5e",
                          }}
                        >
                          {isCredit ? "+" : "−"} {formatCurrency(row.amount)}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                            color: positive ? "#34d399" : "#fbbf24",
                          }}
                        >
                          {formatCurrency(row.runningBalance)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </ItemsTable>
          </TableScrollArea>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              px: 3,
              py: 1.5,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Box display="flex" alignItems="center" gap={1.2}>
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
                    bgcolor:
                      limit === n
                        ? "rgba(56, 189, 248, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                    color: limit === n ? "#38bdf8" : "#9ca3af",
                    border:
                      limit === n
                        ? "1px solid rgba(56, 189, 248, 0.5)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    height: "24px",
                    cursor: "pointer",
                  }}
                />
              ))}
              <Typography sx={{ color: "#6b7280", fontSize: "0.72rem", ml: 1 }}>
                {totalCount > 0
                  ? `${(page - 1) * limit + 1}–${Math.min(page * limit, totalCount)} of ${totalCount}`
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
                  "&:hover": {
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    color: "#38bdf8",
                  },
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

      {/* FLOATING DASHBOARD */}
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
            width: 52,
            height: 52,
            boxShadow: "0 8px 24px rgba(56, 189, 248, 0.45)",
            "&:hover": { bgcolor: "#0ea5e9" },
          }}
        >
          <HomeIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default CustomerLedgerDetail;