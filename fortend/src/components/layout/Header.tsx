import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  toggleSidebar?: () => void;
  pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("erpuser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("erptoken");
    localStorage.removeItem("erpuser");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-[#0f172a] border-b border-gray-800 text-white w-full px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* LEFT SIDE: Home Button & App Logo Branding */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Toggle Button (if needed) */}
          {toggleSidebar && (
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg bg-gray-800/60 text-gray-300 hover:bg-gray-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          )}

          {/* Home Icon Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition border border-gray-700/50"
            title="Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h4.371c.621 0 1.125-.504 1.125-1.125V15c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v4.875c0 .621.504 1.125 1.125 1.125h4.371c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </button>

          {/* Logo & Subtitle Badge */}
          <div className="flex items-center gap-2.5 bg-gray-800/40 border border-gray-700/60 rounded-xl px-3 py-1.5">
            <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0C2.678 5.578 2.25 6.058 2.25 6.626v8.25c0 .621.504 1.125 1.125 1.125h2.25"
                />
              </svg>
            </div>
            <div className="flex flexDirection-col leading-none">
              <span className="font-bold text-sm tracking-wide text-white">
                LogiTrack ERP
              </span>
              
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: User details & Log Out Button */}
        <div className="flex items-center gap-3">
          {user?.name && (
            <span className="hidden sm:block text-xs font-medium text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-lg border border-gray-700/40">
              {user.name}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-red-400 bg-red-950/30 border border-red-800/40 hover:bg-red-900/40 hover:text-red-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25"
              />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;