import { Router } from 'express';
import { getItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/itemController';
import { validate } from '../middleware/validate';
import { noteSchema } from '../validation/schemas';

const router = Router();

router.get('/', getItems);

router.get('/:id', getItemById);

router.post('/', validate(noteSchema), createItem);

router.put('/:id', validate(noteSchema), updateItem);

router.delete('/:id', deleteItem);

export default router;
