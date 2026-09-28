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
    fontWeight: 500,
    padding: "10px 12px",
    "&::placeholder": { color: "#6b7280", opacity: 1 },
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&[type=number]": { MozAppearance: "textfield" },
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

const TableContainerDark = styled(TableContainer)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  overflow: "hidden",
  marginBottom: "16px",
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
  boxShadow: "0 8px 20px rgba(192, 132, 252, 0.1)",
}));

// ===================== MAIN COMPONENT =====================

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [itemName, setItemName] = useState("");
  const [mrp, setMrp] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [unit, setUnit] = useState("");

  const [saving, setSaving] = useState(false);

  // List state
  const [products, setProducts] = useState<Product[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Delete
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ===================== FETCH PRODUCTS =====================
  const fetchProducts = async () => {
    try {
      setListLoading(true);

      const isSearching = search.trim().length > 0;

      const res = isSearching
        ? await axios.get(`${API_URL}/product/search`, {
            params: { query: search.trim(), limit: 100 },
            ...getAuthHeaders(),
          })
        : await axios.get(`${API_URL}/product`, {
            params: { page: 1, limit: 100 },
            ...getAuthHeaders(),
          });

      if (res.data?.success === true) {
        setProducts(res.data.data || []);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load products");
        setProducts([]);
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
      setListLoading(false);
    }
  };

  // Load on mount + when search changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, search ? 400 : 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // ===================== RESET =====================
  const resetForm = () => {
    setItemName("");
    setMrp("");
    setRate("");
    setUnit("");
  };

  // ===================== SAVE (CREATE) =====================
  const handleSave = async () => {
    // Validation
    if (!itemName.trim()) {
      toast.error("Item name is required");
      return;
    }
    if (mrp === "" || Number(mrp) < 0) {
      toast.error("Please enter a valid MRP");
      return;
    }
    if (rate === "" || Number(rate) < 0) {
      toast.error("Please enter a valid Rate");
      return;
    }
    if (!unit.trim()) {
      toast.error("Unit is required");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        itemName: itemName.trim(),
        mrp: Number(mrp),
        rate: Number(rate),
        unit: unit.trim(),
      };

      const res = await axios.post(
        `${API_URL}/product`,
        payload,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Product added successfully! 🎉");
        resetForm();
        fetchProducts();
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(
          res.data?.errors?.[0] ||
            res.data?.message ||
            "Failed to add product"
        );
      }
    } catch (error: any) {
      console.error("Create product error:", error);
      if (!error.response) {
        toast.error("Network error! Please check your connection");
      } else if (error.response?.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(
          error.response?.data?.errors?.[0] ||
            error.response?.data?.message ||
            "Failed to add product"
        );
      }
    } finally {
      setSaving(false);
    }
  };

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
                    ADD PRODUCT
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchProducts}
              disabled={listLoading}
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
          </Box>
        </DarkBanner>

        {/* ================= FORM ================= */}
        <FormCard>
          <Box display="flex" alignItems="center" gap={1} mb={2.5}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "8px",
                bgcolor: "#2e1065",
                color: "#c084fc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
              }}
            >
              📦
            </Box>
            <Typography
              sx={{
                color: "#c084fc",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Add New Product
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {/* ITEM NAME */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FieldLabel>
                Item Name <span style={{ color: "#f43f5e" }}>*</span>
              </FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. Noodles Plain"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Grid>

            {/* MRP */}
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <FieldLabel>
                MRP (₹) <span style={{ color: "#f43f5e" }}>*</span>
              </FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="5"
                value={mrp}
                onChange={(e) =>
                  setMrp(e.target.value === "" ? "" : Number(e.target.value))
                }
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>

            {/* RATE */}
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <FieldLabel>
                Rate (₹) <span style={{ color: "#f43f5e" }}>*</span>
              </FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="4.5"
                value={rate}
                onChange={(e) =>
                  setRate(e.target.value === "" ? "" : Number(e.target.value))
                }
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>

            {/* UNIT */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FieldLabel>
                Unit <span style={{ color: "#f43f5e" }}>*</span>
              </FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. pcs, kg, box"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </Grid>
          </Grid>

          {/* Add Button */}
          <Box display="flex" justifyContent="flex-end" mt={2.5}>
            <Button
              variant="contained"
              startIcon={
                saving ? (
                  <CircularProgress size={16} sx={{ color: "#ffffff" }} />
                ) : (
                  <AddIcon />
                )
              }
              onClick={handleSave}
              disabled={saving}
              sx={{
                bgcolor: "#8b5cf6",
                color: "#ffffff",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                borderRadius: "10px",
                px: 3,
                py: 1.2,
                fontSize: "0.8rem",
                boxShadow: "0 4px 14px rgba(139, 92, 246, 0.3)",
                "&:hover": {
                  bgcolor: "#7c3aed",
                  boxShadow: "0 8px 20px rgba(139, 92, 246, 0.4)",
                },
                "&.Mui-disabled": {
                  bgcolor: "rgba(139, 92, 246, 0.3)",
                  color: "rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              {saving ? "Adding..." : "Add Product"}
            </Button>
          </Box>
        </FormCard>

        {/* ================= SEARCH ================= */}
        <FormCard>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid size={{ xs: 12, md: 6 }}>
              <FieldLabel>Search Product</FieldLabel>
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

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                display="flex"
                gap={1}
                justifyContent={{ xs: "flex-start", md: "flex-end" }}
              >
                <Chip
                  label={`${products.length} Products`}
                  sx={{
                    bgcolor: "rgba(192, 132, 252, 0.1)",
                    color: "#c084fc",
                    border: "1px solid rgba(192, 132, 252, 0.3)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    height: "36px",
                    borderRadius: "10px",
                    px: 2,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </FormCard>

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
              {listLoading ? (
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
                        : "Add your first product above"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((p, idx) => (
                  <StyledTableRow key={p._id}>
                    <TableCell align="center" sx={{ color: "#6b7280" }}>
                      {idx + 1}
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

        {/* ================= TOTAL CARD ================= */}
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
            {products.length}
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

export default AddProduct;