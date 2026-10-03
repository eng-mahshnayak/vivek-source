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
  Chip,
  IconButton,
} from "@mui/material";
import {
  Clear as ClearIcon,
  Update as UpdateIcon,
  CalendarToday as CalendarIcon,
  FiberManualRecord,
  ArrowBack,
  Refresh,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface OnlinePayment {
  amount: number | "";
  note: string;
}

interface CashForm {
  note500: number;
  note200: number;
  note100: number;
  note50: number;
  note20: number;
  note10: number;
  coins: number;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ===================== STYLED =====================

const DarkBanner = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  flexShrink: 0,
}));

const FormCard = styled(Card)(() => ({
  borderRadius: "16px",
  backgroundColor: "#0d1527",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  overflow: "hidden",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
}));

const FormScrollArea = styled(Box)(() => ({
  overflowY: "auto",
  overflowX: "hidden",
  flex: "1 1 0",
  height: 0,
  minHeight: 0,
  padding: "16px 18px",
  "&::-webkit-scrollbar": { width: "8px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(251, 191, 36, 0.3)",
    borderRadius: "8px",
  },
}));

const SectionCard = styled(Box)(() => ({
  backgroundColor: "#111827",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "14px 16px",
  marginBottom: "14px",
}));

const RowCard = styled(Box)<{ isactive?: boolean }>(({ isactive }) => ({
  backgroundColor: isactive ? "rgba(251, 191, 36, 0.05)" : "#0d1527",
  borderRadius: "10px",
  border: isactive
    ? "1px solid rgba(251, 191, 36, 0.3)"
    : "1px solid rgba(255, 255, 255, 0.05)",
  padding: "10px 12px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  transition: "all 0.2s ease",
  "&:hover": { borderColor: "rgba(251, 191, 36, 0.3)" },
}));

const DenomLabel = styled(Typography)(() => ({
  color: "#e5e7eb",
  fontWeight: 700,
  fontSize: "0.85rem",
  minWidth: "60px",
}));

const StyledTextField = styled(TextField)(() => ({
  width: "90px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "38px",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
    "&:hover fieldset": { borderColor: "rgba(251, 191, 36, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#fbbf24",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.88rem",
    fontWeight: 700,
    textAlign: "center",
    padding: "8px 8px",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&[type=number]": { MozAppearance: "textfield" },
  },
}));

const TotalRow = styled(Box)<{ variant?: "cash" | "count" | "grand" }>(
  ({ variant }) => {
    let bg = "#111827";
    let border = "1px solid rgba(251, 191, 36, 0.3)";
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
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
      flexWrap: "wrap",
    };
  }
);

const denominations = [
  { key: "note500", value: 500, color: "#38bdf8" },
  { key: "note200", value: 200, color: "#c084fc" },
  { key: "note100", value: 100, color: "#fbbf24" },
  { key: "note50", value: 50, color: "#f43f5e" },
  { key: "note20", value: 20, color: "#2dd4bf" },
  { key: "note10", value: 10, color: "#a78bfa" },
  { key: "coins", value: 1, color: "#fb923c" },
];

// ===================== MAIN =====================

