
const express = require("express");
const router = express.Router();

const {
  saveNgoProfile,
  getNgoProfile,
  getAllNgos,
  getPublicNgoById,
} = require("../controllers/ngoController");

const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.get("/", getAllNgos);
router.get("/profile", authMiddleware, authorizeRoles("ngo"), getNgoProfile);
router.put("/profile", authMiddleware, authorizeRoles("ngo"), saveNgoProfile);
router.get("/:id", getPublicNgoById);

module.exports = router;
