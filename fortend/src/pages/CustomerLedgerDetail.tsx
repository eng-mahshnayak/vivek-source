// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import {
// //   Box,
// //   Grid,
// //   Typography,
// //   Chip,
// //   Button,
// //   CircularProgress,
// //   Pagination,
// //   Tooltip,
// //   Fab,
// // } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// // import {
// //   ArrowBack,
// //   Home as HomeIcon,
// //   Refresh as RefreshIcon,
// //   FilterAlt as FilterIcon,
// //   Clear as ClearIcon,
// //   ShoppingCart,
// //   Payments,
// //   AccountBalanceWallet,
// //   Person,
// //   Add as AddIcon,
// //   Remove as RemoveIcon,
// //   ReceiptLong,
// //   Phone as PhoneIcon,
// // } from "@mui/icons-material";

// // // ===================== TYPES =====================

// // interface LedgerEntry {
// //   _id: string;
// //   type: "credit" | "debit";
// //   description?: string;
// //   amount: number;
// //   date: string;
// //   reference?: string;
// //   runningBalance: number; // 🔥 from backend
// // }

// // interface CustomerInfo {
// //   _id: string;
// //   customerName: string;
// //   phone?: string;
// // }

// // interface LedgerSummary {
// //   totalSell: number;
// //   totalPaid: number;
// //   balance: number;
// //   closingBalance: number;
// //   totalEntries: number;
// // }

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // const getAuthHeaders = () => ({
// //   headers: {
// //     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
// //   },
// // });

// // // ===================== STYLED =====================

// // const DarkBanner = styled(Box)(() => ({
// //   backgroundColor: "#0d1527",
// //   borderRadius: "16px",
// //   border: "1px solid rgba(255, 255, 255, 0.08)",
// //   padding: "20px 24px",
// //   marginBottom: "16px",
// //   boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
// //   flexShrink: 0,
// // }));

// // const FilterBar = styled(Box)(() => ({
// //   backgroundColor: "#0d1527",
// //   borderRadius: "16px",
// //   border: "1px solid rgba(255, 255, 255, 0.08)",
// //   padding: "14px 20px",
// //   marginBottom: "16px",
// //   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
// //   flexShrink: 0,
// // }));

// // const StyledDateInput = styled("input")(() => ({
// //   borderRadius: "10px",
// //   backgroundColor: "#090d16",
// //   color: "#ffffff",
// //   fontSize: "0.8rem",
// //   fontWeight: 500,
// //   padding: "9px 12px",
// //   border: "1px solid rgba(255, 255, 255, 0.1)",
// //   outline: "none",
// //   height: "38px",
// //   width: "100%",
// //   "&:hover": { borderColor: "rgba(56, 189, 248, 0.4)" },
// //   "&:focus": { borderColor: "#38bdf8" },
// //   "&::-webkit-calendar-picker-indicator": {
// //     filter: "invert(0.7)",
// //     cursor: "pointer",
// //   },
// // }));

// // const MetricCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
// //   backgroundColor: "#111827",
// //   borderRadius: "12px",
// //   border: "1px solid rgba(255, 255, 255, 0.08)",
// //   padding: "14px 18px",
// //   height: "100%",
// //   position: "relative",
// //   overflow: "hidden",
// //   transition: "all 0.3s ease",
// //   "&:hover": {
// //     transform: "translateY(-3px)",
// //     boxShadow: `0 12px 28px ${accentcolor}22`,
// //     borderColor: accentcolor,
// //   },
// //   "&::before": {
// //     content: '""',
// //     position: "absolute",
// //     top: 0,
// //     left: 0,
// //     width: "4px",
// //     height: "100%",
// //     backgroundColor: accentcolor,
// //   },
// // }));

// // const TableContainerDark = styled(Box)(() => ({
// //   backgroundColor: "#0d1527",
// //   borderRadius: "16px",
// //   border: "1px solid rgba(255, 255, 255, 0.08)",
// //   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
// //   overflow: "hidden",
// //   display: "flex",
// //   flexDirection: "column",
// //   flex: 1,
// //   minHeight: 0,
// //   marginBottom: "16px",
// // }));

// // const TableScrollArea = styled(Box)(() => ({
// //   overflow: "auto",
// //   flex: 1,
// //   minHeight: 0,
// //   "&::-webkit-scrollbar": { width: "8px", height: "8px" },
// //   "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
// //   "&::-webkit-scrollbar-thumb": {
// //     backgroundColor: "rgba(56, 189, 248, 0.3)",
// //     borderRadius: "8px",
// //     "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.5)" },
// //   },
// // }));

// // const ItemsTable = styled("table")(() => ({
// //   width: "100%",
// //   borderCollapse: "collapse",
// //   "& thead": {
// //     backgroundColor: "#111827",
// //     position: "sticky",
// //     top: 0,
// //     zIndex: 5,
// //   },
// //   "& thead th": {
// //     color: "#9ca3af",
// //     fontWeight: 700,
// //     fontSize: "0.7rem",
// //     textTransform: "uppercase",
// //     letterSpacing: "0.8px",
// //     padding: "14px 12px",
// //     borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
// //     textAlign: "left",
// //     whiteSpace: "nowrap",
// //     backgroundColor: "#111827",
// //   },
// //   "& tbody tr": {
// //     transition: "all 0.2s ease",
// //     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
// //   },
// //   "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
// //   "& tbody td": {
// //     color: "#e5e7eb",
// //     fontSize: "0.85rem",
// //     padding: "12px",
// //     textAlign: "left",
// //   },
// // }));

// // const TypeBadge = styled(Box)<{ type: "credit" | "debit" }>(({ type }) => {
// //   const isCredit = type === "credit";
// //   return {
// //     display: "inline-flex",
// //     alignItems: "center",
// //     gap: "5px",
// //     padding: "4px 10px",
// //     borderRadius: "20px",
// //     fontWeight: 700,
// //     fontSize: "0.68rem",
// //     textTransform: "uppercase",
// //     letterSpacing: 0.5,
// //     backgroundColor: isCredit
// //       ? "rgba(56, 189, 248, 0.15)"
// //       : "rgba(244, 63, 94, 0.15)",
// //     color: isCredit ? "#38bdf8" : "#f43f5e",
// //     border: isCredit
// //       ? "1px solid rgba(56, 189, 248, 0.4)"
// //       : "1px solid rgba(244, 63, 94, 0.4)",
// //     "& svg": { fontSize: "14px" },
// //   };
// // });

// // // ===================== HELPERS =====================

// // const todayStr = () => new Date().toISOString().split("T")[0];
// // const firstOfMonthStr = () => {
// //   const d = new Date();
// //   return new Date(d.getFullYear(), d.getMonth(), 1)
// //     .toISOString()
// //     .split("T")[0];
// // };

// // const formatDate = (d: string) =>
// //   new Date(d).toLocaleDateString("en-IN", {
// //     day: "2-digit",
// //     month: "short",
// //     year: "numeric",
// //   });

// // const formatCurrency = (amount: number) =>
// //   `₹ ${Math.abs(amount || 0).toLocaleString("en-IN", {
// //     minimumFractionDigits: 2,
// //     maximumFractionDigits: 2,
// //   })}`;

// // // ===================== MAIN COMPONENT =====================

// // const CustomerLedgerDetail: React.FC = () => {
// //   const navigate = useNavigate();
// //   const { customerId } = useParams<{ customerId: string }>();

// //   const [customer, setCustomer] = useState<CustomerInfo | null>(null);
// //   const [entries, setEntries] = useState<LedgerEntry[]>([]);
// //   const [summary, setSummary] = useState<LedgerSummary>({
// //     totalSell: 0,
// //     totalPaid: 0,
// //     balance: 0,
// //     closingBalance: 0,
// //     totalEntries: 0,
// //   });
// //   const [loading, setLoading] = useState(true);

// //   // Filters
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [appliedFrom, setAppliedFrom] = useState("");
// //   const [appliedTo, setAppliedTo] = useState("");
// //   const [typeFilter, setTypeFilter] = useState<"all" | "credit" | "debit">(
// //     "all"
// //   );

// //   // Pagination
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(10);

// //   // ===================== FETCH =====================
// //   const fetchData = async () => {
// //     if (!customerId) return;
// //     setLoading(true);

// //     try {
// //       const params: any = {};
// //       if (appliedFrom) params.fromDate = appliedFrom;
// //       if (appliedTo) params.toDate = appliedTo;

// //       const res = await axios.get(
// //         `${API_URL}/customer-ledger/customer/${customerId}`,
// //         {
// //           params,
// //           ...getAuthHeaders(),
// //         }
// //       );

// //       if (res.data?.success || res.data?.status) {
// //         setCustomer(res.data.customer);

// //         // 🔥 Backend-computed summary
// //         setSummary({
// //           totalSell: res.data.summary?.totalSell ?? 0,
// //           totalPaid: res.data.summary?.totalPaid ?? 0,
// //           balance: res.data.summary?.balance ?? 0,
// //           closingBalance: res.data.summary?.closingBalance ?? 0,
// //           totalEntries: res.data.summary?.totalEntries ?? 0,
// //         });

// //         // 🔥 Entries with backend-computed runningBalance
// //         setEntries(res.data.data || []);
// //       } else if (res.data?.message === "Unauthorized") {
// //         toast.error("Session expired! Please login again");
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(res.data?.message || "Failed to load ledger");
// //         setEntries([]);
// //       }
// //     } catch (err: any) {
// //       if (err.response?.data?.message === "Unauthorized") {
// //         localStorage.removeItem("erptoken");
// //         navigate("/login");
// //       } else {
// //         toast.error(err.response?.data?.message || "Failed to load data");
// //       }
// //       setEntries([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [customerId, appliedFrom, appliedTo]);

// //   // ===================== TYPE FILTER (local only) =====================
// //   // 🔥 Sirf display filter — koi calculation nahi
// //   const displayedEntries =
// //     typeFilter === "all"
// //       ? entries
// //       : entries.filter((e) => e.type === typeFilter);

// //   const totalCount = displayedEntries.length;
// //   const totalPages = Math.max(1, Math.ceil(totalCount / limit));
// //   const pageEntries = displayedEntries.slice(
// //     (page - 1) * limit,
// //     page * limit
// //   );

// //   // ===================== FILTER HANDLERS =====================
// //   const handleApplyFilters = () => {
// //     if (fromDate && toDate && fromDate > toDate) {
// //       toast.error("From date cannot be after To date");
// //       return;
// //     }
// //     setAppliedFrom(fromDate);
// //     setAppliedTo(toDate);
// //     setPage(1);
// //   };

