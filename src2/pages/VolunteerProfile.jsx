
import React, { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Heart,
  Edit3,
  User,
  Briefcase,
  CheckCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import VolunteerSidebar from "../../scr1/components/VolunteerSidebar.jsx";
import Profilebar from "../../scr1/components/Profilebar.jsx";

import "../styles/VolunteerProfile.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const VolunteerProfile = ({ profileData }) => {
  const navigate = useNavigate();

  const [savedProfile, setSavedProfile] = useState(
    profileData || {}
  );

  useEffect(() => {
    const fetchVolunteerProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/volunteers/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (data.profile) {
          setSavedProfile(data.profile);
        }
      } catch (error) {
        console.error("Unable to load volunteer profile:", error);
      }
    };

    fetchVolunteerProfile();
  }, []);

  const volunteer = {
    fullName:
      savedProfile?.fullName ||
      "Not provided",

    profileImage:
      savedProfile?.profileImageUrl ||
      "",

    phone:
      savedProfile?.phone ||
      "Not provided",

    location:
      savedProfile?.location ||
      "Not provided",

    bio:
      savedProfile?.bio ||
      "No information has been added yet.",

    interests:
      savedProfile?.interests || [],

    skills:
      savedProfile?.skills
        ? Array.isArray(savedProfile.skills)
          ? savedProfile.skills
          : savedProfile.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
        : [],

    availability:
      savedProfile?.availability ||
      "Not provided",

    profileCompleted:
      savedProfile?.profileCompleted ??
      Boolean(
        savedProfile?.fullName &&
        savedProfile?.phone &&
        savedProfile?.location &&
        savedProfile?.availability
      ),
  };

  const handleEditProfile = () => {
    navigate("/volunteer-profile/edit");
  };

  return (
    <div className="volunteer_profile_layout">
      <VolunteerSidebar />

      <main className="volunteer_profile_main">
        <Profilebar />

        <div className="volunteer_profile_page">
          <div className="volunteer_profile_header">
            <div>
              <h1>My Profile</h1>

              <p>
                Manage and view your volunteer information.
              </p>
            </div>

            <button
              type="button"
              className="volunteer_profile_edit_button"
              onClick={handleEditProfile}
            >
              <Edit3 size={17} />
              Edit Profile
            </button>
          </div>

          <section className="volunteer_profile_hero">
            <div className="volunteer_profile_avatar">
              {volunteer.profileImage ? (
                <img
                  src={volunteer.profileImage}
                  alt={volunteer.fullName}
                />
              ) : (
                <div className="volunteer_profile_avatar_placeholder">
                  <User size={48} />
                </div>
              )}
            </div>

            <div className="volunteer_profile_identity">
              <div className="volunteer_profile_name">
                <h2>{volunteer.fullName}</h2>

                {volunteer.profileCompleted && (
                  <span className="profile_verified">
                    <CheckCircle size={15} />
                    Profile Complete
                  </span>
                )}
              </div>

              <p className="volunteer_profile_role">
                Volunteer
              </p>

              <div className="volunteer_profile_meta">
                <span>
                  <MapPin size={16} />
                  {volunteer.location}
                </span>
              </div>
            </div>
          </section>

          <div className="volunteer_profile_content">
            <div className="volunteer_profile_left">
              <section className="profile_info_card">
                <div className="profile_card_heading">
                  <h3>About Me</h3>
                </div>

                <p className="profile_about_text">
                  {volunteer.bio}
                </p>
              </section>

              <section className="profile_info_card">
                <div className="profile_card_heading">
                  <Heart size={19} />

                  <h3>
                    Causes I'm Interested In
                  </h3>
                </div>

                <div className="profile_tags">
                  {volunteer.interests.length > 0 ? (
                    volunteer.interests.map((interest) => (
                      <span
                        className="profile_tag"
                        key={interest}
                      >
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="profile_empty">
                      No causes added yet.
                    </span>
                  )}
                </div>
              </section>

              <section className="profile_info_card">
                <div className="profile_card_heading">
                  <Briefcase size={19} />

                  <h3>Skills</h3>
                </div>

                <div className="profile_tags">
                  {volunteer.skills.length > 0 ? (
                    volunteer.skills.map((skill) => (
                      <span
                        className="profile_tag"
                        key={skill}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="profile_empty">
                      No skills added yet.
                    </span>
                  )}
                </div>
              </section>

              <section className="profile_info_card">
                <div className="profile_card_heading">
                  <Clock size={19} />

                  <h3>
                    Volunteering Preferences
                  </h3>
                </div>

                <div className="profile_preference">
                  <div>
                    <span className="preference_label">
                      Availability
                    </span>

                    <strong>
                      {volunteer.availability}
                    </strong>
                  </div>
                </div>
              </section>
            </div>

            <aside className="volunteer_profile_right">
              <section className="profile_info_card">
                <div className="profile_card_heading">
                  <h3>Contact Information</h3>
                </div>

                <div className="profile_contact_list">
                  <div className="profile_contact_item">
                    <Phone size={18} />

                    <div>
                      <span>Phone</span>

                      <strong>
                        {volunteer.phone}
                      </strong>
                    </div>
                  </div>

                  <div className="profile_contact_item">
                    <MapPin size={18} />

                    <div>
                      <span>Location</span>

                      <strong>
                        {volunteer.location}
                      </strong>
                    </div>
                  </div>
                </div>
              </section>

              <section className="profile_status_card">
                <div className="profile_status_icon">
                  <CheckCircle size={23} />
                </div>

                <div>
                  <h3>
                    {volunteer.profileCompleted
                      ? "Profile Complete"
                      : "Profile Incomplete"}
                  </h3>

                  <p>
                    {volunteer.profileCompleted
                      ? "Your volunteer profile is ready to help you discover suitable NGOs."
                      : "Complete your profile to help NGOs understand more about you."}
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolunteerProfile;
