// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Grid,
//   Typography,
//   Chip,
//   Button,
//   CircularProgress,
//   Tooltip,
//   Fab,
//   TextField,
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
//   CheckCircle,
//   Warning as WarningIcon,
//   Info as InfoIcon,
//   Group as GroupIcon,
//   FiberManualRecord,
//   FilterAlt as FilterIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";

// // ===================== TYPES =====================
// interface CalcData {
//   loadItem: number;
//   returnItem: number;
//   noteSummary: number;
//   paymentReceived: number;
//   expenses: number;
//   creditCustomer: number;
//   todaySale?: number;
//   salePayment?: number;
//   grandTotal?: number;
//   difference?: number;
//   from?: string;
//   to?: string;
//   date: string;
// }

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const getAuthHeaders = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
//   },
// });

// // ===================== HELPERS =====================
// const toInputDate = (d: Date) => {
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const todayStr = () => toInputDate(new Date());

// // ===================== DUMMY (fallback) =====================
// const DUMMY_DATA: CalcData = {
//   loadItem: 29718.75,
//   returnItem: 2101,
//   noteSummary: 30610,
//   paymentReceived: 10000,
//   expenses: 120,
//   creditCustomer: 7623,
//   date: new Date().toISOString().split("T")[0],
// };

// // ===================== ANIMATIONS =====================
// const fadeInUp = keyframes`
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// // ===================== STYLED =====================
// const DarkBanner = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "16px 18px",
//   marginBottom: "14px",
//   boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
//   flexShrink: 0,
// }));

// const FilterBar = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "14px 16px",
//   marginBottom: "14px",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   flexShrink: 0,
// }));

// const QuickFilterChip = styled(Button)<{ active?: boolean }>(
//   ({ active }) => ({
//     borderRadius: "10px",
//     textTransform: "none",
//     fontWeight: 700,
//     fontSize: "0.72rem",
//     padding: "6px 14px",
//     minWidth: "auto",
//     whiteSpace: "nowrap",
//     backgroundColor: active ? "#2dd4bf" : "rgba(45, 212, 191, 0.15)",
//     color: active ? "#0d1527" : "#2dd4bf",
//     border: active
//       ? "1px solid #2dd4bf"
//       : "1px solid rgba(45, 212, 191, 0.3)",
//     boxShadow: active ? "0 4px 14px rgba(45, 212, 191, 0.35)" : "none",
//     transition: "all 0.2s ease",
//     "&:hover": {
//       backgroundColor: active ? "#14b8a6" : "rgba(45, 212, 191, 0.25)",
//       borderColor: "#2dd4bf",
//     },
//   })
// );

// const StyledTextField = styled(TextField)(() => ({
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "10px",
//     backgroundColor: "#090d16",
//     color: "#ffffff",
//     height: "44px",
//     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
//     "&:hover fieldset": { borderColor: "rgba(45, 212, 191, 0.4)" },
//     "&.Mui-focused fieldset": {
//       borderColor: "#2dd4bf",
//       borderWidth: "1.5px",
//     },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#ffffff",
//     fontSize: "0.82rem",
//     fontWeight: 500,
//     padding: "10px 12px",
//     "&::-webkit-calendar-picker-indicator": {
//       filter: "invert(0.7)",
//       cursor: "pointer",
//     },
//   },
//   "& .MuiInputLabel-root": {
//     color: "#9ca3af",
//     fontSize: "0.78rem",
//     "&.Mui-focused": { color: "#2dd4bf" },
//   },
// }));

// const SectionCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "14px 16px",
//   marginBottom: "14px",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   position: "relative",
//   overflow: "hidden",
//   animation: `${fadeInUp} 0.35s ease`,
//   transition: "all 0.25s ease",
//   "&:hover": { borderColor: `${accentcolor}55` },
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "3px",
//     height: "100%",
//     background: `linear-gradient(180deg, ${accentcolor}, ${accentcolor}44)`,
//   },
// }));

// const ValueBox = styled(Box)<{ color: string }>(({ color }) => ({
//   backgroundColor: `${color}10`,
//   border: `1px solid ${color}33`,
//   borderRadius: "10px",
//   padding: "10px 12px",
//   display: "flex",
//   flexDirection: "column",
//   gap: "2px",
//   height: "100%",
//   transition: "all 0.2s ease",
//   "&:hover": {
//     borderColor: `${color}66`,
//     backgroundColor: `${color}18`,
//   },
// }));

// const OperatorChip = styled(Box)<{ tone: "blue" | "red" | "green" }>(
//   ({ tone }) => {
//     const colors = {
//       blue: "#38bdf8",
//       red: "#f43f5e",
//       green: "#34d399",
//     } as const;
//     const c = colors[tone];
//     return {
//       width: 30,
//       height: 30,
//       borderRadius: "8px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: `${c}18`,
//       color: c,
//       border: `1px solid ${c}55`,
//       fontSize: "1rem",
//       fontWeight: 900,
//       flexShrink: 0,
//       margin: "4px auto",
//       "@media (min-width: 900px)": { margin: 0 },
//     };
//   }
// );

// const StepBadge = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
//   width: 28,
//   height: 28,
//   borderRadius: "8px",
//   backgroundColor: `${accentcolor}22`,
//   color: accentcolor,
//   border: `1px solid ${accentcolor}55`,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontWeight: 900,
//   fontSize: "0.78rem",
//   flexShrink: 0,
// }));

// const ResultBox = styled(Box)<{ color: string }>(({ color }) => ({
//   background: `linear-gradient(135deg, ${color}18, ${color}06)`,
//   border: `1.5px solid ${color}55`,
//   borderRadius: "10px",
//   padding: "10px 12px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: "2px",
//   height: "100%",
//   minHeight: "70px",
//   transition: "all 0.25s ease",
//   "&:hover": { borderColor: color },
// }));

// // ===================== HELPERS =====================
// const formatCurrency = (amount: number) =>
//   `₹ ${(amount || 0).toLocaleString("en-IN", {
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

// // ===================== MAIN =====================
// const ViewSettlement: React.FC = () => {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<CalcData>(DUMMY_DATA);

//   // ✅ Date filter state
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [appliedFrom, setAppliedFrom] = useState("");
//   const [appliedTo, setAppliedTo] = useState("");
//   const [activeQuick, setActiveQuick] = useState<
//     "today" | "yesterday" | "week" | "fifteen" | "lastMonth" | "all" | ""
//   >("today");

//   // =====================================================
//   // LOCALLY RECALCULATED VALUES
//   // =====================================================
//   const todaySale =
//     typeof data.todaySale === "number"
//       ? data.todaySale
//       : (data.loadItem || 0) - (data.returnItem || 0);

//   const salePayment =
//     typeof data.salePayment === "number"
//       ? data.salePayment
//       : (data.noteSummary || 0) - (data.paymentReceived || 0);

//   const grandTotal =
//     salePayment + (data.expenses || 0) + (data.creditCustomer || 0);

//   const difference = grandTotal - todaySale;
//   const isBalanced = difference >= 0;

//   // ===================== FETCH =====================
//   const fetchData = useCallback(
//     async (from?: string, to?: string) => {
//       setLoading(true);

//       try {
//         const params: any = {};
//         if (from) params.from = from;
//         if (to) params.to = to;

//         const res = await axios.get(`${API_URL}/users/viewsettlement`, {
//           params,
//           ...getAuthHeaders(),
//         });

