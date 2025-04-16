const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");

const { createCrop, getNearbyCrops } = require("../controllers/cropcontroler");

router.post("/createcrop",authenticate, createCrop);
router.get("/nearby",authenticate, getNearbyCrops);

module.exports = router;
