const Hive = require("../models/hive");

exports.allbeekepers = async (req, res) => {
  try {
    const { hiveId, datePlaced, latitude, longitude, numColonies } = req.body;

    // Validate lat/lng
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ message: "Invalid latitude or longitude" });
    }

    const existing = await Hive.findOne({ hiveId });
    if (existing) {
      return res.status(400).json({ message: "Hive ID must be unique" });
    }

    const newHive = new Hive({ hiveId, datePlaced, latitude, longitude, numColonies });
    await newHive.save();

    res.status(201).json({ message: "Hive created", data: newHive });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

