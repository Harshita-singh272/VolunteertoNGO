
import React from "react";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  MapPin,
  MessageSquare,
} from "lucide-react";

import "../styles/VolunteerRequestCard.css";

const VolunteerRequestCard = ({ request, onView }) => {
  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "accepted":
        return "Accepted";

      case "denied":
      case "rejected":
        return "Denied";

      case "pending":
      default:
        return "Pending";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "request_card_status_accepted";

      case "denied":
      case "rejected":
        return "request_card_status_denied";

      case "pending":
      default:
        return "request_card_status_pending";
    }
  };

  const ngoMessage = request.ngoResponse?.message?.trim() || "";
  const messageSentAt = request.ngoResponse?.sentAt;

  const getUpdateLabel = () => {
    if (ngoMessage) {
      return "Message sent";
    }

    switch (request.status) {
      case "accepted":
        return "Request accepted";

      case "denied":
      case "rejected":
        return "Request denied";

      default:
        return "Waiting for NGO response";
    }
  };

  return (
    <article className="volunteer_request_card">
      <div className="volunteer_request_card_top">
        <div className="volunteer_request_ngo">
          <div className="volunteer_request_logo">
            {request.ngoName
              ? request.ngoName.charAt(0).toUpperCase()
              : "N"}
          </div>

          <div className="volunteer_request_ngo_information">
            <h2>
              {request.ngoName || "Organization"}
            </h2>

            <div className="volunteer_request_location">
              <MapPin size={15} />

              <span>
                {request.location || "Location not available"}
              </span>
            </div>
          </div>
        </div>

        <span
          className={`volunteer_request_status ${getStatusClass(
            request.status
          )}`}
        >
          {getStatusLabel(request.status)}
        </span>
      </div>

      <div className="volunteer_request_meta">
        <div className="volunteer_request_meta_item">
          <CalendarDays size={16} />

          <span>
            Submitted {formatDate(request.submittedAt)}
          </span>
        </div>

        <div className="volunteer_request_meta_item">
          <Clock size={16} />

          <span>{getUpdateLabel()}</span>
        </div>
      </div>

      <div className="volunteer_request_reason">
        <span className="volunteer_request_label">
          Your reason
        </span>

        <p>
          {request.reason || "No reason provided."}
        </p>
      </div>

      {ngoMessage && (
        <div className="volunteer_request_reason">
          <span className="volunteer_request_label">
            <MessageSquare size={14} />
            Message from NGO
          </span>

          <p>{ngoMessage}</p>

          {messageSentAt && (
            <small>
              Sent {formatDate(messageSentAt)}
            </small>
          )}
        </div>
      )}

      <div className="volunteer_request_card_bottom">
        <button
          type="button"
          className="volunteer_request_view_button"
          onClick={() => onView(request.id)}
        >
          View Request

          <ChevronRight size={17} />
        </button>
      </div>
    </article>
  );
};

export default VolunteerRequestCard;
