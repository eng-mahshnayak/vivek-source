




// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import {
// //   Box,
// //   Grid,
// //   Typography,
// //   Chip,
// //   Button,
// //   CircularProgress,
// //   Pagination,
// //   Tooltip,
// //   Fab,
// //   MenuItem,
// //   Select,
// //   InputAdornment,
// //   TextField,
// // } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// // import {
// //   ArrowBack,
// //   Home as HomeIcon,
// //   Refresh as RefreshIcon,
// //   Clear as ClearIcon,
// //   AccountBalanceWallet,
// //   ReceiptLong,
// //   Person,
// //   ArrowForward,
// //   ShoppingCart,
// //   Payments,
// //   People,
// //   Search as SearchIcon,
// // } from "@mui/icons-material";

// // // ===================== 🔥 DUMMY DATA TOGGLE =====================
// // const USE_DUMMY_DATA = true; // Backend ready hone par false kar dena

// // // ===================== TYPES =====================

// // interface Customer {
// //   _id: string;
// //   companyName?: string;
// //   displayName?: string;
// //   phone?: string;
// //   email?: string;
// // }

// // interface LedgerEntry {
// //   _id: string;
// //   customerId: string;
// //   customerName: string;
// //   type: "credit" | "debit";
// //   description?: string;
// //   amount: number;
// //   date: string;
// //   reference?: string;
// // }

// // interface CustomerSummary {
// //   customerId: string;
// //   customerName: string;
// //   phone?: string;
// //   totalSell: number;
// //   totalPaid: number;
// //   balance: number;
// //   entries: LedgerEntry[];
// // }

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // const getAuthHeaders = () => ({
// //   headers: {
// //     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
// //   },
// // });

// // // ===================== 🔥 DUMMY DATA =====================

// // const DUMMY_CUSTOMERS: Customer[] = [
// //   { _id: "c1", companyName: "Gupta Traders", displayName: "Gupta Ji", phone: "9876543210" },
// //   { _id: "c2", companyName: "Sharma Kirana", displayName: "Sharma Ji", phone: "9876501234" },
// //   { _id: "c3", companyName: "Verma Store", displayName: "Verma Ji", phone: "9812345678" },
// //   { _id: "c4", companyName: "Patel General Store", displayName: "Patel Ji", phone: "9898989898" },
// //   { _id: "c5", companyName: "Khan Wholesale", displayName: "Khan Bhai", phone: "9765432109" },
// // ];

// // const DUMMY_ENTRIES: LedgerEntry[] = [
// //   { _id: "g1", customerId: "c1", customerName: "Gupta Traders", type: "credit", description: "Invoice INV-1042 — Noodles & Biscuits", amount: 8500, date: "2026-01-15", reference: "INV-1042" },
// //   { _id: "g2", customerId: "c1", customerName: "Gupta Traders", type: "credit", description: "Invoice INV-1046 — Flour & Sugar", amount: 7400, date: "2026-01-22", reference: "INV-1046" },
// //   { _id: "g3", customerId: "c1", customerName: "Gupta Traders", type: "debit", description: "UPI Payment — PhonePe", amount: 5000, date: "2026-01-24", reference: "UPI-9847321" },
// //   { _id: "g4", customerId: "c1", customerName: "Gupta Traders", type: "credit", description: "Invoice INV-1052 — Snacks", amount: 3200, date: "2026-01-28", reference: "INV-1052" },
// //   { _id: "g5", customerId: "c1", customerName: "Gupta Traders", type: "debit", description: "Cash Received", amount: 8000, date: "2026-02-01", reference: "CASH-001" },

// //   { _id: "s1", customerId: "c2", customerName: "Sharma Kirana", type: "credit", description: "Invoice INV-1043 — Oil & Rice", amount: 12500, date: "2026-01-16", reference: "INV-1043" },
// //   { _id: "s2", customerId: "c2", customerName: "Sharma Kirana", type: "debit", description: "Cash received at store", amount: 10000, date: "2026-01-25", reference: "CASH-002" },
// //   { _id: "s3", customerId: "c2", customerName: "Sharma Kirana", type: "credit", description: "Invoice INV-1047 — Dal & Masala", amount: 5600, date: "2026-01-29", reference: "INV-1047" },
// //   { _id: "s4", customerId: "c2", customerName: "Sharma Kirana", type: "debit", description: "UPI — GPay", amount: 4500, date: "2026-02-02", reference: "UPI-887766" },

// //   { _id: "v1", customerId: "c3", customerName: "Verma Store", type: "credit", description: "Invoice INV-1044 — Snacks & Cold Drinks", amount: 6200, date: "2026-01-18", reference: "INV-1044" },
// //   { _id: "v2", customerId: "c3", customerName: "Verma Store", type: "debit", description: "Cheque Payment — SBI #7829", amount: 4200, date: "2026-01-26", reference: "CHQ-7829" },
// //   { _id: "v3", customerId: "c3", customerName: "Verma Store", type: "credit", description: "Invoice INV-1048 — Biscuits & Tea", amount: 3200, date: "2026-01-30", reference: "INV-1048" },

// //   { _id: "p1", customerId: "c4", customerName: "Patel General Store", type: "credit", description: "Invoice INV-1045 — Rice bags", amount: 9800, date: "2026-01-19", reference: "INV-1045" },
// //   { _id: "p2", customerId: "c4", customerName: "Patel General Store", type: "debit", description: "UPI payment — GPay", amount: 6500, date: "2026-01-27", reference: "UPI-1122334" },
// //   { _id: "p3", customerId: "c4", customerName: "Patel General Store", type: "credit", description: "Invoice INV-1050 — Atta & Sugar", amount: 7800, date: "2026-02-03", reference: "INV-1050" },

// //   { _id: "k1", customerId: "c5", customerName: "Khan Wholesale", type: "credit", description: "Invoice INV-1049 — Bulk Order", amount: 22000, date: "2026-01-20", reference: "INV-1049" },
// //   { _id: "k2", customerId: "c5", customerName: "Khan Wholesale", type: "debit", description: "Bank Transfer — NEFT", amount: 15000, date: "2026-01-28", reference: "NEFT-4455" },
// //   { _id: "k3", customerId: "c5", customerName: "Khan Wholesale", type: "debit", description: "Cash payment", amount: 3000, date: "2026-02-04", reference: "CASH-003" },
// // ];

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

// // const MetricCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
// //   backgroundColor: "#111827",
// //   borderRadius: "12px",
// //   border: "1px solid rgba(255, 255, 255, 0.08)",
// //   padding: "14px 18px",
// //   height: "100%",
// //   position: "relative",
// //   overflow: "hidden",
// //   transition: "all 0.3s ease",
// //   "&:hover": {
// //     transform: "translateY(-3px)",
// //     boxShadow: `0 12px 28px ${accentcolor}22`,
// //     borderColor: accentcolor,
// //   },
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
// //   "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
// //   "& tbody td": {
// //     color: "#e5e7eb",
// //     fontSize: "0.85rem",
// //     padding: "12px",
// //     textAlign: "left",
// //   },
// // }));

// // const ClickableRow = styled("tr")(() => ({
// //   cursor: "pointer",
// //   transition: "all 0.2s ease",
// //   "&:hover": {
// //     backgroundColor: "rgba(56, 189, 248, 0.08) !important",
// //     "& .arrow-icon": { transform: "translateX(4px)", color: "#38bdf8" },
// //   },
// // }));

// // const StyledSearch = styled(TextField)(() => ({
// //   width: "100%",
// //   maxWidth: 320,
// //   "& .MuiOutlinedInput-root": {
// //     borderRadius: "10px",
// //     backgroundColor: "#090d16",
// //     color: "#ffffff",
// //     height: "38px",
// //     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
// //     "&:hover fieldset": { borderColor: "rgba(56, 189, 248, 0.4)" },
// //     "&.Mui-focused fieldset": {
// //       borderColor: "#38bdf8",
// //       borderWidth: "1.5px",
// //     },
// //   },
// //   "& .MuiOutlinedInput-input": {
// //     color: "#ffffff",
// //     fontSize: "0.8rem",
// //     padding: "8px 12px",
// //     "&::placeholder": { color: "#6b7280", opacity: 1 },
// //   },
// // }));

// // // ===================== HELPERS =====================

// // const formatCurrency = (amount: number) =>
// //   `₹ ${Math.abs(amount).toLocaleString("en-IN", {
// //     minimumFractionDigits: 2,
// //     maximumFractionDigits: 2,
// //   })}`;

// // // ===================== MAIN COMPONENT =====================

// // const CustomerLedger: React.FC = () => {
// //   const navigate = useNavigate();

