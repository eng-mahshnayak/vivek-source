


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// // import {
// //   Box,
// //   Grid,
// //   Typography,
// //   Chip,
// //   Button,
// //   IconButton,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   CircularProgress,
// //   Pagination,
// //   Tooltip,
// //   Fab,
// // } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// // import {
// //   Add,
// //   Refresh,
// //   Delete,
// //   Edit,
// //   Visibility,
// //   FiberManualRecord,
// //   Payments,
// //   AccountBalanceWallet,
// //   TrendingUp,
// //   Receipt,
// //   ArrowBack,
// //   Home as HomeIcon,
// //   Close as CloseIcon,
// //   FilterAlt as FilterIcon,
// //   Clear as ClearIcon,
// // } from "@mui/icons-material";

// // interface OnlinePayment {
// //   amount: number;
// //   note?: string;
// // }

// // interface CashEntry {
// //   _id: string;
// //   openingCash: {
// //     note500: number;
// //     note200: number;
// //     note100: number;
// //     note50: number;
// //     note20: number;
// //     note10: number;
// //     coins: number;
// //   };
// //   onlinePayments?: OnlinePayment[];
// //   totalOnline?: number;
// //   online?: number;
// //   totalSales: number;
// //   date: string;
// //   createdAt: string;
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

// // const StyledTextField = styled("input")(() => ({
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
// //   "&:hover": { borderColor: "rgba(16, 185, 129, 0.4)" },
// //   "&:focus": { borderColor: "#10b981" },
// //   "&::-webkit-calendar-picker-indicator": {
// //     filter: "invert(0.7)",
// //     cursor: "pointer",
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
// //     backgroundColor: "rgba(16, 185, 129, 0.3)",
// //     borderRadius: "8px",
// //     "&:hover": { backgroundColor: "rgba(16, 185, 129, 0.5)" },
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
// //   "& tbody tr:hover": { backgroundColor: "rgba(16, 185, 129, 0.05)" },
// //   "& tbody td": {
// //     color: "#e5e7eb",
// //     fontSize: "0.85rem",
// //     padding: "12px",
// //     textAlign: "left",
// //   },
// // }));

// // const MetricCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
// //   backgroundColor: "#111827",
// //   borderRadius: "10px",
// //   border: "1px solid rgba(255, 255, 255, 0.08)",
// //   padding: "12px 16px",
// //   height: "100%",
// //   display: "flex",
// //   flexDirection: "column",
// //   justifyContent: "center",
// //   position: "relative",
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

// // const IconBox = styled(Box)(() => ({
// //   width: "32px",
// //   height: "32px",
// //   borderRadius: "8px",
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "center",
// // }));

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

// // // ===================== MAIN =====================

// // const DailyCashSummary: React.FC = () => {
// //   const navigate = useNavigate();

// //   const [data, setData] = useState<CashEntry[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [deleting, setDeleting] = useState(false);

// //   // Pagination
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(10);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [totalCount, setTotalCount] = useState(0);

// //   // Date filter
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [appliedFrom, setAppliedFrom] = useState("");
// //   const [appliedTo, setAppliedTo] = useState("");

// //   // Summary
// //   const [totals, setTotals] = useState({
// //     totalCash: 0,
// //     totalOnline: 0,
// //     grandTotal: 0,
// //     totalEntries: 0,
// //   });

// //   // Delete
// //   const [deleteId, setDeleteId] = useState<string | null>(null);
// //   const [deleteAllOpen, setDeleteAllOpen] = useState(false);

// //   // View modal
// //   const [viewOpen, setViewOpen] = useState(false);
// //   const [viewEntry, setViewEntry] = useState<CashEntry | null>(null);

// //   // ===================== FETCH =====================
// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);

// //       const params: any = { page, limit };
// //       if (appliedFrom) params.from = appliedFrom;
// //       if (appliedTo) params.to = appliedTo;

// //       const res = await axios.get(`${API_URL}/dailycash`, {
// //         params,
// //         ...getAuthHeaders(),
// //       });

// //       if (res.data?.success === true) {
// //         setData(res.data.data || []);
// //         const count =
// //           res.data.totalCount ?? res.data.total ?? 0;
// //         const pages =
// //           res.data.pages ??
// //           Math.max(1, Math.ceil((count || 0) / limit));
// //         setTotalCount(count);
// //         setTotalPages(pages);

// //         if (res.data.totals) {
// //           setTotals({
// //             totalCash: res.data.totals.totalCash || 0,
// //             totalOnline: res.data.totals.totalOnline || 0,
// //             grandTotal: res.data.totals.grandTotal || 0,
// //             totalEntries: res.data.totals.totalEntries || 0,
// //           });
// //         }
// //       } else if (res.data?.message === "Unauthorized") {
// //         toast.error("Session expired! Please login again");
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(res.data?.message || "Failed to load entries");
// //         setData([]);
// //       }
// //     } catch (error: any) {
// //       if (error.response?.data?.message === "Unauthorized") {
// //         localStorage.removeItem("erptoken");
// //         navigate("/login");
// //       } else {
// //         toast.error(error.response?.data?.message || "Failed to load entries");
// //       }
// //       setData([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [page, limit, appliedFrom, appliedTo]);

// //   // ===================== FILTER =====================
// //   const handleApply = () => {
// //     if (fromDate && toDate && fromDate > toDate) {
// //       toast.error("From date cannot be after To date");
// //       return;
// //     }
// //     setAppliedFrom(fromDate);
// //     setAppliedTo(toDate);
// //     setPage(1);
// //   };

// //   const handleClear = () => {
// //     setFromDate("");
// //     setToDate("");
// //     setAppliedFrom("");
// //     setAppliedTo("");
// //     setPage(1);
// //   };

// //   const applyQuick = (type: "today" | "week" | "month" | "all") => {
// //     const t = todayStr();
// //     if (type === "today") {
// //       setFromDate(t); setToDate(t); setAppliedFrom(t); setAppliedTo(t);
// //     } else if (type === "week") {
// //       const d = new Date(); d.setDate(d.getDate() - 6);
// //       const f = d.toISOString().split("T")[0];
// //       setFromDate(f); setToDate(t); setAppliedFrom(f); setAppliedTo(t);
// //     } else if (type === "month") {
// //       const f = firstOfMonthStr();
// //       setFromDate(f); setToDate(t); setAppliedFrom(f); setAppliedTo(t);
// //     } else {
// //       setFromDate(""); setToDate(""); setAppliedFrom(""); setAppliedTo("");
// //     }
// //     setPage(1);
// //   };

// //   const hasFilter = !!(appliedFrom || appliedTo);

// //   // ===================== DELETE =====================
// //   const handleDelete = async () => {
// //     if (!deleteId) return;
// //     try {
// //       setDeleting(true);
// //       const res = await axios.delete(
// //         `${API_URL}/dailycash/${deleteId}`,
// //         getAuthHeaders()
// //       );
// //       if (res.data?.success) {
// //         toast.success("Entry deleted");
// //         setDeleteId(null);
// //         if (data.length === 1 && page > 1) setPage((p) => p - 1);
// //         else fetchData();
// //       } else {
// //         toast.error(res.data?.message || "Failed to delete");
// //       }
// //     } catch (e: any) {
// //       toast.error(e.response?.data?.message || "Delete failed");
// //     } finally {
// //       setDeleting(false);
// //     }
// //   };

// //   const handleDeleteAll = async () => {
// //     try {
// //       setDeleting(true);
// //       for (const entry of data) {
// //         await axios.delete(`${API_URL}/dailycash/${entry._id}`, getAuthHeaders());
// //       }
// //       toast.success("All entries deleted");
// //       setDeleteAllOpen(false);
// //       setPage(1);
// //       fetchData();
// //     } catch (e: any) {
// //       toast.error(e.response?.data?.message || "Delete all failed");
// //     } finally {
// //       setDeleting(false);
// //     }
// //   };

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
// //         {/* ================= HEADER ================= */}
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
// //                 onClick={() => navigate("/dashboard")}
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
// //                     borderColor: "#10b981",
// //                     color: "#10b981",
// //                     bgcolor: "rgba(16, 185, 129, 0.08)",
// //                   },
// //                 }}
// //               >
// //                 Dashboard
// //               </Button>

// //               <Box>
// //                 <Box display="flex" alignItems="center" gap={1} mb={0.3}>
// //                   <FiberManualRecord sx={{ fontSize: 10, color: "#10b981" }} />
// //                   <Typography
// //                     sx={{
// //                       color: "#10b981",
// //                       letterSpacing: 0.5,
// //                       fontSize: "0.7rem",
// //                       fontWeight: 700,
// //                     }}
// //                   >
// //                     Cash Management
// //                   </Typography>
// //                 </Box>
// //                 <Typography
// //                   variant="h5"
// //                   fontWeight="800"
// //                   sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" } }}
// //                 >
// //                   5. NOTE SUMMARY ENTRY
// //                 </Typography>
// //               </Box>
// //             </Box>

// //             <Box display="flex" gap={1.2} flexWrap="wrap" alignItems="center">
// //               <Button
// //                 variant="contained"
// //                 startIcon={<Add />}
// //                 onClick={() => navigate("/note-summary-entry/create")}
// //                 sx={{
// //                   bgcolor: "#10b981",
// //                   color: "#fff",
// //                   fontWeight: 700,
// //                   textTransform: "none",
// //                   borderRadius: "10px",
// //                   px: 2.5,
// //                   py: 1,
// //                   fontSize: "0.8rem",
// //                   boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
// //                   "&:hover": { bgcolor: "#059669" },
// //                 }}
// //               >
// //                 New Entry
// //               </Button>

// //               <Button
// //                 variant="outlined"
// //                 startIcon={<Refresh />}
// //                 onClick={fetchData}
// //                 disabled={loading}
// //                 sx={{
// //                   color: "#e5e7eb",
// //                   borderColor: "rgba(255, 255, 255, 0.15)",
// //                   fontWeight: 700,
// //                   textTransform: "none",
// //                   borderRadius: "10px",
// //                   px: 2.2,
// //                   py: 1,
// //                   fontSize: "0.8rem",
// //                   "&:hover": {
// //                     borderColor: "#38bdf8",
// //                     color: "#38bdf8",
// //                     bgcolor: "rgba(56, 189, 248, 0.08)",
// //                   },
// //                 }}
// //               >
// //                 Refresh
// //               </Button>

// //               <Button
// //                 variant="outlined"
// //                 startIcon={<Delete />}
// //                 onClick={() => setDeleteAllOpen(true)}
// //                 disabled={totalCount === 0}
// //                 sx={{
// //                   color: "#f43f5e",
// //                   borderColor: "rgba(244, 63, 94, 0.3)",
// //                   fontWeight: 700,
// //                   textTransform: "none",
// //                   borderRadius: "10px",
// //                   px: 2.2,
// //                   py: 1,
// //                   fontSize: "0.8rem",
// //                   "&:hover": {
// //                     borderColor: "#f43f5e",
// //                     bgcolor: "rgba(244, 63, 94, 0.08)",
// //                   },
// //                   "&.Mui-disabled": {
// //                     color: "rgba(244, 63, 94, 0.4)",
// //                     borderColor: "rgba(244, 63, 94, 0.15)",
// //                   },
// //                 }}
// //               >
// //                 Delete All
// //               </Button>
// //             </Box>
// //           </Box>
// //         </DarkBanner>

// //         {/* ================= FILTER BAR ================= */}
// //         <FilterBar>
// //           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.2}>
// //             <Box display="flex" alignItems="center" gap={0.8}>
// //               <FilterIcon sx={{ color: "#10b981", fontSize: 18 }} />
// //               <Typography
// //                 sx={{
// //                   color: "#10b981",
// //                   fontWeight: 800,
// //                   fontSize: "0.72rem",
// //                   letterSpacing: 1,
// //                   textTransform: "uppercase",
// //                 }}
// //               >
// //                 Date Filter
// //               </Typography>
// //             </Box>

// //             <Box sx={{ width: 150 }}>
// //               <StyledTextField
// //                 type="date"
// //                 value={fromDate}
// //                 onChange={(e) => setFromDate(e.target.value)}
// //               />
// //             </Box>
// //             <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
// //               to
// //             </Typography>
// //             <Box sx={{ width: 150 }}>
// //               <StyledTextField
// //                 type="date"
// //                 value={toDate}
// //                 onChange={(e) => setToDate(e.target.value)}
// //               />
// //             </Box>

// //             <Button
// //               size="small"
// //               variant="contained"
// //               onClick={handleApply}
// //               sx={{
// //                 bgcolor: "#10b981",
// //                 color: "#fff",
// //                 fontWeight: 700,
// //                 textTransform: "none",
// //                 borderRadius: "8px",
// //                 px: 2,
// //                 fontSize: "0.75rem",
// //                 "&:hover": { bgcolor: "#059669" },
// //               }}
// //             >
// //               Apply
// //             </Button>

