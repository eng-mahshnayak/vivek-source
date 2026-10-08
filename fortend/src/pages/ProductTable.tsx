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
//   Search,
//   Inventory2,
//   Refresh as RefreshIcon,
//   FilterAlt as FilterIcon,
//   Clear as ClearIcon,
//   Close as CloseIcon,
//       Home as HomeIcon,
//   Lock as LockIcon,
//   Save as SaveIcon,
// } from "@mui/icons-material";

// // ===================== TYPES =====================

// interface Product {
//   _id: string;
//   itemName: string;
//   mrp: number;
//   rate: number;
//   unit: string;
//   createdAt?: string;
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

// const StyledTextField = styled(TextField)(() => ({
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "10px",
//     backgroundColor: "#090d16",
//     color: "#ffffff",
//     height: "42px",
//     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
//     "&:hover fieldset": { borderColor: "rgba(192, 132, 252, 0.4)" },
//     "&.Mui-focused fieldset": {
//       borderColor: "#c084fc",
//       borderWidth: "1.5px",
//     },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#ffffff",
//     fontSize: "0.85rem",
//     fontWeight: 500,
//     padding: "10px 12px",
//     "&::placeholder": { color: "#6b7280", opacity: 1 },
//     "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
//       WebkitAppearance: "none",
//       margin: 0,
//     },
//     "&[type=number]": { MozAppearance: "textfield" },
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
//     backgroundColor: "rgba(192, 132, 252, 0.3)",
//     borderRadius: "8px",
//     "&:hover": { backgroundColor: "rgba(192, 132, 252, 0.5)" },
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
//   "& tbody tr:hover": { backgroundColor: "rgba(192, 132, 252, 0.04)" },
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

// const ProductManagement: React.FC = () => {
//   const navigate = useNavigate();

//   // List state
//   const [products, setProducts] = useState<Product[]>([]);
//   const [listLoading, setListLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // Search
//   const [search, setSearch] = useState("");

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
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // Form state
//   const [itemName, setItemName] = useState("");
//   const [mrp, setMrp] = useState<number | "">("");
//   const [rate, setRate] = useState<number | "">("");
//   const [unit, setUnit] = useState("");

//   // Delete
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   // ===================== FETCH =====================
//   const fetchProducts = async () => {
//     try {
//       setListLoading(true);

//       const isSearching = search.trim().length > 0;
//       const params: any = { page, limit };
//       if (appliedFrom) params.fromDate = appliedFrom;
//       if (appliedTo) params.toDate = appliedTo;
//       if (isSearching) params.query = search.trim();

//       const endpoint = isSearching
//         ? `${API_URL}/product/search`
//         : `${API_URL}/product`;

//       const res = await axios.get(endpoint, {
//         params: isSearching
//           ? { query: search.trim(), limit: 200 }
//           : params,
//         ...getAuthHeaders(),
//       });

//       if (res.data?.success === true) {
//         setProducts(res.data.data || []);

//         if (isSearching) {
//           // Search mode — no pagination
//           const count = (res.data.data || []).length;
//           setTotalCount(count);
//           setTotalPages(1);
//         } else {
//           const count =
//             res.data.totalCount ??
//             res.data.total ??
//             res.data.count ??
//             (res.data.data ? res.data.data.length : 0);
//           const pages =
//             res.data.totalPages ??
//             res.data.pages ??
//             Math.max(1, Math.ceil((count || 0) / limit));
//           setTotalCount(count);
//           setTotalPages(pages);
//         }
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to load products");
//         setProducts([]);
//       }
//     } catch (error: any) {
//       console.error("Fetch products error:", error);
//       if (error.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(error.response?.data?.message || "Failed to load products");
//       }
//       setProducts([]);
//     } finally {
//       setListLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(
//       () => {
//         fetchProducts();
//       },
//       search ? 400 : 0
//     );
//     return () => clearTimeout(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, limit, appliedFrom, appliedTo, search]);

//   // ===================== FORM HANDLERS =====================
//   const resetForm = () => {
//     setItemName("");
//     setMrp("");
//     setRate("");
//     setUnit("");
//     setEditingId(null);
//   };

//   const openCreateModal = () => {
//     resetForm();
//     setFormOpen(true);
//   };

//   const openEditModal = (p: Product) => {
//     setEditingId(p._id);
//     setItemName(p.itemName || "");
//     setMrp(typeof p.mrp === "number" ? p.mrp : "");
//     setRate(typeof p.rate === "number" ? p.rate : "");
//     setUnit(p.unit || "");
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
//   const handleSave = async () => {
//     if (!itemName.trim()) {
//       toast.error("Item name is required");
//       return;
//     }
//     if (mrp === "" || Number(mrp) < 0) {
//       toast.error("Please enter a valid MRP");
//       return;
//     }
//     if (rate === "" || Number(rate) < 0) {
//       toast.error("Please enter a valid Rate");
//       return;
//     }
//     if (!unit.trim()) {
//       toast.error("Unit is required");
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         itemName: itemName.trim(),
//         mrp: Number(mrp),
//         rate: Number(rate),
//         unit: unit.trim(),
//       };

//       if (editingId) {
//         // UPDATE
//         const res = await axios.put(
//           `${API_URL}/product/${editingId}`,
//           payload,
//           getAuthHeaders()
//         );
//         if (res.data?.success === true) {
//           toast.success("Product updated successfully! 🎉");
//           closeFormModal();
//           fetchProducts();
//         } else if (res.data?.message === "Unauthorized") {
//           toast.error("Session expired! Please login again");
//           localStorage.removeItem("erptoken");
//           setTimeout(() => navigate("/login"), 1500);
//         } else {
//           toast.error(
//             res.data?.errors?.[0] ||
//               res.data?.message ||
//               "Failed to update product"
//           );
//         }
//       } else {
//         // CREATE
//         const res = await axios.post(
//           `${API_URL}/product`,
//           payload,
//           getAuthHeaders()
//         );
//         if (res.data?.success === true) {
//           toast.success("Product added successfully! 🎉");
//           closeFormModal();
//           setPage(1);
//           fetchProducts();
//         } else if (res.data?.message === "Unauthorized") {
//           toast.error("Session expired! Please login again");
//           localStorage.removeItem("erptoken");
//           setTimeout(() => navigate("/login"), 1500);
//         } else {
//           toast.error(
//             res.data?.errors?.[0] ||
//               res.data?.message ||
//               "Failed to add product"
//           );
//         }
//       }
//     } catch (error: any) {
//       console.error("Save product error:", error);
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
//             "Failed to save product"
//         );
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ===================== DELETE =====================
//   const handleDelete = async () => {
//     if (!deleteId) return;

//     try {
//       setDeleting(true);

//       const res = await axios.delete(
//         `${API_URL}/product/${deleteId}`,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success("Product deleted successfully");
//         setDeleteId(null);
//         if (products.length === 1 && page > 1) {
//           setPage((p) => p - 1);
//         } else {
//           fetchProducts();
//         }
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to delete product");
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

//   const isSearching = search.trim().length > 0;

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
//                     borderColor: "#c084fc",
//                     color: "#c084fc",
//                     bgcolor: "rgba(192, 132, 252, 0.08)",
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
//                     bgcolor: "#2e1065",
//                     color: "#c084fc",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Inventory2 />
//                 </Box>
//                 <Box>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: "#c084fc",
//                       letterSpacing: 0.5,
//                       fontSize: "0.7rem",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Product Management
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="800"
//                     sx={{
//                       fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
//                       letterSpacing: 0.5,
//                     }}
//                   >
//                     ALL PRODUCTS
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
//               {/* PRODUCT ENTRY BUTTON — Refresh ke LEFT */}
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={openCreateModal}
//                 sx={{
//                   bgcolor: "#8b5cf6",
//                   color: "#ffffff",
//                   fontWeight: 800,
//                   textTransform: "none",
//                   letterSpacing: 0.3,
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   fontSize: "0.8rem",
//                   boxShadow: "0 4px 14px rgba(139, 92, 246, 0.35)",
//                   "&:hover": {
//                     bgcolor: "#7c3aed",
//                     boxShadow: "0 8px 20px rgba(139, 92, 246, 0.5)",
//                   },
//                 }}
//               >
//                 Add Product
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={<RefreshIcon />}
//                 onClick={fetchProducts}
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
//                     borderColor: "#c084fc",
//                     color: "#c084fc",
//                     bgcolor: "rgba(192, 132, 252, 0.08)",
//                   },
//                 }}
//               >
//                 Refresh
//               </Button>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* ================= FILTER BAR (Search + Date) ================= */}
//         <FilterBar>
//           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
//             {/* Search */}
//             <Box sx={{ flex: 1, minWidth: 240 }}>
//               <StyledTextField
//                 fullWidth
//                 placeholder="Search by item name or unit..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <Box
//                       component="span"
//                       sx={{ mr: 1, display: "flex", alignItems: "center" }}
//                     >
//                       <Search sx={{ color: "#6b7280", fontSize: 18 }} />
//                     </Box>
//                   ),
//                 }}
//               />
//             </Box>

//             {/* Date Filter */}
//             <Box display="flex" alignItems="center" gap={0.8}>
//               <FilterIcon sx={{ color: "#c084fc", fontSize: 18 }} />
//               <Typography
//                 sx={{
//                   color: "#c084fc",
//                   fontWeight: 800,
//                   fontSize: "0.72rem",
//                   letterSpacing: 1,
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Date
//               </Typography>
//             </Box>

//             <StyledTextField
//               type="date"
//               size="small"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               sx={{ width: 150 }}
//             />
//             <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
//               to
//             </Typography>
//             <StyledTextField
//               type="date"
//               size="small"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               sx={{ width: 150 }}
//             />

//             <Button
//               size="small"
//               variant="contained"
//               onClick={handleApplyDateFilter}
//               sx={{
//                 bgcolor: "#8b5cf6",
//                 color: "#fff",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "8px",
//                 px: 2,
//                 fontSize: "0.75rem",
//                 "&:hover": { bgcolor: "#7c3aed" },
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

//             {/* Quick presets */}
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
//                       bgcolor: "rgba(192, 132, 252, 0.15)",
//                       borderColor: "rgba(192, 132, 252, 0.4)",
//                       color: "#c084fc",
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
//                   bgcolor: "rgba(192, 132, 252, 0.15)",
//                   color: "#c084fc",
//                   border: "1px solid rgba(192, 132, 252, 0.4)",
//                   fontWeight: 700,
//                   fontSize: "0.7rem",
//                   height: "26px",
//                 }}
//               />
//             )}
//           </Box>
//         </FilterBar>

//         {/* ================= TABLE ================= */}
//         <TableContainerDark>
//           {/* Table Header (fixed) */}
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
//               PRODUCT LIST
//             </Typography>
//             <Chip
//               label={`${totalCount} Products`}
//               size="small"
//               sx={{
//                 bgcolor: "rgba(192, 132, 252, 0.1)",
//                 color: "#c084fc",
//                 border: "1px solid rgba(192, 132, 252, 0.3)",
//                 fontWeight: 700,
//                 fontSize: "0.7rem",
//                 height: "26px",
//               }}
//             />
//           </Box>

//           {/* Scroll Area */}
//           <TableScrollArea>
//             <ItemsTable>
//               <thead>
//                 <tr>
//                   <th style={{ textAlign: "center", width: "50px" }}>#</th>
//                   <th>Item Name</th>
//                   <th style={{ textAlign: "center" }}>MRP (₹)</th>
//                   <th style={{ textAlign: "center" }}>Rate (₹)</th>
//                   <th style={{ textAlign: "center" }}>Unit</th>
//                   <th style={{ textAlign: "center", width: "110px" }}>
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {listLoading ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       style={{ textAlign: "center", padding: "40px 12px" }}
//                     >
//                       <CircularProgress sx={{ color: "#c084fc" }} size={32} />
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
//                       >
//                         Loading products...
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : products.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       style={{ textAlign: "center", padding: "40px 12px" }}
//                     >
//                       <Inventory2
//                         style={{
//                           fontSize: 44,
//                           color: "#374151",
//                           marginBottom: 8,
//                         }}
//                       />
//                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
//                         No products found
//                       </Typography>
//                       <Typography
//                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
//                       >
//                         {isSearching
//                           ? "Try a different search"
//                           : hasDateFilter
//                           ? "Try changing the date filter"
//                           : "Click 'Add Product' to create one"}
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   products.map((p, idx) => (
//                     <tr key={p._id}>
//                       <td style={{ textAlign: "center", color: "#6b7280" }}>
//                         {isSearching ? idx + 1 : (page - 1) * limit + idx + 1}
//                       </td>
//                       <td>
//                         <Typography
//                           sx={{
//                             color: "#ffffff",
//                             fontWeight: 700,
//                             fontSize: "0.85rem",
//                           }}
//                         >
//                           {p.itemName}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <Chip
//                           label={`₹ ${p.mrp}`}
//                           size="small"
//                           sx={{
//                             bgcolor: "rgba(156, 163, 175, 0.1)",
//                             color: "#e5e7eb",
//                             border: "1px solid rgba(156, 163, 175, 0.2)",
//                             fontSize: "0.7rem",
//                             fontWeight: 700,
//                             height: "24px",
//                           }}
//                         />
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <Typography
//                           sx={{
//                             color: "#fbbf24",
//                             fontWeight: 800,
//                             fontSize: "0.9rem",
//                           }}
//                         >
//                           ₹ {p.rate}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <Chip
//                           label={p.unit}
//                           size="small"
//                           sx={{
//                             bgcolor: "rgba(56, 189, 248, 0.1)",
//                             color: "#38bdf8",
//                             border: "1px solid rgba(56, 189, 248, 0.3)",
//                             fontSize: "0.7rem",
//                             fontWeight: 700,
//                             height: "24px",
//                           }}
//                         />
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <IconButton
//                           size="small"
//                           onClick={() => openEditModal(p)}
//                           sx={{
//                             color: "#38bdf8",
//                             "&:hover": {
//                               bgcolor: "rgba(56, 189, 248, 0.1)",
//                             },
//                           }}
//                         >
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           onClick={() => setDeleteId(p._id)}
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

//           {/* Pagination (hidden during search) */}
//           {!isSearching && (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 gap: 1.5,
//                 px: 3,
//                 py: 1.8,
//                 borderTop: "1px solid rgba(255, 255, 255, 0.08)",
//                 flexShrink: 0,
//               }}
//             >
//               <Box display="flex" alignItems="center" gap={1.5}>
//                 <Typography
//                   sx={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600 }}
//                 >
//                   Rows per page:
//                 </Typography>
//                 {[10, 25, 50, 100].map((n) => (
//                   <Chip
//                     key={n}
//                     label={n}
//                     size="small"
//                     onClick={() => {
//                       setLimit(n);
//                       setPage(1);
//                     }}
//                     sx={{
//                       bgcolor:
//                         limit === n
//                           ? "rgba(192, 132, 252, 0.2)"
//                           : "rgba(255, 255, 255, 0.05)",
//                       color: limit === n ? "#c084fc" : "#9ca3af",
//                       border:
//                         limit === n
//                           ? "1px solid rgba(192, 132, 252, 0.5)"
//                           : "1px solid rgba(255, 255, 255, 0.1)",
//                       fontWeight: 700,
//                       fontSize: "0.7rem",
//                       height: "26px",
//                       cursor: "pointer",
//                     }}
//                   />
//                 ))}
//                 <Typography
//                   sx={{ color: "#6b7280", fontSize: "0.75rem", ml: 1 }}
//                 >
//                   {totalCount > 0
//                     ? `${(page - 1) * limit + 1}–${Math.min(
//                         page * limit,
//                         totalCount
//                       )} of ${totalCount}`
//                     : "0 records"}
//                 </Typography>
//               </Box>

//               <Pagination
//                 count={Math.max(1, totalPages)}
//                 page={page}
//                 onChange={(_, v) => setPage(v)}
//                 disabled={listLoading}
//                 shape="rounded"
//                 size="small"
//                 sx={{
//                   "& .MuiPaginationItem-root": {
//                     color: "#9ca3af",
//                     borderColor: "rgba(255, 255, 255, 0.1)",
//                     fontWeight: 700,
//                     fontSize: "0.8rem",
//                     "&:hover": {
//                       bgcolor: "rgba(192, 132, 252, 0.1)",
//                       color: "#c084fc",
//                     },
//                   },
//                   "& .Mui-selected": {
//                     bgcolor: "rgba(192, 132, 252, 0.2) !important",
//                     color: "#c084fc !important",
//                     borderColor: "rgba(192, 132, 252, 0.5) !important",
//                   },
//                 }}
//               />
//             </Box>
//           )}

//           {isSearching && (
//             <Box
//               sx={{
//                 px: 3,
//                 py: 1.8,
//                 borderTop: "1px solid rgba(255, 255, 255, 0.08)",
//                 flexShrink: 0,
//               }}
//             >
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.75rem", textAlign: "center" }}
//               >
//                 Showing {products.length} search result
//                 {products.length !== 1 ? "s" : ""} for "{search}"
//               </Typography>
//             </Box>
//           )}
//         </TableContainerDark>
//       </Box>



//     {/* ================= FLOATING DASHBOARD BUTTON ================= */}
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

//       {/* ================= CREATE / UPDATE MODAL ================= */}
//       <Dialog
//         open={formOpen}
//         onClose={closeFormModal}
//         maxWidth="sm"
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
//                 bgcolor: "#2e1065",
//                 color: "#c084fc",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <LockIcon sx={{ fontSize: 18 }} />
//             </Box>
//             <Typography
//               sx={{
//                 color: "#c084fc",
//                 fontWeight: 800,
//                 fontSize: "0.9rem",
//                 letterSpacing: 1,
//                 textTransform: "uppercase",
//               }}
//             >
//               {editingId ? "Update Product" : "Add New Product"}
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
//             {/* ITEM NAME */}
//             <Grid size={{ xs: 12 }}>
//               <FieldLabel>
//                 Item Name <span style={{ color: "#f43f5e" }}>*</span>
//               </FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="e.g. Noodles Plain"
//                 value={itemName}
//                 onChange={(e) => setItemName(e.target.value)}
//               />
//             </Grid>

//             {/* MRP */}
//             <Grid size={{ xs: 6 }}>
//               <FieldLabel>
//                 MRP (₹) <span style={{ color: "#f43f5e" }}>*</span>
//               </FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="number"
//                 placeholder="5"
//                 value={mrp}
//                 onChange={(e) =>
//                   setMrp(e.target.value === "" ? "" : Number(e.target.value))
//                 }
//                 inputProps={{ min: 0, step: "0.01" }}
//               />
//             </Grid>

//             {/* RATE */}
//             <Grid size={{ xs: 6 }}>
//               <FieldLabel>
//                 Rate (₹) <span style={{ color: "#f43f5e" }}>*</span>
//               </FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="number"
//                 placeholder="4.5"
//                 value={rate}
//                 onChange={(e) =>
//                   setRate(e.target.value === "" ? "" : Number(e.target.value))
//                 }
//                 inputProps={{ min: 0, step: "0.01" }}
//               />
//             </Grid>

//             {/* UNIT */}
//             <Grid size={{ xs: 12 }}>
//               <FieldLabel>
//                 Unit <span style={{ color: "#f43f5e" }}>*</span>
//               </FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="e.g. pcs, kg, box"
//                 value={unit}
//                 onChange={(e) => setUnit(e.target.value)}
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
//               ) : editingId ? (
//                 <SaveIcon />
//               ) : (
//                 <AddIcon />
//               )
//             }
//             onClick={handleSave}
//             disabled={saving}
//             sx={{
//               bgcolor: "#8b5cf6",
//               color: "#ffffff",
//               fontWeight: 800,
//               textTransform: "uppercase",
//               letterSpacing: 0.5,
//               borderRadius: "10px",
//               px: 3,
//               py: 1.1,
//               fontSize: "0.8rem",
//               boxShadow: "0 4px 14px rgba(139, 92, 246, 0.3)",
//               "&:hover": {
//                 bgcolor: "#7c3aed",
//                 boxShadow: "0 8px 20px rgba(139, 92, 246, 0.4)",
//               },
//               "&.Mui-disabled": {
//                 bgcolor: "rgba(139, 92, 246, 0.3)",
//                 color: "rgba(255, 255, 255, 0.5)",
//               },
//             }}
//           >
//             {saving
//               ? editingId
//                 ? "Updating..."
//                 : "Adding..."
//               : editingId
//               ? "Update Product"
//               : "Add Product"}
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
//           Delete Product?
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             Are you sure you want to delete this product? This action cannot be
//             undone.
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
//     </Box>
//   );
// };

// export default ProductManagement;



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
import { styled, useTheme } from "@mui/material/styles";
import {
  ArrowBack,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search,
  Inventory2,
  Refresh as RefreshIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Lock as LockIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

// ===================== TYPES =====================
interface Product {
  _id: string;
  itemName: string;
  mrp: number;
  rate: number;
  unit: string;
  createdAt?: string;
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: isDark(theme) ? "#090d16" : "#f8fafc",
    color: isDark(theme) ? "#ffffff" : "#0f172a",
    height: "42px",
    "& fieldset": {
      borderColor: isDark(theme)
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(15, 23, 42, 0.1)",
    },
    "&:hover fieldset": { borderColor: "rgba(192, 132, 252, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#8b5cf6",
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
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&[type=number]": { MozAppearance: "textfield" },
  },
  "& input[type='date']::-webkit-calendar-picker-indicator": {
    filter: isDark(theme) ? "invert(0.7)" : "none",
    cursor: "pointer",
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
  boxShadow: isDark(theme)
    ? "0 8px 20px rgba(0, 0, 0, 0.4)"
    : "0 4px 14px rgba(15, 23, 42, 0.05)",
  overflow: "hidden",
  marginBottom: "16px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
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
    backgroundColor: "rgba(192, 132, 252, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(192, 132, 252, 0.5)" },
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
      padding: "16px 12px",
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
    "& tbody tr:hover": { backgroundColor: "rgba(192, 132, 252, 0.04)" },
    "& tbody td": {
      color: dark ? "#e5e7eb" : "#334155",
      fontSize: "0.85rem",
      padding: "14px 12px",
      textAlign: "left",
    },
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

// ===================== MAIN =====================
const ProductManagement: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dark = isDark(theme);

  // 👇 inline sx color map
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
    border10: dark
      ? "rgba(255, 255, 255, 0.10)"
      : "rgba(15, 23, 42, 0.10)",
    border15: dark
      ? "rgba(255, 255, 255, 0.15)"
      : "rgba(15, 23, 42, 0.15)",
    purpleIconBg: dark ? "#2e1065" : "#f3e8ff",
    purpleText: dark ? "#c084fc" : "#7e22ce",
    purpleTextSoft: dark ? "#c084fc" : "#8b5cf6",
    chipBgSoft: dark
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(15, 23, 42, 0.04)",
  };

  // List state
  const [products, setProducts] = useState<Product[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Search
  const [search, setSearch] = useState("");

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
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [itemName, setItemName] = useState("");
  const [mrp, setMrp] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [unit, setUnit] = useState("");

  // Delete
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ===================== FETCH =====================
  const fetchProducts = async () => {
    try {
      setListLoading(true);

      const isSearchingNow = search.trim().length > 0;
      const params: any = { page, limit };
      if (appliedFrom) params.fromDate = appliedFrom;
      if (appliedTo) params.toDate = appliedTo;
      if (isSearchingNow) params.query = search.trim();

      const endpoint = isSearchingNow
        ? `${API_URL}/product/search`
        : `${API_URL}/product`;

      const res = await axios.get(endpoint, {
        params: isSearchingNow
          ? { query: search.trim(), limit: 200 }
          : params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setProducts(res.data.data || []);

        if (isSearchingNow) {
          const count = (res.data.data || []).length;
          setTotalCount(count);
          setTotalPages(1);
        } else {
          const count =
            res.data.totalCount ??
            res.data.total ??
            res.data.count ??
            (res.data.data ? res.data.data.length : 0);
          const pages =
            res.data.totalPages ??
            res.data.pages ??
            Math.max(1, Math.ceil((count || 0) / limit));
          setTotalCount(count);
          setTotalPages(pages);
        }
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load products");
        setProducts([]);
      }
    } catch (error: any) {
      console.error("Fetch products error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load products");
      }
      setProducts([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(
      () => {
        fetchProducts();
      },
      search ? 400 : 0
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, appliedFrom, appliedTo, search]);

  // ===================== FORM HANDLERS =====================
  const resetForm = () => {
    setItemName("");
    setMrp("");
    setRate("");
    setUnit("");
    setEditingId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingId(p._id);
    setItemName(p.itemName || "");
    setMrp(typeof p.mrp === "number" ? p.mrp : "");
    setRate(typeof p.rate === "number" ? p.rate : "");
    setUnit(p.unit || "");
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
  const handleSave = async () => {
    if (!itemName.trim()) {
      toast.error("Item name is required");
      return;
    }
    if (mrp === "" || Number(mrp) < 0) {
      toast.error("Please enter a valid MRP");
      return;
    }
    if (rate === "" || Number(rate) < 0) {
      toast.error("Please enter a valid Rate");
      return;
    }
    if (!unit.trim()) {
      toast.error("Unit is required");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        itemName: itemName.trim(),
        mrp: Number(mrp),
        rate: Number(rate),
        unit: unit.trim(),
      };

      if (editingId) {
        const res = await axios.put(
          `${API_URL}/product/${editingId}`,
          payload,
          getAuthHeaders()
        );
        if (res.data?.success === true) {
          toast.success("Product updated successfully! 🎉");
          closeFormModal();
          fetchProducts();
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(
            res.data?.errors?.[0] ||
              res.data?.message ||
              "Failed to update product"
          );
        }
      } else {
        const res = await axios.post(
          `${API_URL}/product`,
          payload,
          getAuthHeaders()
        );
        if (res.data?.success === true) {
          toast.success("Product added successfully! 🎉");
          closeFormModal();
          setPage(1);
          fetchProducts();
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(
            res.data?.errors?.[0] ||
              res.data?.message ||
              "Failed to add product"
          );
        }
      }
    } catch (error: any) {
      console.error("Save product error:", error);
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
            "Failed to save product"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ===================== DELETE =====================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const res = await axios.delete(
        `${API_URL}/product/${deleteId}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Product deleted successfully");
        setDeleteId(null);
        if (products.length === 1 && page > 1) {
          setPage((p) => p - 1);
        } else {
          fetchProducts();
        }
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to delete product");
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

  const isSearching = search.trim().length > 0;

  // ===================== RENDER =====================
  return (
    <Box
      sx={{
        height: "85vh",
        maxHeight: "100vh",
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
                  color: c.textSec,
                  borderColor: c.border15,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.9,
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#8b5cf6",
                    color: "#8b5cf6",
                    bgcolor: "rgba(192, 132, 252, 0.08)",
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
                    bgcolor: c.purpleIconBg,
                    color: c.purpleText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Inventory2 />
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: c.purpleText,
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    Product Management
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                      letterSpacing: 0.5,
                      color: c.text,
                    }}
                  >
                    ALL PRODUCTS
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openCreateModal}
                sx={{
                  bgcolor: "#8b5cf6",
                  color: "#ffffff",
                  fontWeight: 800,
                  textTransform: "none",
                  letterSpacing: 0.3,
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.8rem",
                  boxShadow: "0 4px 14px rgba(139, 92, 246, 0.35)",
                  "&:hover": {
                    bgcolor: "#7c3aed",
                    boxShadow: "0 8px 20px rgba(139, 92, 246, 0.5)",
                  },
                }}
              >
                Add Product
              </Button>

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchProducts}
                disabled={listLoading}
                sx={{
                  color: c.textSec,
                  borderColor: c.border15,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#8b5cf6",
                    color: "#8b5cf6",
                    bgcolor: "rgba(192, 132, 252, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= FILTER BAR ================= */}
        <FilterBar>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
            {/* Search */}
            <Box sx={{ flex: 1, minWidth: 240 }}>
              <StyledTextField
                fullWidth
                placeholder="Search by item name or unit..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                InputProps={{
                  startAdornment: (
                    <Box
                      component="span"
                      sx={{ mr: 1, display: "flex", alignItems: "center" }}
                    >
                      <Search sx={{ color: c.mutedDark, fontSize: 18 }} />
                    </Box>
                  ),
                }}
              />
            </Box>

            {/* Date Filter */}
            <Box display="flex" alignItems="center" gap={0.8}>
              <FilterIcon sx={{ color: c.purpleText, fontSize: 18 }} />
              <Typography
                sx={{
                  color: c.purpleText,
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Date
              </Typography>
            </Box>

            <StyledTextField
              type="date"
              size="small"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              sx={{ width: 150 }}
            />
            <Typography sx={{ color: c.mutedDark, fontSize: "0.8rem" }}>
              to
            </Typography>
            <StyledTextField
              type="date"
              size="small"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              sx={{ width: 150 }}
            />

            <Button
              size="small"
              variant="contained"
              onClick={handleApplyDateFilter}
              sx={{
                bgcolor: "#8b5cf6",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                fontSize: "0.75rem",
                "&:hover": { bgcolor: "#7c3aed" },
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
                color: c.muted,
                borderColor: c.border15,
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

            {/* Quick presets */}
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
                    bgcolor: c.chipBgSoft,
                    color: c.textSec,
                    border: `1px solid ${c.border10}`,
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    height: "26px",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "rgba(192, 132, 252, 0.15)",
                      borderColor: "rgba(192, 132, 252, 0.4)",
                      color: c.purpleText,
                    },
                  }}
                />
              ))}
            </Box>

            {hasDateFilter && (
              <Chip
                label={`Active: ${appliedFrom || "..."} → ${
                  appliedTo || "..."
                }`}
                size="small"
                sx={{
                  bgcolor: "rgba(192, 132, 252, 0.15)",
                  color: c.purpleText,
                  border: "1px solid rgba(192, 132, 252, 0.4)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "26px",
                }}
              />
            )}
          </Box>
        </FilterBar>

        {/* ================= TABLE ================= */}
        <TableContainerDark>
          {/* Table Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={2}
            sx={{
              borderBottom: `1px solid ${c.border08}`,
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                color: c.text,
                fontWeight: 800,
                fontSize: "0.95rem",
                letterSpacing: 0.5,
              }}
            >
              PRODUCT LIST
            </Typography>
            <Chip
              label={`${totalCount} Products`}
              size="small"
              sx={{
                bgcolor: "rgba(192, 132, 252, 0.1)",
                color: c.purpleText,
                border: "1px solid rgba(192, 132, 252, 0.3)",
                fontWeight: 700,
                fontSize: "0.7rem",
                height: "26px",
              }}
            />
          </Box>

          {/* Scroll Area */}
          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th>Item Name</th>
                  <th style={{ textAlign: "center" }}>MRP (₹)</th>
                  <th style={{ textAlign: "center" }}>Rate (₹)</th>
                  <th style={{ textAlign: "center" }}>Unit</th>
                  <th style={{ textAlign: "center", width: "110px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {listLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <CircularProgress sx={{ color: "#8b5cf6" }} size={32} />
                      <Typography
                        sx={{ color: c.muted, fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading products...
                      </Typography>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <Inventory2
                        style={{
                          fontSize: 44,
                          color: c.veryMuted,
                          marginBottom: 8,
                        }}
                      />
                      <Typography sx={{ color: c.muted, fontSize: "0.9rem" }}>
                        No products found
                      </Typography>
                      <Typography
                        sx={{
                          color: c.mutedDark,
                          fontSize: "0.75rem",
                          mt: 0.5,
                        }}
                      >
                        {isSearching
                          ? "Try a different search"
                          : hasDateFilter
                          ? "Try changing the date filter"
                          : "Click 'Add Product' to create one"}
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  products.map((p, idx) => (
                    <tr key={p._id}>
                      <td style={{ textAlign: "center", color: c.mutedDark }}>
                        {isSearching ? idx + 1 : (page - 1) * limit + idx + 1}
                      </td>
                      <td>
                        <Typography
                          sx={{
                            color: c.text,
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {p.itemName}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Chip
                          label={`₹ ${p.mrp}`}
                          size="small"
                          sx={{
                            bgcolor: c.chipBgSoft,
                            color: c.textSec,
                            border: `1px solid ${c.border10}`,
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            height: "24px",
                          }}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Typography
                          sx={{
                            color: dark ? "#fbbf24" : "#d97706",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                          }}
                        >
                          ₹ {p.rate}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Chip
                          label={p.unit}
                          size="small"
                          sx={{
                            bgcolor: "rgba(56, 189, 248, 0.1)",
                            color: dark ? "#38bdf8" : "#0284c7",
                            border: "1px solid rgba(56, 189, 248, 0.3)",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            height: "24px",
                          }}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => openEditModal(p)}
                          sx={{
                            color: dark ? "#38bdf8" : "#0284c7",
                            "&:hover": {
                              bgcolor: "rgba(56, 189, 248, 0.1)",
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => setDeleteId(p._id)}
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

          {/* Pagination (hidden during search) */}
          {!isSearching && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1.5,
                px: 3,
                py: 1.8,
                borderTop: `1px solid ${c.border08}`,
                flexShrink: 0,
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5}>
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
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
                          ? "rgba(192, 132, 252, 0.2)"
                          : c.chipBgSoft,
                      color: limit === n ? c.purpleText : c.muted,
                      border:
                        limit === n
                          ? "1px solid rgba(192, 132, 252, 0.5)"
                          : `1px solid ${c.border10}`,
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      height: "26px",
                      cursor: "pointer",
                    }}
                  />
                ))}
                <Typography
                  sx={{ color: c.mutedDark, fontSize: "0.75rem", ml: 1 }}
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
                    borderColor: c.border10,
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    "&:hover": {
                      bgcolor: "rgba(192, 132, 252, 0.1)",
                      color: c.purpleText,
                    },
                  },
                  "& .Mui-selected": {
                    bgcolor: "rgba(192, 132, 252, 0.2) !important",
                    color: `${c.purpleText} !important`,
                    borderColor: "rgba(192, 132, 252, 0.5) !important",
                  },
                }}
              />
            </Box>
          )}

          {isSearching && (
            <Box
              sx={{
                px: 3,
                py: 1.8,
                borderTop: `1px solid ${c.border08}`,
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  color: c.mutedDark,
                  fontSize: "0.75rem",
                  textAlign: "center",
                }}
              >
                Showing {products.length} search result
                {products.length !== 1 ? "s" : ""} for "{search}"
              </Typography>
            </Box>
          )}
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

      {/* ================= CREATE / UPDATE MODAL ================= */}
      <Dialog
        open={formOpen}
        onClose={closeFormModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: c.bannerBg,
            borderRadius: "16px",
            border: `1px solid ${c.border08}`,
            backgroundImage: "none",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${c.border08}`,
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
                bgcolor: c.purpleIconBg,
                color: c.purpleText,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                color: c.purpleText,
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {editingId ? "Update Product" : "Add New Product"}
            </Typography>
            {editingId && (
              <Chip
                label="EDITING"
                size="small"
                sx={{
                  ml: 1,
                  bgcolor: "rgba(251, 191, 36, 0.15)",
                  color: dark ? "#fbbf24" : "#d97706",
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
              color: c.muted,
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
            <Grid size={{ xs: 12 }}>
              <FieldLabel>
                Item Name <span style={{ color: "#f43f5e" }}>*</span>
              </FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. Noodles Plain"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <FieldLabel>
                MRP (₹) <span style={{ color: "#f43f5e" }}>*</span>
              </FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="5"
                value={mrp}
                onChange={(e) =>
                  setMrp(e.target.value === "" ? "" : Number(e.target.value))
                }
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <FieldLabel>
                Rate (₹) <span style={{ color: "#f43f5e" }}>*</span>
              </FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="4.5"
                value={rate}
                onChange={(e) =>
                  setRate(e.target.value === "" ? "" : Number(e.target.value))
                }
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FieldLabel>
                Unit <span style={{ color: "#f43f5e" }}>*</span>
              </FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. pcs, kg, box"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
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
              "&:hover": {
                color: c.textSec,
                bgcolor: c.chipBgSoft,
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
              ) : editingId ? (
                <SaveIcon />
              ) : (
                <AddIcon />
              )
            }
            onClick={handleSave}
            disabled={saving}
            sx={{
              bgcolor: "#8b5cf6",
              color: "#ffffff",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              borderRadius: "10px",
              px: 3,
              py: 1.1,
              fontSize: "0.8rem",
              boxShadow: "0 4px 14px rgba(139, 92, 246, 0.3)",
              "&:hover": {
                bgcolor: "#7c3aed",
                boxShadow: "0 8px 20px rgba(139, 92, 246, 0.4)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(139, 92, 246, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {saving
              ? editingId
                ? "Updating..."
                : "Adding..."
              : editingId
              ? "Update Product"
              : "Add Product"}
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
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete Product?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: c.muted }}>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteId(null)}
            disabled={deleting}
            sx={{
              color: c.muted,
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
    </Box>
  );
};

export default ProductManagement;