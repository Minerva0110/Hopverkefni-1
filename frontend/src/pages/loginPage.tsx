import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface LoginPageProps {
  onLogin: (email: string, role: string) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Login failed");

    
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);  

      
      onLogin(email, data.role);

    
      window.location.href = data.role === "admin" ? "/admin-dashboard" : "/checklist";

    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="auth-container">
      <h2>🔐 Velkomin! Skráðu þig inn</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Netfang" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Lykilorð" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Skrá inn</button>
      </form>
    </div>
  );
}

export default LoginPage;
