const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  floweringStart: { type: Date, required: true },
  floweringEnd: { type: Date, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  recommendedHiveDensity: { type: Number, required: true },
});

module.exports = mongoose.model("Crop", cropSchema);
 