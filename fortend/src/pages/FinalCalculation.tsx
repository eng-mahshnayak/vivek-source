// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Grid,
//   Typography,
//   Chip,
//   Button,
//   CircularProgress,
//   Tooltip,
//   Fab,
//   Divider,
// } from "@mui/material";
// import { styled, keyframes } from "@mui/material/styles";
// import {
//   ArrowBack,
//   Home as HomeIcon,
//   Refresh as RefreshIcon,
//   LocalShipping,
//   AssignmentReturn,
//   PointOfSale,
//   Payments,
//   Receipt,
//   Calculate,
//   TrendingUp,
//   TrendingDown,
//   CheckCircle,
//   Warning as WarningIcon,
//   Info as InfoIcon,
// } from "@mui/icons-material";

// // ===================== 🔥 DUMMY DATA TOGGLE =====================
// const USE_DUMMY_DATA = true;

// // ===================== TYPES =====================

// interface CalcData {
//   loadItem: number;
//   returnItem: number;
//   noteSummary: number;
//   paymentReceived: number;
//   expenses: number;
//   date: string;
// }

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const getAuthHeaders = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
//   },
// });

// // ===================== 🔥 DUMMY DATA =====================
// const DUMMY_DATA: CalcData = {
//   loadItem: 10000,
//   returnItem: 1000,
//   noteSummary: 9500,
//   paymentReceived: 1000,
//   expenses: 500,
//   date: new Date().toISOString().split("T")[0],
// };

// // ===================== ANIMATIONS =====================

// const fadeInUp = keyframes`
//   from { opacity: 0; transform: translateY(12px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const pulse = keyframes`
//   0%, 100% { transform: scale(1); }
//   50% { transform: scale(1.03); }
// `;

// // ===================== STYLED =====================

// const DarkBanner = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "20px 24px",
//   marginBottom: "16px",
//   boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
//   flexShrink: 0,
// }));

// const SectionCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "20px",
//   marginBottom: "16px",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   position: "relative",
//   overflow: "hidden",
//   animation: `${fadeInUp} 0.4s ease`,
//   transition: "all 0.3s ease",
//   "&:hover": {
//     borderColor: `${accentcolor}55`,
//     boxShadow: `0 12px 32px ${accentcolor}22`,
//   },
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "4px",
//     height: "100%",
//     background: `linear-gradient(180deg, ${accentcolor}, ${accentcolor}55)`,
//   },
// }));

// const ValueBox = styled(Box)<{ tone: "blue" | "red" | "green" | "amber" | "violet" }>(
//   ({ tone }) => {
//     const map = {
//       blue: { color: "#38bdf8", bg: "rgba(56, 189, 248, 0.08)", border: "rgba(56, 189, 248, 0.3)" },
//       red: { color: "#f43f5e", bg: "rgba(244, 63, 94, 0.08)", border: "rgba(244, 63, 94, 0.3)" },
//       green: { color: "#34d399", bg: "rgba(52, 211, 153, 0.08)", border: "rgba(52, 211, 153, 0.3)" },
//       amber: { color: "#fbbf24", bg: "rgba(251, 191, 36, 0.08)", border: "rgba(251, 191, 36, 0.3)" },
//       violet: { color: "#c084fc", bg: "rgba(192, 132, 252, 0.08)", border: "rgba(192, 132, 252, 0.3)" },
//     }[tone];

//     return {
//       backgroundColor: map.bg,
//       border: `1px solid ${map.border}`,
//       borderRadius: "12px",
//       padding: "14px 16px",
//       display: "flex",
//       flexDirection: "column",
//       gap: "4px",
//       transition: "all 0.2s ease",
//       "&:hover": {
//         borderColor: map.color,
//         boxShadow: `0 6px 18px ${map.color}22`,
//       },
//     };
//   }
// );

// const ResultBox = styled(Box)<{ tone: "green" | "amber" | "red" | "blue" | "violet" }>(
//   ({ tone }) => {
//     const map = {
//       green: { color: "#34d399", bg: "linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(52, 211, 153, 0.05))", border: "rgba(52, 211, 153, 0.4)" },
//       amber: { color: "#fbbf24", bg: "linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.05))", border: "rgba(251, 191, 36, 0.4)" },
//       red: { color: "#f43f5e", bg: "linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(244, 63, 94, 0.05))", border: "rgba(244, 63, 94, 0.4)" },
//       blue: { color: "#38bdf8", bg: "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(56, 189, 248, 0.05))", border: "rgba(56, 189, 248, 0.4)" },
//       violet: { color: "#c084fc", bg: "linear-gradient(135deg, rgba(192, 132, 252, 0.15), rgba(192, 132, 252, 0.05))", border: "rgba(192, 132, 252, 0.4)" },  // 🔥 ADD
//     }[tone];
//     // ...baaki same
//   }
// );

// const OperatorChip = styled(Box)<{ tone: "blue" | "red" | "green" }>(
//   ({ tone }) => {
//     const map = {
//       blue: { color: "#38bdf8", bg: "rgba(56, 189, 248, 0.15)", border: "rgba(56, 189, 248, 0.4)" },
//       red: { color: "#f43f5e", bg: "rgba(244, 63, 94, 0.15)", border: "rgba(244, 63, 94, 0.4)" },
//       green: { color: "#34d399", bg: "rgba(52, 211, 153, 0.15)", border: "rgba(52, 211, 153, 0.4)" },
//     }[tone];

//     return {
//       width: 44,
//       height: 44,
//       borderRadius: "12px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: map.bg,
//       color: map.color,
//       border: `1.5px solid ${map.border}`,
//       fontSize: "1.3rem",
//       fontWeight: 900,
//       flexShrink: 0,
//       boxShadow: `0 4px 12px ${map.color}22`,
//     };
//   }
// );

// const StepBadge = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
//   width: 32,
//   height: 32,
//   borderRadius: "10px",
//   backgroundColor: `${accentcolor}22`,
//   color: accentcolor,
//   border: `1.5px solid ${accentcolor}55`,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontWeight: 900,
//   fontSize: "0.85rem",
//   flexShrink: 0,
// }));

// // ===================== HELPERS =====================

// const formatCurrency = (amount: number) =>
//   `₹ ${amount.toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;

// const formatDate = (d: string) =>
//   new Date(d).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     weekday: "long",
//   });

// // ===================== MAIN COMPONENT =====================

// const FinalCalculation: React.FC = () => {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<CalcData>(DUMMY_DATA);

//   // ===================== CALCULATIONS =====================
//   const todaySale = data.loadItem - data.returnItem;
//   const todaySalePayment = data.noteSummary - data.paymentReceived;
//   const grandTotal = todaySalePayment + data.expenses;
//   const difference = grandTotal - todaySale;

//   const isBalanced = Math.abs(difference) < 0.01;

//   // ===================== FETCH =====================
//   const fetchData = async () => {
//     setLoading(true);

//     if (USE_DUMMY_DATA) {
//       setTimeout(() => {
//         setData(DUMMY_DATA);
//         setLoading(false);
//       }, 400);
//       return;
//     }

//     try {
//       const today = new Date().toISOString().split("T")[0];
//       const res = await axios.get(`${API_URL}/final-calculation`, {
//         params: { date: today },
//         ...getAuthHeaders(),
//       });

//       if (res.data?.success) {
//         setData(res.data.data);
//       } else if (res.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         setData(DUMMY_DATA);
//       }
//     } catch (err) {
//       console.error(err);
//       setData(DUMMY_DATA);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ===================== LOADING =====================
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           height: "85vh",
//           bgcolor: "#090d16",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           gap: 2,
//         }}
//       >
//         <CircularProgress sx={{ color: "#2dd4bf" }} />
//         <Typography sx={{ color: "#9ca3af" }}>
//           Calculating settlement...
//         </Typography>
//       </Box>
//     );
//   }

//   // ===================== RENDER =====================
//   return (
//     <Box
//       sx={{
//         height: "85vh",
//         maxHeight: "100vh",
//         overflow: "hidden",
//         bgcolor: "#090d16",
//         px: { xs: 1.5, sm: 2, md: 3 },
//         py: { xs: 1.5, md: 2 },
//         color: "#ffffff",
//         display: "flex",
//         flexDirection: "column",
//         boxSizing: "border-box",
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: 1200,
//           mx: "auto",
//           display: "flex",
//           flexDirection: "column",
//           flex: 1,
//           minHeight: 0,
//         }}
//       >
//         {/* HEADER */}
//         <DarkBanner>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             flexWrap="wrap"
//             gap={2}
//           >
//             <Box display="flex" alignItems="center" gap={2}>
//               <Button
//                 variant="outlined"
//                 startIcon={<ArrowBack />}
//                 onClick={() => navigate("/dashboard")}
//                 sx={{
//                   color: "#e5e7eb",
//                   borderColor: "rgba(255, 255, 255, 0.15)",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2,
//                   py: 0.9,
//                   fontSize: "0.8rem",
//                   "&:hover": {
//                     borderColor: "#2dd4bf",
//                     color: "#2dd4bf",
//                     bgcolor: "rgba(45, 212, 191, 0.08)",
//                   },
//                 }}
//               >
//                 Dashboard
//               </Button>

//               <Box display="flex" alignItems="center" gap={1.5}>
//                 <Box
//                   sx={{
//                     width: 42,
//                     height: 42,
//                     borderRadius: "12px",
//                     background:
//                       "linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)",
//                     color: "#ffffff",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     boxShadow: "0 6px 20px rgba(45, 212, 191, 0.4)",
//                   }}
//                 >
//                   <Calculate />
//                 </Box>
//                 <Box>
//                   <Typography
//                     sx={{
//                       color: "#2dd4bf",
//                       letterSpacing: 0.5,
//                       fontSize: "0.7rem",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Auto Settlement Engine
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="800"
//                     sx={{
//                       fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
//                     }}
//                   >
//                     FINAL CALCULATION
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Box display="flex" gap={1.2} alignItems="center" flexWrap="wrap">
//               <Chip
//                 icon={<InfoIcon sx={{ fontSize: 14 }} />}
//                 label={formatDate(data.date)}
//                 size="small"
//                 sx={{
//                   bgcolor: "rgba(56, 189, 248, 0.1)",
//                   color: "#38bdf8",
//                   border: "1px solid rgba(56, 189, 248, 0.3)",
//                   fontWeight: 700,
//                   fontSize: "0.7rem",
//                   height: "28px",
//                   "& .MuiChip-icon": { color: "#38bdf8" },
//                 }}
//               />

//               <Button
//                 variant="outlined"
//                 startIcon={<RefreshIcon />}
//                 onClick={fetchData}
//                 disabled={loading}
//                 sx={{
//                   color: "#e5e7eb",
//                   borderColor: "rgba(255, 255, 255, 0.15)",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.2,
//                   py: 1,
//                   fontSize: "0.8rem",
//                   "&:hover": {
//                     borderColor: "#2dd4bf",
//                     color: "#2dd4bf",
//                     bgcolor: "rgba(45, 212, 191, 0.08)",
//                   },
//                 }}
//               >
//                 Recalculate
//               </Button>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* ================= TOP SUMMARY ================= */}
//         <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
//           <Grid size={{ xs: 6, md: 3 }}>
//             <ResultBox tone="blue">
//               <Typography
//                 sx={{
//                   color: "#9ca3af",
//                   fontSize: "0.68rem",
//                   fontWeight: 700,
//                   letterSpacing: 0.5,
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Today Sale
//               </Typography>
//               <Typography
//                 sx={{
//                   color: "#38bdf8",
//                   fontWeight: 900,
//                   fontSize: { xs: "1.1rem", sm: "1.35rem" },
//                 }}
//               >
//                 {formatCurrency(todaySale)}
//               </Typography>
//             </ResultBox>
//           </Grid>

//           <Grid size={{ xs: 6, md: 3 }}>
//             <ResultBox tone="violet">
//               <Typography
//                 sx={{
//                   color: "#9ca3af",
//                   fontSize: "0.68rem",
//                   fontWeight: 700,
//                   letterSpacing: 0.5,
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Sale Payment
//               </Typography>
//               <Typography
//                 sx={{
//                   color: "#c084fc",
//                   fontWeight: 900,
//                   fontSize: { xs: "1.1rem", sm: "1.35rem" },
//                 }}
//               >
//                 {formatCurrency(todaySalePayment)}
//               </Typography>
//             </ResultBox>
//           </Grid>

//           <Grid size={{ xs: 6, md: 3 }}>
//             <ResultBox tone="amber">
//               <Typography
//                 sx={{
//                   color: "#9ca3af",
//                   fontSize: "0.68rem",
//                   fontWeight: 700,
//                   letterSpacing: 0.5,
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Grand Total
//               </Typography>
//               <Typography
//                 sx={{
//                   color: "#fbbf24",
//                   fontWeight: 900,
//                   fontSize: { xs: "1.1rem", sm: "1.35rem" },
//                 }}
//               >
//                 {formatCurrency(grandTotal)}
//               </Typography>
//             </ResultBox>
//           </Grid>

//           <Grid size={{ xs: 6, md: 3 }}>
//             <ResultBox tone={isBalanced ? "green" : "red"}>
//               <Box display="flex" alignItems="center" gap={0.5}>
//                 {isBalanced ? (
//                   <CheckCircle sx={{ color: "#34d399", fontSize: 16 }} />
//                 ) : (
//                   <WarningIcon sx={{ color: "#f43f5e", fontSize: 16 }} />
//                 )}
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.68rem",
//                     fontWeight: 700,
//                     letterSpacing: 0.5,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Difference
//                 </Typography>
//               </Box>
//               <Typography
//                 sx={{
//                   color: isBalanced ? "#34d399" : "#f43f5e",
//                   fontWeight: 900,
//                   fontSize: { xs: "1.1rem", sm: "1.35rem" },
//                   animation: isBalanced ? "none" : `${pulse} 2s ease infinite`,
//                 }}
//               >
//                 {formatCurrency(difference)}
//               </Typography>
//               <Typography
//                 sx={{
//                   color: isBalanced ? "#34d399" : "#f43f5e",
//                   fontSize: "0.65rem",
//                   fontWeight: 600,
//                 }}
//               >
//                 {isBalanced ? "Balanced ✓" : "Mismatch!"}
//               </Typography>
//             </ResultBox>
//           </Grid>
//         </Grid>

//         {/* ================= STEP-BY-STEP CALCULATION ================= */}
//         <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", pr: 0.5 }}>
//           {/* STEP 1: TODAY SALE */}
//           <SectionCard accentcolor="#38bdf8">
//             <Box display="flex" alignItems="center" gap={1.5} mb={2}>
//               <StepBadge accentcolor="#38bdf8">1</StepBadge>
//               <Box>
//                 <Typography
//                   sx={{
//                     color: "#38bdf8",
//                     fontWeight: 800,
//                     fontSize: "0.9rem",
//                     letterSpacing: 0.5,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Today Sale Calculation
//                 </Typography>
//                 <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.2 }}>
//                   Load Item − Return Item = Today Sale
//                 </Typography>
//               </Box>
//             </Box>

