import { Request, Response } from "express";
import prisma from "../models/db.js";

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany({
      orderBy: { due: "asc" },
    });
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

export const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await prisma.item.findUnique({ where: { id: Number(id) } });

    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    res.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const newItem = await prisma.item.create({
      data: {
        title: req.body.title,
      },
    });

    res.status(201).json(newItem); 
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Failed to create item" }); 
  }
};


export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedItem = await prisma.item.update({
      where: { id: Number(req.params.id) },
      data: { completed: req.body.completed },
    });

    res.json(updatedItem); 
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
};


export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.item.delete({ where: { id: Number(req.params.id) } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};
