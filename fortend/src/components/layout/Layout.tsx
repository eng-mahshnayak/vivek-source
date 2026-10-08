



// import React, { useEffect,useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';

// import Header from './Header';

// const Layout: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
//   const navigate = useNavigate();

//   console.log(sidebarOpen);
  

//   const toggleSidebar = () => setSidebarOpen(prev => !prev);

//   // Check token on component mount
//   useEffect(() => {
//     const token = localStorage.getItem('erptoken');
//     if (!token) {
//       navigate('/');
//     }
//   }, [navigate]);

//   return (
//     <div className="flex h-screen bg-gray-100">
     
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header toggleSidebar={toggleSidebar} />
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;



import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "./Header";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  console.log(sidebarOpen);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem("erptoken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#090d16] transition-colors">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 dark:bg-[#090d16] transition-colors">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;