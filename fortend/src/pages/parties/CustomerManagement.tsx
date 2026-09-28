import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Select,
  MenuItem,
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
  Person,
  People,
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface Customer {
  _id: string;
  companyName: string;
  displayName?: string;
  phone: string;
  billingAddress?: string;
  status?: string;
  notes?: string;
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
    minHeight: "42px",
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
    "&::placeholder": { color: "#6b7280", opacity: 1 },
  },
}));

const StyledTextarea = styled("textarea")(() => ({
  width: "100%",
  minHeight: "70px",
  padding: "10px 12px",
  borderRadius: "10px",
  backgroundColor: "#090d16",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "#ffffff",
  fontSize: "0.85rem",
  fontFamily: "inherit",
  outline: "none",
  resize: "vertical",
  transition: "all 0.2s ease",
  "&:focus": {
    borderColor: "#38bdf8",
    boxShadow: "0 0 0 3px rgba(56, 189, 248, 0.1)",
  },
  "&::placeholder": { color: "#6b7280" },
}));

const StyledSelect = styled(Select)(() => ({
  borderRadius: "10px",
  backgroundColor: "#090d16",
  color: "#ffffff",
  minHeight: "42px",
  width: "100%",
  fontSize: "0.85rem",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(56, 189, 248, 0.4)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#38bdf8",
    borderWidth: "1.5px",
  },
  "& .MuiSvgIcon-root": { color: "#9ca3af" },
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
  "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
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
  border: "1px solid rgba(56, 189, 248, 0.3)",
  padding: "20px 28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  boxShadow: "0 8px 20px rgba(56, 189, 248, 0.1)",
}));

// ===================== MAIN COMPONENT =====================

