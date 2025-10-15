import Tour from "../models/Tour.js";

// اضافه کردن تور جدید
export const addTour = async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      coverImage,
      isOrganizational,
      foodAndHome,
      tourPlan,
      otherServices,
      route,
    } = req.body;

    const newTour = new Tour({
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

    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// گرفتن لیست همه تورها
export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// گرفتن جزئیات یک تور با id
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