// //             <Button
// //               size="small"
// //               variant="outlined"
// //               startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
// //               onClick={handleClear}
// //               disabled={!hasFilter && !fromDate && !toDate}
// //               sx={{
// //                 color: "#9ca3af",
// //                 borderColor: "rgba(255, 255, 255, 0.15)",
// //                 fontWeight: 700,
// //                 textTransform: "none",
// //                 borderRadius: "8px",
// //                 px: 1.5,
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

// //             <Box sx={{ display: "flex", gap: 0.7, ml: { md: "auto" } }}>
// //               {[
// //                 { k: "today", label: "Today" },
// //                 { k: "week", label: "Last 7d" },
// //                 { k: "month", label: "This Month" },
// //                 { k: "all", label: "All" },
// //               ].map((q) => (
// //                 <Chip
// //                   key={q.k}
// //                   label={q.label}
// //                   size="small"
// //                   onClick={() =>
// //                     applyQuick(q.k as "today" | "week" | "month" | "all")
// //                   }
// //                   sx={{
// //                     bgcolor: "rgba(255, 255, 255, 0.05)",
// //                     color: "#e5e7eb",
// //                     border: "1px solid rgba(255, 255, 255, 0.1)",
// //                     fontWeight: 600,
// //                     fontSize: "0.7rem",
// //                     height: "26px",
// //                     cursor: "pointer",
// //                     "&:hover": {
// //                       bgcolor: "rgba(16, 185, 129, 0.15)",
// //                       borderColor: "rgba(16, 185, 129, 0.4)",
// //                       color: "#10b981",
// //                     },
// //                   }}
// //                 />
// //               ))}
// //             </Box>
// //           </Box>
// //         </FilterBar>

// //         {/* ================= SUMMARY METRICS ================= */}
// //         <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
// //           {[
// //             {
// //               label: "Total Entries",
// //               amount: totals.totalEntries.toString(),
// //               color: "#c084fc",
// //               icon: <Receipt />,
// //               bg: "#2e1065",
// //             },
// //             {
// //               label: "Total Cash",
// //               amount: `₹ ${totals.totalCash.toLocaleString("en-IN")}`,
// //               color: "#34d399",
// //               icon: <Payments />,
// //               bg: "#132e29",
// //             },
// //             {
// //               label: "Total Online",
// //               amount: `₹ ${totals.totalOnline.toLocaleString("en-IN")}`,
// //               color: "#38bdf8",
// //               icon: <TrendingUp />,
// //               bg: "#0c2a3a",
// //             },
// //             {
// //               label: "Grand Total",
// //               amount: `₹ ${totals.grandTotal.toLocaleString("en-IN")}`,
// //               color: "#fbbf24",
// //               icon: <AccountBalanceWallet />,
// //               bg: "#332208",
// //             },
// //           ].map((m, i) => (
// //             <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
// //               <MetricCard accentcolor={m.color}>
// //                 <Box
// //                   display="flex"
// //                   justifyContent="space-between"
// //                   alignItems="center"
// //                   mb={0.5}
// //                 >
// //                   <Typography
// //                     sx={{
// //                       color: "#9ca3af",
// //                       fontSize: "0.7rem",
// //                       fontWeight: 600,
// //                     }}
// //                   >
// //                     {m.label}
// //                   </Typography>
// //                   <IconBox
// //                     sx={{ bgcolor: m.bg, color: m.color, width: 26, height: 26 }}
// //                   >
// //                     {React.cloneElement(m.icon, { sx: { fontSize: 16 } })}
// //                   </IconBox>
// //                 </Box>
// //                 <Typography
// //                   sx={{
// //                     color: m.color,
// //                     fontWeight: 800,
// //                     fontSize: { xs: "1rem", sm: "1.15rem" },
// //                   }}
// //                 >
// //                   {m.amount}
// //                 </Typography>
// //               </MetricCard>
// //             </Grid>
// //           ))}
// //         </Grid>

