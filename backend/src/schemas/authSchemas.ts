import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]).optional(),
});

export const registerSchema = userSchema.pick({
    username: true,
    email: true,
    password: true,
    role: true,
  });
export const loginSchema = userSchema.pick({
  username: true,
  password: true,
});
