




import React, { useState } from "react";
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
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import {
  AttachMoney as MoneyIcon,
  Savings as SavingsIcon,
  AccountBalance as AccountBalanceIcon,
  Payment as PaymentIcon,
  AddCircle as AddCircleIcon,
  Clear as ClearIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface CashForm {
  note500: number;
  note200: number;
  note100: number;
  note50: number;
  note20: number;
  note10: number;
  coins: number;
  online: number;
  date: string;
}

const API_URL = import.meta.env.VITE_API_URL;

// Styled Components
const FormCard = styled(Card)(() => ({
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  overflow: "hidden",
  background: "#ffffff",
  transition: "all 0.3s ease",
  width: "100%",
  maxWidth: "950px",
  margin: "0 auto",
}));

const FormHeader = styled(CardHeader)(() => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  padding: "12px 20px", // Reduced padding
  "& .MuiCardHeader-title": {
    fontSize: "1.3rem",
    fontWeight: 600,
  },
  "& .MuiCardHeader-subheader": {
    color: "rgba(255,255,255,0.8)",
    fontSize: "0.8rem",
    marginTop: "2px",
  },
  "& .MuiCardHeader-avatar": {
    marginRight: "10px",
  },
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    height: "42px", // Reduced height
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
    transform: "translate(14px, 12px) scale(1)",
    "&.MuiInputLabel-shrink": {
      transform: "translate(14px, -8px) scale(0.75)",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px 12px",
    fontSize: "0.9rem",
  },
}));

const TotalCard = styled(Card)(() => ({
  background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  color: "white",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(17,153,142,0.25)",
  transition: "all 0.3s ease",
  height: "100%",
  minHeight: "80px", // Reduced height
  display: "flex",
  alignItems: "center",
}));

const ActionButton = styled(Button)(() => ({
  borderRadius: "10px",
  padding: "8px 20px",
  fontSize: "0.9rem",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  minWidth: "100px",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
}));

