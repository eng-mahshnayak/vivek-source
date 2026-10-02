



// // import React, { useEffect, useState, useRef, useMemo } from "react";
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
// //   MenuItem,
// //   Select,
// //   Pagination,
// //   Tooltip,
// //   Fab,
// // } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// // import {
// //   ArrowBack,
// //   Add as AddIcon,
// //   Delete as DeleteIcon,
// //   Search,
// //   Payments,
// //   Receipt,
// //   Person,
// //   Refresh as RefreshIcon,
// //   Home as HomeIcon,
// //   FilterAlt as FilterIcon,
// //   Clear as ClearIcon,
// //   Close as CloseIcon,
// //   Lock as LockIcon,
// //   Link as LinkIcon,
// //   LinkOff as UnlinkIcon,
// //   CheckCircle as CheckIcon,
// //   CalendarToday as CalendarIcon,
// // } from "@mui/icons-material";

// // // ===================== TYPES =====================

// // interface Customer {
// //   _id: string;
// //   companyName?: string;
// //   displayName?: string;
// //   phone?: string;
// //   email?: string;
// // }

// // interface PaymentEntry {
// //   _id: string;
// //   customerId: Customer | string;
// //   customerName: string;
// //   paymentMode: string;
// //   transactionRef: string;
// //   amount: number;
// //   date: string;
// //   createdAt: string;
// //   linkedInvoices?: LinkedInvoice[];
// // }

// // interface Invoice {
// //   _id: string;
// //   invoiceNumber: string;
// //   date: string;
// //   totalAmount: number;
// //   currentBalance: number;
// //   type: "Sale" | "Purchase" | "Credit";
// //   paymentStatus?: string;
// //   remarks?: string;
// // }

// // interface LinkedInvoice {
// //   invoiceId: string;
// //   invoiceNumber: string;
// //   invoiceDate: string;
// //   invoiceTotal: number;
// //   linkedAmount: number;
// // }

// // // ===================== CONSTANTS =====================

// // const PAYMENT_MODES = [
// //   "Cash Collection",
// //   "UPI / QR",
// //   "Bank Transfer",
// //   "Cheque",
// //   "Card",
// //   "Other",
// // ];

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // const getAuthHeaders = () => ({
// //   headers: {
// //     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
// //   },
// // });

// // // ===================== HELPERS =====================

// // const todayStr = () => new Date().toISOString().split("T")[0];
// // const firstOfMonthStr = () => {
// //   const d = new Date();
// //   return new Date(d.getFullYear(), d.getMonth(), 1)
// //     .toISOString()
// //     .split("T")[0];
// // };

// // const getCustomerName = (c: Customer | string): string => {
// //   if (typeof c === "object" && c !== null) {
// //     return c.companyName || c.displayName || "-";
// //   }
// //   return "-";
// // };

// // const getCustomerPhone = (c: Customer | string): string => {
// //   if (typeof c === "object" && c !== null) {
// //     return c.phone || "";
// //   }
// //   return "";
// // };

// // const formatCurrency = (n: number) =>
// //   `₹ ${(n || 0).toLocaleString("en-IN", {
// //     minimumFractionDigits: 2,
// //     maximumFractionDigits: 2,
// //   })}`;

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
// //     height: "42px",
// //     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
// //     "&:hover fieldset": { borderColor: "rgba(167, 139, 250, 0.4)" },
// //     "&.Mui-focused fieldset": {
// //       borderColor: "#a78bfa",
// //       borderWidth: "1.5px",
// //     },
// //   },
// //   "& .MuiOutlinedInput-input": {
// //     color: "#ffffff",
// //     fontSize: "0.85rem",
// //     fontWeight: 500,
// //     padding: "10px 12px",
// //     "&::placeholder": { color: "#6b7280", opacity: 1 },
// //   },
// //   "& input[type='date']::-webkit-calendar-picker-indicator": {
// //     filter: "invert(0.7)",
// //     cursor: "pointer",
// //   },
// // }));

// // const StyledSelect = styled(Select)(() => ({
// //   borderRadius: "10px",
// //   backgroundColor: "#090d16",
// //   color: "#ffffff",
// //   height: "42px",
// //   width: "100%",
// //   fontSize: "0.85rem",
// //   fontWeight: 500,
// //   "& .MuiOutlinedInput-notchedOutline": {
// //     borderColor: "rgba(255, 255, 255, 0.1)",
// //   },
// //   "&:hover .MuiOutlinedInput-notchedOutline": {
// //     borderColor: "rgba(167, 139, 250, 0.4)",
// //   },
// //   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
// //     borderColor: "#a78bfa",
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
// //     backgroundColor: "rgba(167, 139, 250, 0.3)",
// //     borderRadius: "8px",
// //     "&:hover": { backgroundColor: "rgba(167, 139, 250, 0.5)" },
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
// //   "& tbody tr:hover": { backgroundColor: "rgba(167, 139, 250, 0.03)" },
// //   "& tbody td": {
// //     color: "#e5e7eb",
// //     fontSize: "0.85rem",
// //     padding: "14px 12px",
// //     textAlign: "left",
// //   },
// // }));

// // const LinkChip = styled(Box)<{ linked: boolean }>(({ linked }) => ({
// //   display: "inline-flex",
// //   alignItems: "center",
// //   gap: "4px",
// //   padding: "4px 12px",
// //   borderRadius: "20px",
// //   fontWeight: 700,
// //   fontSize: "0.7rem",
// //   cursor: "pointer",
// //   transition: "all 0.2s ease",
// //   backgroundColor: linked
// //     ? "rgba(52, 211, 153, 0.15)"
// //     : "rgba(167, 139, 250, 0.15)",
// //   color: linked ? "#34d399" : "#a78bfa",
// //   border: linked
// //     ? "1px solid rgba(52, 211, 153, 0.4)"
// //     : "1px dashed rgba(167, 139, 250, 0.5)",
// //   "&:hover": {
// //     backgroundColor: linked
// //       ? "rgba(52, 211, 153, 0.25)"
// //       : "rgba(167, 139, 250, 0.25)",
// //     transform: "translateY(-1px)",
// //   },
// //   "& svg": { fontSize: "14px" },
// // }));

// // const SmallInput = styled("input")(() => ({
// //   width: "100%",
// //   padding: "8px 10px",
// //   borderRadius: "8px",
// //   backgroundColor: "#090d16",
// //   border: "1px solid rgba(167, 139, 250, 0.3)",
// //   color: "#ffffff",
// //   fontSize: "0.85rem",
// //   fontWeight: 700,
// //   textAlign: "right",
// //   outline: "none",
// //   transition: "all 0.2s ease",
// //   "&:focus": {
// //     borderColor: "#a78bfa",
// //     boxShadow: "0 0 0 3px rgba(167, 139, 250, 0.15)",
// //   },
// //   "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
// //     WebkitAppearance: "none",
// //     margin: 0,
// //   },
// //   "&[type=number]": { MozAppearance: "textfield" },
// // }));

// // // ===================== MAIN =====================

// // const PaymentReceivedEntry: React.FC = () => {
// //   const navigate = useNavigate();

// //   // List state
// //   const [entries, setEntries] = useState<PaymentEntry[]>([]);
// //   const [listLoading, setListLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);

// //   // Pagination
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(10);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [totalCount, setTotalCount] = useState(0);

// //   // Date Filter (list)
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");
// //   const [appliedFrom, setAppliedFrom] = useState("");
// //   const [appliedTo, setAppliedTo] = useState("");

// //   // Form modal
// //   const [formOpen, setFormOpen] = useState(false);

// //   // Customer search
// //   const [customerSearch, setCustomerSearch] = useState("");
// //   const [customerResults, setCustomerResults] = useState<Customer[]>([]);
// //   const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
// //   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
// //     null
// //   );
// //   const [loadingCustomers, setLoadingCustomers] = useState(false);

// //   // 🔥 Customer balance (from API)
// //   const [customerBalance, setCustomerBalance] = useState<number>(0);
// //   const [balanceLoading, setBalanceLoading] = useState(false);

// //   // Form state
// //   const [paymentMode, setPaymentMode] = useState(PAYMENT_MODES[0]);
// //   const [transactionRef, setTransactionRef] = useState("");
// //   const [amount, setAmount] = useState<number | "">("");
// //   const [paymentDate, setPaymentDate] = useState<string>(todayStr());

// //   // Linked invoices
// //   const [linkedInvoices, setLinkedInvoices] = useState<LinkedInvoice[]>([]);

// //   // Link Modal
// //   const [linkModalOpen, setLinkModalOpen] = useState(false);
// //   const [invoices, setInvoices] = useState<Invoice[]>([]);
// //   const [invoicesLoading, setInvoicesLoading] = useState(false);
// //   const [draftLinks, setDraftLinks] = useState<Record<string, number>>({});

// //   // Delete dialog
// //   const [deleteId, setDeleteId] = useState<string | null>(null);
// //   const [deleting, setDeleting] = useState(false);

// //   const customerRef = useRef<HTMLDivElement>(null);

// //   // ===================== OUTSIDE CLICK =====================
// //   useEffect(() => {
// //     const handler = (e: MouseEvent) => {
// //       if (
// //         customerRef.current &&
// //         !customerRef.current.contains(e.target as Node)
// //       ) {
// //         setShowCustomerDropdown(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handler);
// //     return () => document.removeEventListener("mousedown", handler);
// //   }, []);

// //   // ===================== FETCH PAYMENTS =====================
// //   const fetchPayments = async () => {
// //     try {
// //       setListLoading(true);

// //       const params: any = { page, limit };
// //       if (appliedFrom) params.fromDate = appliedFrom;
// //       if (appliedTo) params.toDate = appliedTo;

// //       const res = await axios.get(`${API_URL}/payment-received`, {
// //         params,
// //         ...getAuthHeaders(),
// //       });

// //       if (res.data?.success === true) {
// //         setEntries(res.data.data || []);

// //         const count =
// //           res.data.totalCount ??
// //           res.data.total ??
// //           res.data.count ??
// //           (res.data.data ? res.data.data.length : 0);
// //         const pages =
// //           res.data.totalPages ?? Math.max(1, Math.ceil((count || 0) / limit));

// //         setTotalCount(count);
// //         setTotalPages(pages);
// //       } else if (res.data?.message === "Unauthorized") {
// //         toast.error("Session expired! Please login again");
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(res.data?.message || "Failed to load payments");
// //         setEntries([]);
// //       }
// //     } catch (error: any) {
// //       console.error("Fetch payments error:", error);
// //       if (error.response?.data?.message === "Unauthorized") {
// //         localStorage.removeItem("erptoken");
// //         navigate("/login");
// //       } else {
// //         toast.error(error.response?.data?.message || "Failed to load payments");
// //       }
// //       setEntries([]);
// //     } finally {
// //       setListLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPayments();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [page, limit, appliedFrom, appliedTo]);

// //   // ===================== SEARCH CUSTOMERS =====================
// //   useEffect(() => {
// //     if (!formOpen) return;

// //     const timer = setTimeout(async () => {
// //       try {
// //         setLoadingCustomers(true);

// //         const isSearch = customerSearch.trim().length > 0;

// //         const res = isSearch
// //           ? await axios.get(`${API_URL}/customer/search`, {
// //               params: { query: customerSearch, limit: 20 },
// //               ...getAuthHeaders(),
// //             })
// //           : await axios.get(`${API_URL}/customer`, {
// //               params: { page: 1, limit: 20 },
// //               ...getAuthHeaders(),
// //             });

// //         if (res.data?.success) {
// //           setCustomerResults(res.data.data || []);
// //         }
// //       } catch (err) {
// //         console.error("Customer fetch error:", err);
// //       } finally {
// //         setLoadingCustomers(false);
// //       }
// //     }, 300);

// //     return () => clearTimeout(timer);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [customerSearch, formOpen]);

// //   // ===================== 🔥 SELECT CUSTOMER (with balance API) =====================
// //   const handleSelectCustomer = async (c: Customer) => {
// //     setSelectedCustomer(c);
// //     setCustomerSearch(c.companyName || c.displayName || "");
// //     setShowCustomerDropdown(false);
// //     setLinkedInvoices([]);

// //     // 🔥 Fetch customer balance
// //     try {
// //       setBalanceLoading(true);
// //       const res = await axios.get(
// //         `${API_URL}/customer-ledger/balance/${c._id}`,
// //         getAuthHeaders()
// //       );

// //       if (res.data?.success === true) {
// //         setCustomerBalance(res.data.data?.balance || 0);
// //       } else {
// //         setCustomerBalance(0);
// //       }
// //     } catch (err: any) {
// //       console.error("Balance fetch error:", err);
// //       // Silent fail — balance 0 dikhao
// //       setCustomerBalance(0);
// //     } finally {
// //       setBalanceLoading(false);
// //     }
// //   };

// //   // ===================== FORM HANDLERS =====================
// //   const resetForm = () => {
// //     setSelectedCustomer(null);
// //     setCustomerSearch("");
// //     setPaymentMode(PAYMENT_MODES[0]);
// //     setTransactionRef("");
// //     setAmount("");
// //     setPaymentDate(todayStr());
// //     setLinkedInvoices([]);
// //     setCustomerBalance(0);
// //     setShowCustomerDropdown(false);
// //   };

// //   const openFormModal = () => {
// //     resetForm();
// //     setFormOpen(true);
// //   };

// //   const closeFormModal = () => {
// //     if (saving) return;
// //     setFormOpen(false);
// //     resetForm();
// //   };

// //   // ===================== LIST DATE FILTER =====================
// //   const handleApplyDateFilter = () => {
// //     if (fromDate && toDate && fromDate > toDate) {
// //       toast.error("From date cannot be after To date");
// //       return;
// //     }
// //     setAppliedFrom(fromDate);
// //     setAppliedTo(toDate);
// //     setPage(1);
// //   };

// //   const handleClearDateFilter = () => {
// //     setFromDate("");
// //     setToDate("");
// //     setAppliedFrom("");
// //     setAppliedTo("");
// //     setPage(1);
// //   };

// //   const applyQuickRange = (type: "today" | "week" | "month" | "all") => {
// //     const t = todayStr();
// //     if (type === "today") {
// //       setFromDate(t);
// //       setToDate(t);
// //       setAppliedFrom(t);
// //       setAppliedTo(t);
// //     } else if (type === "week") {
// //       const d = new Date();
// //       d.setDate(d.getDate() - 6);
// //       const from = d.toISOString().split("T")[0];
// //       setFromDate(from);
// //       setToDate(t);
// //       setAppliedFrom(from);
// //       setAppliedTo(t);
// //     } else if (type === "month") {
// //       const from = firstOfMonthStr();
// //       setFromDate(from);
// //       setToDate(t);
// //       setAppliedFrom(from);
// //       setAppliedTo(t);
// //     } else {
// //       setFromDate("");
// //       setToDate("");
// //       setAppliedFrom("");
// //       setAppliedTo("");
// //     }
// //     setPage(1);
// //   };

// //   const hasDateFilter = !!(appliedFrom || appliedTo);

// //   // ===================== 🔥 LINK MODAL (with pending-invoices API) =====================
// //   const openLinkModal = async () => {
// //     if (!selectedCustomer) {
// //       toast.error("Please select a customer first");
// //       return;
// //     }

// //     setLinkModalOpen(true);
// //     setInvoicesLoading(true);

// //     // Prefill from existing linkedInvoices
// //     const existing: Record<string, number> = {};
// //     linkedInvoices.forEach((li) => {
// //       existing[li.invoiceId] = li.linkedAmount;
// //     });
// //     setDraftLinks(existing);

// //     try {
// //       // 🔥 REAL API CALL — pending invoices
// //       const res = await axios.get(
// //         `${API_URL}/customer-ledger/pending-invoices/${selectedCustomer._id}`,
// //         getAuthHeaders()
// //       );

// //       if (res.data?.success === true) {
// //         setInvoices(res.data.data || []);
// //       } else {
// //         toast.error(res.data?.message || "Failed to load invoices");
// //         setInvoices([]);
// //       }
// //     } catch (err: any) {
// //       console.error("Fetch pending invoices error:", err);
// //       if (err.response?.data?.message === "Unauthorized") {
// //         localStorage.removeItem("erptoken");
// //         navigate("/login");
// //       } else {
// //         toast.error(
// //           err.response?.data?.message || "Failed to load invoices"
// //         );
// //       }
// //       setInvoices([]);
// //     } finally {
// //       setInvoicesLoading(false);
// //     }
// //   };

// //   const closeLinkModal = () => {
// //     setLinkModalOpen(false);
// //     setInvoices([]);
// //     setDraftLinks({});
// //   };

// //   const handleDraftLinkChange = (invoiceId: string, value: number) => {
// //     setDraftLinks((prev) => ({
// //       ...prev,
// //       [invoiceId]: Math.max(0, value),
// //     }));
// //   };

// //   // 🔥 DONE — linkedInvoices state update + amount auto-fill
// //   const handleLinkDone = () => {
// //     const newLinked: LinkedInvoice[] = invoices
// //       .filter((inv) => (draftLinks[inv._id] || 0) > 0)
// //       .map((inv) => ({
// //         invoiceId: inv._id,
// //         invoiceNumber: inv.invoiceNumber,
// //         invoiceDate: inv.date,
// //         invoiceTotal: inv.totalAmount,
// //         linkedAmount: draftLinks[inv._id] || 0,
// //       }));

// //     setLinkedInvoices(newLinked);

// //     const linkedTotal = newLinked.reduce((s, li) => s + li.linkedAmount, 0);
// //     if (linkedTotal > 0) {
// //       setAmount(Number(linkedTotal.toFixed(2)));
// //     }

// //     setLinkModalOpen(false);
// //     setDraftLinks({});

// //     if (newLinked.length > 0) {
// //       toast.success(
// //         `${newLinked.length} invoice(s) linked · ${formatCurrency(linkedTotal)}`
// //       );
// //     }
// //   };

// //   // Total linked amount
// //   const totalLinkedAmount = useMemo(
// //     () => linkedInvoices.reduce((s, li) => s + li.linkedAmount, 0),
// //     [linkedInvoices]
// //   );

// //   // Draft total
// //   const draftTotal = useMemo(
// //     () =>
// //       invoices.reduce((s, inv) => s + (Number(draftLinks[inv._id]) || 0), 0),
// //     [invoices, draftLinks]
// //   );

// //   // ===================== CREATE (API) =====================
// //   const handleAddEntry = async () => {
// //     if (!selectedCustomer) {
// //       toast.error("Please select a customer from the list");
// //       return;
// //     }
// //     if (!amount || Number(amount) <= 0) {
// //       toast.error("Please enter a valid amount");
// //       return;
// //     }
// //     if (!paymentDate) {
// //       toast.error("Please select a payment date");
// //       return;
// //     }
// //     if (
// //       linkedInvoices.length > 0 &&
// //       Math.abs(totalLinkedAmount - Number(amount)) > 0.01
// //     ) {
// //       toast.error(
// //         `Linked amount (${formatCurrency(
// //           totalLinkedAmount
// //         )}) must match received amount (${formatCurrency(Number(amount))})`
// //       );
// //       return;
// //     }

// //     try {
// //       setSaving(true);

// //       const payload = {
// //         customerId: selectedCustomer._id,
// //         customerName:
// //           selectedCustomer.companyName || selectedCustomer.displayName || "-",
// //         paymentMode,
// //         transactionRef: transactionRef.trim() || "-",
// //         amount: Number(amount),
// //         date: paymentDate,
// //         linkedInvoices: linkedInvoices.map((li) => ({
// //           invoiceId: li.invoiceId,
// //           invoiceNumber: li.invoiceNumber,
// //           linkedAmount: li.linkedAmount,
// //         })),
// //       };

// //       const res = await axios.post(
// //         `${API_URL}/payment-received`,
// //         payload,
// //         getAuthHeaders()
// //       );

// //       if (res.data?.success === true) {
// //         toast.success("Payment recorded successfully! 🎉");
// //         closeFormModal();
// //         setPage(1);
// //         fetchPayments();
// //       } else if (res.data?.message === "Unauthorized") {
// //         toast.error("Session expired! Please login again");
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(
// //           res.data?.errors?.[0] ||
// //             res.data?.message ||
// //             "Failed to record payment"
// //         );
// //       }
// //     } catch (error: any) {
// //       console.error("Create payment error:", error);
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
// //             "Failed to record payment"
// //         );
// //       }
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   // ===================== DELETE (API) =====================
// //   const handleDelete = async () => {
// //     if (!deleteId) return;

// //     try {
// //       setDeleting(true);

// //       const res = await axios.delete(
// //         `${API_URL}/payment-received/${deleteId}`,
// //         getAuthHeaders()
// //       );

// //       if (res.data?.success === true) {
// //         toast.success("Payment entry deleted");
// //         setDeleteId(null);
// //         if (entries.length === 1 && page > 1) {
// //           setPage((p) => p - 1);
// //         } else {
// //           fetchPayments();
// //         }
// //       } else if (res.data?.message === "Unauthorized") {
// //         toast.error("Session expired! Please login again");
// //         localStorage.removeItem("erptoken");
// //         setTimeout(() => navigate("/login"), 1500);
// //       } else {
// //         toast.error(res.data?.message || "Failed to delete");
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
// //                     borderColor: "#a78bfa",
// //                     color: "#a78bfa",
// //                     bgcolor: "rgba(167, 139, 250, 0.08)",
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
// //                     bgcolor: "#1e1b4b",
// //                     color: "#a78bfa",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                   }}
// //                 >
// //                   <Payments />
// //                 </Box>
// //                 <Typography
// //                   variant="h5"
// //                   fontWeight="800"
// //                   sx={{
// //                     fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
// //                     letterSpacing: 0.5,
// //                   }}
// //                 >
// //                   4. PAYMENT RECEIVED ENTRY
// //                 </Typography>
// //               </Box>
// //             </Box>

// //             <Box display="flex" alignItems="center" gap={1.5}>
// //               <Button
// //                 variant="contained"
// //                 startIcon={<AddIcon />}
// //                 onClick={openFormModal}
// //                 sx={{
// //                   bgcolor: "#8b5cf6",
// //                   color: "#ffffff",
// //                   fontWeight: 800,
// //                   textTransform: "none",
// //                   letterSpacing: 0.3,
// //                   borderRadius: "10px",
// //                   px: 2.5,
// //                   py: 1,
// //                   fontSize: "0.8rem",
// //                   boxShadow: "0 4px 14px rgba(139, 92, 246, 0.35)",
// //                   "&:hover": {
// //                     bgcolor: "#7c3aed",
// //                     boxShadow: "0 8px 20px rgba(139, 92, 246, 0.5)",
// //                   },
// //                 }}
// //               >
// //                 Payment Entry
// //               </Button>

// //               <Button
// //                 variant="outlined"
// //                 startIcon={<RefreshIcon />}
// //                 onClick={fetchPayments}
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
// //                     borderColor: "#a78bfa",
// //                     color: "#a78bfa",
// //                     bgcolor: "rgba(167, 139, 250, 0.08)",
// //                   },
// //                 }}
// //               >
// //                 Refresh
// //               </Button>
// //             </Box>
// //           </Box>
// //         </DarkBanner>

// //         {/* DATE FILTER */}
// //         <FilterBar>
// //           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
// //             <Box display="flex" alignItems="center" gap={0.8}>
// //               <FilterIcon sx={{ color: "#a78bfa", fontSize: 18 }} />
// //               <Typography
// //                 sx={{
// //                   color: "#a78bfa",
// //                   fontWeight: 800,
// //                   fontSize: "0.75rem",
// //                   letterSpacing: 1,
// //                   textTransform: "uppercase",
// //                 }}
// //               >
// //                 Date Filter
// //               </Typography>
// //             </Box>

// //             <StyledTextField
// //               type="date"
// //               size="small"
// //               value={fromDate}
// //               onChange={(e) => setFromDate(e.target.value)}
// //               sx={{ width: 160 }}
// //             />
// //             <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
// //               to
// //             </Typography>
// //             <StyledTextField
// //               type="date"
// //               size="small"
// //               value={toDate}
// //               onChange={(e) => setToDate(e.target.value)}
// //               sx={{ width: 160 }}
// //             />

// //             <Button
// //               size="small"
// //               variant="contained"
// //               onClick={handleApplyDateFilter}
// //               sx={{
// //                 bgcolor: "#8b5cf6",
// //                 color: "#fff",
// //                 fontWeight: 700,
// //                 textTransform: "none",
// //                 borderRadius: "8px",
// //                 px: 2,
// //                 fontSize: "0.75rem",
// //                 "&:hover": { bgcolor: "#7c3aed" },
// //               }}
// //             >
// //               Apply
// //             </Button>

// //             <Button
// //               size="small"
// //               variant="outlined"
// //               startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
// //               onClick={handleClearDateFilter}
// //               disabled={!hasDateFilter && !fromDate && !toDate}
// //               sx={{
// //                 color: "#9ca3af",
// //                 borderColor: "rgba(255, 255, 255, 0.15)",
// //                 fontWeight: 700,
// //                 textTransform: "none",
// //                 borderRadius: "8px",
// //                 px: 1.5,
// //                 fontSize: "0.75rem",
// //                 "&:hover": {
// //                   borderColor: "#f43f5e",
// //                   color: "#f43f5e",
// //                   bgcolor: "rgba(244, 63, 94, 0.08)",
// //                 },
// //               }}
// //             >
// //               Clear
// //             </Button>

// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 gap: 0.7,
// //                 ml: { md: "auto" },
// //                 flexWrap: "wrap",
// //               }}
// //             >
// //               {[
// //                 { k: "today", label: "Today" },
// //                 { k: "week", label: "Last 7d" },
// //                 { k: "month", label: "This Month" },
// //                 { k: "all", label: "All" },
// //               ].map((q) => (
// //                 <Chip
// //                   key={q.k}
// //                   label={q.label}
// //                   size="small"
// //                   onClick={() =>
// //                     applyQuickRange(q.k as "today" | "week" | "month" | "all")
// //                   }
// //                   sx={{
// //                     bgcolor: "rgba(255, 255, 255, 0.05)",
// //                     color: "#e5e7eb",
// //                     border: "1px solid rgba(255, 255, 255, 0.1)",
// //                     fontWeight: 600,
// //                     fontSize: "0.7rem",
// //                     height: "26px",
// //                     cursor: "pointer",
// //                     "&:hover": {
// //                       bgcolor: "rgba(167, 139, 250, 0.15)",
// //                       borderColor: "rgba(167, 139, 250, 0.4)",
// //                       color: "#a78bfa",
// //                     },
// //                   }}
// //                 />
// //               ))}
// //             </Box>

// //             {hasDateFilter && (
// //               <Chip
// //                 label={`Active: ${appliedFrom || "..."} → ${
// //                   appliedTo || "..."
// //                 }`}
// //                 size="small"
// //                 sx={{
// //                   bgcolor: "rgba(167, 139, 250, 0.15)",
// //                   color: "#a78bfa",
// //                   border: "1px solid rgba(167, 139, 250, 0.4)",
// //                   fontWeight: 700,
// //                   fontSize: "0.7rem",
// //                   height: "26px",
// //                 }}
// //               />
// //             )}
// //           </Box>
// //         </FilterBar>

// //         {/* TABLE */}
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
// //               COLLECTIONS & PAYMENTS LOG
// //             </Typography>
// //             <Chip
// //               label={`${totalCount} Payments Received`}
// //               size="small"
// //               sx={{
// //                 bgcolor: "rgba(255, 255, 255, 0.05)",
// //                 color: "#9ca3af",
// //                 border: "1px solid rgba(255, 255, 255, 0.1)",
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
// //                   <th>Party / Customer</th>
// //                   <th style={{ textAlign: "center" }}>Date</th>
// //                   <th style={{ textAlign: "center" }}>Payment Mode</th>
// //                   <th style={{ textAlign: "center" }}>Ref / Remarks</th>
// //                   <th style={{ textAlign: "center" }}>Linked</th>
// //                   <th style={{ textAlign: "center" }}>Amount (₹)</th>
// //                   <th style={{ textAlign: "center", width: "80px" }}>
// //                     Action
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {listLoading ? (
// //                   <tr>
// //                     <td
// //                       colSpan={8}
// //                       style={{ textAlign: "center", padding: "40px 12px" }}
// //                     >
// //                       <CircularProgress sx={{ color: "#a78bfa" }} size={32} />
// //                       <Typography
// //                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
// //                       >
// //                         Loading payments...
// //                       </Typography>
// //                     </td>
// //                   </tr>
// //                 ) : entries.length === 0 ? (
// //                   <tr>
// //                     <td
// //                       colSpan={8}
// //                       style={{ textAlign: "center", padding: "40px 12px" }}
// //                     >
// //                       <Receipt
// //                         style={{
// //                           fontSize: 40,
// //                           color: "#374151",
// //                           marginBottom: 8,
// //                         }}
// //                       />
// //                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
// //                         No payments found
// //                       </Typography>
// //                       <Typography
// //                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
// //                       >
// //                         {hasDateFilter
// //                           ? "Try changing the date filter"
// //                           : "Click 'Payment Entry' to log your first payment"}
// //                       </Typography>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   entries.map((row, idx) => {
// //                     const linkedCount = row.linkedInvoices?.length || 0;
// //                     return (
// //                       <tr key={row._id}>
// //                         <td style={{ textAlign: "center", color: "#6b7280" }}>
// //                           {(page - 1) * limit + idx + 1}
// //                         </td>
// //                         <td>
// //                           <Typography
// //                             sx={{
// //                               color: "#ffffff",
// //                               fontWeight: 700,
// //                               fontSize: "0.85rem",
// //                             }}
// //                           >
// //                             {row.customerName ||
// //                               getCustomerName(row.customerId)}
// //                           </Typography>
// //                           {getCustomerPhone(row.customerId) && (
// //                             <Typography
// //                               sx={{
// //                                 color: "#9ca3af",
// //                                 fontSize: "0.7rem",
// //                                 mt: 0.3,
// //                               }}
// //                             >
// //                               📞 {getCustomerPhone(row.customerId)}
// //                             </Typography>
// //                           )}
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Typography
// //                             sx={{ color: "#9ca3af", fontSize: "0.8rem" }}
// //                           >
// //                             {new Date(
// //                               row.date || row.createdAt
// //                             ).toLocaleDateString("en-IN", {
// //                               day: "2-digit",
// //                               month: "short",
// //                               year: "numeric",
// //                             })}
// //                           </Typography>
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Chip
// //                             label={row.paymentMode}
// //                             size="small"
// //                             sx={{
// //                               bgcolor: "rgba(167, 139, 250, 0.1)",
// //                               color: "#a78bfa",
// //                               border: "1px solid rgba(167, 139, 250, 0.3)",
// //                               fontSize: "0.7rem",
// //                               fontWeight: 600,
// //                               height: "24px",
// //                             }}
// //                           />
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Typography
// //                             sx={{ color: "#9ca3af", fontSize: "0.8rem" }}
// //                           >
// //                             {row.transactionRef}
// //                           </Typography>
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           {linkedCount > 0 ? (
// //                             <Chip
// //                               icon={<LinkIcon sx={{ fontSize: 12 }} />}
// //                               label={`${linkedCount} invoice${
// //                                 linkedCount > 1 ? "s" : ""
// //                               }`}
// //                               size="small"
// //                               sx={{
// //                                 bgcolor: "rgba(52, 211, 153, 0.1)",
// //                                 color: "#34d399",
// //                                 border: "1px solid rgba(52, 211, 153, 0.3)",
// //                                 fontSize: "0.68rem",
// //                                 fontWeight: 700,
// //                                 height: "24px",
// //                                 "& .MuiChip-icon": { color: "#34d399" },
// //                               }}
// //                             />
// //                           ) : (
// //                             <Typography
// //                               sx={{ color: "#6b7280", fontSize: "0.75rem" }}
// //                             >
// //                               —
// //                             </Typography>
// //                           )}
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <Typography
// //                             sx={{
// //                               color: "#a78bfa",
// //                               fontWeight: 800,
// //                               fontSize: "0.95rem",
// //                             }}
// //                           >
// //                             {formatCurrency(row.amount)}
// //                           </Typography>
// //                         </td>
// //                         <td style={{ textAlign: "center" }}>
// //                           <IconButton
// //                             size="small"
// //                             onClick={() => setDeleteId(row._id)}
// //                             sx={{
// //                               color: "#f43f5e",
// //                               "&:hover": {
// //                                 bgcolor: "rgba(244, 63, 94, 0.1)",
// //                               },
// //                             }}
// //                           >
// //                             <DeleteIcon fontSize="small" />
// //                           </IconButton>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })
// //                 )}
// //               </tbody>
// //             </ItemsTable>
// //           </TableScrollArea>

// //           {/* PAGINATION */}
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
// //                 sx={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600 }}
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
// //                         ? "rgba(167, 139, 250, 0.2)"
// //                         : "rgba(255, 255, 255, 0.05)",
// //                     color: limit === n ? "#a78bfa" : "#9ca3af",
// //                     border:
// //                       limit === n
// //                         ? "1px solid rgba(167, 139, 250, 0.5)"
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
// //                     bgcolor: "rgba(167, 139, 250, 0.1)",
// //                     color: "#a78bfa",
// //                   },
// //                 },
// //                 "& .Mui-selected": {
// //                   bgcolor: "rgba(167, 139, 250, 0.2) !important",
// //                   color: "#a78bfa !important",
// //                   borderColor: "rgba(167, 139, 250, 0.5) !important",
// //                 },
// //               }}
// //             />
// //           </Box>
// //         </TableContainerDark>
// //       </Box>

// //       {/* FLOATING HOME FAB */}
// //       <Tooltip title="Back to Dashboard" placement="left">
// //         <Fab
// //           onClick={() => navigate("/dashboard")}
// //           sx={{
// //             position: "fixed",
// //             bottom: 20,
// //             right: 20,
// //             zIndex: 1200,
// //             bgcolor: "#a78bfa",
// //             color: "#0d1527",
// //             width: 52,
// //             height: 52,
// //             boxShadow: "0 8px 24px rgba(167, 139, 250, 0.5)",
// //             "&:hover": { bgcolor: "#8b5cf6" },
// //           }}
// //         >
// //           <HomeIcon />
// //         </Fab>
// //       </Tooltip>

// //       {/* ================= FORM MODAL ================= */}
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
// //                 bgcolor: "#1e1b4b",
// //                 color: "#a78bfa",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //               }}
// //             >
// //               <LockIcon sx={{ fontSize: 18 }} />
// //             </Box>
// //             <Typography
// //               sx={{
// //                 color: "#a78bfa",
// //                 fontWeight: 800,
// //                 fontSize: "0.9rem",
// //                 letterSpacing: 1,
// //                 textTransform: "uppercase",
// //               }}
// //             >
// //               Record Payment Collection
// //             </Typography>
// //           </Box>

// //           {/* 🔥 TOTAL PAYMENT — customerBalance from API */}
// //           <Box display="flex" alignItems="center" gap={2}>
// //             <Box
// //               sx={{
// //                 px: 2,
// //                 py: 0.8,
// //                 borderRadius: "10px",
// //                 background:
// //                   "linear-gradient(135deg, rgba(167, 139, 250, 0.15), rgba(139, 92, 246, 0.08))",
// //                 border: "1px solid rgba(167, 139, 250, 0.3)",
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "flex-end",
// //                 minWidth: 130,
// //               }}
// //             >
// //               <Typography
// //                 sx={{
// //                   color: "#a78bfa",
// //                   fontSize: "0.6rem",
// //                   fontWeight: 800,
// //                   letterSpacing: 0.8,
// //                   lineHeight: 1,
// //                   mb: 0.5,
// //                   opacity: 0.85,
// //                 }}
// //               >
// //                 TOTAL PAYMENT
// //               </Typography>
// //               <Typography
// //                 sx={{
// //                   color: "#c4b5fd",
// //                   fontWeight: 900,
// //                   fontSize: "1.05rem",
// //                   lineHeight: 1,
// //                   letterSpacing: 0.3,
// //                   textShadow: "0 0 12px rgba(167, 139, 250, 0.5)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: 0.8,
// //                 }}
// //               >
// //                 {balanceLoading ? (
// //                   <CircularProgress size={14} sx={{ color: "#a78bfa" }} />
// //                 ) : (
// //                   formatCurrency(customerBalance)
// //                 )}
// //               </Typography>
// //             </Box>

// //             <IconButton
// //               onClick={closeFormModal}
// //               disabled={saving}
// //               size="small"
// //               sx={{
// //                 color: "#9ca3af",
// //                 "&:hover": {
// //                   color: "#f43f5e",
// //                   bgcolor: "rgba(244, 63, 94, 0.1)",
// //                 },
// //               }}
// //             >
// //               <CloseIcon />
// //             </IconButton>
// //           </Box>
// //         </DialogTitle>

// //         <DialogContent sx={{ p: 3 }}>
// //           <Grid container spacing={2}>
// //             {/* CUSTOMER */}
// //             <Grid
// //               size={{ xs: 12, sm: 6 }}
// //               ref={customerRef}
// //               sx={{ position: "relative" }}
// //             >
// //               <FieldLabel>Party / Customer Name *</FieldLabel>
// //               <StyledTextField
// //                 fullWidth
// //                 placeholder="Search or select customer..."
// //                 value={customerSearch}
// //                 onChange={(e) => {
// //                   setCustomerSearch(e.target.value);
// //                   if (selectedCustomer) {
// //                     setSelectedCustomer(null);
// //                     setLinkedInvoices([]);
// //                     setCustomerBalance(0);
// //                   }
// //                   setShowCustomerDropdown(true);
// //                 }}
// //                 onFocus={() => setShowCustomerDropdown(true)}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <Box
// //                       component="span"
// //                       sx={{ mr: 1, display: "flex", alignItems: "center" }}
// //                     >
// //                       {loadingCustomers ? (
// //                         <CircularProgress
// //                           size={16}
// //                           sx={{ color: "#6b7280" }}
// //                         />
// //                       ) : (
// //                         <Search sx={{ color: "#6b7280", fontSize: 18 }} />
// //                       )}
// //                     </Box>
// //                   ),
// //                 }}
// //               />

// //               {showCustomerDropdown && (
// //                 <Box
// //                   sx={{
// //                     position: "absolute",
// //                     top: "100%",
// //                     left: 0,
// //                     right: 0,
// //                     mt: 0.5,
// //                     bgcolor: "#111827",
// //                     border: "1px solid rgba(255, 255, 255, 0.1)",
// //                     borderRadius: "10px",
// //                     maxHeight: "240px",
// //                     overflowY: "auto",
// //                     zIndex: 1500,
// //                     boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
// //                   }}
// //                 >
// //                   {customerResults.length === 0 ? (
// //                     <Box sx={{ p: 2 }}>
// //                       <Typography
// //                         sx={{ color: "#9ca3af", fontSize: "0.8rem" }}
// //                       >
// //                         {loadingCustomers
// //                           ? "Loading customers..."
// //                           : "No customers found"}
// //                       </Typography>
// //                     </Box>
// //                   ) : (
// //                     customerResults.map((c) => (
// //                       <Box
// //                         key={c._id}
// //                         onClick={() => handleSelectCustomer(c)}
// //                         sx={{
// //                           px: 2,
// //                           py: 1.3,
// //                           cursor: "pointer",
// //                           borderBottom:
// //                             "1px solid rgba(255, 255, 255, 0.05)",
// //                           "&:hover": {
// //                             bgcolor: "rgba(167, 139, 250, 0.1)",
// //                           },
// //                           "&:last-child": { borderBottom: "none" },
// //                         }}
// //                       >
// //                         <Box
// //                           display="flex"
// //                           justifyContent="space-between"
// //                           alignItems="center"
// //                           gap={1}
// //                         >
// //                           <Box
// //                             display="flex"
// //                             alignItems="center"
// //                             gap={1}
// //                             sx={{ minWidth: 0, flex: 1 }}
// //                           >
// //                             <Person
// //                               sx={{
// //                                 fontSize: 16,
// //                                 color: "#a78bfa",
// //                                 flexShrink: 0,
// //                               }}
// //                             />
// //                             <Typography
// //                               sx={{
// //                                 color: "#ffffff",
// //                                 fontSize: "0.85rem",
// //                                 fontWeight: 600,
// //                                 overflow: "hidden",
// //                                 textOverflow: "ellipsis",
// //                                 whiteSpace: "nowrap",
// //                               }}
// //                             >
// //                               {c.companyName || c.displayName || "-"}
// //                             </Typography>
// //                           </Box>
// //                           {c.phone && (
// //                             <Typography
// //                               sx={{
// //                                 color: "#9ca3af",
// //                                 fontSize: "0.7rem",
// //                                 flexShrink: 0,
// //                               }}
// //                             >
// //                               📞 {c.phone}
// //                             </Typography>
// //                           )}
// //                         </Box>
// //                       </Box>
// //                     ))
// //                   )}
// //                 </Box>
// //               )}
// //             </Grid>

// //             {/* PAYMENT MODE */}
// //             <Grid size={{ xs: 12, sm: 6 }}>
// //               <FieldLabel>Payment Mode</FieldLabel>
// //               <StyledSelect
// //                 value={paymentMode}
// //                 onChange={(e) => setPaymentMode(e.target.value as string)}
// //                 MenuProps={{
// //                   PaperProps: {
// //                     sx: {
// //                       bgcolor: "#111827",
// //                       border: "1px solid rgba(255, 255, 255, 0.08)",
// //                       "& .MuiMenuItem-root": {
// //                         color: "#e5e7eb",
// //                         fontSize: "0.85rem",
// //                         "&:hover": { bgcolor: "rgba(167, 139, 250, 0.1)" },
// //                         "&.Mui-selected": {
// //                           bgcolor: "rgba(167, 139, 250, 0.15)",
// //                           color: "#a78bfa",
// //                         },
// //                       },
// //                     },
// //                   },
// //                 }}
// //               >
// //                 {PAYMENT_MODES.map((m) => (
// //                   <MenuItem key={m} value={m}>
// //                     {m}
// //                   </MenuItem>
// //                 ))}
// //               </StyledSelect>
// //             </Grid>

// //             {/* DATE */}
// //             <Grid size={{ xs: 12, sm: 6 }}>
// //               <FieldLabel>Payment Date *</FieldLabel>
// //               <StyledTextField
// //                 fullWidth
// //                 type="date"
// //                 value={paymentDate}
// //                 onChange={(e) => setPaymentDate(e.target.value)}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <Box
// //                       component="span"
// //                       sx={{ mr: 1, display: "flex", alignItems: "center" }}
// //                     >
// //                       <CalendarIcon sx={{ color: "#6b7280", fontSize: 18 }} />
// //                     </Box>
// //                   ),
// //                 }}
// //               />
// //             </Grid>

// //             {/* TRANSACTION REF */}
// //             <Grid size={{ xs: 12, sm: 6 }}>
// //               <FieldLabel>Transaction Ref / Note</FieldLabel>
// //               <StyledTextField
// //                 fullWidth
// //                 placeholder="e.g. UPI Ref #938210"
// //                 value={transactionRef}
// //                 onChange={(e) => setTransactionRef(e.target.value)}
// //               />
// //             </Grid>

// //             {/* AMOUNT + LINK */}
// //             <Grid size={{ xs: 12 }}>
// //               <Box
// //                 display="flex"
// //                 justifyContent="space-between"
// //                 alignItems="center"
// //                 mb={1}
// //               >
// //                 <FieldLabel sx={{ mb: 0 }}>
// //                   Amount Received (₹) *
// //                 </FieldLabel>

// //                 <LinkChip
// //                   linked={linkedInvoices.length > 0}
// //                   onClick={openLinkModal}
// //                 >
// //                   {linkedInvoices.length > 0 ? (
// //                     <>
// //                       <CheckIcon />
// //                       Linked ({linkedInvoices.length})
// //                     </>
// //                   ) : (
// //                     <>
// //                       <LinkIcon />
// //                       Link
// //                     </>
// //                   )}
// //                 </LinkChip>
// //               </Box>
// //               <StyledTextField
// //                 fullWidth
// //                 type="number"
// //                 placeholder="2500"
// //                 value={amount}
// //                 onChange={(e) =>
// //                   setAmount(e.target.value === "" ? "" : Number(e.target.value))
// //                 }
// //                 inputProps={{ min: 0, step: "0.01" }}
// //                 sx={{
// //                   "& .MuiOutlinedInput-root": {
// //                     fontSize: "1.1rem",
// //                     fontWeight: 800,
// //                     color: "#c4b5fd",
// //                     "&.Mui-focused fieldset": {
// //                       borderColor: "#a78bfa",
// //                     },
// //                   },
// //                   "& .MuiOutlinedInput-input": {
// //                     fontSize: "1.1rem",
// //                     fontWeight: 800,
// //                     letterSpacing: 0.5,
// //                   },
// //                 }}
// //               />
// //             </Grid>

// //             {/* LINKED INVOICES SUMMARY */}
// //             {linkedInvoices.length > 0 && (
// //               <Grid size={{ xs: 12 }}>
// //                 <Box
// //                   sx={{
// //                     bgcolor: "rgba(52, 211, 153, 0.06)",
// //                     border: "1px solid rgba(52, 211, 153, 0.25)",
// //                     borderRadius: "10px",
// //                     p: 1.5,
// //                     display: "flex",
// //                     justifyContent: "space-between",
// //                     alignItems: "center",
// //                     flexWrap: "wrap",
// //                     gap: 1,
// //                   }}
// //                 >
// //                   <Box display="flex" alignItems="center" gap={1}>
// //                     <LinkIcon sx={{ color: "#34d399", fontSize: 18 }} />
// //                     <Typography
// //                       sx={{
// //                         color: "#34d399",
// //                         fontWeight: 700,
// //                         fontSize: "0.8rem",
// //                       }}
// //                     >
// //                       {linkedInvoices.length} invoice
// //                       {linkedInvoices.length > 1 ? "s" : ""} linked
// //                     </Typography>
// //                   </Box>
// //                   <Box display="flex" alignItems="center" gap={1.5}>
// //                     <Typography
// //                       sx={{ color: "#9ca3af", fontSize: "0.75rem" }}
// //                     >
// //                       Total linked:
// //                     </Typography>
// //                     <Typography
// //                       sx={{
// //                         color: "#34d399",
// //                         fontWeight: 800,
// //                         fontSize: "0.85rem",
// //                       }}
// //                     >
// //                       {formatCurrency(totalLinkedAmount)}
// //                     </Typography>
// //                     <IconButton
// //                       size="small"
// //                       onClick={() => {
// //                         setLinkedInvoices([]);
// //                         setAmount("");
// //                       }}
// //                       sx={{
// //                         color: "#f43f5e",
// //                         "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
// //                       }}
// //                     >
// //                       <UnlinkIcon fontSize="small" />
// //                     </IconButton>
// //                   </Box>
// //                 </Box>
// //               </Grid>
// //             )}
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
// //               ) : (
// //                 <AddIcon />
// //               )
// //             }
// //             onClick={handleAddEntry}
// //             disabled={saving}
// //             sx={{
// //               bgcolor: "#8b5cf6",
// //               color: "#ffffff",
// //               fontWeight: 800,
// //               textTransform: "uppercase",
// //               letterSpacing: 0.5,
// //               borderRadius: "10px",
// //               px: 3,
// //               py: 1.1,
// //               fontSize: "0.8rem",
// //               boxShadow: "0 4px 14px rgba(139, 92, 246, 0.3)",
// //               "&:hover": {
// //                 bgcolor: "#7c3aed",
// //                 boxShadow: "0 8px 20px rgba(139, 92, 246, 0.4)",
// //               },
// //               "&.Mui-disabled": {
// //                 bgcolor: "rgba(139, 92, 246, 0.3)",
// //                 color: "rgba(255, 255, 255, 0.5)",
// //               },
// //             }}
// //           >
// //             {saving ? "Logging..." : "Log Payment Received"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* ================= LINK PAYMENT MODAL ================= */}
// //       <Dialog
// //         open={linkModalOpen}
// //         onClose={closeLinkModal}
// //         maxWidth="sm"
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
// //                 bgcolor: "#1e1b4b",
// //                 color: "#a78bfa",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //               }}
// //             >
// //               <LinkIcon sx={{ fontSize: 18 }} />
// //             </Box>
// //             <Typography
// //               sx={{
// //                 color: "#a78bfa",
// //                 fontWeight: 800,
// //                 fontSize: "0.9rem",
// //                 letterSpacing: 1,
// //                 textTransform: "uppercase",
// //               }}
// //             >
// //               Link Payment To Txns
// //             </Typography>
// //           </Box>

// //           <Box display="flex" alignItems="center" gap={1.5}>
// //             <Box
// //               sx={{
// //                 px: 1.5,
// //                 py: 0.6,
// //                 borderRadius: "8px",
// //                 bgcolor: "rgba(52, 211, 153, 0.1)",
// //                 border: "1px solid rgba(52, 211, 153, 0.3)",
// //               }}
// //             >
// //               <Typography
// //                 sx={{
// //                   color: "#9ca3af",
// //                   fontSize: "0.6rem",
// //                   fontWeight: 700,
// //                   letterSpacing: 0.5,
// //                   lineHeight: 1,
// //                   mb: 0.3,
// //                 }}
// //               >
// //                 TOTAL
// //               </Typography>
// //               <Typography
// //                 sx={{
// //                   color: "#34d399",
// //                   fontWeight: 900,
// //                   fontSize: "0.85rem",
// //                   lineHeight: 1,
// //                 }}
// //               >
// //                 {formatCurrency(draftTotal)}
// //               </Typography>
// //             </Box>

// //             <IconButton
// //               onClick={closeLinkModal}
// //               size="small"
// //               sx={{
// //                 color: "#9ca3af",
// //                 "&:hover": {
// //                   color: "#f43f5e",
// //                   bgcolor: "rgba(244, 63, 94, 0.1)",
// //                 },
// //               }}
// //             >
// //               <CloseIcon />
// //             </IconButton>
// //           </Box>
// //         </DialogTitle>

// //         <DialogContent sx={{ p: 0 }}>
// //           {invoicesLoading ? (
// //             <Box
// //               sx={{
// //                 p: 5,
// //                 textAlign: "center",
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 alignItems: "center",
// //                 gap: 2,
// //               }}
// //             >
// //               <CircularProgress sx={{ color: "#a78bfa" }} size={32} />
// //               <Typography sx={{ color: "#9ca3af", fontSize: "0.85rem" }}>
// //                 Loading pending invoices...
// //               </Typography>
// //             </Box>
// //           ) : invoices.length === 0 ? (
// //             <Box sx={{ p: 5, textAlign: "center" }}>
// //               <Receipt sx={{ fontSize: 44, color: "#374151", mb: 1 }} />
// //               <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
// //                 No pending invoices found
// //               </Typography>
// //               <Typography
// //                 sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
// //               >
// //                 This customer has no unpaid sales
// //               </Typography>
// //             </Box>
// //           ) : (
// //             <Box sx={{ maxHeight: 480, overflowY: "auto" }}>
// //               {invoices.map((inv, idx) => {
// //                 const draftAmt = draftLinks[inv._id] || 0;
// //                 const linked = draftAmt > 0;

// //                 return (
// //                   <Box
// //                     key={inv._id}
// //                     sx={{
// //                       px: 3,
// //                       py: 2,
// //                       borderBottom:
// //                         idx < invoices.length - 1
// //                           ? "1px solid rgba(255, 255, 255, 0.05)"
// //                           : "none",
// //                       backgroundColor: linked
// //                         ? "rgba(52, 211, 153, 0.03)"
// //                         : "transparent",
// //                       transition: "all 0.2s ease",
// //                     }}
// //                   >
// //                     <Box
// //                       display="flex"
// //                       justifyContent="space-between"
// //                       alignItems="center"
// //                       mb={1.5}
// //                     >
// //                       <Box display="flex" alignItems="center" gap={1}>
// //                         <CheckIcon
// //                           sx={{
// //                             color: linked ? "#34d399" : "#4b5563",
// //                             fontSize: 18,
// //                           }}
// //                         />
// //                         <Typography
// //                           sx={{
// //                             color: "#ffffff",
// //                             fontWeight: 800,
// //                             fontSize: "0.9rem",
// //                           }}
// //                         >
// //                           {inv.type}
// //                         </Typography>
// //                       </Box>
// //                       <Typography
// //                         sx={{
// //                           color: "#9ca3af",
// //                           fontSize: "0.78rem",
// //                           fontWeight: 600,
// //                         }}
// //                       >
// //                         {new Date(inv.date).toLocaleDateString("en-IN", {
// //                           day: "2-digit",
// //                           month: "2-digit",
// //                           year: "numeric",
// //                         })}
// //                       </Typography>
// //                     </Box>

// //                     <Grid container spacing={1.5}>
// //                       <Grid size={{ xs: 6 }}>
// //                         <Typography
// //                           sx={{
// //                             color: "#9ca3af",
// //                             fontSize: "0.7rem",
// //                             fontWeight: 600,
// //                             mb: 0.3,
// //                           }}
// //                         >
// //                           Invoice Number
// //                         </Typography>
// //                         <Typography
// //                           sx={{
// //                             color: "#ffffff",
// //                             fontWeight: 800,
// //                             fontSize: "0.95rem",
// //                           }}
// //                         >
// //                           {inv.invoiceNumber}
// //                         </Typography>
// //                       </Grid>

// //                       <Grid size={{ xs: 6 }}>
// //                         <Typography
// //                           sx={{
// //                             color: "#9ca3af",
// //                             fontSize: "0.7rem",
// //                             fontWeight: 600,
// //                             mb: 0.3,
// //                           }}
// //                         >
// //                           Total Amount
// //                         </Typography>
// //                         <Typography
// //                           sx={{
// //                             color: "#ffffff",
// //                             fontWeight: 800,
// //                             fontSize: "0.95rem",
// //                           }}
// //                         >
// //                           {inv.totalAmount.toFixed(2)}
// //                         </Typography>
// //                       </Grid>

// //                       <Grid size={{ xs: 6 }}>
// //                         <Typography
// //                           sx={{
// //                             color: "#9ca3af",
// //                             fontSize: "0.7rem",
// //                             fontWeight: 600,
// //                             mb: 0.3,
// //                           }}
// //                         >
// //                           Current Balance
// //                         </Typography>
// //                         <Typography
// //                           sx={{
// //                             color: "#fbbf24",
// //                             fontWeight: 800,
// //                             fontSize: "0.95rem",
// //                           }}
// //                         >
// //                           {inv.currentBalance.toFixed(2)}
// //                         </Typography>
// //                       </Grid>

// //                       <Grid size={{ xs: 6 }}>
// //                         <Typography
// //                           sx={{
// //                             color: "#9ca3af",
// //                             fontSize: "0.7rem",
// //                             fontWeight: 600,
// //                             mb: 0.5,
// //                           }}
// //                         >
// //                           Link Amount
// //                         </Typography>
// //                         <SmallInput
// //                           type="number"
// //                           min={0}
// //                           max={inv.currentBalance}
// //                           step="0.01"
// //                           value={draftAmt || ""}
// //                           placeholder="0.00"
// //                           onChange={(e) =>
// //                             handleDraftLinkChange(
// //                               inv._id,
// //                               Number(e.target.value)
// //                             )
// //                           }
// //                         />
// //                       </Grid>
// //                     </Grid>
// //                   </Box>
// //                 );
// //               })}
// //             </Box>
// //           )}
// //         </DialogContent>

// //         <DialogActions
// //           sx={{
// //             px: 3,
// //             pb: 3,
// //             pt: 1.5,
// //             borderTop: "1px solid rgba(255, 255, 255, 0.08)",
// //             gap: 1,
// //           }}
// //         >
// //           <Button
// //             onClick={closeLinkModal}
// //             sx={{
// //               color: "#9ca3af",
// //               textTransform: "uppercase",
// //               fontWeight: 700,
// //               letterSpacing: 0.5,
// //               borderRadius: "10px",
// //               px: 3,
// //               py: 1.1,
// //               fontSize: "0.8rem",
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
// //             onClick={handleLinkDone}
// //             disabled={invoicesLoading || invoices.length === 0}
// //             sx={{
// //               bgcolor: "#1e40af",
// //               color: "#ffffff",
// //               fontWeight: 800,
// //               textTransform: "uppercase",
// //               letterSpacing: 0.5,
// //               borderRadius: "10px",
// //               px: 4,
// //               py: 1.1,
// //               fontSize: "0.8rem",
// //               boxShadow: "0 4px 14px rgba(30, 64, 175, 0.3)",
// //               "&:hover": {
// //                 bgcolor: "#1d4ed8",
// //                 boxShadow: "0 8px 20px rgba(30, 64, 175, 0.4)",
// //               },
// //               "&.Mui-disabled": {
// //                 bgcolor: "rgba(30, 64, 175, 0.3)",
// //                 color: "rgba(255, 255, 255, 0.5)",
// //               },
// //             }}
// //           >
// //             Done
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
// //           Delete Payment Entry?
// //         </DialogTitle>
// //         <DialogContent>
// //           <DialogContentText sx={{ color: "#9ca3af" }}>
// //             Are you sure you want to delete this payment entry? This action
// //             cannot be undone.
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
// //               "&.Mui-disabled": {
// //                 bgcolor: "rgba(244, 63, 94, 0.3)",
// //                 color: "rgba(255, 255, 255, 0.5)",
// //               },
// //             }}
// //           >
// //             {deleting ? "Deleting..." : "Delete"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default PaymentReceivedEntry;



// import React, { useEffect, useState, useRef, useMemo } from "react";
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
//   MenuItem,
//   Select,
//   Pagination,
//   Tooltip,
//   Fab,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   ArrowBack,
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Search,
//   Payments,
//   Receipt,
//   Person,
//   Refresh as RefreshIcon,
//   Home as HomeIcon,
//   FilterAlt as FilterIcon,
//   Clear as ClearIcon,
//   Close as CloseIcon,
//   Lock as LockIcon,
//   Link as LinkIcon,
//   LinkOff as UnlinkIcon,
//   CheckCircle as CheckIcon,
//   CalendarToday as CalendarIcon,
// } from "@mui/icons-material";

// // ===================== TYPES =====================

// interface Customer {
//   _id: string;
//   companyName?: string;
//   displayName?: string;
//   phone?: string;
//   email?: string;
// }

// interface PaymentEntry {
//   _id: string;
//   customerId: Customer | string;
//   customerName: string;
//   paymentMode: string;
//   transactionRef: string;
//   amount: number;
//   date: string;
//   createdAt: string;
//   linkedInvoices?: LinkedInvoice[];
// }

// interface Invoice {
//   _id: string;
//   invoiceNumber: string;
//   date: string;
//   totalAmount: number;
//   currentBalance: number;
//   type: "Sale" | "Purchase" | "Credit";
//   paymentStatus?: string;
//   remarks?: string;
// }

// interface LinkedInvoice {
//   invoiceId: string;
//   invoiceNumber: string;
//   invoiceDate: string; // ✅ already present
//   invoiceTotal: number;
//   linkedAmount: number;
// }

// // ===================== CONSTANTS =====================

// const PAYMENT_MODES = [
//   "Cash Collection",
//   "UPI / QR",
//   "Bank Transfer",
//   "Cheque",
//   "Card",
//   "Other",
// ];

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const getAuthHeaders = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
//   },
// });

// // ===================== HELPERS =====================

// const todayStr = () => new Date().toISOString().split("T")[0];
// const firstOfMonthStr = () => {
//   const d = new Date();
//   return new Date(d.getFullYear(), d.getMonth(), 1)
//     .toISOString()
//     .split("T")[0];
// };

// const getCustomerName = (c: Customer | string): string => {
//   if (typeof c === "object" && c !== null) {
//     return c.companyName || c.displayName || "-";
//   }
//   return "-";
// };

// const getCustomerPhone = (c: Customer | string): string => {
//   if (typeof c === "object" && c !== null) {
//     return c.phone || "";
//   }
//   return "";
// };

// const formatCurrency = (n: number) =>
//   `₹ ${(n || 0).toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;

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
//     height: "42px",
//     "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
//     "&:hover fieldset": { borderColor: "rgba(167, 139, 250, 0.4)" },
//     "&.Mui-focused fieldset": {
//       borderColor: "#a78bfa",
//       borderWidth: "1.5px",
//     },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#ffffff",
//     fontSize: "0.85rem",
//     fontWeight: 500,
//     padding: "10px 12px",
//     "&::placeholder": { color: "#6b7280", opacity: 1 },
//   },
//   "& input[type='date']::-webkit-calendar-picker-indicator": {
//     filter: "invert(0.7)",
//     cursor: "pointer",
//   },
// }));

// const StyledSelect = styled(Select)(() => ({
//   borderRadius: "10px",
//   backgroundColor: "#090d16",
//   color: "#ffffff",
//   height: "42px",
//   width: "100%",
//   fontSize: "0.85rem",
//   fontWeight: 500,
//   "& .MuiOutlinedInput-notchedOutline": {
//     borderColor: "rgba(255, 255, 255, 0.1)",
//   },
//   "&:hover .MuiOutlinedInput-notchedOutline": {
//     borderColor: "rgba(167, 139, 250, 0.4)",
//   },
//   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#a78bfa",
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
//     backgroundColor: "rgba(167, 139, 250, 0.3)",
//     borderRadius: "8px",
//     "&:hover": { backgroundColor: "rgba(167, 139, 250, 0.5)" },
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
//   "& tbody tr:hover": { backgroundColor: "rgba(167, 139, 250, 0.03)" },
//   "& tbody td": {
//     color: "#e5e7eb",
//     fontSize: "0.85rem",
//     padding: "14px 12px",
//     textAlign: "left",
//   },
// }));

// const LinkChip = styled(Box)<{ linked: boolean }>(({ linked }) => ({
//   display: "inline-flex",
//   alignItems: "center",
//   gap: "4px",
//   padding: "4px 12px",
//   borderRadius: "20px",
//   fontWeight: 700,
//   fontSize: "0.7rem",
//   cursor: "pointer",
//   transition: "all 0.2s ease",
//   backgroundColor: linked
//     ? "rgba(52, 211, 153, 0.15)"
//     : "rgba(167, 139, 250, 0.15)",
//   color: linked ? "#34d399" : "#a78bfa",
//   border: linked
//     ? "1px solid rgba(52, 211, 153, 0.4)"
//     : "1px dashed rgba(167, 139, 250, 0.5)",
//   "&:hover": {
//     backgroundColor: linked
//       ? "rgba(52, 211, 153, 0.25)"
//       : "rgba(167, 139, 250, 0.25)",
//     transform: "translateY(-1px)",
//   },
//   "& svg": { fontSize: "14px" },
// }));

// const SmallInput = styled("input")(() => ({
//   width: "100%",
//   padding: "8px 10px",
//   borderRadius: "8px",
//   backgroundColor: "#090d16",
//   border: "1px solid rgba(167, 139, 250, 0.3)",
//   color: "#ffffff",
//   fontSize: "0.85rem",
//   fontWeight: 700,
//   textAlign: "right",
//   outline: "none",
//   transition: "all 0.2s ease",
//   "&:focus": {
//     borderColor: "#a78bfa",
//     boxShadow: "0 0 0 3px rgba(167, 139, 250, 0.15)",
//   },
//   "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
//     WebkitAppearance: "none",
//     margin: 0,
//   },
//   "&[type=number]": { MozAppearance: "textfield" },
// }));

// // ===================== MAIN =====================

// const PaymentReceivedEntry: React.FC = () => {
//   const navigate = useNavigate();

//   // List state
//   const [entries, setEntries] = useState<PaymentEntry[]>([]);
//   const [listLoading, setListLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // Pagination
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);

//   // Date Filter (list)
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [appliedFrom, setAppliedFrom] = useState("");
//   const [appliedTo, setAppliedTo] = useState("");

//   // Form modal
//   const [formOpen, setFormOpen] = useState(false);

//   // Customer search
//   const [customerSearch, setCustomerSearch] = useState("");
//   const [customerResults, setCustomerResults] = useState<Customer[]>([]);
//   const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
//     null
//   );
//   const [loadingCustomers, setLoadingCustomers] = useState(false);

//   // Customer balance (from API)
//   const [customerBalance, setCustomerBalance] = useState<number>(0);
//   const [balanceLoading, setBalanceLoading] = useState(false);

//   // Form state
//   const [paymentMode, setPaymentMode] = useState(PAYMENT_MODES[0]);
//   const [transactionRef, setTransactionRef] = useState("");
//   const [amount, setAmount] = useState<number | "">("");
//   const [paymentDate, setPaymentDate] = useState<string>(todayStr());

//   // Linked invoices
//   const [linkedInvoices, setLinkedInvoices] = useState<LinkedInvoice[]>([]);

//   // Link Modal
//   const [linkModalOpen, setLinkModalOpen] = useState(false);
//   const [invoices, setInvoices] = useState<Invoice[]>([]);
//   const [invoicesLoading, setInvoicesLoading] = useState(false);
//   const [draftLinks, setDraftLinks] = useState<Record<string, number>>({});

//   // Delete dialog
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   const customerRef = useRef<HTMLDivElement>(null);

//   // ===================== OUTSIDE CLICK =====================
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (
//         customerRef.current &&
//         !customerRef.current.contains(e.target as Node)
//       ) {
//         setShowCustomerDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // ===================== FETCH PAYMENTS =====================
//   const fetchPayments = async () => {
//     try {
//       setListLoading(true);

//       const params: any = { page, limit };
//       if (appliedFrom) params.fromDate = appliedFrom;
//       if (appliedTo) params.toDate = appliedTo;

//       const res = await axios.get(`${API_URL}/payment-received`, {
//         params,
//         ...getAuthHeaders(),
//       });

//       if (res.data?.success === true) {
//         setEntries(res.data.data || []);

//         const count =
//           res.data.totalCount ??
//           res.data.total ??
//           res.data.count ??
//           (res.data.data ? res.data.data.length : 0);
//         const pages =
//           res.data.totalPages ?? Math.max(1, Math.ceil((count || 0) / limit));

//         setTotalCount(count);
//         setTotalPages(pages);
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(res.data?.message || "Failed to load payments");
//         setEntries([]);
//       }
//     } catch (error: any) {
//       console.error("Fetch payments error:", error);
//       if (error.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(error.response?.data?.message || "Failed to load payments");
//       }
//       setEntries([]);
//     } finally {
//       setListLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page, limit, appliedFrom, appliedTo]);

//   // ===================== SEARCH CUSTOMERS =====================
//   useEffect(() => {
//     if (!formOpen) return;

//     const timer = setTimeout(async () => {
//       try {
//         setLoadingCustomers(true);

//         const isSearch = customerSearch.trim().length > 0;

//         const res = isSearch
//           ? await axios.get(`${API_URL}/customer/search`, {
//               params: { query: customerSearch, limit: 20 },
//               ...getAuthHeaders(),
//             })
//           : await axios.get(`${API_URL}/customer`, {
//               params: { page: 1, limit: 20 },
//               ...getAuthHeaders(),
//             });

//         if (res.data?.success) {
//           setCustomerResults(res.data.data || []);
//         }
//       } catch (err) {
//         console.error("Customer fetch error:", err);
//       } finally {
//         setLoadingCustomers(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [customerSearch, formOpen]);

//   // ===================== SELECT CUSTOMER (with balance API) =====================
//   const handleSelectCustomer = async (c: Customer) => {
//     setSelectedCustomer(c);
//     setCustomerSearch(c.companyName || c.displayName || "");
//     setShowCustomerDropdown(false);
//     setLinkedInvoices([]);

//     try {
//       setBalanceLoading(true);
//       const res = await axios.get(
//         `${API_URL}/customer-ledger/balance/${c._id}`,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         setCustomerBalance(res.data.data?.balance || 0);
//       } else {
//         setCustomerBalance(0);
//       }
//     } catch (err: any) {
//       console.error("Balance fetch error:", err);
//       setCustomerBalance(0);
//     } finally {
//       setBalanceLoading(false);
//     }
//   };

//   // ===================== FORM HANDLERS =====================
//   const resetForm = () => {
//     setSelectedCustomer(null);
//     setCustomerSearch("");
//     setPaymentMode(PAYMENT_MODES[0]);
//     setTransactionRef("");
//     setAmount("");
//     setPaymentDate(todayStr());
//     setLinkedInvoices([]);
//     setCustomerBalance(0);
//     setShowCustomerDropdown(false);
//   };

//   const openFormModal = () => {
//     resetForm();
//     setFormOpen(true);
//   };

//   const closeFormModal = () => {
//     if (saving) return;
//     setFormOpen(false);
//     resetForm();
//   };

//   // ===================== LIST DATE FILTER =====================
//   const handleApplyDateFilter = () => {
//     if (fromDate && toDate && fromDate > toDate) {
//       toast.error("From date cannot be after To date");
//       return;
//     }
//     setAppliedFrom(fromDate);
//     setAppliedTo(toDate);
//     setPage(1);
//   };

//   const handleClearDateFilter = () => {
//     setFromDate("");
//     setToDate("");
//     setAppliedFrom("");
//     setAppliedTo("");
//     setPage(1);
//   };

//   const applyQuickRange = (type: "today" | "week" | "month" | "all") => {
//     const t = todayStr();
//     if (type === "today") {
//       setFromDate(t);
//       setToDate(t);
//       setAppliedFrom(t);
//       setAppliedTo(t);
//     } else if (type === "week") {
//       const d = new Date();
//       d.setDate(d.getDate() - 6);
//       const from = d.toISOString().split("T")[0];
//       setFromDate(from);
//       setToDate(t);
//       setAppliedFrom(from);
//       setAppliedTo(t);
//     } else if (type === "month") {
//       const from = firstOfMonthStr();
//       setFromDate(from);
//       setToDate(t);
//       setAppliedFrom(from);
//       setAppliedTo(t);
//     } else {
//       setFromDate("");
//       setToDate("");
//       setAppliedFrom("");
//       setAppliedTo("");
//     }
//     setPage(1);
//   };

//   const hasDateFilter = !!(appliedFrom || appliedTo);

//   // ===================== LINK MODAL =====================
//   const openLinkModal = async () => {
//     if (!selectedCustomer) {
//       toast.error("Please select a customer first");
//       return;
//     }

//     setLinkModalOpen(true);
//     setInvoicesLoading(true);

//     const existing: Record<string, number> = {};
//     linkedInvoices.forEach((li) => {
//       existing[li.invoiceId] = li.linkedAmount;
//     });
//     setDraftLinks(existing);

//     try {
//       const res = await axios.get(
//         `${API_URL}/customer-ledger/pending-invoices/${selectedCustomer._id}`,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         setInvoices(res.data.data || []);
//       } else {
//         toast.error(res.data?.message || "Failed to load invoices");
//         setInvoices([]);
//       }
//     } catch (err: any) {
//       console.error("Fetch pending invoices error:", err);
//       if (err.response?.data?.message === "Unauthorized") {
//         localStorage.removeItem("erptoken");
//         navigate("/login");
//       } else {
//         toast.error(err.response?.data?.message || "Failed to load invoices");
//       }
//       setInvoices([]);
//     } finally {
//       setInvoicesLoading(false);
//     }
//   };

//   const closeLinkModal = () => {
//     setLinkModalOpen(false);
//     setInvoices([]);
//     setDraftLinks({});
//   };

//   const handleDraftLinkChange = (invoiceId: string, value: number) => {
//     setDraftLinks((prev) => ({
//       ...prev,
//       [invoiceId]: Math.max(0, value),
//     }));
//   };

//   // ===================== ✅ DONE (invoiceDate + invoiceTotal capture) =====================
//   const handleLinkDone = () => {
//     const newLinked: LinkedInvoice[] = invoices
//       .filter((inv) => (draftLinks[inv._id] || 0) > 0)
//       .map((inv) => ({
//         invoiceId: inv._id,
//         invoiceNumber: inv.invoiceNumber,
//         invoiceDate: inv.date, // ✅ invoice date
//         invoiceTotal: inv.totalAmount, // ✅ invoice total
//         linkedAmount: draftLinks[inv._id] || 0,
//       }));

//     setLinkedInvoices(newLinked);

//     const linkedTotal = newLinked.reduce((s, li) => s + li.linkedAmount, 0);
//     if (linkedTotal > 0) {
//       setAmount(Number(linkedTotal.toFixed(2)));
//     }

//     setLinkModalOpen(false);
//     setDraftLinks({});

//     if (newLinked.length > 0) {
//       toast.success(
//         `${newLinked.length} invoice(s) linked · ${formatCurrency(linkedTotal)}`
//       );
//     }
//   };

//   // Total linked amount
//   const totalLinkedAmount = useMemo(
//     () => linkedInvoices.reduce((s, li) => s + li.linkedAmount, 0),
//     [linkedInvoices]
//   );

//   // Draft total
//   const draftTotal = useMemo(
//     () =>
//       invoices.reduce((s, inv) => s + (Number(draftLinks[inv._id]) || 0), 0),
//     [invoices, draftLinks]
//   );

//   // ===================== ✅ CREATE (send invoiceDate + invoiceTotal) =====================
//   const handleAddEntry = async () => {
//     if (!selectedCustomer) {
//       toast.error("Please select a customer from the list");
//       return;
//     }
//     if (!amount || Number(amount) <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }
//     if (!paymentDate) {
//       toast.error("Please select a payment date");
//       return;
//     }
//     if (
//       linkedInvoices.length > 0 &&
//       Math.abs(totalLinkedAmount - Number(amount)) > 0.01
//     ) {
//       toast.error(
//         `Linked amount (${formatCurrency(
//           totalLinkedAmount
//         )}) must match received amount (${formatCurrency(Number(amount))})`
//       );
//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         customerId: selectedCustomer._id,
//         customerName:
//           selectedCustomer.companyName || selectedCustomer.displayName || "-",
//         paymentMode,
//         transactionRef: transactionRef.trim() || "-",
//         amount: Number(amount),
//         date: paymentDate,
//         // ✅ Full linked invoice data including invoiceDate & invoiceTotal
//         linkedInvoices: linkedInvoices.map((li) => ({
//           invoiceId: li.invoiceId,
//           invoiceNumber: li.invoiceNumber,
//           invoiceDate: li.invoiceDate,
//           invoiceTotal: li.invoiceTotal,
//           linkedAmount: li.linkedAmount,
//         })),
//       };

//       const res = await axios.post(
//         `${API_URL}/payment-received`,
//         payload,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success("Payment recorded successfully! 🎉");
//         closeFormModal();
//         setPage(1);
//         fetchPayments();
//       } else if (res.data?.message === "Unauthorized") {
//         toast.error("Session expired! Please login again");
//         localStorage.removeItem("erptoken");
//         setTimeout(() => navigate("/login"), 1500);
//       } else {
//         toast.error(
//           res.data?.errors?.[0] ||
//             res.data?.message ||
//             "Failed to record payment"
//         );
//       }
//     } catch (error: any) {
//       console.error("Create payment error:", error);
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
//             "Failed to record payment"
//         );
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ===================== DELETE =====================
//   const handleDelete = async () => {
//     if (!deleteId) return;

//     try {
//       setDeleting(true);

//       const res = await axios.delete(
//         `${API_URL}/payment-received/${deleteId}`,
//         getAuthHeaders()
//       );

//       if (res.data?.success === true) {
//         toast.success("Payment entry deleted");
//         setDeleteId(null);
//         if (entries.length === 1 && page > 1) {
//           setPage((p) => p - 1);
//         } else {
//           fetchPayments();
//         }
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
//                     borderColor: "#a78bfa",
//                     color: "#a78bfa",
//                     bgcolor: "rgba(167, 139, 250, 0.08)",
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
//                     bgcolor: "#1e1b4b",
//                     color: "#a78bfa",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Payments />
//                 </Box>
//                 <Typography
//                   variant="h5"
//                   fontWeight="800"
//                   sx={{
//                     fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
//                     letterSpacing: 0.5,
//                   }}
//                 >
//                   4. PAYMENT RECEIVED ENTRY
//                 </Typography>
//               </Box>
//             </Box>

//             <Box display="flex" alignItems="center" gap={1.5}>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={openFormModal}
//                 sx={{
//                   bgcolor: "#8b5cf6",
//                   color: "#ffffff",
//                   fontWeight: 800,
//                   textTransform: "none",
//                   letterSpacing: 0.3,
//                   borderRadius: "10px",
//                   px: 2.5,
//                   py: 1,
//                   fontSize: "0.8rem",
//                   boxShadow: "0 4px 14px rgba(139, 92, 246, 0.35)",
//                   "&:hover": {
//                     bgcolor: "#7c3aed",
//                     boxShadow: "0 8px 20px rgba(139, 92, 246, 0.5)",
//                   },
//                 }}
//               >
//                 Payment Entry
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={<RefreshIcon />}
//                 onClick={fetchPayments}
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
//                     borderColor: "#a78bfa",
//                     color: "#a78bfa",
//                     bgcolor: "rgba(167, 139, 250, 0.08)",
//                   },
//                 }}
//               >
//                 Refresh
//               </Button>
//             </Box>
//           </Box>
//         </DarkBanner>

//         {/* DATE FILTER */}
//         <FilterBar>
//           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
//             <Box display="flex" alignItems="center" gap={0.8}>
//               <FilterIcon sx={{ color: "#a78bfa", fontSize: 18 }} />
//               <Typography
//                 sx={{
//                   color: "#a78bfa",
//                   fontWeight: 800,
//                   fontSize: "0.75rem",
//                   letterSpacing: 1,
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Date Filter
//               </Typography>
//             </Box>

//             <StyledTextField
//               type="date"
//               size="small"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               sx={{ width: 160 }}
//             />
//             <Typography sx={{ color: "#6b7280", fontSize: "0.8rem" }}>
//               to
//             </Typography>
//             <StyledTextField
//               type="date"
//               size="small"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               sx={{ width: 160 }}
//             />

//             <Button
//               size="small"
//               variant="contained"
//               onClick={handleApplyDateFilter}
//               sx={{
//                 bgcolor: "#8b5cf6",
//                 color: "#fff",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "8px",
//                 px: 2,
//                 fontSize: "0.75rem",
//                 "&:hover": { bgcolor: "#7c3aed" },
//               }}
//             >
//               Apply
//             </Button>

//             <Button
//               size="small"
//               variant="outlined"
//               startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
//               onClick={handleClearDateFilter}
//               disabled={!hasDateFilter && !fromDate && !toDate}
//               sx={{
//                 color: "#9ca3af",
//                 borderColor: "rgba(255, 255, 255, 0.15)",
//                 fontWeight: 700,
//                 textTransform: "none",
//                 borderRadius: "8px",
//                 px: 1.5,
//                 fontSize: "0.75rem",
//                 "&:hover": {
//                   borderColor: "#f43f5e",
//                   color: "#f43f5e",
//                   bgcolor: "rgba(244, 63, 94, 0.08)",
//                 },
//               }}
//             >
//               Clear
//             </Button>

//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 0.7,
//                 ml: { md: "auto" },
//                 flexWrap: "wrap",
//               }}
//             >
//               {[
//                 { k: "today", label: "Today" },
//                 { k: "week", label: "Last 7d" },
//                 { k: "month", label: "This Month" },
//                 { k: "all", label: "All" },
//               ].map((q) => (
//                 <Chip
//                   key={q.k}
//                   label={q.label}
//                   size="small"
//                   onClick={() =>
//                     applyQuickRange(q.k as "today" | "week" | "month" | "all")
//                   }
//                   sx={{
//                     bgcolor: "rgba(255, 255, 255, 0.05)",
//                     color: "#e5e7eb",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                     fontWeight: 600,
//                     fontSize: "0.7rem",
//                     height: "26px",
//                     cursor: "pointer",
//                     "&:hover": {
//                       bgcolor: "rgba(167, 139, 250, 0.15)",
//                       borderColor: "rgba(167, 139, 250, 0.4)",
//                       color: "#a78bfa",
//                     },
//                   }}
//                 />
//               ))}
//             </Box>

//             {hasDateFilter && (
//               <Chip
//                 label={`Active: ${appliedFrom || "..."} → ${
//                   appliedTo || "..."
//                 }`}
//                 size="small"
//                 sx={{
//                   bgcolor: "rgba(167, 139, 250, 0.15)",
//                   color: "#a78bfa",
//                   border: "1px solid rgba(167, 139, 250, 0.4)",
//                   fontWeight: 700,
//                   fontSize: "0.7rem",
//                   height: "26px",
//                 }}
//               />
//             )}
//           </Box>
//         </FilterBar>

//         {/* TABLE */}
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
//               COLLECTIONS & PAYMENTS LOG
//             </Typography>
//             <Chip
//               label={`${totalCount} Payments Received`}
//               size="small"
//               sx={{
//                 bgcolor: "rgba(255, 255, 255, 0.05)",
//                 color: "#9ca3af",
//                 border: "1px solid rgba(255, 255, 255, 0.1)",
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
//                   <th>Party / Customer</th>
//                   <th style={{ textAlign: "center" }}>Date</th>
//                   <th style={{ textAlign: "center" }}>Payment Mode</th>
//                   <th style={{ textAlign: "center" }}>Ref / Remarks</th>
//                   <th style={{ textAlign: "center" }}>Linked</th>
//                   <th style={{ textAlign: "center" }}>Amount (₹)</th>
//                   <th style={{ textAlign: "center", width: "80px" }}>
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {listLoading ? (
//                   <tr>
//                     <td
//                       colSpan={8}
//                       style={{ textAlign: "center", padding: "40px 12px" }}
//                     >
//                       <CircularProgress sx={{ color: "#a78bfa" }} size={32} />
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
//                       >
//                         Loading payments...
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : entries.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={8}
//                       style={{ textAlign: "center", padding: "40px 12px" }}
//                     >
//                       <Receipt
//                         style={{
//                           fontSize: 40,
//                           color: "#374151",
//                           marginBottom: 8,
//                         }}
//                       />
//                       <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
//                         No payments found
//                       </Typography>
//                       <Typography
//                         sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
//                       >
//                         {hasDateFilter
//                           ? "Try changing the date filter"
//                           : "Click 'Payment Entry' to log your first payment"}
//                       </Typography>
//                     </td>
//                   </tr>
//                 ) : (
//                   entries.map((row, idx) => {
//                     const linkedCount = row.linkedInvoices?.length || 0;
//                     return (
//                       <tr key={row._id}>
//                         <td style={{ textAlign: "center", color: "#6b7280" }}>
//                           {(page - 1) * limit + idx + 1}
//                         </td>
//                         <td>
//                           <Typography
//                             sx={{
//                               color: "#ffffff",
//                               fontWeight: 700,
//                               fontSize: "0.85rem",
//                             }}
//                           >
//                             {row.customerName ||
//                               getCustomerName(row.customerId)}
//                           </Typography>
//                           {getCustomerPhone(row.customerId) && (
//                             <Typography
//                               sx={{
//                                 color: "#9ca3af",
//                                 fontSize: "0.7rem",
//                                 mt: 0.3,
//                               }}
//                             >
//                               📞 {getCustomerPhone(row.customerId)}
//                             </Typography>
//                           )}
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Typography
//                             sx={{ color: "#9ca3af", fontSize: "0.8rem" }}
//                           >
//                             {new Date(
//                               row.date || row.createdAt
//                             ).toLocaleDateString("en-IN", {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                             })}
//                           </Typography>
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Chip
//                             label={row.paymentMode}
//                             size="small"
//                             sx={{
//                               bgcolor: "rgba(167, 139, 250, 0.1)",
//                               color: "#a78bfa",
//                               border: "1px solid rgba(167, 139, 250, 0.3)",
//                               fontSize: "0.7rem",
//                               fontWeight: 600,
//                               height: "24px",
//                             }}
//                           />
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Typography
//                             sx={{ color: "#9ca3af", fontSize: "0.8rem" }}
//                           >
//                             {row.transactionRef}
//                           </Typography>
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           {linkedCount > 0 ? (
//                             <Chip
//                               icon={<LinkIcon sx={{ fontSize: 12 }} />}
//                               label={`${linkedCount} invoice${
//                                 linkedCount > 1 ? "s" : ""
//                               }`}
//                               size="small"
//                               sx={{
//                                 bgcolor: "rgba(52, 211, 153, 0.1)",
//                                 color: "#34d399",
//                                 border: "1px solid rgba(52, 211, 153, 0.3)",
//                                 fontSize: "0.68rem",
//                                 fontWeight: 700,
//                                 height: "24px",
//                                 "& .MuiChip-icon": { color: "#34d399" },
//                               }}
//                             />
//                           ) : (
//                             <Typography
//                               sx={{ color: "#6b7280", fontSize: "0.75rem" }}
//                             >
//                               —
//                             </Typography>
//                           )}
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <Typography
//                             sx={{
//                               color: "#a78bfa",
//                               fontWeight: 800,
//                               fontSize: "0.95rem",
//                             }}
//                           >
//                             {formatCurrency(row.amount)}
//                           </Typography>
//                         </td>
//                         <td style={{ textAlign: "center" }}>
//                           <IconButton
//                             size="small"
//                             onClick={() => setDeleteId(row._id)}
//                             sx={{
//                               color: "#f43f5e",
//                               "&:hover": {
//                                 bgcolor: "rgba(244, 63, 94, 0.1)",
//                               },
//                             }}
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </ItemsTable>
//           </TableScrollArea>

//           {/* PAGINATION */}
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
//                 sx={{ color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600 }}
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
//                         ? "rgba(167, 139, 250, 0.2)"
//                         : "rgba(255, 255, 255, 0.05)",
//                     color: limit === n ? "#a78bfa" : "#9ca3af",
//                     border:
//                       limit === n
//                         ? "1px solid rgba(167, 139, 250, 0.5)"
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
//                     bgcolor: "rgba(167, 139, 250, 0.1)",
//                     color: "#a78bfa",
//                   },
//                 },
//                 "& .Mui-selected": {
//                   bgcolor: "rgba(167, 139, 250, 0.2) !important",
//                   color: "#a78bfa !important",
//                   borderColor: "rgba(167, 139, 250, 0.5) !important",
//                 },
//               }}
//             />
//           </Box>
//         </TableContainerDark>
//       </Box>

//       {/* FLOATING HOME FAB */}
//       <Tooltip title="Back to Dashboard" placement="left">
//         <Fab
//           onClick={() => navigate("/dashboard")}
//           sx={{
//             position: "fixed",
//             bottom: 20,
//             right: 20,
//             zIndex: 1200,
//             bgcolor: "#a78bfa",
//             color: "#0d1527",
//             width: 52,
//             height: 52,
//             boxShadow: "0 8px 24px rgba(167, 139, 250, 0.5)",
//             "&:hover": { bgcolor: "#8b5cf6" },
//           }}
//         >
//           <HomeIcon />
//         </Fab>
//       </Tooltip>

//       {/* ================= FORM MODAL ================= */}
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
//                 bgcolor: "#1e1b4b",
//                 color: "#a78bfa",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <LockIcon sx={{ fontSize: 18 }} />
//             </Box>
//             <Typography
//               sx={{
//                 color: "#a78bfa",
//                 fontWeight: 800,
//                 fontSize: "0.9rem",
//                 letterSpacing: 1,
//                 textTransform: "uppercase",
//               }}
//             >
//               Record Payment Collection
//             </Typography>
//           </Box>

//           <Box display="flex" alignItems="center" gap={2}>
//             <Box
//               sx={{
//                 px: 2,
//                 py: 0.8,
//                 borderRadius: "10px",
//                 background:
//                   "linear-gradient(135deg, rgba(167, 139, 250, 0.15), rgba(139, 92, 246, 0.08))",
//                 border: "1px solid rgba(167, 139, 250, 0.3)",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "flex-end",
//                 minWidth: 130,
//               }}
//             >
//               <Typography
//                 sx={{
//                   color: "#a78bfa",
//                   fontSize: "0.6rem",
//                   fontWeight: 800,
//                   letterSpacing: 0.8,
//                   lineHeight: 1,
//                   mb: 0.5,
//                   opacity: 0.85,
//                 }}
//               >
//                 TOTAL PAYMENT
//               </Typography>
//               <Typography
//                 sx={{
//                   color: "#c4b5fd",
//                   fontWeight: 900,
//                   fontSize: "1.05rem",
//                   lineHeight: 1,
//                   letterSpacing: 0.3,
//                   textShadow: "0 0 12px rgba(167, 139, 250, 0.5)",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 0.8,
//                 }}
//               >
//                 {balanceLoading ? (
//                   <CircularProgress size={14} sx={{ color: "#a78bfa" }} />
//                 ) : (
//                   formatCurrency(customerBalance)
//                 )}
//               </Typography>
//             </Box>

//             <IconButton
//               onClick={closeFormModal}
//               disabled={saving}
//               size="small"
//               sx={{
//                 color: "#9ca3af",
//                 "&:hover": {
//                   color: "#f43f5e",
//                   bgcolor: "rgba(244, 63, 94, 0.1)",
//                 },
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>

//         <DialogContent sx={{ p: 3 }}>
//           <Grid container spacing={2}>
//             {/* CUSTOMER */}
//             <Grid
//               size={{ xs: 12, sm: 6 }}
//               ref={customerRef}
//               sx={{ position: "relative" }}
//             >
//               <FieldLabel>Party / Customer Name *</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="Search or select customer..."
//                 value={customerSearch}
//                 onChange={(e) => {
//                   setCustomerSearch(e.target.value);
//                   if (selectedCustomer) {
//                     setSelectedCustomer(null);
//                     setLinkedInvoices([]);
//                     setCustomerBalance(0);
//                   }
//                   setShowCustomerDropdown(true);
//                 }}
//                 onFocus={() => setShowCustomerDropdown(true)}
//                 InputProps={{
//                   startAdornment: (
//                     <Box
//                       component="span"
//                       sx={{ mr: 1, display: "flex", alignItems: "center" }}
//                     >
//                       {loadingCustomers ? (
//                         <CircularProgress
//                           size={16}
//                           sx={{ color: "#6b7280" }}
//                         />
//                       ) : (
//                         <Search sx={{ color: "#6b7280", fontSize: 18 }} />
//                       )}
//                     </Box>
//                   ),
//                 }}
//               />

//               {showCustomerDropdown && (
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
//                     maxHeight: "240px",
//                     overflowY: "auto",
//                     zIndex: 1500,
//                     boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
//                   }}
//                 >
//                   {customerResults.length === 0 ? (
//                     <Box sx={{ p: 2 }}>
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.8rem" }}
//                       >
//                         {loadingCustomers
//                           ? "Loading customers..."
//                           : "No customers found"}
//                       </Typography>
//                     </Box>
//                   ) : (
//                     customerResults.map((c) => (
//                       <Box
//                         key={c._id}
//                         onClick={() => handleSelectCustomer(c)}
//                         sx={{
//                           px: 2,
//                           py: 1.3,
//                           cursor: "pointer",
//                           borderBottom:
//                             "1px solid rgba(255, 255, 255, 0.05)",
//                           "&:hover": {
//                             bgcolor: "rgba(167, 139, 250, 0.1)",
//                           },
//                           "&:last-child": { borderBottom: "none" },
//                         }}
//                       >
//                         <Box
//                           display="flex"
//                           justifyContent="space-between"
//                           alignItems="center"
//                           gap={1}
//                         >
//                           <Box
//                             display="flex"
//                             alignItems="center"
//                             gap={1}
//                             sx={{ minWidth: 0, flex: 1 }}
//                           >
//                             <Person
//                               sx={{
//                                 fontSize: 16,
//                                 color: "#a78bfa",
//                                 flexShrink: 0,
//                               }}
//                             />
//                             <Typography
//                               sx={{
//                                 color: "#ffffff",
//                                 fontSize: "0.85rem",
//                                 fontWeight: 600,
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                                 whiteSpace: "nowrap",
//                               }}
//                             >
//                               {c.companyName || c.displayName || "-"}
//                             </Typography>
//                           </Box>
//                           {c.phone && (
//                             <Typography
//                               sx={{
//                                 color: "#9ca3af",
//                                 fontSize: "0.7rem",
//                                 flexShrink: 0,
//                               }}
//                             >
//                               📞 {c.phone}
//                             </Typography>
//                           )}
//                         </Box>
//                       </Box>
//                     ))
//                   )}
//                 </Box>
//               )}
//             </Grid>

//             {/* PAYMENT MODE */}
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>Payment Mode</FieldLabel>
//               <StyledSelect
//                 value={paymentMode}
//                 onChange={(e) => setPaymentMode(e.target.value as string)}
//                 MenuProps={{
//                   PaperProps: {
//                     sx: {
//                       bgcolor: "#111827",
//                       border: "1px solid rgba(255, 255, 255, 0.08)",
//                       "& .MuiMenuItem-root": {
//                         color: "#e5e7eb",
//                         fontSize: "0.85rem",
//                         "&:hover": { bgcolor: "rgba(167, 139, 250, 0.1)" },
//                         "&.Mui-selected": {
//                           bgcolor: "rgba(167, 139, 250, 0.15)",
//                           color: "#a78bfa",
//                         },
//                       },
//                     },
//                   },
//                 }}
//               >
//                 {PAYMENT_MODES.map((m) => (
//                   <MenuItem key={m} value={m}>
//                     {m}
//                   </MenuItem>
//                 ))}
//               </StyledSelect>
//             </Grid>

//             {/* DATE */}
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>Payment Date *</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 type="date"
//                 value={paymentDate}
//                 onChange={(e) => setPaymentDate(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <Box
//                       component="span"
//                       sx={{ mr: 1, display: "flex", alignItems: "center" }}
//                     >
//                       <CalendarIcon sx={{ color: "#6b7280", fontSize: 18 }} />
//                     </Box>
//                   ),
//                 }}
//               />
//             </Grid>

//             {/* TRANSACTION REF */}
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <FieldLabel>Transaction Ref / Note</FieldLabel>
//               <StyledTextField
//                 fullWidth
//                 placeholder="e.g. UPI Ref #938210"
//                 value={transactionRef}
//                 onChange={(e) => setTransactionRef(e.target.value)}
//               />
//             </Grid>

//             {/* AMOUNT + LINK */}
//             <Grid size={{ xs: 12 }}>
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={1}
//               >
//                 <FieldLabel sx={{ mb: 0 }}>
//                   Amount Received (₹) *
//                 </FieldLabel>

//                 <LinkChip
//                   linked={linkedInvoices.length > 0}
//                   onClick={openLinkModal}
//                 >
//                   {linkedInvoices.length > 0 ? (
//                     <>
//                       <CheckIcon />
//                       Linked ({linkedInvoices.length})
//                     </>
//                   ) : (
//                     <>
//                       <LinkIcon />
//                       Link
//                     </>
//                   )}
//                 </LinkChip>
//               </Box>
//               <StyledTextField
//                 fullWidth
//                 type="number"
//                 placeholder="2500"
//                 value={amount}
//                 onChange={(e) =>
//                   setAmount(e.target.value === "" ? "" : Number(e.target.value))
//                 }
//                 inputProps={{ min: 0, step: "0.01" }}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     fontSize: "1.1rem",
//                     fontWeight: 800,
//                     color: "#c4b5fd",
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#a78bfa",
//                     },
//                   },
//                   "& .MuiOutlinedInput-input": {
//                     fontSize: "1.1rem",
//                     fontWeight: 800,
//                     letterSpacing: 0.5,
//                   },
//                 }}
//               />
//             </Grid>

//             {/* LINKED INVOICES SUMMARY (with dates) */}
//             {linkedInvoices.length > 0 && (
//               <Grid size={{ xs: 12 }}>
//                 <Box
//                   sx={{
//                     bgcolor: "rgba(52, 211, 153, 0.06)",
//                     border: "1px solid rgba(52, 211, 153, 0.25)",
//                     borderRadius: "10px",
//                     p: 1.5,
//                   }}
//                 >
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     flexWrap="wrap"
//                     gap={1}
//                     mb={1}
//                   >
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <LinkIcon sx={{ color: "#34d399", fontSize: 18 }} />
//                       <Typography
//                         sx={{
//                           color: "#34d399",
//                           fontWeight: 700,
//                           fontSize: "0.8rem",
//                         }}
//                       >
//                         {linkedInvoices.length} invoice
//                         {linkedInvoices.length > 1 ? "s" : ""} linked
//                       </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center" gap={1.5}>
//                       <Typography
//                         sx={{ color: "#9ca3af", fontSize: "0.75rem" }}
//                       >
//                         Total linked:
//                       </Typography>
//                       <Typography
//                         sx={{
//                           color: "#34d399",
//                           fontWeight: 800,
//                           fontSize: "0.85rem",
//                         }}
//                       >
//                         {formatCurrency(totalLinkedAmount)}
//                       </Typography>
//                       <IconButton
//                         size="small"
//                         onClick={() => {
//                           setLinkedInvoices([]);
//                           setAmount("");
//                         }}
//                         sx={{
//                           color: "#f43f5e",
//                           "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
//                         }}
//                       >
//                         <UnlinkIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </Box>

//                   {/* Detailed invoice chips with dates */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexWrap: "wrap",
//                       gap: 0.8,
//                     }}
//                   >
//                     {linkedInvoices.map((li) => (
//                       <Chip
//                         key={li.invoiceId}
//                         size="small"
//                         label={`${li.invoiceNumber} · ${new Date(
//                           li.invoiceDate
//                         ).toLocaleDateString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                         })} · ${formatCurrency(li.linkedAmount)}`}
//                         sx={{
//                           bgcolor: "rgba(52, 211, 153, 0.08)",
//                           color: "#34d399",
//                           border: "1px solid rgba(52, 211, 153, 0.25)",
//                           fontSize: "0.7rem",
//                           fontWeight: 600,
//                           height: "24px",
//                         }}
//                       />
//                     ))}
//                   </Box>
//                 </Box>
//               </Grid>
//             )}
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
//               ) : (
//                 <AddIcon />
//               )
//             }
//             onClick={handleAddEntry}
//             disabled={saving}
//             sx={{
//               bgcolor: "#8b5cf6",
//               color: "#ffffff",
//               fontWeight: 800,
//               textTransform: "uppercase",
//               letterSpacing: 0.5,
//               borderRadius: "10px",
//               px: 3,
//               py: 1.1,
//               fontSize: "0.8rem",
//               boxShadow: "0 4px 14px rgba(139, 92, 246, 0.3)",
//               "&:hover": {
//                 bgcolor: "#7c3aed",
//                 boxShadow: "0 8px 20px rgba(139, 92, 246, 0.4)",
//               },
//               "&.Mui-disabled": {
//                 bgcolor: "rgba(139, 92, 246, 0.3)",
//                 color: "rgba(255, 255, 255, 0.5)",
//               },
//             }}
//           >
//             {saving ? "Logging..." : "Log Payment Received"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ================= LINK PAYMENT MODAL ================= */}
//       <Dialog
//         open={linkModalOpen}
//         onClose={closeLinkModal}
//         maxWidth="sm"
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
//                 bgcolor: "#1e1b4b",
//                 color: "#a78bfa",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <LinkIcon sx={{ fontSize: 18 }} />
//             </Box>
//             <Typography
//               sx={{
//                 color: "#a78bfa",
//                 fontWeight: 800,
//                 fontSize: "0.9rem",
//                 letterSpacing: 1,
//                 textTransform: "uppercase",
//               }}
//             >
//               Link Payment To Txns
//             </Typography>
//           </Box>

//           <Box display="flex" alignItems="center" gap={1.5}>
//             <Box
//               sx={{
//                 px: 1.5,
//                 py: 0.6,
//                 borderRadius: "8px",
//                 bgcolor: "rgba(52, 211, 153, 0.1)",
//                 border: "1px solid rgba(52, 211, 153, 0.3)",
//               }}
//             >
//               <Typography
//                 sx={{
//                   color: "#9ca3af",
//                   fontSize: "0.6rem",
//                   fontWeight: 700,
//                   letterSpacing: 0.5,
//                   lineHeight: 1,
//                   mb: 0.3,
//                 }}
//               >
//                 TOTAL
//               </Typography>
//               <Typography
//                 sx={{
//                   color: "#34d399",
//                   fontWeight: 900,
//                   fontSize: "0.85rem",
//                   lineHeight: 1,
//                 }}
//               >
//                 {formatCurrency(draftTotal)}
//               </Typography>
//             </Box>

//             <IconButton
//               onClick={closeLinkModal}
//               size="small"
//               sx={{
//                 color: "#9ca3af",
//                 "&:hover": {
//                   color: "#f43f5e",
//                   bgcolor: "rgba(244, 63, 94, 0.1)",
//                 },
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>

//         <DialogContent sx={{ p: 0 }}>
//           {invoicesLoading ? (
//             <Box
//               sx={{
//                 p: 5,
//                 textAlign: "center",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: 2,
//               }}
//             >
//               <CircularProgress sx={{ color: "#a78bfa" }} size={32} />
//               <Typography sx={{ color: "#9ca3af", fontSize: "0.85rem" }}>
//                 Loading pending invoices...
//               </Typography>
//             </Box>
//           ) : invoices.length === 0 ? (
//             <Box sx={{ p: 5, textAlign: "center" }}>
//               <Receipt sx={{ fontSize: 44, color: "#374151", mb: 1 }} />
//               <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
//                 No pending invoices found
//               </Typography>
//               <Typography
//                 sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
//               >
//                 This customer has no unpaid sales
//               </Typography>
//             </Box>
//           ) : (
//             <Box sx={{ maxHeight: 480, overflowY: "auto" }}>
//               {invoices.map((inv, idx) => {
//                 const draftAmt = draftLinks[inv._id] || 0;
//                 const linked = draftAmt > 0;

//                 return (
//                   <Box
//                     key={inv._id}
//                     sx={{
//                       px: 3,
//                       py: 2,
//                       borderBottom:
//                         idx < invoices.length - 1
//                           ? "1px solid rgba(255, 255, 255, 0.05)"
//                           : "none",
//                       backgroundColor: linked
//                         ? "rgba(52, 211, 153, 0.03)"
//                         : "transparent",
//                       transition: "all 0.2s ease",
//                     }}
//                   >
//                     <Box
//                       display="flex"
//                       justifyContent="space-between"
//                       alignItems="center"
//                       mb={1.5}
//                     >
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <CheckIcon
//                           sx={{
//                             color: linked ? "#34d399" : "#4b5563",
//                             fontSize: 18,
//                           }}
//                         />
//                         <Typography
//                           sx={{
//                             color: "#ffffff",
//                             fontWeight: 800,
//                             fontSize: "0.9rem",
//                           }}
//                         >
//                           {inv.type}
//                         </Typography>
//                       </Box>
//                       <Typography
//                         sx={{
//                           color: "#9ca3af",
//                           fontSize: "0.78rem",
//                           fontWeight: 600,
//                         }}
//                       >
//                         {new Date(inv.date).toLocaleDateString("en-IN", {
//                           day: "2-digit",
//                           month: "2-digit",
//                           year: "numeric",
//                         })}
//                       </Typography>
//                     </Box>

//                     <Grid container spacing={1.5}>
//                       <Grid size={{ xs: 6 }}>
//                         <Typography
//                           sx={{
//                             color: "#9ca3af",
//                             fontSize: "0.7rem",
//                             fontWeight: 600,
//                             mb: 0.3,
//                           }}
//                         >
//                           Invoice Number
//                         </Typography>
//                         <Typography
//                           sx={{
//                             color: "#ffffff",
//                             fontWeight: 800,
//                             fontSize: "0.95rem",
//                           }}
//                         >
//                           {inv.invoiceNumber}
//                         </Typography>
//                       </Grid>

//                       <Grid size={{ xs: 6 }}>
//                         <Typography
//                           sx={{
//                             color: "#9ca3af",
//                             fontSize: "0.7rem",
//                             fontWeight: 600,
//                             mb: 0.3,
//                           }}
//                         >
//                           Total Amount
//                         </Typography>
//                         <Typography
//                           sx={{
//                             color: "#ffffff",
//                             fontWeight: 800,
//                             fontSize: "0.95rem",
//                           }}
//                         >
//                           {inv.totalAmount.toFixed(2)}
//                         </Typography>
//                       </Grid>

//                       <Grid size={{ xs: 6 }}>
//                         <Typography
//                           sx={{
//                             color: "#9ca3af",
//                             fontSize: "0.7rem",
//                             fontWeight: 600,
//                             mb: 0.3,
//                           }}
//                         >
//                           Current Balance
//                         </Typography>
//                         <Typography
//                           sx={{
//                             color: "#fbbf24",
//                             fontWeight: 800,
//                             fontSize: "0.95rem",
//                           }}
//                         >
//                           {inv.currentBalance.toFixed(2)}
//                         </Typography>
//                       </Grid>

//                       <Grid size={{ xs: 6 }}>
//                         <Typography
//                           sx={{
//                             color: "#9ca3af",
//                             fontSize: "0.7rem",
//                             fontWeight: 600,
//                             mb: 0.5,
//                           }}
//                         >
//                           Link Amount
//                         </Typography>
//                         <SmallInput
//                           type="number"
//                           min={0}
//                           max={inv.currentBalance}
//                           step="0.01"
//                           value={draftAmt || ""}
//                           placeholder="0.00"
//                           onChange={(e) =>
//                             handleDraftLinkChange(
//                               inv._id,
//                               Number(e.target.value)
//                             )
//                           }
//                         />
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 );
//               })}
//             </Box>
//           )}
//         </DialogContent>

//         <DialogActions
//           sx={{
//             px: 3,
//             pb: 3,
//             pt: 1.5,
//             borderTop: "1px solid rgba(255, 255, 255, 0.08)",
//             gap: 1,
//           }}
//         >
//           <Button
//             onClick={closeLinkModal}
//             sx={{
//               color: "#9ca3af",
//               textTransform: "uppercase",
//               fontWeight: 700,
//               letterSpacing: 0.5,
//               borderRadius: "10px",
//               px: 3,
//               py: 1.1,
//               fontSize: "0.8rem",
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
//             onClick={handleLinkDone}
//             disabled={invoicesLoading || invoices.length === 0}
//             sx={{
//               bgcolor: "#1e40af",
//               color: "#ffffff",
//               fontWeight: 800,
//               textTransform: "uppercase",
//               letterSpacing: 0.5,
//               borderRadius: "10px",
//               px: 4,
//               py: 1.1,
//               fontSize: "0.8rem",
//               boxShadow: "0 4px 14px rgba(30, 64, 175, 0.3)",
//               "&:hover": {
//                 bgcolor: "#1d4ed8",
//                 boxShadow: "0 8px 20px rgba(30, 64, 175, 0.4)",
//               },
//               "&.Mui-disabled": {
//                 bgcolor: "rgba(30, 64, 175, 0.3)",
//                 color: "rgba(255, 255, 255, 0.5)",
//               },
//             }}
//           >
//             Done
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ================= DELETE DIALOG ================= */}
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
//           Delete Payment Entry?
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ color: "#9ca3af" }}>
//             Are you sure you want to delete this payment entry? This action
//             cannot be undone.
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
//               "&.Mui-disabled": {
//                 bgcolor: "rgba(244, 63, 94, 0.3)",
//                 color: "rgba(255, 255, 255, 0.5)",
//               },
//             }}
//           >
//             {deleting ? "Deleting..." : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default PaymentReceivedEntry;




import React, { useEffect, useState, useRef, useMemo } from "react";
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
  MenuItem,
  Select,
  Pagination,
  Tooltip,
  Fab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArrowBack,
  Add as AddIcon,
  Delete as DeleteIcon,
  Search,
  Payments,
  Receipt,
  Person,
  Refresh as RefreshIcon,
  Home as HomeIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  Lock as LockIcon,
  Link as LinkIcon,
  LinkOff as UnlinkIcon,
  CheckCircle as CheckIcon,
  CalendarToday as CalendarIcon,
  AccountBalanceWallet,
  Functions,
  Today,
  TrendingUp,
} from "@mui/icons-material";

// ===================== TYPES =====================

interface Customer {
  _id: string;
  companyName?: string;
  displayName?: string;
  phone?: string;
  email?: string;
}

interface PaymentEntry {
  _id: string;
  customerId: Customer | string;
  customerName: string;
  paymentMode: string;
  transactionRef: string;
  amount: number;
  date: string;
  createdAt: string;
  linkedInvoices?: LinkedInvoice[];
}

interface Invoice {
  _id: string;
  invoiceNumber: string;
  date: string;
  totalAmount: number;
  currentBalance: number;
  type: "Sale" | "Purchase" | "Credit";
  paymentStatus?: string;
  remarks?: string;
}

interface LinkedInvoice {
  invoiceId: string;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceTotal: number;
  linkedAmount: number;
}

// ===================== CONSTANTS =====================

const PAYMENT_MODES = [
  "Cash Collection",
  "UPI / QR",
  "Bank Transfer",
  "Cheque",
  "Card",
  "Other",
];

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("erptoken") || ""}`,
  },
});

// ===================== HELPERS =====================

const todayStr = () => new Date().toISOString().split("T")[0];
const firstOfMonthStr = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1)
    .toISOString()
    .split("T")[0];
};

const getCustomerName = (c: Customer | string): string => {
  if (typeof c === "object" && c !== null) {
    return c.companyName || c.displayName || "-";
  }
  return "-";
};

const getCustomerPhone = (c: Customer | string): string => {
  if (typeof c === "object" && c !== null) {
    return c.phone || "";
  }
  return "";
};

const formatCurrency = (n: number) =>
  `₹ ${(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

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

/* ===== NEW: Analytical Summary Bar ===== */
const AnalyticsBar = styled(Box)(() => ({
  backgroundColor: "#0d1527",
  borderRadius: "16px",
  border: "1px solid rgba(167, 139, 250, 0.25)",
  padding: "16px 20px",
  marginBottom: "16px",
  boxShadow: "0 8px 24px rgba(167, 139, 250, 0.08)",
  flexShrink: 0,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background:
      "linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.6), transparent)",
  },
}));

const StatCard = styled(Box)<{ accent: string }>(({ accent }) => ({
  backgroundColor: "#111827",
  borderRadius: "12px",
  border: `1px solid ${accent}22`,
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  transition: "all 0.25s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: `${accent}66`,
    boxShadow: `0 8px 20px ${accent}22`,
  },
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#090d16",
    color: "#ffffff",
    height: "42px",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
    "&:hover fieldset": { borderColor: "rgba(167, 139, 250, 0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#a78bfa",
      borderWidth: "1.5px",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "10px 12px",
    "&::placeholder": { color: "#6b7280", opacity: 1 },
  },
  "& input[type='date']::-webkit-calendar-picker-indicator": {
    filter: "invert(0.7)",
    cursor: "pointer",
  },
}));

const StyledSelect = styled(Select)(() => ({
  borderRadius: "10px",
  backgroundColor: "#090d16",
  color: "#ffffff",
  height: "42px",
  width: "100%",
  fontSize: "0.85rem",
  fontWeight: 500,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(167, 139, 250, 0.4)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#a78bfa",
    borderWidth: "1.5px",
  },
  "& .MuiSvgIcon-root": { color: "#9ca3af" },
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
    backgroundColor: "rgba(167, 139, 250, 0.3)",
    borderRadius: "8px",
    "&:hover": { backgroundColor: "rgba(167, 139, 250, 0.5)" },
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
  "& tbody tr:hover": { backgroundColor: "rgba(167, 139, 250, 0.03)" },
  "& tbody td": {
    color: "#e5e7eb",
    fontSize: "0.85rem",
    padding: "14px 12px",
    textAlign: "left",
  },
}));

const LinkChip = styled(Box)<{ linked: boolean }>(({ linked }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: "4px 12px",
  borderRadius: "20px",
  fontWeight: 700,
  fontSize: "0.7rem",
  cursor: "pointer",
  transition: "all 0.2s ease",
  backgroundColor: linked
    ? "rgba(52, 211, 153, 0.15)"
    : "rgba(167, 139, 250, 0.15)",
  color: linked ? "#34d399" : "#a78bfa",
  border: linked
    ? "1px solid rgba(52, 211, 153, 0.4)"
    : "1px dashed rgba(167, 139, 250, 0.5)",
  "&:hover": {
    backgroundColor: linked
      ? "rgba(52, 211, 153, 0.25)"
      : "rgba(167, 139, 250, 0.25)",
    transform: "translateY(-1px)",
  },
  "& svg": { fontSize: "14px" },
}));

const SmallInput = styled("input")(() => ({
  width: "100%",
  padding: "8px 10px",
  borderRadius: "8px",
  backgroundColor: "#090d16",
  border: "1px solid rgba(167, 139, 250, 0.3)",
  color: "#ffffff",
  fontSize: "0.85rem",
  fontWeight: 700,
  textAlign: "right",
  outline: "none",
  transition: "all 0.2s ease",
  "&:focus": {
    borderColor: "#a78bfa",
    boxShadow: "0 0 0 3px rgba(167, 139, 250, 0.15)",
  },
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&[type=number]": { MozAppearance: "textfield" },
}));

// ===================== MAIN =====================

const PaymentReceivedEntry: React.FC = () => {
  const navigate = useNavigate();

  // List state
  const [entries, setEntries] = useState<PaymentEntry[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Grand total from backend (if provided)
  const [grandTotal, setGrandTotal] = useState(0);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Date Filter (list)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");

  // Form modal
  const [formOpen, setFormOpen] = useState(false);

  // Customer search
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerResults, setCustomerResults] = useState<Customer[]>([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  // Customer balance
  const [customerBalance, setCustomerBalance] = useState<number>(0);
  const [balanceLoading, setBalanceLoading] = useState(false);

  // Form state
  const [paymentMode, setPaymentMode] = useState(PAYMENT_MODES[0]);
  const [transactionRef, setTransactionRef] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [paymentDate, setPaymentDate] = useState<string>(todayStr());

  // Linked invoices
  const [linkedInvoices, setLinkedInvoices] = useState<LinkedInvoice[]>([]);

  // Link Modal
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoicesLoading, setInvoicesLoading] = useState(false);
  const [draftLinks, setDraftLinks] = useState<Record<string, number>>({});

  // Delete dialog
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const customerRef = useRef<HTMLDivElement>(null);

  // ===================== OUTSIDE CLICK =====================
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        customerRef.current &&
        !customerRef.current.contains(e.target as Node)
      ) {
        setShowCustomerDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ===================== FETCH PAYMENTS =====================
  const fetchPayments = async () => {
    try {
      setListLoading(true);

      const params: any = { page, limit };
      if (appliedFrom) params.fromDate = appliedFrom;
      if (appliedTo) params.toDate = appliedTo;

      const res = await axios.get(`${API_URL}/payment-received`, {
        params,
        ...getAuthHeaders(),
      });

      if (res.data?.success === true) {
        setEntries(res.data.data || []);

        // ✅ Support multiple grandTotal key names
        const gt =
          res.data.grandTotal ??
          res.data.totalAmount ??
          res.data.totalSum ??
          res.data.sum ??
          0;
        setGrandTotal(Number(gt) || 0);

        const count =
          res.data.totalCount ??
          res.data.total ??
          res.data.count ??
          (res.data.data ? res.data.data.length : 0);
        const pages =
          res.data.totalPages ?? Math.max(1, Math.ceil((count || 0) / limit));

        setTotalCount(count);
        setTotalPages(pages);
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data?.message || "Failed to load payments");
        setEntries([]);
      }
    } catch (error: any) {
      console.error("Fetch payments error:", error);
      if (error.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load payments");
      }
      setEntries([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, appliedFrom, appliedTo]);

  // ===================== SEARCH CUSTOMERS =====================
  useEffect(() => {
    if (!formOpen) return;

    const timer = setTimeout(async () => {
      try {
        setLoadingCustomers(true);

        const isSearch = customerSearch.trim().length > 0;

        const res = isSearch
          ? await axios.get(`${API_URL}/customer/search`, {
              params: { query: customerSearch, limit: 20 },
              ...getAuthHeaders(),
            })
          : await axios.get(`${API_URL}/customer`, {
              params: { page: 1, limit: 20 },
              ...getAuthHeaders(),
            });

        if (res.data?.success) {
          setCustomerResults(res.data.data || []);
        }
      } catch (err) {
        console.error("Customer fetch error:", err);
      } finally {
        setLoadingCustomers(false);
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerSearch, formOpen]);

  // ===================== SELECT CUSTOMER =====================
  const handleSelectCustomer = async (c: Customer) => {
    setSelectedCustomer(c);
    setCustomerSearch(c.companyName || c.displayName || "");
    setShowCustomerDropdown(false);
    setLinkedInvoices([]);

    try {
      setBalanceLoading(true);
      const res = await axios.get(
        `${API_URL}/customer-ledger/balance/${c._id}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        setCustomerBalance(res.data.data?.balance || 0);
      } else {
        setCustomerBalance(0);
      }
    } catch (err: any) {
      console.error("Balance fetch error:", err);
      setCustomerBalance(0);
    } finally {
      setBalanceLoading(false);
    }
  };

  // ===================== FORM HANDLERS =====================
  const resetForm = () => {
    setSelectedCustomer(null);
    setCustomerSearch("");
    setPaymentMode(PAYMENT_MODES[0]);
    setTransactionRef("");
    setAmount("");
    setPaymentDate(todayStr());
    setLinkedInvoices([]);
    setCustomerBalance(0);
    setShowCustomerDropdown(false);
  };

  const openFormModal = () => {
    resetForm();
    setFormOpen(true);
  };

  const closeFormModal = () => {
    if (saving) return;
    setFormOpen(false);
    resetForm();
  };

  // ===================== LIST DATE FILTER =====================
  const handleApplyDateFilter = () => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setPage(1);
  };

  const handleClearDateFilter = () => {
    setFromDate("");
    setToDate("");
    setAppliedFrom("");
    setAppliedTo("");
    setPage(1);
  };

  const applyQuickRange = (type: "today" | "week" | "month" | "all") => {
    const t = todayStr();
    if (type === "today") {
      setFromDate(t);
      setToDate(t);
      setAppliedFrom(t);
      setAppliedTo(t);
    } else if (type === "week") {
      const d = new Date();
      d.setDate(d.getDate() - 6);
      const from = d.toISOString().split("T")[0];
      setFromDate(from);
      setToDate(t);
      setAppliedFrom(from);
      setAppliedTo(t);
    } else if (type === "month") {
      const from = firstOfMonthStr();
      setFromDate(from);
      setToDate(t);
      setAppliedFrom(from);
      setAppliedTo(t);
    } else {
      setFromDate("");
      setToDate("");
      setAppliedFrom("");
      setAppliedTo("");
    }
    setPage(1);
  };

  const hasDateFilter = !!(appliedFrom || appliedTo);

  // ===================== ✅ ANALYTICS (Derived) =====================
  const analytics = useMemo(() => {
    const count = entries.length;

    // If backend gave grandTotal use it, else fallback to current page sum
    const pageSum = entries.reduce(
      (s, e) => s + (Number(e.amount) || 0),
      0
    );
    const total = grandTotal > 0 ? grandTotal : pageSum;

    const avgPerEntry =
      totalCount > 0 ? total / totalCount : count > 0 ? total / count : 0;

    const today = todayStr();
    const todayTotal = entries
      .filter((e) => {
        const d = new Date(e.date || e.createdAt);
        return d.toISOString().split("T")[0] === today;
      })
      .reduce((s, e) => s + (Number(e.amount) || 0), 0);

    // Count of linked invoices across visible entries
    const linkedCount = entries.reduce(
      (s, e) => s + (e.linkedInvoices?.length || 0),
      0
    );

    return {
      total,
      count: totalCount || count,
      avgPerEntry,
      todayTotal,
      linkedCount,
    };
  }, [entries, grandTotal, totalCount]);

  // ===================== LINK MODAL =====================
  const openLinkModal = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer first");
      return;
    }

    setLinkModalOpen(true);
    setInvoicesLoading(true);

    const existing: Record<string, number> = {};
    linkedInvoices.forEach((li) => {
      existing[li.invoiceId] = li.linkedAmount;
    });
    setDraftLinks(existing);

    try {
      const res = await axios.get(
        `${API_URL}/customer-ledger/pending-invoices/${selectedCustomer._id}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        setInvoices(res.data.data || []);
      } else {
        toast.error(res.data?.message || "Failed to load invoices");
        setInvoices([]);
      }
    } catch (err: any) {
      console.error("Fetch pending invoices error:", err);
      if (err.response?.data?.message === "Unauthorized") {
        localStorage.removeItem("erptoken");
        navigate("/login");
      } else {
        toast.error(err.response?.data?.message || "Failed to load invoices");
      }
      setInvoices([]);
    } finally {
      setInvoicesLoading(false);
    }
  };

  const closeLinkModal = () => {
    setLinkModalOpen(false);
    setInvoices([]);
    setDraftLinks({});
  };

  const handleDraftLinkChange = (invoiceId: string, value: number) => {
    setDraftLinks((prev) => ({
      ...prev,
      [invoiceId]: Math.max(0, value),
    }));
  };

  const handleLinkDone = () => {
    const newLinked: LinkedInvoice[] = invoices
      .filter((inv) => (draftLinks[inv._id] || 0) > 0)
      .map((inv) => ({
        invoiceId: inv._id,
        invoiceNumber: inv.invoiceNumber,
        invoiceDate: inv.date,
        invoiceTotal: inv.totalAmount,
        linkedAmount: draftLinks[inv._id] || 0,
      }));

    setLinkedInvoices(newLinked);

    const linkedTotal = newLinked.reduce((s, li) => s + li.linkedAmount, 0);
    if (linkedTotal > 0) {
      setAmount(Number(linkedTotal.toFixed(2)));
    }

    setLinkModalOpen(false);
    setDraftLinks({});

    if (newLinked.length > 0) {
      toast.success(
        `${newLinked.length} invoice(s) linked · ${formatCurrency(linkedTotal)}`
      );
    }
  };

  const totalLinkedAmount = useMemo(
    () => linkedInvoices.reduce((s, li) => s + li.linkedAmount, 0),
    [linkedInvoices]
  );

  const draftTotal = useMemo(
    () =>
      invoices.reduce((s, inv) => s + (Number(draftLinks[inv._id]) || 0), 0),
    [invoices, draftLinks]
  );

  // ===================== CREATE =====================
  const handleAddEntry = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer from the list");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!paymentDate) {
      toast.error("Please select a payment date");
      return;
    }
    if (
      linkedInvoices.length > 0 &&
      Math.abs(totalLinkedAmount - Number(amount)) > 0.01
    ) {
      toast.error(
        `Linked amount (${formatCurrency(
          totalLinkedAmount
        )}) must match received amount (${formatCurrency(Number(amount))})`
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        customerId: selectedCustomer._id,
        customerName:
          selectedCustomer.companyName || selectedCustomer.displayName || "-",
        paymentMode,
        transactionRef: transactionRef.trim() || "-",
        amount: Number(amount),
        date: paymentDate,
        linkedInvoices: linkedInvoices.map((li) => ({
          invoiceId: li.invoiceId,
          invoiceNumber: li.invoiceNumber,
          invoiceDate: li.invoiceDate,
          invoiceTotal: li.invoiceTotal,
          linkedAmount: li.linkedAmount,
        })),
      };

      const res = await axios.post(
        `${API_URL}/payment-received`,
        payload,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Payment recorded successfully! 🎉");
        closeFormModal();
        setPage(1);
        fetchPayments();
      } else if (res.data?.message === "Unauthorized") {
        toast.error("Session expired! Please login again");
        localStorage.removeItem("erptoken");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(
          res.data?.errors?.[0] ||
            res.data?.message ||
            "Failed to record payment"
        );
      }
    } catch (error: any) {
      console.error("Create payment error:", error);
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
            "Failed to record payment"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // ===================== DELETE =====================
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const res = await axios.delete(
        `${API_URL}/payment-received/${deleteId}`,
        getAuthHeaders()
      );

      if (res.data?.success === true) {
        toast.success("Payment entry deleted");
        setDeleteId(null);
        if (entries.length === 1 && page > 1) {
          setPage((p) => p - 1);
        } else {
          fetchPayments();
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
                  color: "#e5e7eb",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0.9,
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "#a78bfa",
                    color: "#a78bfa",
                    bgcolor: "rgba(167, 139, 250, 0.08)",
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
                    bgcolor: "#1e1b4b",
                    color: "#a78bfa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Payments />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
                    letterSpacing: 0.5,
                  }}
                >
                  4. PAYMENT RECEIVED ENTRY
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1.5}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openFormModal}
                sx={{
                  bgcolor: "#8b5cf6",
                  color: "#ffffff",
                  fontWeight: 800,
                  textTransform: "none",
                  letterSpacing: 0.3,
                  borderRadius: "10px",
                  px: 2.5,
                  py: 1,
                  fontSize: "0.8rem",
                  boxShadow: "0 4px 14px rgba(139, 92, 246, 0.35)",
                  "&:hover": {
                    bgcolor: "#7c3aed",
                    boxShadow: "0 8px 20px rgba(139, 92, 246, 0.5)",
                  },
                }}
              >
                Payment Entry
              </Button>

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchPayments}
                disabled={listLoading}
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
                    borderColor: "#a78bfa",
                    color: "#a78bfa",
                    bgcolor: "rgba(167, 139, 250, 0.08)",
                  },
                }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
        </DarkBanner>

        {/* ================= ANALYTICAL SUMMARY BAR (NEW) ================= */}
        <AnalyticsBar>
          <Grid container spacing={1.5}>
            {/* TOTAL RECEIVED */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard accent="#a78bfa">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: "rgba(167, 139, 250, 0.15)",
                    color: "#a78bfa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <AccountBalanceWallet sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}
                  >
                    Total Received{hasDateFilter ? " (Filtered)" : ""}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#c4b5fd",
                      fontWeight: 900,
                      fontSize: { xs: "1.05rem", sm: "1.2rem" },
                      mt: 0.3,
                      letterSpacing: 0.3,
                      textShadow: "0 0 14px rgba(167, 139, 250, 0.4)",
                      lineHeight: 1.1,
                    }}
                  >
                    {listLoading ? "..." : formatCurrency(analytics.total)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>

            {/* TOTAL ENTRIES */}
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#38bdf8">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: "rgba(56, 189, 248, 0.15)",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Receipt sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}
                  >
                    Total Entries
                  </Typography>
                  <Typography
                    sx={{
                      color: "#38bdf8",
                      fontWeight: 900,
                      fontSize: { xs: "1.05rem", sm: "1.2rem" },
                      mt: 0.3,
                      letterSpacing: 0.3,
                      lineHeight: 1.1,
                    }}
                  >
                    {listLoading ? "..." : analytics.count}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>

            {/* AVG / ENTRY */}
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#fbbf24">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: "rgba(251, 191, 36, 0.15)",
                    color: "#fbbf24",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Functions sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}
                  >
                    Avg / Entry
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fbbf24",
                      fontWeight: 900,
                      fontSize: { xs: "1.05rem", sm: "1.2rem" },
                      mt: 0.3,
                      letterSpacing: 0.3,
                      lineHeight: 1.1,
                    }}
                  >
                    {listLoading ? "..." : formatCurrency(analytics.avgPerEntry)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>

            {/* TODAY */}
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <StatCard accent="#34d399">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    bgcolor: "rgba(52, 211, 153, 0.15)",
                    color: "#34d399",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Today sx={{ fontSize: 22 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: 0.8,
                      textTransform: "uppercase",
                    }}
                  >
                    Today Received
                  </Typography>
                  <Typography
                    sx={{
                      color: "#34d399",
                      fontWeight: 900,
                      fontSize: { xs: "1.05rem", sm: "1.2rem" },
                      mt: 0.3,
                      letterSpacing: 0.3,
                      lineHeight: 1.1,
                    }}
                  >
                    {listLoading ? "..." : formatCurrency(analytics.todayTotal)}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
          </Grid>
        </AnalyticsBar>

        {/* DATE FILTER */}
        <FilterBar>
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={1.5}>
            <Box display="flex" alignItems="center" gap={0.8}>
              <FilterIcon sx={{ color: "#a78bfa", fontSize: 18 }} />
              <Typography
                sx={{
                  color: "#a78bfa",
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Date Filter
              </Typography>
            </Box>

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

            <Button
              size="small"
              variant="contained"
              onClick={handleApplyDateFilter}
              sx={{
                bgcolor: "#8b5cf6",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "8px",
                px: 2,
                fontSize: "0.75rem",
                "&:hover": { bgcolor: "#7c3aed" },
              }}
            >
              Apply
            </Button>

            <Button
              size="small"
              variant="outlined"
              startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
              onClick={handleClearDateFilter}
              disabled={!hasDateFilter && !fromDate && !toDate}
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

            <Box
              sx={{
                display: "flex",
                gap: 0.7,
                ml: { md: "auto" },
                flexWrap: "wrap",
              }}
            >
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
                    applyQuickRange(q.k as "today" | "week" | "month" | "all")
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
                      bgcolor: "rgba(167, 139, 250, 0.15)",
                      borderColor: "rgba(167, 139, 250, 0.4)",
                      color: "#a78bfa",
                    },
                  }}
                />
              ))}
            </Box>

            {hasDateFilter && (
              <Chip
                label={`Active: ${appliedFrom || "..."} → ${
                  appliedTo || "..."
                }`}
                size="small"
                sx={{
                  bgcolor: "rgba(167, 139, 250, 0.15)",
                  color: "#a78bfa",
                  border: "1px solid rgba(167, 139, 250, 0.4)",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "26px",
                }}
              />
            )}
          </Box>
        </FilterBar>

        {/* TABLE */}
        <TableContainerDark>
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
              COLLECTIONS & PAYMENTS LOG
            </Typography>
            <Chip
              label={`${totalCount} Payments Received`}
              size="small"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.05)",
                color: "#9ca3af",
                border: "1px solid rgba(255, 255, 255, 0.1)",
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
                  <th>Party / Customer</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Payment Mode</th>
                  <th style={{ textAlign: "center" }}>Ref / Remarks</th>
                  <th style={{ textAlign: "center" }}>Linked</th>
                  <th style={{ textAlign: "center" }}>Amount (₹)</th>
                  <th style={{ textAlign: "center", width: "80px" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listLoading ? (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <CircularProgress sx={{ color: "#a78bfa" }} size={32} />
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.9rem", mt: 1 }}
                      >
                        Loading payments...
                      </Typography>
                    </td>
                  </tr>
                ) : entries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", padding: "40px 12px" }}
                    >
                      <Receipt
                        style={{
                          fontSize: 40,
                          color: "#374151",
                          marginBottom: 8,
                        }}
                      />
                      <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                        No payments found
                      </Typography>
                      <Typography
                        sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
                      >
                        {hasDateFilter
                          ? "Try changing the date filter"
                          : "Click 'Payment Entry' to log your first payment"}
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  entries.map((row, idx) => {
                    const linkedCount = row.linkedInvoices?.length || 0;
                    return (
                      <tr key={row._id}>
                        <td style={{ textAlign: "center", color: "#6b7280" }}>
                          {(page - 1) * limit + idx + 1}
                        </td>
                        <td>
                          <Typography
                            sx={{
                              color: "#ffffff",
                              fontWeight: 700,
                              fontSize: "0.85rem",
                            }}
                          >
                            {row.customerName ||
                              getCustomerName(row.customerId)}
                          </Typography>
                          {getCustomerPhone(row.customerId) && (
                            <Typography
                              sx={{
                                color: "#9ca3af",
                                fontSize: "0.7rem",
                                mt: 0.3,
                              }}
                            >
                              📞 {getCustomerPhone(row.customerId)}
                            </Typography>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography
                            sx={{ color: "#9ca3af", fontSize: "0.8rem" }}
                          >
                            {new Date(
                              row.date || row.createdAt
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Chip
                            label={row.paymentMode}
                            size="small"
                            sx={{
                              bgcolor: "rgba(167, 139, 250, 0.1)",
                              color: "#a78bfa",
                              border: "1px solid rgba(167, 139, 250, 0.3)",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              height: "24px",
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography
                            sx={{ color: "#9ca3af", fontSize: "0.8rem" }}
                          >
                            {row.transactionRef}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {linkedCount > 0 ? (
                            <Chip
                              icon={<LinkIcon sx={{ fontSize: 12 }} />}
                              label={`${linkedCount} invoice${
                                linkedCount > 1 ? "s" : ""
                              }`}
                              size="small"
                              sx={{
                                bgcolor: "rgba(52, 211, 153, 0.1)",
                                color: "#34d399",
                                border: "1px solid rgba(52, 211, 153, 0.3)",
                                fontSize: "0.68rem",
                                fontWeight: 700,
                                height: "24px",
                                "& .MuiChip-icon": { color: "#34d399" },
                              }}
                            />
                          ) : (
                            <Typography
                              sx={{ color: "#6b7280", fontSize: "0.75rem" }}
                            >
                              —
                            </Typography>
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography
                            sx={{
                              color: "#a78bfa",
                              fontWeight: 800,
                              fontSize: "0.95rem",
                            }}
                          >
                            {formatCurrency(row.amount)}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => setDeleteId(row._id)}
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

          {/* PAGINATION */}
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
                        ? "rgba(167, 139, 250, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                    color: limit === n ? "#a78bfa" : "#9ca3af",
                    border:
                      limit === n
                        ? "1px solid rgba(167, 139, 250, 0.5)"
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
                  color: "#9ca3af",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  "&:hover": {
                    bgcolor: "rgba(167, 139, 250, 0.1)",
                    color: "#a78bfa",
                  },
                },
                "& .Mui-selected": {
                  bgcolor: "rgba(167, 139, 250, 0.2) !important",
                  color: "#a78bfa !important",
                  borderColor: "rgba(167, 139, 250, 0.5) !important",
                },
              }}
            />
          </Box>
        </TableContainerDark>
      </Box>

      {/* FLOATING HOME FAB */}
      <Tooltip title="Back to Dashboard" placement="left">
        <Fab
          onClick={() => navigate("/dashboard")}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1200,
            bgcolor: "#a78bfa",
            color: "#0d1527",
            width: 52,
            height: 52,
            boxShadow: "0 8px 24px rgba(167, 139, 250, 0.5)",
            "&:hover": { bgcolor: "#8b5cf6" },
          }}
        >
          <HomeIcon />
        </Fab>
      </Tooltip>

      {/* ================= FORM MODAL ================= */}
      <Dialog
        open={formOpen}
        onClose={closeFormModal}
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
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
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
                bgcolor: "#1e1b4b",
                color: "#a78bfa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                color: "#a78bfa",
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Record Payment Collection
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                px: 2,
                py: 0.8,
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg, rgba(167, 139, 250, 0.15), rgba(139, 92, 246, 0.08))",
                border: "1px solid rgba(167, 139, 250, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                minWidth: 130,
              }}
            >
              <Typography
                sx={{
                  color: "#a78bfa",
                  fontSize: "0.6rem",
                  fontWeight: 800,
                  letterSpacing: 0.8,
                  lineHeight: 1,
                  mb: 0.5,
                  opacity: 0.85,
                }}
              >
                TOTAL PAYMENT
              </Typography>
              <Typography
                sx={{
                  color: "#c4b5fd",
                  fontWeight: 900,
                  fontSize: "1.05rem",
                  lineHeight: 1,
                  letterSpacing: 0.3,
                  textShadow: "0 0 12px rgba(167, 139, 250, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                }}
              >
                {balanceLoading ? (
                  <CircularProgress size={14} sx={{ color: "#a78bfa" }} />
                ) : (
                  formatCurrency(customerBalance)
                )}
              </Typography>
            </Box>

            <IconButton
              onClick={closeFormModal}
              disabled={saving}
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
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {/* CUSTOMER */}
            <Grid
              size={{ xs: 12, sm: 6 }}
              ref={customerRef}
              sx={{ position: "relative" }}
            >
              <FieldLabel>Party / Customer Name *</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="Search or select customer..."
                value={customerSearch}
                onChange={(e) => {
                  setCustomerSearch(e.target.value);
                  if (selectedCustomer) {
                    setSelectedCustomer(null);
                    setLinkedInvoices([]);
                    setCustomerBalance(0);
                  }
                  setShowCustomerDropdown(true);
                }}
                onFocus={() => setShowCustomerDropdown(true)}
                InputProps={{
                  startAdornment: (
                    <Box
                      component="span"
                      sx={{ mr: 1, display: "flex", alignItems: "center" }}
                    >
                      {loadingCustomers ? (
                        <CircularProgress
                          size={16}
                          sx={{ color: "#6b7280" }}
                        />
                      ) : (
                        <Search sx={{ color: "#6b7280", fontSize: 18 }} />
                      )}
                    </Box>
                  ),
                }}
              />

              {showCustomerDropdown && (
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
                    maxHeight: "240px",
                    overflowY: "auto",
                    zIndex: 1500,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {customerResults.length === 0 ? (
                    <Box sx={{ p: 2 }}>
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.8rem" }}
                      >
                        {loadingCustomers
                          ? "Loading customers..."
                          : "No customers found"}
                      </Typography>
                    </Box>
                  ) : (
                    customerResults.map((c) => (
                      <Box
                        key={c._id}
                        onClick={() => handleSelectCustomer(c)}
                        sx={{
                          px: 2,
                          py: 1.3,
                          cursor: "pointer",
                          borderBottom:
                            "1px solid rgba(255, 255, 255, 0.05)",
                          "&:hover": {
                            bgcolor: "rgba(167, 139, 250, 0.1)",
                          },
                          "&:last-child": { borderBottom: "none" },
                        }}
                      >
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          gap={1}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{ minWidth: 0, flex: 1 }}
                          >
                            <Person
                              sx={{
                                fontSize: 16,
                                color: "#a78bfa",
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{
                                color: "#ffffff",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {c.companyName || c.displayName || "-"}
                            </Typography>
                          </Box>
                          {c.phone && (
                            <Typography
                              sx={{
                                color: "#9ca3af",
                                fontSize: "0.7rem",
                                flexShrink: 0,
                              }}
                            >
                              📞 {c.phone}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              )}
            </Grid>

            {/* PAYMENT MODE */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Payment Mode</FieldLabel>
              <StyledSelect
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value as string)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#111827",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      "& .MuiMenuItem-root": {
                        color: "#e5e7eb",
                        fontSize: "0.85rem",
                        "&:hover": { bgcolor: "rgba(167, 139, 250, 0.1)" },
                        "&.Mui-selected": {
                          bgcolor: "rgba(167, 139, 250, 0.15)",
                          color: "#a78bfa",
                        },
                      },
                    },
                  },
                }}
              >
                {PAYMENT_MODES.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Grid>

            {/* DATE */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Payment Date *</FieldLabel>
              <StyledTextField
                fullWidth
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box
                      component="span"
                      sx={{ mr: 1, display: "flex", alignItems: "center" }}
                    >
                      <CalendarIcon sx={{ color: "#6b7280", fontSize: 18 }} />
                    </Box>
                  ),
                }}
              />
            </Grid>

            {/* TRANSACTION REF */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <FieldLabel>Transaction Ref / Note</FieldLabel>
              <StyledTextField
                fullWidth
                placeholder="e.g. UPI Ref #938210"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
              />
            </Grid>

            {/* AMOUNT + LINK */}
            <Grid size={{ xs: 12 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <FieldLabel sx={{ mb: 0 }}>
                  Amount Received (₹) *
                </FieldLabel>

                <LinkChip
                  linked={linkedInvoices.length > 0}
                  onClick={openLinkModal}
                >
                  {linkedInvoices.length > 0 ? (
                    <>
                      <CheckIcon />
                      Linked ({linkedInvoices.length})
                    </>
                  ) : (
                    <>
                      <LinkIcon />
                      Link
                    </>
                  )}
                </LinkChip>
              </Box>
              <StyledTextField
                fullWidth
                type="number"
                placeholder="2500"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value === "" ? "" : Number(e.target.value))
                }
                inputProps={{ min: 0, step: "0.01" }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "#c4b5fd",
                    "&.Mui-focused fieldset": {
                      borderColor: "#a78bfa",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    letterSpacing: 0.5,
                  },
                }}
              />
            </Grid>

            {/* LINKED INVOICES SUMMARY */}
            {linkedInvoices.length > 0 && (
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    bgcolor: "rgba(52, 211, 153, 0.06)",
                    border: "1px solid rgba(52, 211, 153, 0.25)",
                    borderRadius: "10px",
                    p: 1.5,
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={1}
                    mb={1}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <LinkIcon sx={{ color: "#34d399", fontSize: 18 }} />
                      <Typography
                        sx={{
                          color: "#34d399",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                        }}
                      >
                        {linkedInvoices.length} invoice
                        {linkedInvoices.length > 1 ? "s" : ""} linked
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.75rem" }}
                      >
                        Total linked:
                      </Typography>
                      <Typography
                        sx={{
                          color: "#34d399",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                        }}
                      >
                        {formatCurrency(totalLinkedAmount)}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setLinkedInvoices([]);
                          setAmount("");
                        }}
                        sx={{
                          color: "#f43f5e",
                          "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)" },
                        }}
                      >
                        <UnlinkIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.8,
                    }}
                  >
                    {linkedInvoices.map((li) => (
                      <Chip
                        key={li.invoiceId}
                        size="small"
                        label={`${li.invoiceNumber} · ${new Date(
                          li.invoiceDate
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })} · ${formatCurrency(li.linkedAmount)}`}
                        sx={{
                          bgcolor: "rgba(52, 211, 153, 0.08)",
                          color: "#34d399",
                          border: "1px solid rgba(52, 211, 153, 0.25)",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          height: "24px",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            pt: 1,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            gap: 1,
          }}
        >
          <Button
            onClick={closeFormModal}
            disabled={saving}
            sx={{
              color: "#9ca3af",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              px: 3,
              py: 1.1,
              "&:hover": {
                color: "#e5e7eb",
                bgcolor: "rgba(255, 255, 255, 0.05)",
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
              ) : (
                <AddIcon />
              )
            }
            onClick={handleAddEntry}
            disabled={saving}
            sx={{
              bgcolor: "#8b5cf6",
              color: "#ffffff",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              borderRadius: "10px",
              px: 3,
              py: 1.1,
              fontSize: "0.8rem",
              boxShadow: "0 4px 14px rgba(139, 92, 246, 0.3)",
              "&:hover": {
                bgcolor: "#7c3aed",
                boxShadow: "0 8px 20px rgba(139, 92, 246, 0.4)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(139, 92, 246, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {saving ? "Logging..." : "Log Payment Received"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= LINK PAYMENT MODAL ================= */}
      <Dialog
        open={linkModalOpen}
        onClose={closeLinkModal}
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
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
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
                bgcolor: "#1e1b4b",
                color: "#a78bfa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LinkIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography
              sx={{
                color: "#a78bfa",
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Link Payment To Txns
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                px: 1.5,
                py: 0.6,
                borderRadius: "8px",
                bgcolor: "rgba(52, 211, 153, 0.1)",
                border: "1px solid rgba(52, 211, 153, 0.3)",
              }}
            >
              <Typography
                sx={{
                  color: "#9ca3af",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  lineHeight: 1,
                  mb: 0.3,
                }}
              >
                TOTAL
              </Typography>
              <Typography
                sx={{
                  color: "#34d399",
                  fontWeight: 900,
                  fontSize: "0.85rem",
                  lineHeight: 1,
                }}
              >
                {formatCurrency(draftTotal)}
              </Typography>
            </Box>

            <IconButton
              onClick={closeLinkModal}
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
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {invoicesLoading ? (
            <Box
              sx={{
                p: 5,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <CircularProgress sx={{ color: "#a78bfa" }} size={32} />
              <Typography sx={{ color: "#9ca3af", fontSize: "0.85rem" }}>
                Loading pending invoices...
              </Typography>
            </Box>
          ) : invoices.length === 0 ? (
            <Box sx={{ p: 5, textAlign: "center" }}>
              <Receipt sx={{ fontSize: 44, color: "#374151", mb: 1 }} />
              <Typography sx={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                No pending invoices found
              </Typography>
              <Typography
                sx={{ color: "#6b7280", fontSize: "0.75rem", mt: 0.5 }}
              >
                This customer has no unpaid sales
              </Typography>
            </Box>
          ) : (
            <Box sx={{ maxHeight: 480, overflowY: "auto" }}>
              {invoices.map((inv, idx) => {
                const draftAmt = draftLinks[inv._id] || 0;
                const linked = draftAmt > 0;

                return (
                  <Box
                    key={inv._id}
                    sx={{
                      px: 3,
                      py: 2,
                      borderBottom:
                        idx < invoices.length - 1
                          ? "1px solid rgba(255, 255, 255, 0.05)"
                          : "none",
                      backgroundColor: linked
                        ? "rgba(52, 211, 153, 0.03)"
                        : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1.5}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckIcon
                          sx={{
                            color: linked ? "#34d399" : "#4b5563",
                            fontSize: 18,
                          }}
                        />
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                          }}
                        >
                          {inv.type}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: "#9ca3af",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                        }}
                      >
                        {new Date(inv.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </Typography>
                    </Box>

                    <Grid container spacing={1.5}>
                      <Grid size={{ xs: 6 }}>
                        <Typography
                          sx={{
                            color: "#9ca3af",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            mb: 0.3,
                          }}
                        >
                          Invoice Number
                        </Typography>
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                          }}
                        >
                          {inv.invoiceNumber}
                        </Typography>
                      </Grid>

                      <Grid size={{ xs: 6 }}>
                        <Typography
                          sx={{
                            color: "#9ca3af",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            mb: 0.3,
                          }}
                        >
                          Total Amount
                        </Typography>
                        <Typography
                          sx={{
                            color: "#ffffff",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                          }}
                        >
                          {inv.totalAmount.toFixed(2)}
                        </Typography>
                      </Grid>

                      <Grid size={{ xs: 6 }}>
                        <Typography
                          sx={{
                            color: "#9ca3af",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            mb: 0.3,
                          }}
                        >
                          Current Balance
                        </Typography>
                        <Typography
                          sx={{
                            color: "#fbbf24",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                          }}
                        >
                          {inv.currentBalance.toFixed(2)}
                        </Typography>
                      </Grid>

                      <Grid size={{ xs: 6 }}>
                        <Typography
                          sx={{
                            color: "#9ca3af",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            mb: 0.5,
                          }}
                        >
                          Link Amount
                        </Typography>
                        <SmallInput
                          type="number"
                          min={0}
                          max={inv.currentBalance}
                          step="0.01"
                          value={draftAmt || ""}
                          placeholder="0.00"
                          onChange={(e) =>
                            handleDraftLinkChange(
                              inv._id,
                              Number(e.target.value)
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            pt: 1.5,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            gap: 1,
          }}
        >
          <Button
            onClick={closeLinkModal}
            sx={{
              color: "#9ca3af",
              textTransform: "uppercase",
              fontWeight: 700,
              letterSpacing: 0.5,
              borderRadius: "10px",
              px: 3,
              py: 1.1,
              fontSize: "0.8rem",
              "&:hover": {
                color: "#e5e7eb",
                bgcolor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleLinkDone}
            disabled={invoicesLoading || invoices.length === 0}
            sx={{
              bgcolor: "#1e40af",
              color: "#ffffff",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              borderRadius: "10px",
              px: 4,
              py: 1.1,
              fontSize: "0.8rem",
              boxShadow: "0 4px 14px rgba(30, 64, 175, 0.3)",
              "&:hover": {
                bgcolor: "#1d4ed8",
                boxShadow: "0 8px 20px rgba(30, 64, 175, 0.4)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(30, 64, 175, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            Done
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
          Delete Payment Entry?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#9ca3af" }}>
            Are you sure you want to delete this payment entry? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteId(null)}
            disabled={deleting}
            sx={{
              color: "#9ca3af",
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
              "&.Mui-disabled": {
                bgcolor: "rgba(244, 63, 94, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentReceivedEntry;