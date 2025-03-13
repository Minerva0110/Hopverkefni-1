import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface User {
  id: number;
  email: string;
  role: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setError("Mistókst að hlaða inn notendum."));
  }, []);

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) throw new Error("Ekki tókst að uppfæra notanda.");

      setUsers(users.map((user) => (user.id === id ? { ...user, role: newRole } : user)));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Ertu viss um að þú viljir eyða þessum notanda?")) return;

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("⚠️ Ekki tókst að eyða notanda.");

      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Hlutverk</th>
            <th>Aðgerðir</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>🗑️ Eyða</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="logout-btn" onClick={onLogout}>
        Útskrá
      </button>
    </div>
  );
};
export default AdminDashboard;