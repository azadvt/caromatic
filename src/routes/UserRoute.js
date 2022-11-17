import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../pages/Error/Error";
import CarSection from "../pages/user/CarSection";
import CheckOut from "../pages/user/CheckOut";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Signup from "../pages/user/Signup";
import Success from "../pages/user/Success";
function UserRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/car" element={<CarSection/>}/>
        <Route path="/checkout" element={<CheckOut/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="*" element={<Error/>}/>

      </Routes>
    </>
  );
}

export default UserRoute;
