import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import items from "./routes/items.js"; 
import categoryRoutes from "./routes/categories.js";
import imageRoutes from "./routes/imageRoutes.js"; 

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/items", items);
app.use("/categories", categoryRoutes);
app.use("/images", imageRoutes);

let authRoutes;
try {
  authRoutes = require("./routes/authRoutes").default;
  app.use("/auth", authRoutes);
} catch (error) {
  console.warn("⚠️ Warning: skipping auth routes.");
}

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}