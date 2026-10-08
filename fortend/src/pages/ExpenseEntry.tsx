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
//   Autocomplete,
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
//   FiberManualRecord,
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

// interface CategoryOption {
//   _id: string;
//   name: string;
// }

// interface FormRow {
//   category: string;
//   description: string;
//   amount: number | "";
//   paidVia: string;
// }

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

// const blankRow = (): FormRow => ({
//   category: "",
//   description: "",
//   amount: "",
//   paidVia: PAYMENT_METHODS[0],
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

// const AnalyticsBar = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(244, 63, 94, 0.25)",
//   padding: "16px 18px",
//   marginBottom: "14px",
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
//   height: "100%",
//   "&:hover": {
//     transform: "translateY(-2px)",
//     borderColor: `${accent}66`,
//   },
// }));

// const QuickFilterChip = styled(Button)<{ active?: boolean }>(
//   ({ active }) => ({
//     borderRadius: "10px",
//     textTransform: "none",
//     fontWeight: 700,
//     fontSize: "0.75rem",
//     padding: "8px 18px",
//     minWidth: "auto",
//     whiteSpace: "nowrap",
//     backgroundColor: active ? "#f43f5e" : "rgba(244, 63, 94, 0.15)",
//     color: active ? "#0d1527" : "#f43f5e",
//     border: active
//       ? "1px solid #f43f5e"
//       : "1px solid rgba(244, 63, 94, 0.3)",
//     "&:hover": {
//       backgroundColor: active ? "#e11d48" : "rgba(244, 63, 94, 0.25)",
//       borderColor: "#f43f5e",
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
//   "& .MuiInputLabel-root": {
//     color: "#9ca3af",
//     fontSize: "0.8rem",
//     "&.Mui-focused": { color: "#f43f5e" },
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
//   overflow: "hidden",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   marginBottom: "16px",
//   display: "flex",
//   flexDirection: "column",
//   flex: 1,
//   minHeight: "400px",
// }));

// const TableScrollArea = styled(Box)(() => ({
//   overflow: "auto",
//   flex: "1 1 0",
//   height: 0,
//   minHeight: 0,
//   width: "100%",
//   "&::-webkit-scrollbar": { width: "8px", height: "8px" },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "rgba(244, 63, 94, 0.3)",
//     borderRadius: "8px",
//   },
// }));

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
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "rgba(244, 63, 94, 0.3)",
//     borderRadius: "8px",
//   },
// }));

// const ItemsTable = styled("table")(() => ({
//   width: "100%",
//   minWidth: "900px",
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
//     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//   },
//   "& tbody tr:hover": { backgroundColor: "rgba(244, 63, 94, 0.03)" },
//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "12px",
//     whiteSpace: "nowrap",
//   },
// }));

// /* ✅ Scroll after 4 rows */
// const FormRowsScroll = styled(Box)(() => ({
//   maxHeight: "340px",
//   overflowY: "auto",
//   overflowX: "hidden",
//   paddingRight: "6px",
//   display: "flex",
//   flexDirection: "column",
//   gap: "10px",
//   "&::-webkit-scrollbar": { width: "6px" },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "rgba(244, 63, 94, 0.35)",
//     borderRadius: "8px",
//   },
// }));

// const StyledFieldLabel = styled(Typography)(() => ({
//   color: "#9ca3af",
//   fontWeight: 700,
//   fontSize: "0.65rem",
//   letterSpacing: 0.8,
//   textTransform: "uppercase",
//   marginBottom: "4px",
//   display: "block",
// }));

// // ===================== MAIN =====================
// const ExpenseEntry: React.FC = () => {
//   const navigate = useNavigate();

//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [listLoading, setListLoading] = useState(true);
//   const [grandTotal, setGrandTotal] = useState(0);
//   const [saving, setSaving] = useState(false);

//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);

//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [appliedFrom, setAppliedFrom] = useState("");
//   const [appliedTo, setAppliedTo] = useState("");
//   const [activeQuick, setActiveQuick] = useState<
//     "today" | "week" | "month" | "all" | ""
//   >("");

//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [appliedCategory, setAppliedCategory] = useState("");

//   const [categories, setCategories] = useState<CategoryOption[]>([]);

//   const [formOpen, setFormOpen] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [masterDate, setMasterDate] = useState<string>(todayStr());
//   const [rows, setRows] = useState<FormRow[]>([blankRow()]);

//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState(false);
//   const [deleteAllOpen, setDeleteAllOpen] = useState(false);

