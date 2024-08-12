import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminPage() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
