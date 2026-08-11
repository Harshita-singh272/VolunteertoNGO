import React from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  User,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import VolunteerSidebar from "../../scr1/components/VolunteerSidebar.jsx";
import Profilebar from "../../scr1/components/Profilebar.jsx";

import { mockVolunteerRequests } from "../constants/mockVolunteerRequests.js";

import "../styles/VolunteerRequestView.css";

const VolunteerRequestView = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();

  const savedRequests =
    JSON.parse(localStorage.getItem("volunteerRequests")) || [];

  const allRequests = [
    ...mockVolunteerRequests,
    ...savedRequests.filter(
      (savedRequest) =>
        !mockVolunteerRequests.some(
          (mockRequest) =>
            String(mockRequest.id) ===
            String(savedRequest.id)
        )
    ),
  ];

  const request = allRequests.find(
    (item) =>
      String(item.id) === String(requestId)
  );

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "accepted":
        return "Accepted";

      case "denied":
        return "Denied";

      case "message":
        return "Message Received";

      case "pending":
      default:
        return "Pending";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "request_view_status_accepted";

      case "denied":
        return "request_view_status_denied";

      case "message":
        return "request_view_status_message";

      case "pending":
      default:
        return "request_view_status_pending";
    }
  };

  if (!request) {
    return (
      <div className="volunteer_request_view_layout">
        <VolunteerSidebar />

        <main className="volunteer_request_view_main">
          <Profilebar />

          <div className="volunteer_request_view_page">
            <button
              type="button"
              className="request_view_back_button"
              onClick={() =>
                navigate("/volunteer/requests")
              }
            >
              <ArrowLeft size={17} />
              Back to My Requests
            </button>

            <section className="request_view_error_card">
              <h2>Request not found</h2>

              <p>
                The volunteer request you are trying to
                view could not be found.
              </p>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="volunteer_request_view_layout">
      <VolunteerSidebar />

      <main className="volunteer_request_view_main">
        <Profilebar />

        <div className="volunteer_request_view_page">
          <button
            type="button"
            className="request_view_back_button"
            onClick={() =>
              navigate("/volunteer/requests")
            }
          >
            <ArrowLeft size={17} />
            Back to My Requests
          </button>

          <div className="request_view_heading">
            <div>
              <h1>Volunteer Request</h1>

              <p>
                Review the details of the request you
                submitted.
              </p>
            </div>

            <span
              className={`request_view_status ${getStatusClass(
                request.status
              )}`}
            >
              {getStatusLabel(request.status)}
            </span>
          </div>

          <div className="request_view_content">
            <section className="request_view_ngo_card">
              <div className="request_view_logo">
                {request.ngoName
                  ? request.ngoName
                      .charAt(0)
                      .toUpperCase()
                  : "N"}
              </div>

              <div className="request_view_ngo_information">
                <span>
                  Organization
                </span>

                <h2>
                  {request.ngoName ||
                    "Organization"}
                </h2>

                <div className="request_view_location">
                  <MapPin size={16} />

                  <span>
                    {request.location ||
                      "Location not available"}
                  </span>
                </div>
              </div>
            </section>

            <section className="request_view_card">
              <div className="request_view_card_heading">
                <User size={20} />

                <h2>
                  Your Information
                </h2>
              </div>

              <div className="request_view_information_grid">
                <div className="request_view_information_item">
                  <span>Your Name</span>

                  <strong>
                    {request.volunteerName ||
                      "Not provided"}
                  </strong>
                </div>

                <div className="request_view_information_item">
                  <span>Availability</span>

                  <strong>
                    {request.availability ||
                      "Not provided"}
                  </strong>
                </div>

                <div className="request_view_information_item request_view_full_width">
                  <span>Skills</span>

                  <strong>
                    {request.skills ||
                      "Not provided"}
                  </strong>
                </div>
              </div>
            </section>

            <section className="request_view_card">
              <div className="request_view_card_heading">
                <Briefcase size={20} />

                <h2>
                  Request Details
                </h2>
              </div>

              <div className="request_view_information_grid">
                <div className="request_view_information_item">
                  <span>Submitted On</span>

                  <strong>
                    {formatDate(
                      request.submittedAt
                    )}
                  </strong>
                </div>

                <div className="request_view_information_item">
                  <span>Status</span>

                  <strong>
                    {getStatusLabel(
                      request.status
                    )}
                  </strong>
                </div>
              </div>
            </section>

            <section className="request_view_card">
              <div className="request_view_card_heading">
                <MessageSquare size={20} />

                <h2>
                  Why You Want to Volunteer
                </h2>
              </div>

              <div className="request_view_text">
                <p>
                  {request.reason ||
                    "No reason provided."}
                </p>
              </div>
            </section>

            <section className="request_view_card">
              <div className="request_view_card_heading">
                <MessageSquare size={20} />

                <h2>
                  Additional Message
                </h2>
              </div>

              <div className="request_view_text">
                <p>
                  {request.additionalMessage ||
                    "No additional message provided."}
                </p>
              </div>
            </section>

            <div className="request_view_footer">
              <CalendarDays size={17} />

              <span>
                Submitted on{" "}
                {formatDate(request.submittedAt)}
              </span>

              <Clock size={17} />

              <span>
                {request.status === "pending"
                  ? "Waiting for NGO response"
                  : "Request has been updated"}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolunteerRequestView;