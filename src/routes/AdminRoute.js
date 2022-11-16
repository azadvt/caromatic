import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import DashBoard from "../pages/admin/DashBoard";
import {useSelector} from 'react-redux'
import AdminCars from "../pages/admin/AdminCars.js";
import AddCar from "../pages/admin/AddCar";
import UserManagement from "../pages/admin/UserManagement";
function AdminRoute() {
  const {admin} = useSelector((state)=>state.adminAuth)

  return (
    <>
      <Routes>
        <Route path={"/admin/login"} element={admin ? <DashBoard />: <AdminLogin/>}/>
        <Route path={"/admin"} element={admin ? <DashBoard />: <AdminLogin/>} />
        <Route path={"/admin/cars"} element={admin ? <AdminCars/>: <AdminLogin/>} />
        <Route path={"/admin/add-car"} element={admin ? <AddCar/> : <AdminLogin/>}/>
        <Route path={"/admin/get-users"} element={admin ? <UserManagement/> : <AdminLogin/>}/>

      </Routes>
    </>
  );
}

export default AdminRoute;
