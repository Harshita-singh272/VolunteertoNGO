
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Phone,
  MapPin,
  Clock3,
  Check,
  X,
  UserRound,
  MessageSquare,
} from "lucide-react";

import "../styles/VolunteerRequests.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const VolunteerRequestsContent = () => {
  const [requests, setRequests] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [replies, setReplies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRequests = useCallback(async (showLoading = false) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to view volunteer requests.");
      setLoading(false);
      return;
    }

    if (showLoading) {
      setLoading(true);
    }

    try {
      const response = await fetch(
        `${API_URL}/api/requests/ngo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load volunteer requests."
        );
      }

      setRequests(data.requests || []);
      setError("");
    } catch (err) {
      setError(
        err.message || "Unable to load volunteer requests."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests(true);

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchRequests();
      }
    }, 10000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchRequests();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      clearInterval(interval);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [fetchRequests]);

  const counts = useMemo(
    () => ({
      all: requests.length,
      pending: requests.filter(
        (request) => request.status === "pending"
      ).length,
      accepted: requests.filter(
        (request) => request.status === "accepted"
      ).length,
      rejected: requests.filter(
        (request) => request.status === "rejected"
      ).length,
    }),
    [requests]
  );

  const filteredRequests = useMemo(() => {
    const term = search.trim().toLowerCase();

    return requests.filter((request) => {
      const volunteer = request.volunteerProfile || {};

      const searchable = [
        volunteer.fullName,
        volunteer.phone,
        volunteer.location,
        request.reason,
        request.additionalMessage,
        volunteer.skills,
      ]
        .join(" ")
        .toLowerCase();

      const matchesFilter =
        activeFilter === "all" ||
        request.status === activeFilter;

      return matchesFilter &&
        (!term || searchable.includes(term));
    });
  }, [requests, activeFilter, search]);

  const updateReply = (requestId, value) => {
    setReplies((previous) => ({
      ...previous,
      [requestId]: value,
    }));
  };

  const handleDecision = async (requestId, status) => {
    const token = localStorage.getItem("token");
    const message = (replies[requestId] || "").trim();

    if (!token) {
      setError("Please log in again.");
      return;
    }

    setUpdatingId(requestId);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/requests/${requestId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update the request."
        );
      }

      setRequests((previous) =>
        previous.map((request) =>
          request._id === requestId
            ? data.request
            : request
        )
      );

      setReplies((previous) => ({
        ...previous,
        [requestId]: "",
      }));

      await fetchRequests();
    } catch (err) {
      setError(
        err.message || "Unable to update the request."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const StatusBadge = ({ status }) => {
    const config = {
      pending: {
        label: "Pending",
        icon: <Clock3 size={14} />,
      },
      accepted: {
        label: "Accepted",
        icon: <Check size={14} />,
      },
      rejected: {
        label: "Rejected",
        icon: <X size={14} />,
      },
    };

    const current = config[status] || config.pending;

    return (
      <span className={`vr_status ${status}`}>
        {current.icon}
        {current.label}
      </span>
    );
  };

  return (
    <div className="vr_page">
      <header className="vr_header">
        <div>
          <h1>Volunteer Requests</h1>
          <p>
            Review volunteer applications and respond to volunteers.
          </p>
        </div>

        <div className="vr_search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search volunteers..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </header>

      <div className="vr_filters">
        {[
          ["all", "All Requests"],
          ["pending", "Pending"],
          ["accepted", "Accepted"],
          ["rejected", "Rejected"],
        ].map(([value, label]) => (
          <button
            type="button"
            key={value}
            className={activeFilter === value ? "active" : ""}
            onClick={() => setActiveFilter(value)}
          >
            {label} ({counts[value]})
          </button>
        ))}
      </div>

      {error && (
        <div className="vr_error" role="alert">
          {error}
        </div>
      )}

      <section className="vr_list">
        {loading ? (
          <div className="vr_empty">
            <p>Loading volunteer requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="vr_empty">
            <UserRound size={34} />
            <h2>No requests found</h2>
            <p>
              {requests.length === 0
                ? "You haven't received any volunteer requests yet."
                : "Try another search or filter."}
            </p>
          </div>
        ) : (
          filteredRequests.map((request) => {
            const volunteer = request.volunteerProfile || {};
            const isPending = request.status === "pending";
            const isUpdating = updatingId === request._id;
            const responseMessage =
              request.ngoResponse?.message || "";

            const skills = volunteer.skills
              ? volunteer.skills
                  .split(",")
                  .map((skill) => skill.trim())
                  .filter(Boolean)
              : [];

            return (
              <article className="vr_card" key={request._id}>
                <div className="vr_volunteer">
                  <div className="vr_avatar">
                    {(volunteer.fullName || "V")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="vr_person">
                    <h3>
                      {volunteer.fullName || "Volunteer"}
                    </h3>

                    <div className="vr_contact">
                      <div>
                        <Phone size={15} />
                        <span>
                          {volunteer.phone || "Phone not provided"}
                        </span>
                      </div>

                      <div>
                        <MapPin size={15} />
                        <span>
                          {volunteer.location || "Location not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="vr_middle">
                  <div className="vr_message">
                    <h4>Reason for Volunteering</h4>
                    <p>
                      {request.reason || "No reason provided."}
                    </p>

                    {request.additionalMessage && (
                      <>
                        <h4>Volunteer Message</h4>
                        <p>{request.additionalMessage}</p>
                      </>
                    )}
                  </div>

                  <div className="vr_skills">
                    <h4>Skills</h4>

                    <div className="vr_skill_list">
                      {skills.length > 0 ? (
                        skills.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))
                      ) : (
                        <span>No skills provided</span>
                      )}
                    </div>
                  </div>

                  <div className="vr_skills">
                    <h4>Availability</h4>
                    <p>
                      {volunteer.availability || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="vr_response">
                  <div className="vr_response_top">
                    <StatusBadge status={request.status} />

                    <span className="vr_date">
                      <Clock3 size={13} />
                      {formatDate(request.createdAt)}
                    </span>
                  </div>

                  {isPending ? (
                    <>
                      <label htmlFor={`reply-${request._id}`}>
                        Write your response
                      </label>

                      <textarea
                        id={`reply-${request._id}`}
                        value={replies[request._id] || ""}
                        onChange={(event) =>
                          updateReply(
                            request._id,
                            event.target.value
                          )
                        }
                        placeholder="Write an optional message to the volunteer..."
                        rows={4}
                        disabled={isUpdating}
                      />

                      <p className="vr_reply_hint">
                        Your message will be sent along with your decision.
                      </p>

                      <div className="vr_buttons">
                        <button
                          type="button"
                          className="vr_accept"
                          onClick={() =>
                            handleDecision(request._id, "accepted")
                          }
                          disabled={isUpdating}
                        >
                          <Check size={16} />
                          {isUpdating ? "Saving..." : "Accept"}
                        </button>

                        <button
                          type="button"
                          className="vr_reject"
                          onClick={() =>
                            handleDecision(request._id, "rejected")
                          }
                          disabled={isUpdating}
                        >
                          <X size={16} />
                          {isUpdating ? "Saving..." : "Reject"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="vr_final_response">
                      <h4>
                        <MessageSquare size={16} />
                        Your Response
                      </h4>

                      {responseMessage ? (
                        <>
                          <p>{responseMessage}</p>
                          {request.ngoResponse?.sentAt && (
                            <small>
                              Sent {formatDateTime(
                                request.ngoResponse.sentAt
                              )}
                            </small>
                          )}
                        </>
                      ) : null}
                    </div>
                  )}
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
};

export default VolunteerRequestsContent;
