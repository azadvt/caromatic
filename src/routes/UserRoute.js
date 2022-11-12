import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/user/Home";
function UserRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  );
}

export default UserRoute;
