
import { Routes, Route } from "react-router-dom";

import Login from "./common/Login";
import Signup from "./common/Signup";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";

import DailyCashSummery from "./pages/DailyCashSummery/DailyCashSummery";
import DailyCashSummaryForm from "./pages/DailyCashSummery/DailyCashSummeryFrom";

import CreditCustomerEntry from "./pages/CreditCustomerEntry";


import DailyCashSummeryFromUpdate from "./pages/DailyCashSummery/DailyCashSummeryFromUpdate";

import ForgotPassword from "./common/ForgotPassword";
import VerifyOTP from "./common/VerifyOTP";
import ResetPassword from "./common/ResetPassword";

// Import route protection components
import ProtectedRoute from "./route/protectedRoute";
import PublicRoute from "./route/PublicRoute";

import { Toaster } from "react-hot-toast";




// Import 404 Page
import NotFound from "./pages/NotFound";




import SaleInvoice from "./pages/sale/SaleInvoice";
import SaleList from "./pages/sale/SaleList";
import SaleEdit from "./pages/sale/SaleEdit";
import SaleReturnCreate from "./pages/SaleReturn/SaleReturnCreate";
import SaleReturnList from "./pages/SaleReturn/SaleReturnList";
import ExpenseEntry from "./pages/ExpenseEntry";
import PaymentReceivedEntry from "./pages/PaymentReceivedEntry";
import CustomerManagement from "./pages/parties/CustomerManagement";
import CustomerCreate from "./pages/parties/CustomerCreate";
import CustomerUpdate from "./pages/parties/CustomerUpdate";
import AddProduct from "./pages/product/AddProduct";
import ProductTable from "./pages/product/ProductTable";
import UpdateProduct from "./pages/product/UpdateProduct";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Public Routes - accessible only when NOT logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected Routes - accessible only when logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />

            {/* Sale Routes */}
          <Route path="/sale/invoice" element={<SaleInvoice />} />
          <Route path="/load-items" element={<SaleList />} />
          <Route path="/sale/invoice/edit/:id" element={<SaleEdit />} />



<Route path="/return-items/create" element={<SaleReturnCreate />} />
<Route path="/sale/return-list" element={<SaleReturnList />} />

            


        

            

          

            {/* Daily Cash Routes */}
            <Route 
              path="dailycash/create" 
              element={<DailyCashSummaryForm refresh={() => {}} />} 
            />
            <Route path="note-summary-entry" element={<DailyCashSummery />} />
            <Route path="dailycash/edit/:id" element={<DailyCashSummeryFromUpdate />} />

            
          

         

           
          





    


 


<Route path="/expenses-entry" element={<ExpenseEntry />} />

<Route path="/credit-customer-entry" element={<CreditCustomerEntry />} />

<Route path="/payment-received-entry" element={<PaymentReceivedEntry />} />

<Route path="/customer-entry" element={<CustomerManagement />} />
<Route path="/customers/create" element={<CustomerCreate />} />
<Route path="/customers/edit/:id" element={<CustomerUpdate />} />

<Route path="/products" element={<ProductTable />} />
<Route path="/products/add" element={<AddProduct />} />
<Route path="/products/edit/:id" element={<UpdateProduct />} />



          </Route>
        </Route>

          {/* Optional: Catch-all for public routes (if someone tries to access non-existent public route) */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </>
  );
}

export default App;