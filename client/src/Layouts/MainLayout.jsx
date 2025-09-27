import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <div>
        <Sidebar />
      </div>

      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
