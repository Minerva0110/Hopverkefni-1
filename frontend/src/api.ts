export const API_URL = import.meta.env.VITE_API_URL;

export async function getTodos() {
  const res = await fetch(`${API_URL}/api/todos`);
  return res.json();
}
