
import React from "react";

import NgoSidebar from "../components/NgoSidebar";
import VolunteerRequestsContent from "../components/VolunteerRequestsContent";

import "../styles/VolunteerRequestsPage.css";

const VolunteerRequests = () => {
  return (
    <div className="ngo_requests_layout">
      <NgoSidebar />

      <main className="ngo_requests_main">
        <VolunteerRequestsContent />
      </main>
    </div>
  );
};

export default VolunteerRequests;