// //         {/* ================= TABLE ================= */}
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
// //               DAILY CASH ENTRIES
// //             </Typography>
// //             <Chip
// //               label={`${totalCount} Entries`}
// //               size="small"
// //               sx={{
// //                 bgcolor: "rgba(16, 185, 129, 0.1)",
// //                 color: "#10b981",
// //                 border: "1px solid rgba(16, 185, 129, 0.3)",
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
// //                   <th style={{ textAlign: "center" }}>Date</th>
// //                   <th style={{ textAlign: "center" }}>₹500</th>
// //                   <th style={{ textAlign: "center" }}>₹200</th>
// //                   <th style={{ textAlign: "center" }}>₹100</th>
// //                   <th style={{ textAlign: "center" }}>₹50</th>
// //                   <th style={{ textAlign: "center" }}>₹20</th>
// //                   <th style={{ textAlign: "center" }}>₹10</th>
// //                   <th style={{ textAlign: "center" }}>Coins</th>
// //                   <th style={{ textAlign: "center" }}>Online</th>
// //                   <th style={{ textAlign: "center" }}>Total</th>
// //                   <th style={{ textAlign: "center", width: "140px" }}>
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {loading ? (
// //                   <tr>
// //                     <td colSpan={12} style={{ textAlign: "center", padding: 40 }}>
// //                       <CircularProgress sx={{ color: "#10b981" }} size={30} />
// //                     </td>
// //                   </tr>
// //                 ) : data.length === 0 ? (
// //                   <tr>
// //                     <td colSpan={12} style={{ textAlign: "center", padding: 40 }}>
// //                       <Receipt
// //                         style={{ fontSize: 40, color: "#374151", marginBottom: 8 }}
// //                       />
// //                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
// //                         No entries found
// //                       </Typography>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   data.map((row, idx) => {
// //                     const onlineCount =
// //                       row.onlinePayments?.length ||
// //                       (row.totalOnline || row.online ? 1 : 0);
// //                     const onlineTotal = row.totalOnline ?? row.online ?? 0;
// //                     const cashFields = [
// //                       row.openingCash?.note500,
// //                       row.openingCash?.note200,
// //                       row.openingCash?.note100,
// //                       row.openingCash?.note50,
// //                       row.openingCash?.note20,
// //                       row.openingCash?.note10,
// //                     ];

// //                     return (
// //                       <tr key={row._id}>
// //                         <td style={{ textAlign: "center", color: "#6b7280" }}>
// //                           {(page - 1) * limit + idx + 1}
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Chip
// //                             label={formatDate(row.date)}
// //                             size="small"
// //                             sx={{
// //                               bgcolor: "rgba(156, 163, 175, 0.1)",
// //                               color: "#e5e7eb",
// //                               border: "1px solid rgba(156, 163, 175, 0.2)",
// //                               fontSize: "0.7rem",
// //                               height: "22px",
// //                             }}
// //                           />
// //                         </td>
// //                         {cashFields.map((val, i) => (
// //                           <td
// //                             key={i}
// //                             style={{ textAlign: "center", color: "#7dd3fc" }}
// //                           >
// //                             {val || 0}
// //                           </td>
// //                         ))}
// //                         <td style={{ textAlign: "center", color: "#c084fc" }}>
// //                           {row.openingCash?.coins || 0}
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Tooltip
// //                             title={
// //                               onlineCount > 0
// //                                 ? `${onlineCount} online entr${
// //                                     onlineCount > 1 ? "ies" : "y"
// //                                   }`
// //                                 : "No online entries"
// //                             }
// //                           >
// //                             <Chip
// //                               label={`₹ ${onlineTotal.toLocaleString(
// //                                 "en-IN"
// //                               )} (${onlineCount})`}
// //                               size="small"
// //                               sx={{
// //                                 bgcolor: "rgba(34, 211, 238, 0.1)",
// //                                 color: "#22d3ee",
// //                                 border: "1px solid rgba(34, 211, 238, 0.3)",
// //                                 fontSize: "0.68rem",
// //                                 fontWeight: 700,
// //                                 height: "22px",
// //                               }}
// //                             />
// //                           </Tooltip>
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Typography
// //                             sx={{
// //                               color: "#34d399",
// //                               fontWeight: 800,
// //                               fontSize: "0.9rem",
// //                             }}
// //                           >
// //                             ₹ {row.totalSales?.toLocaleString("en-IN") || 0}
// //                           </Typography>
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <IconButton
// //                             size="small"
// //                             onClick={() => {
// //                               setViewEntry(row);
// //                               setViewOpen(true);
// //                             }}
// //                             sx={{
// //                               color: "#34d399",
// //                               "&:hover": { bgcolor: "rgba(52, 211, 153, 0.1)" },
// //                             }}
// //                           >
// //                             <Visibility fontSize="small" />
// //                           </IconButton>
// //                           <IconButton
// //                             size="small"
// //                             onClick={() =>
// //                               navigate(`/note-summary-entry/edit/${row._id}`)
// //                             }
// //                             sx={{
// //                               color: "#38bdf8",
// //                               "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
// //                             }}
// //                           >
// //                             <Edit fontSize="small" />
// //                           </IconButton>
// //                           <IconButton
// //                             size="small"
// //                             onClick={() => setDeleteId(row._id)}
// //                             sx={{
// //                               color: "#f43f5e",
// //                               "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
// //                             }}
// //                           >
// //                             <Delete fontSize="small" />
// //                           </IconButton>
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
// //                         ? "rgba(16, 185, 129, 0.2)"
// //                         : "rgba(255, 255, 255, 0.05)",
// //                     color: limit === n ? "#10b981" : "#9ca3af",
// //                     border:
// //                       limit === n
// //                         ? "1px solid rgba(16, 185, 129, 0.5)"
// //                         : "1px solid rgba(255, 255, 255, 0.1)",
// //                     fontWeight: 700,
// //                     fontSize: "0.68rem",
// //                     height: "24px",
// //                     cursor: "pointer",
// //                   }}
// //                 />
// //               ))}
// //               <Typography sx={{ color: "#6b7280", fontSize: "0.72rem", ml: 1 }}>
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
// //                     bgcolor: "rgba(16, 185, 129, 0.1)",
// //                     color: "#10b981",
// //                   },
// //                 },
// //                 "& .Mui-selected": {
// //                   bgcolor: "rgba(16, 185, 129, 0.2) !important",
// //                   color: "#10b981 !important",
// //                 },
// //               }}
// //             />
// //           </Box>
// //         </TableContainerDark>
// //       </Box>

// //       {/* ================= FLOATING DASHBOARD ================= */}
// //       <Tooltip title="Back to Dashboard" placement="left">
// //         <Fab
// //           onClick={() => navigate("/dashboard")}
// //           sx={{
// //             position: "fixed",
// //             bottom: 20,
// //             right: 20,
// //             zIndex: 1200,
// //             bgcolor: "#10b981",
// //             color: "#ffffff",
// //             width: 52,
// //             height: 52,
// //             boxShadow: "0 8px 24px rgba(16, 185, 129, 0.45)",
// //             "&:hover": { bgcolor: "#059669" },
// //           }}
// //         >
// //           <HomeIcon />
// //         </Fab>
// //       </Tooltip>

// //       {/* ================= VIEW MODAL ================= */}
// //       <Dialog
// //         open={viewOpen}
// //         onClose={() => setViewOpen(false)}
// //         maxWidth="sm"
// //         fullWidth
// //         PaperProps={{
// //           sx: {
// //             bgcolor: "#0d1527",
// //             borderRadius: "16px",
// //             border: "1px solid rgba(255, 255, 255, 0.08)",
// //             backgroundImage: "none",
// //           },
// //         }}
// //       >
// //         <DialogTitle
// //           sx={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
// //           }}
// //         >
// //           <Box>
// //             <Typography
// //               sx={{
// //                 color: "#10b981",
// //                 fontWeight: 800,
// //                 fontSize: "0.9rem",
// //                 letterSpacing: 1,
// //               }}
// //             >
// //               CASH ENTRY DETAILS
// //             </Typography>
// //             {viewEntry && (
// //               <Typography sx={{ color: "#9ca3af", fontSize: "0.72rem", mt: 0.3 }}>
// //                 {formatDate(viewEntry.date)}
// //               </Typography>
// //             )}
// //           </Box>
// //           <IconButton
// //             size="small"
// //             onClick={() => setViewOpen(false)}
// //             sx={{ color: "#9ca3af" }}
// //           >
// //             <CloseIcon />
// //           </IconButton>
// //         </DialogTitle>

// //         {viewEntry && (
// //           <DialogContent sx={{ p: 3 }}>
// //             {/* Cash breakdown */}
// //             <Typography
// //               sx={{
// //                 color: "#c084fc",
// //                 fontWeight: 800,
// //                 fontSize: "0.75rem",
// //                 letterSpacing: 1,
// //                 mb: 1.5,
// //               }}
// //             >
// //               PHYSICAL CASH
// //             </Typography>
// //             <Box
// //               sx={{
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(3, 1fr)",
// //                 gap: 1,
// //                 mb: 2.5,
// //               }}
// //             >
// //               {[
// //                 { l: "₹500", v: viewEntry.openingCash?.note500, c: "#34d399" },
// //                 { l: "₹200", v: viewEntry.openingCash?.note200, c: "#38bdf8" },
// //                 { l: "₹100", v: viewEntry.openingCash?.note100, c: "#c084fc" },
// //                 { l: "₹50", v: viewEntry.openingCash?.note50, c: "#fbbf24" },
// //                 { l: "₹20", v: viewEntry.openingCash?.note20, c: "#2dd4bf" },
// //                 { l: "₹10", v: viewEntry.openingCash?.note10, c: "#a78bfa" },
// //                 { l: "Coins", v: viewEntry.openingCash?.coins, c: "#fb923c" },
// //               ].map((d, i) => (
// //                 <Box
// //                   key={i}
// //                   sx={{
// //                     bgcolor: "#111827",
// //                     borderRadius: "8px",
// //                     border: "1px solid rgba(255, 255, 255, 0.06)",
// //                     p: 1.2,
// //                     textAlign: "center",
// //                   }}
// //                 >
// //                   <Typography
// //                     sx={{ color: "#6b7280", fontSize: "0.65rem", fontWeight: 700 }}
// //                   >
// //                     {d.l}
// //                   </Typography>
// //                   <Typography
// //                     sx={{ color: d.c, fontWeight: 800, fontSize: "0.9rem", mt: 0.3 }}
// //                   >
// //                     {d.v || 0}
// //                   </Typography>
// //                 </Box>
// //               ))}
// //             </Box>

// //             {/* Online breakdown */}
// //             <Typography
// //               sx={{
// //                 color: "#38bdf8",
// //                 fontWeight: 800,
// //                 fontSize: "0.75rem",
// //                 letterSpacing: 1,
// //                 mb: 1.5,
// //               }}
// //             >
// //               ONLINE PAYMENTS (
// //               {viewEntry.onlinePayments?.length ||
// //                 (viewEntry.totalOnline || viewEntry.online ? 1 : 0)}
// //               )
// //             </Typography>

// //             {viewEntry.onlinePayments &&
// //             viewEntry.onlinePayments.length > 0 ? (
// //               <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
// //                 {viewEntry.onlinePayments.map((p, i) => (
// //                   <Box
// //                     key={i}
// //                     sx={{
// //                       display: "flex",
// //                       justifyContent: "space-between",
// //                       alignItems: "center",
// //                       bgcolor: "#111827",
// //                       borderRadius: "8px",
// //                       border: "1px solid rgba(56, 189, 248, 0.15)",
// //                       p: 1.2,
// //                     }}
// //                   >
// //                     <Box>
// //                       <Typography
// //                         sx={{
// //                           color: "#9ca3af",
// //                           fontSize: "0.7rem",
// //                           fontWeight: 700,
// //                         }}
// //                       >
// //                         Entry #{i + 1}
// //                       </Typography>
// //                       {p.note && (
// //                         <Typography
// //                           sx={{ color: "#6b7280", fontSize: "0.7rem", mt: 0.2 }}
// //                         >
// //                           {p.note}
// //                         </Typography>
// //                       )}
// //                     </Box>
// //                     <Typography
// //                       sx={{ color: "#22d3ee", fontWeight: 800, fontSize: "0.9rem" }}
// //                     >
// //                       ₹ {(p.amount || 0).toLocaleString("en-IN")}
// //                     </Typography>
// //                   </Box>
// //                 ))}
// //               </Box>
// //             ) : (
// //               <Box
// //                 sx={{
// //                   bgcolor: "#111827",
// //                   borderRadius: "8px",
// //                   border: "1px solid rgba(56, 189, 248, 0.15)",
// //                   p: 1.5,
// //                   textAlign: "center",
// //                 }}
// //               >
// //                 <Typography
// //                   sx={{ color: "#22d3ee", fontWeight: 800, fontSize: "0.95rem" }}
// //                 >
// //                   ₹ {(viewEntry.totalOnline || viewEntry.online || 0).toLocaleString("en-IN")}
// //                 </Typography>
// //               </Box>
// //             )}

// //             {/* Totals */}
// //             <Box
// //               sx={{
// //                 mt: 2.5,
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 bgcolor: "rgba(16, 185, 129, 0.08)",
// //                 border: "1px solid rgba(16, 185, 129, 0.3)",
// //                 borderRadius: "10px",
// //                 px: 2.5,
// //                 py: 1.5,
// //               }}
// //             >
// //               <Typography sx={{ color: "#10b981", fontWeight: 800, fontSize: "0.85rem" }}>
// //                 GRAND TOTAL
// //               </Typography>
// //               <Typography sx={{ color: "#10b981", fontWeight: 900, fontSize: "1.2rem" }}>
// //                 ₹ {viewEntry.totalSales?.toLocaleString("en-IN") || 0}
// //               </Typography>
// //             </Box>
// //           </DialogContent>
// //         )}

// //         <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
// //           <Button
// //             onClick={() => setViewOpen(false)}
// //             sx={{
// //               color: "#9ca3af",
// //               textTransform: "none",
// //               fontWeight: 600,
// //               borderRadius: "10px",
// //             }}
// //           >
// //             Close
// //           </Button>
// //           <Button
// //             onClick={() => {
// //               setViewOpen(false);
// //               if (viewEntry) navigate(`/note-summary-entry/edit/${viewEntry._id}`);
// //             }}
// //             variant="contained"
// //             sx={{
// //               bgcolor: "#38bdf8",
// //               color: "#fff",
// //               textTransform: "none",
// //               fontWeight: 700,
// //               borderRadius: "10px",
// //               px: 3,
// //               "&:hover": { bgcolor: "#0ea5e9" },
// //             }}
// //           >
// //             Edit
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* ================= DELETE DIALOG ================= */}
// //       <Dialog
// //         open={!!deleteId}
// //         onClose={() => setDeleteId(null)}
// //         PaperProps={{
// //           sx: {
// //             bgcolor: "#111827",
// //             borderRadius: "16px",
// //             border: "1px solid rgba(255, 255, 255, 0.08)",
// //           },
// //         }}
// //       >
// //         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
// //           Delete Entry?
// //         </DialogTitle>
// //         <DialogContent>
// //           <Typography sx={{ color: "#9ca3af" }}>
// //             Are you sure? This cannot be undone.
// //           </Typography>
// //         </DialogContent>
// //         <DialogActions sx={{ px: 3, pb: 2.5 }}>
// //           <Button
// //             onClick={() => setDeleteId(null)}
// //             disabled={deleting}
// //             sx={{ color: "#9ca3af", textTransform: "none" }}
// //           >
// //             Cancel
// //           </Button>
// //           <Button
// //             onClick={handleDelete}
// //             disabled={deleting}
// //             variant="contained"
// //             sx={{
// //               bgcolor: "#f43f5e",
// //               color: "#fff",
// //               textTransform: "none",
// //               fontWeight: 700,
// //               borderRadius: "10px",
// //               px: 3,
// //               "&:hover": { bgcolor: "#e11d48" },
// //             }}
// //           >
// //             {deleting ? "Deleting..." : "Delete"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* ================= DELETE ALL DIALOG ================= */}
// //       <Dialog
// //         open={deleteAllOpen}
// //         onClose={() => setDeleteAllOpen(false)}
// //         PaperProps={{
// //           sx: {
// //             bgcolor: "#111827",
// //             borderRadius: "16px",
// //             border: "1px solid rgba(255, 255, 255, 0.08)",
// //           },
// //         }}
// //       >
// //         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
// //           Delete All Entries?
// //         </DialogTitle>
// //         <DialogContent>
// //           <Typography sx={{ color: "#9ca3af" }}>
// //             Delete all entries on this page? This cannot be undone.
// //           </Typography>
// //         </DialogContent>
// //         <DialogActions sx={{ px: 3, pb: 2.5 }}>
// //           <Button
// //             onClick={() => setDeleteAllOpen(false)}
// //             disabled={deleting}
// //             sx={{ color: "#9ca3af", textTransform: "none" }}
// //           >
// //             Cancel
// //           </Button>
// //           <Button
// //             onClick={handleDeleteAll}
// //             disabled={deleting}
// //             variant="contained"
// //             sx={{
// //               bgcolor: "#f43f5e",
// //               color: "#fff",
// //               textTransform: "none",
// //               fontWeight: 700,
// //               borderRadius: "10px",
// //               px: 3,
// //               "&:hover": { bgcolor: "#e11d48" },
// //             }}
// //           >
// //             {deleting ? "Deleting..." : "Delete All"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default DailyCashSummary;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   Box,
//   Grid,
//   Typography,
//   Chip,
//   Button,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Pagination,
//   Tooltip,
//   Fab,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   Add,
//   Refresh,
//   Delete,
//   Edit,
//   Visibility,
//   FiberManualRecord,
//   Payments,
//   AccountBalanceWallet,
//   TrendingUp,
//   Receipt,
//   ArrowBack,
//   Home as HomeIcon,
//   Close as CloseIcon,
//   FilterAlt as FilterIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";

// interface OnlinePayment {
//   amount: number;
//   note?: string;
// }

// interface CashEntry {
//   _id: string;
//   openingCash: {
//     note500: number;
//     note200: number;
//     note100: number;
//     note50: number;
//     note20: number;
//     note10: number;
//     coins: number;
//   };
//   onlinePayments?: OnlinePayment[];
//   totalOnline?: number;
//   online?: number;
//   totalSales: number;
//   date: string;
//   createdAt: string;
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
//   padding: "16px 18px",
//   marginBottom: "14px",
//   boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
//   flexShrink: 0,
// }));

// const FilterBar = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "16px 18px",
//   marginBottom: "14px",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   flexShrink: 0,
// }));

// const StyledTextField = styled("input")(() => ({
//   borderRadius: "10px",
//   backgroundColor: "#090d16",
//   color: "#ffffff",
//   fontSize: "0.82rem",
//   fontWeight: 500,
//   padding: "10px 12px",
//   border: "1px solid rgba(255, 255, 255, 0.12)",
//   outline: "none",
//   height: "44px",
//   width: "100%",
//   boxSizing: "border-box",
//   "&:hover": { borderColor: "rgba(16, 185, 129, 0.4)" },
//   "&:focus": { borderColor: "#10b981" },
//   "&::-webkit-calendar-picker-indicator": {
//     filter: "invert(0.7)",
//     cursor: "pointer",
//   },
// }));

// /* Quick filter chip */
// const QuickFilterChip = styled(Button)<{ active?: boolean }>(
//   ({ active }) => ({
//     borderRadius: "10px",
//     textTransform: "none",
//     fontWeight: 700,
//     fontSize: "0.75rem",
//     padding: "8px 18px",
//     minWidth: "auto",
//     whiteSpace: "nowrap",
//     backgroundColor: active ? "#10b981" : "rgba(16, 185, 129, 0.15)",
//     color: active ? "#0d1527" : "#10b981",
//     border: active
//       ? "1px solid #10b981"
//       : "1px solid rgba(16, 185, 129, 0.3)",
//     boxShadow: active ? "0 4px 14px rgba(16, 185, 129, 0.35)" : "none",
//     transition: "all 0.2s ease",
//     "&:hover": {
//       backgroundColor: active ? "#059669" : "rgba(16, 185, 129, 0.25)",
//       borderColor: "#10b981",
//     },
//   })
// );

// /* ✅ minHeight do — collapse nahi hoga */
// const TableContainerDark = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   overflow: "hidden",
//   display: "flex",
//   flexDirection: "column",
//   flex: 1,
//   minHeight: "400px",
//   marginBottom: "16px",
// }));

// /* ✅ flex 1 1 0 + height 0 */
// const TableScrollArea = styled(Box)(() => ({
//   overflow: "auto",
//   flex: "1 1 0",
//   height: 0,
//   minHeight: 0,
//   width: "100%",
//   "&::-webkit-scrollbar": { width: "8px", height: "8px" },
//   "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "rgba(16, 185, 129, 0.3)",
//     borderRadius: "8px",
//     "&:hover": { backgroundColor: "rgba(16, 185, 129, 0.5)" },
//   },
// }));

// /* ✅ Mobile card list */
// const CardListArea = styled(Box)(() => ({
//   overflowY: "auto",
//   overflowX: "hidden",
//   flex: "1 1 0",
//   height: 0,
//   minHeight: 0,
//   width: "100%",
//   padding: "12px",
//   display: "flex",
//   flexDirection: "column",
//   gap: "10px",
//   "&::-webkit-scrollbar": { width: "6px" },
//   "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "rgba(16, 185, 129, 0.3)",
//     borderRadius: "8px",
//   },
// }));

// const ItemsTable = styled("table")(() => ({
//   width: "100%",
//   minWidth: "1200px",
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
//   "& tbody tr:hover": { backgroundColor: "rgba(16, 185, 129, 0.05)" },
//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "12px",
//     textAlign: "left",
//     whiteSpace: "nowrap",
//   },
// }));

// const MetricCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
//   backgroundColor: "#111827",
//   borderRadius: "10px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "12px 14px",
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   position: "relative",
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

// const IconBox = styled(Box)(() => ({
//   width: "32px",
//   height: "32px",
//   borderRadius: "8px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

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

// // ===================== MAIN =====================

// const DailyCashSummary: React.FC = () => {
//   const navigate = useNavigate();

//   const [data, setData] = useState<CashEntry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);

//   // Pagination
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);

