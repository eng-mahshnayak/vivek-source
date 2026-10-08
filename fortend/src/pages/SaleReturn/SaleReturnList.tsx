



// // import React, { useEffect, useState, useMemo } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// // import {
// //   Box,
// //   Button,
// //   Typography,
// //   Chip,
// //   IconButton,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogContentText,
// //   DialogActions,
// //   CircularProgress,
// //   TextField,
// //   Pagination,
// //   Tooltip,
// //   Fab,
// //   Grid,
// // } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// // import {
// //   Refresh as RefreshIcon,
// //   Delete as DeleteIcon,
// //   Visibility as ViewIcon,
// //   Edit as EditIcon,
// //   AssignmentReturn,
// //   FiberManualRecord,
// //   Receipt,
// //   ArrowBack,
// //   Home as HomeIcon,
// //   Close as CloseIcon,
// //   Search as SearchIcon,
// //   FilterAlt as FilterIcon,
// //   Clear as ClearIcon,
// //   AccountBalanceWallet,
// //   Functions,
// //   Inventory2,
// // } from "@mui/icons-material";

// // // ===================== TYPES =====================

// // interface ReturnItemDetail {
// //   productId: string;
// //   itemName: string;
// //   mrp: number;
// //   rate: number;
// //   quantity: number;
// //   totalAmount?: number;
// // }

// // interface ReturnRecord {
// //   _id: string;
// //   items: ReturnItemDetail[];
// //   totalValue: number;
// //   date: string;
// //   createdAt: string;
// //   updatedAt: string;
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

// // /* ===== NEW: Analytical Summary Bar ===== */
// // const AnalyticsBar = styled(Box)(() => ({
// //   backgroundColor: "#0d1527",
// //   borderRadius: "16px",
// //   border: "1px solid rgba(56, 189, 248, 0.25)",
// //   padding: "16px 20px",
// //   marginBottom: "16px",
// //   boxShadow: "0 8px 24px rgba(56, 189, 248, 0.08)",
// //   flexShrink: 0,
// //   position: "relative",
// //   overflow: "hidden",
// //   "&::before": {
// //     content: '""',
// //     position: "absolute",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     height: "2px",
// //     background:
// //       "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent)",
// //   },
// // }));

// // const StatCard = styled(Box)<{ accent: string }>(({ accent }) => ({
// //   backgroundColor: "#111827",
// //   borderRadius: "12px",
// //   border: `1px solid ${accent}22`,
// //   padding: "12px 14px",
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "12px",
// //   transition: "all 0.25s ease",
// //   "&:hover": {
// //     transform: "translateY(-2px)",
// //     borderColor: `${accent}66`,
// //     boxShadow: `0 8px 20px ${accent}22`,
// //   },
// // }));

// // const StyledTextField = styled(TextField)(() => ({
// //   "& .MuiOutlinedInput-root": {
// //     borderRadius: "10px",
// //     backgroundColor: "#090d16",
// //     color: "#ffffff",
// //     height: "42px",
// //     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
// //     "&:hover fieldset": { borderColor: "rgba(56, 189, 248, 0.4)" },
// //     "&.Mui-focused fieldset": {
// //       borderColor: "#38bdf8",
// //       borderWidth: "1.5px",
// //     },
// //   },
// //   "& .MuiOutlinedInput-input": {
// //     color: "#ffffff",
// //     fontSize: "0.85rem",
// //     padding: "10px 12px",
// //     "&::placeholder": { color: "#6b7280", opacity: 1 },
// //     "&::-webkit-calendar-picker-indicator": {
// //       filter: "invert(1)",
// //       cursor: "pointer",
// //     },
// //   },
// // }));

// // const TableContainerDark = styled(Box)(() => ({
// //   backgroundColor: "#0d1527",
// //   borderRadius: "16px",
// //   border: "1px solid rgba(255, 255, 255, 0.08)",
// //   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
// //   overflow: "hidden",
// //   marginBottom: "16px",
// //   display: "flex",
// //   flexDirection: "column",
// //   flex: 1,
// //   minHeight: 0,
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
// //     padding: "16px 12px",
// //     borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
// //     textAlign: "left",
// //     whiteSpace: "nowrap",
// //     backgroundColor: "#111827",
// //   },
// //   "& tbody tr": {
// //     transition: "all 0.2s ease",
// //     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
// //   },
// //   "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.05)" },
// //   "& tbody td": {
// //     color: "#e5e7eb",
// //     fontSize: "0.85rem",
// //     padding: "14px 12px",
// //     textAlign: "left",
// //   },
// // }));

// // // ===================== HELPERS =====================

// // const getRecordTotal = (r: ReturnRecord): number => {
// //   if (typeof r?.totalValue === "number") return r.totalValue;
// //   if (Array.isArray(r?.items)) {
// //     return r.items.reduce(
// //       (sum, it) => sum + (Number(it?.quantity) || 0) * (Number(it?.rate) || 0),
// //       0
// //     );
// //   }
// //   return 0;
// // };

// // const getItemTotal = (it: ReturnItemDetail): number => {
// //   if (typeof it?.totalAmount === "number") return it.totalAmount;
// //   return (Number(it?.quantity) || 0) * (Number(it?.rate) || 0);
// // };

// // const formatDate = (dateString: string) => {
// //   return new Date(dateString).toLocaleDateString("en-IN", {
// //     year: "numeric",
// //     month: "short",
// //     day: "numeric",
// //   });
// // };

// // const formatMoney = (n: number) =>
// //   `₹ ${(Number(n) || 0).toLocaleString("en-IN", {
// //     minimumFractionDigits: 0,
// //     maximumFractionDigits: 2,
// //   })}`;

// // // ===================== MAIN COMPONENT =====================

// // const SaleReturnList: React.FC = () => {
// //   const navigate = useNavigate();

// //   const [data, setData] = useState<ReturnRecord[]>([]);
// //   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
// //   const [viewDialogOpen, setViewDialogOpen] = useState(false);
// //   const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
// //   const [selectedRecord, setSelectedRecord] = useState<ReturnRecord | null>(null);
// //   const [selectedId, setSelectedId] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [deleting, setDeleting] = useState(false);

// //   // ✅ Grand total from backend (fallback = page sum)
// //   const [grandTotal, setGrandTotal] = useState(0);

// //   // Filters
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [appliedFrom, setAppliedFrom] = useState("");
// //   const [appliedTo, setAppliedTo] = useState("");
// //   const [search, setSearch] = useState("");
// //   const [appliedSearch, setAppliedSearch] = useState("");

// //   // Pagination
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(10);
// //   const [totalEntries, setTotalEntries] = useState(0);
// //   const [totalPages, setTotalPages] = useState(1);

// //   // ===================== FETCH =====================
// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);

// //       const params: any = { page, limit };
// //       if (appliedFrom) params.from = appliedFrom;
// //       if (appliedTo) params.to = appliedTo;
// //       if (appliedSearch.trim()) params.search = appliedSearch.trim();

// //       const res = await axios.get(`${API_URL}/return-items`, {
// //         params,
// //         ...getAuthHeaders(),
// //       });

// //       if (res.data?.success === true) {
// //         setData(res.data.data || []);

// //         // ✅ Support multiple grandTotal key names
// //         const gt =
// //           res.data.grandTotal ??
// //           res.data.totalValue ??
// //           res.data.totalSum ??
// //           res.data.totalReturned ??
// //           0;
// //         setGrandTotal(Number(gt) || 0);

// //         const count =
// //           res.data.totalCount ?? res.data.total ?? res.data.count ?? 0;
// //         const pages =
// //           res.data.totalPages ??
// //           res.data.pages ??
// //           Math.max(1, Math.ceil((count || 0) / limit));
// //         setTotalEntries(count);
// //         setTotalPages(pages);
// //       } else if (res.data?.message === "Unauthorized") {
// //         toast.error("Please login again");
// //         localStorage.removeItem("erptoken");
// //         navigate("/login");
// //       } else {
// //         toast.error(res.data?.message || "Failed to fetch return items");
// //         setData([]);
// //       }
// //     } catch (error: any) {
// //       if (error.response?.data?.message === "Unauthorized") {
// //         localStorage.removeItem("erptoken");
// //         navigate("/login");
// //       } else {
// //         toast.error(error.response?.data?.message || "Failed to fetch data");
// //       }
// //       setData([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [page, limit, appliedFrom, appliedTo, appliedSearch]);

// //   // ===================== FILTER HANDLERS =====================
// //   const handleApplyFilters = () => {
// //     if (fromDate && toDate && fromDate > toDate) {
// //       toast.error("From date cannot be after To date");
// //       return;
// //     }
// //     setAppliedFrom(fromDate);
// //     setAppliedTo(toDate);
// //     setAppliedSearch(search);
// //     setPage(1);
// //   };

// //   const handleClearFilters = () => {
// //     setFromDate("");
// //     setToDate("");
// //     setSearch("");
// //     setAppliedFrom("");
// //     setAppliedTo("");
// //     setAppliedSearch("");
// //     setPage(1);
// //   };

// //   const hasActiveFilters = !!(appliedFrom || appliedTo || appliedSearch);

// //   // ===================== ✅ ANALYTICS (Derived) =====================
// //   const analytics = useMemo(() => {
// //     const pageCount = data.length;

// //     // Current page sum
// //     const pageSum = data.reduce((s, r) => s + getRecordTotal(r), 0);

// //     // Use backend grand total if available, else fallback to page sum
// //     const total = grandTotal > 0 ? grandTotal : pageSum;

// //     const avgPerRecord =
// //       totalEntries > 0
// //         ? total / totalEntries
// //         : pageCount > 0
// //         ? total / pageCount
// //         : 0;

// //     // Total items returned (across current page)
// //     const totalItems = data.reduce(
// //       (s, r) => s + (r.items?.length || 0),
// //       0
// //     );

// //     // Total quantity (across current page)
// //     const totalQty = data.reduce(
// //       (s, r) =>
// //         s +
// //         (r.items || []).reduce(
// //           (q, i) => q + (Number(i.quantity) || 0),
// //           0
// //         ),
// //       0
// //     );

// //     return {
// //       total,
// //       count: totalEntries || pageCount,
// //       avgPerRecord,
// //       totalItems,
// //       totalQty,
// //     };
// //   }, [data, grandTotal, totalEntries]);

// //   // ===================== DELETE ONE =====================
// //   const handleDelete = async () => {
// //     if (!selectedId) return;

// //     try {
// //       setDeleting(true);
// //       const res = await axios.delete(
// //         `${API_URL}/return-items/${selectedId}`,
// //         getAuthHeaders()
// //       );

// //       if (res.data?.success === true) {
// //         toast.success("Return record deleted");
// //         setDeleteDialogOpen(false);
// //         setSelectedId(null);
// //         if (data.length === 1 && page > 1) {
// //           setPage((p) => p - 1);
// //         } else {
// //           fetchData();
// //         }
// //       } else if (res.data?.message === "Unauthorized") {
// //         toast.error("Session expired! Please login again");
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(res.data?.message || "Failed to delete");
// //       }
// //     } catch (error: any) {
// //       console.error("Delete error:", error);
// //       if (error.response?.data?.message === "Unauthorized") {
// //         localStorage.removeItem("erptoken");
// //         navigate("/login");
// //       } else {
// //         toast.error(error.response?.data?.message || "Delete failed");
// //       }
// //     } finally {
// //       setDeleting(false);
// //     }
// //   };

// //   // ===================== DELETE ALL =====================
// //   const handleDeleteAll = async () => {
// //     try {
// //       setDeleting(true);
// //       const res = await axios.delete(
// //         `${API_URL}/return-items/delete-all`,
// //         getAuthHeaders()
// //       );

// //       if (res.data?.success === true) {
// //         toast.success(res.data?.message || "All return records deleted");
// //         setDeleteAllDialogOpen(false);
// //         setPage(1);
// //         fetchData();
// //       } else {
// //         toast.error(res.data?.message || "Failed to delete all");
// //       }
// //     } catch (error: any) {
// //       toast.error(error.response?.data?.message || "Delete all failed");
// //     } finally {
// //       setDeleting(false);
// //     }
// //   };

// //   // Current page total
// //   const pageTotal = data.reduce((s, r) => s + getRecordTotal(r), 0);

// //   // ===================== RENDER =====================
// //   return (
// //     <Box
// //       sx={{
// //         height: "85vh",
// //         maxHeight: "100vh",
// //         overflow: "hidden",
// //         bgcolor: "#090d16",
// //         px: { xs: 1.5, sm: 2, md: 3 },
// //         py: { xs: 1.5, md: 2.5 },
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
// //         {/* ================= HEADER BANNER ================= */}
// //         <DarkBanner>
// //           <Box
// //             display="flex"
// //             flexDirection={{ xs: "column", md: "row" }}
// //             justifyContent="space-between"
// //             alignItems={{ xs: "flex-start", md: "center" }}
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
// //                     borderColor: "#38bdf8",
// //                     color: "#38bdf8",
// //                     bgcolor: "rgba(56, 189, 248, 0.08)",
// //                   },
// //                 }}
// //               >
// //                 Dashboard
// //               </Button>

// //               <Box>
// //                 <Box display="flex" alignItems="center" gap={1} mb={0.5}>
// //                   <FiberManualRecord sx={{ fontSize: 10, color: "#38bdf8" }} />
// //                   <Typography
// //                     variant="caption"
// //                     fontWeight="bold"
// //                     sx={{
// //                       color: "#38bdf8",
// //                       letterSpacing: 0.5,
// //                       fontSize: "0.7rem",
// //                     }}
// //                   >
// //                     Return Management
// //                   </Typography>
// //                 </Box>

