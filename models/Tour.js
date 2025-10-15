import mongoose from "mongoose";

const tourSchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String, required: true },
    images: [{ type: String }],           // آرایه URL عکس‌ها
    coverImage: { type: String },         // عکس کاور
    isOrganizational: { type: Boolean, default: false },
    foodAndHome: { type: String },
    tourPlan: { type: String },
    otherServices: { type: String },
    route: { type: String },
  },
  { timestamps: true } // تاریخ ایجاد و آپدیت خودکار
);

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;