// //   const handleClearFilters = () => {
// //     setFromDate("");
// //     setToDate("");
// //     setAppliedFrom("");
// //     setAppliedTo("");
// //     setTypeFilter("all");
// //     setPage(1);
// //   };

// //   const applyQuickRange = (type: "today" | "week" | "month" | "all") => {
// //     const t = todayStr();
// //     if (type === "today") {
// //       setFromDate(t);
// //       setToDate(t);
// //       setAppliedFrom(t);
// //       setAppliedTo(t);
// //     } else if (type === "week") {
// //       const d = new Date();
// //       d.setDate(d.getDate() - 6);
// //       const f = d.toISOString().split("T")[0];
// //       setFromDate(f);
// //       setToDate(t);
// //       setAppliedFrom(f);
// //       setAppliedTo(t);
// //     } else if (type === "month") {
// //       const f = firstOfMonthStr();
// //       setFromDate(f);
// //       setToDate(t);
// //       setAppliedFrom(f);
// //       setAppliedTo(t);
// //     } else {
// //       setFromDate("");
// //       setToDate("");
// //       setAppliedFrom("");
// //       setAppliedTo("");
// //     }
// //     setPage(1);
// //   };

// //   const hasFilter = !!(appliedFrom || appliedTo || typeFilter !== "all");

// //   // 🔥 Balance color: positive → green (you'll receive), negative → red (you'll pay)
// //   const balanceColor = summary.balance >= 0 ? "#34d399" : "#f43f5e";
// //   const balanceLabel =
// //     summary.balance >= 0 ? "You'll receive" : "You'll pay";

// //   // ===================== RENDER =====================
// //   return (
// //     <Box
// //       sx={{
// //         height: "85vh",
// //         maxHeight: "100vh",
// //         overflow: "hidden",
// //         bgcolor: "#090d16",
// //         px: { xs: 1.5, sm: 2, md: 3 },
// //         py: { xs: 1.5, md: 2 },
// //         color: "#ffffff",
// //         display: "flex",
// //         flexDirection: "column",
// //         boxSizing: "border-box",
// //       }}
// //     >
// //       <Box
// //         sx={{
// //           width: "100%",
// //           maxWidth: 1400,
// //           mx: "auto",
// //           display: "flex",
// //           flexDirection: "column",
// //           flex: 1,
// //           minHeight: 0,
// //         }}
// //       >
// //         {/* HEADER */}
// //         <DarkBanner>
// //           <Box
// //             display="flex"
// //             justifyContent="space-between"
// //             alignItems="center"
// //             flexWrap="wrap"
// //             gap={2}
// //           >
// //             <Box display="flex" alignItems="center" gap={2}>
// //               <Button
// //                 variant="outlined"
// //                 startIcon={<ArrowBack />}
// //                 onClick={() => navigate("/customer-ledger")}
// //                 sx={{
// //                   color: "#e5e7eb",
// //                   borderColor: "rgba(255, 255, 255, 0.15)",
// //                   fontWeight: 700,
// //                   textTransform: "none",
// //                   borderRadius: "10px",
// //                   px: 2,
// //                   py: 0.9,
// //                   fontSize: "0.8rem",
// //                   "&:hover": {
// //                     borderColor: "#38bdf8",
// //                     color: "#38bdf8",
// //                     bgcolor: "rgba(56, 189, 248, 0.08)",
// //                   },
// //                 }}
// //               >
// //                 Back
// //               </Button>

// //               <Box display="flex" alignItems="center" gap={1.5}>
// //                 <Box
// //                   sx={{
// //                     width: 40,
// //                     height: 40,
// //                     borderRadius: "10px",
// //                     bgcolor: "#0c2a3a",
// //                     color: "#38bdf8",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                   }}
// //                 >
// //                   <Person />
// //                 </Box>
// //                 <Box>
// //                   <Box display="flex" alignItems="center" gap={1} mb={0.2}>
// //                     <Typography
// //                       sx={{
// //                         color: "#38bdf8",
// //                         letterSpacing: 0.5,
// //                         fontSize: "0.7rem",
// //                         fontWeight: 700,
// //                       }}
// //                     >
// //                       Ledger Detail
// //                     </Typography>
// //                     {customer?.phone && (
// //                       <Chip
// //                         icon={<PhoneIcon sx={{ fontSize: 12 }} />}
// //                         label={customer.phone}
// //                         size="small"
// //                         sx={{
// //                           bgcolor: "rgba(56, 189, 248, 0.1)",
// //                           color: "#38bdf8",
// //                           border: "1px solid rgba(56, 189, 248, 0.3)",
// //                           fontWeight: 600,
// //                           fontSize: "0.65rem",
// //                           height: "20px",
// //                         }}
// //                       />
// //                     )}
// //                   </Box>
// //                   <Typography
// //                     variant="h5"
// //                     fontWeight="800"
// //                     sx={{
// //                       fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
// //                     }}
// //                   >
// //                     {customer?.customerName || "Customer"} — History
// //                   </Typography>
// //                 </Box>
// //               </Box>
// //             </Box>

// //             <Button
// //               variant="outlined"
// //               startIcon={<RefreshIcon />}
// //               onClick={fetchData}
// //               disabled={loading}
// //               sx={{
// //                 color: "#e5e7eb",
// //                 borderColor: "rgba(255, 255, 255, 0.15)",
// //                 fontWeight: 700,
// //                 textTransform: "none",
// //                 borderRadius: "10px",
// //                 px: 2.2,
// //                 py: 1,
// //                 fontSize: "0.8rem",
// //                 "&:hover": {
// //                   borderColor: "#38bdf8",
// //                   color: "#38bdf8",
// //                   bgcolor: "rgba(56, 189, 248, 0.08)",
// //                 },
// //               }}
// //             >
// //               Refresh
// //             </Button>
// //           </Box>
// //         </DarkBanner>

// //         {/* SUMMARY CARDS — 🔥 backend-computed */}
// //         <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
// //           <Grid size={{ xs: 12, sm: 4 }}>
// //             <MetricCard accentcolor="#38bdf8">
// //               <Box
// //                 display="flex"
// //                 justifyContent="space-between"
// //                 alignItems="center"
// //                 mb={0.5}
// //               >
// //                 <Typography
// //                   sx={{
// //                     color: "#9ca3af",
// //                     fontSize: "0.7rem",
// //                     fontWeight: 700,
// //                     textTransform: "uppercase",
// //                     letterSpacing: 0.5,
// //                   }}
// //                 >
// //                   Total Sell
// //                 </Typography>
// //                 <ShoppingCart sx={{ color: "#38bdf8", fontSize: 20 }} />
// //               </Box>
// //               <Typography
// //                 sx={{ color: "#38bdf8", fontWeight: 800, fontSize: "1.3rem" }}
// //               >
// //                 {formatCurrency(summary.totalSell)}
// //               </Typography>
// //               <Typography
// //                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
// //               >
// //                 Credit / Udhaar
// //               </Typography>
// //             </MetricCard>
// //           </Grid>

// //           <Grid size={{ xs: 12, sm: 4 }}>
// //             <MetricCard accentcolor="#f43f5e">
// //               <Box
// //                 display="flex"
// //                 justifyContent="space-between"
// //                 alignItems="center"
// //                 mb={0.5}
// //               >
// //                 <Typography
// //                   sx={{
// //                     color: "#9ca3af",
// //                     fontSize: "0.7rem",
// //                     fontWeight: 700,
// //                     textTransform: "uppercase",
// //                     letterSpacing: 0.5,
// //                   }}
// //                 >
// //                   Total Paid
// //                 </Typography>
// //                 <Payments sx={{ color: "#f43f5e", fontSize: 20 }} />
// //               </Box>
// //               <Typography
// //                 sx={{ color: "#f43f5e", fontWeight: 800, fontSize: "1.3rem" }}
// //               >
// //                 {formatCurrency(summary.totalPaid)}
// //               </Typography>
// //               <Typography
// //                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
// //               >
// //                 Received
// //               </Typography>
// //             </MetricCard>
// //           </Grid>

// //           <Grid size={{ xs: 12, sm: 4 }}>
// //             <MetricCard accentcolor={balanceColor}>
// //               <Box
// //                 display="flex"
// //                 justifyContent="space-between"
// //                 alignItems="center"
// //                 mb={0.5}
// //               >
// //                 <Typography
// //                   sx={{
// //                     color: "#9ca3af",
// //                     fontSize: "0.7rem",
// //                     fontWeight: 700,
// //                     textTransform: "uppercase",
// //                     letterSpacing: 0.5,
// //                   }}
// //                 >
// //                   Balance
// //                 </Typography>
// //                 <AccountBalanceWallet
// //                   sx={{ color: balanceColor, fontSize: 20 }}
// //                 />
// //               </Box>
// //               <Typography
// //                 sx={{
// //                   color: balanceColor,
// //                   fontWeight: 800,
// //                   fontSize: "1.3rem",
// //                 }}
// //               >
// //                 {/* 🔥 Sign show karo */}
// //                 {summary.balance < 0 ? "− " : ""}
// //                 {formatCurrency(summary.balance)}
// //               </Typography>
// //               <Typography
// //                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
// //               >
// //                 {balanceLabel}
// //               </Typography>
// //             </MetricCard>
// //           </Grid>
// //         </Grid>

// //         {/* FILTER BAR */}
// //         <FilterBar>
// //           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.2}>
// //             <Box display="flex" alignItems="center" gap={0.8}>
// //               <FilterIcon sx={{ color: "#38bdf8", fontSize: 18 }} />
// //               <Typography
// //                 sx={{
// //                   color: "#38bdf8",
// //                   fontWeight: 800,
// //                   fontSize: "0.72rem",
// //                   letterSpacing: 1,
// //                   textTransform: "uppercase",
// //                 }}
// //               >
// //                 Filters
// //               </Typography>
// //             </Box>

// //             <Box sx={{ width: 150 }}>
// //               <StyledDateInput
// //                 type="date"
// //                 value={fromDate}
// //                 onChange={(e) => setFromDate(e.target.value)}
// //               />
// //             </Box>
// //             <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
// //               to
// //             </Typography>
// //             <Box sx={{ width: 150 }}>
// //               <StyledDateInput
// //                 type="date"
// //                 value={toDate}
// //                 onChange={(e) => setToDate(e.target.value)}
// //               />
// //             </Box>

// //             <Box display="flex" gap={0.6}>
// //               {[
// //                 { k: "all", label: "All", color: "#9ca3af" },
// //                 { k: "credit", label: "Sell", color: "#38bdf8" },
// //                 { k: "debit", label: "Paid", color: "#f43f5e" },
// //               ].map((t) => (
// //                 <Chip
// //                   key={t.k}
// //                   label={t.label}
// //                   size="small"
// //                   onClick={() => {
// //                     setTypeFilter(t.k as any);
// //                     setPage(1);
// //                   }}
// //                   sx={{
// //                     bgcolor:
// //                       typeFilter === t.k
// //                         ? `${t.color}22`
// //                         : "rgba(255, 255, 255, 0.05)",
// //                     color: typeFilter === t.k ? t.color : "#9ca3af",
// //                     border:
// //                       typeFilter === t.k
// //                         ? `1px solid ${t.color}66`
// //                         : "1px solid rgba(255, 255, 255, 0.1)",
// //                     fontWeight: 700,
// //                     fontSize: "0.7rem",
// //                     height: "32px",
// //                     cursor: "pointer",
// //                     "&:hover": { bgcolor: `${t.color}22`, color: t.color },
// //                   }}
// //                 />
// //               ))}
// //             </Box>

// //             <Button
// //               size="small"
// //               variant="contained"
// //               onClick={handleApplyFilters}
// //               sx={{
// //                 bgcolor: "#38bdf8",
// //                 color: "#0d1527",
// //                 fontWeight: 700,
// //                 textTransform: "none",
// //                 borderRadius: "8px",
// //                 px: 2,
// //                 height: "36px",
// //                 fontSize: "0.75rem",
// //                 "&:hover": { bgcolor: "#0ea5e9" },
// //               }}
// //             >
// //               Apply
// //             </Button>

// //             <Button
// //               size="small"
// //               variant="outlined"
// //               startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
// //               onClick={handleClearFilters}
// //               disabled={!hasFilter && !fromDate && !toDate}
// //               sx={{
// //                 color: "#9ca3af",
// //                 borderColor: "rgba(255, 255, 255, 0.15)",
// //                 fontWeight: 700,
// //                 textTransform: "none",
// //                 borderRadius: "8px",
// //                 px: 1.5,
// //                 height: "36px",
// //                 fontSize: "0.75rem",
// //                 "&:hover": {
// //                   borderColor: "#f43f5e",
// //                   color: "#f43f5e",
// //                   bgcolor: "rgba(244, 63, 94, 0.08)",
// //                 },
// //               }}
// //             >
// //               Clear
// //             </Button>

// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 gap: 0.7,
// //                 ml: { md: "auto" },
// //                 flexWrap: "wrap",
// //               }}
// //             >
// //               {[
// //                 { k: "today", label: "Today" },
// //                 { k: "week", label: "7d" },
// //                 { k: "month", label: "Month" },
// //                 { k: "all", label: "All" },
// //               ].map((q) => (
// //                 <Chip
// //                   key={q.k}
// //                   label={q.label}
// //                   size="small"
// //                   onClick={() =>
// //                     applyQuickRange(q.k as "today" | "week" | "month" | "all")
// //                   }
// //                   sx={{
// //                     bgcolor: "rgba(255, 255, 255, 0.05)",
// //                     color: "#e5e7eb",
// //                     border: "1px solid rgba(255, 255, 255, 0.1)",
// //                     fontWeight: 600,
// //                     fontSize: "0.7rem",
// //                     height: "30px",
// //                     cursor: "pointer",
// //                     "&:hover": {
// //                       bgcolor: "rgba(56, 189, 248, 0.15)",
// //                       borderColor: "rgba(56, 189, 248, 0.4)",
// //                       color: "#38bdf8",
// //                     },
// //                   }}
// //                 />
// //               ))}
// //             </Box>
// //           </Box>
// //         </FilterBar>

// //         {/* ENTRIES TABLE */}
// //         <TableContainerDark>
// //           <Box
// //             display="flex"
// //             justifyContent="space-between"
// //             alignItems="center"
// //             px={3}
// //             py={1.5}
// //             sx={{
// //               borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <Typography
// //               sx={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: 0.5 }}
// //             >
// //               TRANSACTION HISTORY
// //             </Typography>
// //             <Chip
// //               label={`${totalCount} Entries`}
// //               size="small"
// //               sx={{
// //                 bgcolor: "rgba(56, 189, 248, 0.1)",
// //                 color: "#38bdf8",
// //                 border: "1px solid rgba(56, 189, 248, 0.3)",
// //                 fontWeight: 700,
// //                 fontSize: "0.7rem",
// //                 height: "24px",
// //               }}
// //             />
// //           </Box>

// //           <TableScrollArea>
// //             <ItemsTable>
// //               <thead>
// //                 <tr>
// //                   <th style={{ textAlign: "center", width: "50px" }}>#</th>
// //                   <th style={{ textAlign: "center", width: "110px" }}>Date</th>
// //                   <th>Description</th>
// //                   <th style={{ textAlign: "center", width: "100px" }}>Type</th>
// //                   <th style={{ textAlign: "right", width: "140px" }}>Amount</th>
// //                   <th style={{ textAlign: "right", width: "150px" }}>
// //                     Balance
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {loading ? (
// //                   <tr>
// //                     <td
// //                       colSpan={6}
// //                       style={{ textAlign: "center", padding: 40 }}
// //                     >
// //                       <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
// //                       <Typography
// //                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
// //                       >
// //                         Loading entries...
// //                       </Typography>
// //                     </td>
// //                   </tr>
// //                 ) : pageEntries.length === 0 ? (
// //                   <tr>
// //                     <td
// //                       colSpan={6}
// //                       style={{ textAlign: "center", padding: 40 }}
// //                     >
// //                       <ReceiptLong
// //                         style={{
// //                           fontSize: 44,
// //                           color: "#374151",
// //                           marginBottom: 8,
// //                         }}
// //                       />
// //                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
// //                         No entries found
// //                       </Typography>
// //                       <Typography
// //                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
// //                       >
// //                         {hasFilter
// //                           ? "Try changing the filters"
// //                           : "No transaction history yet"}
// //                       </Typography>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   pageEntries.map((row, idx) => {
// //                     const isCredit = row.type === "credit";
// //                     // 🔥 runningBalance backend se — color based on sign
// //                     const balanceNegative = row.runningBalance < 0;

// //                     return (
// //                       <tr key={row._id}>
// //                         <td style={{ textAlign: "center", color: "#6b7280" }}>
// //                           {(page - 1) * limit + idx + 1}
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Typography
// //                             sx={{ color: "#9ca3af", fontSize: "0.78rem" }}
// //                           >
// //                             {formatDate(row.date)}
// //                           </Typography>
// //                         </td>
// //                         <td>
// //                           <Typography
// //                             sx={{ color: "#e5e7eb", fontSize: "0.85rem" }}
// //                           >
// //                             {row.description || "-"}
// //                           </Typography>
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <TypeBadge type={isCredit ? "credit" : "debit"}>
// //                             {isCredit ? (
// //                               <AddIcon fontSize="inherit" />
// //                             ) : (
// //                               <RemoveIcon fontSize="inherit" />
// //                             )}
// //                             {isCredit ? "Sell" : "Paid"}
// //                           </TypeBadge>
// //                         </td>
// //                         <td
// //                           style={{
// //                             textAlign: "right",
// //                             fontWeight: 800,
// //                             fontSize: "0.9rem",
// //                             color: isCredit ? "#38bdf8" : "#f43f5e",
// //                           }}
// //                         >
// //                           {isCredit ? "+" : "−"} {formatCurrency(row.amount)}
// //                         </td>
// //                         <td
// //                           style={{
// //                             textAlign: "right",
// //                             fontWeight: 800,
// //                             fontSize: "0.9rem",
// //                             color: balanceNegative ? "#f43f5e" : "#34d399",
// //                           }}
// //                         >
// //                           {balanceNegative ? "− " : ""}
// //                           {formatCurrency(row.runningBalance)}
// //                         </td>
// //                       </tr>
// //                     );
// //                   })
// //                 )}
// //               </tbody>
// //             </ItemsTable>
// //           </TableScrollArea>

// //           {/* Pagination */}
// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               flexWrap: "wrap",
// //               gap: 1.5,
// //               px: 3,
// //               py: 1.5,
// //               borderTop: "1px solid rgba(255, 255, 255, 0.08)",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <Box display="flex" alignItems="center" gap={1.2}>
// //               <Typography
// //                 sx={{ color: "#9ca3af", fontSize: "0.72rem", fontWeight: 600 }}
// //               >
// //                 Rows:
// //               </Typography>
// //               {[10, 25, 50, 100].map((n) => (
// //                 <Chip
// //                   key={n}
// //                   label={n}
// //                   size="small"
// //                   onClick={() => {
// //                     setLimit(n);
// //                     setPage(1);
// //                   }}
// //                   sx={{
// //                     bgcolor:
// //                       limit === n
// //                         ? "rgba(56, 189, 248, 0.2)"
// //                         : "rgba(255, 255, 255, 0.05)",
// //                     color: limit === n ? "#38bdf8" : "#9ca3af",
// //                     border:
// //                       limit === n
// //                         ? "1px solid rgba(56, 189, 248, 0.5)"
// //                         : "1px solid rgba(255, 255, 255, 0.1)",
// //                     fontWeight: 700,
// //                     fontSize: "0.68rem",
// //                     height: "24px",
// //                     cursor: "pointer",
// //                   }}
// //                 />
// //               ))}
// //               <Typography
// //                 sx={{ color: "#6b7280", fontSize: "0.72rem", ml: 1 }}
// //               >
// //                 {totalCount > 0
// //                   ? `${(page - 1) * limit + 1}–${Math.min(
// //                       page * limit,
// //                       totalCount
// //                     )} of ${totalCount}`
// //                   : "0 records"}
// //               </Typography>
// //             </Box>

// //             <Pagination
// //               count={Math.max(1, totalPages)}
// //               page={page}
// //               onChange={(_, v) => setPage(v)}
// //               disabled={loading}
// //               shape="rounded"
// //               size="small"
// //               sx={{
// //                 "& .MuiPaginationItem-root": {
// //                   color: "#9ca3af",
// //                   fontWeight: 700,
// //                   fontSize: "0.78rem",
// //                   "&:hover": {
// //                     bgcolor: "rgba(56, 189, 248, 0.1)",
// //                     color: "#38bdf8",
// //                   },
// //                 },
// //                 "& .Mui-selected": {
// //                   bgcolor: "rgba(56, 189, 248, 0.2) !important",
// //                   color: "#38bdf8 !important",
// //                 },
// //               }}
// //             />
// //           </Box>
// //         </TableContainerDark>
// //       </Box>

// //       {/* FLOATING DASHBOARD */}
// //       <Tooltip title="Back to Dashboard" placement="left">
// //         <Fab
// //           onClick={() => navigate("/dashboard")}
// //           sx={{
// //             position: "fixed",
// //             bottom: 20,
// //             right: 20,
// //             zIndex: 1200,
// //             bgcolor: "#38bdf8",
// //             color: "#0d1527",
// //             width: 52,
// //             height: 52,
// //             boxShadow: "0 8px 24px rgba(56, 189, 248, 0.45)",
// //             "&:hover": { bgcolor: "#0ea5e9" },
// //           }}
// //         >
// //           <HomeIcon />
// //         </Fab>
// //       </Tooltip>
// //     </Box>
// //   );
// // };

// // export default CustomerLedgerDetail;



// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import * as XLSX from "xlsx";
// import {
//   Box,
//   Grid,
//   Typography,
//   Chip,
//   Button,
//   CircularProgress,
//   Pagination,
//   Tooltip,
//   Fab,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   ArrowBack,
//   Home as HomeIcon,
//   Refresh as RefreshIcon,
//   FilterAlt as FilterIcon,
//   Clear as ClearIcon,
//   ShoppingCart,
//   Payments,
//   AccountBalanceWallet,
//   Person,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   ReceiptLong,
//   Phone as PhoneIcon,
//   FileDownload as FileDownloadIcon,
// } from "@mui/icons-material";

// // ===================== TYPES =====================

// interface LedgerEntry {
//   _id: string;
//   type: "credit" | "debit";
//   description?: string;
//   amount: number;
//   date: string;
//   reference?: string;
//   runningBalance: number;
// }

// interface CustomerInfo {
//   _id: string;
//   customerName: string;
//   phone?: string;
// }

// interface LedgerSummary {
//   totalSell: number;
//   totalPaid: number;
//   balance: number;
//   closingBalance: number;
//   totalEntries: number;
// }

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const getAuthHeaders = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
//   },
// });

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

// const FilterBar = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "14px 20px",
//   marginBottom: "16px",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   flexShrink: 0,
// }));

// const StyledDateInput = styled("input")(() => ({
//   borderRadius: "10px",
//   backgroundColor: "#090d16",
//   color: "#ffffff",
//   fontSize: "0.8rem",
//   fontWeight: 500,
//   padding: "9px 12px",
//   border: "1px solid rgba(255, 255, 255, 0.1)",
//   outline: "none",
//   height: "38px",
//   width: "100%",
//   "&:hover": { borderColor: "rgba(56, 189, 248, 0.4)" },
//   "&:focus": { borderColor: "#38bdf8" },
//   "&::-webkit-calendar-picker-indicator": {
//     filter: "invert(0.7)",
//     cursor: "pointer",
//   },
// }));

// const MetricCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
//   backgroundColor: "#111827",
//   borderRadius: "12px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "14px 18px",
//   height: "100%",
//   position: "relative",
//   overflow: "hidden",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-3px)",
//     boxShadow: `0 12px 28px ${accentcolor}22`,
//     borderColor: accentcolor,
//   },
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "4px",
//     height: "100%",
//     backgroundColor: accentcolor,
//   },
// }));

// const TableContainerDark = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   overflow: "hidden",
//   display: "flex",
//   flexDirection: "column",
//   flex: 1,
//   minHeight: 0,
//   marginBottom: "16px",
// }));

// const TableScrollArea = styled(Box)(() => ({
//   overflow: "auto",
//   flex: 1,
//   minHeight: 0,
//   "&::-webkit-scrollbar": { width: "8px", height: "8px" },
//   "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "rgba(56, 189, 248, 0.3)",
//     borderRadius: "8px",
//     "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.5)" },
//   },
// }));

// const ItemsTable = styled("table")(() => ({
//   width: "100%",
//   borderCollapse: "collapse",
//   "& thead": {
//     backgroundColor: "#111827",
//     position: "sticky",
//     top: 0,
//     zIndex: 5,
//   },
//   "& thead th": {
//     color: "#9ca3af",
//     fontWeight: 700,
//     fontSize: "0.7rem",
//     textTransform: "uppercase",
//     letterSpacing: "0.8px",
//     padding: "14px 12px",
//     borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//     textAlign: "left",
//     whiteSpace: "nowrap",
//     backgroundColor: "#111827",
//   },
//   "& tbody tr": {
//     transition: "all 0.2s ease",
//     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//   },
//   "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "12px",
//     textAlign: "left",
//   },
// }));

// const TypeBadge = styled(Box)<{ type: "credit" | "debit" }>(({ type }) => {
//   const isCredit = type === "credit";
//   return {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "5px",
//     padding: "4px 10px",
//     borderRadius: "20px",
//     fontWeight: 700,
//     fontSize: "0.68rem",
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//     backgroundColor: isCredit
//       ? "rgba(56, 189, 248, 0.15)"
//       : "rgba(244, 63, 94, 0.15)",
//     color: isCredit ? "#38bdf8" : "#f43f5e",
//     border: isCredit
//       ? "1px solid rgba(56, 189, 248, 0.4)"
//       : "1px solid rgba(244, 63, 94, 0.4)",
//     "& svg": { fontSize: "14px" },
//   };
// });

// // ===================== HELPERS =====================

// const todayStr = () => new Date().toISOString().split("T")[0];
// const firstOfMonthStr = () => {
//   const d = new Date();
//   return new Date(d.getFullYear(), d.getMonth(), 1)
//     .toISOString()
//     .split("T")[0];
// };

// const formatDate = (d: string) =>
//   new Date(d).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

// const formatCurrency = (amount: number) =>
//   `₹ ${Math.abs(amount || 0).toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;

// // ===================== MAIN COMPONENT =====================

// const CustomerLedgerDetail: React.FC = () => {
//   const navigate = useNavigate();
//   const { customerId } = useParams<{ customerId: string }>();

//   const [customer, setCustomer] = useState<CustomerInfo | null>(null);
//   const [entries, setEntries] = useState<LedgerEntry[]>([]);
//   const [summary, setSummary] = useState<LedgerSummary>({
//     totalSell: 0,
//     totalPaid: 0,
//     balance: 0,
//     closingBalance: 0,
//     totalEntries: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [downloading, setDownloading] = useState(false);

//   // Filters
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [appliedFrom, setAppliedFrom] = useState("");
//   const [appliedTo, setAppliedTo] = useState("");
//   const [typeFilter, setTypeFilter] = useState<"all" | "credit" | "debit">(
//     "all"
//   );

//   // Pagination
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   // ===================== FETCH =====================
//   const fetchData = async () => {
//     if (!customerId) return;
//     setLoading(true);

//     try {
//       const params: any = {};
//       if (appliedFrom) params.fromDate = appliedFrom;
//       if (appliedTo) params.toDate = appliedTo;

//       const res = await axios.get(
//         `${API_URL}/customer-ledger/customer/${customerId}`,
//         {
//           params,
//           ...getAuthHeaders(),
//         }
//       );

//       if (res.data?.success || res.data?.status) {
//         setCustomer(res.data.customer);

//         setSummary({
//           totalSell: res.data.summary?.totalSell ?? 0,
//           totalPaid: res.data.summary?.totalPaid ?? 0,
//           balance: res.data.summary?.balance ?? 0,
//           closingBalance: res.data.summary?.closingBalance ?? 0,
//           totalEntries: res.data.summary?.totalEntries ?? 0,
//         });

//         setEntries(res.data.data || []);
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to load ledger");
//         setEntries([]);
//       }
//     } catch (err: any) {
//       if (err.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(err.response?.data?.message || "Failed to load data");
//       }
//       setEntries([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [customerId, appliedFrom, appliedTo]);

//   // ===================== TYPE FILTER (local only) =====================
//   const displayedEntries =
//     typeFilter === "all"
//       ? entries
//       : entries.filter((e) => e.type === typeFilter);

//   const totalCount = displayedEntries.length;
//   const totalPages = Math.max(1, Math.ceil(totalCount / limit));
//   const pageEntries = displayedEntries.slice(
//     (page - 1) * limit,
//     page * limit
//   );

//   // ===================== FILTER HANDLERS =====================
//   const handleApplyFilters = () => {
//     if (fromDate && toDate && fromDate > toDate) {
//       toast.error("From date cannot be after To date");
//       return;
//     }
//     setAppliedFrom(fromDate);
//     setAppliedTo(toDate);
//     setPage(1);
//   };

//   const handleClearFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setAppliedFrom("");
//     setAppliedTo("");
//     setTypeFilter("all");
//     setPage(1);
//   };

//   const applyQuickRange = (type: "today" | "week" | "month" | "all") => {
//     const t = todayStr();
//     if (type === "today") {
//       setFromDate(t);
//       setToDate(t);
//       setAppliedFrom(t);
//       setAppliedTo(t);
//     } else if (type === "week") {
//       const d = new Date();
//       d.setDate(d.getDate() - 6);
//       const f = d.toISOString().split("T")[0];
//       setFromDate(f);
//       setToDate(t);
//       setAppliedFrom(f);
//       setAppliedTo(t);
//     } else if (type === "month") {
//       const f = firstOfMonthStr();
//       setFromDate(f);
//       setToDate(t);
//       setAppliedFrom(f);
//       setAppliedTo(t);
//     } else {
//       setFromDate("");
//       setToDate("");
//       setAppliedFrom("");
//       setAppliedTo("");
//     }
//     setPage(1);
//   };

//   const hasFilter = !!(appliedFrom || appliedTo || typeFilter !== "all");

//   const balanceColor = summary.balance >= 0 ? "#34d399" : "#f43f5e";
//   const balanceLabel = summary.balance >= 0 ? "You'll receive" : "You'll pay";

//   // ===================== 🔥 EXCEL DOWNLOAD =====================
//   const handleDownloadExcel = () => {
//     try {
//       setDownloading(true);

//       // Agar koi data nahi hai
//       if (displayedEntries.length === 0) {
//         toast.error("No data to download");
//         setDownloading(false);
//         return;
//       }



//       // 🔥 1. Header info (optional top rows)
//       // (chaahe toh skip karo — maine simple rakha hai)

//       // 🔥 2. Column headers + data
//       const dataRows = displayedEntries.map((row, idx) => {
//         const isCredit = row.type === "credit";
//         return {
//           "#": idx + 1,
//           Date: formatDate(row.date),
//           Description: row.description || "-",
//           Type: isCredit ? "SELL" : "PAID",
//           "Amount (₹)": isCredit ? row.amount : -row.amount,
//           "Balance (₹)": row.runningBalance,
//         };
//       });

//       // 🔥 3. Build sheet data with summary block
//       const sheetData: any[] = [];

//       // Customer header
//       sheetData.push([`Customer: ${customer?.customerName || "N/A"}`]);
//       if (customer?.phone) {
//         sheetData.push([`Phone: ${customer.phone}`]);
//       }

//       // Filter info
//       if (appliedFrom || appliedTo) {
//         sheetData.push([
//           `Filter: ${appliedFrom || "start"} to ${appliedTo || "end"}`,
//         ]);
//       }
//       if (typeFilter !== "all") {
//         sheetData.push([
//           `Type Filter: ${typeFilter === "credit" ? "SELL" : "PAID"}`,
//         ]);
//       }

//       sheetData.push([`Generated: ${new Date().toLocaleString("en-IN")}`]);
//       sheetData.push([]); // blank row

//       // Summary
//       sheetData.push(["SUMMARY"]);
//       sheetData.push(["Total Sell", summary.totalSell]);
//       sheetData.push(["Total Paid", summary.totalPaid]);
//       sheetData.push(["Balance", summary.balance]);
//       sheetData.push([]); // blank row

//       // Table headers
//       sheetData.push([
//         "#",
//         "Date",
//         "Description",
//         "Type",
//         "Amount (₹)",
//         "Balance (₹)",
//       ]);

//       // Table data
//       dataRows.forEach((r) => {
//         sheetData.push([
//           r["#"],
//           r["Date"],
//           r["Description"],
//           r["Type"],
//           r["Amount (₹)"],
//           r["Balance (₹)"],
//         ]);
//       });

//       // 🔥 Create worksheet
//       const ws = XLSX.utils.aoa_to_sheet(sheetData);

//       // 🔥 Column widths (chaahe toh adjust karo)
//       ws["!cols"] = [
//         { wch: 6 },   // #
//         { wch: 14 },  // Date
//         { wch: 40 },  // Description
//         { wch: 10 },  // Type
//         { wch: 16 },  // Amount
//         { wch: 16 },  // Balance
//       ];

//       // 🔥 Create workbook
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Ledger");

//       // 🔥 File name
//       const safeName = (customer?.customerName || "Customer")
//         .replace(/[^a-zA-Z0-9]/g, "_")
//         .slice(0, 40);
//       const dateStr = new Date().toISOString().split("T")[0];
//       const fileName = `Ledger_${safeName}_${dateStr}.xlsx`;

//       // 🔥 Trigger download
//       XLSX.writeFile(wb, fileName);

//       toast.success("Excel downloaded successfully! 🎉");
//     } catch (err: any) {
//       console.error("Download Excel error:", err);
//       toast.error("Failed to download Excel");
//     } finally {
//       setDownloading(false);
//     }
//   };

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
//           maxWidth: 1400,
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
//                 onClick={() => navigate("/customer-ledger")}
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
//                     borderColor: "#38bdf8",
//                     color: "#38bdf8",
//                     bgcolor: "rgba(56, 189, 248, 0.08)",
//                   },
//                 }}
//               >
//                 Back
//               </Button>

//               <Box display="flex" alignItems="center" gap={1.5}>
//                 <Box
//                   sx={{
//                     width: 40,
//                     height: 40,
//                     borderRadius: "10px",
//                     bgcolor: "#0c2a3a",
//                     color: "#38bdf8",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Person />
//                 </Box>
//                 <Box>
//                   <Box display="flex" alignItems="center" gap={1} mb={0.2}>
//                     <Typography
//                       sx={{
//                         color: "#38bdf8",
//                         letterSpacing: 0.5,
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                       }}
//                     >
//                       Ledger Detail
//                     </Typography>
//                     {customer?.phone && (
//                       <Chip
//                         icon={<PhoneIcon sx={{ fontSize: 12 }} />}
//                         label={customer.phone}
//                         size="small"
//                         sx={{
//                           bgcolor: "rgba(56, 189, 248, 0.1)",
//                           color: "#38bdf8",
//                           border: "1px solid rgba(56, 189, 248, 0.3)",
//                           fontWeight: 600,
//                           fontSize: "0.65rem",
//                           height: "20px",
//                         }}
//                       />
//                     )}
//                   </Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="800"
//                     sx={{
//                       fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
//                     }}
//                   >
//                     {customer?.customerName || "Customer"} — History
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Box display="flex" gap={1.2} alignItems="center" flexWrap="wrap">
//               {/* 🔥 DOWNLOAD EXCEL BUTTON */}
//               <Button
//                 variant="contained"
//                 startIcon={
//                   downloading ? (
//                     <CircularProgress size={16} sx={{ color: "#0d1527" }} />
//                   ) : (
//                     <FileDownloadIcon />
//                   )
//                 }
//                 onClick={handleDownloadExcel}
//                 disabled={downloading || displayedEntries.length === 0}
//                 sx={{
//                   bgcolor: "#10b981",
//                   color: "#ffffff",
//                   fontWeight: 800,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   fontSize: "0.8rem",
//                   boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
//                   "&:hover": {
//                     bgcolor: "#059669",
//                     boxShadow: "0 8px 20px rgba(16, 185, 129, 0.5)",
//                   },
//                   "&.Mui-disabled": {
//                     bgcolor: "rgba(16, 185, 129, 0.3)",
//                     color: "rgba(255, 255, 255, 0.5)",
//                   },
//                 }}
//               >
//                 {downloading ? "Downloading..." : "Download Excel"}
//               </Button>

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
//                     borderColor: "#38bdf8",
//                     color: "#38bdf8",
//                     bgcolor: "rgba(56, 189, 248, 0.08)",
//                   },
//                 }}
//               >
//                 Refresh
//               </Button>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* SUMMARY CARDS */}
//         <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
//           <Grid size={{ xs: 12, sm: 4 }}>
//             <MetricCard accentcolor="#38bdf8">
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={0.5}
//               >
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.7rem",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   Total Sell
//                 </Typography>
//                 <ShoppingCart sx={{ color: "#38bdf8", fontSize: 20 }} />
//               </Box>
//               <Typography
//                 sx={{ color: "#38bdf8", fontWeight: 800, fontSize: "1.3rem" }}
//               >
//                 {formatCurrency(summary.totalSell)}
//               </Typography>
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
//               >
//                 Credit / Udhaar
//               </Typography>
//             </MetricCard>
//           </Grid>

