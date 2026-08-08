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
  ChevronUp
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "../styles/VolunteerSidebar.css";


const VolunteerSidebar = () => {

  const [discoverOpen, setDiscoverOpen] = useState(false);

  const navigate = useNavigate();


  return (
    <aside className="volunteer_sidebar">

      {/* =====================================
          BRAND
      ===================================== */}

      <div className="sidebar_brand">

        <div className="sidebar_brand_logo">
          🌱
        </div>

        <div className="sidebar_brand_title">

          <h2>
            VolunteerConnect
          </h2>

          <p>
            Connect. Serve. Impact.
          </p>

        </div>

      </div>


      {/* =====================================
          NAVIGATION
      ===================================== */}

      <nav className="sidebar_navigation">


        {/* =====================================
            DASHBOARD
        ===================================== */}

        <button
          type="button"
          className="sidebar_link sidebar_active"
          onClick={() => navigate("/")}
        >

          <LayoutDashboard size={19} />

          <span>
            Dashboard
          </span>

        </button>


        {/* =====================================
            DISCOVER
        ===================================== */}

        <button
          type="button"
          className="sidebar_link sidebar_discover"
          onClick={() => setDiscoverOpen(!discoverOpen)}
        >

          <div className="sidebar_link_left">

            <Search size={19} />

            <span>
              Discover
            </span>

          </div>


          {discoverOpen ? (
            <ChevronUp size={15} />
          ) : (
            <ChevronDown size={15} />
          )}

        </button>


        {/* =====================================
            DISCOVER SUBMENU
        ===================================== */}

        {discoverOpen && (

          <div className="sidebar_submenu">


            {/* NGOs NEAR ME */}

            <button
              type="button"
              className="sidebar_submenu_link"
              onClick={() => navigate("/nearby-ngos")}
            >

              <MapPin size={15} />

              <span>
                Find NGOs near me
              </span>

            </button>


            {/* BROWSE ALL NGOs */}

            <button
              type="button"
              className="sidebar_submenu_link"
              onClick={() => navigate("/browse-ngos")}
            >

              <Building2 size={15} />

              <span>
                Browse all NGOs
              </span>

            </button>

          </div>

        )}


        {/* =====================================
            MY EXPERIENCE
        ===================================== */}

        <button
          type="button"
          className="sidebar_link"
        >

          <Award size={19} />

          <span>
            My Experience
          </span>

        </button>


        {/* =====================================
            NOTIFICATIONS
        ===================================== */}

        <button
          type="button"
          className="sidebar_link"
        >

          <Bell size={19} />

          <span>
            Notifications
          </span>

          <span className="notification_badge">
            3
          </span>

        </button>


        {/* =====================================
            DIVIDER
        ===================================== */}

        <hr className="sidebar_divider" />


        {/* =====================================
            PROFILE
        ===================================== */}

        <button
          type="button"
          className="sidebar_link"
        >

          <User size={19} />

          <span>
            My Profile
          </span>

        </button>

      </nav>


      {/* =====================================
          BOTTOM
      ===================================== */}

      <div className="sidebar_bottom">

        <hr className="sidebar_divider" />


        {/* LOGOUT */}

        <button
          type="button"
          className="sidebar_logout"
        >

          <LogOut size={19} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
};


export default VolunteerSidebar;