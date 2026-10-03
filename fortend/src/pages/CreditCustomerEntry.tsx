


// import React, { useEffect, useState, useRef, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   Box,
//   Button,
//   Typography,
//   Grid,
//   TextField,
//   Chip,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   CircularProgress,
//   Pagination,
//   Tooltip,
//   Fab,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   ArrowBack,
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Search,
//   CreditCard,
//   Receipt,
//   Person,
//   Refresh as RefreshIcon,
//   FilterAlt as FilterIcon,
//   Home as HomeIcon,
//   Clear as ClearIcon,
//   Close as CloseIcon,
//   Lock as LockIcon,
//   TrendingUp,
//   AccountBalanceWallet,
//   Functions,
//   Today,
// } from "@mui/icons-material";

// // ===================== TYPES =====================

// interface Customer {
//   _id: string;
//   companyName?: string;
//   displayName?: string;
//   phone?: string;
//   email?: string;
//   companyGST?: string;
// }

// interface CreditEntry {
//   _id: string;
//   customerId: Customer | string;
//   customerName: string;
//   billNo: string;
//   amount: number;
//   remarks: string;
//   date: string;
//   createdAt: string;
// }

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const getAuthHeaders = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
//   },
// });

// // ===================== STYLED COMPONENTS =====================

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

// /* ===== NEW: Analytical Summary Bar ===== */
// const AnalyticsBar = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(251, 146, 60, 0.25)",
//   padding: "16px 20px",
//   marginBottom: "16px",
//   boxShadow: "0 8px 24px rgba(251, 146, 60, 0.08)",
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
//       "linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.6), transparent)",
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
//   transition: "all 0.25s ease",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     borderColor: `${accent}66`,
//     boxShadow: `0 8px 20px ${accent}22`,
//   },
// }));

// const StyledTextField = styled(TextField)(() => ({
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "10px",
//     backgroundColor: "#090d16",
//     color: "#ffffff",
//     height: "42px",
//     "& fieldset": {
//       borderColor: "rgba(255, 255, 255, 0.1)",
//     },
//     "&:hover fieldset": {
//       borderColor: "rgba(251, 146, 60, 0.4)",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#fb923c",
//       borderWidth: "1.5px",
//     },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#ffffff",
//     fontSize: "0.85rem",
//     fontWeight: 500,
//     padding: "10px 12px",
//     "&::placeholder": {
//       color: "#6b7280",
//       opacity: 1,
//     },
//   },
//   "& input[type='date']::-webkit-calendar-picker-indicator": {
//     filter: "invert(0.7)",
//     cursor: "pointer",
//   },
// }));

// const FieldLabel = styled(Typography)(() => ({
//   color: "#9ca3af",
//   fontWeight: 700,
//   fontSize: "0.7rem",
//   letterSpacing: 1,
//   textTransform: "uppercase",
//   marginBottom: "8px",
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
//     backgroundColor: "rgba(251, 146, 60, 0.3)",
//     borderRadius: "8px",
//     "&:hover": { backgroundColor: "rgba(251, 146, 60, 0.5)" },
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
//     padding: "16px 12px",
//     borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//     textAlign: "left",
//     whiteSpace: "nowrap",
//     backgroundColor: "#111827",
//   },
//   "& tbody tr": {
//     transition: "all 0.2s ease",
//     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//   },
//   "& tbody tr:hover": {
//     backgroundColor: "rgba(251, 146, 60, 0.03)",
//   },
//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "14px 12px",
//     textAlign: "left",
//   },
// }));

// // ===================== HELPERS =====================

// const getCustomerName = (c: Customer | string): string => {
//   if (typeof c === "object" && c !== null) {
//     return c.companyName || c.displayName || "-";
//   }
//   return "-";
// };

// const getCustomerPhone = (c: Customer | string): string => {
//   if (typeof c === "object" && c !== null) {
//     return c.phone || "";
//   }
//   return "";
// };

// const todayStr = () => new Date().toISOString().split("T")[0];
// const firstOfMonthStr = () => {
//   const d = new Date();
//   return new Date(d.getFullYear(), d.getMonth(), 1)
//     .toISOString()
//     .split("T")[0];
// };

// const formatMoney = (n: number) =>
//   `₹ ${(Number(n) || 0).toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;

// // ===================== MAIN COMPONENT =====================

// const CreditCustomerEntry: React.FC = () => {
//   const navigate = useNavigate();

//   // List state
//   const [entries, setEntries] = useState<CreditEntry[]>([]);
//   const [listLoading, setListLoading] = useState(true);
//   const [grandTotal, setGrandTotal] = useState(0);
//   const [saving, setSaving] = useState(false);

//   // Pagination
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);

//   // Date Filter
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [appliedFrom, setAppliedFrom] = useState("");
//   const [appliedTo, setAppliedTo] = useState("");

//   // Form modal
//   const [formOpen, setFormOpen] = useState(false);

//   // Customer search
//   const [customerSearch, setCustomerSearch] = useState("");
//   const [customerResults, setCustomerResults] = useState<Customer[]>([]);
//   const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
//     null
//   );
//   const [loadingCustomers, setLoadingCustomers] = useState(false);

//   // Form state
//   const [billNo, setBillNo] = useState("");
//   const [amount, setAmount] = useState<number | "">("");
//   const [remarks, setRemarks] = useState("");
//   const [entryDate, setEntryDate] = useState<string>(todayStr());

//   // Delete dialog
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   const customerRef = useRef<HTMLDivElement>(null);

//   // ===================== OUTSIDE CLICK =====================
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (
//         customerRef.current &&
//         !customerRef.current.contains(e.target as Node)
//       ) {
//         setShowCustomerDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // ===================== FETCH CREDIT ENTRIES =====================
//   const fetchCreditEntries = async () => {
//     try {
//       setListLoading(true);

//       const params: any = { page, limit };
//       if (appliedFrom) params.fromDate = appliedFrom;
//       if (appliedTo) params.toDate = appliedTo;

//       const res = await axios.get(`${API_URL}/credit-customer`, {
//         params,
//         ...getAuthHeaders(),
//       });

//       if (res.data?.success === true) {
//         setEntries(res.data.data || []);
//         setGrandTotal(res.data.grandTotal || 0);

//         const count =
//           res.data.totalCount ??
//           res.data.total ??
//           res.data.count ??
//           (res.data.data ? res.data.data.length : 0);
//         const pages =
//           res.data.totalPages ?? Math.max(1, Math.ceil((count || 0) / limit));

//         setTotalCount(count);
//         setTotalPages(pages);
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to load credit entries");
//         setEntries([]);
//       }
//     } catch (error: any) {
//       console.error("Fetch credit entries error:", error);
//       if (error.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(
//           error.response?.data?.message || "Failed to load credit entries"
//         );
//       }
//       setEntries([]);
//     } finally {
//       setListLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCreditEntries();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, limit, appliedFrom, appliedTo]);

//   // ===================== FETCH / SEARCH CUSTOMERS =====================
//   useEffect(() => {
//     if (!formOpen) return;

//     const timer = setTimeout(async () => {
//       try {
//         setLoadingCustomers(true);

//         const isSearch = customerSearch.trim().length > 0;

//         const res = isSearch
//           ? await axios.get(`${API_URL}/customer/search`, {
//               params: { query: customerSearch, limit: 20 },
//               ...getAuthHeaders(),
//             })
//           : await axios.get(`${API_URL}/customer`, {
//               params: { page: 1, limit: 20 },
//               ...getAuthHeaders(),
//             });

//         if (res.data?.success) {
//           setCustomerResults(res.data.data || []);
//         }
//       } catch (err) {
//         console.error("Customer fetch error:", err);
//       } finally {
//         setLoadingCustomers(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [customerSearch, formOpen]);

//   // ===================== SELECT CUSTOMER =====================
//   const handleSelectCustomer = (c: Customer) => {
//     setSelectedCustomer(c);
//     setCustomerSearch(c.companyName || c.displayName || "");
//     setShowCustomerDropdown(false);
//   };

//   // ===================== FORM HANDLERS =====================
//   const resetForm = () => {
//     setSelectedCustomer(null);
//     setCustomerSearch("");
//     setBillNo("");
//     setAmount("");
//     setRemarks("");
//     setEntryDate(todayStr());
//     setShowCustomerDropdown(false);
//   };

//   const openFormModal = () => {
//     resetForm();
//     setFormOpen(true);
//   };

//   const closeFormModal = () => {
//     if (saving) return;
//     setFormOpen(false);
//     resetForm();
//   };

//   // ===================== DATE FILTER =====================
//   const handleApplyDateFilter = () => {
//     if (fromDate && toDate && fromDate > toDate) {
//       toast.error("From date cannot be after To date");
//       return;
//     }
//     setAppliedFrom(fromDate);
//     setAppliedTo(toDate);
//     setPage(1);
//   };

//   const handleClearDateFilter = () => {
//     setFromDate("");
//     setToDate("");
//     setAppliedFrom("");
//     setAppliedTo("");
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
//       const from = d.toISOString().split("T")[0];
//       setFromDate(from);
//       setToDate(t);
//       setAppliedFrom(from);
//       setAppliedTo(t);
//     } else if (type === "month") {
//       const from = firstOfMonthStr();
//       setFromDate(from);
//       setToDate(t);
//       setAppliedFrom(from);
//       setAppliedTo(t);
//     } else {
//       setFromDate("");
//       setToDate("");
//       setAppliedFrom("");
//       setAppliedTo("");
//     }
//     setPage(1);
//   };

//   const hasDateFilter = !!(appliedFrom || appliedTo);

//   // ===================== ✅ ANALYTICS (Derived) =====================
//   const analytics = useMemo(() => {
//     const count = entries.length;
//     const total = grandTotal || 0;

//     // Average per record (based on current page or total)
//     const avgPerRecord =
//       totalCount > 0 ? total / totalCount : count > 0 ? total / count : 0;

//     // Today's credit (from currently loaded entries)
//     const today = todayStr();
//     const todayTotal = entries
//       .filter((e) => {
//         const d = new Date(e.date || e.createdAt);
//         return d.toISOString().split("T")[0] === today;
//       })
//       .reduce((s, e) => s + (Number(e.amount) || 0), 0);

//     // Highest single credit
//     const highest = entries.reduce(
//       (max, e) => Math.max(max, Number(e.amount) || 0),
//       0
//     );

//     return {
//       total,
//       count: totalCount || count,
//       avgPerRecord,
//       todayTotal,
//       highest,
//     };
//   }, [entries, grandTotal, totalCount]);

//   // ===================== CREATE (API) =====================
//   const handleAddEntry = async () => {
//     if (!selectedCustomer) {
//       toast.error("Please select a customer from the list");
//       return;
//     }
//     if (!amount || Number(amount) <= 0) {
//       toast.error("Please enter a valid credit amount");
//       return;
//     }
//     if (!entryDate) {
//       toast.error("Please select a date");
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         customerId: selectedCustomer._id,
//         customerName:
//           selectedCustomer.companyName || selectedCustomer.displayName || "-",
//         billNo: billNo.trim() || "-",
//         amount: Number(amount),
//         remarks: remarks.trim() || "-",
//         date: entryDate,
//       };

//       const res = await axios.post(
//         `${API_URL}/credit-customer`,
//         payload,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success("Credit entry recorded successfully! 🎉");
//         closeFormModal();
//         setPage(1);
//         fetchCreditEntries();
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(
//           res.data?.errors?.[0] ||
//             res.data?.message ||
//             "Failed to record credit"
//         );
//       }
//     } catch (error: any) {
//       console.error("Create credit error:", error);
//       if (!error.response) {
//         toast.error("Network error! Please check your connection");
//       } else if (error.response?.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(
//           error.response?.data?.errors?.[0] ||
//             error.response?.data?.message ||
//             "Failed to record credit"
//         );
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ===================== DELETE (API) =====================
//   const handleDelete = async () => {
//     if (!deleteId) return;

//     try {
//       setDeleting(true);

//       const res = await axios.delete(
//         `${API_URL}/credit-customer/${deleteId}`,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success("Credit entry deleted");
//         setDeleteId(null);
//         if (entries.length === 1 && page > 1) {
//           setPage((p) => p - 1);
//         } else {
//           fetchCreditEntries();
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

//   // ===================== RENDER =====================

//   return (
//     <Box
//       sx={{
//         height: "85vh",
//         maxHeight: "100vh",
//         overflow: "hidden",
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
//           flex: 1,
//           minHeight: 0,
//         }}
//       >
//         {/* ================= HEADER BANNER ================= */}
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
//                     borderColor: "#fb923c",
//                     color: "#fb923c",
//                     bgcolor: "rgba(251, 146, 60, 0.08)",
//                   },
//                 }}
//               >
//                 Dashboard
//               </Button>

//               <Box display="flex" alignItems="center" gap={1.5}>
//                 <Box
//                   sx={{
//                     width: 40,
//                     height: 40,
//                     borderRadius: "10px",
//                     bgcolor: "#332208",
//                     color: "#fbbf24",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <CreditCard />
//                 </Box>
//                 <Typography
//                   variant="h5"
//                   fontWeight="800"
//                   sx={{
//                     fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   3. CREDIT CUSTOMER ENTRY
//                 </Typography>
//               </Box>
//             </Box>

//             <Box display="flex" alignItems="center" gap={1.5}>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={openFormModal}
//                 sx={{
//                   bgcolor: "#f97316",
//                   color: "#ffffff",
//                   fontWeight: 800,
//                   textTransform: "none",
//                   letterSpacing: 0.3,
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   fontSize: "0.8rem",
//                   boxShadow: "0 4px 14px rgba(249, 115, 22, 0.35)",
//                   "&:hover": {
//                     bgcolor: "#ea580c",
//                     boxShadow: "0 8px 20px rgba(249, 115, 22, 0.5)",
//                   },
//                 }}
//               >
//                 Credit Entry
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={<RefreshIcon />}
//                 onClick={fetchCreditEntries}
//                 disabled={listLoading}
//                 sx={{
//                   color: "#e5e7eb",
//                   borderColor: "rgba(255, 255, 255, 0.15)",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   fontSize: "0.8rem",
//                   "&:hover": {
//                     borderColor: "#fb923c",
//                     color: "#fb923c",
//                     bgcolor: "rgba(251, 146, 60, 0.08)",
//                   },
//                 }}
//               >
//                 Refresh
//               </Button>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* ================= ANALYTICAL SUMMARY BAR (NEW) ================= */}
//         <AnalyticsBar>
//           <Grid container spacing={1.5}>
//             {/* TOTAL CREDIT — main highlight */}
//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
//                     Total Credit{hasDateFilter ? " (Filtered)" : ""}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#fbbf24",
//                       fontWeight: 900,
//                       fontSize: { xs: "1.05rem", sm: "1.2rem" },
//                       mt: 0.3,
//                       letterSpacing: 0.3,
//                       textShadow: "0 0 14px rgba(251, 191, 36, 0.35)",
//                       lineHeight: 1.1,
//                     }}
//                   >
//                     {listLoading ? "..." : formatMoney(analytics.total)}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>

//             {/* RECORDS */}
//             <Grid size={{ xs: 6, sm: 6, md: 3 }}>
//               <StatCard accent="#fb923c">
//                 <Box
//                   sx={{
//                     width: 42,
//                     height: 42,
//                     borderRadius: "10px",
//                     bgcolor: "rgba(251, 146, 60, 0.15)",
//                     color: "#fb923c",
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
//                       color: "#fb923c",
//                       fontWeight: 900,
//                       fontSize: { xs: "1.05rem", sm: "1.2rem" },
//                       mt: 0.3,
//                       letterSpacing: 0.3,
//                       lineHeight: 1.1,
//                     }}
//                   >
//                     {listLoading ? "..." : analytics.count}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>

//             {/* AVERAGE */}
//             <Grid size={{ xs: 6, sm: 6, md: 3 }}>
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
//                       color: "#38bdf8",
//                       fontWeight: 900,
//                       fontSize: { xs: "1.05rem", sm: "1.2rem" },
//                       mt: 0.3,
//                       letterSpacing: 0.3,
//                       lineHeight: 1.1,
//                     }}
//                   >
//                     {listLoading ? "..." : formatMoney(analytics.avgPerRecord)}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>

//             {/* TODAY */}
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
//                   <Today sx={{ fontSize: 22 }} />
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
//                     Today's Credit
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#34d399",
//                       fontWeight: 900,
//                       fontSize: { xs: "1.05rem", sm: "1.2rem" },
//                       mt: 0.3,
//                       letterSpacing: 0.3,
//                       lineHeight: 1.1,
//                     }}
//                   >
//                     {listLoading ? "..." : formatMoney(analytics.todayTotal)}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>
//           </Grid>
//         </AnalyticsBar>

//         {/* ================= DATE FILTER BAR ================= */}
//         <FilterBar>
//           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
//             <Box display="flex" alignItems="center" gap={0.8}>
//               <FilterIcon sx={{ color: "#fb923c", fontSize: 18 }} />
//               <Typography
//                 sx={{
//                   color: "#fb923c",
//                   fontWeight: 800,
//                   fontSize: "0.75rem",
//                   letterSpacing: 1,
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Date Filter
//               </Typography>
//             </Box>

//             <StyledTextField
//               type="date"
//               size="small"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               sx={{ width: 160 }}
//             />
//             <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
//               to
//             </Typography>
//             <StyledTextField
//               type="date"
//               size="small"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               sx={{ width: 160 }}
//             />

//             <Button
//               size="small"
//               variant="contained"
//               onClick={handleApplyDateFilter}
//               sx={{
//                 bgcolor: "#f97316",
//                 color: "#fff",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "8px",
//                 px: 2,
//                 fontSize: "0.75rem",
//                 "&:hover": { bgcolor: "#ea580c" },
//               }}
//             >
//               Apply
//             </Button>

//             <Button
//               size="small"
//               variant="outlined"
//               startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
//               onClick={handleClearDateFilter}
//               disabled={!hasDateFilter && !fromDate && !toDate}
//               sx={{
//                 color: "#9ca3af",
//                 borderColor: "rgba(255, 255, 255, 0.15)",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "8px",
//                 px: 1.5,
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
//                 { k: "week", label: "Last 7d" },
//                 { k: "month", label: "This Month" },
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
//                     height: "26px",
//                     cursor: "pointer",
//                     "&:hover": {
//                       bgcolor: "rgba(251, 146, 60, 0.15)",
//                       borderColor: "rgba(251, 146, 60, 0.4)",
//                       color: "#fb923c",
//                     },
//                   }}
//                 />
//               ))}
//             </Box>

//             {hasDateFilter && (
//               <Chip
//                 label={`Active: ${appliedFrom || "..."} → ${
//                   appliedTo || "..."
//                 }`}
//                 size="small"
//                 sx={{
//                   bgcolor: "rgba(251, 146, 60, 0.15)",
//                   color: "#fb923c",
//                   border: "1px solid rgba(251, 146, 60, 0.4)",
//                   fontWeight: 700,
//                   fontSize: "0.7rem",
//                   height: "26px",
//                 }}
//               />
//             )}
//           </Box>
//         </FilterBar>

//         {/* ================= CREDIT LEDGER ================= */}
//         <TableContainerDark>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             px={3}
//             py={2}
//             sx={{
//               borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "#ffffff",
//                 fontWeight: 800,
//                 fontSize: "0.95rem",
//                 letterSpacing: 0.5,
//               }}
//             >
//               CREDIT CUSTOMER LEDGER
//             </Typography>
//             <Chip
//               label={`${totalCount} Credit Records`}
//               size="small"
//               sx={{
//                 bgcolor: "rgba(255, 255, 255, 0.05)",
//                 color: "#9ca3af",
//                 border: "1px solid rgba(255, 255, 255, 0.1)",
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
//                   <th>Customer Name</th>
//                   <th style={{ textAlign: "center" }}>Date</th>
//                   <th style={{ textAlign: "center" }}>Bill No</th>
//                   <th>Remarks</th>
//                   <th style={{ textAlign: "center" }}>Credit Amount (₹)</th>
//                   <th style={{ textAlign: "center", width: "80px" }}>
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {listLoading ? (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       style={{ textAlign: "center", padding: "40px 12px" }}
//                     >
//                       <CircularProgress sx={{ color: "#fb923c" }} size={32} />
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
//                       >
//                         Loading credit entries...
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : entries.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       style={{ textAlign: "center", padding: "40px 12px" }}
//                     >
//                       <Receipt
//                         style={{
//                           fontSize: 40,
//                           color: "#374151",
//                           marginBottom: 8,
//                         }}
//                       />
//                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
//                         No credit records found
//                       </Typography>
//                       <Typography
//                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
//                       >
//                         {hasDateFilter
//                           ? "Try changing the date filter"
//                           : "Click 'Credit Entry' to add your first entry"}
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   entries.map((row, idx) => (
//                     <tr key={row._id}>
//                       <td style={{ textAlign: "center", color: "#6b7280" }}>
//                         {(page - 1) * limit + idx + 1}
//                       </td>
//                       <td>
//                         <Typography
//                           sx={{
//                             color: "#ffffff",
//                             fontWeight: 700,
//                             fontSize: "0.85rem",
//                           }}
//                         >
//                           {row.customerName || getCustomerName(row.customerId)}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <Typography
//                           sx={{ color: "#9ca3af", fontSize: "0.8rem" }}
//                         >
//                           {new Date(
//                             row.date || row.createdAt
//                           ).toLocaleDateString("en-IN", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <Chip
//                           label={row.billNo}
//                           size="small"
//                           sx={{
//                             bgcolor: "rgba(156, 163, 175, 0.1)",
//                             color: "#e5e7eb",
//                             border: "1px solid rgba(156, 163, 175, 0.2)",
//                             fontSize: "0.7rem",
//                             fontWeight: 600,
//                             height: "24px",
//                           }}
//                         />
//                       </td>
//                       <td>
//                         <Typography
//                           sx={{ color: "#9ca3af", fontSize: "0.85rem" }}
//                         >
//                           {row.remarks}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <Typography
//                           sx={{
//                             color: "#fbbf24",
//                             fontWeight: 800,
//                             fontSize: "0.95rem",
//                           }}
//                         >
//                           ₹{" "}
//                           {row.amount.toLocaleString("en-IN", {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <IconButton
//                           size="small"
//                           onClick={() => setDeleteId(row._id)}
//                           sx={{
//                             color: "#f43f5e",
//                             "&:hover": {
//                               bgcolor: "rgba(244, 63, 94, 0.1)",
//                             },
//                           }}
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </td>
//                     </tr>
//                   ))
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
//               px: 3,
//               py: 1.8,
//               borderTop: "1px solid rgba(255, 255, 255, 0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={1.5}>
//               <Typography
//                 sx={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600 }}
//               >
//                 Rows per page:
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
//                         ? "rgba(251, 146, 60, 0.2)"
//                         : "rgba(255, 255, 255, 0.05)",
//                     color: limit === n ? "#fb923c" : "#9ca3af",
//                     border:
//                       limit === n
//                         ? "1px solid rgba(251, 146, 60, 0.5)"
//                         : "1px solid rgba(255, 255, 255, 0.1)",
//                     fontWeight: 700,
//                     fontSize: "0.7rem",
//                     height: "26px",
//                     cursor: "pointer",
//                   }}
//                 />
//               ))}
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.75rem", ml: 1 }}
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
//               disabled={listLoading}
//               shape="rounded"
//               size="small"
//               sx={{
//                 "& .MuiPaginationItem-root": {
//                   color: "#9ca3af",
//                   borderColor: "rgba(255, 255, 255, 0.1)",
//                   fontWeight: 700,
//                   fontSize: "0.8rem",
//                   "&:hover": {
//                     bgcolor: "rgba(251, 146, 60, 0.1)",
//                     color: "#fb923c",
//                   },
//                 },
//                 "& .Mui-selected": {
//                   bgcolor: "rgba(251, 146, 60, 0.2) !important",
//                   color: "#fb923c !important",
//                   borderColor: "rgba(251, 146, 60, 0.5) !important",
//                 },
//               }}
//             />
//           </Box>
//         </TableContainerDark>

//         {/* ================= FLOATING DASHBOARD BUTTON ================= */}
//         <Tooltip title="Back to Dashboard" placement="left">
//           <Fab
//             onClick={() => navigate("/dashboard")}
//             sx={{
//               position: "fixed",
//               bottom: 20,
//               right: 20,
//               zIndex: 1200,
//               bgcolor: "#38bdf8",
//               color: "#0d1527",
//               width: 52,
//               height: 52,
//               boxShadow: "0 8px 24px rgba(56, 189, 248, 0.45)",
//               "&:hover": { bgcolor: "#0ea5e9" },
//             }}
//           >
//             <HomeIcon />
//           </Fab>
//         </Tooltip>
//       </Box>

//       {/* ================= FORM MODAL ================= */}
//       <Dialog
//         open={formOpen}
//         onClose={closeFormModal}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{
//           sx: {
//             bgcolor: "#0d1527",
//             borderRadius: "16px",
//             border: "1px solid rgba(255, 255, 255, 0.08)",
//             backgroundImage: "none",
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//             px: 3,
//             py: 2,
//           }}
//         >
//           <Box display="flex" alignItems="center" gap={1.5}>
//             <Box
//               sx={{
//                 width: 32,
//                 height: 32,
//                 borderRadius: "8px",
//                 bgcolor: "#332208",
//                 color: "#fbbf24",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <LockIcon sx={{ fontSize: 18 }} />
//             </Box>
//             <Typography
//               sx={{
//                 color: "#fbbf24",
//                 fontWeight: 800,
//                 fontSize: "0.9rem",
//                 letterSpacing: 1,
//                 textTransform: "uppercase",
//               }}
//             >
//               Add Customer Credit / Udhaar Sales
//             </Typography>
//           </Box>
//           <IconButton
//             onClick={closeFormModal}
//             disabled={saving}
//             size="small"
//             sx={{
//               color: "#9ca3af",
//               "&:hover": {
//                 color: "#f43f5e",
//                 bgcolor: "rgba(244, 63, 94, 0.1)",
//               },
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent sx={{ p: 3 }}>
//           <Grid container spacing={2}>
//             {/* CUSTOMER */}
//             <Grid
//               size={{ xs: 12, sm: 6 }}
//               ref={customerRef}
//               sx={{ position: "relative" }}
//             >
//               <FieldLabel>Customer / Party Name *</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="Search or select customer..."
//                 value={customerSearch}
//                 onChange={(e) => {
//                   setCustomerSearch(e.target.value);
//                   if (selectedCustomer) setSelectedCustomer(null);
//                   setShowCustomerDropdown(true);
//                 }}
//                 onFocus={() => setShowCustomerDropdown(true)}
//                 InputProps={{
//                   startAdornment: (
//                     <Box
//                       component="span"
//                       sx={{ mr: 1, display: "flex", alignItems: "center" }}
//                     >
//                       {loadingCustomers ? (
//                         <CircularProgress
//                           size={16}
//                           sx={{ color: "#6b7280" }}
//                         />
//                       ) : (
//                         <Search sx={{ color: "#6b7280", fontSize: 18 }} />
//                       )}
//                     </Box>
//                   ),
//                 }}
//               />

//               {showCustomerDropdown && (
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: "100%",
//                     left: 0,
//                     right: 0,
//                     mt: 0.5,
//                     bgcolor: "#111827",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                     borderRadius: "10px",
//                     maxHeight: "240px",
//                     overflowY: "auto",
//                     zIndex: 1500,
//                     boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
//                   }}
//                 >
//                   {customerResults.length === 0 ? (
//                     <Box sx={{ p: 2 }}>
//                       <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
//                         {loadingCustomers
//                           ? "Loading customers..."
//                           : "No customers found"}
//                       </Typography>
//                     </Box>
//                   ) : (
//                     customerResults.map((c) => (
//                       <Box
//                         key={c._id}
//                         onClick={() => handleSelectCustomer(c)}
//                         sx={{
//                           px: 2,
//                           py: 1.3,
//                           cursor: "pointer",
//                           borderBottom:
//                             "1px solid rgba(255, 255, 255, 0.05)",
//                           "&:hover": {
//                             bgcolor: "rgba(251, 146, 60, 0.1)",
//                           },
//                           "&:last-child": { borderBottom: "none" },
//                         }}
//                       >
//                         <Box
//                           display="flex"
//                           justifyContent="space-between"
//                           alignItems="center"
//                           gap={1}
//                         >
//                           <Box
//                             display="flex"
//                             alignItems="center"
//                             gap={1}
//                             sx={{ minWidth: 0, flex: 1 }}
//                           >
//                             <Person
//                               sx={{
//                                 fontSize: 16,
//                                 color: "#fb923c",
//                                 flexShrink: 0,
//                               }}
//                             />
//                             <Typography
//                               sx={{
//                                 color: "#ffffff",
//                                 fontSize: "0.85rem",
//                                 fontWeight: 600,
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                                 whiteSpace: "nowrap",
//                               }}
//                             >
//                               {c.companyName || c.displayName || "-"}
//                             </Typography>
//                           </Box>
//                           {c.phone && (
//                             <Typography
//                               sx={{
//                                 color: "#9ca3af",
//                                 fontSize: "0.7rem",
//                                 flexShrink: 0,
//                               }}
//                             >
//                               📞 {c.phone}
//                             </Typography>
//                           )}
//                         </Box>
//                       </Box>
//                     ))
//                   )}
//                 </Box>
//               )}
//             </Grid>

//             {/* BILL NO */}
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>Bill / Invoice No.</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="e.g. INV-1042"
//                 value={billNo}
//                 onChange={(e) => setBillNo(e.target.value)}
//               />
//             </Grid>

//             {/* AMOUNT */}
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>Credit Amount (₹) *</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="number"
//                 placeholder="1500"
//                 value={amount}
//                 onChange={(e) =>
//                   setAmount(e.target.value === "" ? "" : Number(e.target.value))
//                 }
//                 inputProps={{ min: 0, step: 1 }}
//               />
//             </Grid>

//             {/* DATE */}
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>Credit Date *</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="date"
//                 value={entryDate}
//                 onChange={(e) => setEntryDate(e.target.value)}
//                 inputProps={{ max: todayStr() }}
//               />
//             </Grid>

//             {/* REMARKS */}
//             <Grid size={{ xs: 12, sm: 12 }}>
//               <FieldLabel>Remarks / Notes</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="Promised payment on Monday"
//                 value={remarks}
//                 onChange={(e) => setRemarks(e.target.value)}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>

//         <DialogActions
//           sx={{
//             px: 3,
//             pb: 3,
//             pt: 1,
//             borderTop: "1px solid rgba(255, 255, 255, 0.08)",
//             gap: 1,
//           }}
//         >
//           <Button
//             onClick={closeFormModal}
//             disabled={saving}
//             sx={{
//               color: "#9ca3af",
//               textTransform: "none",
//               fontWeight: 700,
//               borderRadius: "10px",
//               px: 3,
//               py: 1.1,
//               "&:hover": {
//                 color: "#e5e7eb",
//                 bgcolor: "rgba(255, 255, 255, 0.05)",
//               },
//             }}
//           >
//             Cancel
//           </Button>

//           <Button
//             variant="contained"
//             startIcon={
//               saving ? (
//                 <CircularProgress size={16} sx={{ color: "#ffffff" }} />
//               ) : (
//                 <AddIcon />
//               )
//             }
//             onClick={handleAddEntry}
//             disabled={saving}
//             sx={{
//               bgcolor: "#f97316",
//               color: "#ffffff",
//               fontWeight: 800,
//               textTransform: "uppercase",
//               letterSpacing: 0.5,
//               borderRadius: "10px",
//               px: 3,
//               py: 1.1,
//               fontSize: "0.8rem",
//               boxShadow: "0 4px 14px rgba(249, 115, 22, 0.3)",
//               "&:hover": {
//                 bgcolor: "#ea580c",
//                 boxShadow: "0 8px 20px rgba(249, 115, 22, 0.4)",
//               },
//               "&.Mui-disabled": {
//                 bgcolor: "rgba(249, 115, 22, 0.3)",
//                 color: "rgba(255, 255, 255, 0.5)",
//               },
//             }}
//           >
//             {saving ? "Recording..." : "Record Credit Entry"}
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
//           },
//         }}
//       >
//         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
//           Delete Credit Entry?
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             Are you sure you want to delete this credit entry? This action
//             cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2.5 }}>
//           <Button
//             onClick={() => setDeleteId(null)}
//             disabled={deleting}
//             sx={{
//               color: "#9ca3af",
//               textTransform: "none",
//               fontWeight: 600,
//               borderRadius: "10px",
//             }}
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
//               "&.Mui-disabled": {
//                 bgcolor: "rgba(244, 63, 94, 0.3)",
//                 color: "rgba(255, 255, 255, 0.5)",
//               },
//             }}
//           >
//             {deleting ? "Deleting..." : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CreditCustomerEntry;



import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Pagination,
  Tooltip,
  Fab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Add as AddIcon,
  Delete as DeleteIcon,
  Search,
  CreditCard,
  Receipt,
  Person,
  Refresh as RefreshIcon,
  FilterAlt as FilterIcon,
  Home as HomeIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  Lock as LockIcon,
  AccountBalanceWallet,
  Functions,
  Today,
  FiberManualRecord,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface Customer {
  _id: string;
  companyName?: string;
  displayName?: string;
  phone?: string;
  email?: string;
  companyGST?: string;
}

interface CreditEntry {
  _id: string;
  customerId: Customer | string;
  customerName: string;
  billNo: string;
  amount: number;
  remarks: string;
  date: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

// ===================== STYLED COMPONENTS =====================

const DarkBanner = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "18px 20px",
  marginBottom: "14px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  flexShrink: 0,
}));

const FilterBar = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  flexShrink: 0,
}));

/* ===== Analytical Summary Bar ===== */
const AnalyticsBar = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(251, 146, 60, 0.25)",
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: "0 8px 24px rgba(251, 146, 60, 0.08)",
  flexShrink: 0,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background:
      "linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.6), transparent)",
  },
}));

