import React from "react";
import Sidebar from "../../admin/Sidebar";
import { AdminNavbarTop } from "../../Navigation/Navigation";

function AdminLayout(props) {
  return (
    <div>
      <AdminNavbarTop/>
      <div className="flex">
        <Sidebar />
        <div className="w-full">{props.children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
