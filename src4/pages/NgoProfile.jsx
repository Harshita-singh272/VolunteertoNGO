import React from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Pencil,
  MapPin,
  Globe,
  Calendar,
  Users,
  Mail,
  Phone,
  Target,
  HeartHandshake,
  HandHeart,
} from "lucide-react";

import NgoSidebar from "../components/NgoSidebar.jsx";
import "../styles/NgoProfile.css";

const NgoProfile = ({ ngoData }) => {
  const navigate = useNavigate();

  const ngo = ngoData || {
    organizationName: "Helping Hands Foundation",

    contactPersonName: "Priya Sharma",
    contactPersonRole: "Founder & Director",

    contactEmail: "helpinghands@example.com",
    contactPhone: "+91 98765 43210",

    location: "Delhi",

    website: "www.helpinghands.org",
    socialLink: "@helpinghands",

    foundedYear: "2015",
    organizationSize: "11-50",

    logo: null,

    mission:
      "To create equal opportunities for children and communities through education, support, and meaningful community programs.",

    description:
      "Supporting children's education and providing learning resources to underserved communities.",

    programs:
      "Educational workshops, learning resource distribution, community development programs, and mentorship.",

    volunteerHelp:
      "Volunteers can help with teaching, mentoring, event organization, communication, and community activities.",

    currentNeeds:
      "Teaching volunteers, educational materials, community outreach support, and event volunteers.",

    causes: [
      "Education",
      "Child Welfare",
      "Community Service",
    ],
  };

  const handleBack = () => {
    navigate("/ngo-dashboard");
  };

  const handleEdit = () => {
    navigate("/ngo/profile/edit");
  };

  return (
    <div className="ngo_profile_layout">

      <NgoSidebar />

      <main className="ngo_profile_main">

        <div className="ngo_profile_page">

          <div className="ngo_profile_actions">

            <button
              type="button"
              className="ngo_profile_back"
              onClick={handleBack}
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>

            <button
              type="button"
              className="ngo_profile_edit"
              onClick={handleEdit}
            >
              <Pencil size={17} />
              Edit Profile
            </button>

          </div>


          <section className="ngo_profile_header">

            <div className="ngo_profile_logo">

              {ngo.logo ? (
                <img
                  src={ngo.logo}
                  alt={`${ngo.organizationName} logo`}
                />
              ) : (
                <div className="ngo_profile_logo_placeholder">
                  {ngo.organizationName
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

            </div>


            <div className="ngo_profile_identity">

              <h1>
                {ngo.organizationName}
              </h1>

              <div className="ngo_profile_location">

                <MapPin size={18} />

                <span>
                  {ngo.location || "Location not added"}
                </span>

              </div>


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


          <div className="ngo_profile_content">

            <div className="ngo_profile_left">

              <section className="ngo_profile_card">

                <div className="ngo_card_title">

                  <Target size={21} />

                  <h2>
                    About the Organization
                  </h2>

                </div>

                <p>
                  {ngo.description ||
                    "No description has been added yet."}
                </p>

              </section>


              <section className="ngo_profile_card">

                <div className="ngo_card_title">

                  <HeartHandshake size={21} />

                  <h2>
                    Our Mission
                  </h2>

                </div>

                <p>
                  {ngo.mission ||
                    "No mission statement has been added yet."}
                </p>

              </section>


              <section className="ngo_profile_card">

                <div className="ngo_card_title">

                  <HandHeart size={21} />

                  <h2>
                    Programs & Activities
                  </h2>

                </div>

                <p>
                  {ngo.programs ||
                    "No programs have been added yet."}
                </p>

              </section>


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


              <section className="ngo_profile_card">

                <div className="ngo_card_title">

                  <Target size={21} />

                  <h2>
                    Current Needs
                  </h2>

                </div>

                <p>
                  {ngo.currentNeeds ||
                    "No current needs have been added yet."}
                </p>

              </section>


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


            <aside className="ngo_profile_right">

              <section className="ngo_profile_card">

                <h2 className="ngo_side_title">
                  Organization Details
                </h2>

                <div className="ngo_detail_list">

                  <div className="ngo_detail_item">

                    <Calendar size={19} />

                    <div>

                      <span>
                        Founded Year
                      </span>

                      <strong>
                        {ngo.foundedYear || "Not added"}
                      </strong>

                    </div>

                  </div>


                  <div className="ngo_detail_item">

                    <Users size={19} />

                    <div>

                      <span>
                        Organization Size
                      </span>

                      <strong>
                        {ngo.organizationSize || "Not added"}
                      </strong>

                    </div>

                  </div>


                  <div className="ngo_detail_item">

                    <MapPin size={19} />

                    <div>

                      <span>
                        Location
                      </span>

                      <strong>
                        {ngo.location || "Not added"}
                      </strong>

                    </div>

                  </div>

                </div>

              </section>


              <section className="ngo_profile_card">

                <h2 className="ngo_side_title">
                  Contact Information
                </h2>

                <div className="ngo_detail_list">

                  <div className="ngo_detail_item">

                    <Users size={19} />

                    <div>

                      <span>
                        Contact Person
                      </span>

                      <strong>
                        {ngo.contactPersonName || "Not added"}
                      </strong>

                      {ngo.contactPersonRole && (
                        <small>
                          {ngo.contactPersonRole}
                        </small>
                      )}

                    </div>

                  </div>


                  <div className="ngo_detail_item">

                    <Mail size={19} />

                    <div>

                      <span>
                        Email
                      </span>

                      <strong>
                        {ngo.contactEmail || "Not added"}
                      </strong>

                    </div>

                  </div>


                  <div className="ngo_detail_item">

                    <Phone size={19} />

                    <div>

                      <span>
                        Phone
                      </span>

                      <strong>
                        {ngo.contactPhone || "Not added"}
                      </strong>

                    </div>

                  </div>

                </div>

              </section>


              <section className="ngo_profile_card">

                <h2 className="ngo_side_title">
                  Online Presence
                </h2>

                <div className="ngo_detail_list">

                  <div className="ngo_detail_item">

                    <Globe size={19} />

                    <div>

                      <span>
                        Website
                      </span>

                      <strong>
                        {ngo.website || "Not added"}
                      </strong>

                    </div>

                  </div>


                  <div className="ngo_detail_item">

                    <Globe size={19} />

                    <div>

                      <span>
                        Social Media
                      </span>

                      <strong>
                        {ngo.socialLink || "Not added"}
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