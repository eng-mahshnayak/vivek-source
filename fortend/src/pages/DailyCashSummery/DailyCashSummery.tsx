// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   Box,
//   Grid,
//   Card,

//   Typography,
//   Chip,
//   Button,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,

//   Select,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   CircularProgress,
//   Alert,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   Add,
//   Refresh,
//   Delete,
//   Edit,

//   FiberManualRecord,
//   Payments,
//   AccountBalanceWallet,
//   TrendingUp,
//   Receipt,
//   ChevronLeft,
//   ChevronRight,
//   FirstPage,
//   LastPage,
// } from "@mui/icons-material";

// // ===================== STYLED DARK COMPONENTS =====================

// const DarkBanner = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "24px",
//   marginBottom: "20px",
//   boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
// }));

// const MetricCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
//   backgroundColor: "#111827",
//   borderRadius: "12px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "16px 20px",
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   position: "relative",
//   overflow: "hidden",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-4px)",
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

// const StyledTableContainer = styled(TableContainer)(() => ({
//   backgroundColor: "#111827",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   overflow: "hidden",
//   "&::-webkit-scrollbar": {
//     height: "8px",
//     width: "8px",
//   },
//   "&::-webkit-scrollbar-track": {
//     background: "#0d1527",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     background: "#374151",
//     borderRadius: "4px",
//   },
//   "&::-webkit-scrollbar-thumb:hover": {
//     background: "#4b5563",
//   },
// }));

// const StyledTableHead = styled(TableHead)(() => ({
//   "& .MuiTableCell-head": {
//     backgroundColor: "#0d1527",
//     color: "#9ca3af",
//     fontWeight: 700,
//     fontSize: "0.75rem",
//     textTransform: "uppercase",
//     letterSpacing: "0.5px",
//     borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//     whiteSpace: "nowrap",
//     padding: "14px 12px",
//   },
// }));

// const StyledTableRow = styled(TableRow)(() => ({
//   transition: "all 0.2s ease",
//   "&:hover": {
//     backgroundColor: "rgba(16, 185, 129, 0.05)",
//   },
//   "& .MuiTableCell-body": {
//     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "12px",
//   },
// }));



// const IconBox = styled(Box)<{ bgcolor: string; iconcolor: string }>(
//   ({ bgcolor, iconcolor }) => ({
//     width: "48px",
//     height: "48px",
//     borderRadius: "12px",
//     backgroundColor: bgcolor,
//     color: iconcolor,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   })
// );

// // ===================== INTERFACES =====================

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
//     online: number;
//   };
//   totalSales: number;
//   date: string;
//   createdAt: string;
//   updatedAt: string;
// }

// // API URL from environment
// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // Get auth headers
// const getAuthHeaders = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
//   },
// });

// // ===================== MAIN COMPONENT =====================

// const DailyCashSummary: React.FC = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

//   const [data, setData] = useState<CashEntry[]>([]);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Pagination states
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(25);
//   const [rowsPerPageOptions] = useState([25, 50, 100, 200]);
//   const [totalEntries, setTotalEntries] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   const [summary, setSummary] = useState({
//     totalCash: 0,
//     totalOnline: 0,
//     grandTotal: 0,
//     totalEntries: 0,
//   });

//   const calculateTotals = (entries: CashEntry[]) => {
//     const summary = entries.reduce(
//       (acc, entry) => {
//         const cashTotal =
//           (entry.openingCash?.note500 * 500 || 0) +
//           (entry.openingCash?.note200 * 200 || 0) +
//           (entry.openingCash?.note100 * 100 || 0) +
//           (entry.openingCash?.note50 * 50 || 0) +
//           (entry.openingCash?.note20 * 20 || 0) +
//           (entry.openingCash?.note10 * 10 || 0) +
//           (entry.openingCash?.coins || 0);

//         const onlineTotal = entry.openingCash?.online || 0;

//         return {
//           totalCash: acc.totalCash + cashTotal,
//           totalOnline: acc.totalOnline + onlineTotal,
//           grandTotal: acc.grandTotal + (entry.totalSales || 0),
//           totalEntries: acc.totalEntries + 1,
//         };
//       },
//       { totalCash: 0, totalOnline: 0, grandTotal: 0, totalEntries: 0 }
//     );
//     setSummary(summary);
//   };

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await axios.get(`${API_URL}/dailycash`, {
//         params: { page, limit: rowsPerPage },
//         ...getAuthHeaders(),
//       });

//       if (res.data?.success === true) {
//         const entries = res.data.data || [];
//         setData(entries);
//         setTotalEntries(res.data.total || 0);
//         setTotalPages(res.data.pages || 1);
//         calculateTotals(entries);
//       } else if (
//         res.data?.success === false &&
//         res.data?.message === "Unauthorized"
//       ) {
//         toast.error("Login again");
//         navigate("/login");
//       } else {
//         toast.error(res?.data?.message || "Failed to load data");
//         setData([]);
//       }
//     } catch (error: any) {
//       if (error.response?.data?.message === "Unauthorized") {
//         setError("Login again");
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
//   }, [page, rowsPerPage]);

//   const handleDelete = async (id: string) => {
//     try {
//       setLoading(true);
//       const res = await axios.delete(
//         `${API_URL}/dailycash/${id}`,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success("Entry deleted successfully");
//         await fetchData();
//         setDeleteDialogOpen(false);
//       } else if (
//         res.data?.success === false &&
//         res.data?.message === "Unauthorized"
//       ) {
//         setError("Login again");
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         setError(res.data?.message || "Failed to delete entry");
//       }
//     } catch (error: any) {
//       if (error.response?.data?.message === "Unauthorized") {
//         setError("Login again");
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         setError(error.response?.data?.message || "Failed to delete entry");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteAll = async () => {
//     try {
//       setLoading(true);
//       for (const entry of data) {
//         await axios.delete(
//           `${API_URL}/dailycash/${entry._id}`,
//           getAuthHeaders()
//         );
//       }
//       toast.success("All entries deleted successfully");
//       await fetchData();
//       setDeleteAllDialogOpen(false);
//     } catch (error: any) {
//       if (error.response?.data?.message === "Unauthorized") {
//         setError("Login again");
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         setError(error.response?.data?.message || "Failed to delete all entries");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleRowsPerPageChange = (event: any) => {
//     setRowsPerPage(Number(event.target.value));
//     setPage(1);
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // ===================== SUMMARY METRICS =====================
//   const summaryMetrics = [
//     {
//       label: "Total Entries",
//       amount: totalEntries.toString(),
//       color: "#c084fc",
//       icon: <Receipt />,
//       iconBg: "#2e1065",
//     },
//     {
//       label: "Total Cash",
//       amount: `₹ ${summary.totalCash.toLocaleString()}`,
//       color: "#34d399",
//       icon: <Payments />,
//       iconBg: "#132e29",
//     },
//     {
//       label: "Total Online",
//       amount: `₹ ${summary.totalOnline.toLocaleString()}`,
//       color: "#38bdf8",
//       icon: <TrendingUp />,
//       iconBg: "#0c2a3a",
//     },
//     {
//       label: "Grand Total",
//       amount: `₹ ${summary.grandTotal.toLocaleString()}`,
//       color: "#fbbf24",
//       icon: <AccountBalanceWallet />,
//       iconBg: "#332208",
//     },
//   ];

//   // ===================== LOADING SKELETON =====================
//   if (loading && data.length === 0) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           bgcolor: "#090d16",
//           px: { xs: 1.5, sm: 3, md: 4 },
//           py: { xs: 2, md: 3 },
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 2,
//         }}
//       >
//         <CircularProgress sx={{ color: "#10b981" }} />
//         <Typography sx={{ color: "#9ca3af" }}>Loading entries...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "#090d16",
//         px: { xs: 1.5, sm: 3, md: 4 },
//         py: { xs: 2, md: 3 },
//         color: "#ffffff",
//       }}
//     >
//       <Box sx={{ width: "100%", maxWidth: 1350, mx: "auto" }}>
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
//                 <FiberManualRecord sx={{ fontSize: 12, color: "#10b981" }} />
//                 <Typography
//                   variant="caption"
//                   fontWeight="bold"
//                   sx={{ color: "#10b981", letterSpacing: 0.5 }}
//                 >
//                   Cash Management
//                 </Typography>
//               </Box>

//               <Typography
//                 variant="h4"
//                 fontWeight="800"
//                 sx={{
//                   fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2.1rem" },
//                   letterSpacing: 0.5,
//                   color: "#ffffff",
//                 }}
//               >
//                 DAILY CASH SUMMARY
//               </Typography>

//               <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
//                 Track and manage daily cash collections, denominations & online payments.
//               </Typography>
//             </Box>

//             <Box
//               display="flex"
//               gap={1.5}
//               flexWrap="wrap"
//               sx={{ width: { xs: "100%", md: "auto" } }}
//             >
//               <Button
//                 variant="contained"
//                 startIcon={<Add />}
//                 onClick={() => navigate("/dailycash/create")}
//                 sx={{
//                   bgcolor: "#10b981",
//                   color: "#ffffff",
//                   fontWeight: "bold",
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1.2,
//                   flex: { xs: 1, md: "none" },
//                   boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
//                   "&:hover": { bgcolor: "#059669" },
//                 }}
//               >
//                 Create
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={<Refresh />}
//                 onClick={fetchData}
//                 sx={{
//                   color: "#e5e7eb",
//                   borderColor: "rgba(255, 255, 255, 0.15)",
//                   fontWeight: "bold",
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1.2,
//                   flex: { xs: 1, md: "none" },
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
//                 onClick={() => setDeleteAllDialogOpen(true)}
//                 disabled={data.length === 0}
//                 sx={{
//                   color: "#f43f5e",
//                   borderColor: "rgba(244, 63, 94, 0.3)",
//                   fontWeight: "bold",
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1.2,
//                   flex: { xs: 1, md: "none" },
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

//         {/* ================= ERROR ALERT ================= */}
//         {error && (
//           <Alert
//             severity="error"
//             onClose={() => setError(null)}
//             sx={{
//               mb: 3,
//               bgcolor: "rgba(244, 63, 94, 0.1)",
//               color: "#fca5a5",
//               border: "1px solid rgba(244, 63, 94, 0.3)",
//               borderRadius: "12px",
//               "& .MuiAlert-icon": { color: "#f43f5e" },
//             }}
//           >
//             {error}
//           </Alert>
//         )}

//         {/* ================= METRICS SUMMARY BAR ================= */}
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           {summaryMetrics.map((metric, index) => (
//             <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
//               <MetricCard accentcolor={metric.color}>
//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                   mb={1}
//                 >
//                   <Typography
//                     variant="caption"
//                     sx={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600 }}
//                   >
//                     {metric.label}
//                   </Typography>
//                   <IconBox
//                     bgcolor={metric.iconBg}
//                     iconcolor={metric.color}
//                     sx={{ width: 36, height: 36, borderRadius: "10px" }}
//                   >
//                     {React.cloneElement(metric.icon, { sx: { fontSize: 20 } })}
//                   </IconBox>
//                 </Box>
//                 <Typography
//                   variant="h6"
//                   fontWeight="bold"
//                   sx={{
//                     color: metric.color,
//                     fontSize: { xs: "1.2rem", sm: "1.4rem" },
//                   }}
//                 >
//                   {metric.amount}
//                 </Typography>
//               </MetricCard>
//             </Grid>
//           ))}
//         </Grid>

//         {/* ================= ROWS PER PAGE + INFO ================= */}
//         {data.length > 0 && (
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             flexWrap="wrap"
//             gap={2}
//             mb={2}
//           >
//             <Typography variant="caption" sx={{ color: "#9ca3af" }}>
//               Showing {data.length} of {totalEntries} entries
//             </Typography>

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
//               <Typography variant="caption" sx={{ color: "#9ca3af" }}>
//                 Show:
//               </Typography>
//               <Select
//                 value={rowsPerPage}
//                 onChange={handleRowsPerPageChange}
//                 size="small"
//                 variant="standard"
//                 disableUnderline
//                 sx={{
//                   color: "#e5e7eb",
//                   fontSize: "0.85rem",
//                   fontWeight: 600,
//                   "& .MuiSvgIcon-root": { color: "#9ca3af" },
//                   "& .MuiSelect-select": { py: 0.5 },
//                 }}
//                 MenuProps={{
//                   PaperProps: {
//                     sx: {
//                       bgcolor: "#111827",
//                       border: "1px solid rgba(255, 255, 255, 0.08)",
//                       "& .MuiMenuItem-root": {
//                         color: "#e5e7eb",
//                         fontSize: "0.85rem",
//                         "&:hover": { bgcolor: "rgba(16, 185, 129, 0.1)" },
//                         "&.Mui-selected": {
//                           bgcolor: "rgba(16, 185, 129, 0.15)",
//                           color: "#10b981",
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
//               <Typography variant="caption" sx={{ color: "#9ca3af" }}>
//                 entries
//               </Typography>
//             </Box>
//           </Box>
//         )}

//         {/* ================= TABLE (DESKTOP) ================= */}
//         {!isMobile ? (
//           <StyledTableContainer>
//             <Table>
//               <StyledTableHead>
//                 <TableRow>
//                   <TableCell align="center">Date</TableCell>
//                   <TableCell align="center">Collect Person</TableCell>
//                   <TableCell align="center">₹500</TableCell>
//                   <TableCell align="center">₹200</TableCell>
//                   <TableCell align="center">₹100</TableCell>
//                   <TableCell align="center">₹50</TableCell>
//                   <TableCell align="center">₹20</TableCell>
//                   <TableCell align="center">₹10</TableCell>
//                   <TableCell align="center">Coins</TableCell>
//                   <TableCell align="center">Online</TableCell>
//                   <TableCell align="center">Total</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </StyledTableHead>
//               <TableBody>
//                 {data.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={12} align="center" sx={{ py: 6 }}>
//                       <Typography
//                         variant="body1"
//                         sx={{ color: "#9ca3af", mb: 1 }}
//                       >
//                         No entries found
//                       </Typography>
//                       <Typography variant="caption" sx={{ color: "#6b7280" }}>
//                         Click "Create" to add your first entry
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   data.map((row) => (
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
//                           label="Mahesh Nayak"
//                           size="small"
//                           sx={{
//                             bgcolor: "rgba(56, 189, 248, 0.1)",
//                             color: "#38bdf8",
//                             border: "1px solid rgba(56, 189, 248, 0.3)",
//                             fontSize: "0.7rem",
//                             fontWeight: 600,
//                           }}
//                         />
//                       </TableCell>
//                       {[
//                         row.openingCash?.note500,
//                         row.openingCash?.note200,
//                         row.openingCash?.note100,
//                         row.openingCash?.note50,
//                         row.openingCash?.note20,
//                         row.openingCash?.note10,
//                       ].map((val, idx) => (
//                         <TableCell align="center" key={idx}>
//                           <Chip
//                             label={val || 0}
//                             size="small"
//                             sx={{
//                               bgcolor: "rgba(56, 189, 248, 0.08)",
//                               color: "#7dd3fc",
//                               border: "1px solid rgba(56, 189, 248, 0.2)",
//                               fontSize: "0.7rem",
//                               fontWeight: 600,
//                               minWidth: "40px",
//                             }}
//                           />
//                         </TableCell>
//                       ))}
//                       <TableCell align="center">
//                         <Chip
//                           label={row.openingCash?.coins || 0}
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
//                           label={`₹ ${row.openingCash?.online?.toLocaleString() || 0}`}
//                           size="small"
//                           sx={{
//                             bgcolor: "rgba(34, 211, 238, 0.1)",
//                             color: "#22d3ee",
//                             border: "1px solid rgba(34, 211, 238, 0.3)",
//                             fontSize: "0.7rem",
//                             fontWeight: 600,
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell align="center">
//                         <Typography
//                           sx={{
//                             color: "#34d399",
//                             fontWeight: 700,
//                             fontSize: "0.9rem",
//                           }}
//                         >
//                           ₹ {row.totalSales?.toLocaleString() || 0}
//                         </Typography>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Box display="flex" justifyContent="center" gap={0.5}>
//                           <IconButton
//                             size="small"
//                             onClick={() => navigate(`/dailycash/edit/${row._id}`)}
//                             disabled={loading}
//                             sx={{
//                               color: "#38bdf8",
//                               "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
//                             }}
//                           >
//                             <Edit fontSize="small" />
//                           </IconButton>
//                           <IconButton
//                             size="small"
//                             onClick={() => {
//                               setSelectedId(row._id);
//                               setDeleteDialogOpen(true);
//                             }}
//                             disabled={loading}
//                             sx={{
//                               color: "#f43f5e",
//                               "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
//                             }}
//                           >
//                             <Delete fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </StyledTableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </StyledTableContainer>
//         ) : (
//           /* ================= MOBILE CARD VIEW ================= */
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             {data.length === 0 ? (
//               <Box
//                 sx={{
//                   bgcolor: "#111827",
//                   borderRadius: "16px",
//                   border: "1px solid rgba(255, 255, 255, 0.08)",
//                   p: 4,
//                   textAlign: "center",
//                 }}
//               >
//                 <Typography variant="body1" sx={{ color: "#9ca3af", mb: 1 }}>
//                   No entries found
//                 </Typography>
//                 <Typography variant="caption" sx={{ color: "#6b7280" }}>
//                   Click "Create" to add your first entry
//                 </Typography>
//               </Box>
//             ) : (
//               data.map((row) => (
//                 <Card
//                   key={row._id}
//                   sx={{
//                     bgcolor: "#111827",
//                     borderRadius: "16px",
//                     border: "1px solid rgba(255, 255, 255, 0.08)",
//                     boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//                   }}
//                 >
//                   <Box sx={{ p: 2.5 }}>
//                     <Box
//                       display="flex"
//                       justifyContent="space-between"
//                       alignItems="center"
//                       mb={2}
//                     >
//                       <Chip
//                         label={formatDate(row.date)}
//                         size="small"
//                         sx={{
//                           bgcolor: "rgba(156, 163, 175, 0.1)",
//                           color: "#e5e7eb",
//                           border: "1px solid rgba(156, 163, 175, 0.2)",
//                           fontSize: "0.7rem",
//                           fontWeight: 600,
//                         }}
//                       />
//                       <Typography
//                         sx={{ color: "#34d399", fontWeight: 700, fontSize: "1rem" }}
//                       >
//                         ₹ {row.totalSales?.toLocaleString() || 0}
//                       </Typography>
//                     </Box>

//                     <Box
//                       sx={{
//                         display: "grid",
//                         gridTemplateColumns: "repeat(4, 1fr)",
//                         gap: 1,
//                         mb: 2,
//                       }}
//                     >
//                       {[
//                         { label: "₹500", value: row.openingCash?.note500, color: "#7dd3fc" },
//                         { label: "₹200", value: row.openingCash?.note200, color: "#7dd3fc" },
//                         { label: "₹100", value: row.openingCash?.note100, color: "#7dd3fc" },
//                         { label: "₹50", value: row.openingCash?.note50, color: "#7dd3fc" },
//                         { label: "₹20", value: row.openingCash?.note20, color: "#7dd3fc" },
//                         { label: "₹10", value: row.openingCash?.note10, color: "#7dd3fc" },
//                         { label: "Coins", value: row.openingCash?.coins, color: "#c084fc" },
//                         {
//                           label: "Online",
//                           value: `₹${row.openingCash?.online || 0}`,
//                           color: "#22d3ee",
//                         },
//                       ].map((item, idx) => (
//                         <Box
//                           key={idx}
//                           sx={{
//                             textAlign: "center",
//                             p: 1,
//                             borderRadius: "10px",
//                             bgcolor: "rgba(255, 255, 255, 0.03)",
//                           }}
//                         >
//                           <Typography
//                             variant="caption"
//                             sx={{ color: "#6b7280", fontSize: "0.65rem" }}
//                           >
//                             {item.label}
//                           </Typography>
//                           <Typography
//                             sx={{
//                               color: item.color,
//                               fontWeight: 700,
//                               fontSize: "0.8rem",
//                               mt: 0.3,
//                             }}
//                           >
//                             {item.value || 0}
//                           </Typography>
//                         </Box>
//                       ))}
//                     </Box>

//                     <Box
//                       display="flex"
//                       gap={1}
//                       pt={2}
//                       sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}
//                     >
//                       <Button
//                         fullWidth
//                         size="small"
//                         startIcon={<Edit />}
//                         onClick={() => navigate(`/dailycash/edit/${row._id}`)}
//                         disabled={loading}
//                         sx={{
//                           bgcolor: "rgba(56, 189, 248, 0.1)",
//                           color: "#38bdf8",
//                           textTransform: "none",
//                           fontWeight: 600,
//                           borderRadius: "10px",
//                           "&:hover": { bgcolor: "rgba(56, 189, 248, 0.2)" },
//                         }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         fullWidth
//                         size="small"
//                         startIcon={<Delete />}
//                         onClick={() => {
//                           setSelectedId(row._id);
//                           setDeleteDialogOpen(true);
//                         }}
//                         disabled={loading}
//                         sx={{
//                           bgcolor: "rgba(244, 63, 94, 0.1)",
//                           color: "#f43f5e",
//                           textTransform: "none",
//                           fontWeight: 600,
//                           borderRadius: "10px",
//                           "&:hover": { bgcolor: "rgba(244, 63, 94, 0.2)" },
//                         }}
//                       >
//                         Delete
//                       </Button>
//                     </Box>
//                   </Box>
//                 </Card>
//               ))
//             )}
//           </Box>
//         )}

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
//             <Typography variant="caption" sx={{ color: "#9ca3af" }}>
//               Showing {(page - 1) * rowsPerPage + 1} to{" "}
//               {Math.min(page * rowsPerPage, totalEntries)} of {totalEntries} entries
//             </Typography>

//             <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap">
//               <PaginationButton
//                 onClick={() => handlePageChange(1)}
//                 disabled={page === 1}
//                 title="First"
//               >
//                 <FirstPage fontSize="small" />
//               </PaginationButton>
//               <PaginationButton
//                 onClick={() => handlePageChange(page - 1)}
//                 disabled={page === 1}
//                 title="Previous"
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
//                       bgcolor: isActive ? "#10b981" : "transparent",
//                       border: isActive
//                         ? "1px solid #10b981"
//                         : "1px solid rgba(255, 255, 255, 0.1)",
//                       boxShadow: isActive
//                         ? "0 4px 14px rgba(16, 185, 129, 0.3)"
//                         : "none",
//                       "&:hover": {
//                         bgcolor: isActive
//                           ? "#059669"
//                           : "rgba(16, 185, 129, 0.1)",
//                         borderColor: "#10b981",
//                         color: isActive ? "#ffffff" : "#10b981",
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
//                 title="Next"
//               >
//                 <ChevronRight fontSize="small" />
//               </PaginationButton>
//               <PaginationButton
//                 onClick={() => handlePageChange(totalPages)}
//                 disabled={page === totalPages}
//                 title="Last"
//               >
//                 <LastPage fontSize="small" />
//               </PaginationButton>
//             </Box>
//           </Box>
//         )}
//       </Box>

//       {/* ================= DELETE CONFIRMATION DIALOG ================= */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//         PaperProps={{
//           sx: {
//             bgcolor: "#111827",
//             borderRadius: "16px",
//             border: "1px solid rgba(255, 255, 255, 0.08)",
//             boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
//           },
//         }}
//       >
//         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
//           Confirm Delete
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             Are you sure you want to delete this entry? This action cannot be
//             undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2.5 }}>
//           <Button
//             onClick={() => setDeleteDialogOpen(false)}
//             disabled={loading}
//             sx={{
//               color: "#9ca3af",
//               textTransform: "none",
//               fontWeight: 600,
//               borderRadius: "10px",
//               "&:hover": { bgcolor: "rgba(156, 163, 175, 0.1)" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={() => selectedId && handleDelete(selectedId)}
//             disabled={loading}
//             variant="contained"
//             sx={{
//               bgcolor: "#f43f5e",
//               color: "#ffffff",
//               textTransform: "none",
//               fontWeight: 700,
//               borderRadius: "10px",
//               px: 3,
//               boxShadow: "0 4px 14px rgba(244, 63, 94, 0.3)",
//               "&:hover": { bgcolor: "#e11d48" },
//             }}
//           >
//             {loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ================= DELETE ALL CONFIRMATION DIALOG ================= */}
//       <Dialog
//         open={deleteAllDialogOpen}
//         onClose={() => setDeleteAllDialogOpen(false)}
//         PaperProps={{
//           sx: {
//             bgcolor: "#111827",
//             borderRadius: "16px",
//             border: "1px solid rgba(255, 255, 255, 0.08)",
//             boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
//           },
//         }}
//       >
//         <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
//           Delete All Entries
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             Are you sure you want to delete ALL entries? This action cannot be
//             undone and all data will be permanently lost.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2.5 }}>
//           <Button
//             onClick={() => setDeleteAllDialogOpen(false)}
//             disabled={loading}
//             sx={{
//               color: "#9ca3af",
//               textTransform: "none",
//               fontWeight: 600,
//               borderRadius: "10px",
//               "&:hover": { bgcolor: "rgba(156, 163, 175, 0.1)" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleDeleteAll}
//             disabled={loading}
//             variant="contained"
//             sx={{
//               bgcolor: "#f43f5e",
//               color: "#ffffff",
//               textTransform: "none",
//               fontWeight: 700,
//               borderRadius: "10px",
//               px: 3,
//               boxShadow: "0 4px 14px rgba(244, 63, 94, 0.3)",
//               "&:hover": { bgcolor: "#e11d48" },
//             }}
//           >
//             {loading ? (
//               <CircularProgress size={20} sx={{ color: "#fff" }} />
//             ) : (
//               "Delete All"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// // ===================== PAGINATION BUTTON HELPER =====================

// const PaginationButton: React.FC<{
//   onClick: () => void;
//   disabled: boolean;
//   title: string;
//   children: React.ReactNode;
// }> = ({ onClick, disabled, title, children }) => (
//   <IconButton
//     onClick={onClick}
//     disabled={disabled}
//     title={title}
//     sx={{
//       width: "38px",
//       height: "38px",
//       borderRadius: "10px",
//       color: "#9ca3af",
//       border: "1px solid rgba(255, 255, 255, 0.1)",
//       "&:hover": {
//         bgcolor: "rgba(16, 185, 129, 0.1)",
//         borderColor: "#10b981",
//         color: "#10b981",
//       },
//       "&.Mui-disabled": {
//         color: "rgba(156, 163, 175, 0.3)",
//         borderColor: "rgba(255, 255, 255, 0.05)",
//       },
//     }}
//   >
//     {children}
//   </IconButton>
// );

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
import { styled } from "@mui/material/styles";
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

const StyledTextField = styled("input")(() => ({
  borderRadius: "10px",
  backgroundColor: "#090d16",
  color: "#ffffff",
  fontSize: "0.8rem",
  fontWeight: 500,
  padding: "9px 12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  outline: "none",
  height: "38px",
  width: "100%",
  "&:hover": { borderColor: "rgba(16, 185, 129, 0.4)" },
  "&:focus": { borderColor: "#10b981" },
  "&::-webkit-calendar-picker-indicator": {
    filter: "invert(0.7)",
    cursor: "pointer",
  },
}));

const TableContainerDark = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  marginBottom: "16px",
}));

const TableScrollArea = styled(Box)(() => ({
  overflow: "auto",
  flex: 1,
  minHeight: 0,
  "&::-webkit-scrollbar": { width: "8px", height: "8px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(16, 185, 129, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(16, 185, 129, 0.5)" },
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
  "& tbody tr:hover": { backgroundColor: "rgba(16, 185, 129, 0.05)" },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "12px",
    textAlign: "left",
  },
}));

const MetricCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
  backgroundColor: "#111827",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "12px 16px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
    backgroundColor: accentcolor,
  },
}));

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
        const count =
          res.data.totalCount ?? res.data.total ?? 0;
        const pages =
          res.data.pages ??
          Math.max(1, Math.ceil((count || 0) / limit));
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
    setPage(1);
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
    setPage(1);
  };

  const applyQuick = (type: "today" | "week" | "month" | "all") => {
    const t = todayStr();
    if (type === "today") {
      setFromDate(t); setToDate(t); setAppliedFrom(t); setAppliedTo(t);
    } else if (type === "week") {
      const d = new Date(); d.setDate(d.getDate() - 6);
      const f = d.toISOString().split("T")[0];
      setFromDate(f); setToDate(t); setAppliedFrom(f); setAppliedTo(t);
    } else if (type === "month") {
      const f = firstOfMonthStr();
      setFromDate(f); setToDate(t); setAppliedFrom(f); setAppliedTo(t);
    } else {
      setFromDate(""); setToDate(""); setAppliedFrom(""); setAppliedTo("");
    }
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
        await axios.delete(`${API_URL}/dailycash/${entry._id}`, getAuthHeaders());
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
        height: "85vh",
        maxHeight: "100vh",
        overflow: "hidden",
        bgcolor: "#090d16",
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 1.5, md: 2 },
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
                    borderColor: "#10b981",
                    color: "#10b981",
                    bgcolor: "rgba(16, 185, 129, 0.08)",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={0.3}>
                  <FiberManualRecord sx={{ fontSize: 10, color: "#10b981" }} />
                  <Typography
                    sx={{
                      color: "#10b981",
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
                  sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" } }}
                >
                  5. NOTE SUMMARY ENTRY
                </Typography>
              </Box>
            </Box>

            <Box display="flex" gap={1.2} flexWrap="wrap" alignItems="center">
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
                  fontSize: "0.8rem",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
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
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.2,
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
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.2}>
            <Box display="flex" alignItems="center" gap={0.8}>
              <FilterIcon sx={{ color: "#10b981", fontSize: 18 }} />
              <Typography
                sx={{
                  color: "#10b981",
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Date Filter
              </Typography>
            </Box>

            <Box sx={{ width: 150 }}>
              <StyledTextField
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Box>
            <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
              to
            </Typography>
            <Box sx={{ width: 150 }}>
              <StyledTextField
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Box>

            <Button
              size="small"
              variant="contained"
              onClick={handleApply}
              sx={{
                bgcolor: "#10b981",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                fontSize: "0.75rem",
                "&:hover": { bgcolor: "#059669" },
              }}
            >
              Apply
            </Button>

            <Button
              size="small"
              variant="outlined"
              startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
              onClick={handleClear}
              disabled={!hasFilter && !fromDate && !toDate}
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

            <Box sx={{ display: "flex", gap: 0.7, ml: { md: "auto" } }}>
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
                    applyQuick(q.k as "today" | "week" | "month" | "all")
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
                      bgcolor: "rgba(16, 185, 129, 0.15)",
                      borderColor: "rgba(16, 185, 129, 0.4)",
                      color: "#10b981",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </FilterBar>

        {/* ================= SUMMARY METRICS ================= */}
        <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
          {[
            {
              label: "Total Entries",
              amount: totals.totalEntries.toString(),
              color: "#c084fc",
              icon: <Receipt />,
              bg: "#2e1065",
            },
            {
              label: "Total Cash",
              amount: `₹ ${totals.totalCash.toLocaleString("en-IN")}`,
              color: "#34d399",
              icon: <Payments />,
              bg: "#132e29",
            },
            {
              label: "Total Online",
              amount: `₹ ${totals.totalOnline.toLocaleString("en-IN")}`,
              color: "#38bdf8",
              icon: <TrendingUp />,
              bg: "#0c2a3a",
            },
            {
              label: "Grand Total",
              amount: `₹ ${totals.grandTotal.toLocaleString("en-IN")}`,
              color: "#fbbf24",
              icon: <AccountBalanceWallet />,
              bg: "#332208",
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
                      color: "#9ca3af",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}
                  >
                    {m.label}
                  </Typography>
                  <IconBox
                    sx={{ bgcolor: m.bg, color: m.color, width: 26, height: 26 }}
                  >
                    {React.cloneElement(m.icon, { sx: { fontSize: 16 } })}
                  </IconBox>
                </Box>
                <Typography
                  sx={{
                    color: m.color,
                    fontWeight: 800,
                    fontSize: { xs: "1rem", sm: "1.15rem" },
                  }}
                >
                  {m.amount}
                </Typography>
              </MetricCard>
            </Grid>
          ))}
        </Grid>

        {/* ================= TABLE ================= */}
        <TableContainerDark>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={1.5}
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: 0.5 }}
            >
              DAILY CASH ENTRIES
            </Typography>
            <Chip
              label={`${totalCount} Entries`}
              size="small"
              sx={{
                bgcolor: "rgba(16, 185, 129, 0.1)",
                color: "#10b981",
                border: "1px solid rgba(16, 185, 129, 0.3)",
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
                    <td colSpan={12} style={{ textAlign: "center", padding: 40 }}>
                      <CircularProgress sx={{ color: "#10b981" }} size={30} />
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={12} style={{ textAlign: "center", padding: 40 }}>
                      <Receipt
                        style={{ fontSize: 40, color: "#374151", marginBottom: 8 }}
                      />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
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
                              height: "22px",
                            }}
                          />
                        </td>
                        {cashFields.map((val, i) => (
                          <td
                            key={i}
                            style={{ textAlign: "center", color: "#7dd3fc" }}
                          >
                            {val || 0}
                          </td>
                        ))}
                        <td style={{ textAlign: "center", color: "#c084fc" }}>
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
                                color: "#22d3ee",
                                border: "1px solid rgba(34, 211, 238, 0.3)",
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
                              color: "#34d399",
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
                              color: "#34d399",
                              "&:hover": { bgcolor: "rgba(52, 211, 153, 0.1)" },
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
                              color: "#38bdf8",
                              "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => setDeleteId(row._id)}
                            sx={{
                              color: "#f43f5e",
                              "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
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
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Box display="flex" alignItems="center" gap={1.2}>
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
                        ? "rgba(16, 185, 129, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                    color: limit === n ? "#10b981" : "#9ca3af",
                    border:
                      limit === n
                        ? "1px solid rgba(16, 185, 129, 0.5)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    height: "24px",
                    cursor: "pointer",
                  }}
                />
              ))}
              <Typography sx={{ color: "#6b7280", fontSize: "0.72rem", ml: 1 }}>
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
                  color: "#9ca3af",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  "&:hover": {
                    bgcolor: "rgba(16, 185, 129, 0.1)",
                    color: "#10b981",
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(16, 185, 129, 0.2) !important",
                  color: "#10b981 !important",
                },
              }}
            />
          </Box>
        </TableContainerDark>
      </Box>

      {/* ================= FLOATING DASHBOARD ================= */}
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
            width: 52,
            height: 52,
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
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#10b981",
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: 1,
              }}
            >
              CASH ENTRY DETAILS
            </Typography>
            {viewEntry && (
              <Typography sx={{ color: "#9ca3af", fontSize: "0.72rem", mt: 0.3 }}>
                {formatDate(viewEntry.date)}
              </Typography>
            )}
          </Box>
          <IconButton
            size="small"
            onClick={() => setViewOpen(false)}
            sx={{ color: "#9ca3af" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {viewEntry && (
          <DialogContent sx={{ p: 3 }}>
            {/* Cash breakdown */}
            <Typography
              sx={{
                color: "#c084fc",
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
                { l: "₹500", v: viewEntry.openingCash?.note500, c: "#34d399" },
                { l: "₹200", v: viewEntry.openingCash?.note200, c: "#38bdf8" },
                { l: "₹100", v: viewEntry.openingCash?.note100, c: "#c084fc" },
                { l: "₹50", v: viewEntry.openingCash?.note50, c: "#fbbf24" },
                { l: "₹20", v: viewEntry.openingCash?.note20, c: "#2dd4bf" },
                { l: "₹10", v: viewEntry.openingCash?.note10, c: "#a78bfa" },
                { l: "Coins", v: viewEntry.openingCash?.coins, c: "#fb923c" },
              ].map((d, i) => (
                <Box
                  key={i}
                  sx={{
                    bgcolor: "#111827",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    p: 1.2,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "#6b7280", fontSize: "0.65rem", fontWeight: 700 }}
                  >
                    {d.l}
                  </Typography>
                  <Typography
                    sx={{ color: d.c, fontWeight: 800, fontSize: "0.9rem", mt: 0.3 }}
                  >
                    {d.v || 0}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Online breakdown */}
            <Typography
              sx={{
                color: "#38bdf8",
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
                      bgcolor: "#111827",
                      borderRadius: "8px",
                      border: "1px solid rgba(56, 189, 248, 0.15)",
                      p: 1.2,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#9ca3af",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                        }}
                      >
                        Entry #{i + 1}
                      </Typography>
                      {p.note && (
                        <Typography
                          sx={{ color: "#6b7280", fontSize: "0.7rem", mt: 0.2 }}
                        >
                          {p.note}
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      sx={{ color: "#22d3ee", fontWeight: 800, fontSize: "0.9rem" }}
                    >
                      ₹ {(p.amount || 0).toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  bgcolor: "#111827",
                  borderRadius: "8px",
                  border: "1px solid rgba(56, 189, 248, 0.15)",
                  p: 1.5,
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{ color: "#22d3ee", fontWeight: 800, fontSize: "0.95rem" }}
                >
                  ₹ {(viewEntry.totalOnline || viewEntry.online || 0).toLocaleString("en-IN")}
                </Typography>
              </Box>
            )}

            {/* Totals */}
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
              }}
            >
              <Typography sx={{ color: "#10b981", fontWeight: 800, fontSize: "0.85rem" }}>
                GRAND TOTAL
              </Typography>
              <Typography sx={{ color: "#10b981", fontWeight: 900, fontSize: "1.2rem" }}>
                ₹ {viewEntry.totalSales?.toLocaleString("en-IN") || 0}
              </Typography>
            </Box>
          </DialogContent>
        )}

        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => setViewOpen(false)}
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
              setViewOpen(false);
              if (viewEntry) navigate(`/note-summary-entry/edit/${viewEntry._id}`);
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
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete Entry?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#9ca3af" }}>
            Are you sure? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteId(null)}
            disabled={deleting}
            sx={{ color: "#9ca3af", textTransform: "none" }}
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
            bgcolor: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#f43f5e", fontWeight: 700 }}>
          Delete All Entries?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#9ca3af" }}>
            Delete all entries on this page? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteAllOpen(false)}
            disabled={deleting}
            sx={{ color: "#9ca3af", textTransform: "none" }}
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