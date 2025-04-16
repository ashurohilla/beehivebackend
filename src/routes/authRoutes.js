const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwtt");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { Email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ Email, password: hashed, role });
  await user.save();
  res.json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  const { Email, password } = req.body;
  const user = await User.findOne({ Email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user);
  res.json({ token });
});

module.exports = router;
