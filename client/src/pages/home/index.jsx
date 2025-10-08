import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";

function Home() {
  return (
    <div className="">
      <Navbar />
      <div className="">
        <Hero />
        <Services />
      </div>
    </div>
  );
}

export default Home;
