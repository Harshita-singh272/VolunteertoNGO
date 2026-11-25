
import React, { useEffect, useState } from "react";
import { ArrowLeft, Heart, MapPin, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import VolunteerSidebar from "../../scr1/components/VolunteerSidebar.jsx";
import Profilebar from "../../scr1/components/Profilebar.jsx";

import "../styles/RequestToVolunteer.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const RequestToVolunteer = ({ profileData }) => {
  const navigate = useNavigate();
  const { ngoId } = useParams();

  const [ngo, setNgo] = useState(null);
  const [isLoadingNgo, setIsLoadingNgo] = useState(true);
  const [reason, setReason] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchNgo = async () => {
      try {
        setIsLoadingNgo(true);
        setSubmitError("");

        const response = await fetch(`${API_URL}/api/ngos/${ngoId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to find this organization.");
        }

        const record = data.ngo;

        setNgo({
          ...record,
          id: record._id,
          logo: record.logoUrl || "",
        });
      } catch (error) {
        setSubmitError(error.message || "Unable to load this organization.");
      } finally {
        setIsLoadingNgo(false);
      }
    };

    fetchNgo();
  }, [ngoId]);

  const handleVolunteerRequestSubmit = async (event) => {
    event.preventDefault();

    if (!reason.trim()) {
      setSubmitError("Please tell the NGO why you want to volunteer.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setSubmitError("Please log in before sending a volunteer request.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(`${API_URL}/api/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ngoId: ngo._id,
          reason: reason.trim(),
          additionalMessage: additionalMessage.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not send your request.");
      }

      alert(`Your volunteer request has been sent to ${ngo.organizationName}.`);
      navigate("/volunteer/requests");
    } catch (error) {
      setSubmitError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingNgo) {
    return (
      <div className="request_page_layout">
        <VolunteerSidebar />
        <main className="request_page_main">
          <Profilebar />
          <div className="request_page">
            <p>Loading organization...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!ngo) {
    return (
      <div className="request_page_layout">
        <VolunteerSidebar />
        <main className="request_page_main">
          <Profilebar />
          <div className="request_page">
            <button
              type="button"
              className="request_back_button"
              onClick={() => navigate("/browse-ngos")}
            >
              <ArrowLeft size={17} /> Back
            </button>
            <section className="request_error_card">
              <h2>NGO not found</h2>
              <p>{submitError || "The organization could not be found."}</p>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="request_page_layout">
      <VolunteerSidebar />
      <main className="request_page_main">
        <Profilebar />
        <div className="request_page">
          <button
            type="button"
            className="request_back_button"
            onClick={() => navigate(`/ngo/${ngo.id}`)}
          >
            <ArrowLeft size={17} /> Back to NGO Profile
          </button>

          <div className="request_heading">
            <div className="request_heading_icon">
              <Heart size={25} />
            </div>
            <div>
              <h1>Request to Volunteer</h1>
              <p>
                Tell the organization why you would like to contribute your
                time and skills.
              </p>
            </div>
          </div>

          <div className="request_content">
            <section className="request_ngo_card">
              <div className="request_ngo_logo">
                {ngo.logo ? (
                  <img src={ngo.logo} alt={`${ngo.organizationName} logo`} />
                ) : (
                  <div className="request_logo_placeholder">
                    {(ngo.organizationName || "N").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="request_ngo_information">
                <span className="request_small_label">
                  You are requesting to volunteer with
                </span>
                <h2>{ngo.organizationName}</h2>
                <div className="request_location">
                  <MapPin size={16} />
                  <span>{ngo.location || "Location not provided"}</span>
                </div>
              </div>
            </section>

            <form
              className="request_form"
              onSubmit={handleVolunteerRequestSubmit}
            >
              <section className="request_section">
                <div className="request_section_heading">
                  <h2>Your Information</h2>
                  <p>This information comes from your volunteer profile.</p>
                </div>

                <div className="request_readonly_grid">
                  <div className="request_readonly_field">
                    <label>Your Name</label>
                    <div className="request_readonly_value">
                      {profileData?.fullName || "Not provided"}
                    </div>
                  </div>

                  <div className="request_readonly_field">
                    <label>Availability</label>
                    <div className="request_readonly_value">
                      {profileData?.availability || "Not provided"}
                    </div>
                  </div>

                  <div className="request_readonly_field request_full_width">
                    <label>Your Skills</label>
                    <div className="request_readonly_value">
                      {profileData?.skills || "Not provided"}
                    </div>
                  </div>
                </div>
              </section>

              <section className="request_section">
                <div className="request_section_heading">
                  <h2>Why do you want to volunteer?</h2>
                  <span className="request_required">Required</span>
                </div>

                <p className="request_field_description">
                  Tell the organization what interests you about their work
                  and why you would like to contribute.
                </p>

                <textarea
                  className="request_textarea"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  placeholder="I would like to volunteer because..."
                  rows={6}
                  required
                />

                <div className="request_character_hint">
                  {reason.length} characters
                </div>
              </section>

              <section className="request_section">
                <div className="request_section_heading">
                  <h2>Additional Message</h2>
                  <span className="request_optional">Optional</span>
                </div>

                <p className="request_field_description">
                  Share anything else you would like the organization to know.
                </p>

                <textarea
                  className="request_textarea"
                  value={additionalMessage}
                  onChange={(event) => setAdditionalMessage(event.target.value)}
                  placeholder="Add any additional information..."
                  rows={5}
                />

                <div className="request_character_hint">
                  {additionalMessage.length} characters
                </div>
              </section>

              {submitError && (
                <p role="alert" className="request_error_message">
                  {submitError}
                </p>
              )}

              <div className="request_form_actions">
                <button
                  type="button"
                  className="request_cancel_button"
                  onClick={() => navigate(`/ngo/${ngo.id}`)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="request_submit_button"
                  disabled={!reason.trim() || isSubmitting}
                >
                  <Send size={17} />
                  {isSubmitting ? "Sending..." : "Send Volunteer Request"}
                </button>
              </div>

              <p className="request_footer_note">
                Your request will be sent to the organization for review. You
                can view your submitted requests later.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RequestToVolunteer;