//             <Grid container spacing={1.5} alignItems="stretch">
//               <Grid size={{ xs: 12, md: 4 }}>
//                 <ValueBox tone="blue">
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <LocalShipping sx={{ color: "#38bdf8", fontSize: 18 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.5,
//                       }}
//                     >
//                       Load Item
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#38bdf8",
//                       fontWeight: 900,
//                       fontSize: "1.25rem",
//                     }}
//                   >
//                     {formatCurrency(data.loadItem)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, md: 1 }}
//                 sx={{ display: "flex", justifyContent: "center" }}
//               >
//                 <OperatorChip tone="red">−</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, md: 4 }}>
//                 <ValueBox tone="red">
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <AssignmentReturn
//                       sx={{ color: "#f43f5e", fontSize: 18 }}
//                     />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.5,
//                       }}
//                     >
//                       Return Item
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#f43f5e",
//                       fontWeight: 900,
//                       fontSize: "1.25rem",
//                     }}
//                   >
//                     {formatCurrency(data.returnItem)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, md: 1 }}
//                 sx={{ display: "flex", justifyContent: "center" }}
//               >
//                 <OperatorChip tone="green">=</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, md: 2 }}>
//                 <ResultBox tone="blue">
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.65rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: 0.5,
//                     }}
//                   >
//                     Today Sale
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#38bdf8",
//                       fontWeight: 900,
//                       fontSize: "1.15rem",
//                     }}
//                   >
//                     {formatCurrency(todaySale)}
//                   </Typography>
//                 </ResultBox>
//               </Grid>
//             </Grid>
//           </SectionCard>

//           {/* STEP 2: TODAY SALE KA PAYMENT RECEIVED */}
//           <SectionCard accentcolor="#c084fc">
//             <Box display="flex" alignItems="center" gap={1.5} mb={2}>
//               <StepBadge accentcolor="#c084fc">2</StepBadge>
//               <Box>
//                 <Typography
//                   sx={{
//                     color: "#c084fc",
//                     fontWeight: 800,
//                     fontSize: "0.9rem",
//                     letterSpacing: 0.5,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Today Sale ka Payment Received
//                 </Typography>
//                 <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.2 }}>
//                   Note Summary − Payment Received = Today Sale Payment
//                 </Typography>
//               </Box>
//             </Box>

//             <Grid container spacing={1.5} alignItems="stretch">
//               <Grid size={{ xs: 12, md: 4 }}>
//                 <ValueBox tone="violet">
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <PointOfSale sx={{ color: "#c084fc", fontSize: 18 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.5,
//                       }}
//                     >
//                       Note Summary
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#c084fc",
//                       fontWeight: 900,
//                       fontSize: "1.25rem",
//                     }}
//                   >
//                     {formatCurrency(data.noteSummary)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, md: 1 }}
//                 sx={{ display: "flex", justifyContent: "center" }}
//               >
//                 <OperatorChip tone="red">−</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, md: 4 }}>
//                 <ValueBox tone="red">
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Payments sx={{ color: "#f43f5e", fontSize: 18 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.5,
//                       }}
//                     >
//                       Payment Received
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#f43f5e",
//                       fontWeight: 900,
//                       fontSize: "1.25rem",
//                     }}
//                   >
//                     {formatCurrency(data.paymentReceived)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, md: 1 }}
//                 sx={{ display: "flex", justifyContent: "center" }}
//               >
//                 <OperatorChip tone="green">=</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, md: 2 }}>
//                 <ResultBox tone="violet">
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.65rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: 0.5,
//                     }}
//                   >
//                     Sale Payment
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#c084fc",
//                       fontWeight: 900,
//                       fontSize: "1.15rem",
//                     }}
//                   >
//                     {formatCurrency(todaySalePayment)}
//                   </Typography>
//                 </ResultBox>
//               </Grid>
//             </Grid>
//           </SectionCard>

//           {/* STEP 3: GRAND TOTAL */}
//           <SectionCard accentcolor="#fbbf24">
//             <Box display="flex" alignItems="center" gap={1.5} mb={2}>
//               <StepBadge accentcolor="#fbbf24">3</StepBadge>
//               <Box>
//                 <Typography
//                   sx={{
//                     color: "#fbbf24",
//                     fontWeight: 800,
//                     fontSize: "0.9rem",
//                     letterSpacing: 0.5,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Grand Total
//                 </Typography>
//                 <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.2 }}>
//                   Today Sale Payment + Expenses = Grand Total
//                 </Typography>
//               </Box>
//             </Box>

//             <Grid container spacing={1.5} alignItems="stretch">
//               <Grid size={{ xs: 12, md: 4 }}>
//                 <ValueBox tone="violet">
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Payments sx={{ color: "#c084fc", fontSize: 18 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.5,
//                       }}
//                     >
//                       Sale Payment
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#c084fc",
//                       fontWeight: 900,
//                       fontSize: "1.25rem",
//                     }}
//                   >
//                     {formatCurrency(todaySalePayment)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, md: 1 }}
//                 sx={{ display: "flex", justifyContent: "center" }}
//               >
//                 <OperatorChip tone="green">+</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, md: 4 }}>
//                 <ValueBox tone="red">
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Receipt sx={{ color: "#f43f5e", fontSize: 18 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.5,
//                       }}
//                     >
//                       Expenses
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#f43f5e",
//                       fontWeight: 900,
//                       fontSize: "1.25rem",
//                     }}
//                   >
//                     {formatCurrency(data.expenses)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, md: 1 }}
//                 sx={{ display: "flex", justifyContent: "center" }}
//               >
//                 <OperatorChip tone="blue">=</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, md: 2 }}>
//                 <ResultBox tone="amber">
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.65rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: 0.5,
//                     }}
//                   >
//                     Grand Total
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#fbbf24",
//                       fontWeight: 900,
//                       fontSize: "1.15rem",
//                     }}
//                   >
//                     {formatCurrency(grandTotal)}
//                   </Typography>
//                 </ResultBox>
//               </Grid>
//             </Grid>
//           </SectionCard>

//           {/* STEP 4: DIFFERENCE */}
//           <SectionCard accentcolor={isBalanced ? "#34d399" : "#f43f5e"}>
//             <Box display="flex" alignItems="center" gap={1.5} mb={2}>
//               <StepBadge accentcolor={isBalanced ? "#34d399" : "#f43f5e"}>
//                 4
//               </StepBadge>
//               <Box>
//                 <Typography
//                   sx={{
//                     color: isBalanced ? "#34d399" : "#f43f5e",
//                     fontWeight: 800,
//                     fontSize: "0.9rem",
//                     letterSpacing: 0.5,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Difference Check
//                 </Typography>
//                 <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.2 }}>
//                   Grand Total − Today Sale = Difference (should be zero)
//                 </Typography>
//               </Box>
//             </Box>

//             <Grid container spacing={1.5} alignItems="stretch">
//               <Grid size={{ xs: 12, md: 4 }}>
//                 <ValueBox tone="amber">
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Calculate sx={{ color: "#fbbf24", fontSize: 18 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.5,
//                       }}
//                     >
//                       Grand Total
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#fbbf24",
//                       fontWeight: 900,
//                       fontSize: "1.25rem",
//                     }}
//                   >
//                     {formatCurrency(grandTotal)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, md: 1 }}
//                 sx={{ display: "flex", justifyContent: "center" }}
//               >
//                 <OperatorChip tone="red">−</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, md: 4 }}>
//                 <ValueBox tone="blue">
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <TrendingUp sx={{ color: "#38bdf8", fontSize: 18 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.5,
//                       }}
//                     >
//                       Today Sale
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#38bdf8",
//                       fontWeight: 900,
//                       fontSize: "1.25rem",
//                     }}
//                   >
//                     {formatCurrency(todaySale)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, md: 1 }}
//                 sx={{ display: "flex", justifyContent: "center" }}
//               >
//                 <OperatorChip tone="green">=</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, md: 2 }}>
//                 <ResultBox tone={isBalanced ? "green" : "red"}>
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.65rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: 0.5,
//                     }}
//                   >
//                     Difference
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: isBalanced ? "#34d399" : "#f43f5e",
//                       fontWeight: 900,
//                       fontSize: "1.15rem",
//                     }}
//                   >
//                     {formatCurrency(difference)}
//                   </Typography>
//                 </ResultBox>
//               </Grid>
//             </Grid>

//             {/* Final Status Banner */}
//             <Box
//               sx={{
//                 mt: 2.5,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 1.2,
//                 py: 1.8,
//                 px: 2.5,
//                 borderRadius: "12px",
//                 backgroundColor: isBalanced
//                   ? "rgba(52, 211, 153, 0.1)"
//                   : "rgba(244, 63, 94, 0.1)",
//                 border: isBalanced
//                   ? "1.5px solid rgba(52, 211, 153, 0.4)"
//                   : "1.5px solid rgba(244, 63, 94, 0.4)",
//               }}
//             >
//               {isBalanced ? (
//                 <CheckCircle sx={{ color: "#34d399", fontSize: 24 }} />
//               ) : (
//                 <WarningIcon sx={{ color: "#f43f5e", fontSize: 24 }} />
//               )}
//               <Typography
//                 sx={{
//                   color: isBalanced ? "#34d399" : "#f43f5e",
//                   fontWeight: 800,
//                   fontSize: "0.95rem",
//                   letterSpacing: 0.5,
//                 }}
//               >
//                 {isBalanced
//                   ? "✓ Settlement Balanced — All calculations match perfectly!"
//                   : "⚠ Mismatch detected — Please review the entries above."}
//               </Typography>
//             </Box>
//           </SectionCard>

//           <Box sx={{ height: 8 }} />
//         </Box>
//       </Box>

//       {/* FLOATING DASHBOARD */}
//       <Tooltip title="Back to Dashboard" placement="left">
//         <Fab
//           onClick={() => navigate("/dashboard")}
//           sx={{
//             position: "fixed",
//             bottom: 20,
//             right: 20,
//             zIndex: 1200,
//             background: "linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)",
//             color: "#ffffff",
//             width: 52,
//             height: 52,
//             boxShadow: "0 8px 24px rgba(45, 212, 191, 0.5)",
//             "&:hover": {
//               boxShadow: "0 12px 32px rgba(45, 212, 191, 0.7)",
//             },
//           }}
//         >
//           <HomeIcon />
//         </Fab>
//       </Tooltip>
//     </Box>
//   );
// };

// export default FinalCalculation;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Tooltip,
  Fab,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import {
  ArrowBack,
  Home as HomeIcon,
  Refresh as RefreshIcon,
  LocalShipping,
  AssignmentReturn,
  PointOfSale,
  Payments,
  Receipt,
  Calculate,
  TrendingUp,
  CheckCircle,
  Warning as WarningIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

// ===================== 🔥 DUMMY DATA TOGGLE =====================
const USE_DUMMY_DATA = false; // 👈 API integrated

// ===================== TYPES =====================

interface CalcData {
  loadItem: number;
  returnItem: number;
  noteSummary: number;
  paymentReceived: number;
  expenses: number;
  date: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

// ===================== 🔥 DUMMY DATA =====================
const DUMMY_DATA: CalcData = {
  loadItem: 10000,
  returnItem: 1000,
  noteSummary: 9500,
  paymentReceived: 1000,
  expenses: 500,
  date: new Date().toISOString().split("T")[0],
};

// ===================== ANIMATIONS =====================

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
`;

// ===================== STYLED =====================

const DarkBanner = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px 24px",
  marginBottom: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  flexShrink: 0,
}));

const SectionCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px",
  marginBottom: "16px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  position: "relative",
  overflow: "hidden",
  animation: `${fadeInUp} 0.4s ease`,
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: `${accentcolor}55`,
    boxShadow: `0 12px 32px ${accentcolor}22`,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
    background: `linear-gradient(180deg, ${accentcolor}, ${accentcolor}55)`,
  },
}));

const VALUE_TONE_MAP: Record<
  "blue" | "red" | "green" | "amber" | "violet",
  { color: string; bg: string; border: string }
> = {
  blue: {
    color: "#38bdf8",
    bg: "rgba(56, 189, 248, 0.08)",
    border: "rgba(56, 189, 248, 0.3)",
  },
  red: {
    color: "#f43f5e",
    bg: "rgba(244, 63, 94, 0.08)",
    border: "rgba(244, 63, 94, 0.3)",
  },
  green: {
    color: "#34d399",
    bg: "rgba(52, 211, 153, 0.08)",
    border: "rgba(52, 211, 153, 0.3)",
  },
  amber: {
    color: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.08)",
    border: "rgba(251, 191, 36, 0.3)",
  },
  violet: {
    color: "#c084fc",
    bg: "rgba(192, 132, 252, 0.08)",
    border: "rgba(192, 132, 252, 0.3)",
  },
};

const ValueBox = styled(Box)<{ tone: keyof typeof VALUE_TONE_MAP }>(
  ({ tone }) => {
    const map = VALUE_TONE_MAP[tone] || VALUE_TONE_MAP.blue;
    return {
      backgroundColor: map.bg,
      border: `1px solid ${map.border}`,
      borderRadius: "12px",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      height: "100%",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: map.color,
        boxShadow: `0 6px 18px ${map.color}22`,
      },
    };
  }
);

const RESULT_TONE_MAP: Record<
  "green" | "amber" | "red" | "blue" | "violet",
  { color: string; bg: string; border: string }
> = {
  green: {
    color: "#34d399",
    bg: "linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(52, 211, 153, 0.05))",
    border: "rgba(52, 211, 153, 0.4)",
  },
  amber: {
    color: "#fbbf24",
    bg: "linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.05))",
    border: "rgba(251, 191, 36, 0.4)",
  },
  red: {
    color: "#f43f5e",
    bg: "linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(244, 63, 94, 0.05))",
    border: "rgba(244, 63, 94, 0.4)",
  },
  blue: {
    color: "#38bdf8",
    bg: "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(56, 189, 248, 0.05))",
    border: "rgba(56, 189, 248, 0.4)",
  },
  violet: {
    color: "#c084fc",
    bg: "linear-gradient(135deg, rgba(192, 132, 252, 0.15), rgba(192, 132, 252, 0.05))",
    border: "rgba(192, 132, 252, 0.4)",
  },
};

const ResultBox = styled(Box)<{ tone: keyof typeof RESULT_TONE_MAP }>(
  ({ tone }) => {
    const map = RESULT_TONE_MAP[tone] || RESULT_TONE_MAP.blue;
    return {
      background: map.bg,
      border: `2px solid ${map.border}`,
      borderRadius: "14px",
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      height: "100%",
      minHeight: "110px",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle at 50% 0%, ${map.color}22, transparent 60%)`,
        pointerEvents: "none",
      },
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: `0 12px 32px ${map.color}33`,
      },
    };
  }
);

const OperatorChip = styled(Box)<{ tone: "blue" | "red" | "green" }>(
  ({ tone }) => {
    const map = {
      blue: {
        color: "#38bdf8",
        bg: "rgba(56, 189, 248, 0.15)",
        border: "rgba(56, 189, 248, 0.4)",
      },
      red: {
        color: "#f43f5e",
        bg: "rgba(244, 63, 94, 0.15)",
        border: "rgba(244, 63, 94, 0.4)",
      },
      green: {
        color: "#34d399",
        bg: "rgba(52, 211, 153, 0.15)",
        border: "rgba(52, 211, 153, 0.4)",
      },
    }[tone];

    return {
      width: 44,
      height: 44,
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: map.bg,
      color: map.color,
      border: `1.5px solid ${map.border}`,
      fontSize: "1.3rem",
      fontWeight: 900,
      flexShrink: 0,
      boxShadow: `0 4px 12px ${map.color}22`,
    };
  }
);

const StepBadge = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
  width: 32,
  height: 32,
  borderRadius: "10px",
  backgroundColor: `${accentcolor}22`,
  color: accentcolor,
  border: `1.5px solid ${accentcolor}55`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
  fontSize: "0.85rem",
  flexShrink: 0,
}));

// ===================== HELPERS =====================

const formatCurrency = (amount: number) =>
  `₹ ${(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "long",
  });

// ===================== MAIN COMPONENT =====================

const FinalCalculation: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CalcData>(DUMMY_DATA);

  // ===================== CALCULATIONS =====================
  const todaySale = data.loadItem - data.returnItem;
  const todaySalePayment = data.noteSummary - data.paymentReceived;
  const grandTotal = todaySalePayment + data.expenses;
  const difference = grandTotal - todaySale;

  const isBalanced = Math.abs(difference) < 0.01;

  // ===================== FETCH =====================
  const fetchData = async () => {
    setLoading(true);

    // 🔥 DUMMY MODE
    if (USE_DUMMY_DATA) {
      setTimeout(() => {
        setData(DUMMY_DATA);
        setLoading(false);
      }, 400);
      return;
    }

    // 🔥 REAL MODE — API
    try {
      const res = await axios.get(
        `${API_URL}/users/gettodaycalculation`,
        getAuthHeaders()
      );

      if (res.data?.success === true && res.data?.data) {
        setData(res.data.data);
      } else if (res.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        setData(DUMMY_DATA);
      }
    } catch (err: any) {
      console.error("Fetch calculation error:", err);
      if (err.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        setData(DUMMY_DATA);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===================== LOADING =====================
  if (loading) {
    return (
      <Box
        sx={{
          height: "85vh",
          bgcolor: "#090d16",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "#2dd4bf" }} />
        <Typography sx={{ color: "#9ca3af" }}>
          Calculating settlement...
        </Typography>
      </Box>
    );
  }

  // ===================== RENDER =====================
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
          maxWidth: 1200,
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
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/dashboard")}
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
                    borderColor: "#2dd4bf",
                    color: "#2dd4bf",
                    bgcolor: "rgba(45, 212, 191, 0.08)",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box display="flex" alignItems="center" gap={1.5}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 20px rgba(45, 212, 191, 0.4)",
                  }}
                >
                  <Calculate />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "#2dd4bf",
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    Auto Settlement Engine
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
                    }}
                  >
                    FINAL CALCULATION
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box display="flex" gap={1.2} alignItems="center" flexWrap="wrap">
              <Chip
                icon={<InfoIcon sx={{ fontSize: 14 }} />}
                label={formatDate(data.date)}
                size="small"
                sx={{
                  bgcolor: "rgba(56, 189, 248, 0.1)",
                  color: "#38bdf8",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "28px",
                  "& .MuiChip-icon": { color: "#38bdf8" },
                }}
              />

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchData}
                disabled={loading}
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.2,
                  py: 1,
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#2dd4bf",
                    color: "#2dd4bf",
                    bgcolor: "rgba(45, 212, 191, 0.08)",
                  },
                }}
              >
                Recalculate
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* TOP SUMMARY */}
        <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <ResultBox tone="blue">
              <Typography
                sx={{
                  color: "#9ca3af",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Today Sale
              </Typography>
              <Typography
                sx={{
                  color: "#38bdf8",
                  fontWeight: 900,
                  fontSize: { xs: "1.1rem", sm: "1.35rem" },
                }}
              >
                {formatCurrency(todaySale)}
              </Typography>
            </ResultBox>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <ResultBox tone="violet">
              <Typography
                sx={{
                  color: "#9ca3af",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Sale Payment
              </Typography>
              <Typography
                sx={{
                  color: "#c084fc",
                  fontWeight: 900,
                  fontSize: { xs: "1.1rem", sm: "1.35rem" },
                }}
              >
                {formatCurrency(todaySalePayment)}
              </Typography>
            </ResultBox>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <ResultBox tone="amber">
              <Typography
                sx={{
                  color: "#9ca3af",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Grand Total
              </Typography>
              <Typography
                sx={{
                  color: "#fbbf24",
                  fontWeight: 900,
                  fontSize: { xs: "1.1rem", sm: "1.35rem" },
                }}
              >
                {formatCurrency(grandTotal)}
              </Typography>
            </ResultBox>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <ResultBox tone={isBalanced ? "green" : "red"}>
              <Box display="flex" alignItems="center" gap={0.5}>
                {isBalanced ? (
                  <CheckCircle sx={{ color: "#34d399", fontSize: 16 }} />
                ) : (
                  <WarningIcon sx={{ color: "#f43f5e", fontSize: 16 }} />
                )}
                <Typography
                  sx={{
                    color: "#9ca3af",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Difference
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: isBalanced ? "#34d399" : "#f43f5e",
                  fontWeight: 900,
                  fontSize: { xs: "1.1rem", sm: "1.35rem" },
                  animation: isBalanced ? "none" : `${pulse} 2s ease infinite`,
                }}
              >
                {formatCurrency(difference)}
              </Typography>
              <Typography
                sx={{
                  color: isBalanced ? "#34d399" : "#f43f5e",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                }}
              >
                {isBalanced ? "Balanced ✓" : "Mismatch!"}
              </Typography>
            </ResultBox>
          </Grid>
        </Grid>

        {/* STEP-BY-STEP CALCULATION */}
        <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", pr: 0.5 }}>
          {/* STEP 1 */}
          <SectionCard accentcolor="#38bdf8">
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <StepBadge accentcolor="#38bdf8">1</StepBadge>
              <Box>
                <Typography
                  sx={{
                    color: "#38bdf8",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Today Sale Calculation
                </Typography>
                <Typography
                  sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.2 }}
                >
                  Load Item − Return Item = Today Sale
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={1.5} alignItems="stretch">
              <Grid size={{ xs: 12, md: 4 }}>
                <ValueBox tone="blue">
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocalShipping sx={{ color: "#38bdf8", fontSize: 18 }} />
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Load Item
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#38bdf8",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                    }}
                  >
                    {formatCurrency(data.loadItem)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, md: 1 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OperatorChip tone="red">−</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <ValueBox tone="red">
                  <Box display="flex" alignItems="center" gap={1}>
                    <AssignmentReturn
                      sx={{ color: "#f43f5e", fontSize: 18 }}
                    />
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Return Item
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#f43f5e",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                    }}
                  >
                    {formatCurrency(data.returnItem)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, md: 1 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OperatorChip tone="green">=</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, md: 2 }}>
                <ResultBox tone="blue">
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Today Sale
                  </Typography>
                  <Typography
                    sx={{
                      color: "#38bdf8",
                      fontWeight: 900,
                      fontSize: "1.15rem",
                    }}
                  >
                    {formatCurrency(todaySale)}
                  </Typography>
                </ResultBox>
              </Grid>
            </Grid>
          </SectionCard>

          {/* STEP 2 */}
          <SectionCard accentcolor="#c084fc">
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <StepBadge accentcolor="#c084fc">2</StepBadge>
              <Box>
                <Typography
                  sx={{
                    color: "#c084fc",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Today  Payment Received
                </Typography>
                <Typography
                  sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.2 }}
                >
                  Note Summary − Previous Payment = Today Sale Payment
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={1.5} alignItems="stretch">
              <Grid size={{ xs: 12, md: 4 }}>
                <ValueBox tone="violet">
                  <Box display="flex" alignItems="center" gap={1}>
                    <PointOfSale sx={{ color: "#c084fc", fontSize: 18 }} />
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Note Summary
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#c084fc",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                    }}
                  >
                    {formatCurrency(data.noteSummary)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, md: 1 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OperatorChip tone="red">−</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <ValueBox tone="red">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Payments sx={{ color: "#f43f5e", fontSize: 18 }} />
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Previous Payment
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#f43f5e",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                    }}
                  >
                    {formatCurrency(data.paymentReceived)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, md: 1 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OperatorChip tone="green">=</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, md: 2 }}>
                <ResultBox tone="violet">
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Sale Payment
                  </Typography>
                  <Typography
                    sx={{
                      color: "#c084fc",
                      fontWeight: 900,
                      fontSize: "1.15rem",
                    }}
                  >
                    {formatCurrency(todaySalePayment)}
                  </Typography>
                </ResultBox>
              </Grid>
            </Grid>
          </SectionCard>

          {/* STEP 3 */}
          <SectionCard accentcolor="#fbbf24">
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <StepBadge accentcolor="#fbbf24">3</StepBadge>
              <Box>
                <Typography
                  sx={{
                    color: "#fbbf24",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Grand Total
                </Typography>
                <Typography
                  sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.2 }}
                >
                  Today Sale Payment + Expenses = Grand Total
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={1.5} alignItems="stretch">
              <Grid size={{ xs: 12, md: 4 }}>
                <ValueBox tone="violet">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Payments sx={{ color: "#c084fc", fontSize: 18 }} />
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Sale Payment
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#c084fc",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                    }}
                  >
                    {formatCurrency(todaySalePayment)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, md: 1 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OperatorChip tone="green">+</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <ValueBox tone="red">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Receipt sx={{ color: "#f43f5e", fontSize: 18 }} />
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Expenses
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#f43f5e",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                    }}
                  >
                    {formatCurrency(data.expenses)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, md: 1 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OperatorChip tone="blue">=</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, md: 2 }}>
                <ResultBox tone="amber">
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Grand Total
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fbbf24",
                      fontWeight: 900,
                      fontSize: "1.15rem",
                    }}
                  >
                    {formatCurrency(grandTotal)}
                  </Typography>
                </ResultBox>
              </Grid>
            </Grid>
          </SectionCard>

          {/* STEP 4 */}
          <SectionCard accentcolor={isBalanced ? "#34d399" : "#f43f5e"}>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <StepBadge accentcolor={isBalanced ? "#34d399" : "#f43f5e"}>
                4
              </StepBadge>
              <Box>
                <Typography
                  sx={{
                    color: isBalanced ? "#34d399" : "#f43f5e",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  Difference Check
                </Typography>
                <Typography
                  sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.2 }}
                >
                  Grand Total − Today Sale = Difference (should be zero)
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={1.5} alignItems="stretch">
              <Grid size={{ xs: 12, md: 4 }}>
                <ValueBox tone="amber">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Calculate sx={{ color: "#fbbf24", fontSize: 18 }} />
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Grand Total
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#fbbf24",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                    }}
                  >
                    {formatCurrency(grandTotal)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, md: 1 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OperatorChip tone="red">−</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <ValueBox tone="blue">
                  <Box display="flex" alignItems="center" gap={1}>
                    <TrendingUp sx={{ color: "#38bdf8", fontSize: 18 }} />
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Today Sale
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#38bdf8",
                      fontWeight: 900,
                      fontSize: "1.25rem",
                    }}
                  >
                    {formatCurrency(todaySale)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, md: 1 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <OperatorChip tone="green">=</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, md: 2 }}>
                <ResultBox tone={isBalanced ? "green" : "red"}>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Difference
                  </Typography>
                  <Typography
                    sx={{
                      color: isBalanced ? "#34d399" : "#f43f5e",
                      fontWeight: 900,
                      fontSize: "1.15rem",
                    }}
                  >
                    {formatCurrency(difference)}
                  </Typography>
                </ResultBox>
              </Grid>
            </Grid>

            {/* Final Status Banner */}
            <Box
              sx={{
                mt: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.2,
                py: 1.8,
                px: 2.5,
                borderRadius: "12px",
                backgroundColor: isBalanced
                  ? "rgba(52, 211, 153, 0.1)"
                  : "rgba(244, 63, 94, 0.1)",
                border: isBalanced
                  ? "1.5px solid rgba(52, 211, 153, 0.4)"
                  : "1.5px solid rgba(244, 63, 94, 0.4)",
              }}
            >
              {isBalanced ? (
                <CheckCircle sx={{ color: "#34d399", fontSize: 24 }} />
              ) : (
                <WarningIcon sx={{ color: "#f43f5e", fontSize: 24 }} />
              )}
              <Typography
                sx={{
                  color: isBalanced ? "#34d399" : "#f43f5e",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  letterSpacing: 0.5,
                }}
              >
                {isBalanced
                  ? "✓ Settlement Balanced — All calculations match perfectly!"
                  : "⚠ Mismatch detected — Please review the entries above."}
              </Typography>
            </Box>
          </SectionCard>

          <Box sx={{ height: 8 }} />
        </Box>
      </Box>

      {/* FLOATING DASHBOARD */}
      <Tooltip title="Back to Dashboard" placement="left">
        <Fab
          onClick={() => navigate("/dashboard")}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1200,
            background: "linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)",
            color: "#ffffff",
            width: 52,
            height: 52,
            boxShadow: "0 8px 24px rgba(45, 212, 191, 0.5)",
            "&:hover": {
              boxShadow: "0 12px 32px rgba(45, 212, 191, 0.7)",
            },
          }}
        >
          <HomeIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default FinalCalculation;