// //                 <Typography
// //                   variant="h5"
// //                   fontWeight="800"
// //                   sx={{
// //                     fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.6rem" },
// //                     letterSpacing: 0.5,
// //                   }}
// //                 >
// //                   RETURN ITEMS LIST
// //                 </Typography>

// //                 {totalEntries > 0 && (
// //                   <Typography
// //                     variant="caption"
// //                     sx={{ color: "#9ca3af", mt: 0.5 }}
// //                   >
// //                     {totalEntries} total records
// //                   </Typography>
// //                 )}
// //               </Box>
// //             </Box>

// //             <Box display="flex" gap={1} flexWrap="wrap">
// //               <Button
// //                 variant="contained"
// //                 startIcon={<AssignmentReturn />}
// //                 onClick={() => navigate("/return-items/create")}
// //                 sx={{
// //                   bgcolor: "#3b82f6",
// //                   color: "#ffffff",
// //                   fontWeight: 700,
// //                   textTransform: "none",
// //                   borderRadius: "10px",
// //                   px: 2.5,
// //                   py: 1,
// //                   fontSize: "0.8rem",
// //                   boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
// //                   "&:hover": { bgcolor: "#2563eb" },
// //                 }}
// //               >
// //                 New Return Entry
// //               </Button>

// //               <Button
// //                 variant="outlined"
// //                 startIcon={<RefreshIcon />}
// //                 onClick={fetchData}
// //                 disabled={loading}
// //                 sx={{
// //                   color: "#e5e7eb",
// //                   borderColor: "rgba(255, 255, 255, 0.15)",
// //                   fontWeight: 700,
// //                   textTransform: "none",
// //                   borderRadius: "10px",
// //                   px: 2.5,
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
// //                 startIcon={<DeleteIcon />}
// //                 onClick={() => setDeleteAllDialogOpen(true)}
// //                 disabled={totalEntries === 0}
// //                 sx={{
// //                   color: "#f43f5e",
// //                   borderColor: "rgba(244, 63, 94, 0.3)",
// //                   fontWeight: 700,
// //                   textTransform: "none",
// //                   borderRadius: "10px",
// //                   px: 2.5,
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

// //         {/* ================= ANALYTICAL SUMMARY BAR (NEW) ================= */}
// //         <AnalyticsBar>
// //           <Grid container spacing={1.5}>
// //             {/* TOTAL RETURNED */}
// //             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
// //               <StatCard accent="#38bdf8">
// //                 <Box
// //                   sx={{
// //                     width: 42,
// //                     height: 42,
// //                     borderRadius: "10px",
// //                     bgcolor: "rgba(56, 189, 248, 0.15)",
// //                     color: "#38bdf8",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     flexShrink: 0,
// //                   }}
// //                 >
// //                   <AccountBalanceWallet sx={{ fontSize: 22 }} />
// //                 </Box>
// //                 <Box sx={{ minWidth: 0, flex: 1 }}>
// //                   <Typography
// //                     sx={{
// //                       color: "#9ca3af",
// //                       fontSize: "0.65rem",
// //                       fontWeight: 700,
// //                       letterSpacing: 0.8,
// //                       textTransform: "uppercase",
// //                     }}
// //                   >
// //                     Total Returned{hasActiveFilters ? " (Filtered)" : ""}
// //                   </Typography>
// //                   <Typography
// //                     sx={{
// //                       color: "#38bdf8",
// //                       fontWeight: 900,
// //                       fontSize: { xs: "1.05rem", sm: "1.2rem" },
// //                       mt: 0.3,
// //                       letterSpacing: 0.3,
// //                       textShadow: "0 0 14px rgba(56, 189, 248, 0.4)",
// //                       lineHeight: 1.1,
// //                     }}
// //                   >
// //                     {loading ? "..." : formatMoney(analytics.total)}
// //                   </Typography>
// //                 </Box>
// //               </StatCard>
// //             </Grid>

// //             {/* TOTAL RECORDS */}
// //             <Grid size={{ xs: 6, sm: 6, md: 3 }}>
// //               <StatCard accent="#c084fc">
// //                 <Box
// //                   sx={{
// //                     width: 42,
// //                     height: 42,
// //                     borderRadius: "10px",
// //                     bgcolor: "rgba(192, 132, 252, 0.15)",
// //                     color: "#c084fc",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     flexShrink: 0,
// //                   }}
// //                 >
// //                   <Receipt sx={{ fontSize: 22 }} />
// //                 </Box>
// //                 <Box sx={{ minWidth: 0, flex: 1 }}>
// //                   <Typography
// //                     sx={{
// //                       color: "#9ca3af",
// //                       fontSize: "0.65rem",
// //                       fontWeight: 700,
// //                       letterSpacing: 0.8,
// //                       textTransform: "uppercase",
// //                     }}
// //                   >
// //                     Total Records
// //                   </Typography>
// //                   <Typography
// //                     sx={{
// //                       color: "#c084fc",
// //                       fontWeight: 900,
// //                       fontSize: { xs: "1.05rem", sm: "1.2rem" },
// //                       mt: 0.3,
// //                       letterSpacing: 0.3,
// //                       lineHeight: 1.1,
// //                     }}
// //                   >
// //                     {loading ? "..." : analytics.count}
// //                   </Typography>
// //                 </Box>
// //               </StatCard>
// //             </Grid>

// //             {/* ITEMS RETURNED */}
// //             <Grid size={{ xs: 6, sm: 6, md: 3 }}>
// //               <StatCard accent="#34d399">
// //                 <Box
// //                   sx={{
// //                     width: 42,
// //                     height: 42,
// //                     borderRadius: "10px",
// //                     bgcolor: "rgba(52, 211, 153, 0.15)",
// //                     color: "#34d399",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     flexShrink: 0,
// //                   }}
// //                 >
// //                   <Inventory2 sx={{ fontSize: 22 }} />
// //                 </Box>
// //                 <Box sx={{ minWidth: 0, flex: 1 }}>
// //                   <Typography
// //                     sx={{
// //                       color: "#9ca3af",
// //                       fontSize: "0.65rem",
// //                       fontWeight: 700,
// //                       letterSpacing: 0.8,
// //                       textTransform: "uppercase",
// //                     }}
// //                   >
// //                     Items Returned
// //                   </Typography>
// //                   <Typography
// //                     sx={{
// //                       color: "#34d399",
// //                       fontWeight: 900,
// //                       fontSize: { xs: "1.05rem", sm: "1.2rem" },
// //                       mt: 0.3,
// //                       letterSpacing: 0.3,
// //                       lineHeight: 1.1,
// //                     }}
// //                   >
// //                     {loading ? "..." : analytics.totalItems}
// //                   </Typography>
// //                   <Typography
// //                     sx={{
// //                       color: "#9ca3af",
// //                       fontSize: "0.65rem",
// //                       fontWeight: 600,
// //                       mt: 0.2,
// //                     }}
// //                   >
// //                     Qty: {analytics.totalQty}
// //                   </Typography>
// //                 </Box>
// //               </StatCard>
// //             </Grid>

// //             {/* AVG / RECORD */}
// //             <Grid size={{ xs: 6, sm: 6, md: 3 }}>
// //               <StatCard accent="#fbbf24">
// //                 <Box
// //                   sx={{
// //                     width: 42,
// //                     height: 42,
// //                     borderRadius: "10px",
// //                     bgcolor: "rgba(251, 191, 36, 0.15)",
// //                     color: "#fbbf24",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     flexShrink: 0,
// //                   }}
// //                 >
// //                   <Functions sx={{ fontSize: 22 }} />
// //                 </Box>
// //                 <Box sx={{ minWidth: 0, flex: 1 }}>
// //                   <Typography
// //                     sx={{
// //                       color: "#9ca3af",
// //                       fontSize: "0.65rem",
// //                       fontWeight: 700,
// //                       letterSpacing: 0.8,
// //                       textTransform: "uppercase",
// //                     }}
// //                   >
// //                     Avg / Record
// //                   </Typography>
// //                   <Typography
// //                     sx={{
// //                       color: "#fbbf24",
// //                       fontWeight: 900,
// //                       fontSize: { xs: "1.05rem", sm: "1.2rem" },
// //                       mt: 0.3,
// //                       letterSpacing: 0.3,
// //                       lineHeight: 1.1,
// //                     }}
// //                   >
// //                     {loading ? "..." : formatMoney(analytics.avgPerRecord)}
// //                   </Typography>
// //                 </Box>
// //               </StatCard>
// //             </Grid>
// //           </Grid>
// //         </AnalyticsBar>

// //         {/* ================= FILTER BAR ================= */}
// //         <FilterBar>
// //           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
// //             <StyledTextField
// //               type="date"
// //               size="small"
// //               value={fromDate}
// //               onChange={(e) => setFromDate(e.target.value)}
// //               sx={{ width: 160 }}
// //             />
// //             <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
// //               to
// //             </Typography>
// //             <StyledTextField
// //               type="date"
// //               size="small"
// //               value={toDate}
// //               onChange={(e) => setToDate(e.target.value)}
// //               sx={{ width: 160 }}
// //             />

// //             <Box sx={{ flex: 1, minWidth: 220 }}>
// //               <StyledTextField
// //                 fullWidth
// //                 placeholder="Search item name..."
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Enter") handleApplyFilters();
// //                 }}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <Box
// //                       component="span"
// //                       sx={{ mr: 1, display: "flex", alignItems: "center" }}
// //                     >
// //                       <SearchIcon sx={{ color: "#6b7280", fontSize: 18 }} />
// //                     </Box>
// //                   ),
// //                 }}
// //               />
// //             </Box>

// //             <Button
// //               size="small"
// //               variant="contained"
// //               startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
// //               onClick={handleApplyFilters}
// //               sx={{
// //                 bgcolor: "#3b82f6",
// //                 color: "#fff",
// //                 fontWeight: 700,
// //                 textTransform: "none",
// //                 borderRadius: "8px",
// //                 px: 2,
// //                 fontSize: "0.75rem",
// //                 "&:hover": { bgcolor: "#2563eb" },
// //               }}
// //             >
// //               Apply
// //             </Button>

// //             <Button
// //               size="small"
// //               variant="outlined"
// //               startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
// //               onClick={handleClearFilters}
// //               disabled={!hasActiveFilters && !fromDate && !toDate && !search}
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

// //             {hasActiveFilters && (
// //               <Chip
// //                 label={`Active filter${
// //                   appliedFrom || appliedTo
// //                     ? `: ${appliedFrom || "..."} → ${appliedTo || "..."}`
// //                     : ""
// //                 }${appliedSearch ? ` | "${appliedSearch}"` : ""}`}
// //                 size="small"
// //                 sx={{
// //                   bgcolor: "rgba(56, 189, 248, 0.15)",
// //                   color: "#38bdf8",
// //                   border: "1px solid rgba(56, 189, 248, 0.4)",
// //                   fontWeight: 700,
// //                   fontSize: "0.7rem",
// //                   height: "26px",
// //                 }}
// //               />
// //             )}

// //             {pageTotal > 0 && (
// //               <Box
// //                 sx={{
// //                   ml: { md: "auto" },
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: 1,
// //                   bgcolor: "rgba(56, 189, 248, 0.1)",
// //                   border: "1px solid rgba(56, 189, 248, 0.3)",
// //                   borderRadius: "10px",
// //                   px: 2,
// //                   py: 0.8,
// //                 }}
// //               >
// //                 <Receipt sx={{ fontSize: 16, color: "#38bdf8" }} />
// //                 <Typography
// //                   sx={{
// //                     color: "#38bdf8",
// //                     fontWeight: 700,
// //                     fontSize: "0.8rem",
// //                   }}
// //                 >
// //                   Page Total: ₹ {pageTotal.toLocaleString()}
// //                 </Typography>
// //               </Box>
// //             )}
// //           </Box>
// //         </FilterBar>

// //         {/* ================= TABLE ================= */}
// //         <TableContainerDark>
// //           <Box
// //             display="flex"
// //             justifyContent="space-between"
// //             alignItems="center"
// //             px={3}
// //             py={2}
// //             sx={{
// //               borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <Typography
// //               sx={{
// //                 color: "#ffffff",
// //                 fontWeight: 800,
// //                 fontSize: "0.95rem",
// //                 letterSpacing: 0.5,
// //               }}
// //             >
// //               RETURN ITEMS LIST
// //             </Typography>
// //             <Chip
// //               label={`${totalEntries} Records`}
// //               size="small"
// //               sx={{
// //                 bgcolor: "rgba(56, 189, 248, 0.1)",
// //                 color: "#38bdf8",
// //                 border: "1px solid rgba(56, 189, 248, 0.3)",
// //                 fontWeight: 700,
// //                 fontSize: "0.7rem",
// //                 height: "26px",
// //               }}
// //             />
// //           </Box>

