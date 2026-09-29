// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   Box,
//   Button,
//   Typography,
//   Grid,
//   Chip,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   CircularProgress,
//   TextField,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {

//   Refresh as RefreshIcon,
//   Delete as DeleteIcon,
//   Visibility as ViewIcon,
//   Edit as EditIcon,
//   AssignmentReturn,
//   FiberManualRecord,
//   FirstPage,
//   LastPage,
//   ChevronLeft,
//   ChevronRight,
//   Receipt,

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
//   padding: "20px 24px",
//   marginBottom: "16px",
//   boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
// }));

// const FilterCard = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "20px",
//   marginBottom: "16px",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
// }));

// const TableContainerDark = styled(TableContainer)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   overflow: "hidden",
//   marginBottom: "16px",
// }));

// const StyledTableHead = styled(TableHead)(() => ({
//   "& .MuiTableCell-head": {
//     backgroundColor: "#111827",
//     color: "#9ca3af",
//     fontWeight: 700,
//     fontSize: "0.7rem",
//     textTransform: "uppercase",
//     letterSpacing: "0.8px",
//     borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//     padding: "16px 12px",
//     whiteSpace: "nowrap",
//   },
// }));

// const StyledTableRow = styled(TableRow)(() => ({
//   transition: "all 0.2s ease",
//   "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
//   "& .MuiTableCell-body": {
//     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "14px 12px",
//   },
// }));

// const StyledTextField = styled(TextField)(() => ({
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "10px",
//     backgroundColor: "#090d16",
//     color: "#ffffff",
//     height: "42px",
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
//     "&::-webkit-calendar-picker-indicator": {
//       filter: "invert(1)",
//       cursor: "pointer",
//     },
//   },
// }));

// const TotalChip = styled(Box)(() => ({
//   backgroundColor: "rgba(56, 189, 248, 0.1)",
//   border: "1px solid rgba(56, 189, 248, 0.3)",
//   color: "#38bdf8",
//   borderRadius: "10px",
//   padding: "10px 20px",
//   fontWeight: 700,
//   fontSize: "0.85rem",
//   display: "flex",
//   alignItems: "center",
//   gap: "8px",
// }));

// const TotalCard = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(56, 189, 248, 0.3)",
//   padding: "20px 28px",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: "16px",
//   boxShadow: "0 8px 20px rgba(56, 189, 248, 0.1)",
// }));

// const PaginationButton = styled(IconButton)(() => ({
//   width: "38px",
//   height: "38px",
//   borderRadius: "10px",
//   color: "#9ca3af",
//   border: "1px solid rgba(255, 255, 255, 0.1)",
//   "&:hover": {
//     bgcolor: "rgba(56, 189, 248, 0.1)",
//     borderColor: "#38bdf8",
//     color: "#38bdf8",
//   },
//   "&.Mui-disabled": {
//     color: "rgba(156, 163, 175, 0.3)",
//     borderColor: "rgba(255, 255, 255, 0.05)",
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

// // ===================== HELPERS =====================

// // Safe total getter — handles totalValue or missing field
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

// // Safe item total
// const getItemTotal = (it: ReturnItemDetail): number => {
//   if (typeof it?.totalAmount === "number") return it.totalAmount;
//   return (Number(it?.quantity) || 0) * (Number(it?.rate) || 0);
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
//   const [error, setError] = useState<string | null>(null);


//   console.log(error);
  

//   // Filters
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [search, setSearch] = useState("");

//   // Pagination
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(25);
//   const [rowsPerPageOptions] = useState([25, 50, 100, 200]);
//   const [totalEntries, setTotalEntries] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   // ===================== FETCH =====================
//   const fetchData = async () => {
//     try {
     
//       console.log('============fetchData=============');

//       const params: any = { page, limit: rowsPerPage };
//       if (fromDate) params.from = fromDate;
//       if (toDate) params.to = toDate;
//       if (search.trim()) params.search = search.trim();

//       const res = await axios.get(`${API_URL}/return-items`, {
//         params,
//         ...getAuthHeaders(),
//       });