const StatCard = styled(Box)<{ accent: string }>(({ accent }) => ({
  backgroundColor: "#111827",
  borderRadius: "12px",
  border: `1px solid ${accent}22`,
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  height: "100%",
  transition: "all 0.25s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: `${accent}66`,
    boxShadow: `0 8px 20px ${accent}22`,
  },
}));

/* Quick filter chip */
const QuickFilterChip = styled(Button)<{ active?: boolean }>(
  ({ active }) => ({
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "0.75rem",
    padding: "8px 18px",
    minWidth: "auto",
    whiteSpace: "nowrap",
    backgroundColor: active ? "#fb923c" : "rgba(251, 146, 60, 0.15)",
    color: active ? "#0d1527" : "#fb923c",
    border: active
      ? "1px solid #fb923c"
      : "1px solid rgba(251, 146, 60, 0.3)",
    boxShadow: active ? "0 4px 14px rgba(251, 146, 60, 0.35)" : "none",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: active ? "#ea580c" : "rgba(251, 146, 60, 0.25)",
      borderColor: "#fb923c",
    },
  })
);

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "44px",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.12)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(251, 146, 60, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fb923c",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "10px 12px",
    "&::placeholder": {
      color: "#6b7280",
      opacity: 1,
    },
  },
  "& input[type='date']::-webkit-calendar-picker-indicator": {
    filter: "invert(0.7)",
    cursor: "pointer",
  },
  "& .MuiInputLabel-root": {
    color: "#9ca3af",
    fontSize: "0.8rem",
    "&.Mui-focused": { color: "#fb923c" },
  },
}));

const FieldLabel = styled(Typography)(() => ({
  color: "#9ca3af",
  fontWeight: 700,
  fontSize: "0.7rem",
  letterSpacing: 1,
  textTransform: "uppercase",
  marginBottom: "8px",
}));

const TableContainerDark = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  overflow: "hidden",
  marginBottom: "16px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
}));

const TableScrollArea = styled(Box)(() => ({
  overflow: "auto",
  flex: 1,
  minHeight: 0,
  "&::-webkit-scrollbar": { width: "8px", height: "8px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(251, 146, 60, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(251, 146, 60, 0.5)" },
  },
}));

const ItemsTable = styled("table")(() => ({
  width: "100%",
  minWidth: "820px",
  borderCollapse: "collapse",
  "& thead": {
    backgroundColor: "#111827",
    position: "sticky",
    top: 0,
    zIndex: 5,
  },
  "& thead th": {
    color: "#9ca3af",
    fontWeight: 700,
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    padding: "14px 12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    textAlign: "left",
    whiteSpace: "nowrap",
    backgroundColor: "#111827",
  },
  "& tbody tr": {
    transition: "all 0.2s ease",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  "& tbody tr:hover": {
    backgroundColor: "rgba(251, 146, 60, 0.03)",
  },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "12px",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
}));

// ===================== HELPERS =====================

const getCustomerName = (c: Customer | string): string => {
  if (typeof c === "object" && c !== null) {
    return c.companyName || c.displayName || "-";
  }
  return "-";
};

const todayStr = () => new Date().toISOString().split("T")[0];
const firstOfMonthStr = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1)
    .toISOString()
    .split("T")[0];
};

const formatMoney = (n: number) =>
  `₹ ${(Number(n) || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// ===================== MAIN COMPONENT =====================

const CreditCustomerEntry: React.FC = () => {
  const navigate = useNavigate();

  // List state
  const [entries, setEntries] = useState<CreditEntry[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [grandTotal, setGrandTotal] = useState(0);
  const [saving, setSaving] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Date Filter
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [activeQuick, setActiveQuick] = useState<
    "today" | "week" | "month" | "all" | ""
  >("");

  // Form modal
  const [formOpen, setFormOpen] = useState(false);

  // Customer search
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerResults, setCustomerResults] = useState<Customer[]>([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  // Form state
  const [billNo, setBillNo] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [remarks, setRemarks] = useState("");
  const [entryDate, setEntryDate] = useState<string>(todayStr());

  // Delete dialog
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const customerRef = useRef<HTMLDivElement>(null);

  // ===================== OUTSIDE CLICK =====================
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        customerRef.current &&
        !customerRef.current.contains(e.target as Node)
      ) {
        setShowCustomerDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ===================== FETCH CREDIT ENTRIES =====================
  const fetchCreditEntries = async () => {
    try {
      setListLoading(true);

      const params: any = { page, limit };
      if (appliedFrom) params.fromDate = appliedFrom;
      if (appliedTo) params.toDate = appliedTo;

      const res = await axios.get(`${API_URL}/credit-customer`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setEntries(res.data.data || []);
        setGrandTotal(res.data.grandTotal || 0);

        const count =
          res.data.totalCount ??
          res.data.total ??
          res.data.count ??
          (res.data.data ? res.data.data.length : 0);
        const pages =
          res.data.totalPages ?? Math.max(1, Math.ceil((count || 0) / limit));

        setTotalCount(count);
        setTotalPages(pages);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load credit entries");
        setEntries([]);
      }
    } catch (error: any) {
      console.error("Fetch credit entries error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load credit entries"
        );
      }
      setEntries([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchCreditEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, appliedFrom, appliedTo]);

  // ===================== FETCH / SEARCH CUSTOMERS =====================
  useEffect(() => {
    if (!formOpen) return;

    const timer = setTimeout(async () => {
      try {
        setLoadingCustomers(true);

        const isSearch = customerSearch.trim().length > 0;

        const res = isSearch
          ? await axios.get(`${API_URL}/customer/search`, {
              params: { query: customerSearch, limit: 20 },
              ...getAuthHeaders(),
            })
          : await axios.get(`${API_URL}/customer`, {
              params: { page: 1, limit: 20 },
              ...getAuthHeaders(),
            });

        if (res.data?.success) {
          setCustomerResults(res.data.data || []);
        }
      } catch (err) {
        console.error("Customer fetch error:", err);
      } finally {
        setLoadingCustomers(false);
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerSearch, formOpen]);

  // ===================== SELECT CUSTOMER =====================
  const handleSelectCustomer = (c: Customer) => {
    setSelectedCustomer(c);
    setCustomerSearch(c.companyName || c.displayName || "");
    setShowCustomerDropdown(false);
  };

  // ===================== FORM HANDLERS =====================
  const resetForm = () => {
    setSelectedCustomer(null);
    setCustomerSearch("");
    setBillNo("");
    setAmount("");
    setRemarks("");
    setEntryDate(todayStr());
    setShowCustomerDropdown(false);
  };

  const openFormModal = () => {
    resetForm();
    setFormOpen(true);
  };

  const closeFormModal = () => {
    if (saving) return;
    setFormOpen(false);
    resetForm();
  };

  // ===================== DATE FILTER =====================
  const handleApplyDateFilter = () => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setActiveQuick("");
    setPage(1);
  };

  const handleClearDateFilter = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
    setActiveQuick("");
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
      const from = d.toISOString().split("T")[0];
      setFromDate(from);
      setToDate(t);
      setAppliedFrom(from);
      setAppliedTo(t);
    } else if (type === "month") {
      const from = firstOfMonthStr();
      setFromDate(from);
      setToDate(t);
      setAppliedFrom(from);
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

  const hasDateFilter = !!(appliedFrom || appliedTo);

  // ===================== ANALYTICS =====================
  const analytics = useMemo(() => {
    const count = entries.length;
    const total = grandTotal || 0;

    const avgPerRecord =
      totalCount > 0 ? total / totalCount : count > 0 ? total / count : 0;

    const today = todayStr();
    const todayTotal = entries
      .filter((e) => {
        const d = new Date(e.date || e.createdAt);
        return d.toISOString().split("T")[0] === today;
      })
      .reduce((s, e) => s + (Number(e.amount) || 0), 0);

    return {
      total,
      count: totalCount || count,
      avgPerRecord,
      todayTotal,
    };
  }, [entries, grandTotal, totalCount]);

  // ===================== CREATE (API) =====================
  const handleAddEntry = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer from the list");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid credit amount");
      return;
    }
    if (!entryDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        customerId: selectedCustomer._id,
        customerName:
          selectedCustomer.companyName || selectedCustomer.displayName || "-",
        billNo: billNo.trim() || "-",
        amount: Number(amount),
        remarks: remarks.trim() || "-",
        date: entryDate,
      };

      const res = await axios.post(
        `${API_URL}/credit-customer`,
        payload,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Credit entry recorded successfully! 🎉");
        closeFormModal();
        setPage(1);
        fetchCreditEntries();
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(
          res.data?.errors?.[0] ||
            res.data?.message ||
            "Failed to record credit"
        );
      }
    } catch (error: any) {
      console.error("Create credit error:", error);
      if (!error.response) {
        toast.error("Network error! Please check your connection");
      } else if (error.response?.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(
          error.response?.data?.errors?.[0] ||
            error.response?.data?.message ||
            "Failed to record credit"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ===================== DELETE (API) =====================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const res = await axios.delete(
        `${API_URL}/credit-customer/${deleteId}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Credit entry deleted");
        setDeleteId(null);
        if (entries.length === 1 && page > 1) {
          setPage((p) => p - 1);
        } else {
          fetchCreditEntries();
        }
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to delete");
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    } finally {
      setDeleting(false);
    }
  };

  // ===================== RENDER =====================

  return (
    <Box
      sx={{
        minHeight: { xs: "100dvh", md: "85vh" },
        maxHeight: { md: "100vh" },
        overflow: { xs: "auto", md: "hidden" },
        bgcolor: "#090d16",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 1.5, md: 2.5 },
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
          flex: { md: 1 },
          minHeight: 0,
        }}
      >
        {/* ================= HEADER BANNER ================= */}
        <DarkBanner>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            gap={2}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
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
                  py: 0.8,
                  fontSize: "0.78rem",
                  minWidth: "auto",
                  "&:hover": {
                    borderColor: "#fb923c",
                    color: "#fb923c",
                    bgcolor: "rgba(251, 146, 60, 0.08)",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box sx={{ minWidth: 0 }}>
                <Box display="flex" alignItems="center" gap={1} mb={0.3}>
                  <FiberManualRecord
                    sx={{ fontSize: 10, color: "#fb923c" }}
                  />
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    sx={{
                      color: "#fb923c",
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                    }}
                  >
                    Credit Management
                  </Typography>
                </Box>

                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.35rem", md: "1.55rem" },
                    letterSpacing: 0.5,
                    lineHeight: 1.2,
                  }}
                >
                  3. CREDIT CUSTOMER ENTRY
                </Typography>

                {totalCount > 0 && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#9ca3af", mt: 0.3, display: "block" }}
                  >
                    {totalCount} total credit records
                  </Typography>
                )}
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
                startIcon={<AddIcon />}
                onClick={openFormModal}
                sx={{
                  bgcolor: "#f97316",
                  color: "#ffffff",
                  fontWeight: 800,
                  textTransform: "none",
                  letterSpacing: 0.3,
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.78rem",
                  boxShadow: "0 4px 14px rgba(249, 115, 22, 0.35)",
                  flex: { xs: "1 1 45%", sm: "none" },
                  "&:hover": {
                    bgcolor: "#ea580c",
                    boxShadow: "0 8px 20px rgba(249, 115, 22, 0.5)",
                  },
                }}
              >
                Credit Entry
              </Button>

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchCreditEntries}
                disabled={listLoading}
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.78rem",
                  flex: { xs: "1 1 45%", sm: "none" },
                  "&:hover": {
                    borderColor: "#fb923c",
                    color: "#fb923c",
                    bgcolor: "rgba(251, 146, 60, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= ANALYTICAL SUMMARY BAR ================= */}
        <AnalyticsBar>
          <Grid container spacing={1.5}>
            {/* TOTAL CREDIT */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard accent="#fbbf24">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: "rgba(251, 191, 36, 0.15)",
                    color: "#fbbf24",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <AccountBalanceWallet sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}
                  >
                    Total Credit{hasDateFilter ? " (Filtered)" : ""}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fbbf24",
                      fontWeight: 900,
                      fontSize: { xs: "1rem", sm: "1.15rem" },
                      mt: 0.3,
                      letterSpacing: 0.3,
                      textShadow: "0 0 14px rgba(251, 191, 36, 0.35)",
                      lineHeight: 1.1,
                    }}
                  >
                    {listLoading ? "..." : formatMoney(analytics.total)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>

            {/* RECORDS */}
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#fb923c">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: "rgba(251, 146, 60, 0.15)",
                    color: "#fb923c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Receipt sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}
                  >
                    Total Records
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fb923c",
                      fontWeight: 900,
                      fontSize: { xs: "1rem", sm: "1.15rem" },
                      mt: 0.3,
                      letterSpacing: 0.3,
                      lineHeight: 1.1,
                    }}
                  >
                    {listLoading ? "..." : analytics.count}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>

            {/* AVERAGE */}
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#38bdf8">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: "rgba(56, 189, 248, 0.15)",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Functions sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}
                  >
                    Avg / Record
                  </Typography>
                  <Typography
                    sx={{
                      color: "#38bdf8",
                      fontWeight: 900,
                      fontSize: { xs: "1rem", sm: "1.15rem" },
                      mt: 0.3,
                      letterSpacing: 0.3,
                      lineHeight: 1.1,
                    }}
                  >
                    {listLoading ? "..." : formatMoney(analytics.avgPerRecord)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>

            {/* TODAY */}
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#34d399">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: "rgba(52, 211, 153, 0.15)",
                    color: "#34d399",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Today sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}
                  >
                    Today's Credit
                  </Typography>
                  <Typography
                    sx={{
                      color: "#34d399",
                      fontWeight: 900,
                      fontSize: { xs: "1rem", sm: "1.15rem" },
                      mt: 0.3,
                      letterSpacing: 0.3,
                      lineHeight: 1.1,
                    }}
                  >
                    {listLoading ? "..." : formatMoney(analytics.todayTotal)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
          </Grid>
        </AnalyticsBar>

        {/* ================= DATE FILTER BAR ================= */}
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
                  onClick={handleApplyDateFilter}
                  sx={{
                    bgcolor: "#f97316",
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    py: 1.1,
                    fontSize: "0.78rem",
                    "&:hover": { bgcolor: "#ea580c" },
                  }}
                >
                  Apply
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
                  onClick={handleClearDateFilter}
                  disabled={!hasDateFilter && !fromDate && !toDate}
                  sx={{
                    color: "#9ca3af",
                    borderColor: "rgba(255, 255, 255, 0.15)",
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

          {/* Quick chips row */}
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
                color: "#9ca3af",
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
              onClick={() => applyQuickRange("today")}
            >
              Today
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "week"}
              onClick={() => applyQuickRange("week")}
            >
              Last 7d
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "month"}
              onClick={() => applyQuickRange("month")}
            >
              This Month
            </QuickFilterChip>
            <QuickFilterChip
              active={activeQuick === "all"}
              onClick={() => applyQuickRange("all")}
            >
              All
            </QuickFilterChip>

            {/* Active filter + page total */}
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
              {hasDateFilter && (
                <Chip
                  label={`${appliedFrom || "..."} → ${appliedTo || "..."}`}
                  size="small"
                  onDelete={handleClearDateFilter}
                  sx={{
                    bgcolor: "rgba(251, 146, 60, 0.15)",
                    color: "#fb923c",
                    border: "1px solid rgba(251, 146, 60, 0.4)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "28px",
                    "& .MuiChip-deleteIcon": {
                      color: "#fb923c",
                      "&:hover": { color: "#f43f5e" },
                    },
                  }}
                />
              )}

              {grandTotal > 0 && (
                <Chip
                  icon={
                    <AccountBalanceWallet
                      sx={{ fontSize: 16, color: "#fb923c !important" }}
                    />
                  }
                  label={`Page Total: ${formatMoney(
                    entries.reduce((s, e) => s + (Number(e.amount) || 0), 0)
                  )}`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(251, 146, 60, 0.1)",
                    color: "#fb923c",
                    border: "1px solid rgba(251, 146, 60, 0.3)",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    height: "28px",
                  }}
                />
              )}
            </Box>
          </Box>
        </FilterBar>

        {/* ================= CREDIT LEDGER ================= */}
        <TableContainerDark>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
            px={{ xs: 2, sm: 3 }}
            py={1.8}
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
                letterSpacing: 0.5,
              }}
            >
              CREDIT CUSTOMER LEDGER
            </Typography>
            <Chip
              label={`${totalCount} Credit Records`}
              size="small"
              sx={{
                bgcolor: "rgba(251, 146, 60, 0.1)",
                color: "#fb923c",
                border: "1px solid rgba(251, 146, 60, 0.3)",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: "26px",
              }}
            />
          </Box>

          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th>Customer Name</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Bill No</th>
                  <th>Remarks</th>
                  <th style={{ textAlign: "center" }}>Credit Amount (₹)</th>
                  <th style={{ textAlign: "center", width: "80px" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listLoading ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <CircularProgress sx={{ color: "#fb923c" }} size={32} />
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading credit entries...
                      </Typography>
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <Receipt
                        style={{
                          fontSize: 40,
                          color: "#374151",
                          marginBottom: 8,
                        }}
                      />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                        No credit records found
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
                      >
                        {hasDateFilter
                          ? "Try changing the date filter"
                          : "Click 'Credit Entry' to add your first entry"}
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  entries.map((row, idx) => (
                    <tr key={row._id}>
                      <td style={{ textAlign: "center", color: "#6b7280" }}>
                        {(page - 1) * limit + idx + 1}
                      </td>
                      <td>
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {row.customerName || getCustomerName(row.customerId)}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Chip
                          label={new Date(
                            row.date || row.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                          size="small"
                          sx={{
                            bgcolor: "rgba(156, 163, 175, 0.1)",
                            color: "#e5e7eb",
                            border: "1px solid rgba(156, 163, 175, 0.2)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            height: "24px",
                          }}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Chip
                          label={row.billNo}
                          size="small"
                          sx={{
                            bgcolor: "rgba(156, 163, 175, 0.1)",
                            color: "#e5e7eb",
                            border: "1px solid rgba(156, 163, 175, 0.2)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            height: "24px",
                          }}
                        />
                      </td>
                      <td>
                        <Typography
                          sx={{ color: "#9ca3af", fontSize: "0.85rem" }}
                        >
                          {row.remarks}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Typography
                          sx={{
                            color: "#fbbf24",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                          }}
                        >
                          ₹{" "}
                          {row.amount.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
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
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </ItemsTable>
          </TableScrollArea>

          {/* ================= PAGINATION BAR ================= */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              px: { xs: 2, sm: 3 },
              py: 1.6,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              <Typography
                sx={{ color: "#9ca3af", fontSize: "0.72rem", fontWeight: 600 }}
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
                        ? "rgba(251, 146, 60, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                    color: limit === n ? "#fb923c" : "#9ca3af",
                    border:
                      limit === n
                        ? "1px solid rgba(251, 146, 60, 0.5)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "26px",
                    cursor: "pointer",
                  }}
                />
              ))}
              <Typography
                sx={{ color: "#6b7280", fontSize: "0.72rem", ml: 0.5 }}
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
              disabled={listLoading}
              shape="rounded"
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#9ca3af",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  "&:hover": {
                    bgcolor: "rgba(251, 146, 60, 0.1)",
                    color: "#fb923c",
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(251, 146, 60, 0.2) !important",
                  color: "#fb923c !important",
                  borderColor: "rgba(251, 146, 60, 0.5) !important",
                },
              }}
            />
          </Box>
        </TableContainerDark>

        {/* ================= FLOATING DASHBOARD BUTTON ================= */}
        <Tooltip title="Back to Dashboard" placement="left">
          <Fab
            onClick={() => navigate("/dashboard")}
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 1200,
              bgcolor: "#fb923c",
              color: "#0d1527",
              width: 50,
              height: 50,
              boxShadow: "0 8px 24px rgba(251, 146, 60, 0.45)",
              "&:hover": { bgcolor: "#f97316" },
            }}
          >
            <HomeIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* ================= FORM MODAL ================= */}
      <Dialog
        open={formOpen}
        onClose={closeFormModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#0d1527",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundImage: "none",
            m: { xs: 1.5, sm: 4 },
            width: { xs: "calc(100% - 24px)", sm: "100%" },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            px: { xs: 2, sm: 3 },
            py: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                bgcolor: "#332208",
                color: "#fbbf24",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <LockIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                color: "#fbbf24",
                fontWeight: 800,
                fontSize: { xs: "0.78rem", sm: "0.9rem" },
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Add Customer Credit
            </Typography>
          </Box>
          <IconButton
            onClick={closeFormModal}
            disabled={saving}
            size="small"
            sx={{
              color: "#9ca3af",
              "&:hover": {
                color: "#f43f5e",
                bgcolor: "rgba(244, 63, 94, 0.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Grid container spacing={2}>
            {/* CUSTOMER */}
            <Grid
              size={{ xs: 12, sm: 6 }}
              ref={customerRef}
              sx={{ position: "relative" }}
            >
              <FieldLabel>Customer / Party Name *</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="Search or select customer..."
                value={customerSearch}
                onChange={(e) => {
                  setCustomerSearch(e.target.value);
                  if (selectedCustomer) setSelectedCustomer(null);
                  setShowCustomerDropdown(true);
                }}
                onFocus={() => setShowCustomerDropdown(true)}
                InputProps={{
                  startAdornment: (
                    <Box
                      component="span"
                      sx={{ mr: 1, display: "flex", alignItems: "center" }}
                    >
                      {loadingCustomers ? (
                        <CircularProgress
                          size={16}
                          sx={{ color: "#6b7280" }}
                        />
                      ) : (
                        <Search sx={{ color: "#6b7280", fontSize: 18 }} />
                      )}
                    </Box>
                  ),
                }}
              />

              {showCustomerDropdown && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 0.5,
                    bgcolor: "#111827",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    maxHeight: "240px",
                    overflowY: "auto",
                    zIndex: 1500,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {customerResults.length === 0 ? (
                    <Box sx={{ p: 2 }}>
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                        {loadingCustomers
                          ? "Loading customers..."
                          : "No customers found"}
                      </Typography>
                    </Box>
                  ) : (
                    customerResults.map((c) => (
                      <Box
                        key={c._id}
                        onClick={() => handleSelectCustomer(c)}
                        sx={{
                          px: 2,
                          py: 1.3,
                          cursor: "pointer",
                          borderBottom:
                            "1px solid rgba(255, 255, 255, 0.05)",
                          "&:hover": {
                            bgcolor: "rgba(251, 146, 60, 0.1)",
                          },
                          "&:last-child": { borderBottom: "none" },
                        }}
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          gap={1}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{ minWidth: 0, flex: 1 }}
                          >
                            <Person
                              sx={{
                                fontSize: 16,
                                color: "#fb923c",
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{
                                color: "#ffffff",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {c.companyName || c.displayName || "-"}
                            </Typography>
                          </Box>
                          {c.phone && (
                            <Typography
                              sx={{
                                color: "#9ca3af",
                                fontSize: "0.7rem",
                                flexShrink: 0,
                              }}
                            >
                              📞 {c.phone}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              )}
            </Grid>

            {/* BILL NO */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Bill / Invoice No.</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. INV-1042"
                value={billNo}
                onChange={(e) => setBillNo(e.target.value)}
              />
            </Grid>

            {/* AMOUNT */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Credit Amount (₹) *</FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="1500"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value === "" ? "" : Number(e.target.value))
                }
                inputProps={{ min: 0, step: 1 }}
              />
            </Grid>

            {/* DATE */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Credit Date *</FieldLabel>
              <StyledTextField
                fullWidth
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                inputProps={{ max: todayStr() }}
              />
            </Grid>

            {/* REMARKS */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <FieldLabel>Remarks / Notes</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="Promised payment on Monday"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 2, sm: 3 },
            pb: { xs: 2, sm: 3 },
            pt: 1,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            gap: 1,
          }}
        >
          <Button
            onClick={closeFormModal}
            disabled={saving}
            sx={{
              color: "#9ca3af",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 3,
              py: 1.1,
              "&:hover": {
                color: "#e5e7eb",
                bgcolor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            startIcon={
              saving ? (
                <CircularProgress size={16} sx={{ color: "#ffffff" }} />
              ) : (
                <AddIcon />
              )
            }
            onClick={handleAddEntry}
            disabled={saving}
            sx={{
              bgcolor: "#f97316",
              color: "#ffffff",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              borderRadius: "10px",
              px: 3,
              py: 1.1,
              fontSize: "0.78rem",
              boxShadow: "0 4px 14px rgba(249, 115, 22, 0.3)",
              "&:hover": {
                bgcolor: "#ea580c",
                boxShadow: "0 8px 20px rgba(249, 115, 22, 0.4)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(249, 115, 22, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {saving ? "Recording..." : "Record Credit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= DELETE DIALOG ================= */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        PaperProps={{
          sx: {
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            m: { xs: 1.5, sm: 4 },
            width: { xs: "calc(100% - 24px)", sm: "100%" },
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete Credit Entry?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete this credit entry? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteId(null)}
            disabled={deleting}
            sx={{
              color: "#9ca3af",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleting}
            variant="contained"
            sx={{
              bgcolor: "#f43f5e",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 3,
              "&:hover": { bgcolor: "#e11d48" },
              "&.Mui-disabled": {
                bgcolor: "rgba(244, 63, 94, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreditCustomerEntry;