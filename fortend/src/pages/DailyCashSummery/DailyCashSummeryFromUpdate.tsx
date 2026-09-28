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

  InputAdornment,
  Zoom,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  AttachMoney as MoneyIcon,

  Clear as ClearIcon,
  Update as UpdateIcon,
  CalendarToday as CalendarIcon,
  FiberManualRecord,
  ArrowBack,
  Refresh,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface CashForm {
  note2000: number;
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

// ===================== STYLED DARK COMPONENTS =====================

const DarkBanner = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px 24px",
  marginBottom: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
}));

const FormCard = styled(Card)(() => ({
  borderRadius: "16px",
  backgroundColor: "#0d1527",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  overflow: "hidden",
  width: "100%",
}));

const SectionCard = styled(Box)(() => ({
  backgroundColor: "#111827",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "16px 20px",
}));

const RowCard = styled(Box)<{ isactive?: boolean }>(({ isactive }) => ({
  backgroundColor: isactive ? "rgba(16, 185, 129, 0.05)" : "#0d1527",
  borderRadius: "10px",
  border: isactive
    ? "1px solid rgba(16, 185, 129, 0.3)"
    : "1px solid rgba(255, 255, 255, 0.05)",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
}));

const DenomLabel = styled(Typography)(() => ({
  color: "#e5e7eb",
  fontWeight: 700,
  fontSize: "0.9rem",
  minWidth: "70px",
}));

const StyledTextField = styled(TextField)(() => ({
  width: "100px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "40px",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(16, 185, 129, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#10b981",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.9rem",
    fontWeight: 700,
    textAlign: "center",
    padding: "8px 10px",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&[type=number]": {
      MozAppearance: "textfield",
    },
  },
}));

const TotalRow = styled(Box)<{ variant?: "cash" | "count" | "grand" }>(
  ({ variant }) => {
    let bg = "#111827";
    let border = "1px solid rgba(16, 185, 129, 0.3)";

    if (variant === "count") {
      bg = "rgba(192, 132, 252, 0.15)";
      border = "1px solid rgba(192, 132, 252, 0.3)";
    } else if (variant === "grand") {
      bg = "rgba(56, 189, 248, 0.08)";
      border = "1px solid rgba(56, 189, 248, 0.3)";
    }

    return {
      backgroundColor: bg,
      borderRadius: "10px",
      border,
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
    };
  }
);

