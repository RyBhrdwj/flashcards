import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="flex h-8 items-center justify-between border-b-2 border-b-zinc-600 p-3 md:p-8 text-xl md:text-2xl">
      <h1 className="text-left font-bold text-sm md:text-xl">ADMIN DASHBOARD</h1>
      <div className="flex gap-1 md:gap-5">
        <button className="text-white hover:text-blue-400" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="px-1 py-1 md:px-4 md:py-2 text-white hover:text-red-400" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
