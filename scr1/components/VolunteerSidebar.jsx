import React, { useState } from "react";
import {
  LayoutDashboard,
  Search,
  MapPin,
  Building2,
  Award,
  Bell,
  User,
  LogOut,
  ChevronDown,
  ChevronUp,
  Heart,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../styles/VolunteerSidebar.css";

const VolunteerSidebar = () => {
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <aside className="volunteer_sidebar">
      <div className="sidebar_brand">
        <div className="sidebar_brand_logo">
          🌱
        </div>

        <div className="sidebar_brand_title">
          <h2>VolunteerConnect</h2>
          <p>Connect. Serve. Impact.</p>
        </div>
      </div>

      <nav className="sidebar_navigation">
        <button
          type="button"
          className="sidebar_link sidebar_active"
          onClick={() => navigate("/")}
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </button>

        <button
          type="button"
          className="sidebar_link sidebar_discover"
          onClick={() => setDiscoverOpen(!discoverOpen)}
        >
          <div className="sidebar_link_left">
            <Search size={19} />
            <span>Discover</span>
          </div>

          {discoverOpen ? (
            <ChevronUp size={15} />
          ) : (
            <ChevronDown size={15} />
          )}
        </button>

        {discoverOpen && (
          <div className="sidebar_submenu">
            <button
              type="button"
              className="sidebar_submenu_link"
              onClick={() => navigate("/nearby-ngos")}
            >
              <MapPin size={15} />
              <span>Find NGOs near me</span>
            </button>

            <button
              type="button"
              className="sidebar_submenu_link"
              onClick={() => navigate("/browse-ngos")}
            >
              <Building2 size={15} />
              <span>Browse all NGOs</span>
            </button>
          </div>
        )}

        <button
          type="button"
          className="sidebar_link"
          onClick={() => navigate("/volunteer/experience")}
        >
          <Award size={19} />
          <span>My Experience</span>
        </button>

        <button
          type="button"
          className="sidebar_link"
          onClick={() => navigate("/volunteer/requests")}
        >
          <FileText size={19} />
          <span>My Requests</span>
        </button>

        <button
          type="button"
          className="sidebar_link"
          onClick={() => navigate("/volunteer/notifications")}
        >
          <Bell size={19} />
          <span>Notifications</span>

          <span className="notification_badge">
            3
          </span>
        </button>

        <button
          type="button"
          className="sidebar_link"
          onClick={() => navigate("/volunteer/saved-ngo")}
        >
          <Heart size={19} />
          <span>Saved</span>
        </button>

        <hr className="sidebar_divider" />

        <button
          type="button"
          className="sidebar_link"
          onClick={() => navigate("/volunteer-profile")}
        >
          <User size={19} />
          <span>My Profile</span>
        </button>
      </nav>

      <div className="sidebar_bottom">
        <hr className="sidebar_divider" />

        <button
          type="button"
          className="sidebar_logout"
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default VolunteerSidebar;