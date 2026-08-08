import React, { useState } from "react";
import {
  LocateFixed,
  ChevronDown,
  ChevronUp,
  Bell
} from "lucide-react";

import profile from "../assets/care-share.png";
import "../styles/Profilebar.css";

const Profilebar = () => {
  const [locationOpen, setocationOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState(false);

  return (
    <div className="profile_bar">

      <button
        className="profile_location_button"
        onClick={() => setLocationOpen(!locationOpen)}
      >
        <LocateFixed size={18} />

        <span>Bangalore, Karnataka</span>

        {locationOpen
          ? <ChevronUp size={15} />
          : <ChevronDown size={15} />
        }
      </button>

      <div className="profile_bar_right">

        <button className="notification_button">
          <Bell size={21} />

          <span className="notification_dot">
            3
          </span>
        </button>


        <img
          className="profile_image"
          src={profile}
          alt="profile"
        />


        <button
          className="profile_info_button"
          onClick={() => setProfileInfo(!profileInfo)}
        >
          <span>Harshita</span>

          {profileInfo
            ? <ChevronUp size={15} />
            : <ChevronDown size={15} />
          }
        </button>

      </div>

    </div>
  );
};

export default Profilebar;