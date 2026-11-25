
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Building2,
  Users,
  LogOut,
  X,
} from "lucide-react";

import logo from "../../src/assets/logo_image.png";
import "../styles/NgoSidebar.css";

const NgoSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setShowLogoutDialog(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <aside className="ngo_sidebar">
        <div className="ngo_sidebar_logo">
          <img
            src={logo}
            alt="VolunteerConnect"
            className="ngo_sidebar_logo_image"
          />
        </div>

        <nav className="ngo_sidebar_nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              (
                item.path !== "/ngo-dashboard" &&
                location.pathname.startsWith(item.path + "/")
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
                <Icon size={22} strokeWidth={2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="ngo_sidebar_bottom">
          <button
            type="button"
            className="ngo_sidebar_item ngo_logout"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut size={22} strokeWidth={2} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {showLogoutDialog && (
        <div
          className="ngo_logout_overlay"
          onClick={() => setShowLogoutDialog(false)}
        >
          <div
            className="ngo_logout_dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="ngo_logout_close"
              onClick={() => setShowLogoutDialog(false)}
            >
              <X size={21} />
            </button>

            <div className="ngo_logout_icon">
              <LogOut size={36} />
            </div>

            <h2>Confirm Logout</h2>

            <p>
              Are you sure you want to log out of your NGO account?
            </p>

            <div className="ngo_logout_actions">
              <button
                type="button"
                className="ngo_logout_cancel"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="ngo_logout_confirm"
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

export default NgoSidebar;
