import React, {useState} from "react";
import "../styles/NgoProfile.css";
import TextBox from "../components/TextBox.jsx"
const NgoProfile = () => {

    const [ngoData, setNgoData] = useState({
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
        logo: null,

         mission: "",
        description: "",
        programs: "",
        volunteerHelp: "",
        currentNeeds: "",
        causes: [],
    });

    const causes = [
        "Education",
        "Environment",
        "Healthcare",
        "Animal Welfare",
        "Child Welfare",
        "Elderly Care",
        "Community Development",
        "Women Empowerment",
        "Disaster Relief",
        "Poverty Relief",
        "Disability Support",
        "Technology"
    ];

    const handleCauseChange = (event) => {
    const { value, checked } = event.target;

    setNgoData((previousData) => {

        if (checked) {
        return {
            ...previousData,
            causes: [
            ...previousData.causes,
            value
            ],
        };
        }

        return {
        ...previousData,
        causes: previousData.causes.filter(
            (cause) => cause !== value
        ),
        };
    });
    };

    const [logoPreview , setLogoPreview] = useState(null)

    const [step, setStep] = useState(1);

    const handleChange = (event) => {

        const { name, value} = event.target;

        setNgoData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

          if (step === 1) {
                setStep(2);
                return;
            }
        console.log("Ngo Profile:" , ngoData);

        //Later:
        //POST /api/ngo/profile
    };

    const goBack = () => {
        setStep(1);
    };

    const handleLogoChange = (event) => {
        const file = event.target.files[0];

        if(!file){
            return;
        }

        setNgoData((previousData) => ({
            ...previousData,
            logo: file,
        }));

        setLogoPreview(URL.createObjectURL(file));
    };

    return (
    <div className="ngo_profile_page">

      <div className="ngo_profile_card">

        <div className="ngo_profile_heading">

          <h1>Complete Your NGO Profile</h1>

          <p>
            Tell volunteers about your organization,
            your mission, and the work you do.
          </p>

        </div>


        <form
          className="ngo_profile_form"
          onSubmit={handleSubmit}
        >

          {/* ORGANIZATION IDENTITY */}
          {step === 1 && (
         <>

            <div className="ngo_profile_section">
                <h1>Step: 1</h1>
                <h2>Organization Identity</h2>
                <div className="ngo_profile_field">

                    <TextBox 
                    Kind = 'organizationName' 
                    Name = 'Organization Name' 
                    Statename = {ngoData.organizationName} 
                    Place = 'Enter your NGO name' 
                    handleChange={handleChange}
                    required/>

                </div>

                <div className="ngo_profile_field">

                    <label htmlFor="logo">
                        Organization Logo
                    </label>

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

                <div className="ngo_profile_field">

                    <TextBox 
                    Kind = 'contactPersonName' 
                    Name = 'Contact Person Name' 
                    Statename = {ngoData.contactPersonName} 
                    Place = 'e.g. Priya Sharma' 
                    handleChange={handleChange}
                    required/>
                    
                </div>


                <div className="ngo_profile_field">

                    <TextBox 
                    Kind = 'contactPersonRole' 
                    Name = ' Contact Person Role' 
                    Statename = {ngoData.contactPersonRole} 
                    Place = 'e.g. Volunteer Coordinator' 
                    handleChange={handleChange}
                    required/>
                  
                </div>

                <div className="ngo_profile_field">
                       <TextBox 
                    Kind = 'contactEmail' 
                    Name = 'Contact Email' 
                    Type = 'email'
                    Statename = {ngoData.contactEmail} 
                    Place = 'contact@organization.org' 
                    handleChange={handleChange}
                    required/>
                   
                </div>


                <div className="ngo_profile_field">

                    <TextBox 
                    Kind = 'contactPhone' 
                    Name = 'Contact Phone Number' 
                    Type = 'tel'
                    Statename = {ngoData.contactPhone} 
                    Place = '(+91) | Enter Contact Number' 
                    handleChange={handleChange}
                    required/>
                   
                </div>

                <div className="ngo_profile_field">

                    <TextBox 
                    Kind = 'location' 
                    Name = 'Location' 
                    Statename = {ngoData.location} 
                    Place = 'City, State' 
                    handleChange={handleChange}
                    required/>

                </div>

                <div className="ngo_profile_field">

                    <TextBox 
                    Kind = 'website' 
                    Name = 'Website' 
                    Type = "url"
                    Statename = {ngoData.website} 
                    Place = 'https://yourorganization.org' 
                    handleChange={handleChange}
                    />
                  
                </div>


                <div className="ngo_profile_field">

                    <TextBox 
                    Kind = 'socialLink' 
                    Name = 'Social Media' 
                    Type = 'url'
                    Statename = {ngoData.socialLink} 
                    Place = 'Instagram, LinkedIn, Facebook, etc.' 
                    handleChange={handleChange}
                    />

                </div>

                <div className="ngo_profile_row">

                    <div className="ngo_profile_field">

                    <TextBox 
                        Kind = 'foundedYear' 
                        Name = 'Founded Year' 
                        Type = 'number'
                        Statename = {ngoData.foundedYear} 
                        Place = 'e.g. 2015' 
                        handleChange={handleChange}
                    />

                    </div>


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

                        <option value="">
                            Select organization size
                        </option>

                        <option value="1-10">
                            1 - 10 people
                        </option>

                        <option value="11-50">
                            11 - 50 people
                        </option>

                        <option value="51-100">
                            51 - 100 people
                        </option>

                        <option value="100+">
                            More than 100
                        </option>

                        </select>

                    </div>

                </div>

            </div>
            
            <button
            type="submit"
            className="ngo_next_button" >
                Next
            </button>

        </>
        )}
     
        {step === 2 && (
        <>
            <div className="ngo_textarea_section">

            <div className="step_two_heading">
                <h1>Step: 2</h1>
                <h2>Mission & Work</h2>

                <p>
                Help volunteers understand what your organization
                does, who you support, and how they can contribute.
                </p>
            </div>

            <div className="ngo_textarea_field">

                <label htmlFor="mission">
                Mission & Goals
                </label>

                <textarea
                id="mission"
                name="mission"
                value={ngoData.mission}
                onChange={handleChange}
                placeholder="What is your organization's mission? What change are you working toward?"
                rows="5"
                required
                />

            </div>

            <div className="ngo_textarea_field">

                <label htmlFor="description">
                About Your Organization
                </label>

                <textarea
                id="description"
                name="description"
                value={ngoData.description}
                onChange={handleChange}
                placeholder="Tell volunteers about your organization, its background, the communities you work with, and the kind of work you do."
                rows="6"
                required
                />

            </div>

            <div className="ngo_textarea_field">

                <label htmlFor="programs">
                Programs & Activities
                </label>

                <textarea
                id="programs"
                name="programs"
                value={ngoData.programs}
                onChange={handleChange}
                placeholder="Describe your regular programs, projects, events, drives, or other activities."
                rows="5"
                required
                />

            </div>

            <div className="ngo_textarea_field">

                <label htmlFor="volunteerHelp">
                How Can Volunteers Help?
                </label>

                <textarea
                id="volunteerHelp"
                name="volunteerHelp"
                value={ngoData.volunteerHelp}
                onChange={handleChange}
                placeholder="For example: Volunteers can participate in teaching sessions, distribution drives, community visits, event support, fundraising, technical work, or other activities."
                rows="6"
                required
                />

            </div>

            <div className="ngo_textarea_field">

                <label htmlFor="currentNeeds">
                Current Needs
                <span className="optional"> (Optional)</span>
                </label>

                <textarea
                id="currentNeeds"
                name="currentNeeds"
                value={ngoData.currentNeeds}
                onChange={handleChange}
                placeholder="Is there anything your organization currently needs help with? For example: volunteers for an upcoming drive, book donations, event support, etc."
                rows="5"
                />

            </div>

            <div className="ngo_causes_section">

                <h3>Areas of Work</h3>

                <p>
                Select the main causes your organization works on.
                </p>

                <div className="ngo_causes_grid">

                    {causes.map((cause) => (

                        <label
                        className="ngo_cause_option"
                        key={cause}
                        >
                        <input
                            type="checkbox"
                            value={cause}
                            checked={ngoData.causes.includes(cause)}
                            onChange={handleCauseChange}
                            required
                        />

                        <span>{cause}</span>
                        </label>

                    ))}

                    </div>

            </div>

            </div>

            <div className="ngo_form_actions">

            <button
                type="button"
                className="ngo_back_button"
                onClick={goBack}
            >
                Back
            </button>

            <button
                type="submit"
                className="ngo_profile_submit"
            >
                Complete Profile
            </button>

            </div>

        </>
        )}

        </form>

      </div>

    </div>
  );
};

export default NgoProfile;
