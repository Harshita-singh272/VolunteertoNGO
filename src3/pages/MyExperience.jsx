import React from "react";
import { Clock, Handshake, Award, History } from "lucide-react";

import Profilebar from "../../scr1/components/Profilebar.jsx";
import VolunteerSidebar from "../../scr1/components/VolunteerSidebar.jsx";

import "../styles/MyExperience.css";


const MyExperience = () => {

  return (
    <div className="experience_layout">

      {/* Sidebar */}
      <VolunteerSidebar />


      {/* Main Content */}
      <main className="experience_main">

        <Profilebar />

        <div className="experience_page">

          {/* Heading */}
          <div className="experience_heading">

            <h1>
              My Experience
            </h1>

            <p>
              Your volunteering journey with VolunteerConnect.
            </p>

          </div>


          {/* Summary Cards */}
          <div className="experience_stats">


            {/* Volunteer Hours */}
            <div className="experience_card">

              <div className="experience_icon">
                <Clock size={28} />
              </div>

              <div className="experience_card_content">

                <h3>
                  Volunteer Hours
                </h3>

                <strong>
                  Coming Soon
                </strong>

                <p>
                  Track your volunteering hours here
                  in the future.
                </p>

              </div>

            </div>


            {/* NGOs Supported */}
            <div className="experience_card">

              <div className="experience_icon">
                <Handshake size={28} />
              </div>

              <div className="experience_card_content">

                <h3>
                  NGOs Supported
                </h3>

                <strong>
                  Coming Soon
                </strong>

                <p>
                  Your volunteering organizations
                  will appear here.
                </p>

              </div>

            </div>


            {/* Certificates */}
            <div className="experience_card">

              <div className="experience_icon">
                <Award size={28} />
              </div>

              <div className="experience_card_content">

                <h3>
                  Certificates Earned
                </h3>

                <strong>
                  Coming Soon
                </strong>

                <p>
                  Your volunteering certificates
                  will appear here.
                </p>

              </div>

            </div>

          </div>


          {/* Volunteering History */}
          <section className="experience_history">

            <div className="history_heading">

              <History size={25} />

              <div>

                <h2>
                  Volunteering History
                </h2>

                <p>
                  Your completed volunteering activities
                  will appear here.
                </p>

              </div>

            </div>


            {/* Empty State */}
            <div className="experience_empty">

              <div className="empty_icon">
                <History size={32} />
              </div>

              <h3>
                No volunteering experience yet
              </h3>

              <p>
                Your completed volunteering activities
                will appear here in the future.
              </p>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};


export default MyExperience;