
import React, { useEffect, useState } from "react";
import { LocateFixed, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import defaultProfile from "../assets/care-share.png";
import "../styles/Profilebar.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Profilebar = ({
  name: initialName = "Volunteer",
  location: initialLocation = "Location not set",
  profileImage: initialImage = "",
}) => {
  const navigate = useNavigate();

  const [name, setName] = useState(initialName);
  const [location, setLocation] = useState(initialLocation);
  const [profileImage, setProfileImage] = useState(initialImage);

  useEffect(() => {
    const fetchVolunteerProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/volunteers/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.profile) {
          setName(data.profile.fullName || initialName);
          setLocation(data.profile.location || initialLocation);
          setProfileImage(data.profile.profileImageUrl || initialImage);
        }
      } catch (error) {
        console.error("Unable to load volunteer profile:", error);
      }
    };

    fetchVolunteerProfile();
  }, []);

  return (
    <div className="profile_bar">
      <div className="profile_location">
        <LocateFixed size={18} />
        <span>{location}</span>
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

        <div className="profile_image_container">
          {profileImage ? (
            <img
              className="profile_image"
              src={profileImage}
              alt={`${name}'s profile`}
            />
          ) : defaultProfile ? (
            <img
              className="profile_image"
              src={defaultProfile}
              alt="Default profile"
            />
          ) : (
            <User size={24} />
          )}
        </div>

        <span className="profile_name">{name}</span>
      </div>
    </div>
  );
};

export default Profilebar;