const CustomerManagement: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const isEditMode = !!id;

  // List state
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [listLoading, setListLoading] = useState(true);

  // Form state
  const [companyName, setCompanyName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [status, setStatus] = useState("active");
  const [notes, setNotes] = useState("");

  // Delete dialog
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form loading
  const [fetchLoading, setFetchLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ===================== FETCH CUSTOMERS (LIST) =====================
  const fetchCustomers = async () => {
    try {
      setListLoading(true);

      // If search has text → use /search endpoint
      // Else → use paginated / endpoint
      const isSearching = search.trim().length > 0;

      const res = isSearching
        ? await axios.get(`${API_URL}/customer/search`, {
            params: { query: search.trim(), limit: 100 },
            ...getAuthHeaders(),
          })
        : await axios.get(`${API_URL}/customer`, {
            params: { page: 1, limit: 100 },
            ...getAuthHeaders(),
          });

      if (res.data?.success === true) {
        setCustomers(res.data.data || []);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load customers");
        setCustomers([]);
      }
    } catch (error: any) {
      console.error("Fetch customers error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load customers");
      }
      setCustomers([]);
    } finally {
      setListLoading(false);
    }
  };

  // Load on mount + when search changes (debounced)
  useEffect(() => {
    if (isEditMode) return;

    const timer = setTimeout(() => {
      fetchCustomers();
    }, search ? 400 : 0);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, isEditMode]);

  // ===================== FETCH SINGLE CUSTOMER (FOR EDIT) =====================
  useEffect(() => {
    if (!isEditMode || !id) return;

    const fetchOne = async () => {
      try {
        setFetchLoading(true);

        const res = await axios.get(`${API_URL}/customer/${id}`, getAuthHeaders());

        if (res.data?.success === true) {
          const c = res.data.data;
          setCompanyName(c.companyName || "");
          setDisplayName(c.displayName || "");
          setPhone(c.phone || "");
          setBillingAddress(c.billingAddress || "");
          setStatus(c.status || "active");
          setNotes(c.notes || "");
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(res.data?.message || "Customer not found");
          setTimeout(() => navigate("/customers"), 1200);
        }
      } catch (error: any) {
        console.error("Fetch customer error:", error);
        if (error.response?.data?.message === "Unauthorized") {
          localStorage.removeItem("erptoken");
          navigate("/login");
        } else {
          toast.error(error.response?.data?.message || "Failed to load customer");
        }
      } finally {
        setFetchLoading(false);
      }
    };

    fetchOne();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]);

  // ===================== RESET FORM =====================
  const resetForm = () => {
    setCompanyName("");
    setDisplayName("");
    setPhone("");
    setBillingAddress("");
    setStatus("active");
    setNotes("");
  };

  // ===================== CREATE / UPDATE =====================
  const handleSave = async () => {
    // Validation
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }
    if (!phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      toast.error("Phone must be a valid 10-digit number");
      return;
    }

    try {
      setSaving(true);

      // Payload matches your controller's expectations
      const payload = {
        name: companyName.trim(),
        displayName: displayName.trim(),
        mobile: phone.trim(),
        address: billingAddress.trim(),
        status,
        notes: notes.trim(),
      };

      if (isEditMode && id) {
        // ---------- UPDATE ----------
        const res = await axios.put(
          `${API_URL}/customer/${id}`,
          payload,
          getAuthHeaders()
        );

        if (res.data?.success === true) {
          toast.success("Customer updated successfully");
          setTimeout(() => navigate("/customers"), 800);
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(res.data?.message || "Failed to update customer");
        }
      } else {
        // ---------- CREATE ----------
        const res = await axios.post(
          `${API_URL}/customer`,
          payload,
          getAuthHeaders()
        );

        if (res.data?.success === true) {
          toast.success("Customer created successfully");
          resetForm();
          navigate("/customers");
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(
            res.data?.errors?.[0] ||
              res.data?.message ||
              "Failed to create customer"
          );
        }
      }
    } catch (error: any) {
      console.error("Save customer error:", error);

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
            "Failed to save customer"
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
        `${API_URL}/customer/${deleteId}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Customer deleted successfully");
        setDeleteId(null);
        fetchCustomers();
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to delete customer");
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

  // ===================== EDIT MODE RENDER =====================
  if (isEditMode) {
    if (fetchLoading) {
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
          <Typography sx={{ color: "#9ca3af" }}>Loading customer...</Typography>
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
        <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
          <DarkBanner>
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/customers")}
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
                    borderColor: "#fbbf24",
                    color: "#fbbf24",
                    bgcolor: "rgba(251, 191, 36, 0.08)",
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
                    bgcolor: "#332208",
                    color: "#fbbf24",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EditIcon />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                    letterSpacing: 0.5,
                  }}
                >
                  EDIT CUSTOMER
                </Typography>
              </Box>
            </Box>
          </DarkBanner>

          <FormCard>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <FieldLabel>
                  Company Name <span style={{ color: "#f43f5e" }}>*</span>
                </FieldLabel>
                <StyledTextField
                  fullWidth
                  placeholder="e.g. Gupta Traders"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <FieldLabel>Display Name</FieldLabel>
                <StyledTextField
                  fullWidth
                  placeholder="e.g. Gupta Ji"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <FieldLabel>
                  Phone <span style={{ color: "#f43f5e" }}>*</span>
                </FieldLabel>
                <StyledTextField
                  fullWidth
                  placeholder="10-digit mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                <FieldLabel>Billing Address</FieldLabel>
                <StyledTextField
                  fullWidth
                  placeholder="e.g. Main Market, Delhi"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <FieldLabel>Status</FieldLabel>
                <StyledSelect
                  value={status}
                  onChange={(e) => setStatus(e.target.value as string)}
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
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="blocked">Blocked</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </StyledSelect>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FieldLabel>Notes</FieldLabel>
                <StyledTextarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes..."
                  maxLength={1000}
                />
              </Grid>
            </Grid>

            <Box
              display="flex"
              justifyContent="flex-end"
              gap={1.5}
              flexWrap="wrap"
              mt={3}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/customers")}
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
                startIcon={
                  saving ? (
                    <CircularProgress size={16} sx={{ color: "#0d1527" }} />
                  ) : (
                    <SaveIcon />
                  )
                }
                onClick={handleSave}
                disabled={saving}
                sx={{
                  bgcolor: "#fbbf24",
                  color: "#0d1527",
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 3,
                  py: 1.2,
                  boxShadow: "0 4px 14px rgba(251, 191, 36, 0.3)",
                  "&:hover": {
                    bgcolor: "#f59e0b",
                    boxShadow: "0 8px 20px rgba(251, 191, 36, 0.4)",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "rgba(251, 191, 36, 0.3)",
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                {saving ? "Updating..." : "Update Customer"}
              </Button>
            </Box>
          </FormCard>
        </Box>
      </Box>
    );
  }

  // ===================== LIST MODE RENDER =====================
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
                  <People />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                    letterSpacing: 0.5,
                  }}
                >
                  CUSTOMER MANAGEMENT
                </Typography>
              </Box>
            </Box>

            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchCustomers}
                disabled={listLoading}
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
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
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  resetForm();
                  navigate("/customers/create");
                }}
                sx={{
                  bgcolor: "#10b981",
                  color: "#ffffff",
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
                  "&:hover": { bgcolor: "#059669" },
                }}
              >
                New Customer
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* SEARCH */}
        <FormCard>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid size={{ xs: 12, md: 6 }}>
              <FieldLabel>Search Customer</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="Search by name, phone..."
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
                  label={`${customers.length} Customers`}
                  sx={{
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    color: "#38bdf8",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
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

        {/* TABLE */}
        <TableContainerDark>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell>Billing Address</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {listLoading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
                    <Typography sx={{ color: "#9ca3af", mt: 1 }}>
                      Loading customers...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Person sx={{ fontSize: 48, color: "#374151", mb: 1 }} />
                    <Typography sx={{ color: "#9ca3af", mb: 0.5 }}>
                      No customers found
                    </Typography>
                    <Typography sx={{ color: "#6b7280", fontSize: "0.75rem" }}>
                      {search ? "Try a different search" : 'Click "New Customer" to add'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((c, idx) => (
                  <StyledTableRow key={c._id}>
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
                        {c.companyName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                        {c.displayName || "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={c.phone}
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
                    <TableCell>
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                        {c.billingAddress || "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={c.status || "active"}
                        size="small"
                        sx={{
                          bgcolor:
                            c.status === "active"
                              ? "rgba(52, 211, 153, 0.1)"
                              : "rgba(156, 163, 175, 0.1)",
                          color: c.status === "active" ? "#34d399" : "#9ca3af",
                          border:
                            c.status === "active"
                              ? "1px solid rgba(52, 211, 153, 0.3)"
                              : "1px solid rgba(156, 163, 175, 0.3)",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          height: "24px",
                          textTransform: "capitalize",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={0.5}>
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/customers/edit/${c._id}`)}
                          sx={{
                            color: "#38bdf8",
                            "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => setDeleteId(c._id)}
                          sx={{
                            color: "#f43f5e",
                            "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
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

        {/* TOTAL CARD */}
        <TotalCard>
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 800,
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              letterSpacing: 0.5,
            }}
          >
            TOTAL CUSTOMERS:
          </Typography>
          <Typography
            sx={{
              color: "#38bdf8",
              fontWeight: 900,
              fontSize: { xs: "1.5rem", sm: "1.9rem" },
              textShadow: "0 0 20px rgba(56, 189, 248, 0.4)",
            }}
          >
            {customers.length}
          </Typography>
        </TotalCard>
      </Box>

      {/* DELETE DIALOG */}
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
          Delete Customer?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete this customer? This action cannot be
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

export default CustomerManagement;