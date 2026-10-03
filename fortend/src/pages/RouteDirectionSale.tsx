import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Pagination,
  Tooltip,
  Fab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Receipt,
  Home as HomeIcon,
  Refresh as RefreshIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  Lock as LockIcon,
  AltRoute,
  FiberManualRecord,
  CalendarToday,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface RouteEntry {
  _id: string;
  date: string;
  route: string;
  remark: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

const toInputDate = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const todayStr = () => toInputDate(new Date());

/* ✅ Same preset logic as other pages */
const getDatePreset = (
  preset: "today" | "yesterday" | "thisMonth" | "lastMonth"
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

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// ===================== STYLED =====================

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
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  flexShrink: 0,
}));

const QuickFilterChip = styled(Button)<{ active?: boolean }>(
  ({ active }) => ({
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.75rem",
    padding: "8px 16px",
    minWidth: "auto",
    whiteSpace: "nowrap",
    backgroundColor: active ? "#2dd4bf" : "rgba(45, 212, 191, 0.15)",
    color: active ? "#0d1527" : "#2dd4bf",
    border: active
      ? "1px solid #2dd4bf"
      : "1px solid rgba(45, 212, 191, 0.3)",
    boxShadow: active ? "0 4px 14px rgba(45, 212, 191, 0.35)" : "none",
    "&:hover": {
      backgroundColor: active ? "#14b8a6" : "rgba(45, 212, 191, 0.25)",
      borderColor: "#2dd4bf",
    },
  })
);

/* ✅ Single line field — fixed height + calendar icon inside */
const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "44px",
    padding: "0 12px",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
    "&:hover fieldset": { borderColor: "rgba(45, 212, 191, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#2dd4bf",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: 0,
    height: "44px",
    "&::placeholder": { color: "#6b7280", opacity: 1 },
    // ✅ calendar icon inside the field
    "&::-webkit-calendar-picker-indicator": {
      filter: "invert(0.7)",
      cursor: "pointer",
      opacity: 1,
      marginRight: 0,
    },
  },
  "& .MuiInputLabel-root": {
    color: "#9ca3af",
    fontSize: "0.8rem",
    "&.Mui-focused": { color: "#2dd4bf" },
  },
}));

/* ✅ Multiline field — no fixed height, proper padding */
const StyledMultilineField = styled(TextField)(() => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    padding: "10px 12px",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
    "&:hover fieldset": { borderColor: "rgba(45, 212, 191, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#2dd4bf",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: 0,
    "&::placeholder": { color: "#6b7280", opacity: 1 },
  },
  "& textarea": {
    color: "#ffffff",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: 0,
    "&::placeholder": { color: "#6b7280", opacity: 1 },
  },
  "& .MuiInputLabel-root": {
    color: "#9ca3af",
    fontSize: "0.8rem",
    "&.Mui-focused": { color: "#2dd4bf" },
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
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  marginBottom: "16px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: "400px",
}));

const TableScrollArea = styled(Box)(() => ({
  overflow: "auto",
  flex: "1 1 0",
  height: 0,
  minHeight: 0,
  width: "100%",
  "&::-webkit-scrollbar": { width: "8px", height: "8px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(45, 212, 191, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(45, 212, 191, 0.5)" },
  },
}));

const CardListArea = styled(Box)(() => ({
  overflowY: "auto",
  overflowX: "hidden",
  flex: "1 1 0",
  height: 0,
  minHeight: 0,
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(45, 212, 191, 0.3)",
    borderRadius: "8px",
  },
}));

const ItemsTable = styled("table")(() => ({
  width: "100%",
  minWidth: "700px",
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
  "& tbody tr:hover": { backgroundColor: "rgba(45, 212, 191, 0.03)" },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "12px",
    textAlign: "left",
  },
}));

// ===================== MAIN =====================

