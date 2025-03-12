import { useState, useEffect } from "react";
import "./App.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // 📌 Sækja verkefni frá backend þegar síðan opnast
  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Villa við að sækja gögn:", error));
  }, []);

  // 📌 Bæta nýju verkefni við backend
  const addTodo = () => {
    if (newTodo.trim() === "") return;

    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    })
      .then((res) => res.json())
      .then((newItem) => setTodos([...todos, newItem]));

    setNewTodo("");
  };

  // 📌 Merkja verkefni sem klárað / endurvekja
  const toggleComplete = (id: number) => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todos.find((todo) => todo.id === id)?.completed }),
    })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      });
  };

  // 📌 Eyða verkefni
  const deleteTodo = (id: number) => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
    }).then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  return (
    <div className="App">
      <h1>Minnislistakerfi</h1>

      {/* Input og hnappur fyrir ný verkefni */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Skrifaðu nýtt minnisatriði..."
      />
      <button onClick={addTodo}>Bæta við</button>

      {/* Listi af verkefnum */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.title}
            <button onClick={() => toggleComplete(todo.id)}>
              {todo.completed ? "Endurvekja" : "Klára"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Eyða</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
