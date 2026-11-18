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

    mission:
      "To create equal opportunities for children and communities through education, support, and meaningful community programs.",

    foundedYear: "2015",

    organizationSize: "11-50",

    contactPersonName: "Priya Sharma",

    contactPersonRole: "Founder & Director",

    contactEmail: "helpinghands@example.com",

    contactPhone: "+91 98765 43210",

    website: "www.helpinghands.org",

    socialLink: "@helpinghands",

    programs:
      "Educational workshops, learning resource distribution, community development programs, and mentorship.",

    volunteerHelp:
      "Volunteers can help with teaching, mentoring, event organization, communication, and community activities.",

    currentNeeds:
      "Teaching volunteers, educational materials, community outreach support, and event volunteers.",
  };

  const handleEditProfile = () => {
    navigate("/ngo/profile/edit");
  };

  return (
    <div className="ngo_profile_layout">

      <NgoSidebar />

      <main className="ngo_profile_main">

        {/* =====================================================
            COMPLETELY UNIQUE NGO OWNER PROFILE ROOT
        ===================================================== */}

        <div className="owner_ngo_page">

          {/* =====================================================
              EDIT BUTTON
          ===================================================== */}

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


          {/* =====================================================
              HEADER
          ===================================================== */}

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
                {ngo.organizationName ||
                  "Organization Name"}
              </h1>


              <div className="owner_ngo_location">

                <MapPin size={18} />

                <span>
                  {ngo.location ||
                    "Location not provided"}
                </span>

              </div>


              {ngo.causes &&
                ngo.causes.length > 0 && (

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


          {/* =====================================================
              MAIN CONTENT
          ===================================================== */}

          <div className="owner_ngo_content">


            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="owner_ngo_left">


              {/* ABOUT */}

              <section className="owner_ngo_card">

                <div className="owner_ngo_card_title">

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

              <section className="owner_ngo_card">

                <div className="owner_ngo_card_title">

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

              <section className="owner_ngo_card">

                <div className="owner_ngo_card_title">

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

              <section className="owner_ngo_card">

                <div className="owner_ngo_card_title">

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

              <section className="owner_ngo_card">

                <div className="owner_ngo_card_title">

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

              <section className="owner_ngo_card">

                <div className="owner_ngo_card_title">

                  <Target size={21} />

                  <h2>
                    Areas of Work
                  </h2>

                </div>


                <div className="owner_ngo_causes">

                  {ngo.causes &&
                    ngo.causes.map((cause) => (
                      <span
                        key={cause}
                        className="owner_ngo_cause"
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

            <aside className="owner_ngo_right">


              {/* ORGANIZATION DETAILS */}

              <section className="owner_ngo_card">

                <h2 className="owner_ngo_side_title">
                  Organization Details
                </h2>


                <div className="owner_ngo_detail_list">


                  <div className="owner_ngo_detail_item">

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


                  <div className="owner_ngo_detail_item">

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


                  <div className="owner_ngo_detail_item">

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

              <section className="owner_ngo_card">

                <h2 className="owner_ngo_side_title">
                  Contact Information
                </h2>


                <div className="owner_ngo_detail_list">


                  <div className="owner_ngo_detail_item">

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


                  <div className="owner_ngo_detail_item">

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


                  <div className="owner_ngo_detail_item">

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


                  <div className="owner_ngo_detail_item">

                    <Globe size={18} />

                    <div>

                      <span>
                        Website
                      </span>

                      <strong>
                        {ngo.website ||
                          "Not provided"}
                      </strong>

                    </div>

                  </div>


                  <div className="owner_ngo_detail_item">

                    <Globe size={18} />

                    <div>

                      <span>
                        Social Media
                      </span>

                      <strong>
                        {ngo.socialLink ||
                          "Not provided"}
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