// // import React, { useState } from "react";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import {
// //   TextField,
// //   Button,
// //   Box,
// //   Typography,
// //   Grid,
// //   Card,
// //   InputAdornment,
// //   Tooltip,
// //   Chip,
// //   IconButton,
// // } from "@mui/material";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   AddCircle as AddCircleIcon,
// //   Clear as ClearIcon,
// //   CalendarToday as CalendarIcon,
// //   FiberManualRecord,
// //   ArrowBack,
// //   Refresh,
// //   Delete as DeleteIcon,
// //   Add as AddIcon,
// // } from "@mui/icons-material";
// // import { styled } from "@mui/material/styles";

// // interface OnlinePayment {
// //   amount: number | "";
// //   note: string;
// // }

// // interface CashForm {
// //   note500: number;
// //   note200: number;
// //   note100: number;
// //   note50: number;
// //   note20: number;
// //   note10: number;
// //   coins: number;
// // }

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // const getTodayDate = (): string => {
// //   const today = new Date();
// //   const y = today.getFullYear();
// //   const m = String(today.getMonth() + 1).padStart(2, "0");
// //   const d = String(today.getDate()).padStart(2, "0");
// //   return `${y}-${m}-${d}`;
// // };

// // // ===================== STYLED =====================

// // const DarkBanner = styled(Box)(() => ({
// //   backgroundColor: "#0d1527",
// //   borderRadius: "16px",
// //   border: "1px solid rgba(255, 255, 255, 0.08)",
// //   padding: "16px 18px",
// //   marginBottom: "14px",
// //   boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
// //   flexShrink: 0,
// // }));

// // const FormCard = styled(Card)(() => ({
// //   borderRadius: "16px",
// //   backgroundColor: "#0d1527",
// //   border: "1px solid rgba(255, 255, 255, 0.08)",
// //   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
// //   overflow: "hidden",
// //   flex: 1,
// //   display: "flex",
// //   flexDirection: "column",
// //   minHeight: 0,
// // }));

// // const FormScrollArea = styled(Box)(() => ({
// //   overflowY: "auto",
// //   overflowX: "hidden",
// //   flex: "1 1 0",
// //   height: 0,
// //   minHeight: 0,
// //   padding: "16px 18px",
// //   "&::-webkit-scrollbar": { width: "8px" },
// //   "&::-webkit-scrollbar-track": { backgroundColor: "#0d1527" },
// //   "&::-webkit-scrollbar-thumb": {
// //     backgroundColor: "rgba(16, 185, 129, 0.3)",
// //     borderRadius: "8px",
// //   },
// // }));

// // const SectionCard = styled(Box)(() => ({
// //   backgroundColor: "#111827",
// //   borderRadius: "12px",
// //   border: "1px solid rgba(255, 255, 255, 0.08)",
// //   padding: "14px 16px",
// //   marginBottom: "14px",
// // }));

// // const RowCard = styled(Box)<{ isactive?: boolean }>(({ isactive }) => ({
// //   backgroundColor: isactive ? "rgba(16, 185, 129, 0.05)" : "#0d1527",
// //   borderRadius: "10px",
// //   border: isactive
// //     ? "1px solid rgba(16, 185, 129, 0.3)"
// //     : "1px solid rgba(255, 255, 255, 0.05)",
// //   padding: "10px 12px",
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "10px",
// //   transition: "all 0.2s ease",
// //   "&:hover": { borderColor: "rgba(16, 185, 129, 0.3)" },
// // }));

// // const DenomLabel = styled(Typography)(() => ({
// //   color: "#e5e7eb",
// //   fontWeight: 700,
// //   fontSize: "0.85rem",
// //   minWidth: "60px",
// // }));

// // const StyledTextField = styled(TextField)(() => ({
// //   width: "90px",
// //   "& .MuiOutlinedInput-root": {
// //     borderRadius: "8px",
// //     backgroundColor: "#090d16",
// //     color: "#ffffff",
// //     height: "38px",
// //     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
// //     "&:hover fieldset": { borderColor: "rgba(16, 185, 129, 0.4)" },
// //     "&.Mui-focused fieldset": {
// //       borderColor: "#10b981",
// //       borderWidth: "1.5px",
// //     },
// //   },
// //   "& .MuiOutlinedInput-input": {
// //     color: "#ffffff",
// //     fontSize: "0.88rem",
// //     fontWeight: 700,
// //     textAlign: "center",
// //     padding: "8px 8px",
// //     "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
// //       WebkitAppearance: "none",
// //       margin: 0,
// //     },
// //     "&[type=number]": { MozAppearance: "textfield" },
// //   },
// // }));

// // const TotalRow = styled(Box)<{ variant?: "cash" | "count" | "grand" }>(
// //   ({ variant }) => {
// //     let bg = "#111827";
// //     let border = "1px solid rgba(16, 185, 129, 0.3)";
// //     if (variant === "count") {
// //       bg = "rgba(192, 132, 252, 0.15)";
// //       border = "1px solid rgba(192, 132, 252, 0.3)";
// //     } else if (variant === "grand") {
// //       bg = "rgba(56, 189, 248, 0.08)";
// //       border = "1px solid rgba(56, 189, 248, 0.3)";
// //     }
// //     return {
// //       backgroundColor: bg,
// //       borderRadius: "10px",
// //       border,
// //       padding: "12px 16px",
// //       display: "flex",
// //       alignItems: "center",
// //       justifyContent: "space-between",
// //       gap: "10px",
// //       flexWrap: "wrap",
// //     };
// //   }
// // );

// // const denominations = [
// //   { key: "note500", value: 500, color: "#38bdf8" },
// //   { key: "note200", value: 200, color: "#c084fc" },
// //   { key: "note100", value: 100, color: "#fbbf24" },
// //   { key: "note50", value: 50, color: "#f43f5e" },
// //   { key: "note20", value: 20, color: "#2dd4bf" },
// //   { key: "note10", value: 10, color: "#a78bfa" },
// //   { key: "coins", value: 1, color: "#fb923c" },
// // ];

// // // ===================== MAIN =====================

