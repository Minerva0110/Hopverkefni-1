import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";
export const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch {
        res.status(403).json({ error: "Invalid token." });
        return;
    }
};
export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        res.status(403).json({ error: "Forbidden: Admin access required." });
        return;
    }
    next();
};
