
import React, { useEffect, useState } from "react";
import "../styles/VolunteerProfileform.css";
import { CAUSES } from "../../src/constants/causes.js";

const emptyProfile = {
  fullName: "",
  phone: "",
  emergencyContact: "",
  emergencyPhone: "",
  gender: "",
  dateOfBirth: "",
  location: "",
  bio: "",
  interests: [],
  skills: "",
  availability: "",
  profileImage: null,
  profileImageUrl: "",
  consent: false,
};

const VolunteerProfileForm = ({ initialProfile = null, onSave }) => {
  const [profileData, setProfileData] = useState(emptyProfile);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (!initialProfile) {
      setProfileData(emptyProfile);
      setProfileImagePreview(null);
      return;
    }

    const existingProfile = {
      ...emptyProfile,
      ...initialProfile,
      interests: initialProfile.interests || [],
      profileImage: null,
    };

    setProfileData(existingProfile);
    setProfileImagePreview(initialProfile.profileImageUrl || null);
  }, [initialProfile]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setProfileData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInterestChange = (event) => {
    const { value, checked } = event.target;

    setProfileData((previousData) => ({
      ...previousData,
      interests: checked
        ? [...previousData.interests, value]
        : previousData.interests.filter((interest) => interest !== value),
    }));
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Profile image must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      setProfileData((previousData) => ({
        ...previousData,
        profileImage: file,
        profileImageUrl: imageData,
      }));

      setProfileImagePreview(imageData);
    };

    reader.onerror = () => {
      setSaveError("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfileData((previousData) => ({
      ...previousData,
      profileImage: null,
      profileImageUrl: "",
    }));

    setProfileImagePreview(null);

    const imageInput = document.getElementById("profileImage");

    if (imageInput) {
      imageInput.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setSaveError("");

    const volunteerProfile = {
      fullName: profileData.fullName,
      phone: profileData.phone,
      emergencyContact: profileData.emergencyContact,
      emergencyPhone: profileData.emergencyPhone,
      gender: profileData.gender,
      dateOfBirth: profileData.dateOfBirth,
      location: profileData.location,
      bio: profileData.bio,
      interests: profileData.interests,
      skills: profileData.skills,
      availability: profileData.availability,
      profileImageUrl: profileData.profileImageUrl || "",
      consent: profileData.consent,
    };

    try {
      if (!onSave) {
        throw new Error("Profile save function is unavailable.");
      }

      await onSave(volunteerProfile);
    } catch (error) {
      console.error("Volunteer profile save error:", error);
      setSaveError(
        error.message || "Unable to save your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="volunteer_profile_form_page">
      <div className="volunteer_profile_form_card">
        <div className="profile_form_heading">
          <h1>
            {initialProfile ? "Edit Your Profile" : "Complete Your Profile"}
          </h1>
          <p>
            Tell us a little about yourself so NGOs can learn more about you.
          </p>
        </div>

        <form className="volunteer_profile_form" onSubmit={handleSubmit}>
          <div className="profile_section">
            <h2>Profile Photo</h2>
            <p className="section_description">
              Add a profile photo so your profile feels more personal.
            </p>

            <div className="profile_image_upload">
              <div className="profile_image_preview">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Volunteer profile preview"
                  />
                ) : (
                  <div className="profile_image_placeholder">
                    {profileData.fullName
                      ? profileData.fullName.charAt(0).toUpperCase()
                      : "V"}
                  </div>
                )}
              </div>

              <div className="profile_image_controls">
                <label
                  htmlFor="profileImage"
                  className="profile_image_button"
                >
                  {profileImagePreview ? "Change Photo" : "Upload Photo"}
                </label>

                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleProfileImageChange}
                  hidden
                />

                {profileImagePreview && (
                  <button
                    type="button"
                    className="profile_image_remove"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </button>
                )}

                <p>JPG, PNG or WEBP. Maximum size 5MB.</p>
              </div>
            </div>
          </div>

          <div className="profile_section">
            <h2>Personal Details</h2>

            <div className="profile_fields_grid">
              <div className="profile_field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={profileData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="profile_field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="profile_field">
                <label htmlFor="emergencyContact">Emergency Contact Name</label>
                <input
                  id="emergencyContact"
                  name="emergencyContact"
                  type="text"
                  value={profileData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Emergency contact name"
                  required
                />
              </div>

              <div className="profile_field">
                <label htmlFor="emergencyPhone">Emergency Contact Number</label>
                <input
                  id="emergencyPhone"
                  name="emergencyPhone"
                  type="tel"
                  value={profileData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="Emergency phone number"
                  required
                />
              </div>

              <div className="profile_field">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile_field">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={profileData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  required
                />
              </div>
            </div>

            <div className="profile_field profile_gender_field">
              <label>Gender</label>
              <div className="gender_options">
                {[
                  ["male", "Male"],
                  ["female", "Female"],
                  ["other", "Other"],
                  ["prefer-not-to-say", "Prefer not to say"],
                ].map(([value, label]) => (
                  <label key={value}>
                    <input
                      type="radio"
                      name="gender"
                      value={value}
                      checked={profileData.gender === value}
                      onChange={handleChange}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="profile_section">
            <h2>About You</h2>
            <div className="profile_field">
              <label htmlFor="bio">
                Tell NGOs a little about yourself, your background, why you
                volunteer, or any previous volunteering experience.
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows="5"
              />
            </div>
          </div>

          <div className="profile_section">
            <h2>Your Interests</h2>
            <p className="section_description">
              Select the causes you're interested in.
            </p>

            <div className="interest_grid">
              {CAUSES.map((cause) => (
                <label className="interest_option" key={cause}>
                  <input
                    type="checkbox"
                    value={cause}
                    checked={profileData.interests.includes(cause)}
                    onChange={handleInterestChange}
                  />
                  <span>{cause}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="profile_section">
            <h2>Your Skills</h2>
            <div className="profile_field">
              <label htmlFor="skills">What skills can you contribute?</label>
              <textarea
                id="skills"
                name="skills"
                value={profileData.skills}
                onChange={handleChange}
                placeholder="Teaching, web development, social media, photography..."
                rows="4"
              />
            </div>
          </div>

          <div className="profile_section">
            <h2>Availability</h2>
            <div className="profile_field">
              <label htmlFor="availability">
                When are you usually available?
              </label>
              <select
                id="availability"
                name="availability"
                value={profileData.availability}
                onChange={handleChange}
                required
              >
                <option value="">Select availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="evenings">Evenings</option>
                <option value="flexible">Flexible</option>
                <option value="not-sure">Not Sure</option>
              </select>
            </div>
          </div>

          <div className="consent_section">
            <label className="consent_option">
              <input
                type="checkbox"
                name="consent"
                checked={profileData.consent}
                onChange={handleChange}
                required
              />
              <span>
                I confirm that I have permission to provide the emergency
                contact information entered above and consent to its use for
                safety and emergency purposes.
              </span>
            </label>
          </div>

          {saveError && (
            <p
              role="alert"
              style={{
                color: "red",
                marginBottom: "12px",
                textAlign: "center",
              }}
            >
              {saveError}
            </p>
          )}

          <button
            type="submit"
            className="volunteer_profile_submit"
            disabled={saving}
          >
            {saving
              ? "Saving Profile..."
              : initialProfile
                ? "Save Changes"
                : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerProfileForm;