//           <Grid size={{ xs: 12, sm: 4 }}>
//             <MetricCard accentcolor="#f43f5e">
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={0.5}
//               >
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.7rem",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   Total Paid
//                 </Typography>
//                 <Payments sx={{ color: "#f43f5e", fontSize: 20 }} />
//               </Box>
//               <Typography
//                 sx={{ color: "#f43f5e", fontWeight: 800, fontSize: "1.3rem" }}
//               >
//                 {formatCurrency(summary.totalPaid)}
//               </Typography>
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
//               >
//                 Received
//               </Typography>
//             </MetricCard>
//           </Grid>

//           <Grid size={{ xs: 12, sm: 4 }}>
//             <MetricCard accentcolor={balanceColor}>
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={0.5}
//               >
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.7rem",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   Balance
//                 </Typography>
//                 <AccountBalanceWallet
//                   sx={{ color: balanceColor, fontSize: 20 }}
//                 />
//               </Box>
//               <Typography
//                 sx={{
//                   color: balanceColor,
//                   fontWeight: 800,
//                   fontSize: "1.3rem",
//                 }}
//               >
//                 {summary.balance < 0 ? "− " : ""}
//                 {formatCurrency(summary.balance)}
//               </Typography>
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
//               >
//                 {balanceLabel}
//               </Typography>
//             </MetricCard>
//           </Grid>
//         </Grid>

//         {/* FILTER BAR */}
//         <FilterBar>
//           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.2}>
//             <Box display="flex" alignItems="center" gap={0.8}>
//               <FilterIcon sx={{ color: "#38bdf8", fontSize: 18 }} />
//               <Typography
//                 sx={{
//                   color: "#38bdf8",
//                   fontWeight: 800,
//                   fontSize: "0.72rem",
//                   letterSpacing: 1,
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Filters
//               </Typography>
//             </Box>

//             <Box sx={{ width: 150 }}>
//               <StyledDateInput
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//               />
//             </Box>
//             <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
//               to
//             </Typography>
//             <Box sx={{ width: 150 }}>
//               <StyledDateInput
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//               />
//             </Box>

//             <Box display="flex" gap={0.6}>
//               {[
//                 { k: "all", label: "All", color: "#9ca3af" },
//                 { k: "credit", label: "Sell", color: "#38bdf8" },
//                 { k: "debit", label: "Paid", color: "#f43f5e" },
//               ].map((t) => (
//                 <Chip
//                   key={t.k}
//                   label={t.label}
//                   size="small"
//                   onClick={() => {
//                     setTypeFilter(t.k as any);
//                     setPage(1);
//                   }}
//                   sx={{
//                     bgcolor:
//                       typeFilter === t.k
//                         ? `${t.color}22`
//                         : "rgba(255, 255, 255, 0.05)",
//                     color: typeFilter === t.k ? t.color : "#9ca3af",
//                     border:
//                       typeFilter === t.k
//                         ? `1px solid ${t.color}66`
//                         : "1px solid rgba(255, 255, 255, 0.1)",
//                     fontWeight: 700,
//                     fontSize: "0.7rem",
//                     height: "32px",
//                     cursor: "pointer",
//                     "&:hover": { bgcolor: `${t.color}22`, color: t.color },
//                   }}
//                 />
//               ))}
//             </Box>

//             <Button
//               size="small"
//               variant="contained"
//               onClick={handleApplyFilters}
//               sx={{
//                 bgcolor: "#38bdf8",
//                 color: "#0d1527",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "8px",
//                 px: 2,
//                 height: "36px",
//                 fontSize: "0.75rem",
//                 "&:hover": { bgcolor: "#0ea5e9" },
//               }}
//             >
//               Apply
//             </Button>

//             <Button
//               size="small"
//               variant="outlined"
//               startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
//               onClick={handleClearFilters}
//               disabled={!hasFilter && !fromDate && !toDate}
//               sx={{
//                 color: "#9ca3af",
//                 borderColor: "rgba(255, 255, 255, 0.15)",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "8px",
//                 px: 1.5,
//                 height: "36px",
//                 fontSize: "0.75rem",
//                 "&:hover": {
//                   borderColor: "#f43f5e",
//                   color: "#f43f5e",
//                   bgcolor: "rgba(244, 63, 94, 0.08)",
//                 },
//               }}
//             >
//               Clear
//             </Button>

