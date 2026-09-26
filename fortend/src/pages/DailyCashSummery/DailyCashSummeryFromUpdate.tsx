



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
  AttachMoney as MoneyIcon,
  Savings as SavingsIcon,
  AccountBalance as AccountBalanceIcon,
  Payment as PaymentIcon,
  Clear as ClearIcon,
  Update as UpdateIcon,
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
}

const API_URL = import.meta.env.VITE_API_URL;

// Styled Components - FIXED: Removed unused 'theme' parameter
const FormCard = styled(Card)({
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  overflow: "hidden",
  background: "#ffffff",
  width: "100%",
  maxWidth: "1000px",
  margin: "0 auto",
});

const FormHeader = styled(CardHeader)({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  padding: "10px 20px",
  "& .MuiCardHeader-title": {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  "& .MuiCardHeader-subheader": {
    color: "rgba(255,255,255,0.8)",
    fontSize: "0.75rem",
    marginTop: "2px",
  },
  "& .MuiCardHeader-avatar": {
    marginRight: "8px",
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    height: "40px",
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
    fontSize: "0.8rem",
    transform: "translate(14px, 11px) scale(1)",
    "&.MuiInputLabel-shrink": {
      transform: "translate(14px, -8px) scale(0.75)",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "8px 12px",
    fontSize: "0.85rem",
  },
});

const TotalCard = styled(Card)({
  background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  color: "white",
  borderRadius: "14px",
  boxShadow: "0 8px 20px rgba(17,153,142,0.25)",
  height: "100%",
  minHeight: "70px",
  display: "flex",
  alignItems: "center",
});

const ActionButton = styled(Button)({
  borderRadius: "10px",
  padding: "6px 16px",
  fontSize: "0.85rem",
  fontWeight: 600,
  textTransform: "none",
  minWidth: "90px",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
});

const DailyCashSummaryFormUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CashForm>({
    note500: 0,
    note200: 0,
    note100: 0,
    note50: 0,
    note20: 0,
    note10: 0,
    coins: 0,
    online: 0,
  });

  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch entry data by ID
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get(
          `${API_URL}/dailycash/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
            },
          }
        );

        if (response.data?.success === true) {
          const entry = response.data.data;
          
          // Format date for input field (YYYY-MM-DD)
          const entryDate = new Date(entry.date);
          const formattedDate = entryDate.toISOString().split('T')[0];
          setDate(formattedDate);
          
          // Set form data from openingCash
          setFormData({
            note500: entry.openingCash?.note500 || 0,
            note200: entry.openingCash?.note200 || 0,
            note100: entry.openingCash?.note100 || 0,
            note50: entry.openingCash?.note50 || 0,
            note20: entry.openingCash?.note20 || 0,
            note10: entry.openingCash?.note10 || 0,
            coins: entry.openingCash?.coins || 0,
            online: entry.openingCash?.online || 0,
          });
        }
      } catch (error: any) {
        console.error("Error fetching entry:", error);
        if (error.response?.data?.message === 'Unauthorized') {
          toast.error("Session expired! Please login again");
          localStorage.removeItem('erptoken');
          setTimeout(() => navigate('/login'), 1500);
        } else {
          toast.error(error.response?.data?.message || 'Failed to fetch entry');
        }
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) fetchEntry();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === "" ? 0 : Number(value);
    setFormData({
      ...formData,
      [name]: Math.max(0, numValue),
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
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
    });
    toast.success("Form cleared");
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
    if (calculateTotal() <= 0) {
      toast.error("Total amount must be greater than 0");
      return false;
    }
    if (!date) {
      toast.error("Date is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const updatePayload = {
        date: new Date(date).toISOString(),
        openingCash: formData,
        totalSales: calculateTotal()
      };

      const updateRes = await axios.put(
        `${API_URL}/dailycash/${id}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
          },
        }
      );

      if (updateRes.data.success === true) {
        toast.success("Entry updated successfully! 🎉");
        setTimeout(() => navigate("/dailycash/get"), 1500);
      } else if (updateRes.data.message === 'Duplicate date entry not allowed') {
        toast.error("An entry for this date already exists");
      } else {
        toast.error(updateRes.data?.message || 'Failed to update entry');
      }
    } catch (error: any) {
      console.error("Update error:", error);
      
      if (error.response?.data?.message === 'Unauthorized') {
        toast.error("Session expired! Please login again");
        localStorage.removeItem('erptoken');
        setTimeout(() => navigate('/login'), 1500);
      } else if (error.response?.data?.message === 'Duplicate date entry not allowed') {
        toast.error("An entry for this date already exists");
      } else if (!error.response) {
        toast.error("Network error! Please check connection");
      } else {
        toast.error(error.response?.data?.message || 'Failed to update entry');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        bgcolor: "#f5f5f5",
      }}>
        <Card sx={{ p: 3, borderRadius: "16px", textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Loading...
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </Box>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "flex-start",
      minHeight: "100vh",
      bgcolor: "#f5f5f5",
      pt: 2,
    }}>
      <Zoom in={true} timeout={500}>
        <FormCard>
          <FormHeader
            title="Edit Daily Cash Entry"
            subheader="Update your daily cash collection"
            avatar={<AccountBalanceIcon sx={{ fontSize: 24 }} />}
          />

          <CardContent sx={{ p: 2 }}>
            {/* Date Field - Compact */}
            <Grid container spacing={1} alignItems="center" sx={{ mb: 1 }}>
             
                  <Grid size={{ xs: 12, sm: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CalendarIcon sx={{ color: "#667eea", fontSize: 16 }} />
                  Date
                </Typography>
              </Grid>
             
                <Grid size={{ xs: 12, sm: 9 }}>
                <StyledTextField
                  fullWidth
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  size="small"
                  sx={{ maxWidth: "250px" }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 1.5 }} />

            {/* Notes & Coins Section */}
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
              <SavingsIcon sx={{ color: "#667eea", fontSize: 18 }} />
              Notes & Coins
            </Typography>

            <Grid container spacing={1} sx={{ mb: 1.5 }}>
              {Object.keys(formData).map((key) => {
                if (key === "online") return null;
                
                const labels: { [key: string]: string } = {
                  note500: "₹500", note200: "₹200", note100: "₹100",
                  note50: "₹50", note20: "₹20", note10: "₹10", coins: "Coins",
                };

                const icons: { [key: string]: any } = {
                  note500: "💵", note200: "💵", note100: "💵",
                  note50: "💵", note20: "💵", note10: "💵", coins: "🪙",
                };

                const gridSize = key === "coins" ? { xs: 12, sm: 6, md: 4 } : { xs: 6, sm: 4, md: 3 };

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
                        startAdornment: <InputAdornment position="start"><Typography sx={{ fontSize: "0.9rem" }}>{icons[key]}</Typography></InputAdornment>,
                        inputProps: { min: 0, step: 1 },
                      }}
                      size="small"
                    />
                  </Grid>
                );
              })}
            </Grid>

            {/* Digital Payments Section */}
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
              <PaymentIcon sx={{ color: "#f093fb", fontSize: 18 }} />
              Digital Payments
            </Typography>

            <Grid container spacing={1} sx={{ mb: 1.5 }}>
              
                <Grid size={{ xs: 12,sm:6, md: 4 }}>
                <StyledTextField
                  fullWidth
                  label="Online Payment"
                  name="online"
                  type="number"
                  value={formData.online}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><MoneyIcon sx={{ color: "#f093fb", fontSize: 16 }} /></InputAdornment>,
                    inputProps: { min: 0, step: 1 },
                  }}
                  size="small"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 1.5 }} />

            {/* Total Section */}
            <Grid container spacing={1} alignItems="center">
             
                  <Grid size={{ xs: 12, md: 7 }}>
                <TotalCard>
                  <CardContent sx={{ p: 1 }}>
                    <Typography variant="caption" sx={{ opacity: 0.9, display: "block", fontSize: "0.65rem" }}>
                      Total for {date ? new Date(date).toLocaleDateString() : ''}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: "1.5rem" }}>
                      ₹ {calculateTotal().toLocaleString()}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8, display: "block", fontSize: "0.65rem" }}>
                      Cash: ₹ {calculateCashTotal().toLocaleString()} | Online: ₹ {formData.online.toLocaleString()}
                    </Typography>
                  </CardContent>
                </TotalCard>
              </Grid>

             
                 <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                  <Tooltip title="Clear" TransitionComponent={Zoom}>
                    <ActionButton
                      variant="outlined"
                      startIcon={<ClearIcon />}
                      onClick={handleClear}
                      disabled={loading}
                      sx={{ borderColor: "#e74c3c", color: "#e74c3c" }}
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
                      sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
                    >
                      {loading ? "..." : "Update"}
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

export default DailyCashSummaryFormUpdate;


