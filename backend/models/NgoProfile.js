
const mongoose = require("mongoose");

const ngoProfileSchema = new mongoose.Schema(
  {
    // Connects this NGO profile to its registered user account
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Organization details
    organizationName: {
      type: String,
      required: true,
      trim: true,
    },
    contactPersonName: {
      type: String,
      required: true,
      trim: true,
    },
    contactPersonRole: {
      type: String,
      default: "",
      trim: true,
    },
    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    contactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },

    // Organization links and background
    website: {
      type: String,
      default: "",
      trim: true,
    },
    socialLink: {
      type: String,
      default: "",
      trim: true,
    },
    foundedYear: {
      type: String,
      default: "",
    },
    organizationSize: {
      type: String,
      default: "",
    },
    logoUrl: {
      type: String,
      default: "",
    },

    // Mission and activities
    mission: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    programs: {
      type: String,
      default: "",
      trim: true,
    },
    volunteerHelp: {
      type: String,
      default: "",
      trim: true,
    },
    currentNeeds: {
      type: String,
      default: "",
      trim: true,
    },
    causes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NgoProfile", ngoProfileSchema);
