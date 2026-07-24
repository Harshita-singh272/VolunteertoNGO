import React, { useState } from "react";
import "../styles/VolunteerProfile.css";

const VolunteerProfile = () => {

  const [profileData, setProfileData] = useState({
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
    consent: false,
  });


  const interests = [
    "Education",
    "Environment",
    "Healthcare",
    "Animal Welfare",
    "Child Welfare",
    "Elderly Care",
    "Community Service",
    "Women Empowerment",
    "Disaster Relief",
    "Technology"
  ];

// Handles normal inputs, textarea, select,
// radio buttons, and the consent checkbox
const handleChange = (event) => {
  const { name, value, type, checked } = event.target;

  setProfileData((previousData) => ({
    ...previousData,

    // Checkbox needs true/false.
    // Other inputs use their value.
    [name]: type === "checkbox" ? checked : value,
  }));
};


// Handles ONLY the interest checkboxes
// because interests is an array
const handleInterestChange = (event) => {
  const { value, checked } = event.target;

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

      interests: previousData.interests.filter(
        (interest) => interest !== value
      ),
    };
  });
};


// Handles form submission
const handleSubmit = (event) => {
  event.preventDefault();

  const volunteerProfile = {
    fulName: profileData.fullName,
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
    consent: profileData.consent,
  };

  console.log(
    "Volunteer Profile:",
    volunteerProfile
  );

  // Later:
  // POST /api/volunteer/profile
};
  return (
    <div className="volunteer_profile_page">

      <div className="volunteer_profile_card">

        <div className="profile_heading">
          <h1>Complete Your Profile</h1>
          <h2>Volunteer</h2>
          <p>
            Tell us a little about yourself so we can
            find opportunities that match you.
          </p>
        </div>


        <form
          className="profile_form"
          onSubmit={handleSubmit}
        >

          {/* PERSONAL DETAILS */}

          <div className="profile_section">

            <h2>Personal Details</h2>

            <div className="profile_field">
              
              <label htmlFor="fullName">
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={profileData.fullName}
                onChange={handleChange}
                placeholder="Enter your Full Name"
                required
              />

              </div>

              <div className="profile_field">

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={profileData.phone}
                onChange={handleChange}
                placeholder="(+91) | Enter your phone number "
                required
              />

            </div>

             <div className="profile_field">

            <label htmlFor="emergencyContact">
                Emergency Contact Name
              </label>

              <input
                id="emergencyContact"
                name="emergencyContact"
                type="text"
                value={profileData.emergencyContact}
                onChange={handleChange}
                placeholder="Enter your Emergency Contact "
                required
              />

              </div>

            <div className="profile_field">


              <label htmlFor="emergencyPhone">
                Emergency Contact Number
              </label>

              <input
                id="emergencyPhone"
                name="emergencyPhone"
                type="tel"
                value={profileData.emergencyPhone}
                onChange={handleChange}
                placeholder="(+91) | Enter your Emergency phone number"
                required
              />

            </div>

            <div className="profile_field">

              <label>
                Gender
              </label>
              <div className="gender_options">
                <label >
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={profileData.gender === "male"}
                  onChange={handleChange}
                />
              Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={profileData.gender === "female"}
                  onChange={handleChange}
                />
              Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={profileData.gender === "other"}
                  onChange={handleChange}
                />
              Other
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="prefernottosay"
                  checked={profileData.gender === "prefernottosay"}
                  onChange={handleChange}
                />
              Prefer not to say
              </label>
              </div>

            </div>

            <div className="profile_field">
              <label htmlFor="dateOfBirth">
                Date of Birth
              </label>

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

              <label htmlFor="location">
                Location
              </label>

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


          {/* ABOUT */}

          <div className="profile_section">

            <h2>About You</h2>

            <div className="profile_field">

              <label htmlFor="bio">
                Tell NGOs a little about yourself, your background, why you volunteer, or any previous volunteering experience.
              </label>

              <textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                placeholder="For example: I enjoy teaching children and would like to help with education or community projects..."
                rows="5"
                required
              />

            </div>

          </div>


          {/* INTERESTS */}

          <div className="profile_section">

            <h2>Your Interests</h2>

            <p className="section_description">
              Select the causes you're interested in.
            </p>

            <div className="interest_grid">

              {interests.map((interest) => (

                <label
                  className="interest_option"
                  key={interest}
                >

                  <input
                    type="checkbox"
                    value={interest}
                    checked={
                      profileData.interests.includes(
                        interest
                      )
                    }
                    onChange={handleInterestChange}
                  />

                  <span>{interest}</span>

                </label>

              ))}

            </div>

          </div>


          {/* SKILLS */}

          <div className="profile_section">

            <h2>Your Skills</h2>

            <div className="profile_field">

              <label htmlFor="skills">
                What skills can you contribute?
              </label>

              <textarea
                id="skills"
                name="skills"
                value={profileData.skills}
                onChange={handleChange}
                placeholder="Teaching, web development, social media, photography, event management..."
                rows="4"
              />

            </div>

          </div>


          {/* AVAILABILITY */}

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

                <option value="notsure">
                  Not Sure
                </option>

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
                I confirm that I have permission to provide the
                emergency contact information entered above and
                consent to its use for safety and emergency purposes.
              </span>

            </label>
          </div>

          <button
            className="volunteer_profile_submit"
            type="submit"
          >
            Complete Profile
          </button>

        </form>

      </div>

    </div>
  );
};

export default VolunteerProfile;