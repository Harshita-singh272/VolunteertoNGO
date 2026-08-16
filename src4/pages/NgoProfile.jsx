import React from "react";
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


const NgoProfile = ({ ngoData }) => {
  const navigate = useNavigate();


  /*
   * =====================================================
   * TEMPORARY FRONTEND DATA
   *
   * Later this data will come from the backend.
   *
   * For now:
   * 1. If ngoData is passed as a prop -> use it.
   * 2. Otherwise check localStorage.
   * 3. Otherwise use temporary default data.
   * =====================================================
   */

  let savedNgoData = null;

  try {
    savedNgoData = JSON.parse(
      localStorage.getItem("ngoProfileData")
    );
  } catch (error) {
    savedNgoData = null;
  }


  const ngo = ngoData || savedNgoData || {
    id: 1,

    organizationName:
      "Helping Hands Foundation",

    logo: null,

    location:
      "Delhi",

    causes: [
      "Education",
      "Child Welfare",
      "Animal Welfare",
      "Community Service",
    ],

    description:
      "Supporting children's education and providing learning resources to underserved communities.",

    mission:
      "To create equal opportunities for children and communities through education, support, and meaningful community programs.",

    foundedYear:
      "2015",

    organizationSize:
      "11-50",

    contactPersonName:
      "Priya Sharma",

    contactPersonRole:
      "Founder & Director",

    contactEmail:
      "helpinghands@example.com",

    contactPhone:
      "+91 98765 43210",

    website:
      "",

    socialLink:
      "",

    programs:
      "Education programs, community support, and animal welfare initiatives.",

    volunteerHelp:
      "Volunteers can support educational activities, community programs, and outreach work.",

    currentNeeds:
      "Teaching volunteers, community support volunteers, and event volunteers.",
  };


  /*
   * =====================================================
   * EDIT PROFILE
   * =====================================================
   */

  const handleEditProfile = () => {
    navigate("/ngo/profile/edit");
  };


  /*
   * =====================================================
   * LOGO
   * =====================================================
   */

  const renderLogo = () => {
    if (
      ngo.logo &&
      typeof ngo.logo === "string"
    ) {
      return (
        <img
          src={ngo.logo}
          alt={`${ngo.organizationName} logo`}
          onError={(event) => {
            event.currentTarget.style.display =
              "none";
          }}
        />
      );
    }

    return (
      <div className="ngo_profile_logo_placeholder">
        {ngo.organizationName
          ? ngo.organizationName
              .charAt(0)
              .toUpperCase()
          : "N"}
      </div>
    );
  };


  return (
    <div className="ngo_profile_layout">

      {/* =================================================
          NGO SIDEBAR
      ================================================= */}

      <NgoSidebar />


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="ngo_profile_main">

        <div className="ngo_profile_page">


          {/* =================================================
              TOP ACTIONS
          ================================================= */}

          <div className="ngo_profile_actions">

            <div />

            <button
              type="button"
              className="ngo_profile_edit"
              onClick={handleEditProfile}
            >
              <Pencil size={17} />

              Edit Profile
            </button>

          </div>


          {/* =================================================
              PROFILE HEADER
          ================================================= */}

          <section className="ngo_profile_header">


            {/* LOGO */}

            <div className="ngo_profile_logo">
              {renderLogo()}
            </div>


            {/* IDENTITY */}

            <div className="ngo_profile_identity">

              <h1>
                {ngo.organizationName ||
                  "Organization Name"}
              </h1>


              <div className="ngo_profile_location">

                <MapPin size={18} />

                <span>
                  {ngo.location ||
                    "Location not added"}
                </span>

              </div>


              {/* CAUSES */}

              <div className="ngo_profile_causes">

                {ngo.causes?.map((cause) => (
                  <span
                    key={cause}
                    className="ngo_profile_cause"
                  >
                    {cause}
                  </span>
                ))}

              </div>

            </div>

          </section>


          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="ngo_profile_content">


            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="ngo_profile_left">


              {/* ABOUT */}

              <section className="ngo_profile_card">

                <div className="ngo_card_title">

                  <Target size={21} />

                  <h2>
                    About Your Organization
                  </h2>

                </div>


                <p>
                  {ngo.description ||
                    "No organization description has been added yet."}
                </p>

              </section>


              {/* MISSION */}

              <section className="ngo_profile_card">

                <div className="ngo_card_title">

                  <Heart size={21} />

                  <h2>
                    Our Mission
                  </h2>

                </div>


                <p>
                  {ngo.mission ||
                    "No mission has been added yet."}
                </p>

              </section>


              {/* PROGRAMS */}

              <section className="ngo_profile_card">

                <div className="ngo_card_title">

                  <Target size={21} />

                  <h2>
                    Our Programs
                  </h2>

                </div>


                <p>
                  {ngo.programs ||
                    "No programs have been added yet."}
                </p>

              </section>


              {/* VOLUNTEER HELP */}

              <section className="ngo_profile_card">

                <div className="ngo_card_title">

                  <Users size={21} />

                  <h2>
                    How Volunteers Can Help
                  </h2>

                </div>


                <p>
                  {ngo.volunteerHelp ||
                    "No volunteer information has been added yet."}
                </p>

              </section>


              {/* CURRENT NEEDS */}

              <section className="ngo_profile_card">

                <div className="ngo_card_title">

                  <Heart size={21} />

                  <h2>
                    Current Volunteer Needs
                  </h2>

                </div>


                <p>
                  {ngo.currentNeeds ||
                    "No current volunteer needs have been added yet."}
                </p>

              </section>


              {/* AREAS OF WORK */}

              <section className="ngo_profile_card">

                <div className="ngo_card_title">

                  <Target size={21} />

                  <h2>
                    Areas of Work
                  </h2>

                </div>


                <div className="ngo_profile_causes ngo_profile_causes_large">

                  {ngo.causes?.map((cause) => (
                    <span
                      key={cause}
                      className="ngo_profile_cause"
                    >
                      {cause}
                    </span>
                  ))}

                </div>

              </section>

            </div>


            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div className="ngo_profile_right">


              {/* ORGANIZATION DETAILS */}

              <section className="ngo_profile_card">

                <h2 className="ngo_side_title">
                  Organization Details
                </h2>


                <div className="ngo_detail_list">


                  <div className="ngo_detail_item">

                    <CalendarDays size={18} />

                    <div>

                      <span>
                        Founded Year
                      </span>

                      <strong>
                        {ngo.foundedYear ||
                          "Not provided"}
                      </strong>

                    </div>

                  </div>


                  <div className="ngo_detail_item">

                    <Users size={18} />

                    <div>

                      <span>
                        Organization Size
                      </span>

                      <strong>
                        {ngo.organizationSize ||
                          "Not provided"}
                      </strong>

                    </div>

                  </div>


                  <div className="ngo_detail_item">

                    <MapPin size={18} />

                    <div>

                      <span>
                        Location
                      </span>

                      <strong>
                        {ngo.location ||
                          "Not provided"}
                      </strong>

                    </div>

                  </div>


                </div>

              </section>


              {/* CONTACT INFORMATION */}

              <section className="ngo_profile_card">

                <h2 className="ngo_side_title">
                  Contact Information
                </h2>


                <div className="ngo_detail_list">


                  {/* CONTACT PERSON */}

                  <div className="ngo_detail_item">

                    <Users size={18} />

                    <div>

                      <span>
                        Contact Person
                      </span>

                      <strong>
                        {ngo.contactPersonName ||
                          "Not provided"}
                      </strong>

                      {ngo.contactPersonRole && (
                        <small>
                          {ngo.contactPersonRole}
                        </small>
                      )}

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div className="ngo_detail_item">

                    <Mail size={18} />

                    <div>

                      <span>
                        Email
                      </span>

                      <strong>
                        {ngo.contactEmail ||
                          "Not provided"}
                      </strong>

                    </div>

                  </div>


                  {/* PHONE */}

                  <div className="ngo_detail_item">

                    <Phone size={18} />

                    <div>

                      <span>
                        Phone
                      </span>

                      <strong>
                        {ngo.contactPhone ||
                          "Not provided"}
                      </strong>

                    </div>

                  </div>


                  {/* WEBSITE */}

                  {ngo.website && (
                    <div className="ngo_detail_item">

                      <Globe size={18} />

                      <div>

                        <span>
                          Website
                        </span>

                        <strong>
                          {ngo.website}
                        </strong>

                      </div>

                    </div>
                  )}


                  {/* SOCIAL LINK */}

                  {ngo.socialLink && (
                    <div className="ngo_detail_item">

                      <Globe size={18} />

                      <div>

                        <span>
                          Social Media
                        </span>

                        <strong>
                          {ngo.socialLink}
                        </strong>

                      </div>

                    </div>
                  )}

                </div>

              </section>


            </div>

          </div>

        </div>

      </main>

    </div>
  );
};


export default NgoProfile;