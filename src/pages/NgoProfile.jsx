import React, {useState} from "react";
import "../styles/NgoProfile.css";
import InputBox from "../components/InputBox.jsx"
import TextareaBox from "../components/TextareaBox.jsx"
import { CAUSES } from "../constants/causes.js";

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

  

    const handleCauseChange = (event) => {
        const { value, checked } = event.target;

        setNgoData((previousData) => {
            const updated = checked
            ? [...previousData.causes, value]
            : previousData.causes.filter((c) => c !== value);
            return { ...previousData, causes: updated };
        });

        if (checked) setCauseError("");
        };

    const [logoPreview , setLogoPreview] = useState(null)

    const [step, setStep] = useState(1);

    const goBack = () => {
        setStep(1);
    };

    const [causeError, setCauseError] = useState("");

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

        if(ngoData.causes.length === 0){
            setCauseError("Please select at  least one area of work.");
            return;
        }

        setCauseError("");
        
        console.log("Ngo Profile:" , ngoData);

        //Later:
        //POST /api/ngo/profile
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

          {step === 1 && (
         <>

            <div className="ngo_profile_section">
                <h1>Step: 1</h1>
                <p className="step_label">Step 1 of 2</p>
                <h2>Organization Identity</h2>
                
                    <InputBox 
                    Kind = 'organizationName' 
                    Name = 'Organization Name' 
                    Statename = {ngoData.organizationName} 
                    Place = 'Enter your NGO name' 
                    handleChange={handleChange}
                    required/>

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

                    <InputBox 
                    Kind = 'contactPersonName' 
                    Name = 'Contact Person Name' 
                    Statename = {ngoData.contactPersonName} 
                    Place = 'e.g. Priya Sharma' 
                    handleChange={handleChange}
                    required/>
                    
                    <InputBox 
                    Kind = 'contactPersonRole' 
                    Name = ' Contact Person Role' 
                    Statename = {ngoData.contactPersonRole} 
                    Place = 'e.g. Volunteer Coordinator' 
                    handleChange={handleChange}
                    required/>
                  
                    <InputBox 
                    Kind = 'contactEmail' 
                    Name = 'Contact Email' 
                    Type = 'email'
                    Statename = {ngoData.contactEmail} 
                    Place = 'contact@organization.org' 
                    handleChange={handleChange}
                    required/>
                   
                    <InputBox 
                    Kind = 'contactPhone' 
                    Name = 'Contact Phone Number' 
                    Type = 'tel'
                    Statename = {ngoData.contactPhone} 
                    Place = '(+91) | Enter Contact Number' 
                    handleChange={handleChange}
                    required/>
                   
                    <InputBox 
                    Kind = 'location' 
                    Name = 'Location' 
                    Statename = {ngoData.location} 
                    Place = 'City, State' 
                    handleChange={handleChange}
                    required/>

                    <InputBox 
                    Kind = 'website' 
                    Name = 'Website' 
                    Type = "url"
                    Statename = {ngoData.website} 
                    Place = 'https://yourorganization.org' 
                    handleChange={handleChange}
                    />
                  
                    <InputBox 
                    Kind = 'socialLink' 
                    Name = 'Social Media' 
                    Type = 'url'
                    Statename = {ngoData.socialLink} 
                    Place = 'Instagram, LinkedIn, Facebook, etc.' 
                    handleChange={handleChange}
                    />

                <div className="ngo_profile_row">

                    <InputBox 
                        Kind = 'foundedYear' 
                        Name = 'Founded Year' 
                        Type = 'number'
                        Statename = {ngoData.foundedYear} 
                        Place = 'e.g. 2015' 
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
                <p className="step_label">Step 2 of 2</p>
                <h2>Mission & Work</h2>

                <p>
                Help volunteers understand what your organization
                does, who you support, and how they can contribute.
                </p>
            </div>

                <TextareaBox
                Kind = 'mission'
                Name = 'Mission & Goals'
                Statename = {ngoData.mission}
                handleChange = {handleChange}
                Place = "What is your organization's mission? What change are you working toward?"
                Count = '5'
                required
                />
            
                <TextareaBox
                Kind = 'description'
                Name = 'About Your Organization'
                Statename = {ngoData.description}
                handleChange = {handleChange}
                Place = "Tell volunteers about your organization, its background, the communities you work with, and the kind of work you do."
                Count = '6'
                required
                />

                <TextareaBox
                Kind = 'programs'
                Name = 'Programs & Activities'
                Statename = {ngoData.programs}
                handleChange = {handleChange}
                Place = "Describe your regular programs, projects, events, drives, or other activities."
                Count = '5'
                required
                />

                <TextareaBox
                Kind = 'volunteerHelp'
                Name = 'How Can Volunteers Help?'
                Statename = {ngoData.volunteerHelp}
                handleChange = {handleChange}
                Place = "For example: Volunteers can participate in teaching sessions, distribution drives, community visits, event support, fundraising, technical work, or other activities."
                Count = '6'
                required
                />

                <TextareaBox
                Kind = 'currentNeeds'
                Name = 'Current Needs'
                Statename = {ngoData.currentNeeds}
                handleChange = {handleChange}
                Place = "Is there anything your organization currently needs help with? For example: volunteers for an upcoming drive, book donations, event support, etc."
                Count = '5'
                />

            <div className="ngo_causes_section">

                <h3>Areas of Work</h3>

                <p>
                Select the main causes your organization works on.
                </p>

                <div className="ngo_causes_grid">

                   {CAUSES.map((cause) => (

                        <label
                        className="ngo_cause_option"
                        key={cause}
                        >
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
                        <div className = "cause_error">
                        <p >
                            {causeError}
                        </p>
                        </div>
                    )}

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
