// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   Box,
//   Button,
//   Typography,
//   Grid,
//   TextField,
//   Chip,
//   IconButton,
//   CircularProgress,
//   InputAdornment,
//   Tooltip,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   ArrowBack,
//   Search,
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Save as SaveIcon,
//   FiberManualRecord,
//   Edit as EditIcon,
//   ShoppingCart,
//   ReceiptLong,
//   Check as CheckIcon,
//   Close as CloseIcon,
//   AssignmentReturn,
// } from "@mui/icons-material";

// // ===================== TYPES =====================

// interface Product {
//   _id: string;
//   itemName: string;
//   mrp: number;
//   rate: number;
//   unit: string;
// }

// interface ReturnRow {
//   productId: string;
//   itemName: string;
//   mrp: number;
//   rate: number;
//   quantity: number;
//   totalAmount: number;
//   unit: string;
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
//       borderColor: "rgba(251, 191, 36, 0.4)",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#fbbf24",
//       borderWidth: "1.5px",
//     },
//     "&.Mui-disabled": {
//       backgroundColor: "rgba(255, 255, 255, 0.02)",
//     },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#ffffff",
//     fontSize: "0.85rem",
//     padding: "10px 12px",
//     "&::placeholder": { color: "#6b7280", opacity: 1 },
//     "&::-webkit-calendar-picker-indicator": {
//       filter: "invert(1)",
//       cursor: "pointer",
//     },
//   },
//   "& .MuiInputBase-input.Mui-disabled": {
//     WebkitTextFillColor: "#6b7280",
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
//     backgroundColor: "rgba(251, 191, 36, 0.3)",
//     borderRadius: "8px",
//     "&:hover": { backgroundColor: "rgba(251, 191, 36, 0.5)" },
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
//     backgroundColor: "#111827",
//     color: "#9ca3af",
//     fontWeight: 700,
//     fontSize: "0.7rem",
//     textTransform: "uppercase",
//     letterSpacing: "0.8px",
//     borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//     padding: "16px 12px",
//     whiteSpace: "nowrap",
//     textAlign: "left",
//   },
//   "& tbody tr": {
//     transition: "all 0.2s ease",
//     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//   },
//   "& tbody tr:hover": { backgroundColor: "rgba(251, 191, 36, 0.05)" },
//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "12px",
//   },
// }));

// const SmallInput = styled("input")(() => ({
//   width: "90px",
//   padding: "8px 10px",
//   borderRadius: "8px",
//   backgroundColor: "#090d16",
//   border: "1px solid rgba(255, 255, 255, 0.1)",
//   color: "#ffffff",
//   fontSize: "0.85rem",
//   fontWeight: 700,
//   textAlign: "center",
//   outline: "none",
//   transition: "all 0.2s ease",
//   "&:focus": {
//     borderColor: "#fbbf24",
//     boxShadow: "0 0 0 3px rgba(251, 191, 36, 0.1)",
//   },
//   "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
//     WebkitAppearance: "none",
//     margin: 0,
//   },
//   "&[type=number]": {
//     MozAppearance: "textfield",
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
//   border: "1px solid rgba(251, 191, 36, 0.3)",
//   padding: "16px 24px",
//   boxShadow: "0 8px 20px rgba(251, 191, 36, 0.1)",
// }));

// const InfoChip = styled(Box)(() => ({
//   display: "inline-flex",
//   alignItems: "center",
//   gap: "6px",
//   padding: "4px 10px",
//   borderRadius: "999px",
//   backgroundColor: "rgba(251, 191, 36, 0.1)",
//   border: "1px solid rgba(251, 191, 36, 0.3)",
//   color: "#fbbf24",
//   fontSize: "0.7rem",
//   fontWeight: 700,
//   letterSpacing: 0.5,
// }));

// // ===================== MAIN COMPONENT =====================

// const ReturnItemsEdit: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [returnDate, setReturnDate] = useState<string>("");

//   const [productSearch, setProductSearch] = useState<string>("");
//   const [searchResults, setSearchResults] = useState<Product[]>([]);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   const [currentQty, setCurrentQty] = useState<number>(1);
//   const [currentRate, setCurrentRate] = useState<number>(0);

//   const [rows, setRows] = useState<ReturnRow[]>([]);

//   // ✏️ Row-level edit state
//   const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
//   const [editBuffer, setEditBuffer] = useState<ReturnRow | null>(null);

//   const [saving, setSaving] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);

//   const searchRef = useRef<HTMLDivElement>(null);

//   /* =====================================================
//   FETCH RETURN ITEM
//   ===================================================== */
//   useEffect(() => {
//     const fetchReturn = async () => {
//       try {
//         setFetchLoading(true);
//         const res = await axios.get(
//           `${API_URL}/return-items/${id}`,
//           getAuthHeaders()
//         );

//         if (res.data?.success === true) {
//           const s = res.data.data || {};

//           if (s.date) {
//             const d = new Date(s.date);
//             if (!isNaN(d.getTime())) {
//               setReturnDate(d.toISOString().split("T")[0]);
//             }
//           }

//           const mappedRows: ReturnRow[] = (s.items || []).map((it: any) => {
//             const qty = Number(it?.quantity) || 0;
//             const rate = Number(it?.rate) || 0;
//             const total =
//               Number(it?.totalAmount) > 0
//                 ? Number(it.totalAmount)
//                 : qty * rate;

//             return {
//               productId:
//                 typeof it?.productId === "object"
//                   ? it?.productId?._id || ""
//                   : it?.productId || "",
//               itemName: it?.itemName || "",
//               mrp: Number(it?.mrp) || 0,
//               rate,
//               quantity: qty,
//               totalAmount: total,
//               unit: it?.unit || "",
//             };
//           });

//           setRows(mappedRows);
//         }
//       } catch (error: any) {
//         console.error(error);
//         if (error.response?.data?.message === "Unauthorized") {
//           toast.error("Session expired! Please login again");
//           localStorage.removeItem("erptoken");
//           setTimeout(() => navigate("/login"), 1500);
//         } else {
//           toast.error(
//             error.response?.data?.message || "Failed to fetch return items"
//           );
//         }
//       } finally {
//         setFetchLoading(false);
//       }
//     };

//     if (id) fetchReturn();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   // Outside click for product search
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
//         setShowSearchResults(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // Search products
//   useEffect(() => {
//     if (!productSearch.trim()) {
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

//   const handleSelectProduct = (p: Product) => {
//     setSelectedProduct(p);
//     setCurrentRate(p.rate);
//     setCurrentQty(1);
//     setProductSearch(p.itemName);
//     setShowSearchResults(false);
//   };

//   /* =====================================================
//   ADD NEW ITEM
//   ===================================================== */
//   const handleAddItem = () => {
//     if (!selectedProduct) {
//       toast.error("Please select an item first");
//       return;
//     }
//     if (currentQty <= 0) {
//       toast.error("Quantity must be greater than 0");
//       return;
//     }

//     const totalAmount = currentQty * currentRate;

//     setRows([
//       ...rows,
//       {
//         productId: selectedProduct._id,
//         itemName: selectedProduct.itemName,
//         mrp: selectedProduct.mrp,
//         rate: currentRate,
//         quantity: currentQty,
//         totalAmount,
//         unit: selectedProduct.unit,
//       },
//     ]);

//     setSelectedProduct(null);
//     setProductSearch("");
//     setCurrentQty(1);
//     setCurrentRate(0);
//     setSearchResults([]);

//     toast.success("Item added");
//   };

//   /* =====================================================
//   ✏️ ROW EDIT
//   ===================================================== */
//   const startEditRow = (index: number) => {
//     setEditingRowIndex(index);
//     setEditBuffer({ ...rows[index] });
//   };

//   const cancelEditRow = () => {
//     setEditingRowIndex(null);
//     setEditBuffer(null);
//   };

//   const changeEditBuffer = (
//     field: "rate" | "quantity" | "mrp" | "itemName",
//     value: any
//   ) => {
//     setEditBuffer((prev) => {
//       if (!prev) return prev;
//       const updated: ReturnRow = { ...prev, [field]: value };
//       const qty = Number(updated.quantity) || 0;
//       const rate = Number(updated.rate) || 0;
//       updated.totalAmount = qty * rate;
//       return updated;
//     });
//   };

//   const saveEditRow = () => {
//     if (editingRowIndex === null || !editBuffer) return;

//     if (!editBuffer.itemName.trim()) {
//       toast.error("Item name cannot be empty");
//       return;
//     }
//     if (Number(editBuffer.quantity) < 1) {
//       toast.error("Quantity must be at least 1");
//       return;
//     }
//     if (Number(editBuffer.rate) < 0) {
//       toast.error("Rate cannot be negative");
//       return;
//     }

//     const updatedRows = [...rows];
//     updatedRows[editingRowIndex] = {
//       ...editBuffer,
//       mrp: Number(editBuffer.mrp) || 0,
//       rate: Number(editBuffer.rate) || 0,
//       quantity: Number(editBuffer.quantity) || 0,
//       totalAmount:
//         (Number(editBuffer.quantity) || 0) * (Number(editBuffer.rate) || 0),
//     };
//     setRows(updatedRows);
//     setEditingRowIndex(null);
//     setEditBuffer(null);
//     toast.success("Item updated");
//   };

//   /* =====================================================
//   REMOVE ROW
//   ===================================================== */
//   const removeRow = (index: number) => {
//     if (editingRowIndex === index) {
//       setEditingRowIndex(null);
//       setEditBuffer(null);
//     }
//     setRows(rows.filter((_, i) => i !== index));
//     toast.success("Item removed");
//   };

//   const grandTotal = rows.reduce(
//     (sum, r) => sum + (Number(r.totalAmount) || 0),
//     0
//   );

//   /* =====================================================
//   SAVE / UPDATE
//   ===================================================== */
//   const handleSave = async () => {
//     if (rows.length === 0) {
//       toast.error("Please add at least one item");
//       return;
//     }
//     if (editingRowIndex !== null) {
//       toast.error("Please save or cancel the row you're editing first");
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         items: rows.map((r) => ({
//           productId: r.productId,
//           itemName: r.itemName,
//           mrp: Number(r.mrp) || 0,
//           rate: Number(r.rate) || 0,
//           quantity: Number(r.quantity) || 0,
//         })),
//         totalValue: grandTotal,
//         date: returnDate,
//       };

//       const res = await axios.put(
//         `${API_URL}/return-items/${id}`,
//         payload,
//         getAuthHeaders()
//       );

//       if (res.data.success === true) {
//         toast.success("Return items updated successfully! 🎉");
//         setTimeout(() => navigate("/sale/return-list"), 1200);
//       } else if (res.data.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to update return items");
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
//         toast.error(
//           error.response?.data?.message || "Failed to update return items"
//         );
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     navigate("/sale/return-list");
//   };

//   /* =====================================================
//   LOADING
//   ===================================================== */
//   if (fetchLoading) {
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
//         <CircularProgress sx={{ color: "#fbbf24" }} />
//         <Typography sx={{ color: "#9ca3af" }}>
//           Loading return items...
//         </Typography>
//       </Box>
//     );
//   }

//   /* =====================================================
//   MAIN RENDER
//   ===================================================== */
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
//                 onClick={handleCancel}
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
//                     borderColor: "#fbbf24",
//                     color: "#fbbf24",
//                     bgcolor: "rgba(251, 191, 36, 0.08)",
//                   },
//                 }}
//               >
//                 Back
//               </Button>

//               <Box display="flex" alignItems="center" gap={1.5}>
//                 <Box
//                   sx={{
//                     width: 42,
//                     height: 42,
//                     borderRadius: "12px",
//                     bgcolor: "#332208",
//                     color: "#fbbf24",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <EditIcon />
//                 </Box>
//                 <Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <FiberManualRecord
//                       sx={{ fontSize: 10, color: "#fbbf24" }}
//                     />
//                     <Typography
//                       sx={{
//                         color: "#fbbf24",
//                         letterSpacing: 0.5,
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                       }}
//                     >
//                       Edit Mode
//                     </Typography>
//                   </Box>
//                   <Typography
//                     variant="h5"
//                     fontWeight="800"
//                     sx={{
//                       fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
//                       letterSpacing: 0.5,
//                     }}
//                   >
//                     EDIT RETURN ITEM
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Box display="flex" alignItems="center" gap={2}>
//               <InfoChip>
//                 <ReceiptLong sx={{ fontSize: 14 }} />
//                 ID: {id?.slice(-8) || "—"}
//               </InfoChip>
//               <Box sx={{ width: { xs: "100%", sm: 180 } }}>
//                 <FieldLabel>Return Date</FieldLabel>
//                 <StyledTextField
//                   fullWidth
//                   type="date"
//                   value={returnDate}
//                   onChange={(e) => setReturnDate(e.target.value)}
//                   size="small"
//                 />
//               </Box>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* ================= ADD ITEM ================= */}
//         <FormCard>
//           <Box display="flex" alignItems="center" gap={1} mb={2}>
//             <Search sx={{ color: "#fbbf24", fontSize: 20 }} />
//             <Typography
//               sx={{
//                 color: "#fbbf24",
//                 fontWeight: 800,
//                 fontSize: "0.85rem",
//                 letterSpacing: 1,
//                 textTransform: "uppercase",
//               }}
//             >
//               Add New Item
//             </Typography>
//           </Box>

//           <Grid container spacing={2}>
//             <Grid
//               size={{ xs: 12, md: 5 }}
//               ref={searchRef}
//               sx={{ position: "relative" }}
//             >
//               <FieldLabel>Search Item</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="Type item name..."
//                 value={productSearch}
//                 onChange={(e) => {
//                   setProductSearch(e.target.value);
//                   if (selectedProduct) setSelectedProduct(null);
//                 }}
//                 onFocus={() => {
//                   if (searchResults.length > 0) setShowSearchResults(true);
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Search sx={{ color: "#6b7280", fontSize: 18 }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

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
//                         "&:hover": { bgcolor: "rgba(251, 191, 36, 0.1)" },
//                         "&:last-child": { borderBottom: "none" },
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
//                           sx={{ color: "#9ca3af", fontSize: "0.75rem" }}
//                         >
//                           MRP: ₹{p.mrp}
//                         </Typography>
//                       </Box>
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.3 }}
//                       >
//                         Rate: ₹{p.rate} / {p.unit}
//                       </Typography>
//                     </Box>
//                   ))}
//                 </Box>
//               )}
//             </Grid>

//             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//               <FieldLabel>Item Name</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 value={selectedProduct?.itemName || ""}
//                 disabled
//                 placeholder="Selected item"
//               />
//             </Grid>

//             <Grid size={{ xs: 6, sm: 3, md: 1 }}>
//               <FieldLabel>MRP</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 value={selectedProduct?.mrp ?? ""}
//                 disabled
//                 placeholder="-"
//               />
//             </Grid>

//             <Grid size={{ xs: 6, sm: 3, md: 1 }}>
//               <FieldLabel>Rate</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="number"
//                 value={currentRate || ""}
//                 onChange={(e) => setCurrentRate(Number(e.target.value))}
//                 disabled={!selectedProduct}
//                 inputProps={{ min: 0 }}
//               />
//             </Grid>

//             <Grid size={{ xs: 6, sm: 3, md: 1 }}>
//               <FieldLabel>Qty</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="number"
//                 value={currentQty || ""}
//                 onChange={(e) => setCurrentQty(Number(e.target.value))}
//                 disabled={!selectedProduct}
//                 inputProps={{ min: 1 }}
//               />
//             </Grid>

//             <Grid size={{ xs: 6, sm: 3, md: 1 }}>
//               <FieldLabel>&nbsp;</FieldLabel>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={handleAddItem}
//                 disabled={!selectedProduct}
//                 sx={{
//                   bgcolor: "#fbbf24",
//                   color: "#0d1527",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   height: "42px",
//                   minWidth: "auto",
//                   px: 1,
//                   boxShadow: "0 4px 14px rgba(251, 191, 36, 0.3)",
//                   "&:hover": { bgcolor: "#f59e0b" },
//                   "&.Mui-disabled": {
//                     bgcolor: "rgba(251, 191, 36, 0.3)",
//                     color: "rgba(255, 255, 255, 0.5)",
//                   },
//                 }}
//               >
//                 <AddIcon />
//               </Button>
//             </Grid>
//           </Grid>
//         </FormCard>

//         {/* ================= ITEMS TABLE ================= */}
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
//             <Box display="flex" alignItems="center" gap={1}>
//               <AssignmentReturn sx={{ color: "#fbbf24", fontSize: 18 }} />
//               <Typography
//                 sx={{
//                   color: "#ffffff",
//                   fontWeight: 800,
//                   fontSize: "0.9rem",
//                   letterSpacing: 0.5,
//                 }}
//               >
//                 RETURN ITEMS LIST
//               </Typography>
//             </Box>
//             <Chip
//               label={`${rows.length} item${rows.length !== 1 ? "s" : ""}`}
//               size="small"
//               sx={{
//                 bgcolor: "rgba(251, 191, 36, 0.1)",
//                 color: "#fbbf24",
//                 border: "1px solid rgba(251, 191, 36, 0.3)",
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
//                   <th style={{ textAlign: "center" }}>Rate</th>
//                   <th style={{ textAlign: "center" }}>Quantity</th>
//                   <th style={{ textAlign: "center" }}>Total Amount</th>
//                   <th style={{ textAlign: "center", width: "130px" }}>
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
//                       <ShoppingCart
//                         style={{
//                           fontSize: 44,
//                           color: "#374151",
//                           marginBottom: 8,
//                         }}
//                       />
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.9rem" }}
//                       >
//                         No items added yet
//                       </Typography>
//                       <Typography
//                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
//                       >
//                         Search item above and click + to add
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   rows.map((row, idx) => {
//                     const isEditing = editingRowIndex === idx;
//                     const displayRow =
//                       isEditing && editBuffer ? editBuffer : row;

//                     return (
//                       <tr
//                         key={idx}
//                         style={{
//                           backgroundColor: isEditing
//                             ? "rgba(251, 191, 36, 0.06)"
//                             : "transparent",
//                         }}
//                       >
//                         <td style={{ textAlign: "center", color: "#6b7280" }}>
//                           {idx + 1}
//                         </td>

//                         {/* ITEM NAME */}
//                         <td>
//                           {isEditing ? (
//                             <input
//                               type="text"
//                               value={displayRow.itemName}
//                               onChange={(e) =>
//                                 changeEditBuffer("itemName", e.target.value)
//                               }
//                               style={{
//                                 width: "100%",
//                                 padding: "8px 10px",
//                                 borderRadius: "8px",
//                                 backgroundColor: "#090d16",
//                                 border: "1px solid rgba(251, 191, 36, 0.4)",
//                                 color: "#ffffff",
//                                 fontSize: "0.85rem",
//                                 outline: "none",
//                               }}
//                             />
//                           ) : (
//                             <Typography
//                               sx={{
//                                 color: "#ffffff",
//                                 fontWeight: 700,
//                                 fontSize: "0.85rem",
//                               }}
//                             >
//                               {row.itemName}
//                             </Typography>
//                           )}
//                         </td>

//                         {/* MRP */}
//                         <td style={{ textAlign: "center" }}>
//                           {isEditing ? (
//                             <SmallInput
//                               type="number"
//                               value={displayRow.mrp}
//                               onChange={(e) =>
//                                 changeEditBuffer(
//                                   "mrp",
//                                   Number(e.target.value)
//                                 )
//                               }
//                               min={0}
//                             />
//                           ) : (
//                             <Chip
//                               label={`₹ ${row.mrp}`}
//                               size="small"
//                               sx={{
//                                 bgcolor: "rgba(156, 163, 175, 0.1)",
//                                 color: "#e5e7eb",
//                                 border:
//                                   "1px solid rgba(156, 163, 175, 0.2)",
//                                 fontSize: "0.7rem",
//                                 fontWeight: 600,
//                                 height: "24px",
//                               }}
//                             />
//                           )}
//                         </td>

//                         {/* RATE */}
//                         <td style={{ textAlign: "center" }}>
//                           {isEditing ? (
//                             <SmallInput
//                               type="number"
//                               value={displayRow.rate}
//                               onChange={(e) =>
//                                 changeEditBuffer(
//                                   "rate",
//                                   Number(e.target.value)
//                                 )
//                               }
//                               min={0}
//                             />
//                           ) : (
//                             <Typography
//                               sx={{
//                                 color: "#e5e7eb",
//                                 fontWeight: 700,
//                                 fontSize: "0.85rem",
//                               }}
//                             >
//                               ₹ {row.rate}
//                             </Typography>
//                           )}
//                         </td>

//                         {/* QUANTITY */}
//                         <td style={{ textAlign: "center" }}>
//                           {isEditing ? (
//                             <SmallInput
//                               type="number"
//                               value={displayRow.quantity}
//                               onChange={(e) =>
//                                 changeEditBuffer(
//                                   "quantity",
//                                   Number(e.target.value)
//                                 )
//                               }
//                               min={1}
//                             />
//                           ) : (
//                             <Typography
//                               sx={{
//                                 color: "#e5e7eb",
//                                 fontWeight: 700,
//                                 fontSize: "0.85rem",
//                               }}
//                             >
//                               {row.quantity}
//                             </Typography>
//                           )}
//                         </td>

//                         {/* TOTAL */}
//                         <td style={{ textAlign: "center" }}>
//                           <Typography
//                             sx={{
//                               color: "#34d399",
//                               fontWeight: 800,
//                               fontSize: "0.95rem",
//                             }}
//                           >
//                             ₹{" "}
//                             {Number(
//                               displayRow.totalAmount || 0
//                             ).toLocaleString("en-IN")}
//                           </Typography>
//                         </td>

//                         {/* ACTIONS */}
//                         <td style={{ textAlign: "center" }}>
//                           {isEditing ? (
//                             <Box
//                               display="flex"
//                               justifyContent="center"
//                               gap={0.5}
//                             >
//                               <Tooltip title="Save">
//                                 <IconButton
//                                   size="small"
//                                   onClick={saveEditRow}
//                                   sx={{
//                                     color: "#34d399",
//                                     "&:hover": {
//                                       bgcolor: "rgba(52, 211, 153, 0.15)",
//                                     },
//                                   }}
//                                 >
//                                   <CheckIcon fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>
//                               <Tooltip title="Cancel">
//                                 <IconButton
//                                   size="small"
//                                   onClick={cancelEditRow}
//                                   sx={{
//                                     color: "#9ca3af",
//                                     "&:hover": {
//                                       bgcolor: "rgba(156, 163, 175, 0.15)",
//                                     },
//                                   }}
//                                 >
//                                   <CloseIcon fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>
//                             </Box>
//                           ) : (
//                             <Box
//                               display="flex"
//                               justifyContent="center"
//                               gap={0.5}
//                             >
//                               <Tooltip title="Edit item">
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => startEditRow(idx)}
//                                   disabled={editingRowIndex !== null}
//                                   sx={{
//                                     color: "#fbbf24",
//                                     "&:hover": {
//                                       bgcolor: "rgba(251, 191, 36, 0.15)",
//                                     },
//                                     "&.Mui-disabled": {
//                                       color: "rgba(251, 191, 36, 0.3)",
//                                     },
//                                   }}
//                                 >
//                                   <EditIcon fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>
//                               <Tooltip title="Remove item">
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => removeRow(idx)}
//                                   disabled={editingRowIndex !== null}
//                                   sx={{
//                                     color: "#f43f5e",
//                                     "&:hover": {
//                                       bgcolor: "rgba(244, 63, 94, 0.1)",
//                                     },
//                                     "&.Mui-disabled": {
//                                       color: "rgba(244, 63, 94, 0.3)",
//                                     },
//                                   }}
//                                 >
//                                   <DeleteIcon fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>
//                             </Box>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </ItemsTable>
//           </TableScrollArea>
//         </TableContainerDark>

