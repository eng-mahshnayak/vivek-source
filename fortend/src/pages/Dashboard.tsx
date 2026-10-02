





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Grid,
  Card,
  CardActionArea,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  LocalShipping,
  AssignmentReturn,
  Group,
  Payments,
  PointOfSale,
  LocalGasStation,
  Visibility,
  FiberManualRecord,
  Calculate,
  Inventory2,
  People,
  ReceiptLong,
} from "@mui/icons-material";

// ===================== STYLED DARK COMPONENTS =====================

const DarkBanner = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "16px 22px",
  marginBottom: "12px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  flexShrink: 0,
}));

const MetricCard = styled(Box)(() => ({
  backgroundColor: "#111827",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "12px 16px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const ActionCard = styled(Card)(() => ({
  borderRadius: "12px",
  backgroundColor: "#111827",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.35)",
  transition: "all 0.3s ease",
  height: "100%",
  minHeight: "190px",          // 🔥 YE ADD KARO
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 10px 22px rgba(16, 185, 129, 0.15)",
    borderColor: "#10b981",
  },
}));

const IconBox = styled(Box)<{ bgcolor: string; iconcolor: string }>(
  ({ bgcolor, iconcolor }) => ({
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    backgroundColor: bgcolor,
    color: iconcolor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": { fontSize: "20px" },
  })
);

// 🔥 Cards scroll area — poora flex chain complete
const CardsScrollArea = styled(Box)(() => ({
  overflowY: "auto",
  overflowX: "hidden",
  flex: 1,
  minHeight: 0, // 🔥 critical
  paddingRight: "6px",
  paddingBottom: "8px",
  "&::-webkit-scrollbar": { width: "8px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(16, 185, 129, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(16, 185, 129, 0.5)" },
  },
}));

// ===================== DASHBOARD COMPONENT =====================

