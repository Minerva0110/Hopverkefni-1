import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface RegisterPageProps {
    onLogin: (token: string, role: string) => void;
}

function RegisterPage({ onLogin }: RegisterPageProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.error || "Registration failed");
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role); 
  
      onLogin(data.token, data.role); 
  
      window.location.href = "/checklist";
    } catch (err) {
      console.error("Registration failed:", err);
      setError((err as Error).message);
    }
  };
  

  return (
    <div className="auth-container">
      <h2>Nýskráning</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Notandanafn" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Netfang" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Lykilorð" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Skrá nýjan notanda</button>
      </form>
    </div>
  );
}

export default RegisterPage;
