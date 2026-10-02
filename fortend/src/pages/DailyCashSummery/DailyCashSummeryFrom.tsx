



// import React, { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Grid,
//   Card,
//   InputAdornment,
//   Tooltip,
//   Chip,
//   IconButton,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {
//   AddCircle as AddCircleIcon,
//   Clear as ClearIcon,
//   CalendarToday as CalendarIcon,
//   FiberManualRecord,
//   ArrowBack,
//   Refresh,
//   Delete as DeleteIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import { styled } from "@mui/material/styles";

// interface OnlinePayment {
//   amount: number | "";
//   note: string;
// }

// interface CashForm {
//   note500: number;
//   note200: number;
//   note100: number;
//   note50: number;
//   note20: number;
//   note10: number;
//   coins: number;
// }

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const getTodayDate = (): string => {
//   const today = new Date();
//   const y = today.getFullYear();
//   const m = String(today.getMonth() + 1).padStart(2, "0");
//   const d = String(today.getDate()).padStart(2, "0");
//   return `${y}-${m}-${d}`;
// };

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

// const FormCard = styled(Card)(() => ({
//   borderRadius: "16px",
//   backgroundColor: "#0d1527",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   overflow: "hidden",
//   flex: 1,
//   display: "flex",
//   flexDirection: "column",
//   minHeight: 0,
// }));

// const FormScrollArea = styled(Box)(() => ({
//   overflowY: "auto",
//   flex: 1,
//   minHeight: 0,
//   padding: "20px 22px",
//   "&::-webkit-scrollbar": { width: "8px" },
//   "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "rgba(16, 185, 129, 0.3)",
//     borderRadius: "8px",
//   },
// }));

// const SectionCard = styled(Box)(() => ({
//   backgroundColor: "#111827",
//   borderRadius: "12px",
//   border: "1px solid rgba(255, 255, 255, 0.08)",
//   padding: "16px 20px",
//   marginBottom: "16px",
// }));

// const RowCard = styled(Box)<{ isactive?: boolean }>(({ isactive }) => ({
//   backgroundColor: isactive ? "rgba(16, 185, 129, 0.05)" : "#0d1527",
//   borderRadius: "10px",
//   border: isactive
//     ? "1px solid rgba(16, 185, 129, 0.3)"
//     : "1px solid rgba(255, 255, 255, 0.05)",
//   padding: "12px 16px",
//   display: "flex",
//   alignItems: "center",
//   gap: "12px",
//   transition: "all 0.2s ease",
//   "&:hover": { borderColor: "rgba(16, 185, 129, 0.3)" },
// }));

// const DenomLabel = styled(Typography)(() => ({
//   color: "#e5e7eb",
//   fontWeight: 700,
//   fontSize: "0.9rem",
//   minWidth: "70px",
// }));

// const StyledTextField = styled(TextField)(() => ({
//   width: "100px",
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "8px",
//     backgroundColor: "#090d16",
//     color: "#ffffff",
//     height: "40px",
//     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
//     "&:hover fieldset": { borderColor: "rgba(16, 185, 129, 0.4)" },
//     "&.Mui-focused fieldset": {
//       borderColor: "#10b981",
//       borderWidth: "1.5px",
//     },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#ffffff",
//     fontSize: "0.9rem",
//     fontWeight: 700,
//     textAlign: "center",
//     padding: "8px 10px",
//     "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
//       WebkitAppearance: "none",
//       margin: 0,
//     },
//     "&[type=number]": { MozAppearance: "textfield" },
//   },
// }));

// const TotalRow = styled(Box)<{ variant?: "cash" | "count" | "grand" }>(
//   ({ variant }) => {
//     let bg = "#111827";
//     let border = "1px solid rgba(16, 185, 129, 0.3)";
//     if (variant === "count") {
//       bg = "rgba(192, 132, 252, 0.15)";
//       border = "1px solid rgba(192, 132, 252, 0.3)";
//     } else if (variant === "grand") {
//       bg = "rgba(56, 189, 248, 0.08)";
//       border = "1px solid rgba(56, 189, 248, 0.3)";
//     }
//     return {
//       backgroundColor: bg,
//       borderRadius: "10px",
//       border,
//       padding: "14px 20px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       gap: "12px",
//     };
//   }
// );

// const denominations = [
//   { key: "note500", value: 500, color: "#38bdf8" },
//   { key: "note200", value: 200, color: "#c084fc" },
//   { key: "note100", value: 100, color: "#fbbf24" },
//   { key: "note50", value: 50, color: "#f43f5e" },
//   { key: "note20", value: 20, color: "#2dd4bf" },
//   { key: "note10", value: 10, color: "#a78bfa" },
//   { key: "coins", value: 1, color: "#fb923c" },
// ];

// // ===================== MAIN =====================

// const DailyCashCreate: React.FC = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState<CashForm>({
//     note500: 0,
//     note200: 0,
//     note100: 0,
//     note50: 0,
//     note20: 0,
//     note10: 0,
//     coins: 0,
//   });

//   const [onlinePayments, setOnlinePayments] = useState<OnlinePayment[]>([
//     { amount: "", note: "" },
//   ]);

//   const [date, setDate] = useState(getTodayDate());
//   const [loading, setLoading] = useState(false);

//   const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const num = value === "" ? 0 : Number(value);
//     setFormData({ ...formData, [name]: Math.max(0, num) });
//   };

//   // Online
//   const addOnlineRow = () => {
//     setOnlinePayments([...onlinePayments, { amount: "", note: "" }]);
//   };

//   const removeOnlineRow = (i: number) => {
//     if (onlinePayments.length === 1) {
//       setOnlinePayments([{ amount: "", note: "" }]);
//       return;
//     }
//     setOnlinePayments(onlinePayments.filter((_, idx) => idx !== i));
//   };

//   const updateOnlineRow = (
//     i: number,
//     field: keyof OnlinePayment,
//     value: any
//   ) => {
//     const updated = [...onlinePayments];
//     if (field === "amount") {
//       updated[i].amount = value === "" ? "" : Math.max(0, Number(value));
//     } else {
//       updated[i].note = value;
//     }
//     setOnlinePayments(updated);
//   };

//   const calculateCashTotal = () =>
//     denominations.reduce(
//       (s, d) => s + (formData[d.key as keyof CashForm] as number) * d.value,
//       0
//     );

//   const calculateOnlineTotal = () =>
//     onlinePayments.reduce((s, p) => s + (Number(p.amount) || 0), 0);

//   const calculateTotal = () => calculateCashTotal() + calculateOnlineTotal();

//   const calculateNoteCount = () =>
//     denominations.reduce(
//       (s, d) => s + (formData[d.key as keyof CashForm] as number),
//       0
//     );

//   const handleClear = () => {
//     setFormData({
//       note500: 0,
//       note200: 0,
//       note100: 0,
//       note50: 0,
//       note20: 0,
//       note10: 0,
//       coins: 0,
//     });
//     setOnlinePayments([{ amount: "", note: "" }]);
//     setDate(getTodayDate());
//     toast.success("Reset successfully");
//   };

//   const handleSubmit = async () => {
//     if (calculateTotal() <= 0) {
//       toast.error("Total must be greater than 0");
//       return;
//     }
//     if (!date) {
//       toast.error("Date is required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const cleanedOnline = onlinePayments
//         .filter((p) => Number(p.amount) > 0)
//         .map((p) => ({ amount: Number(p.amount), note: p.note || "" }));

//       const res = await axios.post(
//         `${API_URL}/dailycash`,
//         {
//           formData,
//           onlinePayments: cleanedOnline,
//           total: calculateTotal(),
//           date,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
//           },
//         }
//       );

//       if (res.data?.success === true) {
//         toast.success("Entry created successfully! 🎉");
//         navigate("/note-summary-entry");
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to create entry");
//       }
//     } catch (e: any) {
//       if (!e.response) toast.error("Network error!");
//       else if (e.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(e.response?.data?.message || "Failed to create entry");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

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
//                 onClick={() => navigate("/note-summary-entry")}
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
//                     borderColor: "#10b981",
//                     color: "#10b981",
//                     bgcolor: "rgba(16, 185, 129, 0.08)",
//                   },
//                 }}
//               >
//                 Back
//               </Button>

//               <Box>
//                 <Box display="flex" alignItems="center" gap={1} mb={0.3}>
//                   <FiberManualRecord sx={{ fontSize: 10, color: "#10b981" }} />
//                   <Typography
//                     sx={{
//                       color: "#10b981",
//                       letterSpacing: 0.5,
//                       fontSize: "0.7rem",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Cash Management
//                   </Typography>
//                 </Box>
//                 <Typography
//                   variant="h5"
//                   fontWeight="800"
//                   sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" } }}
//                 >
//                   NEW CASH ENTRY
//                 </Typography>
//               </Box>
//             </Box>

//             <Button
//               variant="outlined"
//               startIcon={<Refresh />}
//               onClick={handleClear}
//               sx={{
//                 color: "#e5e7eb",
//                 borderColor: "rgba(255, 255, 255, 0.15)",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "10px",
//                 px: 2,
//                 py: 0.9,
//                 fontSize: "0.8rem",
//                 "&:hover": {
//                   borderColor: "#c084fc",
//                   color: "#c084fc",
//                   bgcolor: "rgba(192, 132, 252, 0.08)",
//                 },
//               }}
//             >
//               Reset
//             </Button>
//           </Box>
//         </DarkBanner>

//         {/* FORM */}
//         <FormCard>
//           <FormScrollArea>
//             {/* Date + Notes count */}
//             <Box sx={{ mb: 2 }}>
//               <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     bgcolor: "#111827",
//                     border: "1px solid rgba(255, 255, 255, 0.08)",
//                     borderRadius: "10px",
//                     px: 2,
//                     py: 0.8,
//                   }}
//                 >
//                   <CalendarIcon sx={{ color: "#38bdf8", fontSize: 18 }} />
//                   <Typography
//                     sx={{ color: "#9ca3af", fontWeight: 600, fontSize: "0.8rem" }}
//                   >
//                     Date:
//                   </Typography>
//                   <input
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     style={{
//                       background: "transparent",
//                       border: "none",
//                       color: "#ffffff",
//                       fontSize: "0.85rem",
//                       fontWeight: 700,
//                       outline: "none",
//                       cursor: "pointer",
//                       colorScheme: "dark",
//                     }}
//                   />
//                 </Box>

//                 <Chip
//                   label={`Total Notes: ${calculateNoteCount()}`}
//                   size="small"
//                   sx={{
//                     bgcolor: "rgba(56, 189, 248, 0.1)",
//                     color: "#38bdf8",
//                     border: "1px solid rgba(56, 189, 248, 0.3)",
//                     fontWeight: 700,
//                     fontSize: "0.7rem",
//                     height: "28px",
//                   }}
//                 />
//               </Box>
//             </Box>

//             {/* Denomination grid */}
//             <Grid container spacing={1.5} sx={{ mb: 2 }}>
//               {denominations.map((denom) => {
//                 const count = formData[denom.key as keyof CashForm] as number;
//                 const subtotal = count * denom.value;
//                 const isActive = count > 0;
//                 const label =
//                   denom.key === "coins" ? "Coins x" : `₹${denom.value} x`;
//                 return (
//                   <Grid size={{ xs: 12, sm: 6 }} key={denom.key}>
//                     <RowCard isactive={isActive}>
//                       <DenomLabel sx={{ color: denom.color }}>
//                         {label}
//                       </DenomLabel>
//                       <StyledTextField
//                         name={denom.key}
//                         type="number"
//                         value={count}
//                         onChange={handleCashChange}
//                         inputProps={{ min: 0 }}
//                       />
//                       <Box sx={{ flex: 1, textAlign: "right", minWidth: 100 }}>
//                         <Typography
//                           sx={{
//                             color: isActive ? denom.color : "#6b7280",
//                             fontWeight: 800,
//                             fontSize: "0.9rem",
//                           }}
//                         >
//                           ₹{" "}
//                           {subtotal.toLocaleString("en-IN", {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                           })}
//                         </Typography>
//                       </Box>
//                     </RowCard>
//                   </Grid>
//                 );
//               })}
//             </Grid>

//             {/* Notes count bar */}
//             <TotalRow variant="count" sx={{ mb: 2 }}>
//               <Typography
//                 sx={{
//                   color: "#c084fc",
//                   fontWeight: 800,
//                   fontSize: "0.85rem",
//                   letterSpacing: 0.5,
//                 }}
//               >
//                 TOTAL NOTES COUNT:
//               </Typography>
//               <Typography sx={{ color: "#fff", fontWeight: 800 }}>
//                 {calculateNoteCount()} Notes/Coins
//               </Typography>
//             </TotalRow>

//             {/* Online Payments Section */}
//             <SectionCard>
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 mb={1.5}
//               >
//                 <Box display="flex" alignItems="center" gap={1.5}>
//                   <Box
//                     sx={{
//                       width: 32,
//                       height: 32,
//                       borderRadius: "8px",
//                       bgcolor: "#2e1065",
//                       color: "#c084fc",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     💳
//                   </Box>
//                   <Box>
//                     <Typography
//                       sx={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}
//                     >
//                       Online / Digital Payments
//                     </Typography>
//                     <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem" }}>
//                       Add multiple UPI, Bank, Card entries
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Button
//                   size="small"
//                   variant="outlined"
//                   startIcon={<AddIcon />}
//                   onClick={addOnlineRow}
//                   sx={{
//                     color: "#22d3ee",
//                     borderColor: "rgba(34, 211, 238, 0.4)",
//                     fontWeight: 700,
//                     textTransform: "none",
//                     borderRadius: "8px",
//                     px: 1.5,
//                     fontSize: "0.75rem",
//                     "&:hover": {
//                       borderColor: "#22d3ee",
//                       bgcolor: "rgba(34, 211, 238, 0.08)",
//                     },
//                   }}
//                 >
//                   Add Entry
//                 </Button>
//               </Box>

//               <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                 {onlinePayments.map((p, i) => (
//                   <Box
//                     key={i}
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1.2,
//                       bgcolor: "#0d1527",
//                       border: "1px solid rgba(34, 211, 238, 0.15)",
//                       borderRadius: "10px",
//                       p: 1.2,
//                     }}
//                   >
//                     <Typography
//                       sx={{
//                         color: "#9ca3af",
//                         fontSize: "0.7rem",
//                         fontWeight: 700,
//                         minWidth: 60,
//                       }}
//                     >
//                       Entry #{i + 1}
//                     </Typography>

//                     <StyledTextField
//                       type="number"
//                       value={p.amount}
//                       onChange={(e) => updateOnlineRow(i, "amount", e.target.value)}
//                       placeholder="0"
//                       inputProps={{ min: 0 }}
//                       sx={{ width: 140 }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <Typography
//                               sx={{
//                                 color: "#22d3ee",
//                                 fontWeight: 700,
//                                 fontSize: "0.85rem",
//                               }}
//                             >
//                               ₹
//                             </Typography>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />

//                     <TextField
//                       value={p.note}
//                       onChange={(e) => updateOnlineRow(i, "note", e.target.value)}
//                       placeholder="Note (optional)"
//                       size="small"
//                       sx={{
//                         flex: 1,
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: "8px",
//                           backgroundColor: "#090d16",
//                           color: "#fff",
//                           height: "40px",
//                           "& fieldset": {
//                             borderColor: "rgba(255, 255, 255, 0.1)",
//                           },
//                           "&:hover fieldset": {
//                             borderColor: "rgba(34, 211, 238, 0.4)",
//                           },
//                           "&.Mui-focused fieldset": {
//                             borderColor: "#22d3ee",
//                           },
//                         },
//                         "& .MuiOutlinedInput-input": {
//                           color: "#fff",
//                           fontSize: "0.8rem",
//                           padding: "8px 12px",
//                         },
//                       }}
//                     />

//                     <IconButton
//                       size="small"
//                       onClick={() => removeOnlineRow(i)}
//                       sx={{
//                         color: "#f43f5e",
//                         "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
//                       }}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 ))}
//               </Box>

//               <Box
//                 sx={{
//                   mt: 1.5,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   bgcolor: "rgba(34, 211, 238, 0.08)",
//                   border: "1px solid rgba(34, 211, 238, 0.3)",
//                   borderRadius: "8px",
//                   px: 2,
//                   py: 1,
//                 }}
//               >
//                 <Typography
//                   sx={{ color: "#22d3ee", fontWeight: 800, fontSize: "0.8rem" }}
//                 >
//                   TOTAL ONLINE:
//                 </Typography>
//                 <Typography
//                   sx={{ color: "#22d3ee", fontWeight: 900, fontSize: "1rem" }}
//                 >
//                   ₹ {calculateOnlineTotal().toLocaleString("en-IN")}
//                 </Typography>
//               </Box>
//             </SectionCard>

//             {/* Physical cash total */}
//             <TotalRow variant="cash" sx={{ mb: 2 }}>
//               <Typography
//                 sx={{ color: "#10b981", fontWeight: 800, fontSize: "0.9rem" }}
//               >
//                 TOTAL PHYSICAL CASH:
//               </Typography>
//               <Typography
//                 sx={{
//                   color: "#c084fc",
//                   fontWeight: 900,
//                   fontSize: "1.5rem",
//                   textShadow: "0 0 20px rgba(192, 132, 252, 0.4)",
//                 }}
//               >
//                 ₹{" "}
//                 {calculateCashTotal().toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </Typography>
//             </TotalRow>

//             {/* Grand total */}
//             <TotalRow variant="grand" sx={{ mb: 2 }}>
//               <Typography
//                 sx={{ color: "#38bdf8", fontWeight: 800, fontSize: "0.85rem" }}
//               >
//                 GRAND TOTAL (CASH + ONLINE):
//               </Typography>
//               <Typography
//                 sx={{ color: "#38bdf8", fontWeight: 900, fontSize: "1.2rem" }}
//               >
//                 ₹{" "}
//                 {calculateTotal().toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </Typography>
//             </TotalRow>
//           </FormScrollArea>

//           {/* Footer actions */}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 1.5,
//               justifyContent: "flex-end",
//               flexWrap: "wrap",
//               p: "16px 22px",
//               borderTop: "1px solid rgba(255, 255, 255, 0.08)",
//               flexShrink: 0,
//             }}
//           >
//             <Tooltip title="Clear all fields">
//               <Button
//                 variant="outlined"
//                 startIcon={<ClearIcon />}
//                 onClick={handleClear}
//                 disabled={loading}
//                 sx={{
//                   borderColor: "rgba(244, 63, 94, 0.4)",
//                   color: "#f43f5e",
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   "&:hover": {
//                     borderColor: "#f43f5e",
//                     bgcolor: "rgba(244, 63, 94, 0.08)",
//                   },
//                 }}
//               >
//                 Clear
//               </Button>
//             </Tooltip>

//             <Button
//               variant="contained"
//               startIcon={<AddCircleIcon />}
//               onClick={handleSubmit}
//               disabled={loading}
//               sx={{
//                 bgcolor: "#10b981",
//                 color: "#fff",
//                 fontWeight: 800,
//                 textTransform: "none",
//                 borderRadius: "10px",
//                 px: 3,
//                 py: 1,
//                 boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
//                 "&:hover": { bgcolor: "#059669" },
//                 "&.Mui-disabled": {
//                   bgcolor: "rgba(16, 185, 129, 0.3)",
//                   color: "rgba(255, 255, 255, 0.5)",
//                 },
//               }}
//             >
//               {loading ? "Saving..." : "Save Entry"}
//             </Button>
//           </Box>
//         </FormCard>
//       </Box>
//     </Box>
//   );
// };

// export default DailyCashCreate;



import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  InputAdornment,
  Tooltip,
  Chip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  AddCircle as AddCircleIcon,
  Clear as ClearIcon,
  CalendarToday as CalendarIcon,
  FiberManualRecord,
  ArrowBack,
  Refresh,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface OnlinePayment {
  amount: number | "";
  note: string;
}

interface CashForm {
  note500: number;
  note200: number;
  note100: number;
  note50: number;
  note20: number;
  note10: number;
  coins: number;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getTodayDate = (): string => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

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

const FormCard = styled(Card)(() => ({
  borderRadius: "16px",
  backgroundColor: "#0d1527",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  overflow: "hidden",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
}));

const FormScrollArea = styled(Box)(() => ({
  overflowY: "auto",
  flex: 1,
  minHeight: 0,
  padding: "20px 22px",
  "&::-webkit-scrollbar": { width: "8px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(16, 185, 129, 0.3)",
    borderRadius: "8px",
  },
}));

const SectionCard = styled(Box)(() => ({
  backgroundColor: "#111827",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "16px 20px",
  marginBottom: "16px",
}));

const RowCard = styled(Box)<{ isactive?: boolean }>(({ isactive }) => ({
  backgroundColor: isactive ? "rgba(16, 185, 129, 0.05)" : "#0d1527",
  borderRadius: "10px",
  border: isactive
    ? "1px solid rgba(16, 185, 129, 0.3)"
    : "1px solid rgba(255, 255, 255, 0.05)",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  transition: "all 0.2s ease",
  "&:hover": { borderColor: "rgba(16, 185, 129, 0.3)" },
}));

const DenomLabel = styled(Typography)(() => ({
  color: "#e5e7eb",
  fontWeight: 700,
  fontSize: "0.9rem",
  minWidth: "70px",
}));

const StyledTextField = styled(TextField)(() => ({
  width: "100px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "40px",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
    "&:hover fieldset": { borderColor: "rgba(16, 185, 129, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#10b981",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.9rem",
    fontWeight: 700,
    textAlign: "center",
    padding: "8px 10px",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&[type=number]": { MozAppearance: "textfield" },
  },
}));

const TotalRow = styled(Box)<{ variant?: "cash" | "count" | "grand" }>(
  ({ variant }) => {
    let bg = "#111827";
    let border = "1px solid rgba(16, 185, 129, 0.3)";
    if (variant === "count") {
      bg = "rgba(192, 132, 252, 0.15)";
      border = "1px solid rgba(192, 132, 252, 0.3)";
    } else if (variant === "grand") {
      bg = "rgba(56, 189, 248, 0.08)";
      border = "1px solid rgba(56, 189, 248, 0.3)";
    }
    return {
      backgroundColor: bg,
      borderRadius: "10px",
      border,
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
    };
  }
);

const denominations = [
  { key: "note500", value: 500, color: "#38bdf8" },
  { key: "note200", value: 200, color: "#c084fc" },
  { key: "note100", value: 100, color: "#fbbf24" },
  { key: "note50", value: 50, color: "#f43f5e" },
  { key: "note20", value: 20, color: "#2dd4bf" },
  { key: "note10", value: 10, color: "#a78bfa" },
  { key: "coins", value: 1, color: "#fb923c" },
];

// ===================== MAIN =====================

const DailyCashCreate: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CashForm>({
    note500: 0,
    note200: 0,
    note100: 0,
    note50: 0,
    note20: 0,
    note10: 0,
    coins: 0,
  });

  const [onlinePayments, setOnlinePayments] = useState<OnlinePayment[]>([
    { amount: "", note: "" },
  ]);

  const [date, setDate] = useState(getTodayDate());
  const [loading, setLoading] = useState(false);

  const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const num = value === "" ? 0 : Number(value);
    setFormData({ ...formData, [name]: Math.max(0, num) });
  };

  // Online
  const addOnlineRow = () => {
    setOnlinePayments([...onlinePayments, { amount: "", note: "" }]);
  };

  const removeOnlineRow = (i: number) => {
    if (onlinePayments.length === 1) {
      setOnlinePayments([{ amount: "", note: "" }]);
      return;
    }
    setOnlinePayments(onlinePayments.filter((_, idx) => idx !== i));
  };

  const updateOnlineRow = (
    i: number,
    field: keyof OnlinePayment,
    value: any
  ) => {
    const updated = [...onlinePayments];
    if (field === "amount") {
      updated[i].amount = value === "" ? "" : Math.max(0, Number(value));
    } else {
      updated[i].note = value;
    }
    setOnlinePayments(updated);
  };

  const calculateCashTotal = () =>
    denominations.reduce(
      (s, d) => s + (formData[d.key as keyof CashForm] as number) * d.value,
      0
    );

  const calculateOnlineTotal = () =>
    onlinePayments.reduce((s, p) => s + (Number(p.amount) || 0), 0);

  const calculateTotal = () => calculateCashTotal() + calculateOnlineTotal();

  const calculateNoteCount = () =>
    denominations.reduce(
      (s, d) => s + (formData[d.key as keyof CashForm] as number),
      0
    );

  const handleClear = () => {
    setFormData({
      note500: 0,
      note200: 0,
      note100: 0,
      note50: 0,
      note20: 0,
      note10: 0,
      coins: 0,
    });
    setOnlinePayments([{ amount: "", note: "" }]);
    setDate(getTodayDate());
    toast.success("Reset successfully");
  };

  const handleSubmit = async () => {
    if (calculateTotal() <= 0) {
      toast.error("Total must be greater than 0");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      setLoading(true);

      const cleanedOnline = onlinePayments
        .filter((p) => Number(p.amount) > 0)
        .map((p) => ({ amount: Number(p.amount), note: p.note || "" }));

      const res = await axios.post(
        `${API_URL}/dailycash`,
        {
          formData,
          onlinePayments: cleanedOnline,
          total: calculateTotal(),
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
          },
        }
      );

      if (res.data?.success === true) {
        toast.success("Entry created successfully! 🎉");
        navigate("/note-summary-entry");
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to create entry");
      }
    } catch (e: any) {
      if (!e.response) toast.error("Network error!");
      else if (e.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(e.response?.data?.message || "Failed to create entry");
      }
    } finally {
      setLoading(false);
    }
  };

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
                onClick={() => navigate("/note-summary-entry")}
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
                Back
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
                  NEW CASH ENTRY
                </Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleClear}
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
                  borderColor: "#c084fc",
                  color: "#c084fc",
                  bgcolor: "rgba(192, 132, 252, 0.08)",
                },
              }}
            >
              Reset
            </Button>
          </Box>
        </DarkBanner>

        {/* FORM */}
        <FormCard>
          <FormScrollArea>
            {/* Date + Notes count */}
            <Box sx={{ mb: 2 }}>
              <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "#111827",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    px: 2,
                    py: 0.8,
                  }}
                >
                  <CalendarIcon sx={{ color: "#38bdf8", fontSize: 18 }} />
                  <Typography
                    sx={{ color: "#9ca3af", fontWeight: 600, fontSize: "0.8rem" }}
                  >
                    Date:
                  </Typography>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ffffff",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      outline: "none",
                      cursor: "pointer",
                      colorScheme: "dark",
                    }}
                  />
                </Box>

                <Chip
                  label={`Total Notes: ${calculateNoteCount()}`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    color: "#38bdf8",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "28px",
                  }}
                />
              </Box>
            </Box>

            {/* ===== TOP GRAND TOTAL (CASH + ONLINE) ===== */}
            <TotalRow variant="grand" sx={{ mb: 2 }}>
              <Typography
                sx={{ color: "#38bdf8", fontWeight: 800, fontSize: "0.85rem" }}
              >
                GRAND TOTAL (CASH + ONLINE):
              </Typography>
              <Typography
                sx={{ color: "#38bdf8", fontWeight: 900, fontSize: "1.2rem" }}
              >
                ₹{" "}
                {calculateTotal().toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </TotalRow>

            {/* Denomination grid */}
            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              {denominations.map((denom) => {
                const count = formData[denom.key as keyof CashForm] as number;
                const subtotal = count * denom.value;
                const isActive = count > 0;
                const label =
                  denom.key === "coins" ? "Coins x" : `₹${denom.value} x`;
                return (
                  <Grid size={{ xs: 12, sm: 6 }} key={denom.key}>
                    <RowCard isactive={isActive}>
                      <DenomLabel sx={{ color: denom.color }}>
                        {label}
                      </DenomLabel>
                      <StyledTextField
                        name={denom.key}
                        type="number"
                        value={count}
                        onChange={handleCashChange}
                        inputProps={{ min: 0 }}
                      />
                      <Box sx={{ flex: 1, textAlign: "right", minWidth: 100 }}>
                        <Typography
                          sx={{
                            color: isActive ? denom.color : "#6b7280",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                          }}
                        >
                          ₹{" "}
                          {subtotal.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Typography>
                      </Box>
                    </RowCard>
                  </Grid>
                );
              })}
            </Grid>

            {/* Notes count bar */}
            <TotalRow variant="count" sx={{ mb: 2 }}>
              <Typography
                sx={{
                  color: "#c084fc",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: 0.5,
                }}
              >
                TOTAL NOTES COUNT:
              </Typography>
              <Typography sx={{ color: "#fff", fontWeight: 800 }}>
                {calculateNoteCount()} Notes/Coins
              </Typography>
            </TotalRow>

            {/* Online Payments Section */}
            <SectionCard>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1.5}
              >
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      bgcolor: "#2e1065",
                      color: "#c084fc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    💳
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}
                    >
                      Online / Digital Payments
                    </Typography>
                    <Typography sx={{ color: "#9ca3af", fontSize: "0.7rem" }}>
                      Add multiple UPI, Bank, Card entries
                    </Typography>
                  </Box>
                </Box>

                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={addOnlineRow}
                  sx={{
                    color: "#22d3ee",
                    borderColor: "rgba(34, 211, 238, 0.4)",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: "8px",
                    px: 1.5,
                    fontSize: "0.75rem",
                    "&:hover": {
                      borderColor: "#22d3ee",
                      bgcolor: "rgba(34, 211, 238, 0.08)",
                    },
                  }}
                >
                  Add Entry
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {onlinePayments.map((p, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      bgcolor: "#0d1527",
                      border: "1px solid rgba(34, 211, 238, 0.15)",
                      borderRadius: "10px",
                      p: 1.2,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        minWidth: 60,
                      }}
                    >
                      Entry #{i + 1}
                    </Typography>

                    <StyledTextField
                      type="number"
                      value={p.amount}
                      onChange={(e) => updateOnlineRow(i, "amount", e.target.value)}
                      placeholder="0"
                      inputProps={{ min: 0 }}
                      sx={{ width: 140 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography
                              sx={{
                                color: "#22d3ee",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                              }}
                            >
                              ₹
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      value={p.note}
                      onChange={(e) => updateOnlineRow(i, "note", e.target.value)}
                      placeholder="Note (optional)"
                      size="small"
                      sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#090d16",
                          color: "#fff",
                          height: "40px",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(34, 211, 238, 0.4)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#22d3ee",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "#fff",
                          fontSize: "0.8rem",
                          padding: "8px 12px",
                        },
                      }}
                    />

                    <IconButton
                      size="small"
                      onClick={() => removeOnlineRow(i)}
                      sx={{
                        color: "#f43f5e",
                        "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  mt: 1.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "rgba(34, 211, 238, 0.08)",
                  border: "1px solid rgba(34, 211, 238, 0.3)",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                }}
              >
                <Typography
                  sx={{ color: "#22d3ee", fontWeight: 800, fontSize: "0.8rem" }}
                >
                  TOTAL ONLINE:
                </Typography>
                <Typography
                  sx={{ color: "#22d3ee", fontWeight: 900, fontSize: "1rem" }}
                >
                  ₹ {calculateOnlineTotal().toLocaleString("en-IN")}
                </Typography>
              </Box>
            </SectionCard>

            {/* Physical cash total */}
            <TotalRow variant="cash" sx={{ mb: 2 }}>
              <Typography
                sx={{ color: "#10b981", fontWeight: 800, fontSize: "0.9rem" }}
              >
                TOTAL PHYSICAL CASH:
              </Typography>
              <Typography
                sx={{
                  color: "#c084fc",
                  fontWeight: 900,
                  fontSize: "1.5rem",
                  textShadow: "0 0 20px rgba(192, 132, 252, 0.4)",
                }}
              >
                ₹{" "}
                {calculateCashTotal().toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </TotalRow>

            {/* Grand total (bottom) */}
            <TotalRow variant="grand" sx={{ mb: 2 }}>
              <Typography
                sx={{ color: "#38bdf8", fontWeight: 800, fontSize: "0.85rem" }}
              >
                GRAND TOTAL (CASH + ONLINE):
              </Typography>
              <Typography
                sx={{ color: "#38bdf8", fontWeight: 900, fontSize: "1.2rem" }}
              >
                ₹{" "}
                {calculateTotal().toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </TotalRow>
          </FormScrollArea>

          {/* Footer actions */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              justifyContent: "flex-end",
              flexWrap: "wrap",
              p: "16px 22px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              flexShrink: 0,
            }}
          >
            <Tooltip title="Clear all fields">
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={handleClear}
                disabled={loading}
                sx={{
                  borderColor: "rgba(244, 63, 94, 0.4)",
                  color: "#f43f5e",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  "&:hover": {
                    borderColor: "#f43f5e",
                    bgcolor: "rgba(244, 63, 94, 0.08)",
                  },
                }}
              >
                Clear
              </Button>
            </Tooltip>

            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                bgcolor: "#10b981",
                color: "#fff",
                fontWeight: 800,
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1,
                boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
                "&:hover": { bgcolor: "#059669" },
                "&.Mui-disabled": {
                  bgcolor: "rgba(16, 185, 129, 0.3)",
                  color: "rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              {loading ? "Saving..." : "Save Entry"}
            </Button>
          </Box>
        </FormCard>
      </Box>
    </Box>
  );
};

export default DailyCashCreate;