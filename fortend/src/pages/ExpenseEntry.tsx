




// import React, { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   Box,
//   Button,
//   Typography,
//   Grid,
//   TextField,
//   MenuItem,
//   Select,
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
//   Edit as EditIcon,
//   Receipt,
//   LocalGasStation,
//   Home as HomeIcon,
//   Refresh as RefreshIcon,
//   FilterAlt as FilterIcon,
//   Clear as ClearIcon,
//   Close as CloseIcon,
//   Lock as LockIcon,
//   AccountBalanceWallet,
//   Functions,
//   Category as CategoryIcon,
// } from "@mui/icons-material";

// // ===================== TYPES =====================

// interface Expense {
//   _id: string;
//   category: string;
//   description: string;
//   paidVia: string;
//   amount: number;
//   date: string;
//   createdAt: string;
// }

// // ===================== CONSTANTS =====================

// const EXPENSE_CATEGORIES = [
//   "Diesel / Fuel",
//   "Toll / Parking",
//   "Driver Allowance",
//   "Food / Refreshment",
//   "Vehicle Repair",
//   "Loading / Unloading",
//   "Other",
// ];

// const PAYMENT_METHODS = [
//   "Cash from Route Collection",
//   "Company Cash",
//   "UPI / Online",
//   "Credit",
// ];

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const getAuthHeaders = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
//   },
// });

// const todayStr = () => new Date().toISOString().split("T")[0];

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

// /* ===== NEW: Analytical Summary Bar ===== */
// const AnalyticsBar = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(244, 63, 94, 0.25)",
//   padding: "16px 20px",
//   marginBottom: "16px",
//   boxShadow: "0 8px 24px rgba(244, 63, 94, 0.08)",
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
//       "linear-gradient(90deg, transparent, rgba(244, 63, 94, 0.6), transparent)",
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
//     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
//     "&:hover fieldset": { borderColor: "rgba(244, 63, 94, 0.4)" },
//     "&.Mui-focused fieldset": {
//       borderColor: "#f43f5e",
//       borderWidth: "1.5px",
//     },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#ffffff",
//     fontSize: "0.85rem",
//     fontWeight: 500,
//     padding: "10px 12px",
//     "&::placeholder": { color: "#6b7280", opacity: 1 },
//   },
//   "& input[type='date']::-webkit-calendar-picker-indicator": {
//     filter: "invert(0.7)",
//     cursor: "pointer",
//   },
// }));

// const StyledSelect = styled(Select)(() => ({
//   borderRadius: "10px",
//   backgroundColor: "#090d16",
//   color: "#ffffff",
//   height: "42px",
//   width: "100%",
//   fontSize: "0.85rem",
//   fontWeight: 500,
//   "& .MuiOutlinedInput-notchedOutline": {
//     borderColor: "rgba(255, 255, 255, 0.1)",
//   },
//   "&:hover .MuiOutlinedInput-notchedOutline": {
//     borderColor: "rgba(244, 63, 94, 0.4)",
//   },
//   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#f43f5e",
//     borderWidth: "1.5px",
//   },
//   "& .MuiSvgIcon-root": { color: "#9ca3af" },
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
//   overflow: "hidden",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
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
//     backgroundColor: "rgba(244, 63, 94, 0.3)",
//     borderRadius: "8px",
//     "&:hover": { backgroundColor: "rgba(244, 63, 94, 0.5)" },
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
//   "& tbody tr:hover": { backgroundColor: "rgba(244, 63, 94, 0.03)" },
//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "14px 12px",
//     textAlign: "left",
//   },
// }));

// // ===================== HELPERS =====================

// const firstOfMonthStr = () => {
//   const d = new Date();
//   return new Date(d.getFullYear(), d.getMonth(), 1)
//     .toISOString()
//     .split("T")[0];
// };

// const formatMoney = (n: number) =>
//   `₹ ${(Number(n) || 0).toLocaleString("en-IN", {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   })}`;

// // ===================== MAIN =====================

// const ExpenseEntry: React.FC = () => {
//   const navigate = useNavigate();

//   const [expenses, setExpenses] = useState<Expense[]>([]);
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

//   // Form state
//   const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
//   const [description, setDescription] = useState("");
//   const [paidVia, setPaidVia] = useState(PAYMENT_METHODS[0]);
//   const [amount, setAmount] = useState<number | "">("");
//   const [expenseDate, setExpenseDate] = useState<string>(todayStr());

//   // Edit mode
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // Delete dialogs
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState(false);
//   const [deleteAllOpen, setDeleteAllOpen] = useState(false);

//   // ===================== FETCH =====================
//   const fetchExpenses = async () => {
//     try {
//       setListLoading(true);

//       const params: any = { page, limit };
//       if (appliedFrom) params.fromDate = appliedFrom;
//       if (appliedTo) params.toDate = appliedTo;

//       const res = await axios.get(`${API_URL}/expense`, {
//         params,
//         ...getAuthHeaders(),
//       });

//       if (res.data?.success === true) {
//         setExpenses(res.data.data || []);

//         const gt =
//           res.data.grandTotal ??
//           res.data.totalAmount ??
//           res.data.totalSum ??
//           res.data.totalExpenses ??
//           0;
//         setGrandTotal(Number(gt) || 0);

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
//         toast.error(res.data?.message || "Failed to load expenses");
//         setExpenses([]);
//       }
//     } catch (error: any) {
//       console.error("Fetch expenses error:", error);
//       if (error.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(error.response?.data?.message || "Failed to load expenses");
//       }
//       setExpenses([]);
//     } finally {
//       setListLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, limit, appliedFrom, appliedTo]);

//   // ===================== ✅ ANALYTICS (Derived) =====================
//   const analytics = useMemo(() => {
//     const pageCount = expenses.length;

//     const pageSum = expenses.reduce(
//       (s, e) => s + (Number(e.amount) || 0),
//       0
//     );

//     const total = grandTotal > 0 ? grandTotal : pageSum;

//     const avgPerEntry =
//       totalCount > 0
//         ? total / totalCount
//         : pageCount > 0
//         ? total / pageCount
//         : 0;

//     // Top category (based on current page)
//     const catMap = new Map<string, number>();
//     expenses.forEach((e) => {
//       const c = String(e.category || "Other");
//       catMap.set(c, (catMap.get(c) || 0) + (Number(e.amount) || 0));
//     });
//     let topCategory = "—";
//     let topCategoryAmount = 0;
//     catMap.forEach((val, key) => {
//       if (val > topCategoryAmount) {
//         topCategoryAmount = val;
//         topCategory = key;
//       }
//     });

//     // Today's expense (from current page)
//     const today = todayStr();
//     const todayTotal = expenses
//       .filter((e) => {
//         const d = new Date(e.date || e.createdAt);
//         return d.toISOString().split("T")[0] === today;
//       })
//       .reduce((s, e) => s + (Number(e.amount) || 0), 0);

//     return {
//       total,
//       count: totalCount || pageCount,
//       avgPerEntry,
//       topCategory,
//       topCategoryAmount,
//       todayTotal,
//     };
//   }, [expenses, grandTotal, totalCount]);

//   // ===================== FORM HANDLERS =====================
//   const resetForm = () => {
//     setCategory(EXPENSE_CATEGORIES[0]);
//     setDescription("");
//     setPaidVia(PAYMENT_METHODS[0]);
//     setAmount("");
//     setExpenseDate(todayStr());
//     setEditingId(null);
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

//   // ===================== CREATE / UPDATE =====================
//   const handleAddOrUpdate = async () => {
//     if (!description.trim()) {
//       toast.error("Please enter description");
//       return;
//     }
//     if (!amount || Number(amount) <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }
//     if (!expenseDate) {
//       toast.error("Please select a date");
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         category,
//         description: description.trim(),
//         paidVia,
//         amount: Number(amount),
//         date: expenseDate,
//       };

//       if (editingId) {
//         const res = await axios.put(
//           `${API_URL}/expense/${editingId}`,
//           payload,
//           getAuthHeaders()
//         );

//         if (res.data?.success === true) {
//           toast.success("Expense updated successfully");
//           closeFormModal();
//           fetchExpenses();
//         } else if (res.data?.message === "Unauthorized") {
//           toast.error("Session expired! Please login again");
//           localStorage.removeItem("erptoken");
//           setTimeout(() => navigate("/login"), 1500);
//         } else {
//           toast.error(
//             res.data?.errors?.[0] ||
//               res.data?.message ||
//               "Failed to update expense"
//           );
//         }
//       } else {
//         const res = await axios.post(
//           `${API_URL}/expense`,
//           payload,
//           getAuthHeaders()
//         );

//         if (res.data?.success === true) {
//           toast.success("Expense added successfully");
//           closeFormModal();
//           setPage(1);
//           fetchExpenses();
//         } else if (res.data?.message === "Unauthorized") {
//           toast.error("Session expired! Please login again");
//           localStorage.removeItem("erptoken");
//           setTimeout(() => navigate("/login"), 1500);
//         } else {
//           toast.error(
//             res.data?.errors?.[0] ||
//               res.data?.message ||
//               "Failed to add expense"
//           );
//         }
//       }
//     } catch (error: any) {
//       console.error("Save expense error:", error);
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
//             "Failed to save expense"
//         );
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ===================== EDIT =====================
//   const handleEdit = (expense: Expense) => {
//     setEditingId(expense._id);
//     setCategory(expense.category);
//     setDescription(expense.description);
//     setPaidVia(expense.paidVia);
//     setAmount(expense.amount);

//     const d = expense.date || expense.createdAt;
//     const formatted = d ? new Date(d).toISOString().split("T")[0] : todayStr();
//     setExpenseDate(formatted);

//     setFormOpen(true);
//   };

//   // ===================== DELETE =====================
//   const handleDelete = async () => {
//     if (!deleteId) return;

//     try {
//       setDeleting(true);

//       const res = await axios.delete(
//         `${API_URL}/expense/${deleteId}`,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success("Expense deleted");
//         if (editingId === deleteId) resetForm();
//         setDeleteId(null);
//         if (expenses.length === 1 && page > 1) {
//           setPage((p) => p - 1);
//         } else {
//           fetchExpenses();
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

//   const handleDeleteAll = async () => {
//     try {
//       setDeleting(true);

//       const res = await axios.delete(
//         `${API_URL}/expense/delete-all`,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success(res.data?.message || "All expenses deleted");
//         setDeleteAllOpen(false);
//         resetForm();
//         setPage(1);
//         fetchExpenses();
//       } else {
//         toast.error(res.data?.message || "Failed to delete all");
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Delete all failed");
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
//         {/* ================= HEADER ================= */}
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
//                     borderColor: "#38bdf8",
//                     color: "#38bdf8",
//                     bgcolor: "rgba(56, 189, 248, 0.08)",
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
//                     bgcolor: "#31121d",
//                     color: "#f43f5e",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <LocalGasStation />
//                 </Box>
//                 <Typography
//                   variant="h5"
//                   fontWeight="800"
//                   sx={{
//                     fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
//                     letterSpacing: 0.5,
//                     color: "#ffffff",
//                   }}
//                 >
//                   6. ROUTE & TRIP EXPENSES ENTRY
//                 </Typography>
//               </Box>
//             </Box>

//             <Box display="flex" gap={1.5} alignItems="center" flexWrap="wrap">
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={openFormModal}
//                 sx={{
//                   bgcolor: "#f43f5e",
//                   color: "#ffffff",
//                   fontWeight: 800,
//                   textTransform: "none",
//                   letterSpacing: 0.3,
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   fontSize: "0.8rem",
//                   boxShadow: "0 4px 14px rgba(244, 63, 94, 0.35)",
//                   "&:hover": {
//                     bgcolor: "#e11d48",
//                     boxShadow: "0 8px 20px rgba(244, 63, 94, 0.5)",
//                   },
//                 }}
//               >
//                 Expense Entry
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={<RefreshIcon />}
//                 onClick={fetchExpenses}
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
//                     borderColor: "#38bdf8",
//                     color: "#38bdf8",
//                     bgcolor: "rgba(56, 189, 248, 0.08)",
//                   },
//                 }}
//               >
//                 Refresh
//               </Button>

//               {totalCount > 0 && (
//                 <Button
//                   variant="outlined"
//                   startIcon={<DeleteIcon />}
//                   onClick={() => setDeleteAllOpen(true)}
//                   sx={{
//                     color: "#f43f5e",
//                     borderColor: "rgba(244, 63, 94, 0.3)",
//                     fontWeight: 700,
//                     textTransform: "none",
//                     borderRadius: "10px",
//                     px: 2,
//                     py: 1,
//                     fontSize: "0.8rem",
//                     "&:hover": {
//                       borderColor: "#f43f5e",
//                       bgcolor: "rgba(244, 63, 94, 0.08)",
//                     },
//                   }}
//                 >
//                   Delete All
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* ================= ANALYTICAL SUMMARY BAR (NEW) ================= */}
//         <AnalyticsBar>
//           <Grid container spacing={1.5}>
//             {/* TOTAL EXPENSES */}
//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <StatCard accent="#f43f5e">
//                 <Box
//                   sx={{
//                     width: 42,
//                     height: 42,
//                     borderRadius: "10px",
//                     bgcolor: "rgba(244, 63, 94, 0.15)",
//                     color: "#f43f5e",
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
//                     Total Expenses{hasDateFilter ? " (Filtered)" : ""}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#f43f5e",
//                       fontWeight: 900,
//                       fontSize: { xs: "1.05rem", sm: "1.2rem" },
//                       mt: 0.3,
//                       letterSpacing: 0.3,
//                       textShadow: "0 0 14px rgba(244, 63, 94, 0.4)",
//                       lineHeight: 1.1,
//                     }}
//                   >
//                     {listLoading ? "..." : formatMoney(analytics.total)}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>

//             {/* TOTAL ENTRIES */}
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
//                     Total Entries
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#c084fc",
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

//             {/* TOP CATEGORY */}
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
//                   <CategoryIcon sx={{ fontSize: 22 }} />
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
//                     Top Category
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#fbbf24",
//                       fontWeight: 900,
//                       fontSize: "0.9rem",
//                       mt: 0.3,
//                       letterSpacing: 0.2,
//                       lineHeight: 1.2,
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       whiteSpace: "nowrap",
//                     }}
//                     title={analytics.topCategory}
//                   >
//                     {listLoading ? "..." : analytics.topCategory}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.65rem",
//                       fontWeight: 600,
//                       mt: 0.2,
//                     }}
//                   >
//                     {formatMoney(analytics.topCategoryAmount)}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>

//             {/* AVG / ENTRY */}
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
//                     Avg / Entry
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
//                     {listLoading ? "..." : formatMoney(analytics.avgPerEntry)}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontSize: "0.65rem",
//                       fontWeight: 600,
//                       mt: 0.2,
//                     }}
//                   >
//                     Today: {formatMoney(analytics.todayTotal)}
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
//               <FilterIcon sx={{ color: "#f43f5e", fontSize: 18 }} />
//               <Typography
//                 sx={{
//                   color: "#f43f5e",
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
//                 bgcolor: "#f43f5e",
//                 color: "#fff",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "8px",
//                 px: 2,
//                 fontSize: "0.75rem",
//                 "&:hover": { bgcolor: "#e11d48" },
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
//                       bgcolor: "rgba(244, 63, 94, 0.15)",
//                       borderColor: "rgba(244, 63, 94, 0.4)",
//                       color: "#f43f5e",
//                     },
//                   }}
//                 />
//               ))}
//             </Box>

//             {hasDateFilter && (
//               <Chip
//                 label={`Active: ${appliedFrom || "..."} → ${appliedTo || "..."}`}
//                 size="small"
//                 sx={{
//                   bgcolor: "rgba(244, 63, 94, 0.15)",
//                   color: "#f43f5e",
//                   border: "1px solid rgba(244, 63, 94, 0.4)",
//                   fontWeight: 700,
//                   fontSize: "0.7rem",
//                   height: "26px",
//                 }}
//               />
//             )}
//           </Box>
//         </FilterBar>

//         {/* ================= LOG SHEET ================= */}
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
//               ROUTE EXPENSES LOG SHEET
//             </Typography>
//             <Chip
//               label={`${totalCount} Expenses Logged`}
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
//                   <th>Category</th>
//                   <th>Description</th>
//                   <th>Date</th>
//                   <th>Paid Via</th>
//                   <th style={{ textAlign: "right" }}>Amount (₹)</th>
//                   <th style={{ textAlign: "center", width: "110px" }}>
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
//                       <CircularProgress sx={{ color: "#f43f5e" }} size={32} />
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
//                       >
//                         Loading expenses...
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : expenses.length === 0 ? (
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
//                         No expenses found
//                       </Typography>
//                       <Typography
//                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
//                       >
//                         {hasDateFilter
//                           ? "Try changing the date filter"
//                           : "Click 'Expense Entry' to add your first expense"}
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   expenses.map((row, idx) => (
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
//                           {row.category}
//                         </Typography>
//                       </td>
//                       <td>
//                         <Typography
//                           sx={{ color: "#9ca3af", fontSize: "0.85rem" }}
//                         >
//                           {row.description}
//                         </Typography>
//                       </td>
//                       <td>
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
//                       <td>
//                         <Chip
//                           label={row.paidVia}
//                           size="small"
//                           sx={{
//                             bgcolor: "rgba(255, 255, 255, 0.05)",
//                             color: "#e5e7eb",
//                             border: "1px solid rgba(255, 255, 255, 0.1)",
//                             fontWeight: 600,
//                             fontSize: "0.7rem",
//                             height: "24px",
//                           }}
//                         />
//                       </td>
//                       <td style={{ textAlign: "right" }}>
//                         <Typography
//                           sx={{
//                             color: "#f43f5e",
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
//                           onClick={() => handleEdit(row)}
//                           sx={{
//                             color: "#38bdf8",
//                             "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
//                           }}
//                         >
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           onClick={() => setDeleteId(row._id)}
//                           sx={{
//                             color: "#f43f5e",
//                             "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
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
//                         ? "rgba(244, 63, 94, 0.2)"
//                         : "rgba(255, 255, 255, 0.05)",
//                     color: limit === n ? "#f43f5e" : "#9ca3af",
//                     border:
//                       limit === n
//                         ? "1px solid rgba(244, 63, 94, 0.5)"
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
//                     bgcolor: "rgba(244, 63, 94, 0.1)",
//                     color: "#f43f5e",
//                   },
//                 },
//                 "& .Mui-selected": {
//                   bgcolor: "rgba(244, 63, 94, 0.2) !important",
//                   color: "#f43f5e !important",
//                   borderColor: "rgba(244, 63, 94, 0.5) !important",
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
//             width: 52,
//             height: 52,
//             boxShadow: "0 8px 24px rgba(56, 189, 248, 0.45)",
//             "&:hover": { bgcolor: "#0ea5e9" },
//           }}
//         >
//           <HomeIcon />
//         </Fab>
//       </Tooltip>

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
//                 bgcolor: "#31121d",
//                 color: "#f43f5e",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <LockIcon sx={{ fontSize: 18 }} />
//             </Box>
//             <Typography
//               sx={{
//                 color: "#f43f5e",
//                 fontWeight: 800,
//                 fontSize: "0.9rem",
//                 letterSpacing: 1,
//                 textTransform: "uppercase",
//               }}
//             >
//               {editingId
//                 ? "Edit Expense Entry"
//                 : "Log Vehicle & Driver Expenses"}
//             </Typography>
//             {editingId && (
//               <Chip
//                 label="EDITING"
//                 size="small"
//                 sx={{
//                   ml: 1,
//                   bgcolor: "rgba(251, 191, 36, 0.15)",
//                   color: "#fbbf24",
//                   border: "1px solid rgba(251, 191, 36, 0.3)",
//                   fontWeight: 700,
//                   fontSize: "0.65rem",
//                   height: "22px",
//                 }}
//               />
//             )}
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
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>Expense Category</FieldLabel>
//               <StyledSelect
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value as string)}
//                 MenuProps={{
//                   PaperProps: {
//                     sx: {
//                       bgcolor: "#111827",
//                       border: "1px solid rgba(255, 255, 255, 0.08)",
//                       "& .MuiMenuItem-root": {
//                         color: "#e5e7eb",
//                         fontSize: "0.85rem",
//                         "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
//                         "&.Mui-selected": {
//                           bgcolor: "rgba(244, 63, 94, 0.15)",
//                           color: "#f43f5e",
//                         },
//                       },
//                     },
//                   },
//                 }}
//               >
//                 {EXPENSE_CATEGORIES.map((c) => (
//                   <MenuItem key={c} value={c}>
//                     {c}
//                   </MenuItem>
//                 ))}
//               </StyledSelect>
//             </Grid>

//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>Payment By</FieldLabel>
//               <StyledSelect
//                 value={paidVia}
//                 onChange={(e) => setPaidVia(e.target.value as string)}
//                 MenuProps={{
//                   PaperProps: {
//                     sx: {
//                       bgcolor: "#111827",
//                       border: "1px solid rgba(255, 255, 255, 0.08)",
//                       "& .MuiMenuItem-root": {
//                         color: "#e5e7eb",
//                         fontSize: "0.85rem",
//                         "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
//                         "&.Mui-selected": {
//                           bgcolor: "rgba(244, 63, 94, 0.15)",
//                           color: "#f43f5e",
//                         },
//                       },
//                     },
//                   },
//                 }}
//               >
//                 {PAYMENT_METHODS.map((p) => (
//                   <MenuItem key={p} value={p}>
//                     {p}
//                   </MenuItem>
//                 ))}
//               </StyledSelect>
//             </Grid>

//             <Grid size={{ xs: 12, sm: 8 }}>
//               <FieldLabel>Description / Reason *</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="e.g. 20 Liters Diesel at HP Pump"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, sm: 4 }}>
//               <FieldLabel>Amount (₹) *</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="number"
//                 placeholder="850"
//                 value={amount}
//                 onChange={(e) =>
//                   setAmount(e.target.value === "" ? "" : Number(e.target.value))
//                 }
//                 inputProps={{ min: 0, step: 1 }}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>Expense Date *</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="date"
//                 value={expenseDate}
//                 onChange={(e) => setExpenseDate(e.target.value)}
//                 inputProps={{ max: todayStr() }}
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
//             onClick={handleAddOrUpdate}
//             disabled={saving}
//             sx={{
//               bgcolor: "#f43f5e",
//               color: "#ffffff",
//               fontWeight: 800,
//               textTransform: "uppercase",
//               letterSpacing: 0.5,
//               borderRadius: "10px",
//               px: 3,
//               py: 1.1,
//               fontSize: "0.8rem",
//               boxShadow: "0 4px 14px rgba(244, 63, 94, 0.3)",
//               "&:hover": {
//                 bgcolor: "#e11d48",
//                 boxShadow: "0 8px 20px rgba(244, 63, 94, 0.4)",
//               },
//               "&.Mui-disabled": {
//                 bgcolor: "rgba(244, 63, 94, 0.3)",
//                 color: "rgba(255, 255, 255, 0.5)",
//               },
//             }}
//           >
//             {saving
//               ? "Saving..."
//               : editingId
//               ? "Update Expense"
//               : "Add Expense Entry"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ================= DELETE SINGLE DIALOG ================= */}
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
//           Delete Expense?
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             Are you sure you want to delete this expense entry? This action
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
//           },
//         }}
//       >
//         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
//           Delete All Expenses?
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             This will permanently remove all {totalCount} expense entries. This
//             action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2.5 }}>
//           <Button
//             onClick={() => setDeleteAllOpen(false)}
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

// export default ExpenseEntry;



import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
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
  Edit as EditIcon,
  Receipt,
  LocalGasStation,
  Home as HomeIcon,
  Refresh as RefreshIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  Lock as LockIcon,
  AccountBalanceWallet,
  Functions,
  Category as CategoryIcon,
  FiberManualRecord,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface Expense {
  _id: string;
  category: string;
  description: string;
  paidVia: string;
  amount: number;
  date: string;
  createdAt: string;
}

// ===================== CONSTANTS =====================

const EXPENSE_CATEGORIES = [
  "Diesel / Fuel",
  "Toll / Parking",
  "Driver Allowance",
  "Food / Refreshment",
  "Vehicle Repair",
  "Loading / Unloading",
  "Other",
];

const PAYMENT_METHODS = [
  "Cash from Route Collection",
  "Company Cash",
  "UPI / Online",
  "Credit",
];

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

const todayStr = () => new Date().toISOString().split("T")[0];

const firstOfMonthStr = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1)
    .toISOString()
    .split("T")[0];
};

const formatMoney = (n: number) =>
  `₹ ${(Number(n) || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

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

const FilterBar = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  flexShrink: 0,
}));

const AnalyticsBar = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(244, 63, 94, 0.25)",
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: "0 8px 24px rgba(244, 63, 94, 0.08)",
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
      "linear-gradient(90deg, transparent, rgba(244, 63, 94, 0.6), transparent)",
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
    backgroundColor: active ? "#f43f5e" : "rgba(244, 63, 94, 0.15)",
    color: active ? "#0d1527" : "#f43f5e",
    border: active
      ? "1px solid #f43f5e"
      : "1px solid rgba(244, 63, 94, 0.3)",
    boxShadow: active ? "0 4px 14px rgba(244, 63, 94, 0.35)" : "none",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: active ? "#e11d48" : "rgba(244, 63, 94, 0.25)",
      borderColor: "#f43f5e",
    },
  })
);

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "44px",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
    "&:hover fieldset": { borderColor: "rgba(244, 63, 94, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#f43f5e",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "10px 12px",
    "&::placeholder": { color: "#6b7280", opacity: 1 },
  },
  "& input[type='date']::-webkit-calendar-picker-indicator": {
    filter: "invert(0.7)",
    cursor: "pointer",
  },
  "& .MuiInputLabel-root": {
    color: "#9ca3af",
    fontSize: "0.8rem",
    "&.Mui-focused": { color: "#f43f5e" },
  },
}));

const StyledSelect = styled(Select)(() => ({
  borderRadius: "10px",
  backgroundColor: "#090d16",
  color: "#ffffff",
  height: "42px",
  width: "100%",
  fontSize: "0.85rem",
  fontWeight: 500,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(244, 63, 94, 0.4)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#f43f5e",
    borderWidth: "1.5px",
  },
  "& .MuiSvgIcon-root": { color: "#9ca3af" },
}));

const FieldLabel = styled(Typography)(() => ({
  color: "#9ca3af",
  fontWeight: 700,
  fontSize: "0.7rem",
  letterSpacing: 1,
  textTransform: "uppercase",
  marginBottom: "8px",
}));

/* ✅ minHeight do */
const TableContainerDark = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  marginBottom: "16px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: "400px",
}));

/* ✅ flex 1 1 0 + height 0 */
const TableScrollArea = styled(Box)(() => ({
  overflow: "auto",
  flex: "1 1 0",
  height: 0,
  minHeight: 0,
  width: "100%",
  "&::-webkit-scrollbar": { width: "8px", height: "8px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(244, 63, 94, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(244, 63, 94, 0.5)" },
  },
}));

/* ✅ Mobile card list */
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
    backgroundColor: "rgba(244, 63, 94, 0.3)",
    borderRadius: "8px",
  },
}));

const ItemsTable = styled("table")(() => ({
  width: "100%",
  minWidth: "900px",
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
  "& tbody tr:hover": { backgroundColor: "rgba(244, 63, 94, 0.03)" },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "12px",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
}));

// ===================== MAIN =====================

const ExpenseEntry: React.FC = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState<Expense[]>([]);
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

  // Form state
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [paidVia, setPaidVia] = useState(PAYMENT_METHODS[0]);
  const [amount, setAmount] = useState<number | "">("");
  const [expenseDate, setExpenseDate] = useState<string>(todayStr());

  // Edit mode
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete dialogs
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);

  // ===================== FETCH =====================
  const fetchExpenses = async () => {
    try {
      setListLoading(true);

      const params: any = { page, limit };
      if (appliedFrom) params.fromDate = appliedFrom;
      if (appliedTo) params.toDate = appliedTo;

      const res = await axios.get(`${API_URL}/expense`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setExpenses(res.data.data || []);

        const gt =
          res.data.grandTotal ??
          res.data.totalAmount ??
          res.data.totalSum ??
          res.data.totalExpenses ??
          0;
        setGrandTotal(Number(gt) || 0);

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
        toast.error(res.data?.message || "Failed to load expenses");
        setExpenses([]);
      }
    } catch (error: any) {
      console.error("Fetch expenses error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load expenses");
      }
      setExpenses([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, appliedFrom, appliedTo]);

  // ===================== ANALYTICS =====================
  const analytics = useMemo(() => {
    const pageCount = expenses.length;
    const pageSum = expenses.reduce(
      (s, e) => s + (Number(e.amount) || 0),
      0
    );
    const total = grandTotal > 0 ? grandTotal : pageSum;

    const avgPerEntry =
      totalCount > 0
        ? total / totalCount
        : pageCount > 0
        ? total / pageCount
        : 0;

    const catMap = new Map<string, number>();
    expenses.forEach((e) => {
      const c = String(e.category || "Other");
      catMap.set(c, (catMap.get(c) || 0) + (Number(e.amount) || 0));
    });
    let topCategory = "—";
    let topCategoryAmount = 0;
    catMap.forEach((val, key) => {
      if (val > topCategoryAmount) {
        topCategoryAmount = val;
        topCategory = key;
      }
    });

    const today = todayStr();
    const todayTotal = expenses
      .filter((e) => {
        const d = new Date(e.date || e.createdAt);
        return d.toISOString().split("T")[0] === today;
      })
      .reduce((s, e) => s + (Number(e.amount) || 0), 0);

    return {
      total,
      count: totalCount || pageCount,
      avgPerEntry,
      topCategory,
      topCategoryAmount,
      todayTotal,
    };
  }, [expenses, grandTotal, totalCount]);

  // ===================== FORM HANDLERS =====================
  const resetForm = () => {
    setCategory(EXPENSE_CATEGORIES[0]);
    setDescription("");
    setPaidVia(PAYMENT_METHODS[0]);
    setAmount("");
    setExpenseDate(todayStr());
    setEditingId(null);
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

  // ===================== CREATE / UPDATE =====================
  const handleAddOrUpdate = async () => {
    if (!description.trim()) {
      toast.error("Please enter description");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!expenseDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        category,
        description: description.trim(),
        paidVia,
        amount: Number(amount),
        date: expenseDate,
      };

      if (editingId) {
        const res = await axios.put(
          `${API_URL}/expense/${editingId}`,
          payload,
          getAuthHeaders()
        );

        if (res.data?.success === true) {
          toast.success("Expense updated successfully");
          closeFormModal();
          fetchExpenses();
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(
            res.data?.errors?.[0] ||
              res.data?.message ||
              "Failed to update expense"
          );
        }
      } else {
        const res = await axios.post(
          `${API_URL}/expense`,
          payload,
          getAuthHeaders()
        );

        if (res.data?.success === true) {
          toast.success("Expense added successfully");
          closeFormModal();
          setPage(1);
          fetchExpenses();
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(
            res.data?.errors?.[0] ||
              res.data?.message ||
              "Failed to add expense"
          );
        }
      }
    } catch (error: any) {
      console.error("Save expense error:", error);
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
            "Failed to save expense"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ===================== EDIT =====================
  const handleEdit = (expense: Expense) => {
    setEditingId(expense._id);
    setCategory(expense.category);
    setDescription(expense.description);
    setPaidVia(expense.paidVia);
    setAmount(expense.amount);

    const d = expense.date || expense.createdAt;
    const formatted = d ? new Date(d).toISOString().split("T")[0] : todayStr();
    setExpenseDate(formatted);

    setFormOpen(true);
  };

  // ===================== DELETE =====================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const res = await axios.delete(
        `${API_URL}/expense/${deleteId}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Expense deleted");
        if (editingId === deleteId) resetForm();
        setDeleteId(null);
        if (expenses.length === 1 && page > 1) {
          setPage((p) => p - 1);
        } else {
          fetchExpenses();
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

  const handleDeleteAll = async () => {
    try {
      setDeleting(true);

      const res = await axios.delete(
        `${API_URL}/expense/delete-all`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success(res.data?.message || "All expenses deleted");
        setDeleteAllOpen(false);
        resetForm();
        setPage(1);
        fetchExpenses();
      } else {
        toast.error(res.data?.message || "Failed to delete all");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete all failed");
    } finally {
      setDeleting(false);
    }
  };

  // ===================== RENDER =====================
  return (
    <Box
      sx={{
        // ✅ PAGE NEVER SCROLLS
        height: { xs: "100dvh", md: "100vh" },
        maxHeight: { xs: "100dvh", md: "100vh" },
        overflow: "hidden",
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
                    borderColor: "#f43f5e",
                    color: "#f43f5e",
                    bgcolor: "rgba(244, 63, 94, 0.08)",
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
                    bgcolor: "#31121d",
                    color: "#f43f5e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <LocalGasStation sx={{ fontSize: 20 }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Box display="flex" alignItems="center" gap={1} mb={0.2}>
                    <FiberManualRecord sx={{ fontSize: 10, color: "#f43f5e" }} />
                    <Typography
                      sx={{
                        color: "#f43f5e",
                        letterSpacing: 0.5,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                      }}
                    >
                      Expense Management
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.4rem" },
                      lineHeight: 1.2,
                    }}
                  >
                    6. ROUTE & TRIP EXPENSES
                  </Typography>
                </Box>
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
                  bgcolor: "#f43f5e",
                  color: "#ffffff",
                  fontWeight: 800,
                  textTransform: "none",
                  letterSpacing: 0.3,
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.78rem",
                  boxShadow: "0 4px 14px rgba(244, 63, 94, 0.35)",
                  flex: { xs: "1 1 45%", sm: "none" },
                  "&:hover": {
                    bgcolor: "#e11d48",
                    boxShadow: "0 8px 20px rgba(244, 63, 94, 0.5)",
                  },
                }}
              >
                Expense Entry
              </Button>

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchExpenses}
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
                    borderColor: "#38bdf8",
                    color: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>

              {totalCount > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => setDeleteAllOpen(true)}
                  sx={{
                    color: "#f43f5e",
                    borderColor: "rgba(244, 63, 94, 0.3)",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 2,
                    py: 1,
                    fontSize: "0.78rem",
                    flex: { xs: "1 1 100%", sm: "none" },
                    "&:hover": {
                      borderColor: "#f43f5e",
                      bgcolor: "rgba(244, 63, 94, 0.08)",
                    },
                  }}
                >
                  Delete All
                </Button>
              )}
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= ANALYTICS ================= */}
        <AnalyticsBar>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard accent="#f43f5e">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: "rgba(244, 63, 94, 0.15)",
                    color: "#f43f5e",
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
                    Total Expenses{hasDateFilter ? " (Filtered)" : ""}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#f43f5e",
                      fontWeight: 900,
                      fontSize: { xs: "1rem", sm: "1.15rem" },
                      mt: 0.3,
                      letterSpacing: 0.3,
                      textShadow: "0 0 14px rgba(244, 63, 94, 0.4)",
                      lineHeight: 1.1,
                    }}
                  >
                    {listLoading ? "..." : formatMoney(analytics.total)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>

            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#c084fc">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: "rgba(192, 132, 252, 0.15)",
                    color: "#c084fc",
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
                    Total Entries
                  </Typography>
                  <Typography
                    sx={{
                      color: "#c084fc",
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

            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
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
                  <CategoryIcon sx={{ fontSize: 22 }} />
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
                    Top Category
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fbbf24",
                      fontWeight: 900,
                      fontSize: "0.85rem",
                      mt: 0.3,
                      letterSpacing: 0.2,
                      lineHeight: 1.2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={analytics.topCategory}
                  >
                    {listLoading ? "..." : analytics.topCategory}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.62rem",
                      fontWeight: 600,
                      mt: 0.2,
                    }}
                  >
                    {formatMoney(analytics.topCategoryAmount)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>

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
                    Avg / Entry
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
                    {listLoading ? "..." : formatMoney(analytics.avgPerEntry)}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.62rem",
                      fontWeight: 600,
                      mt: 0.2,
                    }}
                  >
                    Today: {formatMoney(analytics.todayTotal)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
          </Grid>
        </AnalyticsBar>

        {/* ================= FILTER BAR ================= */}
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
                    bgcolor: "#f43f5e",
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    py: 1.1,
                    fontSize: "0.78rem",
                    "&:hover": { bgcolor: "#e11d48" },
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
                    bgcolor: "rgba(244, 63, 94, 0.15)",
                    color: "#f43f5e",
                    border: "1px solid rgba(244, 63, 94, 0.4)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "28px",
                    "& .MuiChip-deleteIcon": {
                      color: "#f43f5e",
                      "&:hover": { color: "#fff" },
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
              ROUTE EXPENSES LOG SHEET
            </Typography>
            <Chip
              label={`${totalCount} Expenses`}
              size="small"
              sx={{
                bgcolor: "rgba(244, 63, 94, 0.1)",
                color: "#f43f5e",
                border: "1px solid rgba(244, 63, 94, 0.3)",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: "26px",
              }}
            />
          </Box>

          {/* ✅ DESKTOP TABLE */}
          <TableScrollArea sx={{ display: { xs: "none", md: "block" } }}>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Paid Via</th>
                  <th style={{ textAlign: "right" }}>Amount (₹)</th>
                  <th style={{ textAlign: "center", width: "110px" }}>
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
                      <CircularProgress sx={{ color: "#f43f5e" }} size={32} />
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading expenses...
                      </Typography>
                    </td>
                  </tr>
                ) : expenses.length === 0 ? (
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
                        No expenses found
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  expenses.map((row, idx) => (
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
                          {row.category}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          sx={{ color: "#9ca3af", fontSize: "0.85rem" }}
                        >
                          {row.description}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          sx={{ color: "#9ca3af", fontSize: "0.8rem" }}
                        >
                          {new Date(
                            row.date || row.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </Typography>
                      </td>
                      <td>
                        <Chip
                          label={row.paidVia}
                          size="small"
                          sx={{
                            bgcolor: "rgba(255, 255, 255, 0.05)",
                            color: "#e5e7eb",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            height: "24px",
                          }}
                        />
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <Typography
                          sx={{
                            color: "#f43f5e",
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
                          onClick={() => handleEdit(row)}
                          sx={{
                            color: "#38bdf8",
                            "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => setDeleteId(row._id)}
                          sx={{
                            color: "#f43f5e",
                            "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
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

          {/* ✅ MOBILE CARDS */}
          <CardListArea sx={{ display: { xs: "flex", md: "none" } }}>
            {listLoading ? (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <CircularProgress sx={{ color: "#f43f5e" }} size={32} />
                <Typography
                  sx={{ color: "#9ca3af", fontSize: "0.85rem", mt: 1 }}
                >
                  Loading expenses...
                </Typography>
              </Box>
            ) : expenses.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <Receipt sx={{ fontSize: 44, color: "#374151", mb: 1 }} />
                <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                  No expenses found
                </Typography>
                <Typography
                  sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
                >
                  {hasDateFilter
                    ? "Try changing the date filter"
                    : "Tap 'Expense Entry' to add your first expense"}
                </Typography>
              </Box>
            ) : (
              expenses.map((row, idx) => (
                <Box
                  key={row._id}
                  sx={{
                    bgcolor: "#111827",
                    border: "1px solid rgba(244, 63, 94, 0.2)",
                    borderRadius: "12px",
                    p: 1.5,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "rgba(244, 63, 94, 0.45)",
                      boxShadow: "0 6px 18px rgba(244, 63, 94, 0.15)",
                    },
                  }}
                >
                  {/* Top: index + amount */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    gap={1}
                    mb={1}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{ minWidth: 0, flex: 1 }}
                    >
                      <Box
                        sx={{
                          width: 26,
                          height: 26,
                          borderRadius: "8px",
                          bgcolor: "rgba(244, 63, 94, 0.15)",
                          color: "#f43f5e",
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
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.category}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "#f43f5e",
                        fontWeight: 900,
                        fontSize: "0.95rem",
                        flexShrink: 0,
                      }}
                    >
                      ₹ {row.amount.toLocaleString("en-IN")}
                    </Typography>
                  </Box>

                  {/* Description */}
                  {row.description && (
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "0.75rem",
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {row.description}
                    </Typography>
                  )}

                  {/* Info grid */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#6b7280",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: 0.5,
                          textTransform: "uppercase",
                        }}
                      >
                        Date
                      </Typography>
                      <Typography
                        sx={{
                          color: "#e5e7eb",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          mt: 0.2,
                        }}
                      >
                        {new Date(
                          row.date || row.createdAt
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          color: "#6b7280",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: 0.5,
                          textTransform: "uppercase",
                        }}
                      >
                        Paid Via
                      </Typography>
                      <Chip
                        label={row.paidVia}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.05)",
                          color: "#e5e7eb",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          fontWeight: 600,
                          fontSize: "0.62rem",
                          height: "20px",
                          mt: 0.3,
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 0.5,
                      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                      pt: 0.8,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(row)}
                      sx={{
                        color: "#38bdf8",
                        "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteId(row._id)}
                      sx={{
                        color: "#f43f5e",
                        "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </CardListArea>

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
                        ? "rgba(244, 63, 94, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                    color: limit === n ? "#f43f5e" : "#9ca3af",
                    border:
                      limit === n
                        ? "1px solid rgba(244, 63, 94, 0.5)"
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
                    bgcolor: "rgba(244, 63, 94, 0.1)",
                    color: "#f43f5e",
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(244, 63, 94, 0.2) !important",
                  color: "#f43f5e !important",
                  borderColor: "rgba(244, 63, 94, 0.5) !important",
                },
              }}
            />
          </Box>
        </TableContainerDark>
      </Box>

      {/* ================= FLOATING DASHBOARD BUTTON ================= */}
      <Tooltip title="Back to Dashboard" placement="left">
        <Fab
          onClick={() => navigate("/dashboard")}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1200,
            bgcolor: "#f43f5e",
            color: "#ffffff",
            width: 50,
            height: 50,
            boxShadow: "0 8px 24px rgba(244, 63, 94, 0.45)",
            "&:hover": { bgcolor: "#e11d48" },
          }}
        >
          <HomeIcon />
        </Fab>
      </Tooltip>

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
            flexWrap: "wrap",
            gap: 1,
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
                bgcolor: "#31121d",
                color: "#f43f5e",
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
                color: "#f43f5e",
                fontWeight: 800,
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {editingId ? "Edit Expense Entry" : "Log Trip Expenses"}
            </Typography>
            {editingId && (
              <Chip
                label="EDITING"
                size="small"
                sx={{
                  bgcolor: "rgba(251, 191, 36, 0.15)",
                  color: "#fbbf24",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  height: "22px",
                }}
              />
            )}
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Expense Category</FieldLabel>
              <StyledSelect
                value={category}
                onChange={(e) => setCategory(e.target.value as string)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#111827",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      "& .MuiMenuItem-root": {
                        color: "#e5e7eb",
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
                        "&.Mui-selected": {
                          bgcolor: "rgba(244, 63, 94, 0.15)",
                          color: "#f43f5e",
                        },
                      },
                    },
                  },
                }}
              >
                {EXPENSE_CATEGORIES.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Payment By</FieldLabel>
              <StyledSelect
                value={paidVia}
                onChange={(e) => setPaidVia(e.target.value as string)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#111827",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      "& .MuiMenuItem-root": {
                        color: "#e5e7eb",
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
                        "&.Mui-selected": {
                          bgcolor: "rgba(244, 63, 94, 0.15)",
                          color: "#f43f5e",
                        },
                      },
                    },
                  },
                }}
              >
                {PAYMENT_METHODS.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Grid>

            <Grid size={{ xs: 12, sm: 8 }}>
              <FieldLabel>Description / Reason *</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. 20 Liters Diesel at HP Pump"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <FieldLabel>Amount (₹) *</FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="850"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value === "" ? "" : Number(e.target.value))
                }
                inputProps={{ min: 0, step: 1 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Expense Date *</FieldLabel>
              <StyledTextField
                fullWidth
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                inputProps={{ max: todayStr() }}
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
            onClick={handleAddOrUpdate}
            disabled={saving}
            sx={{
              bgcolor: "#f43f5e",
              color: "#ffffff",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              borderRadius: "10px",
              px: 3,
              py: 1.1,
              fontSize: "0.78rem",
              boxShadow: "0 4px 14px rgba(244, 63, 94, 0.3)",
              "&:hover": {
                bgcolor: "#e11d48",
                boxShadow: "0 8px 20px rgba(244, 63, 94, 0.4)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(244, 63, 94, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update"
              : "Add Entry"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= DELETE SINGLE DIALOG ================= */}
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
          Delete Expense?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete this expense entry? This action
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
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            m: { xs: 1.5, sm: 4 },
            width: { xs: "calc(100% - 24px)", sm: "100%" },
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete All Expenses?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            This will permanently remove all {totalCount} expense entries. This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteAllOpen(false)}
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
            onClick={handleDeleteAll}
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
            }}
          >
            {deleting ? "Deleting..." : "Delete All"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExpenseEntry;