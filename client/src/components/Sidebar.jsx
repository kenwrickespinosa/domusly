import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside>
      <p>Domusly</p>
      <nav className="flex flex-col">
        <NavLink
          to="/explore"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "skyblue" : null,
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: "none",
          })}
        >
          Explore
        </NavLink>
        <NavLink
          to="/post"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "skyblue" : null,
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: "none",
          })}
        >
          Create Post
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
