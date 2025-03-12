import { useState, useEffect } from "react";
import "./App.css";

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  tags?: string[];
  category?: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // 📌 Sækja gögn frá backend þegar síðan opnast
  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Villa við að sækja gögn:", error));
  }, []);

  // 📌 Birta gögnin á síðunni
  return (
    <div className="App">
      <h1>Verkefnalistinn</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong>
            {todo.description && <p>{todo.description}</p>}
            {todo.dueDate && <p>{new Date(todo.dueDate).toLocaleDateString()}</p>}
            {todo.tags && todo.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
            {todo.category && <span className="category">{todo.category}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
