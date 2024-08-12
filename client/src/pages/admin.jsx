import React, { useContext } from "react";
import CardsTab from "../components/CardsTab";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminPage() {
  return (
    <>
      <AdminNavbar />
      <CardsTab />
    </>
  );
}
