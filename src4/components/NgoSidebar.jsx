import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  Users,
  LogOut,
  HeartHandshake,
} from "lucide-react";

import "../styles/NgoSidebar.css";

const NgoSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/ngo-dashboard",
    },
    {
      label: "My Organization",
      icon: Building2,
      path: "/ngo/profile",
    },
    {
      label: "Volunteer Requests",
      icon: Users,
      path: "/ngo/requests",
    },
  ];

  const handleLogout = () => {
    // Later connect this to your authentication/backend
    navigate("/");
  };

  return (
    <aside className="ngo_sidebar">

      {/* Logo */}
      <div className="ngo_sidebar_logo">

        <div className="ngo_logo_icon">
          <HeartHandshake size={28} strokeWidth={2} />
        </div>

        <div className="ngo_logo_text">
          <h2>VolunteerConnect</h2>
          <p>Connect. Serve. Impact.</p>
        </div>

      </div>


      {/* Navigation */}
      <nav className="ngo_sidebar_nav">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const isActive =
            location.pathname === item.path ||
            (
              item.path !== "/ngo-dashboard" &&
              location.pathname.startsWith(item.path)
            );

          return (
            <button
              key={item.path}
              type="button"
              className={`ngo_sidebar_item ${
                isActive ? "active" : ""
              }`}
              onClick={() => navigate(item.path)}
            >

              <Icon
                size={22}
                strokeWidth={2}
              />

              <span>{item.label}</span>

            </button>
          );
        })}

      </nav>


      {/* Bottom section */}
      <div className="ngo_sidebar_bottom">

        <button
          type="button"
          className="ngo_sidebar_item ngo_logout"
          onClick={handleLogout}
        >

          <LogOut
            size={22}
            strokeWidth={2}
          />

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
};

export default NgoSidebar;