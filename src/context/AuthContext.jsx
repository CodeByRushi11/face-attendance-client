// 📌 AuthContext.jsx — Stores token, user, login, logout globally.
// 💡 React Context makes authentication usable anywhere.

import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // 🔓 Login Save Auth Locally
  const login = (token, role, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setRole(role);
    setUser(user);
  };

  // 🔐 Logout Clear Storage
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setToken(null);
    setRole(null);
    setUser(null);
  };

  // ♻ Restore Session on Refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) setUser({ token, role });
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 Easy usage — Instead of useContext everytime
export const useAuth = () => useContext(AuthContext);
