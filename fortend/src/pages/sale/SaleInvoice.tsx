// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   Chip,
//   CircularProgress,
//   Checkbox,
//   Autocomplete,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   ArrowBack,
//   Save as SaveIcon,
//   FiberManualRecord,
//   Receipt,
//   ShoppingCart,
//   Clear as ClearIcon,
// } from "@mui/icons-material";

// interface Product {
//   _id: string;
//   itemName: string;
//   mrp: number;
//   rate: number;
//   unit: string;
// }

// interface RowState {
//   productId: string;
//   itemName: string;
//   mrp: number;
//   unit: string;
//   rate: number;
//   qty: number;
//   selected: boolean;
// }

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const getAuthHeaders = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
//   },
// });

// const DarkBanner = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "16px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "14px 16px",
//   marginBottom: "12px",
//   boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
//   flexShrink: 0,
// }));

// const ToolbarBar = styled(Box)(() => ({
//   backgroundColor: "#0d1527",
//   borderRadius: "14px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "10px 14px",
//   marginBottom: "12px",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   gap: "10px",
//   flexWrap: "wrap",
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
//     "&.Mui-focused fieldset": { borderColor: "#38bdf8", borderWidth: "1.5px" },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#ffffff",
//     fontSize: "0.85rem",
//     padding: "10px 12px",
//     "&::placeholder": { color: "#6b7280", opacity: 1 },
//     "&::-webkit-calendar-picker-indicator": { filter: "invert(1)", cursor: "pointer" },
//   },
//   "& .MuiInputLabel-root": {
//     color: "#9ca3af",
//     fontSize: "0.78rem",
//     "&.Mui-focused": { color: "#38bdf8" },
//   },
// }));

// const FieldLabel = styled(Typography)(() => ({
//   color: "#9ca3af",
//   fontWeight: 700,
//   fontSize: "0.7rem",
//   letterSpacing: 1,
//   textTransform: "uppercase",
//   marginBottom: "6px",
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
//   position: "relative",
//   "&::after": {
//     content: '""',
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: "3px",
//     background:
//       "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.7), transparent)",
//     pointerEvents: "none",
//     zIndex: 10,
//   },
// }));

// /* ✅ 1 inch (~96px) bottom padding — last item upar, scroll aa jaayega */
// const TableScrollArea = styled(Box)(() => ({
//   overflow: "auto",
//   flex: 1,
//   minHeight: 0,
//   overscrollBehavior: "contain",
//   WebkitOverflowScrolling: "touch",
//   paddingBottom: "96px",
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
//   minWidth: "760px",
//   borderCollapse: "collapse",
//   tableLayout: "fixed",
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
//     fontSize: "0.68rem",
//     textTransform: "uppercase",
//     letterSpacing: "0.8px",
//     borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
//     padding: "10px 8px",
//     whiteSpace: "nowrap",
//     textAlign: "left",
//   },
//   "& tbody tr": {
//     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//     transition: "background 0.15s ease",
//   },
//   "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },

//   "& tbody tr:last-child": {
//     borderBottom: "2px solid rgba(56, 189, 248, 0.4)",
//   },
//   "& tbody tr:last-child td": {
//     borderBottom: "2px solid rgba(56, 189, 248, 0.4)",
//   },

//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.83rem",
//     padding: "8px 8px",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap",
//   },
// }));

// const SmallInput = styled("input")(() => ({
//   width: "72px",
//   padding: "6px 6px",
//   borderRadius: "8px",
//   backgroundColor: "#090d16",
//   border: "1px solid rgba(255, 255, 255, 0.12)",
//   color: "#ffffff",
//   fontSize: "0.82rem",
//   fontWeight: 700,
//   textAlign: "center",
//   outline: "none",
//   transition: "all 0.15s ease",
//   "&:focus": {
//     borderColor: "#38bdf8",
//     boxShadow: "0 0 0 2px rgba(56, 189, 248, 0.15)",
//   },
//   "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
//     WebkitAppearance: "none",
//     margin: 0,
//   },
//   "&[type=number]": { MozAppearance: "textfield" },
// }));

// const SaleInvoice: React.FC = () => {
//   const navigate = useNavigate();

//   const [saleDate, setSaleDate] = useState<string>(
//     new Date().toISOString().split("T")[0]
//   );
//   const [route, setRoute] = useState<string>("");
//   const [routeOptions, setRouteOptions] = useState<string[]>([]);

