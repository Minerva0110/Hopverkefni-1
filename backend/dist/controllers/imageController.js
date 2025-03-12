import cloudinary from "../config/cloudinary.js";
import multer from "multer";
import fs from "fs";
const upload = multer({ dest: "uploads/" });
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: "No image uploaded" });
            return;
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "your-folder",
        });
        fs.unlinkSync(req.file.path);
        res.json({ imageUrl: result.secure_url });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to upload image" });
    }
};
