



import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MenuIcon,
  SaleIcon,
  UserRoleIcon,
  ReportIcon,
  VendorIcon,
  DashboardIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "../common/Icons";

/* ===================== Inline Icons ===================== */

const EmployeeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

// Customer icon
const CustomerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

// Credit Payment icon
const CreditPaymentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

// ✅ NEW: Inventory icon (box/package)
const InventoryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

// ✅ NEW: Category icon (grid/folder)
const CategoryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

// ✅ NEW: Product/Items icon (tag/box)
const ProductIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

const GreetingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

/* ======================================================== */

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Auto close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  }, [location.pathname]);

  const isSaleActive = () => {
    const salePaths = [
      "/sale/invoice-list",
      "/sale/order",
      "/sale/credit-order",
      "/sale/quotation",
      "/sale/delivery-challan",
    ];
    return salePaths.some((path) => location.pathname.startsWith(path));
  };

  const isPurchaseActive = () => {
    const purchasePaths = [
      "/purchase/invoice",
      "/purchase/order",
      "/purchase/debit-note",
      "/purchase/expenses",
    ];
    return purchasePaths.some((path) => location.pathname.startsWith(path));
  };

  const isInventoryActive = () => {
    const inventoryPaths = [
      "/inventory/items",
      "/inventory/issue-items",
      "/inventory/stock",
    ];
    return inventoryPaths.some((path) => location.pathname.startsWith(path));
  };

  const isEmployeeActive = () => {
    const employeePaths = ["/employee/list", "/employee/attendance"];
    return employeePaths.some((path) => location.pathname.startsWith(path));
  };

  const isPartiesActive = () => {
    const partiesPaths = ["/parties/customer", "/parties/credit-payment"];
    return partiesPaths.some((path) => location.pathname.startsWith(path));
  };

  // ✅ NEW: Check if any master/inventory submenu item is active
  const isMasterActive = () => {
    const masterPaths = ["/master/category", "/master/product"];
    return masterPaths.some((path) => location.pathname.startsWith(path));
  };

  const isGreetingsActive = () => {
    return location.pathname.startsWith("/greetings");
  };

  // Auto expand submenus if their routes are active
  useEffect(() => {
    if (isSaleActive()) setOpenSubmenu("sale");
    if (isPurchaseActive()) setOpenSubmenu("purchase");
    if (isInventoryActive()) setOpenSubmenu("inventory");
    if (isEmployeeActive()) setOpenSubmenu("employee");
    if (isPartiesActive()) setOpenSubmenu("parties");
    if (isMasterActive()) setOpenSubmenu("master"); // ✅ NEW
  }, [location.pathname]);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "918319312507";
    const message = "Hello! I need help with AccuERP.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 h-full z-40
          bg-gradient-to-b from-indigo-700 to-purple-800 text-white
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isOpen ? "w-64" : "w-20"}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/20">
          {isOpen && <span className="text-xl font-bold">AccuERP</span>}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-white/10"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {/* Dashboard */}
          <SidebarItem
            to="/dashboard"
            icon={<DashboardIcon />}
            label="Dashboard"
            isOpen={isOpen}
          />

          {/* Sale */}
          {isOpen ? (
            <div className="mb-1">
              <button
                onClick={() => toggleSubmenu("sale")}
                className={`
                  w-full flex items-center justify-between gap-4
                  px-4 py-3 my-1 mx-2 rounded-lg transition-all
                  ${isSaleActive() ? "bg-white/20" : "hover:bg-white/10"}
                `}
              >
                <div className="flex items-center gap-4">
                  <SaleIcon />
                  <span>Sale</span>
                </div>
                {openSubmenu === "sale" ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>

              {openSubmenu === "sale" && (
                <div className="ml-12 border-l border-white/20">
                  <SidebarSubItem to="/sale/invoice-list" label="Sale Invoice" />
                  <SidebarSubItem to="/sale/return-list" label="Sale Return" />
                </div>
              )}
            </div>
          ) : (
            <div className="relative group">
              <SidebarItem
                to="/sale/invoice-list"
                icon={<SaleIcon />}
                label="Sale"
                isOpen={false}
              />
              <Tooltip text="Sale" />
            </div>
          )}

          {/* ================= ✅ NEW: Master / Inventory Module ================= */}
          {isOpen ? (
            <div className="mb-1">
              <button
                onClick={() => toggleSubmenu("master")}
                className={`
                  w-full flex items-center justify-between gap-4
                  px-4 py-3 my-1 mx-2 rounded-lg transition-all
                  ${isMasterActive() ? "bg-white/20" : "hover:bg-white/10"}
                `}
              >
                <div className="flex items-center gap-4">
                  <InventoryIcon />
                  <span>Inventory</span>
                </div>
                {openSubmenu === "master" ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>

              {openSubmenu === "master" && (
                <div className="ml-12 border-l border-white/20">
                  <SidebarSubItem
                    to="/master/category"
                    label="Category"
                    icon={<CategoryIcon />}
                  />
                  <SidebarSubItem
                    to="/master/product"
                    label="Products / Items"
                    icon={<ProductIcon />}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="relative group">
              <SidebarItem
                to="/master/category"
                icon={<InventoryIcon />}
                label="Inventory"
                isOpen={false}
              />
              <Tooltip text="Inventory" />
            </div>
          )}
          {/* ================================================================= */}

          {/* Parties */}
          {isOpen ? (
            <div className="mb-1">
              <button
                onClick={() => toggleSubmenu("parties")}
                className={`
                  w-full flex items-center justify-between gap-4
                  px-4 py-3 my-1 mx-2 rounded-lg transition-all
                  ${isPartiesActive() ? "bg-white/20" : "hover:bg-white/10"}
                `}
              >
                <div className="flex items-center gap-4">
                  <VendorIcon />
                  <span>Parties</span>
                </div>
                {openSubmenu === "parties" ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>

              {openSubmenu === "parties" && (
                <div className="ml-12 border-l border-white/20">
                  <SidebarSubItem
                    to="/parties/customer"
                    label="Customer"
                    icon={<CustomerIcon />}
                  />
                  <SidebarSubItem
                    to="/parties/credit-payment"
                    label="Credit Payment"
                    icon={<CreditPaymentIcon />}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="relative group">
              <SidebarItem
                to="/parties/customer"
                icon={<VendorIcon />}
                label="Parties"
                isOpen={false}
              />
              <Tooltip text="Parties" />
            </div>
          )}

          {/* Cash Summary */}
          {isOpen ? (
            <NavLink
              to="/dailycash/get"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 my-1 mx-2 rounded-lg transition-colors
                ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
              }
            >
              <EmployeeIcon />
              <span>Cash Summary</span>
            </NavLink>
          ) : (
            <div className="relative group">
              <NavLink
                to="/dailycash/get"
                className={({ isActive }) =>
                  `flex items-center justify-center px-4 py-3 my-1 mx-2 rounded-lg transition-colors
                  ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
                }
              >
                <EmployeeIcon />
              </NavLink>
              <Tooltip text="Cash Summary" />
            </div>
          )}

          {/* User Management */}
          {isOpen ? (
            <NavLink
              to="/users/list"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 my-1 mx-2 rounded-lg transition-colors
                ${
                  isActive || location.pathname.startsWith("/users/")
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`
              }
            >
              <UserRoleIcon />
              <span>User Management</span>
            </NavLink>
          ) : (
            <div className="relative group">
              <NavLink
                to="/users/list"
                className={({ isActive }) =>
                  `flex items-center justify-center px-4 py-3 my-1 mx-2 rounded-lg transition-colors
                  ${
                    isActive || location.pathname.startsWith("/users/")
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`
                }
              >
                <UserRoleIcon />
              </NavLink>
              <Tooltip text="User Management" />
            </div>
          )}

          {/* Greetings */}
          <SidebarItem
            to="/greetings/get"
            icon={<GreetingsIcon />}
            label="Greetings"
            isOpen={isOpen}
            customActive={isGreetingsActive()}
          />

          {/* Reports */}
          <SidebarItem
            to="/reports/get"
            icon={<ReportIcon />}
            label="Reports"
            isOpen={isOpen}
          />

          {/* WhatsApp */}
          {isOpen ? (
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center gap-4 px-4 py-3 my-1 mx-2 rounded-lg transition-all hover:bg-white/10 text-left"
            >
              <WhatsAppIcon />
              <span>WhatsApp Support</span>
            </button>
          ) : (
            <div className="relative group">
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center px-4 py-3 my-1 mx-2 rounded-lg transition-all hover:bg-white/10"
              >
                <WhatsAppIcon />
              </button>
              <Tooltip text="WhatsApp Support" />
            </div>
          )}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 text-sm text-white/50 border-t border-white/20">
            v1.0.0
          </div>
        )}
      </aside>
    </>
  );
};

/* ===================== Reusable Components ===================== */

interface ItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  customActive?: boolean;
}

const SidebarItem: React.FC<ItemProps> = ({
  to,
  icon,
  label,
  isOpen,
  customActive,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 my-1 mx-2 rounded-lg transition-all
        ${isActive || customActive ? "bg-white/20" : "hover:bg-white/10"}`
      }
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
};

interface SubItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const SidebarSubItem: React.FC<SubItemProps> = ({ to, label, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 my-1 mx-2 rounded-lg transition-all text-sm
        ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
      }
    >
      {icon && <span className="opacity-80">{icon}</span>}
      {label}
    </NavLink>
  );
};

interface TooltipProps {
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  return (
    <div
      className="absolute left-full top-0 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded
        opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap z-50"
    >
      {text}
    </div>
  );
};

export default Sidebar;
