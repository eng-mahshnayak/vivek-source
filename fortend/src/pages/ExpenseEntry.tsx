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
  MenuItem,
  Select,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Receipt,
  LocalGasStation,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface Expense {
  _id: string;
  category: string;
  description: string;
  paidVia: string;
  amount: number;
  date: string;
  createdAt: string;
}

// ===================== CONSTANTS =====================

const EXPENSE_CATEGORIES = [
  "Diesel / Fuel",
  "Toll / Parking",
  "Driver Allowance",
  "Food / Refreshment",
  "Vehicle Repair",
  "Loading / Unloading",
  "Other",
];

const PAYMENT_METHODS = [
  "Cash from Route Collection",
  "Company Cash",
  "UPI / Online",
  "Credit",
];

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
    "&:hover fieldset": { borderColor: "rgba(244, 63, 94, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#f43f5e",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "10px 12px",
    "&::placeholder": { color: "#6b7280", opacity: 1 },
  },
}));

const StyledSelect = styled(Select)(() => ({
  borderRadius: "10px",
  backgroundColor: "#090d16",
  color: "#ffffff",
  height: "42px",
  width: "100%",
  fontSize: "0.85rem",
  fontWeight: 500,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(244, 63, 94, 0.4)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#f43f5e",
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

const TableContainer = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
}));

const TableHeaderRow = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "50px 1.2fr 2fr 2fr 1.2fr 80px",
  alignItems: "center",
  padding: "16px 20px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  "& > *": {
    color: "#9ca3af",
    fontWeight: 700,
    fontSize: "0.7rem",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
}));

const TableBodyRow = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "50px 1.2fr 2fr 2fr 1.2fr 80px",
  alignItems: "center",
  padding: "16px 20px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  transition: "all 0.2s ease",
  "&:hover": { backgroundColor: "rgba(244, 63, 94, 0.05)" },
  "& > *": { color: "#e5e7eb", fontSize: "0.85rem", fontWeight: 500 },
}));

const TotalCard = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(244, 63, 94, 0.3)",
  padding: "20px 28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "16px",
  boxShadow: "0 8px 20px rgba(244, 63, 94, 0.1)",
}));

// ===================== MAIN =====================

