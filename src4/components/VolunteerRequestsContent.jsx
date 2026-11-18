
import React, { useMemo, useState } from "react";
import {
  Search,
  Mail,
  Phone,
  MapPin,
  Clock3,
  Check,
  X,
  Send,
  UserRound,
} from "lucide-react";

import "../styles/VolunteerRequests.css";

const initialRequests = [
  {
    id: 1,
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Delhi, India",
    message:
      "I am interested in volunteering for your educational programs. I would love to help children with their studies.",
    skills: ["Teaching", "Communication", "Event Management"],
    date: "Oct 28, 2024",
    status: "pending",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    name: "Rohit Mehta",
    email: "rohit.mehta@example.com",
    phone: "+91 87654 32109",
    location: "Gurgaon, India",
    message:
      "I have experience organizing events and would like to contribute to your community initiatives.",
    skills: ["Event Management", "Team Work"],
    date: "Oct 26, 2024",
    status: "pending",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Priya Verma",
    email: "priya.verma@example.com",
    phone: "+91 76543 21098",
    location: "Noida, India",
    message:
      "I am passionate about child welfare and would love to support your education programs.",
    skills: ["Child Education", "Mentoring"],
    date: "Oct 24, 2024",
    status: "accepted",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 4,
    name: "Karan Gupta",
    email: "karan.gupta@example.com",
    phone: "+91 65432 10987",
    location: "Faridabad, India",
    message:
      "I can help with digital content, social media and awareness campaigns.",
    skills: ["Social Media", "Graphic Design"],
    date: "Oct 22, 2024",
    status: "rejected",
    image: "https://i.pravatar.cc/150?img=11",
  },
];

const VolunteerRequestsContent = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Each request has its own unsent reply text.
  const [replies, setReplies] = useState({});

  // Local demo record of messages sent.
  const [sentMessages, setSentMessages] = useState([]);

  const counts = useMemo(
    () => ({
      all: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      accepted: requests.filter((r) => r.status === "accepted").length,
      rejected: requests.filter((r) => r.status === "rejected").length,
    }),
    [requests]
  );

  const filteredRequests = useMemo(() => {
    const term = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesFilter =
        activeFilter === "all" || request.status === activeFilter;

      const searchable = [
        request.name,
        request.email,
        request.location,
        request.message,
        ...request.skills,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!term || searchable.includes(term));
    });
  }, [requests, activeFilter, search]);

  const updateReply = (requestId, value) => {
    setReplies((previous) => ({
      ...previous,
      [requestId]: value,
    }));
  };

  // Save a message in local demo state.
  const saveMessage = (request, message, action) => {
    if (!message.trim()) return;

    setSentMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        requestId: request.id,
        volunteerName: request.name,
        message: message.trim(),
        action,
        date: new Date().toLocaleString(),
      },
    ]);
  };

  // Send a message only. The request status does not change.
  const handleSendMessage = (request) => {
    const message = replies[request.id] || "";

    if (!message.trim()) {
      alert("Please write a message first.");
      return;
    }

    saveMessage(request, message, "message");

    setReplies((previous) => ({
      ...previous,
      [request.id]: "",
    }));

    alert("Message saved in this demo.");
  };

  // Accept or reject, optionally with a message.
  const handleDecision = (request, status) => {
    const message = replies[request.id] || "";

    if (message.trim()) {
      saveMessage(request, message, status);
    }

    setRequests((previous) =>
      previous.map((item) =>
        item.id === request.id
          ? { ...item, status }
          : item
      )
    );

    setReplies((previous) => ({
      ...previous,
      [request.id]: "",
    }));
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

    return (
      <span className={`vr_status ${status}`}>
        {config[status].icon}
        {config[status].label}
      </span>
    );
  };

  return (
    <div className="vr_page">
      {/* PAGE HEADER */}
      <header className="vr_header">
        <div>
          <h1>Volunteer Requests</h1>
          <p>
            Review volunteer applications and communicate
            with volunteers.
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

      {/* FILTERS */}
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

      {/* REQUEST CARDS */}
      <section className="vr_list">
        {filteredRequests.length === 0 ? (
          <div className="vr_empty">
            <UserRound size={34} />
            <h2>No requests found</h2>
            <p>Try another search or filter.</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <article className="vr_card" key={request.id}>
              {/* VOLUNTEER DETAILS */}
              <div className="vr_volunteer">
                <img
                  src={request.image}
                  alt={request.name}
                  className="vr_avatar"
                />

                <div className="vr_person">
                  <h3>{request.name}</h3>

                  <div className="vr_contact">
                    <div>
                      <Mail size={15} />
                      <span>{request.email}</span>
                    </div>

                    <div>
                      <Phone size={15} />
                      <span>{request.phone}</span>
                    </div>

                    <div>
                      <MapPin size={15} />
                      <span>{request.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* APPLICATION DETAILS */}
              <div className="vr_middle">
                <div className="vr_message">
                  <h4>Volunteer Message</h4>
                  <p>{request.message}</p>
                </div>

                <div className="vr_skills">
                  <h4>Skills</h4>
                  <div className="vr_skill_list">
                    {request.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* RESPONSE AREA */}
              <div className="vr_response">
                <div className="vr_response_top">
                  <StatusBadge status={request.status} />

                  <span className="vr_date">
                    <Clock3 size={13} />
                    {request.date}
                  </span>
                </div>

                <label htmlFor={`reply-${request.id}`}>
                  Write a reply to {request.name}
                </label>

                <textarea
                  id={`reply-${request.id}`}
                  value={replies[request.id] || ""}
                  onChange={(event) =>
                    updateReply(request.id, event.target.value)
                  }
                  placeholder="Write your message here..."
                  rows={4}
                />

                <p className="vr_reply_hint">
                  You can send a message independently, or include it
                  with your acceptance or rejection.
                </p>

                <div className="vr_buttons">
                  <button
                    type="button"
                    className="vr_accept"
                    onClick={() => handleDecision(request, "accepted")}
                    disabled={request.status !== "pending"}
                  >
                    <Check size={16} />
                    Accept
                    {replies[request.id]?.trim() ? " + Send" : ""}
                  </button>

                  <button
                    type="button"
                    className="vr_reject"
                    onClick={() => handleDecision(request, "rejected")}
                    disabled={request.status !== "pending"}
                  >
                    <X size={16} />
                    Reject
                    {replies[request.id]?.trim() ? " + Send" : ""}
                  </button>

                  <button
                    type="button"
                    className="vr_send_button"
                    onClick={() => handleSendMessage(request)}
                    disabled={!replies[request.id]?.trim()}
                  >
                    <Send size={15} />
                    Send Message
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default VolunteerRequestsContent;
