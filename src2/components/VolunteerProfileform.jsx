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


const VolunteerProfileForm = ({
  initialProfile = null,
  onSave,
}) => {

  /* =========================================
     PROFILE DATA
  ========================================= */

  const [profileData, setProfileData] =
    useState(emptyProfile);


  /* =========================================
     PROFILE IMAGE PREVIEW
  ========================================= */

  const [profileImagePreview, setProfileImagePreview] =
    useState(null);


  /* =========================================
     LOAD EXISTING PROFILE

     Used when editing an existing profile.
  ========================================= */

  useEffect(() => {

    if (!initialProfile) {

      setProfileData(emptyProfile);

      setProfileImagePreview(null);

      return;
    }


    const existingProfile = {
      ...emptyProfile,
      ...initialProfile,

      interests:
        initialProfile.interests || [],
    };


    setProfileData(existingProfile);


    /*
      If an image already exists,
      display that image.
    */

    if (initialProfile.profileImageUrl) {

      setProfileImagePreview(
        initialProfile.profileImageUrl
      );

    } else {

      setProfileImagePreview(null);

    }

  }, [initialProfile]);


  /* =========================================
     NORMAL INPUT CHANGE
  ========================================= */

  const handleChange = (event) => {

    const {
      name,
      value,
      type,
      checked,
    } = event.target;


    setProfileData((previousData) => ({

      ...previousData,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    }));

  };


  /* =========================================
     INTEREST CHANGE
  ========================================= */

  const handleInterestChange = (event) => {

    const {
      value,
      checked,
    } = event.target;


    setProfileData((previousData) => {

      if (checked) {

        return {

          ...previousData,

          interests: [
            ...previousData.interests,
            value,
          ],

        };

      }


      return {

        ...previousData,

        interests:
          previousData.interests.filter(
            (interest) =>
              interest !== value
          ),

      };

    });

  };


  /* =========================================
     PROFILE IMAGE CHANGE
  ========================================= */

  const handleProfileImageChange = (event) => {

    const file =
      event.target.files?.[0];


    if (!file) {
      return;
    }


    /* Check file type */

    if (!file.type.startsWith("image/")) {

      alert(
        "Please select a valid image file."
      );

      return;
    }


    /* Maximum 5MB */

    const maxSize =
      5 * 1024 * 1024;


    if (file.size > maxSize) {

      alert(
        "Profile image must be smaller than 5MB."
      );

      return;
    }


    /*
      Create temporary browser URL.

      This allows the image to be shown
      immediately on the profile page.

      Later, the backend will upload the
      actual File and return a permanent URL.
    */

    const previewUrl =
      URL.createObjectURL(file);


    setProfileData((previousData) => ({

      ...previousData,

      profileImage: file,

      profileImageUrl: previewUrl,

    }));


    setProfileImagePreview(
      previewUrl
    );

  };


  /* =========================================
     REMOVE IMAGE
  ========================================= */

  const handleRemoveImage = () => {

    setProfileData((previousData) => ({

      ...previousData,

      profileImage: null,

      profileImageUrl: "",

    }));


    setProfileImagePreview(null);

  };


  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = (event) => {

    event.preventDefault();


    const volunteerProfile = {

      fullName:
        profileData.fullName,

      phone:
        profileData.phone,

      emergencyContact:
        profileData.emergencyContact,

      emergencyPhone:
        profileData.emergencyPhone,

      gender:
        profileData.gender,

      dateOfBirth:
        profileData.dateOfBirth,

      location:
        profileData.location,

      bio:
        profileData.bio,

      interests:
        profileData.interests,

      skills:
        profileData.skills,

      availability:
        profileData.availability,

      profileImage:
        profileData.profileImage,

      profileImageUrl:
        profileData.profileImageUrl,

      consent:
        profileData.consent,

    };


    console.log(
      "Volunteer Profile:",
      volunteerProfile
    );


    /*
      Parent component handles the save.

      CURRENTLY:
      React state

      LATER:
      PUT /api/volunteers/profile
    */

    if (onSave) {

      onSave(
        volunteerProfile
      );

    }

  };


  return (

    <div className="volunteer_profile_form_page">

      <div className="volunteer_profile_form_card">


        {/* =================================
            HEADING
        ================================= */}

        <div className="profile_form_heading">

          <h1>

            {initialProfile
              ? "Edit Your Profile"
              : "Complete Your Profile"}

          </h1>


          <p>

            Tell us a little about yourself
            so NGOs can learn more about you.

          </p>

        </div>


        <form
          className="volunteer_profile_form"
          onSubmit={handleSubmit}
        >


          {/* =================================
              PROFILE IMAGE
          ================================= */}

          <div className="profile_section">

            <h2>
              Profile Photo
            </h2>


            <p className="section_description">

              Add a profile photo so your
              profile feels more personal.

            </p>


            <div className="profile_image_upload">


              {/* IMAGE PREVIEW */}

              <div className="profile_image_preview">

                {profileImagePreview ? (

                  <img
                    src={profileImagePreview}
                    alt="Volunteer profile preview"
                  />

                ) : (

                  <div className="profile_image_placeholder">

                    {profileData.fullName
                      ? profileData.fullName
                          .charAt(0)
                          .toUpperCase()
                      : "V"}

                  </div>

                )}

              </div>


              {/* IMAGE INPUT */}

              <div className="profile_image_controls">

                <label
                  htmlFor="profileImage"
                  className="profile_image_button"
                >

                  {profileImagePreview
                    ? "Change Photo"
                    : "Upload Photo"}

                </label>


                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={
                    handleProfileImageChange
                  }
                  hidden
                />


                {profileImagePreview && (

                  <button
                    type="button"
                    className="profile_image_remove"
                    onClick={
                      handleRemoveImage
                    }
                  >

                    Remove

                  </button>

                )}


                <p>

                  JPG, PNG or WEBP.
                  Maximum size 5MB.

                </p>

              </div>

            </div>

          </div>


          {/* =================================
              PERSONAL DETAILS
          ================================= */}

          <div className="profile_section">

            <h2>
              Personal Details
            </h2>


            <div className="profile_fields_grid">


              {/* FULL NAME */}

              <div className="profile_field">

                <label htmlFor="fullName">
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={
                    profileData.fullName
                  }
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

              </div>


              {/* PHONE */}

              <div className="profile_field">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={
                    profileData.phone
                  }
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />

              </div>


              {/* EMERGENCY CONTACT */}

              <div className="profile_field">

                <label htmlFor="emergencyContact">
                  Emergency Contact Name
                </label>

                <input
                  id="emergencyContact"
                  name="emergencyContact"
                  type="text"
                  value={
                    profileData.emergencyContact
                  }
                  onChange={handleChange}
                  placeholder="Emergency contact name"
                  required
                />

              </div>


              {/* EMERGENCY PHONE */}

              <div className="profile_field">

                <label htmlFor="emergencyPhone">
                  Emergency Contact Number
                </label>

                <input
                  id="emergencyPhone"
                  name="emergencyPhone"
                  type="tel"
                  value={
                    profileData.emergencyPhone
                  }
                  onChange={handleChange}
                  placeholder="Emergency phone number"
                  required
                />

              </div>


              {/* DATE OF BIRTH */}

              <div className="profile_field">

                <label htmlFor="dateOfBirth">
                  Date of Birth
                </label>

                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={
                    profileData.dateOfBirth
                  }
                  onChange={handleChange}
                  required
                />

              </div>


              {/* LOCATION */}

              <div className="profile_field">

                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={
                    profileData.location
                  }
                  onChange={handleChange}
                  placeholder="City, State"
                  required
                />

              </div>

            </div>


            {/* GENDER */}

            <div className="profile_field profile_gender_field">

              <label>
                Gender
              </label>


              <div className="gender_options">


                <label>

                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={
                      profileData.gender ===
                      "male"
                    }
                    onChange={handleChange}
                  />

                  Male

                </label>


                <label>

                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={
                      profileData.gender ===
                      "female"
                    }
                    onChange={handleChange}
                  />

                  Female

                </label>


                <label>

                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={
                      profileData.gender ===
                      "other"
                    }
                    onChange={handleChange}
                  />

                  Other

                </label>


                <label>

                  <input
                    type="radio"
                    name="gender"
                    value="prefer-not-to-say"
                    checked={
                      profileData.gender ===
                      "prefer-not-to-say"
                    }
                    onChange={handleChange}
                  />

                  Prefer not to say

                </label>

              </div>

            </div>

          </div>


          {/* =================================
              ABOUT
          ================================= */}

          <div className="profile_section">

            <h2>
              About You
            </h2>


            <div className="profile_field">

              <label htmlFor="bio">

                Tell NGOs a little about
                yourself, your background,
                why you volunteer, or any
                previous volunteering
                experience.

              </label>


              <textarea
                id="bio"
                name="bio"
                value={
                  profileData.bio
                }
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows="5"
              />

            </div>

          </div>


          {/* =================================
              INTERESTS
          ================================= */}

          <div className="profile_section">

            <h2>
              Your Interests
            </h2>


            <p className="section_description">

              Select the causes you're
              interested in.

            </p>


            <div className="interest_grid">

              {CAUSES.map(
                (cause) => (

                  <label
                    className="interest_option"
                    key={cause}
                  >

                    <input
                      type="checkbox"
                      value={cause}
                      checked={
                        profileData.interests.includes(
                          cause
                        )
                      }
                      onChange={
                        handleInterestChange
                      }
                    />

                    <span>
                      {cause}
                    </span>

                  </label>

                )
              )}

            </div>

          </div>


          {/* =================================
              SKILLS
          ================================= */}

          <div className="profile_section">

            <h2>
              Your Skills
            </h2>


            <div className="profile_field">

              <label htmlFor="skills">

                What skills can you
                contribute?

              </label>


              <textarea
                id="skills"
                name="skills"
                value={
                  profileData.skills
                }
                onChange={handleChange}
                placeholder="Teaching, web development, social media, photography..."
                rows="4"
              />

            </div>

          </div>


          {/* =================================
              AVAILABILITY
          ================================= */}

          <div className="profile_section">

            <h2>
              Availability
            </h2>


            <div className="profile_field">

              <label htmlFor="availability">

                When are you usually
                available?

              </label>


              <select
                id="availability"
                name="availability"
                value={
                  profileData.availability
                }
                onChange={handleChange}
                required
              >

                <option value="">
                  Select availability
                </option>

                <option value="weekdays">
                  Weekdays
                </option>

                <option value="weekends">
                  Weekends
                </option>

                <option value="evenings">
                  Evenings
                </option>

                <option value="flexible">
                  Flexible
                </option>

                <option value="not-sure">
                  Not Sure
                </option>

              </select>

            </div>

          </div>


          {/* =================================
              CONSENT
          ================================= */}

          <div className="consent_section">

            <label className="consent_option">

              <input
                type="checkbox"
                name="consent"
                checked={
                  profileData.consent
                }
                onChange={handleChange}
                required
              />

              <span>

                I confirm that I have permission
                to provide the emergency contact
                information entered above and
                consent to its use for safety
                and emergency purposes.

              </span>

            </label>

          </div>


          {/* =================================
              SUBMIT
          ================================= */}

          <button
            type="submit"
            className="volunteer_profile_submit"
          >

            {initialProfile
              ? "Save Changes"
              : "Complete Profile"}

          </button>


        </form>

      </div>

    </div>

  );

};


export default VolunteerProfileForm;