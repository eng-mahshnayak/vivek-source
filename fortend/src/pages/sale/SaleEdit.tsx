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
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   InputAdornment,
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
// } from "@mui/icons-material";

// // ===================== TYPES =====================

// interface Product {
//   _id: string;
//   itemName: string;
//   mrp: number;
//   rate: number;
//   unit: string;
// }



// interface SaleRow {
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
// }));

// const FormCard = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "20px",
//   marginBottom: "16px",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
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

// const TableContainerDark = styled(TableContainer)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   overflow: "hidden",
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
//   "&:hover": { backgroundColor: "rgba(251, 191, 36, 0.05)" },
//   "& .MuiTableCell-body": {
//     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "12px",
//   },
// }));

// const SmallInput = styled("input")(() => ({
//   width: "80px",
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

// const TotalCard = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(251, 191, 36, 0.3)",
//   padding: "20px 28px",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginTop: "16px",
//   boxShadow: "0 8px 20px rgba(251, 191, 36, 0.1)",
// }));

// // ===================== MAIN COMPONENT =====================

// const SaleEdit: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();


//   const [selectedCustomer, setSelectedCustomer] = useState<string>("");
//   const [saleDate, setSaleDate] = useState<string>("");

//   const [productSearch, setProductSearch] = useState<string>("");
//   const [searchResults, setSearchResults] = useState<Product[]>([]);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   const [currentQty, setCurrentQty] = useState<number>(1);
//   const [currentRate, setCurrentRate] = useState<number>(0);

//   const [rows, setRows] = useState<SaleRow[]>([]);

//   const [saving, setSaving] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(true);

//   const searchRef = useRef<HTMLDivElement>(null);



//   // Fetch sale
//   useEffect(() => {
//     const fetchSale = async () => {
//       try {
//         setFetchLoading(true);
//         const res = await axios.get(`${API_URL}/sale/${id}`, getAuthHeaders());

//         if (res.data?.success === true) {
//           const s = res.data.data;

//           setSelectedCustomer(
//             typeof s.customerId === "object" ? s.customerId._id : s.customerId
//           );

//           const d = new Date(s.date);
//           const formattedDate = d.toISOString().split("T")[0];
//           setSaleDate(formattedDate);

//           const mappedRows: SaleRow[] = (s.items || []).map((it: any) => ({
//             productId:
//               typeof it.productId === "object"
//                 ? it.productId._id
//                 : it.productId,
//             itemName: it.itemName,
//             mrp: it.mrp,
//             rate: it.rate,
//             quantity: it.quantity,
//             totalAmount: it.totalAmount,
//             unit: it.unit || "",
//           }));
//           setRows(mappedRows);
//         }
//       } catch (error: any) {
//         console.error(error);
//         if (error.response?.data?.message === "Unauthorized") {
//           toast.error("Session expired! Please login again");
//           localStorage.removeItem("erptoken");
//           setTimeout(() => navigate("/login"), 1500);
//         } else {
//           toast.error(error.response?.data?.message || "Failed to fetch sale");
//         }
//       } finally {
//         setFetchLoading(false);
//       }
//     };

//     if (id) fetchSale();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   // Outside click
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
//   };

//   const updateRow = (
//     index: number,
//     field: "quantity" | "rate",
//     value: number
//   ) => {
//     const updated = [...rows];
//     if (value < 0) value = 0;
//     updated[index][field] = value;
//     updated[index].totalAmount =
//       Number(updated[index].quantity) * Number(updated[index].rate);
//     setRows(updated);
//   };

//   const removeRow = (index: number) => {
//     setRows(rows.filter((_, i) => i !== index));
//   };

//   const grandTotal = rows.reduce((sum, r) => sum + r.totalAmount, 0);

//   const handleSave = async () => {
   
//     if (rows.length === 0) {
//       toast.error("Please add at least one item");
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         customerId: selectedCustomer,
//         items: rows.map((r) => ({
//           productId: r.productId,
//           itemName: r.itemName,
//           mrp: r.mrp,
//           rate: r.rate,
//           quantity: r.quantity,
//         })),
//         date: saleDate,
//       };

//       const res = await axios.put(
//         `${API_URL}/sale/${id}`,
//         payload,
//         getAuthHeaders()
//       );

//       if (res.data.success === true) {
//         toast.success("Sale updated successfully! 🎉");
//         setTimeout(() => navigate("/sale/invoice-list"), 1200);
//       } else if (res.data.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to update sale");
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
//         toast.error(error.response?.data?.message || "Failed to update sale");
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     if (!window.confirm("Discard changes?")) return;
//     navigate("/load-items");
//   };

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
//         <Typography sx={{ color: "#9ca3af" }}>Loading sale...</Typography>
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
//                     width: 40,
//                     height: 40,
//                     borderRadius: "10px",
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
//                     <FiberManualRecord sx={{ fontSize: 10, color: "#fbbf24" }} />
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
//                     EDIT SALE INVOICE
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* ================= CUSTOMER + DATE ================= */}
//         <FormCard>
//           <Grid container spacing={2}>
           

//             <Grid size={{ xs: 12, md: 6 }}>
//               <FieldLabel>Sale Date</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="date"
//                 value={saleDate}
//                 onChange={(e) => setSaleDate(e.target.value)}
//               />
//             </Grid>
//           </Grid>
//         </FormCard>

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
//               Add Item
//             </Typography>
//           </Box>

//           <Grid container spacing={2}>
//             <Grid size={{ xs: 12, md: 5 }} ref={searchRef} sx={{ position: "relative" }}>
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
//                         <Typography sx={{ color: "#9ca3af", fontSize: "0.75rem" }}>
//                           MRP: ₹{p.mrp}
//                         </Typography>
//                       </Box>
//                       <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.3 }}>
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
//           <Table>
//             <StyledTableHead>
//               <TableRow>
//                 <TableCell>#</TableCell>
//                 <TableCell>Item Name</TableCell>
//                 <TableCell align="center">MRP</TableCell>
//                 <TableCell align="center">Rate</TableCell>
//                 <TableCell align="center">Quantity</TableCell>
//                 <TableCell align="center">Total Amount</TableCell>
//                 <TableCell align="center">Action</TableCell>
//               </TableRow>
//             </StyledTableHead>
//             <TableBody>
//               {rows.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
//                     <ShoppingCart sx={{ fontSize: 48, color: "#374151", mb: 1 }} />
//                     <Typography sx={{ color: "#9ca3af", mb: 0.5 }}>
//                       No items added yet
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 rows.map((row, idx) => (
//                   <StyledTableRow key={idx}>
//                     <TableCell sx={{ color: "#6b7280" }}>{idx + 1}</TableCell>
//                     <TableCell>
//                       <Typography
//                         sx={{ color: "#ffffff", fontWeight: 700, fontSize: "0.85rem" }}
//                       >
//                         {row.itemName}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Chip
//                         label={`₹ ${row.mrp}`}
//                         size="small"
//                         sx={{
//                           bgcolor: "rgba(156, 163, 175, 0.1)",
//                           color: "#e5e7eb",
//                           border: "1px solid rgba(156, 163, 175, 0.2)",
//                           fontSize: "0.7rem",
//                           fontWeight: 600,
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <SmallInput
//                         type="number"
//                         value={row.rate}
//                         onChange={(e) =>
//                           updateRow(idx, "rate", Number(e.target.value))
//                         }
//                         min={0}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <SmallInput
//                         type="number"
//                         value={row.quantity}
//                         onChange={(e) =>
//                           updateRow(idx, "quantity", Number(e.target.value))
//                         }
//                         min={1}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Typography
//                         sx={{ color: "#34d399", fontWeight: 800, fontSize: "0.95rem" }}
//                       >
//                         ₹ {row.totalAmount.toLocaleString()}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         size="small"
//                         onClick={() => removeRow(idx)}
//                         sx={{
//                           color: "#f43f5e",
//                           "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
//                         }}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </TableCell>
//                   </StyledTableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainerDark>

//         {/* ================= GRAND TOTAL ================= */}
//         <TotalCard>
//           <Typography
//             sx={{
//               color: "#ffffff",
//               fontWeight: 800,
//               fontSize: { xs: "0.95rem", sm: "1.1rem" },
//               letterSpacing: 0.5,
//             }}
//           >
//             GRAND TOTAL:
//           </Typography>
//           <Typography
//             sx={{
//               color: "#fbbf24",
//               fontWeight: 900,
//               fontSize: { xs: "1.5rem", sm: "1.9rem" },
//               textShadow: "0 0 20px rgba(251, 191, 36, 0.4)",
//             }}
//           >
//             ₹ {grandTotal.toLocaleString()}
//           </Typography>
//         </TotalCard>

//         {/* ================= ACTIONS ================= */}
//         <Box
//           display="flex"
//           justifyContent="flex-end"
//           gap={1.5}
//           flexWrap="wrap"
//           mt={3}
//         >
//           <Button
//             variant="outlined"
//             onClick={handleCancel}
//             disabled={saving}
//             sx={{
//               color: "#9ca3af",
//               borderColor: "rgba(156, 163, 175, 0.3)",
//               fontWeight: 700,
//               textTransform: "none",
//               borderRadius: "10px",
//               px: 3,
//               py: 1.2,
//               "&:hover": {
//                 borderColor: "#9ca3af",
//                 bgcolor: "rgba(156, 163, 175, 0.08)",
//               },
//             }}
//           >
//             Cancel
//           </Button>

//           <Button
//             variant="contained"
//             startIcon={saving ? <CircularProgress size={16} sx={{ color: "#0d1527" }} /> : <SaveIcon />}
//             onClick={handleSave}
//             disabled={saving || rows.length === 0 || !selectedCustomer}
//             sx={{
//               bgcolor: "#fbbf24",
//               color: "#0d1527",
//               fontWeight: 800,
//               textTransform: "none",
//               borderRadius: "10px",
//               px: 3,
//               py: 1.2,
//               boxShadow: "0 4px 14px rgba(251, 191, 36, 0.3)",
//               "&:hover": { bgcolor: "#f59e0b" },
//               "&.Mui-disabled": {
//                 bgcolor: "rgba(251, 191, 36, 0.3)",
//                 color: "rgba(255, 255, 255, 0.5)",
//               },
//             }}
//           >
//             {saving ? "Updating..." : "Update Invoice"}
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default SaleEdit;



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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Search,
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  FiberManualRecord,
  Edit as EditIcon,
  ShoppingCart,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface Product {
  _id: string;
  itemName: string;
  mrp: number;
  rate: number;
  unit: string;
}

interface SaleRow {
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

// ===================== STYLED COMPONENTS =====================

const DarkBanner = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px 24px",
  marginBottom: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  flexShrink: 0,
}));

