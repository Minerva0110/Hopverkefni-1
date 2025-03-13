import { Request, Response } from "express";
import prisma from "../models/db.js";

// Sækja öll verkefni (items)
export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany({
      orderBy: { due: "asc" }, // Sýna næstu verkefni fyrst
    });
    res.json(items);
  } catch (error) {
    console.error("⚠️ Villa við að sækja verkefni:", error);
    res.status(500).json({ error: "Mistókst að sækja verkefni" });
  }
};

// Sækja eitt verkefni eftir ID
export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.findUnique({ where: { id: Number(id) } });

    if (!item) {
      return res.status(404).json({ error: "Verkefni ekki fundið" });
    }

    res.json(item);
  } catch (error) {
    console.error("⚠️ Villa við að sækja eitt verkefni:", error);
    res.status(500).json({ error: "Mistókst að sækja verkefni" });
  }
};

// Búa til nýtt verkefni
export const createItem = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, due } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Titill má ekki vera auður" });
    }

    const newItem = await prisma.item.create({
      data: {
        title,
        description: description || "",
        priority: priority || false,
        due: due ? new Date(due) : null,
        completed: false, // Byrjar óklárað
      },
    });

    console.log("Verkefni búið til:", newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Villa við að búa til verkefni:", error);
    res.status(500).json({ error: "Mistókst að búa til verkefni" });
  }
};

// Uppfæra verkefni (hægt að haka við sem klárað)
export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, priority, completed } = req.body;

    const existingItem = await prisma.item.findUnique({ where: { id: Number(id) } });
    if (!existingItem) {
      return res.status(404).json({ error: "Verkefni ekki fundið" });
    }

    const updatedItem = await prisma.item.update({
      where: { id: Number(id) },
      data: {
        title: title ?? existingItem.title,
        description: description ?? existingItem.description,
        priority: priority ?? existingItem.priority,
        completed: completed ?? existingItem.completed,
      },
    });

    console.log("Verkefni uppfært:", updatedItem);
    res.json(updatedItem);
  } catch (error) {
    console.error("Villa við að uppfæra verkefni:", error);
    res.status(500).json({ error: "Mistókst að uppfæra verkefni" });
  }
};

// 🗑 Eyða verkefni
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingItem = await prisma.item.findUnique({ where: { id: Number(id) } });
    if (!existingItem) {
      return res.status(404).json({ error: "Verkefni ekki fundið" });
    }

    await prisma.item.delete({ where: { id: Number(id) } });
    console.log("🗑 Verkefni eytt með ID:", id);
    res.status(204).send();
  } catch (error) {
    console.error("Villa við að eyða verkefni:", error);
    res.status(500).json({ error: "Mistókst að eyða verkefni" });
  }
};