//         if (res.data?.success === true && res.data?.data) {
//           setData({
//             ...DUMMY_DATA,
//             ...res.data.data,
//             creditCustomer: res.data.data.creditCustomer ?? 0,
//           });
//         } else if (res.data?.message === "Unauthorized") {
//           localStorage.removeItem("erptoken");
//           navigate("/login");
//         } else {
//           setData(DUMMY_DATA);
//         }
//       } catch (err: any) {
//         console.error("Fetch settlement error:", err);
//         if (err.response?.data?.message === "Unauthorized") {
//           localStorage.removeItem("erptoken");
//           navigate("/login");
//         } else {
//           setData(DUMMY_DATA);
//         }
//       } finally {
//         setLoading(false);
//       }
//     },
//     [navigate]
//   );

//   // Initial load — today
//   useEffect(() => {
//     const t = todayStr();
//     setFromDate(t);
//     setToDate(t);
//     setAppliedFrom(t);
//     setAppliedTo(t);
//     fetchData(t, t);
//   }, [fetchData]);

//   // ===================== FILTER HANDLERS =====================
//   const handleApply = () => {
//     if (fromDate && toDate && fromDate > toDate) {
//       alert("From date cannot be after To date");
//       return;
//     }
//     // Agar sirf from diya hai to single date, warna range
//     const f = fromDate;
//     const t = toDate || fromDate;
//     setAppliedFrom(f);
//     setAppliedTo(t);
//     setActiveQuick("");
//     fetchData(f, t);
//   };

//   const handleClear = () => {
//     const t = todayStr();
//     setFromDate(t);
//     setToDate(t);
//     setAppliedFrom(t);
//     setAppliedTo(t);
//     setActiveQuick("today");
//     fetchData(t, t);
//   };

//   const applyQuick = (
//     type: "today" | "yesterday" | "week" | "fifteen" | "lastMonth" | "all"
//   ) => {
//     const now = new Date();
//     let f = "";
//     let t = "";

//     switch (type) {
//       case "today": {
//         f = toInputDate(now);
//         t = f;
//         break;
//       }
//       case "yesterday": {
//         const y = new Date(now);
//         y.setDate(now.getDate() - 1);
//         f = toInputDate(y);
//         t = f;
//         break;
//       }
//       case "week": {
//         const w = new Date(now);
//         w.setDate(now.getDate() - 6);
//         f = toInputDate(w);
//         t = toInputDate(now);
//         break;
//       }
//       case "fifteen": {
//         const w = new Date(now);
//         w.setDate(now.getDate() - 14);
//         f = toInputDate(w);
//         t = toInputDate(now);
//         break;
//       }
//       case "lastMonth": {
//         const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//         const last = new Date(now.getFullYear(), now.getMonth(), 0);
//         f = toInputDate(first);
//         t = toInputDate(last);
//         break;
//       }
//       case "all": {
//         f = "";
//         t = "";
//         break;
//       }
//     }

//     setFromDate(f);
//     setToDate(t);
//     setAppliedFrom(f);
//     setAppliedTo(t);
//     setActiveQuick(type);
//     fetchData(f, t);
//   };

//   const hasFilter = !!(appliedFrom || appliedTo);

//   // ===================== LOADING =====================
//   if (loading && !data) {
//     return (
//       <Box
//         sx={{
//           height: "100dvh",
//           bgcolor: "#090d16",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           gap: 2,
//         }}
//       >
//         <CircularProgress sx={{ color: "#2dd4bf" }} />
//         <Typography sx={{ color: "#9ca3af", fontSize: "0.85rem" }}>
//           Calculating settlement...
//         </Typography>
//       </Box>
//     );
//   }

//   // ===================== RENDER =====================
//   return (
//     <Box
//       sx={{
//         height: { xs: "100dvh", md: "100vh" },
//         maxHeight: { xs: "100dvh", md: "100vh" },
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
//         {/* ================= HEADER ================= */}
//         <DarkBanner>
//           <Box
//             display="flex"
//             flexDirection={{ xs: "column", md: "row" }}
//             justifyContent="space-between"
//             alignItems={{ xs: "stretch", md: "center" }}
//             gap={1.5}
//           >
//             <Box display="flex" alignItems="center" gap={1.5}>
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
//                   py: 0.8,
//                   fontSize: "0.78rem",
//                   minWidth: "auto",
//                   "&:hover": {
//                     borderColor: "#2dd4bf",
//                     color: "#2dd4bf",
//                     bgcolor: "rgba(45, 212, 191, 0.08)",
//                   },
//                 }}
//               >
//                 Dashboard
//               </Button>

//               <Box
//                 display="flex"
//                 alignItems="center"
//                 gap={1.2}
//                 sx={{ minWidth: 0 }}
//               >
//                 <Box
//                   sx={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: "10px",
//                     bgcolor: "#0f2f2c",
//                     color: "#2dd4bf",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <Calculate sx={{ fontSize: 20 }} />
//                 </Box>
//                 <Box sx={{ minWidth: 0 }}>
//                   <Box display="flex" alignItems="center" gap={1} mb={0.2}>
//                     <FiberManualRecord
//                       sx={{ fontSize: 10, color: "#2dd4bf" }}
//                     />
//                     <Typography
//                       sx={{
//                         color: "#2dd4bf",
//                         letterSpacing: 0.5,
//                         fontSize: "0.68rem",
//                         fontWeight: 700,
//                       }}
//                     >
//                       Auto Settlement Engine
//                     </Typography>
//                   </Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="800"
//                     sx={{
//                       fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.35rem" },
//                       lineHeight: 1.2,
//                     }}
//                   >
//                     VIEW SETTLEMENT
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Box
//               display="flex"
//               gap={1}
//               alignItems="center"
//               flexWrap="wrap"
//               sx={{
//                 width: { xs: "100%", md: "auto" },
//                 justifyContent: { xs: "stretch", md: "flex-end" },
//               }}
//             >
//               <Chip
//                 icon={<InfoIcon sx={{ fontSize: 14 }} />}
//                 label={
//                   appliedFrom && appliedTo && appliedFrom === appliedTo
//                     ? formatDate(appliedFrom)
//                     : appliedFrom && appliedTo
//                     ? `${new Date(appliedFrom).toLocaleDateString("en-IN", {
//                         day: "2-digit",
//                         month: "short",
//                       })} → ${new Date(appliedTo).toLocaleDateString("en-IN", {
//                         day: "2-digit",
//                         month: "short",
//                       })}`
//                     : "All time"
//                 }
//                 size="small"
//                 sx={{
//                   bgcolor: "rgba(56, 189, 248, 0.1)",
//                   color: "#38bdf8",
//                   border: "1px solid rgba(56, 189, 248, 0.3)",
//                   fontWeight: 700,
//                   fontSize: "0.68rem",
//                   height: "28px",
//                   flex: { xs: "1 1 100%", md: "none" },
//                   justifyContent: { xs: "center", md: "flex-start" },
//                   "& .MuiChip-icon": { color: "#38bdf8" },
//                 }}
//               />

//               <Button
//                 variant="outlined"
//                 startIcon={<RefreshIcon />}
//                 onClick={() => fetchData(appliedFrom, appliedTo)}
//                 disabled={loading}
//                 sx={{
//                   color: "#e5e7eb",
//                   borderColor: "rgba(255, 255, 255, 0.15)",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.2,
//                   py: 0.9,
//                   fontSize: "0.78rem",
//                   flex: { xs: "1 1 100%", md: "none" },
//                   "&:hover": {
//                     borderColor: "#2dd4bf",
//                     color: "#2dd4bf",
//                     bgcolor: "rgba(45, 212, 191, 0.08)",
//                   },
//                 }}
//               >
//                 Refresh
//               </Button>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* ================= DATE FILTER ================= */}
//         <FilterBar>
//           <Grid container spacing={1.5}>
//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <StyledTextField
//                 type="date"
//                 size="small"
//                 fullWidth
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 label="From"
//               />
//             </Grid>
//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <StyledTextField
//                 type="date"
//                 size="small"
//                 fullWidth
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 label="To"
//               />
//             </Grid>
//             <Grid size={{ xs: 12, sm: 12, md: 6 }}>
//               <Box display="flex" gap={1} sx={{ height: "100%" }}>
//                 <Button
//                   size="small"
//                   variant="contained"
//                   fullWidth
//                   startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
//                   onClick={handleApply}
//                   disabled={loading}
//                   sx={{
//                     bgcolor: "#14b8a6",
//                     color: "#fff",
//                     fontWeight: 700,
//                     textTransform: "none",
//                     borderRadius: "10px",
//                     py: 1.1,
//                     fontSize: "0.78rem",
//                     "&:hover": { bgcolor: "#0d9488" },
//                   }}
//                 >
//                   Apply
//                 </Button>

