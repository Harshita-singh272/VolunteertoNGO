
const mongoose = require("mongoose");

const volunteerProfileSchema = new mongoose.Schema(
  {
    // Link profile to the registered user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    emergencyContact: {
      type: String,
      required: true,
      trim: true,
    },

    emergencyPhone: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      default: "",
    },

    dateOfBirth: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      default: "",
    },

    interests: {
      type: [String],
      default: [],
    },

    skills: {
      type: String,
      default: "",
    },

    availability: {
      type: String,
      required: true,
    },

    profileImageUrl: {
      type: String,
      default: "",
    },

    consent: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "VolunteerProfile",
  volunteerProfileSchema
);
