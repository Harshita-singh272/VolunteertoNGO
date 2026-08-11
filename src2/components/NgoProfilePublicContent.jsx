import React, { useEffect, useState } from "react";

import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Share2,
  Calendar,
  Users,
  Heart,
  Building2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "../styles/NgoProfilePublicContent.css";

const NgoProfilePublicContent = ({ ngo }) => {

  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);


  /* =========================================
     CHECK IF NGO IS ALREADY SAVED
  ========================================= */

  useEffect(() => {

    if (!ngo?.id) {
      setIsSaved(false);
      return;
    }

    try {

      const savedIds =
        JSON.parse(
          localStorage.getItem("savedNgos")
        ) || [];

      setIsSaved(
        savedIds.includes(ngo.id)
      );

    } catch (error) {

      console.error(
        "Unable to read saved NGOs:",
        error
      );

      setIsSaved(false);
    }

  }, [ngo?.id]);


  /* =========================================
     SAVE / REMOVE NGO
  ========================================= */

  const handleSaveNgo = () => {

    if (!ngo?.id) {
      return;
    }

    try {

      const savedIds =
        JSON.parse(
          localStorage.getItem("savedNgos")
        ) || [];


      if (isSaved) {

        const updatedIds =
          savedIds.filter(
            (id) => id !== ngo.id
          );

        localStorage.setItem(
          "savedNgos",
          JSON.stringify(updatedIds)
        );

        setIsSaved(false);

      } else {

        if (!savedIds.includes(ngo.id)) {

          const updatedIds = [
            ...savedIds,
            ngo.id,
          ];

          localStorage.setItem(
            "savedNgos",
            JSON.stringify(updatedIds)
          );
        }

        setIsSaved(true);
      }

    } catch (error) {

      console.error(
        "Unable to save NGO:",
        error
      );
    }
  };


  /* =========================================
     REQUEST TO VOLUNTEER
  ========================================= */

  const handleRequestToVolunteer = () => {

    if (!ngo?.id) {
      return;
    }

    navigate(
      `/volunteer/request/${ngo.id}`
    );
  };


  /* =========================================
     NGO NOT FOUND
  ========================================= */

  if (!ngo) {

    return (

      <div className="ngo_profile_page">

        <button
          type="button"
          className="ngo_back_button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />
          Back
        </button>


        <section className="ngo_info_card">

          <h2>
            NGO not found
          </h2>

          <p>
            The organization you are looking for
            could not be found.
          </p>

        </section>

      </div>
    );
  }


  const causes =
    ngo.causes || [];


  const displayValue = (value) => {

    return value || "Not provided";

  };


  return (

    <div className="ngo_profile_page">


      {/* =====================================
          BACK BUTTON
      ===================================== */}

      <button
        type="button"
        className="ngo_back_button"
        onClick={() => navigate(-1)}
      >

        <ArrowLeft size={17} />

        Back

      </button>


      {/* =====================================
          NGO HEADER
      ===================================== */}

      <section className="ngo_profile_header">


        <div className="ngo_profile_logo">

          {ngo.logo ? (

            <img
              src={ngo.logo}
              alt={`${ngo.organizationName} logo`}
            />

          ) : (

            <div className="ngo_logo_placeholder">

              {ngo.organizationName
                ?.charAt(0)
                .toUpperCase() || "N"}

            </div>

          )}

        </div>


        <div className="ngo_profile_identity">


          <div className="ngo_profile_title">

            <h1>
              {displayValue(
                ngo.organizationName
              )}
            </h1>

          </div>


          <div className="ngo_profile_location">

            <MapPin size={17} />

            <span>
              {displayValue(
                ngo.location
              )}
            </span>


            {ngo.distance !== undefined &&
              ngo.distance !== null && (

                <span>
                  • {ngo.distance} km away
                </span>

              )}

          </div>


          {causes.length > 0 && (

            <div className="ngo_profile_causes">

              {causes.map((cause) => (

                <span
                  key={cause}
                  className="ngo_cause_tag"
                >
                  {cause}
                </span>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div className="ngo_profile_content">


        {/* ===================================
            LEFT SIDE
        =================================== */}

        <div className="ngo_profile_left">


          {/* ABOUT */}

          <section className="ngo_info_card">

            <h2>
              About the Organization
            </h2>

            <p>
              {displayValue(
                ngo.description
              )}
            </p>

          </section>


          {/* MISSION */}

          <section className="ngo_info_card">

            <h2>
              Our Mission
            </h2>

            <p>
              {displayValue(
                ngo.mission
              )}
            </p>

          </section>


          {/* PROGRAMS */}

          <section className="ngo_info_card">

            <h2>
              Programs & Work
            </h2>

            <p>
              {displayValue(
                ngo.programs
              )}
            </p>

          </section>


          {/* VOLUNTEER HELP */}

          <section className="ngo_info_card">

            <div className="ngo_card_heading">

              <Heart size={21} />

              <h2>
                How Volunteers Can Help
              </h2>

            </div>

            <p>
              {displayValue(
                ngo.volunteerHelp
              )}
            </p>

          </section>


          {/* CURRENT NEEDS */}

          <section className="ngo_info_card">

            <h2>
              Current Needs
            </h2>

            <p>
              {displayValue(
                ngo.currentNeeds
              )}
            </p>

          </section>


          {/* AREAS OF WORK */}

          <section className="ngo_info_card">

            <h2>
              Areas of Work
            </h2>


            {causes.length > 0 ? (

              <div className="ngo_profile_causes">

                {causes.map((cause) => (

                  <span
                    key={cause}
                    className="ngo_cause_tag"
                  >
                    {cause}
                  </span>

                ))}

              </div>

            ) : (

              <p>
                No causes provided.
              </p>

            )}

          </section>


          {/* =================================
              REQUEST TO VOLUNTEER
          ================================= */}

          <section className="ngo_info_card">

            <div className="ngo_card_heading">

              <Heart size={21} />

              <h2>
                Volunteer With This NGO
              </h2>

            </div>


            <p>
              Interested in supporting this
              organization? Send a volunteer
              request and let the NGO know
              that you would like to contribute.
            </p>


            <button
              type="button"
              className="ngo_request_button"
              onClick={handleRequestToVolunteer}
            >

              Request to Volunteer

            </button>

          </section>

        </div>


        {/* ===================================
            RIGHT SIDE
        =================================== */}

        <aside className="ngo_profile_right">


          {/* ORGANIZATION DETAILS */}

          <section className="ngo_info_card">

            <h2>
              Organization Details
            </h2>


            <div className="ngo_detail_list">


              <div className="ngo_detail_item">

                <MapPin size={19} />

                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {displayValue(
                      ngo.location
                    )}
                  </strong>

                </div>

              </div>


              {ngo.distance !== undefined &&
                ngo.distance !== null && (

                  <div className="ngo_detail_item">

                    <MapPin size={19} />

                    <div>

                      <span>
                        Distance
                      </span>

                      <strong>
                        {ngo.distance} km away
                      </strong>

                    </div>

                  </div>

                )}


              <div className="ngo_detail_item">

                <Calendar size={19} />

                <div>

                  <span>
                    Founded
                  </span>

                  <strong>
                    {displayValue(
                      ngo.foundedYear
                    )}
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
                    {displayValue(
                      ngo.organizationSize
                    )}
                  </strong>

                </div>

              </div>

            </div>

          </section>


          {/* CONTACT INFORMATION */}

          <section className="ngo_info_card">

            <h2>
              Contact Information
            </h2>


            <div className="ngo_detail_list">


              <div className="ngo_detail_item">

                <Building2 size={19} />

                <div>

                  <span>
                    Contact Person
                  </span>

                  <strong>
                    {displayValue(
                      ngo.contactPersonName
                    )}
                  </strong>


                  {ngo.contactPersonRole && (

                    <small>
                      {ngo.contactPersonRole}
                    </small>

                  )}

                </div>

              </div>


              <div className="ngo_detail_item">

                <Phone size={19} />

                <div>

                  <span>
                    Phone
                  </span>

                  <strong>
                    {displayValue(
                      ngo.contactPhone
                    )}
                  </strong>

                </div>

              </div>


              <div className="ngo_detail_item">

                <Mail size={19} />

                <div>

                  <span>
                    Email
                  </span>

                  <strong>
                    {displayValue(
                      ngo.contactEmail
                    )}
                  </strong>

                </div>

              </div>


              <div className="ngo_detail_item">

                <Globe size={19} />

                <div>

                  <span>
                    Website
                  </span>

                  <strong>
                    {displayValue(
                      ngo.website
                    )}
                  </strong>

                </div>

              </div>


              <div className="ngo_detail_item">

                <Share2 size={19} />

                <div>

                  <span>
                    Social Media
                  </span>

                  <strong>
                    {displayValue(
                      ngo.socialLink
                    )}
                  </strong>

                </div>

              </div>

            </div>

          </section>


          {/* SAVE NGO */}

          <section
            className={`ngo_save_card ${
              isSaved
                ? "ngo_saved"
                : ""
            }`}
          >

            <Heart
              size={23}
              fill={
                isSaved
                  ? "red"
                  : "none"
              }
              color={
                isSaved
                  ? "red"
                  : "currentColor"
              }
            />


            <div>

              <h3>

                {isSaved
                  ? "Saved NGO"
                  : "Interested in this NGO?"}

              </h3>


              <p>

                {isSaved
                  ? "This organization has been saved to your list."
                  : "Save this organization to find it easily later."}

              </p>

            </div>


            <button
              type="button"
              className={`ngo_save_button ${
                isSaved
                  ? "saved"
                  : ""
              }`}
              onClick={handleSaveNgo}
            >

              {isSaved
                ? "Saved"
                : "Save NGO"}

            </button>

          </section>

        </aside>

      </div>

    </div>
  );
};

export default NgoProfilePublicContent;