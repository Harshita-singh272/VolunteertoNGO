
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ExploreCard from "./ExploreCard.jsx";
import NgoCard from "./NgoCard.jsx";
import GettingStartedCard from "./GettingStartedCard.jsx";
import Greeting from "./Greeting.jsx";
import Profilebar from "./Profilebar.jsx";

import "../styles/DashboardContent.css";

import { nearbyNgos } from "../constants/ngoConstants.js";

import {
  University,
  MapPinSearch,
  ArrowRightFromLine,
} from "lucide-react";

import ngonear from "../assets/ngonear.png";
import ngobrowse from "../assets/ngobrowse.png";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const DashboardContent = () => {
  const navigate = useNavigate();

  const [volunteerName, setVolunteerName] = useState("Volunteer");
  const [volunteerLocation, setVolunteerLocation] = useState(
    "Location not set"
  );
  const [volunteerImage, setVolunteerImage] = useState("");

  useEffect(() => {
    const fetchVolunteerProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

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
          setVolunteerName(data.profile.fullName || "Volunteer");
          setVolunteerLocation(
            data.profile.location || "Location not set"
          );
          setVolunteerImage(
            data.profile.profileImageUrl || ""
          );
        }
      } catch (error) {
        console.error("Failed to load volunteer profile:", error);
      }
    };

    fetchVolunteerProfile();
  }, []);

  const handleViewMore = () => {
    navigate("/nearby-ngos");
  };

  return (
    <div className="volunteer_dashboard">
      <Profilebar
        name={volunteerName}
        location={volunteerLocation}
        profileImage={volunteerImage}
      />

      <div className="volunteer_dashboard_content">
        <Greeting volunteerName={volunteerName} />

        <hr className="dashboard_divider" />

        <div className="dashboard_explore">
          <ExploreCard
            title="Find NGOs near me"
            description="Discover NGOs working on causes close to your location."
            buttonText="Explore Nearby NGOs"
            icon={<MapPinSearch size={22} color="#2c482d" />}
            image={ngonear}
            onClick={handleViewMore}
            variant="green"
          />

          <ExploreCard
            title="Browse all NGOs"
            description="Explore organizations across various causes and locations."
            buttonText="Browse All NGOs"
            icon={<University size={22} color="#2c482d" />}
            image={ngobrowse}
            onClick={() => navigate("/browse-ngos")}
            variant="cream"
          />
        </div>

        <hr className="dashboard_divider" />

        <div className="nearby_ngo_head">
          <h3>NGO Near Me</h3>
        </div>

        <div className="view_more">
          <button
            className="nearby_ngo_button"
            onClick={handleViewMore}
          >
            View More
            <ArrowRightFromLine
              size={18}
              color="#1b3120"
              strokeWidth={2}
            />
          </button>
        </div>

        <div className="nearby_ngo_cards">
          {nearbyNgos.map((ngo) => (
            <NgoCard
              key={ngo.id}
              organizationName={ngo.organizationName}
              logo={ngo.logo}
              description={ngo.description}
              causes={ngo.causes}
              distance={ngo.distance}
              onClick={() => navigate(`/ngo/${ngo.id}`)}
            />
          ))}
        </div>

        <div className="gettingStarted">
          <GettingStartedCard
            onClick={() => navigate("/browse-ngos")}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