const FormCard = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px",
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
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(251, 191, 36, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fbbf24",
      borderWidth: "1.5px",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(255, 255, 255, 0.02)",
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
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#6b7280",
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

// Table container with flex chain (for internal scroll)
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
    backgroundColor: "rgba(251, 191, 36, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(251, 191, 36, 0.5)" },
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
    backgroundColor: "#111827",
    color: "#9ca3af",
    fontWeight: 700,
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "16px 12px",
    whiteSpace: "nowrap",
    textAlign: "left",
  },
  "& tbody tr": {
    transition: "all 0.2s ease",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  "& tbody tr:hover": { backgroundColor: "rgba(251, 191, 36, 0.05)" },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "12px",
  },
}));

const SmallInput = styled("input")(() => ({
  width: "80px",
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
    borderColor: "#fbbf24",
    boxShadow: "0 0 0 3px rgba(251, 191, 36, 0.1)",
  },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&[type=number]": {
    MozAppearance: "textfield",
  },
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
  border: "1px solid rgba(251, 191, 36, 0.3)",
  padding: "16px 24px",
  boxShadow: "0 8px 20px rgba(251, 191, 36, 0.1)",
}));

// ===================== MAIN COMPONENT =====================

const SaleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [saleDate, setSaleDate] = useState<string>("");

  const [productSearch, setProductSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [currentQty, setCurrentQty] = useState<number>(1);
  const [currentRate, setCurrentRate] = useState<number>(0);

  const [rows, setRows] = useState<SaleRow[]>([]);

  const [saving, setSaving] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch sale
  useEffect(() => {
    const fetchSale = async () => {
      try {
        setFetchLoading(true);
        const res = await axios.get(`${API_URL}/sale/${id}`, getAuthHeaders());

        if (res.data?.success === true) {
          const s = res.data.data;

          setSelectedCustomer(
            typeof s.customerId === "object" ? s.customerId._id : s.customerId
          );

          const d = new Date(s.date);
          const formattedDate = d.toISOString().split("T")[0];
          setSaleDate(formattedDate);

          const mappedRows: SaleRow[] = (s.items || []).map((it: any) => ({
            productId:
              typeof it.productId === "object"
                ? it.productId._id
                : it.productId,
            itemName: it.itemName,
            mrp: it.mrp,
            rate: it.rate,
            quantity: it.quantity,
            totalAmount: it.totalAmount,
            unit: it.unit || "",
          }));
          setRows(mappedRows);
        }
      } catch (error: any) {
        console.error(error);
        if (error.response?.data?.message === "Unauthorized") {
          toast.error("Session expired! Please login again");
          localStorage.removeItem("erptoken");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          toast.error(error.response?.data?.message || "Failed to fetch sale");
        }
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) fetchSale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Search products
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
  };

  const updateRow = (
    index: number,
    field: "quantity" | "rate",
    value: number
  ) => {
    const updated = [...rows];
    if (value < 0) value = 0;
    updated[index][field] = value;
    updated[index].totalAmount =
      Number(updated[index].quantity) * Number(updated[index].rate);
    setRows(updated);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const grandTotal = rows.reduce((sum, r) => sum + r.totalAmount, 0);

  const handleSave = async () => {
    if (rows.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        customerId: selectedCustomer,
        items: rows.map((r) => ({
          productId: r.productId,
          itemName: r.itemName,
          mrp: r.mrp,
          rate: r.rate,
          quantity: r.quantity,
        })),
        date: saleDate,
      };

      const res = await axios.put(
        `${API_URL}/sale/${id}`,
        payload,
        getAuthHeaders()
      );

      if (res.data.success === true) {
        toast.success("Sale updated successfully! 🎉");
        setTimeout(() => navigate("/sale/invoice-list"), 1200);
      } else if (res.data.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to update sale");
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
        toast.error(error.response?.data?.message || "Failed to update sale");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!window.confirm("Discard changes?")) return;
    navigate("/load-items");
  };

  // ===================== LOADING =====================
  if (fetchLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#090d16",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "#fbbf24" }} />
        <Typography sx={{ color: "#9ca3af" }}>Loading sale...</Typography>
      </Box>
    );
  }

  // ===================== MAIN RENDER =====================
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
                onClick={handleCancel}
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
                    borderColor: "#fbbf24",
                    color: "#fbbf24",
                    bgcolor: "rgba(251, 191, 36, 0.08)",
                  },
                }}
              >
                Back
              </Button>

              <Box display="flex" alignItems="center" gap={1.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: "#332208",
                    color: "#fbbf24",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EditIcon />
                </Box>
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <FiberManualRecord
                      sx={{ fontSize: 10, color: "#fbbf24" }}
                    />
                    <Typography
                      sx={{
                        color: "#fbbf24",
                        letterSpacing: 0.5,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                      }}
                    >
                      Edit Mode
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                      letterSpacing: 0.5,
                    }}
                  >
                    EDIT SALE INVOICE
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Sale Date on the right */}
            <Box sx={{ width: { xs: "100%", sm: 180 } }}>
              <FieldLabel>Sale Date</FieldLabel>
              <StyledTextField
                fullWidth
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                size="small"
              />
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= ADD ITEM ================= */}
        <FormCard>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Search sx={{ color: "#fbbf24", fontSize: 20 }} />
            <Typography
              sx={{
                color: "#fbbf24",
                fontWeight: 800,
                fontSize: "0.85rem",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Add Item
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, md: 5 }}
              ref={searchRef}
              sx={{ position: "relative" }}
            >
              <FieldLabel>Search Item</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="Type item name..."
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  if (selectedProduct) setSelectedProduct(null);
                }}
                onFocus={() => {
                  if (searchResults.length > 0) setShowSearchResults(true);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#6b7280", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
              />

              {showSearchResults && searchResults.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 0.5,
                    bgcolor: "#111827",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    maxHeight: "280px",
                    overflowY: "auto",
                    zIndex: 50,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {searchResults.map((p) => (
                    <Box
                      key={p._id}
                      onClick={() => handleSelectProduct(p)}
                      sx={{
                        px: 2,
                        py: 1.2,
                        cursor: "pointer",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                        "&:hover": { bgcolor: "rgba(251, 191, 36, 0.1)" },
                        "&:last-child": { borderBottom: "none" },
                      }}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                        >
                          {p.itemName}
                        </Typography>
                        <Typography
                          sx={{ color: "#9ca3af", fontSize: "0.75rem" }}
                        >
                          MRP: ₹{p.mrp}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.7rem", mt: 0.3 }}
                      >
                        Rate: ₹{p.rate} / {p.unit}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FieldLabel>Item Name</FieldLabel>
              <StyledTextField
                fullWidth
                value={selectedProduct?.itemName || ""}
                disabled
                placeholder="Selected item"
              />
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>MRP</FieldLabel>
              <StyledTextField
                fullWidth
                value={selectedProduct?.mrp ?? ""}
                disabled
                placeholder="-"
              />
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>Rate</FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                value={currentRate || ""}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                disabled={!selectedProduct}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>Qty</FieldLabel>
              <StyledTextField
                fullWidth
                type="number"
                value={currentQty || ""}
                onChange={(e) => setCurrentQty(Number(e.target.value))}
                disabled={!selectedProduct}
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 1 }}>
              <FieldLabel>&nbsp;</FieldLabel>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddItem}
                disabled={!selectedProduct}
                sx={{
                  bgcolor: "#fbbf24",
                  color: "#0d1527",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  height: "42px",
                  minWidth: "auto",
                  px: 1,
                  boxShadow: "0 4px 14px rgba(251, 191, 36, 0.3)",
                  "&:hover": { bgcolor: "#f59e0b" },
                  "&.Mui-disabled": {
                    bgcolor: "rgba(251, 191, 36, 0.3)",
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </FormCard>

        {/* ================= ITEMS TABLE (SCROLLABLE) ================= */}
        <TableContainerDark>
          {/* Header (fixed) */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={3}
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
                fontSize: "0.9rem",
                letterSpacing: 0.5,
              }}
            >
              LOAD ITEMS LIST
            </Typography>
            <Chip
              label={`${rows.length} item${rows.length !== 1 ? "s" : ""}`}
              size="small"
              sx={{
                bgcolor: "rgba(251, 191, 36, 0.1)",
                color: "#fbbf24",
                border: "1px solid rgba(251, 191, 36, 0.3)",
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
                  <th style={{ textAlign: "center" }}>MRP</th>
                  <th style={{ textAlign: "center" }}>Rate</th>
                  <th style={{ textAlign: "center" }}>Quantity</th>
                  <th style={{ textAlign: "center" }}>Total Amount</th>
                  <th style={{ textAlign: "center", width: "80px" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <ShoppingCart
                        style={{
                          fontSize: 44,
                          color: "#374151",
                          marginBottom: 8,
                        }}
                      />
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.9rem" }}
                      >
                        No items added yet
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
                      >
                        Search item above and click + to add
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  rows.map((row, idx) => (
                    <tr key={idx}>
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
                      <td style={{ textAlign: "center" }}>
                        <SmallInput
                          type="number"
                          value={row.rate}
                          onChange={(e) =>
                            updateRow(idx, "rate", Number(e.target.value))
                          }
                          min={0}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <SmallInput
                          type="number"
                          value={row.quantity}
                          onChange={(e) =>
                            updateRow(idx, "quantity", Number(e.target.value))
                          }
                          min={1}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Typography
                          sx={{
                            color: "#34d399",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                          }}
                        >
                          ₹ {row.totalAmount.toLocaleString()}
                        </Typography>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => removeRow(idx)}
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
        </TableContainerDark>

        {/* ================= FOOTER (Grand Total + Actions) ================= */}
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
              Grand Total
            </Typography>
            <Typography
              sx={{
                color: "#fbbf24",
                fontWeight: 900,
                fontSize: { xs: "1.3rem", sm: "1.6rem" },
                textShadow: "0 0 20px rgba(251, 191, 36, 0.4)",
                lineHeight: 1.2,
              }}
            >
              ₹ {grandTotal.toLocaleString()}
            </Typography>
          </Box>

          <Box display="flex" gap={1.5} flexWrap="wrap">
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
                py: 1.2,
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
                  <CircularProgress size={16} sx={{ color: "#0d1527" }} />
                ) : (
                  <SaveIcon />
                )
              }
              onClick={handleSave}
              disabled={saving || rows.length === 0}
              sx={{
                bgcolor: "#fbbf24",
                color: "#0d1527",
                fontWeight: 800,
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1.2,
                boxShadow: "0 4px 14px rgba(251, 191, 36, 0.3)",
                "&:hover": { bgcolor: "#f59e0b" },
                "&.Mui-disabled": {
                  bgcolor: "rgba(251, 191, 36, 0.3)",
                  color: "rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              {saving ? "Updating..." : "Update Invoice"}
            </Button>
          </Box>
        </FooterBar>
      </Box>
    </Box>
  );
};

export default SaleEdit;