// // const DailyCashCreate: React.FC = () => {
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState<CashForm>({
// //     note500: 0,
// //     note200: 0,
// //     note100: 0,
// //     note50: 0,
// //     note20: 0,
// //     note10: 0,
// //     coins: 0,
// //   });

// //   const [onlinePayments, setOnlinePayments] = useState<OnlinePayment[]>([
// //     { amount: "", note: "" },
// //   ]);

// //   const [date, setDate] = useState(getTodayDate());
// //   const [loading, setLoading] = useState(false);

// //   const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     const num = value === "" ? 0 : Number(value);
// //     setFormData({ ...formData, [name]: Math.max(0, num) });
// //   };

// //   const addOnlineRow = () => {
// //     setOnlinePayments([...onlinePayments, { amount: "", note: "" }]);
// //   };

// //   const removeOnlineRow = (i: number) => {
// //     if (onlinePayments.length === 1) {
// //       setOnlinePayments([{ amount: "", note: "" }]);
// //       return;
// //     }
// //     setOnlinePayments(onlinePayments.filter((_, idx) => idx !== i));
// //   };

// //   const updateOnlineRow = (
// //     i: number,
// //     field: keyof OnlinePayment,
// //     value: any
// //   ) => {
// //     const updated = [...onlinePayments];
// //     if (field === "amount") {
// //       updated[i].amount = value === "" ? "" : Math.max(0, Number(value));
// //     } else {
// //       updated[i].note = value;
// //     }
// //     setOnlinePayments(updated);
// //   };

// //   const calculateCashTotal = () =>
// //     denominations.reduce(
// //       (s, d) => s + (formData[d.key as keyof CashForm] as number) * d.value,
// //       0
// //     );

// //   const calculateOnlineTotal = () =>
// //     onlinePayments.reduce((s, p) => s + (Number(p.amount) || 0), 0);

// //   const calculateTotal = () => calculateCashTotal() + calculateOnlineTotal();

// //   const calculateNoteCount = () =>
// //     denominations.reduce(
// //       (s, d) => s + (formData[d.key as keyof CashForm] as number),
// //       0
// //     );

// //   const handleClear = () => {
// //     setFormData({
// //       note500: 0,
// //       note200: 0,
// //       note100: 0,
// //       note50: 0,
// //       note20: 0,
// //       note10: 0,
// //       coins: 0,
// //     });
// //     setOnlinePayments([{ amount: "", note: "" }]);
// //     setDate(getTodayDate());
// //     toast.success("Reset successfully");
// //   };

// //   const handleSubmit = async () => {
// //     if (calculateTotal() <= 0) {
// //       toast.error("Total must be greater than 0");
// //       return;
// //     }
// //     if (!date) {
// //       toast.error("Date is required");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const cleanedOnline = onlinePayments
// //         .filter((p) => Number(p.amount) > 0)
// //         .map((p) => ({ amount: Number(p.amount), note: p.note || "" }));

// //       const res = await axios.post(
// //         `${API_URL}/dailycash`,
// //         {
// //           formData,
// //           onlinePayments: cleanedOnline,
// //           total: calculateTotal(),
// //           date,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
// //           },
// //         }
// //       );

// //       if (res.data?.success === true) {
// //         toast.success("Entry created successfully! 🎉");
// //         navigate("/note-summary-entry");
// //       } else if (res.data?.message === "Unauthorized") {
// //         toast.error("Session expired! Please login again");
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(res.data?.message || "Failed to create entry");
// //       }
// //     } catch (e: any) {
// //       if (!e.response) toast.error("Network error!");
// //       else if (e.response?.data?.message === "Unauthorized") {
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(e.response?.data?.message || "Failed to create entry");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         height: { xs: "100dvh", md: "100vh" },
// //         maxHeight: { xs: "100dvh", md: "100vh" },
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
// //             flexDirection={{ xs: "column", sm: "row" }}
// //             justifyContent="space-between"
// //             alignItems={{ xs: "stretch", sm: "center" }}
// //             gap={1.5}
// //           >
// //             <Box display="flex" alignItems="center" gap={1.5}>
// //               <Button
// //                 variant="outlined"
// //                 startIcon={<ArrowBack />}
// //                 onClick={() => navigate("/note-summary-entry")}
// //                 sx={{
// //                   color: "#e5e7eb",
// //                   borderColor: "rgba(255, 255, 255, 0.15)",
// //                   fontWeight: 700,
// //                   textTransform: "none",
// //                   borderRadius: "10px",
// //                   px: 2,
// //                   py: 0.8,
// //                   fontSize: "0.78rem",
// //                   minWidth: "auto",
// //                   "&:hover": {
// //                     borderColor: "#10b981",
// //                     color: "#10b981",
// //                     bgcolor: "rgba(16, 185, 129, 0.08)",
// //                   },
// //                 }}
// //               >
// //                 Back
// //               </Button>

// //               <Box sx={{ minWidth: 0 }}>
// //                 <Box display="flex" alignItems="center" gap={1} mb={0.3}>
// //                   <FiberManualRecord sx={{ fontSize: 10, color: "#10b981" }} />
// //                   <Typography
// //                     sx={{
// //                       color: "#10b981",
// //                       letterSpacing: 0.5,
// //                       fontSize: "0.7rem",
// //                       fontWeight: 700,
// //                     }}
// //                   >
// //                     Cash Management
// //                   </Typography>
// //                 </Box>
// //                 <Typography
// //                   variant="h5"
// //                   fontWeight="800"
// //                   sx={{
// //                     fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
// //                     lineHeight: 1.2,
// //                   }}
// //                 >
// //                   NEW CASH ENTRY
// //                 </Typography>
// //               </Box>
// //             </Box>

// //             <Button
// //               variant="outlined"
// //               startIcon={<Refresh />}
// //               onClick={handleClear}
// //               sx={{
// //                 color: "#e5e7eb",
// //                 borderColor: "rgba(255, 255, 255, 0.15)",
// //                 fontWeight: 700,
// //                 textTransform: "none",
// //                 borderRadius: "10px",
// //                 px: 2,
// //                 py: 0.8,
// //                 fontSize: "0.78rem",
// //                 flex: { xs: "1 1 100%", sm: "none" },
// //                 "&:hover": {
// //                   borderColor: "#c084fc",
// //                   color: "#c084fc",
// //                   bgcolor: "rgba(192, 132, 252, 0.08)",
// //                 },
// //               }}
// //             >
// //               Reset
// //             </Button>
// //           </Box>
// //         </DarkBanner>

// //         {/* FORM */}
// //         <FormCard>
// //           <FormScrollArea>
// //             {/* Date + Notes count */}
// //             <Box sx={{ mb: 1.5 }}>
// //               <Box
// //                 display="flex"
// //                 alignItems="center"
// //                 gap={1.2}
// //                 flexWrap="wrap"
// //               >
// //                 <Box
// //                   sx={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: 1,
// //                     bgcolor: "#111827",
// //                     border: "1px solid rgba(255, 255, 255, 0.08)",
// //                     borderRadius: "10px",
// //                     px: 1.5,
// //                     py: 0.7,
// //                   }}
// //                 >
// //                   <CalendarIcon sx={{ color: "#38bdf8", fontSize: 18 }} />
// //                   <Typography
// //                     sx={{
// //                       color: "#9ca3af",
// //                       fontWeight: 600,
// //                       fontSize: "0.78rem",
// //                     }}
// //                   >
// //                     Date:
// //                   </Typography>
// //                   <input
// //                     type="date"
// //                     value={date}
// //                     onChange={(e) => setDate(e.target.value)}
// //                     style={{
// //                       background: "transparent",
// //                       border: "none",
// //                       color: "#ffffff",
// //                       fontSize: "0.82rem",
// //                       fontWeight: 700,
// //                       outline: "none",
// //                       cursor: "pointer",
// //                       colorScheme: "dark",
// //                     }}
// //                   />
// //                 </Box>

// //                 <Chip
// //                   label={`Total Notes: ${calculateNoteCount()}`}
// //                   size="small"
// //                   sx={{
// //                     bgcolor: "rgba(56, 189, 248, 0.1)",
// //                     color: "#38bdf8",
// //                     border: "1px solid rgba(56, 189, 248, 0.3)",
// //                     fontWeight: 700,
// //                     fontSize: "0.7rem",
// //                     height: "28px",
// //                   }}
// //                 />
// //               </Box>
// //             </Box>

// //             {/* GRAND TOTAL TOP */}
// //             <TotalRow variant="grand" sx={{ mb: 1.5 }}>
// //               <Typography
// //                 sx={{
// //                   color: "#38bdf8",
// //                   fontWeight: 800,
// //                   fontSize: { xs: "0.75rem", sm: "0.85rem" },
// //                 }}
// //               >
// //                 GRAND TOTAL (CASH + ONLINE):
// //               </Typography>
// //               <Typography
// //                 sx={{
// //                   color: "#38bdf8",
// //                   fontWeight: 900,
// //                   fontSize: { xs: "1.05rem", sm: "1.2rem" },
// //                 }}
// //               >
// //                 ₹{" "}
// //                 {calculateTotal().toLocaleString("en-IN", {
// //                   minimumFractionDigits: 2,
// //                   maximumFractionDigits: 2,
// //                 })}
// //               </Typography>
// //             </TotalRow>

// //             {/* Denomination grid */}
// //             <Grid container spacing={1.2} sx={{ mb: 1.5 }}>
// //               {denominations.map((denom) => {
// //                 const count = formData[denom.key as keyof CashForm] as number;
// //                 const subtotal = count * denom.value;
// //                 const isActive = count > 0;
// //                 const label =
// //                   denom.key === "coins" ? "Coins x" : `₹${denom.value} x`;
// //                 return (
// //                   <Grid size={{ xs: 12, sm: 6 }} key={denom.key}>
// //                     <RowCard isactive={isActive}>
// //                       <DenomLabel sx={{ color: denom.color }}>
// //                         {label}
// //                       </DenomLabel>
// //                       <StyledTextField
// //                         name={denom.key}
// //                         type="number"
// //                         value={count}
// //                         onChange={handleCashChange}
// //                         inputProps={{ min: 0 }}
// //                       />
// //                       <Box sx={{ flex: 1, textAlign: "right", minWidth: 90 }}>
// //                         <Typography
// //                           sx={{
// //                             color: isActive ? denom.color : "#6b7280",
// //                             fontWeight: 800,
// //                             fontSize: "0.85rem",
// //                           }}
// //                         >
// //                           ₹{" "}
// //                           {subtotal.toLocaleString("en-IN", {
// //                             minimumFractionDigits: 2,
// //                             maximumFractionDigits: 2,
// //                           })}
// //                         </Typography>
// //                       </Box>
// //                     </RowCard>
// //                   </Grid>
// //                 );
// //               })}
// //             </Grid>

// //             {/* Notes count bar */}
// //             <TotalRow variant="count" sx={{ mb: 1.5 }}>
// //               <Typography
// //                 sx={{
// //                   color: "#c084fc",
// //                   fontWeight: 800,
// //                   fontSize: { xs: "0.75rem", sm: "0.85rem" },
// //                   letterSpacing: 0.5,
// //                 }}
// //               >
// //                 TOTAL NOTES COUNT:
// //               </Typography>
// //               <Typography sx={{ color: "#fff", fontWeight: 800 }}>
// //                 {calculateNoteCount()} Notes/Coins
// //               </Typography>
// //             </TotalRow>

// //             {/* ===== ONLINE PAYMENTS SECTION ===== */}
// //             <SectionCard>
// //               {/* Header row (title only — Add button moved into each row) */}
// //               <Box
// //                 display="flex"
// //                 alignItems="center"
// //                 gap={1.2}
// //                 mb={1.5}
// //               >
// //                 <Box
// //                   sx={{
// //                     width: 30,
// //                     height: 30,
// //                     borderRadius: "8px",
// //                     bgcolor: "#2e1065",
// //                     color: "#c084fc",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     flexShrink: 0,
// //                     fontSize: "0.85rem",
// //                   }}
// //                 >
// //                   💳
// //                 </Box>
// //                 <Box sx={{ minWidth: 0 }}>
// //                   <Typography
// //                     sx={{
// //                       color: "#fff",
// //                       fontWeight: 700,
// //                       fontSize: "0.82rem",
// //                     }}
// //                   >
// //                     Online / Digital Payments
// //                   </Typography>
// //                   <Typography sx={{ color: "#9ca3af", fontSize: "0.68rem" }}>
// //                     Add multiple UPI, Bank, Card entries
// //                   </Typography>
// //                 </Box>
// //               </Box>

// //               {/* Rows — each row: amount + note + delete + add */}
// //               <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
// //                 {onlinePayments.map((p, i) => (
// //                   <Box
// //                     key={i}
// //                     sx={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       gap: 0.8,
// //                       flexWrap: { xs: "wrap", sm: "nowrap" },
// //                       bgcolor: "#0d1527",
// //                       border: "1px solid rgba(34, 211, 238, 0.15)",
// //                       borderRadius: "10px",
// //                       p: 1,
// //                     }}
// //                   >
// //                     {/* Amount field — smaller */}
// //                     <TextField
// //                       type="number"
// //                       value={p.amount}
// //                       onChange={(e) =>
// //                         updateOnlineRow(i, "amount", e.target.value)
// //                       }
// //                       placeholder="0"
// //                       size="small"
// //                       inputProps={{ min: 0 }}
// //                       sx={{
// //                         width: { xs: "calc(50% - 24px)", sm: 110 },
// //                         "& .MuiOutlinedInput-root": {
// //                           borderRadius: "8px",
// //                           backgroundColor: "#090d16",
// //                           color: "#fff",
// //                           height: "36px",
// //                           "& fieldset": {
// //                             borderColor: "rgba(255, 255, 255, 0.1)",
// //                           },
// //                           "&:hover fieldset": {
// //                             borderColor: "rgba(34, 211, 238, 0.4)",
// //                           },
// //                           "&.Mui-focused fieldset": {
// //                             borderColor: "#22d3ee",
// //                           },
// //                         },
// //                         "& .MuiOutlinedInput-input": {
// //                           color: "#fff",
// //                           fontSize: "0.82rem",
// //                           fontWeight: 700,
// //                           padding: "7px 9px",
// //                         },
// //                       }}
// //                       InputProps={{
// //                         startAdornment: (
// //                           <InputAdornment position="start">
// //                             <Typography
// //                               sx={{
// //                                 color: "#22d3ee",
// //                                 fontWeight: 700,
// //                                 fontSize: "0.8rem",
// //                               }}
// //                             >
// //                               ₹
// //                             </Typography>
// //                           </InputAdornment>
// //                         ),
// //                       }}
// //                     />

// //                     {/* Note field — flex, smaller */}
// //                     <TextField
// //                       value={p.note}
// //                       onChange={(e) =>
// //                         updateOnlineRow(i, "note", e.target.value)
// //                       }
// //                       placeholder="Note"
// //                       size="small"
// //                       sx={{
// //                         flex: { xs: 1, sm: 1 },
// //                         minWidth: 0,
// //                         "& .MuiOutlinedInput-root": {
// //                           borderRadius: "8px",
// //                           backgroundColor: "#090d16",
// //                           color: "#fff",
// //                           height: "36px",
// //                           "& fieldset": {
// //                             borderColor: "rgba(255, 255, 255, 0.1)",
// //                           },
// //                           "&:hover fieldset": {
// //                             borderColor: "rgba(34, 211, 238, 0.4)",
// //                           },
// //                           "&.Mui-focused fieldset": {
// //                             borderColor: "#22d3ee",
// //                           },
// //                         },
// //                         "& .MuiOutlinedInput-input": {
// //                           color: "#fff",
// //                           fontSize: "0.78rem",
// //                           padding: "7px 10px",
// //                         },
// //                       }}
// //                     />

// //                     {/* ✅ Delete icon */}
// //                     <IconButton
// //                       size="small"
// //                       onClick={() => removeOnlineRow(i)}
// //                       sx={{
// //                         color: "#f43f5e",
// //                         flexShrink: 0,
// //                         width: 32,
// //                         height: 32,
// //                         "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
// //                       }}
// //                     >
// //                       <DeleteIcon fontSize="small" />
// //                     </IconButton>

// //                     {/* ✅ Add Entry button — right side of delete */}
// //                     <IconButton
// //                       size="small"
// //                       onClick={addOnlineRow}
// //                       sx={{
// //                         color: "#22d3ee",
// //                         flexShrink: 0,
// //                         width: 32,
// //                         height: 32,
// //                         bgcolor: "rgba(34, 211, 238, 0.1)",
// //                         border: "1px solid rgba(34, 211, 238, 0.3)",
// //                         "&:hover": {
// //                           bgcolor: "rgba(34, 211, 238, 0.2)",
// //                           borderColor: "#22d3ee",
// //                         },
// //                       }}
// //                     >
// //                       <AddIcon fontSize="small" />
// //                     </IconButton>
// //                   </Box>
// //                 ))}
// //               </Box>

// //               {/* Online total */}
// //               <Box
// //                 sx={{
// //                   mt: 1.2,
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   alignItems: "center",
// //                   bgcolor: "rgba(34, 211, 238, 0.08)",
// //                   border: "1px solid rgba(34, 211, 238, 0.3)",
// //                   borderRadius: "8px",
// //                   px: 1.5,
// //                   py: 0.9,
// //                 }}
// //               >
// //                 <Typography
// //                   sx={{
// //                     color: "#22d3ee",
// //                     fontWeight: 800,
// //                     fontSize: "0.78rem",
// //                   }}
// //                 >
// //                   TOTAL ONLINE:
// //                 </Typography>
// //                 <Typography
// //                   sx={{ color: "#22d3ee", fontWeight: 900, fontSize: "1rem" }}
// //                 >
// //                   ₹ {calculateOnlineTotal().toLocaleString("en-IN")}
// //                 </Typography>
// //               </Box>
// //             </SectionCard>

// //             {/* Physical cash total */}
// //             <TotalRow variant="cash" sx={{ mb: 1.5 }}>
// //               <Typography
// //                 sx={{
// //                   color: "#10b981",
// //                   fontWeight: 800,
// //                   fontSize: { xs: "0.8rem", sm: "0.9rem" },
// //                 }}
// //               >
// //                 TOTAL PHYSICAL CASH:
// //               </Typography>
// //               <Typography
// //                 sx={{
// //                   color: "#c084fc",
// //                   fontWeight: 900,
// //                   fontSize: { xs: "1.2rem", sm: "1.5rem" },
// //                   textShadow: "0 0 20px rgba(192, 132, 252, 0.4)",
// //                 }}
// //               >
// //                 ₹{" "}
// //                 {calculateCashTotal().toLocaleString("en-IN", {
// //                   minimumFractionDigits: 2,
// //                   maximumFractionDigits: 2,
// //                 })}
// //               </Typography>
// //             </TotalRow>

// //             {/* Grand total bottom */}
// //             <TotalRow variant="grand" sx={{ mb: 1 }}>
// //               <Typography
// //                 sx={{
// //                   color: "#38bdf8",
// //                   fontWeight: 800,
// //                   fontSize: { xs: "0.75rem", sm: "0.85rem" },
// //                 }}
// //               >
// //                 GRAND TOTAL (CASH + ONLINE):
// //               </Typography>
// //               <Typography
// //                 sx={{
// //                   color: "#38bdf8",
// //                   fontWeight: 900,
// //                   fontSize: { xs: "1.05rem", sm: "1.2rem" },
// //                 }}
// //               >
// //                 ₹{" "}
// //                 {calculateTotal().toLocaleString("en-IN", {
// //                   minimumFractionDigits: 2,
// //                   maximumFractionDigits: 2,
// //                 })}
// //               </Typography>
// //             </TotalRow>
// //           </FormScrollArea>

// //           {/* Footer actions */}
// //           <Box
// //             sx={{
// //               display: "flex",
// //               gap: 1.2,
// //               justifyContent: { xs: "stretch", sm: "flex-end" },
// //               flexWrap: "wrap",
// //               p: { xs: "12px 16px", sm: "16px 22px" },
// //               borderTop: "1px solid rgba(255, 255, 255, 0.08)",
// //               flexShrink: 0,
// //             }}
// //           >
// //             <Tooltip title="Clear all fields">
// //               <Button
// //                 variant="outlined"
// //                 startIcon={<ClearIcon />}
// //                 onClick={handleClear}
// //                 disabled={loading}
// //                 sx={{
// //                   borderColor: "rgba(244, 63, 94, 0.4)",
// //                   color: "#f43f5e",
// //                   fontWeight: 700,
// //                   textTransform: "none",
// //                   borderRadius: "10px",
// //                   px: 2.5,
// //                   py: 1,
// //                   fontSize: "0.8rem",
// //                   flex: { xs: 1, sm: "none" },
// //                   "&:hover": {
// //                     borderColor: "#f43f5e",
// //                     bgcolor: "rgba(244, 63, 94, 0.08)",
// //                   },
// //                 }}
// //               >
// //                 Clear
// //               </Button>
// //             </Tooltip>

// //             <Button
// //               variant="contained"
// //               startIcon={<AddCircleIcon />}
// //               onClick={handleSubmit}
// //               disabled={loading}
// //               sx={{
// //                 bgcolor: "#10b981",
// //                 color: "#fff",
// //                 fontWeight: 800,
// //                 textTransform: "none",
// //                 borderRadius: "10px",
// //                 px: 3,
// //                 py: 1,
// //                 fontSize: "0.8rem",
// //                 boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
// //                 flex: { xs: 1, sm: "none" },
// //                 "&:hover": { bgcolor: "#059669" },
// //                 "&.Mui-disabled": {
// //                   bgcolor: "rgba(16, 185, 129, 0.3)",
// //                   color: "rgba(255, 255, 255, 0.5)",
// //                 },
// //               }}
// //             >
// //               {loading ? "Saving..." : "Save Entry"}
// //             </Button>
// //           </Box>
// //         </FormCard>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default DailyCashCreate;



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
//   note500: number | "";
//   note200: number | "";
//   note100: number | "";
//   note50: number | "";
//   note20: number | "";
//   note10: number | "";
//   coins: number | "";
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
//   padding: "16px 18px",
//   marginBottom: "14px",
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
//   overflowX: "hidden",
//   flex: "1 1 0",
//   height: 0,
//   minHeight: 0,
//   padding: "16px 18px",
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
//   padding: "14px 16px",
//   marginBottom: "14px",
// }));

// const RowCard = styled(Box)<{ isactive?: boolean }>(({ isactive }) => ({
//   backgroundColor: isactive ? "rgba(16, 185, 129, 0.05)" : "#0d1527",
//   borderRadius: "10px",
//   border: isactive
//     ? "1px solid rgba(16, 185, 129, 0.3)"
//     : "1px solid rgba(255, 255, 255, 0.05)",
//   padding: "10px 12px",
//   display: "flex",
//   alignItems: "center",
//   gap: "10px",
//   transition: "all 0.2s ease",
//   "&:hover": { borderColor: "rgba(16, 185, 129, 0.3)" },
// }));

// const DenomLabel = styled(Typography)(() => ({
//   color: "#e5e7eb",
//   fontWeight: 700,
//   fontSize: "0.85rem",
//   minWidth: "60px",
// }));

// const StyledTextField = styled(TextField)(() => ({
//   width: "90px",
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "8px",
//     backgroundColor: "#090d16",
//     color: "#ffffff",
//     height: "38px",
//     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
//     "&:hover fieldset": { borderColor: "rgba(16, 185, 129, 0.4)" },
//     "&.Mui-focused fieldset": {
//       borderColor: "#10b981",
//       borderWidth: "1.5px",
//     },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#ffffff",
//     fontSize: "0.88rem",
//     fontWeight: 700,
//     textAlign: "center",
//     padding: "8px 8px",
//     "&::placeholder": { color: "#6b7280", opacity: 1 },
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
//       padding: "12px 16px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       gap: "10px",
//       flexWrap: "wrap",
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

//   // ✅ Default values empty
//   const [formData, setFormData] = useState<CashForm>({
//     note500: "",
//     note200: "",
//     note100: "",
//     note50: "",
//     note20: "",
//     note10: "",
//     coins: "",
//   });

//   const [onlinePayments, setOnlinePayments] = useState<OnlinePayment[]>([
//     { amount: "", note: "" },
//   ]);

//   const [date, setDate] = useState(getTodayDate());
//   const [loading, setLoading] = useState(false);

//   const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     // ✅ Empty string allow, otherwise number
//     const num = value === "" ? "" : Math.max(0, Number(value));
//     setFormData({ ...formData, [name]: num });
//   };

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

//   // ✅ Helper: convert form value to number
//   const getNum = (v: number | "") => (v === "" ? 0 : Number(v) || 0);

//   const calculateCashTotal = () =>
//     denominations.reduce(
//       (s, d) => s + getNum(formData[d.key as keyof CashForm]) * d.value,
//       0
//     );

//   const calculateOnlineTotal = () =>
//     onlinePayments.reduce((s, p) => s + (Number(p.amount) || 0), 0);

//   const calculateTotal = () => calculateCashTotal() + calculateOnlineTotal();

//   const calculateNoteCount = () =>
//     denominations.reduce(
//       (s, d) => s + getNum(formData[d.key as keyof CashForm]),
//       0
//     );

//   const handleClear = () => {
//     setFormData({
//       note500: "",
//       note200: "",
//       note100: "",
//       note50: "",
//       note20: "",
//       note10: "",
//       coins: "",
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

//       // ✅ Convert "" to 0 before sending
//       const cleanedFormData = {
//         note500: getNum(formData.note500),
//         note200: getNum(formData.note200),
//         note100: getNum(formData.note100),
//         note50: getNum(formData.note50),
//         note20: getNum(formData.note20),
//         note10: getNum(formData.note10),
//         coins: getNum(formData.coins),
//       };

//       const cleanedOnline = onlinePayments
//         .filter((p) => Number(p.amount) > 0)
//         .map((p) => ({ amount: Number(p.amount), note: p.note || "" }));

//       const res = await axios.post(
//         `${API_URL}/dailycash`,
//         {
//           formData: cleanedFormData,
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
//         height: { xs: "100dvh", md: "100vh" },
//         maxHeight: { xs: "100dvh", md: "100vh" },
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
//             flexDirection={{ xs: "column", sm: "row" }}
//             justifyContent="space-between"
//             alignItems={{ xs: "stretch", sm: "center" }}
//             gap={1.5}
//           >
//             <Box display="flex" alignItems="center" gap={1.5}>
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
//                   py: 0.8,
//                   fontSize: "0.78rem",
//                   minWidth: "auto",
//                   "&:hover": {
//                     borderColor: "#10b981",
//                     color: "#10b981",
//                     bgcolor: "rgba(16, 185, 129, 0.08)",
//                   },
//                 }}
//               >
//                 Back
//               </Button>

//               <Box sx={{ minWidth: 0 }}>
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
//                   sx={{
//                     fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
//                     lineHeight: 1.2,
//                   }}
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
//                 py: 0.8,
//                 fontSize: "0.78rem",
//                 flex: { xs: "1 1 100%", sm: "none" },
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
//             <Box sx={{ mb: 1.5 }}>
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 gap={1.2}
//                 flexWrap="wrap"
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     bgcolor: "#111827",
//                     border: "1px solid rgba(255, 255, 255, 0.08)",
//                     borderRadius: "10px",
//                     px: 1.5,
//                     py: 0.7,
//                   }}
//                 >
//                   <CalendarIcon sx={{ color: "#38bdf8", fontSize: 18 }} />
//                   <Typography
//                     sx={{
//                       color: "#9ca3af",
//                       fontWeight: 600,
//                       fontSize: "0.78rem",
//                     }}
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
//                       fontSize: "0.82rem",
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

//             {/* GRAND TOTAL TOP */}
//             <TotalRow variant="grand" sx={{ mb: 1.5 }}>
//               <Typography
//                 sx={{
//                   color: "#38bdf8",
//                   fontWeight: 800,
//                   fontSize: { xs: "0.75rem", sm: "0.85rem" },
//                 }}
//               >
//                 GRAND TOTAL (CASH + ONLINE):
//               </Typography>
//               <Typography
//                 sx={{
//                   color: "#38bdf8",
//                   fontWeight: 900,
//                   fontSize: { xs: "1.05rem", sm: "1.2rem" },
//                 }}
//               >
//                 ₹{" "}
//                 {calculateTotal().toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//               </Typography>
//             </TotalRow>

//             {/* Denomination grid */}
//             <Grid container spacing={1.2} sx={{ mb: 1.5 }}>
//               {denominations.map((denom) => {
//                 const rawVal = formData[denom.key as keyof CashForm];
//                 const count = getNum(rawVal);
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
//                         value={rawVal === "" ? "" : rawVal}
//                         onChange={handleCashChange}
//                         placeholder="0"
//                         inputProps={{ min: 0 }}
//                       />
//                       <Box sx={{ flex: 1, textAlign: "right", minWidth: 90 }}>
//                         <Typography
//                           sx={{
//                             color: isActive ? denom.color : "#6b7280",
//                             fontWeight: 800,
//                             fontSize: "0.85rem",
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
//             <TotalRow variant="count" sx={{ mb: 1.5 }}>
//               <Typography
//                 sx={{
//                   color: "#c084fc",
//                   fontWeight: 800,
//                   fontSize: { xs: "0.75rem", sm: "0.85rem" },
//                   letterSpacing: 0.5,
//                 }}
//               >
//                 TOTAL NOTES COUNT:
//               </Typography>
//               <Typography sx={{ color: "#fff", fontWeight: 800 }}>
//                 {calculateNoteCount()} Notes/Coins
//               </Typography>
//             </TotalRow>

//             {/* ===== ONLINE PAYMENTS SECTION ===== */}
//             <SectionCard>
//               <Box display="flex" alignItems="center" gap={1.2} mb={1.5}>
//                 <Box
//                   sx={{
//                     width: 30,
//                     height: 30,
//                     borderRadius: "8px",
//                     bgcolor: "#2e1065",
//                     color: "#c084fc",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexShrink: 0,
//                     fontSize: "0.85rem",
//                   }}
//                 >
//                   💳
//                 </Box>
//                 <Box sx={{ minWidth: 0 }}>
//                   <Typography
//                     sx={{
//                       color: "#fff",
//                       fontWeight: 700,
//                       fontSize: "0.82rem",
//                     }}
//                   >
//                     Online / Digital Payments
//                   </Typography>
//                   <Typography sx={{ color: "#9ca3af", fontSize: "0.68rem" }}>
//                     Add multiple UPI, Bank, Card entries
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                 {onlinePayments.map((p, i) => (
//                   <Box
//                     key={i}
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 0.8,
//                       flexWrap: { xs: "wrap", sm: "nowrap" },
//                       bgcolor: "#0d1527",
//                       border: "1px solid rgba(34, 211, 238, 0.15)",
//                       borderRadius: "10px",
//                       p: 1,
//                     }}
//                   >
//                     {/* Amount field */}
//                     <TextField
//                       type="number"
//                       value={p.amount}
//                       onChange={(e) =>
//                         updateOnlineRow(i, "amount", e.target.value)
//                       }
//                       placeholder="0"
//                       size="small"
//                       inputProps={{ min: 0 }}
//                       sx={{
//                         width: { xs: "calc(50% - 24px)", sm: 110 },
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: "8px",
//                           backgroundColor: "#090d16",
//                           color: "#fff",
//                           height: "36px",
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
//                           fontSize: "0.82rem",
//                           fontWeight: 700,
//                           padding: "7px 9px",
//                           "&::placeholder": { color: "#6b7280", opacity: 1 },
//                         },
//                       }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <Typography
//                               sx={{
//                                 color: "#22d3ee",
//                                 fontWeight: 700,
//                                 fontSize: "0.8rem",
//                               }}
//                             >
//                               ₹
//                             </Typography>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />

//                     {/* Note field */}
//                     <TextField
//                       value={p.note}
//                       onChange={(e) =>
//                         updateOnlineRow(i, "note", e.target.value)
//                       }
//                       placeholder="Note"
//                       size="small"
//                       sx={{
//                         flex: { xs: 1, sm: 1 },
//                         minWidth: 0,
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: "8px",
//                           backgroundColor: "#090d16",
//                           color: "#fff",
//                           height: "36px",
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
//                           fontSize: "0.78rem",
//                           padding: "7px 10px",
//                           "&::placeholder": { color: "#6b7280", opacity: 1 },
//                         },
//                       }}
//                     />

//                     {/* Delete */}
//                     <IconButton
//                       size="small"
//                       onClick={() => removeOnlineRow(i)}
//                       sx={{
//                         color: "#f43f5e",
//                         flexShrink: 0,
//                         width: 32,
//                         height: 32,
//                         "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
//                       }}
//                     >
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>

//                     {/* Add */}
//                     <IconButton
//                       size="small"
//                       onClick={addOnlineRow}
//                       sx={{
//                         color: "#22d3ee",
//                         flexShrink: 0,
//                         width: 32,
//                         height: 32,
//                         bgcolor: "rgba(34, 211, 238, 0.1)",
//                         border: "1px solid rgba(34, 211, 238, 0.3)",
//                         "&:hover": {
//                           bgcolor: "rgba(34, 211, 238, 0.2)",
//                           borderColor: "#22d3ee",
//                         },
//                       }}
//                     >
//                       <AddIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 ))}
//               </Box>

//               {/* Online total */}
//               <Box
//                 sx={{
//                   mt: 1.2,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   bgcolor: "rgba(34, 211, 238, 0.08)",
//                   border: "1px solid rgba(34, 211, 238, 0.3)",
//                   borderRadius: "8px",
//                   px: 1.5,
//                   py: 0.9,
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     color: "#22d3ee",
//                     fontWeight: 800,
//                     fontSize: "0.78rem",
//                   }}
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
//             <TotalRow variant="cash" sx={{ mb: 1.5 }}>
//               <Typography
//                 sx={{
//                   color: "#10b981",
//                   fontWeight: 800,
//                   fontSize: { xs: "0.8rem", sm: "0.9rem" },
//                 }}
//               >
//                 TOTAL PHYSICAL CASH:
//               </Typography>
//               <Typography
//                 sx={{
//                   color: "#c084fc",
//                   fontWeight: 900,
//                   fontSize: { xs: "1.2rem", sm: "1.5rem" },
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

//             {/* Grand total bottom */}
//             <TotalRow variant="grand" sx={{ mb: 1 }}>
//               <Typography
//                 sx={{
//                   color: "#38bdf8",
//                   fontWeight: 800,
//                   fontSize: { xs: "0.75rem", sm: "0.85rem" },
//                 }}
//               >
//                 GRAND TOTAL (CASH + ONLINE):
//               </Typography>
//               <Typography
//                 sx={{
//                   color: "#38bdf8",
//                   fontWeight: 900,
//                   fontSize: { xs: "1.05rem", sm: "1.2rem" },
//                 }}
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
//               gap: 1.2,
//               justifyContent: { xs: "stretch", sm: "flex-end" },
//               flexWrap: "wrap",
//               p: { xs: "12px 16px", sm: "16px 22px" },
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
//                   fontSize: "0.8rem",
//                   flex: { xs: 1, sm: "none" },
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
//                 fontSize: "0.8rem",
//                 boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
//                 flex: { xs: 1, sm: "none" },
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
import { styled, useTheme } from "@mui/material/styles";

interface OnlinePayment {
  amount: number | "";
  note: string;
}

interface CashForm {
  note500: number | "";
  note200: number | "";
  note100: number | "";
  note50: number | "";
  note20: number | "";
  note10: number | "";
  coins: number | "";
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getTodayDate = (): string => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const isDark = (theme: any) => theme.palette.mode === "dark";

// ===================== STYLED =====================

const DarkBanner = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  borderRadius: "16px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(15, 23, 42, 0.08)",
  padding: "16px 18px",
  marginBottom: "14px",
  boxShadow: isDark(theme)
    ? "0 10px 30px rgba(0, 0, 0, 0.5)"
    : "0 6px 20px rgba(15, 23, 42, 0.06)",
  flexShrink: 0,
  transition: "all 0.3s ease",
}));

const FormCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  backgroundColor: isDark(theme) ? "#0d1527" : "#ffffff",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(15, 23, 42, 0.08)",
  boxShadow: isDark(theme)
    ? "0 8px 20px rgba(0, 0, 0, 0.4)"
    : "0 4px 14px rgba(15, 23, 42, 0.05)",
  overflow: "hidden",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  transition: "all 0.3s ease",
}));

const FormScrollArea = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  overflowX: "hidden",
  flex: "1 1 0",
  height: 0,
  minHeight: 0,
  padding: "16px 18px",
  "&::-webkit-scrollbar": { width: "8px" },
  "&::-webkit-scrollbar-track": {
    backgroundColor: isDark(theme) ? "#0d1527" : "#f1f5f9",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(16, 185, 129, 0.3)",
    borderRadius: "8px",
  },
}));

const SectionCard = styled(Box)(({ theme }) => ({
  backgroundColor: isDark(theme) ? "#111827" : "#f8fafc",
  borderRadius: "12px",
  border: isDark(theme)
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(15, 23, 42, 0.08)",
  padding: "14px 16px",
  marginBottom: "14px",
  transition: "all 0.3s ease",
}));

const RowCard = styled(Box)<{ isactive?: boolean }>(
  ({ isactive, theme }) => ({
    backgroundColor: isactive
      ? isDark(theme)
        ? "rgba(16, 185, 129, 0.05)"
        : "rgba(16, 185, 129, 0.06)"
      : isDark(theme)
      ? "#0d1527"
      : "#f8fafc",
    borderRadius: "10px",
    border: isactive
      ? "1px solid rgba(16, 185, 129, 0.3)"
      : isDark(theme)
      ? "1px solid rgba(255, 255, 255, 0.05)"
      : "1px solid rgba(15, 23, 42, 0.05)",
    padding: "10px 12px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.2s ease",
    "&:hover": { borderColor: "rgba(16, 185, 129, 0.3)" },
  })
);

const DenomLabel = styled(Typography)(({ theme }) => ({
  color: isDark(theme) ? "#e5e7eb" : "#334155",
  fontWeight: 700,
  fontSize: "0.85rem",
  minWidth: "60px",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "90px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: isDark(theme) ? "#090d16" : "#ffffff",
    color: isDark(theme) ? "#ffffff" : "#0f172a",
    height: "38px",
    "& fieldset": {
      borderColor: isDark(theme)
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(15, 23, 42, 0.1)",
    },
    "&:hover fieldset": { borderColor: "rgba(16, 185, 129, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#10b981",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: isDark(theme) ? "#ffffff" : "#0f172a",
    fontSize: "0.88rem",
    fontWeight: 700,
    textAlign: "center",
    padding: "8px 8px",
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
}));

const TotalRow = styled(Box)<{ variant?: "cash" | "count" | "grand" }>(
  ({ variant, theme }) => {
    const dark = isDark(theme);
    let bg = dark ? "#111827" : "#ffffff";
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
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
      flexWrap: "wrap",
      transition: "all 0.3s ease",
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
    emeraldText: dark ? "#10b981" : "#059669",
    purpleText: dark ? "#c084fc" : "#7e22ce",
    skyText: dark ? "#38bdf8" : "#0284c7",
    cyanText: dark ? "#22d3ee" : "#0891b2",
    purpleIconBg: dark ? "#2e1065" : "#f3e8ff",
    inputBg: dark ? "#090d16" : "#ffffff",
    rowBg: dark ? "#0d1527" : "#f8fafc",
  };

  const [formData, setFormData] = useState<CashForm>({
    note500: "",
    note200: "",
    note100: "",
    note50: "",
    note20: "",
    note10: "",
    coins: "",
  });

  const [onlinePayments, setOnlinePayments] = useState<OnlinePayment[]>([
    { amount: "", note: "" },
  ]);

  const [date, setDate] = useState(getTodayDate());
  const [loading, setLoading] = useState(false);

  const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const num = value === "" ? "" : Math.max(0, Number(value));
    setFormData({ ...formData, [name]: num });
  };

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

  const getNum = (v: number | "") => (v === "" ? 0 : Number(v) || 0);

  const calculateCashTotal = () =>
    denominations.reduce(
      (s, d) => s + getNum(formData[d.key as keyof CashForm]) * d.value,
      0
    );

  const calculateOnlineTotal = () =>
    onlinePayments.reduce((s, p) => s + (Number(p.amount) || 0), 0);

  const calculateTotal = () => calculateCashTotal() + calculateOnlineTotal();

  const calculateNoteCount = () =>
    denominations.reduce(
      (s, d) => s + getNum(formData[d.key as keyof CashForm]),
      0
    );

  const handleClear = () => {
    setFormData({
      note500: "",
      note200: "",
      note100: "",
      note50: "",
      note20: "",
      note10: "",
      coins: "",
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

      const cleanedFormData = {
        note500: getNum(formData.note500),
        note200: getNum(formData.note200),
        note100: getNum(formData.note100),
        note50: getNum(formData.note50),
        note20: getNum(formData.note20),
        note10: getNum(formData.note10),
        coins: getNum(formData.coins),
      };

      const cleanedOnline = onlinePayments
        .filter((p) => Number(p.amount) > 0)
        .map((p) => ({ amount: Number(p.amount), note: p.note || "" }));

      const res = await axios.post(
        `${API_URL}/dailycash`,
        {
          formData: cleanedFormData,
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
        height: { xs: "100dvh", md: "100vh" },
        maxHeight: { xs: "100dvh", md: "100vh" },
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
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
            gap={1.5}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/note-summary-entry")}
                sx={{
                  color: c.textSec,
                  borderColor: c.border15,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.8,
                  fontSize: "0.78rem",
                  minWidth: "auto",
                  "&:hover": {
                    borderColor: "#10b981",
                    color: "#10b981",
                    bgcolor: "rgba(16, 185, 129, 0.08)",
                  },
                }}
              >
                Back
              </Button>

              <Box sx={{ minWidth: 0 }}>
                <Box display="flex" alignItems="center" gap={1} mb={0.3}>
                  <FiberManualRecord sx={{ fontSize: 10, color: "#10b981" }} />
                  <Typography
                    sx={{
                      color: c.emeraldText,
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
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" },
                    lineHeight: 1.2,
                    color: c.text,
                  }}
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
                color: c.textSec,
                borderColor: c.border15,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "10px",
                px: 2,
                py: 0.8,
                fontSize: "0.78rem",
                flex: { xs: "1 1 100%", sm: "none" },
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
            <Box sx={{ mb: 1.5 }}>
              <Box
                display="flex"
                alignItems="center"
                gap={1.2}
                flexWrap="wrap"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: c.cardBg,
                    border: `1px solid ${c.border08}`,
                    borderRadius: "10px",
                    px: 1.5,
                    py: 0.7,
                  }}
                >
                  <CalendarIcon sx={{ color: c.skyText, fontSize: 18 }} />
                  <Typography
                    sx={{
                      color: c.muted,
                      fontWeight: 600,
                      fontSize: "0.78rem",
                    }}
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
                      color: dark ? "#ffffff" : "#0f172a",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      outline: "none",
                      cursor: "pointer",
                      colorScheme: dark ? "dark" : "light",
                    }}
                  />
                </Box>

                <Chip
                  label={`Total Notes: ${calculateNoteCount()}`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(56, 189, 248, 0.1)",
                    color: c.skyText,
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: "28px",
                  }}
                />
              </Box>
            </Box>

            {/* GRAND TOTAL TOP */}
            <TotalRow variant="grand" sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  color: c.skyText,
                  fontWeight: 800,
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                }}
              >
                GRAND TOTAL (CASH + ONLINE):
              </Typography>
              <Typography
                sx={{
                  color: c.skyText,
                  fontWeight: 900,
                  fontSize: { xs: "1.05rem", sm: "1.2rem" },
                }}
              >
                ₹{" "}
                {calculateTotal().toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </TotalRow>

            {/* Denomination grid */}
            <Grid container spacing={1.2} sx={{ mb: 1.5 }}>
              {denominations.map((denom) => {
                const rawVal = formData[denom.key as keyof CashForm];
                const count = getNum(rawVal);
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
                        value={rawVal === "" ? "" : rawVal}
                        onChange={handleCashChange}
                        placeholder="0"
                        inputProps={{ min: 0 }}
                      />
                      <Box sx={{ flex: 1, textAlign: "right", minWidth: 90 }}>
                        <Typography
                          sx={{
                            color: isActive ? denom.color : c.mutedDark,
                            fontWeight: 800,
                            fontSize: "0.85rem",
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
            <TotalRow variant="count" sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  color: c.purpleText,
                  fontWeight: 800,
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                  letterSpacing: 0.5,
                }}
              >
                TOTAL NOTES COUNT:
              </Typography>
              <Typography sx={{ color: c.text, fontWeight: 800 }}>
                {calculateNoteCount()} Notes/Coins
              </Typography>
            </TotalRow>

            {/* ===== ONLINE PAYMENTS SECTION ===== */}
            <SectionCard>
              <Box display="flex" alignItems="center" gap={1.2} mb={1.5}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "8px",
                    bgcolor: c.purpleIconBg,
                    color: c.purpleText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "0.85rem",
                  }}
                >
                  💳
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      color: c.text,
                      fontWeight: 700,
                      fontSize: "0.82rem",
                    }}
                  >
                    Online / Digital Payments
                  </Typography>
                  <Typography sx={{ color: c.muted, fontSize: "0.68rem" }}>
                    Add multiple UPI, Bank, Card entries
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {onlinePayments.map((p, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      bgcolor: c.rowBg,
                      border: "1px solid rgba(34, 211, 238, 0.15)",
                      borderRadius: "10px",
                      p: 1,
                    }}
                  >
                    <TextField
                      type="number"
                      value={p.amount}
                      onChange={(e) =>
                        updateOnlineRow(i, "amount", e.target.value)
                      }
                      placeholder="0"
                      size="small"
                      inputProps={{ min: 0 }}
                      sx={{
                        width: { xs: "calc(50% - 24px)", sm: 110 },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: c.inputBg,
                          color: c.text,
                          height: "36px",
                          "& fieldset": { borderColor: c.border10 },
                          "&:hover fieldset": {
                            borderColor: "rgba(34, 211, 238, 0.4)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#22d3ee",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: c.text,
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          padding: "7px 9px",
                          "&::placeholder": {
                            color: c.mutedDark,
                            opacity: 1,
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography
                              sx={{
                                color: c.cyanText,
                                fontWeight: 700,
                                fontSize: "0.8rem",
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
                      onChange={(e) =>
                        updateOnlineRow(i, "note", e.target.value)
                      }
                      placeholder="Note"
                      size="small"
                      sx={{
                        flex: { xs: 1, sm: 1 },
                        minWidth: 0,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: c.inputBg,
                          color: c.text,
                          height: "36px",
                          "& fieldset": { borderColor: c.border10 },
                          "&:hover fieldset": {
                            borderColor: "rgba(34, 211, 238, 0.4)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#22d3ee",
                          },
                        },
                        "& .MuiOutlinedInput-input": {
                          color: c.text,
                          fontSize: "0.78rem",
                          padding: "7px 10px",
                          "&::placeholder": {
                            color: c.mutedDark,
                            opacity: 1,
                          },
                        },
                      }}
                    />

                    <IconButton
                      size="small"
                      onClick={() => removeOnlineRow(i)}
                      sx={{
                        color: "#f43f5e",
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={addOnlineRow}
                      sx={{
                        color: c.cyanText,
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        bgcolor: "rgba(34, 211, 238, 0.1)",
                        border: "1px solid rgba(34, 211, 238, 0.3)",
                        "&:hover": {
                          bgcolor: "rgba(34, 211, 238, 0.2)",
                          borderColor: "#22d3ee",
                        },
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  mt: 1.2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "rgba(34, 211, 238, 0.08)",
                  border: "1px solid rgba(34, 211, 238, 0.3)",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 0.9,
                }}
              >
                <Typography
                  sx={{
                    color: c.cyanText,
                    fontWeight: 800,
                    fontSize: "0.78rem",
                  }}
                >
                  TOTAL ONLINE:
                </Typography>
                <Typography
                  sx={{
                    color: c.cyanText,
                    fontWeight: 900,
                    fontSize: "1rem",
                  }}
                >
                  ₹ {calculateOnlineTotal().toLocaleString("en-IN")}
                </Typography>
              </Box>
            </SectionCard>

            {/* Physical cash total */}
            <TotalRow variant="cash" sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  color: c.emeraldText,
                  fontWeight: 800,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                }}
              >
                TOTAL PHYSICAL CASH:
              </Typography>
              <Typography
                sx={{
                  color: c.purpleText,
                  fontWeight: 900,
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  textShadow: dark
                    ? "0 0 20px rgba(192, 132, 252, 0.4)"
                    : "none",
                }}
              >
                ₹{" "}
                {calculateCashTotal().toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </TotalRow>

            {/* Grand total bottom */}
            <TotalRow variant="grand" sx={{ mb: 1 }}>
              <Typography
                sx={{
                  color: c.skyText,
                  fontWeight: 800,
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                }}
              >
                GRAND TOTAL (CASH + ONLINE):
              </Typography>
              <Typography
                sx={{
                  color: c.skyText,
                  fontWeight: 900,
                  fontSize: { xs: "1.05rem", sm: "1.2rem" },
                }}
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
              gap: 1.2,
              justifyContent: { xs: "stretch", sm: "flex-end" },
              flexWrap: "wrap",
              p: { xs: "12px 16px", sm: "16px 22px" },
              borderTop: `1px solid ${c.border08}`,
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
                  fontSize: "0.8rem",
                  flex: { xs: 1, sm: "none" },
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
                fontSize: "0.8rem",
                boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
                flex: { xs: 1, sm: "none" },
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