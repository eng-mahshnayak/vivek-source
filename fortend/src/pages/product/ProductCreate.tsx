import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  InputAdornment,
  Zoom,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  AttachMoney as MoneyIcon,
  Straighten as UnitIcon,
  AddCircle as AddCircleIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface Category {
  _id: string;
  categoryName: string;
}

interface ProductForm {
  itemName: string;
  mrp: string;
  rate: string;
  unit: string;
  categoryId: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const FormCard = styled(Card)({
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  overflow: "hidden",
  background: "#ffffff",
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
});

const FormHeader = styled(CardHeader)({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  padding: "12px 20px",
  "& .MuiCardHeader-title": { fontSize: "1.3rem", fontWeight: 600 },
  "& .MuiCardHeader-subheader": {
    color: "rgba(255,255,255,0.8)",
    fontSize: "0.8rem",
    marginTop: "2px",
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    height: "44px",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    "&.Mui-focused": {
      transform: "translateY(-1px)",
      boxShadow: "0 6px 16px rgba(102,126,234,0.15)",
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    fontSize: "0.85rem",
    transform: "translate(14px, 13px) scale(1)",
    "&.MuiInputLabel-shrink": {
      transform: "translate(14px, -8px) scale(0.75)",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px 12px",
    fontSize: "0.9rem",
  },
});

const ActionButton = styled(Button)({
  borderRadius: "10px",
  padding: "8px 20px",
  fontSize: "0.9rem",
  fontWeight: 600,
  textTransform: "none",
  minWidth: "100px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
});

const ProductCreate: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductForm>({
    itemName: "",
    mrp: "",
    rate: "",
    unit: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/category`, {
          params: { page: 1, limit: 1000 },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
          },
        });
        if (res.data?.success === true) {
          setCategories(res.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      itemName: "",
      mrp: "",
      rate: "",
      unit: "",
      categoryId: "",
    });
    toast.success("Form cleared", { duration: 2000 });
  };

  const validateForm = (): boolean => {
    if (!formData.itemName.trim()) {
      toast.error("Item name is required");
      return false;
    }
    if (!formData.categoryId) {
      toast.error("Please select a category");
      return false;
    }
    if (!formData.mrp || Number(formData.mrp) < 0) {
      toast.error("Valid MRP is required");
      return false;
    }
    if (!formData.rate || Number(formData.rate) < 0) {
      toast.error("Valid rate is required");
      return false;
    }
    if (!formData.unit.trim()) {
      toast.error("Unit is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        itemName: formData.itemName,
        mrp: Number(formData.mrp),
        rate: Number(formData.rate),
        unit: formData.unit,
        categoryId: formData.categoryId,
      };

      const res = await axios.post(`${API_URL}/product`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
        },
      });

      if (res.data.success === true) {
        toast.success("Product created successfully! 🎉");
        setTimeout(() => navigate("/master/product"), 1200);
      } else if (res.data.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to create product");
      }
    } catch (error: any) {
      console.error(error);
      if (!error.response) {
        toast.error("Network error! Please check your connection");
      } else if (error.response?.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(
          error.response?.data?.message || "Failed to create product"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        p: 1.5,
        pt: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Zoom in={true} timeout={500}>
        <FormCard>
          <FormHeader
            title="Add New Product"
            subheader="Fill in the product details"
            avatar={<InventoryIcon sx={{ fontSize: 28, opacity: 0.9 }} />}
          />

          <CardContent sx={{ p: 2.5 }}>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1.5,
                color: "#2c3e50",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "1rem",
              }}
            >
              <InventoryIcon sx={{ color: "#667eea", fontSize: 20 }} />
              Product Information
            </Typography>

            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              {/* Category */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <StyledTextField
                  fullWidth
                  select
                  label="Category *"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon
                          sx={{ color: "#667eea", fontSize: 18 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="">-- Select Category --</MenuItem>
                  {categories.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.categoryName}
                    </MenuItem>
                  ))}
                </StyledTextField>
              </Grid>

              {/* Item Name */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <StyledTextField
                  fullWidth
                  label="Item Name *"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InventoryIcon
                          sx={{ color: "#667eea", fontSize: 18 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* MRP */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <StyledTextField
                  fullWidth
                  label="MRP *"
                  name="mrp"
                  type="number"
                  value={formData.mrp}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MoneyIcon
                          sx={{ color: "#667eea", fontSize: 18 }}
                        />
                      </InputAdornment>
                    ),
                    inputProps: { min: 0, step: "0.01" },
                  }}
                />
              </Grid>

              {/* Rate */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <StyledTextField
                  fullWidth
                  label="Rate *"
                  name="rate"
                  type="number"
                  value={formData.rate}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MoneyIcon
                          sx={{ color: "#f093fb", fontSize: 18 }}
                        />
                      </InputAdornment>
                    ),
                    inputProps: { min: 0, step: "0.01" },
                  }}
                />
              </Grid>

              {/* Unit */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <StyledTextField
                  fullWidth
                  label="Unit *"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <UnitIcon
                          sx={{ color: "#667eea", fontSize: 18 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
              }}
            >
              <Tooltip title="Clear all fields" TransitionComponent={Zoom}>
                <ActionButton
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={handleClear}
                  disabled={loading}
                  sx={{
                    borderColor: "#e74c3c",
                    color: "#e74c3c",
                    "&:hover": {
                      borderColor: "#c0392b",
                      backgroundColor: "rgba(231,76,60,0.05)",
                    },
                  }}
                >
                  Clear
                </ActionButton>
              </Tooltip>

              <Tooltip title="Create product" TransitionComponent={Zoom}>
                <ActionButton
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                    },
                  }}
                >
                  {loading ? "Creating..." : "Create"}
                </ActionButton>
              </Tooltip>
            </Box>
          </CardContent>
        </FormCard>
      </Zoom>
    </Box>
  );
};

export default ProductCreate;