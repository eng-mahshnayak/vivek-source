import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  Grid,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  FiberManualRecord,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  Receipt,
  ShoppingCart,
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
  totalValue?: number;   // API uses totalValue
  grandTotal?: number;   // legacy fallback
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
}));

const FilterCard = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px",
  marginBottom: "16px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
}));

const TableContainerDark = styled(TableContainer)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  overflow: "hidden",
}));

const StyledTableHead = styled(TableHead)(() => ({
  "& .MuiTableCell-head": {
    backgroundColor: "#111827",
    color: "#9ca3af",
    fontWeight: 700,
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "16px 12px",
    whiteSpace: "nowrap",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(56, 189, 248, 0.05)",
  },
  "& .MuiTableCell-body": {
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "14px 12px",
  },
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

const TotalChip = styled(Box)(() => ({
  backgroundColor: "rgba(56, 189, 248, 0.1)",
  border: "1px solid rgba(56, 189, 248, 0.3)",
  color: "#38bdf8",
  borderRadius: "10px",
  padding: "10px 20px",
  fontWeight: 700,
  fontSize: "0.85rem",
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const PaginationButton = styled(IconButton)(() => ({
  width: "38px",
  height: "38px",
  borderRadius: "10px",
  color: "#9ca3af",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:hover": {
    bgcolor: "rgba(56, 189, 248, 0.1)",
    borderColor: "#38bdf8",
    color: "#38bdf8",
  },
  "&.Mui-disabled": {
    color: "rgba(156, 163, 175, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
}));

// ===================== HELPERS =====================

// Safely read the total from any possible field name
const getSaleTotal = (sale: Sale): number => {
  if (typeof sale?.grandTotal === "number") return sale.grandTotal;
  if (typeof sale?.totalValue === "number") return sale.totalValue;

  // Fallback: compute from items
  if (Array.isArray(sale?.items)) {
    return sale.items.reduce(
      (sum, it) => sum + (Number(it?.quantity) || 0) * (Number(it?.rate) || 0),
      0
    );
  }
  return 0;
};

// Safely compute line total for an item
const getItemTotal = (item: SaleItem): number => {
  if (typeof item?.totalAmount === "number") return item.totalAmount;
  return (Number(item?.quantity) || 0) * (Number(item?.rate) || 0);
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
  const [error, setError] = useState<string | null>(null);

  console.log(error);
  

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rowsPerPageOptions] = useState([25, 50, 100, 200]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ===================== FETCH =====================
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: any = { page, limit: rowsPerPage };
      if (fromDate) params.from = fromDate;
      if (toDate) params.to = toDate;

      const res = await axios.get(`${API_URL}/sale`, {
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
        toast.error(res?.data?.message || "Failed to fetch sales");
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
  }, [page, rowsPerPage, fromDate, toDate]);

  // ===================== DELETE ONE =====================
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${API_URL}/sale/${id}`, getAuthHeaders());

      if (res.data?.success === true) {
        toast.success("Sale deleted successfully");
        await fetchData();
        setDeleteDialogOpen(false);
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
        await fetchData();
        setDeleteAllDialogOpen(false);
      } else {
        toast.error(res.data?.message || "Failed to delete all");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete all failed");
    } finally {
      setLoading(false);
    }
  };

  // ===================== PAGINATION =====================
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Sum of all totals on current page (safe)
  const grandTotalSum = data.reduce((s, r) => s + getSaleTotal(r), 0);

  // ===================== LOADING =====================
  if (loading && data.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#090d16",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "#38bdf8" }} />
        <Typography sx={{ color: "#9ca3af" }}>Loading sales...</Typography>
      </Box>
    );
  }

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
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            gap={2}
          >
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

              {data.length > 0 && (
                <Typography
                  variant="caption"
                  sx={{ color: "#9ca3af", mt: 0.5 }}
                >
                  Showing {data.length} of {totalEntries} vehicle
                </Typography>
              )}
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
                disabled={data.length === 0}
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

        {/* ================= FILTERS ================= */}
        <FilterCard>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography
                sx={{
                  color: "#9ca3af",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  mb: 0.8,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                }}
              >
                From Date
              </Typography>
              <StyledTextField
                fullWidth
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setPage(1);
                }}
                size="small"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography
                sx={{
                  color: "#9ca3af",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  mb: 0.8,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                }}
              >
                To Date
              </Typography>
              <StyledTextField
                fullWidth
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setPage(1);
                }}
                size="small"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setFromDate("");
                  setToDate("");
                  setPage(1);
                }}
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  py: 1.1,
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#38bdf8",
                    color: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Reset Filters
              </Button>
            </Grid>
          </Grid>
        </FilterCard>

        {/* ================= SUMMARY BAR ================= */}
        {data.length > 0 && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
            mb={2}
          >
            <TotalChip>
              <ShoppingCart sx={{ fontSize: 16 }} />
              Total (this page): ₹ {grandTotalSum.toLocaleString()}
            </TotalChip>

            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{
                bgcolor: "#111827",
                px: 2,
                py: 1,
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <Typography sx={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                Show:
              </Typography>
              <Select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(1);
                }}
                size="small"
                variant="standard"
                disableUnderline
                sx={{
                  color: "#e5e7eb",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  "& .MuiSvgIcon-root": { color: "#9ca3af" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#111827",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      "& .MuiMenuItem-root": {
                        color: "#e5e7eb",
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
                        "&.Mui-selected": {
                          bgcolor: "rgba(56, 189, 248, 0.15)",
                          color: "#38bdf8",
                        },
                      },
                    },
                  },
                }}
              >
                {rowsPerPageOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <Typography sx={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                entries
              </Typography>
            </Box>
          </Box>
        )}

        {/* ================= TABLE ================= */}
        <TableContainerDark>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Items</TableCell>
                <TableCell align="center">Total Qty</TableCell>
                <TableCell align="center">Grand Total</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Receipt sx={{ fontSize: 48, color: "#374151", mb: 1 }} />
                    <Typography sx={{ color: "#9ca3af", mb: 0.5 }}>
                      No sales found
                    </Typography>
                    <Typography sx={{ color: "#6b7280", fontSize: "0.75rem" }}>
                      Click "Load Vehicle" to create your first entry
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => {
                  const totalQty = (row.items || []).reduce(
                    (s, i) => s + (i.quantity || 0),
                    0
                  );
                  const rowTotal = getSaleTotal(row);

                  return (
                    <StyledTableRow key={row._id}>
                      <TableCell align="center">
                        <Chip
                          label={formatDate(row.date)}
                          size="small"
                          sx={{
                            bgcolor: "rgba(156, 163, 175, 0.1)",
                            color: "#e5e7eb",
                            border: "1px solid rgba(156, 163, 175, 0.2)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Chip
                          label={`${(row.items || []).length} items`}
                          size="small"
                          sx={{
                            bgcolor: "rgba(192, 132, 252, 0.1)",
                            color: "#c084fc",
                            border: "1px solid rgba(192, 132, 252, 0.3)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Chip
                          label={totalQty}
                          size="small"
                          sx={{
                            bgcolor: "rgba(56, 189, 248, 0.1)",
                            color: "#38bdf8",
                            border: "1px solid rgba(56, 189, 248, 0.3)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Typography
                          sx={{
                            color: "#34d399",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                          }}
                        >
                          ₹ {rowTotal.toLocaleString()}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Box display="flex" justifyContent="center" gap={0.5}>
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
                        </Box>
                      </TableCell>
                    </StyledTableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainerDark>

        {/* ================= PAGINATION ================= */}
        {totalEntries > 0 && (
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            mt={3}
          >
            <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
              Showing {(page - 1) * rowsPerPage + 1} to{" "}
              {Math.min(page * rowsPerPage, totalEntries)} of {totalEntries}{" "}
              entries
            </Typography>

            <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap">
              <PaginationButton
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
              >
                <FirstPage fontSize="small" />
              </PaginationButton>
              <PaginationButton
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <ChevronLeft fontSize="small" />
              </PaginationButton>

              {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                let pageNum;
                if (totalPages <= 5) pageNum = idx + 1;
                else if (page <= 3) pageNum = idx + 1;
                else if (page >= totalPages - 2) pageNum = totalPages - 4 + idx;
                else pageNum = page - 2 + idx;

                const isActive = page === pageNum;

                return (
                  <Button
                    key={idx}
                    onClick={() => handlePageChange(pageNum)}
                    sx={{
                      minWidth: "38px",
                      height: "38px",
                      p: 0,
                      borderRadius: "10px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: isActive ? "#ffffff" : "#9ca3af",
                      bgcolor: isActive ? "#38bdf8" : "transparent",
                      border: isActive
                        ? "1px solid #38bdf8"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: isActive
                        ? "0 4px 14px rgba(56, 189, 248, 0.3)"
                        : "none",
                      "&:hover": {
                        bgcolor: isActive
                          ? "#0ea5e9"
                          : "rgba(56, 189, 248, 0.1)",
                        borderColor: "#38bdf8",
                        color: isActive ? "#ffffff" : "#38bdf8",
                      },
                    }}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <PaginationButton
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                <ChevronRight fontSize="small" />
              </PaginationButton>
              <PaginationButton
                onClick={() => handlePageChange(totalPages)}
                disabled={page === totalPages}
              >
                <LastPage fontSize="small" />
              </PaginationButton>
            </Box>
          </Box>
        )}
      </Box>

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
              <Box>
                Load Vehicle Details
                <Typography
                  sx={{
                    color: "#9ca3af",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  {formatDate(selectedSale.date)}
                </Typography>
              </Box>
              <Chip
                label="VIEW"
                size="small"
                sx={{
                  bgcolor: "rgba(52, 211, 153, 0.1)",
                  color: "#34d399",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                }}
              />
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
              {/* Items table */}
              <TableContainer
                sx={{
                  bgcolor: "#111827",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <Table size="small">
                  <StyledTableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Item</TableCell>
                      <TableCell align="center">MRP</TableCell>
                      <TableCell align="center">Rate</TableCell>
                      <TableCell align="center">Qty</TableCell>
                      <TableCell align="center">Total</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {(selectedSale.items || []).map((item, idx) => (
                      <StyledTableRow key={idx}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              color: "#ffffff",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                            }}
                          >
                            {item.itemName}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">₹ {item.mrp}</TableCell>
                        <TableCell align="center">₹ {item.rate}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{
                              color: "#34d399",
                              fontWeight: 700,
                              fontSize: "0.85rem",
                            }}
                          >
                            ₹ {getItemTotal(item).toLocaleString()}
                          </Typography>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

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