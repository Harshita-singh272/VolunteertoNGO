
import React, { useEffect, useState } from "react";
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

import "../styles/VolunteerRequestView.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const VolunteerRequestView = () => {
  const navigate = useNavigate();
  const { requestId } = useParams();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view this request.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/requests/volunteer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Could not load your request."
          );
        }

        const selectedRequest = (data.requests || []).find(
          (item) => String(item._id) === String(requestId)
        );

        if (!selectedRequest) {
          setError(
            "The volunteer request you are trying to view could not be found."
          );
        } else {
          setRequest(selectedRequest);
        }
      } catch (err) {
        setError(
          err.message ||
            "Something went wrong while loading the request."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [requestId]);

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Denied";
      default:
        return "Pending";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "request_view_status_accepted";
      case "rejected":
        return "request_view_status_denied";
      default:
        return "request_view_status_pending";
    }
  };

  if (loading || error || !request) {
    return (
      <div className="volunteer_request_view_layout">
        <VolunteerSidebar />

        <main className="volunteer_request_view_main">
          <Profilebar />

          <div className="volunteer_request_view_page">
            <button
              type="button"
              className="request_view_back_button"
              onClick={() => navigate("/volunteer/requests")}
            >
              <ArrowLeft size={17} />
              Back to My Requests
            </button>

            <section className="request_view_error_card">
              <h2>
                {loading
                  ? "Loading request..."
                  : "Request unavailable"}
              </h2>

              {!loading && (
                <p>
                  {error ||
                    "The volunteer request could not be found."}
                </p>
              )}
            </section>
          </div>
        </main>
      </div>
    );
  }

  const ngoProfile = request.ngoProfile || {};
  const ngoResponse = request.ngoResponse;

  return (
    <div className="volunteer_request_view_layout">
      <VolunteerSidebar />

      <main className="volunteer_request_view_main">
        <Profilebar />

        <div className="volunteer_request_view_page">
          <button
            type="button"
            className="request_view_back_button"
            onClick={() => navigate("/volunteer/requests")}
          >
            <ArrowLeft size={17} />
            Back to My Requests
          </button>

          <div className="request_view_heading">
            <div>
              <h1>Volunteer Request</h1>
              <p>
                Review the details of the request you submitted.
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
                {(ngoProfile.organizationName ||
                  request.ngoName ||
                  "N")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="request_view_ngo_information">
                <span>Organization</span>

                <h2>
                  {ngoProfile.organizationName ||
                    request.ngoName ||
                    "Organization"}
                </h2>

                <div className="request_view_location">
                  <MapPin size={16} />
                  <span>
                    {ngoProfile.location ||
                      "Location not available"}
                  </span>
                </div>
              </div>
            </section>

            <section className="request_view_card">
              <div className="request_view_card_heading">
                <User size={20} />
                <h2>Your Information</h2>
              </div>

              <div className="request_view_information_grid">
                <div className="request_view_information_item">
                  <span>Your Name</span>
                  <strong>
                    {request.volunteerName || "Not provided"}
                  </strong>
                </div>

                <div className="request_view_information_item">
                  <span>Availability</span>
                  <strong>
                    {request.availability || "Not provided"}
                  </strong>
                </div>

                <div className="request_view_information_item request_view_full_width">
                  <span>Skills</span>
                  <strong>
                    {request.skills || "Not provided"}
                  </strong>
                </div>
              </div>
            </section>

            <section className="request_view_card">
              <div className="request_view_card_heading">
                <Briefcase size={20} />
                <h2>Request Details</h2>
              </div>

              <div className="request_view_information_grid">
                <div className="request_view_information_item">
                  <span>Submitted On</span>
                  <strong>
                    {formatDate(request.createdAt)}
                  </strong>
                </div>

                <div className="request_view_information_item">
                  <span>Status</span>
                  <strong>
                    {getStatusLabel(request.status)}
                  </strong>
                </div>
              </div>
            </section>

            <section className="request_view_card">
              <div className="request_view_card_heading">
                <MessageSquare size={20} />
                <h2>Why You Want to Volunteer</h2>
              </div>

              <div className="request_view_text">
                <p>
                  {request.reason || "No reason provided."}
                </p>
              </div>
            </section>

            <section className="request_view_card">
              <div className="request_view_card_heading">
                <MessageSquare size={20} />
                <h2>Additional Message</h2>
              </div>

              <div className="request_view_text">
                <p>
                  {request.additionalMessage ||
                    "No additional message provided."}
                </p>
              </div>
            </section>

            {request.status !== "pending" && ngoResponse?.message && (
              <section className="request_view_card">
                <div className="request_view_card_heading">
                  <MessageSquare size={20} />
                  <h2>Response from NGO</h2>
                </div>

                <div className="request_view_text">
                  <p>{ngoResponse.message}</p>

                  {ngoResponse.sentAt && (
                    <small>
                      Sent on {formatDateTime(ngoResponse.sentAt)}
                    </small>
                  )}
                </div>
              </section>
            )}

            <div className="request_view_footer">
              <CalendarDays size={17} />

              <span>
                Submitted on {formatDate(request.createdAt)}
              </span>

              <Clock size={17} />

              <span>
                {request.status === "pending"
                  ? "Waiting for NGO response"
                  : "Request has been reviewed"}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolunteerRequestView;