//   // ===================== FETCH CATEGORIES =====================
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/expense/categories`, {
//         ...getAuthHeaders(),
//       });
//       if (res.data?.success) setCategories(res.data.data || []);
//     } catch (err) {
//       console.error("Fetch categories error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // ===================== FETCH EXPENSES =====================
//   const fetchExpenses = async () => {
//     try {
//       setListLoading(true);
//       const params: any = { page, limit };
//       if (appliedFrom) params.from = appliedFrom;
//       if (appliedTo) params.to = appliedTo;
//       if (appliedCategory) params.category = appliedCategory;

//       const res = await axios.get(`${API_URL}/expense`, {
//         params,
//         ...getAuthHeaders(),
//       });

//       if (res.data?.success === true) {
//         setExpenses(res.data.data || []);
//         setGrandTotal(Number(res.data.grandTotal) || 0);
//         setTotalCount(res.data.total || 0);
//         setTotalPages(res.data.pages || 1);
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to load expenses");
//         setExpenses([]);
//       }
//     } catch (error: any) {
//       if (error.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(error.response?.data?.message || "Failed to load");
//       }
//       setExpenses([]);
//     } finally {
//       setListLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, limit, appliedFrom, appliedTo, appliedCategory]);

//   // ===================== ANALYTICS =====================
//   const analytics = useMemo(() => {
//     const pageCount = expenses.length;
//     const pageSum = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
//     const total = grandTotal > 0 ? grandTotal : pageSum;

//     const avgPerEntry =
//       totalCount > 0
//         ? total / totalCount
//         : pageCount > 0
//         ? total / pageCount
//         : 0;

//     // Top category from current page
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

//     const today = todayStr();
//     const todayTotal = expenses
//       .filter(
//         (e) =>
//           new Date(e.date || e.createdAt).toISOString().split("T")[0] === today
//       )
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
//     setEditingId(null);
//     setMasterDate(todayStr());
//     setRows([blankRow()]);
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

//   const addRow = () => {
//     setRows((prev) => [...prev, blankRow()]);
//   };

//   const removeRow = (idx: number) => {
//     if (rows.length === 1) {
//       setRows([blankRow()]);
//       return;
//     }
//     setRows((prev) => prev.filter((_, i) => i !== idx));
//   };

//   const updateRow = (idx: number, field: keyof FormRow, value: any) => {
//     setRows((prev) => {
//       const copy = [...prev];
//       if (field === "amount") {
//         copy[idx].amount = value === "" ? "" : Math.max(0, Number(value));
//       } else {
//         // @ts-ignore
//         copy[idx][field] = value;
//       }
//       return copy;
//     });
//   };

//   const formTotal = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);

//   // ===================== FILTERS =====================
//   const applyAllFilters = () => {
//     if (fromDate && toDate && fromDate > toDate) {
//       toast.error("From date cannot be after To date");
//       return;
//     }
//     setAppliedFrom(fromDate);
//     setAppliedTo(toDate);
//     setAppliedCategory(categoryFilter);
//     setActiveQuick("");
//     setPage(1);
//   };

//   const clearAllFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setAppliedFrom("");
//     setAppliedTo("");
//     setCategoryFilter("");
//     setAppliedCategory("");
//     setActiveQuick("");
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
//     setActiveQuick(type);
//     setPage(1);
//   };

//   const hasDateFilter = !!(appliedFrom || appliedTo);
//   const hasCategoryFilter = !!appliedCategory;
//   const hasAnyFilter = hasDateFilter || hasCategoryFilter;

//   // ===================== SUBMIT =====================
//   const handleSubmit = async () => {
//     if (!masterDate) {
//       toast.error("Please select date");
//       return;
//     }

//     for (let i = 0; i < rows.length; i++) {
//       const r = rows[i];
//       if (!r.category.trim()) {
//         toast.error(`Row ${i + 1}: category required`);
//         return;
//       }
//       if (!r.description.trim()) {
//         toast.error(`Row ${i + 1}: description required`);
//         return;
//       }
//       if (!r.amount || Number(r.amount) <= 0) {
//         toast.error(`Row ${i + 1}: valid amount required`);
//         return;
//       }
//       if (!r.paidVia) {
//         toast.error(`Row ${i + 1}: payment method required`);
//         return;
//       }
//     }

//     try {
//       setSaving(true);

//       if (editingId) {
//         const r = rows[0];
//         const res = await axios.put(
//           `${API_URL}/expense/${editingId}`,
//           {
//             category: r.category.trim(),
//             description: r.description.trim(),
//             paidVia: r.paidVia,
//             amount: Number(r.amount),
//             date: masterDate,
//           },
//           getAuthHeaders()
//         );
//         if (res.data?.success === true) {
//           toast.success("Expense updated");
//           closeFormModal();
//           fetchCategories();
//           fetchExpenses();
//         } else {
//           toast.error(res.data?.message || "Failed to update");
//         }
//       } else {
//         const res = await axios.post(
//           `${API_URL}/expense/bulk`,
//           {
//             items: rows.map((r) => ({
//               category: r.category.trim(),
//               description: r.description.trim(),
//               paidVia: r.paidVia,
//               amount: Number(r.amount),
//               date: masterDate,
//             })),
//           },
//           getAuthHeaders()
//         );
//         if (res.data?.success === true) {
//           toast.success(
//             `${res.data.createdCount} ${
//               res.data.createdCount === 1 ? "entry" : "entries"
//             } added`
//           );
//           closeFormModal();
//           fetchCategories();
//           setPage(1);
//           fetchExpenses();
//         } else {
//           toast.error(res.data?.message || "Failed to add");
//         }
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to save");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ===================== EDIT =====================
//   const handleEdit = (expense: Expense) => {
//     setEditingId(expense._id);
//     setMasterDate(
//       expense.date
//         ? new Date(expense.date).toISOString().split("T")[0]
//         : todayStr()
//     );
//     setRows([
//       {
//         category: expense.category || "",
//         description: expense.description || "",
//         amount: expense.amount || "",
//         paidVia: expense.paidVia || PAYMENT_METHODS[0],
//       },
//     ]);
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
//         setDeleteId(null);
//         if (expenses.length === 1 && page > 1) setPage((p) => p - 1);
//         else fetchExpenses();
//       } else {
//         toast.error(res.data?.message || "Failed to delete");
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Delete failed");
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
//         height: { xs: "100dvh", md: "100vh" },
//         maxHeight: { xs: "100dvh", md: "100vh" },
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
//         {/* HEADER */}
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
//                     borderColor: "#f43f5e",
//                     color: "#f43f5e",
//                     bgcolor: "rgba(244, 63, 94, 0.08)",
//                   },
//                 }}
//               >
//                 Dashboard
//               </Button>

//               <Box display="flex" alignItems="center" gap={1.2} sx={{ minWidth: 0 }}>
//                 <Box
//                   sx={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: "10px",
//                     bgcolor: "#31121d",
//                     color: "#f43f5e",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <LocalGasStation sx={{ fontSize: 20 }} />
//                 </Box>
//                 <Box sx={{ minWidth: 0 }}>
//                   <Box display="flex" alignItems="center" gap={1} mb={0.2}>
//                     <FiberManualRecord sx={{ fontSize: 10, color: "#f43f5e" }} />
//                     <Typography
//                       sx={{
//                         color: "#f43f5e",
//                         letterSpacing: 0.5,
//                         fontSize: "0.68rem",
//                         fontWeight: 700,
//                       }}
//                     >
//                       Expense Management
//                     </Typography>
//                   </Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="800"
//                     sx={{
//                       fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.4rem" },
//                       lineHeight: 1.2,
//                     }}
//                   >
//                     6. ROUTE & TRIP EXPENSES
//                   </Typography>
//                 </Box>
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
//                 startIcon={<AddIcon />}
//                 onClick={openFormModal}
//                 sx={{
//                   bgcolor: "#f43f5e",
//                   color: "#ffffff",
//                   fontWeight: 800,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   fontSize: "0.78rem",
//                   flex: { xs: "1 1 45%", sm: "none" },
//                   "&:hover": { bgcolor: "#e11d48" },
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
//                     fontSize: "0.78rem",
//                     flex: { xs: "1 1 100%", sm: "none" },
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

//         {/* ANALYTICS */}
//         <AnalyticsBar>
//           <Grid container spacing={1.5}>
//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <StatCard accent="#f43f5e">
//                 <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(244, 63, 94, 0.15)", color: "#f43f5e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                   <AccountBalanceWallet sx={{ fontSize: 22 }} />
//                 </Box>
//                 <Box sx={{ minWidth: 0, flex: 1 }}>
//                   <Typography sx={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
//                     Total{hasAnyFilter ? " (Filtered)" : ""}
//                   </Typography>
//                   <Typography sx={{ color: "#f43f5e", fontWeight: 900, fontSize: { xs: "1rem", sm: "1.15rem" }, mt: 0.3 }}>
//                     {listLoading ? "..." : formatMoney(analytics.total)}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>
//             <Grid size={{ xs: 6, sm: 6, md: 3 }}>
//               <StatCard accent="#c084fc">
//                 <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(192, 132, 252, 0.15)", color: "#c084fc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                   <Receipt sx={{ fontSize: 22 }} />
//                 </Box>
//                 <Box sx={{ minWidth: 0, flex: 1 }}>
//                   <Typography sx={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
//                     Total Entries
//                   </Typography>
//                   <Typography sx={{ color: "#c084fc", fontWeight: 900, fontSize: { xs: "1rem", sm: "1.15rem" }, mt: 0.3 }}>
//                     {listLoading ? "..." : analytics.count}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>
//             <Grid size={{ xs: 6, sm: 6, md: 3 }}>
//               <StatCard accent="#fbbf24">
//                 <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(251, 191, 36, 0.15)", color: "#fbbf24", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                   <CategoryIcon sx={{ fontSize: 22 }} />
//                 </Box>
//                 <Box sx={{ minWidth: 0, flex: 1 }}>
//                   <Typography sx={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
//                     Top Category
//                   </Typography>
//                   <Typography sx={{ color: "#fbbf24", fontWeight: 900, fontSize: "0.85rem", mt: 0.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={analytics.topCategory}>
//                     {listLoading ? "..." : analytics.topCategory}
//                   </Typography>
//                   <Typography sx={{ color: "#9ca3af", fontSize: "0.62rem", fontWeight: 600, mt: 0.2 }}>
//                     {formatMoney(analytics.topCategoryAmount)}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>
//             <Grid size={{ xs: 6, sm: 6, md: 3 }}>
//               <StatCard accent="#38bdf8">
//                 <Box sx={{ width: 42, height: 42, borderRadius: "10px", bgcolor: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                   <Functions sx={{ fontSize: 22 }} />
//                 </Box>
//                 <Box sx={{ minWidth: 0, flex: 1 }}>
//                   <Typography sx={{ color: "#9ca3af", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
//                     Avg / Entry
//                   </Typography>
//                   <Typography sx={{ color: "#38bdf8", fontWeight: 900, fontSize: { xs: "1rem", sm: "1.15rem" }, mt: 0.3 }}>
//                     {listLoading ? "..." : formatMoney(analytics.avgPerEntry)}
//                   </Typography>
//                   <Typography sx={{ color: "#9ca3af", fontSize: "0.62rem", fontWeight: 600, mt: 0.2 }}>
//                     Today: {formatMoney(analytics.todayTotal)}
//                   </Typography>
//                 </Box>
//               </StatCard>
//             </Grid>
//           </Grid>
//         </AnalyticsBar>

//         {/* FILTER BAR */}
//         <FilterBar>
//           <Grid container spacing={1.5} alignItems="center">
//             <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
//             <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <Autocomplete
//                 freeSolo
//                 options={categories.map((c) => c.name)}
//                 value={categoryFilter}
//                 onChange={(_, v) => setCategoryFilter(v || "")}
//                 onInputChange={(_, v) => setCategoryFilter(v || "")}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     size="small"
//                     label="Category"
//                     placeholder="Search..."
//                     InputLabelProps={{ shrink: true, ...params.InputLabelProps }}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "10px",
//                         backgroundColor: "#090d16",
//                         color: "#fff",
//                         height: "44px",
//                         padding: "0 8px",
//                         "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
//                         "&:hover fieldset": { borderColor: "rgba(192, 132, 252, 0.4)" },
//                         "&.Mui-focused fieldset": { borderColor: "#c084fc" },
//                       },
//                       "& .MuiOutlinedInput-input": {
//                         color: "#fff",
//                         fontSize: "0.85rem",
//                         padding: "8px 4px",
//                       },
//                       "& .MuiInputLabel-root": {
//                         color: "#9ca3af",
//                         fontSize: "0.8rem",
//                         "&.Mui-focused": { color: "#c084fc" },
//                       },
//                     }}
//                   />
//                 )}
//                 slotProps={{
//                   paper: {
//                     sx: {
//                       bgcolor: "#111827",
//                       color: "#e5e7eb",
//                       "& .MuiAutocomplete-option": {
//                         fontSize: "0.85rem",
//                         "&:hover": { bgcolor: "rgba(192, 132, 252, 0.1)" },
//                         "&.Mui-focused": { bgcolor: "rgba(192, 132, 252, 0.15)", color: "#c084fc" },
//                       },
//                     },
//                   },
//                 }}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, sm: 6, md: 5 }}>
//               <Box display="flex" gap={1}>
//                 <Button
//                   size="small"
//                   variant="contained"
//                   fullWidth
//                   startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
//                   onClick={applyAllFilters}
//                   sx={{
//                     bgcolor: "#f43f5e",
//                     color: "#fff",
//                     fontWeight: 700,
//                     textTransform: "none",
//                     borderRadius: "10px",
//                     py: 1.1,
//                     fontSize: "0.78rem",
//                     "&:hover": { bgcolor: "#e11d48" },
//                   }}
//                 >
//                   Apply
//                 </Button>
//                 <Button
//                   size="small"
//                   variant="outlined"
//                   fullWidth
//                   startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
//                   onClick={clearAllFilters}
//                   disabled={!hasAnyFilter && !fromDate && !toDate && !categoryFilter}
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

//           {/* Quick chips + active chips */}
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
//             <QuickFilterChip active={activeQuick === "today"} onClick={() => applyQuickRange("today")}>
//               Today
//             </QuickFilterChip>
//             <QuickFilterChip active={activeQuick === "week"} onClick={() => applyQuickRange("week")}>
//               Last 7d
//             </QuickFilterChip>
//             <QuickFilterChip active={activeQuick === "month"} onClick={() => applyQuickRange("month")}>
//               This Month
//             </QuickFilterChip>
//             <QuickFilterChip active={activeQuick === "all"} onClick={() => applyQuickRange("all")}>
//               All
//             </QuickFilterChip>

//             <Box sx={{ ml: { md: "auto" }, display: "flex", gap: 1, flexWrap: "wrap" }}>
//               {hasDateFilter && (
//                 <Chip
//                   label={`Date: ${appliedFrom || "..."} → ${appliedTo || "..."}`}
//                   size="small"
//                   onDelete={() => {
//                     setFromDate("");
//                     setToDate("");
//                     setAppliedFrom("");
//                     setAppliedTo("");
//                     setActiveQuick("");
//                     setPage(1);
//                   }}
//                   sx={{
//                     bgcolor: "rgba(244, 63, 94, 0.15)",
//                     color: "#f43f5e",
//                     border: "1px solid rgba(244, 63, 94, 0.4)",
//                     fontWeight: 700,
//                     fontSize: "0.7rem",
//                     height: "26px",
//                     "& .MuiChip-deleteIcon": { color: "#f43f5e" },
//                   }}
//                 />
//               )}
//               {hasCategoryFilter && (
//                 <Chip
//                   label={`Category: ${appliedCategory}`}
//                   size="small"
//                   onDelete={() => {
//                     setCategoryFilter("");
//                     setAppliedCategory("");
//                     setPage(1);
//                   }}
//                   sx={{
//                     bgcolor: "rgba(192, 132, 252, 0.15)",
//                     color: "#c084fc",
//                     border: "1px solid rgba(192, 132, 252, 0.4)",
//                     fontWeight: 700,
//                     fontSize: "0.7rem",
//                     height: "26px",
//                     "& .MuiChip-deleteIcon": { color: "#c084fc" },
//                   }}
//                 />
//               )}
//             </Box>
//           </Box>
//         </FilterBar>

//         {/* TABLE / CARDS */}
//         <TableContainerDark>
//           <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} px={{ xs: 2, sm: 3 }} py={1.8} sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", flexShrink: 0 }}>
//             <Typography sx={{ color: "#ffffff", fontWeight: 800, fontSize: { xs: "0.85rem", sm: "0.95rem" }, letterSpacing: 0.5 }}>
//               ROUTE EXPENSES LOG SHEET
//             </Typography>
//             <Chip
//               label={`${totalCount} Expenses`}
//               size="small"
//               sx={{
//                 bgcolor: "rgba(244, 63, 94, 0.1)",
//                 color: "#f43f5e",
//                 border: "1px solid rgba(244, 63, 94, 0.3)",
//                 fontWeight: 700,
//                 fontSize: "0.7rem",
//                 height: "26px",
//               }}
//             />
//           </Box>

//           <TableScrollArea sx={{ display: { xs: "none", md: "block" } }}>
//             <ItemsTable>
//               <thead>
//                 <tr>
//                   <th style={{ textAlign: "center", width: "50px" }}>#</th>
//                   <th>Category</th>
//                   <th>Description</th>
//                   <th>Date</th>
//                   <th>Paid Via</th>
//                   <th style={{ textAlign: "right" }}>Amount (₹)</th>
//                   <th style={{ textAlign: "center", width: "110px" }}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {listLoading ? (
//                   <tr>
//                     <td colSpan={7} style={{ textAlign: "center", padding: "40px 12px" }}>
//                       <CircularProgress sx={{ color: "#f43f5e" }} size={32} />
//                     </td>
//                   </tr>
//                 ) : expenses.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} style={{ textAlign: "center", padding: "40px 12px" }}>
//                       <Receipt style={{ fontSize: 40, color: "#374151", marginBottom: 8 }} />
//                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
//                         No expenses found
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
//                         <Chip
//                           label={row.category}
//                           size="small"
//                           sx={{
//                             bgcolor: "rgba(244, 63, 94, 0.1)",
//                             color: "#f43f5e",
//                             border: "1px solid rgba(244, 63, 94, 0.3)",
//                             fontWeight: 700,
//                             fontSize: "0.68rem",
//                             height: "22px",
//                           }}
//                         />
//                       </td>
//                       <td>
//                         <Typography sx={{ color: "#9ca3af", fontSize: "0.85rem" }}>
//                           {row.description}
//                         </Typography>
//                       </td>
//                       <td>
//                         <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
//                           {new Date(row.date || row.createdAt).toLocaleDateString("en-IN", {
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
//                             fontSize: "0.68rem",
//                             height: "22px",
//                           }}
//                         />
//                       </td>
//                       <td style={{ textAlign: "right" }}>
//                         <Typography sx={{ color: "#f43f5e", fontWeight: 800, fontSize: "0.9rem" }}>
//                           ₹ {Number(row.amount).toLocaleString("en-IN", {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <IconButton size="small" onClick={() => handleEdit(row)} sx={{ color: "#38bdf8" }}>
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                         <IconButton size="small" onClick={() => setDeleteId(row._id)} sx={{ color: "#f43f5e" }}>
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </ItemsTable>
//           </TableScrollArea>

//           <CardListArea sx={{ display: { xs: "flex", md: "none" } }}>
//             {listLoading ? (
//               <Box sx={{ textAlign: "center", py: 5 }}>
//                 <CircularProgress sx={{ color: "#f43f5e" }} size={32} />
//               </Box>
//             ) : expenses.length === 0 ? (
//               <Box sx={{ textAlign: "center", py: 5 }}>
//                 <Receipt sx={{ fontSize: 44, color: "#374151", mb: 1 }} />
//                 <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
//                   No expenses found
//                 </Typography>
//               </Box>
//             ) : (
//               expenses.map((row, idx) => (
//                 <Box
//                   key={row._id}
//                   sx={{
//                     bgcolor: "#111827",
//                     border: "1px solid rgba(244, 63, 94, 0.2)",
//                     borderRadius: "12px",
//                     p: 1.5,
//                   }}
//                 >
//                   <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={1} mb={1}>
//                     <Box display="flex" alignItems="center" gap={1} sx={{ minWidth: 0, flex: 1 }}>
//                       <Box
//                         sx={{
//                           width: 26,
//                           height: 26,
//                           borderRadius: "8px",
//                           bgcolor: "rgba(244, 63, 94, 0.15)",
//                           color: "#f43f5e",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           fontSize: "0.68rem",
//                           fontWeight: 800,
//                           flexShrink: 0,
//                         }}
//                       >
//                         {(page - 1) * limit + idx + 1}
//                       </Box>
//                       <Chip
//                         label={row.category}
//                         size="small"
//                         sx={{
//                           bgcolor: "rgba(244, 63, 94, 0.1)",
//                           color: "#f43f5e",
//                           border: "1px solid rgba(244, 63, 94, 0.3)",
//                           fontWeight: 700,
//                           fontSize: "0.65rem",
//                           height: "22px",
//                         }}
//                       />
//                     </Box>
//                     <Typography sx={{ color: "#f43f5e", fontWeight: 900, fontSize: "0.95rem", flexShrink: 0 }}>
//                       ₹ {Number(row.amount).toLocaleString("en-IN")}
//                     </Typography>
//                   </Box>

//                   {row.description && (
//                     <Typography sx={{ color: "#9ca3af", fontSize: "0.78rem", mb: 1 }}>
//                       {row.description}
//                     </Typography>
//                   )}

//                   <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mb: 1 }}>
//                     <Box>
//                       <Typography sx={{ color: "#6b7280", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>
//                         Date
//                       </Typography>
//                       <Typography sx={{ color: "#e5e7eb", fontSize: "0.75rem", fontWeight: 600, mt: 0.2 }}>
//                         {new Date(row.date || row.createdAt).toLocaleDateString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         })}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <Typography sx={{ color: "#6b7280", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>
//                         Paid Via
//                       </Typography>
//                       <Chip
//                         label={row.paidVia}
//                         size="small"
//                         sx={{
//                           bgcolor: "rgba(255, 255, 255, 0.05)",
//                           color: "#e5e7eb",
//                           border: "1px solid rgba(255, 255, 255, 0.1)",
//                           fontWeight: 600,
//                           fontSize: "0.62rem",
//                           height: "20px",
//                           mt: 0.3,
//                         }}
//                       />
//                     </Box>
//                   </Box>

//                   <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5, borderTop: "1px solid rgba(255, 255, 255, 0.05)", pt: 0.8 }}>
//                     <IconButton size="small" onClick={() => handleEdit(row)} sx={{ color: "#38bdf8" }}>
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small" onClick={() => setDeleteId(row._id)} sx={{ color: "#f43f5e" }}>
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 </Box>
//               ))
//             )}
//           </CardListArea>

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
//               <Typography sx={{ color: "#9ca3af", fontSize: "0.72rem", fontWeight: 600 }}>
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
//                     bgcolor: limit === n ? "rgba(244, 63, 94, 0.2)" : "rgba(255, 255, 255, 0.05)",
//                     color: limit === n ? "#f43f5e" : "#9ca3af",
//                     border: limit === n ? "1px solid rgba(244, 63, 94, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
//                     fontWeight: 700,
//                     fontSize: "0.7rem",
//                     height: "26px",
//                     cursor: "pointer",
//                   }}
//                 />
//               ))}
//               <Typography sx={{ color: "#6b7280", fontSize: "0.72rem", ml: 0.5 }}>
//                 {totalCount > 0
//                   ? `${(page - 1) * limit + 1}–${Math.min(page * limit, totalCount)} of ${totalCount}`
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
//                   fontWeight: 700,
//                   fontSize: "0.78rem",
//                   "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)", color: "#f43f5e" },
//                 },
//                 "& .Mui-selected": { bgcolor: "rgba(244, 63, 94, 0.2) !important", color: "#f43f5e !important" },
//               }}
//             />
//           </Box>
//         </TableContainerDark>
//       </Box>

//       {/* FAB */}
//       <Tooltip title="Back to Dashboard" placement="left">
//         <Fab
//           onClick={() => navigate("/dashboard")}
//           sx={{
//             position: "fixed",
//             bottom: 20,
//             right: 20,
//             zIndex: 1200,
//             bgcolor: "#f43f5e",
//             color: "#ffffff",
//             width: 50,
//             height: 50,
//             boxShadow: "0 8px 24px rgba(244, 63, 94, 0.45)",
//             "&:hover": { bgcolor: "#e11d48" },
//           }}
//         >
//           <HomeIcon />
//         </Fab>
//       </Tooltip>

//       {/* ============== FORM MODAL ============== */}
//       <Dialog
//         open={formOpen}
//         onClose={closeFormModal}
//         maxWidth="lg"
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
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             gap: 1,
//             borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//             px: { xs: 2, sm: 3 },
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
//                 flexShrink: 0,
//               }}
//             >
//               <LockIcon sx={{ fontSize: 18 }} />
//             </Box>
//             <Typography
//               sx={{
//                 color: "#f43f5e",
//                 fontWeight: 800,
//                 fontSize: { xs: "0.8rem", sm: "0.9rem" },
//                 letterSpacing: 1,
//                 textTransform: "uppercase",
//               }}
//             >
//               {editingId ? "Edit Expense Entry" : "Log Trip Expenses"}
//             </Typography>
//             {editingId && (
//               <Chip
//                 label="EDITING"
//                 size="small"
//                 sx={{
//                   bgcolor: "rgba(251, 191, 36, 0.15)",
//                   color: "#fbbf24",
//                   border: "1px solid rgba(251, 191, 36, 0.3)",
//                   fontWeight: 700,
//                   fontSize: "0.65rem",
//                   height: "22px",
//                 }}
//               />
//             )}
//             {!editingId && (
//               <Chip
//                 label={`${rows.length} ${rows.length === 1 ? "entry" : "entries"}`}
//                 size="small"
//                 sx={{
//                   bgcolor: "rgba(244, 63, 94, 0.15)",
//                   color: "#f43f5e",
//                   border: "1px solid rgba(244, 63, 94, 0.3)",
//                   fontWeight: 700,
//                   fontSize: "0.65rem",
//                   height: "22px",
//                 }}
//               />
//             )}
//           </Box>
//           <IconButton onClick={closeFormModal} disabled={saving} size="small" sx={{ color: "#9ca3af", "&:hover": { color: "#f43f5e" } }}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
//           {/* Top row: Date * | Total */}
//           <Grid container spacing={2} sx={{ mb: 2 }}>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <StyledFieldLabel>
//                 Date <span style={{ color: "#f43f5e" }}>*</span>
//               </StyledFieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="date"
//                 value={masterDate}
//                 onChange={(e) => setMasterDate(e.target.value)}
//                 inputProps={{ max: todayStr() }}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <StyledFieldLabel>Total Amount</StyledFieldLabel>
//               <Box
//                 sx={{
//                   height: "44px",
//                   borderRadius: "10px",
//                   backgroundColor: "rgba(251, 191, 36, 0.08)",
//                   border: "1px solid rgba(251, 191, 36, 0.35)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   px: 1.5,
//                 }}
//               >
//                 <Typography sx={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600 }}>
//                   {rows.length} {rows.length === 1 ? "entry" : "entries"}
//                 </Typography>
//                 <Typography sx={{ color: "#fbbf24", fontWeight: 900, fontSize: "1.05rem" }}>
//                   ₹ {formTotal.toLocaleString("en-IN")}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Entries label */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
//             <FieldLabel sx={{ mb: 0 }}>
//               Entries <span style={{ color: "#f43f5e" }}>*</span>
//             </FieldLabel>
//             {!editingId && rows.length > 4 && (
//               <Typography sx={{ color: "#9ca3af", fontSize: "0.68rem", fontWeight: 600 }}>
//                 ↓ Scroll for more
//               </Typography>
//             )}
//           </Box>

//           {/* Rows scroll area — 4 visible */}
//           <FormRowsScroll>
//             {rows.map((r, i) => (
//               <Box
//                 key={i}
//                 sx={{
//                   display: "flex",
//                   flexDirection: { xs: "column", sm: "row" },
//                   gap: 1,
//                   alignItems: { xs: "stretch", sm: "flex-start" },
//                   bgcolor: "#111827",
//                   border: "1px solid rgba(244, 63, 94, 0.15)",
//                   borderRadius: "10px",
//                   p: 1,
//                   flexShrink: 0,
//                 }}
//               >
//                 {/* Category */}
//                 <Box sx={{ width: { xs: "100%", sm: 220 }, flexShrink: 0 }}>
//                   <StyledFieldLabel>
//                     Category <span style={{ color: "#f43f5e" }}>*</span>
//                   </StyledFieldLabel>
//                   <Autocomplete
//                     freeSolo
//                     options={categories.map((c) => c.name)}
//                     value={r.category}
//                     onChange={(_, v) => updateRow(i, "category", v || "")}
//                     onInputChange={(_, v) => updateRow(i, "category", v)}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         placeholder="Select/type"
//                         size="small"
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: "8px",
//                             backgroundColor: "#090d16",
//                             color: "#fff",
//                             height: "38px",
//                             padding: "0 4px",
//                             "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
//                             "&.Mui-focused fieldset": { borderColor: "#f43f5e" },
//                           },
//                           "& .MuiOutlinedInput-input": {
//                             color: "#fff",
//                             fontSize: "0.78rem",
//                             padding: "8px 4px",
//                             "&::placeholder": { color: "#6b7280", opacity: 1 },
//                           },
//                         }}
//                       />
//                     )}
//                     slotProps={{
//                       paper: {
//                         sx: {
//                           bgcolor: "#111827",
//                           color: "#e5e7eb",
//                           "& .MuiAutocomplete-option": { fontSize: "0.8rem" },
//                         },
//                       },
//                     }}
//                   />
//                 </Box>

//                 {/* Description */}
//                 <Box sx={{ flex: 1, minWidth: 0 }}>
//                   <StyledFieldLabel>
//                     Description <span style={{ color: "#f43f5e" }}>*</span>
//                   </StyledFieldLabel>
//                   <TextField
//                     size="small"
//                     fullWidth
//                     placeholder="Details"
//                     value={r.description}
//                     onChange={(e) => updateRow(i, "description", e.target.value)}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "8px",
//                         backgroundColor: "#090d16",
//                         color: "#fff",
//                         height: "38px",
//                         "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
//                         "&.Mui-focused fieldset": { borderColor: "#f43f5e" },
//                       },
//                       "& .MuiOutlinedInput-input": {
//                         color: "#fff",
//                         fontSize: "0.78rem",
//                         padding: "8px 10px",
//                       },
//                     }}
//                   />
//                 </Box>

//                 {/* Amount */}
//                 <Box sx={{ width: { xs: "100%", sm: 130 } }}>
//                   <StyledFieldLabel>
//                     Amount <span style={{ color: "#f43f5e" }}>*</span>
//                   </StyledFieldLabel>
//                   <TextField
//                     size="small"
//                     fullWidth
//                     type="number"
//                     placeholder="0"
//                     value={r.amount}
//                     onChange={(e) => updateRow(i, "amount", e.target.value)}
//                     inputProps={{ min: 0 }}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "8px",
//                         backgroundColor: "#090d16",
//                         color: "#fff",
//                         height: "38px",
//                         "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
//                         "&.Mui-focused fieldset": { borderColor: "#f43f5e" },
//                       },
//                       "& .MuiOutlinedInput-input": {
//                         color: "#fbbf24",
//                         fontSize: "0.82rem",
//                         fontWeight: 700,
//                         padding: "8px 10px",
//                       },
//                     }}
//                   />
//                 </Box>

//                 {/* PaidVia */}
//                 <Box sx={{ width: { xs: "100%", sm: 190 } }}>
//                   <StyledFieldLabel>
//                     Paid Via <span style={{ color: "#f43f5e" }}>*</span>
//                   </StyledFieldLabel>
//                   <Select
//                     size="small"
//                     fullWidth
//                     value={r.paidVia}
//                     onChange={(e) => updateRow(i, "paidVia", e.target.value)}
//                     sx={{
//                       borderRadius: "8px",
//                       backgroundColor: "#090d16",
//                       color: "#fff",
//                       height: "38px",
//                       fontSize: "0.72rem",
//                       "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.1)" },
//                       "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#f43f5e" },
//                       "& .MuiSvgIcon-root": { color: "#9ca3af" },
//                     }}
//                     MenuProps={{
//                       PaperProps: {
//                         sx: {
//                           bgcolor: "#111827",
//                           "& .MuiMenuItem-root": {
//                             color: "#e5e7eb",
//                             fontSize: "0.75rem",
//                             "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
//                             "&.Mui-selected": { bgcolor: "rgba(244, 63, 94, 0.15)", color: "#f43f5e" },
//                           },
//                         },
//                       },
//                     }}
//                   >
//                     {PAYMENT_METHODS.map((p) => (
//                       <MenuItem key={p} value={p}>
//                         {p}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </Box>

//                 {/* Actions */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     gap: 0.5,
//                     alignItems: "flex-end",
//                     alignSelf: { xs: "flex-end", sm: "flex-end" },
//                     pt: { xs: 0, sm: "22px" },
//                   }}
//                 >
//                   <IconButton
//                     size="small"
//                     onClick={() => removeRow(i)}
//                     sx={{
//                       color: "#f43f5e",
//                       width: 34,
//                       height: 34,
//                       border: "1px solid rgba(244, 63, 94, 0.3)",
//                       bgcolor: "rgba(244, 63, 94, 0.08)",
//                       "&:hover": { bgcolor: "rgba(244, 63, 94, 0.2)" },
//                     }}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                   {!editingId && (
//                     <IconButton
//                       size="small"
//                       onClick={addRow}
//                       sx={{
//                         color: "#22d3ee",
//                         width: 34,
//                         height: 34,
//                         bgcolor: "rgba(34, 211, 238, 0.1)",
//                         border: "1px solid rgba(34, 211, 238, 0.3)",
//                         "&:hover": { bgcolor: "rgba(34, 211, 238, 0.2)" },
//                       }}
//                     >
//                       <AddIcon fontSize="small" />
//                     </IconButton>
//                   )}
//                 </Box>
//               </Box>
//             ))}
//           </FormRowsScroll>
//         </DialogContent>

//         <DialogActions
//           sx={{
//             px: { xs: 2, sm: 3 },
//             pb: { xs: 2, sm: 3 },
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
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             startIcon={saving ? <CircularProgress size={16} sx={{ color: "#ffffff" }} /> : <AddIcon />}
//             onClick={handleSubmit}
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
//               fontSize: "0.78rem",
//               "&:hover": { bgcolor: "#e11d48" },
//             }}
//           >
//             {saving
//               ? "Saving..."
//               : editingId
//               ? "Update"
//               : `Add ${rows.length} ${rows.length === 1 ? "Entry" : "Entries"}`}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* DELETE SINGLE */}
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
//         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>Delete Expense?</DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             Are you sure? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2.5 }}>
//           <Button onClick={() => setDeleteId(null)} disabled={deleting} sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}>
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDelete}
//             disabled={deleting}
//             variant="contained"
//             sx={{ bgcolor: "#f43f5e", color: "#ffffff", textTransform: "none", fontWeight: 700, borderRadius: "10px", px: 3 }}
//           >
//             {deleting ? "Deleting..." : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* DELETE ALL */}
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
//         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>Delete All Expenses?</DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             This will permanently remove all {totalCount} expense entries.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2.5 }}>
//           <Button onClick={() => setDeleteAllOpen(false)} disabled={deleting} sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}>
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDeleteAll}
//             disabled={deleting}
//             variant="contained"
//             sx={{ bgcolor: "#f43f5e", color: "#ffffff", textTransform: "none", fontWeight: 700, borderRadius: "10px", px: 3 }}
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
  Autocomplete,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
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

interface CategoryOption {
  _id: string;
  name: string;
}

interface FormRow {
  category: string;
  description: string;
  amount: number | "";
  paidVia: string;
}

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

const blankRow = (): FormRow => ({
  category: "",
  description: "",
  amount: "",
  paidVia: PAYMENT_METHODS[0],
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

const AnalyticsBar = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme)
    ? "1px solid rgba(244, 63, 94, 0.25)"
    : "1px solid rgba(244, 63, 94, 0.2)",
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: isDark(theme)
    ? "0 8px 24px rgba(244, 63, 94, 0.08)"
    : "0 4px 14px rgba(244, 63, 94, 0.06)",
  flexShrink: 0,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
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

const StatCard = styled(Box)<{ accent: string }>(({ accent, theme }) => ({
  backgroundColor: isDark(theme) ? "#111827" : "#ffffff",
  borderRadius: "12px",
  border: `1px solid ${accent}22`,
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  height: "100%",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: `${accent}66`,
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
    backgroundColor: active ? "#f43f5e" : "rgba(244, 63, 94, 0.15)",
    color: active ? "#ffffff" : "#f43f5e",
    border: active
      ? "1px solid #f43f5e"
      : "1px solid rgba(244, 63, 94, 0.3)",
    "&:hover": {
      backgroundColor: active ? "#e11d48" : "rgba(244, 63, 94, 0.25)",
      borderColor: "#f43f5e",
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
    "&:hover fieldset": { borderColor: "rgba(244, 63, 94, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#f43f5e",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: isDark(theme) ? "#ffffff" : "#0f172a",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "10px 12px",
    "&::placeholder": {
      color: isDark(theme) ? "#6b7280" : "#94a3b8",
      opacity: 1,
    },
  },
  "& input[type='date']::-webkit-calendar-picker-indicator": {
    filter: isDark(theme) ? "invert(0.7)" : "none",
    cursor: "pointer",
  },
  "& .MuiInputLabel-root": {
    color: isDark(theme) ? "#9ca3af" : "#64748b",
    fontSize: "0.8rem",
    "&.Mui-focused": { color: "#f43f5e" },
  },
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  color: isDark(theme) ? "#9ca3af" : "#64748b",
  fontWeight: 700,
  fontSize: "0.7rem",
  letterSpacing: 1,
  textTransform: "uppercase",
  marginBottom: "8px",
}));

const TableContainerDark = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(15, 23, 42, 0.08)",
  overflow: "hidden",
  boxShadow: isDark(theme)
    ? "0 8px 20px rgba(0, 0, 0, 0.4)"
    : "0 4px 14px rgba(15, 23, 42, 0.05)",
  marginBottom: "16px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: "400px",
  transition: "all 0.3s ease",
}));

const TableScrollArea = styled(Box)(() => ({
  overflow: "auto",
  flex: "1 1 0",
  height: 0,
  minHeight: 0,
  width: "100%",
  "&::-webkit-scrollbar": { width: "8px", height: "8px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(244, 63, 94, 0.3)",
    borderRadius: "8px",
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
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(244, 63, 94, 0.3)",
    borderRadius: "8px",
  },
}));

const ItemsTable = styled("table")(({ theme }) => {
  const dark = isDark(theme);
  return {
    width: "100%",
    minWidth: "900px",
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
      borderBottom: dark
        ? "1px solid rgba(255, 255, 255, 0.05)"
        : "1px solid rgba(15, 23, 42, 0.05)",
    },
    "& tbody tr:hover": { backgroundColor: "rgba(244, 63, 94, 0.03)" },
    "& tbody td": {
      color: dark ? "#e5e7eb" : "#334155",
      fontSize: "0.85rem",
      padding: "12px",
      whiteSpace: "nowrap",
    },
  };
});

const FormRowsScroll = styled(Box)(() => ({
  maxHeight: "340px",
  overflowY: "auto",
  overflowX: "hidden",
  paddingRight: "6px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(244, 63, 94, 0.35)",
    borderRadius: "8px",
  },
}));

const StyledFieldLabel = styled(Typography)(({ theme }) => ({
  color: isDark(theme) ? "#9ca3af" : "#64748b",
  fontWeight: 700,
  fontSize: "0.65rem",
  letterSpacing: 0.8,
  textTransform: "uppercase",
  marginBottom: "4px",
  display: "block",
}));

// ===================== MAIN =====================
const ExpenseEntry: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dark = isDark(theme);

  // 👇 color helper for inline sx
  const c = {
    pageBg: dark ? "#090d16" : "#f1f5f9",
    cardBg: dark ? "#111827" : "#ffffff",
    bannerBg: dark ? "#0d1527" : "#ffffff",
    text: dark ? "#ffffff" : "#0f172a",
    textSec: dark ? "#e5e7eb" : "#334155",
    muted: dark ? "#9ca3af" : "#64748b",
    mutedDark: dark ? "#6b7280" : "#94a3b8",
    veryMuted: dark ? "#374151" : "#cbd5e1",
    inputBg: dark ? "#090d16" : "#f8fafc",
    border08: dark
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(15, 23, 42, 0.08)",
    border05: dark
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(15, 23, 42, 0.05)",
    border10: dark
      ? "rgba(255, 255, 255, 0.10)"
      : "rgba(15, 23, 42, 0.10)",
    border12: dark
      ? "rgba(255, 255, 255, 0.12)"
      : "rgba(15, 23, 42, 0.12)",
    border15: dark
      ? "rgba(255, 255, 255, 0.15)"
      : "rgba(15, 23, 42, 0.15)",
    iconBgRose: dark ? "#31121d" : "#ffe4e6",
    iconBgRoseSoft: dark
      ? "rgba(244, 63, 94, 0.15)"
      : "rgba(244, 63, 94, 0.12)",
    chipBgSoft: dark
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(15, 23, 42, 0.04)",
  };

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [grandTotal, setGrandTotal] = useState(0);
  const [saving, setSaving] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [activeQuick, setActiveQuick] = useState<
    "today" | "week" | "month" | "all" | ""
  >("");

  const [categoryFilter, setCategoryFilter] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");

  const [categories, setCategories] = useState<CategoryOption[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [masterDate, setMasterDate] = useState<string>(todayStr());
  const [rows, setRows] = useState<FormRow[]>([blankRow()]);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);

  // ===================== FETCH CATEGORIES =====================
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/expense/categories`, {
        ...getAuthHeaders(),
      });
      if (res.data?.success) setCategories(res.data.data || []);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ===================== FETCH EXPENSES =====================
  const fetchExpenses = async () => {
    try {
      setListLoading(true);
      const params: any = { page, limit };
      if (appliedFrom) params.from = appliedFrom;
      if (appliedTo) params.to = appliedTo;
      if (appliedCategory) params.category = appliedCategory;

      const res = await axios.get(`${API_URL}/expense`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setExpenses(res.data.data || []);
        setGrandTotal(Number(res.data.grandTotal) || 0);
        setTotalCount(res.data.total || 0);
        setTotalPages(res.data.pages || 1);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load expenses");
        setExpenses([]);
      }
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load");
      }
      setExpenses([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, appliedFrom, appliedTo, appliedCategory]);

  // ===================== ANALYTICS =====================
  const analytics = useMemo(() => {
    const pageCount = expenses.length;
    const pageSum = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
    const total = grandTotal > 0 ? grandTotal : pageSum;

    const avgPerEntry =
      totalCount > 0
        ? total / totalCount
        : pageCount > 0
        ? total / pageCount
        : 0;

    const catMap = new Map<string, number>();
    expenses.forEach((e) => {
      const cat = String(e.category || "Other");
      catMap.set(cat, (catMap.get(cat) || 0) + (Number(e.amount) || 0));
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
      .filter(
        (e) =>
          new Date(e.date || e.createdAt).toISOString().split("T")[0] === today
      )
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
    setEditingId(null);
    setMasterDate(todayStr());
    setRows([blankRow()]);
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

  const addRow = () => {
    setRows((prev) => [...prev, blankRow()]);
  };

  const removeRow = (idx: number) => {
    if (rows.length === 1) {
      setRows([blankRow()]);
      return;
    }
    setRows((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateRow = (idx: number, field: keyof FormRow, value: any) => {
    setRows((prev) => {
      const copy = [...prev];
      if (field === "amount") {
        copy[idx].amount = value === "" ? "" : Math.max(0, Number(value));
      } else {
        // @ts-ignore
        copy[idx][field] = value;
      }
      return copy;
    });
  };

  const formTotal = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);

  // ===================== FILTERS =====================
  const applyAllFilters = () => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setAppliedCategory(categoryFilter);
    setActiveQuick("");
    setPage(1);
  };

  const clearAllFilters = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
    setCategoryFilter("");
    setAppliedCategory("");
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
  const hasCategoryFilter = !!appliedCategory;
  const hasAnyFilter = hasDateFilter || hasCategoryFilter;

  // ===================== SUBMIT =====================
  const handleSubmit = async () => {
    if (!masterDate) {
      toast.error("Please select date");
      return;
    }

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (!r.category.trim()) {
        toast.error(`Row ${i + 1}: category required`);
        return;
      }
      if (!r.description.trim()) {
        toast.error(`Row ${i + 1}: description required`);
        return;
      }
      if (!r.amount || Number(r.amount) <= 0) {
        toast.error(`Row ${i + 1}: valid amount required`);
        return;
      }
      if (!r.paidVia) {
        toast.error(`Row ${i + 1}: payment method required`);
        return;
      }
    }

    try {
      setSaving(true);

      if (editingId) {
        const r = rows[0];
        const res = await axios.put(
          `${API_URL}/expense/${editingId}`,
          {
            category: r.category.trim(),
            description: r.description.trim(),
            paidVia: r.paidVia,
            amount: Number(r.amount),
            date: masterDate,
          },
          getAuthHeaders()
        );
        if (res.data?.success === true) {
          toast.success("Expense updated");
          closeFormModal();
          fetchCategories();
          fetchExpenses();
        } else {
          toast.error(res.data?.message || "Failed to update");
        }
      } else {
        const res = await axios.post(
          `${API_URL}/expense/bulk`,
          {
            items: rows.map((r) => ({
              category: r.category.trim(),
              description: r.description.trim(),
              paidVia: r.paidVia,
              amount: Number(r.amount),
              date: masterDate,
            })),
          },
          getAuthHeaders()
        );
        if (res.data?.success === true) {
          toast.success(
            `${res.data.createdCount} ${
              res.data.createdCount === 1 ? "entry" : "entries"
            } added`
          );
          closeFormModal();
          fetchCategories();
          setPage(1);
          fetchExpenses();
        } else {
          toast.error(res.data?.message || "Failed to add");
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // ===================== EDIT =====================
  const handleEdit = (expense: Expense) => {
    setEditingId(expense._id);
    setMasterDate(
      expense.date
        ? new Date(expense.date).toISOString().split("T")[0]
        : todayStr()
    );
    setRows([
      {
        category: expense.category || "",
        description: expense.description || "",
        amount: expense.amount || "",
        paidVia: expense.paidVia || PAYMENT_METHODS[0],
      },
    ]);
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
        setDeleteId(null);
        if (expenses.length === 1 && page > 1) setPage((p) => p - 1);
        else fetchExpenses();
      } else {
        toast.error(res.data?.message || "Failed to delete");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete failed");
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
        height: { xs: "100dvh", md: "100vh" },
        maxHeight: { xs: "100dvh", md: "100vh" },
        overflow: "hidden",
        bgcolor: c.pageBg,
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 1.5, md: 2.5 },
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
                    borderColor: "#f43f5e",
                    color: "#f43f5e",
                    bgcolor: "rgba(244, 63, 94, 0.08)",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box
                display="flex"
                alignItems="center"
                gap={1.2}
                sx={{ minWidth: 0 }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    bgcolor: c.iconBgRose,
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
                      color: c.text,
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
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.78rem",
                  flex: { xs: "1 1 45%", sm: "none" },
                  "&:hover": { bgcolor: "#e11d48" },
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
                  color: c.textSec,
                  borderColor: c.border15,
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

        {/* ANALYTICS */}
        <AnalyticsBar>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard accent="#f43f5e">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: c.iconBgRoseSoft,
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
                      color: c.muted,
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}
                  >
                    Total{hasAnyFilter ? " (Filtered)" : ""}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#f43f5e",
                      fontWeight: 900,
                      fontSize: { xs: "1rem", sm: "1.15rem" },
                      mt: 0.3,
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
                      color: c.muted,
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
                      color: c.muted,
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
                      color: c.muted,
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
                      color: c.muted,
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
                    }}
                  >
                    {listLoading ? "..." : formatMoney(analytics.avgPerEntry)}
                  </Typography>
                  <Typography
                    sx={{
                      color: c.muted,
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

        {/* FILTER BAR */}
        <FilterBar>
          <Grid container spacing={1.5} alignItems="center">
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Autocomplete
                freeSolo
                options={categories.map((cat) => cat.name)}
                value={categoryFilter}
                onChange={(_, v) => setCategoryFilter(v || "")}
                onInputChange={(_, v) => setCategoryFilter(v || "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Category"
                    placeholder="Search..."
                    InputLabelProps={{
                      shrink: true,
                      ...params.InputLabelProps,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        backgroundColor: c.inputBg,
                        color: c.text,
                        height: "44px",
                        padding: "0 8px",
                        "& fieldset": { borderColor: c.border12 },
                        "&:hover fieldset": {
                          borderColor: "rgba(192, 132, 252, 0.4)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "#c084fc" },
                      },
                      "& .MuiOutlinedInput-input": {
                        color: c.text,
                        fontSize: "0.85rem",
                        padding: "8px 4px",
                      },
                      "& .MuiInputLabel-root": {
                        color: c.muted,
                        fontSize: "0.8rem",
                        "&.Mui-focused": { color: "#c084fc" },
                      },
                    }}
                  />
                )}
                slotProps={{
                  paper: {
                    sx: {
                      bgcolor: c.cardBg,
                      color: c.textSec,
                      border: `1px solid ${c.border08}`,
                      "& .MuiAutocomplete-option": {
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(192, 132, 252, 0.1)" },
                        "&.Mui-focused": {
                          bgcolor: "rgba(192, 132, 252, 0.15)",
                          color: "#c084fc",
                        },
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <Box display="flex" gap={1}>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
                  onClick={applyAllFilters}
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
                  onClick={clearAllFilters}
                  disabled={
                    !hasAnyFilter && !fromDate && !toDate && !categoryFilter
                  }
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

          {/* Quick chips + active chips */}
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
                flexWrap: "wrap",
              }}
            >
              {hasDateFilter && (
                <Chip
                  label={`Date: ${appliedFrom || "..."} → ${
                    appliedTo || "..."
                  }`}
                  size="small"
                  onDelete={() => {
                    setFromDate("");
                    setToDate("");
                    setAppliedFrom("");
                    setAppliedTo("");
                    setActiveQuick("");
                    setPage(1);
                  }}
                  sx={{
                    bgcolor: "rgba(244, 63, 94, 0.15)",
                    color: "#f43f5e",
                    border: "1px solid rgba(244, 63, 94, 0.4)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "26px",
                    "& .MuiChip-deleteIcon": { color: "#f43f5e" },
                  }}
                />
              )}
              {hasCategoryFilter && (
                <Chip
                  label={`Category: ${appliedCategory}`}
                  size="small"
                  onDelete={() => {
                    setCategoryFilter("");
                    setAppliedCategory("");
                    setPage(1);
                  }}
                  sx={{
                    bgcolor: "rgba(192, 132, 252, 0.15)",
                    color: "#c084fc",
                    border: "1px solid rgba(192, 132, 252, 0.4)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "26px",
                    "& .MuiChip-deleteIcon": { color: "#c084fc" },
                  }}
                />
              )}
            </Box>
          </Box>
        </FilterBar>

        {/* TABLE / CARDS */}
        <TableContainerDark>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
            px={{ xs: 2, sm: 3 }}
            py={1.8}
            sx={{ borderBottom: `1px solid ${c.border08}`, flexShrink: 0 }}
          >
            <Typography
              sx={{
                color: c.text,
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
                          color: dark ? "#374151" : "#cbd5e1",
                          marginBottom: 8,
                        }}
                      />
                      <Typography
                        sx={{ color: c.muted, fontSize: "0.9rem" }}
                      >
                        No expenses found
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  expenses.map((row, idx) => (
                    <tr key={row._id}>
                      <td style={{ textAlign: "center", color: c.mutedDark }}>
                        {(page - 1) * limit + idx + 1}
                      </td>
                      <td>
                        <Chip
                          label={row.category}
                          size="small"
                          sx={{
                            bgcolor: "rgba(244, 63, 94, 0.1)",
                            color: "#f43f5e",
                            border: "1px solid rgba(244, 63, 94, 0.3)",
                            fontWeight: 700,
                            fontSize: "0.68rem",
                            height: "22px",
                          }}
                        />
                      </td>
                      <td>
                        <Typography
                          sx={{ color: c.muted, fontSize: "0.85rem" }}
                        >
                          {row.description}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          sx={{ color: c.muted, fontSize: "0.8rem" }}
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
                            bgcolor: c.chipBgSoft,
                            color: c.textSec,
                            border: `1px solid ${c.border10}`,
                            fontWeight: 600,
                            fontSize: "0.68rem",
                            height: "22px",
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
                          {Number(row.amount).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(row)}
                          sx={{ color: "#38bdf8" }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => setDeleteId(row._id)}
                          sx={{ color: "#f43f5e" }}
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

          <CardListArea sx={{ display: { xs: "flex", md: "none" } }}>
            {listLoading ? (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <CircularProgress sx={{ color: "#f43f5e" }} size={32} />
              </Box>
            ) : expenses.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <Receipt
                  sx={{
                    fontSize: 44,
                    color: dark ? "#374151" : "#cbd5e1",
                    mb: 1,
                  }}
                />
                <Typography sx={{ color: c.muted, fontSize: "0.9rem" }}>
                  No expenses found
                </Typography>
              </Box>
            ) : (
              expenses.map((row, idx) => (
                <Box
                  key={row._id}
                  sx={{
                    bgcolor: c.cardBg,
                    border: "1px solid rgba(244, 63, 94, 0.2)",
                    borderRadius: "12px",
                    p: 1.5,
                  }}
                >
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
                          bgcolor: c.iconBgRoseSoft,
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
                      <Chip
                        label={row.category}
                        size="small"
                        sx={{
                          bgcolor: "rgba(244, 63, 94, 0.1)",
                          color: "#f43f5e",
                          border: "1px solid rgba(244, 63, 94, 0.3)",
                          fontWeight: 700,
                          fontSize: "0.65rem",
                          height: "22px",
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        color: "#f43f5e",
                        fontWeight: 900,
                        fontSize: "0.95rem",
                        flexShrink: 0,
                      }}
                    >
                      ₹ {Number(row.amount).toLocaleString("en-IN")}
                    </Typography>
                  </Box>

                  {row.description && (
                    <Typography
                      sx={{ color: c.muted, fontSize: "0.78rem", mb: 1 }}
                    >
                      {row.description}
                    </Typography>
                  )}

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
                          color: c.mutedDark,
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        Date
                      </Typography>
                      <Typography
                        sx={{
                          color: c.textSec,
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
                          color: c.mutedDark,
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        Paid Via
                      </Typography>
                      <Chip
                        label={row.paidVia}
                        size="small"
                        sx={{
                          bgcolor: c.chipBgSoft,
                          color: c.textSec,
                          border: `1px solid ${c.border10}`,
                          fontWeight: 600,
                          fontSize: "0.62rem",
                          height: "20px",
                          mt: 0.3,
                        }}
                      />
                    </Box>
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
                      onClick={() => handleEdit(row)}
                      sx={{ color: "#38bdf8" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteId(row._id)}
                      sx={{ color: "#f43f5e" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </CardListArea>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              px: { xs: 2, sm: 3 },
              py: 1.6,
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
                        ? "rgba(244, 63, 94, 0.2)"
                        : c.chipBgSoft,
                    color: limit === n ? "#f43f5e" : c.muted,
                    border:
                      limit === n
                        ? "1px solid rgba(244, 63, 94, 0.5)"
                        : `1px solid ${c.border10}`,
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "26px",
                    cursor: "pointer",
                  }}
                />
              ))}
              <Typography
                sx={{ color: c.mutedDark, fontSize: "0.72rem", ml: 0.5 }}
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
                  color: c.muted,
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
                },
              }}
            />
          </Box>
        </TableContainerDark>
      </Box>

      {/* FAB */}
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

      {/* ============== FORM MODAL ============== */}
      <Dialog
        open={formOpen}
        onClose={closeFormModal}
        maxWidth="lg"
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
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
            borderBottom: `1px solid ${c.border08}`,
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
                bgcolor: c.iconBgRose,
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
            {!editingId && (
              <Chip
                label={`${rows.length} ${
                  rows.length === 1 ? "entry" : "entries"
                }`}
                size="small"
                sx={{
                  bgcolor: "rgba(244, 63, 94, 0.15)",
                  color: "#f43f5e",
                  border: "1px solid rgba(244, 63, 94, 0.3)",
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
              color: c.muted,
              "&:hover": { color: "#f43f5e" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Top row: Date * | Total */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <StyledFieldLabel>
                Date <span style={{ color: "#f43f5e" }}>*</span>
              </StyledFieldLabel>
              <StyledTextField
                fullWidth
                type="date"
                value={masterDate}
                onChange={(e) => setMasterDate(e.target.value)}
                inputProps={{ max: todayStr() }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <StyledFieldLabel>Total Amount</StyledFieldLabel>
              <Box
                sx={{
                  height: "44px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(251, 191, 36, 0.08)",
                  border: "1px solid rgba(251, 191, 36, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 1.5,
                }}
              >
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {rows.length} {rows.length === 1 ? "entry" : "entries"}
                </Typography>
                <Typography
                  sx={{
                    color: "#fbbf24",
                    fontWeight: 900,
                    fontSize: "1.05rem",
                  }}
                >
                  ₹ {formTotal.toLocaleString("en-IN")}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Entries label */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <FieldLabel sx={{ mb: 0 }}>
              Entries <span style={{ color: "#f43f5e" }}>*</span>
            </FieldLabel>
            {!editingId && rows.length > 4 && (
              <Typography
                sx={{ color: c.muted, fontSize: "0.68rem", fontWeight: 600 }}
              >
                ↓ Scroll for more
              </Typography>
            )}
          </Box>

          {/* Rows scroll area — 4 visible */}
          <FormRowsScroll>
            {rows.map((r, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1,
                  alignItems: { xs: "stretch", sm: "flex-start" },
                  bgcolor: c.cardBg,
                  border: "1px solid rgba(244, 63, 94, 0.15)",
                  borderRadius: "10px",
                  p: 1,
                  flexShrink: 0,
                }}
              >
                {/* Category */}
                <Box sx={{ width: { xs: "100%", sm: 220 }, flexShrink: 0 }}>
                  <StyledFieldLabel>
                    Category <span style={{ color: "#f43f5e" }}>*</span>
                  </StyledFieldLabel>
                  <Autocomplete
                    freeSolo
                    options={categories.map((cat) => cat.name)}
                    value={r.category}
                    onChange={(_, v) => updateRow(i, "category", v || "")}
                    onInputChange={(_, v) => updateRow(i, "category", v)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select/type"
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: c.inputBg,
                            color: c.text,
                            height: "38px",
                            padding: "0 4px",
                            "& fieldset": { borderColor: c.border10 },
                            "&.Mui-focused fieldset": {
                              borderColor: "#f43f5e",
                            },
                          },
                          "& .MuiOutlinedInput-input": {
                            color: c.text,
                            fontSize: "0.78rem",
                            padding: "8px 4px",
                            "&::placeholder": {
                              color: c.mutedDark,
                              opacity: 1,
                            },
                          },
                        }}
                      />
                    )}
                    slotProps={{
                      paper: {
                        sx: {
                          bgcolor: c.cardBg,
                          color: c.textSec,
                          border: `1px solid ${c.border08}`,
                          "& .MuiAutocomplete-option": {
                            fontSize: "0.8rem",
                          },
                        },
                      },
                    }}
                  />
                </Box>

                {/* Description */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <StyledFieldLabel>
                    Description <span style={{ color: "#f43f5e" }}>*</span>
                  </StyledFieldLabel>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Details"
                    value={r.description}
                    onChange={(e) =>
                      updateRow(i, "description", e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: c.inputBg,
                        color: c.text,
                        height: "38px",
                        "& fieldset": { borderColor: c.border10 },
                        "&.Mui-focused fieldset": { borderColor: "#f43f5e" },
                      },
                      "& .MuiOutlinedInput-input": {
                        color: c.text,
                        fontSize: "0.78rem",
                        padding: "8px 10px",
                      },
                    }}
                  />
                </Box>

                {/* Amount */}
                <Box sx={{ width: { xs: "100%", sm: 130 } }}>
                  <StyledFieldLabel>
                    Amount <span style={{ color: "#f43f5e" }}>*</span>
                  </StyledFieldLabel>
                  <TextField
                    size="small"
                    fullWidth
                    type="number"
                    placeholder="0"
                    value={r.amount}
                    onChange={(e) => updateRow(i, "amount", e.target.value)}
                    inputProps={{ min: 0 }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: c.inputBg,
                        color: c.text,
                        height: "38px",
                        "& fieldset": { borderColor: c.border10 },
                        "&.Mui-focused fieldset": { borderColor: "#f43f5e" },
                      },
                      "& .MuiOutlinedInput-input": {
                        color: "#fbbf24",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        padding: "8px 10px",
                      },
                    }}
                  />
                </Box>

                {/* PaidVia */}
                <Box sx={{ width: { xs: "100%", sm: 190 } }}>
                  <StyledFieldLabel>
                    Paid Via <span style={{ color: "#f43f5e" }}>*</span>
                  </StyledFieldLabel>
                  <Select
                    size="small"
                    fullWidth
                    value={r.paidVia}
                    onChange={(e) => updateRow(i, "paidVia", e.target.value)}
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: c.inputBg,
                      color: c.text,
                      height: "38px",
                      fontSize: "0.72rem",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: c.border10,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f43f5e",
                      },
                      "& .MuiSvgIcon-root": { color: c.muted },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: c.cardBg,
                          border: `1px solid ${c.border08}`,
                          "& .MuiMenuItem-root": {
                            color: c.textSec,
                            fontSize: "0.75rem",
                            "&:hover": {
                              bgcolor: "rgba(244, 63, 94, 0.1)",
                            },
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
                  </Select>
                </Box>

                {/* Actions */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                    alignItems: "flex-end",
                    alignSelf: { xs: "flex-end", sm: "flex-end" },
                    pt: { xs: 0, sm: "22px" },
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => removeRow(i)}
                    sx={{
                      color: "#f43f5e",
                      width: 34,
                      height: 34,
                      border: "1px solid rgba(244, 63, 94, 0.3)",
                      bgcolor: "rgba(244, 63, 94, 0.08)",
                      "&:hover": { bgcolor: "rgba(244, 63, 94, 0.2)" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  {!editingId && (
                    <IconButton
                      size="small"
                      onClick={addRow}
                      sx={{
                        color: "#22d3ee",
                        width: 34,
                        height: 34,
                        bgcolor: "rgba(34, 211, 238, 0.1)",
                        border: "1px solid rgba(34, 211, 238, 0.3)",
                        "&:hover": { bgcolor: "rgba(34, 211, 238, 0.2)" },
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}
          </FormRowsScroll>
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 2, sm: 3 },
            pb: { xs: 2, sm: 3 },
            pt: 1,
            borderTop: `1px solid ${c.border08}`,
            gap: 1,
          }}
        >
          <Button
            onClick={closeFormModal}
            disabled={saving}
            sx={{
              color: c.muted,
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 3,
              py: 1.1,
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
            onClick={handleSubmit}
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
              "&:hover": { bgcolor: "#e11d48" },
            }}
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update"
              : `Add ${rows.length} ${rows.length === 1 ? "Entry" : "Entries"}`}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE SINGLE */}
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
          Delete Expense?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: c.muted }}>
            Are you sure? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteId(null)}
            disabled={deleting}
            sx={{ color: c.muted, textTransform: "none", fontWeight: 600 }}
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
            }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE ALL */}
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
          Delete All Expenses?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: c.muted }}>
            This will permanently remove all {totalCount} expense entries.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteAllOpen(false)}
            disabled={deleting}
            sx={{ color: c.muted, textTransform: "none", fontWeight: 600 }}
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