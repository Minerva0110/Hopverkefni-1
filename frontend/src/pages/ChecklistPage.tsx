import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface ChecklistItem {
  id: number;
  title: string;
  completed: boolean;
}

interface ChecklistPageProps {
  onLogout: () => void;
}

const ChecklistPage: React.FC<ChecklistPageProps> = ({ onLogout }) => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Ekki tókst að sækja verkefni.");
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("⚠️ Villa við að sækja verkefni:", error);
    }
  };

  
  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("⚠️ Villa við að uppfæra verkefni:", errorResponse);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, completed: !completed } : item
        )
      );
    } catch (error) {
      console.error("⚠️ Villa við að haka við verkefni:", error);
    }
  };

  return (
    <div className="checklist-container">
      <h2>Verkefnalisti</h2>
      <ul>
        {items.length === 0 ? (
          <p>Engin verkefni fundust!</p>
        ) : (
          items.map((item) => (
            <li key={item.id} className={`task-item ${item.completed ? "completed" : ""}`}>
            <span className="task-text">{item.title}</span>
            <input
               type="checkbox"
               checked={item.completed}
               onChange={() => handleToggleComplete(item.id, item.completed)}
               aria-label={`Mark ${item.title} as completed`}
            />
          </li>
          
          ))
        )}
      </ul>
      <button className="logout-btn" onClick={onLogout}>
        Útskrá
      </button>
    </div>
  );
};

export default ChecklistPage;
