router.post("/", upload.array("images"), async (req, res) => {
  try {
    console.log("📦 BODY:", req.body);
    console.log("📸 FILES:", req.files);

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
