const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    preferredDate: {
      type: String
    },

    type: {
      type: String
    },

    days: {
      type: [String],
      default: []
    },

    startTime: {
      type: String
    },

    endTime: {
      type: String
    }
  },
  { _id: false }
);

const volunteerSchema = new mongoose.Schema({
  volunteerId: {
    type: String,
    unique: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  age: {
    type: Number,
    required: true
  },

  phone: {
    type: String,
    required: true
  },
    password: {
    type: String,
    required: true
  },

  location: {
    address: {
      type: String,
      required: true
    },

    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    }
  },

  skills: {
    type: [String],
    default: []
  },

  languages: {
    type: [String],
    default: []
  },

  availability: availabilitySchema,

  hasVehicle: {
    type: Boolean,
    default: false
  },

  physicallyFit: {
    type: Boolean,
    default: false
  },

  canWorkOutdoors: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    default: "available"
  },

  registeredAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Volunteer", volunteerSchema);