//   // Date filter
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [appliedFrom, setAppliedFrom] = useState("");
//   const [appliedTo, setAppliedTo] = useState("");
//   const [activeQuick, setActiveQuick] = useState<
//     "today" | "week" | "month" | "all" | ""
//   >("");

//   // Summary
//   const [totals, setTotals] = useState({
//     totalCash: 0,
//     totalOnline: 0,
//     grandTotal: 0,
//     totalEntries: 0,
//   });

//   // Delete
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [deleteAllOpen, setDeleteAllOpen] = useState(false);

//   // View modal
//   const [viewOpen, setViewOpen] = useState(false);
//   const [viewEntry, setViewEntry] = useState<CashEntry | null>(null);

//   // ===================== FETCH =====================
//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const params: any = { page, limit };
//       if (appliedFrom) params.from = appliedFrom;
//       if (appliedTo) params.to = appliedTo;

//       const res = await axios.get(`${API_URL}/dailycash`, {
//         params,
//         ...getAuthHeaders(),
//       });

//       if (res.data?.success === true) {
//         setData(res.data.data || []);
//         const count = res.data.totalCount ?? res.data.total ?? 0;
//         const pages =
//           res.data.pages ?? Math.max(1, Math.ceil((count || 0) / limit));
//         setTotalCount(count);
//         setTotalPages(pages);

//         if (res.data.totals) {
//           setTotals({
//             totalCash: res.data.totals.totalCash || 0,
//             totalOnline: res.data.totals.totalOnline || 0,
//             grandTotal: res.data.totals.grandTotal || 0,
//             totalEntries: res.data.totals.totalEntries || 0,
//           });
//         }
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to load entries");
//         setData([]);
//       }
//     } catch (error: any) {
//       if (error.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(error.response?.data?.message || "Failed to load entries");
//       }
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, limit, appliedFrom, appliedTo]);

//   // ===================== FILTER =====================
//   const handleApply = () => {
//     if (fromDate && toDate && fromDate > toDate) {
//       toast.error("From date cannot be after To date");
//       return;
//     }
//     setAppliedFrom(fromDate);
//     setAppliedTo(toDate);
//     setActiveQuick("");
//     setPage(1);
//   };

//   const handleClear = () => {
//     setFromDate("");
//     setToDate("");
//     setAppliedFrom("");
//     setAppliedTo("");
//     setActiveQuick("");
//     setPage(1);
//   };

//   const applyQuick = (type: "today" | "week" | "month" | "all") => {
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
//     setActiveQuick(type);
//     setPage(1);
//   };

//   const hasFilter = !!(appliedFrom || appliedTo);

//   // ===================== DELETE =====================
//   const handleDelete = async () => {
//     if (!deleteId) return;
//     try {
//       setDeleting(true);
//       const res = await axios.delete(
//         `${API_URL}/dailycash/${deleteId}`,
//         getAuthHeaders()
//       );
//       if (res.data?.success) {
//         toast.success("Entry deleted");
//         setDeleteId(null);
//         if (data.length === 1 && page > 1) setPage((p) => p - 1);
//         else fetchData();
//       } else {
//         toast.error(res.data?.message || "Failed to delete");
//       }
//     } catch (e: any) {
//       toast.error(e.response?.data?.message || "Delete failed");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleDeleteAll = async () => {
//     try {
//       setDeleting(true);
//       for (const entry of data) {
//         await axios.delete(
//           `${API_URL}/dailycash/${entry._id}`,
//           getAuthHeaders()
//         );
//       }
//       toast.success("All entries deleted");
//       setDeleteAllOpen(false);
//       setPage(1);
//       fetchData();
//     } catch (e: any) {
//       toast.error(e.response?.data?.message || "Delete all failed");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // ===================== RENDER =====================
//   return (
//     <Box
//       sx={{
//         // ✅ PAGE NEVER SCROLLS
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
//           maxWidth: 1400,
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
//                     borderColor: "#10b981",
//                     color: "#10b981",
//                     bgcolor: "rgba(16, 185, 129, 0.08)",
//                   },
//                 }}
//               >
//                 Dashboard
//               </Button>

//               <Box sx={{ minWidth: 0 }}>
//                 <Box display="flex" alignItems="center" gap={1} mb={0.3}>
//                   <FiberManualRecord sx={{ fontSize: 10, color: "#10b981" }} />
//                   <Typography
//                     sx={{
//                       color: "#10b981",
//                       letterSpacing: 0.5,
//                       fontSize: "0.7rem",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Cash Management
//                   </Typography>
//                 </Box>
//                 <Typography
//                   variant="h5"
//                   fontWeight="800"
//                   sx={{
//                     fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
//                     lineHeight: 1.2,
//                   }}
//                 >
//                   5. NOTE SUMMARY ENTRY
//                 </Typography>
//               </Box>
//             </Box>

//             <Box
//               display="flex"
//               gap={1}
//               flexWrap="wrap"
//               sx={{
//                 width: { xs: "100%", md: "auto" },
//                 justifyContent: { xs: "stretch", md: "flex-end" },
//               }}
//             >
//               <Button
//                 variant="contained"
//                 startIcon={<Add />}
//                 onClick={() => navigate("/note-summary-entry/create")}
//                 sx={{
//                   bgcolor: "#10b981",
//                   color: "#fff",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   fontSize: "0.78rem",
//                   boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
//                   flex: { xs: "1 1 45%", sm: "none" },
//                   "&:hover": { bgcolor: "#059669" },
//                 }}
//               >
//                 New Entry
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={<Refresh />}
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
//                   fontSize: "0.78rem",
//                   flex: { xs: "1 1 45%", sm: "none" },
//                   "&:hover": {
//                     borderColor: "#38bdf8",
//                     color: "#38bdf8",
//                     bgcolor: "rgba(56, 189, 248, 0.08)",
//                   },
//                 }}
//               >
//                 Refresh
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={<Delete />}
//                 onClick={() => setDeleteAllOpen(true)}
//                 disabled={totalCount === 0}
//                 sx={{
//                   color: "#f43f5e",
//                   borderColor: "rgba(244, 63, 94, 0.3)",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.2,
//                   py: 1,
//                   fontSize: "0.78rem",
//                   flex: { xs: "1 1 100%", sm: "none" },
//                   "&:hover": {
//                     borderColor: "#f43f5e",
//                     bgcolor: "rgba(244, 63, 94, 0.08)",
//                   },
//                   "&.Mui-disabled": {
//                     color: "rgba(244, 63, 94, 0.4)",
//                     borderColor: "rgba(244, 63, 94, 0.15)",
//                   },
//                 }}
//               >
//                 Delete All
//               </Button>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* ================= SUMMARY METRICS ================= */}
//         <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
//           {[
//             {
//               label: "Total Entries",
//               amount: totals.totalEntries.toString(),
//               color: "#c084fc",
//               icon: <Receipt />,
//               bg: "#2e1065",
//             },
//             {
//               label: "Total Cash",
//               amount: `₹ ${totals.totalCash.toLocaleString("en-IN")}`,
//               color: "#34d399",
//               icon: <Payments />,
//               bg: "#132e29",
//             },
//             {
//               label: "Total Online",
//               amount: `₹ ${totals.totalOnline.toLocaleString("en-IN")}`,
//               color: "#38bdf8",
//               icon: <TrendingUp />,
//               bg: "#0c2a3a",
//             },
//             {
//               label: "Grand Total",
//               amount: `₹ ${totals.grandTotal.toLocaleString("en-IN")}`,
//               color: "#fbbf24",
//               icon: <AccountBalanceWallet />,
//               bg: "#332208",
//             },
//           ].map((m, i) => (
//             <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
//               <MetricCard accentcolor={m.color}>
//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                   mb={0.5}
//                 >
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.68rem",
//                       fontWeight: 600,
//                     }}
//                   >
//                     {m.label}
//                   </Typography>
//                   <IconBox
//                     sx={{ bgcolor: m.bg, color: m.color, width: 24, height: 24 }}
//                   >
//                     {React.cloneElement(m.icon, { sx: { fontSize: 14 } })}
//                   </IconBox>
//                 </Box>
//                 <Typography
//                   sx={{
//                     color: m.color,
//                     fontWeight: 800,
//                     fontSize: { xs: "0.9rem", sm: "1.05rem" },
//                     lineHeight: 1.1,
//                   }}
//                 >
//                   {m.amount}
//                 </Typography>
//               </MetricCard>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ================= FILTER BAR ================= */}
//         <FilterBar>
//           <Grid container spacing={1.5}>
//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <Box sx={{ position: "relative" }}>
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.68rem",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                     mb: 0.5,
//                   }}
//                 >
//                   From
//                 </Typography>
//                 <StyledTextField
//                   type="date"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                 />
//               </Box>
//             </Grid>
//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <Box sx={{ position: "relative" }}>
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.68rem",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                     mb: 0.5,
//                   }}
//                 >
//                   To
//                 </Typography>
//                 <StyledTextField
//                   type="date"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                 />
//               </Box>
//             </Grid>
//             <Grid size={{ xs: 12, sm: 12, md: 6 }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   gap: 1,
//                   height: "100%",
//                   alignItems: "flex-end",
//                 }}
//               >
//                 <Button
//                   size="small"
//                   variant="contained"
//                   fullWidth
//                   startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
//                   onClick={handleApply}
//                   sx={{
//                     bgcolor: "#10b981",
//                     color: "#fff",
//                     fontWeight: 700,
//                     textTransform: "none",
//                     borderRadius: "10px",
//                     py: 1.1,
//                     fontSize: "0.78rem",
//                     "&:hover": { bgcolor: "#059669" },
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
//                   disabled={!hasFilter && !fromDate && !toDate}
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
//                   Clear
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Quick chips row */}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 1,
//               flexWrap: "wrap",
//               mt: 1.5,
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "#9ca3af",
//                 fontSize: "0.72rem",
//                 fontWeight: 700,
//                 textTransform: "uppercase",
//                 letterSpacing: 0.5,
//                 mr: 0.5,
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
//               active={activeQuick === "week"}
//               onClick={() => applyQuick("week")}
//             >
//               Last 7d
//             </QuickFilterChip>
//             <QuickFilterChip
//               active={activeQuick === "month"}
//               onClick={() => applyQuick("month")}
//             >
//               This Month
//             </QuickFilterChip>
//             <QuickFilterChip
//               active={activeQuick === "all"}
//               onClick={() => applyQuick("all")}
//             >
//               All
//             </QuickFilterChip>

//             <Box
//               sx={{
//                 ml: { md: "auto" },
//                 display: "flex",
//                 gap: 1,
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 mt: { xs: 1, md: 0 },
//               }}
//             >
//               {hasFilter && (
//                 <Chip
//                   label={`${appliedFrom || "..."} → ${appliedTo || "..."}`}
//                   size="small"
//                   onDelete={handleClear}
//                   sx={{
//                     bgcolor: "rgba(16, 185, 129, 0.15)",
//                     color: "#10b981",
//                     border: "1px solid rgba(16, 185, 129, 0.4)",
//                     fontWeight: 700,
//                     fontSize: "0.7rem",
//                     height: "28px",
//                     "& .MuiChip-deleteIcon": {
//                       color: "#10b981",
//                       "&:hover": { color: "#f43f5e" },
//                     },
//                   }}
//                 />
//               )}
//             </Box>
//           </Box>
//         </FilterBar>

//         {/* ================= TABLE / CARDS ================= */}
//         <TableContainerDark>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             flexWrap="wrap"
//             gap={1}
//             px={{ xs: 2, sm: 3 }}
//             py={1.5}
//             sx={{
//               borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <Typography
//               sx={{
//                 fontWeight: 800,
//                 fontSize: { xs: "0.85rem", sm: "0.9rem" },
//                 letterSpacing: 0.5,
//               }}
//             >
//               DAILY CASH ENTRIES
//             </Typography>
//             <Chip
//               label={`${totalCount} Entries`}
//               size="small"
//               sx={{
//                 bgcolor: "rgba(16, 185, 129, 0.1)",
//                 color: "#10b981",
//                 border: "1px solid rgba(16, 185, 129, 0.3)",
//                 fontWeight: 700,
//                 fontSize: "0.7rem",
//                 height: "24px",
//               }}
//             />
//           </Box>

//           {/* DESKTOP TABLE */}
//           <TableScrollArea sx={{ display: { xs: "none", md: "block" } }}>
//             <ItemsTable>
//               <thead>
//                 <tr>
//                   <th style={{ textAlign: "center", width: "50px" }}>#</th>
//                   <th style={{ textAlign: "center" }}>Date</th>
//                   <th style={{ textAlign: "center" }}>₹500</th>
//                   <th style={{ textAlign: "center" }}>₹200</th>
//                   <th style={{ textAlign: "center" }}>₹100</th>
//                   <th style={{ textAlign: "center" }}>₹50</th>
//                   <th style={{ textAlign: "center" }}>₹20</th>
//                   <th style={{ textAlign: "center" }}>₹10</th>
//                   <th style={{ textAlign: "center" }}>Coins</th>
//                   <th style={{ textAlign: "center" }}>Online</th>
//                   <th style={{ textAlign: "center" }}>Total</th>
//                   <th style={{ textAlign: "center", width: "140px" }}>
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={12}
//                       style={{ textAlign: "center", padding: 40 }}
//                     >
//                       <CircularProgress sx={{ color: "#10b981" }} size={30} />
//                     </td>
//                   </tr>
//                 ) : data.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={12}
//                       style={{ textAlign: "center", padding: 40 }}
//                     >
//                       <Receipt
//                         style={{
//                           fontSize: 40,
//                           color: "#374151",
//                           marginBottom: 8,
//                         }}
//                       />
//                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
//                         No entries found
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   data.map((row, idx) => {
//                     const onlineCount =
//                       row.onlinePayments?.length ||
//                       (row.totalOnline || row.online ? 1 : 0);
//                     const onlineTotal = row.totalOnline ?? row.online ?? 0;
//                     const cashFields = [
//                       row.openingCash?.note500,
//                       row.openingCash?.note200,
//                       row.openingCash?.note100,
//                       row.openingCash?.note50,
//                       row.openingCash?.note20,
//                       row.openingCash?.note10,
//                     ];

//                     return (
//                       <tr key={row._id}>
//                         <td style={{ textAlign: "center", color: "#6b7280" }}>
//                           {(page - 1) * limit + idx + 1}
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Chip
//                             label={formatDate(row.date)}
//                             size="small"
//                             sx={{
//                               bgcolor: "rgba(156, 163, 175, 0.1)",
//                               color: "#e5e7eb",
//                               border: "1px solid rgba(156, 163, 175, 0.2)",
//                               fontSize: "0.7rem",
//                               height: "22px",
//                             }}
//                           />
//                         </td>
//                         {cashFields.map((val, i) => (
//                           <td
//                             key={i}
//                             style={{ textAlign: "center", color: "#7dd3fc" }}
//                           >
//                             {val || 0}
//                           </td>
//                         ))}
//                         <td style={{ textAlign: "center", color: "#c084fc" }}>
//                           {row.openingCash?.coins || 0}
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Tooltip
//                             title={
//                               onlineCount > 0
//                                 ? `${onlineCount} online entr${
//                                     onlineCount > 1 ? "ies" : "y"
//                                   }`
//                                 : "No online entries"
//                             }
//                           >
//                             <Chip
//                               label={`₹ ${onlineTotal.toLocaleString(
//                                 "en-IN"
//                               )} (${onlineCount})`}
//                               size="small"
//                               sx={{
//                                 bgcolor: "rgba(34, 211, 238, 0.1)",
//                                 color: "#22d3ee",
//                                 border:
//                                   "1px solid rgba(34, 211, 238, 0.3)",
//                                 fontSize: "0.68rem",
//                                 fontWeight: 700,
//                                 height: "22px",
//                               }}
//                             />
//                           </Tooltip>
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Typography
//                             sx={{
//                               color: "#34d399",
//                               fontWeight: 800,
//                               fontSize: "0.9rem",
//                             }}
//                           >
//                             ₹ {row.totalSales?.toLocaleString("en-IN") || 0}
//                           </Typography>
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <IconButton
//                             size="small"
//                             onClick={() => {
//                               setViewEntry(row);
//                               setViewOpen(true);
//                             }}
//                             sx={{
//                               color: "#34d399",
//                               "&:hover": {
//                                 bgcolor: "rgba(52, 211, 153, 0.1)",
//                               },
//                             }}
//                           >
//                             <Visibility fontSize="small" />
//                           </IconButton>
//                           <IconButton
//                             size="small"
//                             onClick={() =>
//                               navigate(`/note-summary-entry/edit/${row._id}`)
//                             }
//                             sx={{
//                               color: "#38bdf8",
//                               "&:hover": {
//                                 bgcolor: "rgba(56, 189, 248, 0.1)",
//                               },
//                             }}
//                           >
//                             <Edit fontSize="small" />
//                           </IconButton>
//                           <IconButton
//                             size="small"
//                             onClick={() => setDeleteId(row._id)}
//                             sx={{
//                               color: "#f43f5e",
//                               "&:hover": {
//                                 bgcolor: "rgba(244, 63, 94, 0.1)",
//                               },
//                             }}
//                           >
//                             <Delete fontSize="small" />
//                           </IconButton>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </ItemsTable>
//           </TableScrollArea>

//           {/* ✅ MOBILE CARDS */}
//           <CardListArea sx={{ display: { xs: "flex", md: "none" } }}>
//             {loading ? (
//               <Box sx={{ textAlign: "center", py: 5 }}>
//                 <CircularProgress sx={{ color: "#10b981" }} size={32} />
//                 <Typography
//                   sx={{ color: "#9ca3af", fontSize: "0.85rem", mt: 1 }}
//                 >
//                   Loading entries...
//                 </Typography>
//               </Box>
//             ) : data.length === 0 ? (
//               <Box sx={{ textAlign: "center", py: 5 }}>
//                 <Receipt sx={{ fontSize: 44, color: "#374151", mb: 1 }} />
//                 <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
//                   No entries found
//                 </Typography>
//               </Box>
//             ) : (
//               data.map((row, idx) => {
//                 const onlineCount =
//                   row.onlinePayments?.length ||
//                   (row.totalOnline || row.online ? 1 : 0);
//                 const onlineTotal = row.totalOnline ?? row.online ?? 0;

//                 return (
//                   <Box
//                     key={row._id}
//                     sx={{
//                       bgcolor: "#111827",
//                       border: "1px solid rgba(16, 185, 129, 0.2)",
//                       borderRadius: "12px",
//                       p: 1.6,
//                       transition: "all 0.2s ease",
//                       "&:hover": {
//                         borderColor: "rgba(16, 185, 129, 0.45)",
//                         boxShadow: "0 6px 18px rgba(16, 185, 129, 0.15)",
//                       },
//                     }}
//                   >
//                     {/* Top: index + date + total */}
//                     <Box
//                       display="flex"
//                       justifyContent="space-between"
//                       alignItems="flex-start"
//                       gap={1}
//                       mb={1}
//                     >
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <Box
//                           sx={{
//                             width: 26,
//                             height: 26,
//                             borderRadius: "8px",
//                             bgcolor: "rgba(16, 185, 129, 0.15)",
//                             color: "#10b981",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             fontSize: "0.68rem",
//                             fontWeight: 800,
//                             flexShrink: 0,
//                           }}
//                         >
//                           {(page - 1) * limit + idx + 1}
//                         </Box>
//                         <Chip
//                           label={formatDate(row.date)}
//                           size="small"
//                           sx={{
//                             bgcolor: "rgba(156, 163, 175, 0.1)",
//                             color: "#e5e7eb",
//                             border: "1px solid rgba(156, 163, 175, 0.2)",
//                             fontSize: "0.68rem",
//                             height: "22px",
//                           }}
//                         />
//                       </Box>
//                       <Typography
//                         sx={{
//                           color: "#34d399",
//                           fontWeight: 900,
//                           fontSize: "0.95rem",
//                           flexShrink: 0,
//                         }}
//                       >
//                         ₹ {row.totalSales?.toLocaleString("en-IN") || 0}
//                       </Typography>
//                     </Box>

//                     {/* Cash denominations grid */}
//                     <Typography
//                       sx={{
//                         color: "#7dd3fc",
//                         fontSize: "0.6rem",
//                         fontWeight: 700,
//                         letterSpacing: 0.6,
//                         textTransform: "uppercase",
//                         mb: 0.6,
//                       }}
//                     >
//                       Physical Cash
//                     </Typography>
//                     <Box
//                       sx={{
//                         display: "grid",
//                         gridTemplateColumns: "repeat(4, 1fr)",
//                         gap: 0.6,
//                         mb: 1.2,
//                       }}
//                     >
//                       {[
//                         { l: "₹500", v: row.openingCash?.note500 },
//                         { l: "₹200", v: row.openingCash?.note200 },
//                         { l: "₹100", v: row.openingCash?.note100 },
//                         { l: "₹50", v: row.openingCash?.note50 },
//                         { l: "₹20", v: row.openingCash?.note20 },
//                         { l: "₹10", v: row.openingCash?.note10 },
//                         { l: "Coin", v: row.openingCash?.coins },
//                       ].map((d, i) => (
//                         <Box
//                           key={i}
//                           sx={{
//                             bgcolor: "#0d1527",
//                             borderRadius: "6px",
//                             border:
//                               "1px solid rgba(125, 211, 252, 0.15)",
//                             p: 0.6,
//                             textAlign: "center",
//                           }}
//                         >
//                           <Typography
//                             sx={{
//                               color: "#6b7280",
//                               fontSize: "0.58rem",
//                               fontWeight: 700,
//                             }}
//                           >
//                             {d.l}
//                           </Typography>
//                           <Typography
//                             sx={{
//                               color: "#7dd3fc",
//                               fontWeight: 800,
//                               fontSize: "0.78rem",
//                               mt: 0.1,
//                             }}
//                           >
//                             {d.v || 0}
//                           </Typography>
//                         </Box>
//                       ))}
//                     </Box>

//                     {/* Online chip */}
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         bgcolor: "rgba(34, 211, 238, 0.06)",
//                         border: "1px solid rgba(34, 211, 238, 0.2)",
//                         borderRadius: "8px",
//                         px: 1.2,
//                         py: 0.7,
//                         mb: 1,
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           color: "#9ca3af",
//                           fontSize: "0.68rem",
//                           fontWeight: 700,
//                         }}
//                       >
//                         Online ({onlineCount})
//                       </Typography>
//                       <Typography
//                         sx={{
//                           color: "#22d3ee",
//                           fontWeight: 900,
//                           fontSize: "0.82rem",
//                         }}
//                       >
//                         ₹ {onlineTotal.toLocaleString("en-IN")}
//                       </Typography>
//                     </Box>

//                     {/* Actions */}
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "flex-end",
//                         gap: 0.5,
//                         borderTop: "1px solid rgba(255, 255, 255, 0.05)",
//                         pt: 0.8,
//                       }}
//                     >
//                       <IconButton
//                         size="small"
//                         onClick={() => {
//                           setViewEntry(row);
//                           setViewOpen(true);
//                         }}
//                         sx={{
//                           color: "#34d399",
//                           "&:hover": {
//                             bgcolor: "rgba(52, 211, 153, 0.1)",
//                           },
//                         }}
//                       >
//                         <Visibility fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         size="small"
//                         onClick={() =>
//                           navigate(`/note-summary-entry/edit/${row._id}`)
//                         }
//                         sx={{
//                           color: "#38bdf8",
//                           "&:hover": {
//                             bgcolor: "rgba(56, 189, 248, 0.1)",
//                           },
//                         }}
//                       >
//                         <Edit fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         size="small"
//                         onClick={() => setDeleteId(row._id)}
//                         sx={{
//                           color: "#f43f5e",
//                           "&:hover": {
//                             bgcolor: "rgba(244, 63, 94, 0.1)",
//                           },
//                         }}
//                       >
//                         <Delete fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                 );
//               })
//             )}
//           </CardListArea>

//           {/* Pagination */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 1.5,
//               px: { xs: 2, sm: 3 },
//               py: 1.5,
//               borderTop: "1px solid rgba(255, 255, 255, 0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
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
//                         ? "rgba(16, 185, 129, 0.2)"
//                         : "rgba(255, 255, 255, 0.05)",
//                     color: limit === n ? "#10b981" : "#9ca3af",
//                     border:
//                       limit === n
//                         ? "1px solid rgba(16, 185, 129, 0.5)"
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
//                     bgcolor: "rgba(16, 185, 129, 0.1)",
//                     color: "#10b981",
//                   },
//                 },
//                 "& .Mui-selected": {
//                   bgcolor: "rgba(16, 185, 129, 0.2) !important",
//                   color: "#10b981 !important",
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
//             bgcolor: "#10b981",
//             color: "#ffffff",
//             width: 50,
//             height: 50,
//             boxShadow: "0 8px 24px rgba(16, 185, 129, 0.45)",
//             "&:hover": { bgcolor: "#059669" },
//           }}
//         >
//           <HomeIcon />
//         </Fab>
//       </Tooltip>

//       {/* ================= VIEW MODAL ================= */}
//       <Dialog
//         open={viewOpen}
//         onClose={() => setViewOpen(false)}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             bgcolor: "#0d1527",
//             borderRadius: "16px",
//             border: "1px solid rgba(255, 255, 255, 0.08)",
//             backgroundImage: "none",
//             m: { xs: 1.5, sm: 4 },
//             width: { xs: "calc(100% - 24px)", sm: "100%" },
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//             px: { xs: 2, sm: 3 },
//           }}
//         >
//           <Box>
//             <Typography
//               sx={{
//                 color: "#10b981",
//                 fontWeight: 800,
//                 fontSize: "0.85rem",
//                 letterSpacing: 1,
//               }}
//             >
//               CASH ENTRY DETAILS
//             </Typography>
//             {viewEntry && (
//               <Typography
//                 sx={{ color: "#9ca3af", fontSize: "0.72rem", mt: 0.3 }}
//               >
//                 {formatDate(viewEntry.date)}
//               </Typography>
//             )}
//           </Box>
//           <IconButton
//             size="small"
//             onClick={() => setViewOpen(false)}
//             sx={{ color: "#9ca3af" }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         {viewEntry && (
//           <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
//             {/* Cash breakdown */}
//             <Typography
//               sx={{
//                 color: "#c084fc",
//                 fontWeight: 800,
//                 fontSize: "0.75rem",
//                 letterSpacing: 1,
//                 mb: 1.5,
//               }}
//             >
//               PHYSICAL CASH
//             </Typography>
//             <Box
//               sx={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(3, 1fr)",
//                 gap: 1,
//                 mb: 2.5,
//               }}
//             >
//               {[
//                 { l: "₹500", v: viewEntry.openingCash?.note500, c: "#34d399" },
//                 { l: "₹200", v: viewEntry.openingCash?.note200, c: "#38bdf8" },
//                 { l: "₹100", v: viewEntry.openingCash?.note100, c: "#c084fc" },
//                 { l: "₹50", v: viewEntry.openingCash?.note50, c: "#fbbf24" },
//                 { l: "₹20", v: viewEntry.openingCash?.note20, c: "#2dd4bf" },
//                 { l: "₹10", v: viewEntry.openingCash?.note10, c: "#a78bfa" },
//                 { l: "Coins", v: viewEntry.openingCash?.coins, c: "#fb923c" },
//               ].map((d, i) => (
//                 <Box
//                   key={i}
//                   sx={{
//                     bgcolor: "#111827",
//                     borderRadius: "8px",
//                     border: "1px solid rgba(255, 255, 255, 0.06)",
//                     p: 1.2,
//                     textAlign: "center",
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: "#6b7280",
//                       fontSize: "0.65rem",
//                       fontWeight: 700,
//                     }}
//                   >
//                     {d.l}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: d.c,
//                       fontWeight: 800,
//                       fontSize: "0.9rem",
//                       mt: 0.3,
//                     }}
//                   >
//                     {d.v || 0}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>

//             {/* Online breakdown */}
//             <Typography
//               sx={{
//                 color: "#38bdf8",
//                 fontWeight: 800,
//                 fontSize: "0.75rem",
//                 letterSpacing: 1,
//                 mb: 1.5,
//               }}
//             >
//               ONLINE PAYMENTS (
//               {viewEntry.onlinePayments?.length ||
//                 (viewEntry.totalOnline || viewEntry.online ? 1 : 0)}
//               )
//             </Typography>

//             {viewEntry.onlinePayments &&
//             viewEntry.onlinePayments.length > 0 ? (
//               <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
//                 {viewEntry.onlinePayments.map((p, i) => (
//                   <Box
//                     key={i}
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       bgcolor: "#111827",
//                       borderRadius: "8px",
//                       border: "1px solid rgba(56, 189, 248, 0.15)",
//                       p: 1.2,
//                       gap: 1,
//                     }}
//                   >
//                     <Box sx={{ minWidth: 0 }}>
//                       <Typography
//                         sx={{
//                           color: "#9ca3af",
//                           fontSize: "0.7rem",
//                           fontWeight: 700,
//                         }}
//                       >
//                         Entry #{i + 1}
//                       </Typography>
//                       {p.note && (
//                         <Typography
//                           sx={{
//                             color: "#6b7280",
//                             fontSize: "0.7rem",
//                             mt: 0.2,
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             whiteSpace: "nowrap",
//                           }}
//                         >
//                           {p.note}
//                         </Typography>
//                       )}
//                     </Box>
//                     <Typography
//                       sx={{
//                         color: "#22d3ee",
//                         fontWeight: 800,
//                         fontSize: "0.9rem",
//                         flexShrink: 0,
//                       }}
//                     >
//                       ₹ {(p.amount || 0).toLocaleString("en-IN")}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             ) : (
//               <Box
//                 sx={{
//                   bgcolor: "#111827",
//                   borderRadius: "8px",
//                   border: "1px solid rgba(56, 189, 248, 0.15)",
//                   p: 1.5,
//                   textAlign: "center",
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     color: "#22d3ee",
//                     fontWeight: 800,
//                     fontSize: "0.95rem",
//                   }}
//                 >
//                   ₹{" "}
//                   {(viewEntry.totalOnline || viewEntry.online || 0).toLocaleString(
//                     "en-IN"
//                   )}
//                 </Typography>
//               </Box>
//             )}

//             {/* Totals */}
//             <Box
//               sx={{
//                 mt: 2.5,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 bgcolor: "rgba(16, 185, 129, 0.08)",
//                 border: "1px solid rgba(16, 185, 129, 0.3)",
//                 borderRadius: "10px",
//                 px: 2.5,
//                 py: 1.5,
//                 flexWrap: "wrap",
//                 gap: 1,
//               }}
//             >
//               <Typography
//                 sx={{ color: "#10b981", fontWeight: 800, fontSize: "0.85rem" }}
//               >
//                 GRAND TOTAL
//               </Typography>
//               <Typography
//                 sx={{ color: "#10b981", fontWeight: 900, fontSize: "1.2rem" }}
//               >
//                 ₹ {viewEntry.totalSales?.toLocaleString("en-IN") || 0}
//               </Typography>
//             </Box>
//           </DialogContent>
//         )}

//         <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: 2.5, gap: 1 }}>
//           <Button
//             onClick={() => setViewOpen(false)}
//             sx={{
//               color: "#9ca3af",
//               textTransform: "none",
//               fontWeight: 600,
//               borderRadius: "10px",
//             }}
//           >
//             Close
//           </Button>
//           <Button
//             onClick={() => {
//               setViewOpen(false);
//               if (viewEntry)
//                 navigate(`/note-summary-entry/edit/${viewEntry._id}`);
//             }}
//             variant="contained"
//             sx={{
//               bgcolor: "#38bdf8",
//               color: "#fff",
//               textTransform: "none",
//               fontWeight: 700,
//               borderRadius: "10px",
//               px: 3,
//               "&:hover": { bgcolor: "#0ea5e9" },
//             }}
//           >
//             Edit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ================= DELETE DIALOG ================= */}
//       <Dialog
//         open={!!deleteId}
//         onClose={() => setDeleteId(null)}
//         PaperProps={{
//           sx: {
//             bgcolor: "#111827",
//             borderRadius: "16px",
//             border: "1px solid rgba(255, 255, 255, 0.08)",
//             m: { xs: 1.5, sm: 4 },
//             width: { xs: "calc(100% - 24px)", sm: "100%" },
//           },
//         }}
//       >
//         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
//           Delete Entry?
//         </DialogTitle>
//         <DialogContent>
//           <Typography sx={{ color: "#9ca3af" }}>
//             Are you sure? This cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2.5 }}>
//           <Button
//             onClick={() => setDeleteId(null)}
//             disabled={deleting}
//             sx={{ color: "#9ca3af", textTransform: "none" }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDelete}
//             disabled={deleting}
//             variant="contained"
//             sx={{
//               bgcolor: "#f43f5e",
//               color: "#fff",
//               textTransform: "none",
//               fontWeight: 700,
//               borderRadius: "10px",
//               px: 3,
//               "&:hover": { bgcolor: "#e11d48" },
//             }}
//           >
//             {deleting ? "Deleting..." : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ================= DELETE ALL DIALOG ================= */}
//       <Dialog
//         open={deleteAllOpen}
//         onClose={() => setDeleteAllOpen(false)}
//         PaperProps={{
//           sx: {
//             bgcolor: "#111827",
//             borderRadius: "16px",
//             border: "1px solid rgba(255, 255, 255, 0.08)",
//             m: { xs: 1.5, sm: 4 },
//             width: { xs: "calc(100% - 24px)", sm: "100%" },
//           },
//         }}
//       >
//         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
//           Delete All Entries?
//         </DialogTitle>
//         <DialogContent>
//           <Typography sx={{ color: "#9ca3af" }}>
//             Delete all entries on this page? This cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2.5 }}>
//           <Button
//             onClick={() => setDeleteAllOpen(false)}
//             disabled={deleting}
//             sx={{ color: "#9ca3af", textTransform: "none" }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDeleteAll}
//             disabled={deleting}
//             variant="contained"
//             sx={{
//               bgcolor: "#f43f5e",
//               color: "#fff",
//               textTransform: "none",
//               fontWeight: 700,
//               borderRadius: "10px",
//               px: 3,
//               "&:hover": { bgcolor: "#e11d48" },
//             }}
//           >
//             {deleting ? "Deleting..." : "Delete All"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default DailyCashSummary;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Pagination,
  Tooltip,
  Fab,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  Add,
  Refresh,
  Delete,
  Edit,
  Visibility,
  FiberManualRecord,
  Payments,
  AccountBalanceWallet,
  TrendingUp,
  Receipt,
  ArrowBack,
  Home as HomeIcon,
  Close as CloseIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

interface OnlinePayment {
  amount: number;
  note?: string;
}

interface CashEntry {
  _id: string;
  openingCash: {
    note500: number;
    note200: number;
    note100: number;
    note50: number;
    note20: number;
    note10: number;
    coins: number;
  };
  onlinePayments?: OnlinePayment[];
  totalOnline?: number;
  online?: number;
  totalSales: number;
  date: string;
  createdAt: string;
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
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: isDark(theme)
    ? "0 8px 20px rgba(0, 0, 0, 0.4)"
    : "0 4px 14px rgba(15, 23, 42, 0.05)",
  flexShrink: 0,
  transition: "all 0.3s ease",
}));

