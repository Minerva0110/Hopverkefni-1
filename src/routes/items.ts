import { Router, Request, Response } from 'express';
import data from './data/data.json';

const router = Router();

// GET /items
router.get('/', (req: Request, res: Response) => {

  const items = data.items;
  return res.json(items);
});

export default router;
