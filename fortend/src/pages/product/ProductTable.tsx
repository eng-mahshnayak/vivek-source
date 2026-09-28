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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search,
  Inventory2,
  Refresh as RefreshIcon,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface Product {
  _id: string;
  itemName: string;
  mrp: number;
  rate: number;
  unit: string;
  createdAt?: string;
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

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "42px",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
    "&:hover fieldset": { borderColor: "rgba(192, 132, 252, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#c084fc",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    padding: "10px 12px",
    "&::placeholder": { color: "#6b7280", opacity: 1 },
  },
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
  "&:hover": { backgroundColor: "rgba(192, 132, 252, 0.04)" },
  "& .MuiTableCell-body": {
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "14px 12px",
  },
}));

const TotalCard = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(192, 132, 252, 0.3)",
  padding: "20px 28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  marginTop: "16px",
  boxShadow: "0 8px 20px rgba(192, 132, 252, 0.1)",
}));

const PaginationButton = styled(IconButton)(() => ({
  width: "38px",
  height: "38px",
  borderRadius: "10px",
  color: "#9ca3af",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:hover": {
    bgcolor: "rgba(192, 132, 252, 0.1)",
    borderColor: "#c084fc",
    color: "#c084fc",
  },
  "&.Mui-disabled": {
    color: "rgba(156, 163, 175, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
}));

// ===================== MAIN COMPONENT =====================

