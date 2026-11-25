
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Pencil,
  Eye,
} from "lucide-react";

import NgoSidebar from "../components/NgoSidebar.jsx";
import "../styles/NgoDashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const NgoDashboard = ({ ngoData }) => {
  const navigate = useNavigate();

  const [ngo, setNgo] = useState(
    ngoData || {
      id: null,
      organizationName: "Your Organization",
      logo: null,
      location: "",
      causes: [],
      description: "",
    }
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNgoProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await fetch(
          `${API_URL}/api/ngos/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.profile) {
          const profile = data.profile;

          setNgo({
            id: profile._id,
            organizationName:
              profile.organizationName || "Your Organization",
            logo: profile.logoUrl || profile.logo || null,
            location: profile.location || "",
            causes: profile.causes || [],
            description: profile.description || "",
          });
        } else {
          console.error(
            "NGO profile is not available:",
            data.message
          );
        }
      } catch (error) {
        console.error(
          "Failed to load NGO profile:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNgoProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/ngo/profile/edit");
  };

  const handlePreviewProfile = () => {
    if (ngo.id) {
      navigate(`/ngo/${ngo.id}/preview`);
    }
  };

  return (
    <div className="ngo_dashboard_layout">
      <NgoSidebar />

      <main className="ngo_dashboard_main">
        <div className="ngo_dashboard_page">
          <section className="ngo_dashboard_heading">
            <div>
              <h1>NGO Dashboard</h1>
              <p>
                Manage your organization profile and
                see how volunteers view your NGO.
              </p>
            </div>
          </section>

          {loading ? (
            <p>Loading your organization profile...</p>
          ) : (
            <>
              <section className="ngo_summary_card">
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

                <div className="ngo_summary_information">
                  <h2>{ngo.organizationName}</h2>

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
                    disabled={!ngo.id}
                  >
                    <Eye size={18} />
                    Preview as Volunteers See It
                  </button>
                </div>
              </section>

              <section className="ngo_about_card">
                <h2>About Your Organization</h2>
                <p>
                  {ngo.description ||
                    "Add a description to tell volunteers more about your organization."}
                </p>
              </section>

              <section className="ngo_info_section">
                <h2>Organization Information</h2>

                <div className="ngo_info_grid">
                  <div className="ngo_info_item">
                    <span>Location</span>
                    <strong>
                      {ngo.location || "Not added"}
                    </strong>
                  </div>

                  <div className="ngo_info_item">
                    <span>Areas of Work</span>
                    <strong>
                      {ngo.causes?.length || 0} causes
                    </strong>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default NgoDashboard;
