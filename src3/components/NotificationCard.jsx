import React from "react";
import {
  Bell,
  CheckCircle2,
  XCircle,
  MessageSquare,
} from "lucide-react";

import "../styles/NotificationCard.css";

const NotificationCard = ({ notification }) => {
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

  const getNotificationType = (type) => {
    switch (type) {
      case "accepted":
        return {
          label: "Request Accepted",
          className: "notification_card_accepted",
          icon: <CheckCircle2 size={21} />,
        };

      case "denied":
        return {
          label: "Request Denied",
          className: "notification_card_denied",
          icon: <XCircle size={21} />,
        };

      case "message":
        return {
          label: "Message from NGO",
          className: "notification_card_message",
          icon: <MessageSquare size={21} />,
        };

      case "pending":
      default:
        return {
          label: "Request Submitted",
          className: "notification_card_pending",
          icon: <Bell size={21} />,
        };
    }
  };

  const notificationType = getNotificationType(
    notification.notificationType
  );

  return (
    <article
      className={`notification_card ${notificationType.className}`}
    >
      <div className="notification_card_header">
        <div className="notification_card_ngo">
          <div className="notification_card_logo">
            {notification.ngoName
              ? notification.ngoName.charAt(0).toUpperCase()
              : "N"}
          </div>

          <div className="notification_card_ngo_info">
            <h2>
              {notification.ngoName || "Organization"}
            </h2>

            <div className="notification_card_type">
              {notificationType.icon}

              <span>
                {notificationType.label}
              </span>
            </div>
          </div>
        </div>

        <div className="notification_card_date">
          <strong>
            {formatDate(notification.notificationDate)}
          </strong>

          <span>
            Requested:{" "}
            {formatDate(notification.requestSubmittedAt)}
          </span>
        </div>
      </div>

      <div className="notification_card_body">
        <p className="notification_card_message">
          {notification.message ||
            "You have received an update from this organization."}
        </p>

        {notification.notificationType === "message" &&
          notification.message && (
            <div className="notification_card_contact_note">
              <MessageSquare size={16} />

              <p>
                If you need to communicate with the NGO
                regarding this message, please contact them
                using the phone number, email, or other
                contact details provided on their NGO profile.
              </p>
            </div>
          )}
      </div>
    </article>
  );
};

export default NotificationCard;