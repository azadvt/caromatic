import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import DashBoard from "../pages/admin/DashBoard";
import {useSelector} from 'react-redux'
function AdminRoute() {
  const {admin} = useSelector((state)=>state.adminAuth)

  return (
    <>
      <Routes>
        <Route path={"/admin/login"} element={admin ? <DashBoard />: <AdminLogin/>}/>
        <Route path={"/admin"} element={admin ? <DashBoard />: <AdminLogin/>} />
      </Routes>
    </>
  );
}

export default AdminRoute;
