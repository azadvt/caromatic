import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import DashBoard from "../pages/admin/DashBoard";

function AdminRoute() {
  return (
    <>
      <Routes>
        <Route path={"/admin/login"} element={<AdminLogin/>}/>
        <Route path={"/admin"} element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default AdminRoute;
