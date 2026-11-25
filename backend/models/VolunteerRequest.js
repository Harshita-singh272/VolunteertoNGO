
const mongoose = require("mongoose");

const ngoResponseSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      trim: true,
      default: "",
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const volunteerRequestSchema = new mongoose.Schema(
  {
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    volunteerProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VolunteerProfile",
      required: true,
    },
    ngoProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NgoProfile",
      required: true,
    },
    ngoName: {
      type: String,
      required: true,
      trim: true,
    },
    volunteerName: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: String,
      default: "",
    },
    availability: {
      type: String,
      default: "",
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    additionalMessage: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    respondedAt: {
      type: Date,
      default: null,
    },
    ngoResponse: {
      type: ngoResponseSchema,
      default: undefined,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "VolunteerRequest",
  volunteerRequestSchema
);
