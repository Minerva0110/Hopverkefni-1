import { Router } from 'express';
import { getItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/itemController';
import { validate } from '../middleware/Validate';
import { noteSchema } from '../validation/schemas';

const router = Router();

// GET /items - Fetch all notes
router.get('/', getItems);

router.get('/:id', getItemById);

// POST /items - Create a new note (Requires validation)
router.post('/', validate(noteSchema), createItem);

// PUT /items/:id - Update a note (Requires validation)
router.put('/:id', validate(noteSchema), updateItem);

// DELETE /items/:id - Delete a note
router.delete('/:id', deleteItem);

export default router;
