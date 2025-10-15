import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import tourRoutes from "./routes/tourRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

// تست ساده
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// مسیر تورها
app.use("/api/tours", tourRoutes);

const PORT = process.env.PORT || 5000;

// ✅ صبر تا DB وصل بشه و بعد سرور بالا بیاد
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