//                 <Button
//                   size="small"
//                   variant="outlined"
//                   fullWidth
//                   startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
//                   onClick={handleClear}
//                   disabled={loading}
//                   sx={{
//                     color: "#9ca3af",
//                     borderColor: "rgba(255, 255, 255, 0.15)",
//                     fontWeight: 700,
//                     textTransform: "none",
//                     borderRadius: "10px",
//                     py: 1.1,
//                     fontSize: "0.78rem",
//                     "&:hover": {
//                       borderColor: "#f43f5e",
//                       color: "#f43f5e",
//                       bgcolor: "rgba(244, 63, 94, 0.08)",
//                     },
//                   }}
//                 >
//                   Reset
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Quick chips */}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 0.8,
//               flexWrap: "wrap",
//               mt: 1.5,
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "#9ca3af",
//                 fontSize: "0.7rem",
//                 fontWeight: 700,
//                 textTransform: "uppercase",
//                 letterSpacing: 0.5,
//                 mr: 0.3,
//               }}
//             >
//               Quick:
//             </Typography>

//             <QuickFilterChip
//               active={activeQuick === "today"}
//               onClick={() => applyQuick("today")}
//             >
//               Today
//             </QuickFilterChip>
//             <QuickFilterChip
//               active={activeQuick === "yesterday"}
//               onClick={() => applyQuick("yesterday")}
//             >
//               Yesterday
//             </QuickFilterChip>
//             <QuickFilterChip
//               active={activeQuick === "week"}
//               onClick={() => applyQuick("week")}
//             >
//               Last 7d
//             </QuickFilterChip>
//             <QuickFilterChip
//               active={activeQuick === "fifteen"}
//               onClick={() => applyQuick("fifteen")}
//             >
//               Last 15d
//             </QuickFilterChip>
//             <QuickFilterChip
//               active={activeQuick === "lastMonth"}
//               onClick={() => applyQuick("lastMonth")}
//             >
//               Last Month
//             </QuickFilterChip>
//             <QuickFilterChip
//               active={activeQuick === "all"}
//               onClick={() => applyQuick("all")}
//             >
//               All
//             </QuickFilterChip>

//             {hasFilter && activeQuick === "" && (
//               <Chip
//                 label={`${appliedFrom || "..."} → ${appliedTo || "..."}`}
//                 size="small"
//                 onDelete={handleClear}
//                 sx={{
//                   ml: { md: "auto" },
//                   bgcolor: "rgba(45, 212, 191, 0.15)",
//                   color: "#2dd4bf",
//                   border: "1px solid rgba(45, 212, 191, 0.4)",
//                   fontWeight: 700,
//                   fontSize: "0.7rem",
//                   height: "26px",
//                   "& .MuiChip-deleteIcon": {
//                     color: "#2dd4bf",
//                     "&:hover": { color: "#f43f5e" },
//                   },
//                 }}
//               />
//             )}
//           </Box>
//         </FilterBar>

//         {/* ================= TOP SUMMARY ================= */}
//         <Grid container spacing={1.2} sx={{ mb: 1.5, flexShrink: 0 }}>
//           <Grid size={{ xs: 6, md: 3 }}>
//             <ResultBox color="#38bdf8">
//               <Typography
//                 sx={{
//                   color: "#9ca3af",
//                   fontSize: "0.6rem",
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
//                   fontSize: { xs: "0.9rem", sm: "1.05rem" },
//                 }}
//               >
//                 {formatCurrency(todaySale)}
//               </Typography>
//             </ResultBox>
//           </Grid>

//           <Grid size={{ xs: 6, md: 3 }}>
//             <ResultBox color="#c084fc">
//               <Typography
//                 sx={{
//                   color: "#9ca3af",
//                   fontSize: "0.6rem",
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
//                   fontSize: { xs: "0.9rem", sm: "1.05rem" },
//                 }}
//               >
//                 {formatCurrency(salePayment)}
//               </Typography>
//             </ResultBox>
//           </Grid>

//           <Grid size={{ xs: 6, md: 3 }}>
//             <ResultBox color="#fbbf24">
//               <Typography
//                 sx={{
//                   color: "#9ca3af",
//                   fontSize: "0.6rem",
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
//                   fontSize: { xs: "0.9rem", sm: "1.05rem" },
//                 }}
//               >
//                 {formatCurrency(grandTotal)}
//               </Typography>
//             </ResultBox>
//           </Grid>

//           <Grid size={{ xs: 6, md: 3 }}>
//             <ResultBox color={isBalanced ? "#34d399" : "#f43f5e"}>
//               <Box display="flex" alignItems="center" gap={0.4}>
//                 {isBalanced ? (
//                   <CheckCircle sx={{ color: "#34d399", fontSize: 12 }} />
//                 ) : (
//                   <WarningIcon sx={{ color: "#f43f5e", fontSize: 12 }} />
//                 )}
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.6rem",
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
//                   fontSize: { xs: "0.9rem", sm: "1.05rem" },
//                 }}
//               >
//                 {formatCurrency(difference)}
//               </Typography>
//             </ResultBox>
//           </Grid>
//         </Grid>

//         {/* ================= STEP-BY-STEP ================= */}
//         <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", pr: 0.5 }}>
//           {/* STEP 1 */}
//           <SectionCard accentcolor="#38bdf8">
//             <Box display="flex" alignItems="center" gap={1.2} mb={1.5}>
//               <StepBadge accentcolor="#38bdf8">1</StepBadge>
//               <Box sx={{ minWidth: 0 }}>
//                 <Typography
//                   sx={{
//                     color: "#38bdf8",
//                     fontWeight: 800,
//                     fontSize: { xs: "0.78rem", sm: "0.85rem" },
//                     letterSpacing: 0.4,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Today Sale Calculation
//                 </Typography>
//                 <Typography
//                   sx={{ color: "#9ca3af", fontSize: "0.68rem", mt: 0.2 }}
//                 >
//                   Load Item − Return Item = Today Sale
//                 </Typography>
//               </Box>
//             </Box>

//             <Grid container spacing={1} alignItems="stretch">
//               <Grid size={{ xs: 12, sm: 6, md: 4 }}>
//                 <ValueBox color="#38bdf8">
//                   <Box display="flex" alignItems="center" gap={0.8}>
//                     <LocalShipping sx={{ color: "#38bdf8", fontSize: 15 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.62rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.4,
//                       }}
//                     >
//                       Load Item
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#38bdf8",
//                       fontWeight: 800,
//                       fontSize: { xs: "0.95rem", sm: "1.05rem" },
//                     }}
//                   >
//                     {formatCurrency(data.loadItem)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, sm: 6, md: 1 }}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <OperatorChip tone="red">−</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, sm: 6, md: 4 }}>
//                 <ValueBox color="#f43f5e">
//                   <Box display="flex" alignItems="center" gap={0.8}>
//                     <AssignmentReturn
//                       sx={{ color: "#f43f5e", fontSize: 15 }}
//                     />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.62rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.4,
//                       }}
//                     >
//                       Return Item
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#f43f5e",
//                       fontWeight: 800,
//                       fontSize: { xs: "0.95rem", sm: "1.05rem" },
//                     }}
//                   >
//                     {formatCurrency(data.returnItem)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, sm: 6, md: 1 }}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <OperatorChip tone="green">=</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, sm: 6, md: 2 }}>
//                 <ResultBox color="#38bdf8">
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.58rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: 0.4,
//                     }}
//                   >
//                     Today Sale
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#38bdf8",
//                       fontWeight: 900,
//                       fontSize: { xs: "0.9rem", sm: "1rem" },
//                     }}
//                   >
//                     {formatCurrency(todaySale)}
//                   </Typography>
//                 </ResultBox>
//               </Grid>
//             </Grid>
//           </SectionCard>

//           {/* STEP 2 */}
//           <SectionCard accentcolor="#c084fc">
//             <Box display="flex" alignItems="center" gap={1.2} mb={1.5}>
//               <StepBadge accentcolor="#c084fc">2</StepBadge>
//               <Box sx={{ minWidth: 0 }}>
//                 <Typography
//                   sx={{
//                     color: "#c084fc",
//                     fontWeight: 800,
//                     fontSize: { xs: "0.78rem", sm: "0.85rem" },
//                     letterSpacing: 0.4,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Today Payment Received
//                 </Typography>
//                 <Typography
//                   sx={{ color: "#9ca3af", fontSize: "0.68rem", mt: 0.2 }}
//                 >
//                   Note Summary − Previous Payment = Sale Payment
//                 </Typography>
//               </Box>
//             </Box>

//             <Grid container spacing={1} alignItems="stretch">
//               <Grid size={{ xs: 12, sm: 6, md: 4 }}>
//                 <ValueBox color="#c084fc">
//                   <Box display="flex" alignItems="center" gap={0.8}>
//                     <PointOfSale sx={{ color: "#c084fc", fontSize: 15 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.62rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.4,
//                       }}
//                     >
//                       Note Summary
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#c084fc",
//                       fontWeight: 800,
//                       fontSize: { xs: "0.95rem", sm: "1.05rem" },
//                     }}
//                   >
//                     {formatCurrency(data.noteSummary)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, sm: 6, md: 1 }}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <OperatorChip tone="red">−</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, sm: 6, md: 4 }}>
//                 <ValueBox color="#f43f5e">
//                   <Box display="flex" alignItems="center" gap={0.8}>
//                     <Payments sx={{ color: "#f43f5e", fontSize: 15 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.62rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.4,
//                       }}
//                     >
//                       Previous Payment
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#f43f5e",
//                       fontWeight: 800,
//                       fontSize: { xs: "0.95rem", sm: "1.05rem" },
//                     }}
//                   >
//                     {formatCurrency(data.paymentReceived)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, sm: 6, md: 1 }}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <OperatorChip tone="green">=</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, sm: 6, md: 2 }}>
//                 <ResultBox color="#c084fc">
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.58rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: 0.4,
//                     }}
//                   >
//                     Sale Payment
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#c084fc",
//                       fontWeight: 900,
//                       fontSize: { xs: "0.9rem", sm: "1rem" },
//                     }}
//                   >
//                     {formatCurrency(salePayment)}
//                   </Typography>
//                 </ResultBox>
//               </Grid>
//             </Grid>
//           </SectionCard>

//           {/* STEP 3 */}
//           <SectionCard accentcolor="#fbbf24">
//             <Box display="flex" alignItems="center" gap={1.2} mb={1.5}>
//               <StepBadge accentcolor="#fbbf24">3</StepBadge>
//               <Box sx={{ minWidth: 0 }}>
//                 <Typography
//                   sx={{
//                     color: "#fbbf24",
//                     fontWeight: 800,
//                     fontSize: { xs: "0.78rem", sm: "0.85rem" },
//                     letterSpacing: 0.4,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Grand Total
//                 </Typography>
//                 <Typography
//                   sx={{ color: "#9ca3af", fontSize: "0.68rem", mt: 0.2 }}
//                 >
//                   Sale Payment + Expenses + Credit Customer = Grand Total
//                 </Typography>
//               </Box>
//             </Box>

//             <Grid container spacing={1} alignItems="stretch">
//               <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                 <ValueBox color="#c084fc">
//                   <Box display="flex" alignItems="center" gap={0.8}>
//                     <Payments sx={{ color: "#c084fc", fontSize: 15 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.62rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.4,
//                       }}
//                     >
//                       Sale Payment
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#c084fc",
//                       fontWeight: 800,
//                       fontSize: { xs: "0.95rem", sm: "1.05rem" },
//                     }}
//                   >
//                     {formatCurrency(salePayment)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, sm: 6, md: 1 }}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <OperatorChip tone="green">+</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                 <ValueBox color="#f43f5e">
//                   <Box display="flex" alignItems="center" gap={0.8}>
//                     <Receipt sx={{ color: "#f43f5e", fontSize: 15 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.62rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.4,
//                       }}
//                     >
//                       Expenses
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#f43f5e",
//                       fontWeight: 800,
//                       fontSize: { xs: "0.95rem", sm: "1.05rem" },
//                     }}
//                   >
//                     {formatCurrency(data.expenses)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, sm: 6, md: 1 }}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <OperatorChip tone="green">+</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                 <ValueBox color="#34d399">
//                   <Box display="flex" alignItems="center" gap={0.8}>
//                     <GroupIcon sx={{ color: "#34d399", fontSize: 15 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.62rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.4,
//                       }}
//                     >
//                       Credit Customer
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#34d399",
//                       fontWeight: 800,
//                       fontSize: { xs: "0.95rem", sm: "1.05rem" },
//                     }}
//                   >
//                     {formatCurrency(data.creditCustomer || 0)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, sm: 12, md: 12 }}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <OperatorChip tone="blue">=</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, sm: 12, md: 12 }}>
//                 <ResultBox color="#fbbf24">
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.62rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: 0.4,
//                     }}
//                   >
//                     Grand Total
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#fbbf24",
//                       fontWeight: 900,
//                       fontSize: { xs: "1.15rem", sm: "1.35rem" },
//                     }}
//                   >
//                     {formatCurrency(grandTotal)}
//                   </Typography>
//                 </ResultBox>
//               </Grid>
//             </Grid>
//           </SectionCard>

//           {/* STEP 4 */}
//           <SectionCard accentcolor={isBalanced ? "#34d399" : "#f43f5e"}>
//             <Box display="flex" alignItems="center" gap={1.2} mb={1.5}>
//               <StepBadge accentcolor={isBalanced ? "#34d399" : "#f43f5e"}>
//                 4
//               </StepBadge>
//               <Box sx={{ minWidth: 0 }}>
//                 <Typography
//                   sx={{
//                     color: isBalanced ? "#34d399" : "#f43f5e",
//                     fontWeight: 800,
//                     fontSize: { xs: "0.78rem", sm: "0.85rem" },
//                     letterSpacing: 0.4,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Difference Check
//                 </Typography>
//                 <Typography
//                   sx={{ color: "#9ca3af", fontSize: "0.68rem", mt: 0.2 }}
//                 >
//                   Grand Total − Today Sale = Difference
//                 </Typography>
//               </Box>
//             </Box>

//             <Grid container spacing={1} alignItems="stretch">
//               <Grid size={{ xs: 12, sm: 6, md: 4 }}>
//                 <ValueBox color="#fbbf24">
//                   <Box display="flex" alignItems="center" gap={0.8}>
//                     <Calculate sx={{ color: "#fbbf24", fontSize: 15 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.62rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.4,
//                       }}
//                     >
//                       Grand Total
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#fbbf24",
//                       fontWeight: 800,
//                       fontSize: { xs: "0.95rem", sm: "1.05rem" },
//                     }}
//                   >
//                     {formatCurrency(grandTotal)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, sm: 6, md: 1 }}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <OperatorChip tone="red">−</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, sm: 6, md: 4 }}>
//                 <ValueBox color="#38bdf8">
//                   <Box display="flex" alignItems="center" gap={0.8}>
//                     <TrendingUp sx={{ color: "#38bdf8", fontSize: 15 }} />
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.62rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                         letterSpacing: 0.4,
//                       }}
//                     >
//                       Today Sale
//                     </Typography>
//                   </Box>
//                   <Typography
//                     sx={{
//                       color: "#38bdf8",
//                       fontWeight: 800,
//                       fontSize: { xs: "0.95rem", sm: "1.05rem" },
//                     }}
//                   >
//                     {formatCurrency(todaySale)}
//                   </Typography>
//                 </ValueBox>
//               </Grid>

//               <Grid
//                 size={{ xs: 12, sm: 6, md: 1 }}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <OperatorChip tone="green">=</OperatorChip>
//               </Grid>

//               <Grid size={{ xs: 12, sm: 6, md: 2 }}>
//                 <ResultBox color={isBalanced ? "#34d399" : "#f43f5e"}>
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.58rem",
//                       fontWeight: 700,
//                       textTransform: "uppercase",
//                       letterSpacing: 0.4,
//                     }}
//                   >
//                     Difference
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: isBalanced ? "#34d399" : "#f43f5e",
//                       fontWeight: 900,
//                       fontSize: { xs: "0.9rem", sm: "1rem" },
//                     }}
//                   >
//                     {formatCurrency(difference)}
//                   </Typography>
//                 </ResultBox>
//               </Grid>
//             </Grid>

//             {/* Status banner */}
//             <Box
//               sx={{
//                 mt: 1.5,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 1,
//                 py: 1.2,
//                 px: 1.5,
//                 borderRadius: "10px",
//                 backgroundColor: isBalanced
//                   ? "rgba(52, 211, 153, 0.1)"
//                   : "rgba(244, 63, 94, 0.1)",
//                 border: isBalanced
//                   ? "1px solid rgba(52, 211, 153, 0.4)"
//                   : "1px solid rgba(244, 63, 94, 0.4)",
//               }}
//             >
//               {isBalanced ? (
//                 <CheckCircle sx={{ color: "#34d399", fontSize: 18 }} />
//               ) : (
//                 <WarningIcon sx={{ color: "#f43f5e", fontSize: 18 }} />
//               )}
//               <Typography
//                 sx={{
//                   color: isBalanced ? "#34d399" : "#f43f5e",
//                   fontWeight: 700,
//                   fontSize: { xs: "0.72rem", sm: "0.82rem" },
//                   letterSpacing: 0.3,
//                   textAlign: "center",
//                 }}
//               >
//                 {isBalanced
//                   ? "Positive Difference — Profit / Balanced"
//                   : "Negative Difference — Loss / Mismatch"}
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
//             bgcolor: "#14b8a6",
//             color: "#ffffff",
//             width: 50,
//             height: 50,
//             boxShadow: "0 8px 24px rgba(20, 184, 166, 0.45)",
//             "&:hover": { bgcolor: "#0d9488" },
//           }}
//         >
//           <HomeIcon />
//         </Fab>
//       </Tooltip>
//     </Box>
//   );
// };

// export default ViewSettlement;


import React, { useState, useEffect, useCallback } from "react";
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
  TextField,
} from "@mui/material";
import { styled, keyframes, useTheme } from "@mui/material/styles";
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
  Group as GroupIcon,
  FiberManualRecord,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

// ===================== TYPES =====================
interface CalcData {
  loadItem: number;
  returnItem: number;
  noteSummary: number;
  paymentReceived: number;
  expenses: number;
  creditCustomer: number;
  todaySale?: number;
  salePayment?: number;
  grandTotal?: number;
  difference?: number;
  from?: string;
  to?: string;
  date: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

const isDark = (theme: any) => theme.palette.mode === "dark";

// ===================== HELPERS =====================
const toInputDate = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const todayStr = () => toInputDate(new Date());

const DUMMY_DATA: CalcData = {
  loadItem: 29718.75,
  returnItem: 2101,
  noteSummary: 30610,
  paymentReceived: 10000,
  expenses: 120,
  creditCustomer: 7623,
  date: new Date().toISOString().split("T")[0],
};

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ===================== STYLED =====================
const DarkBanner = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(15, 23, 42, 0.08)",
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: isDark(theme)
    ? "0 10px 30px rgba(0, 0, 0, 0.5)"
    : "0 6px 20px rgba(15, 23, 42, 0.06)",
  flexShrink: 0,
  transition: "all 0.3s ease",
}));

const FilterBar = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(15, 23, 42, 0.08)",
  padding: "14px 16px",
  marginBottom: "14px",
  boxShadow: isDark(theme)
    ? "0 8px 20px rgba(0, 0, 0, 0.4)"
    : "0 4px 14px rgba(15, 23, 42, 0.05)",
  flexShrink: 0,
  transition: "all 0.3s ease",
}));

const QuickFilterChip = styled(Button)<{ active?: boolean }>(
  ({ active }) => ({
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.72rem",
    padding: "6px 14px",
    minWidth: "auto",
    whiteSpace: "nowrap",
    backgroundColor: active ? "#14b8a6" : "rgba(45, 212, 191, 0.15)",
    color: active ? "#ffffff" : "#0d9488",
    border: active
      ? "1px solid #14b8a6"
      : "1px solid rgba(45, 212, 191, 0.3)",
    boxShadow: active ? "0 4px 14px rgba(45, 212, 191, 0.35)" : "none",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: active ? "#0d9488" : "rgba(45, 212, 191, 0.25)",
      borderColor: "#14b8a6",
    },
  })
);

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: isDark(theme) ? "#090d16" : "#f8fafc",
    color: isDark(theme) ? "#ffffff" : "#0f172a",
    height: "44px",
    "& fieldset": {
      borderColor: isDark(theme)
        ? "rgba(255, 255, 255, 0.12)"
        : "rgba(15, 23, 42, 0.12)",
    },
    "&:hover fieldset": { borderColor: "rgba(45, 212, 191, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#14b8a6",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: isDark(theme) ? "#ffffff" : "#0f172a",
    fontSize: "0.82rem",
    fontWeight: 500,
    padding: "10px 12px",
    "&::-webkit-calendar-picker-indicator": {
      filter: isDark(theme) ? "invert(0.7)" : "none",
      cursor: "pointer",
    },
  },
  "& .MuiInputLabel-root": {
    color: isDark(theme) ? "#9ca3af" : "#64748b",
    fontSize: "0.78rem",
    "&.Mui-focused": { color: "#14b8a6" },
  },
}));

const SectionCard = styled(Box)<{ accentcolor: string }>(
  ({ accentcolor, theme }) => ({
    backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
    borderRadius: "16px",
    border: isDark(theme)
      ? "1px solid rgba(255, 255, 255, 0.08)"
      : "1px solid rgba(15, 23, 42, 0.08)",
    padding: "14px 16px",
    marginBottom: "14px",
    boxShadow: isDark(theme)
      ? "0 8px 20px rgba(0, 0, 0, 0.4)"
      : "0 4px 14px rgba(15, 23, 42, 0.05)",
    position: "relative",
    overflow: "hidden",
    animation: `${fadeInUp} 0.35s ease`,
    transition: "all 0.25s ease",
    "&:hover": { borderColor: `${accentcolor}55` },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "3px",
      height: "100%",
      background: `linear-gradient(180deg, ${accentcolor}, ${accentcolor}44)`,
    },
  })
);

