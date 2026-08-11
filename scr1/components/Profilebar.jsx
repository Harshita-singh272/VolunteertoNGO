import React from "react";
import { LocateFixed, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import profile from "../assets/care-share.png";
import "../styles/Profilebar.css";

const Profilebar = ({
  name = "Volunteer",
  location = "Location not set",
}) => {
  const navigate = useNavigate();

  return (
    <div className="profile_bar">
      <div className="profile_location">
        <LocateFixed size={18} />

        <span>
          {location}
        </span>
      </div>

      <div className="profile_bar_right">
        <button
          type="button"
          className="notification_button"
          onClick={() => navigate("/volunteer/notifications")}
          aria-label="Notifications"
        >
          <Bell size={21} />
        </button>

        <img
          className="profile_image"
          src={profile}
          alt="profile"
        />

        <span className="profile_name">
          {name}
        </span>
      </div>
    </div>
  );
};

export default Profilebar;