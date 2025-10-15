
import express from "express";
import Tour from "../models/Tour.js";

const router = express.Router();

// GET all tours
router.get("/", async (req, res) => {
  const tours = await Tour.find();
  res.json(tours);
});

// POST add tour
router.post("/", async (req, res) => {
  try {
    const tour = new Tour(req.body);
    await tour.save();
    res.status(201).json(tour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update tour
router.put("/:id", async (req, res) => {
  try {
    const updated = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE tour
router.delete("/:id", async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: "Tour deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
