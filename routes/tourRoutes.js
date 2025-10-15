import express from "express";
import { addTour, getTours, getTourById } from "../controllers/tourController.js";

const router = express.Router();

// اضافه کردن تور (POST /api/tours)
router.post("/", addTour);

// گرفتن لیست تورها (GET /api/tours)
router.get("/", getTours);

// گرفتن جزئیات یک تور با id (GET /api/tours/:id)
router.get("/:id", getTourById);

export default router;