const RouteDirectionSale: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<RouteEntry[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [activeQuick, setActiveQuick] = useState<
    "today" | "yesterday" | "thisMonth" | "lastMonth" | ""
  >("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [entryDate, setEntryDate] = useState<string>(todayStr());
  const [route, setRoute] = useState("");
  const [remark, setRemark] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);

  // ===================== FETCH =====================
  const fetchData = async () => {
    try {
      setListLoading(true);

      const params: any = { page, limit };
      if (appliedFrom) params.from = appliedFrom;
      if (appliedTo) params.to = appliedTo;

      const res = await axios.get(`${API_URL}/route-direction-sale`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setData(res.data.data || []);
        setTotalCount(res.data.totalCount || 0);
        setTotalPages(res.data.pages || 1);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load entries");
        setData([]);
      }
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load entries");
      }
      setData([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, appliedFrom, appliedTo]);

  // ===================== FILTER =====================
  const handleApply = () => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setActiveQuick("");
    setPage(1);
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
    setActiveQuick("");
    setPage(1);
  };

  /* ✅ New preset handler — Today / Yesterday / This Month / Last Month */
  const handlePreset = (
    preset: "today" | "yesterday" | "thisMonth" | "lastMonth"
  ) => {
    const { from, to } = getDatePreset(preset);
    setFromDate(from);
    setToDate(to);
    setAppliedFrom(from);
    setAppliedTo(to);
    setActiveQuick(preset);
    setPage(1);
  };

  const hasFilter = !!(appliedFrom || appliedTo);

  // ===================== FORM =====================
  const resetForm = () => {
    setEditingId(null);
    setEntryDate(todayStr());
    setRoute("");
    setRemark("");
  };

  const openFormModal = () => {
    resetForm();
    setFormOpen(true);
  };

  const closeFormModal = () => {
    if (saving) return;
    setFormOpen(false);
    resetForm();
  };

  const handleSubmit = async () => {
    if (!route.trim()) {
      toast.error("Please enter route");
      return;
    }
    if (!entryDate) {
      toast.error("Please select date");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        date: entryDate,
        route: route.trim(),
        remark: remark.trim() || "-",
      };

      if (editingId) {
        const res = await axios.put(
          `${API_URL}/route-direction-sale/${editingId}`,
          payload,
          getAuthHeaders()
        );

        if (res.data?.success === true) {
          toast.success("Route entry updated successfully");
          closeFormModal();
          fetchData();
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(res.data?.message || "Failed to update entry");
        }
      } else {
        const res = await axios.post(
          `${API_URL}/route-direction-sale`,
          payload,
          getAuthHeaders()
        );

        if (res.data?.success === true) {
          toast.success("Route entry created successfully");
          closeFormModal();
          setPage(1);
          fetchData();
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(res.data?.message || "Failed to create entry");
        }
      }
    } catch (error: any) {
      if (!error.response) {
        toast.error("Network error! Please check your connection");
      } else {
        toast.error(error.response?.data?.message || "Failed to save");
      }
    } finally {
      setSaving(false);
    }
  };

  // ===================== EDIT =====================
  const handleEdit = (row: RouteEntry) => {
    setEditingId(row._id);
    setEntryDate(
      row.date ? new Date(row.date).toISOString().split("T")[0] : todayStr()
    );
    setRoute(row.route || "");
    setRemark(row.remark || "");
    setFormOpen(true);
  };

  // ===================== DELETE =====================
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      const res = await axios.delete(
        `${API_URL}/route-direction-sale/${deleteId}`,
        getAuthHeaders()
      );
      if (res.data?.success) {
        toast.success("Entry deleted");
        setDeleteId(null);
        if (data.length === 1 && page > 1) setPage((p) => p - 1);
        else fetchData();
      } else {
        toast.error(res.data?.message || "Failed to delete");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      setDeleting(true);
      const res = await axios.delete(
        `${API_URL}/route-direction-sale/delete-all`,
        getAuthHeaders()
      );
      if (res.data?.success) {
        toast.success(res.data?.message || "All entries deleted");
        setDeleteAllOpen(false);
        setPage(1);
        fetchData();
      } else {
        toast.error(res.data?.message || "Failed to delete all");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete all failed");
    } finally {
      setDeleting(false);
    }
  };

  // ===================== RENDER =====================
  return (
    <Box
      sx={{
        height: { xs: "100dvh", md: "100vh" },
        maxHeight: { xs: "100dvh", md: "100vh" },
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
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            gap={1.5}
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
                    borderColor: "#2dd4bf",
                    color: "#2dd4bf",
                    bgcolor: "rgba(45, 212, 191, 0.08)",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box
                display="flex"
                alignItems="center"
                gap={1.2}
                sx={{ minWidth: 0 }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    bgcolor: "#0f2f2c",
                    color: "#2dd4bf",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <AltRoute sx={{ fontSize: 20 }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={0.2}>
                    <FiberManualRecord
                      sx={{ fontSize: 10, color: "#2dd4bf" }}
                    />
                    <Typography
                      sx={{
                        color: "#2dd4bf",
                        letterSpacing: 0.5,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                      }}
                    >
                      Route Management
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.4rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    9. ROUTE & DIRECTION / SALE
                  </Typography>
                </Box>
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
                onClick={openFormModal}
                sx={{
                  bgcolor: "#14b8a6",
                  color: "#ffffff",
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.78rem",
                  boxShadow: "0 4px 14px rgba(20, 184, 166, 0.35)",
                  flex: { xs: "1 1 45%", sm: "none" },
                  "&:hover": {
                    bgcolor: "#0d9488",
                    boxShadow: "0 8px 20px rgba(20, 184, 166, 0.5)",
                  },
                }}
              >
                New Entry
              </Button>

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchData}
                disabled={listLoading}
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
                    borderColor: "#2dd4bf",
                    color: "#2dd4bf",
                    bgcolor: "rgba(45, 212, 191, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>

              {totalCount > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => setDeleteAllOpen(true)}
                  sx={{
                    color: "#f43f5e",
                    borderColor: "rgba(244, 63, 94, 0.3)",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 2,
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
              )}
            </Box>
          </Box>
        </DarkBanner>

        {/* FILTER BAR */}
        <FilterBar>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StyledTextField
                type="date"
                size="small"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                label="From"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StyledTextField
                type="date"
                size="small"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                label="To"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Box display="flex" gap={1} sx={{ height: "100%" }}>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
                  onClick={handleApply}
                  sx={{
                    bgcolor: "#14b8a6",
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    py: 1.1,
                    fontSize: "0.78rem",
                    "&:hover": { bgcolor: "#0d9488" },
                  }}
                >
                  Apply
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
                  onClick={handleClear}
                  disabled={!hasFilter && !fromDate && !toDate}
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
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* ✅ Quick chips row — Today / Yesterday / This Month / Last Month */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              mt: 1.5,
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#9ca3af",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                mr: 0.5,
              }}
            >
              Quick:
            </Typography>

            <QuickFilterChip
              active={activeQuick === "today"}
              onClick={() => handlePreset("today")}
            >
              Today
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "yesterday"}
              onClick={() => handlePreset("yesterday")}
            >
              Yesterday
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "thisMonth"}
              onClick={() => handlePreset("thisMonth")}
            >
              This Month
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "lastMonth"}
              onClick={() => handlePreset("lastMonth")}
            >
              Last Month
            </QuickFilterChip>

            {hasFilter && (
              <Chip
                label={`${appliedFrom || "..."} → ${appliedTo || "..."}`}
                size="small"
                onDelete={handleClear}
                sx={{
                  ml: { md: "auto" },
                  bgcolor: "rgba(45, 212, 191, 0.15)",
                  color: "#2dd4bf",
                  border: "1px solid rgba(45, 212, 191, 0.4)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "28px",
                  "& .MuiChip-deleteIcon": {
                    color: "#2dd4bf",
                    "&:hover": { color: "#f43f5e" },
                  },
                }}
              />
            )}
          </Box>
        </FilterBar>

        {/* TABLE / CARDS */}
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
              ROUTE / DIRECTION / SALE LOG
            </Typography>
            <Chip
              label={`${totalCount} Entries`}
              size="small"
              sx={{
                bgcolor: "rgba(45, 212, 191, 0.1)",
                color: "#2dd4bf",
                border: "1px solid rgba(45, 212, 191, 0.3)",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: "26px",
              }}
            />
          </Box>

          {/* DESKTOP TABLE */}
          <TableScrollArea sx={{ display: { xs: "none", md: "block" } }}>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th>Route / Direction</th>
                  <th>Remark</th>
                  <th style={{ textAlign: "center", width: "120px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {listLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <CircularProgress sx={{ color: "#2dd4bf" }} size={30} />
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading entries...
                      </Typography>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
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
                        No entries found
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  data.map((row, idx) => (
                    <tr key={row._id}>
                      <td style={{ textAlign: "center", color: "#6b7280" }}>
                        {(page - 1) * limit + idx + 1}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Chip
                          icon={<CalendarToday sx={{ fontSize: 12 }} />}
                          label={formatDate(row.date)}
                          size="small"
                          sx={{
                            bgcolor: "rgba(156, 163, 175, 0.1)",
                            color: "#e5e7eb",
                            border: "1px solid rgba(156, 163, 175, 0.2)",
                            fontSize: "0.7rem",
                            height: "24px",
                            "& .MuiChip-icon": { color: "#2dd4bf" },
                          }}
                        />
                      </td>
                      <td>
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {row.route}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          sx={{ color: "#9ca3af", fontSize: "0.82rem" }}
                        >
                          {row.remark || "-"}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(row)}
                          sx={{
                            color: "#38bdf8",
                            "&:hover": {
                              bgcolor: "rgba(56, 189, 248, 0.1)",
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => setDeleteId(row._id)}
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
          </TableScrollArea>

          {/* MOBILE CARDS */}
          <CardListArea sx={{ display: { xs: "flex", md: "none" } }}>
            {listLoading ? (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <CircularProgress sx={{ color: "#2dd4bf" }} size={30} />
                <Typography
                  sx={{ color: "#9ca3af", fontSize: "0.85rem", mt: 1 }}
                >
                  Loading entries...
                </Typography>
              </Box>
            ) : data.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <Receipt sx={{ fontSize: 40, color: "#374151", mb: 1 }} />
                <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                  No entries found
                </Typography>
              </Box>
            ) : (
              data.map((row, idx) => (
                <Box
                  key={row._id}
                  sx={{
                    bgcolor: "#111827",
                    border: "1px solid rgba(45, 212, 191, 0.2)",
                    borderRadius: "12px",
                    p: 1.5,
                    "&:hover": {
                      borderColor: "rgba(45, 212, 191, 0.45)",
                      boxShadow: "0 6px 18px rgba(45, 212, 191, 0.15)",
                    },
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    gap={1}
                    mb={1}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{ minWidth: 0, flex: 1 }}
                    >
                      <Box
                        sx={{
                          width: 26,
                          height: 26,
                          borderRadius: "8px",
                          bgcolor: "rgba(45, 212, 191, 0.15)",
                          color: "#2dd4bf",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.68rem",
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {(page - 1) * limit + idx + 1}
                      </Box>
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.route}
                      </Typography>
                    </Box>
                    <Chip
                      icon={<CalendarToday sx={{ fontSize: 11 }} />}
                      label={formatDate(row.date)}
                      size="small"
                      sx={{
                        bgcolor: "rgba(156, 163, 175, 0.1)",
                        color: "#e5e7eb",
                        border: "1px solid rgba(156, 163, 175, 0.2)",
                        fontSize: "0.62rem",
                        height: "22px",
                        flexShrink: 0,
                        "& .MuiChip-icon": { color: "#2dd4bf" },
                      }}
                    />
                  </Box>

                  {row.remark && row.remark !== "-" && (
                    <Box
                      sx={{
                        bgcolor: "#0d1527",
                        borderRadius: "8px",
                        p: 1,
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#6b7280",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: 0.5,
                          textTransform: "uppercase",
                          mb: 0.3,
                        }}
                      >
                        Remark
                      </Typography>
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.75rem" }}
                      >
                        {row.remark}
                      </Typography>
                    </Box>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 0.5,
                      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                      pt: 0.8,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(row)}
                      sx={{
                        color: "#38bdf8",
                        "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteId(row._id)}
                      sx={{
                        color: "#f43f5e",
                        "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </CardListArea>

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
              <Typography
                sx={{ color: "#9ca3af", fontSize: "0.72rem", fontWeight: 600 }}
              >
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
                        ? "rgba(45, 212, 191, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                    color: limit === n ? "#2dd4bf" : "#9ca3af",
                    border:
                      limit === n
                        ? "1px solid rgba(45, 212, 191, 0.5)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "26px",
                    cursor: "pointer",
                  }}
                />
              ))}
              <Typography
                sx={{ color: "#6b7280", fontSize: "0.72rem", ml: 0.5 }}
              >
                {totalCount > 0
                  ? `${(page - 1) * limit + 1}–${Math.min(
                      page * limit,
                      totalCount
                    )} of ${totalCount}`
                  : "0 records"}
              </Typography>
            </Box>

            <Pagination
              count={Math.max(1, totalPages)}
              page={page}
              onChange={(_, v) => setPage(v)}
              disabled={listLoading}
              shape="rounded"
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#9ca3af",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  "&:hover": {
                    bgcolor: "rgba(45, 212, 191, 0.1)",
                    color: "#2dd4bf",
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(45, 212, 191, 0.2) !important",
                  color: "#2dd4bf !important",
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
            bgcolor: "#14b8a6",
            color: "#ffffff",
            width: 50,
            height: 50,
            boxShadow: "0 8px 24px rgba(20, 184, 166, 0.45)",
            "&:hover": { bgcolor: "#0d9488" },
          }}
        >
          <HomeIcon />
        </Fab>
      </Tooltip>

      {/* ================= FORM MODAL ================= */}
      <Dialog
        open={formOpen}
        onClose={closeFormModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#0d1527",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundImage: "none",
            m: { xs: 1.5, sm: 4 },
            width: { xs: "calc(100% - 24px)", sm: "100%" },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            px: { xs: 2, sm: 3 },
            py: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                bgcolor: "#0f2f2c",
                color: "#2dd4bf",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <LockIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                color: "#2dd4bf",
                fontWeight: 800,
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {editingId ? "Edit Route Entry" : "Add Route Entry"}
            </Typography>
            {editingId && (
              <Chip
                label="EDITING"
                size="small"
                sx={{
                  bgcolor: "rgba(251, 191, 36, 0.15)",
                  color: "#fbbf24",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  height: "22px",
                }}
              />
            )}
          </Box>
          <IconButton
            onClick={closeFormModal}
            disabled={saving}
            size="small"
            sx={{
              color: "#9ca3af",
              "&:hover": {
                color: "#f43f5e",
                bgcolor: "rgba(244, 63, 94, 0.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <FieldLabel>Date *</FieldLabel>
              <StyledTextField
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FieldLabel>Route / Direction *</FieldLabel>
              <StyledTextField
                placeholder="e.g. Delhi → Jaipur → Ajmer"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FieldLabel>Remark</FieldLabel>
              <StyledMultilineField
                multiline
                minRows={3}
                maxRows={6}
                placeholder="Optional notes..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 2, sm: 3 },
            pb: { xs: 2, sm: 3 },
            pt: 1,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            gap: 1,
          }}
        >
          <Button
            onClick={closeFormModal}
            disabled={saving}
            sx={{
              color: "#9ca3af",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 3,
              py: 1.1,
              "&:hover": {
                color: "#e5e7eb",
                bgcolor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            startIcon={
              saving ? (
                <CircularProgress size={16} sx={{ color: "#ffffff" }} />
              ) : (
                <AddIcon />
              )
            }
            onClick={handleSubmit}
            disabled={saving}
            sx={{
              bgcolor: "#14b8a6",
              color: "#ffffff",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              borderRadius: "10px",
              px: 3,
              py: 1.1,
              fontSize: "0.78rem",
              boxShadow: "0 4px 14px rgba(20, 184, 166, 0.3)",
              "&:hover": {
                bgcolor: "#0d9488",
                boxShadow: "0 8px 20px rgba(20, 184, 166, 0.4)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(20, 184, 166, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {saving ? "Saving..." : editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= DELETE SINGLE ================= */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
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
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete Entry?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete this route entry? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteId(null)}
            disabled={deleting}
            sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleting}
            variant="contained"
            sx={{
              bgcolor: "#f43f5e",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 3,
              "&:hover": { bgcolor: "#e11d48" },
            }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= DELETE ALL ================= */}
      <Dialog
        open={deleteAllOpen}
        onClose={() => setDeleteAllOpen(false)}
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
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete All Entries?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            This will permanently remove all {totalCount} route entries. This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteAllOpen(false)}
            disabled={deleting}
            sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAll}
            disabled={deleting}
            variant="contained"
            sx={{
              bgcolor: "#f43f5e",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 3,
              "&:hover": { bgcolor: "#e11d48" },
            }}
          >
            {deleting ? "Deleting..." : "Delete All"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RouteDirectionSale;