import React from "react";

import VolunteerSidebar from "./components/VolunteerSidebar.jsx";
import DashboardContent from "./components/DashboardContent.jsx";

import "./styles/VolunteerDashboard.css";

const VolunteerDashboard = () => {
  return (
    <div className="volunteer_dashboard_layout">

      <VolunteerSidebar />

      <DashboardContent />

    </div>
  );
};

export default VolunteerDashboard;