import prisma from '../models/db';
export const getItems = async (req, res) => {
    try {
        const items = await prisma.note.findMany();
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};
export const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await prisma.note.findUnique({ where: { id: Number(id) } });
        if (!item) {
            res.status(404).json({ error: 'Item not found' });
            return;
        }
        res.json(item);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
};
export const createItem = async (req, res) => {
    try {
        const { userId, title, content, isPublic } = req.body;
        const newItem = await prisma.note.create({
            data: { userId, title, content, isPublic }
        });
        res.status(201).json(newItem);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
};
export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, isPublic } = req.body;
        const updatedItem = await prisma.note.update({
            where: { id: Number(id) },
            data: { title, content, isPublic }
        });
        res.json(updatedItem);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
};
export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.note.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
};
