import React, { useState } from "react";
import StatCard from "./components/StatCard.jsx";
import "./styles/VolunteerDashboard.css";
import { statCards } from "./constants/dashboardConstants.js";
import {University ,MapPinSearch } from 'lucide-react'
import ExploreCard from "./components/ExploreCard.jsx";
import ngonear from "./assets/ngonear.png"
import ngobrowse from "./assets/ngobrowse.png"
import NgoCard from "./components/NgoCard.jsx";
import { nearbyNgos } from "./constants/ngoConstants.js";

const VolunteerDashboard = () => {

  const [stats, setStats] = useState({
    verifiedHours: 0,
    ngosSupported:0,
    requestsPending:0,
    certificatesEarned:0,
  });

  return (
    <div className="volunteer_dashboard">

      <div className="dashboard_greeting">
        <h1>Good evening, Harshita! 👋</h1>

        <p>
          Small actions today, big change tomorrow.
        </p>
      </div>

      <div className="dashboard_stats">

        {statCards.map((card) => {

          const Icon = card.icon;

          return (
            <StatCard
              key={card.statKey}
              icon={
                <Icon size={28} color="#2c482d" strokeWidth={2}/>
              }
              number={stats[card.statKey]}
              title={card.title}
              caption={card.caption}
              buttonText={card.buttonText}
            />
          );
        })}
      </div>

      <hr className="dashboard_divider" />

      <div className = "dashboard_explore">
      <ExploreCard
        title="Find NGOs near me"
        description="Discover NGOs working on causes close to your location."
        buttonText="Explore Nearby NGOs"
        icon={<MapPinSearch size={22} color="#2c482d" />}
        image={ngonear}
        variant="green"
      />

      <ExploreCard
        title="Browse all NGOs"
        description="Explore organizations across various causes and locations."
        buttonText="Browse All NGOs"
        icon={<University size={22} color="#2c482d" />}
        image={ngobrowse}
        variant="cream"
      />
      </div>
        <div className="nearby_ngo_cards">

          {nearbyNgos.map((ngo) => (
            <NgoCard
              key={ngo.id}
              organizationName={ngo.organizationName}
              logo={ngo.logo}
              description={ngo.description}
              causes={ngo.causes}
              distance={ngo.distance} km
              onClick={() => {
                console.log("Opening NGO:", ngo.id);
              }}
            />
          ))}

        </div>
    </div>
  );
};

export default VolunteerDashboard;