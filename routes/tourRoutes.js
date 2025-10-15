import express from "express";
import multer from "multer";
import Tour from "../models/Tour.js";
import fs from 'fs';
import path from 'path';

const router = express.Router();

// تنظیم محل ذخیره فایل‌ها

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// مسیر اضافه کردن تور
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const { title, description, coverImage, isOrganizational, foodAndHome, tourPlan, otherServices, route } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const images = req.files.map((f) => `/uploads/${f.filename}`);

    const tour = await Tour.create({
      title,
      description,
      images,
      coverImage,
      isOrganizational,
      foodAndHome,
      tourPlan,
      otherServices,
      route,
    });

    res.status(201).json(tour);
  } catch (err) {
    console.error("❌ Error creating tour:", err);
    res.status(400).json({ message: err.message });
  }
});
router.get("/", (req, res) => {
  res.json({ message: "Tours API works!" });
});

router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find({}); // برگرداندن همه تورها
    res.json(tours); // ✅ آرایه مستقیم
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; // ✅ حتماً این خط باید باشه
