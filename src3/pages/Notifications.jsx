import React, { useState } from "react";
import { Search, CalendarDays, X } from "lucide-react";

import VolunteerSidebar from "../../scr1/components/VolunteerSidebar.jsx";
import Profilebar from "../../scr1/components/Profilebar.jsx";
import NotificationCard from "../components/NotificationCard.jsx";

import { mockNotifications } from "../constants/mockNotifications.js";

import "../styles/Notifications.css";

const Notifications = () => {
  const [ngoSearch, setNgoSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredNotifications = mockNotifications.filter(
    (notification) => {
      const matchesNgo = notification.ngoName
        ?.toLowerCase()
        .includes(ngoSearch.toLowerCase());

      const matchesDate = selectedDate
        ? new Date(notification.notificationDate)
            .toISOString()
            .split("T")[0] === selectedDate
        : true;

      return matchesNgo && matchesDate;
    }
  );

  const clearFilters = () => {
    setNgoSearch("");
    setSelectedDate("");
  };

  const hasFilters =
    ngoSearch.trim() !== "" || selectedDate !== "";

  return (
    <div className="notifications_layout">
      <VolunteerSidebar />

      <main className="notifications_main">
        <Profilebar />

        <div className="notifications_page">

          <div className="notifications_heading">
            <h1>Notifications</h1>

            <p>
              Stay updated about your volunteer requests
              and messages from NGOs.
            </p>
          </div>

          <div className="notifications_filters">

            <div className="notification_filter_group">
              <label htmlFor="notificationNgoSearch">
                Search NGO
              </label>

              <div className="notification_search_box">
                <Search size={18} />

                <input
                  id="notificationNgoSearch"
                  type="text"
                  value={ngoSearch}
                  onChange={(event) =>
                    setNgoSearch(event.target.value)
                  }
                  placeholder="Search by NGO name..."
                />
              </div>
            </div>

            <div className="notification_filter_group">
              <label htmlFor="notificationDate">
                Notification Date
              </label>

              <div className="notification_date_box">
                <CalendarDays size={18} />

                <input
                  id="notificationDate"
                  type="date"
                  value={selectedDate}
                  onChange={(event) =>
                    setSelectedDate(event.target.value)
                  }
                />
              </div>
            </div>

            {hasFilters && (
              <button
                type="button"
                className="notification_clear_button"
                onClick={clearFilters}
              >
                <X size={16} />
                Clear Filters
              </button>
            )}

          </div>

          {filteredNotifications.length === 0 ? (
            <div className="notifications_empty">

              <div className="notifications_empty_icon">
                <Search size={25} />
              </div>

              <h2>
                No notifications found
              </h2>

              <p>
                No notifications match your current
                search or date filter.
              </p>

              {hasFilters && (
                <button
                  type="button"
                  className="notification_empty_clear_button"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}

            </div>
          ) : (
            <>
              <div className="notifications_result_info">
                Showing{" "}
                {filteredNotifications.length}{" "}
                {filteredNotifications.length === 1
                  ? "notification"
                  : "notifications"}
              </div>

              <div className="notifications_list">
                {filteredNotifications.map(
                  (notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                    />
                  )
                )}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default Notifications;