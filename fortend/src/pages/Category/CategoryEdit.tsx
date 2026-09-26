import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import {
  Category as CategoryIcon,
  Person as PersonIcon,
  Clear as ClearIcon,
  Update as UpdateIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface CategoryForm {
  categoryName: string;
  createdBy: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const FormCard = styled(Card)({
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  overflow: "hidden",
  background: "#ffffff",
  width: "100%",
  maxWidth: "700px",
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

const CategoryEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CategoryForm>({
    categoryName: "",
    createdBy: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setFetchLoading(true);
        const res = await axios.get(`${API_URL}/category/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
          },
        });

        if (res.data?.success === true) {
          const c = res.data.data;
          setFormData({
            categoryName: c.categoryName || "",
            createdBy: c.createdBy || "",
          });
        }
      } catch (error: any) {
        console.error(error);
        if (error.response?.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(error.response?.data?.message || "Failed to fetch");
        }
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) fetchCategory();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({ categoryName: "", createdBy: "" });
    toast.success("Form cleared");
  };

  const validateForm = (): boolean => {
    if (!formData.categoryName.trim()) {
      toast.error("Category name is required");
      return false;
    }
    if (!formData.createdBy.trim()) {
      toast.error("Created By is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await axios.put(`${API_URL}/category/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
        },
      });

      if (res.data.success === true) {
        toast.success("Category updated successfully! 🎉");
        setTimeout(() => navigate("/master/category"), 1200);
      } else {
        toast.error(res.data?.message || "Failed to update category");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(
          error.response?.data?.message || "Failed to update category"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <Card sx={{ p: 3, borderRadius: "16px", textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Loading...
          </Typography>
        </Card>
      </Box>
    );
  }

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
            title="Edit Category"
            subheader="Update category details"
            avatar={<CategoryIcon sx={{ fontSize: 28, opacity: 0.9 }} />}
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
              <CategoryIcon sx={{ color: "#667eea", fontSize: 20 }} />
              Category Information
            </Typography>

            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12 }}>
                <StyledTextField
                  fullWidth
                  label="Category Name *"
                  name="categoryName"
                  value={formData.categoryName}
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
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <StyledTextField
                  fullWidth
                  label="Created By *"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon
                          sx={{ color: "#667eea", fontSize: 18 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Tooltip title="Clear" TransitionComponent={Zoom}>
                <ActionButton
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={handleClear}
                  disabled={loading}
                  sx={{
                    borderColor: "#e74c3c",
                    color: "#e74c3c",
                  }}
                >
                  Clear
                </ActionButton>
              </Tooltip>

              <Tooltip title="Update" TransitionComponent={Zoom}>
                <ActionButton
                  variant="contained"
                  startIcon={<UpdateIcon />}
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  {loading ? "Updating..." : "Update"}
                </ActionButton>
              </Tooltip>
            </Box>
          </CardContent>
        </FormCard>
      </Zoom>
    </Box>
  );
};

export default CategoryEdit;