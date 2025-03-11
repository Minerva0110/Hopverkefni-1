import { Router } from "express";
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController";
import { authenticate, isAdmin } from "../middleware/auth";

const router = Router();

router.get("/", authenticate, getCategories);
router.get("/:id", authenticate, getCategoryById);
router.post("/", authenticate, createCategory);
router.put("/:id", authenticate, updateCategory);
router.delete("/:id", authenticate, isAdmin, deleteCategory);

export default router;
