const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    unique: true,
    required: true
  },

  taskName: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  requiredVolunteers: {
    type: Number,
    required: true,
    min: 1
  },

  location: {
    address: {
      type: String,
      required: true,
      trim: true
    },

    latitude: {
      type: Number,
      required: false
    },

    longitude: {
      type: Number,
      required: false
    }
  },

  requiredSkills: {
    type: [String],
    default: []
  },

  requiredLanguages: {
    type: [String],
    default: []
  },

  preferredDates: {
    type: [String],
    default: []
  },

  time: {
    start: {
      type: String,
      required: true
    },

    end: {
      type: String,
      required: true
    }
  },

  status: {
    type: String,
    default: "open"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Task", taskSchema);