const StyledTextField = styled("input")(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: isDark(theme) ? "#090d16" : "#f8fafc",
  color: isDark(theme) ? "#ffffff" : "#0f172a",
  fontSize: "0.82rem",
  fontWeight: 500,
  padding: "10px 12px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.12)"
    : "1px solid rgba(15, 23, 42, 0.12)",
  outline: "none",
  height: "44px",
  width: "100%",
  boxSizing: "border-box",
  transition: "all 0.2s ease",
  "&:hover": { borderColor: "rgba(16, 185, 129, 0.4)" },
  "&:focus": { borderColor: "#10b981" },
  "&::-webkit-calendar-picker-indicator": {
    filter: isDark(theme) ? "invert(0.7)" : "none",
    cursor: "pointer",
  },
}));

const QuickFilterChip = styled(Button)<{ active?: boolean }>(
  ({ active }) => ({
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.75rem",
    padding: "8px 18px",
    minWidth: "auto",
    whiteSpace: "nowrap",
    backgroundColor: active ? "#10b981" : "rgba(16, 185, 129, 0.15)",
    color: active ? "#ffffff" : "#059669",
    border: active
      ? "1px solid #10b981"
      : "1px solid rgba(16, 185, 129, 0.3)",
    boxShadow: active ? "0 4px 14px rgba(16, 185, 129, 0.35)" : "none",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: active ? "#059669" : "rgba(16, 185, 129, 0.25)",
      borderColor: "#10b981",
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
  minHeight: "400px",
  marginBottom: "16px",
  transition: "all 0.3s ease",
}));

const TableScrollArea = styled(Box)(({ theme }) => ({
  overflow: "auto",
  flex: "1 1 0",
  height: 0,
  minHeight: 0,
  width: "100%",
  "&::-webkit-scrollbar": { width: "8px", height: "8px" },
  "&::-webkit-scrollbar-track": {
    backgroundColor: isDark(theme) ? "#0d1527" : "#f1f5f9",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(16, 185, 129, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(16, 185, 129, 0.5)" },
  },
}));

const CardListArea = styled(Box)(() => ({
  overflowY: "auto",
  overflowX: "hidden",
  flex: "1 1 0",
  height: 0,
  minHeight: 0,
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(16, 185, 129, 0.3)",
    borderRadius: "8px",
  },
}));

const ItemsTable = styled("table")(({ theme }) => {
  const dark = isDark(theme);
  return {
    width: "100%",
    minWidth: "1200px",
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
    "& tbody tr:hover": { backgroundColor: "rgba(16, 185, 129, 0.05)" },
    "& tbody td": {
      color: dark ? "#e5e7eb" : "#334155",
      fontSize: "0.85rem",
      padding: "12px",
      textAlign: "left",
      whiteSpace: "nowrap",
    },
  };
});

const MetricCard = styled(Box)<{ accentcolor: string }>(
  ({ accentcolor, theme }) => ({
    backgroundColor: isDark(theme) ? "#111827" : "#ffffff",
    borderRadius: "10px",
    border: isDark(theme)
      ? "1px solid rgba(255, 255, 255, 0.08)"
      : "1px solid rgba(15, 23, 42, 0.08)",
    padding: "12px 14px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    transition: "all 0.3s ease",
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

const IconBox = styled(Box)(() => ({
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

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

// ===================== MAIN =====================
const DailyCashSummary: React.FC = () => {
  const navigate = useNavigate();
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
    emeraldText: dark ? "#10b981" : "#059669",
    skyText: dark ? "#38bdf8" : "#0284c7",
    cyanText: dark ? "#22d3ee" : "#0891b2",
    purpleText: dark ? "#c084fc" : "#7e22ce",
    amberText: dark ? "#fbbf24" : "#d97706",
    tealText: dark ? "#2dd4bf" : "#0d9488",
    violetText: dark ? "#a78bfa" : "#7c3aed",
    orangeText: dark ? "#fb923c" : "#ea580c",
    emeraldIconBg: dark ? "#132e29" : "#d1fae5",
    skyIconBg: dark ? "#0c2a3a" : "#e0f2fe",
    purpleIconBg: dark ? "#2e1065" : "#f3e8ff",
    amberIconBg: dark ? "#332208" : "#fef3c7",
    chipBgSoft: dark
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(15, 23, 42, 0.04)",
    // For cash denomination tiles inside mobile cards
    denomBg: dark ? "#0d1527" : "#f8fafc",
    denomBorder: dark
      ? "rgba(125, 211, 252, 0.15)"
      : "rgba(2, 132, 199, 0.15)",
  };

  const [data, setData] = useState<CashEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Date filter
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [activeQuick, setActiveQuick] = useState<
    "today" | "week" | "month" | "all" | ""
  >("");

  // Summary
  const [totals, setTotals] = useState({
    totalCash: 0,
    totalOnline: 0,
    grandTotal: 0,
    totalEntries: 0,
  });

  // Delete
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);

  // View modal
  const [viewOpen, setViewOpen] = useState(false);
  const [viewEntry, setViewEntry] = useState<CashEntry | null>(null);

  // ===================== FETCH =====================
  const fetchData = async () => {
    try {
      setLoading(true);

      const params: any = { page, limit };
      if (appliedFrom) params.from = appliedFrom;
      if (appliedTo) params.to = appliedTo;

      const res = await axios.get(`${API_URL}/dailycash`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setData(res.data.data || []);
        const count = res.data.totalCount ?? res.data.total ?? 0;
        const pages =
          res.data.pages ?? Math.max(1, Math.ceil((count || 0) / limit));
        setTotalCount(count);
        setTotalPages(pages);

        if (res.data.totals) {
          setTotals({
            totalCash: res.data.totals.totalCash || 0,
            totalOnline: res.data.totals.totalOnline || 0,
            grandTotal: res.data.totals.grandTotal || 0,
            totalEntries: res.data.totals.totalEntries || 0,
          });
        }
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load entries");
        setData([]);
      }
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load entries");
      }
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, appliedFrom, appliedTo]);

  // ===================== FILTER =====================
  const handleApply = () => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setActiveQuick("");
    setPage(1);
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
    setActiveQuick("");
    setPage(1);
  };

  const applyQuick = (type: "today" | "week" | "month" | "all") => {
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
    setActiveQuick(type);
    setPage(1);
  };

  const hasFilter = !!(appliedFrom || appliedTo);

  // ===================== DELETE =====================
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      const res = await axios.delete(
        `${API_URL}/dailycash/${deleteId}`,
        getAuthHeaders()
      );
      if (res.data?.success) {
        toast.success("Entry deleted");
        setDeleteId(null);
        if (data.length === 1 && page > 1) setPage((p) => p - 1);
        else fetchData();
      } else {
        toast.error(res.data?.message || "Failed to delete");
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      setDeleting(true);
      for (const entry of data) {
        await axios.delete(
          `${API_URL}/dailycash/${entry._id}`,
          getAuthHeaders()
        );
      }
      toast.success("All entries deleted");
      setDeleteAllOpen(false);
      setPage(1);
      fetchData();
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Delete all failed");
    } finally {
      setDeleting(false);
    }
  };

  // ===================== RENDER =====================
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
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* ================= HEADER ================= */}
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
                    borderColor: "#10b981",
                    color: "#10b981",
                    bgcolor: "rgba(16, 185, 129, 0.08)",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box sx={{ minWidth: 0 }}>
                <Box display="flex" alignItems="center" gap={1} mb={0.3}>
                  <FiberManualRecord sx={{ fontSize: 10, color: "#10b981" }} />
                  <Typography
                    sx={{
                      color: c.emeraldText,
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    Cash Management
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
                    lineHeight: 1.2,
                    color: c.text,
                  }}
                >
                  5. NOTE SUMMARY ENTRY
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              gap={1}
              flexWrap="wrap"
              sx={{
                width: { xs: "100%", md: "auto" },
                justifyContent: { xs: "stretch", md: "flex-end" },
              }}
            >
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate("/note-summary-entry/create")}
                sx={{
                  bgcolor: "#10b981",
                  color: "#fff",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.78rem",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
                  flex: { xs: "1 1 45%", sm: "none" },
                  "&:hover": { bgcolor: "#059669" },
                }}
              >
                New Entry
              </Button>

              <Button
                variant="outlined"
                startIcon={<Refresh />}
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
                  fontSize: "0.78rem",
                  flex: { xs: "1 1 45%", sm: "none" },
                  "&:hover": {
                    borderColor: "#38bdf8",
                    color: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>

              <Button
                variant="outlined"
                startIcon={<Delete />}
                onClick={() => setDeleteAllOpen(true)}
                disabled={totalCount === 0}
                sx={{
                  color: "#f43f5e",
                  borderColor: "rgba(244, 63, 94, 0.3)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.2,
                  py: 1,
                  fontSize: "0.78rem",
                  flex: { xs: "1 1 100%", sm: "none" },
                  "&:hover": {
                    borderColor: "#f43f5e",
                    bgcolor: "rgba(244, 63, 94, 0.08)",
                  },
                  "&.Mui-disabled": {
                    color: "rgba(244, 63, 94, 0.4)",
                    borderColor: "rgba(244, 63, 94, 0.15)",
                  },
                }}
              >
                Delete All
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= SUMMARY METRICS ================= */}
        <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
          {[
            {
              label: "Total Entries",
              amount: totals.totalEntries.toString(),
              color: c.purpleText,
              icon: <Receipt />,
              bg: c.purpleIconBg,
            },
            {
              label: "Total Cash",
              amount: `₹ ${totals.totalCash.toLocaleString("en-IN")}`,
              color: c.emeraldText,
              icon: <Payments />,
              bg: c.emeraldIconBg,
            },
            {
              label: "Total Online",
              amount: `₹ ${totals.totalOnline.toLocaleString("en-IN")}`,
              color: c.skyText,
              icon: <TrendingUp />,
              bg: c.skyIconBg,
            },
            {
              label: "Grand Total",
              amount: `₹ ${totals.grandTotal.toLocaleString("en-IN")}`,
              color: c.amberText,
              icon: <AccountBalanceWallet />,
              bg: c.amberIconBg,
            },
          ].map((m, i) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
              <MetricCard accentcolor={m.color}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={0.5}
                >
                  <Typography
                    sx={{
                      color: c.muted,
                      fontSize: "0.68rem",
                      fontWeight: 600,
                    }}
                  >
                    {m.label}
                  </Typography>
                  <IconBox
                    sx={{
                      bgcolor: m.bg,
                      color: m.color,
                      width: 24,
                      height: 24,
                    }}
                  >
                    {React.cloneElement(m.icon, {
                      sx: { fontSize: 14 },
                    })}
                  </IconBox>
                </Box>
                <Typography
                  sx={{
                    color: m.color,
                    fontWeight: 800,
                    fontSize: { xs: "0.9rem", sm: "1.05rem" },
                    lineHeight: 1.1,
                  }}
                >
                  {m.amount}
                </Typography>
              </MetricCard>
            </Grid>
          ))}
        </Grid>

        {/* ================= FILTER BAR ================= */}
        <FilterBar>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ position: "relative" }}>
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    mb: 0.5,
                  }}
                >
                  From
                </Typography>
                <StyledTextField
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ position: "relative" }}>
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    mb: 0.5,
                  }}
                >
                  To
                </Typography>
                <StyledTextField
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  height: "100%",
                  alignItems: "flex-end",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
                  onClick={handleApply}
                  sx={{
                    bgcolor: "#10b981",
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    py: 1.1,
                    fontSize: "0.78rem",
                    "&:hover": { bgcolor: "#059669" },
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
                  disabled={!hasFilter && !fromDate && !toDate}
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
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              mt: 1.5,
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: c.muted,
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                mr: 0.5,
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
              active={activeQuick === "week"}
              onClick={() => applyQuick("week")}
            >
              Last 7d
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "month"}
              onClick={() => applyQuick("month")}
            >
              This Month
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "all"}
              onClick={() => applyQuick("all")}
            >
              All
            </QuickFilterChip>

            <Box
              sx={{
                ml: { md: "auto" },
                display: "flex",
                gap: 1,
                alignItems: "center",
                flexWrap: "wrap",
                mt: { xs: 1, md: 0 },
              }}
            >
              {hasFilter && (
                <Chip
                  label={`${appliedFrom || "..."} → ${appliedTo || "..."}`}
                  size="small"
                  onDelete={handleClear}
                  sx={{
                    bgcolor: "rgba(16, 185, 129, 0.15)",
                    color: c.emeraldText,
                    border: "1px solid rgba(16, 185, 129, 0.4)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "28px",
                    "& .MuiChip-deleteIcon": {
                      color: c.emeraldText,
                      "&:hover": { color: "#f43f5e" },
                    },
                  }}
                />
              )}
            </Box>
          </Box>
        </FilterBar>

        {/* ================= TABLE / CARDS ================= */}
        <TableContainerDark>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
            px={{ xs: 2, sm: 3 }}
            py={1.5}
            sx={{
              borderBottom: `1px solid ${c.border08}`,
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                letterSpacing: 0.5,
                color: c.text,
              }}
            >
              DAILY CASH ENTRIES
            </Typography>
            <Chip
              label={`${totalCount} Entries`}
              size="small"
              sx={{
                bgcolor: "rgba(16, 185, 129, 0.1)",
                color: c.emeraldText,
                border: "1px solid rgba(16, 185, 129, 0.3)",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: "24px",
              }}
            />
          </Box>

          {/* DESKTOP TABLE */}
          <TableScrollArea sx={{ display: { xs: "none", md: "block" } }}>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>₹500</th>
                  <th style={{ textAlign: "center" }}>₹200</th>
                  <th style={{ textAlign: "center" }}>₹100</th>
                  <th style={{ textAlign: "center" }}>₹50</th>
                  <th style={{ textAlign: "center" }}>₹20</th>
                  <th style={{ textAlign: "center" }}>₹10</th>
                  <th style={{ textAlign: "center" }}>Coins</th>
                  <th style={{ textAlign: "center" }}>Online</th>
                  <th style={{ textAlign: "center" }}>Total</th>
                  <th style={{ textAlign: "center", width: "140px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={12}
                      style={{ textAlign: "center", padding: 40 }}
                    >
                      <CircularProgress sx={{ color: "#10b981" }} size={30} />
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      style={{ textAlign: "center", padding: 40 }}
                    >
                      <Receipt
                        style={{
                          fontSize: 40,
                          color: c.veryMuted,
                          marginBottom: 8,
                        }}
                      />
                      <Typography sx={{ color: c.muted, fontSize: "0.9rem" }}>
                        No entries found
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  data.map((row, idx) => {
                    const onlineCount =
                      row.onlinePayments?.length ||
                      (row.totalOnline || row.online ? 1 : 0);
                    const onlineTotal = row.totalOnline ?? row.online ?? 0;
                    const cashFields = [
                      row.openingCash?.note500,
                      row.openingCash?.note200,
                      row.openingCash?.note100,
                      row.openingCash?.note50,
                      row.openingCash?.note20,
                      row.openingCash?.note10,
                    ];

                    return (
                      <tr key={row._id}>
                        <td style={{ textAlign: "center", color: c.mutedDark }}>
                          {(page - 1) * limit + idx + 1}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Chip
                            label={formatDate(row.date)}
                            size="small"
                            sx={{
                              bgcolor: c.chipBgSoft,
                              color: c.textSec,
                              border: `1px solid ${c.border10}`,
                              fontSize: "0.7rem",
                              height: "22px",
                            }}
                          />
                        </td>
                        {cashFields.map((val, i) => (
                          <td
                            key={i}
                            style={{
                              textAlign: "center",
                              color: dark ? "#7dd3fc" : "#0369a1",
                              fontWeight: 600,
                            }}
                          >
                            {val || 0}
                          </td>
                        ))}
                        <td
                          style={{
                            textAlign: "center",
                            color: c.purpleText,
                            fontWeight: 600,
                          }}
                        >
                          {row.openingCash?.coins || 0}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Tooltip
                            title={
                              onlineCount > 0
                                ? `${onlineCount} online entr${
                                    onlineCount > 1 ? "ies" : "y"
                                  }`
                                : "No online entries"
                            }
                          >
                            <Chip
                              label={`₹ ${onlineTotal.toLocaleString(
                                "en-IN"
                              )} (${onlineCount})`}
                              size="small"
                              sx={{
                                bgcolor: "rgba(34, 211, 238, 0.1)",
                                color: c.cyanText,
                                border:
                                  "1px solid rgba(34, 211, 238, 0.3)",
                                fontSize: "0.68rem",
                                fontWeight: 700,
                                height: "22px",
                              }}
                            />
                          </Tooltip>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography
                            sx={{
                              color: c.emeraldText,
                              fontWeight: 800,
                              fontSize: "0.9rem",
                            }}
                          >
                            ₹ {row.totalSales?.toLocaleString("en-IN") || 0}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setViewEntry(row);
                              setViewOpen(true);
                            }}
                            sx={{
                              color: c.emeraldText,
                              "&:hover": {
                                bgcolor: "rgba(52, 211, 153, 0.1)",
                              },
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(`/note-summary-entry/edit/${row._id}`)
                            }
                            sx={{
                              color: c.skyText,
                              "&:hover": {
                                bgcolor: "rgba(56, 189, 248, 0.1)",
                              },
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => setDeleteId(row._id)}
                            sx={{
                              color: "#f43f5e",
                              "&:hover": {
                                bgcolor: "rgba(244, 63, 94, 0.1)",
                              },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </ItemsTable>
          </TableScrollArea>

          {/* ✅ MOBILE CARDS */}
          <CardListArea sx={{ display: { xs: "flex", md: "none" } }}>
            {loading ? (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <CircularProgress sx={{ color: "#10b981" }} size={32} />
                <Typography
                  sx={{ color: c.muted, fontSize: "0.85rem", mt: 1 }}
                >
                  Loading entries...
                </Typography>
              </Box>
            ) : data.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <Receipt sx={{ fontSize: 44, color: c.veryMuted, mb: 1 }} />
                <Typography sx={{ color: c.muted, fontSize: "0.9rem" }}>
                  No entries found
                </Typography>
              </Box>
            ) : (
              data.map((row, idx) => {
                const onlineCount =
                  row.onlinePayments?.length ||
                  (row.totalOnline || row.online ? 1 : 0);
                const onlineTotal = row.totalOnline ?? row.online ?? 0;

                return (
                  <Box
                    key={row._id}
                    sx={{
                      bgcolor: c.cardBg,
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                      borderRadius: "12px",
                      p: 1.6,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "rgba(16, 185, 129, 0.45)",
                        boxShadow: "0 6px 18px rgba(16, 185, 129, 0.15)",
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      gap={1}
                      mb={1}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box
                          sx={{
                            width: 26,
                            height: 26,
                            borderRadius: "8px",
                            bgcolor: "rgba(16, 185, 129, 0.15)",
                            color: c.emeraldText,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          {(page - 1) * limit + idx + 1}
                        </Box>
                        <Chip
                          label={formatDate(row.date)}
                          size="small"
                          sx={{
                            bgcolor: c.chipBgSoft,
                            color: c.textSec,
                            border: `1px solid ${c.border10}`,
                            fontSize: "0.68rem",
                            height: "22px",
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          color: c.emeraldText,
                          fontWeight: 900,
                          fontSize: "0.95rem",
                          flexShrink: 0,
                        }}
                      >
                        ₹ {row.totalSales?.toLocaleString("en-IN") || 0}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        color: dark ? "#7dd3fc" : "#0369a1",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: 0.6,
                        textTransform: "uppercase",
                        mb: 0.6,
                      }}
                    >
                      Physical Cash
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 0.6,
                        mb: 1.2,
                      }}
                    >
                      {[
                        { l: "₹500", v: row.openingCash?.note500 },
                        { l: "₹200", v: row.openingCash?.note200 },
                        { l: "₹100", v: row.openingCash?.note100 },
                        { l: "₹50", v: row.openingCash?.note50 },
                        { l: "₹20", v: row.openingCash?.note20 },
                        { l: "₹10", v: row.openingCash?.note10 },
                        { l: "Coin", v: row.openingCash?.coins },
                      ].map((d, i) => (
                        <Box
                          key={i}
                          sx={{
                            bgcolor: c.denomBg,
                            borderRadius: "6px",
                            border: `1px solid ${c.denomBorder}`,
                            p: 0.6,
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: c.mutedDark,
                              fontSize: "0.58rem",
                              fontWeight: 700,
                            }}
                          >
                            {d.l}
                          </Typography>
                          <Typography
                            sx={{
                              color: dark ? "#7dd3fc" : "#0369a1",
                              fontWeight: 800,
                              fontSize: "0.78rem",
                              mt: 0.1,
                            }}
                          >
                            {d.v || 0}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        bgcolor: "rgba(34, 211, 238, 0.06)",
                        border: "1px solid rgba(34, 211, 238, 0.2)",
                        borderRadius: "8px",
                        px: 1.2,
                        py: 0.7,
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          color: c.muted,
                          fontSize: "0.68rem",
                          fontWeight: 700,
                        }}
                      >
                        Online ({onlineCount})
                      </Typography>
                      <Typography
                        sx={{
                          color: c.cyanText,
                          fontWeight: 900,
                          fontSize: "0.82rem",
                        }}
                      >
                        ₹ {onlineTotal.toLocaleString("en-IN")}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 0.5,
                        borderTop: `1px solid ${c.border05}`,
                        pt: 0.8,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => {
                          setViewEntry(row);
                          setViewOpen(true);
                        }}
                        sx={{
                          color: c.emeraldText,
                          "&:hover": {
                            bgcolor: "rgba(52, 211, 153, 0.1)",
                          },
                        }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigate(`/note-summary-entry/edit/${row._id}`)
                        }
                        sx={{
                          color: c.skyText,
                          "&:hover": {
                            bgcolor: "rgba(56, 189, 248, 0.1)",
                          },
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setDeleteId(row._id)}
                        sx={{
                          color: "#f43f5e",
                          "&:hover": {
                            bgcolor: "rgba(244, 63, 94, 0.1)",
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })
            )}
          </CardListArea>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              px: { xs: 2, sm: 3 },
              py: 1.5,
              borderTop: `1px solid ${c.border08}`,
              flexShrink: 0,
            }}
          >
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
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
                        ? "rgba(16, 185, 129, 0.2)"
                        : c.chipBgSoft,
                    color: limit === n ? c.emeraldText : c.muted,
                    border:
                      limit === n
                        ? "1px solid rgba(16, 185, 129, 0.5)"
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
                    bgcolor: "rgba(16, 185, 129, 0.1)",
                    color: c.emeraldText,
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(16, 185, 129, 0.2) !important",
                  color: `${c.emeraldText} !important`,
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
            bgcolor: "#10b981",
            color: "#ffffff",
            width: 50,
            height: 50,
            boxShadow: "0 8px 24px rgba(16, 185, 129, 0.45)",
            "&:hover": { bgcolor: "#059669" },
          }}
        >
          <HomeIcon />
        </Fab>
      </Tooltip>

      {/* ================= VIEW MODAL ================= */}
      <Dialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: c.bannerBg,
            borderRadius: "16px",
            border: `1px solid ${c.border08}`,
            backgroundImage: "none",
            m: { xs: 1.5, sm: 4 },
            width: { xs: "calc(100% - 24px)", sm: "100%" },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${c.border08}`,
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box>
            <Typography
              sx={{
                color: c.emeraldText,
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: 1,
              }}
            >
              CASH ENTRY DETAILS
            </Typography>
            {viewEntry && (
              <Typography
                sx={{ color: c.muted, fontSize: "0.72rem", mt: 0.3 }}
              >
                {formatDate(viewEntry.date)}
              </Typography>
            )}
          </Box>
          <IconButton
            size="small"
            onClick={() => setViewOpen(false)}
            sx={{ color: c.muted }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {viewEntry && (
          <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              sx={{
                color: c.purpleText,
                fontWeight: 800,
                fontSize: "0.75rem",
                letterSpacing: 1,
                mb: 1.5,
              }}
            >
              PHYSICAL CASH
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
                mb: 2.5,
              }}
            >
              {[
                {
                  l: "₹500",
                  v: viewEntry.openingCash?.note500,
                  col: dark ? "#34d399" : "#059669",
                },
                {
                  l: "₹200",
                  v: viewEntry.openingCash?.note200,
                  col: c.skyText,
                },
                {
                  l: "₹100",
                  v: viewEntry.openingCash?.note100,
                  col: c.purpleText,
                },
                {
                  l: "₹50",
                  v: viewEntry.openingCash?.note50,
                  col: c.amberText,
                },
                {
                  l: "₹20",
                  v: viewEntry.openingCash?.note20,
                  col: c.tealText,
                },
                {
                  l: "₹10",
                  v: viewEntry.openingCash?.note10,
                  col: c.violetText,
                },
                {
                  l: "Coins",
                  v: viewEntry.openingCash?.coins,
                  col: c.orangeText,
                },
              ].map((d, i) => (
                <Box
                  key={i}
                  sx={{
                    bgcolor: c.cardBg,
                    borderRadius: "8px",
                    border: `1px solid ${c.border08}`,
                    p: 1.2,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: c.mutedDark,
                      fontSize: "0.65rem",
                      fontWeight: 700,
                    }}
                  >
                    {d.l}
                  </Typography>
                  <Typography
                    sx={{
                      color: d.col,
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      mt: 0.3,
                    }}
                  >
                    {d.v || 0}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography
              sx={{
                color: c.skyText,
                fontWeight: 800,
                fontSize: "0.75rem",
                letterSpacing: 1,
                mb: 1.5,
              }}
            >
              ONLINE PAYMENTS (
              {viewEntry.onlinePayments?.length ||
                (viewEntry.totalOnline || viewEntry.online ? 1 : 0)}
              )
            </Typography>

            {viewEntry.onlinePayments &&
            viewEntry.onlinePayments.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                {viewEntry.onlinePayments.map((p, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: c.cardBg,
                      borderRadius: "8px",
                      border: "1px solid rgba(56, 189, 248, 0.15)",
                      p: 1.2,
                      gap: 1,
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          color: c.muted,
                          fontSize: "0.7rem",
                          fontWeight: 700,
                        }}
                      >
                        Entry #{i + 1}
                      </Typography>
                      {p.note && (
                        <Typography
                          sx={{
                            color: c.mutedDark,
                            fontSize: "0.7rem",
                            mt: 0.2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.note}
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      sx={{
                        color: c.cyanText,
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        flexShrink: 0,
                      }}
                    >
                      ₹ {(p.amount || 0).toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  bgcolor: c.cardBg,
                  borderRadius: "8px",
                  border: "1px solid rgba(56, 189, 248, 0.15)",
                  p: 1.5,
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    color: c.cyanText,
                    fontWeight: 800,
                    fontSize: "0.95rem",
                  }}
                >
                  ₹{" "}
                  {(
                    viewEntry.totalOnline ||
                    viewEntry.online ||
                    0
                  ).toLocaleString("en-IN")}
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                mt: 2.5,
                display: "flex",
                justifyContent: "space-between",
                bgcolor: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "10px",
                px: 2.5,
                py: 1.5,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  color: c.emeraldText,
                  fontWeight: 800,
                  fontSize: "0.85rem",
                }}
              >
                GRAND TOTAL
              </Typography>
              <Typography
                sx={{
                  color: c.emeraldText,
                  fontWeight: 900,
                  fontSize: "1.2rem",
                }}
              >
                ₹ {viewEntry.totalSales?.toLocaleString("en-IN") || 0}
              </Typography>
            </Box>
          </DialogContent>
        )}

        <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => setViewOpen(false)}
            sx={{
              color: c.muted,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              setViewOpen(false);
              if (viewEntry)
                navigate(`/note-summary-entry/edit/${viewEntry._id}`);
            }}
            variant="contained"
            sx={{
              bgcolor: "#38bdf8",
              color: "#fff",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 3,
              "&:hover": { bgcolor: "#0ea5e9" },
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= DELETE DIALOG ================= */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        PaperProps={{
          sx: {
            bgcolor: c.cardBg,
            borderRadius: "16px",
            border: `1px solid ${c.border08}`,
            backgroundImage: "none",
            m: { xs: 1.5, sm: 4 },
            width: { xs: "calc(100% - 24px)", sm: "100%" },
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete Entry?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: c.muted }}>
            Are you sure? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteId(null)}
            disabled={deleting}
            sx={{ color: c.muted, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleting}
            variant="contained"
            sx={{
              bgcolor: "#f43f5e",
              color: "#fff",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 3,
              "&:hover": { bgcolor: "#e11d48" },
            }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= DELETE ALL DIALOG ================= */}
      <Dialog
        open={deleteAllOpen}
        onClose={() => setDeleteAllOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: c.cardBg,
            borderRadius: "16px",
            border: `1px solid ${c.border08}`,
            backgroundImage: "none",
            m: { xs: 1.5, sm: 4 },
            width: { xs: "calc(100% - 24px)", sm: "100%" },
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete All Entries?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: c.muted }}>
            Delete all entries on this page? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteAllOpen(false)}
            disabled={deleting}
            sx={{ color: c.muted, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAll}
            disabled={deleting}
            variant="contained"
            sx={{
              bgcolor: "#f43f5e",
              color: "#fff",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 3,
              "&:hover": { bgcolor: "#e11d48" },
            }}
          >
            {deleting ? "Deleting..." : "Delete All"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DailyCashSummary;