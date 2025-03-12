import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/auth.js";
import db from "../models/db.js";

const router = Router();

router.get("/users", authenticate, isAdmin, async (req, res, next) => {
  try {
    const users = await db.user.findMany({ select: { id: true, email: true, role: true } });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.patch("/users/:id/role", authenticate, isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      res.status(400).json({ error: "Ógilt hlutverk!" });
      return;
    }

    const user = await db.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      res.status(404).json({ error: "Notandi ekki fundinn!" });
      return;
    }

    await db.user.update({ where: { id: Number(id) }, data: { role } });
    res.json({ message: `Notandi ${user.email} uppfærður í ${role}!` });
  } catch (error) {
    next(error);
  }
});

router.delete("/users/:id", authenticate, isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await db.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      res.status(404).json({ error: "Notandi ekki fundinn!" });
      return;
    }

    await db.user.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: `Notandi ${user.email} var eytt!` });
  } catch (error) {
    next(error);
  }
});

export default router;