//   const [rows, setRows] = useState<RowState[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const fetchRoutes = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/route-direction-sale`, {
//         params: { page: 1, limit: 1000 },
//         ...getAuthHeaders(),
//       });
//       if (res.data?.success) {
//         const unique: any = Array.from(
//           new Set(
//             (res.data.data || [])
//               .map((d: any) => String(d.route || "").trim())
//               .filter(Boolean)
//           )
//         );
//         setRouteOptions(unique);
//       }
//     } catch (err) {
//       console.error("Fetch routes error:", err);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API_URL}/product`, {
//         params: { page: 1, limit: 10000 },
//         ...getAuthHeaders(),
//       });
//       if (res.data?.success) {
//         const products: Product[] = res.data.data || [];
//         setRows(
//           products.map((p) => ({
//             productId: p._id,
//             itemName: p.itemName,
//             mrp: p.mrp || 0,
//             unit: p.unit || "",
//             rate: p.rate || 0,
//             qty: 0,
//             selected: false,
//           }))
//         );
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired!");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       }
//     } catch (error: any) {
//       console.error("Fetch products error:", error);
//       toast.error(error.response?.data?.message || "Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchRoutes();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const toggleRow = (idx: number) => {
//     setRows((prev) => {
//       const copy = [...prev];
//       copy[idx].selected = !copy[idx].selected;
//       if (copy[idx].selected && (!copy[idx].qty || copy[idx].qty <= 0)) {
//         copy[idx].qty = 1;
//       }
//       return copy;
//     });
//   };

//   const updateRow = (idx: number, field: "rate" | "qty", value: number) => {
//     setRows((prev) => {
//       const copy = [...prev];
//       if (value < 0) value = 0;
//       copy[idx][field] = value;
//       if (field === "qty" && value > 0) copy[idx].selected = true;
//       return copy;
//     });
//   };

//   const clearAll = () => {
//     setRows((prev) => prev.map((r) => ({ ...r, selected: false, qty: 0 })));
//   };

//   const visibleRows = useMemo(() => rows, [rows]);

//   const selectedRows = rows.filter((r) => r.selected && r.qty > 0);
//   const grandTotal = selectedRows.reduce(
//     (sum, r) => sum + Number(r.rate) * Number(r.qty),
//     0
//   );
//   const totalQty = selectedRows.reduce((sum, r) => sum + Number(r.qty), 0);

//   const handleSave = async () => {
//     if (selectedRows.length === 0) {
//       toast.error("Please select at least one item");
//       return;
//     }
//     if (!route.trim()) {
//       toast.error("Please enter/select a route");
//       return;
//     }

//     try {
//       setSaving(true);
//       const payload = {
//         items: selectedRows.map((r) => ({
//           productId: r.productId,
//           itemName: r.itemName,
//           mrp: r.mrp,
//           rate: Number(r.rate),
//           quantity: Number(r.qty),
//         })),
//         route: route.trim(),
//         date: saleDate,
//       };

//       const res = await axios.post(`${API_URL}/sale`, payload, getAuthHeaders());
//       if (res.data.success === true) {
//         toast.success(`${selectedRows.length} items loaded successfully! 🎉`);
//         setTimeout(() => navigate("/load-items"), 1000);
//       } else if (res.data.message === "Unauthorized") {
//         toast.error("Session expired!");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to save");
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to save");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     if (selectedRows.length > 0) {
//       if (!window.confirm("Discard this sale?")) return;
//     }
//     navigate(-1);
//   };

//   return (
//     <Box
//       sx={{
//         height: { xs: "100dvh", md: "100vh" },
//         maxHeight: { xs: "100dvh", md: "100vh" },
//         overflow: "hidden",
//         bgcolor: "#090d16",
//         px: { xs: 1, sm: 2, md: 3 },
//         py: { xs: 1, md: 2 },
//         color: "#ffffff",
//         display: "flex",
//         flexDirection: "column",
//         boxSizing: "border-box",
//         overscrollBehavior: "none",
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
//           overflow: "hidden",
//         }}
//       >
//         {/* ================= HEADER ================= */}
//         <DarkBanner>
//           <Box
//             display="flex"
//             flexDirection={{ xs: "column", md: "row" }}
//             justifyContent="space-between"
//             alignItems={{ xs: "stretch", md: "center" }}
//             gap={1.5}
//           >
//             <Box display="flex" alignItems="center" gap={1.2}>
//               <Button
//                 variant="outlined"
//                 startIcon={<ArrowBack />}
//                 onClick={() => navigate(-1)}
//                 sx={{
//                   color: "#e5e7eb",
//                   borderColor: "rgba(255, 255, 255, 0.15)",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: { xs: 1.5, sm: 2 },
//                   py: 0.7,
//                   fontSize: "0.76rem",
//                   minWidth: "auto",
//                   "&:hover": { borderColor: "#38bdf8", color: "#38bdf8" },
//                 }}
//               >
//                 Back
//               </Button>

//               <Box display="flex" alignItems="center" gap={1}>
//                 <Box
//                   sx={{
//                     width: 34,
//                     height: 34,
//                     borderRadius: "10px",
//                     bgcolor: "#0c2a3a",
//                     color: "#38bdf8",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <Receipt sx={{ fontSize: 18 }} />
//                 </Box>
//                 <Box sx={{ minWidth: 0 }}>
//                   <Box display="flex" alignItems="center" gap={0.5} mb={0.1}>
//                     <FiberManualRecord sx={{ fontSize: 8, color: "#10b981" }} />
//                     <Typography
//                       sx={{
//                         color: "#10b981",
//                         letterSpacing: 0.4,
//                         fontSize: "0.62rem",
//                         fontWeight: 700,
//                       }}
//                     >
//                       Logistic Management
//                     </Typography>
//                   </Box>
//                   <Typography
//                     variant="h6"
//                     fontWeight="800"
//                     sx={{
//                       fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" },
//                       lineHeight: 1.15,
//                     }}
//                   >
//                     LOAD ITEMS
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>

//             <Box
//               display="flex"
//               flexWrap="wrap"
//               gap={1}
//               sx={{ width: { xs: "100%", md: "auto" } }}
//             >
//               <Box sx={{ width: { xs: "100%", sm: 145 } }}>
//                 <FieldLabel>Sale Date *</FieldLabel>
//                 <StyledTextField
//                   fullWidth
//                   type="date"
//                   value={saleDate}
//                   onChange={(e) => setSaleDate(e.target.value)}
//                   size="small"
//                 />
//               </Box>

//               <Box sx={{ width: { xs: "100%", sm: 210 } }}>
//                 <FieldLabel>Route *</FieldLabel>
//                 <Autocomplete
//                   freeSolo
//                   options={routeOptions}
//                   value={route}
//                   onChange={(_, v) => setRoute(v || "")}
//                   onInputChange={(_, v) => setRoute(v || "")}
//                   size="small"
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       placeholder="Select/type route"
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: "10px",
//                           backgroundColor: "#090d16",
//                           color: "#fff",
//                           height: "42px",
//                           padding: "0 8px",
//                           "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
//                           "&.Mui-focused fieldset": { borderColor: "#2dd4bf" },
//                         },
//                         "& .MuiOutlinedInput-input": {
//                           color: "#fff",
//                           fontSize: "0.82rem",
//                           padding: "8px 4px",
//                           "&::placeholder": { color: "#6b7280", opacity: 1 },
//                         },
//                       }}
//                     />
//                   )}
//                   slotProps={{
//                     paper: {
//                       sx: {
//                         bgcolor: "#111827",
//                         color: "#e5e7eb",
//                         "& .MuiAutocomplete-option": { fontSize: "0.82rem" },
//                       },
//                     },
//                   }}
//                 />
//               </Box>

//               <Box
//                 sx={{
//                   width: { xs: "100%", sm: 165 },
//                   height: "42px",
//                   borderRadius: "10px",
//                   backgroundColor: "rgba(52, 211, 153, 0.08)",
//                   border: "1px solid rgba(52, 211, 153, 0.35)",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   px: 1.5,
//                   py: 0.3,
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     color: "#9ca3af",
//                     fontSize: "0.58rem",
//                     fontWeight: 700,
//                     letterSpacing: 0.5,
//                     textTransform: "uppercase",
//                     lineHeight: 1,
//                   }}
//                 >
//                   Total ({selectedRows.length} items · {totalQty} qty)
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: "#34d399",
//                     fontWeight: 900,
//                     fontSize: "0.92rem",
//                     lineHeight: 1.2,
//                     mt: 0.2,
//                   }}
//                 >
//                   ₹ {grandTotal.toLocaleString()}
//                 </Typography>
//               </Box>

//               <Box
//                 display="flex"
//                 gap={1}
//                 sx={{ width: { xs: "100%", sm: "auto" } }}
//               >
//                 <Button
//                   variant="outlined"
//                   onClick={handleCancel}
//                   disabled={saving}
//                   sx={{
//                     flex: { xs: 1, sm: "initial" },
//                     color: "#9ca3af",
//                     borderColor: "rgba(156, 163, 175, 0.3)",
//                     fontWeight: 700,
//                     textTransform: "none",
//                     borderRadius: "10px",
//                     px: { xs: 1.5, sm: 2.5 },
//                     py: 1,
//                     fontSize: "0.76rem",
//                     height: "42px",
//                     whiteSpace: "nowrap",
//                     "&:hover": {
//                       borderColor: "#9ca3af",
//                       bgcolor: "rgba(156, 163, 175, 0.08)",
//                     },
//                   }}
//                 >
//                   Cancel
//                 </Button>

