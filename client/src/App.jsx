import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/Login";
import Explore from "./pages/explore";
import MainLayout from "./Layouts/MainLayout";
import Post from "./pages/post";
import Listing from "./pages/listing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />

      <Route element={<MainLayout />}>
        <Route path="/explore" element={<Explore />} />
        <Route path="/post" element={<Post />} />
        <Route path="/saved-listing" element={<Listing />} />
      </Route>
    </Routes>
  );
}

export default App;
