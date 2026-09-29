



import React, { useEffect, useState } from "react";
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
} from "@mui/icons-material";

// ===================== TYPES =====================

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

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "42px",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
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
    padding: "16px 12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    textAlign: "left",
    whiteSpace: "nowrap",
    backgroundColor: "#111827",
  },
  "& tbody tr": {
    transition: "all 0.2s ease",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.05)" },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "14px 12px",
    textAlign: "left",
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

// ===================== MAIN COMPONENT =====================

const SaleList: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<Sale[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ===================== FETCH =====================
  const fetchData = async () => {
    try {
      setLoading(true);

      const params: any = { page, limit };
      if (appliedFrom) params.from = appliedFrom;
      if (appliedTo) params.to = appliedTo;

      const res = await axios.get(`${API_URL}/sale`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setData(res.data.data || []);
        const count =
          res.data.totalCount ?? res.data.total ?? res.data.count ?? 0;
        const pages =
          res.data.totalPages ??
          res.data.pages ??
          Math.max(1, Math.ceil((count || 0) / limit));
        setTotalEntries(count);
        setTotalPages(pages);
      } else if (
        res.data?.success === false &&
        res.data?.message === "Unauthorized"
      ) {
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, appliedFrom, appliedTo]);

  // ===================== DATE FILTER =====================
  const handleApplyDateFilter = () => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setPage(1);
  };

  const handleClearDateFilter = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
    setPage(1);
  };

  const hasDateFilter = !!(appliedFrom || appliedTo);

  // ===================== DELETE ONE =====================
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${API_URL}/sale/${id}`, getAuthHeaders());

      if (res.data?.success === true) {
        toast.success("Sale deleted successfully");
        setDeleteDialogOpen(false);
        if (data.length === 1 && page > 1) {
          setPage((p) => p - 1);
        } else {
          await fetchData();
        }
      } else {
        toast.error(res.data?.message || "Failed to delete");
      }
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // ===================== DELETE ALL =====================
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

  // Current page total
  const pageTotal = data.reduce((s, r) => s + getSaleTotal(r), 0);

  // ===================== RENDER =====================
  return (
    <Box
      sx={{
        height: "85vh",
        maxHeight: "100vh",
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
        {/* ================= HEADER BANNER ================= */}
        <DarkBanner>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
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

              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
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
                    fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.6rem" },
                    letterSpacing: 0.5,
                  }}
                >
                  Load Vehicle Details
                </Typography>

                {totalEntries > 0 && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#9ca3af", mt: 0.5 }}
                  >
                    {totalEntries} total entries
                  </Typography>
                )}
              </Box>
            </Box>

            <Box display="flex" gap={1} flexWrap="wrap">
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
                  fontSize: "0.8rem",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
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
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#f43f5e",
                    bgcolor: "rgba(244, 63, 94, 0.08)",
                  },
                  "&.Mui-disabled": {
                    color: "rgba(244, 63, 94, 0.4)",
                    borderColor: "rgba(244, 63, 94, 0.15)",
                  },
                }}
              >
                Delete All
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= FILTER BAR ================= */}
        <FilterBar>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
            <StyledTextField
              type="date"
              size="small"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              sx={{ width: 160 }}
            />
            <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
              to
            </Typography>
            <StyledTextField
              type="date"
              size="small"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              sx={{ width: 160 }}
            />

            <Button
              size="small"
              variant="contained"
              onClick={handleApplyDateFilter}
              sx={{
                bgcolor: "#10b981",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                fontSize: "0.75rem",
                "&:hover": { bgcolor: "#059669" },
              }}
            >
              Apply
            </Button>

            <Button
              size="small"
              variant="outlined"
              onClick={handleClearDateFilter}
              disabled={!hasDateFilter && !fromDate && !toDate}
              sx={{
                color: "#9ca3af",
                borderColor: "rgba(255, 255, 255, 0.15)",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                fontSize: "0.75rem",
                "&:hover": {
                  borderColor: "#f43f5e",
                  color: "#f43f5e",
                  bgcolor: "rgba(244, 63, 94, 0.08)",
                },
              }}
            >
              Reset
            </Button>

            {hasDateFilter && (
              <Chip
                label={`Active: ${appliedFrom || "..."} → ${appliedTo || "..."}`}
                size="small"
                sx={{
                  bgcolor: "rgba(56, 189, 248, 0.15)",
                  color: "#38bdf8",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "26px",
                }}
              />
            )}

            {pageTotal > 0 && (
              <Box
                sx={{
                  ml: { md: "auto" },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "rgba(56, 189, 248, 0.1)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.8,
                }}
              >
                <ShoppingCart sx={{ fontSize: 16, color: "#38bdf8" }} />
                <Typography
                  sx={{
                    color: "#38bdf8",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                  }}
                >
                  Page Total: ₹ {pageTotal.toLocaleString()}
                </Typography>
              </Box>
            )}
          </Box>
        </FilterBar>

        {/* ================= TABLE ================= */}
        <TableContainerDark>
          {/* Header (fixed) */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={2}
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "0.95rem",
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

          {/* Scroll Area */}
          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th style={{ textAlign: "center" }}>Date</th>
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
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading sales...
                      </Typography>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <Receipt
                        style={{
                          fontSize: 44,
                          color: "#374151",
                          marginBottom: 8,
                        }}
                      />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                        No sales found
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
                      >
                        {hasDateFilter
                          ? "Try changing the date filter"
                          : "Click 'Load Vehicle' to create your first entry"}
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
                          <Typography
                            sx={{
                              color: "#34d399",
                              fontWeight: 800,
                              fontSize: "0.95rem",
                            }}
                          >
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
                            sx={{
                              color: "#34d399",
                              "&:hover": {
                                bgcolor: "rgba(52, 211, 153, 0.1)",
                              },
                            }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(`/sale/invoice/edit/${row._id}`)
                            }
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
                            onClick={() => {
                              setSelectedId(row._id);
                              setDeleteDialogOpen(true);
                            }}
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
                    );
                  })
                )}
              </tbody>
            </ItemsTable>
          </TableScrollArea>

          {/* ================= PAGINATION BAR (fixed) ================= */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              px: 3,
              py: 1.8,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography
                sx={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600 }}
              >
                Rows per page:
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
                    fontSize: "0.7rem",
                    height: "26px",
                    cursor: "pointer",
                  }}
                />
              ))}
              <Typography
                sx={{ color: "#6b7280", fontSize: "0.75rem", ml: 1 }}
              >
                {totalEntries > 0
                  ? `${(page - 1) * limit + 1}–${Math.min(
                      page * limit,
                      totalEntries
                    )} of ${totalEntries}`
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
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  "&:hover": {
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    color: "#38bdf8",
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(56, 189, 248, 0.2) !important",
                  color: "#38bdf8 !important",
                  borderColor: "rgba(56, 189, 248, 0.5) !important",
                },
              }}
            />
          </Box>
        </TableContainerDark>
      </Box>

      {/* ================= FLOATING DASHBOARD BUTTON ================= */}
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

      {/* ================= VIEW DIALOG ================= */}
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
            backgroundImage: "none",
          },
        }}
      >
        {selectedSale && (
          <>
            <DialogTitle
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "1.1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    bgcolor: "#0c2a3a",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ViewIcon sx={{ fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "#38bdf8",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    Load Vehicle Details
                  </Typography>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                    }}
                  >
                    {formatDate(selectedSale.date)}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() => setViewDialogOpen(false)}
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

            <DialogContent sx={{ p: 3 }}>
              {/* Items table */}
              <Box
                sx={{
                  bgcolor: "#111827",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  overflow: "hidden",
                }}
              >
                <ItemsTable>
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
                        <td>
                          <Typography
                            sx={{
                              color: "#ffffff",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                            }}
                          >
                            {item.itemName}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>₹ {item.mrp}</td>
                        <td style={{ textAlign: "center" }}>₹ {item.rate}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.quantity}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography
                            sx={{
                              color: "#34d399",
                              fontWeight: 700,
                              fontSize: "0.85rem",
                            }}
                          >
                            ₹ {getItemTotal(item).toLocaleString()}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </ItemsTable>
              </Box>

              {/* Grand total */}
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Box
                  sx={{
                    bgcolor: "rgba(52, 211, 153, 0.1)",
                    border: "1px solid rgba(52, 211, 153, 0.3)",
                    borderRadius: "12px",
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                    Grand Total:
                  </Typography>
                  <Typography
                    sx={{
                      color: "#34d399",
                      fontWeight: 800,
                      fontSize: "1.3rem",
                    }}
                  >
                    ₹ {getSaleTotal(selectedSale).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>

            <DialogActions
              sx={{
                p: 2.5,
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                gap: 1,
              }}
            >
              <Button
                onClick={() => setViewDialogOpen(false)}
                sx={{
                  color: "#9ca3af",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "10px",
                }}
              >
                Close
              </Button>

              <Button
                onClick={() => {
                  setViewDialogOpen(false);
                  navigate(`/sale/invoice/edit/${selectedSale._id}`);
                }}
                variant="contained"
                sx={{
                  bgcolor: "#38bdf8",
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "10px",
                  px: 3,
                  "&:hover": { bgcolor: "#0ea5e9" },
                }}
              >
                Edit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ================= DELETE DIALOG ================= */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete this sale invoice? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => selectedId && handleDelete(selectedId)}
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
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= DELETE ALL DIALOG ================= */}
      <Dialog
        open={deleteAllDialogOpen}
        onClose={() => setDeleteAllDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete All Sales
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete ALL sale invoices? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteAllDialogOpen(false)}
            sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAll}
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
            Delete All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SaleList;