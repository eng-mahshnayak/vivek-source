import React, { useEffect, useState } from "react";
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
    height: "42px",
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

// ===================== MAIN COMPONENT =====================

const UpdateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [itemName, setItemName] = useState("");
  const [mrp, setMrp] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [unit, setUnit] = useState("");

  const [fetchLoading, setFetchLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // ===================== FETCH PRODUCT =====================
  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setFetchLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setFetchLoading(true);

        const res = await axios.get(
          `${API_URL}/product/${id}`,
          getAuthHeaders()
        );

        if (res.data?.success === true) {
          const p = res.data.data;
          setItemName(p.itemName || "");
          setMrp(typeof p.mrp === "number" ? p.mrp : "");
          setRate(typeof p.rate === "number" ? p.rate : "");
          setUnit(p.unit || "");
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(res.data?.message || "Product not found");
          setNotFound(true);
        }
      } catch (error: any) {
        console.error("Fetch error:", error);
        if (error.response?.data?.message === "Unauthorized") {
          localStorage.removeItem("erptoken");
          navigate("/login");
        } else {
          toast.error(error.response?.data?.message || "Failed to load product");
          setNotFound(true);
        }
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ===================== UPDATE =====================
  const handleUpdate = async () => {
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

      const res = await axios.put(
        `${API_URL}/product/${id}`,
        payload,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Product updated successfully! 🎉");
        setTimeout(() => navigate("/products"), 900);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(
          res.data?.errors?.[0] ||
            res.data?.message ||
            "Failed to update product"
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
            "Failed to update product"
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
        <Typography sx={{ color: "#9ca3af" }}>Loading product...</Typography>
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
            Product not found
          </Typography>
          <Button
            onClick={() => navigate("/products")}
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
            Back to Products
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
      <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto" }}>
        {/* ================= HEADER ================= */}
        <DarkBanner>
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/products")}
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
                  Product Management · Edit Mode
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                    letterSpacing: 0.5,
                  }}
                >
                  UPDATE PRODUCT
                </Typography>
              </Box>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= FORM ================= */}
        <FormCard>
          <SectionTitle>Product Information</SectionTitle>

          <Grid container spacing={2.5}>
            {/* ITEM NAME */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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

            {/* UNIT */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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

            {/* MRP */}
            <Grid size={{ xs: 6, sm: 6, md: 6 }}>
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
            <Grid size={{ xs: 6, sm: 6, md: 6 }}>
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
          </Grid>

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
              onClick={() => navigate("/products")}
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
              {saving ? "Updating..." : "Update Product"}
            </Button>
          </Box>
        </FormCard>
      </Box>
    </Box>
  );
};

export default UpdateProduct;