const ActionButton = styled(Button)(() => ({
  borderRadius: "10px",
  padding: "10px 20px",
  fontSize: "0.85rem",
  fontWeight: 700,
  textTransform: "none",
  transition: "all 0.3s ease",
  minWidth: "110px",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

// ===================== HELPERS =====================

const denominations = [
  { key: "note2000", value: 2000, color: "#34d399" },
  { key: "note500", value: 500, color: "#38bdf8" },
  { key: "note200", value: 200, color: "#c084fc" },
  { key: "note100", value: 100, color: "#fbbf24" },
  { key: "note50", value: 50, color: "#f43f5e" },
  { key: "note20", value: 20, color: "#2dd4bf" },
  { key: "note10", value: 10, color: "#a78bfa" },
  { key: "coins", value: 1, color: "#fb923c" },
];

// ===================== MAIN COMPONENT =====================

const DailyCashSummaryFormUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CashForm>({
    note2000: 0,
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
        const response = await axios.get(`${API_URL}/dailycash/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
          },
        });

        if (response.data?.success === true) {
          const entry = response.data.data;

          const entryDate = new Date(entry.date);
          const formattedDate = entryDate.toISOString().split("T")[0];
          setDate(formattedDate);

          setFormData({
            note2000: entry.openingCash?.note2000 || 0,
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
        if (error.response?.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(
            error.response?.data?.message || "Failed to fetch entry"
          );
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
      note2000: 0,
      note500: 0,
      note200: 0,
      note100: 0,
      note50: 0,
      note20: 0,
      note10: 0,
      coins: 0,
      online: 0,
    });
    toast.success("Counter reset");
  };

  const calculateCashTotal = () => {
    return denominations.reduce((sum, d) => {
      return sum + (formData[d.key as keyof CashForm] as number) * d.value;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateCashTotal() + formData.online;
  };

  const calculateNoteCount = () => {
    return denominations.reduce((sum, d) => {
      return sum + (formData[d.key as keyof CashForm] as number);
    }, 0);
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
        totalSales: calculateTotal(),
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
      } else if (
        updateRes.data.message === "Duplicate date entry not allowed"
      ) {
        toast.error("An entry for this date already exists");
      } else {
        toast.error(updateRes.data?.message || "Failed to update entry");
      }
    } catch (error: any) {
      console.error("Update error:", error);

      if (error.response?.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else if (
        error.response?.data?.message === "Duplicate date entry not allowed"
      ) {
        toast.error("An entry for this date already exists");
      } else if (!error.response) {
        toast.error("Network error! Please check connection");
      } else {
        toast.error(error.response?.data?.message || "Failed to update entry");
      }
    } finally {
      setLoading(false);
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
        <Box
          sx={{
            width: 40,
            height: 40,
            border: "3px solid rgba(16, 185, 129, 0.2)",
            borderTop: "3px solid #10b981",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        />
        <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          Loading entry...
        </Typography>
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
        py: { xs: 1.5, md: 2 },
        color: "#ffffff",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>
        {/* ================= HEADER BANNER ================= */}
        <DarkBanner>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            gap={2}
          >
            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <FiberManualRecord sx={{ fontSize: 10, color: "#fbbf24" }} />
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  sx={{
                    color: "#fbbf24",
                    letterSpacing: 0.5,
                    fontSize: "0.7rem",
                  }}
                >
                  Cash Management · Edit Mode
                </Typography>
              </Box>

              <Typography
                variant="h5"
                fontWeight="800"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.6rem" },
                  letterSpacing: 0.5,
                  color: "#ffffff",
                }}
              >
                5. NOTE SUMMARY UPDATE (CASH DENOMINATIONS)
              </Typography>
            </Box>

            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/note-summary-entry")}
                size="small"
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.8,
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#38bdf8",
                    color: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Back
              </Button>

              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={handleClear}
                size="small"
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.8,
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#c084fc",
                    color: "#c084fc",
                    bgcolor: "rgba(192, 132, 252, 0.08)",
                  },
                }}
              >
                Reset Counter
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= MAIN FORM CARD ================= */}
        <FormCard>
          <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
            {/* ================= PHYSICAL CASH HEADER ================= */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={1}
              mb={2}
            >
              <Box display="flex" alignItems="center" gap={1}>
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
                  💰
                </Box>
                <Typography
                  sx={{
                    color: "#c084fc",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    letterSpacing: 0.5,
                  }}
                >
                  PHYSICAL CASH COUNT BREAKDOWN
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: "#9ca3af",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                Enter count of notes/coins
              </Typography>
            </Box>

            {/* ================= DATE FIELD ================= */}
            <Box sx={{ mb: 2 }}>
              <Box
                display="flex"
                alignItems="center"
                gap={1.5}
                flexWrap="wrap"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "#111827",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    px: 2,
                    py: 0.8,
                  }}
                >
                  <CalendarIcon sx={{ color: "#38bdf8", fontSize: 18 }} />
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                    }}
                  >
                    Date:
                  </Typography>
                  <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ffffff",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      outline: "none",
                      cursor: "pointer",
                      colorScheme: "dark",
                    }}
                  />
                </Box>

                <Chip
                  label={`Total Notes: ${calculateNoteCount()}`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    color: "#38bdf8",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "28px",
                  }}
                />

                <Chip
                  label="EDIT MODE"
                  size="small"
                  sx={{
                    bgcolor: "rgba(251, 191, 36, 0.1)",
                    color: "#fbbf24",
                    border: "1px solid rgba(251, 191, 36, 0.3)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "28px",
                  }}
                />
              </Box>
            </Box>

            {/* ================= DENOMINATION GRID (2 COLUMNS) ================= */}
            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              {denominations.map((denom) => {
                const count = formData[denom.key as keyof CashForm] as number;
                const subtotal = count * denom.value;
                const isActive = count > 0;

                const label =
                  denom.key === "coins" ? "Coins x" : `₹${denom.value} x`;

                return (
                  <Grid size={{ xs: 12, sm: 6 }} key={denom.key}>
                    <RowCard isactive={isActive}>
                      <DenomLabel sx={{ color: denom.color }}>
                        {label}
                      </DenomLabel>

                      <StyledTextField
                        name={denom.key}
                        type="number"
                        value={count}
                        onChange={handleChange}
                        inputProps={{ min: 0, step: 1 }}
                      />

                      <Box
                        sx={{
                          flex: 1,
                          textAlign: "right",
                          minWidth: "100px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: isActive ? denom.color : "#6b7280",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                          }}
                        >
                          ₹{" "}
                          {subtotal.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                      </Box>
                    </RowCard>
                  </Grid>
                );
              })}
            </Grid>

            {/* ================= TOTAL NOTES COUNT BAR ================= */}
            <TotalRow variant="count" sx={{ mb: 2 }}>
              <Typography
                sx={{
                  color: "#c084fc",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: 0.5,
                }}
              >
                TOTAL NOTES COUNT:
              </Typography>
              <Typography
                sx={{ color: "#ffffff", fontWeight: 800, fontSize: "1rem" }}
              >
                {calculateNoteCount()} Notes/Coins
              </Typography>
            </TotalRow>

            {/* ================= ONLINE PAYMENT SECTION ================= */}
            <SectionCard sx={{ mb: 2 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={2}
              >
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      bgcolor: "#2e1065",
                      color: "#c084fc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MoneyIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                      }}
                    >
                      Online / Digital Payment
                    </Typography>
                    <Typography
                      sx={{ color: "#9ca3af", fontSize: "0.7rem" }}
                    >
                      UPI, Bank Transfer, Card
                    </Typography>
                  </Box>
                </Box>

                <StyledTextField
                  name="online"
                  type="number"
                  value={formData.online}
                  onChange={handleChange}
                  placeholder="0"
                  inputProps={{ min: 0, step: 1 }}
                  sx={{ width: "160px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography
                          sx={{
                            color: "#c084fc",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          ₹
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </SectionCard>

            {/* ================= GRAND TOTAL (CASH) ================= */}
            <TotalRow variant="cash" sx={{ mb: 2 }}>
              <Typography
                sx={{
                  color: "#10b981",
                  fontWeight: 800,
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                  letterSpacing: 0.5,
                }}
              >
                TOTAL PHYSICAL CASH COUNTED:
              </Typography>
              <Typography
                sx={{
                  color: "#c084fc",
                  fontWeight: 900,
                  fontSize: { xs: "1.3rem", sm: "1.6rem" },
                  letterSpacing: 0.5,
                  textShadow: "0 0 20px rgba(192, 132, 252, 0.4)",
                }}
              >
                ₹{" "}
                {calculateCashTotal().toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </TotalRow>

            {/* ================= GRAND TOTAL (Cash + Online) ================= */}
            <TotalRow variant="grand" sx={{ mb: 2.5 }}>
              <Typography
                sx={{
                  color: "#38bdf8",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: 0.5,
                }}
              >
                GRAND TOTAL (CASH + ONLINE):
              </Typography>
              <Typography
                sx={{
                  color: "#38bdf8",
                  fontWeight: 900,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                }}
              >
                ₹{" "}
                {calculateTotal().toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </TotalRow>

            {/* ================= ACTIONS ================= */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <Tooltip title="Clear all fields" TransitionComponent={Zoom}>
                <ActionButton
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={handleClear}
                  disabled={loading}
                  sx={{
                    borderColor: "rgba(244, 63, 94, 0.4)",
                    color: "#f43f5e",
                    "&:hover": {
                      borderColor: "#f43f5e",
                      bgcolor: "rgba(244, 63, 94, 0.08)",
                      boxShadow: "0 8px 20px rgba(244, 63, 94, 0.15)",
                    },
                  }}
                >
                  Clear
                </ActionButton>
              </Tooltip>

              <Tooltip title="Update entry" TransitionComponent={Zoom}>
                <ActionButton
                  variant="contained"
                  startIcon={<UpdateIcon />}
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{
                    bgcolor: "#fbbf24",
                    color: "#0d1527",
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
                  {loading ? "Updating..." : "Update Entry"}
                </ActionButton>
              </Tooltip>
            </Box>
          </Box>
        </FormCard>
      </Box>
    </Box>
  );
};

export default DailyCashSummaryFormUpdate;