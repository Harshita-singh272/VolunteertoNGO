const express = require("express");
const router = express.Router();

const {
  saveVolunteerProfile,
  getVolunteerProfile,
} = require("../controllers/volunteerController");

const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Save or update the logged-in volunteer's profile
router.put(
  "/profile",
  authMiddleware,
  authorizeRoles("volunteer"),
  saveVolunteerProfile
);

// Get the logged-in volunteer's profile
router.get(
  "/profile",
  authMiddleware,
  authorizeRoles("volunteer"),
  getVolunteerProfile
);

module.exports = router;