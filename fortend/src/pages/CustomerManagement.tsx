// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import {
// //   Box,
// //   Button,
// //   Typography,
// //   Grid,
// //   TextField,
// //   Chip,
// //   IconButton,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogContentText,
// //   DialogActions,
// //   CircularProgress,
// //   Select,
// //   MenuItem,
// //   Pagination,
// // } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// // import {
// //   ArrowBack,
// //   Add as AddIcon,
// //   Delete as DeleteIcon,
// //   Edit as EditIcon,
// //   Search,
// //   Person,
// //   People,
// //   Save as SaveIcon,
// //   Refresh as RefreshIcon,
// //   Clear as ClearIcon,
// //   Close as CloseIcon,
// //   Lock as LockIcon,
// // } from "@mui/icons-material";

// // // ===================== TYPES =====================

// // interface Customer {
// //   _id: string;
// //   companyName: string;
// //   displayName?: string;
// //   phone: string;
// //   billingAddress?: string;
// //   status?: string;
// //   notes?: string;
// //   createdAt?: string;
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

// // const StyledTextField = styled(TextField)(() => ({
// //   "& .MuiOutlinedInput-root": {
// //     borderRadius: "10px",
// //     backgroundColor: "#090d16",
// //     color: "#ffffff",
// //     minHeight: "42px",
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
// //   },
// // }));

// // const StyledTextarea = styled("textarea")(() => ({
// //   width: "100%",
// //   minHeight: "80px",
// //   padding: "10px 12px",
// //   borderRadius: "10px",
// //   backgroundColor: "#090d16",
// //   border: "1px solid rgba(255, 255, 255, 0.1)",
// //   color: "#ffffff",
// //   fontSize: "0.85rem",
// //   fontFamily: "inherit",
// //   outline: "none",
// //   resize: "vertical",
// //   transition: "all 0.2s ease",
// //   "&:focus": {
// //     borderColor: "#38bdf8",
// //     boxShadow: "0 0 0 3px rgba(56, 189, 248, 0.1)",
// //   },
// //   "&::placeholder": { color: "#6b7280" },
// // }));

// // const StyledSelect = styled(Select)(() => ({
// //   borderRadius: "10px",
// //   backgroundColor: "#090d16",
// //   color: "#ffffff",
// //   minHeight: "42px",
// //   width: "100%",
// //   fontSize: "0.85rem",
// //   "& .MuiOutlinedInput-notchedOutline": {
// //     borderColor: "rgba(255, 255, 255, 0.1)",
// //   },
// //   "&:hover .MuiOutlinedInput-notchedOutline": {
// //     borderColor: "rgba(56, 189, 248, 0.4)",
// //   },
// //   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
// //     borderColor: "#38bdf8",
// //     borderWidth: "1.5px",
// //   },
// //   "& .MuiSvgIcon-root": { color: "#9ca3af" },
// // }));

// // const FieldLabel = styled(Typography)(() => ({
// //   color: "#9ca3af",
// //   fontWeight: 700,
// //   fontSize: "0.7rem",
// //   letterSpacing: 1,
// //   textTransform: "uppercase",
// //   marginBottom: "8px",
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
// //   "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
// //   "& tbody td": {
// //     color: "#e5e7eb",
// //     fontSize: "0.85rem",
// //     padding: "14px 12px",
// //     textAlign: "left",
// //   },
// // }));

// // // ===================== MAIN =====================

// // const CustomerManagement: React.FC = () => {
// //   const navigate = useNavigate();

// //   // List state
// //   const [customers, setCustomers] = useState<Customer[]>([]);
// //   const [listLoading, setListLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   // Search
// //   const [search, setSearch] = useState("");

// //   // Status filter
// //   const [statusFilter, setStatusFilter] = useState<string>("all");

// //   // Pagination
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(10);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [totalCount, setTotalCount] = useState(0);

// //   // Form modal
// //   const [formOpen, setFormOpen] = useState(false);
// //   const [editingId, setEditingId] = useState<string | null>(null);

// //   // Form state
// //   const [companyName, setCompanyName] = useState("");
// //   const [displayName, setDisplayName] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [billingAddress, setBillingAddress] = useState("");
// //   const [status, setStatus] = useState("active");
// //   const [notes, setNotes] = useState("");

// //   // Delete dialog
// //   const [deleteId, setDeleteId] = useState<string | null>(null);
// //   const [deleting, setDeleting] = useState(false);

// //   // ===================== FETCH =====================
// //   const fetchCustomers = async () => {
// //     try {
// //       setListLoading(true);

// //       const params: any = { page, limit };

// //       // Server-side search (name/company/phone)
// //       if (search.trim()) params.search = search.trim();

// //       // Status filter
// //       if (statusFilter !== "all") params.status = statusFilter;

// //       const res = await axios.get(`${API_URL}/customer`, {
// //         params,
// //         ...getAuthHeaders(),
// //       });

// //       if (res.data?.success === true) {
// //         setCustomers(res.data.data || []);

// //         const count = res.data.total ?? res.data.totalCount ?? 0;
// //         const pages =
// //           res.data.pages ??
// //           res.data.totalPages ??
// //           Math.max(1, Math.ceil((count || 0) / limit));

// //         setTotalCount(count);
// //         setTotalPages(pages);
// //       } else if (res.data?.message === "Unauthorized") {
// //         toast.error("Session expired! Please login again");
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(res.data?.message || "Failed to load customers");
// //         setCustomers([]);
// //       }
// //     } catch (error: any) {
// //       console.error("Fetch customers error:", error);
// //       if (error.response?.data?.message === "Unauthorized") {
// //         localStorage.removeItem("erptoken");
// //         navigate("/login");
// //       } else {
// //         toast.error(
// //           error.response?.data?.message || "Failed to load customers"
// //         );
// //       }
// //       setCustomers([]);
// //     } finally {
// //       setListLoading(false);
// //     }
// //   };

// //   // Debounced fetch on search / filters / pagination
// //   useEffect(() => {
// //     const timer = setTimeout(
// //       () => {
// //         fetchCustomers();
// //       },
// //       search ? 400 : 0
// //     );
// //     return () => clearTimeout(timer);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [page, limit, search, statusFilter]);

// //   // ===================== FORM HANDLERS =====================
// //   const resetForm = () => {
// //     setCompanyName("");
// //     setDisplayName("");
// //     setPhone("");
// //     setBillingAddress("");
// //     setStatus("active");
// //     setNotes("");
// //     setEditingId(null);
// //   };

// //   const openCreateModal = () => {
// //     resetForm();
// //     setFormOpen(true);
// //   };

// //   const openEditModal = (c: Customer) => {
// //     setEditingId(c._id);
// //     setCompanyName(c.companyName || "");
// //     setDisplayName(c.displayName || "");
// //     setPhone(c.phone || "");
// //     setBillingAddress(c.billingAddress || "");
// //     setStatus(c.status || "active");
// //     setNotes(c.notes || "");
// //     setFormOpen(true);
// //   };

// //   const closeFormModal = () => {
// //     if (saving) return;
// //     setFormOpen(false);
// //     resetForm();
// //   };

// //   // ===================== CLEAR FILTERS =====================
// //   const handleClearFilters = () => {
// //     setSearch("");
// //     setStatusFilter("all");
// //     setPage(1);
// //   };

// //   const hasFilter = search.trim().length > 0 || statusFilter !== "all";

// //   // ===================== CREATE / UPDATE =====================
// //   const handleSave = async () => {
// //     if (!companyName.trim()) {
// //       toast.error("Company name is required");
// //       return;
// //     }
// //     if (!phone.trim()) {
// //       toast.error("Phone number is required");
// //       return;
// //     }
// //     if (!/^\d{10}$/.test(phone.trim())) {
// //       toast.error("Phone must be a valid 10-digit number");
// //       return;
// //     }

// //     try {
// //       setSaving(true);

// //       // 🔥 Backend expects: name, displayName, mobile, address, status, notes
// //       const payload = {
// //         name: companyName.trim(),
// //         displayName: displayName.trim(),
// //         mobile: phone.trim(),
// //         address: billingAddress.trim(),
// //         status,
// //         notes: notes.trim(),
// //       };

// //       if (editingId) {
// //         // ---------- UPDATE ----------
// //         const res = await axios.put(
// //           `${API_URL}/customer/${editingId}`,
// //           payload,
// //           getAuthHeaders()
// //         );