const ValueBox = styled(Box)<{ color: string }>(({ color }) => ({
  backgroundColor: `${color}10`,
  border: `1px solid ${color}33`,
  borderRadius: "10px",
  padding: "10px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  height: "100%",
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: `${color}66`,
    backgroundColor: `${color}18`,
  },
}));

const OperatorChip = styled(Box)<{ tone: "blue" | "red" | "green" }>(
  ({ tone }) => {
    const colors = {
      blue: "#0284c7",
      red: "#e11d48",
      green: "#059669",
    } as const;
    const c = colors[tone];
    return {
      width: 30,
      height: 30,
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: `${c}18`,
      color: c,
      border: `1px solid ${c}55`,
      fontSize: "1rem",
      fontWeight: 900,
      flexShrink: 0,
      margin: "4px auto",
      "@media (min-width: 900px)": { margin: 0 },
    };
  }
);

const StepBadge = styled(Box)<{ accentcolor: string }>(
  ({ accentcolor }) => ({
    width: 28,
    height: 28,
    borderRadius: "8px",
    backgroundColor: `${accentcolor}22`,
    color: accentcolor,
    border: `1px solid ${accentcolor}55`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: "0.78rem",
    flexShrink: 0,
  })
);

const ResultBox = styled(Box)<{ color: string }>(({ color }) => ({
  background: `linear-gradient(135deg, ${color}18, ${color}06)`,
  border: `1.5px solid ${color}55`,
  borderRadius: "10px",
  padding: "10px 12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  height: "100%",
  minHeight: "70px",
  transition: "all 0.25s ease",
  "&:hover": { borderColor: color },
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

// ===================== MAIN =====================
const ViewSettlement: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dark = isDark(theme);

  const c = {
    pageBg: dark ? "#090d16" : "#f1f5f9",
    text: dark ? "#ffffff" : "#0f172a",
    muted: dark ? "#9ca3af" : "#64748b",
    border08: dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
    border15: dark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.15)",
    textSec: dark ? "#e5e7eb" : "#334155",
    tealIconBg: dark ? "#0f2f2c" : "#ccfbf1",
    tealText: dark ? "#2dd4bf" : "#0d9488",
    skyText: dark ? "#38bdf8" : "#0284c7",
    skyIconBg: dark ? "#0c2a3a" : "#e0f2fe",
    purpleText: dark ? "#c084fc" : "#7e22ce",
    amberText: dark ? "#fbbf24" : "#d97706",
    emeraldText: dark ? "#34d399" : "#059669",
    chipBgSoft: dark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.04)",
  };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CalcData>(DUMMY_DATA);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [activeQuick, setActiveQuick] = useState<
    "today" | "yesterday" | "week" | "fifteen" | "lastMonth" | "all" | ""
  >("today");

  const todaySale =
    typeof data.todaySale === "number"
      ? data.todaySale
      : (data.loadItem || 0) - (data.returnItem || 0);

  const salePayment =
    typeof data.salePayment === "number"
      ? data.salePayment
      : (data.noteSummary || 0) - (data.paymentReceived || 0);

  const grandTotal =
    salePayment + (data.expenses || 0) + (data.creditCustomer || 0);

  const difference = grandTotal - todaySale;
  const isBalanced = difference >= 0;

  const fetchData = useCallback(
    async (from?: string, to?: string) => {
      setLoading(true);
      try {
        const params: any = {};
        if (from) params.from = from;
        if (to) params.to = to;

        const res = await axios.get(`${API_URL}/users/viewsettlement`, {
          params,
          ...getAuthHeaders(),
        });

        if (res.data?.success === true && res.data?.data) {
          setData({
            ...DUMMY_DATA,
            ...res.data.data,
            creditCustomer: res.data.data.creditCustomer ?? 0,
          });
        } else if (res.data?.message === "Unauthorized") {
          localStorage.removeItem("erptoken");
          navigate("/login");
        } else {
          setData(DUMMY_DATA);
        }
      } catch (err: any) {
        console.error("Fetch settlement error:", err);
        if (err.response?.data?.message === "Unauthorized") {
          localStorage.removeItem("erptoken");
          navigate("/login");
        } else {
          setData(DUMMY_DATA);
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const t = todayStr();
    setFromDate(t);
    setToDate(t);
    setAppliedFrom(t);
    setAppliedTo(t);
    fetchData(t, t);
  }, [fetchData]);

  const handleApply = () => {
    if (fromDate && toDate && fromDate > toDate) {
      alert("From date cannot be after To date");
      return;
    }
    const f = fromDate;
    const t = toDate || fromDate;
    setAppliedFrom(f);
    setAppliedTo(t);
    setActiveQuick("");
    fetchData(f, t);
  };

  const handleClear = () => {
    const t = todayStr();
    setFromDate(t);
    setToDate(t);
    setAppliedFrom(t);
    setAppliedTo(t);
    setActiveQuick("today");
    fetchData(t, t);
  };

  const applyQuick = (
    type: "today" | "yesterday" | "week" | "fifteen" | "lastMonth" | "all"
  ) => {
    const now = new Date();
    let f = "";
    let t = "";

    switch (type) {
      case "today": {
        f = toInputDate(now);
        t = f;
        break;
      }
      case "yesterday": {
        const y = new Date(now);
        y.setDate(now.getDate() - 1);
        f = toInputDate(y);
        t = f;
        break;
      }
      case "week": {
        const w = new Date(now);
        w.setDate(now.getDate() - 6);
        f = toInputDate(w);
        t = toInputDate(now);
        break;
      }
      case "fifteen": {
        const w = new Date(now);
        w.setDate(now.getDate() - 14);
        f = toInputDate(w);
        t = toInputDate(now);
        break;
      }
      case "lastMonth": {
        const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const last = new Date(now.getFullYear(), now.getMonth(), 0);
        f = toInputDate(first);
        t = toInputDate(last);
        break;
      }
      case "all": {
        f = "";
        t = "";
        break;
      }
    }

    setFromDate(f);
    setToDate(t);
    setAppliedFrom(f);
    setAppliedTo(t);
    setActiveQuick(type);
    fetchData(f, t);
  };

  const hasFilter = !!(appliedFrom || appliedTo);

  if (loading && !data) {
    return (
      <Box
        sx={{
          height: "100dvh",
          bgcolor: c.pageBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
          transition: "background-color 0.3s ease",
        }}
      >
        <CircularProgress sx={{ color: "#14b8a6" }} />
        <Typography sx={{ color: c.muted, fontSize: "0.85rem" }}>
          Calculating settlement...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: { xs: "100dvh", md: "100vh" },
        maxHeight: { xs: "100dvh", md: "100vh" },
        overflow: "hidden",
        bgcolor: c.pageBg,
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 1.5, md: 2 },
        color: c.text,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        transition: "background-color 0.3s ease, color 0.3s ease",
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
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            gap={1.5}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/dashboard")}
                sx={{
                  color: c.textSec,
                  borderColor: c.border15,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.8,
                  fontSize: "0.78rem",
                  minWidth: "auto",
                  "&:hover": {
                    borderColor: "#14b8a6",
                    color: "#14b8a6",
                    bgcolor: "rgba(45, 212, 191, 0.08)",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box display="flex" alignItems="center" gap={1.2} sx={{ minWidth: 0 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    bgcolor: c.tealIconBg,
                    color: c.tealText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Calculate sx={{ fontSize: 20 }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={0.2}>
                    <FiberManualRecord sx={{ fontSize: 10, color: "#2dd4bf" }} />
                    <Typography
                      sx={{
                        color: c.tealText,
                        letterSpacing: 0.5,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                      }}
                    >
                      Auto Settlement Engine
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.35rem" },
                      lineHeight: 1.2,
                      color: c.text,
                    }}
                  >
                    VIEW SETTLEMENT
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              display="flex"
              gap={1}
              alignItems="center"
              flexWrap="wrap"
              sx={{
                width: { xs: "100%", md: "auto" },
                justifyContent: { xs: "stretch", md: "flex-end" },
              }}
            >
              <Chip
                icon={<InfoIcon sx={{ fontSize: 14 }} />}
                label={
                  appliedFrom && appliedTo && appliedFrom === appliedTo
                    ? formatDate(appliedFrom)
                    : appliedFrom && appliedTo
                    ? `${new Date(appliedFrom).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })} → ${new Date(appliedTo).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}`
                    : "All time"
                }
                size="small"
                sx={{
                  bgcolor: "rgba(56, 189, 248, 0.1)",
                  color: c.skyText,
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  height: "28px",
                  flex: { xs: "1 1 100%", md: "none" },
                  justifyContent: { xs: "center", md: "flex-start" },
                  "& .MuiChip-icon": { color: c.skyText },
                }}
              />

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => fetchData(appliedFrom, appliedTo)}
                disabled={loading}
                sx={{
                  color: c.textSec,
                  borderColor: c.border15,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.2,
                  py: 0.9,
                  fontSize: "0.78rem",
                  flex: { xs: "1 1 100%", md: "none" },
                  "&:hover": {
                    borderColor: "#14b8a6",
                    color: "#14b8a6",
                    bgcolor: "rgba(45, 212, 191, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* DATE FILTER */}
        <FilterBar>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StyledTextField
                type="date"
                size="small"
                fullWidth
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                label="From"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StyledTextField
                type="date"
                size="small"
                fullWidth
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                label="To"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Box display="flex" gap={1} sx={{ height: "100%" }}>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
                  onClick={handleApply}
                  disabled={loading}
                  sx={{
                    bgcolor: "#14b8a6",
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    py: 1.1,
                    fontSize: "0.78rem",
                    "&:hover": { bgcolor: "#0d9488" },
                  }}
                >
                  Apply
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
                  onClick={handleClear}
                  disabled={loading}
                  sx={{
                    color: c.muted,
                    borderColor: c.border15,
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    py: 1.1,
                    fontSize: "0.78rem",
                    "&:hover": {
                      borderColor: "#f43f5e",
                      color: "#f43f5e",
                      bgcolor: "rgba(244, 63, 94, 0.08)",
                    },
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              gap: 0.8,
              flexWrap: "wrap",
              mt: 1.5,
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: c.muted,
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                mr: 0.3,
              }}
            >
              Quick:
            </Typography>

            <QuickFilterChip
              active={activeQuick === "today"}
              onClick={() => applyQuick("today")}
            >
              Today
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "yesterday"}
              onClick={() => applyQuick("yesterday")}
            >
              Yesterday
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "week"}
              onClick={() => applyQuick("week")}
            >
              Last 7d
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "fifteen"}
              onClick={() => applyQuick("fifteen")}
            >
              Last 15d
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "lastMonth"}
              onClick={() => applyQuick("lastMonth")}
            >
              Last Month
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "all"}
              onClick={() => applyQuick("all")}
            >
              All
            </QuickFilterChip>

            {hasFilter && activeQuick === "" && (
              <Chip
                label={`${appliedFrom || "..."} → ${appliedTo || "..."}`}
                size="small"
                onDelete={handleClear}
                sx={{
                  ml: { md: "auto" },
                  bgcolor: "rgba(45, 212, 191, 0.15)",
                  color: c.tealText,
                  border: "1px solid rgba(45, 212, 191, 0.4)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "26px",
                  "& .MuiChip-deleteIcon": {
                    color: c.tealText,
                    "&:hover": { color: "#f43f5e" },
                  },
                }}
              />
            )}
          </Box>
        </FilterBar>

        {/* TOP SUMMARY */}
        <Grid container spacing={1.2} sx={{ mb: 1.5, flexShrink: 0 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <ResultBox color="#38bdf8">
              <Typography
                sx={{
                  color: c.muted,
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Today Sale
              </Typography>
              <Typography
                sx={{
                  color: c.skyText,
                  fontWeight: 900,
                  fontSize: { xs: "0.9rem", sm: "1.05rem" },
                }}
              >
                {formatCurrency(todaySale)}
              </Typography>
            </ResultBox>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <ResultBox color="#c084fc">
              <Typography
                sx={{
                  color: c.muted,
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Sale Payment
              </Typography>
              <Typography
                sx={{
                  color: c.purpleText,
                  fontWeight: 900,
                  fontSize: { xs: "0.9rem", sm: "1.05rem" },
                }}
              >
                {formatCurrency(salePayment)}
              </Typography>
            </ResultBox>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <ResultBox color="#fbbf24">
              <Typography
                sx={{
                  color: c.muted,
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Grand Total
              </Typography>
              <Typography
                sx={{
                  color: c.amberText,
                  fontWeight: 900,
                  fontSize: { xs: "0.9rem", sm: "1.05rem" },
                }}
              >
                {formatCurrency(grandTotal)}
              </Typography>
            </ResultBox>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <ResultBox color={isBalanced ? "#34d399" : "#f43f5e"}>
              <Box display="flex" alignItems="center" gap={0.4}>
                {isBalanced ? (
                  <CheckCircle sx={{ color: c.emeraldText, fontSize: 12 }} />
                ) : (
                  <WarningIcon sx={{ color: "#f43f5e", fontSize: 12 }} />
                )}
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.6rem",
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
                  color: isBalanced ? c.emeraldText : "#f43f5e",
                  fontWeight: 900,
                  fontSize: { xs: "0.9rem", sm: "1.05rem" },
                }}
              >
                {formatCurrency(difference)}
              </Typography>
            </ResultBox>
          </Grid>
        </Grid>

        {/* STEP-BY-STEP */}
        <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", pr: 0.5 }}>
          {/* STEP 1 */}
          <SectionCard accentcolor="#38bdf8">
            <Box display="flex" alignItems="center" gap={1.2} mb={1.5}>
              <StepBadge accentcolor="#0ea5e9">1</StepBadge>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    color: c.skyText,
                    fontWeight: 800,
                    fontSize: { xs: "0.78rem", sm: "0.85rem" },
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                  }}
                >
                  Today Sale Calculation
                </Typography>
                <Typography
                  sx={{ color: c.muted, fontSize: "0.68rem", mt: 0.2 }}
                >
                  Load Item − Return Item = Today Sale
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={1} alignItems="stretch">
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ValueBox color="#38bdf8">
                  <Box display="flex" alignItems="center" gap={0.8}>
                    <LocalShipping sx={{ color: c.skyText, fontSize: 15 }} />
                    <Typography
                      sx={{
                        color: c.muted,
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Load Item
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: c.skyText,
                      fontWeight: 800,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                    }}
                  >
                    {formatCurrency(data.loadItem)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 6, md: 1 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OperatorChip tone="red">−</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ValueBox color="#f43f5e">
                  <Box display="flex" alignItems="center" gap={0.8}>
                    <AssignmentReturn
                      sx={{ color: "#f43f5e", fontSize: 15 }}
                    />
                    <Typography
                      sx={{
                        color: c.muted,
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Return Item
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#f43f5e",
                      fontWeight: 800,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                    }}
                  >
                    {formatCurrency(data.returnItem)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 6, md: 1 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OperatorChip tone="green">=</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <ResultBox color="#38bdf8">
                  <Typography
                    sx={{
                      color: c.muted,
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                    }}
                  >
                    Today Sale
                  </Typography>
                  <Typography
                    sx={{
                      color: c.skyText,
                      fontWeight: 900,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
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
            <Box display="flex" alignItems="center" gap={1.2} mb={1.5}>
              <StepBadge accentcolor="#9333ea">2</StepBadge>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    color: c.purpleText,
                    fontWeight: 800,
                    fontSize: { xs: "0.78rem", sm: "0.85rem" },
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                  }}
                >
                  Today Payment Received
                </Typography>
                <Typography
                  sx={{ color: c.muted, fontSize: "0.68rem", mt: 0.2 }}
                >
                  Note Summary − Previous Payment = Sale Payment
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={1} alignItems="stretch">
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ValueBox color="#c084fc">
                  <Box display="flex" alignItems="center" gap={0.8}>
                    <PointOfSale sx={{ color: c.purpleText, fontSize: 15 }} />
                    <Typography
                      sx={{
                        color: c.muted,
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Note Summary
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: c.purpleText,
                      fontWeight: 800,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                    }}
                  >
                    {formatCurrency(data.noteSummary)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 6, md: 1 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OperatorChip tone="red">−</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ValueBox color="#f43f5e">
                  <Box display="flex" alignItems="center" gap={0.8}>
                    <Payments sx={{ color: "#f43f5e", fontSize: 15 }} />
                    <Typography
                      sx={{
                        color: c.muted,
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Previous Payment
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#f43f5e",
                      fontWeight: 800,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                    }}
                  >
                    {formatCurrency(data.paymentReceived)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 6, md: 1 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OperatorChip tone="green">=</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <ResultBox color="#c084fc">
                  <Typography
                    sx={{
                      color: c.muted,
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                    }}
                  >
                    Sale Payment
                  </Typography>
                  <Typography
                    sx={{
                      color: c.purpleText,
                      fontWeight: 900,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                    }}
                  >
                    {formatCurrency(salePayment)}
                  </Typography>
                </ResultBox>
              </Grid>
            </Grid>
          </SectionCard>

          {/* STEP 3 */}
          <SectionCard accentcolor="#fbbf24">
            <Box display="flex" alignItems="center" gap={1.2} mb={1.5}>
              <StepBadge accentcolor="#d97706">3</StepBadge>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    color: c.amberText,
                    fontWeight: 800,
                    fontSize: { xs: "0.78rem", sm: "0.85rem" },
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                  }}
                >
                  Grand Total
                </Typography>
                <Typography
                  sx={{ color: c.muted, fontSize: "0.68rem", mt: 0.2 }}
                >
                  Sale Payment + Expenses + Credit Customer = Grand Total
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={1} alignItems="stretch">
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <ValueBox color="#c084fc">
                  <Box display="flex" alignItems="center" gap={0.8}>
                    <Payments sx={{ color: c.purpleText, fontSize: 15 }} />
                    <Typography
                      sx={{
                        color: c.muted,
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Sale Payment
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: c.purpleText,
                      fontWeight: 800,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                    }}
                  >
                    {formatCurrency(salePayment)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 6, md: 1 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OperatorChip tone="green">+</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <ValueBox color="#f43f5e">
                  <Box display="flex" alignItems="center" gap={0.8}>
                    <Receipt sx={{ color: "#f43f5e", fontSize: 15 }} />
                    <Typography
                      sx={{
                        color: c.muted,
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Expenses
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#f43f5e",
                      fontWeight: 800,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                    }}
                  >
                    {formatCurrency(data.expenses)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 6, md: 1 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OperatorChip tone="green">+</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <ValueBox color="#34d399">
                  <Box display="flex" alignItems="center" gap={0.8}>
                    <GroupIcon sx={{ color: c.emeraldText, fontSize: 15 }} />
                    <Typography
                      sx={{
                        color: c.muted,
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Credit Customer
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: c.emeraldText,
                      fontWeight: 800,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                    }}
                  >
                    {formatCurrency(data.creditCustomer || 0)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 12, md: 12 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OperatorChip tone="blue">=</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <ResultBox color="#fbbf24">
                  <Typography
                    sx={{
                      color: c.muted,
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                    }}
                  >
                    Grand Total
                  </Typography>
                  <Typography
                    sx={{
                      color: c.amberText,
                      fontWeight: 900,
                      fontSize: { xs: "1.15rem", sm: "1.35rem" },
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
            <Box display="flex" alignItems="center" gap={1.2} mb={1.5}>
              <StepBadge accentcolor={isBalanced ? "#059669" : "#e11d48"}>
                4
              </StepBadge>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    color: isBalanced ? c.emeraldText : "#f43f5e",
                    fontWeight: 800,
                    fontSize: { xs: "0.78rem", sm: "0.85rem" },
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                  }}
                >
                  Difference Check
                </Typography>
                <Typography
                  sx={{ color: c.muted, fontSize: "0.68rem", mt: 0.2 }}
                >
                  Grand Total − Today Sale = Difference
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={1} alignItems="stretch">
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ValueBox color="#fbbf24">
                  <Box display="flex" alignItems="center" gap={0.8}>
                    <Calculate sx={{ color: c.amberText, fontSize: 15 }} />
                    <Typography
                      sx={{
                        color: c.muted,
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Grand Total
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: c.amberText,
                      fontWeight: 800,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                    }}
                  >
                    {formatCurrency(grandTotal)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 6, md: 1 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OperatorChip tone="red">−</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <ValueBox color="#38bdf8">
                  <Box display="flex" alignItems="center" gap={0.8}>
                    <TrendingUp sx={{ color: c.skyText, fontSize: 15 }} />
                    <Typography
                      sx={{
                        color: c.muted,
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Today Sale
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: c.skyText,
                      fontWeight: 800,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                    }}
                  >
                    {formatCurrency(todaySale)}
                  </Typography>
                </ValueBox>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 6, md: 1 }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <OperatorChip tone="green">=</OperatorChip>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <ResultBox color={isBalanced ? "#34d399" : "#f43f5e"}>
                  <Typography
                    sx={{
                      color: c.muted,
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                    }}
                  >
                    Difference
                  </Typography>
                  <Typography
                    sx={{
                      color: isBalanced ? c.emeraldText : "#f43f5e",
                      fontWeight: 900,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                    }}
                  >
                    {formatCurrency(difference)}
                  </Typography>
                </ResultBox>
              </Grid>
            </Grid>

            {/* Status banner */}
            <Box
              sx={{
                mt: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                py: 1.2,
                px: 1.5,
                borderRadius: "10px",
                backgroundColor: isBalanced
                  ? "rgba(52, 211, 153, 0.1)"
                  : "rgba(244, 63, 94, 0.1)",
                border: isBalanced
                  ? "1px solid rgba(52, 211, 153, 0.4)"
                  : "1px solid rgba(244, 63, 94, 0.4)",
              }}
            >
              {isBalanced ? (
                <CheckCircle sx={{ color: c.emeraldText, fontSize: 18 }} />
              ) : (
                <WarningIcon sx={{ color: "#f43f5e", fontSize: 18 }} />
              )}
              <Typography
                sx={{
                  color: isBalanced ? c.emeraldText : "#f43f5e",
                  fontWeight: 700,
                  fontSize: { xs: "0.72rem", sm: "0.82rem" },
                  letterSpacing: 0.3,
                  textAlign: "center",
                }}
              >
                {isBalanced
                  ? "Positive Difference — Profit / Balanced"
                  : "Negative Difference — Loss / Mismatch"}
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
            bgcolor: "#14b8a6",
            color: "#ffffff",
            width: 50,
            height: 50,
            boxShadow: "0 8px 24px rgba(20, 184, 166, 0.45)",
            "&:hover": { bgcolor: "#0d9488" },
          }}
        >
          <HomeIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default ViewSettlement;