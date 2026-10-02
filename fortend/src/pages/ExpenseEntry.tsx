



// import React, { useEffect, useState } from "react";
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
//         Home as HomeIcon,
//   Refresh as RefreshIcon,
//   FilterAlt as FilterIcon,
//   Clear as ClearIcon,
//   Close as CloseIcon,
//   Lock as LockIcon,
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

// const todayStr = () => new Date().toISOString().split("T")[0];
// const firstOfMonthStr = () => {
//   const d = new Date();
//   return new Date(d.getFullYear(), d.getMonth(), 1)
//     .toISOString()
//     .split("T")[0];
// };

// // ===================== MAIN =====================

// const ExpenseEntry: React.FC = () => {
//   const navigate = useNavigate();

//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [listLoading, setListLoading] = useState(true);
//   const [grandTotal, setGrandTotal] = useState(0);
//   const [saving, setSaving] = useState(false);


//   console.log(grandTotal);
  

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

//   // ===================== FORM HANDLERS =====================
//   const resetForm = () => {
//     setCategory(EXPENSE_CATEGORIES[0]);
//     setDescription("");
//     setPaidVia(PAYMENT_METHODS[0]);
//     setAmount("");
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

//     try {
//       setSaving(true);

//       const payload = {
//         category,
//         description: description.trim(),
//         paidVia,
//         amount: Number(amount),
//         date: new Date().toISOString().split("T")[0],
//       };

//       if (editingId) {
//         // ---------- UPDATE ----------
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
//         // ---------- CREATE ----------
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
//               {/* EXPENSE ENTRY BUTTON — Refresh ke LEFT */}
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
//           {/* Header (fixed) */}
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

//           {/* Scroll Area — SIRF YAHAN SCROLL HOGA */}
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

//           {/* ================= PAGINATION BAR (fixed) ================= */}
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


//    {/* ================= FLOATING DASHBOARD BUTTON ================= */}
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
//             {/* CATEGORY */}
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

//             {/* PAID VIA */}
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

//             {/* DESCRIPTION */}
//             <Grid size={{ xs: 12, sm: 8 }}>
//               <FieldLabel>Description / Reason *</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="e.g. 20 Liters Diesel at HP Pump"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Grid>

//             {/* AMOUNT */}
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



import React, { useEffect, useState } from "react";
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

const FilterBar = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "14px 20px",
  marginBottom: "16px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  flexShrink: 0,
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "42px",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
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
  minHeight: 0,
}));

const TableScrollArea = styled(Box)(() => ({
  overflow: "auto",
  flex: 1,
  minHeight: 0,
  "&::-webkit-scrollbar": { width: "8px", height: "8px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(244, 63, 94, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(244, 63, 94, 0.5)" },
  },
}));

const ItemsTable = styled("table")(() => ({
  width: "100%",
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
    padding: "16px 12px",
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
    padding: "14px 12px",
    textAlign: "left",
  },
}));

// ===================== HELPERS =====================

const firstOfMonthStr = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1)
    .toISOString()
    .split("T")[0];
};

// ===================== MAIN =====================

const ExpenseEntry: React.FC = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [grandTotal, setGrandTotal] = useState(0);
  const [saving, setSaving] = useState(false);

  console.log(grandTotal);

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

  // Form modal
  const [formOpen, setFormOpen] = useState(false);

  // Form state
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [paidVia, setPaidVia] = useState(PAYMENT_METHODS[0]);
  const [amount, setAmount] = useState<number | "">("");
  const [expenseDate, setExpenseDate] = useState<string>(todayStr()); // ✅ NEW

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

  // ===================== FORM HANDLERS =====================
  const resetForm = () => {
    setCategory(EXPENSE_CATEGORIES[0]);
    setDescription("");
    setPaidVia(PAYMENT_METHODS[0]);
    setAmount("");
    setExpenseDate(todayStr()); // ✅ reset date to today
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
    setPage(1);
  };

  const handleClearDateFilter = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
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
        date: expenseDate, // ✅ user-selected date
      };

      if (editingId) {
        // ---------- UPDATE ----------
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
        // ---------- CREATE ----------
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

    // ✅ Date ko YYYY-MM-DD format me load karo
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
        height: "85vh",
        maxHeight: "100vh",
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
                    borderColor: "#38bdf8",
                    color: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box display="flex" alignItems="center" gap={1.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: "#31121d",
                    color: "#f43f5e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocalGasStation />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                    letterSpacing: 0.5,
                    color: "#ffffff",
                  }}
                >
                  6. ROUTE & TRIP EXPENSES ENTRY
                </Typography>
              </Box>
            </Box>

            <Box display="flex" gap={1.5} alignItems="center" flexWrap="wrap">
              {/* EXPENSE ENTRY BUTTON — Refresh ke LEFT */}
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
                  fontSize: "0.8rem",
                  boxShadow: "0 4px 14px rgba(244, 63, 94, 0.35)",
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
                  fontSize: "0.8rem",
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
                    fontSize: "0.8rem",
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

        {/* ================= DATE FILTER BAR ================= */}
        <FilterBar>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
            <Box display="flex" alignItems="center" gap={0.8}>
              <FilterIcon sx={{ color: "#f43f5e", fontSize: 18 }} />
              <Typography
                sx={{
                  color: "#f43f5e",
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Date Filter
              </Typography>
            </Box>

            <StyledTextField
              type="date"
              size="small"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              sx={{ width: 160 }}
            />
            <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
              to
            </Typography>
            <StyledTextField
              type="date"
              size="small"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              sx={{ width: 160 }}
            />

            <Button
              size="small"
              variant="contained"
              onClick={handleApplyDateFilter}
              sx={{
                bgcolor: "#f43f5e",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                fontSize: "0.75rem",
                "&:hover": { bgcolor: "#e11d48" },
              }}
            >
              Apply
            </Button>

            <Button
              size="small"
              variant="outlined"
              startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
              onClick={handleClearDateFilter}
              disabled={!hasDateFilter && !fromDate && !toDate}
              sx={{
                color: "#9ca3af",
                borderColor: "rgba(255, 255, 255, 0.15)",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 1.5,
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
                { k: "week", label: "Last 7d" },
                { k: "month", label: "This Month" },
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
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    color: "#e5e7eb",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    height: "26px",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "rgba(244, 63, 94, 0.15)",
                      borderColor: "rgba(244, 63, 94, 0.4)",
                      color: "#f43f5e",
                    },
                  }}
                />
              ))}
            </Box>

            {hasDateFilter && (
              <Chip
                label={`Active: ${appliedFrom || "..."} → ${appliedTo || "..."}`}
                size="small"
                sx={{
                  bgcolor: "rgba(244, 63, 94, 0.15)",
                  color: "#f43f5e",
                  border: "1px solid rgba(244, 63, 94, 0.4)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "26px",
                }}
              />
            )}
          </Box>
        </FilterBar>

        {/* ================= LOG SHEET ================= */}
        <TableContainerDark>
          {/* Header (fixed) */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={2}
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "0.95rem",
                letterSpacing: 0.5,
              }}
            >
              ROUTE EXPENSES LOG SHEET
            </Typography>
            <Chip
              label={`${totalCount} Expenses Logged`}
              size="small"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.05)",
                color: "#9ca3af",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: "26px",
              }}
            />
          </Box>

          {/* Scroll Area — SIRF YAHAN SCROLL HOGA */}
          <TableScrollArea>
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
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
                      >
                        {hasDateFilter
                          ? "Try changing the date filter"
                          : "Click 'Expense Entry' to add your first expense"}
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
                            fontSize: "0.95rem",
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

          {/* ================= PAGINATION BAR (fixed) ================= */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              px: 3,
              py: 1.8,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography
                sx={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600 }}
              >
                Rows per page:
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
                sx={{ color: "#6b7280", fontSize: "0.75rem", ml: 1 }}
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
                  fontSize: "0.8rem",
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
            bgcolor: "#38bdf8",
            color: "#0d1527",
            width: 52,
            height: 52,
            boxShadow: "0 8px 24px rgba(56, 189, 248, 0.45)",
            "&:hover": { bgcolor: "#0ea5e9" },
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
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            px: 3,
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
              }}
            >
              <LockIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                color: "#f43f5e",
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {editingId
                ? "Edit Expense Entry"
                : "Log Vehicle & Driver Expenses"}
            </Typography>
            {editingId && (
              <Chip
                label="EDITING"
                size="small"
                sx={{
                  ml: 1,
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

        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {/* CATEGORY */}
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

            {/* PAID VIA */}
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

            {/* DESCRIPTION */}
            <Grid size={{ xs: 12, sm: 8 }}>
              <FieldLabel>Description / Reason *</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. 20 Liters Diesel at HP Pump"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            {/* AMOUNT */}
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

            {/* ✅ DATE — NEW FIELD */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Expense Date *</FieldLabel>
              <StyledTextField
                fullWidth
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                inputProps={{ max: todayStr() }} // future date block (optional)
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
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
              fontSize: "0.8rem",
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
              ? "Update Expense"
              : "Add Expense Entry"}
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