// //           <TableScrollArea>
// //             <ItemsTable>
// //               <thead>
// //                 <tr>
// //                   <th style={{ textAlign: "center", width: "50px" }}>#</th>
// //                   <th style={{ textAlign: "center" }}>Date</th>
// //                   <th style={{ textAlign: "center" }}>Items</th>
// //                   <th style={{ textAlign: "center" }}>Total Qty</th>
// //                   <th style={{ textAlign: "center" }}>Return Total</th>
// //                   <th style={{ textAlign: "center", width: "140px" }}>
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {loading ? (
// //                   <tr>
// //                     <td
// //                       colSpan={6}
// //                       style={{ textAlign: "center", padding: "40px 12px" }}
// //                     >
// //                       <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
// //                       <Typography
// //                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
// //                       >
// //                         Loading return items...
// //                       </Typography>
// //                     </td>
// //                   </tr>
// //                 ) : data.length === 0 ? (
// //                   <tr>
// //                     <td
// //                       colSpan={6}
// //                       style={{ textAlign: "center", padding: "40px 12px" }}
// //                     >
// //                       <Receipt
// //                         style={{
// //                           fontSize: 44,
// //                           color: "#374151",
// //                           marginBottom: 8,
// //                         }}
// //                       />
// //                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
// //                         No return records found
// //                       </Typography>
// //                       <Typography
// //                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
// //                       >
// //                         {hasActiveFilters
// //                           ? "Try changing the filters"
// //                           : "Click 'New Return Entry' to create one"}
// //                       </Typography>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   data.map((row, idx) => {
// //                     const totalQty = (row.items || []).reduce(
// //                       (s, i) => s + (i.quantity || 0),
// //                       0
// //                     );
// //                     const rowTotal = getRecordTotal(row);

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
// //                               fontWeight: 600,
// //                               height: "24px",
// //                             }}
// //                           />
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Chip
// //                             label={`${(row.items || []).length} items`}
// //                             size="small"
// //                             sx={{
// //                               bgcolor: "rgba(192, 132, 252, 0.1)",
// //                               color: "#c084fc",
// //                               border: "1px solid rgba(192, 132, 252, 0.3)",
// //                               fontSize: "0.7rem",
// //                               fontWeight: 600,
// //                               height: "24px",
// //                             }}
// //                           />
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Chip
// //                             label={totalQty}
// //                             size="small"
// //                             sx={{
// //                               bgcolor: "rgba(56, 189, 248, 0.1)",
// //                               color: "#38bdf8",
// //                               border: "1px solid rgba(56, 189, 248, 0.3)",
// //                               fontSize: "0.7rem",
// //                               fontWeight: 700,
// //                               height: "24px",
// //                             }}
// //                           />
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Typography
// //                             sx={{
// //                               color: "#38bdf8",
// //                               fontWeight: 800,
// //                               fontSize: "0.95rem",
// //                             }}
// //                           >
// //                             ₹ {rowTotal.toLocaleString()}
// //                           </Typography>
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <IconButton
// //                             size="small"
// //                             onClick={() => {
// //                               setSelectedRecord(row);
// //                               setViewDialogOpen(true);
// //                             }}
// //                             sx={{
// //                               color: "#34d399",
// //                               "&:hover": {
// //                                 bgcolor: "rgba(52, 211, 153, 0.1)",
// //                               },
// //                             }}
// //                           >
// //                             <ViewIcon fontSize="small" />
// //                           </IconButton>

// //                           <IconButton
// //                             size="small"
// //                             onClick={() =>
// //                               navigate(`/return-items/edit/${row._id}`)
// //                             }
// //                             sx={{
// //                               color: "#38bdf8",
// //                               "&:hover": {
// //                                 bgcolor: "rgba(56, 189, 248, 0.1)",
// //                               },
// //                             }}
// //                           >
// //                             <EditIcon fontSize="small" />
// //                           </IconButton>

// //                           <IconButton
// //                             size="small"
// //                             onClick={() => {
// //                               setSelectedId(row._id);
// //                               setDeleteDialogOpen(true);
// //                             }}
// //                             sx={{
// //                               color: "#f43f5e",
// //                               "&:hover": {
// //                                 bgcolor: "rgba(244, 63, 94, 0.1)",
// //                               },
// //                             }}
// //                           >
// //                             <DeleteIcon fontSize="small" />
// //                           </IconButton>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })
// //                 )}
// //               </tbody>
// //             </ItemsTable>
// //           </TableScrollArea>

// //           {/* ================= PAGINATION BAR ================= */}
// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               flexWrap: "wrap",
// //               gap: 1.5,
// //               px: 3,
// //               py: 1.8,
// //               borderTop: "1px solid rgba(255, 255, 255, 0.08)",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <Box display="flex" alignItems="center" gap={1.5}>
// //               <Typography
// //                 sx={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600 }}
// //               >
// //                 Rows per page:
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
// //                     fontSize: "0.7rem",
// //                     height: "26px",
// //                     cursor: "pointer",
// //                   }}
// //                 />
// //               ))}
// //               <Typography
// //                 sx={{ color: "#6b7280", fontSize: "0.75rem", ml: 1 }}
// //               >
// //                 {totalEntries > 0
// //                   ? `${(page - 1) * limit + 1}–${Math.min(
// //                       page * limit,
// //                       totalEntries
// //                     )} of ${totalEntries}`
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
// //                   borderColor: "rgba(255, 255, 255, 0.1)",
// //                   fontWeight: 700,
// //                   fontSize: "0.8rem",
// //                   "&:hover": {
// //                     bgcolor: "rgba(56, 189, 248, 0.1)",
// //                     color: "#38bdf8",
// //                   },
// //                 },
// //                 "& .Mui-selected": {
// //                   bgcolor: "rgba(56, 189, 248, 0.2) !important",
// //                   color: "#38bdf8 !important",
// //                   borderColor: "rgba(56, 189, 248, 0.5) !important",
// //                 },
// //               }}
// //             />
// //           </Box>
// //         </TableContainerDark>
// //       </Box>

// //       {/* ================= FLOATING DASHBOARD BUTTON ================= */}
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

// //       {/* ================= VIEW DIALOG ================= */}
// //       <Dialog
// //         open={viewDialogOpen}
// //         onClose={() => setViewDialogOpen(false)}
// //         maxWidth="md"
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
// //         {selectedRecord && (
// //           <>
// //             <DialogTitle
// //               sx={{
// //                 color: "#ffffff",
// //                 fontWeight: 800,
// //                 fontSize: "1.1rem",
// //                 borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //               }}
// //             >
// //               <Box display="flex" alignItems="center" gap={1.5}>
// //                 <Box
// //                   sx={{
// //                     width: 32,
// //                     height: 32,
// //                     borderRadius: "8px",
// //                     bgcolor: "#0c2a3a",
// //                     color: "#38bdf8",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                   }}
// //                 >
// //                   <ViewIcon sx={{ fontSize: 18 }} />
// //                 </Box>
// //                 <Box>
// //                   <Typography
// //                     sx={{
// //                       color: "#38bdf8",
// //                       fontWeight: 800,
// //                       fontSize: "0.9rem",
// //                       letterSpacing: 1,
// //                       textTransform: "uppercase",
// //                     }}
// //                   >
// //                     Return Details
// //                   </Typography>
// //                   <Typography
// //                     sx={{
// //                       color: "#9ca3af",
// //                       fontSize: "0.72rem",
// //                       fontWeight: 500,
// //                     }}
// //                   >
// //                     {formatDate(selectedRecord.date)}
// //                   </Typography>
// //                 </Box>
// //               </Box>
// //               <IconButton
// //                 onClick={() => setViewDialogOpen(false)}
// //                 size="small"
// //                 sx={{
// //                   color: "#9ca3af",
// //                   "&:hover": {
// //                     color: "#f43f5e",
// //                     bgcolor: "rgba(244, 63, 94, 0.1)",
// //                   },
// //                 }}
// //               >
// //                 <CloseIcon />
// //               </IconButton>
// //             </DialogTitle>

// //             <DialogContent sx={{ p: 3 }}>
// //               <Box
// //                 sx={{
// //                   bgcolor: "#111827",
// //                   borderRadius: "12px",
// //                   border: "1px solid rgba(255, 255, 255, 0.08)",
// //                   overflow: "hidden",
// //                 }}
// //               >
// //                 <ItemsTable>
// //                   <thead>
// //                     <tr>
// //                       <th style={{ textAlign: "center" }}>#</th>
// //                       <th>Item</th>
// //                       <th style={{ textAlign: "center" }}>MRP</th>
// //                       <th style={{ textAlign: "center" }}>Rate</th>
// //                       <th style={{ textAlign: "center" }}>Qty</th>
// //                       <th style={{ textAlign: "center" }}>Amount</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {(selectedRecord.items || []).map((item, idx) => (
// //                       <tr key={idx}>
// //                         <td style={{ textAlign: "center" }}>{idx + 1}</td>
// //                         <td>
// //                           <Typography
// //                             sx={{
// //                               color: "#ffffff",
// //                               fontWeight: 600,
// //                               fontSize: "0.85rem",
// //                             }}
// //                           >
// //                             {item.itemName}
// //                           </Typography>
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>₹ {item.mrp}</td>
// //                         <td style={{ textAlign: "center" }}>₹ {item.rate}</td>
// //                         <td style={{ textAlign: "center" }}>
// //                           {item.quantity}
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Typography
// //                             sx={{
// //                               color: "#38bdf8",
// //                               fontWeight: 700,
// //                               fontSize: "0.85rem",
// //                             }}
// //                           >
// //                             ₹ {getItemTotal(item).toLocaleString()}
// //                           </Typography>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </ItemsTable>
// //               </Box>

// //               <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
// //                 <Box
// //                   sx={{
// //                     bgcolor: "rgba(56, 189, 248, 0.1)",
// //                     border: "1px solid rgba(56, 189, 248, 0.3)",
// //                     borderRadius: "12px",
// //                     px: 3,
// //                     py: 1.5,
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: 2,
// //                   }}
// //                 >
// //                   <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
// //                     Total Return Value:
// //                   </Typography>
// //                   <Typography
// //                     sx={{
// //                       color: "#38bdf8",
// //                       fontWeight: 800,
// //                       fontSize: "1.3rem",
// //                     }}
// //                   >
// //                     ₹ {getRecordTotal(selectedRecord).toLocaleString()}
// //                   </Typography>
// //                 </Box>
// //               </Box>
// //             </DialogContent>

// //             <DialogActions
// //               sx={{
// //                 p: 2.5,
// //                 borderTop: "1px solid rgba(255, 255, 255, 0.08)",
// //                 gap: 1,
// //               }}
// //             >
// //               <Button
// //                 onClick={() => setViewDialogOpen(false)}
// //                 sx={{
// //                   color: "#9ca3af",
// //                   textTransform: "none",
// //                   fontWeight: 600,
// //                   borderRadius: "10px",
// //                 }}
// //               >
// //                 Close
// //               </Button>

// //               <Button
// //                 onClick={() => {
// //                   setViewDialogOpen(false);
// //                   navigate(`/return-items/edit/${selectedRecord._id}`);
// //                 }}
// //                 variant="contained"
// //                 sx={{
// //                   bgcolor: "#38bdf8",
// //                   color: "#ffffff",
// //                   textTransform: "none",
// //                   fontWeight: 700,
// //                   borderRadius: "10px",
// //                   px: 3,
// //                   "&:hover": { bgcolor: "#0ea5e9" },
// //                 }}
// //               >
// //                 Edit
// //               </Button>
// //             </DialogActions>
// //           </>
// //         )}
// //       </Dialog>

// //       {/* ================= DELETE ONE DIALOG ================= */}
// //       <Dialog
// //         open={deleteDialogOpen}
// //         onClose={() => setDeleteDialogOpen(false)}
// //         PaperProps={{
// //           sx: {
// //             bgcolor: "#111827",
// //             borderRadius: "16px",
// //             border: "1px solid rgba(255, 255, 255, 0.08)",
// //           },
// //         }}
// //       >
// //         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
// //           Confirm Delete
// //         </DialogTitle>
// //         <DialogContent>
// //           <DialogContentText sx={{ color: "#9ca3af" }}>
// //             Are you sure you want to delete this return record? This action
// //             cannot be undone.
// //           </DialogContentText>
// //         </DialogContent>
// //         <DialogActions sx={{ px: 3, pb: 2.5 }}>
// //           <Button
// //             onClick={() => setDeleteDialogOpen(false)}
// //             disabled={deleting}
// //             sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}
// //           >
// //             Cancel
// //           </Button>
// //           <Button
// //             onClick={handleDelete}
// //             disabled={deleting}
// //             variant="contained"
// //             sx={{
// //               bgcolor: "#f43f5e",
// //               color: "#ffffff",
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
// //         open={deleteAllDialogOpen}
// //         onClose={() => setDeleteAllDialogOpen(false)}
// //         PaperProps={{
// //           sx: {
// //             bgcolor: "#111827",
// //             borderRadius: "16px",
// //             border: "1px solid rgba(255, 255, 255, 0.08)",
// //           },
// //         }}
// //       >
// //         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
// //           Delete All Return Records
// //         </DialogTitle>
// //         <DialogContent>
// //           <DialogContentText sx={{ color: "#9ca3af" }}>
// //             Are you sure you want to delete ALL return records? This action
// //             cannot be undone.
// //           </DialogContentText>
// //         </DialogContent>
// //         <DialogActions sx={{ px: 3, pb: 2.5 }}>
// //           <Button
// //             onClick={() => setDeleteAllDialogOpen(false)}
// //             disabled={deleting}
// //             sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}
// //           >
// //             Cancel
// //           </Button>
// //           <Button
// //             onClick={handleDeleteAll}
// //             disabled={deleting}
// //             variant="contained"
// //             sx={{
// //               bgcolor: "#f43f5e",
// //               color: "#ffffff",
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

// // export default SaleReturnList;



// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   Box,
//   Button,
//   Typography,
//   Chip,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   CircularProgress,
//   TextField,
//   Pagination,
//   Tooltip,
//   Fab,
//   Grid,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   Refresh as RefreshIcon,
//   Delete as DeleteIcon,
//   Visibility as ViewIcon,
//   Edit as EditIcon,
//   AssignmentReturn,
//   FiberManualRecord,
//   Receipt,
//   ArrowBack,
//   Home as HomeIcon,
//   Close as CloseIcon,
//   Search as SearchIcon,
//   FilterAlt as FilterIcon,
//   Clear as ClearIcon,
//   AccountBalanceWallet,
//   Functions,
//   Inventory2,
// } from "@mui/icons-material";

// // ===================== TYPES =====================

// interface ReturnItemDetail {
//   productId: string;
//   itemName: string;
//   mrp: number;
//   rate: number;
//   quantity: number;
//   totalAmount?: number;
// }

// interface ReturnRecord {
//   _id: string;
//   items: ReturnItemDetail[];
//   totalValue: number;
//   date: string;
//   createdAt: string;
//   updatedAt: string;
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
//   padding: "18px 20px",
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

// const AnalyticsBar = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(56, 189, 248, 0.25)",
//   padding: "16px 18px",
//   marginBottom: "14px",
//   boxShadow: "0 8px 24px rgba(56, 189, 248, 0.08)",
//   flexShrink: 0,
//   position: "relative",
//   overflow: "hidden",
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: "2px",
//     background:
//       "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent)",
//   },
// }));

// const StatCard = styled(Box)<{ accent: string }>(({ accent }) => ({
//   backgroundColor: "#111827",
//   borderRadius: "12px",
//   border: `1px solid ${accent}22`,
//   padding: "12px 14px",
//   display: "flex",
//   alignItems: "center",
//   gap: "12px",
//   height: "100%",
//   transition: "all 0.25s ease",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     borderColor: `${accent}66`,
//     boxShadow: `0 8px 20px ${accent}22`,
//   },
// }));

// /* Quick filter chip (This Month / Last Month / Today / Yesterday) */
// const QuickFilterChip = styled(Button)<{ active?: boolean }>(
//   ({ active }) => ({
//     borderRadius: "10px",
//     textTransform: "none",
//     fontWeight: 700,
//     fontSize: "0.75rem",
//     padding: "8px 18px",
//     minWidth: "auto",
//     whiteSpace: "nowrap",
//     backgroundColor: active ? "#38bdf8" : "rgba(56, 189, 248, 0.15)",
//     color: active ? "#0d1527" : "#38bdf8",
//     border: active
//       ? "1px solid #38bdf8"
//       : "1px solid rgba(56, 189, 248, 0.3)",
//     boxShadow: active ? "0 4px 14px rgba(56, 189, 248, 0.35)" : "none",
//     transition: "all 0.2s ease",
//     "&:hover": {
//       backgroundColor: active ? "#0ea5e9" : "rgba(56, 189, 248, 0.25)",
//       borderColor: "#38bdf8",
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
//     "&:hover fieldset": { borderColor: "rgba(56, 189, 248, 0.4)" },
//     "&.Mui-focused fieldset": {
//       borderColor: "#38bdf8",
//       borderWidth: "1.5px",
//     },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#ffffff",
//     fontSize: "0.85rem",
//     padding: "10px 12px",
//     "&::placeholder": { color: "#6b7280", opacity: 1 },
//     "&::-webkit-calendar-picker-indicator": {
//       filter: "invert(1)",
//       cursor: "pointer",
//     },
//   },
//   "& .MuiInputLabel-root": {
//     color: "#9ca3af",
//     fontSize: "0.8rem",
//     "&.Mui-focused": { color: "#38bdf8" },
//   },
// }));

// const TableContainerDark = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   overflow: "hidden",
//   marginBottom: "16px",
//   display: "flex",
//   flexDirection: "column",
//   flex: 1,
//   minHeight: 0,
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
//   minWidth: "720px",
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
//   "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.05)" },
//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "12px",
//     textAlign: "left",
//     whiteSpace: "nowrap",
//   },
// }));

// // ===================== HELPERS =====================

// const getRecordTotal = (r: ReturnRecord): number => {
//   if (typeof r?.totalValue === "number") return r.totalValue;
//   if (Array.isArray(r?.items)) {
//     return r.items.reduce(
//       (sum, it) => sum + (Number(it?.quantity) || 0) * (Number(it?.rate) || 0),
//       0
//     );
//   }
//   return 0;
// };

// const getItemTotal = (it: ReturnItemDetail): number => {
//   if (typeof it?.totalAmount === "number") return it.totalAmount;
//   return (Number(it?.quantity) || 0) * (Number(it?.rate) || 0);
// };

// const formatDate = (dateString: string) => {
//   return new Date(dateString).toLocaleDateString("en-IN", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// };

// const formatMoney = (n: number) =>
//   `₹ ${(Number(n) || 0).toLocaleString("en-IN", {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   })}`;

// const toInputDate = (d: Date) => {
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const getDatePreset = (
//   preset: "thisMonth" | "lastMonth" | "today" | "yesterday"
// ): { from: string; to: string } => {
//   const now = new Date();
//   const y = now.getFullYear();
//   const m = now.getMonth();

//   switch (preset) {
//     case "today": {
//       const d = toInputDate(now);
//       return { from: d, to: d };
//     }
//     case "yesterday": {
//       const yest = new Date(now);
//       yest.setDate(now.getDate() - 1);
//       const d = toInputDate(yest);
//       return { from: d, to: d };
//     }
//     case "thisMonth": {
//       const first = new Date(y, m, 1);
//       const last = new Date(y, m + 1, 0);
//       return { from: toInputDate(first), to: toInputDate(last) };
//     }
//     case "lastMonth": {
//       const first = new Date(y, m - 1, 1);
//       const last = new Date(y, m, 0);
//       return { from: toInputDate(first), to: toInputDate(last) };
//     }
//   }
// };

// // ===================== MAIN COMPONENT =====================

// const SaleReturnList: React.FC = () => {
//   const navigate = useNavigate();

//   const [data, setData] = useState<ReturnRecord[]>([]);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);
//   const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState<ReturnRecord | null>(null);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);
//   const [grandTotal, setGrandTotal] = useState(0);

//   // Filters
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [appliedFrom, setAppliedFrom] = useState("");
//   const [appliedTo, setAppliedTo] = useState("");
//   const [search, setSearch] = useState("");
//   const [appliedSearch, setAppliedSearch] = useState("");
//   const [activePreset, setActivePreset] = useState<
//     "thisMonth" | "lastMonth" | "today" | "yesterday" | ""
//   >("");

//   // Pagination
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalEntries, setTotalEntries] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   // ===================== FETCH =====================
//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const params: any = { page, limit };
//       if (appliedFrom) params.from = appliedFrom;
//       if (appliedTo) params.to = appliedTo;
//       if (appliedSearch.trim()) params.search = appliedSearch.trim();

//       const res = await axios.get(`${API_URL}/return-items`, {
//         params,
//         ...getAuthHeaders(),
//       });

//       if (res.data?.success === true) {
//         setData(res.data.data || []);

//         const gt =
//           res.data.grandTotal ??
//           res.data.totalValue ??
//           res.data.totalSum ??
//           res.data.totalReturned ??
//           0;
//         setGrandTotal(Number(gt) || 0);

//         const count =
//           res.data.totalCount ?? res.data.total ?? res.data.count ?? 0;
//         const pages =
//           res.data.totalPages ??
//           res.data.pages ??
//           Math.max(1, Math.ceil((count || 0) / limit));
//         setTotalEntries(count);
//         setTotalPages(pages);
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Please login again");
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(res.data?.message || "Failed to fetch return items");
//         setData([]);
//       }
//     } catch (error: any) {
//       if (error.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(error.response?.data?.message || "Failed to fetch data");
//       }
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, limit, appliedFrom, appliedTo, appliedSearch]);

//   // ===================== FILTER HANDLERS =====================
//   const handleApplyFilters = () => {
//     if (fromDate && toDate && fromDate > toDate) {
//       toast.error("From date cannot be after To date");
//       return;
//     }
//     setAppliedFrom(fromDate);
//     setAppliedTo(toDate);
//     setAppliedSearch(search);
//     setActivePreset("");
//     setPage(1);
//   };

//   const handleClearFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setSearch("");
//     setAppliedFrom("");
//     setAppliedTo("");
//     setAppliedSearch("");
//     setActivePreset("");
//     setPage(1);
//   };

//   const handlePreset = (
//     preset: "thisMonth" | "lastMonth" | "today" | "yesterday"
//   ) => {
//     const { from, to } = getDatePreset(preset);
//     setFromDate(from);
//     setToDate(to);
//     setAppliedFrom(from);
//     setAppliedTo(to);
//     setActivePreset(preset);
//     setPage(1);
//   };

//   const hasActiveFilters = !!(appliedFrom || appliedTo || appliedSearch);

//   // ===================== ANALYTICS =====================
//   const analytics = useMemo(() => {
//     const pageCount = data.length;
//     const pageSum = data.reduce((s, r) => s + getRecordTotal(r), 0);
//     const total = grandTotal > 0 ? grandTotal : pageSum;

//     const avgPerRecord =
//       totalEntries > 0
//         ? total / totalEntries
//         : pageCount > 0
//         ? total / pageCount
//         : 0;

//     const totalItems = data.reduce((s, r) => s + (r.items?.length || 0), 0);
//     const totalQty = data.reduce(
//       (s, r) =>
//         s +
//         (r.items || []).reduce((q, i) => q + (Number(i.quantity) || 0), 0),
//       0
//     );

//     return {
//       total,
//       count: totalEntries || pageCount,
//       avgPerRecord,
//       totalItems,
//       totalQty,
//     };
//   }, [data, grandTotal, totalEntries]);

//   // ===================== DELETE ONE =====================
//   const handleDelete = async () => {
//     if (!selectedId) return;

//     try {
//       setDeleting(true);
//       const res = await axios.delete(
//         `${API_URL}/return-items/${selectedId}`,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success("Return record deleted");
//         setDeleteDialogOpen(false);
//         setSelectedId(null);
//         if (data.length === 1 && page > 1) {
//           setPage((p) => p - 1);
//         } else {
//           fetchData();
//         }
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to delete");
//       }
//     } catch (error: any) {
//       console.error("Delete error:", error);
//       if (error.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(error.response?.data?.message || "Delete failed");
//       }
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // ===================== DELETE ALL =====================
//   const handleDeleteAll = async () => {
//     try {
//       setDeleting(true);
//       const res = await axios.delete(
//         `${API_URL}/return-items/delete-all`,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success(res.data?.message || "All return records deleted");
//         setDeleteAllDialogOpen(false);
//         setPage(1);
//         fetchData();
//       } else {
//         toast.error(res.data?.message || "Failed to delete all");
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Delete all failed");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const pageTotal = data.reduce((s, r) => s + getRecordTotal(r), 0);

//   // ===================== RENDER =====================
//   return (
//     <Box
//       sx={{
//         minHeight: { xs: "100dvh", md: "85vh" },
//         maxHeight: { md: "100vh" },
//         overflow: { xs: "auto", md: "hidden" },
//         bgcolor: "#090d16",
//         px: { xs: 1.5, sm: 2, md: 3 },
//         py: { xs: 1.5, md: 2.5 },
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
//           flex: { md: 1 },
//           minHeight: 0,
//         }}
//       >
//         {/* ================= HEADER BANNER ================= */}
//         <DarkBanner>
//           <Box
//             display="flex"
//             flexDirection={{ xs: "column", md: "row" }}
//             justifyContent="space-between"
//             alignItems={{ xs: "stretch", md: "center" }}
//             gap={2}
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
//                     borderColor: "#38bdf8",
//                     color: "#38bdf8",
//                     bgcolor: "rgba(56, 189, 248, 0.08)",
//                   },
//                 }}
//               >
//                 Dashboard
//               </Button>

//               <Box sx={{ minWidth: 0 }}>
//                 <Box display="flex" alignItems="center" gap={1} mb={0.3}>
//                   <FiberManualRecord sx={{ fontSize: 10, color: "#38bdf8" }} />
//                   <Typography
//                     variant="caption"
//                     fontWeight="bold"
//                     sx={{
//                       color: "#38bdf8",
//                       letterSpacing: 0.5,
//                       fontSize: "0.7rem",
//                     }}
//                   >
//                     Return Management
//                   </Typography>
//                 </Box>

//                 <Typography
//                   variant="h5"
//                   fontWeight="800"
//                   sx={{
//                     fontSize: { xs: "1rem", sm: "1.35rem", md: "1.55rem" },
//                     letterSpacing: 0.5,
//                     lineHeight: 1.2,
//                   }}
//                 >
//                   RETURN ITEMS LIST
//                 </Typography>

//                 {totalEntries > 0 && (
//                   <Typography
//                     variant="caption"
//                     sx={{ color: "#9ca3af", mt: 0.3, display: "block" }}
//                   >
//                     {totalEntries} total records
//                   </Typography>
//                 )}
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
//                 startIcon={<AssignmentReturn />}
//                 onClick={() => navigate("/return-items/create")}
//                 sx={{
//                   bgcolor: "#3b82f6",
//                   color: "#ffffff",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   fontSize: "0.78rem",
//                   boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
//                   flex: { xs: "1 1 45%", sm: "none" },
//                   "&:hover": { bgcolor: "#2563eb" },
//                 }}
//               >
//                 New Return
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
//                   px: 2.5,
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
//                 startIcon={<DeleteIcon />}
//                 onClick={() => setDeleteAllDialogOpen(true)}
//                 disabled={totalEntries === 0}
//                 sx={{
//                   color: "#f43f5e",
//                   borderColor: "rgba(244, 63, 94, 0.3)",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.5,
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

//         {/* ================= ANALYTICAL SUMMARY BAR ================= */}
//         <AnalyticsBar>
//           <Grid container spacing={1.5}>
//             {/* TOTAL RETURNED */}
//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <StatCard accent="#38bdf8">
//                 <Box
//                   sx={{
//                     width: 42,
//                     height: 42,
//                     borderRadius: "10px",
//                     bgcolor: "rgba(56, 189, 248, 0.15)",
//                     color: "#38bdf8",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <AccountBalanceWallet sx={{ fontSize: 22 }} />
//                 </Box>
//                 <Box sx={{ minWidth: 0, flex: 1 }}>
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.65rem",
//                       fontWeight: 700,
//                       letterSpacing: 0.8,
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     Total Returned{hasActiveFilters ? " (Filtered)" : ""}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#38bdf8",
//                       fontWeight: 900,
//                       fontSize: { xs: "1rem", sm: "1.15rem" },
//                       mt: 0.3,
//                       letterSpacing: 0.3,
//                       textShadow: "0 0 14px rgba(56, 189, 248, 0.4)",
//                       lineHeight: 1.1,
//                     }}
//                   >
//                     {loading ? "..." : formatMoney(analytics.total)}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>

//             {/* TOTAL RECORDS */}
//             <Grid size={{ xs: 6, sm: 6, md: 3 }}>
//               <StatCard accent="#c084fc">
//                 <Box
//                   sx={{
//                     width: 42,
//                     height: 42,
//                     borderRadius: "10px",
//                     bgcolor: "rgba(192, 132, 252, 0.15)",
//                     color: "#c084fc",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <Receipt sx={{ fontSize: 22 }} />
//                 </Box>
//                 <Box sx={{ minWidth: 0, flex: 1 }}>
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.65rem",
//                       fontWeight: 700,
//                       letterSpacing: 0.8,
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     Total Records
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#c084fc",
//                       fontWeight: 900,
//                       fontSize: { xs: "1rem", sm: "1.15rem" },
//                       mt: 0.3,
//                       letterSpacing: 0.3,
//                       lineHeight: 1.1,
//                     }}
//                   >
//                     {loading ? "..." : analytics.count}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>

//             {/* ITEMS RETURNED */}
//             <Grid size={{ xs: 6, sm: 6, md: 3 }}>
//               <StatCard accent="#34d399">
//                 <Box
//                   sx={{
//                     width: 42,
//                     height: 42,
//                     borderRadius: "10px",
//                     bgcolor: "rgba(52, 211, 153, 0.15)",
//                     color: "#34d399",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <Inventory2 sx={{ fontSize: 22 }} />
//                 </Box>
//                 <Box sx={{ minWidth: 0, flex: 1 }}>
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.65rem",
//                       fontWeight: 700,
//                       letterSpacing: 0.8,
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     Items Returned
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#34d399",
//                       fontWeight: 900,
//                       fontSize: { xs: "1rem", sm: "1.15rem" },
//                       mt: 0.3,
//                       letterSpacing: 0.3,
//                       lineHeight: 1.1,
//                     }}
//                   >
//                     {loading ? "..." : analytics.totalItems}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.65rem",
//                       fontWeight: 600,
//                       mt: 0.2,
//                     }}
//                   >
//                     Qty: {analytics.totalQty}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>

//             {/* AVG / RECORD */}
//             <Grid size={{ xs: 6, sm: 6, md: 3 }}>
//               <StatCard accent="#fbbf24">
//                 <Box
//                   sx={{
//                     width: 42,
//                     height: 42,
//                     borderRadius: "10px",
//                     bgcolor: "rgba(251, 191, 36, 0.15)",
//                     color: "#fbbf24",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <Functions sx={{ fontSize: 22 }} />
//                 </Box>
//                 <Box sx={{ minWidth: 0, flex: 1 }}>
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.65rem",
//                       fontWeight: 700,
//                       letterSpacing: 0.8,
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     Avg / Record
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#fbbf24",
//                       fontWeight: 900,
//                       fontSize: { xs: "1rem", sm: "1.15rem" },
//                       mt: 0.3,
//                       letterSpacing: 0.3,
//                       lineHeight: 1.1,
//                     }}
//                   >
//                     {loading ? "..." : formatMoney(analytics.avgPerRecord)}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>
//           </Grid>
//         </AnalyticsBar>

//         {/* ================= FILTER BAR ================= */}
//         <FilterBar>
//           {/* Row 1: From / To date pickers */}
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
//             <Grid size={{ xs: 12, sm: 12, md: 3 }}>
//               <StyledTextField
//                 fullWidth
//                 size="small"
//                 placeholder="Search item name..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleApplyFilters();
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <Box
//                       component="span"
//                       sx={{ mr: 1, display: "flex", alignItems: "center" }}
//                     >
//                       <SearchIcon sx={{ color: "#6b7280", fontSize: 18 }} />
//                     </Box>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, sm: 12, md: 3 }}>
//               <Box display="flex" gap={1} sx={{ height: "100%" }}>
//                 <Button
//                   size="small"
//                   variant="contained"
//                   fullWidth
//                   startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
//                   onClick={handleApplyFilters}
//                   sx={{
//                     bgcolor: "#3b82f6",
//                     color: "#fff",
//                     fontWeight: 700,
//                     textTransform: "none",
//                     borderRadius: "10px",
//                     py: 1.1,
//                     fontSize: "0.78rem",
//                     "&:hover": { bgcolor: "#2563eb" },
//                   }}
//                 >
//                   Apply
//                 </Button>

//                 <Button
//                   size="small"
//                   variant="outlined"
//                   fullWidth
//                   startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
//                   onClick={handleClearFilters}
//                   disabled={
//                     !hasActiveFilters && !fromDate && !toDate && !search
//                   }
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

//           {/* Row 2: Quick filter chips */}
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
//               active={activePreset === "thisMonth"}
//               onClick={() => handlePreset("thisMonth")}
//             >
//               This Month
//             </QuickFilterChip>
//             <QuickFilterChip
//               active={activePreset === "lastMonth"}
//               onClick={() => handlePreset("lastMonth")}
//             >
//               Last Month
//             </QuickFilterChip>
//             <QuickFilterChip
//               active={activePreset === "today"}
//               onClick={() => handlePreset("today")}
//             >
//               Today
//             </QuickFilterChip>
//             <QuickFilterChip
//               active={activePreset === "yesterday"}
//               onClick={() => handlePreset("yesterday")}
//             >
//               Yesterday
//             </QuickFilterChip>

//             {/* Active filter chip + page total on right */}
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
//               {hasActiveFilters && (
//                 <Chip
//                   label={`${
//                     appliedFrom || appliedTo
//                       ? `${appliedFrom || "..."} → ${appliedTo || "..."}`
//                       : ""
//                   }${
//                     appliedSearch
//                       ? `${appliedFrom || appliedTo ? " | " : ""}"${appliedSearch}"`
//                       : ""
//                   }`}
//                   size="small"
//                   onDelete={handleClearFilters}
//                   sx={{
//                     bgcolor: "rgba(56, 189, 248, 0.15)",
//                     color: "#38bdf8",
//                     border: "1px solid rgba(56, 189, 248, 0.4)",
//                     fontWeight: 700,
//                     fontSize: "0.7rem",
//                     height: "28px",
//                     "& .MuiChip-deleteIcon": {
//                       color: "#38bdf8",
//                       "&:hover": { color: "#f43f5e" },
//                     },
//                   }}
//                 />
//               )}

//               {pageTotal > 0 && (
//                 <Chip
//                   icon={
//                     <Receipt
//                       sx={{ fontSize: 16, color: "#38bdf8 !important" }}
//                     />
//                   }
//                   label={`Page Total: ₹ ${pageTotal.toLocaleString()}`}
//                   size="small"
//                   sx={{
//                     bgcolor: "rgba(56, 189, 248, 0.1)",
//                     color: "#38bdf8",
//                     border: "1px solid rgba(56, 189, 248, 0.3)",
//                     fontWeight: 700,
//                     fontSize: "0.72rem",
//                     height: "28px",
//                   }}
//                 />
//               )}
//             </Box>
//           </Box>
//         </FilterBar>

//         {/* ================= TABLE ================= */}
//         <TableContainerDark>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             flexWrap="wrap"
//             gap={1}
//             px={{ xs: 2, sm: 3 }}
//             py={1.8}
//             sx={{
//               borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "#ffffff",
//                 fontWeight: 800,
//                 fontSize: { xs: "0.85rem", sm: "0.95rem" },
//                 letterSpacing: 0.5,
//               }}
//             >
//               RETURN ITEMS LIST
//             </Typography>
//             <Chip
//               label={`${totalEntries} Records`}
//               size="small"
//               sx={{
//                 bgcolor: "rgba(56, 189, 248, 0.1)",
//                 color: "#38bdf8",
//                 border: "1px solid rgba(56, 189, 248, 0.3)",
//                 fontWeight: 700,
//                 fontSize: "0.7rem",
//                 height: "26px",
//               }}
//             />
//           </Box>

//           <TableScrollArea>
//             <ItemsTable>
//               <thead>
//                 <tr>
//                   <th style={{ textAlign: "center", width: "50px" }}>#</th>
//                   <th style={{ textAlign: "center" }}>Date</th>
//                   <th style={{ textAlign: "center" }}>Items</th>
//                   <th style={{ textAlign: "center" }}>Total Qty</th>
//                   <th style={{ textAlign: "center" }}>Return Total</th>
//                   <th style={{ textAlign: "center", width: "140px" }}>
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       style={{ textAlign: "center", padding: "40px 12px" }}
//                     >
//                       <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
//                       >
//                         Loading return items...
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : data.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       style={{ textAlign: "center", padding: "40px 12px" }}
//                     >
//                       <Receipt
//                         style={{
//                           fontSize: 44,
//                           color: "#374151",
//                           marginBottom: 8,
//                         }}
//                       />
//                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
//                         No return records found
//                       </Typography>
//                       <Typography
//                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
//                       >
//                         {hasActiveFilters
//                           ? "Try changing the filters"
//                           : "Click 'New Return' to create one"}
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   data.map((row, idx) => {
//                     const totalQty = (row.items || []).reduce(
//                       (s, i) => s + (i.quantity || 0),
//                       0
//                     );
//                     const rowTotal = getRecordTotal(row);

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
//                               fontWeight: 600,
//                               height: "24px",
//                             }}
//                           />
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Chip
//                             label={`${(row.items || []).length} items`}
//                             size="small"
//                             sx={{
//                               bgcolor: "rgba(192, 132, 252, 0.1)",
//                               color: "#c084fc",
//                               border: "1px solid rgba(192, 132, 252, 0.3)",
//                               fontSize: "0.7rem",
//                               fontWeight: 600,
//                               height: "24px",
//                             }}
//                           />
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Chip
//                             label={totalQty}
//                             size="small"
//                             sx={{
//                               bgcolor: "rgba(56, 189, 248, 0.1)",
//                               color: "#38bdf8",
//                               border: "1px solid rgba(56, 189, 248, 0.3)",
//                               fontSize: "0.7rem",
//                               fontWeight: 700,
//                               height: "24px",
//                             }}
//                           />
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Typography
//                             sx={{
//                               color: "#38bdf8",
//                               fontWeight: 800,
//                               fontSize: "0.9rem",
//                             }}
//                           >
//                             ₹ {rowTotal.toLocaleString()}
//                           </Typography>
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <IconButton
//                             size="small"
//                             onClick={() => {
//                               setSelectedRecord(row);
//                               setViewDialogOpen(true);
//                             }}
//                             sx={{
//                               color: "#34d399",
//                               "&:hover": {
//                                 bgcolor: "rgba(52, 211, 153, 0.1)",
//                               },
//                             }}
//                           >
//                             <ViewIcon fontSize="small" />
//                           </IconButton>

//                           <IconButton
//                             size="small"
//                             onClick={() =>
//                               navigate(`/return-items/edit/${row._id}`)
//                             }
//                             sx={{
//                               color: "#38bdf8",
//                               "&:hover": {
//                                 bgcolor: "rgba(56, 189, 248, 0.1)",
//                               },
//                             }}
//                           >
//                             <EditIcon fontSize="small" />
//                           </IconButton>

//                           <IconButton
//                             size="small"
//                             onClick={() => {
//                               setSelectedId(row._id);
//                               setDeleteDialogOpen(true);
//                             }}
//                             sx={{
//                               color: "#f43f5e",
//                               "&:hover": {
//                                 bgcolor: "rgba(244, 63, 94, 0.1)",
//                               },
//                             }}
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </ItemsTable>
//           </TableScrollArea>

//           {/* ================= PAGINATION BAR ================= */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 1.5,
//               px: { xs: 2, sm: 3 },
//               py: 1.6,
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
//                         ? "rgba(56, 189, 248, 0.2)"
//                         : "rgba(255, 255, 255, 0.05)",
//                     color: limit === n ? "#38bdf8" : "#9ca3af",
//                     border:
//                       limit === n
//                         ? "1px solid rgba(56, 189, 248, 0.5)"
//                         : "1px solid rgba(255, 255, 255, 0.1)",
//                     fontWeight: 700,
//                     fontSize: "0.7rem",
//                     height: "26px",
//                     cursor: "pointer",
//                   }}
//                 />
//               ))}
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.72rem", ml: 0.5 }}
//               >
//                 {totalEntries > 0
//                   ? `${(page - 1) * limit + 1}–${Math.min(
//                       page * limit,
//                       totalEntries
//                     )} of ${totalEntries}`
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
//                   borderColor: "rgba(255, 255, 255, 0.1)",
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
//                   borderColor: "rgba(56, 189, 248, 0.5) !important",
//                 },
//               }}
//             />
//           </Box>
//         </TableContainerDark>
//       </Box>

//       {/* ================= FLOATING DASHBOARD BUTTON ================= */}
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
//             width: 50,
//             height: 50,
//             boxShadow: "0 8px 24px rgba(56, 189, 248, 0.45)",
//             "&:hover": { bgcolor: "#0ea5e9" },
//           }}
//         >
//           <HomeIcon />
//         </Fab>
//       </Tooltip>

//       {/* ================= VIEW DIALOG ================= */}
//       <Dialog
//         open={viewDialogOpen}
//         onClose={() => setViewDialogOpen(false)}
//         maxWidth="md"
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
//         {selectedRecord && (
//           <>
//             <DialogTitle
//               sx={{
//                 color: "#ffffff",
//                 fontWeight: 800,
//                 fontSize: { xs: "0.95rem", sm: "1.1rem" },
//                 borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 px: { xs: 2, sm: 3 },
//               }}
//             >
//               <Box display="flex" alignItems="center" gap={1.5}>
//                 <Box
//                   sx={{
//                     width: 32,
//                     height: 32,
//                     borderRadius: "8px",
//                     bgcolor: "#0c2a3a",
//                     color: "#38bdf8",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <ViewIcon sx={{ fontSize: 18 }} />
//                 </Box>
//                 <Box>
//                   <Typography
//                     sx={{
//                       color: "#38bdf8",
//                       fontWeight: 800,
//                       fontSize: "0.85rem",
//                       letterSpacing: 1,
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     Return Details
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.7rem",
//                       fontWeight: 500,
//                     }}
//                   >
//                     {formatDate(selectedRecord.date)}
//                   </Typography>
//                 </Box>
//               </Box>
//               <IconButton
//                 onClick={() => setViewDialogOpen(false)}
//                 size="small"
//                 sx={{
//                   color: "#9ca3af",
//                   "&:hover": {
//                     color: "#f43f5e",
//                     bgcolor: "rgba(244, 63, 94, 0.1)",
//                   },
//                 }}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </DialogTitle>

//             <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
//               <Box
//                 sx={{
//                   bgcolor: "#111827",
//                   borderRadius: "12px",
//                   border: "1px solid rgba(255, 255, 255, 0.08)",
//                   overflowX: "auto",
//                 }}
//               >
//                 <Box
//                   component="table"
//                   sx={{
//                     width: "100%",
//                     minWidth: "560px",
//                     borderCollapse: "collapse",
//                     "& thead": {
//                       backgroundColor: "#111827",
//                     },
//                     "& thead th": {
//                       color: "#9ca3af",
//                       fontWeight: 700,
//                       fontSize: "0.7rem",
//                       textTransform: "uppercase",
//                       letterSpacing: "0.8px",
//                       padding: "12px",
//                       borderBottom:
//                         "1px solid rgba(255, 255, 255, 0.08)",
//                       textAlign: "left",
//                       whiteSpace: "nowrap",
//                     },
//                     "& tbody tr": {
//                       borderBottom:
//                         "1px solid rgba(255, 255, 255, 0.05)",
//                     },
//                     "& tbody td": {
//                       color: "#e5e7eb",
//                       fontSize: "0.82rem",
//                       padding: "12px",
//                       whiteSpace: "nowrap",
//                     },
//                   }}
//                 >
//                   <thead>
//                     <tr>
//                       <th style={{ textAlign: "center" }}>#</th>
//                       <th>Item</th>
//                       <th style={{ textAlign: "center" }}>MRP</th>
//                       <th style={{ textAlign: "center" }}>Rate</th>
//                       <th style={{ textAlign: "center" }}>Qty</th>
//                       <th style={{ textAlign: "center" }}>Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {(selectedRecord.items || []).map((item, idx) => (
//                       <tr key={idx}>
//                         <td style={{ textAlign: "center" }}>{idx + 1}</td>
//                         <td>
//                           <Typography
//                             sx={{
//                               color: "#ffffff",
//                               fontWeight: 600,
//                               fontSize: "0.82rem",
//                             }}
//                           >
//                             {item.itemName}
//                           </Typography>
//                         </td>
//                         <td style={{ textAlign: "center" }}>₹ {item.mrp}</td>
//                         <td style={{ textAlign: "center" }}>₹ {item.rate}</td>
//                         <td style={{ textAlign: "center" }}>
//                           {item.quantity}
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Typography
//                             sx={{
//                               color: "#38bdf8",
//                               fontWeight: 700,
//                               fontSize: "0.82rem",
//                             }}
//                           >
//                             ₹ {getItemTotal(item).toLocaleString()}
//                           </Typography>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Box>
//               </Box>

//               <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
//                 <Box
//                   sx={{
//                     bgcolor: "rgba(56, 189, 248, 0.1)",
//                     border: "1px solid rgba(56, 189, 248, 0.3)",
//                     borderRadius: "12px",
//                     px: 2.5,
//                     py: 1.2,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1.5,
//                   }}
//                 >
//                   <Typography sx={{ color: "#9ca3af", fontSize: "0.78rem" }}>
//                     Total Return Value:
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#38bdf8",
//                       fontWeight: 800,
//                       fontSize: "1.2rem",
//                     }}
//                   >
//                     ₹ {getRecordTotal(selectedRecord).toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Box>
//             </DialogContent>

//             <DialogActions
//               sx={{
//                 p: { xs: 2, sm: 2.5 },
//                 borderTop: "1px solid rgba(255, 255, 255, 0.08)",
//                 gap: 1,
//               }}
//             >
//               <Button
//                 onClick={() => setViewDialogOpen(false)}
//                 sx={{
//                   color: "#9ca3af",
//                   textTransform: "none",
//                   fontWeight: 600,
//                   borderRadius: "10px",
//                 }}
//               >
//                 Close
//               </Button>

//               <Button
//                 onClick={() => {
//                   setViewDialogOpen(false);
//                   navigate(`/return-items/edit/${selectedRecord._id}`);
//                 }}
//                 variant="contained"
//                 sx={{
//                   bgcolor: "#38bdf8",
//                   color: "#ffffff",
//                   textTransform: "none",
//                   fontWeight: 700,
//                   borderRadius: "10px",
//                   px: 3,
//                   "&:hover": { bgcolor: "#0ea5e9" },
//                 }}
//               >
//                 Edit
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>

//       {/* ================= DELETE ONE DIALOG ================= */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
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
//           Confirm Delete
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             Are you sure you want to delete this return record? This action
//             cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2.5 }}>
//           <Button
//             onClick={() => setDeleteDialogOpen(false)}
//             disabled={deleting}
//             sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDelete}
//             disabled={deleting}
//             variant="contained"
//             sx={{
//               bgcolor: "#f43f5e",
//               color: "#ffffff",
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
//         open={deleteAllDialogOpen}
//         onClose={() => setDeleteAllDialogOpen(false)}
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
//           Delete All Return Records
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             Are you sure you want to delete ALL return records? This action
//             cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2.5 }}>
//           <Button
//             onClick={() => setDeleteAllDialogOpen(false)}
//             disabled={deleting}
//             sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDeleteAll}
//             disabled={deleting}
//             variant="contained"
//             sx={{
//               bgcolor: "#f43f5e",
//               color: "#ffffff",
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

// export default SaleReturnList;



import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box, Button, Typography, Chip, IconButton, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, CircularProgress, TextField, Pagination, Tooltip, Fab, Grid,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  Refresh as RefreshIcon, Delete as DeleteIcon, Visibility as ViewIcon, Edit as EditIcon,
  AssignmentReturn, FiberManualRecord, Receipt, ArrowBack, Home as HomeIcon, Close as CloseIcon,
  Search as SearchIcon, FilterAlt as FilterIcon, Clear as ClearIcon, AccountBalanceWallet, Functions, Inventory2,
} from "@mui/icons-material";

interface ReturnItemDetail { productId: string; itemName: string; mrp: number; rate: number; quantity: number; totalAmount?: number; }
interface ReturnRecord { _id: string; items: ReturnItemDetail[]; totalValue: number; date: string; createdAt: string; updatedAt: string; }

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const getAuthHeaders = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}` } });
const isDark = (theme: any) => theme.palette.mode === "dark";

const DarkBanner = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme) ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
  padding: "18px 20px", marginBottom: "14px",
  boxShadow: isDark(theme) ? "0 10px 30px rgba(0,0,0,0.5)" : "0 6px 20px rgba(15,23,42,0.06)",
  flexShrink: 0, transition: "all 0.3s ease",
}));
const FilterBar = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme) ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
  padding: "16px 18px", marginBottom: "14px",
  boxShadow: isDark(theme) ? "0 8px 20px rgba(0,0,0,0.4)" : "0 4px 14px rgba(15,23,42,0.05)",
  flexShrink: 0, transition: "all 0.3s ease",
}));
const AnalyticsBar = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme) ? "1px solid rgba(56,189,248,0.25)" : "1px solid rgba(56,189,248,0.2)",
  padding: "16px 18px", marginBottom: "14px",
  boxShadow: isDark(theme) ? "0 8px 24px rgba(56,189,248,0.08)" : "0 4px 14px rgba(56,189,248,0.06)",
  flexShrink: 0, position: "relative", overflow: "hidden", transition: "all 0.3s ease",
  "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, height: "2px",
    background: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent)" },
}));
const StatCard = styled(Box)<{ accent: string }>(({ accent, theme }) => ({
  backgroundColor: isDark(theme) ? "#111827" : "#ffffff",
  borderRadius: "12px", border: `1px solid ${accent}22`, padding: "12px 14px",
  display: "flex", alignItems: "center", gap: "12px", height: "100%", transition: "all 0.25s ease",
  "&:hover": { transform: "translateY(-2px)", borderColor: `${accent}66`, boxShadow: `0 8px 20px ${accent}22` },
}));
const QuickFilterChip = styled(Button)<{ active?: boolean }>(({ active }) => ({
  borderRadius: "10px", textTransform: "none", fontWeight: 700, fontSize: "0.75rem",
  padding: "8px 18px", minWidth: "auto", whiteSpace: "nowrap",
  backgroundColor: active ? "#0ea5e9" : "rgba(56, 189, 248, 0.15)",
  color: active ? "#ffffff" : "#0284c7",
  border: active ? "1px solid #0ea5e9" : "1px solid rgba(56, 189, 248, 0.3)",
  boxShadow: active ? "0 4px 14px rgba(56, 189, 248, 0.35)" : "none",
  transition: "all 0.2s ease",
  "&:hover": { backgroundColor: active ? "#0284c7" : "rgba(56, 189, 248, 0.25)", borderColor: "#0ea5e9" },
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px", backgroundColor: isDark(theme) ? "#090d16" : "#f8fafc",
    color: isDark(theme) ? "#ffffff" : "#0f172a", height: "44px",
    "& fieldset": { borderColor: isDark(theme) ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.12)" },
    "&:hover fieldset": { borderColor: "rgba(56, 189, 248, 0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#0ea5e9", borderWidth: "1.5px" },
  },
  "& .MuiOutlinedInput-input": {
    color: isDark(theme) ? "#ffffff" : "#0f172a",
    fontSize: "0.85rem", padding: "10px 12px",
    "&::placeholder": { color: isDark(theme) ? "#6b7280" : "#94a3b8", opacity: 1 },
    "&::-webkit-calendar-picker-indicator": { filter: isDark(theme) ? "invert(1)" : "none", cursor: "pointer" },
  },
  "& .MuiInputLabel-root": {
    color: isDark(theme) ? "#9ca3af" : "#64748b",
    fontSize: "0.8rem",
    "&.Mui-focused": { color: "#0ea5e9" },
  },
}));
const TableContainerDark = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme) ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
  boxShadow: isDark(theme) ? "0 8px 20px rgba(0,0,0,0.4)" : "0 4px 14px rgba(15,23,42,0.05)",
  overflow: "hidden", marginBottom: "16px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0,
  transition: "all 0.3s ease",
}));
const TableScrollArea = styled(Box)(({ theme }) => ({
  overflow: "auto", flex: 1, minHeight: 0,
  "&::-webkit-scrollbar": { width: "8px", height: "8px" },
  "&::-webkit-scrollbar-track": { backgroundColor: isDark(theme) ? "#0d1527" : "#f1f5f9" },
  "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(56, 189, 248, 0.3)", borderRadius: "8px", "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.5)" } },
}));
const ItemsTable = styled("table")(({ theme }) => {
  const dark = isDark(theme);
  return {
    width: "100%", minWidth: "720px", borderCollapse: "collapse",
    "& thead": { backgroundColor: dark ? "#111827" : "#f8fafc", position: "sticky", top: 0, zIndex: 5 },
    "& thead th": {
      color: dark ? "#9ca3af" : "#64748b",
      fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.8px",
      padding: "14px 12px",
      borderBottom: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
      textAlign: "left", whiteSpace: "nowrap", backgroundColor: dark ? "#111827" : "#f8fafc",
    },
    "& tbody tr": { transition: "all 0.2s ease", borderBottom: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(15,23,42,0.05)" },
    "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.05)" },
    "& tbody td": { color: dark ? "#e5e7eb" : "#334155", fontSize: "0.85rem", padding: "12px", textAlign: "left", whiteSpace: "nowrap" },
  };
});

const getRecordTotal = (r: ReturnRecord): number => {
  if (typeof r?.totalValue === "number") return r.totalValue;
  if (Array.isArray(r?.items)) return r.items.reduce((s, it) => s + (Number(it?.quantity) || 0) * (Number(it?.rate) || 0), 0);
  return 0;
};
const getItemTotal = (it: ReturnItemDetail): number => {
  if (typeof it?.totalAmount === "number") return it.totalAmount;
  return (Number(it?.quantity) || 0) * (Number(it?.rate) || 0);
};
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
const formatMoney = (n: number) =>
  `₹ ${(Number(n) || 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
const toInputDate = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};
const getDatePreset = (preset: "thisMonth" | "lastMonth" | "today" | "yesterday"): { from: string; to: string } => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  switch (preset) {
    case "today": { const d = toInputDate(now); return { from: d, to: d }; }
    case "yesterday": { const yest = new Date(now); yest.setDate(now.getDate() - 1); const d = toInputDate(yest); return { from: d, to: d }; }
    case "thisMonth": { const first = new Date(y, m, 1); const last = new Date(y, m + 1, 0); return { from: toInputDate(first), to: toInputDate(last) }; }
    case "lastMonth": { const first = new Date(y, m - 1, 1); const last = new Date(y, m, 0); return { from: toInputDate(first), to: toInputDate(last) }; }
  }
};

