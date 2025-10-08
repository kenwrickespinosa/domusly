import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="border flex flex-row justify-between items-center px-32 py-5">
      <div>
        <p className="text-[#0061ff] text-2xl font-bold">Domusly</p>
      </div>
      <nav className="flex gap-4 justify-between">
        <Link
          to="/auth/login"
          className="border rounded-lg font-semibold text-lg px-5 py-2 text-[#0061ff] border-[#0061ff]"
        >
          Log In
        </Link>
        <Link
          to="/"
          className="border rounded-lg text-lg font-semibold px-5 py-2 border-[#0061ff] bg-[#0061ff] text-white"
        >
          Sign Up
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
