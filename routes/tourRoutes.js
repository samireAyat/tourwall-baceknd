import express from "express";
import multer from "multer";
import Tour from "../models/Tour.js";

const router = express.Router();

// تنظیم محل ذخیره فایل‌ها
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

// مسیر گرفتن همه تورها (GET)
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find({}); // ✅ همه تورها
    res.json(tours); // ✅ همیشه آرایه برمی‌گردونه
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📍 دریافت جزئیات تور بر اساس ID
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.json(tour);
  } catch (err) {
    console.error("❌ Error fetching tour:", err);
    res.status(500).json({ message: err.message });
  }
});


export default router;
