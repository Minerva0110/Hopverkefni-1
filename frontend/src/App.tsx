import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import ChecklistPage from "./pages/ChecklistPage";
import AdminDashboard from "./pages/adminDashboard";
import "./App.css";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogin = (userToken: string, userRole: string) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("role", userRole);
    setToken(userToken);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <Routes>  
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />

      <Route 
        path="/admin-dashboard" 
        element={role === "admin" ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/checklist" />} 
      />

      <Route 
        path="/checklist" 
        element={token ? <ChecklistPage onLogout={handleLogout} /> : <Navigate to="/login" />} 
      />

      <Route path="*" element={<Navigate to={token ? "/checklist" : "/login"} />} />
    </Routes>
  );
}

export default App;
