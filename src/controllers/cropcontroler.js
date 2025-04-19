const Crop = require("../models/crop");
const haversine = require("../services/haversine");

exports.createCrop = async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    res.status(201).json({ message: "Crop added", data: crop });
  } catch (error) {
    res.status(500).json({ message: "Error saving crop", error: error.message });
  }
};

exports.getNearbyCrops = async (req, res) => {
  try {
    let { latitude, longitude, radius = 100, date = new Date() } = req.query;

    // Convert strings to float
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    radius = parseFloat(radius);
    date = new Date(date);

    // Validate input
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: "Invalid latitude or longitude" });
    }

    // Find all crops flowering on the given date
    const allCrops = await Crop.find({
      floweringStart: { $lte: date },
      floweringEnd: { $gte: date },
    });

    // Filter crops within the specified radius using Haversine formula
    const nearby = allCrops.filter((crop) =>
      haversine(
        { latitude, longitude },
        { latitude: crop.latitude, longitude: crop.longitude }
      ) <= radius
    );

    res.json(nearby);
  } catch (error) {
    console.error("Nearby Crops Error:", error);
    res.status(500).json({ message: "Error finding crops", error: error.message });
  }
};
