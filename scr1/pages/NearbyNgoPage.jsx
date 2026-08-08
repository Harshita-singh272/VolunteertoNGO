import React from "react";
import VolunteerSidebar from "../components/VolunteerSidebar";
import NearbyNgos from "./NearbyNgos";

import "../styles/NearbyNgoPage.css";

const NearbyNgoPage = () => {
  return (
    <div className="nearby_layout">

      <VolunteerSidebar />

      <main className="nearby_content">
        <NearbyNgos />
      </main>

    </div>
  );
};

export default NearbyNgoPage;