
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Heart,
  Target,
  CalendarDays,
  Users,
  Mail,
  Phone,
  Globe,
  Pencil,
} from "lucide-react";

import NgoSidebar from "../components/NgoSidebar.jsx";

import "../styles/NgoProfile.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const NgoProfile = () => {
  const navigate = useNavigate();

  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNgoProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please log in again.");
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

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load NGO profile."
          );
        }

        setNgo({
          ...data.profile,
          id: data.profile._id,
          logo: data.profile.logoUrl || data.profile.logo || "",
        });
      } catch (err) {
        setError(
          err.message || "Unable to load your organization profile."
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

  if (loading) {
    return (
      <div className="ngo_profile_layout">
        <NgoSidebar />
        <main className="ngo_profile_main">
          <div className="owner_ngo_page">
            <p>Loading your organization profile...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !ngo) {
    return (
      <div className="ngo_profile_layout">
        <NgoSidebar />
        <main className="ngo_profile_main">
          <div className="owner_ngo_page">
            <h2>Unable to load NGO profile</h2>
            <p>{error || "No organization profile was found."}</p>
            <button
              type="button"
              className="owner_ngo_edit_button"
              onClick={handleEditProfile}
            >
              Complete Profile
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="ngo_profile_layout">
      <NgoSidebar />

      <main className="ngo_profile_main">
        <div className="owner_ngo_page">

          <div className="owner_ngo_actions">
            <button
              type="button"
              className="owner_ngo_edit_button"
              onClick={handleEditProfile}
            >
              <Pencil size={17} />
              Edit Profile
            </button>
          </div>

          <section className="owner_ngo_header">
            <div className="owner_ngo_logo">
              {ngo.logo ? (
                <img
                  src={ngo.logo}
                  alt={`${ngo.organizationName} logo`}
                />
              ) : (
                <div className="owner_ngo_logo_placeholder">
                  {ngo.organizationName
                    ?.charAt(0)
                    .toUpperCase() || "N"}
                </div>
              )}
            </div>

            <div className="owner_ngo_identity">
              <h1>
                {ngo.organizationName || "Organization Name"}
              </h1>

              <div className="owner_ngo_location">
                <MapPin size={18} />
                <span>
                  {ngo.location || "Location not provided"}
                </span>
              </div>

              {ngo.causes?.length > 0 && (
                <div className="owner_ngo_causes">
                  {ngo.causes.map((cause) => (
                    <span
                      key={cause}
                      className="owner_ngo_cause"
                    >
                      {cause}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          <div className="owner_ngo_content">
            <div className="owner_ngo_left">

              <section className="owner_ngo_card">
                <div className="owner_ngo_card_title">
                  <Target size={21} />
                  <h2>About Your Organization</h2>
                </div>
                <p>
                  {ngo.description ||
                    "No organization description has been added yet."}
                </p>
              </section>

              <section className="owner_ngo_card">
                <div className="owner_ngo_card_title">
                  <Heart size={21} />
                  <h2>Our Mission</h2>
                </div>
                <p>
                  {ngo.mission || "No mission has been added yet."}
                </p>
              </section>

              <section className="owner_ngo_card">
                <div className="owner_ngo_card_title">
                  <Target size={21} />
                  <h2>Our Programs</h2>
                </div>
                <p>
                  {ngo.programs || "No programs have been added yet."}
                </p>
              </section>

              <section className="owner_ngo_card">
                <div className="owner_ngo_card_title">
                  <Users size={21} />
                  <h2>How Volunteers Can Help</h2>
                </div>
                <p>
                  {ngo.volunteerHelp ||
                    "No volunteer information has been added yet."}
                </p>
              </section>

              <section className="owner_ngo_card">
                <div className="owner_ngo_card_title">
                  <Heart size={21} />
                  <h2>Current Volunteer Needs</h2>
                </div>
                <p>
                  {ngo.currentNeeds ||
                    "No current volunteer needs have been added yet."}
                </p>
              </section>

              <section className="owner_ngo_card">
                <div className="owner_ngo_card_title">
                  <Target size={21} />
                  <h2>Areas of Work</h2>
                </div>

                <div className="owner_ngo_causes">
                  {ngo.causes?.length > 0 ? (
                    ngo.causes.map((cause) => (
                      <span
                        key={cause}
                        className="owner_ngo_cause"
                      >
                        {cause}
                      </span>
                    ))
                  ) : (
                    <p>No causes have been added yet.</p>
                  )}
                </div>
              </section>
            </div>

            <aside className="owner_ngo_right">

              <section className="owner_ngo_card">
                <h2 className="owner_ngo_side_title">
                  Organization Details
                </h2>

                <div className="owner_ngo_detail_list">
                  <div className="owner_ngo_detail_item">
                    <CalendarDays size={18} />
                    <div>
                      <span>Founded Year</span>
                      <strong>
                        {ngo.foundedYear || "Not provided"}
                      </strong>
                    </div>
                  </div>

                  <div className="owner_ngo_detail_item">
                    <Users size={18} />
                    <div>
                      <span>Organization Size</span>
                      <strong>
                        {ngo.organizationSize || "Not provided"}
                      </strong>
                    </div>
                  </div>

                  <div className="owner_ngo_detail_item">
                    <MapPin size={18} />
                    <div>
                      <span>Location</span>
                      <strong>
                        {ngo.location || "Not provided"}
                      </strong>
                    </div>
                  </div>
                </div>
              </section>

              <section className="owner_ngo_card">
                <h2 className="owner_ngo_side_title">
                  Contact Information
                </h2>

                <div className="owner_ngo_detail_list">
                  <div className="owner_ngo_detail_item">
                    <Users size={18} />
                    <div>
                      <span>Contact Person</span>
                      <strong>
                        {ngo.contactPersonName || "Not provided"}
                      </strong>
                      {ngo.contactPersonRole && (
                        <small>{ngo.contactPersonRole}</small>
                      )}
                    </div>
                  </div>

                  <div className="owner_ngo_detail_item">
                    <Mail size={18} />
                    <div>
                      <span>Email</span>
                      <strong>
                        {ngo.contactEmail || "Not provided"}
                      </strong>
                    </div>
                  </div>

                  <div className="owner_ngo_detail_item">
                    <Phone size={18} />
                    <div>
                      <span>Phone</span>
                      <strong>
                        {ngo.contactPhone || "Not provided"}
                      </strong>
                    </div>
                  </div>

                  <div className="owner_ngo_detail_item">
                    <Globe size={18} />
                    <div>
                      <span>Website</span>
                      <strong>
                        {ngo.website || "Not provided"}
                      </strong>
                    </div>
                  </div>

                  <div className="owner_ngo_detail_item">
                    <Globe size={18} />
                    <div>
                      <span>Social Media</span>
                      <strong>
                        {ngo.socialLink || "Not provided"}
                      </strong>
                    </div>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NgoProfile;
