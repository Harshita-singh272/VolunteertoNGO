
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  MapPin,
  Users,
  User,
  Heart,
  FileText,
  Bell,
  LogOut,
  X,
} from "lucide-react";

import logo from "../../src/assets/logo_image.png";
import "../styles/VolunteerSidebar.css";

const VolunteerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/volunteer-dashboard",
    },
    {
      label: "Nearby NGOs",
      icon: MapPin,
      path: "/nearby-ngos",
    },
    {
      label: "Browse All NGOs",
      icon: Users,
      path: "/browse-ngos",
    },
    {
      label: "My Profile",
      icon: User,
      path: "/volunteer-profile",
    },
    {
      label: "My Experience",
      icon: FileText,
      path: "/volunteer/experience",
    },
    {
      label: "Saved NGOs",
      icon: Heart,
      path: "/volunteer/saved-ngo",
    },
    {
      label: "My Requests",
      icon: FileText,
      path: "/volunteer/requests",
    },
    {
      label: "Notifications",
      icon: Bell,
      path: "/volunteer/notifications",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogoutDialog(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <aside className="volunteer_sidebar">
        <div className="sidebar_brand">
          <img
            src={logo}
            alt="VolunteerConnect"
            className="sidebar_brand_image"
          />
        </div>

        <nav className="sidebar_navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              (
                item.path !== "/volunteer-dashboard" &&
                location.pathname.startsWith(item.path + "/")
              );

            return (
              <button
                key={item.path}
                type="button"
                className={`sidebar_link ${
                  isActive ? "sidebar_active" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <hr className="sidebar_divider" />

        <div className="sidebar_bottom">
          <button
            type="button"
            className="sidebar_logout"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {showLogoutDialog && (
        <div
          className="logout_overlay"
          onClick={() => setShowLogoutDialog(false)}
        >
          <div
            className="logout_dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="logout_close"
              onClick={() => setShowLogoutDialog(false)}
            >
              <X size={21} />
            </button>

            <div className="logout_icon">
              <LogOut size={36} />
            </div>

            <h2>Confirm Logout</h2>

            <p>
              Are you sure you want to log out of your volunteer account?
            </p>

            <div className="logout_actions">
              <button
                type="button"
                className="logout_cancel"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="logout_confirm"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VolunteerSidebar;
