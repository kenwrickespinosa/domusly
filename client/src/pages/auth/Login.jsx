import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to Log In");
      }

      const data = await response.json();
      console.log("Login successfully:", data);

      localStorage.setItem("token", data.token);

      navigate("/explore"); // Define where to navigate the user
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div
      className="max-md:flex max-md:flex-col grid grid-cols-2 bg-neutral-100 h-screen justify-center 
      items-center"
    >
      <div>
        <p className="max-md:text-4xl text-center font-bold text-[#0061ff] text-6xl">
          Welcome back!
        </p>
        <p className="max-md:text-sm text-center font-medium text-2xl">
          Discover more places that fit your lifestyle
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="m-32 space-y-5 border px-10 py-10 bg-white shadow"
      >
        <Input
          type="text"
          onChange={handleChange}
          name="username"
          placeholder="Username"
          className="py-6 text-2xl font-semibold bg-white"
        />
        <Input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Password"
          className="py-6 text-2xl font-semibold bg-white"
        />
        <Button type="submit" className="bg-[#0061ff] text-white w-full">
          Log In
        </Button>
        <div>
          <hr />
          <Link to="/">Create an account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
