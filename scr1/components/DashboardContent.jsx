import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import StatCard from "./StatCard.jsx";
import ExploreCard from "./ExploreCard.jsx";
import NgoCard from "./NgoCard.jsx";
import GettingStartedCard from "./GettingStartedCard.jsx";
import Greeting from "./Greeting.jsx";
import Profilebar from "./Profilebar.jsx";

import "../styles/DashboardContent.css";

import { statCards } from "../constants/dashboardConstants.js";
import { nearbyNgos } from "../constants/ngoConstants.js";

import {
  University,
  MapPinSearch,
  ArrowRightFromLine,
} from "lucide-react";

import ngonear from "../assets/ngonear.png";
import ngobrowse from "../assets/ngobrowse.png";


const DashboardContent = () => {

  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate("/nearby-ngos");
  };

  const [stats, setStats] = useState({
    fullName: "Harshita Singh",

    verifiedHours: 0,

    ngosSupported: 0,

    requestsPending: 0,

    certificatesEarned: 0,
  });


  return (

    <div className="volunteer_dashboard">


      <Profilebar />


      <div className="volunteer_dashboard_content">

        <Greeting
          volunteerName={stats.fullName}
        />
        
        {/*Status Bar will be added soon for now this is an awaiting feature*/}
        
        {/* <div className="dashboard_stats">

          {statCards.map((card) => {

            const Icon = card.icon;


            return (

              <StatCard

                key={card.statKey}

                icon={
                  <Icon
                    size={28}
                    color="#2c482d"
                    strokeWidth={2}
                  />
                }

                number={
                  stats[card.statKey]
                }

                title={
                  card.title
                }

                caption={
                  card.caption
                }

                buttonText={
                  card.buttonText
                }

              />

            );

          })}

        </div> */}


        <hr className="dashboard_divider" />


        <div className="dashboard_explore">

          <ExploreCard

            title="Find NGOs near me"

            description="Discover NGOs working on causes close to your location."

            buttonText="Explore Nearby NGOs"

            icon={
              <MapPinSearch
                size={22}
                color="#2c482d"
              />
            }

            image={ngonear}

            onClick={
              handleViewMore
            }

            variant="green"

          />

          <ExploreCard

            title="Browse all NGOs"

            description="Explore organizations across various causes and locations."

            buttonText="Browse All NGOs"

            icon={
              <University
                size={22}
                color="#2c482d"
              />
            }

            image={ngobrowse}

            onClick={() =>
              navigate("/browse-ngos")
            }

            variant="cream"

          />

        </div>


        <hr className="dashboard_divider" />

        <div className="nearby_ngo_head">

          <h3>
            NGO Near Me
          </h3>

        </div>

        <div className="view_more">

          <button

            className="nearby_ngo_button"

            onClick={
              handleViewMore
            }

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

              organizationName={
                ngo.organizationName
              }

              logo={
                ngo.logo
              }

              description={
                ngo.description
              }

              causes={
                ngo.causes
              }

              distance={
                ngo.distance
              }


              onClick={() =>
                navigate(
                  `/ngo/${ngo.id}`
                )
              }

            />

          ))}

        </div>


        <div className="gettingStarted">

          <GettingStartedCard

            onClick={() =>
              navigate("/browse-ngos")
            }

          />

        </div>


      </div>

    </div>

  );

};


export default DashboardContent;