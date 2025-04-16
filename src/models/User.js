
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "beekeeper"], default: "beekeeper" },
});

module.exports = mongoose.model("User", userSchema);