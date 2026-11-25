
const mongoose = require("mongoose");
const NgoProfile = require("../models/NgoProfile");

const saveNgoProfile = async (req, res) => {
  try {
    const {
      organizationName,
      contactPersonName,
      contactEmail,
      contactPhone,
      location,
      mission,
      causes,
    } = req.body;

    if (
      !organizationName ||
      !contactPersonName ||
      !contactEmail ||
      !contactPhone ||
      !location ||
      !mission ||
      !Array.isArray(causes) ||
      causes.length === 0
    ) {
      return res.status(400).json({
        message: "Please complete all required NGO profile fields.",
      });
    }

    const profile = await NgoProfile.findOneAndUpdate(
      { user: req.user.id },
      { user: req.user.id, ...req.body },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      message: "NGO profile saved successfully.",
      profile,
    });
  } catch (error) {
    console.error("Save NGO profile error:", error);
    return res.status(500).json({
      message: "Unable to save NGO profile.",
    });
  }
};

const getNgoProfile = async (req, res) => {
  try {
    const profile = await NgoProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        message: "NGO profile not found.",
      });
    }

    return res.status(200).json({ profile });
  } catch (error) {
    console.error("Get NGO profile error:", error);
    return res.status(500).json({
      message: "Unable to load NGO profile.",
    });
  }
};

const getAllNgos = async (req, res) => {
  try {
    const ngos = await NgoProfile.find()
      .select(
        "organizationName location logoUrl mission description causes website volunteerHelp currentNeeds createdAt"
      )
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ ngos });
  } catch (error) {
    console.error("Get all NGOs error:", error);
    return res.status(500).json({
      message: "Unable to load organizations.",
    });
  }
};

const getPublicNgoById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid organization ID.",
      });
    }

    const ngo = await NgoProfile.findById(req.params.id)
      .select(
        "organizationName contactPersonName contactPersonRole contactEmail contactPhone location website socialLink foundedYear organizationSize logoUrl mission description programs volunteerHelp currentNeeds causes createdAt"
      )
      .lean();

    if (!ngo) {
      return res.status(404).json({
        message: "NGO not found.",
      });
    }

    return res.status(200).json({ ngo });
  } catch (error) {
    console.error("Get public NGO error:", error);
    return res.status(500).json({
      message: "Unable to load organization.",
    });
  }
};

module.exports = {
  saveNgoProfile,
  getNgoProfile,
  getAllNgos,
  getPublicNgoById,
};
