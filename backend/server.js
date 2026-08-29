const Volunteer = require("./models/Volunteer");
const Task = require("./models/Task");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// =========================
// VOLUNTEER REGISTRATION
// =========================

app.post("/api/volunteers", async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);

    await volunteer.save();

    res.status(201).json({
      message: "Volunteer registered successfully",
      volunteer
    });

  } catch (error) {

    console.error(
      "Volunteer registration failed:",
      error.message
    );

    res.status(400).json({
      message: "Volunteer registration failed",
      error: error.message
    });
  }
});


// =========================
// TASK CREATION
// =========================

app.post("/api/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);

    await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {

    console.error(
      "Task creation failed:",
      error.message
    );

    res.status(400).json({
      message: "Task creation failed",
      error: error.message
    });
  }
});


// =========================
// VOLUNTEER LOGIN
// =========================

app.post("/api/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "Phone number and password are required"
      });
    }

    const volunteer = await Volunteer.findOne({
      phone: phone
    });

    if (!volunteer) {
      return res.status(401).json({
        message: "Invalid phone number or password"
      });
    }

    if (volunteer.password !== password) {
      return res.status(401).json({
        message: "Invalid phone number or password"
      });
    }

    res.status(200).json({
      message: "Login successful",

      volunteer: {
        volunteerId: volunteer.volunteerId,
        name: volunteer.name,
        phone: volunteer.phone,
        status: volunteer.status
      }
    });

  } catch (error) {

    console.error(
      "Login failed:",
      error.message
    );

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
});


// =========================
// DATABASE CONNECTION
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB connected successfully");

    app.listen(5000, () => {
      console.log(
        "Server running on http://localhost:5000"
      );
    });

  })
  .catch((error) => {

    console.error(
      "MongoDB connection failed:",
      error.message
    );

  });