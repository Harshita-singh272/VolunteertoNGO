import React from "react";
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


const VolunteerProfile = ({ profileData }) => {

  const navigate = useNavigate();


  /* =========================================
     PROFILE DATA

     profileData currently comes from AppRoutes.

     Later, this can come from the backend.
  ========================================= */

  const volunteer = {

    fullName:
      profileData?.fullName ||
      "Not provided",

    profileImage:
      profileData?.profileImageUrl ||
      "",

    phone:
      profileData?.phone ||
      "Not provided",

    location:
      profileData?.location ||
      "Not provided",

    bio:
      profileData?.bio ||
      "No information has been added yet.",

    interests:
      profileData?.interests || [],

    skills:
      profileData?.skills
        ? Array.isArray(profileData.skills)
          ? profileData.skills
          : profileData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
        : [],

    availability:
      profileData?.availability ||
      "Not provided",

    profileCompleted:
      profileData?.profileCompleted ??
      false,

  };


  /* =========================================
     EDIT PROFILE
  ========================================= */

  const handleEditProfile = () => {

    navigate("/volunteer-profile/edit");

  };


  return (

    <div className="volunteer_profile_layout">


      {/* =====================================
          SIDEBAR
      ===================================== */}

      <VolunteerSidebar />


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="volunteer_profile_main">


        {/* =====================================
            PROFILE BAR
        ===================================== */}

        <Profilebar />


        {/* =====================================
            PROFILE PAGE
        ===================================== */}

        <div className="volunteer_profile_page">


          {/* =====================================
              PAGE HEADER
          ===================================== */}

          <div className="volunteer_profile_header">

            <div>

              <h1>
                My Profile
              </h1>

              <p>
                Manage and view your volunteer information.
              </p>

            </div>


            {/* EDIT BUTTON */}

            <button
              type="button"
              className="volunteer_profile_edit_button"
              onClick={handleEditProfile}
            >

              <Edit3 size={17} />

              Edit Profile

            </button>

          </div>


          {/* =====================================
              PROFILE HERO
          ===================================== */}

          <section className="volunteer_profile_hero">


            {/* PROFILE IMAGE */}

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


            {/* BASIC INFORMATION */}

            <div className="volunteer_profile_identity">


              <div className="volunteer_profile_name">

                <h2>
                  {volunteer.fullName}
                </h2>


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


          {/* =====================================
              PROFILE CONTENT
          ===================================== */}

          <div className="volunteer_profile_content">


            {/* =================================
                LEFT COLUMN
            ================================= */}

            <div className="volunteer_profile_left">


              {/* =================================
                  ABOUT
              ================================= */}

              <section className="profile_info_card">

                <div className="profile_card_heading">

                  <h3>
                    About Me
                  </h3>

                </div>


                <p className="profile_about_text">

                  {volunteer.bio}

                </p>

              </section>


              {/* =================================
                  INTERESTS
              ================================= */}

              <section className="profile_info_card">

                <div className="profile_card_heading">

                  <Heart size={19} />

                  <h3>
                    Causes I'm Interested In
                  </h3>

                </div>


                <div className="profile_tags">

                  {volunteer.interests.length > 0 ? (

                    volunteer.interests.map(
                      (interest) => (

                        <span
                          className="profile_tag"
                          key={interest}
                        >

                          {interest}

                        </span>

                      )
                    )

                  ) : (

                    <span className="profile_empty">

                      No causes added yet.

                    </span>

                  )}

                </div>

              </section>


              {/* =================================
                  SKILLS
              ================================= */}

              <section className="profile_info_card">

                <div className="profile_card_heading">

                  <Briefcase size={19} />

                  <h3>
                    Skills
                  </h3>

                </div>


                <div className="profile_tags">

                  {volunteer.skills.length > 0 ? (

                    volunteer.skills.map(
                      (skill) => (

                        <span
                          className="profile_tag"
                          key={skill}
                        >

                          {skill}

                        </span>

                      )
                    )

                  ) : (

                    <span className="profile_empty">

                      No skills added yet.

                    </span>

                  )}

                </div>

              </section>


              {/* =================================
                  VOLUNTEERING PREFERENCES
              ================================= */}

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


            {/* =================================
                RIGHT COLUMN
            ================================= */}

            <aside className="volunteer_profile_right">


              {/* =================================
                  CONTACT INFORMATION
              ================================= */}

              <section className="profile_info_card">

                <div className="profile_card_heading">

                  <h3>
                    Contact Information
                  </h3>

                </div>


                <div className="profile_contact_list">


                  {/* PHONE */}

                  <div className="profile_contact_item">

                    <Phone size={18} />

                    <div>

                      <span>
                        Phone
                      </span>

                      <strong>
                        {volunteer.phone}
                      </strong>

                    </div>

                  </div>


                  {/* LOCATION */}

                  <div className="profile_contact_item">

                    <MapPin size={18} />

                    <div>

                      <span>
                        Location
                      </span>

                      <strong>
                        {volunteer.location}
                      </strong>

                    </div>

                  </div>


                </div>

              </section>


              {/* =================================
                  PROFILE STATUS
              ================================= */}

              <section className="profile_status_card">

                <div className="profile_status_icon">

                  <CheckCircle size={23} />

                </div>


                <div>

                  <h3>

                    {volunteer.profileCompleted

                      ? "Profile Complete"

                      : "Profile Incomplete"

                    }

                  </h3>


                  <p>

                    {volunteer.profileCompleted

                      ? "Your volunteer profile is ready to help you discover suitable NGOs."

                      : "Complete your profile to help NGOs understand more about you."

                    }

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