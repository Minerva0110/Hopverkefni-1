import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface LoginPageProps {
  onLogin: (token: string, role: string) => void;  
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    if (password.length < 6) {
      setError("Lykilorð verður að vera að minnsta kosti 6 stafir!");
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }), 
      });
  
      const data = await response.json();
      console.log("Login response from backend:", data);
  
      if (!response.ok) {
        console.error("Backend error:", JSON.stringify(data, null, 2));
        throw new Error(data.error ? JSON.stringify(data.error) : "Login failed");
      }
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
  
      onLogin(data.token, data.role);
  
      window.location.href = data.role === "admin" ? "/admin-dashboard" : "/checklist";
  
    } catch (err) {
      console.error("Login failed:", err);
      setError((err as Error).message);
    }
  };
  
  
  

  return (
    <div className="auth-container">
      <h2>Velkomin! Skráðu þig inn</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Notandanafn" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Lykilorð" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Skrá inn</button>
      </form>
    </div>
  );
}

export default LoginPage;
