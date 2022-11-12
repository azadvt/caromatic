import React from "react";
import Sidebar from "../../admin/Sidebar";
import { NavbarTop } from "../../Navigation/Navigation";

function AdminLayout(props) {
  return (
    <div>
      <NavbarTop />
      <div className="flex">
        <Sidebar />
        <div className="w-full">{props.children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