const ProductTable: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rowsPerPageOptions] = useState([25, 50, 100, 200]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Delete
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ===================== FETCH =====================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const isSearching = search.trim().length > 0;

      if (isSearching) {
        // Use /search endpoint (no pagination)
        const res = await axios.get(`${API_URL}/product/search`, {
          params: { query: search.trim(), limit: 200 },
          ...getAuthHeaders(),
        });

        if (res.data?.success === true) {
          setProducts(res.data.data || []);
          setTotalEntries((res.data.data || []).length);
          setTotalPages(1);
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(res.data?.message || "Failed to load products");
          setProducts([]);
        }
      } else {
        // Use paginated endpoint
        const res = await axios.get(`${API_URL}/product`, {
          params: { page, limit: rowsPerPage },
          ...getAuthHeaders(),
        });

        if (res.data?.success === true) {
          setProducts(res.data.data || []);
          setTotalEntries(res.data.total || 0);
          setTotalPages(res.data.pages || 1);
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(res.data?.message || "Failed to load products");
          setProducts([]);
        }
      }
    } catch (error: any) {
      console.error("Fetch products error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load products");
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        // Search mode — always start at page 1
        setPage(1);
      }
      fetchProducts();
    }, search ? 400 : 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, rowsPerPage]);

  // ===================== DELETE =====================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const res = await axios.delete(
        `${API_URL}/product/${deleteId}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Product deleted successfully");
        setDeleteId(null);
        fetchProducts();
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to delete product");
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    } finally {
      setDeleting(false);
    }
  };

  // ===================== PAGINATION =====================
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        {/* ================= HEADER ================= */}
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
                    borderColor: "#c084fc",
                    color: "#c084fc",
                    bgcolor: "rgba(192, 132, 252, 0.08)",
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
                    bgcolor: "#2e1065",
                    color: "#c084fc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Inventory2 />
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#c084fc",
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    Product Management
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                      letterSpacing: 0.5,
                    }}
                  >
                    ALL PRODUCTS
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchProducts}
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
                    borderColor: "#c084fc",
                    color: "#c084fc",
                    bgcolor: "rgba(192, 132, 252, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/products/add")}
                sx={{
                  bgcolor: "#8b5cf6",
                  color: "#ffffff",
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  boxShadow: "0 4px 14px rgba(139, 92, 246, 0.3)",
                  "&:hover": { bgcolor: "#7c3aed" },
                }}
              >
                Add Product
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= SEARCH ================= */}
        <FilterCard>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid size={{ xs: 12, md: 8 }}>
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
                Search Product
              </Typography>
              <StyledTextField
                fullWidth
                placeholder="Search by item name or unit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box
                      component="span"
                      sx={{ mr: 1, display: "flex", alignItems: "center" }}
                    >
                      <Search sx={{ color: "#6b7280", fontSize: 18 }} />
                    </Box>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" justifyContent={{ xs: "flex-start", md: "flex-end" }} gap={1}>
                {search && (
                  <Button
                    variant="outlined"
                    onClick={() => setSearch("")}
                    sx={{
                      color: "#e5e7eb",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      fontWeight: 700,
                      textTransform: "none",
                      borderRadius: "10px",
                      px: 2.5,
                      py: 1.1,
                      fontSize: "0.8rem",
                      "&:hover": {
                        borderColor: "#f43f5e",
                        color: "#f43f5e",
                        bgcolor: "rgba(244, 63, 94, 0.08)",
                      },
                    }}
                  >
                    Clear Search
                  </Button>
                )}
                <Chip
                  label={`${products.length} Products`}
                  sx={{
                    bgcolor: "rgba(192, 132, 252, 0.1)",
                    color: "#c084fc",
                    border: "1px solid rgba(192, 132, 252, 0.3)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    height: "42px",
                    borderRadius: "10px",
                    px: 2,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </FilterCard>

        {/* ================= ROWS PER PAGE ================= */}
        {!search && totalEntries > 0 && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
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
                        "&:hover": { bgcolor: "rgba(192, 132, 252, 0.1)" },
                        "&.Mui-selected": {
                          bgcolor: "rgba(192, 132, 252, 0.15)",
                          color: "#c084fc",
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
                <TableCell align="center">#</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell align="center">MRP (₹)</TableCell>
                <TableCell align="center">Rate (₹)</TableCell>
                <TableCell align="center">Unit</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <CircularProgress sx={{ color: "#c084fc" }} size={32} />
                    <Typography sx={{ color: "#9ca3af", mt: 1 }}>
                      Loading products...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Inventory2
                      sx={{ fontSize: 48, color: "#374151", mb: 1 }}
                    />
                    <Typography sx={{ color: "#9ca3af", mb: 0.5 }}>
                      No products found
                    </Typography>
                    <Typography sx={{ color: "#6b7280", fontSize: "0.75rem" }}>
                      {search
                        ? "Try a different search"
                        : "Click 'Add Product' to create one"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((p, idx) => (
                  <StyledTableRow key={p._id}>
                    <TableCell align="center" sx={{ color: "#6b7280" }}>
                      {(page - 1) * rowsPerPage + idx + 1}
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                        }}
                      >
                        {p.itemName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`₹ ${p.mrp}`}
                        size="small"
                        sx={{
                          bgcolor: "rgba(156, 163, 175, 0.1)",
                          color: "#e5e7eb",
                          border: "1px solid rgba(156, 163, 175, 0.2)",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          height: "24px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        sx={{
                          color: "#fbbf24",
                          fontWeight: 800,
                          fontSize: "0.9rem",
                        }}
                      >
                        ₹ {p.rate}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={p.unit}
                        size="small"
                        sx={{
                          bgcolor: "rgba(56, 189, 248, 0.1)",
                          color: "#38bdf8",
                          border: "1px solid rgba(56, 189, 248, 0.3)",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          height: "24px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={0.5}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigate(`/products/edit/${p._id}`)
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
                          onClick={() => setDeleteId(p._id)}
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainerDark>

        {/* ================= PAGINATION ================= */}
        {!search && totalEntries > 0 && (
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
                else if (page >= totalPages - 2)
                  pageNum = totalPages - 4 + idx;
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
                      bgcolor: isActive ? "#8b5cf6" : "transparent",
                      border: isActive
                        ? "1px solid #8b5cf6"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: isActive
                        ? "0 4px 14px rgba(139, 92, 246, 0.3)"
                        : "none",
                      "&:hover": {
                        bgcolor: isActive
                          ? "#7c3aed"
                          : "rgba(139, 92, 246, 0.1)",
                        borderColor: "#8b5cf6",
                        color: isActive ? "#ffffff" : "#c084fc",
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

        {/* ================= TOTAL ================= */}
        <TotalCard>
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 800,
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              letterSpacing: 0.5,
            }}
          >
            TOTAL PRODUCTS:
          </Typography>
          <Typography
            sx={{
              color: "#c084fc",
              fontWeight: 900,
              fontSize: { xs: "1.5rem", sm: "1.9rem" },
              textShadow: "0 0 20px rgba(192, 132, 252, 0.4)",
            }}
          >
            {search ? products.length : totalEntries}
          </Typography>
        </TotalCard>
      </Box>

      {/* ================= DELETE DIALOG ================= */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        PaperProps={{
          sx: {
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete Product?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteId(null)}
            disabled={deleting}
            sx={{
              color: "#9ca3af",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
            }}
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
    </Box>
  );
};

export default ProductTable;