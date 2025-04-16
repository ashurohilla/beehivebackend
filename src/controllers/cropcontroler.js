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
    const { latitude, longitude, radius = 100, date = new Date() } = req.query;

    const allCrops = await Crop.find({
      floweringStart: { $lte: date },
      floweringEnd: { $gte: date },
    });

    const nearby = allCrops.filter((crop) =>
      haversine({ latitude, longitude }, { latitude: crop.latitude, longitude: crop.longitude }) <= radius
    );

    res.json(nearby);
  } catch (error) {
    res.status(500).json({ message: "Error finding crops", error: error.message });
  }
};
