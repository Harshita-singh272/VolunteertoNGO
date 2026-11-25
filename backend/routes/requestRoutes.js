
const express = require("express");
const router = express.Router();

const {
  createRequest,
  getVolunteerRequests,
  getNgoRequests,
  updateRequestStatus,
  getVolunteerNotifications,
} = require("../controllers/requestController");

const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("volunteer"),
  createRequest
);

router.get(
  "/volunteer",
  authMiddleware,
  authorizeRoles("volunteer"),
  getVolunteerRequests
);

router.get(
  "/notifications",
  authMiddleware,
  authorizeRoles("volunteer"),
  getVolunteerNotifications
);

router.get(
  "/ngo",
  authMiddleware,
  authorizeRoles("ngo"),
  getNgoRequests
);

router.patch(
  "/:requestId/status",
  authMiddleware,
  authorizeRoles("ngo"),
  updateRequestStatus
);

module.exports = router;
