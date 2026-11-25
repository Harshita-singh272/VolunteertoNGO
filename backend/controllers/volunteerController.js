const VolunteerProfile = require("../models/VolunteerProfile");

const saveVolunteerProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      emergencyContact,
      emergencyPhone,
      gender,
      dateOfBirth,
      location,
      bio,
      interests,
      skills,
      availability,
      profileImageUrl,
      consent,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !emergencyContact ||
      !emergencyPhone ||
      !dateOfBirth ||
      !location ||
      !availability ||
      consent !== true
    ) {
      return res.status(400).json({
        message: "Please complete all required fields and accept the consent.",
      });
    }

    const profile = await VolunteerProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        user: req.user.id,
        fullName,
        phone,
        emergencyContact,
        emergencyPhone,
        gender,
        dateOfBirth,
        location,
        bio,
        interests,
        skills,
        availability,
        profileImageUrl: profileImageUrl || "",
        consent,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      message: "Volunteer profile saved successfully!",
      profile,
    });
  } catch (error) {
    console.error("Save volunteer profile error:", error);

    return res.status(500).json({
      message: "Failed to save volunteer profile.",
    });
  }
};

const getVolunteerProfile = async (req, res) => {
  try {
    const profile = await VolunteerProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Volunteer profile not found.",
      });
    }

    return res.status(200).json({
      profile,
    });
  } catch (error) {
    console.error("Get volunteer profile error:", error);

    return res.status(500).json({
      message: "Failed to fetch volunteer profile.",
    });
  }
};

module.exports = {
  saveVolunteerProfile,
  getVolunteerProfile,
};