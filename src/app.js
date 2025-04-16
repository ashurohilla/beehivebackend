const express = require("express");
const hiveRoutes = require("./routes/hiveRoutes");
const cropRoutes = require("./routes/cropRoute"); 
const errorHandler = require("./middleware//errorHandler");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(errorHandler);

connectDB();

// Routes
app.use("/api/hives", hiveRoutes);
app.use("/api/crops", cropRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
