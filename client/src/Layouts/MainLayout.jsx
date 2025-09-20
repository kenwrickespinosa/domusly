import React from "react";
import Sidebar from "../pages/explore/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Sidebar />

      <main className="bg-red-200 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
