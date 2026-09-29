// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Grid,
//   Card,
//   CardActionArea,
//   Typography,
//   Chip,
//   Button,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   LocalShipping,
//   AssignmentReturn,
//   Group,
//   Payments,
//   PointOfSale,
//   LocalGasStation,
//   Dashboard as DashboardIcon,
//   Visibility,
//   FiberManualRecord,
//   Inventory2,
//   Calculate,
// } from "@mui/icons-material";

// // ===================== STYLED DARK COMPONENTS =====================

// const DarkBanner = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "24px",
//   marginBottom: "20px",
//   boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
// }));

// const MetricCard = styled(Box)(() => ({
//   backgroundColor: "#111827",
//   borderRadius: "12px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "16px 20px",
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
// }));

// const ActionCard = styled(Card)(() => ({
//   borderRadius: "16px",
//   backgroundColor: "#111827",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   transition: "all 0.3s ease",
//   height: "100%",
//   position: "relative",
//   overflow: "hidden",
//   "&:hover": {
//     transform: "translateY(-4px)",
//     boxShadow: "0 12px 28px rgba(16, 185, 129, 0.15)",
//     borderColor: "#10b981",
//   },
// }));

// const IconBox = styled(Box)<{ bgcolor: string; iconcolor: string }>(
//   ({ bgcolor, iconcolor }) => ({
//     width: "48px",
//     height: "48px",
//     borderRadius: "12px",
//     backgroundColor: bgcolor,
//     color: iconcolor,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   })
// );

// // ===================== DASHBOARD COMPONENT =====================

// const Dashboard: React.FC = () => {
//   const navigate = useNavigate();

//   // Top summary metrics
//   const summaryMetrics = [
//     { label: "1. Loaded Stock", amount: "₹ 8,000.00", color: "#34d399" },
//     { label: "2. Returns & Unsold", amount: "₹ 500.00", color: "#38bdf8" },
//     { label: "3 & 4. Credit & Payments", amount: "₹ 3,500.00", color: "#fbbf24" },
//     { label: "5 & 6. Cash Notes & Exp.", amount: "₹ 7,100.00", color: "#c084fc" },
//   ];

//   // Quick Action Cards (without Final Calculation — that's now in banner)
//   const quickActions = [
//     {
//       id: "1",
//       title: "1. LOAD ITEMS",
//       desc: "Add initial loaded inventory & rates",
//       badgeText: "2 Items",
//       badgeBg: "#132e29",
//       badgeColor: "#34d399",
//       amountText: "Total: ₹ 8,000.00",
//       icon: <LocalShipping />,
//       iconBg: "#132e29",
//       iconColor: "#34d399",
//       route: "/load-items",
//     },
//     {
//       id: "2",
//       title: "2. RETURN ITEMS",
//       desc: "Log unsold or damaged goods returned",
//       badgeText: "1 Returns",
//       badgeBg: "#0c2a3a",
//       badgeColor: "#38bdf8",
//       amountText: "Total: ₹ 500.00",
//       icon: <AssignmentReturn />,
//       iconBg: "#0c2a3a",
//       iconColor: "#38bdf8",
//       route: "/sale/return-list",
//     },
//     {
//       id: "3",
//       title: "3. CREDIT CUSTOMER",
//       desc: "Record credit sales & party ledger updates",
//       badgeText: "1 Entries",
//       badgeBg: "#332208",
//       badgeColor: "#fbbf24",
//       amountText: "Total: ₹ 1,500.00",
//       icon: <Group />,
//       iconBg: "#332208",
//       iconColor: "#fbbf24",
//       route: "/credit-customer-entry",
//     },
//     {
//       id: "4",
//       title: "4. PAYMENT RECEIVED",
//       desc: "Log cash collections, UPI & Online receipts",
//       badgeText: "1 Payments",
//       badgeBg: "#1e1b4b",
//       badgeColor: "#a78bfa",
//       amountText: "Total: ₹ 2,000.00",
//       icon: <Payments />,
//       iconBg: "#1e1b4b",
//       iconColor: "#a78bfa",
//       route: "/payment-received-entry",
//     },
//     {
//       id: "5",
//       title: "5. NOTE SUMMARY",
//       desc: "Currency denomination counter breakdown",
//       badgeText: "Cash Counter",
//       badgeBg: "#2e1065",
//       badgeColor: "#c084fc",
//       amountText: "Cash Total: ₹ 5,300.00",
//       icon: <PointOfSale />,
//       iconBg: "#2e1065",
//       iconColor: "#c084fc",
//       route: "/note-summary-entry",
//     },
//     {
//       id: "6",
//       title: "6. EXPENSES ENTRY",
//       desc: "Fuel, toll, food & route trip expenses",
//       badgeText: "1 Expenses",
//       badgeBg: "#31121d",
//       badgeColor: "#f43f5e",
//       amountText: "Total: ₹ 1,800.00",
//       icon: <LocalGasStation />,
//       iconBg: "#31121d",
//       iconColor: "#f43f5e",
//       route: "/expenses-entry",
//     },
//     // ✅ NEW: PRODUCT LIST — replaced Final Calculation position
//     {
//       id: "7",
//       title: "7. PRODUCTS",
//       desc: "Manage items, MRP, rate and units",
//       badgeText: "Catalog",
//       badgeBg: "#2e1065",
//       badgeColor: "#c084fc",
//       amountText: "Add / Edit Items",
//       icon: <Inventory2 />,
//       iconBg: "#2e1065",
//       iconColor: "#c084fc",
//       route: "/products",
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "#090d16",
//         px: { xs: 1.5, sm: 3, md: 4 },
//         py: { xs: 2, md: 3 },
//         color: "#ffffff",
//       }}
//     >
//       <Box sx={{ width: "100%", maxWidth: 1350, mx: "auto" }}>
//         {/* ================= HEADER BANNER ================= */}
//         <DarkBanner>
//           <Box
//             display="flex"
//             flexDirection={{ xs: "column", md: "row" }}
//             justifyContent="space-between"
//             alignItems={{ xs: "flex-start", md: "center" }}
//             gap={2}
//           >
//             <Box>
//               <Box display="flex" alignItems="center" gap={1} mb={0.5}>
//                 <FiberManualRecord sx={{ fontSize: 12, color: "#10b981" }} />
//                 <Typography
//                   variant="caption"
//                   fontWeight="bold"
//                   sx={{ color: "#10b981", letterSpacing: 0.5 }}
//                 >
//                   Main Hub
//                 </Typography>
//               </Box>

//               <Typography
//                 variant="h4"
//                 fontWeight="800"
//                 sx={{
//                   fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2.1rem" },
//                   letterSpacing: 0.5,
//                   color: "#ffffff",
//                 }}
//               >
//                 VEHICLE LOADING & SETTLEMENT
//               </Typography>

//               <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
//                 Select any module below to enter stock, returns, credits,
//                 payments, cash notes, or view final settlement.
//               </Typography>
//             </Box>

//             {/* ✅ ACTION BUTTONS GROUP — Final Calculation + View Settlement */}
//             <Box
//               display="flex"
//               gap={1.5}
//               flexWrap="wrap"
//               sx={{ width: { xs: "100%", md: "auto" } }}
//             >
//               {/* Final Calculation button (moved from grid) */}
//               <Button
//                 variant="outlined"
//                 startIcon={<Calculate />}
//                 onClick={() => navigate("/final-calculation")}
//                 sx={{
//                   color: "#2dd4bf",
//                   borderColor: "rgba(45, 212, 191, 0.4)",
//                   fontWeight: "bold",
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 3,
//                   py: 1.2,
//                   flex: { xs: 1, md: "none" },
//                   "&:hover": {
//                     borderColor: "#2dd4bf",
//                     bgcolor: "rgba(45, 212, 191, 0.08)",
//                     boxShadow: "0 8px 20px rgba(45, 212, 191, 0.15)",
//                   },
//                 }}
//               >
//                 Final Calculation
//               </Button>

