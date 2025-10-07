import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="">
      <p className="text-white font-bold mb-10 text-4xl">Domusly</p>
      <nav className="flex flex-col text-right pl-5">
        <NavLink
          to="/explore"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "white" : null,
            color: isActive ? "black" : "white",
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: "none",
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            padding: 5,
            fontSize: 20
          })}
        >
          Explore
        </NavLink>
        <NavLink
          to="/post"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "white" : null,
            color: isActive ? "black" : "white",
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: "none",
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            padding: 5,
            fontSize: 20
          })}
        >
          Create Post
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