//         {/* ================= FOOTER ================= */}
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
//               Grand Total
//             </Typography>
//             <Typography
//               sx={{
//                 color: "#fbbf24",
//                 fontWeight: 900,
//                 fontSize: { xs: "1.3rem", sm: "1.6rem" },
//                 textShadow: "0 0 20px rgba(251, 191, 36, 0.4)",
//                 lineHeight: 1.2,
//               }}
//             >
//               ₹ {grandTotal.toLocaleString("en-IN")}
//             </Typography>
//           </Box>

//           <Box display="flex" gap={1.5} flexWrap="wrap">
//             <Button
//               variant="outlined"
//               onClick={handleCancel}
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
//                   <CircularProgress size={16} sx={{ color: "#0d1527" }} />
//                 ) : (
//                   <SaveIcon />
//                 )
//               }
//               onClick={handleSave}
//               disabled={saving || rows.length === 0}
//               sx={{
//                 bgcolor: "#fbbf24",
//                 color: "#0d1527",
//                 fontWeight: 800,
//                 textTransform: "none",
//                 borderRadius: "10px",
//                 px: 3,
//                 py: 1.2,
//                 boxShadow: "0 4px 14px rgba(251, 191, 36, 0.3)",
//                 "&:hover": { bgcolor: "#f59e0b" },
//                 "&.Mui-disabled": {
//                   bgcolor: "rgba(251, 191, 36, 0.3)",
//                   color: "rgba(255, 255, 255, 0.5)",
//                 },
//               }}
//             >
//               {saving ? "Updating..." : "Update Return"}
//             </Button>
//           </Box>
//         </FooterBar>
//       </Box>
//     </Box>
//   );
// };

// export default ReturnItemsEdit;



import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Chip,
  IconButton,
  CircularProgress,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  ArrowBack,
  Search,
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  FiberManualRecord,
  Edit as EditIcon,
  ShoppingCart,
  ReceiptLong,
  Check as CheckIcon,
  Close as CloseIcon,
  AssignmentReturn,
} from "@mui/icons-material";

interface Product {
  _id: string;
  itemName: string;
  mrp: number;
  rate: number;
  unit: string;
}

interface ReturnRow {
  productId: string;
  itemName: string;
  mrp: number;
  rate: number;
  quantity: number;
  totalAmount: number;
  unit: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

const isDark = (theme: any) => theme.palette.mode === "dark";

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

const FormCard = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(15, 23, 42, 0.08)",
  padding: "20px",
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
    "& fieldset": { borderColor: isDark(theme) ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(251, 191, 36, 0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#fbbf24", borderWidth: "1.5px" },
    "&.Mui-disabled": {
      backgroundColor: isDark(theme) ? "rgba(255,255,255,0.02)" : "rgba(15,23,42,0.02)",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: isDark(theme) ? "#ffffff" : "#0f172a",
    fontSize: "0.85rem",
    padding: "10px 12px",
    "&::placeholder": { color: isDark(theme) ? "#6b7280" : "#94a3b8", opacity: 1 },
    "&::-webkit-calendar-picker-indicator": {
      filter: isDark(theme) ? "invert(1)" : "none",
      cursor: "pointer",
    },
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: isDark(theme) ? "#6b7280" : "#94a3b8",
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
    backgroundColor: "rgba(251, 191, 36, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(251, 191, 36, 0.5)" },
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
      backgroundColor: dark ? "#111827" : "#f8fafc",
      color: dark ? "#9ca3af" : "#64748b",
      fontWeight: 700,
      fontSize: "0.7rem",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      borderBottom: dark
        ? "1px solid rgba(255, 255, 255, 0.08)"
        : "1px solid rgba(15, 23, 42, 0.08)",
      padding: "16px 12px",
      whiteSpace: "nowrap",
      textAlign: "left",
    },
    "& tbody tr": {
      transition: "all 0.2s ease",
      borderBottom: dark
        ? "1px solid rgba(255, 255, 255, 0.05)"
        : "1px solid rgba(15, 23, 42, 0.05)",
    },
    "& tbody tr:hover": { backgroundColor: "rgba(251, 191, 36, 0.05)" },
    "& tbody td": {
      color: dark ? "#e5e7eb" : "#334155",
      fontSize: "0.85rem",
      padding: "12px",
    },
  };
});

const SmallInput = styled("input")(({ theme }) => ({
  width: "90px",
  padding: "8px 10px",
  borderRadius: "8px",
  backgroundColor: isDark(theme) ? "#090d16" : "#f8fafc",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.1)"
    : "1px solid rgba(15, 23, 42, 0.1)",
  color: isDark(theme) ? "#ffffff" : "#0f172a",
  fontSize: "0.85rem",
  fontWeight: 700,
  textAlign: "center",
  outline: "none",
  transition: "all 0.2s ease",
  "&:focus": {
    borderColor: "#fbbf24",
    boxShadow: "0 0 0 3px rgba(251, 191, 36, 0.1)",
  },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&[type=number]": { MozAppearance: "textfield" },
}));

const FooterBar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
  flexShrink: 0,
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: "1px solid rgba(251, 191, 36, 0.3)",
  padding: "16px 24px",
  boxShadow: isDark(theme)
    ? "0 8px 20px rgba(251, 191, 36, 0.1)"
    : "0 4px 14px rgba(251, 191, 36, 0.08)",
  transition: "all 0.3s ease",
}));

const InfoChip = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px 10px",
  borderRadius: "999px",
  backgroundColor: "rgba(251, 191, 36, 0.1)",
  border: "1px solid rgba(251, 191, 36, 0.3)",
  color: isDark(theme) ? "#fbbf24" : "#d97706",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: 0.5,
}));

const ReturnItemsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const dark = isDark(theme);

  const c = {
    pageBg: dark ? "#090d16" : "#f1f5f9",
    cardBg: dark ? "#111827" : "#ffffff",
    text: dark ? "#ffffff" : "#0f172a",
    textSec: dark ? "#e5e7eb" : "#334155",
    muted: dark ? "#9ca3af" : "#64748b",
    mutedDark: dark ? "#6b7280" : "#94a3b8",
    veryMuted: dark ? "#374151" : "#cbd5e1",
    border08: dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
    border05: dark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)",
    border10: dark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.10)",
    border15: dark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.15)",
    amberText: dark ? "#fbbf24" : "#d97706",
    amberIconBg: dark ? "#332208" : "#fef3c7",
    emeraldText: dark ? "#34d399" : "#059669",
    chipBgSoft: dark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.04)",
    dropdownBg: dark ? "#111827" : "#ffffff",
  };

  const [returnDate, setReturnDate] = useState<string>("");
  const [productSearch, setProductSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentQty, setCurrentQty] = useState<number>(1);
  const [currentRate, setCurrentRate] = useState<number>(0);
  const [rows, setRows] = useState<ReturnRow[]>([]);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editBuffer, setEditBuffer] = useState<ReturnRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchReturn = async () => {
      try {
        setFetchLoading(true);
        const res = await axios.get(`${API_URL}/return-items/${id}`, getAuthHeaders());
        if (res.data?.success === true) {
          const s = res.data.data || {};
          if (s.date) {
            const d = new Date(s.date);
            if (!isNaN(d.getTime())) setReturnDate(d.toISOString().split("T")[0]);
          }
          const mappedRows: ReturnRow[] = (s.items || []).map((it: any) => {
            const qty = Number(it?.quantity) || 0;
            const rate = Number(it?.rate) || 0;
            const total = Number(it?.totalAmount) > 0 ? Number(it.totalAmount) : qty * rate;
            return {
              productId: typeof it?.productId === "object" ? it?.productId?._id || "" : it?.productId || "",
              itemName: it?.itemName || "",
              mrp: Number(it?.mrp) || 0,
              rate,
              quantity: qty,
              totalAmount: total,
              unit: it?.unit || "",
            };
          });
          setRows(mappedRows);
        }
      } catch (error: any) {
        if (error.response?.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(error.response?.data?.message || "Failed to fetch return items");
        }
      } finally {
        setFetchLoading(false);
      }
    };
    if (id) fetchReturn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!productSearch.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(`${API_URL}/product`, {
          params: { search: productSearch, page: 1, limit: 20 },
          ...getAuthHeaders(),
        });
        if (res.data?.success) {
          setSearchResults(res.data.data || []);
          setShowSearchResults(true);
        }
      } catch (err) {
        console.error(err);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [productSearch]);

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setCurrentRate(p.rate);
    setCurrentQty(1);
    setProductSearch(p.itemName);
    setShowSearchResults(false);
  };

  const handleAddItem = () => {
    if (!selectedProduct) {
      toast.error("Please select an item first");
      return;
    }
    if (currentQty <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    const totalAmount = currentQty * currentRate;
    setRows([
      ...rows,
      {
        productId: selectedProduct._id,
        itemName: selectedProduct.itemName,
        mrp: selectedProduct.mrp,
        rate: currentRate,
        quantity: currentQty,
        totalAmount,
        unit: selectedProduct.unit,
      },
    ]);
    setSelectedProduct(null);
    setProductSearch("");
    setCurrentQty(1);
    setCurrentRate(0);
    setSearchResults([]);
    toast.success("Item added");
  };

  const startEditRow = (index: number) => {
    setEditingRowIndex(index);
    setEditBuffer({ ...rows[index] });
  };
  const cancelEditRow = () => {
    setEditingRowIndex(null);
    setEditBuffer(null);
  };
  const changeEditBuffer = (field: "rate" | "quantity" | "mrp" | "itemName", value: any) => {
    setEditBuffer((prev) => {
      if (!prev) return prev;
      const updated: ReturnRow = { ...prev, [field]: value };
      const qty = Number(updated.quantity) || 0;
      const rate = Number(updated.rate) || 0;
      updated.totalAmount = qty * rate;
      return updated;
    });
  };
  const saveEditRow = () => {
    if (editingRowIndex === null || !editBuffer) return;
    if (!editBuffer.itemName.trim()) return toast.error("Item name cannot be empty");
    if (Number(editBuffer.quantity) < 1) return toast.error("Quantity must be at least 1");
    if (Number(editBuffer.rate) < 0) return toast.error("Rate cannot be negative");
    const updatedRows = [...rows];
    updatedRows[editingRowIndex] = {
      ...editBuffer,
      mrp: Number(editBuffer.mrp) || 0,
      rate: Number(editBuffer.rate) || 0,
      quantity: Number(editBuffer.quantity) || 0,
      totalAmount: (Number(editBuffer.quantity) || 0) * (Number(editBuffer.rate) || 0),
    };
    setRows(updatedRows);
    setEditingRowIndex(null);
    setEditBuffer(null);
    toast.success("Item updated");
  };
  const removeRow = (index: number) => {
    if (editingRowIndex === index) {
      setEditingRowIndex(null);
      setEditBuffer(null);
    }
    setRows(rows.filter((_, i) => i !== index));
    toast.success("Item removed");
  };

  const grandTotal = rows.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  const handleSave = async () => {
    if (rows.length === 0) return toast.error("Please add at least one item");
    if (editingRowIndex !== null) return toast.error("Please save or cancel the row you're editing first");
    try {
      setSaving(true);
      const payload = {
        items: rows.map((r) => ({
          productId: r.productId,
          itemName: r.itemName,
          mrp: Number(r.mrp) || 0,
          rate: Number(r.rate) || 0,
          quantity: Number(r.quantity) || 0,
        })),
        totalValue: grandTotal,
        date: returnDate,
      };
      const res = await axios.put(`${API_URL}/return-items/${id}`, payload, getAuthHeaders());
      if (res.data.success === true) {
        toast.success("Return items updated successfully! 🎉");
        setTimeout(() => navigate("/sale/return-list"), 1200);
      } else if (res.data.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to update return items");
      }
    } catch (error: any) {
      if (!error.response) toast.error("Network error! Please check your connection");
      else if (error.response?.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(error.response?.data?.message || "Failed to update return items");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate("/sale/return-list");

  if (fetchLoading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: c.pageBg, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2, transition: "background-color 0.3s ease" }}>
        <CircularProgress sx={{ color: "#fbbf24" }} />
        <Typography sx={{ color: c.muted }}>Loading return items...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "85vh", maxHeight: "100vh", overflow: "hidden",
        bgcolor: c.pageBg,
        px: { xs: 1.5, sm: 2, md: 3 }, py: { xs: 1.5, md: 2.5 },
        color: c.text, display: "flex", flexDirection: "column", boxSizing: "border-box",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        {/* HEADER */}
        <DarkBanner>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Button variant="outlined" startIcon={<ArrowBack />} onClick={handleCancel}
                sx={{ color: c.textSec, borderColor: c.border15, fontWeight: 700, textTransform: "none", borderRadius: "10px", px: 2, py: 0.9, fontSize: "0.8rem",
                  "&:hover": { borderColor: "#fbbf24", color: "#fbbf24", bgcolor: "rgba(251, 191, 36, 0.08)" } }}>
                Back
              </Button>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box sx={{ width: 42, height: 42, borderRadius: "12px", bgcolor: c.amberIconBg, color: c.amberText, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <EditIcon />
                </Box>
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <FiberManualRecord sx={{ fontSize: 10, color: "#fbbf24" }} />
                    <Typography sx={{ color: c.amberText, letterSpacing: 0.5, fontSize: "0.7rem", fontWeight: 700 }}>Edit Mode</Typography>
                  </Box>
                  <Typography variant="h5" fontWeight="800" sx={{ fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" }, letterSpacing: 0.5, color: c.text }}>
                    EDIT RETURN ITEM
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <InfoChip><ReceiptLong sx={{ fontSize: 14 }} /> ID: {id?.slice(-8) || "—"}</InfoChip>
              <Box sx={{ width: { xs: "100%", sm: 180 } }}>
                <FieldLabel>Return Date</FieldLabel>
                <StyledTextField fullWidth type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} size="small" />
              </Box>
            </Box>
          </Box>
        </DarkBanner>

        {/* ADD ITEM */}
        <FormCard>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Search sx={{ color: c.amberText, fontSize: 20 }} />
            <Typography sx={{ color: c.amberText, fontWeight: 800, fontSize: "0.85rem", letterSpacing: 1, textTransform: "uppercase" }}>
              Add New Item
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 5 }} ref={searchRef} sx={{ position: "relative" }}>
              <FieldLabel>Search Item</FieldLabel>
              <StyledTextField fullWidth placeholder="Type item name..." value={productSearch}
                onChange={(e) => { setProductSearch(e.target.value); if (selectedProduct) setSelectedProduct(null); }}
                onFocus={() => { if (searchResults.length > 0) setShowSearchResults(true); }}
                InputProps={{ startAdornment: (<InputAdornment position="start"><Search sx={{ color: c.mutedDark, fontSize: 18 }} /></InputAdornment>) }} />
              {showSearchResults && searchResults.length > 0 && (
                <Box sx={{ position: "absolute", top: "100%", left: 0, right: 0, mt: 0.5, bgcolor: c.dropdownBg, border: `1px solid ${c.border10}`, borderRadius: "10px", maxHeight: "280px", overflowY: "auto", zIndex: 50, boxShadow: dark ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 30px rgba(15,23,42,0.12)" }}>
                  {searchResults.map((p) => (
                    <Box key={p._id} onClick={() => handleSelectProduct(p)}
                      sx={{ px: 2, py: 1.2, cursor: "pointer", borderBottom: `1px solid ${c.border05}`, "&:hover": { bgcolor: "rgba(251, 191, 36, 0.1)" }, "&:last-child": { borderBottom: "none" } }}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography sx={{ color: c.text, fontSize: "0.85rem", fontWeight: 600 }}>{p.itemName}</Typography>
                        <Typography sx={{ color: c.muted, fontSize: "0.75rem" }}>MRP: ₹{p.mrp}</Typography>
                      </Box>
                      <Typography sx={{ color: c.muted, fontSize: "0.7rem", mt: 0.3 }}>Rate: ₹{p.rate} / {p.unit}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FieldLabel>Item Name</FieldLabel>
              <StyledTextField fullWidth value={selectedProduct?.itemName || ""} disabled placeholder="Selected item" />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>MRP</FieldLabel>
              <StyledTextField fullWidth value={selectedProduct?.mrp ?? ""} disabled placeholder="-" />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>Rate</FieldLabel>
              <StyledTextField fullWidth type="number" value={currentRate || ""} onChange={(e) => setCurrentRate(Number(e.target.value))} disabled={!selectedProduct} inputProps={{ min: 0 }} />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>Qty</FieldLabel>
              <StyledTextField fullWidth type="number" value={currentQty || ""} onChange={(e) => setCurrentQty(Number(e.target.value))} disabled={!selectedProduct} inputProps={{ min: 1 }} />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>&nbsp;</FieldLabel>
              <Button fullWidth variant="contained" onClick={handleAddItem} disabled={!selectedProduct}
                sx={{ bgcolor: "#fbbf24", color: "#0f172a", fontWeight: 700, textTransform: "none", borderRadius: "10px", height: "42px", minWidth: "auto", px: 1, boxShadow: "0 4px 14px rgba(251, 191, 36, 0.3)", "&:hover": { bgcolor: "#f59e0b" }, "&.Mui-disabled": { bgcolor: "rgba(251, 191, 36, 0.3)", color: "rgba(255,255,255,0.5)" } }}>
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </FormCard>

        {/* TABLE */}
        <TableContainerDark>
          <Box display="flex" justifyContent="space-between" alignItems="center" px={3} py={1.6} sx={{ borderBottom: `1px solid ${c.border08}`, flexShrink: 0 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <AssignmentReturn sx={{ color: c.amberText, fontSize: 18 }} />
              <Typography sx={{ color: c.text, fontWeight: 800, fontSize: "0.9rem", letterSpacing: 0.5 }}>RETURN ITEMS LIST</Typography>
            </Box>
            <Chip label={`${rows.length} item${rows.length !== 1 ? "s" : ""}`} size="small"
              sx={{ bgcolor: "rgba(251, 191, 36, 0.1)", color: c.amberText, border: "1px solid rgba(251, 191, 36, 0.3)", fontWeight: 700, fontSize: "0.7rem", height: "26px" }} />
          </Box>
          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "50px" }}>#</th>
                  <th>Item Name</th>
                  <th style={{ textAlign: "center" }}>MRP</th>
                  <th style={{ textAlign: "center" }}>Rate</th>
                  <th style={{ textAlign: "center" }}>Quantity</th>
                  <th style={{ textAlign: "center" }}>Total Amount</th>
                  <th style={{ textAlign: "center", width: "130px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "40px 12px" }}>
                      <ShoppingCart style={{ fontSize: 44, color: c.veryMuted, marginBottom: 8 }} />
                      <Typography sx={{ color: c.muted, fontSize: "0.9rem" }}>No items added yet</Typography>
                      <Typography sx={{ color: c.mutedDark, fontSize: "0.75rem", mt: 0.5 }}>Search item above and click + to add</Typography>
                    </td>
                  </tr>
                ) : (
                  rows.map((row, idx) => {
                    const isEditing = editingRowIndex === idx;
                    const displayRow = isEditing && editBuffer ? editBuffer : row;
                    return (
                      <tr key={idx} style={{ backgroundColor: isEditing ? (dark ? "rgba(251, 191, 36, 0.06)" : "rgba(251, 191, 36, 0.08)") : "transparent" }}>
                        <td style={{ textAlign: "center", color: c.mutedDark }}>{idx + 1}</td>
                        <td>
                          {isEditing ? (
                            <input type="text" value={displayRow.itemName} onChange={(e) => changeEditBuffer("itemName", e.target.value)}
                              style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", backgroundColor: dark ? "#090d16" : "#f8fafc", border: "1px solid rgba(251, 191, 36, 0.4)", color: c.text, fontSize: "0.85rem", outline: "none" }} />
                          ) : (
                            <Typography sx={{ color: c.text, fontWeight: 700, fontSize: "0.85rem" }}>{row.itemName}</Typography>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {isEditing ? (
                            <SmallInput type="number" value={displayRow.mrp} onChange={(e) => changeEditBuffer("mrp", Number(e.target.value))} min={0} />
                          ) : (
                            <Chip label={`₹ ${row.mrp}`} size="small"
                              sx={{ bgcolor: c.chipBgSoft, color: c.textSec, border: `1px solid ${c.border10}`, fontSize: "0.7rem", fontWeight: 600, height: "24px" }} />
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {isEditing ? (
                            <SmallInput type="number" value={displayRow.rate} onChange={(e) => changeEditBuffer("rate", Number(e.target.value))} min={0} />
                          ) : (
                            <Typography sx={{ color: c.textSec, fontWeight: 700, fontSize: "0.85rem" }}>₹ {row.rate}</Typography>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {isEditing ? (
                            <SmallInput type="number" value={displayRow.quantity} onChange={(e) => changeEditBuffer("quantity", Number(e.target.value))} min={1} />
                          ) : (
                            <Typography sx={{ color: c.textSec, fontWeight: 700, fontSize: "0.85rem" }}>{row.quantity}</Typography>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography sx={{ color: c.emeraldText, fontWeight: 800, fontSize: "0.95rem" }}>
                            ₹ {Number(displayRow.totalAmount || 0).toLocaleString("en-IN")}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {isEditing ? (
                            <Box display="flex" justifyContent="center" gap={0.5}>
                              <Tooltip title="Save">
                                <IconButton size="small" onClick={saveEditRow} sx={{ color: c.emeraldText, "&:hover": { bgcolor: "rgba(52, 211, 153, 0.15)" } }}>
                                  <CheckIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Cancel">
                                <IconButton size="small" onClick={cancelEditRow} sx={{ color: c.muted, "&:hover": { bgcolor: c.chipBgSoft } }}>
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          ) : (
                            <Box display="flex" justifyContent="center" gap={0.5}>
                              <Tooltip title="Edit item">
                                <IconButton size="small" onClick={() => startEditRow(idx)} disabled={editingRowIndex !== null}
                                  sx={{ color: c.amberText, "&:hover": { bgcolor: "rgba(251, 191, 36, 0.15)" }, "&.Mui-disabled": { color: "rgba(251, 191, 36, 0.3)" } }}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Remove item">
                                <IconButton size="small" onClick={() => removeRow(idx)} disabled={editingRowIndex !== null}
                                  sx={{ color: "#f43f5e", "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" }, "&.Mui-disabled": { color: "rgba(244, 63, 94, 0.3)" } }}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </ItemsTable>
          </TableScrollArea>
        </TableContainerDark>

        {/* FOOTER */}
        <FooterBar>
          <Box>
            <Typography sx={{ color: c.muted, fontSize: "0.7rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", mb: 0.3 }}>
              Grand Total
            </Typography>
            <Typography sx={{ color: c.amberText, fontWeight: 900, fontSize: { xs: "1.3rem", sm: "1.6rem" }, textShadow: dark ? "0 0 20px rgba(251, 191, 36, 0.4)" : "none", lineHeight: 1.2 }}>
              ₹ {grandTotal.toLocaleString("en-IN")}
            </Typography>
          </Box>
          <Box display="flex" gap={1.5} flexWrap="wrap">
            <Button variant="outlined" onClick={handleCancel} disabled={saving}
              sx={{ color: c.muted, borderColor: c.border15, fontWeight: 700, textTransform: "none", borderRadius: "10px", px: 3, py: 1.2, "&:hover": { borderColor: c.muted, bgcolor: c.chipBgSoft } }}>
              Cancel
            </Button>
            <Button variant="contained" startIcon={saving ? <CircularProgress size={16} sx={{ color: "#0f172a" }} /> : <SaveIcon />}
              onClick={handleSave} disabled={saving || rows.length === 0}
              sx={{ bgcolor: "#fbbf24", color: "#0f172a", fontWeight: 800, textTransform: "none", borderRadius: "10px", px: 3, py: 1.2, boxShadow: "0 4px 14px rgba(251, 191, 36, 0.3)", "&:hover": { bgcolor: "#f59e0b" }, "&.Mui-disabled": { bgcolor: "rgba(251, 191, 36, 0.3)", color: "rgba(255,255,255,0.5)" } }}>
              {saving ? "Updating..." : "Update Return"}
            </Button>
          </Box>
        </FooterBar>
      </Box>
    </Box>
  );
};

export default ReturnItemsEdit;