//       console.log(res,'============res=============');
      

//       if (res.data?.success === true) {
//         setData(res.data.data || []);
//         setTotalEntries(res.data.total || 0);
//         setTotalPages(res.data.pages || 1);
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
//         setError(error.response?.data?.message || "Failed to fetch data");
//       }
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

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
//         fetchData();
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

//   // ===================== PAGINATION =====================
//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Sum of all totals on current page
//   const grandTotalSum = data.reduce((s, r) => s + getRecordTotal(r), 0);

//   // ===================== LOADING =====================
//   if (loading && data.length === 0) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           bgcolor: "#090d16",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           gap: 2,
//         }}
//       >
//         <CircularProgress sx={{ color: "#38bdf8" }} />
//         <Typography sx={{ color: "#9ca3af" }}>
//           Loading return items...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "#090d16",
//         px: { xs: 1.5, sm: 2, md: 3 },
//         py: { xs: 1.5, md: 2.5 },
//         color: "#ffffff",
//       }}
//     >
//       <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>
//         {/* ================= HEADER BANNER ================= */}
//         <DarkBanner>
//           <Box
//             display="flex"
//             flexDirection={{ xs: "column", md: "row" }}
//             justifyContent="space-between"
//             alignItems={{ xs: "flex-start", md: "center" }}
//             gap={2}
//           >
//             <Box>
//               <Box display="flex" alignItems="center" gap={1} mb={0.5}>
//                 <FiberManualRecord sx={{ fontSize: 10, color: "#38bdf8" }} />
//                 <Typography
//                   variant="caption"
//                   fontWeight="bold"
//                   sx={{
//                     color: "#38bdf8",
//                     letterSpacing: 0.5,
//                     fontSize: "0.7rem",
//                   }}
//                 >
//                   Return Management
//                 </Typography>
//               </Box>

//               <Typography
//                 variant="h5"
//                 fontWeight="800"
//                 sx={{
//                   fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.6rem" },
//                   letterSpacing: 0.5,
//                 }}
//               >
//                 RETURN ITEMS LIST
//               </Typography>

//               {data.length > 0 && (
//                 <Typography
//                   variant="caption"
//                   sx={{ color: "#9ca3af", mt: 0.5 }}
//                 >
//                   Showing {data.length} of {totalEntries} records
//                 </Typography>
//               )}
//             </Box>

//             <Box display="flex" gap={1} flexWrap="wrap">
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
//                   fontSize: "0.8rem",
//                   boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
//                   "&:hover": { bgcolor: "#2563eb" },
//                 }}
//               >
//                 New Return Entry
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

//               <Button
//                 variant="outlined"
//                 startIcon={<DeleteIcon />}
//                 onClick={() => setDeleteAllDialogOpen(true)}
//                 disabled={data.length === 0}
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

//         {/* ================= FILTERS ================= */}
//         <FilterCard>
//           <Grid container spacing={2} alignItems="flex-end">
//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <FieldLabel>From Date</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) => {
//                   setFromDate(e.target.value);
//                   setPage(1);
//                 }}
//                 size="small"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <FieldLabel>To Date</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="date"
//                 value={toDate}
//                 onChange={(e) => {
//                   setToDate(e.target.value);
//                   setPage(1);
//                 }}
//                 size="small"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <FieldLabel>Search Item</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="e.g. noodle"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 size="small"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={() => {
//                   setFromDate("");
//                   setToDate("");
//                   setSearch("");
//                   setPage(1);
//                 }}
//                 sx={{
//                   color: "#e5e7eb",
//                   borderColor: "rgba(255, 255, 255, 0.15)",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   py: 1.1,
//                   fontSize: "0.8rem",
//                   "&:hover": {
//                     borderColor: "#38bdf8",
//                     color: "#38bdf8",
//                     bgcolor: "rgba(56, 189, 248, 0.08)",
//                   },
//                 }}
//               >
//                 Reset Filters
//               </Button>
//             </Grid>
//           </Grid>
//         </FilterCard>

//         {/* ================= SUMMARY BAR ================= */}
//         {data.length > 0 && (
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             flexWrap="wrap"
//             gap={2}
//             mb={2}
//           >
//             <TotalChip>
//               <Receipt sx={{ fontSize: 16 }} />
//               Total Returned (this page): ₹ {grandTotalSum.toLocaleString()}
//             </TotalChip>

//             <Box
//               display="flex"
//               alignItems="center"
//               gap={1}
//               sx={{
//                 bgcolor: "#111827",
//                 px: 2,
//                 py: 1,
//                 borderRadius: "10px",
//                 border: "1px solid rgba(255, 255, 255, 0.08)",
//               }}
//             >
//               <Typography sx={{ color: "#9ca3af", fontSize: "0.75rem" }}>
//                 Show:
//               </Typography>
//               <Select
//                 value={rowsPerPage}
//                 onChange={(e) => {
//                   setRowsPerPage(Number(e.target.value));
//                   setPage(1);
//                 }}
//                 size="small"
//                 variant="standard"
//                 disableUnderline
//                 sx={{
//                   color: "#e5e7eb",
//                   fontSize: "0.85rem",
//                   fontWeight: 600,
//                   "& .MuiSvgIcon-root": { color: "#9ca3af" },
//                 }}
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
//                 {rowsPerPageOptions.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//               <Typography sx={{ color: "#9ca3af", fontSize: "0.75rem" }}>
//                 entries
//               </Typography>
//             </Box>
//           </Box>
//         )}

