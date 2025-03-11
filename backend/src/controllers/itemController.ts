import { Request, Response } from 'express';
import prisma from '../models/db';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.notes.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

export const getItemById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const item = await prisma.notes.findUnique({ where: { id: Number(id) } });
  
      if (!item) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }
  
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch item' });
    }
  };
  
export const createItem = async (req: Request, res: Response) => {
  try {
    const { user_id, title, content, is_public } = req.body;

    const newItem = await prisma.notes.create({
      data: { user_id, title, content, is_public }
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, is_public } = req.body;

    const updatedItem = await prisma.notes.update({
      where: { id: Number(id) },
      data: { title, content, is_public }
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.notes.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};
