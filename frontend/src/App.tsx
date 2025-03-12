import { useState, useEffect } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(`Sæki gögn frá: ${API_URL}/items`);
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Villa við að sækja gögn:", error));
  }, []);

  return (
    <div className="App">
      <h1>Verkefnalisti</h1>
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <p><strong>Opinber:</strong> {item.isPublic ? "Já" : "Nei"}</p>
              <p><strong>Dagsetning:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>Engin verkefni fundust!</p>
        )}
      </ul>
    </div>
  );
}

export default App;