//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 0.7,
//                 ml: { md: "auto" },
//                 flexWrap: "wrap",
//               }}
//             >
//               {[
//                 { k: "today", label: "Today" },
//                 { k: "week", label: "7d" },
//                 { k: "month", label: "Month" },
//                 { k: "all", label: "All" },
//               ].map((q) => (
//                 <Chip
//                   key={q.k}
//                   label={q.label}
//                   size="small"
//                   onClick={() =>
//                     applyQuickRange(q.k as "today" | "week" | "month" | "all")
//                   }
//                   sx={{
//                     bgcolor: "rgba(255, 255, 255, 0.05)",
//                     color: "#e5e7eb",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                     fontWeight: 600,
//                     fontSize: "0.7rem",
//                     height: "30px",
//                     cursor: "pointer",
//                     "&:hover": {
//                       bgcolor: "rgba(56, 189, 248, 0.15)",
//                       borderColor: "rgba(56, 189, 248, 0.4)",
//                       color: "#38bdf8",
//                     },
//                   }}
//                 />
//               ))}
//             </Box>
//           </Box>
//         </FilterBar>

//         {/* ENTRIES TABLE */}
//         <TableContainerDark>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             px={3}
//             py={1.5}
//             sx={{
//               borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <Typography
//               sx={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: 0.5 }}
//             >
//               TRANSACTION HISTORY
//             </Typography>
//             <Chip
//               label={`${totalCount} Entries`}
//               size="small"
//               sx={{
//                 bgcolor: "rgba(56, 189, 248, 0.1)",
//                 color: "#38bdf8",
//                 border: "1px solid rgba(56, 189, 248, 0.3)",
//                 fontWeight: 700,
//                 fontSize: "0.7rem",
//                 height: "24px",
//               }}
//             />
//           </Box>

//           <TableScrollArea>
//             <ItemsTable>
//               <thead>
//                 <tr>
//                   <th style={{ textAlign: "center", width: "50px" }}>#</th>
//                   <th style={{ textAlign: "center", width: "110px" }}>Date</th>
//                   <th>Description</th>
//                   <th style={{ textAlign: "center", width: "100px" }}>Type</th>
//                   <th style={{ textAlign: "right", width: "140px" }}>Amount</th>
//                   <th style={{ textAlign: "right", width: "150px" }}>
//                     Balance
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       style={{ textAlign: "center", padding: 40 }}
//                     >
//                       <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
//                       >
//                         Loading entries...
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : pageEntries.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       style={{ textAlign: "center", padding: 40 }}
//                     >
//                       <ReceiptLong
//                         style={{
//                           fontSize: 44,
//                           color: "#374151",
//                           marginBottom: 8,
//                         }}
//                       />
//                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
//                         No entries found
//                       </Typography>
//                       <Typography
//                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
//                       >
//                         {hasFilter
//                           ? "Try changing the filters"
//                           : "No transaction history yet"}
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   pageEntries.map((row, idx) => {
//                     const isCredit = row.type === "credit";
//                     const balanceNegative = row.runningBalance < 0;

//                     return (
//                       <tr key={row._id}>
//                         <td style={{ textAlign: "center", color: "#6b7280" }}>
//                           {(page - 1) * limit + idx + 1}
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Typography
//                             sx={{ color: "#9ca3af", fontSize: "0.78rem" }}
//                           >
//                             {formatDate(row.date)}
//                           </Typography>
//                         </td>
//                         <td>
//                           <Typography
//                             sx={{ color: "#e5e7eb", fontSize: "0.85rem" }}
//                           >
//                             {row.description || "-"}
//                           </Typography>
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <TypeBadge type={isCredit ? "credit" : "debit"}>
//                             {isCredit ? (
//                               <AddIcon fontSize="inherit" />
//                             ) : (
//                               <RemoveIcon fontSize="inherit" />
//                             )}
//                             {isCredit ? "Sell" : "Paid"}
//                           </TypeBadge>
//                         </td>
//                         <td
//                           style={{
//                             textAlign: "right",
//                             fontWeight: 800,
//                             fontSize: "0.9rem",
//                             color: isCredit ? "#38bdf8" : "#f43f5e",
//                           }}
//                         >
//                           {isCredit ? "+" : "−"} {formatCurrency(row.amount)}
//                         </td>
//                         <td
//                           style={{
//                             textAlign: "right",
//                             fontWeight: 800,
//                             fontSize: "0.9rem",
//                             color: balanceNegative ? "#f43f5e" : "#34d399",
//                           }}
//                         >
//                           {balanceNegative ? "− " : ""}
//                           {formatCurrency(row.runningBalance)}
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </ItemsTable>
//           </TableScrollArea>

//           {/* Pagination */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 1.5,
//               px: 3,
//               py: 1.5,
//               borderTop: "1px solid rgba(255, 255, 255, 0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={1.2}>
//               <Typography
//                 sx={{ color: "#9ca3af", fontSize: "0.72rem", fontWeight: 600 }}
//               >
//                 Rows:
//               </Typography>
//               {[10, 25, 50, 100].map((n) => (
//                 <Chip
//                   key={n}
//                   label={n}
//                   size="small"
//                   onClick={() => {
//                     setLimit(n);
//                     setPage(1);
//                   }}
//                   sx={{
//                     bgcolor:
//                       limit === n
//                         ? "rgba(56, 189, 248, 0.2)"
//                         : "rgba(255, 255, 255, 0.05)",
//                     color: limit === n ? "#38bdf8" : "#9ca3af",
//                     border:
//                       limit === n
//                         ? "1px solid rgba(56, 189, 248, 0.5)"
//                         : "1px solid rgba(255, 255, 255, 0.1)",
//                     fontWeight: 700,
//                     fontSize: "0.68rem",
//                     height: "24px",
//                     cursor: "pointer",
//                   }}
//                 />
//               ))}
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.72rem", ml: 1 }}
//               >
//                 {totalCount > 0
//                   ? `${(page - 1) * limit + 1}–${Math.min(
//                       page * limit,
//                       totalCount
//                     )} of ${totalCount}`
//                   : "0 records"}
//               </Typography>
//             </Box>

//             <Pagination
//               count={Math.max(1, totalPages)}
//               page={page}
//               onChange={(_, v) => setPage(v)}
//               disabled={loading}
//               shape="rounded"
//               size="small"
//               sx={{
//                 "& .MuiPaginationItem-root": {
//                   color: "#9ca3af",
//                   fontWeight: 700,
//                   fontSize: "0.78rem",
//                   "&:hover": {
//                     bgcolor: "rgba(56, 189, 248, 0.1)",
//                     color: "#38bdf8",
//                   },
//                 },
//                 "& .Mui-selected": {
//                   bgcolor: "rgba(56, 189, 248, 0.2) !important",
//                   color: "#38bdf8 !important",
//                 },
//               }}
//             />
//           </Box>
//         </TableContainerDark>
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
//             bgcolor: "#38bdf8",
//             color: "#0d1527",
//             width: 52,
//             height: 52,
//             boxShadow: "0 8px 24px rgba(56, 189, 248, 0.45)",
//             "&:hover": { bgcolor: "#0ea5e9" },
//           }}
//         >
//           <HomeIcon />
//         </Fab>
//       </Tooltip>
//     </Box>
//   );
// };

// export default CustomerLedgerDetail;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Pagination,
  Tooltip,
  Fab,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  ArrowBack,
  Home as HomeIcon,
  Refresh as RefreshIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
  ShoppingCart,
  Payments,
  AccountBalanceWallet,
  Person,
  Add as AddIcon,
  Remove as RemoveIcon,
  ReceiptLong,
  Phone as PhoneIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material";

// ===================== TYPES =====================
interface LedgerEntry {
  _id: string;
  type: "credit" | "debit";
  description?: string;
  amount: number;
  date: string;
  reference?: string;
  runningBalance: number;
}

interface CustomerInfo {
  _id: string;
  customerName: string;
  phone?: string;
}

interface LedgerSummary {
  totalSell: number;
  totalPaid: number;
  balance: number;
  closingBalance: number;
  totalEntries: number;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

const isDark = (theme: any) => theme.palette.mode === "dark";

// ===================== STYLED =====================

const DarkBanner = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(15, 23, 42, 0.08)",
  padding: "20px 24px",
  marginBottom: "16px",
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
  padding: "14px 20px",
  marginBottom: "16px",
  boxShadow: isDark(theme)
    ? "0 8px 20px rgba(0, 0, 0, 0.4)"
    : "0 4px 14px rgba(15, 23, 42, 0.05)",
  flexShrink: 0,
  transition: "all 0.3s ease",
}));

const StyledDateInput = styled("input")(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: isDark(theme) ? "#090d16" : "#f8fafc",
  color: isDark(theme) ? "#ffffff" : "#0f172a",
  fontSize: "0.8rem",
  fontWeight: 500,
  padding: "9px 12px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.1)"
    : "1px solid rgba(15, 23, 42, 0.1)",
  outline: "none",
  height: "38px",
  width: "100%",
  transition: "all 0.2s ease",
  "&:hover": { borderColor: "rgba(56, 189, 248, 0.4)" },
  "&:focus": { borderColor: "#0ea5e9" },
  "&::-webkit-calendar-picker-indicator": {
    filter: isDark(theme) ? "invert(0.7)" : "none",
    cursor: "pointer",
  },
}));

const MetricCard = styled(Box)<{ accentcolor: string }>(
  ({ accentcolor, theme }) => ({
    backgroundColor: isDark(theme) ? "#111827" : "#ffffff",
    borderRadius: "12px",
    border: isDark(theme)
      ? "1px solid rgba(255, 255, 255, 0.08)"
      : "1px solid rgba(15, 23, 42, 0.08)",
    padding: "14px 18px",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: `0 12px 28px ${accentcolor}22`,
      borderColor: accentcolor,
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "4px",
      height: "100%",
      backgroundColor: accentcolor,
    },
  })
);

const TableContainerDark = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(15, 23, 42, 0.08)",
  boxShadow: isDark(theme)
    ? "0 8px 20px rgba(0, 0, 0, 0.4)"
    : "0 4px 14px rgba(15, 23, 42, 0.05)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  marginBottom: "16px",
  transition: "all 0.3s ease",
}));

const TableScrollArea = styled(Box)(({ theme }) => ({
  overflow: "auto",
  flex: 1,
  minHeight: 0,
  "&::-webkit-scrollbar": { width: "8px", height: "8px" },
  "&::-webkit-scrollbar-track": {
    backgroundColor: isDark(theme) ? "#0d1527" : "#f1f5f9",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(56, 189, 248, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.5)" },
  },
}));

