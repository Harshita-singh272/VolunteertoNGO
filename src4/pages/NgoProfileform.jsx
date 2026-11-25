
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/NgoProfileform.css";
import InputBox from "../../src/components/InputBox.jsx";
import TextareaBox from "../../src/components/TextareaBox.jsx";
import { CAUSES } from "../../src/constants/causes.js";
import ngoContactFields from "../../src/constants/ngoContactFields.js";
import ngoTextareaFields from "../../src/constants/ngoTextareaFields.js";

const defaultNgoData = {
  organizationName: "",
  contactPersonName: "",
  contactPersonRole: "",
  contactEmail: "",
  contactPhone: "",
  location: "",
  website: "",
  socialLink: "",
  foundedYear: "",
  organizationSize: "",
  logoUrl: "",
  mission: "",
  description: "",
  programs: "",
  volunteerHelp: "",
  currentNeeds: "",
  causes: [],
};

const NgoProfileForm = ({ initialNgoData = null, onSave }) => {
  const navigate = useNavigate();

  const [ngoData, setNgoData] = useState({
    ...defaultNgoData,
    ...(initialNgoData || {}),
    logoUrl: initialNgoData?.logoUrl || initialNgoData?.logo || "",
    causes: initialNgoData?.causes || [],
  });

  const [logoPreview, setLogoPreview] = useState(
    initialNgoData?.logoUrl || initialNgoData?.logo || ""
  );

  const [step, setStep] = useState(1);
  const [causeError, setCauseError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (initialNgoData) {
      const updatedData = {
        ...defaultNgoData,
        ...initialNgoData,
        logoUrl: initialNgoData.logoUrl || initialNgoData.logo || "",
        causes: initialNgoData.causes || [],
      };

      setNgoData(updatedData);
      setLogoPreview(updatedData.logoUrl);
    } else {
      setNgoData({ ...defaultNgoData });
      setLogoPreview("");
    }
  }, [initialNgoData]);

  const handleCauseChange = (event) => {
    const { value, checked } = event.target;

    setNgoData((previousData) => ({
      ...previousData,
      causes: checked
        ? [...previousData.causes, value]
        : previousData.causes.filter((cause) => cause !== value),
    }));

    if (checked) {
      setCauseError("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNgoData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Logo must be smaller than 5MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;

      setNgoData((previousData) => ({
        ...previousData,
        logoUrl: imageData,
      }));

      setLogoPreview(imageData);
    };

    reader.onerror = () => {
      alert("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (step === 1) {
      setStep(2);
      setSaveError("");
      return;
    }

    if (ngoData.causes.length === 0) {
      setCauseError("Please select at least one area of work.");
      return;
    }

    setCauseError("");
    setSaveError("");
    setSaving(true);

    const ngoProfile = {
      organizationName: ngoData.organizationName,
      contactPersonName: ngoData.contactPersonName,
      contactPersonRole: ngoData.contactPersonRole,
      contactEmail: ngoData.contactEmail,
      contactPhone: ngoData.contactPhone,
      location: ngoData.location,
      website: ngoData.website,
      socialLink: ngoData.socialLink,
      foundedYear: ngoData.foundedYear,
      organizationSize: ngoData.organizationSize,
      logoUrl: ngoData.logoUrl || "",
      mission: ngoData.mission,
      description: ngoData.description,
      programs: ngoData.programs,
      volunteerHelp: ngoData.volunteerHelp,
      currentNeeds: ngoData.currentNeeds,
      causes: ngoData.causes,
    };

    try {
      if (onSave) {
        await onSave(ngoProfile);
      } else {
        navigate("/ngo/profile");
      }
    } catch (error) {
      setSaveError(
        error.message || "Unable to save your NGO profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const goBack = () => {
    setStep(1);
    setSaveError("");
  };

  return (
    <div className="ngo_profile_page">
      <div className="ngo_profile_card">
        <div className="ngo_profile_heading">
          <h1>
            {initialNgoData
              ? "Edit Your NGO Profile"
              : "Complete Your NGO Profile"}
          </h1>

          <p>
            Tell volunteers about your organization,
            your mission, and the work you do.
          </p>
        </div>

        <form className="ngo_profile_form" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="ngo_profile_section">
                <h1>Step: 1</h1>
                <p className="step_label">Step 1 of 2</p>
                <h2>Organization Identity</h2>

                <InputBox
                  Kind="organizationName"
                  Name="Organization Name"
                  Statename={ngoData.organizationName}
                  Place="Enter your NGO name"
                  handleChange={handleChange}
                  required
                />

                <div className="ngo_profile_field">
                  <label htmlFor="logo">Organization Logo</label>

                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />

                  {logoPreview && (
                    <div className="logo_preview">
                      <p>Preview</p>
                      <img
                        src={logoPreview}
                        alt="Organization logo preview"
                      />
                    </div>
                  )}
                </div>

                {ngoContactFields.map((field) => (
                  <InputBox
                    key={field.Kind}
                    Kind={field.Kind}
                    Name={field.Name}
                    Type={field.Type}
                    Statename={ngoData[field.Kind]}
                    Place={field.Place}
                    handleChange={handleChange}
                    {...(field.required && { required: true })}
                  />
                ))}

                <div className="ngo_profile_row">
                  <InputBox
                    Kind="foundedYear"
                    Name="Founded Year"
                    Type="number"
                    Statename={ngoData.foundedYear}
                    Place="e.g. 2015"
                    handleChange={handleChange}
                  />

                  <div className="ngo_profile_field">
                    <label htmlFor="organizationSize">
                      Organization Size
                      <span className="optional"> (Optional)</span>
                    </label>

                    <select
                      id="organizationSize"
                      name="organizationSize"
                      value={ngoData.organizationSize}
                      onChange={handleChange}
                    >
                      <option value="">Select organization size</option>
                      <option value="1-10">1 - 10 people</option>
                      <option value="11-50">11 - 50 people</option>
                      <option value="51-100">51 - 100 people</option>
                      <option value="100+">More than 100</option>
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" className="ngo_next_button">
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="ngo_textarea_section">
                <div className="step_two_heading">
                  <h1>Step: 2</h1>
                  <p className="step_label">Step 2 of 2</p>
                  <h2>Mission & Work</h2>

                  <p>
                    Help volunteers understand what your organization does,
                    who you support, and how they can contribute.
                  </p>
                </div>

                {ngoTextareaFields.map((field) => (
                  <TextareaBox
                    key={field.Kind}
                    Kind={field.Kind}
                    Name={field.Name}
                    Statename={ngoData[field.Kind]}
                    handleChange={handleChange}
                    Place={field.Place}
                    Count={field.Count}
                    {...(field.required && { required: true })}
                  />
                ))}

                <div className="ngo_causes_section">
                  <h3>Areas of Work</h3>
                  <p>Select the main causes your organization works on.</p>

                  <div className="ngo_causes_grid">
                    {CAUSES.map((cause) => (
                      <label className="ngo_cause_option" key={cause}>
                        <input
                          type="checkbox"
                          value={cause}
                          checked={ngoData.causes.includes(cause)}
                          onChange={handleCauseChange}
                        />
                        <span>{cause}</span>
                      </label>
                    ))}
                  </div>

                  {causeError && (
                    <div className="cause_error">
                      <p>{causeError}</p>
                    </div>
                  )}
                </div>
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

              <div className="ngo_form_actions">
                <button
                  type="button"
                  className="ngo_back_button"
                  onClick={goBack}
                  disabled={saving}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="ngo_profile_submit"
                  disabled={saving}
                >
                  {saving
                    ? "Saving Profile..."
                    : initialNgoData
                      ? "Save Changes"
                      : "Complete Profile"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default NgoProfileForm;