//                 <Button
//                   variant="contained"
//                   startIcon={
//                     saving ? (
//                       <CircularProgress size={14} sx={{ color: "#fff" }} />
//                     ) : (
//                       <SaveIcon sx={{ fontSize: 18 }} />
//                     )
//                   }
//                   onClick={handleSave}
//                   disabled={saving || selectedRows.length === 0}
//                   sx={{
//                     flex: { xs: 1, sm: "initial" },
//                     bgcolor: "#10b981",
//                     color: "#ffffff",
//                     fontWeight: 800,
//                     textTransform: "none",
//                     borderRadius: "10px",
//                     px: { xs: 1.5, sm: 2.5 },
//                     py: 1,
//                     fontSize: "0.76rem",
//                     height: "42px",
//                     whiteSpace: "nowrap",
//                     "&:hover": { bgcolor: "#059669" },
//                     "&.Mui-disabled": {
//                       bgcolor: "rgba(16, 185, 129, 0.3)",
//                       color: "rgba(255,255,255,0.5)",
//                     },
//                   }}
//                 >
//                   {saving ? "Saving..." : `Save (${selectedRows.length})`}
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* ================= TOOLBAR ================= */}
//         <ToolbarBar>
//           <Box display="flex" gap={0.8} flexWrap="wrap" alignItems="center">
//             <Chip
//               label={`Total: ${rows.length}`}
//               size="small"
//               sx={{
//                 bgcolor: "rgba(156, 163, 175, 0.1)",
//                 color: "#9ca3af",
//                 border: "1px solid rgba(156, 163, 175, 0.2)",
//                 fontWeight: 700,
//                 fontSize: "0.65rem",
//                 height: "24px",
//               }}
//             />
//             <Chip
//               label={`Selected: ${selectedRows.length}`}
//               size="small"
//               sx={{
//                 bgcolor: "rgba(56, 189, 248, 0.1)",
//                 color: "#38bdf8",
//                 border: "1px solid rgba(56, 189, 248, 0.3)",
//                 fontWeight: 700,
//                 fontSize: "0.65rem",
//                 height: "24px",
//               }}
//             />
//             <Chip
//               label={`Qty: ${totalQty}`}
//               size="small"
//               sx={{
//                 bgcolor: "rgba(192, 132, 252, 0.1)",
//                 color: "#c084fc",
//                 border: "1px solid rgba(192, 132, 252, 0.3)",
//                 fontWeight: 700,
//                 fontSize: "0.65rem",
//                 height: "24px",
//               }}
//             />
//           </Box>

//           <Button
//             size="small"
//             variant="outlined"
//             startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
//             onClick={clearAll}
//             sx={{
//               color: "#f43f5e",
//               borderColor: "rgba(244, 63, 94, 0.4)",
//               fontWeight: 700,
//               textTransform: "none",
//               borderRadius: "8px",
//               px: 1.5,
//               py: 0.5,
//               fontSize: "0.7rem",
//               height: "30px",
//               "&:hover": {
//                 borderColor: "#f43f5e",
//                 bgcolor: "rgba(244, 63, 94, 0.08)",
//               },
//             }}
//           >
//             Clear All
//           </Button>
//         </ToolbarBar>

//         {/* ================= TABLE ================= */}
//         <TableContainerDark>
//           <TableScrollArea>
//             <ItemsTable>
//               <thead>
//                 <tr>
//                   <th style={{ textAlign: "center", width: "52px" }}>Sel</th>
//                   <th style={{ textAlign: "center", width: "40px" }}>#</th>
//                   <th style={{ textAlign: "left" }}>Item Name</th>
//                   <th style={{ textAlign: "center", width: "72px" }}>MRP</th>
//                   <th style={{ textAlign: "center", width: "55px" }}>Unit</th>
//                   <th style={{ textAlign: "center", width: "92px" }}>Rate</th>
//                   <th style={{ textAlign: "center", width: "92px" }}>Qty</th>
//                   <th style={{ textAlign: "right", width: "100px" }}>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan={8} style={{ textAlign: "center", padding: "40px" }}>
//                       <CircularProgress sx={{ color: "#38bdf8" }} size={32} />
//                     </td>
//                   </tr>
//                 ) : visibleRows.length === 0 ? (
//                   <tr>
//                     <td colSpan={8} style={{ textAlign: "center", padding: "40px" }}>
//                       <ShoppingCart style={{ fontSize: 44, color: "#374151" }} />
//                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}>
//                         No products found
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   visibleRows.map((row, idx) => {
//                     const rowTotal =
//                       row.selected && row.qty > 0
//                         ? Number(row.rate) * Number(row.qty)
//                         : 0;
//                     return (
//                       <tr
//                         key={row.productId}
//                         style={{
//                           backgroundColor: row.selected
//                             ? "rgba(52, 211, 153, 0.05)"
//                             : "transparent",
//                         }}
//                       >
//                         <td style={{ textAlign: "center" }}>
//                           <Checkbox
//                             size="small"
//                             checked={row.selected}
//                             onChange={() => toggleRow(idx)}
//                             sx={{
//                               color: "#6b7280",
//                               padding: "2px",
//                               "&.Mui-checked": { color: "#34d399" },
//                             }}
//                           />
//                         </td>
//                         <td
//                           style={{
//                             textAlign: "center",
//                             color: "#6b7280",
//                             fontSize: "0.75rem",
//                           }}
//                         >
//                           {idx + 1}
//                         </td>
//                         <td style={{ textAlign: "left" }}>
//                           <Typography
//                             sx={{
//                               color: "#ffffff",
//                               fontWeight: 700,
//                               fontSize: "0.82rem",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               whiteSpace: "nowrap",
//                             }}
//                             title={row.itemName}
//                           >
//                             {row.itemName}
//                           </Typography>
//                         </td>
//                         <td
//                           style={{
//                             textAlign: "center",
//                             color: "#e5e7eb",
//                             fontSize: "0.8rem",
//                             fontWeight: 600,
//                           }}
//                         >
//                           ₹ {row.mrp}
//                         </td>
//                         <td
//                           style={{
//                             textAlign: "center",
//                             color: "#9ca3af",
//                             fontSize: "0.72rem",
//                           }}
//                         >
//                           {row.unit || "-"}
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <SmallInput
//                             type="number"
//                             value={row.rate || ""}
//                             onChange={(e) =>
//                               updateRow(idx, "rate", Number(e.target.value))
//                             }
//                             placeholder="0"
//                             min={0}
//                           />
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <SmallInput
//                             type="number"
//                             value={row.qty || ""}
//                             onChange={(e) =>
//                               updateRow(idx, "qty", Number(e.target.value))
//                             }
//                             placeholder="0"
//                             min={0}
//                           />
//                         </td>
//                         <td style={{ textAlign: "right" }}>
//                           <Typography
//                             sx={{
//                               color: rowTotal > 0 ? "#34d399" : "#6b7280",
//                               fontWeight: 800,
//                               fontSize: "0.85rem",
//                             }}
//                           >
//                             ₹ {rowTotal.toLocaleString()}
//                           </Typography>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </ItemsTable>
//           </TableScrollArea>
//         </TableContainerDark>
//       </Box>
//     </Box>
//   );
// };

// export default SaleInvoice;



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
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  ArrowBack,
  Save as SaveIcon,
  FiberManualRecord,
  Receipt,
  ShoppingCart,
  Clear as ClearIcon,
} from "@mui/icons-material";

interface Product {
  _id: string;
  itemName: string;
  mrp: number;
  rate: number;
  unit: string;
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

const isDark = (theme: any) => theme.palette.mode === "dark";

const DarkBanner = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(15, 23, 42, 0.08)",
  padding: "14px 16px",
  marginBottom: "12px",
  boxShadow: isDark(theme)
    ? "0 10px 30px rgba(0, 0, 0, 0.5)"
    : "0 6px 20px rgba(15, 23, 42, 0.06)",
  flexShrink: 0,
  transition: "all 0.3s ease",
}));

const ToolbarBar = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "14px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(15, 23, 42, 0.08)",
  padding: "10px 14px",
  marginBottom: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
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
    "&::-webkit-calendar-picker-indicator": {
      filter: isDark(theme) ? "invert(1)" : "none",
      cursor: "pointer",
    },
  },
  "& .MuiInputLabel-root": {
    color: isDark(theme) ? "#9ca3af" : "#64748b",
    fontSize: "0.78rem",
    "&.Mui-focused": { color: "#0ea5e9" },
  },
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  color: isDark(theme) ? "#9ca3af" : "#64748b",
  fontWeight: 700,
  fontSize: "0.7rem",
  letterSpacing: 1,
  textTransform: "uppercase",
  marginBottom: "6px",
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
  position: "relative",
  transition: "all 0.3s ease",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "3px",
    background:
      "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.7), transparent)",
    pointerEvents: "none",
    zIndex: 10,
  },
}));

const TableScrollArea = styled(Box)(({ theme }) => ({
  overflow: "auto",
  flex: 1,
  minHeight: 0,
  overscrollBehavior: "contain",
  WebkitOverflowScrolling: "touch",
  paddingBottom: "96px",
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
    minWidth: "760px",
    borderCollapse: "collapse",
    tableLayout: "fixed",
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
      fontSize: "0.68rem",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      borderBottom: dark
        ? "1px solid rgba(255, 255, 255, 0.08)"
        : "1px solid rgba(15, 23, 42, 0.08)",
      padding: "10px 8px",
      whiteSpace: "nowrap",
      textAlign: "left",
    },
    "& tbody tr": {
      borderBottom: dark
        ? "1px solid rgba(255, 255, 255, 0.05)"
        : "1px solid rgba(15, 23, 42, 0.05)",
      transition: "background 0.15s ease",
    },
    "& tbody tr:hover": { backgroundColor: "rgba(56, 189, 248, 0.04)" },

    "& tbody tr:last-child": {
      borderBottom: "2px solid rgba(56, 189, 248, 0.4)",
    },
    "& tbody tr:last-child td": {
      borderBottom: "2px solid rgba(56, 189, 248, 0.4)",
    },

    "& tbody td": {
      color: dark ? "#e5e7eb" : "#334155",
      fontSize: "0.83rem",
      padding: "8px 8px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };
});

const SmallInput = styled("input")(({ theme }) => ({
  width: "72px",
  padding: "6px 6px",
  borderRadius: "8px",
  backgroundColor: isDark(theme) ? "#090d16" : "#f8fafc",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.12)"
    : "1px solid rgba(15, 23, 42, 0.12)",
  color: isDark(theme) ? "#ffffff" : "#0f172a",
  fontSize: "0.82rem",
  fontWeight: 700,
  textAlign: "center",
  outline: "none",
  transition: "all 0.15s ease",
  "&:focus": {
    borderColor: "#0ea5e9",
    boxShadow: "0 0 0 2px rgba(56, 189, 248, 0.15)",
  },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&[type=number]": { MozAppearance: "textfield" },
}));

const SaleInvoice: React.FC = () => {
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
    emeraldText: dark ? "#34d399" : "#059669",
    purpleText: dark ? "#c084fc" : "#7e22ce",
    chipBgSoft: dark
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(15, 23, 42, 0.04)",
    dropdownBg: dark ? "#111827" : "#ffffff",
  };

  const [saleDate, setSaleDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [route, setRoute] = useState<string>("");
  const [routeOptions, setRouteOptions] = useState<string[]>([]);

  const [rows, setRows] = useState<RowState[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchRoutes = async () => {
    try {
      const res = await axios.get(`${API_URL}/route-direction-sale`, {
        params: { page: 1, limit: 1000 },
        ...getAuthHeaders(),
      });
      if (res.data?.success) {
        const unique: any = Array.from(
          new Set(
            (res.data.data || [])
              .map((d: any) => String(d.route || "").trim())
              .filter(Boolean)
          )
        );
        setRouteOptions(unique);
      }
    } catch (err) {
      console.error("Fetch routes error:", err);
    }
  };

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
        toast.error("Session expired!");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error: any) {
      console.error("Fetch products error:", error);
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRoutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      if (field === "qty" && value > 0) copy[idx].selected = true;
      return copy;
    });
  };

  const clearAll = () => {
    setRows((prev) => prev.map((r) => ({ ...r, selected: false, qty: 0 })));
  };

  const visibleRows = useMemo(() => rows, [rows]);

  const selectedRows = rows.filter((r) => r.selected && r.qty > 0);
  const grandTotal = selectedRows.reduce(
    (sum, r) => sum + Number(r.rate) * Number(r.qty),
    0
  );
  const totalQty = selectedRows.reduce((sum, r) => sum + Number(r.qty), 0);

  const handleSave = async () => {
    if (selectedRows.length === 0) {
      toast.error("Please select at least one item");
      return;
    }
    if (!route.trim()) {
      toast.error("Please enter/select a route");
      return;
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
        })),
        route: route.trim(),
        date: saleDate,
      };

      const res = await axios.post(
        `${API_URL}/sale`,
        payload,
        getAuthHeaders()
      );
      if (res.data.success === true) {
        toast.success(`${selectedRows.length} items loaded successfully! 🎉`);
        setTimeout(() => navigate("/load-items"), 1000);
      } else if (res.data.message === "Unauthorized") {
        toast.error("Session expired!");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to save");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (selectedRows.length > 0) {
      if (!window.confirm("Discard this sale?")) return;
    }
    navigate(-1);
  };

  return (
    <Box
      sx={{
        height: { xs: "100dvh", md: "100vh" },
        maxHeight: { xs: "100dvh", md: "100vh" },
        overflow: "hidden",
        bgcolor: c.pageBg,
        px: { xs: 1, sm: 2, md: 3 },
        py: { xs: 1, md: 2 },
        color: c.text,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overscrollBehavior: "none",
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
          overflow: "hidden",
        }}
      >
        {/* ================= HEADER ================= */}
        <DarkBanner>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", md: "center" }}
            gap={1.5}
          >
            <Box display="flex" alignItems="center" gap={1.2}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{
                  color: c.textSec,
                  borderColor: c.border15,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: { xs: 1.5, sm: 2 },
                  py: 0.7,
                  fontSize: "0.76rem",
                  minWidth: "auto",
                  "&:hover": {
                    borderColor: "#0ea5e9",
                    color: "#0ea5e9",
                    bgcolor: "rgba(56, 189, 248, 0.08)",
                  },
                }}
              >
                Back
              </Button>

              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "10px",
                    bgcolor: c.skyIconBg,
                    color: c.skyText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Receipt sx={{ fontSize: 18 }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Box display="flex" alignItems="center" gap={0.5} mb={0.1}>
                    <FiberManualRecord sx={{ fontSize: 8, color: "#10b981" }} />
                    <Typography
                      sx={{
                        color: "#10b981",
                        letterSpacing: 0.4,
                        fontSize: "0.62rem",
                        fontWeight: 700,
                      }}
                    >
                      Logistic Management
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="800"
                    sx={{
                      fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" },
                      lineHeight: 1.15,
                      color: c.text,
                    }}
                  >
                    LOAD ITEMS
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              <Box sx={{ width: { xs: "100%", sm: 145 } }}>
                <FieldLabel>Sale Date *</FieldLabel>
                <StyledTextField
                  fullWidth
                  type="date"
                  value={saleDate}
                  onChange={(e) => setSaleDate(e.target.value)}
                  size="small"
                />
              </Box>

              <Box sx={{ width: { xs: "100%", sm: 210 } }}>
                <FieldLabel>Route *</FieldLabel>
                <Autocomplete
                  freeSolo
                  options={routeOptions}
                  value={route}
                  onChange={(_, v) => setRoute(v || "")}
                  onInputChange={(_, v) => setRoute(v || "")}
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select/type route"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          backgroundColor: dark ? "#090d16" : "#f8fafc",
                          color: c.text,
                          height: "42px",
                          padding: "0 8px",
                          "& fieldset": { borderColor: c.border10 },
                          "&.Mui-focused fieldset": { borderColor: "#2dd4bf" },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: c.text,
                          fontSize: "0.82rem",
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
                        bgcolor: c.dropdownBg,
                        color: c.textSec,
                        border: `1px solid ${c.border08}`,
                        "& .MuiAutocomplete-option": { fontSize: "0.82rem" },
                      },
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: { xs: "100%", sm: 165 },
                  height: "42px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(52, 211, 153, 0.08)",
                  border: "1px solid rgba(52, 211, 153, 0.35)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  px: 1.5,
                  py: 0.3,
                }}
              >
                <Typography
                  sx={{
                    color: c.muted,
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    lineHeight: 1,
                  }}
                >
                  Total ({selectedRows.length} items · {totalQty} qty)
                </Typography>
                <Typography
                  sx={{
                    color: c.emeraldText,
                    fontWeight: 900,
                    fontSize: "0.92rem",
                    lineHeight: 1.2,
                    mt: 0.2,
                  }}
                >
                  ₹ {grandTotal.toLocaleString()}
                </Typography>
              </Box>

              <Box
                display="flex"
                gap={1}
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={saving}
                  sx={{
                    flex: { xs: 1, sm: "initial" },
                    color: c.muted,
                    borderColor: dark
                      ? "rgba(156, 163, 175, 0.3)"
                      : "rgba(100, 116, 139, 0.3)",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "10px",
                    px: { xs: 1.5, sm: 2.5 },
                    py: 1,
                    fontSize: "0.76rem",
                    height: "42px",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      borderColor: c.muted,
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
                      <CircularProgress size={14} sx={{ color: "#fff" }} />
                    ) : (
                      <SaveIcon sx={{ fontSize: 18 }} />
                    )
                  }
                  onClick={handleSave}
                  disabled={saving || selectedRows.length === 0}
                  sx={{
                    flex: { xs: 1, sm: "initial" },
                    bgcolor: "#10b981",
                    color: "#ffffff",
                    fontWeight: 800,
                    textTransform: "none",
                    borderRadius: "10px",
                    px: { xs: 1.5, sm: 2.5 },
                    py: 1,
                    fontSize: "0.76rem",
                    height: "42px",
                    whiteSpace: "nowrap",
                    "&:hover": { bgcolor: "#059669" },
                    "&.Mui-disabled": {
                      bgcolor: "rgba(16, 185, 129, 0.3)",
                      color: "rgba(255,255,255,0.5)",
                    },
                  }}
                >
                  {saving ? "Saving..." : `Save (${selectedRows.length})`}
                </Button>
              </Box>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= TOOLBAR ================= */}
        <ToolbarBar>
          <Box display="flex" gap={0.8} flexWrap="wrap" alignItems="center">
            <Chip
              label={`Total: ${rows.length}`}
              size="small"
              sx={{
                bgcolor: c.chipBgSoft,
                color: c.muted,
                border: `1px solid ${c.border10}`,
                fontWeight: 700,
                fontSize: "0.65rem",
                height: "24px",
              }}
            />
            <Chip
              label={`Selected: ${selectedRows.length}`}
              size="small"
              sx={{
                bgcolor: "rgba(56, 189, 248, 0.1)",
                color: c.skyText,
                border: "1px solid rgba(56, 189, 248, 0.3)",
                fontWeight: 700,
                fontSize: "0.65rem",
                height: "24px",
              }}
            />
            <Chip
              label={`Qty: ${totalQty}`}
              size="small"
              sx={{
                bgcolor: "rgba(192, 132, 252, 0.1)",
                color: c.purpleText,
                border: "1px solid rgba(192, 132, 252, 0.3)",
                fontWeight: 700,
                fontSize: "0.65rem",
                height: "24px",
              }}
            />
          </Box>

          <Button
            size="small"
            variant="outlined"
            startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
            onClick={clearAll}
            sx={{
              color: "#f43f5e",
              borderColor: "rgba(244, 63, 94, 0.4)",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "8px",
              px: 1.5,
              py: 0.5,
              fontSize: "0.7rem",
              height: "30px",
              "&:hover": {
                borderColor: "#f43f5e",
                bgcolor: "rgba(244, 63, 94, 0.08)",
              },
            }}
          >
            Clear All
          </Button>
        </ToolbarBar>

        {/* ================= TABLE ================= */}
        <TableContainerDark>
          <TableScrollArea>
            <ItemsTable>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "52px" }}>Sel</th>
                  <th style={{ textAlign: "center", width: "40px" }}>#</th>
                  <th style={{ textAlign: "left" }}>Item Name</th>
                  <th style={{ textAlign: "center", width: "72px" }}>MRP</th>
                  <th style={{ textAlign: "center", width: "55px" }}>Unit</th>
                  <th style={{ textAlign: "center", width: "92px" }}>Rate</th>
                  <th style={{ textAlign: "center", width: "92px" }}>Qty</th>
                  <th style={{ textAlign: "right", width: "100px" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", padding: "40px" }}
                    >
                      <CircularProgress sx={{ color: "#0ea5e9" }} size={32} />
                    </td>
                  </tr>
                ) : visibleRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", padding: "40px" }}
                    >
                      <ShoppingCart
                        style={{ fontSize: 44, color: c.veryMuted }}
                      />
                      <Typography
                        sx={{ color: c.muted, fontSize: "0.9rem", mt: 1 }}
                      >
                        No products found
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  visibleRows.map((row, idx) => {
                    const rowTotal =
                      row.selected && row.qty > 0
                        ? Number(row.rate) * Number(row.qty)
                        : 0;
                    return (
                      <tr
                        key={row.productId}
                        style={{
                          backgroundColor: row.selected
                            ? dark
                              ? "rgba(52, 211, 153, 0.05)"
                              : "rgba(52, 211, 153, 0.07)"
                            : "transparent",
                        }}
                      >
                        <td style={{ textAlign: "center" }}>
                          <Checkbox
                            size="small"
                            checked={row.selected}
                            onChange={() => toggleRow(idx)}
                            sx={{
                              color: c.mutedDark,
                              padding: "2px",
                              "&.Mui-checked": {
                                color: dark ? "#34d399" : "#059669",
                              },
                            }}
                          />
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            color: c.mutedDark,
                            fontSize: "0.75rem",
                          }}
                        >
                          {idx + 1}
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <Typography
                            sx={{
                              color: c.text,
                              fontWeight: 700,
                              fontSize: "0.82rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            title={row.itemName}
                          >
                            {row.itemName}
                          </Typography>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            color: c.textSec,
                            fontSize: "0.8rem",
                            fontWeight: 600,
                          }}
                        >
                          ₹ {row.mrp}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            color: c.muted,
                            fontSize: "0.72rem",
                          }}
                        >
                          {row.unit || "-"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <SmallInput
                            type="number"
                            value={row.rate || ""}
                            onChange={(e) =>
                              updateRow(idx, "rate", Number(e.target.value))
                            }
                            placeholder="0"
                            min={0}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <SmallInput
                            type="number"
                            value={row.qty || ""}
                            onChange={(e) =>
                              updateRow(idx, "qty", Number(e.target.value))
                            }
                            placeholder="0"
                            min={0}
                          />
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <Typography
                            sx={{
                              color: rowTotal > 0 ? c.emeraldText : c.mutedDark,
                              fontWeight: 800,
                              fontSize: "0.85rem",
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
      </Box>
    </Box>
  );
};

export default SaleInvoice;