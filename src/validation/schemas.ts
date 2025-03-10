import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]).optional(), // Defaults to "user"
});

export const noteSchema = z.object({
  user_id: z.number().int(), 
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().optional(),
  is_public: z.boolean().default(false),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
});

export const fileUploadSchema = z.object({
  mime_type: z.enum(["image/jpeg", "image/png"]),
});