const ExpenseEntry: React.FC = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [grandTotal, setGrandTotal] = useState(0);
  const [saving, setSaving] = useState(false);

  // Form state
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [paidVia, setPaidVia] = useState(PAYMENT_METHODS[0]);
  const [amount, setAmount] = useState<number | "">("");

  // Edit mode
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete dialogs
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);

  // ===================== FETCH =====================
  const fetchExpenses = async () => {
    try {
      setListLoading(true);

      const res = await axios.get(`${API_URL}/expense`, {
        params: { page: 1, limit: 100 },
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setExpenses(res.data.data || []);
        setGrandTotal(res.data.grandTotal || 0);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load expenses");
        setExpenses([]);
      }
    } catch (error: any) {
      console.error("Fetch expenses error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load expenses");
      }
      setExpenses([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const resetForm = () => {
    setCategory(EXPENSE_CATEGORIES[0]);
    setDescription("");
    setPaidVia(PAYMENT_METHODS[0]);
    setAmount("");
    setEditingId(null);
  };

  // ===================== CREATE / UPDATE =====================
  const handleAddOrUpdate = async () => {
    if (!description.trim()) {
      toast.error("Please enter description");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        category,
        description: description.trim(),
        paidVia,
        amount: Number(amount),
        date: new Date().toISOString().split("T")[0],
      };

      if (editingId) {
        // ---------- UPDATE ----------
        const res = await axios.put(
          `${API_URL}/expense/${editingId}`,
          payload,
          getAuthHeaders()
        );

        if (res.data?.success === true) {
          toast.success("Expense updated successfully");
          resetForm();
          fetchExpenses();
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(
            res.data?.errors?.[0] ||
              res.data?.message ||
              "Failed to update expense"
          );
        }
      } else {
        // ---------- CREATE ----------
        const res = await axios.post(
          `${API_URL}/expense`,
          payload,
          getAuthHeaders()
        );

        if (res.data?.success === true) {
          toast.success("Expense added successfully");
          resetForm();
          fetchExpenses();
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(
            res.data?.errors?.[0] ||
              res.data?.message ||
              "Failed to add expense"
          );
        }
      }
    } catch (error: any) {
      console.error("Save expense error:", error);
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
            "Failed to save expense"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ===================== EDIT =====================
  const handleEdit = (expense: Expense) => {
    setEditingId(expense._id);
    setCategory(expense.category);
    setDescription(expense.description);
    setPaidVia(expense.paidVia);
    setAmount(expense.amount);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ===================== DELETE =====================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const res = await axios.delete(
        `${API_URL}/expense/${deleteId}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Expense deleted");
        if (editingId === deleteId) resetForm();
        setDeleteId(null);
        fetchExpenses();
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to delete");
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

  const handleDeleteAll = async () => {
    try {
      setDeleting(true);

      const res = await axios.delete(
        `${API_URL}/expense/delete-all`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success(res.data?.message || "All expenses deleted");
        setDeleteAllOpen(false);
        resetForm();
        fetchExpenses();
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
                    bgcolor: "#31121d",
                    color: "#f43f5e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocalGasStation />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                    letterSpacing: 0.5,
                    color: "#ffffff",
                  }}
                >
                  6. ROUTE & TRIP EXPENSES ENTRY
                </Typography>
              </Box>
            </Box>

            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchExpenses}
                disabled={listLoading}
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
                Refresh
              </Button>

              {expenses.length > 0 && (
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
                    py: 0.9,
                    fontSize: "0.8rem",
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

        {/* ================= FORM ================= */}
        <FormCard>
          <Box display="flex" alignItems="center" gap={1} mb={2.5}>
            <Receipt sx={{ color: "#f43f5e", fontSize: 22 }} />
            <Typography
              sx={{
                color: "#f43f5e",
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Log Vehicle & Driver Expenses
            </Typography>
            {editingId && (
              <Chip
                label="EDITING"
                size="small"
                sx={{
                  ml: 1,
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

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FieldLabel>Expense Category</FieldLabel>
              <StyledSelect
                value={category}
                onChange={(e) => setCategory(e.target.value as string)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#111827",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      "& .MuiMenuItem-root": {
                        color: "#e5e7eb",
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
                        "&.Mui-selected": {
                          bgcolor: "rgba(244, 63, 94, 0.15)",
                          color: "#f43f5e",
                        },
                      },
                    },
                  },
                }}
              >
                {EXPENSE_CATEGORIES.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FieldLabel>Description / Reason</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. 20 Liters Diesel at HP Pump"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FieldLabel>Payment By</FieldLabel>
              <StyledSelect
                value={paidVia}
                onChange={(e) => setPaidVia(e.target.value as string)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#111827",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      "& .MuiMenuItem-root": {
                        color: "#e5e7eb",
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
                        "&.Mui-selected": {
                          bgcolor: "rgba(244, 63, 94, 0.15)",
                          color: "#f43f5e",
                        },
                      },
                    },
                  },
                }}
              >
                {PAYMENT_METHODS.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FieldLabel>Amount (₹)</FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="850"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value === "" ? "" : Number(e.target.value))
                }
                InputProps={{
                  inputProps: { min: 0, step: 1 },
                }}
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" mt={2.5} gap={1.5}>
            {editingId && (
              <Button
                variant="outlined"
                onClick={resetForm}
                disabled={saving}
                sx={{
                  color: "#9ca3af",
                  borderColor: "rgba(156, 163, 175, 0.3)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 3,
                  py: 1,
                  fontSize: "0.85rem",
                  "&:hover": {
                    borderColor: "#9ca3af",
                    bgcolor: "rgba(156, 163, 175, 0.08)",
                  },
                }}
              >
                Cancel
              </Button>
            )}

            <Button
              variant="contained"
              startIcon={
                saving ? (
                  <CircularProgress size={16} sx={{ color: "#ffffff" }} />
                ) : (
                  <AddIcon />
                )
              }
              onClick={handleAddOrUpdate}
              disabled={saving}
              sx={{
                bgcolor: "#f43f5e",
                color: "#ffffff",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                borderRadius: "10px",
                px: 3,
                py: 1.2,
                fontSize: "0.8rem",
                boxShadow: "0 4px 14px rgba(244, 63, 94, 0.3)",
                "&:hover": {
                  bgcolor: "#e11d48",
                  boxShadow: "0 8px 20px rgba(244, 63, 94, 0.4)",
                },
                "&.Mui-disabled": {
                  bgcolor: "rgba(244, 63, 94, 0.3)",
                  color: "rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Expense"
                : "Add Expense Entry"}
            </Button>
          </Box>
        </FormCard>

        {/* ================= LOG SHEET ================= */}
        <TableContainer>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={2}
            sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "0.95rem",
                letterSpacing: 0.5,
              }}
            >
              ROUTE EXPENSES LOG SHEET
            </Typography>
            <Chip
              label={`${expenses.length} Expenses Logged`}
              size="small"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.05)",
                color: "#9ca3af",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: "26px",
              }}
            />
          </Box>

          <TableHeaderRow>
            <Box>#</Box>
            <Box>Category</Box>
            <Box>Description</Box>
            <Box>Paid Via</Box>
            <Box textAlign="right">Amount (₹)</Box>
            <Box textAlign="center">Action</Box>
          </TableHeaderRow>

          {listLoading ? (
            <Box py={6} textAlign="center">
              <CircularProgress sx={{ color: "#f43f5e" }} size={32} />
              <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}>
                Loading expenses...
              </Typography>
            </Box>
          ) : expenses.length === 0 ? (
            <Box py={6} textAlign="center">
              <Typography
                sx={{ color: "#9ca3af", fontSize: "0.9rem", mb: 0.5 }}
              >
                No expenses logged yet
              </Typography>
              <Typography sx={{ color: "#6b7280", fontSize: "0.75rem" }}>
                Add your first expense entry above
              </Typography>
            </Box>
          ) : (
            expenses.map((row, index) => (
              <TableBodyRow key={row._id}>
                <Box sx={{ color: "#6b7280 !important" }}>{index + 1}</Box>
                <Box>
                  <Typography
                    sx={{
                      color: "#ffffff !important",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    {row.category}
                  </Typography>
                </Box>
                <Box>{row.description}</Box>
                <Box>
                  <Chip
                    label={row.paidVia}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      color: "#e5e7eb",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      height: "26px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    color: "#f43f5e !important",
                    fontWeight: 800,
                    textAlign: "right",
                    fontSize: "0.95rem !important",
                  }}
                >
                  ₹ {row.amount.toLocaleString("en-IN")}
                </Box>
                <Box display="flex" justifyContent="center" gap={0.5}>
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
              </TableBodyRow>
            ))
          )}
        </TableContainer>

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
            TOTAL TRIP EXPENSES:
          </Typography>
          <Typography
            sx={{
              color: "#f43f5e",
              fontWeight: 900,
              fontSize: { xs: "1.5rem", sm: "1.9rem" },
              letterSpacing: 0.5,
              textShadow: "0 0 20px rgba(244, 63, 94, 0.4)",
            }}
          >
            ₹ {grandTotal.toLocaleString("en-IN")}
          </Typography>
        </TotalCard>
      </Box>

      {/* ================= DELETE SINGLE DIALOG ================= */}
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
          Delete Expense?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete this expense entry? This action
            cannot be undone.
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

      {/* ================= DELETE ALL DIALOG ================= */}
      <Dialog
        open={deleteAllOpen}
        onClose={() => setDeleteAllOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete All Expenses?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            This will permanently remove all {expenses.length} expense entries.
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteAllOpen(false)}
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

export default ExpenseEntry;