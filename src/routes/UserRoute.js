import React from "react";
import { Routes, Route } from "react-router-dom";
import CarSection from "../pages/user/CarSection";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Signup from "../pages/user/Signup";
function UserRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/car" element={<CarSection/>}/>

      </Routes>
    </>
  );
}

export default UserRoute;
