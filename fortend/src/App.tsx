
import { Routes, Route } from "react-router-dom";

import Login from "./common/Login";
import Signup from "./common/Signup";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";

import DailyCashSummery from "./pages/DailyCashSummery/DailyCashSummery";
import DailyCashSummaryForm from "./pages/DailyCashSummery/DailyCashSummeryFrom";



import ItemStock from "./pages/inventory/ItemStock";
import ComponentStock from "./pages/inventory/ComponentStock";
import Reports from "./pages/Reports/Reports";
import DailySaleReport from "./pages/Reports/DailySaleReport";
import ProfitEstimationReport from "./pages/Reports/ProfitEstimationReport";
import PurchaseVsSaleReport from "./pages/Reports/PurchaseVsSaleReport";
import DeliveryBoyCollectionReport from "./pages/Reports/DeliveryBoyCollectionReport";
import CreditOutstandingReport from "./pages/Reports/CreditOutstandingReport";
import ShortageReport from "./pages/Reports/ShortageReport";
import StockReport from "./pages/Reports/StockReport";
import ItemWiseSummary from "./pages/Reports/ItemWiseSummary";
import UserTable from "./pages/users/UserTable";
import UserForm from "./pages/users/UserForm";
import DailyCashSummeryFromUpdate from "./pages/DailyCashSummery/DailyCashSummeryFromUpdate";

import ForgotPassword from "./common/ForgotPassword";
import VerifyOTP from "./common/VerifyOTP";
import ResetPassword from "./common/ResetPassword";

// Import route protection components
import ProtectedRoute from "./route/protectedRoute";
import PublicRoute from "./route/PublicRoute";

import { Toaster } from "react-hot-toast";

import PermissionTable from "./pages/users/PermissionTable";
import PermissionForm from "./pages/users/PermissionForm";


// Import 404 Page
import NotFound from "./pages/NotFound";
import GreetingsPage from "./pages/GreetingsPage";

import CustomerList from "./pages/parties/CustomerList";
import CustomerCreate from "./pages/parties/CustomerCreate";
import CustomerEdit from "./pages/parties/CustomerEdit";
import CategoryList from "./pages/Category/CategoryList";
import CategoryCreate from "./pages/Category/CategoryCreate";
import CategoryEdit from "./pages/Category/CategoryEdit";
import ProductList from "./pages/product/ProductList";
import ProductCreate from "./pages/product/ProductCreate";
import ProductEdit from "./pages/product/ProductEdit";
import SaleInvoice from "./pages/sale/SaleInvoice";
import SaleList from "./pages/sale/SaleList";
import SaleEdit from "./pages/sale/SaleEdit";
import SaleReturnCreate from "./pages/SaleReturn/SaleReturnCreate";
import SaleReturnList from "./pages/SaleReturn/SaleReturnList";

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
          <Route path="/sale/invoice-list" element={<SaleList />} />
          <Route path="/sale/invoice/edit/:id" element={<SaleEdit />} />



<Route path="/sale/return/:saleId" element={<SaleReturnCreate />} />
<Route path="/sale/return-list" element={<SaleReturnList />} />

            <Route path="/master/category" element={<CategoryList />} />
            <Route path="/master/category/create" element={<CategoryCreate />} />
            <Route path="/master/category/edit/:id" element={<CategoryEdit />} />


            <Route path="/master/product" element={<ProductList />} />
            <Route path="/master/product/create" element={<ProductCreate />} />
            <Route path="/master/product/edit/:id" element={<ProductEdit />} />

            

          

            {/* Daily Cash Routes */}
            <Route 
              path="dailycash/create" 
              element={<DailyCashSummaryForm refresh={() => {}} />} 
            />
            <Route path="dailycash/get" element={<DailyCashSummery />} />
            <Route path="dailycash/edit/:id" element={<DailyCashSummeryFromUpdate />} />

            
            {/* Inventory Routes */}
            <Route path="inventory/stock" element={<ItemStock />} />
            <Route path="inventory/ComponentStock" element={<ComponentStock />} />

            {/* Reports Routes */}
            <Route path="reports/get" element={<Reports />} />
            <Route path="reports/daily-sale" element={<DailySaleReport />} />
            <Route path="reports/profit" element={<ProfitEstimationReport />} />
            <Route path="reports/purchase-vs-sale" element={<PurchaseVsSaleReport />} />
            <Route path="reports/delivery-boy" element={<DeliveryBoyCollectionReport />} />
            <Route path="reports/credit" element={<CreditOutstandingReport />} />
            <Route path="reports/shortage" element={<ShortageReport />} />
            <Route path="reports/stock" element={<StockReport />} />
            <Route path="reports/item-wise" element={<ItemWiseSummary />} />

            {/* Users Routes */}
            <Route path="users/list" element={<UserTable />} />
            <Route path="users/create" element={<UserForm isStandalone={true} />} />
            <Route path="users/permissions" element={<PermissionTable />} />
            <Route path="users/permissions/create" element={<PermissionForm />} />
            <Route path="users/permissions/edit/:id" element={<PermissionForm />} />





    


            {/* Greetings Routes */}
            <Route path="greetings/get" element={<GreetingsPage />} />




            {/* new routes working  */}


<Route path="/parties/customer" element={<CustomerList />} />
<Route path="/parties/customer/create" element={<CustomerCreate />} />
<Route path="/parties/customer/edit/:id" element={<CustomerEdit />} />


          </Route>
        </Route>

          {/* Optional: Catch-all for public routes (if someone tries to access non-existent public route) */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </>
  );
}

export default App;