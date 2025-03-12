import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Item {
    id: number;
    title: string;
    content: string;
    isPublic: boolean;
    createdAt: string;
  }
  

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface ChecklistPageProps {
  onLogout: () => void;
}

function ChecklistPage({ onLogout }: ChecklistPageProps) {
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Villa við að sækja gögn:", error));
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="App">
      <h1>Verkefnalisti</h1>
      <button className="logout-btn" onClick={handleLogout}>Útskrá</button>
      <ul>
        {items.length > 0 ? (
          items.map((item: Item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <p><strong>📢 Opinber:</strong> {item.isPublic ? "Já" : "Nei"}</p>
              <p><strong>📅 Dagsetning:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>Engin verkefni fundust!</p>
        )}
      </ul>
    </div>
  );
}

export default ChecklistPage;
