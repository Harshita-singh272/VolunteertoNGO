import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Pencil,
  Eye,
} from "lucide-react";

import NgoSidebar from "../components/NgoSidebar.jsx";
import "../styles/NgoDashboard.css";

const NgoDashboard = ({ ngoData }) => {
  const navigate = useNavigate();

  /*
    Temporary data for frontend development.

    Later, replace this with NGO data coming
    from your backend/database.
  */
  const ngo = ngoData || {
    id: 1,
    organizationName: "Helping Hands Foundation",
    logo: null,
    location: "Delhi",
    causes: [
      "Education",
      "Child Welfare",
      "Animal Welfare",
      "Community Service",
    ],
    description:
      "Supporting children's education and providing learning resources to underserved communities.",
  };

  const handleEditProfile = () => {
    navigate("/ngo/profile/edit");
  };

  const handlePreviewProfile = () => {
    navigate(`/ngo/${ngo.id}/preview`);
  };

  return (
    <div className="ngo_dashboard_layout">

      <NgoSidebar />

      <main className="ngo_dashboard_main">

        <div className="ngo_dashboard_page">

          {/* PAGE HEADING */}

          <section className="ngo_dashboard_heading">

            <div>
              <h1>NGO Dashboard</h1>

              <p>
                Manage your organization profile and
                see how volunteers view your NGO.
              </p>
            </div>

          </section>


          {/* PROFILE SUMMARY */}

          <section className="ngo_summary_card">

            {/* LOGO */}

            <div className="ngo_summary_logo">

              {ngo.logo ? (
                <img
                  src={ngo.logo}
                  alt={`${ngo.organizationName} logo`}
                />
              ) : (
                <div className="ngo_summary_logo_placeholder">
                  {ngo.organizationName
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

            </div>


            {/* INFORMATION */}

            <div className="ngo_summary_information">

              <h2>
                {ngo.organizationName}
              </h2>


              <div className="ngo_summary_location">

                <MapPin size={18} />

                <span>
                  {ngo.location || "Location not added"}
                </span>

              </div>


              <div className="ngo_summary_causes">

                {ngo.causes &&
                  ngo.causes.map((cause) => (
                    <span
                      key={cause}
                      className="ngo_summary_cause"
                    >
                      {cause}
                    </span>
                  ))}

              </div>

            </div>


            {/* ACTIONS */}

            <div className="ngo_summary_actions">

              <button
                type="button"
                className="ngo_edit_button"
                onClick={handleEditProfile}
              >
                <Pencil size={18} />

                Edit Profile
              </button>


              <button
                type="button"
                className="ngo_preview_button"
                onClick={handlePreviewProfile}
              >
                <Eye size={18} />

                Preview as Volunteers See It
              </button>

            </div>

          </section>


          {/* ABOUT */}

          <section className="ngo_about_card">

            <h2>
              About Your Organization
            </h2>

            <p>
              {ngo.description ||
                "Add a description to tell volunteers more about your organization."}
            </p>

          </section>


          {/* QUICK INFORMATION */}

          <section className="ngo_info_section">

            <h2>
              Organization Information
            </h2>

            <div className="ngo_info_grid">

              <div className="ngo_info_item">

                <span>
                  Location
                </span>

                <strong>
                  {ngo.location || "Not added"}
                </strong>

              </div>


              <div className="ngo_info_item">

                <span>
                  Areas of Work
                </span>

                <strong>
                  {ngo.causes?.length || 0} causes
                </strong>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

export default NgoDashboard;