const ItemsTable = styled("table")(({ theme }) => {
  const dark = isDark(theme);
  return {
    width: "100%",
    borderCollapse: "collapse",
    "& thead": {
      backgroundColor: dark ? "#111827" : "#f8fafc",
      position: "sticky",
      top: 0,
      zIndex: 5,
    },
    "& thead th": {
      color: dark ? "#9ca3af" : "#64748b",
      fontWeight: 700,
      fontSize: "0.7rem",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      padding: "14px 12px",
      borderBottom: dark
        ? "1px solid rgba(255, 255, 255, 0.08)"
        : "1px solid rgba(15, 23, 42, 0.08)",
      textAlign: "left",
      whiteSpace: "nowrap",
      backgroundColor: dark ? "#111827" : "#f8fafc",
    },
    "& tbody tr": {
      transition: "all 0.2s ease",
      borderBottom: dark
        ? "1px solid rgba(255, 255, 255, 0.05)"
        : "1px solid rgba(15, 23, 42, 0.05)",
    },
    "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
    "& tbody td": {
      color: dark ? "#e5e7eb" : "#334155",
      fontSize: "0.85rem",
      padding: "12px",
      textAlign: "left",
    },
  };
});

const TypeBadge = styled(Box)<{ type: "credit" | "debit" }>(({ type }) => {
  const isCredit = type === "credit";
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 10px",
    borderRadius: "20px",
    fontWeight: 700,
    fontSize: "0.68rem",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    backgroundColor: isCredit
      ? "rgba(56, 189, 248, 0.15)"
      : "rgba(244, 63, 94, 0.15)",
    color: isCredit ? "#0284c7" : "#e11d48",
    border: isCredit
      ? "1px solid rgba(56, 189, 248, 0.4)"
      : "1px solid rgba(244, 63, 94, 0.4)",
    "& svg": { fontSize: "14px" },
  };
});

