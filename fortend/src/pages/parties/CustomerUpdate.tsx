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
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Save as SaveIcon,
  Edit as EditIcon,
  Warning,
} from "@mui/icons-material";

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
  padding: "24px",
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
    "&:hover fieldset": { borderColor: "rgba(251, 191, 36, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#fbbf24",
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
  minHeight: "90px",
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
    borderColor: "#fbbf24",
    boxShadow: "0 0 0 3px rgba(251, 191, 36, 0.1)",
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
    borderColor: "rgba(251, 191, 36, 0.4)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fbbf24",
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

const SectionTitle = styled(Typography)(() => ({
  color: "#fbbf24",
  fontWeight: 800,
  fontSize: "0.8rem",
  letterSpacing: 1.2,
  textTransform: "uppercase",
  marginBottom: "16px",
  paddingBottom: "10px",
  borderBottom: "1px solid rgba(251, 191, 36, 0.15)",
}));

// ===================== MAIN =====================

const CustomerUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [companyName, setCompanyName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [status, setStatus] = useState("active");
  const [notes, setNotes] = useState("");

  const [fetchLoading, setFetchLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // ===================== FETCH CUSTOMER =====================
  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setFetchLoading(false);
      return;
    }

    const fetchCustomer = async () => {
      try {
        setFetchLoading(true);

        const res = await axios.get(
          `${API_URL}/customer/${id}`,
          getAuthHeaders()
        );

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
          setNotFound(true);
        }
      } catch (error: any) {
        console.error("Fetch error:", error);
        if (error.response?.data?.message === "Unauthorized") {
          localStorage.removeItem("erptoken");
          navigate("/login");
        } else {
          toast.error(
            error.response?.data?.message || "Failed to load customer"
          );
          setNotFound(true);
        }
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ===================== UPDATE =====================
  const handleUpdate = async () => {
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

      const payload = {
        name: companyName.trim(),
        displayName: displayName.trim(),
        mobile: phone.trim(),
        address: billingAddress.trim(),
        status,
        notes: notes.trim(),
      };

      const res = await axios.put(
        `${API_URL}/customer/${id}`,
        payload,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Customer updated successfully! 🎉");
        setTimeout(() => navigate("/customer-entry"), 900);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(
          res.data?.errors?.[0] ||
            res.data?.message ||
            "Failed to update customer"
        );
      }
    } catch (error: any) {
      console.error("Update error:", error);
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
            "Failed to update customer"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ===================== LOADING =====================
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
        <CircularProgress sx={{ color: "#fbbf24" }} />
        <Typography sx={{ color: "#9ca3af" }}>Loading customer...</Typography>
      </Box>
    );
  }

  // ===================== NOT FOUND =====================
  if (notFound) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#090d16",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Box
          sx={{
            bgcolor: "#111827",
            border: "1px solid rgba(244, 63, 94, 0.3)",
            borderRadius: "16px",
            p: 4,
            textAlign: "center",
            maxWidth: 400,
          }}
        >
          <Warning sx={{ fontSize: 48, color: "#f43f5e", mb: 1 }} />
          <Typography sx={{ color: "#ffffff", fontWeight: 700, mb: 2 }}>
            Customer not found
          </Typography>
          <Button
            onClick={() => navigate("/customers")}
            variant="contained"
            sx={{
              bgcolor: "#f43f5e",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              "&:hover": { bgcolor: "#e11d48" },
            }}
          >
            Back to Customers
          </Button>
        </Box>
      </Box>
    );
  }

  // ===================== MAIN RENDER =====================
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
        {/* ================= HEADER ================= */}
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
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#fbbf24",
                    letterSpacing: 0.5,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                  }}
                >
                  Customer Management · Edit Mode
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                    letterSpacing: 0.5,
                  }}
                >
                  UPDATE CUSTOMER
                </Typography>
              </Box>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= FORM ================= */}
        <FormCard>
          <SectionTitle>Business Information</SectionTitle>

          <Grid container spacing={2.5}>
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
                        "&:hover": { bgcolor: "rgba(251, 191, 36, 0.1)" },
                        "&.Mui-selected": {
                          bgcolor: "rgba(251, 191, 36, 0.15)",
                          color: "#fbbf24",
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
          </Grid>

          <Box mt={3}>
            <SectionTitle>Contact Information</SectionTitle>
          </Box>

          <Grid container spacing={2.5}>
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

            <Grid size={{ xs: 12, sm: 12, md: 8 }}>
              <FieldLabel>Billing Address</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. Main Market, Delhi"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box mt={3}>
            <FieldLabel>Notes</FieldLabel>
            <StyledTextarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes about the customer..."
              maxLength={1000}
            />
            <Typography
              sx={{
                color: "#6b7280",
                fontSize: "0.7rem",
                mt: 0.5,
                textAlign: "right",
              }}
            >
              {notes.length} / 1000
            </Typography>
          </Box>

          {/* ACTION BUTTONS */}
          <Box
            display="flex"
            justifyContent="flex-end"
            gap={1.5}
            flexWrap="wrap"
            mt={4}
            pt={3}
            sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/customer-entry")}
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
              onClick={handleUpdate}
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
};

export default CustomerUpdate;