// Function to get today's date in YYYY-MM-DD format
const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DailyCashSummaryForm: React.FC<{ refresh: () => void }> = () => {
  const [formData, setFormData] = useState<CashForm>({
    note500: 0,
    note200: 0,
    note100: 0,
    note50: 0,
    note20: 0,
    note10: 0,
    coins: 0,
    online: 0,
    date: getTodayDate(),
  });

  const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name !== "date") {
      const numValue = value === "" ? 0 : Number(value);
      setFormData({
        ...formData,
        [name]: Math.max(0, numValue),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleClear = () => {
    setFormData({
      note500: 0,
      note200: 0,
      note100: 0,
      note50: 0,
      note20: 0,
      note10: 0,
      coins: 0,
      online: 0,
      date: getTodayDate(),
    });
    toast.success("Form cleared successfully", {
      duration: 2000,
      position: "top-right",
    });
  };

  const calculateTotal = () => {
    return (
      formData.note500 * 500 +
      formData.note200 * 200 +
      formData.note100 * 100 +
      formData.note50 * 50 +
      formData.note20 * 20 +
      formData.note10 * 10 +
      formData.coins +
      formData.online
    );
  };

  const calculateCashTotal = () => {
    return (
      formData.note500 * 500 +
      formData.note200 * 200 +
      formData.note100 * 100 +
      formData.note50 * 50 +
      formData.note20 * 20 +
      formData.note10 * 10 +
      formData.coins
    );
  };

  const validateForm = (): boolean => {
    const total = calculateTotal();
    if (total <= 0) {
      toast.error("Total amount must be greater than 0", {
        duration: 3000,
        position: "top-right",
      });
      return false;
    }
    if (!formData.date) {
      toast.error("Please select a date", {
        duration: 3000,
        position: "top-right",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const createRes = await axios.post(
        `${API_URL}/dailycash`,
        {
          formData: {
            note500: formData.note500,
            note200: formData.note200,
            note100: formData.note100,
            note50: formData.note50,
            note20: formData.note20,
            note10: formData.note10,
            coins: formData.coins,
            online: formData.online,
          },
          total: calculateTotal(),
          date: formData.date,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
          },
        }
      );

      if (createRes.data.success === true) {
        toast.success("Entry created successfully! 🎉", {
          duration: 3000,
          position: "top-right",
        });
        
         navigate('/dailycash/get');
        
      } else if (createRes.data.success === false && createRes.data.message === 'Unauthorized') {
        toast.error("Session expired! Please login again", {
          duration: 4000,
          position: "top-right",
        });
      } else {
        toast.error(createRes?.data?.message || createRes?.data?.errors || 'Failed to create entry', {
          duration: 4000,
          position: "top-right",
        });
      }

    } catch (error: any) {
      console.error(error);
      
      if (!error.response) {
        toast.error("Network error! Please check your connection", {
          duration: 4000,
          position: "top-right",
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to create entry. Please try again.", {
          duration: 4000,
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "flex-start", // Changed from center to flex-start to reduce top margin
      minHeight: "100vh",
      p: 1.5, // Reduced padding
      pt: 2, // Small top padding
      overflow: "hidden",
      backgroundColor: "#f5f5f5",
    }}>
      <Zoom in={true} timeout={500}>
        <FormCard>
          <FormHeader
            title="Daily Cash Entry"
            subheader="Record your daily cash collection"
            avatar={
              <AccountBalanceIcon sx={{ fontSize: 28, opacity: 0.9 }} />
            }
          />

          <CardContent sx={{ 
            p: 2.5, // Reduced padding
            maxHeight: "calc(100vh - 150px)",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "10px",
            },
          }}>
            {/* Date Field - Compact */}
            <Grid container spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              
                  <Grid size={{ xs: 12,sm:4, md: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#2c3e50",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontSize: "0.9rem",
                  }}
                >
                  <CalendarIcon sx={{ color: "#667eea", fontSize: 18 }} />
                  Select Date
                </Typography>
              </Grid>
             
                   <Grid size={{ xs: 12,sm:8, md: 9 }}>
                <StyledTextField
                  fullWidth
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 1.5 }} />

            {/* Notes & Coins Section - Full Width */}
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1,
                color: "#2c3e50",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "1rem",
              }}
            >
              <SavingsIcon sx={{ color: "#667eea", fontSize: 20 }} />
              Notes & Coins
            </Typography>

            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              {Object.keys(formData).map((key) => {
                if (key === "online" || key === "date") return null;
                
                const labels: { [key: string]: string } = {
                  note500: "₹500",
                  note200: "₹200",
                  note100: "₹100",
                  note50: "₹50",
                  note20: "₹20",
                  note10: "₹10",
                  coins: "Coins (₹)",
                };

                const icons: { [key: string]: any } = {
                  note500: "💵",
                  note200: "💵",
                  note100: "💵",
                  note50: "💵",
                  note20: "💵",
                  note10: "💵",
                  coins: "🪙",
                };

                // Make coins field full width on mobile, 3 columns on desktop
              const gridSize =
  key === "coins"
    ? { size: { xs: 12, sm: 4, md: 3 } }
    : { size: { xs: 6, sm: 4, md: 3 } };

                return (
                  <Grid {...gridSize} key={key}>
                    <StyledTextField
                      fullWidth
                      label={labels[key]}
                      name={key}
                      type="number"
                      value={formData[key as keyof CashForm]}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography sx={{ fontSize: "0.9rem" }}>
                              {icons[key]}
                            </Typography>
                          </InputAdornment>
                        ),
                        inputProps: { min: 0, step: 1 },
                      }}
                      size="small"
                    />
                  </Grid>
                );
              })}
            </Grid>

            {/* Digital Payments Section - Now below coins */}
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1,
                color: "#2c3e50",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "1rem",
              }}
            >
              <PaymentIcon sx={{ color: "#f093fb", fontSize: 20 }} />
              Digital Payments
            </Typography>

            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              
                 <Grid size={{ xs: 12,sm:6, md: 4 }}>
                <StyledTextField
                  fullWidth
                  label="Online Payment"
                  name="online"
                  type="number"
                  value={formData.online}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MoneyIcon sx={{ color: "#f093fb", fontSize: 18 }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 0, step: 1 },
                  }}
                  size="small"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 1.5 }} />

            {/* Total Section */}
            <Grid container spacing={1.5} alignItems="center">
             
                 <Grid size={{ xs: 12, md: 7 }}>
                <TotalCard>
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography variant="caption" sx={{ opacity: 0.9, display: "block", fontSize: "0.7rem" }}>
                      Total Collection for {new Date(formData.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: "1.8rem" }}>
                      ₹ {calculateTotal().toLocaleString()}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8, display: "block", fontSize: "0.7rem" }}>
                      Cash: ₹ {calculateCashTotal().toLocaleString()} | Online: ₹ {formData.online.toLocaleString()}
                    </Typography>
                  </CardContent>
                </TotalCard>
              </Grid>

            
                  <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
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

                  <Tooltip title="Create entry" TransitionComponent={Zoom}>
                    <ActionButton
                      variant="contained"
                      startIcon={<AddCircleIcon />}
                      onClick={handleSubmit}
                      disabled={loading}
                      sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                        },
                      }}
                    >
                      {loading ? "Creating..." : "Create"}
                    </ActionButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </FormCard>
      </Zoom>
    </Box>
  );
};

export default DailyCashSummaryForm;