const Dashboard: React.FC = () => {
  const navigate = useNavigate();


   const [dashboardData, setDashboardData] = useState({
    loadedStock: 0,
    returnsUnsold: 0,
    creditPayments: 0,
    cashNotesExpenses: 0,
  });

  const [loading, setLoading] = useState(false);


  console.log(loading);
  

  // =============================
  // Get Dashboard Summary
  // =============================

  const getDashboardSummary = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/gettodaycalculation`
      );

      console.log(
        response.data,
        "=========== Dashboard API Response ==========="
      );

       console.log(
        response.data.data.loadItem,
        "=========== Dashboard API Response ==========="
      );


      if (response.data?.success) {
        setDashboardData({
          loadedStock: Number(
            response.data.data?.loadItem || 0
          ),

          returnsUnsold: Number(
            response.data.data?.returnItem || 0
          ),

          creditPayments: Number(
            response.data.data?.creditCustomer || 0
          ),

          cashNotesExpenses: Number(
            response.data.data?.noteSummary || 0
          ),
        });
      }
    } catch (error) {
      console.error(
        "Dashboard Summary API Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Call API when Dashboard loads
  // =============================

  useEffect(() => {
    getDashboardSummary();
  }, []);



  // =============================
  // Summary Metrics
  // =============================

  const summaryMetrics = [
    {
      label: "Today Loaded Stock",
      amount: `₹ ${dashboardData.loadedStock.toFixed(2)}`,
      color: "#34d399",
    },

    {
      label: "Today Returns & Unsold",
      amount: `₹ ${dashboardData.returnsUnsold.toFixed(2)}`,
      color: "#38bdf8",
    },

    {
      label: "Today Credit Customer",
      amount: `₹ ${dashboardData.creditPayments.toFixed(2)}`,
      color: "#fbbf24",
    },

    {
      label: "Today Notes Summary",
      amount: `₹ ${dashboardData.cashNotesExpenses.toFixed(2)}`,
      color: "#c084fc",
    },
  ];



  const quickActions = [
    {
      id: "1",
      title: "1. LOAD ITEMS",
      desc: "Add loaded inventory & rates",
      badgeText: "2 Items",
      badgeBg: "#132e29",
      badgeColor: "#34d399",
      amountText: "Total: ₹ 8,000.00",
      icon: <LocalShipping />,
      iconBg: "#132e29",
      iconColor: "#34d399",
      route: "/load-items",
    },
    {
      id: "2",
      title: "2. RETURN ITEMS",
      desc: "Log unsold or damaged returns",
      badgeText: "1 Returns",
      badgeBg: "#0c2a3a",
      badgeColor: "#38bdf8",
      amountText: "Total: ₹ 500.00",
      icon: <AssignmentReturn />,
      iconBg: "#0c2a3a",
      iconColor: "#38bdf8",
      route: "/sale/return-list",
    },
    {
      id: "3",
      title: "3. CREDIT CUSTOMER",
      desc: "Record credit sales & ledger",
      badgeText: "1 Entries",
      badgeBg: "#332208",
      badgeColor: "#fbbf24",
      amountText: "Total: ₹ 1,500.00",
      icon: <Group />,
      iconBg: "#332208",
      iconColor: "#fbbf24",
      route: "/credit-customer-entry",
    },
    {
      id: "4",
      title: "4. PAYMENT RECEIVED",
      desc: "Cash, UPI & Online receipts",
      badgeText: "1 Payments",
      badgeBg: "#1e1b4b",
      badgeColor: "#a78bfa",
      amountText: "Total: ₹ 2,000.00",
      icon: <Payments />,
      iconBg: "#1e1b4b",
      iconColor: "#a78bfa",
      route: "/payment-received-entry",
    },
    {
      id: "5",
      title: "5. NOTE SUMMARY",
      desc: "Currency denomination counter",
      badgeText: "Cash Counter",
      badgeBg: "#2e1065",
      badgeColor: "#c084fc",
      amountText: "Cash Total: ₹ 5,300.00",
      icon: <PointOfSale />,
      iconBg: "#2e1065",
      iconColor: "#c084fc",
      route: "/note-summary-entry",
    },
    {
      id: "6",
      title: "6. EXPENSES ENTRY",
      desc: "Fuel, toll, food & trip costs",
      badgeText: "1 Expenses",
      badgeBg: "#31121d",
      badgeColor: "#f43f5e",
      amountText: "Total: ₹ 1,800.00",
      icon: <LocalGasStation />,
      iconBg: "#31121d",
      iconColor: "#f43f5e",
      route: "/expenses-entry",
    },
    {
      id: "7",
      title: "7. FINAL CALCULATION",
      desc: "Compute final settlement numbers",
      badgeText: "Auto Compute",
      badgeBg: "#0f2f2c",
      badgeColor: "#2dd4bf",
      amountText: "Run calculation",
      icon: <Calculate />,
      iconBg: "#0f2f2c",
      iconColor: "#2dd4bf",
      route: "/final-calculation",
    },
    {
      id: "8",
      title: "8. VIEW SETTLEMENT",
      desc: "Detailed route settlement view",
      badgeText: "Report",
      badgeBg: "#0f2f2c",
      badgeColor: "#2dd4bf",
      amountText: "Open report",
      icon: <Visibility />,
      iconBg: "#0f2f2c",
      iconColor: "#2dd4bf",
      route: "/final-calculation",
    },
  ];

  return (
    <Box
      sx={{
        height: "85vh",
        maxHeight: "100vh",
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
          maxWidth: 1350,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0, // 🔥 critical
        }}
      >
        {/* ================= HEADER BANNER ================= */}
        <DarkBanner>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            gap={2}
          >
            {/* Left: Title block */}
            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={0.3}>
                <FiberManualRecord sx={{ fontSize: 10, color: "#10b981" }} />
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  sx={{
                    color: "#10b981",
                    letterSpacing: 0.5,
                    fontSize: "0.7rem",
                  }}
                >
                  Main Hub
                </Typography>
              </Box>

              <Typography
                variant="h4"
                fontWeight="800"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.7rem" },
                  letterSpacing: 0.5,
                  color: "#ffffff",
                }}
              >
                VEHICLE LOADING & SETTLEMENT
              </Typography>

              <Typography
                variant="caption"
                sx={{ color: "#9ca3af", mt: 0.3, display: "block" }}
              >
                Select any module below to enter stock, returns, credits,
                payments, cash notes, or view final settlement.
              </Typography>
            </Box>

            {/* Right: Products + Customers buttons */}
            <Box
              display="flex"
              gap={1.2}
              flexWrap="wrap"
              sx={{ width: { xs: "100%", md: "auto" } }}
            >

              <Button
  variant="outlined"
  startIcon={<ReceiptLong sx={{ fontSize: 18 }} />}
  onClick={() => navigate("/customer-ledger")}
  sx={{
    color: "#34d399",
    borderColor: "rgba(52, 211, 153, 0.4)",
    fontWeight: 700,
    textTransform: "none",
    borderRadius: "10px",
    px: 2,
    py: 0.9,
    fontSize: "0.78rem",
    flex: { xs: 1, md: "none" },
    "&:hover": {
      borderColor: "#34d399",
      bgcolor: "rgba(52, 211, 153, 0.08)",
      boxShadow: "0 6px 16px rgba(52, 211, 153, 0.15)",
    },
  }}
>
  Customer Ledger
</Button>

              <Button
                variant="outlined"
                startIcon={<Inventory2 sx={{ fontSize: 18 }} />}
                onClick={() => navigate("/products")}
                sx={{
                  color: "#c084fc",
                  borderColor: "rgba(192, 132, 252, 0.4)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.9,
                  fontSize: "0.78rem",
                  flex: { xs: 1, md: "none" },
                  "&:hover": {
                    borderColor: "#c084fc",
                    bgcolor: "rgba(192, 132, 252, 0.08)",
                    boxShadow: "0 6px 16px rgba(192, 132, 252, 0.15)",
                  },
                }}
              >
                Products
              </Button>



              <Button
                variant="outlined"
                startIcon={<People sx={{ fontSize: 18 }} />}
                onClick={() => navigate("/customer-entry")}
                sx={{
                  color: "#38bdf8",
                  borderColor: "rgba(56, 189, 248, 0.4)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.9,
                  fontSize: "0.78rem",
                  flex: { xs: 1, md: "none" },
                  "&:hover": {
                    borderColor: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                    boxShadow: "0 6px 16px rgba(56, 189, 248, 0.15)",
                  },
                }}
              >
                Customers
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= METRICS SUMMARY BAR ================= */}
        <Grid
          container
          spacing={1.5}
          sx={{ mb: 1.5, flexShrink: 0 }}
        >
          {summaryMetrics.map((metric, index) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={index}>
              <MetricCard>
                <Typography
                  variant="caption"
                  sx={{ color: "#9ca3af", fontSize: "0.7rem" }}
                >
                  {metric.label}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    color: metric.color,
                    mt: 0.3,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                  }}
                >
                  {metric.amount}
                </Typography>
              </MetricCard>
            </Grid>
          ))}
        </Grid>

        {/* ================= MAIN CARDS GRID (SCROLLABLE) ================= */}
        <CardsScrollArea>
          <Grid container spacing={1.8}>
            {quickActions.map((item: any) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
                <ActionCard>
                  <CardActionArea
                    onClick={() => navigate(item.route)}
                    sx={{ p: 1.8, height: "100%" }}
                  >
                    {/* Top Row: Icon + Badge */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1.2}
                    >
                      <IconBox bgcolor={item.iconBg} iconcolor={item.iconColor}>
                        {item.icon}
                      </IconBox>

                      <Chip
                        label={item.badgeText}
                        size="small"
                        sx={{
                          bgcolor: item.badgeBg,
                          color: item.badgeColor,
                          fontWeight: "bold",
                          fontSize: "0.65rem",
                          height: "22px",
                          borderRadius: "6px",
                        }}
                      />
                    </Box>

                    {/* Title & Description */}
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        color: "#ffffff",
                        fontSize: { xs: "0.85rem", sm: "0.9rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: "#9ca3af",
                        display: "block",
                        minHeight: "30px",
                        mt: 0.3,
                        lineHeight: 1.3,
                        fontSize: "0.7rem",
                      }}
                    >
                      {item.desc}
                    </Typography>

                    {/* Bottom Amount Line */}
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      sx={{
                        color: item.amountColor || item.iconColor,
                        display: "block",
                        mt: 1.2,
                        fontSize: "0.72rem",
                      }}
                    >
                      {item.amountText}
                    </Typography>
                  </CardActionArea>
                </ActionCard>
              </Grid>
            ))}
          </Grid>
        </CardsScrollArea>
      </Box>
    </Box>
  );
};

export default Dashboard;

