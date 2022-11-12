import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../pages/admin/DashBoard";

function AdminRoute() {
  return (
    <>
      <Routes>
        <Route path={"/admin"} element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default AdminRoute;
