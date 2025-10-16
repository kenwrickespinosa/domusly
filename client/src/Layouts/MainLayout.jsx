import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

function MainLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] h-screen overflow-x-hidden">
      <div className="hidden md:block bg-[#0061ff]">
        <Sidebar />
      </div>

      <main className="overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}

export default MainLayout;
