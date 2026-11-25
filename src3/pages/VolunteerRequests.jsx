
import React, { useEffect, useState } from "react";
import { Search, CalendarDays, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import VolunteerSidebar from "../../scr1/components/VolunteerSidebar.jsx";
import Profilebar from "../../scr1/components/Profilebar.jsx";
import VolunteerRequestCard from "../components/VolunteerRequestCard.jsx";

import "../styles/VolunteerRequests.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const VolunteerRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [ngoSearch, setNgoSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view your requests.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/requests/volunteer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load your requests.");
        }

        setRequests(data.requests || []);
      } catch (err) {
        setError(err.message || "Something went wrong while loading requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleViewRequest = (requestId) => {
    navigate(`/volunteer/request/view/${requestId}`);
  };

  const filteredRequests = requests.filter((request) => {
    const ngoName = request.ngoProfile?.organizationName || request.ngoName || "";

    const matchesNgo = ngoName
      .toLowerCase()
      .includes(ngoSearch.toLowerCase());

    const matchesDate = selectedDate
      ? new Date(request.createdAt).toISOString().split("T")[0] === selectedDate
      : true;

    return matchesNgo && matchesDate;
  });

  const clearFilters = () => {
    setNgoSearch("");
    setSelectedDate("");
  };

  const hasFilters = ngoSearch.trim() !== "" || selectedDate !== "";

  const cardRequests = filteredRequests.map((request) => ({
    ...request,
    id: request._id,
    ngoName: request.ngoProfile?.organizationName || request.ngoName,
    location: request.ngoProfile?.location || "",
    volunteerName: request.volunteerName,
    submittedAt: request.createdAt,
    status: request.status === "rejected" ? "denied" : request.status,
  }));

  return (
    <div className="volunteer_requests_layout">
      <VolunteerSidebar />

      <main className="volunteer_requests_main">
        <Profilebar />

        <div className="volunteer_requests_page">
          <div className="volunteer_requests_heading">
            <h1>My Requests</h1>
            <p>
              Track the volunteer requests you have submitted to NGOs.
            </p>
          </div>

          <div className="volunteer_requests_filters">
            <div className="volunteer_request_filter_group">
              <label htmlFor="ngoSearch">Search NGO</label>

              <div className="volunteer_request_search_box">
                <Search size={18} />
                <input
                  id="ngoSearch"
                  type="text"
                  value={ngoSearch}
                  onChange={(event) => setNgoSearch(event.target.value)}
                  placeholder="Search by NGO name..."
                />
              </div>
            </div>

            <div className="volunteer_request_filter_group">
              <label htmlFor="requestDate">Request Date</label>

              <div className="volunteer_request_date_box">
                <CalendarDays size={18} />
                <input
                  id="requestDate"
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                />
              </div>
            </div>

            {hasFilters && (
              <button
                type="button"
                className="volunteer_request_clear_button"
                onClick={clearFilters}
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>

          {error && (
            <div className="volunteer_requests_empty" role="alert">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="volunteer_requests_empty">
              <p>Loading your requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="volunteer_requests_empty">
              <h2>No requests yet</h2>
              <p>
                When you request to volunteer with an NGO, your requests will
                appear here.
              </p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="volunteer_requests_empty">
              <h2>No matching requests</h2>
              <p>
                No volunteer requests match your current search or date filter.
              </p>

              {hasFilters && (
                <button
                  type="button"
                  className="volunteer_request_empty_clear"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="volunteer_requests_result_info">
                <span>
                  Showing {filteredRequests.length}{" "}
                  {filteredRequests.length === 1 ? "request" : "requests"}
                </span>
              </div>

              <div className="volunteer_requests_list">
                {cardRequests.map((request) => (
                  <VolunteerRequestCard
                    key={request.id}
                    request={request}
                    onView={handleViewRequest}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default VolunteerRequests;