// //   const [loading, setLoading] = useState(true);
// //   const [summaries, setSummaries] = useState<CustomerSummary[]>([]);
// //   const [customers, setCustomers] = useState<Customer[]>([]);

// //   // Filters
// //   const [selectedCustomer, setSelectedCustomer] = useState<string>("all");
// //   const [search, setSearch] = useState("");

// //   // Pagination
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(10);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [totalCount, setTotalCount] = useState(0);

// //   // Summary totals
// //   const [summary, setSummary] = useState({
// //     totalSell: 0,
// //     totalPaid: 0,
// //     totalBalance: 0,
// //     totalCustomers: 0,
// //   });

// //   // ===================== BUILD SUMMARIES (dummy mode) =====================
// //   const buildSummariesFromEntries = (
// //     entries: LedgerEntry[],
// //     customerList: Customer[]
// //   ): CustomerSummary[] => {
// //     const map: Record<string, CustomerSummary> = {};

// //     customerList.forEach((c) => {
// //       map[c._id] = {
// //         customerId: c._id,
// //         customerName: c.companyName || c.displayName || "Unknown",
// //         phone: c.phone,
// //         totalSell: 0,
// //         totalPaid: 0,
// //         balance: 0,
// //         entries: [],
// //       };
// //     });

// //     entries.forEach((e) => {
// //       if (!map[e.customerId]) {
// //         map[e.customerId] = {
// //           customerId: e.customerId,
// //           customerName: e.customerName,
// //           totalSell: 0,
// //           totalPaid: 0,
// //           balance: 0,
// //           entries: [],
// //         };
// //       }
// //       if (e.type === "credit") map[e.customerId].totalSell += e.amount;
// //       else map[e.customerId].totalPaid += e.amount;
// //       map[e.customerId].entries.push(e);
// //     });

// //     Object.values(map).forEach((s) => {
// //       s.balance = s.totalSell - s.totalPaid;
// //       s.entries.sort(
// //         (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
// //       );
// //     });

// //     return Object.values(map);
// //   };

// //   // ===================== FETCH =====================
// //   const fetchData = async () => {
// //     setLoading(true);

// //     // 🔥 DUMMY MODE
// //     if (USE_DUMMY_DATA) {
// //       setTimeout(() => {
// //         setCustomers(DUMMY_CUSTOMERS);

// //         let filteredEntries = [...DUMMY_ENTRIES];

// //         if (selectedCustomer !== "all") {
// //           filteredEntries = filteredEntries.filter(
// //             (e) => e.customerId === selectedCustomer
// //           );
// //         }

// //         let built = buildSummariesFromEntries(
// //           filteredEntries,
// //           selectedCustomer === "all"
// //             ? DUMMY_CUSTOMERS
// //             : DUMMY_CUSTOMERS.filter((c) => c._id === selectedCustomer)
// //         );

// //         if (selectedCustomer === "all") {
// //           built = built.filter((s) => s.entries.length > 0);
// //         }

// //         // 🔍 Search filter (name or phone)
// //         if (search.trim()) {
// //           const q = search.toLowerCase();
// //           built = built.filter(
// //             (s) =>
// //               s.customerName.toLowerCase().includes(q) ||
// //               (s.phone && s.phone.includes(q))
// //           );
// //         }

// //         built.sort((a, b) => b.balance - a.balance);

// //         setSummary({
// //           totalSell: built.reduce((s, x) => s + x.totalSell, 0),
// //           totalPaid: built.reduce((s, x) => s + x.totalPaid, 0),
// //           totalBalance: built.reduce((s, x) => s + x.balance, 0),
// //           totalCustomers: built.length,
// //         });

// //         const count = built.length;
// //         const pages = Math.max(1, Math.ceil(count / limit));
// //         const start = (page - 1) * limit;
// //         setSummaries(built.slice(start, start + limit));
// //         setTotalCount(count);
// //         setTotalPages(pages);
// //         setLoading(false);
// //       }, 250);
// //       return;
// //     }

// //     // 🔥 REAL MODE
// //     try {
// //       const params: any = { page, limit };
// //       if (selectedCustomer !== "all") params.customerId = selectedCustomer;
// //       if (search.trim()) params.search = search.trim();

// //       const res = await axios.get(`${API_URL}/customer-ledger/summary`, {
// //         params,
// //         ...getAuthHeaders(),
// //       });

// //       if (res.data?.success) {
// //         setSummaries(res.data.data || []);
// //         setTotalCount(res.data.totalCount ?? res.data.total ?? 0);
// //         setTotalPages(
// //           res.data.totalPages ??
// //             Math.max(1, Math.ceil((res.data.totalCount || 0) / limit))
// //         );
// //         setSummary({
// //           totalSell: res.data.totals?.totalSell ?? 0,
// //           totalPaid: res.data.totals?.totalPaid ?? 0,
// //           totalBalance: res.data.totals?.totalBalance ?? 0,
// //           totalCustomers: res.data.totals?.totalCustomers ?? 0,
// //         });
// //       } else if (res.data?.message === "Unauthorized") {
// //         toast.error("Session expired! Please login again");
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(res.data?.message || "Failed to load ledger");
// //         setSummaries([]);
// //       }
// //     } catch (err: any) {
// //       if (err.response?.data?.message === "Unauthorized") {
// //         localStorage.removeItem("erptoken");
// //         navigate("/login");
// //       } else {
// //         toast.error(err.response?.data?.message || "Failed to load ledger");
// //       }
// //       setSummaries([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Load customers for dropdown
// //   useEffect(() => {
// //     if (USE_DUMMY_DATA) {
// //       setCustomers(DUMMY_CUSTOMERS);
// //       return;
// //     }
// //     const fetchCustomers = async () => {
// //       try {
// //         const res = await axios.get(`${API_URL}/customer`, {
// //           params: { page: 1, limit: 500 },
// //           ...getAuthHeaders(),
// //         });
// //         if (res.data?.success) setCustomers(res.data.data || []);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };
// //     fetchCustomers();
// //   }, []);

// //   // Debounced fetch on search change
// //   useEffect(() => {
// //     const t = setTimeout(() => {
// //       setPage(1);
// //       fetchData();
// //     }, search ? 300 : 0);
// //     return () => clearTimeout(t);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [page, limit, selectedCustomer, search]);

// //   // ===================== FILTERS =====================
// //   const handleClearFilters = () => {
// //     setSearch("");
// //     setSelectedCustomer("all");
// //     setPage(1);
// //   };

// //   const hasFilter = selectedCustomer !== "all" || search.trim().length > 0;

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
// //         {/* HEADER */}
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
// //                   <ReceiptLong />
// //                 </Box>
// //                 <Box>
// //                   <Typography
// //                     sx={{
// //                       color: "#38bdf8",
// //                       letterSpacing: 0.5,
// //                       fontSize: "0.7rem",
// //                       fontWeight: 700,
// //                     }}
// //                   >
// //                     Accounts · Customer Wise
// //                   </Typography>
// //                   <Typography
// //                     variant="h5"
// //                     fontWeight="800"
// //                     sx={{
// //                       fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
// //                     }}
// //                   >
// //                     CUSTOMER LEDGER
// //                   </Typography>
// //                 </Box>
// //               </Box>
// //             </Box>

// //             <Button
// //               variant="outlined"
// //               startIcon={<RefreshIcon />}
// //               onClick={fetchData}
// //               disabled={loading}
// //               sx={{
// //                 color: "#e5e7eb",
// //                 borderColor: "rgba(255, 255, 255, 0.15)",
// //                 fontWeight: 700,
// //                 textTransform: "none",
// //                 borderRadius: "10px",
// //                 px: 2.2,
// //                 py: 1,
// //                 fontSize: "0.8rem",
// //                 "&:hover": {
// //                   borderColor: "#38bdf8",
// //                   color: "#38bdf8",
// //                   bgcolor: "rgba(56, 189, 248, 0.08)",
// //                 },
// //               }}
// //             >
// //               Refresh
// //             </Button>
// //           </Box>
// //         </DarkBanner>

// //         {/* METRIC CARDS */}
// //         <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
// //           <Grid size={{ xs: 6, sm: 6, md: 3 }}>
// //             <MetricCard accentcolor="#38bdf8">
// //               <Box
// //                 display="flex"
// //                 justifyContent="space-between"
// //                 alignItems="center"
// //                 mb={0.5}
// //               >
// //                 <Typography
// //                   sx={{
// //                     color: "#9ca3af",
// //                     fontSize: "0.7rem",
// //                     fontWeight: 700,
// //                     textTransform: "uppercase",
// //                     letterSpacing: 0.5,
// //                   }}
// //                 >
// //                   Total Sell
// //                 </Typography>
// //                 <ShoppingCart sx={{ color: "#38bdf8", fontSize: 20 }} />
// //               </Box>
// //               <Typography
// //                 sx={{
// //                   color: "#38bdf8",
// //                   fontWeight: 800,
// //                   fontSize: { xs: "1.1rem", sm: "1.3rem" },
// //                 }}
// //               >
// //                 {formatCurrency(summary.totalSell)}
// //               </Typography>
// //               <Typography
// //                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
// //               >
// //                 Credit / Udhaar
// //               </Typography>
// //             </MetricCard>
// //           </Grid>

// //           <Grid size={{ xs: 6, sm: 6, md: 3 }}>
// //             <MetricCard accentcolor="#f43f5e">
// //               <Box
// //                 display="flex"
// //                 justifyContent="space-between"
// //                 alignItems="center"
// //                 mb={0.5}
// //               >
// //                 <Typography
// //                   sx={{
// //                     color: "#9ca3af",
// //                     fontSize: "0.7rem",
// //                     fontWeight: 700,
// //                     textTransform: "uppercase",
// //                     letterSpacing: 0.5,
// //                   }}
// //                 >
// //                   Total Paid
// //                 </Typography>
// //                 <Payments sx={{ color: "#f43f5e", fontSize: 20 }} />
// //               </Box>
// //               <Typography
// //                 sx={{
// //                   color: "#f43f5e",
// //                   fontWeight: 800,
// //                   fontSize: { xs: "1.1rem", sm: "1.3rem" },
// //                 }}
// //               >
// //                 {formatCurrency(summary.totalPaid)}
// //               </Typography>
// //               <Typography
// //                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
// //               >
// //                 Received from customers
// //               </Typography>
// //             </MetricCard>
// //           </Grid>

// //           <Grid size={{ xs: 6, sm: 6, md: 3 }}>
// //             <MetricCard accentcolor="#34d399">
// //               <Box
// //                 display="flex"
// //                 justifyContent="space-between"
// //                 alignItems="center"
// //                 mb={0.5}
// //               >
// //                 <Typography
// //                   sx={{
// //                     color: "#9ca3af",
// //                     fontSize: "0.7rem",
// //                     fontWeight: 700,
// //                     textTransform: "uppercase",
// //                     letterSpacing: 0.5,
// //                   }}
// //                 >
// //                   Pending Balance
// //                 </Typography>
// //                 <AccountBalanceWallet
// //                   sx={{ color: "#34d399", fontSize: 20 }}
// //                 />
// //               </Box>
// //               <Typography
// //                 sx={{
// //                   color: "#34d399",
// //                   fontWeight: 800,
// //                   fontSize: { xs: "1.1rem", sm: "1.3rem" },
// //                 }}
// //               >
// //                 {formatCurrency(summary.totalBalance)}
// //               </Typography>
// //               <Typography
// //                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
// //               >
// //                 You'll receive
// //               </Typography>
// //             </MetricCard>
// //           </Grid>

// //           <Grid size={{ xs: 6, sm: 6, md: 3 }}>
// //             <MetricCard accentcolor="#fbbf24">
// //               <Box
// //                 display="flex"
// //                 justifyContent="space-between"
// //                 alignItems="center"
// //                 mb={0.5}
// //               >
// //                 <Typography
// //                   sx={{
// //                     color: "#9ca3af",
// //                     fontSize: "0.7rem",
// //                     fontWeight: 700,
// //                     textTransform: "uppercase",
// //                     letterSpacing: 0.5,
// //                   }}
// //                 >
// //                   Customers
// //                 </Typography>
// //                 <People sx={{ color: "#fbbf24", fontSize: 20 }} />
// //               </Box>
// //               <Typography
// //                 sx={{
// //                   color: "#fbbf24",
// //                   fontWeight: 800,
// //                   fontSize: { xs: "1.1rem", sm: "1.3rem" },
// //                 }}
// //               >
// //                 {summary.totalCustomers}
// //               </Typography>
// //               <Typography
// //                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
// //               >
// //                 Active accounts
// //               </Typography>
// //             </MetricCard>
// //           </Grid>
// //         </Grid>

// //         {/* FILTER BAR — Search on left, Customer dropdown on right */}
// //         <FilterBar>
// //           <Box
// //             display="flex"
// //             alignItems="center"
// //             flexWrap="wrap"
// //             gap={1.5}
// //           >
// //             {/* Search box on LEFT */}
// //             <StyledSearch
// //               placeholder="Search customer by name or phone..."
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               InputProps={{
// //                 startAdornment: (
// //                   <InputAdornment position="start">
// //                     <SearchIcon sx={{ color: "#6b7280", fontSize: 18 }} />
// //                   </InputAdornment>
// //                 ),
// //               }}
// //             />

// //             {/* Right side: customer dropdown + clear */}
// //             <Box
// //               sx={{
// //                 ml: { md: "auto" },
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: 1.2,
// //               }}
// //             >
// //               <Box sx={{ minWidth: 200 }}>
// //                 <Select
// //                   value={selectedCustomer}
// //                   onChange={(e) => {
// //                     setSelectedCustomer(e.target.value);
// //                     setPage(1);
// //                   }}
// //                   size="small"
// //                   renderValue={(selected) => {
// //                     if (selected === "all") return "All Customers";
// //                     const c = customers.find((x) => x._id === selected);
// //                     return c
// //                       ? c.companyName || c.displayName || "Unknown"
// //                       : "Select Customer";
// //                   }}
// //                   sx={{
// //                     backgroundColor: "#090d16",
// //                     color: "#ffffff",
// //                     borderRadius: "10px",
// //                     height: "38px",
// //                     fontSize: "0.8rem",
// //                     minWidth: "100%",
// //                     "& .MuiOutlinedInput-notchedOutline": {
// //                       borderColor: "rgba(255, 255, 255, 0.1)",
// //                     },
// //                     "&:hover .MuiOutlinedInput-notchedOutline": {
// //                       borderColor: "rgba(56, 189, 248, 0.4)",
// //                     },
// //                     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
// //                       borderColor: "#38bdf8",
// //                     },
// //                     "& .MuiSvgIcon-root": { color: "#9ca3af" },
// //                   }}
// //                   MenuProps={{
// //                     PaperProps: {
// //                       sx: {
// //                         bgcolor: "#111827",
// //                         border: "1px solid rgba(255, 255, 255, 0.08)",
// //                         maxHeight: 320,
// //                         "& .MuiMenuItem-root": {
// //                           color: "#e5e7eb",
// //                           fontSize: "0.85rem",
// //                           "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
// //                           "&.Mui-selected": {
// //                             bgcolor: "rgba(56, 189, 248, 0.15)",
// //                             color: "#38bdf8",
// //                           },
// //                         },
// //                       },
// //                     },
// //                   }}
// //                 >
// //                   <MenuItem value="all">All Customers</MenuItem>
// //                   {customers.map((c) => (
// //                     <MenuItem key={c._id} value={c._id}>
// //                       {c.companyName || c.displayName || "Unknown"}
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </Box>

// //               <Button
// //                 size="small"
// //                 variant="outlined"
// //                 startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
// //                 onClick={handleClearFilters}
// //                 disabled={!hasFilter}
// //                 sx={{
// //                   color: "#9ca3af",
// //                   borderColor: "rgba(255, 255, 255, 0.15)",
// //                   fontWeight: 700,
// //                   textTransform: "none",
// //                   borderRadius: "8px",
// //                   px: 1.5,
// //                   height: "38px",
// //                   fontSize: "0.75rem",
// //                   "&:hover": {
// //                     borderColor: "#f43f5e",
// //                     color: "#f43f5e",
// //                     bgcolor: "rgba(244, 63, 94, 0.08)",
// //                   },
// //                   "&.Mui-disabled": {
// //                     color: "rgba(156, 163, 175, 0.4)",
// //                     borderColor: "rgba(255, 255, 255, 0.05)",
// //                   },
// //                 }}
// //               >
// //                 Clear
// //               </Button>
// //             </Box>
// //           </Box>
// //         </FilterBar>

// //         {/* MAIN TABLE — customer-wise summary */}
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
// //               CUSTOMER SUMMARY
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
// //                 height: "24px",
// //               }}
// //             />
// //           </Box>

// //           <TableScrollArea>
// //             <ItemsTable>
// //               <thead>
// //                 <tr>
// //                   <th style={{ textAlign: "center", width: "50px" }}>#</th>
// //                   <th>Customer Name</th>
// //                   <th style={{ textAlign: "right", width: "150px" }}>
// //                     Total Sell
// //                   </th>
// //                   <th style={{ textAlign: "right", width: "150px" }}>
// //                     Total Paid
// //                   </th>
// //                   <th style={{ textAlign: "right", width: "160px" }}>
// //                     Balance
// //                   </th>
// //                   <th style={{ textAlign: "center", width: "140px" }}>
// //                     Entries
// //                   </th>
// //                   <th style={{ textAlign: "center", width: "60px" }}></th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {loading ? (
// //                   <tr>
// //                     <td
// //                       colSpan={7}
// //                       style={{ textAlign: "center", padding: 40 }}
// //                     >
// //                       <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
// //                       <Typography
// //                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
// //                       >
// //                         Loading ledger...
// //                       </Typography>
// //                     </td>
// //                   </tr>
// //                 ) : summaries.length === 0 ? (
// //                   <tr>
// //                     <td
// //                       colSpan={7}
// //                       style={{ textAlign: "center", padding: 40 }}
// //                     >
// //                       <ReceiptLong
// //                         style={{
// //                           fontSize: 44,
// //                           color: "#374151",
// //                           marginBottom: 8,
// //                         }}
// //                       />
// //                       <Typography
// //                         sx={{ color: "#9ca3af", fontSize: "0.9rem" }}
// //                       >
// //                         No customers found
// //                       </Typography>
// //                       <Typography
// //                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
// //                       >
// //                         {hasFilter
// //                           ? "Try changing the search or filter"
// //                           : "Add customers to get started"}
// //                       </Typography>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   summaries.map((s, idx) => {
// //                     const balancePositive = s.balance > 0;
// //                     const balanceZero = s.balance === 0;

// //                     return (
// //                       <ClickableRow
// //                         key={s.customerId}
// //                         onClick={() =>
// //                           navigate(`/customer-ledger/${s.customerId}`)
// //                         }
// //                       >
// //                         <td style={{ textAlign: "center", color: "#6b7280" }}>
// //                           {(page - 1) * limit + idx + 1}
// //                         </td>
// //                         <td>
// //                           <Box display="flex" alignItems="center" gap={1}>
// //                             <Box
// //                               sx={{
// //                                 width: 32,
// //                                 height: 32,
// //                                 borderRadius: "8px",
// //                                 bgcolor: "rgba(56, 189, 248, 0.1)",
// //                                 color: "#38bdf8",
// //                                 display: "flex",
// //                                 alignItems: "center",
// //                                 justifyContent: "center",
// //                                 flexShrink: 0,
// //                               }}
// //                             >
// //                               <Person sx={{ fontSize: 16 }} />
// //                             </Box>
// //                             <Box>
// //                               <Typography
// //                                 sx={{
// //                                   color: "#ffffff",
// //                                   fontWeight: 700,
// //                                   fontSize: "0.88rem",
// //                                 }}
// //                               >
// //                                 {s.customerName}
// //                               </Typography>
// //                               {s.phone && (
// //                                 <Typography
// //                                   sx={{
// //                                     color: "#6b7280",
// //                                     fontSize: "0.68rem",
// //                                     mt: 0.1,
// //                                   }}
// //                                 >
// //                                   📞 {s.phone}
// //                                 </Typography>
// //                               )}
// //                             </Box>
// //                           </Box>
// //                         </td>
// //                         <td style={{ textAlign: "right" }}>
// //                           <Typography
// //                             sx={{
// //                               color: "#38bdf8",
// //                               fontWeight: 800,
// //                               fontSize: "0.9rem",
// //                             }}
// //                           >
// //                             {formatCurrency(s.totalSell)}
// //                           </Typography>
// //                         </td>
// //                         <td style={{ textAlign: "right" }}>
// //                           <Typography
// //                             sx={{
// //                               color: "#f43f5e",
// //                               fontWeight: 800,
// //                               fontSize: "0.9rem",
// //                             }}
// //                           >
// //                             {formatCurrency(s.totalPaid)}
// //                           </Typography>
// //                         </td>
// //                         <td style={{ textAlign: "right" }}>
// //                           <Chip
// //                             label={
// //                               balanceZero
// //                                 ? "Settled"
// //                                 : balancePositive
// //                                 ? `Receive ${formatCurrency(s.balance)}`
// //                                 : `Pay ${formatCurrency(s.balance)}`
// //                             }
// //                             size="small"
// //                             sx={{
// //                               bgcolor: balanceZero
// //                                 ? "rgba(156, 163, 175, 0.15)"
// //                                 : balancePositive
// //                                 ? "rgba(52, 211, 153, 0.15)"
// //                                 : "rgba(251, 191, 36, 0.15)",
// //                               color: balanceZero
// //                                 ? "#9ca3af"
// //                                 : balancePositive
// //                                 ? "#34d399"
// //                                 : "#fbbf24",
// //                               border: balanceZero
// //                                 ? "1px solid rgba(156, 163, 175, 0.3)"
// //                                 : balancePositive
// //                                 ? "1px solid rgba(52, 211, 153, 0.4)"
// //                                 : "1px solid rgba(251, 191, 36, 0.4)",
// //                               fontWeight: 800,
// //                               fontSize: "0.75rem",
// //                               height: "26px",
// //                             }}
// //                           />
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Chip
// //                             label={`${s.entries.length} entries`}
// //                             size="small"
// //                             sx={{
// //                               bgcolor: "rgba(192, 132, 252, 0.1)",
// //                               color: "#c084fc",
// //                               border: "1px solid rgba(192, 132, 252, 0.3)",
// //                               fontWeight: 600,
// //                               fontSize: "0.7rem",
// //                               height: "24px",
// //                             }}
// //                           />
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <ArrowForward
// //                             className="arrow-icon"
// //                             sx={{
// //                               color: "#6b7280",
// //                               fontSize: 18,
// //                               transition: "all 0.2s ease",
// //                             }}
// //                           />
// //                         </td>
// //                       </ClickableRow>
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
// //                         ? "rgba(56, 189, 248, 0.2)"
// //                         : "rgba(255, 255, 255, 0.05)",
// //                     color: limit === n ? "#38bdf8" : "#9ca3af",
// //                     border:
// //                       limit === n
// //                         ? "1px solid rgba(56, 189, 248, 0.5)"
// //                         : "1px solid rgba(255, 255, 255, 0.1)",
// //                     fontWeight: 700,
// //                     fontSize: "0.68rem",
// //                     height: "24px",
// //                     cursor: "pointer",
// //                   }}
// //                 />
// //               ))}
// //               <Typography
// //                 sx={{ color: "#6b7280", fontSize: "0.72rem", ml: 1 }}
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
// //               disabled={loading}
// //               shape="rounded"
// //               size="small"
// //               sx={{
// //                 "& .MuiPaginationItem-root": {
// //                   color: "#9ca3af",
// //                   fontWeight: 700,
// //                   fontSize: "0.78rem",
// //                   "&:hover": {
// //                     bgcolor: "rgba(56, 189, 248, 0.1)",
// //                     color: "#38bdf8",
// //                   },
// //                 },
// //                 "& .Mui-selected": {
// //                   bgcolor: "rgba(56, 189, 248, 0.2) !important",
// //                   color: "#38bdf8 !important",
// //                 },
// //               }}
// //             />
// //           </Box>
// //         </TableContainerDark>
// //       </Box>

// //       {/* FLOATING DASHBOARD */}
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
// //     </Box>
// //   );
// // };

// // export default CustomerLedger;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   Box,
//   Grid,
//   Typography,
//   Chip,
//   Button,
//   CircularProgress,
//   Pagination,
//   Tooltip,
//   Fab,
//   MenuItem,
//   Select,
//   InputAdornment,
//   TextField,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   ArrowBack,
//   Home as HomeIcon,
//   Refresh as RefreshIcon,
//   Clear as ClearIcon,
//   AccountBalanceWallet,
//   ReceiptLong,
//   Person,
//   ArrowForward,
//   ShoppingCart,
//   Payments,
//   People,
//   Search as SearchIcon,
// } from "@mui/icons-material";

// // ===================== TYPES =====================

// interface Customer {
//   _id: string;
//   companyName?: string;
//   displayName?: string;
//   phone?: string;
//   email?: string;
// }

// interface CustomerSummary {
//   _id: string;
//   customerId: string;
//   customerName: string;
//   phone?: string;
//   totalSellAmount: number;
//   totalRecievedAmount: number;
//   balance: number;
//   numberOfEntries: number;
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

// const MetricCard = styled(Box)<{ accentcolor: string }>(({ accentcolor }) => ({
//   backgroundColor: "#111827",
//   borderRadius: "12px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "14px 18px",
//   height: "100%",
//   position: "relative",
//   overflow: "hidden",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     transform: "translateY(-3px)",
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

// const TableContainerDark = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   overflow: "hidden",
//   display: "flex",
//   flexDirection: "column",
//   flex: 1,
//   minHeight: 0,
//   marginBottom: "16px",
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
//   "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "12px",
//     textAlign: "left",
//   },
// }));

// const ClickableRow = styled("tr")(() => ({
//   cursor: "pointer",
//   transition: "all 0.2s ease",
//   "&:hover": {
//     backgroundColor: "rgba(56, 189, 248, 0.08) !important",
//     "& .arrow-icon": { transform: "translateX(4px)", color: "#38bdf8" },
//   },
// }));

// const StyledSearch = styled(TextField)(() => ({
//   width: "100%",
//   maxWidth: 320,
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "10px",
//     backgroundColor: "#090d16",
//     color: "#ffffff",
//     height: "38px",
//     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
//     "&:hover fieldset": { borderColor: "rgba(56, 189, 248, 0.4)" },
//     "&.Mui-focused fieldset": {
//       borderColor: "#38bdf8",
//       borderWidth: "1.5px",
//     },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#ffffff",
//     fontSize: "0.8rem",
//     padding: "8px 12px",
//     "&::placeholder": { color: "#6b7280", opacity: 1 },
//   },
// }));

// // ===================== HELPERS =====================

// const formatCurrency = (amount: number) =>
//   `₹ ${Math.abs(amount || 0).toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;

// // ===================== MAIN COMPONENT =====================

// const CustomerLedger: React.FC = () => {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [summaries, setSummaries] = useState<CustomerSummary[]>([]);
//   const [customers, setCustomers] = useState<Customer[]>([]);

//   // Filters
//   const [selectedCustomer, setSelectedCustomer] = useState<string>("all");
//   const [search, setSearch] = useState("");

//   // Pagination
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);

//   // Summary totals
//   const [summary, setSummary] = useState({
//     totalSell: 0,
//     totalPaid: 0,
//     totalBalance: 0,
//     totalCustomers: 0,
//   });

//   // ===================== FETCH LEDGER =====================
//   const fetchData = async () => {
//     setLoading(true);

//     try {
//       const params: any = { page, limit };
//       if (selectedCustomer !== "all") params.customerId = selectedCustomer;
//       if (search.trim()) params.search = search.trim();

//       const res = await axios.get(`${API_URL}/customer-ledger/summary`, {
//         params,
//         ...getAuthHeaders(),
//       });

//       // 🔥 Backend returns: { status: true, statusCode, count, data }
//       if (res.data?.status === true || res.data?.success === true) {
//         const list = res.data.data || [];

//         // Map backend fields → frontend fields
//         const mapped: CustomerSummary[] = list.map((item: any) => ({
//           _id: item._id,
//           customerId:
//             typeof item.customerId === "object"
//               ? item.customerId._id
//               : item.customerId,
//           customerName: item.customerName || "Unknown",
//           phone:
//             (typeof item.customerId === "object" && item.customerId?.phone) ||
//             item.phone ||
//             "",
//           totalSellAmount: item.totalSellAmount || 0,
//           totalRecievedAmount: item.totalRecievedAmount || 0,
//           balance: item.balance || 0,
//           numberOfEntries: item.numberOfEntries || 0,
//           createdAt: item.createdAt,
//         }));

//         setSummaries(mapped);

//         // Total count — backend me `count` hai, agar totalCount bhi ho toh use karo
//         const count = res.data.totalCount ?? res.data.total ?? list.length ?? 0;
//         const pages =
//           res.data.totalPages ??
//           Math.max(1, Math.ceil((count || 0) / limit));
//         setTotalCount(count);
//         setTotalPages(pages);

//         // 🔥 Totals — agar backend totals bhejta hai toh use karo,
//         // warna current page se compute karo
//         if (res.data.totals) {
//           setSummary({
//             totalSell: res.data.totals.totalSell ?? 0,
//             totalPaid: res.data.totals.totalPaid ?? 0,
//             totalBalance: res.data.totals.totalBalance ?? 0,
//             totalCustomers: res.data.totals.totalCustomers ?? count,
//           });
//         } else {
//           // Fallback — compute from mapped list (page-wise)
//           setSummary({
//             totalSell: mapped.reduce((s, x) => s + x.totalSellAmount, 0),
//             totalPaid: mapped.reduce((s, x) => s + x.totalRecievedAmount, 0),
//             totalBalance: mapped.reduce((s, x) => s + x.balance, 0),
//             totalCustomers: count,
//           });
//         }
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to load ledger");
//         setSummaries([]);
//       }
//     } catch (err: any) {
//       console.error("Fetch ledger error:", err);
//       if (err.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(err.response?.data?.message || "Failed to load ledger");
//       }
//       setSummaries([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===================== FETCH CUSTOMERS (dropdown) =====================
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/customer`, {
//           params: { page: 1, limit: 500 },
//           ...getAuthHeaders(),
//         });
//         if (res.data?.success || res.data?.status) {
//           setCustomers(res.data.data || []);
//         }
//       } catch (err) {
//         console.error("Fetch customers error:", err);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   // ===================== DEBOUNCED FETCH =====================
//   useEffect(() => {
//     const t = setTimeout(() => {
//       setPage(1);
//       fetchData();
//     }, search ? 300 : 0);
//     return () => clearTimeout(t);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, limit, selectedCustomer, search]);

//   // ===================== FILTERS =====================
//   const handleClearFilters = () => {
//     setSearch("");
//     setSelectedCustomer("all");
//     setPage(1);
//   };

//   const hasFilter = selectedCustomer !== "all" || search.trim().length > 0;

//   // ===================== RENDER =====================
//   return (
//     <Box
//       sx={{
//         height: "85vh",
//         maxHeight: "100vh",
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
//         {/* HEADER */}
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
//                   <ReceiptLong />
//                 </Box>
//                 <Box>
//                   <Typography
//                     sx={{
//                       color: "#38bdf8",
//                       letterSpacing: 0.5,
//                       fontSize: "0.7rem",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Accounts · Customer Wise
//                   </Typography>
//                   <Typography
//                     variant="h5"
//                     fontWeight="800"
//                     sx={{
//                       fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
//                     }}
//                   >
//                     CUSTOMER LEDGER
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Button
//               variant="outlined"
//               startIcon={<RefreshIcon />}
//               onClick={fetchData}
//               disabled={loading}
//               sx={{
//                 color: "#e5e7eb",
//                 borderColor: "rgba(255, 255, 255, 0.15)",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "10px",
//                 px: 2.2,
//                 py: 1,
//                 fontSize: "0.8rem",
//                 "&:hover": {
//                   borderColor: "#38bdf8",
//                   color: "#38bdf8",
//                   bgcolor: "rgba(56, 189, 248, 0.08)",
//                 },
//               }}
//             >
//               Refresh
//             </Button>
//           </Box>
//         </DarkBanner>

//         {/* METRIC CARDS */}
//         <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
//           <Grid size={{ xs: 6, sm: 6, md: 3 }}>
//             <MetricCard accentcolor="#38bdf8">
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={0.5}
//               >
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.7rem",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   Total Sell
//                 </Typography>
//                 <ShoppingCart sx={{ color: "#38bdf8", fontSize: 20 }} />
//               </Box>
//               <Typography
//                 sx={{
//                   color: "#38bdf8",
//                   fontWeight: 800,
//                   fontSize: { xs: "1.1rem", sm: "1.3rem" },
//                 }}
//               >
//                 {formatCurrency(summary.totalSell)}
//               </Typography>
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
//               >
//                 Credit / Udhaar
//               </Typography>
//             </MetricCard>
//           </Grid>

//           <Grid size={{ xs: 6, sm: 6, md: 3 }}>
//             <MetricCard accentcolor="#f43f5e">
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={0.5}
//               >
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.7rem",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   Total Paid
//                 </Typography>
//                 <Payments sx={{ color: "#f43f5e", fontSize: 20 }} />
//               </Box>
//               <Typography
//                 sx={{
//                   color: "#f43f5e",
//                   fontWeight: 800,
//                   fontSize: { xs: "1.1rem", sm: "1.3rem" },
//                 }}
//               >
//                 {formatCurrency(summary.totalPaid)}
//               </Typography>
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
//               >
//                 Received from customers
//               </Typography>
//             </MetricCard>
//           </Grid>

//           <Grid size={{ xs: 6, sm: 6, md: 3 }}>
//             <MetricCard accentcolor="#34d399">
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={0.5}
//               >
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.7rem",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   Pending Balance
//                 </Typography>
//                 <AccountBalanceWallet
//                   sx={{ color: "#34d399", fontSize: 20 }}
//                 />
//               </Box>
//               <Typography
//                 sx={{
//                   color: "#34d399",
//                   fontWeight: 800,
//                   fontSize: { xs: "1.1rem", sm: "1.3rem" },
//                 }}
//               >
//                 {formatCurrency(summary.totalBalance)}
//               </Typography>
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
//               >
//                 You'll receive
//               </Typography>
//             </MetricCard>
//           </Grid>

//           <Grid size={{ xs: 6, sm: 6, md: 3 }}>
//             <MetricCard accentcolor="#fbbf24">
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={0.5}
//               >
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.7rem",
//                     fontWeight: 700,
//                     textTransform: "uppercase",
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   Customers
//                 </Typography>
//                 <People sx={{ color: "#fbbf24", fontSize: 20 }} />
//               </Box>
//               <Typography
//                 sx={{
//                   color: "#fbbf24",
//                   fontWeight: 800,
//                   fontSize: { xs: "1.1rem", sm: "1.3rem" },
//                 }}
//               >
//                 {summary.totalCustomers}
//               </Typography>
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.68rem", mt: 0.3 }}
//               >
//                 Active accounts
//               </Typography>
//             </MetricCard>
//           </Grid>
//         </Grid>

//         {/* FILTER BAR */}
//         <FilterBar>
//           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
//             <StyledSearch
//               placeholder="Search customer by name or phone..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: "#6b7280", fontSize: 18 }} />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Box
//               sx={{
//                 ml: { md: "auto" },
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1.2,
//               }}
//             >
//               <Box sx={{ minWidth: 200 }}>
//                 <Select
//                   value={selectedCustomer}
//                   onChange={(e) => {
//                     setSelectedCustomer(e.target.value);
//                     setPage(1);
//                   }}
//                   size="small"
//                   renderValue={(selected) => {
//                     if (selected === "all") return "All Customers";
//                     const c = customers.find((x) => x._id === selected);
//                     return c
//                       ? c.companyName || c.displayName || "Unknown"
//                       : "Select Customer";
//                   }}
//                   sx={{
//                     backgroundColor: "#090d16",
//                     color: "#ffffff",
//                     borderRadius: "10px",
//                     height: "38px",
//                     fontSize: "0.8rem",
//                     minWidth: "100%",
//                     "& .MuiOutlinedInput-notchedOutline": {
//                       borderColor: "rgba(255, 255, 255, 0.1)",
//                     },
//                     "&:hover .MuiOutlinedInput-notchedOutline": {
//                       borderColor: "rgba(56, 189, 248, 0.4)",
//                     },
//                     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                       borderColor: "#38bdf8",
//                     },
//                     "& .MuiSvgIcon-root": { color: "#9ca3af" },
//                   }}
//                   MenuProps={{
//                     PaperProps: {
//                       sx: {
//                         bgcolor: "#111827",
//                         border: "1px solid rgba(255, 255, 255, 0.08)",
//                         maxHeight: 320,
//                         "& .MuiMenuItem-root": {
//                           color: "#e5e7eb",
//                           fontSize: "0.85rem",
//                           "&:hover": { bgcolor: "rgba(56, 189, 248, 0.1)" },
//                           "&.Mui-selected": {
//                             bgcolor: "rgba(56, 189, 248, 0.15)",
//                             color: "#38bdf8",
//                           },
//                         },
//                       },
//                     },
//                   }}
//                 >
//                   <MenuItem value="all">All Customers</MenuItem>
//                   {customers.map((c) => (
//                     <MenuItem key={c._id} value={c._id}>
//                       {c.companyName || c.displayName || "Unknown"}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </Box>

//               <Button
//                 size="small"
//                 variant="outlined"
//                 startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
//                 onClick={handleClearFilters}
//                 disabled={!hasFilter}
//                 sx={{
//                   color: "#9ca3af",
//                   borderColor: "rgba(255, 255, 255, 0.15)",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "8px",
//                   px: 1.5,
//                   height: "38px",
//                   fontSize: "0.75rem",
//                   "&:hover": {
//                     borderColor: "#f43f5e",
//                     color: "#f43f5e",
//                     bgcolor: "rgba(244, 63, 94, 0.08)",
//                   },
//                   "&.Mui-disabled": {
//                     color: "rgba(156, 163, 175, 0.4)",
//                     borderColor: "rgba(255, 255, 255, 0.05)",
//                   },
//                 }}
//               >
//                 Clear
//               </Button>
//             </Box>
//           </Box>
//         </FilterBar>

//         {/* MAIN TABLE */}
//         <TableContainerDark>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             px={3}
//             py={1.5}
//             sx={{
//               borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <Typography
//               sx={{ fontWeight: 800, fontSize: "0.9rem", letterSpacing: 0.5 }}
//             >
//               CUSTOMER SUMMARY
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
//                 height: "24px",
//               }}
//             />
//           </Box>

//           <TableScrollArea>
//             <ItemsTable>
//               <thead>
//                 <tr>
//                   <th style={{ textAlign: "center", width: "50px" }}>#</th>
//                   <th>Customer Name</th>
//                   <th style={{ textAlign: "right", width: "150px" }}>
//                     Total Sell
//                   </th>
//                   <th style={{ textAlign: "right", width: "150px" }}>
//                     Total Paid
//                   </th>
//                   <th style={{ textAlign: "right", width: "160px" }}>
//                     Balance
//                   </th>
//                   <th style={{ textAlign: "center", width: "140px" }}>
//                     Entries
//                   </th>
//                   <th style={{ textAlign: "center", width: "60px" }}></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       style={{ textAlign: "center", padding: 40 }}
//                     >
//                       <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
//                       >
//                         Loading ledger...
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : summaries.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       style={{ textAlign: "center", padding: 40 }}
//                     >
//                       <ReceiptLong
//                         style={{
//                           fontSize: 44,
//                           color: "#374151",
//                           marginBottom: 8,
//                         }}
//                       />
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.9rem" }}
//                       >
//                         No customers found
//                       </Typography>
//                       <Typography
//                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
//                       >
//                         {hasFilter
//                           ? "Try changing the search or filter"
//                           : "Add customers to get started"}
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   summaries.map((s, idx) => {
//                     const balancePositive = s.balance > 0;
//                     const balanceZero = s.balance === 0;

//                     return (
//                       <ClickableRow
//                         key={s._id}
//                         onClick={() =>
//                           navigate(`/customer-ledger/${s.customerId}`)
//                         }
//                       >
//                         <td style={{ textAlign: "center", color: "#6b7280" }}>
//                           {(page - 1) * limit + idx + 1}
//                         </td>
//                         <td>
//                           <Box display="flex" alignItems="center" gap={1}>
//                             <Box
//                               sx={{
//                                 width: 32,
//                                 height: 32,
//                                 borderRadius: "8px",
//                                 bgcolor: "rgba(56, 189, 248, 0.1)",
//                                 color: "#38bdf8",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 flexShrink: 0,
//                               }}
//                             >
//                               <Person sx={{ fontSize: 16 }} />
//                             </Box>
//                             <Box>
//                               <Typography
//                                 sx={{
//                                   color: "#ffffff",
//                                   fontWeight: 700,
//                                   fontSize: "0.88rem",
//                                 }}
//                               >
//                                 {s.customerName}
//                               </Typography>
//                               {s.phone && (
//                                 <Typography
//                                   sx={{
//                                     color: "#6b7280",
//                                     fontSize: "0.68rem",
//                                     mt: 0.1,
//                                   }}
//                                 >
//                                   📞 {s.phone}
//                                 </Typography>
//                               )}
//                             </Box>
//                           </Box>
//                         </td>
//                         <td style={{ textAlign: "right" }}>
//                           <Typography
//                             sx={{
//                               color: "#38bdf8",
//                               fontWeight: 800,
//                               fontSize: "0.9rem",
//                             }}
//                           >
//                             {formatCurrency(s.totalSellAmount)}
//                           </Typography>
//                         </td>
//                         <td style={{ textAlign: "right" }}>
//                           <Typography
//                             sx={{
//                               color: "#f43f5e",
//                               fontWeight: 800,
//                               fontSize: "0.9rem",
//                             }}
//                           >
//                             {formatCurrency(s.totalRecievedAmount)}
//                           </Typography>
//                         </td>
//                         <td style={{ textAlign: "right" }}>
//                           <Chip
//                             label={
//                               balanceZero
//                                 ? "Settled"
//                                 : balancePositive
//                                 ? `Receive ${formatCurrency(s.balance)}`
//                                 : `Pay ${formatCurrency(s.balance)}`
//                             }
//                             size="small"
//                             sx={{
//                               bgcolor: balanceZero
//                                 ? "rgba(156, 163, 175, 0.15)"
//                                 : balancePositive
//                                 ? "rgba(52, 211, 153, 0.15)"
//                                 : "rgba(251, 191, 36, 0.15)",
//                               color: balanceZero
//                                 ? "#9ca3af"
//                                 : balancePositive
//                                 ? "#34d399"
//                                 : "#fbbf24",
//                               border: balanceZero
//                                 ? "1px solid rgba(156, 163, 175, 0.3)"
//                                 : balancePositive
//                                 ? "1px solid rgba(52, 211, 153, 0.4)"
//                                 : "1px solid rgba(251, 191, 36, 0.4)",
//                               fontWeight: 800,
//                               fontSize: "0.75rem",
//                               height: "26px",
//                             }}
//                           />
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Chip
//                             label={`${s.numberOfEntries || 0} entries`}
//                             size="small"
//                             sx={{
//                               bgcolor: "rgba(192, 132, 252, 0.1)",
//                               color: "#c084fc",
//                               border: "1px solid rgba(192, 132, 252, 0.3)",
//                               fontWeight: 600,
//                               fontSize: "0.7rem",
//                               height: "24px",
//                             }}
//                           />
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <ArrowForward
//                             className="arrow-icon"
//                             sx={{
//                               color: "#6b7280",
//                               fontSize: 18,
//                               transition: "all 0.2s ease",
//                             }}
//                           />
//                         </td>
//                       </ClickableRow>
//                     );
//                   })
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
//               py: 1.5,
//               borderTop: "1px solid rgba(255, 255, 255, 0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <Box display="flex" alignItems="center" gap={1.2}>
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
//                     bgcolor: "rgba(56, 189, 248, 0.1)",
//                     color: "#38bdf8",
//                   },
//                 },
//                 "& .Mui-selected": {
//                   bgcolor: "rgba(56, 189, 248, 0.2) !important",
//                   color: "#38bdf8 !important",
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
//     </Box>
//   );
// };

// export default CustomerLedger;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Pagination,
  Tooltip,
  Fab,
  MenuItem,
  Select,
  InputAdornment,
  TextField,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  ArrowBack,
  Home as HomeIcon,
  Refresh as RefreshIcon,
  Clear as ClearIcon,
  AccountBalanceWallet,
  ReceiptLong,
  Person,
  ArrowForward,
  ShoppingCart,
  Payments,
  People,
  Search as SearchIcon,
} from "@mui/icons-material";

// ===================== TYPES =====================
interface Customer {
  _id: string;
  companyName?: string;
  displayName?: string;
  phone?: string;
  email?: string;
}

interface CustomerSummary {
  _id: string;
  customerId: string;
  customerName: string;
  phone?: string;
  totalSellAmount: number;
  totalRecievedAmount: number;
  balance: number;
  numberOfEntries: number;
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

const MetricCard = styled(Box)<{ accentcolor: string }>(
  ({ accentcolor, theme }) => ({
    backgroundColor: isDark(theme) ? "#111827" : "#ffffff",
    borderRadius: "12px",
    border: isDark(theme)
      ? "1px solid rgba(255, 255, 255, 0.08)"
      : "1px solid rgba(15, 23, 42, 0.08)",
    padding: "14px 18px",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: `0 12px 28px ${accentcolor}22`,
      borderColor: accentcolor,
    },
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
  minHeight: 0,
  marginBottom: "16px",
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
    "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
    "& tbody td": {
      color: dark ? "#e5e7eb" : "#334155",
      fontSize: "0.85rem",
      padding: "12px",
      textAlign: "left",
    },
  };
});

const ClickableRow = styled("tr")(({ theme }) => ({
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(56, 189, 248, 0.08) !important",
    "& .arrow-icon": {
      transform: "translateX(4px)",
      color: isDark(theme) ? "#38bdf8" : "#0ea5e9",
    },
  },
}));

const StyledSearch = styled(TextField)(({ theme }) => ({
  width: "100%",
  maxWidth: 320,
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: isDark(theme) ? "#090d16" : "#f8fafc",
    color: isDark(theme) ? "#ffffff" : "#0f172a",
    height: "38px",
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
    fontSize: "0.8rem",
    padding: "8px 12px",
    "&::placeholder": {
      color: isDark(theme) ? "#6b7280" : "#94a3b8",
      opacity: 1,
    },
  },
}));

// ===================== HELPERS =====================
const formatCurrency = (amount: number) =>
  `₹ ${Math.abs(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// ===================== MAIN COMPONENT =====================
const CustomerLedger: React.FC = () => {
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
    skyIconBg: dark ? "#0c2a3a" : "#e0f2fe",
    skyText: dark ? "#38bdf8" : "#0284c7",
    chipBgSoft: dark
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(15, 23, 42, 0.04)",
    dropdownBg: dark ? "#111827" : "#ffffff",
  };

  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState<CustomerSummary[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Filters
  const [selectedCustomer, setSelectedCustomer] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Summary totals
  const [summary, setSummary] = useState({
    totalSell: 0,
    totalPaid: 0,
    totalBalance: 0,
    totalCustomers: 0,
  });

  // ===================== FETCH LEDGER =====================
  const fetchData = async () => {
    setLoading(true);

    try {
      const params: any = { page, limit };
      if (selectedCustomer !== "all") params.customerId = selectedCustomer;
      if (search.trim()) params.search = search.trim();

      const res = await axios.get(`${API_URL}/customer-ledger/summary`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.status === true || res.data?.success === true) {
        const list = res.data.data || [];

        const mapped: CustomerSummary[] = list.map((item: any) => ({
          _id: item._id,
          customerId:
            typeof item.customerId === "object"
              ? item.customerId._id
              : item.customerId,
          customerName: item.customerName || "Unknown",
          phone:
            (typeof item.customerId === "object" && item.customerId?.phone) ||
            item.phone ||
            "",
          totalSellAmount: item.totalSellAmount || 0,
          totalRecievedAmount: item.totalRecievedAmount || 0,
          balance: item.balance || 0,
          numberOfEntries: item.numberOfEntries || 0,
          createdAt: item.createdAt,
        }));

        setSummaries(mapped);

        const count = res.data.totalCount ?? res.data.total ?? list.length ?? 0;
        const pages =
          res.data.totalPages ??
          Math.max(1, Math.ceil((count || 0) / limit));
        setTotalCount(count);
        setTotalPages(pages);

        if (res.data.totals) {
          setSummary({
            totalSell: res.data.totals.totalSell ?? 0,
            totalPaid: res.data.totals.totalPaid ?? 0,
            totalBalance: res.data.totals.totalBalance ?? 0,
            totalCustomers: res.data.totals.totalCustomers ?? count,
          });
        } else {
          setSummary({
            totalSell: mapped.reduce((s, x) => s + x.totalSellAmount, 0),
            totalPaid: mapped.reduce((s, x) => s + x.totalRecievedAmount, 0),
            totalBalance: mapped.reduce((s, x) => s + x.balance, 0),
            totalCustomers: count,
          });
        }
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load ledger");
        setSummaries([]);
      }
    } catch (err: any) {
      console.error("Fetch ledger error:", err);
      if (err.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(err.response?.data?.message || "Failed to load ledger");
      }
      setSummaries([]);
    } finally {
      setLoading(false);
    }
  };

  // ===================== FETCH CUSTOMERS (dropdown) =====================
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(`${API_URL}/customer`, {
          params: { page: 1, limit: 500 },
          ...getAuthHeaders(),
        });
        if (res.data?.success || res.data?.status) {
          setCustomers(res.data.data || []);
        }
      } catch (err) {
        console.error("Fetch customers error:", err);
      }
    };
    fetchCustomers();
  }, []);

  // ===================== DEBOUNCED FETCH =====================
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      fetchData();
    }, search ? 300 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, selectedCustomer, search]);

  // ===================== FILTERS =====================
  const handleClearFilters = () => {
    setSearch("");
    setSelectedCustomer("all");
    setPage(1);
  };

  const hasFilter = selectedCustomer !== "all" || search.trim().length > 0;

  // ===================== RENDER =====================
  return (
    <Box
      sx={{
        height: "85vh",
        maxHeight: "100vh",
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
        {/* HEADER */}
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
                  <ReceiptLong />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: c.skyText,
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                  >
                    Accounts · Customer Wise
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
                      color: c.text,
                    }}
                  >
                    CUSTOMER LEDGER
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
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
          </Box>
        </DarkBanner>

        {/* METRIC CARDS */}
        <Grid container spacing={1.5} sx={{ mb: 1.5, flexShrink: 0 }}>
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <MetricCard accentcolor="#38bdf8">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={0.5}
              >
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Total Sell
                </Typography>
                <ShoppingCart sx={{ color: c.skyText, fontSize: 20 }} />
              </Box>
              <Typography
                sx={{
                  color: c.skyText,
                  fontWeight: 800,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                }}
              >
                {formatCurrency(summary.totalSell)}
              </Typography>
              <Typography
                sx={{ color: c.mutedDark, fontSize: "0.68rem", mt: 0.3 }}
              >
                Credit / Udhaar
              </Typography>
            </MetricCard>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <MetricCard accentcolor="#f43f5e">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={0.5}
              >
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Total Paid
                </Typography>
                <Payments sx={{ color: "#f43f5e", fontSize: 20 }} />
              </Box>
              <Typography
                sx={{
                  color: "#f43f5e",
                  fontWeight: 800,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                }}
              >
                {formatCurrency(summary.totalPaid)}
              </Typography>
              <Typography
                sx={{ color: c.mutedDark, fontSize: "0.68rem", mt: 0.3 }}
              >
                Received from customers
              </Typography>
            </MetricCard>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <MetricCard accentcolor="#34d399">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={0.5}
              >
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Pending Balance
                </Typography>
                <AccountBalanceWallet
                  sx={{
                    color: dark ? "#34d399" : "#059669",
                    fontSize: 20,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  color: dark ? "#34d399" : "#059669",
                  fontWeight: 800,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                }}
              >
                {formatCurrency(summary.totalBalance)}
              </Typography>
              <Typography
                sx={{ color: c.mutedDark, fontSize: "0.68rem", mt: 0.3 }}
              >
                You'll receive
              </Typography>
            </MetricCard>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <MetricCard accentcolor="#fbbf24">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={0.5}
              >
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Customers
                </Typography>
                <People
                  sx={{
                    color: dark ? "#fbbf24" : "#d97706",
                    fontSize: 20,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  color: dark ? "#fbbf24" : "#d97706",
                  fontWeight: 800,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                }}
              >
                {summary.totalCustomers}
              </Typography>
              <Typography
                sx={{ color: c.mutedDark, fontSize: "0.68rem", mt: 0.3 }}
              >
                Active accounts
              </Typography>
            </MetricCard>
          </Grid>
        </Grid>

        {/* FILTER BAR */}
        <FilterBar>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
            <StyledSearch
              placeholder="Search customer by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: c.mutedDark, fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                ml: { md: "auto" },
                display: "flex",
                alignItems: "center",
                gap: 1.2,
              }}
            >
              <Box sx={{ minWidth: 200 }}>
                <Select
                  value={selectedCustomer}
                  onChange={(e) => {
                    setSelectedCustomer(e.target.value);
                    setPage(1);
                  }}
                  size="small"
                  renderValue={(selected) => {
                    if (selected === "all") return "All Customers";
                    const cus = customers.find((x) => x._id === selected);
                    return cus
                      ? cus.companyName || cus.displayName || "Unknown"
                      : "Select Customer";
                  }}
                  sx={{
                    backgroundColor: c.bannerBg,
                    color: c.text,
                    borderRadius: "10px",
                    height: "38px",
                    fontSize: "0.8rem",
                    minWidth: "100%",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: c.border10,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(56, 189, 248, 0.4)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#0ea5e9",
                    },
                    "& .MuiSvgIcon-root": { color: c.muted },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: c.dropdownBg,
                        border: `1px solid ${c.border08}`,
                        maxHeight: 320,
                        "& .MuiMenuItem-root": {
                          color: c.textSec,
                          fontSize: "0.85rem",
                          "&:hover": {
                            bgcolor: "rgba(56, 189, 248, 0.1)",
                          },
                          "&.Mui-selected": {
                            bgcolor: "rgba(56, 189, 248, 0.15)",
                            color: c.skyText,
                          },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="all">All Customers</MenuItem>
                  {customers.map((cus) => (
                    <MenuItem key={cus._id} value={cus._id}>
                      {cus.companyName || cus.displayName || "Unknown"}
                    </MenuItem>
                  ))}
                </Select>
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
                  height: "38px",
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
          </Box>
        </FilterBar>

        {/* MAIN TABLE */}
        <TableContainerDark>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
            py={1.5}
            sx={{
              borderBottom: `1px solid ${c.border08}`,
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: 0.5,
                color: c.text,
              }}
            >
              CUSTOMER SUMMARY
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
                height: "24px",
              }}
            />
          </Box>

          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th>Customer Name</th>
                  <th style={{ textAlign: "right", width: "150px" }}>
                    Total Sell
                  </th>
                  <th style={{ textAlign: "right", width: "150px" }}>
                    Total Paid
                  </th>
                  <th style={{ textAlign: "right", width: "160px" }}>
                    Balance
                  </th>
                  <th style={{ textAlign: "center", width: "140px" }}>
                    Entries
                  </th>
                  <th style={{ textAlign: "center", width: "60px" }}></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: 40 }}
                    >
                      <CircularProgress sx={{ color: "#0ea5e9" }} size={32} />
                      <Typography
                        sx={{ color: c.muted, fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading ledger...
                      </Typography>
                    </td>
                  </tr>
                ) : summaries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: 40 }}
                    >
                      <ReceiptLong
                        style={{
                          fontSize: 44,
                          color: c.veryMuted,
                          marginBottom: 8,
                        }}
                      />
                      <Typography
                        sx={{ color: c.muted, fontSize: "0.9rem" }}
                      >
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
                          : "Add customers to get started"}
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  summaries.map((s, idx) => {
                    const balancePositive = s.balance > 0;
                    const balanceZero = s.balance === 0;

                    return (
                      <ClickableRow
                        key={s._id}
                        onClick={() =>
                          navigate(`/customer-ledger/${s.customerId}`)
                        }
                      >
                        <td style={{ textAlign: "center", color: c.mutedDark }}>
                          {(page - 1) * limit + idx + 1}
                        </td>
                        <td>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                bgcolor: "rgba(56, 189, 248, 0.1)",
                                color: c.skyText,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <Person sx={{ fontSize: 16 }} />
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  color: c.text,
                                  fontWeight: 700,
                                  fontSize: "0.88rem",
                                }}
                              >
                                {s.customerName}
                              </Typography>
                              {s.phone && (
                                <Typography
                                  sx={{
                                    color: c.mutedDark,
                                    fontSize: "0.68rem",
                                    mt: 0.1,
                                  }}
                                >
                                  📞 {s.phone}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <Typography
                            sx={{
                              color: c.skyText,
                              fontWeight: 800,
                              fontSize: "0.9rem",
                            }}
                          >
                            {formatCurrency(s.totalSellAmount)}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <Typography
                            sx={{
                              color: "#f43f5e",
                              fontWeight: 800,
                              fontSize: "0.9rem",
                            }}
                          >
                            {formatCurrency(s.totalRecievedAmount)}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <Chip
                            label={
                              balanceZero
                                ? "Settled"
                                : balancePositive
                                ? `Receive ${formatCurrency(s.balance)}`
                                : `Pay ${formatCurrency(s.balance)}`
                            }
                            size="small"
                            sx={{
                              bgcolor: balanceZero
                                ? "rgba(156, 163, 175, 0.15)"
                                : balancePositive
                                ? "rgba(52, 211, 153, 0.15)"
                                : "rgba(251, 191, 36, 0.15)",
                              color: balanceZero
                                ? c.muted
                                : balancePositive
                                ? dark
                                  ? "#34d399"
                                  : "#059669"
                                : dark
                                ? "#fbbf24"
                                : "#d97706",
                              border: balanceZero
                                ? "1px solid rgba(156, 163, 175, 0.3)"
                                : balancePositive
                                ? "1px solid rgba(52, 211, 153, 0.4)"
                                : "1px solid rgba(251, 191, 36, 0.4)",
                              fontWeight: 800,
                              fontSize: "0.75rem",
                              height: "26px",
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Chip
                            label={`${s.numberOfEntries || 0} entries`}
                            size="small"
                            sx={{
                              bgcolor: "rgba(192, 132, 252, 0.1)",
                              color: dark ? "#c084fc" : "#7e22ce",
                              border: "1px solid rgba(192, 132, 252, 0.3)",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              height: "24px",
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <ArrowForward
                            className="arrow-icon"
                            sx={{
                              color: c.mutedDark,
                              fontSize: 18,
                              transition: "all 0.2s ease",
                            }}
                          />
                        </td>
                      </ClickableRow>
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
              borderTop: `1px solid ${c.border08}`,
              flexShrink: 0,
            }}
          >
            <Box display="flex" alignItems="center" gap={1.2}>
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
                        ? "rgba(56, 189, 248, 0.2)"
                        : c.chipBgSoft,
                    color: limit === n ? c.skyText : c.muted,
                    border:
                      limit === n
                        ? "1px solid rgba(56, 189, 248, 0.5)"
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
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    color: c.skyText,
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(56, 189, 248, 0.2) !important",
                  color: `${c.skyText} !important`,
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
    </Box>
  );
};

export default CustomerLedger;