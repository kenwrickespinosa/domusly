import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      navigate("")    // Define where to navigate the user
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="username"
          placeholder="Username"
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Password"
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