const SaleReturnList: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dark = isDark(theme);

  const c = {
    pageBg: dark ? "#090d16" : "#f1f5f9",
    cardBg: dark ? "#111827" : "#ffffff",
    bannerBg: dark ? "#0d1527" : "#ffffff",
    text: dark ? "#ffffff" : "#0f172a",
    textSec: dark ? "#e5e7eb" : "#334155",
    muted: dark ? "#9ca3af" : "#64748b",
    mutedDark: dark ? "#6b7280" : "#94a3b8",
    veryMuted: dark ? "#374151" : "#cbd5e1",
    border08: dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
    border05: dark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)",
    border10: dark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.10)",
    border15: dark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.15)",
    skyText: dark ? "#38bdf8" : "#0284c7",
    skyIconBg: dark ? "#0c2a3a" : "#e0f2fe",
    purpleText: dark ? "#c084fc" : "#7e22ce",
    emeraldText: dark ? "#34d399" : "#059669",
    amberText: dark ? "#fbbf24" : "#d97706",
    chipBgSoft: dark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.04)",
  };

  const [data, setData] = useState<ReturnRecord[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ReturnRecord | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [activePreset, setActivePreset] = useState<"thisMonth" | "lastMonth" | "today" | "yesterday" | "">("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params: any = { page, limit };
      if (appliedFrom) params.from = appliedFrom;
      if (appliedTo) params.to = appliedTo;
      if (appliedSearch.trim()) params.search = appliedSearch.trim();
      const res = await axios.get(`${API_URL}/return-items`, { params, ...getAuthHeaders() });
      if (res.data?.success === true) {
        setData(res.data.data || []);
        const gt = res.data.grandTotal ?? res.data.totalValue ?? res.data.totalSum ?? res.data.totalReturned ?? 0;
        setGrandTotal(Number(gt) || 0);
        const count = res.data.totalCount ?? res.data.total ?? res.data.count ?? 0;
        const pages = res.data.totalPages ?? res.data.pages ?? Math.max(1, Math.ceil((count || 0) / limit));
        setTotalEntries(count); setTotalPages(pages);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Please login again");
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(res.data?.message || "Failed to fetch return items");
        setData([]);
      }
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized") { localStorage.removeItem("erptoken"); navigate("/login"); }
      else toast.error(error.response?.data?.message || "Failed to fetch data");
      setData([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); /* eslint-disable-next-line */ }, [page, limit, appliedFrom, appliedTo, appliedSearch]);

  const handleApplyFilters = () => {
    if (fromDate && toDate && fromDate > toDate) return toast.error("From date cannot be after To date");
    setAppliedFrom(fromDate); setAppliedTo(toDate); setAppliedSearch(search);
    setActivePreset(""); setPage(1);
  };
  const handleClearFilters = () => {
    setFromDate(""); setToDate(""); setSearch(""); setAppliedFrom(""); setAppliedTo(""); setAppliedSearch("");
    setActivePreset(""); setPage(1);
  };
  const handlePreset = (preset: "thisMonth" | "lastMonth" | "today" | "yesterday") => {
    const { from, to } = getDatePreset(preset);
    setFromDate(from); setToDate(to); setAppliedFrom(from); setAppliedTo(to);
    setActivePreset(preset); setPage(1);
  };
  const hasActiveFilters = !!(appliedFrom || appliedTo || appliedSearch);

  const analytics = useMemo(() => {
    const pageCount = data.length;
    const pageSum = data.reduce((s, r) => s + getRecordTotal(r), 0);
    const total = grandTotal > 0 ? grandTotal : pageSum;
    const avgPerRecord = totalEntries > 0 ? total / totalEntries : pageCount > 0 ? total / pageCount : 0;
    const totalItems = data.reduce((s, r) => s + (r.items?.length || 0), 0);
    const totalQty = data.reduce((s, r) => s + (r.items || []).reduce((q, i) => q + (Number(i.quantity) || 0), 0), 0);
    return { total, count: totalEntries || pageCount, avgPerRecord, totalItems, totalQty };
  }, [data, grandTotal, totalEntries]);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      setDeleting(true);
      const res = await axios.delete(`${API_URL}/return-items/${selectedId}`, getAuthHeaders());
      if (res.data?.success === true) {
        toast.success("Return record deleted");
        setDeleteDialogOpen(false); setSelectedId(null);
        if (data.length === 1 && page > 1) setPage((p) => p - 1);
        else fetchData();
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else { toast.error(res.data?.message || "Failed to delete"); }
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized") { localStorage.removeItem("erptoken"); navigate("/login"); }
      else toast.error(error.response?.data?.message || "Delete failed");
    } finally { setDeleting(false); }
  };
  const handleDeleteAll = async () => {
    try {
      setDeleting(true);
      const res = await axios.delete(`${API_URL}/return-items/delete-all`, getAuthHeaders());
      if (res.data?.success === true) {
        toast.success(res.data?.message || "All return records deleted");
        setDeleteAllDialogOpen(false); setPage(1); fetchData();
      } else { toast.error(res.data?.message || "Failed to delete all"); }
    } catch (error: any) { toast.error(error.response?.data?.message || "Delete all failed"); }
    finally { setDeleting(false); }
  };
  const pageTotal = data.reduce((s, r) => s + getRecordTotal(r), 0);

  return (
    <Box sx={{ minHeight: { xs: "100dvh", md: "85vh" }, maxHeight: { md: "100vh" }, overflow: { xs: "auto", md: "hidden" },
      bgcolor: c.pageBg, px: { xs: 1.5, sm: 2, md: 3 }, py: { xs: 1.5, md: 2.5 }, color: c.text,
      display: "flex", flexDirection: "column", boxSizing: "border-box", transition: "background-color 0.3s ease, color 0.3s ease" }}>
      <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto", display: "flex", flexDirection: "column", flex: { md: 1 }, minHeight: 0 }}>
        {/* HEADER */}
        <DarkBanner>
          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", md: "center" }} gap={2}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate("/dashboard")}
                sx={{ color: c.textSec, borderColor: c.border15, fontWeight: 700, textTransform: "none", borderRadius: "10px", px: 2, py: 0.8, fontSize: "0.78rem", minWidth: "auto",
                  "&:hover": { borderColor: "#0ea5e9", color: "#0ea5e9", bgcolor: "rgba(56, 189, 248, 0.08)" } }}>
                Dashboard
              </Button>
              <Box sx={{ minWidth: 0 }}>
                <Box display="flex" alignItems="center" gap={1} mb={0.3}>
                  <FiberManualRecord sx={{ fontSize: 10, color: "#38bdf8" }} />
                  <Typography variant="caption" fontWeight="bold" sx={{ color: c.skyText, letterSpacing: 0.5, fontSize: "0.7rem" }}>Return Management</Typography>
                </Box>
                <Typography variant="h5" fontWeight="800" sx={{ fontSize: { xs: "1rem", sm: "1.35rem", md: "1.55rem" }, letterSpacing: 0.5, lineHeight: 1.2, color: c.text }}>
                  RETURN ITEMS LIST
                </Typography>
                {totalEntries > 0 && (
                  <Typography variant="caption" sx={{ color: c.muted, mt: 0.3, display: "block" }}>{totalEntries} total records</Typography>
                )}
              </Box>
            </Box>
            <Box display="flex" gap={1} flexWrap="wrap" sx={{ width: { xs: "100%", md: "auto" }, justifyContent: { xs: "stretch", md: "flex-end" } }}>
              <Button variant="contained" startIcon={<AssignmentReturn />} onClick={() => navigate("/return-items/create")}
                sx={{ bgcolor: "#3b82f6", color: "#ffffff", fontWeight: 700, textTransform: "none", borderRadius: "10px", px: 2.5, py: 1, fontSize: "0.78rem",
                  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)", flex: { xs: "1 1 45%", sm: "none" }, "&:hover": { bgcolor: "#2563eb" } }}>
                New Return
              </Button>
              <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchData} disabled={loading}
                sx={{ color: c.textSec, borderColor: c.border15, fontWeight: 700, textTransform: "none", borderRadius: "10px", px: 2.5, py: 1, fontSize: "0.78rem", flex: { xs: "1 1 45%", sm: "none" },
                  "&:hover": { borderColor: "#0ea5e9", color: "#0ea5e9", bgcolor: "rgba(56, 189, 248, 0.08)" } }}>
                Refresh
              </Button>
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setDeleteAllDialogOpen(true)} disabled={totalEntries === 0}
                sx={{ color: "#f43f5e", borderColor: "rgba(244, 63, 94, 0.3)", fontWeight: 700, textTransform: "none", borderRadius: "10px", px: 2.5, py: 1, fontSize: "0.78rem", flex: { xs: "1 1 100%", sm: "none" },
                  "&:hover": { borderColor: "#f43f5e", bgcolor: "rgba(244, 63, 94, 0.08)" },
                  "&.Mui-disabled": { color: "rgba(244, 63, 94, 0.4)", borderColor: "rgba(244, 63, 94, 0.15)" } }}>
                Delete All
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* ANALYTICS */}
        <AnalyticsBar>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard accent="#38bdf8">
                <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(56, 189, 248, 0.15)", color: c.skyText, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <AccountBalanceWallet sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ color: c.muted, fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
                    Total Returned{hasActiveFilters ? " (Filtered)" : ""}
                  </Typography>
                  <Typography sx={{ color: c.skyText, fontWeight: 900, fontSize: { xs: "1rem", sm: "1.15rem" }, mt: 0.3, letterSpacing: 0.3, textShadow: dark ? "0 0 14px rgba(56, 189, 248, 0.4)" : "none", lineHeight: 1.1 }}>
                    {loading ? "..." : formatMoney(analytics.total)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#c084fc">
                <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(192, 132, 252, 0.15)", color: c.purpleText, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Receipt sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ color: c.muted, fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Total Records</Typography>
                  <Typography sx={{ color: c.purpleText, fontWeight: 900, fontSize: { xs: "1rem", sm: "1.15rem" }, mt: 0.3, letterSpacing: 0.3, lineHeight: 1.1 }}>
                    {loading ? "..." : analytics.count}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#34d399">
                <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(52, 211, 153, 0.15)", color: c.emeraldText, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Inventory2 sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ color: c.muted, fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Items Returned</Typography>
                  <Typography sx={{ color: c.emeraldText, fontWeight: 900, fontSize: { xs: "1rem", sm: "1.15rem" }, mt: 0.3, letterSpacing: 0.3, lineHeight: 1.1 }}>
                    {loading ? "..." : analytics.totalItems}
                  </Typography>
                  <Typography sx={{ color: c.muted, fontSize: "0.65rem", fontWeight: 600, mt: 0.2 }}>Qty: {analytics.totalQty}</Typography>
                </Box>
              </StatCard>
            </Grid>
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#fbbf24">
                <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(251, 191, 36, 0.15)", color: c.amberText, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Functions sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ color: c.muted, fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Avg / Record</Typography>
                  <Typography sx={{ color: c.amberText, fontWeight: 900, fontSize: { xs: "1rem", sm: "1.15rem" }, mt: 0.3, letterSpacing: 0.3, lineHeight: 1.1 }}>
                    {loading ? "..." : formatMoney(analytics.avgPerRecord)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
          </Grid>
        </AnalyticsBar>

        {/* FILTER BAR */}
        <FilterBar>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StyledTextField type="date" size="small" fullWidth value={fromDate} onChange={(e) => setFromDate(e.target.value)} InputLabelProps={{ shrink: true }} label="From" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StyledTextField type="date" size="small" fullWidth value={toDate} onChange={(e) => setToDate(e.target.value)} InputLabelProps={{ shrink: true }} label="To" />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
              <StyledTextField fullWidth size="small" placeholder="Search item name..." value={search} onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleApplyFilters(); }}
                InputProps={{ startAdornment: (<Box component="span" sx={{ mr: 1, display: "flex", alignItems: "center" }}><SearchIcon sx={{ color: c.mutedDark, fontSize: 18 }} /></Box>) }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 3 }}>
              <Box display="flex" gap={1} sx={{ height: "100%" }}>
                <Button size="small" variant="contained" fullWidth startIcon={<FilterIcon sx={{ fontSize: 14 }} />} onClick={handleApplyFilters}
                  sx={{ bgcolor: "#3b82f6", color: "#fff", fontWeight: 700, textTransform: "none", borderRadius: "10px", py: 1.1, fontSize: "0.78rem", "&:hover": { bgcolor: "#2563eb" } }}>
                  Apply
                </Button>
                <Button size="small" variant="outlined" fullWidth startIcon={<ClearIcon sx={{ fontSize: 14 }} />} onClick={handleClearFilters}
                  disabled={!hasActiveFilters && !fromDate && !toDate && !search}
                  sx={{ color: c.muted, borderColor: c.border15, fontWeight: 700, textTransform: "none", borderRadius: "10px", py: 1.1, fontSize: "0.78rem",
                    "&:hover": { borderColor: "#f43f5e", color: "#f43f5e", bgcolor: "rgba(244, 63, 94, 0.08)" } }}>
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1.5, alignItems: "center" }}>
            <Typography sx={{ color: c.muted, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, mr: 0.5 }}>Quick:</Typography>
            <QuickFilterChip active={activePreset === "thisMonth"} onClick={() => handlePreset("thisMonth")}>This Month</QuickFilterChip>
            <QuickFilterChip active={activePreset === "lastMonth"} onClick={() => handlePreset("lastMonth")}>Last Month</QuickFilterChip>
            <QuickFilterChip active={activePreset === "today"} onClick={() => handlePreset("today")}>Today</QuickFilterChip>
            <QuickFilterChip active={activePreset === "yesterday"} onClick={() => handlePreset("yesterday")}>Yesterday</QuickFilterChip>

            <Box sx={{ ml: { md: "auto" }, display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap", mt: { xs: 1, md: 0 } }}>
              {hasActiveFilters && (
                <Chip label={`${appliedFrom || appliedTo ? `${appliedFrom || "..."} → ${appliedTo || "..."}` : ""}${appliedSearch ? `${appliedFrom || appliedTo ? " | " : ""}"${appliedSearch}"` : ""}`}
                  size="small" onDelete={handleClearFilters}
                  sx={{ bgcolor: "rgba(56, 189, 248, 0.15)", color: c.skyText, border: "1px solid rgba(56, 189, 248, 0.4)", fontWeight: 700, fontSize: "0.7rem", height: "28px",
                    "& .MuiChip-deleteIcon": { color: c.skyText, "&:hover": { color: "#f43f5e" } } }} />
              )}
              {pageTotal > 0 && (
                <Chip icon={<Receipt sx={{ fontSize: 16, color: `${c.skyText} !important` }} />}
                  label={`Page Total: ₹ ${pageTotal.toLocaleString()}`} size="small"
                  sx={{ bgcolor: "rgba(56, 189, 248, 0.1)", color: c.skyText, border: "1px solid rgba(56, 189, 248, 0.3)", fontWeight: 700, fontSize: "0.72rem", height: "28px" }} />
              )}
            </Box>
          </Box>
        </FilterBar>

        {/* TABLE */}
        <TableContainerDark>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} px={{ xs: 2, sm: 3 }} py={1.8} sx={{ borderBottom: `1px solid ${c.border08}`, flexShrink: 0 }}>
            <Typography sx={{ color: c.text, fontWeight: 800, fontSize: { xs: "0.85rem", sm: "0.95rem" }, letterSpacing: 0.5 }}>RETURN ITEMS LIST</Typography>
            <Chip label={`${totalEntries} Records`} size="small"
              sx={{ bgcolor: "rgba(56, 189, 248, 0.1)", color: c.skyText, border: "1px solid rgba(56, 189, 248, 0.3)", fontWeight: 700, fontSize: "0.7rem", height: "26px" }} />
          </Box>
          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Items</th>
                  <th style={{ textAlign: "center" }}>Total Qty</th>
                  <th style={{ textAlign: "center" }}>Return Total</th>
                  <th style={{ textAlign: "center", width: "140px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: "40px 12px" }}>
                    <CircularProgress sx={{ color: "#0ea5e9" }} size={32} />
                    <Typography sx={{ color: c.muted, fontSize: "0.9rem", mt: 1 }}>Loading return items...</Typography>
                  </td></tr>
                ) : data.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: "40px 12px" }}>
                    <Receipt style={{ fontSize: 44, color: c.veryMuted, marginBottom: 8 }} />
                    <Typography sx={{ color: c.muted, fontSize: "0.9rem" }}>No return records found</Typography>
                    <Typography sx={{ color: c.mutedDark, fontSize: "0.75rem", mt: 0.5 }}>
                      {hasActiveFilters ? "Try changing the filters" : "Click 'New Return' to create one"}
                    </Typography>
                  </td></tr>
                ) : (
                  data.map((row, idx) => {
                    const totalQty = (row.items || []).reduce((s, i) => s + (i.quantity || 0), 0);
                    const rowTotal = getRecordTotal(row);
                    return (
                      <tr key={row._id}>
                        <td style={{ textAlign: "center", color: c.mutedDark }}>{(page - 1) * limit + idx + 1}</td>
                        <td style={{ textAlign: "center" }}>
                          <Chip label={formatDate(row.date)} size="small"
                            sx={{ bgcolor: c.chipBgSoft, color: c.textSec, border: `1px solid ${c.border10}`, fontSize: "0.7rem", fontWeight: 600, height: "24px" }} />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Chip label={`${(row.items || []).length} items`} size="small"
                            sx={{ bgcolor: "rgba(192, 132, 252, 0.1)", color: c.purpleText, border: "1px solid rgba(192, 132, 252, 0.3)", fontSize: "0.7rem", fontWeight: 600, height: "24px" }} />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Chip label={totalQty} size="small"
                            sx={{ bgcolor: "rgba(56, 189, 248, 0.1)", color: c.skyText, border: "1px solid rgba(56, 189, 248, 0.3)", fontSize: "0.7rem", fontWeight: 700, height: "24px" }} />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography sx={{ color: c.skyText, fontWeight: 800, fontSize: "0.9rem" }}>₹ {rowTotal.toLocaleString()}</Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <IconButton size="small" onClick={() => { setSelectedRecord(row); setViewDialogOpen(true); }}
                            sx={{ color: c.emeraldText, "&:hover": { bgcolor: "rgba(52, 211, 153, 0.1)" } }}>
                            <ViewIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => navigate(`/return-items/edit/${row._id}`)}
                            sx={{ color: c.skyText, "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" } }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => { setSelectedId(row._id); setDeleteDialogOpen(true); }}
                            sx={{ color: "#f43f5e", "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" } }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </ItemsTable>
          </TableScrollArea>

          {/* PAGINATION */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5, px: { xs: 2, sm: 3 }, py: 1.6,
            borderTop: `1px solid ${c.border08}`, flexShrink: 0 }}>
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              <Typography sx={{ color: c.muted, fontSize: "0.72rem", fontWeight: 600 }}>Rows:</Typography>
              {[10, 25, 50, 100].map((n) => (
                <Chip key={n} label={n} size="small" onClick={() => { setLimit(n); setPage(1); }}
                  sx={{ bgcolor: limit === n ? "rgba(56, 189, 248, 0.2)" : c.chipBgSoft,
                    color: limit === n ? c.skyText : c.muted,
                    border: limit === n ? "1px solid rgba(56, 189, 248, 0.5)" : `1px solid ${c.border10}`,
                    fontWeight: 700, fontSize: "0.7rem", height: "26px", cursor: "pointer" }} />
              ))}
              <Typography sx={{ color: c.mutedDark, fontSize: "0.72rem", ml: 0.5 }}>
                {totalEntries > 0 ? `${(page - 1) * limit + 1}–${Math.min(page * limit, totalEntries)} of ${totalEntries}` : "0 records"}
              </Typography>
            </Box>
            <Pagination count={Math.max(1, totalPages)} page={page} onChange={(_, v) => setPage(v)} disabled={loading} shape="rounded" size="small"
              sx={{ "& .MuiPaginationItem-root": { color: c.muted, borderColor: c.border10, fontWeight: 700, fontSize: "0.78rem",
                "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)", color: c.skyText } },
                "& .Mui-selected": { bgcolor: "rgba(56, 189, 248, 0.2) !important", color: `${c.skyText} !important`, borderColor: "rgba(56, 189, 248, 0.5) !important" } }} />
          </Box>
        </TableContainerDark>
      </Box>

      {/* FAB */}
      <Tooltip title="Back to Dashboard" placement="left">
        <Fab onClick={() => navigate("/dashboard")}
          sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1200, bgcolor: "#38bdf8", color: "#ffffff", width: 50, height: 50,
            boxShadow: "0 8px 24px rgba(56, 189, 248, 0.45)", "&:hover": { bgcolor: "#0ea5e9" } }}>
          <HomeIcon />
        </Fab>
      </Tooltip>

      {/* VIEW DIALOG */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth
        PaperProps={{ sx: { bgcolor: c.bannerBg, borderRadius: "16px", border: `1px solid ${c.border08}`, backgroundImage: "none", m: { xs: 1.5, sm: 4 }, width: { xs: "calc(100% - 24px)", sm: "100%" } } }}>
        {selectedRecord && (
          <>
            <DialogTitle sx={{ color: c.text, fontWeight: 800, fontSize: { xs: "0.95rem", sm: "1.1rem" }, borderBottom: `1px solid ${c.border08}`, display: "flex", justifyContent: "space-between", alignItems: "center", px: { xs: 2, sm: 3 } }}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: c.skyIconBg, color: c.skyText, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ViewIcon sx={{ fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography sx={{ color: c.skyText, fontWeight: 800, fontSize: "0.85rem", letterSpacing: 1, textTransform: "uppercase" }}>Return Details</Typography>
                  <Typography sx={{ color: c.muted, fontSize: "0.7rem", fontWeight: 500 }}>{formatDate(selectedRecord.date)}</Typography>
                </Box>
              </Box>
              <IconButton onClick={() => setViewDialogOpen(false)} size="small"
                sx={{ color: c.muted, "&:hover": { color: "#f43f5e", bgcolor: "rgba(244, 63, 94, 0.1)" } }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ bgcolor: c.cardBg, borderRadius: "12px", border: `1px solid ${c.border08}`, overflowX: "auto" }}>
                <Box component="table" sx={{
                  width: "100%", minWidth: "560px", borderCollapse: "collapse",
                  "& thead": { backgroundColor: dark ? "#111827" : "#f8fafc" },
                  "& thead th": { color: c.muted, fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.8px", padding: "12px",
                    borderBottom: `1px solid ${c.border08}`, textAlign: "left", whiteSpace: "nowrap" },
                  "& tbody tr": { borderBottom: `1px solid ${c.border05}` },
                  "& tbody td": { color: c.textSec, fontSize: "0.82rem", padding: "12px", whiteSpace: "nowrap" },
                }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>#</th>
                      <th>Item</th>
                      <th style={{ textAlign: "center" }}>MRP</th>
                      <th style={{ textAlign: "center" }}>Rate</th>
                      <th style={{ textAlign: "center" }}>Qty</th>
                      <th style={{ textAlign: "center" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedRecord.items || []).map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: "center" }}>{idx + 1}</td>
                        <td><Typography sx={{ color: c.text, fontWeight: 600, fontSize: "0.82rem" }}>{item.itemName}</Typography></td>
                        <td style={{ textAlign: "center" }}>₹ {item.mrp}</td>
                        <td style={{ textAlign: "center" }}>₹ {item.rate}</td>
                        <td style={{ textAlign: "center" }}>{item.quantity}</td>
                        <td style={{ textAlign: "center" }}>
                          <Typography sx={{ color: c.skyText, fontWeight: 700, fontSize: "0.82rem" }}>₹ {getItemTotal(item).toLocaleString()}</Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Box>
              </Box>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Box sx={{ bgcolor: "rgba(56, 189, 248, 0.1)", border: "1px solid rgba(56, 189, 248, 0.3)", borderRadius: "12px", px: 2.5, py: 1.2, display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography sx={{ color: c.muted, fontSize: "0.78rem" }}>Total Return Value:</Typography>
                  <Typography sx={{ color: c.skyText, fontWeight: 800, fontSize: "1.2rem" }}>
                    ₹ {getRecordTotal(selectedRecord).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: { xs: 2, sm: 2.5 }, borderTop: `1px solid ${c.border08}`, gap: 1 }}>
              <Button onClick={() => setViewDialogOpen(false)} sx={{ color: c.muted, textTransform: "none", fontWeight: 600, borderRadius: "10px" }}>Close</Button>
              <Button onClick={() => { setViewDialogOpen(false); navigate(`/return-items/edit/${selectedRecord._id}`); }} variant="contained"
                sx={{ bgcolor: "#38bdf8", color: "#ffffff", textTransform: "none", fontWeight: 700, borderRadius: "10px", px: 3, "&:hover": { bgcolor: "#0ea5e9" } }}>
                Edit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* DELETE ONE */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{ sx: { bgcolor: c.cardBg, borderRadius: "16px", border: `1px solid ${c.border08}`, backgroundImage: "none", m: { xs: 1.5, sm: 4 }, width: { xs: "calc(100% - 24px)", sm: "100%" } } }}>
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: c.muted }}>Are you sure you want to delete this return record? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleting} sx={{ color: c.muted, textTransform: "none", fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleDelete} disabled={deleting} variant="contained"
            sx={{ bgcolor: "#f43f5e", color: "#ffffff", textTransform: "none", fontWeight: 700, borderRadius: "10px", px: 3, "&:hover": { bgcolor: "#e11d48" } }}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE ALL */}
      <Dialog open={deleteAllDialogOpen} onClose={() => setDeleteAllDialogOpen(false)}
        PaperProps={{ sx: { bgcolor: c.cardBg, borderRadius: "16px", border: `1px solid ${c.border08}`, backgroundImage: "none", m: { xs: 1.5, sm: 4 }, width: { xs: "calc(100% - 24px)", sm: "100%" } } }}>
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>Delete All Return Records</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: c.muted }}>Are you sure you want to delete ALL return records? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setDeleteAllDialogOpen(false)} disabled={deleting} sx={{ color: c.muted, textTransform: "none", fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleDeleteAll} disabled={deleting} variant="contained"
            sx={{ bgcolor: "#f43f5e", color: "#ffffff", textTransform: "none", fontWeight: 700, borderRadius: "10px", px: 3, "&:hover": { bgcolor: "#e11d48" } }}>
            {deleting ? "Deleting..." : "Delete All"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SaleReturnList;