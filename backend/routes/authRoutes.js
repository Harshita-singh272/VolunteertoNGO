
const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getMe,
} = require("../controllers/authController");

const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");


// PUBLIC ROUTES
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);


// AUTHENTICATION VERIFICATION
router.get("/verify", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Authentication successful!",
    user: req.user,
  });
});


// VOLUNTEER-ONLY ROUTE
router.get(
  "/volunteer-only",
  authMiddleware,
  authorizeRoles("volunteer"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome, Volunteer! Access granted.",
      user: req.user,
    });
  }
);


// NGO-ONLY ROUTE
router.get(
  "/ngo-only",
  authMiddleware,
  authorizeRoles("ngo"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome, NGO! Access granted.",
      user: req.user,
    });
  }
);

module.exports = router;
