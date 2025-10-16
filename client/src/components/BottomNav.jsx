import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

function BottomNav() {
  return (
    <Menubar className="md:hidden fixed h-auto bottom-0 left-0 right-0 grid grid-cols-2 bg-white border-t shadow-md">
      <MenubarMenu>
        <MenubarTrigger asChild>
          <NavLink
            to="/explore"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 transition-colors duration-200`
            }
          >
            {({ isActive }) => (
              <>
                <FaHome
                  className={`mb-1 w-5 h-5 ${
                    isActive ? "text-[#0061ff]" : "text-gray-500"
                  }`}
                />
                <span
                  className={`${
                    isActive ? "text-[#0061ff]" : "text-gray-500"
                  } text-sm`}
                >
                  Explore
                </span>
              </>
            )}
          </NavLink>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <NavLink
            to="/post"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 transition-colors duration-200`
            }
          >
            {({ isActive }) => (
              <>
                <FaPencilAlt
                  className={`mb-1 w-5 h-5 ${
                    isActive ? "text-[#0061ff]" : "text-gray-500"
                  }`}
                />
                <span
                  className={`${
                    isActive ? "text-[#0061ff]" : "text-gray-500"
                  } text-sm`}
                >
                  Post
                </span>
              </>
            )}
          </NavLink>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

export default BottomNav;