const DailyCashUpdate: React.FC = () => {
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
  });

  const [onlinePayments, setOnlinePayments] = useState<OnlinePayment[]>([
    { amount: "", note: "" },
  ]);

  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        setFetchLoading(true);
        const res = await axios.get(`${API_URL}/dailycash/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
          },
        });

        if (res.data?.success) {
          const e = res.data.data;
          const formattedDate = new Date(e.date).toISOString().split("T")[0];
          setDate(formattedDate);

          setFormData({
            note500: e.openingCash?.note500 || 0,
            note200: e.openingCash?.note200 || 0,
            note100: e.openingCash?.note100 || 0,
            note50: e.openingCash?.note50 || 0,
            note20: e.openingCash?.note20 || 0,
            note10: e.openingCash?.note10 || 0,
            coins: e.openingCash?.coins || 0,
          });

          if (Array.isArray(e.onlinePayments) && e.onlinePayments.length > 0) {
            setOnlinePayments(
              e.onlinePayments.map((p: any) => ({
                amount: p.amount || "",
                note: p.note || "",
              }))
            );
          } else if (e.totalOnline || e.online) {
            setOnlinePayments([
              { amount: e.totalOnline || e.online || "", note: "" },
            ]);
          }
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(res.data?.message || "Failed to load entry");
        }
      } catch (err: any) {
        if (err.response?.data?.message === "Unauthorized") {
          localStorage.removeItem("erptoken");
          navigate("/login");
        } else {
          toast.error(err.response?.data?.message || "Failed to load");
        }
      } finally {
        setFetchLoading(false);
      }
    };
    if (id) fetchEntry();
  }, [id, navigate]);

  const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const num = value === "" ? 0 : Number(value);
    setFormData({ ...formData, [name]: Math.max(0, num) });
  };

  const addOnlineRow = () =>
    setOnlinePayments([...onlinePayments, { amount: "", note: "" }]);

  const removeOnlineRow = (i: number) => {
    if (onlinePayments.length === 1) {
      setOnlinePayments([{ amount: "", note: "" }]);
      return;
    }
    setOnlinePayments(onlinePayments.filter((_, idx) => idx !== i));
  };

  const updateOnlineRow = (
    i: number,
    field: keyof OnlinePayment,
    value: any
  ) => {
    const updated = [...onlinePayments];
    if (field === "amount") {
      updated[i].amount = value === "" ? "" : Math.max(0, Number(value));
    } else {
      updated[i].note = value;
    }
    setOnlinePayments(updated);
  };

  const calculateCashTotal = () =>
    denominations.reduce(
      (s, d) => s + (formData[d.key as keyof CashForm] as number) * d.value,
      0
    );

  const calculateOnlineTotal = () =>
    onlinePayments.reduce((s, p) => s + (Number(p.amount) || 0), 0);

  const calculateTotal = () => calculateCashTotal() + calculateOnlineTotal();

  const calculateNoteCount = () =>
    denominations.reduce(
      (s, d) => s + (formData[d.key as keyof CashForm] as number),
      0
    );

  const handleClear = () => {
    setFormData({
      note500: 0,
      note200: 0,
      note100: 0,
      note50: 0,
      note20: 0,
      note10: 0,
      coins: 0,
    });
    setOnlinePayments([{ amount: "", note: "" }]);
    toast.success("Reset");
  };

  const handleSubmit = async () => {
    if (calculateTotal() <= 0) {
      toast.error("Total must be > 0");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      setLoading(true);

      const cleanedOnline = onlinePayments
        .filter((p) => Number(p.amount) > 0)
        .map((p) => ({ amount: Number(p.amount), note: p.note || "" }));

      const res = await axios.put(
        `${API_URL}/dailycash/${id}`,
        {
          formData,
          onlinePayments: cleanedOnline,
          total: calculateTotal(),
          date: new Date(date).toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
          },
        }
      );

      if (res.data?.success === true) {
        toast.success("Updated successfully! 🎉");
        setTimeout(() => navigate("/note-summary-entry"), 1000);
      } else if (res.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to update");
      }
    } catch (e: any) {
      if (e.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(e.response?.data?.message || "Failed to update");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <Box
        sx={{
          height: "100dvh",
          bgcolor: "#090d16",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ color: "#9ca3af" }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        // ✅ PAGE NEVER SCROLLS
        height: { xs: "100dvh", md: "100vh" },
        maxHeight: { xs: "100dvh", md: "100vh" },
        overflow: "hidden",
        bgcolor: "#090d16",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 1.5, md: 2 },
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* HEADER */}
        <DarkBanner>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            gap={1.5}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/note-summary-entry")}
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.8,
                  fontSize: "0.78rem",
                  minWidth: "auto",
                  "&:hover": {
                    borderColor: "#fbbf24",
                    color: "#fbbf24",
                    bgcolor: "rgba(251, 191, 36, 0.08)",
                  },
                }}
              >
                Back
              </Button>

              <Box sx={{ minWidth: 0 }}>
                <Box display="flex" alignItems="center" gap={1} mb={0.3}>
                  <FiberManualRecord sx={{ fontSize: 10, color: "#fbbf24" }} />
                  <Typography
                    sx={{
                      color: "#fbbf24",
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    Cash Management · Edit Mode
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
                    lineHeight: 1.2,
                  }}
                >
                  UPDATE CASH ENTRY
                </Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleClear}
              sx={{
                color: "#e5e7eb",
                borderColor: "rgba(255, 255, 255, 0.15)",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "10px",
                px: 2,
                py: 0.8,
                fontSize: "0.78rem",
                flex: { xs: "1 1 100%", sm: "none" },
                "&:hover": {
                  borderColor: "#c084fc",
                  color: "#c084fc",
                  bgcolor: "rgba(192, 132, 252, 0.08)",
                },
              }}
            >
              Reset
            </Button>
          </Box>
        </DarkBanner>

        {/* FORM */}
        <FormCard>
          <FormScrollArea>
            {/* Date + chips */}
            <Box sx={{ mb: 1.5 }}>
              <Box
                display="flex"
                alignItems="center"
                gap={1.2}
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
                    px: 1.5,
                    py: 0.7,
                  }}
                >
                  <CalendarIcon sx={{ color: "#38bdf8", fontSize: 18 }} />
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontWeight: 600,
                      fontSize: "0.78rem",
                    }}
                  >
                    Date:
                  </Typography>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ffffff",
                      fontSize: "0.82rem",
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

            {/* Denomination grid */}
            <Grid container spacing={1.2} sx={{ mb: 1.5 }}>
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
                        onChange={handleCashChange}
                        inputProps={{ min: 0 }}
                      />
                      <Box sx={{ flex: 1, textAlign: "right", minWidth: 90 }}>
                        <Typography
                          sx={{
                            color: isActive ? denom.color : "#6b7280",
                            fontWeight: 800,
                            fontSize: "0.85rem",
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

            {/* Notes count */}
            <TotalRow variant="count" sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  color: "#c084fc",
                  fontWeight: 800,
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                }}
              >
                TOTAL NOTES COUNT:
              </Typography>
              <Typography sx={{ color: "#fff", fontWeight: 800 }}>
                {calculateNoteCount()} Notes/Coins
              </Typography>
            </TotalRow>

            {/* ===== ONLINE PAYMENTS SECTION ===== */}
            <SectionCard>
              {/* Header — title only */}
              <Box display="flex" alignItems="center" gap={1.2} mb={1.5}>
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
                    flexShrink: 0,
                    fontSize: "0.85rem",
                  }}
                >
                  💳
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                    }}
                  >
                    Online / Digital Payments
                  </Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: "0.68rem" }}>
                    Multiple UPI / Bank / Card entries
                  </Typography>
                </Box>
              </Box>

              {/* Rows — each with amount + note + delete + add */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {onlinePayments.map((p, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      bgcolor: "#0d1527",
                      border: "1px solid rgba(34, 211, 238, 0.15)",
                      borderRadius: "10px",
                      p: 1,
                    }}
                  >
                    {/* Amount — smaller */}
                    <TextField
                      type="number"
                      value={p.amount}
                      onChange={(e) =>
                        updateOnlineRow(i, "amount", e.target.value)
                      }
                      placeholder="0"
                      size="small"
                      inputProps={{ min: 0 }}
                      sx={{
                        width: { xs: "calc(50% - 24px)", sm: 110 },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#090d16",
                          color: "#fff",
                          height: "36px",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(34, 211, 238, 0.4)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#22d3ee",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "#fff",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          padding: "7px 9px",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography
                              sx={{
                                color: "#22d3ee",
                                fontWeight: 700,
                                fontSize: "0.8rem",
                              }}
                            >
                              ₹
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* Note — flex */}
                    <TextField
                      value={p.note}
                      onChange={(e) =>
                        updateOnlineRow(i, "note", e.target.value)
                      }
                      placeholder="Note"
                      size="small"
                      sx={{
                        flex: { xs: 1, sm: 1 },
                        minWidth: 0,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#090d16",
                          color: "#fff",
                          height: "36px",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(34, 211, 238, 0.4)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#22d3ee",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "#fff",
                          fontSize: "0.78rem",
                          padding: "7px 10px",
                        },
                      }}
                    />

                    {/* Delete */}
                    <IconButton
                      size="small"
                      onClick={() => removeOnlineRow(i)}
                      sx={{
                        color: "#f43f5e",
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>

                    {/* ✅ Add Entry button right side of delete */}
                    <IconButton
                      size="small"
                      onClick={addOnlineRow}
                      sx={{
                        color: "#22d3ee",
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        bgcolor: "rgba(34, 211, 238, 0.1)",
                        border: "1px solid rgba(34, 211, 238, 0.3)",
                        "&:hover": {
                          bgcolor: "rgba(34, 211, 238, 0.2)",
                          borderColor: "#22d3ee",
                        },
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              {/* Online total */}
              <Box
                sx={{
                  mt: 1.2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "rgba(34, 211, 238, 0.08)",
                  border: "1px solid rgba(34, 211, 238, 0.3)",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 0.9,
                }}
              >
                <Typography
                  sx={{
                    color: "#22d3ee",
                    fontWeight: 800,
                    fontSize: "0.78rem",
                  }}
                >
                  TOTAL ONLINE:
                </Typography>
                <Typography
                  sx={{ color: "#22d3ee", fontWeight: 900, fontSize: "1rem" }}
                >
                  ₹ {calculateOnlineTotal().toLocaleString("en-IN")}
                </Typography>
              </Box>
            </SectionCard>

            {/* Physical cash total */}
            <TotalRow variant="cash" sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  color: "#10b981",
                  fontWeight: 800,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                }}
              >
                TOTAL PHYSICAL CASH:
              </Typography>
              <Typography
                sx={{
                  color: "#c084fc",
                  fontWeight: 900,
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              >
                ₹{" "}
                {calculateCashTotal().toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </TotalRow>

            {/* Grand total */}
            <TotalRow variant="grand" sx={{ mb: 1 }}>
              <Typography
                sx={{
                  color: "#38bdf8",
                  fontWeight: 800,
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                }}
              >
                GRAND TOTAL:
              </Typography>
              <Typography
                sx={{
                  color: "#38bdf8",
                  fontWeight: 900,
                  fontSize: { xs: "1.05rem", sm: "1.2rem" },
                }}
              >
                ₹{" "}
                {calculateTotal().toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </TotalRow>
          </FormScrollArea>

          {/* Footer */}
          <Box
            sx={{
              display: "flex",
              gap: 1.2,
              justifyContent: { xs: "stretch", sm: "flex-end" },
              flexWrap: "wrap",
              p: { xs: "12px 16px", sm: "16px 22px" },
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClear}
              disabled={loading}
              sx={{
                borderColor: "rgba(244, 63, 94, 0.4)",
                color: "#f43f5e",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "10px",
                px: 2.5,
                py: 1,
                fontSize: "0.8rem",
                flex: { xs: 1, sm: "none" },
                "&:hover": { bgcolor: "rgba(244, 63, 94, 0.08)" },
              }}
            >
              Clear
            </Button>

            <Button
              variant="contained"
              startIcon={<UpdateIcon />}
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                bgcolor: "#fbbf24",
                color: "#0d1527",
                fontWeight: 800,
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1,
                fontSize: "0.8rem",
                boxShadow: "0 4px 14px rgba(251, 191, 36, 0.3)",
                flex: { xs: 1, sm: "none" },
                "&:hover": { bgcolor: "#f59e0b" },
              }}
            >
              {loading ? "Updating..." : "Update Entry"}
            </Button>
          </Box>
        </FormCard>
      </Box>
    </Box>
  );
};

export default DailyCashUpdate;