//         {/* ================= TABLE ================= */}
//         <TableContainerDark>
//           <Table>
//             <StyledTableHead>
//               <TableRow>
//                 <TableCell align="center">Date</TableCell>
//                 <TableCell align="center">Items</TableCell>
//                 <TableCell align="center">Total Qty</TableCell>
//                 <TableCell align="center">Return Total</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {data.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
//                     <Receipt sx={{ fontSize: 48, color: "#374151", mb: 1 }} />
//                     <Typography sx={{ color: "#9ca3af", mb: 0.5 }}>
//                       No return records found
//                     </Typography>
//                     <Typography sx={{ color: "#6b7280", fontSize: "0.75rem" }}>
//                       Click "New Return Entry" to create one
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 data.map((row) => {
//                   const totalQty = (row.items || []).reduce(
//                     (s, i) => s + (i.quantity || 0),
//                     0
//                   );
//                   const rowTotal = getRecordTotal(row);

//                   return (
//                     <StyledTableRow key={row._id}>
//                       <TableCell align="center">
//                         <Chip
//                           label={formatDate(row.date)}
//                           size="small"
//                           sx={{
//                             bgcolor: "rgba(156, 163, 175, 0.1)",
//                             color: "#e5e7eb",
//                             border: "1px solid rgba(156, 163, 175, 0.2)",
//                             fontSize: "0.7rem",
//                             fontWeight: 600,
//                           }}
//                         />
//                       </TableCell>

//                       <TableCell align="center">
//                         <Chip
//                           label={`${(row.items || []).length} items`}
//                           size="small"
//                           sx={{
//                             bgcolor: "rgba(192, 132, 252, 0.1)",
//                             color: "#c084fc",
//                             border: "1px solid rgba(192, 132, 252, 0.3)",
//                             fontSize: "0.7rem",
//                             fontWeight: 600,
//                           }}
//                         />
//                       </TableCell>

//                       <TableCell align="center">
//                         <Chip
//                           label={totalQty}
//                           size="small"
//                           sx={{
//                             bgcolor: "rgba(56, 189, 248, 0.1)",
//                             color: "#38bdf8",
//                             border: "1px solid rgba(56, 189, 248, 0.3)",
//                             fontSize: "0.7rem",
//                             fontWeight: 700,
//                           }}
//                         />
//                       </TableCell>

//                       <TableCell align="center">
//                         <Typography
//                           sx={{
//                             color: "#38bdf8",
//                             fontWeight: 800,
//                             fontSize: "0.95rem",
//                           }}
//                         >
//                           ₹ {rowTotal.toLocaleString()}
//                         </Typography>
//                       </TableCell>

//                       <TableCell align="center">
//                         <Box display="flex" justifyContent="center" gap={0.5}>
//                           <IconButton
//                             size="small"
//                             onClick={() => {
//                               setSelectedRecord(row);
//                               setViewDialogOpen(true);
//                             }}
//                             sx={{
//                               color: "#34d399",
//                               "&:hover": { bgcolor: "rgba(52, 211, 153, 0.1)" },
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
//                               "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
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
//                               "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
//                             }}
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </StyledTableRow>
//                   );
//                 })
//               )}
//             </TableBody>
//           </Table>
//         </TableContainerDark>

//         {/* ================= PAGINATION ================= */}
//         {totalEntries > 0 && (
//           <Box
//             display="flex"
//             flexDirection={{ xs: "column", sm: "row" }}
//             justifyContent="space-between"
//             alignItems="center"
//             gap={2}
//             mt={3}
//           >
//             <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
//               Showing {(page - 1) * rowsPerPage + 1} to{" "}
//               {Math.min(page * rowsPerPage, totalEntries)} of {totalEntries}{" "}
//               entries
//             </Typography>

//             <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap">
//               <PaginationButton
//                 onClick={() => handlePageChange(1)}
//                 disabled={page === 1}
//               >
//                 <FirstPage fontSize="small" />
//               </PaginationButton>
//               <PaginationButton
//                 onClick={() => handlePageChange(page - 1)}
//                 disabled={page === 1}
//               >
//                 <ChevronLeft fontSize="small" />
//               </PaginationButton>

//               {[...Array(Math.min(5, totalPages))].map((_, idx) => {
//                 let pageNum;
//                 if (totalPages <= 5) pageNum = idx + 1;
//                 else if (page <= 3) pageNum = idx + 1;
//                 else if (page >= totalPages - 2) pageNum = totalPages - 4 + idx;
//                 else pageNum = page - 2 + idx;

//                 const isActive = page === pageNum;

//                 return (
//                   <Button
//                     key={idx}
//                     onClick={() => handlePageChange(pageNum)}
//                     sx={{
//                       minWidth: "38px",
//                       height: "38px",
//                       p: 0,
//                       borderRadius: "10px",
//                       fontSize: "0.85rem",
//                       fontWeight: 700,
//                       color: isActive ? "#ffffff" : "#9ca3af",
//                       bgcolor: isActive ? "#38bdf8" : "transparent",
//                       border: isActive
//                         ? "1px solid #38bdf8"
//                         : "1px solid rgba(255, 255, 255, 0.1)",
//                       boxShadow: isActive
//                         ? "0 4px 14px rgba(56, 189, 248, 0.3)"
//                         : "none",
//                       "&:hover": {
//                         bgcolor: isActive
//                           ? "#0ea5e9"
//                           : "rgba(56, 189, 248, 0.1)",
//                         borderColor: "#38bdf8",
//                         color: isActive ? "#ffffff" : "#38bdf8",
//                       },
//                     }}
//                   >
//                     {pageNum}
//                   </Button>
//                 );
//               })}

//               <PaginationButton
//                 onClick={() => handlePageChange(page + 1)}
//                 disabled={page === totalPages}
//               >
//                 <ChevronRight fontSize="small" />
//               </PaginationButton>
//               <PaginationButton
//                 onClick={() => handlePageChange(totalPages)}
//                 disabled={page === totalPages}
//               >
//                 <LastPage fontSize="small" />
//               </PaginationButton>
//             </Box>
//           </Box>
//         )}

//         {/* ================= TOTAL ================= */}
//         <TotalCard sx={{ mt: 3 }}>
//           <Typography
//             sx={{
//               color: "#ffffff",
//               fontWeight: 800,
//               fontSize: { xs: "0.95rem", sm: "1.1rem" },
//               letterSpacing: 0.5,
//             }}
//           >
//             TOTAL RETURN VALUE (ALL):
//           </Typography>
//           <Typography
//             sx={{
//               color: "#38bdf8",
//               fontWeight: 900,
//               fontSize: { xs: "1.5rem", sm: "1.9rem" },
//               letterSpacing: 0.5,
//               textShadow: "0 0 20px rgba(56, 189, 248, 0.4)",
//             }}
//           >
//             ₹ {grandTotalSum.toLocaleString()}
//           </Typography>
//         </TotalCard>
//       </Box>

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
//           },
//         }}
//       >
//         {selectedRecord && (
//           <>
//             <DialogTitle
//               sx={{
//                 color: "#ffffff",
//                 fontWeight: 800,
//                 fontSize: "1.1rem",
//                 borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Box>
//                 Return Details
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.75rem",
//                     fontWeight: 500,
//                   }}
//                 >
//                   {formatDate(selectedRecord.date)}
//                 </Typography>
//               </Box>
//               <Chip
//                 label="VIEW"
//                 size="small"
//                 sx={{
//                   bgcolor: "rgba(56, 189, 248, 0.1)",
//                   color: "#38bdf8",
//                   border: "1px solid rgba(56, 189, 248, 0.3)",
//                   fontWeight: 700,
//                   fontSize: "0.65rem",
//                 }}
//               />
//             </DialogTitle>

//             <DialogContent sx={{ p: 3 }}>
//               {/* Items table */}
//               <TableContainer
//                 sx={{
//                   bgcolor: "#111827",
//                   borderRadius: "12px",
//                   border: "1px solid rgba(255, 255, 255, 0.08)",
//                 }}
//               >
//                 <Table size="small">
//                   <StyledTableHead>
//                     <TableRow>
//                       <TableCell>#</TableCell>
//                       <TableCell>Item</TableCell>
//                       <TableCell align="center">MRP</TableCell>
//                       <TableCell align="center">Rate</TableCell>
//                       <TableCell align="center">Qty</TableCell>
//                       <TableCell align="center">Amount</TableCell>
//                     </TableRow>
//                   </StyledTableHead>
//                   <TableBody>
//                     {(selectedRecord.items || []).map((item, idx) => (
//                       <StyledTableRow key={idx}>
//                         <TableCell>{idx + 1}</TableCell>
//                         <TableCell>
//                           <Typography
//                             sx={{
//                               color: "#ffffff",
//                               fontWeight: 600,
//                               fontSize: "0.85rem",
//                             }}
//                           >
//                             {item.itemName}
//                           </Typography>
//                         </TableCell>
//                         <TableCell align="center">₹ {item.mrp}</TableCell>
//                         <TableCell align="center">₹ {item.rate}</TableCell>
//                         <TableCell align="center">{item.quantity}</TableCell>
//                         <TableCell align="center">
//                           <Typography
//                             sx={{
//                               color: "#38bdf8",
//                               fontWeight: 700,
//                               fontSize: "0.85rem",
//                             }}
//                           >
//                             ₹ {getItemTotal(item).toLocaleString()}
//                           </Typography>
//                         </TableCell>
//                       </StyledTableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               {/* Grand total */}
//               <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
//                 <Box
//                   sx={{
//                     bgcolor: "rgba(56, 189, 248, 0.1)",
//                     border: "1px solid rgba(56, 189, 248, 0.3)",
//                     borderRadius: "12px",
//                     px: 3,
//                     py: 1.5,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 2,
//                   }}
//                 >
//                   <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
//                     Total Return Value:
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#38bdf8",
//                       fontWeight: 800,
//                       fontSize: "1.3rem",
//                     }}
//                   >
//                     ₹ {getRecordTotal(selectedRecord).toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Box>
//             </DialogContent>

//             <DialogActions
//               sx={{
//                 p: 2.5,
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




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  TextField,
  Pagination,
  Tooltip,
  Fab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  AssignmentReturn,
  FiberManualRecord,
  Receipt,
  ArrowBack,
  Home as HomeIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface ReturnItemDetail {
  productId: string;
  itemName: string;
  mrp: number;
  rate: number;
  quantity: number;
  totalAmount?: number;
}

interface ReturnRecord {
  _id: string;
  items: ReturnItemDetail[];
  totalValue: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

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
    "&:hover fieldset": { borderColor: "rgba(56, 189, 248, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#38bdf8",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    padding: "10px 12px",
    "&::placeholder": { color: "#6b7280", opacity: 1 },
    "&::-webkit-calendar-picker-indicator": {
      filter: "invert(1)",
      cursor: "pointer",
    },
  },
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
    backgroundColor: "rgba(56, 189, 248, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.5)" },
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
  "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.05)" },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "14px 12px",
    textAlign: "left",
  },
}));

// ===================== HELPERS =====================

const getRecordTotal = (r: ReturnRecord): number => {
  if (typeof r?.totalValue === "number") return r.totalValue;
  if (Array.isArray(r?.items)) {
    return r.items.reduce(
      (sum, it) => sum + (Number(it?.quantity) || 0) * (Number(it?.rate) || 0),
      0
    );
  }
  return 0;
};

const getItemTotal = (it: ReturnItemDetail): number => {
  if (typeof it?.totalAmount === "number") return it.totalAmount;
  return (Number(it?.quantity) || 0) * (Number(it?.rate) || 0);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// ===================== MAIN COMPONENT =====================

const SaleReturnList: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<ReturnRecord[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ReturnRecord | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ===================== FETCH =====================
  const fetchData = async () => {
    try {
      setLoading(true);

      const params: any = { page, limit };
      if (appliedFrom) params.from = appliedFrom;
      if (appliedTo) params.to = appliedTo;
      if (appliedSearch.trim()) params.search = appliedSearch.trim();

      const res = await axios.get(`${API_URL}/return-items`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setData(res.data.data || []);
        const count =
          res.data.totalCount ?? res.data.total ?? res.data.count ?? 0;
        const pages =
          res.data.totalPages ??
          res.data.pages ??
          Math.max(1, Math.ceil((count || 0) / limit));
        setTotalEntries(count);
        setTotalPages(pages);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Please login again");
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(res.data?.message || "Failed to fetch return items");
        setData([]);
      }
    } catch (error: any) {
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch data");
      }
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, appliedFrom, appliedTo, appliedSearch]);

  // ===================== FILTER HANDLERS =====================
  const handleApplyFilters = () => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setAppliedSearch(search);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFromDate("");
    setToDate("");
    setSearch("");
    setAppliedFrom("");
    setAppliedTo("");
    setAppliedSearch("");
    setPage(1);
  };

  const hasActiveFilters = !!(appliedFrom || appliedTo || appliedSearch);

  // ===================== DELETE ONE =====================
  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      setDeleting(true);
      const res = await axios.delete(
        `${API_URL}/return-items/${selectedId}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Return record deleted");
        setDeleteDialogOpen(false);
        setSelectedId(null);
        if (data.length === 1 && page > 1) {
          setPage((p) => p - 1);
        } else {
          fetchData();
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

  // ===================== DELETE ALL =====================
  const handleDeleteAll = async () => {
    try {
      setDeleting(true);
      const res = await axios.delete(
        `${API_URL}/return-items/delete-all`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success(res.data?.message || "All return records deleted");
        setDeleteAllDialogOpen(false);
        setPage(1);
        fetchData();
      } else {
        toast.error(res.data?.message || "Failed to delete all");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete all failed");
    } finally {
      setDeleting(false);
    }
  };

  // Current page total
  const pageTotal = data.reduce((s, r) => s + getRecordTotal(r), 0);

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
        {/* ================= HEADER BANNER ================= */}
        <DarkBanner>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
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

              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                  <FiberManualRecord sx={{ fontSize: 10, color: "#38bdf8" }} />
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    sx={{
                      color: "#38bdf8",
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                    }}
                  >
                    Return Management
                  </Typography>
                </Box>

                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.6rem" },
                    letterSpacing: 0.5,
                  }}
                >
                  RETURN ITEMS LIST
                </Typography>

                {totalEntries > 0 && (
                  <Typography
                    variant="caption"
                    sx={{ color: "#9ca3af", mt: 0.5 }}
                  >
                    {totalEntries} total records
                  </Typography>
                )}
              </Box>
            </Box>

            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<AssignmentReturn />}
                onClick={() => navigate("/return-items/create")}
                sx={{
                  bgcolor: "#3b82f6",
                  color: "#ffffff",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.8rem",
                  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                  "&:hover": { bgcolor: "#2563eb" },
                }}
              >
                New Return Entry
              </Button>

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchData}
                disabled={loading}
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

              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteAllDialogOpen(true)}
                disabled={totalEntries === 0}
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

            <Box sx={{ flex: 1, minWidth: 220 }}>
              <StyledTextField
                fullWidth
                placeholder="Search item name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleApplyFilters();
                }}
                InputProps={{
                  startAdornment: (
                    <Box
                      component="span"
                      sx={{ mr: 1, display: "flex", alignItems: "center" }}
                    >
                      <SearchIcon sx={{ color: "#6b7280", fontSize: 18 }} />
                    </Box>
                  ),
                }}
              />
            </Box>

            <Button
              size="small"
              variant="contained"
              startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
              onClick={handleApplyFilters}
              sx={{
                bgcolor: "#3b82f6",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                fontSize: "0.75rem",
                "&:hover": { bgcolor: "#2563eb" },
              }}
            >
              Apply
            </Button>

            <Button
              size="small"
              variant="outlined"
              startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
              onClick={handleClearFilters}
              disabled={!hasActiveFilters && !fromDate && !toDate && !search}
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

            {hasActiveFilters && (
              <Chip
                label={`Active filter${
                  appliedFrom || appliedTo
                    ? `: ${appliedFrom || "..."} → ${appliedTo || "..."}`
                    : ""
                }${appliedSearch ? ` | "${appliedSearch}"` : ""}`}
                size="small"
                sx={{
                  bgcolor: "rgba(56, 189, 248, 0.15)",
                  color: "#38bdf8",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "26px",
                }}
              />
            )}

            {pageTotal > 0 && (
              <Box
                sx={{
                  ml: { md: "auto" },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "rgba(56, 189, 248, 0.1)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.8,
                }}
              >
                <Receipt sx={{ fontSize: 16, color: "#38bdf8" }} />
                <Typography
                  sx={{
                    color: "#38bdf8",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                  }}
                >
                  Page Total: ₹ {pageTotal.toLocaleString()}
                </Typography>
              </Box>
            )}
          </Box>
        </FilterBar>

        {/* ================= TABLE ================= */}
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
              RETURN ITEMS LIST
            </Typography>
            <Chip
              label={`${totalEntries} Records`}
              size="small"
              sx={{
                bgcolor: "rgba(56, 189, 248, 0.1)",
                color: "#38bdf8",
                border: "1px solid rgba(56, 189, 248, 0.3)",
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
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Items</th>
                  <th style={{ textAlign: "center" }}>Total Qty</th>
                  <th style={{ textAlign: "center" }}>Return Total</th>
                  <th style={{ textAlign: "center", width: "140px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading return items...
                      </Typography>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <Receipt
                        style={{
                          fontSize: 44,
                          color: "#374151",
                          marginBottom: 8,
                        }}
                      />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                        No return records found
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
                      >
                        {hasActiveFilters
                          ? "Try changing the filters"
                          : "Click 'New Return Entry' to create one"}
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  data.map((row, idx) => {
                    const totalQty = (row.items || []).reduce(
                      (s, i) => s + (i.quantity || 0),
                      0
                    );
                    const rowTotal = getRecordTotal(row);

                    return (
                      <tr key={row._id}>
                        <td style={{ textAlign: "center", color: "#6b7280" }}>
                          {(page - 1) * limit + idx + 1}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Chip
                            label={formatDate(row.date)}
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
                            label={`${(row.items || []).length} items`}
                            size="small"
                            sx={{
                              bgcolor: "rgba(192, 132, 252, 0.1)",
                              color: "#c084fc",
                              border: "1px solid rgba(192, 132, 252, 0.3)",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              height: "24px",
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Chip
                            label={totalQty}
                            size="small"
                            sx={{
                              bgcolor: "rgba(56, 189, 248, 0.1)",
                              color: "#38bdf8",
                              border: "1px solid rgba(56, 189, 248, 0.3)",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              height: "24px",
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography
                            sx={{
                              color: "#38bdf8",
                              fontWeight: 800,
                              fontSize: "0.95rem",
                            }}
                          >
                            ₹ {rowTotal.toLocaleString()}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedRecord(row);
                              setViewDialogOpen(true);
                            }}
                            sx={{
                              color: "#34d399",
                              "&:hover": {
                                bgcolor: "rgba(52, 211, 153, 0.1)",
                              },
                            }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(`/return-items/edit/${row._id}`)
                            }
                            sx={{
                              color: "#38bdf8",
                              "&:hover": {
                                bgcolor: "rgba(56, 189, 248, 0.1)",
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedId(row._id);
                              setDeleteDialogOpen(true);
                            }}
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
                    );
                  })
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
                        ? "rgba(56, 189, 248, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                    color: limit === n ? "#38bdf8" : "#9ca3af",
                    border:
                      limit === n
                        ? "1px solid rgba(56, 189, 248, 0.5)"
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
                {totalEntries > 0
                  ? `${(page - 1) * limit + 1}–${Math.min(
                      page * limit,
                      totalEntries
                    )} of ${totalEntries}`
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
                  color: "#9ca3af",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  "&:hover": {
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    color: "#38bdf8",
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(56, 189, 248, 0.2) !important",
                  color: "#38bdf8 !important",
                  borderColor: "rgba(56, 189, 248, 0.5) !important",
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

      {/* ================= VIEW DIALOG ================= */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
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
        {selectedRecord && (
          <>
            <DialogTitle
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "1.1rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    bgcolor: "#0c2a3a",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ViewIcon sx={{ fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "#38bdf8",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    Return Details
                  </Typography>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                    }}
                  >
                    {formatDate(selectedRecord.date)}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() => setViewDialogOpen(false)}
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
              <Box
                sx={{
                  bgcolor: "#111827",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  overflow: "hidden",
                }}
              >
                <ItemsTable>
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
                        <td>
                          <Typography
                            sx={{
                              color: "#ffffff",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                            }}
                          >
                            {item.itemName}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>₹ {item.mrp}</td>
                        <td style={{ textAlign: "center" }}>₹ {item.rate}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.quantity}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography
                            sx={{
                              color: "#38bdf8",
                              fontWeight: 700,
                              fontSize: "0.85rem",
                            }}
                          >
                            ₹ {getItemTotal(item).toLocaleString()}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </ItemsTable>
              </Box>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Box
                  sx={{
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    borderRadius: "12px",
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
                    Total Return Value:
                  </Typography>
                  <Typography
                    sx={{
                      color: "#38bdf8",
                      fontWeight: 800,
                      fontSize: "1.3rem",
                    }}
                  >
                    ₹ {getRecordTotal(selectedRecord).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>

            <DialogActions
              sx={{
                p: 2.5,
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                gap: 1,
              }}
            >
              <Button
                onClick={() => setViewDialogOpen(false)}
                sx={{
                  color: "#9ca3af",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "10px",
                }}
              >
                Close
              </Button>

              <Button
                onClick={() => {
                  setViewDialogOpen(false);
                  navigate(`/return-items/edit/${selectedRecord._id}`);
                }}
                variant="contained"
                sx={{
                  bgcolor: "#38bdf8",
                  color: "#ffffff",
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
          </>
        )}
      </Dialog>

      {/* ================= DELETE ONE DIALOG ================= */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete this return record? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deleting}
            sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}
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
        open={deleteAllDialogOpen}
        onClose={() => setDeleteAllDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete All Return Records
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete ALL return records? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteAllDialogOpen(false)}
            disabled={deleting}
            sx={{ color: "#9ca3af", textTransform: "none", fontWeight: 600 }}
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

export default SaleReturnList;