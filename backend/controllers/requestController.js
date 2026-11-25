
const VolunteerRequest = require("../models/VolunteerRequest");
const VolunteerProfile = require("../models/VolunteerProfile");
const NgoProfile = require("../models/NgoProfile");
const mongoose = require("mongoose");

const createRequest = async (req, res) => {
  try {
    const { ngoId, ngoEmail, reason, additionalMessage } = req.body;

    if ((!ngoId && !ngoEmail) || !reason?.trim()) {
      return res.status(400).json({
        message: "Organization and reason are required.",
      });
    }

    const volunteerProfile = await VolunteerProfile.findOne({
      user: req.user.id,
    });

    if (!volunteerProfile) {
      return res.status(404).json({
        message: "Please complete your volunteer profile first.",
      });
    }

    let ngoProfile;

    if (ngoId) {
      if (!mongoose.Types.ObjectId.isValid(ngoId)) {
        return res.status(400).json({
          message: "Invalid organization ID.",
        });
      }

      ngoProfile = await NgoProfile.findById(ngoId).populate(
        "user",
        "username email role"
      );
    } else {
      ngoProfile = await NgoProfile.findOne({
        contactEmail: ngoEmail.toLowerCase().trim(),
      }).populate("user", "username email role");
    }

    if (!ngoProfile || !ngoProfile.user || ngoProfile.user.role !== "ngo") {
      return res.status(404).json({
        message: "NGO not found.",
      });
    }

    if (String(ngoProfile.user._id) === String(req.user.id)) {
      return res.status(400).json({
        message: "You cannot send a request to your own NGO.",
      });
    }

    const existingRequest = await VolunteerRequest.findOne({
      volunteer: req.user.id,
      ngo: ngoProfile.user._id,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(409).json({
        message: "You already have a pending request for this NGO.",
      });
    }

    const request = await VolunteerRequest.create({
      volunteer: req.user.id,
      ngo: ngoProfile.user._id,
      volunteerProfile: volunteerProfile._id,
      ngoProfile: ngoProfile._id,
      ngoName: ngoProfile.organizationName,
      volunteerName: volunteerProfile.fullName,
      skills: volunteerProfile.skills || "",
      availability: volunteerProfile.availability || "",
      reason: reason.trim(),
      additionalMessage: additionalMessage?.trim() || "",
      status: "pending",
    });

    return res.status(201).json({
      message: "Volunteer request submitted successfully.",
      request,
    });
  } catch (error) {
    console.error("Create request error:", error);
    return res.status(500).json({
      message: "Unable to submit volunteer request.",
    });
  }
};

const getVolunteerRequests = async (req, res) => {
  try {
    const requests = await VolunteerRequest.find({
      volunteer: req.user.id,
    })
      .populate("ngoProfile", "organizationName location logoUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({ requests });
  } catch (error) {
    console.error("Get volunteer requests error:", error);
    return res.status(500).json({
      message: "Unable to load your requests.",
    });
  }
};

const getNgoRequests = async (req, res) => {
  try {
    const requests = await VolunteerRequest.find({
      ngo: req.user.id,
    })
      .populate(
        "volunteerProfile",
        "fullName phone location skills availability profileImageUrl"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({ requests });
  } catch (error) {
    console.error("Get NGO requests error:", error);
    return res.status(500).json({
      message: "Unable to load volunteer requests.",
    });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, message } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be accepted or rejected.",
      });
    }

    if (message !== undefined && typeof message !== "string") {
      return res.status(400).json({
        message: "Response message must be text.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({
        message: "Invalid request ID.",
      });
    }

    const responseMessage =
      typeof message === "string" ? message.trim() : "";

    const update = {
      $set: {
        status,
        respondedAt: new Date(),
      },
    };

    if (responseMessage) {
      update.$set.ngoResponse = {
        message: responseMessage,
        sentAt: new Date(),
      };
    } else {
      update.$unset = {
        ngoResponse: 1,
      };
    }

    const request = await VolunteerRequest.findOneAndUpdate(
      {
        _id: requestId,
        ngo: req.user.id,
        status: "pending",
      },
      update,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!request) {
      const existingRequest = await VolunteerRequest.findOne({
        _id: requestId,
        ngo: req.user.id,
      });

      if (!existingRequest) {
        return res.status(404).json({
          message: "Volunteer request not found.",
        });
      }

      return res.status(409).json({
        message: "This request has already been reviewed.",
      });
    }

    return res.status(200).json({
      message: `Request ${status} successfully.`,
      request,
    });
  } catch (error) {
    console.error("Update request status error:", error);
    return res.status(500).json({
      message: "Unable to update request status.",
    });
  }
};

const getVolunteerNotifications = async (req, res) => {
  try {
    const requests = await VolunteerRequest.find({
      volunteer: req.user.id,
      status: { $in: ["accepted", "rejected"] },
    }).sort({ respondedAt: -1, updatedAt: -1 });

    const notifications = [];

    requests.forEach((request) => {
      const notificationDate =
        request.respondedAt || request.updatedAt || request.createdAt;

      const requestDate = request.createdAt;

      if (request.status === "accepted") {
        notifications.push({
          id: `${request._id}-accepted`,
          requestId: request._id,
          ngoName: request.ngoName,
          type: "accepted",
          message: "Your volunteer request has been accepted. We would be happy to have you join us.",
          notificationDate,
          requestDate,
        });
      }

      if (request.status === "rejected") {
        notifications.push({
          id: `${request._id}-denied`,
          requestId: request._id,
          ngoName: request.ngoName,
          type: "denied",
          message: "Thank you for your interest. Unfortunately, we are unable to accept your request at this time.",
          notificationDate,
          requestDate,
        });
      }

      const responseMessage = request.ngoResponse?.message?.trim();

      if (responseMessage) {
        notifications.push({
          id: `${request._id}-message`,
          requestId: request._id,
          ngoName: request.ngoName,
          type: "message",
          message: responseMessage,
          notificationDate:
            request.ngoResponse.sentAt || notificationDate,
          requestDate,
        });
      }
    });

    notifications.sort(
      (a, b) =>
        new Date(b.notificationDate) - new Date(a.notificationDate)
    );

    return res.status(200).json({
      notifications,
    });
  } catch (error) {
    console.error("Get volunteer notifications error:", error);
    return res.status(500).json({
      message: "Unable to load notifications.",
    });
  }
};

module.exports = {
  createRequest,
  getVolunteerRequests,
  getNgoRequests,
  updateRequestStatus,
  getVolunteerNotifications,
};
