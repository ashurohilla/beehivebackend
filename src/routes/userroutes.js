const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");

const { allbeekepers } = require("../controllers/usercontroler");

router.post("/allbeekeeper",authenticate, allbeekepers);
module.exports = router;