//               {/* View Settlement button (original) */}
//               <Button
//                 variant="contained"
//                 startIcon={<Visibility />}
//                 onClick={() => navigate("/final-calculation")}
//                 sx={{
//                   bgcolor: "#10b981",
//                   color: "#ffffff",
//                   fontWeight: "bold",
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 3,
//                   py: 1.2,
//                   flex: { xs: 1, md: "none" },
//                   boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
//                   "&:hover": { bgcolor: "#059669" },
//                 }}
//               >
//                 View Settlement
//               </Button>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* ================= METRICS SUMMARY BAR ================= */}
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           {summaryMetrics.map((metric, index) => (
//             <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
//               <MetricCard>
//                 <Typography
//                   variant="caption"
//                   sx={{ color: "#9ca3af", fontSize: "0.75rem" }}
//                 >
//                   {metric.label}
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   fontWeight="bold"
//                   sx={{
//                     color: metric.color,
//                     mt: 0.5,
//                     fontSize: { xs: "1.1rem", sm: "1.25rem" },
//                   }}
//                 >
//                   {metric.amount}
//                 </Typography>
//               </MetricCard>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ================= MAIN CARDS GRID ================= */}
//         <Grid container spacing={2.5}>
//           {quickActions.map((item:any) => (
//             <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
//               <ActionCard>
//                 <CardActionArea
//                   onClick={() => navigate(item.route)}
//                   sx={{ p: 2.5, height: "100%" }}
//                 >
//                   {/* Top Row: Icon + Badge */}
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mb={2}
//                   >
//                     <IconBox bgcolor={item.iconBg} iconcolor={item.iconColor}>
//                       {item.icon}
//                     </IconBox>

//                     <Chip
//                       label={item.badgeText}
//                       size="small"
//                       sx={{
//                         bgcolor: item.badgeBg,
//                         color: item.badgeColor,
//                         fontWeight: "bold",
//                         fontSize: "0.75rem",
//                         borderRadius: "8px",
//                       }}
//                     />
//                   </Box>

//                   {/* Title & Description */}
//                   <Typography
//                     variant="subtitle1"
//                     fontWeight="bold"
//                     sx={{
//                       color: "#ffffff",
//                       fontSize: { xs: "0.95rem", sm: "1.05rem" },
//                     }}
//                   >
//                     {item.title}
//                   </Typography>

//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: "#9ca3af",
//                       display: "block",
//                       minHeight: "36px",
//                       mt: 0.5,
//                       lineHeight: 1.3,
//                     }}
//                   >
//                     {item.desc}
//                   </Typography>

//                   {/* Bottom Amount Line */}
//                   <Typography
//                     variant="caption"
//                     fontWeight="bold"
//                     sx={{
//                       color: item.amountColor || item.iconColor,
//                       display: "block",
//                       mt: 2,
//                       fontSize: "0.8rem",
//                     }}
//                   >
//                     {item.amountText}
//                   </Typography>
//                 </CardActionArea>
//               </ActionCard>
//             </Grid>
//           ))}

//           {/* CUSTOMER LIST CARD */}
//           <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
//             <ActionCard sx={{ border: "1px dashed rgba(255,255,255,0.2)" }}>
//               <CardActionArea
//                 onClick={() => navigate("/customer-entry")}
//                 sx={{ p: 2.5, height: "100%" }}
//               >
//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                   mb={2}
//                 >
//                   <IconBox bgcolor="#0c2a3a" iconcolor="#38bdf8">
//                     <DashboardIcon />
//                   </IconBox>
//                   <Chip
//                     label="Overview"
//                     size="small"
//                     sx={{
//                       bgcolor: "#0c2a3a",
//                       color: "#38bdf8",
//                       fontWeight: "bold",
//                       fontSize: "0.75rem",
//                       borderRadius: "8px",
//                     }}
//                   />
//                 </Box>

//                 <Typography
//                   variant="subtitle1"
//                   fontWeight="bold"
//                   sx={{ color: "#ffffff" }}
//                 >
//                   CUSTOMER LIST
//                 </Typography>

//                 <Typography
//                   variant="caption"
//                   sx={{
//                     color: "#9ca3af",
//                     display: "block",
//                     minHeight: "36px",
//                     mt: 0.5,
//                   }}
//                 >
//                   Manage customers, parties & their ledger
//                 </Typography>

//                 <Typography
//                   variant="caption"
//                   fontWeight="bold"
//                   sx={{
//                     color: "#38bdf8",
//                     display: "block",
//                     mt: 2,
//                     fontSize: "0.8rem",
//                   }}
//                 >
//                   System Active
//                 </Typography>
//               </CardActionArea>
//             </ActionCard>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;






import React from "react";
import { useNavigate } from "react-router-dom";
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

  const summaryMetrics = [
    { label: "1. Loaded Stock", amount: "₹ 8,000.00", color: "#34d399" },
    { label: "2. Returns & Unsold", amount: "₹ 500.00", color: "#38bdf8" },
    {
      label: "3 & 4. Credit & Payments",
      amount: "₹ 3,500.00",
      color: "#fbbf24",
    },
    {
      label: "5 & 6. Cash Notes & Exp.",
      amount: "₹ 7,100.00",
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