// ===================== HELPERS =====================
const todayStr = () => new Date().toISOString().split("T")[0];
const firstOfMonthStr = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1)
    .toISOString()
    .split("T")[0];
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatCurrency = (amount: number) =>
  `₹ ${Math.abs(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// ===================== MAIN COMPONENT =====================
const CustomerLedgerDetail: React.FC = () => {
  const navigate = useNavigate();
  const { customerId } = useParams<{ customerId: string }>();
  const theme = useTheme();
  const dark = isDark(theme);

  // 👇 inline color map
  const c = {
    pageBg: dark ? "#090d16" : "#f1f5f9",
    cardBg: dark ? "#111827" : "#ffffff",
    bannerBg: dark ? "#0d1527" : "#ffffff",
    text: dark ? "#ffffff" : "#0f172a",
    textSec: dark ? "#e5e7eb" : "#334155",
    muted: dark ? "#9ca3af" : "#64748b",
    mutedDark: dark ? "#6b7280" : "#94a3b8",
    veryMuted: dark ? "#374151" : "#cbd5e1",
    border08: dark
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(15, 23, 42, 0.08)",
    border05: dark
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(15, 23, 42, 0.05)",
    border10: dark
      ? "rgba(255, 255, 255, 0.10)"
      : "rgba(15, 23, 42, 0.10)",
    border15: dark
      ? "rgba(255, 255, 255, 0.15)"
      : "rgba(15, 23, 42, 0.15)",
    skyIconBg: dark ? "#0c2a3a" : "#e0f2fe",
    skyText: dark ? "#38bdf8" : "#0284c7",
    chipBgSoft: dark
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(15, 23, 42, 0.04)",
  };

  const [customer, setCustomer] = useState<CustomerInfo | null>(null);
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [summary, setSummary] = useState<LedgerSummary>({
    totalSell: 0,
    totalPaid: 0,
    balance: 0,
    closingBalance: 0,
    totalEntries: 0,
  });
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "credit" | "debit">(
    "all"
  );

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // ===================== FETCH =====================
  const fetchData = async () => {
    if (!customerId) return;
    setLoading(true);

    try {
      const params: any = {};
      if (appliedFrom) params.fromDate = appliedFrom;
      if (appliedTo) params.toDate = appliedTo;

      const res = await axios.get(
        `${API_URL}/customer-ledger/customer/${customerId}`,
        {
          params,
          ...getAuthHeaders(),
        }
      );

      if (res.data?.success || res.data?.status) {
        setCustomer(res.data.customer);

        setSummary({
          totalSell: res.data.summary?.totalSell ?? 0,
          totalPaid: res.data.summary?.totalPaid ?? 0,
          balance: res.data.summary?.balance ?? 0,
          closingBalance: res.data.summary?.closingBalance ?? 0,
          totalEntries: res.data.summary?.totalEntries ?? 0,
        });

        setEntries(res.data.data || []);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load ledger");
        setEntries([]);
      }
    } catch (err: any) {
      if (err.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(err.response?.data?.message || "Failed to load data");
      }
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, appliedFrom, appliedTo]);

  // ===================== TYPE FILTER (local only) =====================
  const displayedEntries =
    typeFilter === "all"
      ? entries
      : entries.filter((e) => e.type === typeFilter);

  const totalCount = displayedEntries.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const pageEntries = displayedEntries.slice(
    (page - 1) * limit,
    page * limit
  );

  // ===================== FILTER HANDLERS =====================
  const handleApplyFilters = () => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
    setTypeFilter("all");
    setPage(1);
  };

  const applyQuickRange = (type: "today" | "week" | "month" | "all") => {
    const t = todayStr();
    if (type === "today") {
      setFromDate(t);
      setToDate(t);
      setAppliedFrom(t);
      setAppliedTo(t);
    } else if (type === "week") {
      const d = new Date();
      d.setDate(d.getDate() - 6);
      const f = d.toISOString().split("T")[0];
      setFromDate(f);
      setToDate(t);
      setAppliedFrom(f);
      setAppliedTo(t);
    } else if (type === "month") {
      const f = firstOfMonthStr();
      setFromDate(f);
      setToDate(t);
      setAppliedFrom(f);
      setAppliedTo(t);
    } else {
      setFromDate("");
      setToDate("");
      setAppliedFrom("");
      setAppliedTo("");
    }
    setPage(1);
  };

  const hasFilter = !!(appliedFrom || appliedTo || typeFilter !== "all");


  const balanceLabel = summary.balance >= 0 ? "You'll receive" : "You'll pay";

  // ===================== EXCEL DOWNLOAD =====================
  const handleDownloadExcel = () => {
    try {
      setDownloading(true);

      if (displayedEntries.length === 0) {
        toast.error("No data to download");
        setDownloading(false);
        return;
      }

      const dataRows = displayedEntries.map((row, idx) => {
        const isCredit = row.type === "credit";
        return {
          "#": idx + 1,
          Date: formatDate(row.date),
          Description: row.description || "-",
          Type: isCredit ? "SELL" : "PAID",
          "Amount (₹)": isCredit ? row.amount : -row.amount,
          "Balance (₹)": row.runningBalance,
        };
      });

      const sheetData: any[] = [];

      sheetData.push([`Customer: ${customer?.customerName || "N/A"}`]);
      if (customer?.phone) {
        sheetData.push([`Phone: ${customer.phone}`]);
      }

      if (appliedFrom || appliedTo) {
        sheetData.push([
          `Filter: ${appliedFrom || "start"} to ${appliedTo || "end"}`,
        ]);
      }
      if (typeFilter !== "all") {
        sheetData.push([
          `Type Filter: ${typeFilter === "credit" ? "SELL" : "PAID"}`,
        ]);
      }

      sheetData.push([`Generated: ${new Date().toLocaleString("en-IN")}`]);
      sheetData.push([]);

      sheetData.push(["SUMMARY"]);
      sheetData.push(["Total Sell", summary.totalSell]);
      sheetData.push(["Total Paid", summary.totalPaid]);
      sheetData.push(["Balance", summary.balance]);
      sheetData.push([]);

      sheetData.push([
        "#",
        "Date",
        "Description",
        "Type",
        "Amount (₹)",
        "Balance (₹)",
      ]);

      dataRows.forEach((r) => {
        sheetData.push([
          r["#"],
          r["Date"],
          r["Description"],
          r["Type"],
          r["Amount (₹)"],
          r["Balance (₹)"],
        ]);
      });

      const ws = XLSX.utils.aoa_to_sheet(sheetData);

      ws["!cols"] = [
        { wch: 6 },
        { wch: 14 },
        { wch: 40 },
        { wch: 10 },
        { wch: 16 },
        { wch: 16 },
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Ledger");

      const safeName = (customer?.customerName || "Customer")
        .replace(/[^a-zA-Z0-9]/g, "_")
        .slice(0, 40);
      const dateStr = new Date().toISOString().split("T")[0];
      const fileName = `Ledger_${safeName}_${dateStr}.xlsx`;

      XLSX.writeFile(wb, fileName);

      toast.success("Excel downloaded successfully! 🎉");
    } catch (err: any) {
      console.error("Download Excel error:", err);
      toast.error("Failed to download Excel");
    } finally {
      setDownloading(false);
    }
  };

  // ===================== RENDER =====================
  return (
    <Box
      sx={{
        height: "85vh",
        maxHeight: "100vh",
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
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/customer-ledger")}
                sx={{
                  color: c.textSec,
                  borderColor: c.border15,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.9,
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#0ea5e9",
                    color: "#0ea5e9",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Back
              </Button>

              <Box display="flex" alignItems="center" gap={1.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: c.skyIconBg,
                    color: c.skyText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Person />
                </Box>
                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={0.2}>
                    <Typography
                      sx={{
                        color: c.skyText,
                        letterSpacing: 0.5,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                      }}
                    >
                      Ledger Detail
                    </Typography>
                    {customer?.phone && (
                      <Chip
                        icon={<PhoneIcon sx={{ fontSize: 12 }} />}
                        label={customer.phone}
                        size="small"
                        sx={{
                          bgcolor: "rgba(56, 189, 248, 0.1)",
                          color: c.skyText,
                          border: "1px solid rgba(56, 189, 248, 0.3)",
                          fontWeight: 600,
                          fontSize: "0.65rem",
                          height: "20px",
                          "& .MuiChip-icon": { color: c.skyText },
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
                      color: c.text,
                    }}
                  >
                    {customer?.customerName || "Customer"} — History
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box display="flex" gap={1.2} alignItems="center" flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={
                  downloading ? (
                    <CircularProgress size={16} sx={{ color: "#ffffff" }} />
                  ) : (
                    <FileDownloadIcon />
                  )
                }
                onClick={handleDownloadExcel}
                disabled={downloading || displayedEntries.length === 0}
                sx={{
                  bgcolor: "#10b981",
                  color: "#ffffff",
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.8rem",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
                  "&:hover": {
                    bgcolor: "#059669",
                    boxShadow: "0 8px 20px rgba(16, 185, 129, 0.5)",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "rgba(16, 185, 129, 0.3)",
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                {downloading ? "Downloading..." : "Download Excel"}
              </Button>

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchData}
                disabled={loading}
                sx={{
                  color: c.textSec,
                  borderColor: c.border15,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.2,
                  py: 1,
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#0ea5e9",
                    color: "#0ea5e9",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* SUMMARY CARDS */}
        <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <MetricCard accentcolor="#38bdf8">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={0.5}
              >
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Total Sell
                </Typography>
                <ShoppingCart sx={{ color: c.skyText, fontSize: 20 }} />
              </Box>
              <Typography
                sx={{
                  color: c.skyText,
                  fontWeight: 800,
                  fontSize: "1.3rem",
                }}
              >
                {formatCurrency(summary.totalSell)}
              </Typography>
              <Typography
                sx={{ color: c.mutedDark, fontSize: "0.68rem", mt: 0.3 }}
              >
                Credit / Udhaar
              </Typography>
            </MetricCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <MetricCard accentcolor="#f43f5e">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={0.5}
              >
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Total Paid
                </Typography>
                <Payments sx={{ color: "#f43f5e", fontSize: 20 }} />
              </Box>
              <Typography
                sx={{
                  color: "#f43f5e",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                }}
              >
                {formatCurrency(summary.totalPaid)}
              </Typography>
              <Typography
                sx={{ color: c.mutedDark, fontSize: "0.68rem", mt: 0.3 }}
              >
                Received
              </Typography>
            </MetricCard>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <MetricCard
              accentcolor={
                summary.balance >= 0
                  ? "#34d399"
                  : "#f43f5e"
              }
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={0.5}
              >
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Balance
                </Typography>
                <AccountBalanceWallet
                  sx={{
                    color:
                      summary.balance >= 0
                        ? dark
                          ? "#34d399"
                          : "#059669"
                        : "#f43f5e",
                    fontSize: 20,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  color:
                    summary.balance >= 0
                      ? dark
                        ? "#34d399"
                        : "#059669"
                      : "#f43f5e",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                }}
              >
                {summary.balance < 0 ? "− " : ""}
                {formatCurrency(summary.balance)}
              </Typography>
              <Typography
                sx={{ color: c.mutedDark, fontSize: "0.68rem", mt: 0.3 }}
              >
                {balanceLabel}
              </Typography>
            </MetricCard>
          </Grid>
        </Grid>

        {/* FILTER BAR */}
        <FilterBar>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.2}>
            <Box display="flex" alignItems="center" gap={0.8}>
              <FilterIcon sx={{ color: c.skyText, fontSize: 18 }} />
              <Typography
                sx={{
                  color: c.skyText,
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Filters
              </Typography>
            </Box>

            <Box sx={{ width: 150 }}>
              <StyledDateInput
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Box>
            <Typography sx={{ color: c.mutedDark, fontSize: "0.8rem" }}>
              to
            </Typography>
            <Box sx={{ width: 150 }}>
              <StyledDateInput
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Box>

            <Box display="flex" gap={0.6}>
              {[
                { k: "all", label: "All", color: "#64748b" },
                { k: "credit", label: "Sell", color: "#0ea5e9" },
                { k: "debit", label: "Paid", color: "#e11d48" },
              ].map((t) => (
                <Chip
                  key={t.k}
                  label={t.label}
                  size="small"
                  onClick={() => {
                    setTypeFilter(t.k as any);
                    setPage(1);
                  }}
                  sx={{
                    bgcolor:
                      typeFilter === t.k
                        ? `${t.color}22`
                        : c.chipBgSoft,
                    color: typeFilter === t.k ? t.color : c.muted,
                    border:
                      typeFilter === t.k
                        ? `1px solid ${t.color}66`
                        : `1px solid ${c.border10}`,
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "32px",
                    cursor: "pointer",
                    "&:hover": { bgcolor: `${t.color}22`, color: t.color },
                  }}
                />
              ))}
            </Box>

            <Button
              size="small"
              variant="contained"
              onClick={handleApplyFilters}
              sx={{
                bgcolor: "#0ea5e9",
                color: "#ffffff",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                height: "36px",
                fontSize: "0.75rem",
                "&:hover": { bgcolor: "#0284c7" },
              }}
            >
              Apply
            </Button>

            <Button
              size="small"
              variant="outlined"
              startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
              onClick={handleClearFilters}
              disabled={!hasFilter && !fromDate && !toDate}
              sx={{
                color: c.muted,
                borderColor: c.border15,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 1.5,
                height: "36px",
                fontSize: "0.75rem",
                "&:hover": {
                  borderColor: "#f43f5e",
                  color: "#f43f5e",
                  bgcolor: "rgba(244, 63, 94, 0.08)",
                },
              }}
            >
              Clear
            </Button>

            <Box
              sx={{
                display: "flex",
                gap: 0.7,
                ml: { md: "auto" },
                flexWrap: "wrap",
              }}
            >
              {[
                { k: "today", label: "Today" },
                { k: "week", label: "7d" },
                { k: "month", label: "Month" },
                { k: "all", label: "All" },
              ].map((q) => (
                <Chip
                  key={q.k}
                  label={q.label}
                  size="small"
                  onClick={() =>
                    applyQuickRange(q.k as "today" | "week" | "month" | "all")
                  }
                  sx={{
                    bgcolor: c.chipBgSoft,
                    color: c.textSec,
                    border: `1px solid ${c.border10}`,
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    height: "30px",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "rgba(56, 189, 248, 0.15)",
                      borderColor: "rgba(56, 189, 248, 0.4)",
                      color: c.skyText,
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </FilterBar>

        {/* ENTRIES TABLE */}
        <TableContainerDark>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={1.5}
            sx={{
              borderBottom: `1px solid ${c.border08}`,
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: 0.5,
                color: c.text,
              }}
            >
              TRANSACTION HISTORY
            </Typography>
            <Chip
              label={`${totalCount} Entries`}
              size="small"
              sx={{
                bgcolor: "rgba(56, 189, 248, 0.1)",
                color: c.skyText,
                border: "1px solid rgba(56, 189, 248, 0.3)",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: "24px",
              }}
            />
          </Box>

          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th style={{ textAlign: "center", width: "110px" }}>Date</th>
                  <th>Description</th>
                  <th style={{ textAlign: "center", width: "100px" }}>Type</th>
                  <th style={{ textAlign: "right", width: "140px" }}>Amount</th>
                  <th style={{ textAlign: "right", width: "150px" }}>
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: 40 }}
                    >
                      <CircularProgress sx={{ color: "#0ea5e9" }} size={32} />
                      <Typography
                        sx={{ color: c.muted, fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading entries...
                      </Typography>
                    </td>
                  </tr>
                ) : pageEntries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: 40 }}
                    >
                      <ReceiptLong
                        style={{
                          fontSize: 44,
                          color: c.veryMuted,
                          marginBottom: 8,
                        }}
                      />
                      <Typography sx={{ color: c.muted, fontSize: "0.9rem" }}>
                        No entries found
                      </Typography>
                      <Typography
                        sx={{
                          color: c.mutedDark,
                          fontSize: "0.75rem",
                          mt: 0.5,
                        }}
                      >
                        {hasFilter
                          ? "Try changing the filters"
                          : "No transaction history yet"}
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  pageEntries.map((row, idx) => {
                    const isCredit = row.type === "credit";
                    const balanceNegative = row.runningBalance < 0;

                    return (
                      <tr key={row._id}>
                        <td style={{ textAlign: "center", color: c.mutedDark }}>
                          {(page - 1) * limit + idx + 1}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography
                            sx={{ color: c.muted, fontSize: "0.78rem" }}
                          >
                            {formatDate(row.date)}
                          </Typography>
                        </td>
                        <td>
                          <Typography
                            sx={{ color: c.textSec, fontSize: "0.85rem" }}
                          >
                            {row.description || "-"}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <TypeBadge type={isCredit ? "credit" : "debit"}>
                            {isCredit ? (
                              <AddIcon fontSize="inherit" />
                            ) : (
                              <RemoveIcon fontSize="inherit" />
                            )}
                            {isCredit ? "Sell" : "Paid"}
                          </TypeBadge>
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                            color: isCredit
                              ? dark
                                ? "#38bdf8"
                                : "#0284c7"
                              : "#e11d48",
                          }}
                        >
                          {isCredit ? "+" : "−"} {formatCurrency(row.amount)}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                            color: balanceNegative
                              ? "#e11d48"
                              : dark
                              ? "#34d399"
                              : "#059669",
                          }}
                        >
                          {balanceNegative ? "− " : ""}
                          {formatCurrency(row.runningBalance)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </ItemsTable>
          </TableScrollArea>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              px: 3,
              py: 1.5,
              borderTop: `1px solid ${c.border08}`,
              flexShrink: 0,
            }}
          >
            <Box display="flex" alignItems="center" gap={1.2}>
              <Typography
                sx={{ color: c.muted, fontSize: "0.72rem", fontWeight: 600 }}
              >
                Rows:
              </Typography>
              {[10, 25, 50, 100].map((n) => (
                <Chip
                  key={n}
                  label={n}
                  size="small"
                  onClick={() => {
                    setLimit(n);
                    setPage(1);
                  }}
                  sx={{
                    bgcolor:
                      limit === n
                        ? "rgba(56, 189, 248, 0.2)"
                        : c.chipBgSoft,
                    color: limit === n ? c.skyText : c.muted,
                    border:
                      limit === n
                        ? "1px solid rgba(56, 189, 248, 0.5)"
                        : `1px solid ${c.border10}`,
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    height: "24px",
                    cursor: "pointer",
                  }}
                />
              ))}
              <Typography
                sx={{ color: c.mutedDark, fontSize: "0.72rem", ml: 1 }}
              >
                {totalCount > 0
                  ? `${(page - 1) * limit + 1}–${Math.min(
                      page * limit,
                      totalCount
                    )} of ${totalCount}`
                  : "0 records"}
              </Typography>
            </Box>

            <Pagination
              count={Math.max(1, totalPages)}
              page={page}
              onChange={(_, v) => setPage(v)}
              disabled={loading}
              shape="rounded"
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: c.muted,
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  "&:hover": {
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    color: c.skyText,
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(56, 189, 248, 0.2) !important",
                  color: `${c.skyText} !important`,
                },
              }}
            />
          </Box>
        </TableContainerDark>
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
            bgcolor: "#38bdf8",
            color: "#ffffff",
            width: 52,
            height: 52,
            boxShadow: "0 8px 24px rgba(56, 189, 248, 0.45)",
            "&:hover": { bgcolor: "#0ea5e9" },
          }}
        >
          <HomeIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default CustomerLedgerDetail;