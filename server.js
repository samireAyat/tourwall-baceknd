import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import tourRoutes from "./routes/tourRoutes.js";

dotenv.config();

// اتصال به MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// تست ساده
app.get("/", (req, res) => {
  res.send("API is running...");
});

// مسیر تورها
app.use("/api/tours", tourRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