// //         if (res.data?.success === true) {
// //           toast.success("Customer updated successfully! 🎉");
// //           closeFormModal();
// //           fetchCustomers();
// //         } else if (res.data?.message === "Unauthorized") {
// //           toast.error("Session expired! Please login again");
// //           localStorage.removeItem("erptoken");
// //           setTimeout(() => navigate("/login"), 1500);
// //         } else {
// //           toast.error(
// //             res.data?.errors?.[0] ||
// //               res.data?.message ||
// //               "Failed to update customer"
// //           );
// //         }
// //       } else {
// //         // ---------- CREATE ----------
// //         const res = await axios.post(
// //           `${API_URL}/customer`,
// //           payload,
// //           getAuthHeaders()
// //         );

// //         if (res.data?.success === true) {
// //           toast.success("Customer created successfully! 🎉");
// //           closeFormModal();
// //           setPage(1);
// //           fetchCustomers();
// //         } else if (res.data?.message === "Unauthorized") {
// //           toast.error("Session expired! Please login again");
// //           localStorage.removeItem("erptoken");
// //           setTimeout(() => navigate("/login"), 1500);
// //         } else {
// //           toast.error(
// //             res.data?.errors?.[0] ||
// //               res.data?.message ||
// //               "Failed to create customer"
// //           );
// //         }
// //       }
// //     } catch (error: any) {
// //       console.error("Save customer error:", error);
// //       if (!error.response) {
// //         toast.error("Network error! Please check your connection");
// //       } else if (error.response?.data?.message === "Unauthorized") {
// //         toast.error("Session expired! Please login again");
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(
// //           error.response?.data?.errors?.[0] ||
// //             error.response?.data?.message ||
// //             "Failed to save customer"
// //         );
// //       }
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   // ===================== DELETE =====================
// //   const handleDelete = async () => {
// //     if (!deleteId) return;

// //     try {
// //       setDeleting(true);

// //       const res = await axios.delete(
// //         `${API_URL}/customer/${deleteId}`,
// //         getAuthHeaders()
// //       );

// //       if (res.data?.success === true) {
// //         toast.success("Customer deleted successfully");
// //         setDeleteId(null);
// //         if (customers.length === 1 && page > 1) {
// //           setPage((p) => p - 1);
// //         } else {
// //           fetchCustomers();
// //         }
// //       } else if (res.data?.message === "Unauthorized") {
// //         toast.error("Session expired! Please login again");
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(res.data?.message || "Failed to delete customer");
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
// //                     borderColor: "#38bdf8",
// //                     color: "#38bdf8",
// //                     bgcolor: "rgba(56, 189, 248, 0.08)",
// //                   },
// //                 }}
// //               >
// //                 Dashboard
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
// //                   <People />
// //                 </Box>
// //                 <Typography
// //                   variant="h5"
// //                   fontWeight="800"
// //                   sx={{
// //                     fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
// //                     letterSpacing: 0.5,
// //                   }}
// //                 >
// //                   CUSTOMER MANAGEMENT
// //                 </Typography>
// //               </Box>
// //             </Box>

// //             <Box display="flex" gap={1.5} alignItems="center" flexWrap="wrap">
// //               <Button
// //                 variant="contained"
// //                 startIcon={<AddIcon />}
// //                 onClick={openCreateModal}
// //                 sx={{
// //                   bgcolor: "#10b981",
// //                   color: "#ffffff",
// //                   fontWeight: 800,
// //                   textTransform: "none",
// //                   letterSpacing: 0.3,
// //                   borderRadius: "10px",
// //                   px: 2.5,
// //                   py: 1,
// //                   fontSize: "0.8rem",
// //                   boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
// //                   "&:hover": {
// //                     bgcolor: "#059669",
// //                     boxShadow: "0 8px 20px rgba(16, 185, 129, 0.5)",
// //                   },
// //                 }}
// //               >
// //                 New Customer
// //               </Button>

// //               <Button
// //                 variant="outlined"
// //                 startIcon={<RefreshIcon />}
// //                 onClick={fetchCustomers}
// //                 disabled={listLoading}
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
// //             </Box>
// //           </Box>
// //         </DarkBanner>

// //         {/* ================= FILTER BAR ================= */}
// //         <FilterBar>
// //           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
// //             {/* Search */}
// //             <Box sx={{ flex: 1, minWidth: 240 }}>
// //               <StyledTextField
// //                 fullWidth
// //                 placeholder="Search by company name, phone..."
// //                 value={search}
// //                 onChange={(e) => {
// //                   setSearch(e.target.value);
// //                   setPage(1);
// //                 }}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <Box
// //                       component="span"
// //                       sx={{ mr: 1, display: "flex", alignItems: "center" }}
// //                     >
// //                       <Search sx={{ color: "#6b7280", fontSize: 18 }} />
// //                     </Box>
// //                   ),
// //                 }}
// //               />
// //             </Box>

// //             {/* Status filter */}
// //             <Box sx={{ minWidth: 160 }}>
// //               <StyledSelect
// //                 value={statusFilter}
// //                 onChange={(e) => {
// //                   setStatusFilter(e.target.value as string);
// //                   setPage(1);
// //                 }}
// //                 displayEmpty
// //                 size="small"
// //                 sx={{ height: 42, minHeight: 42 }}
// //                 MenuProps={{
// //                   PaperProps: {
// //                     sx: {
// //                       bgcolor: "#111827",
// //                       border: "1px solid rgba(255, 255, 255, 0.08)",
// //                       "& .MuiMenuItem-root": {
// //                         color: "#e5e7eb",
// //                         fontSize: "0.85rem",
// //                         "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
// //                         "&.Mui-selected": {
// //                           bgcolor: "rgba(56, 189, 248, 0.15)",
// //                           color: "#38bdf8",
// //                         },
// //                       },
// //                     },
// //                   },
// //                 }}
// //               >
// //                 <MenuItem value="all">All Status</MenuItem>
// //                 <MenuItem value="active">Active</MenuItem>
// //                 <MenuItem value="inactive">Inactive</MenuItem>
// //                 <MenuItem value="blocked">Blocked</MenuItem>
// //                 <MenuItem value="pending">Pending</MenuItem>
// //               </StyledSelect>
// //             </Box>

// //             {/* Clear filter */}
// //             <Button
// //               size="small"
// //               variant="outlined"
// //               startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
// //               onClick={handleClearFilters}
// //               disabled={!hasFilter}
// //               sx={{
// //                 color: "#9ca3af",
// //                 borderColor: "rgba(255, 255, 255, 0.15)",
// //                 fontWeight: 700,
// //                 textTransform: "none",
// //                 borderRadius: "8px",
// //                 px: 1.5,
// //                 height: 42,
// //                 fontSize: "0.75rem",
// //                 "&:hover": {
// //                   borderColor: "#f43f5e",
// //                   color: "#f43f5e",
// //                   bgcolor: "rgba(244, 63, 94, 0.08)",
// //                 },
// //                 "&.Mui-disabled": {
// //                   color: "rgba(156, 163, 175, 0.4)",
// //                   borderColor: "rgba(255, 255, 255, 0.05)",
// //                 },
// //               }}
// //             >
// //               Clear
// //             </Button>
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
// //               CUSTOMER LIST
// //             </Typography>
// //             <Chip
// //               label={`${totalCount} Customers`}
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
// //                   <th>Company Name</th>
// //                   <th>Display Name</th>
// //                   <th style={{ textAlign: "center" }}>Phone</th>
// //                   <th>Billing Address</th>
// //                   <th style={{ textAlign: "center" }}>Status</th>
// //                   <th style={{ textAlign: "center", width: "110px" }}>
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {listLoading ? (
// //                   <tr>
// //                     <td
// //                       colSpan={7}
// //                       style={{ textAlign: "center", padding: "40px 12px" }}
// //                     >
// //                       <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
// //                       <Typography
// //                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
// //                       >
// //                         Loading customers...
// //                       </Typography>
// //                     </td>
// //                   </tr>
// //                 ) : customers.length === 0 ? (
// //                   <tr>
// //                     <td
// //                       colSpan={7}
// //                       style={{ textAlign: "center", padding: "40px 12px" }}
// //                     >
// //                       <Person
// //                         style={{
// //                           fontSize: 44,
// //                           color: "#374151",
// //                           marginBottom: 8,
// //                         }}
// //                       />
// //                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
// //                         No customers found
// //                       </Typography>
// //                       <Typography
// //                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
// //                       >
// //                         {hasFilter
// //                           ? "Try changing the search or filter"
// //                           : "Click 'New Customer' to add one"}
// //                       </Typography>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   customers.map((c, idx) => (
// //                     <tr key={c._id}>
// //                       <td style={{ textAlign: "center", color: "#6b7280" }}>
// //                         {(page - 1) * limit + idx + 1}
// //                       </td>
// //                       <td>
// //                         <Typography
// //                           sx={{
// //                             color: "#ffffff",
// //                             fontWeight: 700,
// //                             fontSize: "0.85rem",
// //                           }}
// //                         >
// //                           {c.companyName}
// //                         </Typography>
// //                       </td>
// //                       <td>
// //                         <Typography
// //                           sx={{ color: "#9ca3af", fontSize: "0.85rem" }}
// //                         >
// //                           {c.displayName || "-"}
// //                         </Typography>
// //                       </td>
// //                       <td style={{ textAlign: "center" }}>
// //                         <Chip
// //                           label={c.phone}
// //                           size="small"
// //                           sx={{
// //                             bgcolor: "rgba(56, 189, 248, 0.1)",
// //                             color: "#38bdf8",
// //                             border: "1px solid rgba(56, 189, 248, 0.3)",
// //                             fontSize: "0.7rem",
// //                             fontWeight: 700,
// //                             height: "24px",
// //                           }}
// //                         />
// //                       </td>
// //                       <td>
// //                         <Typography
// //                           sx={{ color: "#9ca3af", fontSize: "0.85rem" }}
// //                         >
// //                           {c.billingAddress || "-"}
// //                         </Typography>
// //                       </td>
// //                       <td style={{ textAlign: "center" }}>
// //                         <Chip
// //                           label={c.status || "active"}
// //                           size="small"
// //                           sx={{
// //                             bgcolor:
// //                               c.status === "active"
// //                                 ? "rgba(52, 211, 153, 0.1)"
// //                                 : "rgba(156, 163, 175, 0.1)",
// //                             color:
// //                               c.status === "active" ? "#34d399" : "#9ca3af",
// //                             border:
// //                               c.status === "active"
// //                                 ? "1px solid rgba(52, 211, 153, 0.3)"
// //                                 : "1px solid rgba(156, 163, 175, 0.3)",
// //                             fontSize: "0.7rem",
// //                             fontWeight: 700,
// //                             height: "24px",
// //                             textTransform: "capitalize",
// //                           }}
// //                         />
// //                       </td>
// //                       <td style={{ textAlign: "center" }}>
// //                         <IconButton
// //                           size="small"
// //                           onClick={() => openEditModal(c)}
// //                           sx={{
// //                             color: "#38bdf8",
// //                             "&:hover": {
// //                               bgcolor: "rgba(56, 189, 248, 0.1)",
// //                             },
// //                           }}
// //                         >
// //                           <EditIcon fontSize="small" />
// //                         </IconButton>
// //                         <IconButton
// //                           size="small"
// //                           onClick={() => setDeleteId(c._id)}
// //                           sx={{
// //                             color: "#f43f5e",
// //                             "&:hover": {
// //                               bgcolor: "rgba(244, 63, 94, 0.1)",
// //                             },
// //                           }}
// //                         >
// //                           <DeleteIcon fontSize="small" />
// //                         </IconButton>
// //                       </td>
// //                     </tr>
// //                   ))
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
// //               py: 1.8,
// //               borderTop: "1px solid rgba(255, 255, 255, 0.08)",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <Box display="flex" alignItems="center" gap={1.5}>
// //               <Typography
// //                 sx={{
// //                   color: "#9ca3af",
// //                   fontSize: "0.75rem",
// //                   fontWeight: 600,
// //                 }}
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
// //               disabled={listLoading}
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

// //       {/* ================= CREATE / UPDATE MODAL ================= */}
// //       <Dialog
// //         open={formOpen}
// //         onClose={closeFormModal}
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
// //         <DialogTitle
// //           sx={{
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //             borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
// //             px: 3,
// //             py: 2,
// //           }}
// //         >
// //           <Box display="flex" alignItems="center" gap={1.5}>
// //             <Box
// //               sx={{
// //                 width: 32,
// //                 height: 32,
// //                 borderRadius: "8px",
// //                 bgcolor: "#0c2a3a",
// //                 color: "#38bdf8",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //               }}
// //             >
// //               <LockIcon sx={{ fontSize: 18 }} />
// //             </Box>
// //             <Typography
// //               sx={{
// //                 color: "#38bdf8",
// //                 fontWeight: 800,
// //                 fontSize: "0.9rem",
// //                 letterSpacing: 1,
// //                 textTransform: "uppercase",
// //               }}
// //             >
// //               {editingId ? "Update Customer" : "New Customer"}
// //             </Typography>
// //             {editingId && (
// //               <Chip
// //                 label="EDITING"
// //                 size="small"
// //                 sx={{
// //                   ml: 1,
// //                   bgcolor: "rgba(251, 191, 36, 0.15)",
// //                   color: "#fbbf24",
// //                   border: "1px solid rgba(251, 191, 36, 0.3)",
// //                   fontWeight: 700,
// //                   fontSize: "0.65rem",
// //                   height: "22px",
// //                 }}
// //               />
// //             )}
// //           </Box>
// //           <IconButton
// //             onClick={closeFormModal}
// //             disabled={saving}
// //             size="small"
// //             sx={{
// //               color: "#9ca3af",
// //               "&:hover": {
// //                 color: "#f43f5e",
// //                 bgcolor: "rgba(244, 63, 94, 0.1)",
// //               },
// //             }}
// //           >
// //             <CloseIcon />
// //           </IconButton>
// //         </DialogTitle>

// //         <DialogContent sx={{ p: 3 }}>
// //           <Grid container spacing={2}>
// //             {/* COMPANY NAME */}
// //             <Grid size={{ xs: 12, sm: 6 }}>
// //               <FieldLabel>
// //                 Company Name <span style={{ color: "#f43f5e" }}>*</span>
// //               </FieldLabel>
// //               <StyledTextField
// //                 fullWidth
// //                 placeholder="e.g. Gupta Traders"
// //                 value={companyName}
// //                 onChange={(e) => setCompanyName(e.target.value)}
// //               />
// //             </Grid>

// //             {/* DISPLAY NAME */}
// //             <Grid size={{ xs: 12, sm: 6 }}>
// //               <FieldLabel>Display Name</FieldLabel>
// //               <StyledTextField
// //                 fullWidth
// //                 placeholder="e.g. Gupta Ji"
// //                 value={displayName}
// //                 onChange={(e) => setDisplayName(e.target.value)}
// //               />
// //             </Grid>

// //             {/* PHONE */}
// //             <Grid size={{ xs: 12, sm: 6 }}>
// //               <FieldLabel>
// //                 Phone <span style={{ color: "#f43f5e" }}>*</span>
// //               </FieldLabel>
// //               <StyledTextField
// //                 fullWidth
// //                 placeholder="10-digit mobile"
// //                 value={phone}
// //                 onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
// //                 inputProps={{ maxLength: 10 }}
// //               />
// //             </Grid>

// //             {/* STATUS */}
// //             <Grid size={{ xs: 12, sm: 6 }}>
// //               <FieldLabel>Status</FieldLabel>
// //               <StyledSelect
// //                 value={status}
// //                 onChange={(e) => setStatus(e.target.value as string)}
// //                 MenuProps={{
// //                   PaperProps: {
// //                     sx: {
// //                       bgcolor: "#111827",
// //                       border: "1px solid rgba(255, 255, 255, 0.08)",
// //                       "& .MuiMenuItem-root": {
// //                         color: "#e5e7eb",
// //                         fontSize: "0.85rem",
// //                         "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
// //                         "&.Mui-selected": {
// //                           bgcolor: "rgba(56, 189, 248, 0.15)",
// //                           color: "#38bdf8",
// //                         },
// //                       },
// //                     },
// //                   },
// //                 }}
// //               >
// //                 <MenuItem value="active">Active</MenuItem>
// //                 <MenuItem value="inactive">Inactive</MenuItem>
// //                 <MenuItem value="blocked">Blocked</MenuItem>
// //                 <MenuItem value="pending">Pending</MenuItem>
// //               </StyledSelect>
// //             </Grid>

// //             {/* BILLING ADDRESS */}
// //             <Grid size={{ xs: 12 }}>
// //               <FieldLabel>Billing Address</FieldLabel>
// //               <StyledTextField
// //                 fullWidth
// //                 placeholder="e.g. Main Market, Delhi"
// //                 value={billingAddress}
// //                 onChange={(e) => setBillingAddress(e.target.value)}
// //               />
// //             </Grid>

// //             {/* NOTES */}
// //             <Grid size={{ xs: 12 }}>
// //               <FieldLabel>Notes</FieldLabel>
// //               <StyledTextarea
// //                 value={notes}
// //                 onChange={(e) => setNotes(e.target.value)}
// //                 placeholder="Any additional notes about the customer..."
// //                 maxLength={1000}
// //               />
// //               <Typography
// //                 sx={{
// //                   color: "#6b7280",
// //                   fontSize: "0.7rem",
// //                   mt: 0.5,
// //                   textAlign: "right",
// //                 }}
// //               >
// //                 {notes.length} / 1000
// //               </Typography>
// //             </Grid>
// //           </Grid>
// //         </DialogContent>

// //         <DialogActions
// //           sx={{
// //             px: 3,
// //             pb: 3,
// //             pt: 1,
// //             borderTop: "1px solid rgba(255, 255, 255, 0.08)",
// //             gap: 1,
// //           }}
// //         >
// //           <Button
// //             onClick={closeFormModal}
// //             disabled={saving}
// //             sx={{
// //               color: "#9ca3af",
// //               textTransform: "none",
// //               fontWeight: 700,
// //               borderRadius: "10px",
// //               px: 3,
// //               py: 1.1,
// //               "&:hover": {
// //                 color: "#e5e7eb",
// //                 bgcolor: "rgba(255, 255, 255, 0.05)",
// //               },
// //             }}
// //           >
// //             Cancel
// //           </Button>

// //           <Button
// //             variant="contained"
// //             startIcon={
// //               saving ? (
// //                 <CircularProgress size={16} sx={{ color: "#ffffff" }} />
// //               ) : editingId ? (
// //                 <SaveIcon />
// //               ) : (
// //                 <AddIcon />
// //               )
// //             }
// //             onClick={handleSave}
// //             disabled={saving}
// //             sx={{
// //               bgcolor: "#10b981",
// //               color: "#ffffff",
// //               fontWeight: 800,
// //               textTransform: "uppercase",
// //               letterSpacing: 0.5,
// //               borderRadius: "10px",
// //               px: 3,
// //               py: 1.1,
// //               fontSize: "0.8rem",
// //               boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
// //               "&:hover": {
// //                 bgcolor: "#059669",
// //                 boxShadow: "0 8px 20px rgba(16, 185, 129, 0.4)",
// //               },
// //               "&.Mui-disabled": {
// //                 bgcolor: "rgba(16, 185, 129, 0.3)",
// //                 color: "rgba(255, 255, 255, 0.5)",
// //               },
// //             }}
// //           >
// //             {saving
// //               ? editingId
// //                 ? "Updating..."
// //                 : "Creating..."
// //               : editingId
// //               ? "Update Customer"
// //               : "Create Customer"}
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
// //           Delete Customer?
// //         </DialogTitle>
// //         <DialogContent>
// //           <DialogContentText sx={{ color: "#9ca3af" }}>
// //             Are you sure you want to delete this customer? This action cannot be
// //             undone.
// //           </DialogContentText>
// //         </DialogContent>
// //         <DialogActions sx={{ px: 3, pb: 2.5 }}>
// //           <Button
// //             onClick={() => setDeleteId(null)}
// //             disabled={deleting}
// //             sx={{
// //               color: "#9ca3af",
// //               textTransform: "none",
// //               fontWeight: 600,
// //               borderRadius: "10px",
// //             }}
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
// //     </Box>
// //   );
// // };

// // export default CustomerManagement;




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
//   Select,
//   MenuItem,
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
//   Person,
//   People,
//   Save as SaveIcon,
//   Refresh as RefreshIcon,
//   Clear as ClearIcon,
//   Close as CloseIcon,
//   Lock as LockIcon,
//   Home as HomeIcon,
// } from "@mui/icons-material";

// // ===================== TYPES =====================

// interface Customer {
//   _id: string;
//   companyName: string;
//   displayName?: string;
//   phone: string;
//   billingAddress?: string;
//   status?: string;
//   notes?: string;
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
//     minHeight: "42px",
//     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
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
//   },
// }));

// const StyledTextarea = styled("textarea")(() => ({
//   width: "100%",
//   minHeight: "80px",
//   padding: "10px 12px",
//   borderRadius: "10px",
//   backgroundColor: "#090d16",
//   border: "1px solid rgba(255, 255, 255, 0.1)",
//   color: "#ffffff",
//   fontSize: "0.85rem",
//   fontFamily: "inherit",
//   outline: "none",
//   resize: "vertical",
//   transition: "all 0.2s ease",
//   "&:focus": {
//     borderColor: "#38bdf8",
//     boxShadow: "0 0 0 3px rgba(56, 189, 248, 0.1)",
//   },
//   "&::placeholder": { color: "#6b7280" },
// }));

// const StyledSelect = styled(Select)(() => ({
//   borderRadius: "10px",
//   backgroundColor: "#090d16",
//   color: "#ffffff",
//   minHeight: "42px",
//   width: "100%",
//   fontSize: "0.85rem",
//   "& .MuiOutlinedInput-notchedOutline": {
//     borderColor: "rgba(255, 255, 255, 0.1)",
//   },
//   "&:hover .MuiOutlinedInput-notchedOutline": {
//     borderColor: "rgba(56, 189, 248, 0.4)",
//   },
//   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#38bdf8",
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
//   "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "14px 12px",
//     textAlign: "left",
//   },
// }));

// // ===================== MAIN =====================

// const CustomerManagement: React.FC = () => {
//   const navigate = useNavigate();

//   // List state
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [listLoading, setListLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // Search
//   const [search, setSearch] = useState("");

//   // Status filter
//   const [statusFilter, setStatusFilter] = useState<string>("all");

//   // Pagination
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);

//   // Form modal
//   const [formOpen, setFormOpen] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   // Form state
//   const [companyName, setCompanyName] = useState("");
//   const [displayName, setDisplayName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [billingAddress, setBillingAddress] = useState("");
//   const [status, setStatus] = useState("active");
//   const [notes, setNotes] = useState("");

//   // Delete dialog
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   // Delete All dialog
//   const [deleteAllOpen, setDeleteAllOpen] = useState(false);
//   const [deleteAllLoading, setDeleteAllLoading] = useState(false);

//   // ===================== FETCH =====================
//   const fetchCustomers = async () => {
//     try {
//       setListLoading(true);

//       const params: any = { page, limit };
//       if (search.trim()) params.search = search.trim();
//       if (statusFilter !== "all") params.status = statusFilter;

//       const res = await axios.get(`${API_URL}/customer`, {
//         params,
//         ...getAuthHeaders(),
//       });

//       if (res.data?.success === true) {
//         setCustomers(res.data.data || []);

//         const count = res.data.total ?? res.data.totalCount ?? 0;
//         const pages =
//           res.data.pages ??
//           res.data.totalPages ??
//           Math.max(1, Math.ceil((count || 0) / limit));

//         setTotalCount(count);
//         setTotalPages(pages);
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to load customers");
//         setCustomers([]);
//       }
//     } catch (error: any) {
//       console.error("Fetch customers error:", error);
//       if (error.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(
//           error.response?.data?.message || "Failed to load customers"
//         );
//       }
//       setCustomers([]);
//     } finally {
//       setListLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(
//       () => {
//         fetchCustomers();
//       },
//       search ? 400 : 0
//     );
//     return () => clearTimeout(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, limit, search, statusFilter]);

//   // ===================== FORM HANDLERS =====================
//   const resetForm = () => {
//     setCompanyName("");
//     setDisplayName("");
//     setPhone("");
//     setBillingAddress("");
//     setStatus("active");
//     setNotes("");
//     setEditingId(null);
//   };

//   const openCreateModal = () => {
//     resetForm();
//     setFormOpen(true);
//   };

//   const openEditModal = (c: Customer) => {
//     setEditingId(c._id);
//     setCompanyName(c.companyName || "");
//     setDisplayName(c.displayName || "");
//     setPhone(c.phone || "");
//     setBillingAddress(c.billingAddress || "");
//     setStatus(c.status || "active");
//     setNotes(c.notes || "");
//     setFormOpen(true);
//   };

//   const closeFormModal = () => {
//     if (saving) return;
//     setFormOpen(false);
//     resetForm();
//   };

//   // ===================== CLEAR FILTERS =====================
//   const handleClearFilters = () => {
//     setSearch("");
//     setStatusFilter("all");
//     setPage(1);
//   };

//   const hasFilter = search.trim().length > 0 || statusFilter !== "all";

//   // ===================== CREATE / UPDATE =====================
//   const handleSave = async () => {
//     if (!companyName.trim()) {
//       toast.error("Company name is required");
//       return;
//     }
//     if (!phone.trim()) {
//       toast.error("Phone number is required");
//       return;
//     }
//     if (!/^\d{10}$/.test(phone.trim())) {
//       toast.error("Phone must be a valid 10-digit number");
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         name: companyName.trim(),
//         displayName: displayName.trim(),
//         mobile: phone.trim(),
//         address: billingAddress.trim(),
//         status,
//         notes: notes.trim(),
//       };

//       if (editingId) {
//         // UPDATE
//         const res = await axios.put(
//           `${API_URL}/customer/${editingId}`,
//           payload,
//           getAuthHeaders()
//         );
//         if (res.data?.success === true) {
//           toast.success("Customer updated successfully! 🎉");
//           closeFormModal();
//           fetchCustomers();
//         } else if (res.data?.message === "Unauthorized") {
//           toast.error("Session expired! Please login again");
//           localStorage.removeItem("erptoken");
//           setTimeout(() => navigate("/login"), 1500);
//         } else {
//           toast.error(
//             res.data?.errors?.[0] ||
//               res.data?.message ||
//               "Failed to update customer"
//           );
//         }
//       } else {
//         // CREATE
//         const res = await axios.post(
//           `${API_URL}/customer`,
//           payload,
//           getAuthHeaders()
//         );
//         if (res.data?.success === true) {
//           toast.success("Customer created successfully! 🎉");
//           closeFormModal();
//           setPage(1);
//           fetchCustomers();
//         } else if (res.data?.message === "Unauthorized") {
//           toast.error("Session expired! Please login again");
//           localStorage.removeItem("erptoken");
//           setTimeout(() => navigate("/login"), 1500);
//         } else {
//           toast.error(
//             res.data?.errors?.[0] ||
//               res.data?.message ||
//               "Failed to create customer"
//           );
//         }
//       }
//     } catch (error: any) {
//       console.error("Save customer error:", error);
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
//             "Failed to save customer"
//         );
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ===================== DELETE ONE =====================
//   const handleDelete = async () => {
//     if (!deleteId) return;

//     try {
//       setDeleting(true);

//       const res = await axios.delete(
//         `${API_URL}/customer/${deleteId}`,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success("Customer deleted successfully");
//         setDeleteId(null);
//         if (customers.length === 1 && page > 1) {
//           setPage((p) => p - 1);
//         } else {
//           fetchCustomers();
//         }
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to delete customer");
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
//   // Backend me bulk delete endpoint nahi hai, isliye loop me delete karenge
//   // (current page ki saari entries ko)
//   const handleDeleteAll = async () => {
//     try {
//       setDeleteAllLoading(true);

//       // Fetch ALL customers (without pagination)
//       const res = await axios.get(`${API_URL}/customer`, {
//         params: { page: 1, limit: 100000 },
//         ...getAuthHeaders(),
//       });

//       if (res.data?.success !== true || !res.data.data?.length) {
//         toast.error("No customers to delete");
//         setDeleteAllLoading(false);
//         return;
//       }

//       const allCustomers: Customer[] = res.data.data || [];

//       // Loop delete
//       let successCount = 0;
//       let failCount = 0;

//       for (const c of allCustomers) {
//         try {
//           const delRes = await axios.delete(
//             `${API_URL}/customer/${c._id}`,
//             getAuthHeaders()
//           );
//           if (delRes.data?.success) successCount++;
//           else failCount++;
//         } catch {
//           failCount++;
//         }
//       }

//       if (successCount > 0) {
//         toast.success(
//           `Deleted ${successCount} customer${successCount > 1 ? "s" : ""}${
//             failCount > 0 ? ` (${failCount} failed)` : ""
//           }`
//         );
//       } else {
//         toast.error("Failed to delete customers");
//       }

//       setDeleteAllOpen(false);
//       setPage(1);
//       fetchCustomers();
//     } catch (error: any) {
//       console.error("Delete all error:", error);
//       if (error.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(error.response?.data?.message || "Delete all failed");
//       }
//     } finally {
//       setDeleteAllLoading(false);
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
//                     bgcolor: "#0c2a3a",
//                     color: "#38bdf8",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <People />
//                 </Box>
//                 <Typography
//                   variant="h5"
//                   fontWeight="800"
//                   sx={{
//                     fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   CUSTOMER MANAGEMENT
//                 </Typography>
//               </Box>
//             </Box>

//             <Box display="flex" gap={1.5} alignItems="center" flexWrap="wrap">
//               {/* New Customer */}
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={openCreateModal}
//                 sx={{
//                   bgcolor: "#10b981",
//                   color: "#ffffff",
//                   fontWeight: 800,
//                   textTransform: "none",
//                   letterSpacing: 0.3,
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   fontSize: "0.8rem",
//                   boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
//                   "&:hover": {
//                     bgcolor: "#059669",
//                     boxShadow: "0 8px 20px rgba(16, 185, 129, 0.5)",
//                   },
//                 }}
//               >
//                 New Customer
//               </Button>

//               {/* Refresh */}
//               <Button
//                 variant="outlined"
//                 startIcon={<RefreshIcon />}
//                 onClick={fetchCustomers}
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

//               {/* Delete All */}
//               <Button
//                 variant="outlined"
//                 startIcon={<DeleteIcon />}
//                 onClick={() => setDeleteAllOpen(true)}
//                 disabled={totalCount === 0}
//                 sx={{
//                   color: "#f43f5e",
//                   borderColor: "rgba(244, 63, 94, 0.3)",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   fontSize: "0.8rem",
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

//         {/* ================= FILTER BAR ================= */}
//         <FilterBar>
//           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
//             {/* Search */}
//             <Box sx={{ flex: 1, minWidth: 240 }}>
//               <StyledTextField
//                 fullWidth
//                 placeholder="Search by company name, phone..."
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

//             {/* Status filter */}
//             <Box sx={{ minWidth: 160 }}>
//               <StyledSelect
//                 value={statusFilter}
//                 onChange={(e) => {
//                   setStatusFilter(e.target.value as string);
//                   setPage(1);
//                 }}
//                 displayEmpty
//                 size="small"
//                 sx={{ height: 42, minHeight: 42 }}
//                 MenuProps={{
//                   PaperProps: {
//                     sx: {
//                       bgcolor: "#111827",
//                       border: "1px solid rgba(255, 255, 255, 0.08)",
//                       "& .MuiMenuItem-root": {
//                         color: "#e5e7eb",
//                         fontSize: "0.85rem",
//                         "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
//                         "&.Mui-selected": {
//                           bgcolor: "rgba(56, 189, 248, 0.15)",
//                           color: "#38bdf8",
//                         },
//                       },
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="all">All Status</MenuItem>
//                 <MenuItem value="active">Active</MenuItem>
//                 <MenuItem value="inactive">Inactive</MenuItem>
//                 <MenuItem value="blocked">Blocked</MenuItem>
//                 <MenuItem value="pending">Pending</MenuItem>
//               </StyledSelect>
//             </Box>

//             {/* Clear */}
//             <Button
//               size="small"
//               variant="outlined"
//               startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
//               onClick={handleClearFilters}
//               disabled={!hasFilter}
//               sx={{
//                 color: "#9ca3af",
//                 borderColor: "rgba(255, 255, 255, 0.15)",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "8px",
//                 px: 1.5,
//                 height: 42,
//                 fontSize: "0.75rem",
//                 "&:hover": {
//                   borderColor: "#f43f5e",
//                   color: "#f43f5e",
//                   bgcolor: "rgba(244, 63, 94, 0.08)",
//                 },
//                 "&.Mui-disabled": {
//                   color: "rgba(156, 163, 175, 0.4)",
//                   borderColor: "rgba(255, 255, 255, 0.05)",
//                 },
//               }}
//             >
//               Clear
//             </Button>
//           </Box>
//         </FilterBar>

//         {/* ================= TABLE ================= */}
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
//               CUSTOMER LIST
//             </Typography>
//             <Chip
//               label={`${totalCount} Customers`}
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
//                   <th>Company Name</th>
//                   <th>Display Name</th>
//                   <th style={{ textAlign: "center" }}>Phone</th>
//                   <th>Billing Address</th>
//                   <th style={{ textAlign: "center" }}>Status</th>
//                   <th style={{ textAlign: "center", width: "110px" }}>
//                     Actions
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
//                       <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
//                       >
//                         Loading customers...
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : customers.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       style={{ textAlign: "center", padding: "40px 12px" }}
//                     >
//                       <Person
//                         style={{
//                           fontSize: 44,
//                           color: "#374151",
//                           marginBottom: 8,
//                         }}
//                       />
//                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
//                         No customers found
//                       </Typography>
//                       <Typography
//                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
//                       >
//                         {hasFilter
//                           ? "Try changing the search or filter"
//                           : "Click 'New Customer' to add one"}
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   customers.map((c, idx) => (
//                     <tr key={c._id}>
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
//                           {c.companyName}
//                         </Typography>
//                       </td>
//                       <td>
//                         <Typography
//                           sx={{ color: "#9ca3af", fontSize: "0.85rem" }}
//                         >
//                           {c.displayName || "-"}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <Chip
//                           label={c.phone}
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
//                       <td>
//                         <Typography
//                           sx={{ color: "#9ca3af", fontSize: "0.85rem" }}
//                         >
//                           {c.billingAddress || "-"}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <Chip
//                           label={c.status || "active"}
//                           size="small"
//                           sx={{
//                             bgcolor:
//                               c.status === "active"
//                                 ? "rgba(52, 211, 153, 0.1)"
//                                 : "rgba(156, 163, 175, 0.1)",
//                             color:
//                               c.status === "active" ? "#34d399" : "#9ca3af",
//                             border:
//                               c.status === "active"
//                                 ? "1px solid rgba(52, 211, 153, 0.3)"
//                                 : "1px solid rgba(156, 163, 175, 0.3)",
//                             fontSize: "0.7rem",
//                             fontWeight: 700,
//                             height: "24px",
//                             textTransform: "capitalize",
//                           }}
//                         />
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <IconButton
//                           size="small"
//                           onClick={() => openEditModal(c)}
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
//                           onClick={() => setDeleteId(c._id)}
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

//           {/* Pagination */}
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
//                 sx={{
//                   color: "#9ca3af",
//                   fontSize: "0.75rem",
//                   fontWeight: 600,
//                 }}
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

//       {/* ================= FLOATING HOME BUTTON ================= */}
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
//             "&:hover": {
//               bgcolor: "#0ea5e9",
//               boxShadow: "0 10px 30px rgba(56, 189, 248, 0.6)",
//             },
//           }}
//         >
//           <HomeIcon />
//         </Fab>
//       </Tooltip>

//       {/* ================= CREATE / UPDATE MODAL ================= */}
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
//                 bgcolor: "#0c2a3a",
//                 color: "#38bdf8",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <LockIcon sx={{ fontSize: 18 }} />
//             </Box>
//             <Typography
//               sx={{
//                 color: "#38bdf8",
//                 fontWeight: 800,
//                 fontSize: "0.9rem",
//                 letterSpacing: 1,
//                 textTransform: "uppercase",
//               }}
//             >
//               {editingId ? "Update Customer" : "New Customer"}
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
//             {/* COMPANY NAME */}
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>
//                 Company Name <span style={{ color: "#f43f5e" }}>*</span>
//               </FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="e.g. Gupta Traders"
//                 value={companyName}
//                 onChange={(e) => setCompanyName(e.target.value)}
//               />
//             </Grid>

//             {/* DISPLAY NAME */}
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>Display Name</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="e.g. Gupta Ji"
//                 value={displayName}
//                 onChange={(e) => setDisplayName(e.target.value)}
//               />
//             </Grid>

//             {/* PHONE */}
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>
//                 Phone <span style={{ color: "#f43f5e" }}>*</span>
//               </FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="10-digit mobile"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
//                 inputProps={{ maxLength: 10 }}
//               />
//             </Grid>

//             {/* STATUS */}
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>Status</FieldLabel>
//               <StyledSelect
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value as string)}
//                 MenuProps={{
//                   PaperProps: {
//                     sx: {
//                       bgcolor: "#111827",
//                       border: "1px solid rgba(255, 255, 255, 0.08)",
//                       "& .MuiMenuItem-root": {
//                         color: "#e5e7eb",
//                         fontSize: "0.85rem",
//                         "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
//                         "&.Mui-selected": {
//                           bgcolor: "rgba(56, 189, 248, 0.15)",
//                           color: "#38bdf8",
//                         },
//                       },
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="active">Active</MenuItem>
//                 <MenuItem value="inactive">Inactive</MenuItem>
//                 <MenuItem value="blocked">Blocked</MenuItem>
//                 <MenuItem value="pending">Pending</MenuItem>
//               </StyledSelect>
//             </Grid>

//             {/* BILLING ADDRESS */}
//             <Grid size={{ xs: 12 }}>
//               <FieldLabel>Billing Address</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="e.g. Main Market, Delhi"
//                 value={billingAddress}
//                 onChange={(e) => setBillingAddress(e.target.value)}
//               />
//             </Grid>

//             {/* NOTES */}
//             <Grid size={{ xs: 12 }}>
//               <FieldLabel>Notes</FieldLabel>
//               <StyledTextarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 placeholder="Any additional notes about the customer..."
//                 maxLength={1000}
//               />
//               <Typography
//                 sx={{
//                   color: "#6b7280",
//                   fontSize: "0.7rem",
//                   mt: 0.5,
//                   textAlign: "right",
//                 }}
//               >
//                 {notes.length} / 1000
//               </Typography>
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
//               bgcolor: "#10b981",
//               color: "#ffffff",
//               fontWeight: 800,
//               textTransform: "uppercase",
//               letterSpacing: 0.5,
//               borderRadius: "10px",
//               px: 3,
//               py: 1.1,
//               fontSize: "0.8rem",
//               boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
//               "&:hover": {
//                 bgcolor: "#059669",
//                 boxShadow: "0 8px 20px rgba(16, 185, 129, 0.4)",
//               },
//               "&.Mui-disabled": {
//                 bgcolor: "rgba(16, 185, 129, 0.3)",
//                 color: "rgba(255, 255, 255, 0.5)",
//               },
//             }}
//           >
//             {saving
//               ? editingId
//                 ? "Updating..."
//                 : "Creating..."
//               : editingId
//               ? "Update Customer"
//               : "Create Customer"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ================= DELETE ONE DIALOG ================= */}
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
//           Delete Customer?
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             Are you sure you want to delete this customer? This action cannot be
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

//       {/* ================= DELETE ALL DIALOG ================= */}
//       <Dialog
//         open={deleteAllOpen}
//         onClose={() => !deleteAllLoading && setDeleteAllOpen(false)}
//         PaperProps={{
//           sx: {
//             bgcolor: "#111827",
//             borderRadius: "16px",
//             border: "1px solid rgba(255, 255, 255, 0.08)",
//           },
//         }}
//       >
//         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
//           Delete All Customers?
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             This will permanently remove{" "}
//             <strong style={{ color: "#f43f5e" }}>
//               ALL {totalCount} customers
//             </strong>{" "}
//             from the database. This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2.5 }}>
//           <Button
//             onClick={() => setDeleteAllOpen(false)}
//             disabled={deleteAllLoading}
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
//             disabled={deleteAllLoading}
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
//             {deleteAllLoading ? (
//               <>
//                 <CircularProgress
//                   size={16}
//                   sx={{ color: "#fff", mr: 1 }}
//                 />
//                 Deleting...
//               </>
//             ) : (
//               "Delete All"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CustomerManagement;




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
  Select,
  MenuItem,
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
  Person,
  People,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  Lock as LockIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

// ===================== TYPES =====================
interface Customer {
  _id: string;
  companyName: string;
  displayName?: string;
  phone: string;
  billingAddress?: string;
  status?: string;
  notes?: string;
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
    minHeight: "42px",
    "& fieldset": {
      borderColor: isDark(theme)
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(15, 23, 42, 0.1)",
    },
    "&:hover fieldset": { borderColor: "rgba(56, 189, 248, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#0ea5e9",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: isDark(theme) ? "#ffffff" : "#0f172a",
    fontSize: "0.85rem",
    padding: "10px 12px",
    "&::placeholder": {
      color: isDark(theme) ? "#6b7280" : "#94a3b8",
      opacity: 1,
    },
  },
}));

const StyledTextarea = styled("textarea")(({ theme }) => ({
  width: "100%",
  minHeight: "80px",
  padding: "10px 12px",
  borderRadius: "10px",
  backgroundColor: isDark(theme) ? "#090d16" : "#f8fafc",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.1)"
    : "1px solid rgba(15, 23, 42, 0.1)",
  color: isDark(theme) ? "#ffffff" : "#0f172a",
  fontSize: "0.85rem",
  fontFamily: "inherit",
  outline: "none",
  resize: "vertical",
  transition: "all 0.2s ease",
  "&:focus": {
    borderColor: "#0ea5e9",
    boxShadow: "0 0 0 3px rgba(56, 189, 248, 0.1)",
  },
  "&::placeholder": {
    color: isDark(theme) ? "#6b7280" : "#94a3b8",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: isDark(theme) ? "#090d16" : "#f8fafc",
  color: isDark(theme) ? "#ffffff" : "#0f172a",
  minHeight: "42px",
  width: "100%",
  fontSize: "0.85rem",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: isDark(theme)
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(15, 23, 42, 0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(56, 189, 248, 0.4)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0ea5e9",
    borderWidth: "1.5px",
  },
  "& .MuiSvgIcon-root": {
    color: isDark(theme) ? "#9ca3af" : "#64748b",
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
    "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
    "& tbody td": {
      color: dark ? "#e5e7eb" : "#334155",
      fontSize: "0.85rem",
      padding: "14px 12px",
      textAlign: "left",
    },
  };
});

// ===================== MAIN =====================
const CustomerManagement: React.FC = () => {
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
    dropdownBg: dark ? "#111827" : "#ffffff",
  };

  // List state
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // Status filter
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Form modal
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [companyName, setCompanyName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [status, setStatus] = useState("active");
  const [notes, setNotes] = useState("");

  // Delete dialog
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Delete All dialog
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);

  // ===================== FETCH =====================
  const fetchCustomers = async () => {
    try {
      setListLoading(true);

      const params: any = { page, limit };
      if (search.trim()) params.search = search.trim();
      if (statusFilter !== "all") params.status = statusFilter;

      const res = await axios.get(`${API_URL}/customer`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setCustomers(res.data.data || []);

        const count = res.data.total ?? res.data.totalCount ?? 0;
        const pages =
          res.data.pages ??
          res.data.totalPages ??
          Math.max(1, Math.ceil((count || 0) / limit));

        setTotalCount(count);
        setTotalPages(pages);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load customers");
        setCustomers([]);
      }
    } catch (error: any) {
      console.error("Fetch customers error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load customers"
        );
      }
      setCustomers([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(
      () => {
        fetchCustomers();
      },
      search ? 400 : 0
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, search, statusFilter]);

  // ===================== FORM HANDLERS =====================
  const resetForm = () => {
    setCompanyName("");
    setDisplayName("");
    setPhone("");
    setBillingAddress("");
    setStatus("active");
    setNotes("");
    setEditingId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEditModal = (cus: Customer) => {
    setEditingId(cus._id);
    setCompanyName(cus.companyName || "");
    setDisplayName(cus.displayName || "");
    setPhone(cus.phone || "");
    setBillingAddress(cus.billingAddress || "");
    setStatus(cus.status || "active");
    setNotes(cus.notes || "");
    setFormOpen(true);
  };

  const closeFormModal = () => {
    if (saving) return;
    setFormOpen(false);
    resetForm();
  };

  // ===================== CLEAR FILTERS =====================
  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setPage(1);
  };

  const hasFilter = search.trim().length > 0 || statusFilter !== "all";

  // ===================== CREATE / UPDATE =====================
  const handleSave = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }
    if (!phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      toast.error("Phone must be a valid 10-digit number");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: companyName.trim(),
        displayName: displayName.trim(),
        mobile: phone.trim(),
        address: billingAddress.trim(),
        status,
        notes: notes.trim(),
      };

      if (editingId) {
        const res = await axios.put(
          `${API_URL}/customer/${editingId}`,
          payload,
          getAuthHeaders()
        );
        if (res.data?.success === true) {
          toast.success("Customer updated successfully! 🎉");
          closeFormModal();
          fetchCustomers();
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(
            res.data?.errors?.[0] ||
              res.data?.message ||
              "Failed to update customer"
          );
        }
      } else {
        const res = await axios.post(
          `${API_URL}/customer`,
          payload,
          getAuthHeaders()
        );
        if (res.data?.success === true) {
          toast.success("Customer created successfully! 🎉");
          closeFormModal();
          setPage(1);
          fetchCustomers();
        } else if (res.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(
            res.data?.errors?.[0] ||
              res.data?.message ||
              "Failed to create customer"
          );
        }
      }
    } catch (error: any) {
      console.error("Save customer error:", error);
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
            "Failed to save customer"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ===================== DELETE ONE =====================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const res = await axios.delete(
        `${API_URL}/customer/${deleteId}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Customer deleted successfully");
        setDeleteId(null);
        if (customers.length === 1 && page > 1) {
          setPage((p) => p - 1);
        } else {
          fetchCustomers();
        }
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to delete customer");
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

  // ===================== DELETE ALL =====================
  const handleDeleteAll = async () => {
    try {
      setDeleteAllLoading(true);

      const res = await axios.get(`${API_URL}/customer`, {
        params: { page: 1, limit: 100000 },
        ...getAuthHeaders(),
      });

      if (res.data?.success !== true || !res.data.data?.length) {
        toast.error("No customers to delete");
        setDeleteAllLoading(false);
        return;
      }

      const allCustomers: Customer[] = res.data.data || [];

      let successCount = 0;
      let failCount = 0;

      for (const cus of allCustomers) {
        try {
          const delRes = await axios.delete(
            `${API_URL}/customer/${cus._id}`,
            getAuthHeaders()
          );
          if (delRes.data?.success) successCount++;
          else failCount++;
        } catch {
          failCount++;
        }
      }

      if (successCount > 0) {
        toast.success(
          `Deleted ${successCount} customer${successCount > 1 ? "s" : ""}${
            failCount > 0 ? ` (${failCount} failed)` : ""
          }`
        );
      } else {
        toast.error("Failed to delete customers");
      }

      setDeleteAllOpen(false);
      setPage(1);
      fetchCustomers();
    } catch (error: any) {
      console.error("Delete all error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Delete all failed");
      }
    } finally {
      setDeleteAllLoading(false);
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
                    borderColor: "#0ea5e9",
                    color: "#0ea5e9",
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
                    bgcolor: c.skyIconBg,
                    color: c.skyText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <People />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                    letterSpacing: 0.5,
                    color: c.text,
                  }}
                >
                  CUSTOMER MANAGEMENT
                </Typography>
              </Box>
            </Box>

            <Box display="flex" gap={1.5} alignItems="center" flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openCreateModal}
                sx={{
                  bgcolor: "#10b981",
                  color: "#ffffff",
                  fontWeight: 800,
                  textTransform: "none",
                  letterSpacing: 0.3,
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.8rem",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
                  "&:hover": {
                    bgcolor: "#059669",
                    boxShadow: "0 8px 20px rgba(16, 185, 129, 0.5)",
                  },
                }}
              >
                New Customer
              </Button>

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchCustomers}
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
                    borderColor: "#0ea5e9",
                    color: "#0ea5e9",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>

              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteAllOpen(true)}
                disabled={totalCount === 0}
                sx={{
                  color: "#f43f5e",
                  borderColor: "rgba(244, 63, 94, 0.3)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.8rem",
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

        {/* ================= FILTER BAR ================= */}
        <FilterBar>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
            <Box sx={{ flex: 1, minWidth: 240 }}>
              <StyledTextField
                fullWidth
                placeholder="Search by company name, phone..."
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

            <Box sx={{ minWidth: 160 }}>
              <StyledSelect
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as string);
                  setPage(1);
                }}
                displayEmpty
                size="small"
                sx={{ height: 42, minHeight: 42 }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: c.dropdownBg,
                      border: `1px solid ${c.border08}`,
                      "& .MuiMenuItem-root": {
                        color: c.textSec,
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
                        "&.Mui-selected": {
                          bgcolor: "rgba(56, 189, 248, 0.15)",
                          color: c.skyText,
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </StyledSelect>
            </Box>

            <Button
              size="small"
              variant="outlined"
              startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
              onClick={handleClearFilters}
              disabled={!hasFilter}
              sx={{
                color: c.muted,
                borderColor: c.border15,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 1.5,
                height: 42,
                fontSize: "0.75rem",
                "&:hover": {
                  borderColor: "#f43f5e",
                  color: "#f43f5e",
                  bgcolor: "rgba(244, 63, 94, 0.08)",
                },
                "&.Mui-disabled": {
                  color: dark
                    ? "rgba(156, 163, 175, 0.4)"
                    : "rgba(100, 116, 139, 0.4)",
                  borderColor: dark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(15, 23, 42, 0.05)",
                },
              }}
            >
              Clear
            </Button>
          </Box>
        </FilterBar>

        {/* ================= TABLE ================= */}
        <TableContainerDark>
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
              CUSTOMER LIST
            </Typography>
            <Chip
              label={`${totalCount} Customers`}
              size="small"
              sx={{
                bgcolor: "rgba(56, 189, 248, 0.1)",
                color: c.skyText,
                border: "1px solid rgba(56, 189, 248, 0.3)",
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
                  <th>Company Name</th>
                  <th>Display Name</th>
                  <th style={{ textAlign: "center" }}>Phone</th>
                  <th>Billing Address</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                  <th style={{ textAlign: "center", width: "110px" }}>
                    Actions
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
                      <CircularProgress sx={{ color: "#0ea5e9" }} size={32} />
                      <Typography
                        sx={{ color: c.muted, fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading customers...
                      </Typography>
                    </td>
                  </tr>
                ) : customers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <Person
                        style={{
                          fontSize: 44,
                          color: c.veryMuted,
                          marginBottom: 8,
                        }}
                      />
                      <Typography sx={{ color: c.muted, fontSize: "0.9rem" }}>
                        No customers found
                      </Typography>
                      <Typography
                        sx={{
                          color: c.mutedDark,
                          fontSize: "0.75rem",
                          mt: 0.5,
                        }}
                      >
                        {hasFilter
                          ? "Try changing the search or filter"
                          : "Click 'New Customer' to add one"}
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  customers.map((cus, idx) => (
                    <tr key={cus._id}>
                      <td style={{ textAlign: "center", color: c.mutedDark }}>
                        {(page - 1) * limit + idx + 1}
                      </td>
                      <td>
                        <Typography
                          sx={{
                            color: c.text,
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {cus.companyName}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          sx={{ color: c.muted, fontSize: "0.85rem" }}
                        >
                          {cus.displayName || "-"}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Chip
                          label={cus.phone}
                          size="small"
                          sx={{
                            bgcolor: "rgba(56, 189, 248, 0.1)",
                            color: c.skyText,
                            border: "1px solid rgba(56, 189, 248, 0.3)",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            height: "24px",
                          }}
                        />
                      </td>
                      <td>
                        <Typography
                          sx={{ color: c.muted, fontSize: "0.85rem" }}
                        >
                          {cus.billingAddress || "-"}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Chip
                          label={cus.status || "active"}
                          size="small"
                          sx={{
                            bgcolor:
                              cus.status === "active"
                                ? "rgba(52, 211, 153, 0.1)"
                                : "rgba(156, 163, 175, 0.1)",
                            color:
                              cus.status === "active"
                                ? dark
                                  ? "#34d399"
                                  : "#059669"
                                : c.muted,
                            border:
                              cus.status === "active"
                                ? "1px solid rgba(52, 211, 153, 0.3)"
                                : "1px solid rgba(156, 163, 175, 0.3)",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            height: "24px",
                            textTransform: "capitalize",
                          }}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => openEditModal(cus)}
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
                          onClick={() => setDeleteId(cus._id)}
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

          {/* Pagination */}
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
                        ? "rgba(56, 189, 248, 0.2)"
                        : c.chipBgSoft,
                    color: limit === n ? c.skyText : c.muted,
                    border:
                      limit === n
                        ? "1px solid rgba(56, 189, 248, 0.5)"
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
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    color: c.skyText,
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(56, 189, 248, 0.2) !important",
                  color: `${c.skyText} !important`,
                  borderColor: "rgba(56, 189, 248, 0.5) !important",
                },
              }}
            />
          </Box>
        </TableContainerDark>
      </Box>

      {/* ================= FLOATING HOME BUTTON ================= */}
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
            "&:hover": {
              bgcolor: "#0ea5e9",
              boxShadow: "0 10px 30px rgba(56, 189, 248, 0.6)",
            },
          }}
        >
          <HomeIcon />
        </Fab>
      </Tooltip>

      {/* ================= CREATE / UPDATE MODAL ================= */}
      <Dialog
        open={formOpen}
        onClose={closeFormModal}
        maxWidth="md"
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
                bgcolor: c.skyIconBg,
                color: c.skyText,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                color: c.skyText,
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {editingId ? "Update Customer" : "New Customer"}
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>
                Company Name <span style={{ color: "#f43f5e" }}>*</span>
              </FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. Gupta Traders"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Display Name</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. Gupta Ji"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>
                Phone <span style={{ color: "#f43f5e" }}>*</span>
              </FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="10-digit mobile"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Status</FieldLabel>
              <StyledSelect
                value={status}
                onChange={(e) => setStatus(e.target.value as string)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: c.dropdownBg,
                      border: `1px solid ${c.border08}`,
                      "& .MuiMenuItem-root": {
                        color: c.textSec,
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
                        "&.Mui-selected": {
                          bgcolor: "rgba(56, 189, 248, 0.15)",
                          color: c.skyText,
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </StyledSelect>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FieldLabel>Billing Address</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. Main Market, Delhi"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FieldLabel>Notes</FieldLabel>
              <StyledTextarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes about the customer..."
                maxLength={1000}
              />
              <Typography
                sx={{
                  color: c.mutedDark,
                  fontSize: "0.7rem",
                  mt: 0.5,
                  textAlign: "right",
                }}
              >
                {notes.length} / 1000
              </Typography>
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
              bgcolor: "#10b981",
              color: "#ffffff",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              borderRadius: "10px",
              px: 3,
              py: 1.1,
              fontSize: "0.8rem",
              boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
              "&:hover": {
                bgcolor: "#059669",
                boxShadow: "0 8px 20px rgba(16, 185, 129, 0.4)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(16, 185, 129, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {saving
              ? editingId
                ? "Updating..."
                : "Creating..."
              : editingId
              ? "Update Customer"
              : "Create Customer"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= DELETE ONE DIALOG ================= */}
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
          Delete Customer?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: c.muted }}>
            Are you sure you want to delete this customer? This action cannot be
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

      {/* ================= DELETE ALL DIALOG ================= */}
      <Dialog
        open={deleteAllOpen}
        onClose={() => !deleteAllLoading && setDeleteAllOpen(false)}
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
          Delete All Customers?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: c.muted }}>
            This will permanently remove{" "}
            <strong style={{ color: "#f43f5e" }}>
              ALL {totalCount} customers
            </strong>{" "}
            from the database. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteAllOpen(false)}
            disabled={deleteAllLoading}
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
            onClick={handleDeleteAll}
            disabled={deleteAllLoading}
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
            {deleteAllLoading ? (
              <>
                <CircularProgress
                  size={16}
                  sx={{ color: "#fff", mr: 1 }}
                />
                Deleting...
              </>
            ) : (
              "Delete All"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerManagement;