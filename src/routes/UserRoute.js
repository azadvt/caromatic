import React from "react";
import { Routes, Route } from "react-router-dom";
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

      </Routes>
    </>
  );
}

export default UserRoute;
