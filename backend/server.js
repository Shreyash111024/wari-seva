const Volunteer = require("./models/Volunteer");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/volunteers", async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);

    await volunteer.save();

    res.status(201).json({
      message: "Volunteer registered successfully",
      volunteer
    });
  } catch (error) {
    console.error("Volunteer registration failed:", error.message);

    res.status(400).json({
      message: "Volunteer registration failed",
      error: error.message
    });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });