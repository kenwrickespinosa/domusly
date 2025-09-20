import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Link to="/auth/login">Login</Link>
      </div>
    </div>
  );
}

export default Home;
