import React, { useEffect, useState, useRef } from "react";
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
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Add as AddIcon,
  Delete as DeleteIcon,
  Search,
  Payments,
  Receipt,
  Person,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface Customer {
  _id: string;
  companyName?: string;
  displayName?: string;
  phone?: string;
  email?: string;
}

interface PaymentEntry {
  _id: string;
  customerId: Customer | string;
  customerName: string;
  paymentMode: string;
  transactionRef: string;
  amount: number;
  date: string;
  createdAt: string;
}

// ===================== CONSTANTS =====================

const PAYMENT_MODES = [
  "Cash Collection",
  "UPI / QR",
  "Bank Transfer",
  "Cheque",
  "Card",
  "Other",
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
    "&:hover fieldset": { borderColor: "rgba(167, 139, 250, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#a78bfa",
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
    borderColor: "rgba(167, 139, 250, 0.4)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#a78bfa",
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

const TableContainerDark = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  overflow: "hidden",
  marginBottom: "16px",
}));

const ItemsTable = styled("table")(() => ({
  width: "100%",
  borderCollapse: "collapse",
  "& thead": { backgroundColor: "#111827" },
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
  },
  "& tbody tr": {
    transition: "all 0.2s ease",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  "& tbody tr:hover": { backgroundColor: "rgba(167, 139, 250, 0.03)" },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "14px 12px",
    textAlign: "left",
  },
}));

const TotalCard = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(139, 92, 246, 0.3)",
  padding: "20px 28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  boxShadow: "0 8px 20px rgba(139, 92, 246, 0.15)",
}));

// ===================== HELPERS =====================

const getCustomerName = (c: Customer | string): string => {
  if (typeof c === "object" && c !== null) {
    return c.companyName || c.displayName || "-";
  }
  return "-";
};

const getCustomerPhone = (c: Customer | string): string => {
  if (typeof c === "object" && c !== null) {
    return c.phone || "";
  }
  return "";
};

// ===================== MAIN =====================

const PaymentReceivedEntry: React.FC = () => {
  const navigate = useNavigate();

  // List state
  const [entries, setEntries] = useState<PaymentEntry[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [grandTotal, setGrandTotal] = useState(0);
  const [saving, setSaving] = useState(false);

  // Customer search
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerResults, setCustomerResults] = useState<Customer[]>([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  // Form state
  const [paymentMode, setPaymentMode] = useState(PAYMENT_MODES[0]);
  const [transactionRef, setTransactionRef] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  // Delete dialog
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const customerRef = useRef<HTMLDivElement>(null);

  // ===================== OUTSIDE CLICK =====================
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (customerRef.current && !customerRef.current.contains(e.target as Node)) {
        setShowCustomerDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ===================== FETCH PAYMENTS =====================
  const fetchPayments = async () => {
    try {
      setListLoading(true);

      const res = await axios.get(`${API_URL}/payment-received`, {
        params: { page: 1, limit: 100 },
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setEntries(res.data.data || []);
        setGrandTotal(res.data.grandTotal || 0);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load payments");
        setEntries([]);
      }
    } catch (error: any) {
      console.error("Fetch payments error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load payments");
      }
      setEntries([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===================== SEARCH CUSTOMERS =====================
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoadingCustomers(true);

        const isSearch = customerSearch.trim().length > 0;

        const res = isSearch
          ? await axios.get(`${API_URL}/customer/search`, {
              params: { query: customerSearch, limit: 20 },
              ...getAuthHeaders(),
            })
          : await axios.get(`${API_URL}/customer`, {
              params: { page: 1, limit: 20 },
              ...getAuthHeaders(),
            });

        if (res.data?.success) {
          setCustomerResults(res.data.data || []);
        }
      } catch (err) {
        console.error("Customer fetch error:", err);
      } finally {
        setLoadingCustomers(false);
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerSearch]);

  // ===================== SELECT CUSTOMER =====================
  const handleSelectCustomer = (c: Customer) => {
    setSelectedCustomer(c);
    setCustomerSearch(c.companyName || c.displayName || "");
    setShowCustomerDropdown(false);
  };

  // ===================== RESET =====================
  const resetForm = () => {
    setSelectedCustomer(null);
    setCustomerSearch("");
    setPaymentMode(PAYMENT_MODES[0]);
    setTransactionRef("");
    setAmount("");
  };

  // ===================== CREATE (API) =====================
  const handleAddEntry = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer from the list");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        customerId: selectedCustomer._id,
        customerName:
          selectedCustomer.companyName || selectedCustomer.displayName || "-",
        paymentMode,
        transactionRef: transactionRef.trim() || "-",
        amount: Number(amount),
        date: new Date().toISOString().split("T")[0],
      };

      const res = await axios.post(
        `${API_URL}/payment-received`,
        payload,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Payment recorded successfully! 🎉");
        resetForm();
        fetchPayments();
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(
          res.data?.errors?.[0] || res.data?.message || "Failed to record payment"
        );
      }
    } catch (error: any) {
      console.error("Create payment error:", error);
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
            "Failed to record payment"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ===================== DELETE (API) =====================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const res = await axios.delete(
        `${API_URL}/payment-received/${deleteId}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Payment entry deleted");
        setDeleteId(null);
        fetchPayments();
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
                    borderColor: "#a78bfa",
                    color: "#a78bfa",
                    bgcolor: "rgba(167, 139, 250, 0.08)",
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
                    bgcolor: "#1e1b4b",
                    color: "#a78bfa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Payments />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                    letterSpacing: 0.5,
                  }}
                >
                  4. PAYMENT RECEIVED ENTRY
                </Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchPayments}
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
                  borderColor: "#a78bfa",
                  color: "#a78bfa",
                  bgcolor: "rgba(167, 139, 250, 0.08)",
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
                bgcolor: "#1e1b4b",
                color: "#a78bfa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
              }}
            >
              🪙
            </Box>
            <Typography
              sx={{
                color: "#a78bfa",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Record Payment Collection
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {/* CUSTOMER */}
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              ref={customerRef}
              sx={{ position: "relative" }}
            >
              <FieldLabel>Party / Customer Name</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. Verma Store"
                value={customerSearch}
                onChange={(e) => {
                  setCustomerSearch(e.target.value);
                  if (selectedCustomer) setSelectedCustomer(null);
                  setShowCustomerDropdown(true);
                }}
                onFocus={() => setShowCustomerDropdown(true)}
                InputProps={{
                  startAdornment: (
                    <Box
                      component="span"
                      sx={{ mr: 1, display: "flex", alignItems: "center" }}
                    >
                      {loadingCustomers ? (
                        <CircularProgress size={16} sx={{ color: "#6b7280" }} />
                      ) : (
                        <Search sx={{ color: "#6b7280", fontSize: 18 }} />
                      )}
                    </Box>
                  ),
                }}
              />

              {showCustomerDropdown && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 0.5,
                    bgcolor: "#111827",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    maxHeight: "280px",
                    overflowY: "auto",
                    zIndex: 50,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {customerResults.length === 0 ? (
                    <Box sx={{ p: 2 }}>
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                        {loadingCustomers
                          ? "Loading customers..."
                          : "No customers found"}
                      </Typography>
                    </Box>
                  ) : (
                    customerResults.map((c) => (
                      <Box
                        key={c._id}
                        onClick={() => handleSelectCustomer(c)}
                        sx={{
                          px: 2,
                          py: 1.3,
                          cursor: "pointer",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                          "&:hover": { bgcolor: "rgba(167, 139, 250, 0.1)" },
                          "&:last-child": { borderBottom: "none" },
                        }}
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          gap={1}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{ minWidth: 0, flex: 1 }}
                          >
                            <Person
                              sx={{
                                fontSize: 16,
                                color: "#a78bfa",
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{
                                color: "#ffffff",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {c.companyName || c.displayName || "-"}
                            </Typography>
                          </Box>
                          {c.phone && (
                            <Typography
                              sx={{
                                color: "#9ca3af",
                                fontSize: "0.7rem",
                                flexShrink: 0,
                              }}
                            >
                              📞 {c.phone}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              )}
            </Grid>

            {/* PAYMENT MODE */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FieldLabel>Payment Mode</FieldLabel>
              <StyledSelect
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value as string)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#111827",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      "& .MuiMenuItem-root": {
                        color: "#e5e7eb",
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(167, 139, 250, 0.1)" },
                        "&.Mui-selected": {
                          bgcolor: "rgba(167, 139, 250, 0.15)",
                          color: "#a78bfa",
                        },
                      },
                    },
                  },
                }}
              >
                {PAYMENT_MODES.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Grid>

            {/* TRANSACTION REF */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FieldLabel>Transaction Ref / Note</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. UPI Ref #938210"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
              />
            </Grid>

            {/* AMOUNT */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FieldLabel>Amount Received (₹)</FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="2500"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value === "" ? "" : Number(e.target.value))
                }
                inputProps={{ min: 0, step: 1 }}
              />
            </Grid>
          </Grid>

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
              onClick={handleAddEntry}
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
              {saving ? "Logging..." : "Log Payment Received"}
            </Button>
          </Box>
        </FormCard>

        {/* ================= LOG TABLE ================= */}
        <TableContainerDark>
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
              COLLECTIONS & PAYMENTS LOG
            </Typography>
            <Chip
              label={`${entries.length} Payments Received`}
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

          <Box sx={{ overflowX: "auto" }}>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th>Party / Customer</th>
                  <th style={{ textAlign: "center" }}>Payment Mode</th>
                  <th style={{ textAlign: "center" }}>Ref / Remarks</th>
                  <th style={{ textAlign: "center" }}>Amount (₹)</th>
                  <th style={{ textAlign: "center", width: "80px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {listLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <CircularProgress sx={{ color: "#a78bfa" }} size={32} />
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading payments...
                      </Typography>
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
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
                        No payments logged yet
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
                      >
                        Log your first payment above
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  entries.map((row, idx) => (
                    <tr key={row._id}>
                      <td style={{ textAlign: "center", color: "#6b7280" }}>
                        {idx + 1}
                      </td>
                      <td>
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {row.customerName || getCustomerName(row.customerId)}
                        </Typography>
                        {getCustomerPhone(row.customerId) && (
                          <Typography
                            sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.3 }}
                          >
                            📞 {getCustomerPhone(row.customerId)}
                          </Typography>
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Chip
                          label={row.paymentMode}
                          size="small"
                          sx={{
                            bgcolor: "rgba(167, 139, 250, 0.1)",
                            color: "#a78bfa",
                            border: "1px solid rgba(167, 139, 250, 0.3)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            height: "24px",
                          }}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                          {row.transactionRef}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Typography
                          sx={{
                            color: "#a78bfa",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                          }}
                        >
                          ₹{" "}
                          {row.amount.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
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
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </ItemsTable>
          </Box>
        </TableContainerDark>

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
            TOTAL PAYMENTS RECEIVED:
          </Typography>
          <Typography
            sx={{
              color: "#a78bfa",
              fontWeight: 900,
              fontSize: { xs: "1.5rem", sm: "1.9rem" },
              letterSpacing: 0.5,
              textShadow: "0 0 20px rgba(167, 139, 250, 0.4)",
            }}
          >
            ₹{" "}
            {grandTotal.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </TotalCard>

        <Typography
          sx={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.75rem",
            mt: 4,
            mb: 2,
          }}
        >
          LogiTrack ERP Vehicle Inventory & Settlement System © 2026. All rights
          reserved.
        </Typography>
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
          Delete Payment Entry?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete this payment entry? This action
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
              "&.Mui-disabled": {
                bgcolor: "rgba(244, 63, 94, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentReceivedEntry;