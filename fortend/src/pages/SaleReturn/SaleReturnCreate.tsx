




// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   Box,
//   Button,
//   Typography,
//   Grid,
//   TextField,
//   Chip,
//   IconButton,
//   InputAdornment,
//   CircularProgress,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   ArrowBack,
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Search,
//   AssignmentReturn,
//   Receipt,
//   Save as SaveIcon,
// } from "@mui/icons-material";

// // ===================== TYPES =====================

// interface Product {
//   _id: string;
//   itemName: string;
//   mrp: number;
//   rate: number;
//   unit?: string;
// }

// interface ReturnRow {
//   productId: string;
//   itemName: string;
//   mrp: number;
//   rate: number;
//   quantity: number;
//   totalAmount: number;
// }

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const getAuthHeaders = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
//   },
// });

// const todayStr = () => new Date().toISOString().split("T")[0];

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

// /* ✅ FormCard — mobile pe khud scroll ho jaaye */
// const FormCard = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "20px",
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
//     "& fieldset": {
//       borderColor: "rgba(255, 255, 255, 0.1)",
//     },
//     "&:hover fieldset": {
//       borderColor: "rgba(56, 189, 248, 0.4)",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#38bdf8",
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
//     "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
//       WebkitAppearance: "none",
//       margin: 0,
//     },
//     "&[type=number]": {
//       MozAppearance: "textfield",
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
//   "& tbody tr:hover": {
//     backgroundColor: "rgba(56, 189, 248, 0.03)",
//   },
//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "12px",
//     textAlign: "left",
//     whiteSpace: "nowrap",
//   },
// }));

// const FooterBar = styled(Box)(() => ({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   gap: "16px",
//   flexWrap: "wrap",
//   flexShrink: 0,
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(56, 189, 248, 0.3)",
//   padding: "16px 24px",
//   boxShadow: "0 8px 20px rgba(56, 189, 248, 0.1)",
// }));

// // ===================== MAIN COMPONENT =====================

// const ReturnItemsEntry: React.FC = () => {
//   const navigate = useNavigate();

//   // Item form
//   const [productSearch, setProductSearch] = useState("");
//   const [searchResults, setSearchResults] = useState<Product[]>([]);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   const [mrp, setMrp] = useState<number | "">("");
//   const [rate, setRate] = useState<number | "">("");
//   const [qty, setQty] = useState<number | "">("");

//   // ✅ Return Date
//   const [returnDate, setReturnDate] = useState<string>(todayStr());

//   // Rows
//   const [rows, setRows] = useState<ReturnRow[]>([]);
//   const [saving, setSaving] = useState(false);

//   const searchRef = useRef<HTMLDivElement>(null);
//   const justSelectedRef = useRef(false);

//   // ============== Outside click handler ==============
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
//         setShowSearchResults(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // ============== Search products ==============
//   useEffect(() => {
//     if (justSelectedRef.current) {
//       justSelectedRef.current = false;
//       return;
//     }

//     if (!productSearch.trim() || productSearch.length < 1) {
//       setSearchResults([]);
//       setShowSearchResults(false);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         const res = await axios.get(`${API_URL}/product`, {
//           params: { search: productSearch, page: 1, limit: 20 },
//           ...getAuthHeaders(),
//         });

//         if (res.data?.success) {
//           setSearchResults(res.data.data || []);
//           setShowSearchResults(true);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [productSearch]);

//   // ============== Select product ==============
//   const handleSelectProduct = (p: Product) => {
//     justSelectedRef.current = true;
//     setSelectedProduct(p);
//     setProductSearch(p.itemName);
//     setMrp(p.mrp || "");
//     setRate(p.rate || "");
//     setSearchResults([]);
//     setShowSearchResults(false);
//   };

//   // ============== Live return amount ==============
//   const currentReturnAmount = (Number(rate) || 0) * (Number(qty) || 0);

//   // ============== Add Return Item ==============
//   const handleAddItem = () => {
//     if (!selectedProduct) {
//       toast.error("Please select an item first");
//       return;
//     }
//     if (!qty || Number(qty) <= 0) {
//       toast.error("Please enter a valid quantity");
//       return;
//     }
//     if (!rate || Number(rate) < 0) {
//       toast.error("Please enter a valid rate");
//       return;
//     }

//     const quantity = Number(qty);
//     const finalRate = Number(rate);
//     const finalMrp = Number(mrp) || 0;
//     const totalAmount = quantity * finalRate;

//     setRows([
//       ...rows,
//       {
//         productId: selectedProduct._id,
//         itemName: selectedProduct.itemName,
//         mrp: finalMrp,
//         rate: finalRate,
//         quantity,
//         totalAmount,
//       },
//     ]);

//     justSelectedRef.current = true;
//     setSelectedProduct(null);
//     setProductSearch("");
//     setMrp("");
//     setRate("");
//     setQty("");
//     setSearchResults([]);
//     setShowSearchResults(false);
//     toast.success("Item added to return list");
//   };

//   const removeRow = (index: number) => {
//     setRows(rows.filter((_, i) => i !== index));
//     toast.success("Item removed");
//   };

//   const totalReturnValue = rows.reduce((sum, r) => sum + r.totalAmount, 0);

//   // ============== SAVE ==============
//   const handleSave = async () => {
//     if (rows.length === 0) {
//       toast.error("Please add at least one return item");
//       return;
//     }
//     if (!returnDate) {
//       toast.error("Please select a return date");
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         items: rows.map((r) => ({
//           productId: r.productId,
//           itemName: r.itemName,
//           mrp: r.mrp,
//           rate: r.rate,
//           quantity: r.quantity,
//           totalAmount: r.totalAmount,
//         })),
//         totalReturnValue,
//         date: returnDate,
//       };

//       const res = await axios.post(
//         `${API_URL}/return-items`,
//         payload,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success("Return entry saved successfully! 🎉");
//         setTimeout(() => navigate("/dashboard"), 1200);
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to save return");
//       }
//     } catch (error: any) {
//       console.error(error);
//       if (!error.response) {
//         toast.error("Network error! Please check your connection");
//       } else if (error.response?.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(error.response?.data?.message || "Failed to save return");
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ===================== RENDER =====================
//   return (
//     <Box
//       sx={{
//         // ✅ FIX: page never scrolls
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
//                   <AssignmentReturn />
//                 </Box>
//                 <Typography
//                   variant="h5"
//                   fontWeight="800"
//                   sx={{
//                     fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   2. RETURN ITEMS ENTRY
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* ================= FORM CARD ================= */}
//         <FormCard>
//           {/* Section heading */}
//           <Box display="flex" alignItems="center" gap={1} mb={2.5}>
//             <Box
//               sx={{
//                 width: 30,
//                 height: 30,
//                 borderRadius: "8px",
//                 bgcolor: "#0c2a3a",
//                 color: "#38bdf8",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "0.9rem",
//               }}
//             >
//               📘
//             </Box>
//             <Typography
//               sx={{
//                 color: "#38bdf8",
//                 fontWeight: 800,
//                 fontSize: "0.85rem",
//                 letterSpacing: 1,
//                 textTransform: "uppercase",
//               }}
//             >
//               Log Returned / Unsold Stock
//             </Typography>
//           </Box>

//           {/* Form Grid — ✅ integer md values */}
//           <Grid container spacing={2} alignItems="flex-end">
//             {/* ITEM NAME */}
//             <Grid
//               size={{ xs: 12, sm: 12, md: 4 }}
//               ref={searchRef}
//               sx={{ position: "relative" }}
//             >
//               <FieldLabel>Item Name</FieldLabel>

//               <StyledTextField
//                 fullWidth
//                 placeholder="Select or type item name"
//                 value={productSearch}
//                 onChange={(e) => {
//                   setProductSearch(e.target.value);
//                   if (selectedProduct) setSelectedProduct(null);
//                 }}
//                 onFocus={() => {
//                   if (
//                     !selectedProduct &&
//                     productSearch.trim() &&
//                     searchResults.length > 0
//                   ) {
//                     setShowSearchResults(true);
//                   }
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Search sx={{ color: "#6b7280", fontSize: 18 }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {/* Search Dropdown */}
//               {showSearchResults && searchResults.length > 0 && (
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
//                     maxHeight: "280px",
//                     overflowY: "auto",
//                     zIndex: 50,
//                     boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
//                   }}
//                 >
//                   {searchResults.map((p) => (
//                     <Box
//                       key={p._id}
//                       onClick={() => handleSelectProduct(p)}
//                       sx={{
//                         px: 2,
//                         py: 1.2,
//                         cursor: "pointer",
//                         borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//                         "&:hover": {
//                           bgcolor: "rgba(56, 189, 248, 0.1)",
//                         },
//                         "&:last-child": {
//                           borderBottom: "none",
//                         },
//                       }}
//                     >
//                       <Box display="flex" justifyContent="space-between">
//                         <Typography
//                           sx={{
//                             color: "#ffffff",
//                             fontSize: "0.85rem",
//                             fontWeight: 600,
//                           }}
//                         >
//                           {p.itemName}
//                         </Typography>

//                         <Typography
//                           sx={{
//                             color: "#9ca3af",
//                             fontSize: "0.75rem",
//                           }}
//                         >
//                           MRP: ₹{p.mrp}
//                         </Typography>
//                       </Box>

//                       <Typography
//                         sx={{
//                           color: "#9ca3af",
//                           fontSize: "0.7rem",
//                           mt: 0.3,
//                         }}
//                       >
//                         Rate: ₹{p.rate}
//                       </Typography>
//                     </Box>
//                   ))}
//                 </Box>
//               )}

//               {showSearchResults &&
//                 productSearch.trim() &&
//                 searchResults.length === 0 && (
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: "100%",
//                       left: 0,
//                       right: 0,
//                       mt: 0.5,
//                       bgcolor: "#111827",
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       borderRadius: "10px",
//                       p: 2,
//                       zIndex: 50,
//                       boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
//                     }}
//                   >
//                     <Typography sx={{ color: "#9ca3af", fontSize: "0.8rem" }}>
//                       No items found
//                     </Typography>
//                   </Box>
//                 )}
//             </Grid>

//             {/* MRP */}
//             <Grid size={{ xs: 6, sm: 6, md: 1 }}>
//               <FieldLabel>MRP (₹)</FieldLabel>

//               <StyledTextField
//                 fullWidth
//                 type="number"
//                 placeholder="10"
//                 value={mrp}
//                 onChange={(e) =>
//                   setMrp(e.target.value === "" ? "" : Number(e.target.value))
//                 }
//                 inputProps={{ min: 0 }}
//               />
//             </Grid>

//             {/* RATE */}
//             <Grid size={{ xs: 6, sm: 6, md: 1 }}>
//               <FieldLabel>Rate (₹)</FieldLabel>

//               <StyledTextField
//                 fullWidth
//                 type="number"
//                 placeholder="50"
//                 value={rate}
//                 onChange={(e) =>
//                   setRate(e.target.value === "" ? "" : Number(e.target.value))
//                 }
//                 inputProps={{ min: 0 }}
//               />
//             </Grid>

//             {/* QTY */}
//             <Grid size={{ xs: 6, sm: 6, md: 1 }}>
//               <FieldLabel>Qty</FieldLabel>

//               <StyledTextField
//                 fullWidth
//                 type="number"
//                 placeholder="10"
//                 value={qty}
//                 onChange={(e) =>
//                   setQty(e.target.value === "" ? "" : Number(e.target.value))
//                 }
//                 inputProps={{ min: 0 }}
//               />
//             </Grid>

//             {/* RETURN AMOUNT */}
//             <Grid size={{ xs: 6, sm: 6, md: 2 }}>
//               <FieldLabel>Return Amount</FieldLabel>

//               <Box
//                 sx={{
//                   height: "42px",
//                   borderRadius: "10px",
//                   backgroundColor: "#090d16",
//                   border: "1px solid rgba(56, 189, 248, 0.2)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   px: 1.5,
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     color: currentReturnAmount > 0 ? "#38bdf8" : "#6b7280",
//                     fontWeight: 800,
//                     fontSize: "1rem",
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   ₹{" "}
//                   {currentReturnAmount.toLocaleString("en-IN", {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </Typography>
//               </Box>
//             </Grid>

//             {/* RETURN DATE */}
//             <Grid size={{ xs: 12, sm: 12, md: 3 }}>
//               <FieldLabel>Return Date *</FieldLabel>

//               <StyledTextField
//                 fullWidth
//                 type="date"
//                 value={returnDate}
//                 onChange={(e) => setReturnDate(e.target.value)}
//                 inputProps={{
//                   max: todayStr(),
//                 }}
//               />
//             </Grid>
//           </Grid>

//           {/* Add Button */}
//           <Box display="flex" justifyContent="flex-end" mt={2.5}>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleAddItem}
//               sx={{
//                 bgcolor: "#3b82f6",
//                 color: "#ffffff",
//                 fontWeight: 800,
//                 textTransform: "uppercase",
//                 letterSpacing: 0.5,
//                 borderRadius: "10px",
//                 px: 3,
//                 py: 1.2,
//                 fontSize: "0.8rem",
//                 boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
//                 "&:hover": {
//                   bgcolor: "#2563eb",
//                   boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
//                 },
//               }}
//             >
//               Add Return Item
//             </Button>
//           </Box>
//         </FormCard>

//         {/* ================= RETURNED ITEMS SHEET (SCROLLABLE) ================= */}
//         <TableContainerDark>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             px={3}
//             py={1.6}
//             sx={{
//               borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "#ffffff",
//                 fontWeight: 800,
//                 fontSize: "0.9rem",
//                 letterSpacing: 0.5,
//               }}
//             >
//               RETURNED ITEMS SHEET
//             </Typography>
//             <Chip
//               label={`${rows.length} Return Item${rows.length !== 1 ? "s" : ""}`}
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
//                   <th>Item Name</th>
//                   <th style={{ textAlign: "center" }}>MRP</th>
//                   <th style={{ textAlign: "center" }}>Rate (₹)</th>
//                   <th style={{ textAlign: "center" }}>Qty Returned</th>
//                   <th style={{ textAlign: "center" }}>Total Amount (₹)</th>
//                   <th style={{ textAlign: "center", width: "80px" }}>
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       style={{ textAlign: "center", padding: "40px 12px" }}
//                     >
//                       <Receipt
//                         style={{
//                           fontSize: 44,
//                           color: "#374151",
//                           marginBottom: 8,
//                         }}
//                       />
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.9rem" }}
//                       >
//                         No return items logged yet
//                       </Typography>
//                       <Typography
//                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
//                       >
//                         Add your first return item above
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   rows.map((row, idx) => (
//                     <tr key={idx}>
//                       <td style={{ textAlign: "center", color: "#6b7280" }}>
//                         {idx + 1}
//                       </td>
//                       <td>
//                         <Typography
//                           sx={{
//                             color: "#ffffff",
//                             fontWeight: 700,
//                             fontSize: "0.85rem",
//                           }}
//                         >
//                           {row.itemName}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <Chip
//                           label={`${row.mrp}RS`}
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
//                       <td style={{ textAlign: "center" }}>
//                         <Typography
//                           sx={{
//                             color: "#fbbf24",
//                             fontWeight: 700,
//                             fontSize: "0.85rem",
//                           }}
//                         >
//                           ₹ {row.rate.toFixed(2)}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <Typography
//                           sx={{
//                             color: "#38bdf8",
//                             fontWeight: 800,
//                             fontSize: "0.9rem",
//                           }}
//                         >
//                           {row.quantity}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <Typography
//                           sx={{
//                             color: "#38bdf8",
//                             fontWeight: 800,
//                             fontSize: "0.95rem",
//                           }}
//                         >
//                           ₹{" "}
//                           {row.totalAmount.toLocaleString("en-IN", {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                         </Typography>
//                       </td>
//                       <td style={{ textAlign: "center" }}>
//                         <IconButton
//                           size="small"
//                           onClick={() => removeRow(idx)}
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
//         </TableContainerDark>

//         {/* ================= FOOTER (Total + Actions) ================= */}
//         <FooterBar>
//           <Box>
//             <Typography
//               sx={{
//                 color: "#9ca3af",
//                 fontSize: "0.7rem",
//                 fontWeight: 700,
//                 letterSpacing: 1,
//                 textTransform: "uppercase",
//                 mb: 0.3,
//               }}
//             >
//               Total Return Value
//             </Typography>
//             <Typography
//               sx={{
//                 color: "#38bdf8",
//                 fontWeight: 900,
//                 fontSize: { xs: "1.3rem", sm: "1.6rem" },
//                 textShadow: "0 0 20px rgba(56, 189, 248, 0.4)",
//                 lineHeight: 1.2,
//               }}
//             >
//               ₹{" "}
//               {totalReturnValue.toLocaleString("en-IN", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//             </Typography>
//           </Box>

//           <Box display="flex" gap={1.5} flexWrap="wrap">
//             <Button
//               variant="outlined"
//               onClick={() => navigate("/dashboard")}
//               disabled={saving}
//               sx={{
//                 color: "#9ca3af",
//                 borderColor: "rgba(156, 163, 175, 0.3)",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "10px",
//                 px: 3,
//                 py: 1.2,
//                 "&:hover": {
//                   borderColor: "#9ca3af",
//                   bgcolor: "rgba(156, 163, 175, 0.08)",
//                 },
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               startIcon={
//                 saving ? (
//                   <CircularProgress size={16} sx={{ color: "#ffffff" }} />
//                 ) : (
//                   <SaveIcon />
//                 )
//               }
//               onClick={handleSave}
//               disabled={saving || rows.length === 0}
//               sx={{
//                 bgcolor: "#3b82f6",
//                 color: "#ffffff",
//                 fontWeight: 800,
//                 textTransform: "none",
//                 borderRadius: "10px",
//                 px: 3,
//                 py: 1.2,
//                 boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
//                 "&:hover": {
//                   bgcolor: "#2563eb",
//                   boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
//                 },
//                 "&.Mui-disabled": {
//                   bgcolor: "rgba(59, 130, 246, 0.3)",
//                   color: "rgba(255, 255, 255, 0.5)",
//                 },
//               }}
//             >
//               {saving ? "Saving..." : "Save Return Entry"}
//             </Button>
//           </Box>
//         </FooterBar>
//       </Box>
//     </Box>
//   );
// };

// export default ReturnItemsEntry;


import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  TextField,
  Chip,
  CircularProgress,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Search,
  Save as SaveIcon,
  FiberManualRecord,
  AssignmentReturn,
  ShoppingCart,
  Clear as ClearIcon,
  SelectAll as SelectAllIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface Product {
  _id: string;
  itemName: string;
  mrp: number;
  rate: number;
  unit?: string;
}

interface RowState {
  productId: string;
  itemName: string;
  mrp: number;
  unit: string;
  rate: number;
  qty: number;
  selected: boolean;
}

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
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  flexShrink: 0,
}));

const FilterBar = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "14px 16px",
  marginBottom: "14px",
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
    backgroundColor: "rgba(56, 189, 248, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(56, 189, 248, 0.5)" },
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
    backgroundColor: "#111827",
    color: "#9ca3af",
    fontWeight: 700,
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "14px 12px",
    whiteSpace: "nowrap",
    textAlign: "left",
  },
  "& tbody tr": {
    transition: "all 0.2s ease",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "10px 12px",
  },
}));

const SmallInput = styled("input")(() => ({
  width: "90px",
  padding: "8px 10px",
  borderRadius: "8px",
  backgroundColor: "#090d16",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "#ffffff",
  fontSize: "0.85rem",
  fontWeight: 700,
  textAlign: "center",
  outline: "none",
  transition: "all 0.2s ease",
  "&:focus": {
    borderColor: "#38bdf8",
    boxShadow: "0 0 0 3px rgba(56, 189, 248, 0.1)",
  },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&[type=number]": { MozAppearance: "textfield" },
}));

const FooterBar = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
  flexShrink: 0,
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(56, 189, 248, 0.3)",
  padding: "16px 20px",
  boxShadow: "0 8px 20px rgba(56, 189, 248, 0.1)",
}));

// ===================== MAIN =====================

const ReturnItemsEntry: React.FC = () => {
  const navigate = useNavigate();

  const [returnDate, setReturnDate] = useState<string>(todayStr());
  const [rows, setRows] = useState<RowState[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  // ===================== FETCH ALL PRODUCTS =====================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/product`, {
        params: { page: 1, limit: 10000 },
        ...getAuthHeaders(),
      });

      if (res.data?.success) {
        const products: Product[] = res.data.data || [];
        setRows(
          products.map((p) => ({
            productId: p._id,
            itemName: p.itemName,
            mrp: p.mrp || 0,
            unit: p.unit || "",
            rate: p.rate || 0,
            qty: 0,
            selected: false,
          }))
        );
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load products");
        setRows([]);
      }
    } catch (error: any) {
      console.error("Fetch products error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load products");
      }
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===================== ROW HANDLERS =====================
  const toggleRow = (idx: number) => {
    setRows((prev) => {
      const copy = [...prev];
      copy[idx].selected = !copy[idx].selected;
      if (copy[idx].selected && (!copy[idx].qty || copy[idx].qty <= 0)) {
        copy[idx].qty = 1;
      }
      return copy;
    });
  };

  const updateRow = (idx: number, field: "rate" | "qty", value: number) => {
    setRows((prev) => {
      const copy = [...prev];
      if (value < 0) value = 0;
      copy[idx][field] = value;
      if (field === "qty" && value > 0) {
        copy[idx].selected = true;
      }
      return copy;
    });
  };

  const selectAll = () => {
    setRows((prev) =>
      prev.map((r) => ({
        ...r,
        selected: true,
        qty: r.qty && r.qty > 0 ? r.qty : 1,
      }))
    );
  };

  const clearAll = () => {
    setRows((prev) => prev.map((r) => ({ ...r, selected: false, qty: 0 })));
  };

  // ===================== FILTER =====================
  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const s = search.trim().toLowerCase();
    return rows.filter((r) => r.itemName.toLowerCase().includes(s));
  }, [rows, search]);

  // ===================== TOTALS =====================
  const selectedRows = rows.filter((r) => r.selected && r.qty > 0);
  const grandTotal = selectedRows.reduce(
    (sum, r) => sum + Number(r.rate) * Number(r.qty),
    0
  );
  const totalQty = selectedRows.reduce((sum, r) => sum + Number(r.qty), 0);

  // ===================== SAVE =====================
  const handleSave = async () => {
    if (selectedRows.length === 0) {
      toast.error("Please select at least one item");
      return;
    }
    if (!returnDate) {
      toast.error("Please select a return date");
      return;
    }

    for (const r of selectedRows) {
      if (!r.qty || r.qty <= 0) {
        toast.error(`${r.itemName}: qty must be > 0`);
        return;
      }
      if (r.rate === null || r.rate === undefined || r.rate < 0) {
        toast.error(`${r.itemName}: invalid rate`);
        return;
      }
    }

    try {
      setSaving(true);

      const payload = {
        items: selectedRows.map((r) => ({
          productId: r.productId,
          itemName: r.itemName,
          mrp: r.mrp,
          rate: Number(r.rate),
          quantity: Number(r.qty),
          totalAmount: Number(r.rate) * Number(r.qty),
        })),
        totalReturnValue: grandTotal,
        date: returnDate,
      };

      const res = await axios.post(
        `${API_URL}/return-items`,
        payload,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success(
          `${selectedRows.length} item${
            selectedRows.length !== 1 ? "s" : ""
          } returned successfully! 🎉`
        );
        setTimeout(() => navigate("/dashboard"), 1000);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to save");
      }
    } catch (error: any) {
      console.error(error);
      if (!error.response) {
        toast.error("Network error! Please check your connection");
      } else if (error.response?.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(error.response?.data?.message || "Failed to save");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (selectedRows.length > 0) {
      if (
        !window.confirm("Discard this return? All items will be lost.")
      )
        return;
    }
    navigate("/dashboard");
  };

  // ===================== RENDER =====================
  return (
    <Box
      sx={{
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
        {/* ================= HEADER (with TOP Save) ================= */}
        <DarkBanner>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            gap={1.5}
          >
            {/* Left: Back + Title */}
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
                    borderColor: "#38bdf8",
                    color: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Dashboard
              </Button>

              <Box display="flex" alignItems="center" gap={1.2}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    bgcolor: "#0c2a3a",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <AssignmentReturn sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={0.2}>
                    <FiberManualRecord
                      sx={{ fontSize: 10, color: "#38bdf8" }}
                    />
                    <Typography
                      sx={{
                        color: "#38bdf8",
                        letterSpacing: 0.5,
                        fontSize: "0.68rem",
                        fontWeight: 700,
                      }}
                    >
                      Return Management
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
                    2. RETURN ITEMS ENTRY
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right: Date + Grand Total + Refresh + TOP Save */}
            <Box
              display="flex"
              gap={1}
              alignItems="flex-end"
              flexWrap="wrap"
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              {/* Date */}
              <Box sx={{ width: { xs: "100%", sm: 160 } }}>
                <FieldLabel>Return Date</FieldLabel>
                <StyledTextField
                  fullWidth
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  inputProps={{ max: todayStr() }}
                  size="small"
                />
              </Box>

              {/* Grand Total — Top */}
              <Box
                sx={{
                  minWidth: { xs: "100%", sm: 160 },
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(56, 189, 248, 0.08)",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  px: 1.5,
                  py: 0.4,
                }}
              >
                <Typography
                  sx={{
                    color: "#9ca3af",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  Return Total ({selectedRows.length} items · {totalQty} qty)
                </Typography>
                <Typography
                  sx={{
                    color: "#38bdf8",
                    fontWeight: 900,
                    fontSize: "0.95rem",
                    lineHeight: 1.2,
                    mt: 0.3,
                  }}
                >
                  ₹ {grandTotal.toLocaleString()}
                </Typography>
              </Box>

              {/* Refresh */}
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchProducts}
                disabled={loading}
                sx={{
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 1,
                  fontSize: "0.78rem",
                  height: "42px",
                  "&:hover": {
                    borderColor: "#38bdf8",
                    color: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>

              {/* TOP SAVE BUTTON */}
              <Button
                variant="contained"
                startIcon={
                  saving ? (
                    <CircularProgress size={16} sx={{ color: "#fff" }} />
                  ) : (
                    <SaveIcon />
                  )
                }
                onClick={handleSave}
                disabled={saving || selectedRows.length === 0}
                sx={{
                  bgcolor: "#3b82f6",
                  color: "#ffffff",
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.78rem",
                  height: "42px",
                  boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                  whiteSpace: "nowrap",
                  "&:hover": { bgcolor: "#2563eb" },
                  "&.Mui-disabled": {
                    bgcolor: "rgba(59, 130, 246, 0.3)",
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                {saving ? "Saving..." : `Save (${selectedRows.length})`}
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= FILTER BAR ================= */}
        <FilterBar>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={1.2}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <StyledTextField
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#6b7280", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box display="flex" gap={1}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<SelectAllIcon sx={{ fontSize: 16 }} />}
                onClick={selectAll}
                sx={{
                  color: "#38bdf8",
                  borderColor: "rgba(56, 189, 248, 0.4)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 1,
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    borderColor: "#38bdf8",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Select All
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ClearIcon sx={{ fontSize: 16 }} />}
                onClick={clearAll}
                sx={{
                  color: "#f43f5e",
                  borderColor: "rgba(244, 63, 94, 0.4)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 1,
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    borderColor: "#f43f5e",
                    bgcolor: "rgba(244, 63, 94, 0.08)",
                  },
                }}
              >
                Clear All
              </Button>
            </Box>
          </Box>

          {/* Stats chips */}
          <Box
            display="flex"
            gap={1}
            flexWrap="wrap"
            mt={1.2}
            alignItems="center"
          >
            <Chip
              label={`Total Products: ${rows.length}`}
              size="small"
              sx={{
                bgcolor: "rgba(156, 163, 175, 0.1)",
                color: "#9ca3af",
                border: "1px solid rgba(156, 163, 175, 0.2)",
                fontWeight: 700,
                fontSize: "0.68rem",
                height: "26px",
              }}
            />
            <Chip
              label={`Selected: ${selectedRows.length}`}
              size="small"
              sx={{
                bgcolor: "rgba(56, 189, 248, 0.1)",
                color: "#38bdf8",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                fontWeight: 700,
                fontSize: "0.68rem",
                height: "26px",
              }}
            />
            <Chip
              label={`Total Qty: ${totalQty}`}
              size="small"
              sx={{
                bgcolor: "rgba(192, 132, 252, 0.1)",
                color: "#c084fc",
                border: "1px solid rgba(192, 132, 252, 0.3)",
                fontWeight: 700,
                fontSize: "0.68rem",
                height: "26px",
              }}
            />
            {search && (
              <Chip
                label={`Showing: ${filteredRows.length}`}
                size="small"
                sx={{
                  bgcolor: "rgba(251, 191, 36, 0.1)",
                  color: "#fbbf24",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  height: "26px",
                }}
              />
            )}
          </Box>
        </FilterBar>

        {/* ================= PRODUCTS TABLE ================= */}
        <TableContainerDark>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={{ xs: 2, sm: 3 }}
            py={1.6}
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                letterSpacing: 0.5,
              }}
            >
              RETURN ITEMS SHEET
            </Typography>
            <Chip
              label={`${selectedRows.length} selected`}
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

          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "60px" }}>
                    Select
                  </th>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th>Item Name</th>
                  <th style={{ textAlign: "center" }}>MRP</th>
                  <th style={{ textAlign: "center" }}>Unit</th>
                  <th style={{ textAlign: "center" }}>Rate</th>
                  <th style={{ textAlign: "center" }}>Qty</th>
                  <th style={{ textAlign: "center" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading products...
                      </Typography>
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <ShoppingCart
                        style={{
                          fontSize: 44,
                          color: "#374151",
                          marginBottom: 8,
                        }}
                      />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                        {search
                          ? "No items match your search"
                          : "No products found"}
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
                      >
                        {search
                          ? "Try a different search term"
                          : "Add products first from Products page"}
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row, idx) => {
                    const rowTotal =
                      row.selected && row.qty > 0
                        ? Number(row.rate) * Number(row.qty)
                        : 0;
                    const originalIdx = rows.findIndex(
                      (r) => r.productId === row.productId
                    );
                    return (
                      <tr
                        key={row.productId}
                        style={{
                          backgroundColor: row.selected
                            ? "rgba(56, 189, 248, 0.04)"
                            : "transparent",
                        }}
                      >
                        <td style={{ textAlign: "center" }}>
                          <Checkbox
                            checked={row.selected}
                            onChange={() => toggleRow(originalIdx)}
                            sx={{
                              color: "#6b7280",
                              "&.Mui-checked": { color: "#38bdf8" },
                              "&:hover": {
                                bgcolor: "rgba(56, 189, 248, 0.08)",
                              },
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center", color: "#6b7280" }}>
                          {idx + 1}
                        </td>
                        <td>
                          <Typography
                            sx={{
                              color: "#ffffff",
                              fontWeight: 700,
                              fontSize: "0.85rem",
                            }}
                          >
                            {row.itemName}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Chip
                            label={`₹ ${row.mrp}`}
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
                        <td
                          style={{
                            textAlign: "center",
                            color: "#9ca3af",
                            fontSize: "0.78rem",
                          }}
                        >
                          {row.unit || "-"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <SmallInput
                            type="number"
                            value={row.rate || ""}
                            onChange={(e) =>
                              updateRow(
                                originalIdx,
                                "rate",
                                Number(e.target.value)
                              )
                            }
                            placeholder="0"
                            min={0}
                            style={{
                              borderColor: row.selected
                                ? "rgba(56, 189, 248, 0.4)"
                                : undefined,
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <SmallInput
                            type="number"
                            value={row.qty || ""}
                            onChange={(e) =>
                              updateRow(
                                originalIdx,
                                "qty",
                                Number(e.target.value)
                              )
                            }
                            placeholder="0"
                            min={0}
                            style={{
                              borderColor: row.selected
                                ? "rgba(56, 189, 248, 0.4)"
                                : undefined,
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography
                            sx={{
                              color: rowTotal > 0 ? "#38bdf8" : "#6b7280",
                              fontWeight: 800,
                              fontSize: "0.9rem",
                            }}
                          >
                            ₹ {rowTotal.toLocaleString()}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </ItemsTable>
          </TableScrollArea>
        </TableContainerDark>

        {/* ================= FOOTER (with BOTTOM Save) ================= */}
        <FooterBar>
          <Box>
            <Typography
              sx={{
                color: "#9ca3af",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                mb: 0.3,
              }}
            >
              Total Return Value ({selectedRows.length} items · {totalQty} qty)
            </Typography>
            <Typography
              sx={{
                color: "#38bdf8",
                fontWeight: 900,
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
                textShadow: "0 0 20px rgba(56, 189, 248, 0.4)",
                lineHeight: 1.2,
              }}
            >
              ₹ {grandTotal.toLocaleString()}
            </Typography>
          </Box>

          <Box display="flex" gap={1.2} flexWrap="wrap">
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={saving}
              sx={{
                color: "#9ca3af",
                borderColor: "rgba(156, 163, 175, 0.3)",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1.1,
                fontSize: "0.8rem",
                "&:hover": {
                  borderColor: "#9ca3af",
                  bgcolor: "rgba(156, 163, 175, 0.08)",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              startIcon={
                saving ? (
                  <CircularProgress size={16} sx={{ color: "#fff" }} />
                ) : (
                  <SaveIcon />
                )
              }
              onClick={handleSave}
              disabled={saving || selectedRows.length === 0}
              sx={{
                bgcolor: "#3b82f6",
                color: "#ffffff",
                fontWeight: 800,
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1.1,
                fontSize: "0.8rem",
                boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                "&:hover": { bgcolor: "#2563eb" },
                "&.Mui-disabled": {
                  bgcolor: "rgba(59, 130, 246, 0.3)",
                  color: "rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              {saving
                ? "Saving..."
                : `Save ${selectedRows.length} Item${
                    selectedRows.length !== 1 ? "s" : ""
                  }`}
            </Button>
          </Box>
        </FooterBar>
      </Box>
    </Box>
  );
};

export default ReturnItemsEntry;