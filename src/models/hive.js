const mongoose = require("mongoose");

const hiveSchema = new mongoose.Schema({
  hiveId: { type: String, unique: true, required: true },
  datePlaced: { type: Date, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  numColonies: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Hive", hiveSchema);
