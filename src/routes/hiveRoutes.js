const express = require("express");
const router = express.Router();
const { createHive, getHives } = require("../controllers/hivecontroler");

router.post("/createhive", createHive);
router.get("/gethive", getHives);

module.exports = router;
