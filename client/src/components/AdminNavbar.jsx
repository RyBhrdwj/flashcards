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
    <nav className="flex h-8 items-center justify-between border-b-2 border-b-zinc-600 p-8 text-2xl">
      <h1 className="text-left font-bold">ADMIN DASHBOARD</h1>
      <div className="flex gap-5">
        <button className="text-white hover:text-blue-400" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="px-4 py-2 text-white hover:text-red-400" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
