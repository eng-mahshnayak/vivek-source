




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  Typography,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TrendingUp } from "@mui/icons-material";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ IMPORTANT: Register scales (fix for "category not registered" error)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ===================== STATS CARD =====================

const StatsCard = styled(Card)<{ gradient: string }>(({ gradient }) => ({
  borderRadius: "20px",
  padding: "20px",
  background: gradient,
  color: "white",
  height: "100%",
  minHeight: "170px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  transition: "0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

// ===================== DASHBOARD =====================

const Dashboard: React.FC = () => {

  const API_URL = import.meta.env.VITE_API_URL;

  const statistics = {
    totalItems: 65,
    inStock: 4,
    totalValue: 68000,
    outOfStock: 1,
    averagePrice: 799,
    totalProducts: 6,
  };

 

  const [dashboardData, setDashboardData] = useState({
    statistics: {
      totalSellInvoices: 0,
      totalPurchaseInvoices: 0,
      totalCustomers: 0,
      totalUsers: 0,
      totalNote: 0,
    },
    recentSells: [],
    chartData: {
      labels: [],
      datasets: [{
        label: 'Current Stock',
        data: [],
        backgroundColor: []
      }]
    },
    topStocks: []
  });

  // In your Dashboard component
useEffect(() => {
    const fetchDashboardData = async () => {
        try {

            const response = await axios.get(`${API_URL}/inventorystock/dashboard`);
            if (response.data.success) {

                console.log(response.data.data,'response.data.data');
                
                setDashboardData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };
    
    fetchDashboardData();
}, []);


  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, md: 3 },
        bgcolor: "#f4f6f9",
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        {/* ================= STATS SECTION ================= */}
        <Grid container spacing={2}>
          {/* TOTAL ITEMS */}
         <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={{
                  flexBasis: { lg: "20%" },
                  maxWidth: { lg: "20%" },
                }}
              >
            <StatsCard gradient="linear-gradient(135deg,#3b82f6,#2563eb)">
              <Box>
                <Typography variant="caption"> SELL ENTRIES</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {dashboardData.statistics.totalSellInvoices}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <TrendingUp fontSize="small" />
                <Typography variant="caption">
                  +12% from last month
                </Typography>
              </Box>
            </StatsCard>
          </Grid>


          {/* IN PURCHASE */}
          {/* <Grid item xs={12} sm={6} md={4} lg={2.4 as any}> */}
           <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={{
                  flexBasis: { lg: "18%" },
                  maxWidth: { lg: "18%" },
                }}
              >
            <StatsCard gradient="linear-gradient(135deg,#10b981,#059669)">
              <Box>
                <Typography variant="caption"> PURCHASE ENTRIES</Typography>
                <Typography variant="h4" fontWeight="bold">
                   {dashboardData.statistics.totalPurchaseInvoices}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(statistics.inStock / statistics.totalProducts) * 100}
                sx={{
                  height: 5,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.3)",
                  "& .MuiLinearProgress-bar": { bgcolor: "white" },
                }}
              />
            </StatsCard>
          </Grid>


        

          {/* TOTAL VALUE */}
          


          {/* TOTAL VALUE */}
          <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={{
                  flexBasis: { lg: "18%" },
                  maxWidth: { lg: "18%" },
                }}
              >
            <StatsCard gradient="linear-gradient(135deg,#f59e0b,#d97706)">
              <Box>
                <Typography variant="caption">ACTIVE CUSTOMERS</Typography>
                <Typography variant="h4" fontWeight="bold">
                   {dashboardData.statistics.totalCustomers}
                </Typography>
              </Box>
              <Typography variant="caption">
                +8.5% from last month
              </Typography>
            </StatsCard>
          </Grid>

          {/* OUT OF STOCK */}

          <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
               sx={{
                  flexBasis: { lg: "18%" },
                  maxWidth: { lg: "18%" },
                }}
              >
            
            <StatsCard gradient="linear-gradient(135deg,#ef4444,#dc2626)">
              <Box>
                <Typography variant="caption">SYSTEM USERS</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {dashboardData.statistics.totalUsers}
                </Typography>
              </Box>
              <Typography variant="caption">
                ⚠ Critical items
              </Typography>
            </StatsCard>
          </Grid>

          

          {/* AVG PRICE */}
          <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={{
                  flexBasis: { lg: "19%" },
                  maxWidth: { lg: "19%" },
                }}
              >
            <StatsCard gradient="linear-gradient(135deg,#ec4899,#db2777)">
              <Box>
                <Typography variant="caption">CASH SUMMERY</Typography>
                <Typography variant="h4" fontWeight="bold">
                   {dashboardData.statistics.totalNote}
                </Typography>
              </Box>
              <Typography variant="caption">
                Per product average
              </Typography>
            </StatsCard>
          </Grid>
        </Grid>

        {/* ================= CHART SECTION ================= */}
        <Box mt={5}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Stock by Category
            </Typography>

            <Box sx={{ width: "100%", height: 350 }}>
              <Bar
                data={{
                  labels: dashboardData?.chartData?.labels,
                  datasets: dashboardData.chartData.datasets

                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </Box>
          </Card>
        </Box>

        {/* ================= RECENT PRODUCTS TABLE ================= */}
        <Box mt={5}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Recent Products
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f4f6f9" }}>
                    <TableCell><b>invoiceNumber</b></TableCell>
                    <TableCell><b>InvoiceDate</b></TableCell>
                     <TableCell><b>CustomerName</b></TableCell>
                    <TableCell><b>InvoiceVaue</b></TableCell>
                    <TableCell><b>paidAmount</b></TableCell>
                    <TableCell><b>PaymentStatus</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {dashboardData.recentSells.map((row:any, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.invoiceNumber}</TableCell>
                     <TableCell>
                        {new Date(row.invoiceDate).toLocaleDateString("en-IN")}
                      </TableCell>
                         <TableCell>{row.supplierName}</TableCell>
                      <TableCell>₹{row.grandTotal.toLocaleString()}</TableCell>
                      <TableCell>₹{row.paidAmount.toLocaleString()}</TableCell>
                     <TableCell>
                    <Chip
                      label={
                        row.paymentStatus === "paid"
                          ? "Paid"
                          : row.paymentStatus === "partial"
                          ? "Partial"
                          : row.paymentStatus === "overdue"
                          ? "Overdue"
                          : "Pending"
                      }
                      color={
                        row.paymentStatus === "paid"
                          ? "success"
                          : row.paymentStatus === "partial"
                          ? "warning"
                          : row.paymentStatus === "overdue"
                          ? "error"
                          : "default"
                      }
                      size="small"
                    />
                  </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
       

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import {
//   Box,
//   Grid,
//   Card,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
// } from "@mui/material";

// import { styled } from "@mui/material/styles";
// import { TrendingUp } from "@mui/icons-material";

// import { Bar } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register chart
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // ================= STATS CARD =================
// const StatsCard = styled(Card)<{ gradient: string }>(({ gradient }) => ({
//   borderRadius: "20px",
//   padding: "20px",
//   background: gradient,
//   color: "white",
//   height: "100%",
//   minHeight: "170px",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
//   transition: "0.3s ease",
//   "&:hover": {
//     transform: "translateY(-4px)",
//   },
// }));

// // ================= DASHBOARD =================
// const Dashboard: React.FC = () => {

//   const API_URL = import.meta.env.VITE_API_URL;

//   const [dashboardData, setDashboardData] = useState<any>({
//     statistics: {
//       totalSellInvoices: 0,
//       totalPurchaseInvoices: 0,
//       totalCustomers: 0,
//       totalUsers: 0,
//       totalNote: 0,
//     },
//     recentSells: [],
//     chartData: {
//       labels: [],
//       datasets: [{
//         label: "Stock",
//         data: [],
//         backgroundColor: [],
//       }]
//     }
//   });


//   // ================= FETCH DATA =================
//   useEffect(() => {

//     const fetchDashboardData = async () => {

//       try {

//         const res = await axios.get(`${API_URL}/inventorystock/dashboard`);

//         if (res.data.success) {
//           setDashboardData(res.data.data);
//         }

//       } catch (err) {
//         console.error("Dashboard error:", err);
//       }

//     };

//     fetchDashboardData();

//   }, [API_URL]);


//   // ================= UI =================
//   return (

//     <Box sx={{ minHeight: "100vh", p: 3, bgcolor: "#f4f6f9" }}>

//       <Box sx={{ maxWidth: 1400, mx: "auto" }}>


//         {/* ================= STATS ================= */}

//         <Grid container spacing={2}>


//           <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
//             <StatsCard gradient="linear-gradient(135deg,#3b82f6,#2563eb)">
//               <Box>
//                 <Typography variant="caption">
//                   TOTAL SELL ENTRIES
//                 </Typography>

//                 <Typography variant="h4" fontWeight="bold">
//                   {dashboardData.statistics.totalSellInvoices}
//                 </Typography>
//               </Box>

//               <Box display="flex" gap={1}>
//                 <TrendingUp fontSize="small"/>
//                 <Typography variant="caption">
//                   +12%
//                 </Typography>
//               </Box>

//             </StatsCard>
//           </Grid>


//           <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
//             <StatsCard gradient="linear-gradient(135deg,#10b981,#059669)">
//               <Box>
//                 <Typography variant="caption">
//                   TOTAL PURCHASE
//                 </Typography>

//                 <Typography variant="h4">
//                   {dashboardData.statistics.totalPurchaseInvoices}
//                 </Typography>
//               </Box>
//             </StatsCard>
//           </Grid>


//           <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
//             <StatsCard gradient="linear-gradient(135deg,#f59e0b,#d97706)">
//               <Box>
//                 <Typography variant="caption">
//                   CUSTOMERS
//                 </Typography>

//                 <Typography variant="h4">
//                   {dashboardData.statistics.totalCustomers}
//                 </Typography>
//               </Box>
//             </StatsCard>
//           </Grid>


//           <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
//             <StatsCard gradient="linear-gradient(135deg,#ef4444,#dc2626)">
//               <Box>
//                 <Typography variant="caption">
//                   USERS
//                 </Typography>

//                 <Typography variant="h4">
//                   {dashboardData.statistics.totalUsers}
//                 </Typography>
//               </Box>
//             </StatsCard>
//           </Grid>


//           <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
//             <StatsCard gradient="linear-gradient(135deg,#ec4899,#db2777)">
//               <Box>
//                 <Typography variant="caption">
//                   CASH SUMMARY
//                 </Typography>

//                 <Typography variant="h4">
//                   {dashboardData.statistics.totalNote}
//                 </Typography>
//               </Box>
//             </StatsCard>
//           </Grid>


//         </Grid>


//         {/* ================= CHART ================= */}

//         <Box mt={5}>

//           <Card sx={{ p: 3, borderRadius: 4 }}>

//             <Typography variant="h6">
//               Stock Chart
//             </Typography>

//             <Box sx={{ height: 350 }}>

//               {dashboardData.chartData.labels.length > 0 ? (

//                 <Bar
//                   data={dashboardData.chartData}
//                   options={{ responsive: true }}
//                 />

//               ) : (

//                 <Typography>
//                   No Chart Data
//                 </Typography>

//               )}

//             </Box>

//           </Card>

//         </Box>


//         {/* ================= TABLE ================= */}

//         <Box mt={5}>

//           <Card sx={{ p: 3, borderRadius: 4 }}>

//             <Typography variant="h6">
//               Recent Sell Invoices
//             </Typography>


//             <TableContainer component={Paper}>

//               <Table>

//                 <TableHead>

//                   <TableRow>

//                     <TableCell>Invoice</TableCell>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell>Total</TableCell>
//                     <TableCell>Paid</TableCell>
//                     <TableCell>Status</TableCell>

//                   </TableRow>

//                 </TableHead>


//                 <TableBody>

//                   {dashboardData.recentSells.length > 0 ?

//                     dashboardData.recentSells.map((row:any, i:number) => (

//                       <TableRow key={i}>

//                         <TableCell>
//                           {row.invoiceNumber}
//                         </TableCell>

//                         <TableCell>
//                           {new Date(row.invoiceDate).toLocaleDateString()}
//                         </TableCell>

//                         <TableCell>
//                           {row.customerName}
//                         </TableCell>

//                         <TableCell>
//                           ₹{row.grandTotal}
//                         </TableCell>

//                         <TableCell>
//                           ₹{row.paidAmount}
//                         </TableCell>

//                         <TableCell>

//                           <Chip
//                             label={row.paymentStatus}
//                             color={
//                               row.paymentStatus === "paid"
//                                 ? "success"
//                                 : "warning"
//                             }
//                           />

//                         </TableCell>

//                       </TableRow>

//                     ))

//                     :

//                     <TableRow>

//                       <TableCell colSpan={6} align="center">
//                         No Data
//                       </TableCell>

//                     </TableRow>

//                   }

//                 </TableBody>


//               </Table>

//             </TableContainer>

//           </Card>

//         </Box>


//       </Box>

//     </Box>

//   );

// };

// export default Dashboard;