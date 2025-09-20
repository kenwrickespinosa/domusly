import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Auth error");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log("Error:", err);
        setUser(null);
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};
