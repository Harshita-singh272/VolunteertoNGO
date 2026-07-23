import React from "react";
import Navbar from "../components/nav.jsx";
import "../styles/Home.css";
import about_section from "../components/about.jsx"
import {Star} from 'lucide-react';
import {StepForward} from 'lucide-react';
import {CircleStar} from 'lucide-react';
const Home = ({ onAuthClick }) => {
  return (
    <>
      <Navbar onAuthClick={onAuthClick} />

      <main>

        {/* HERO SECTION */}
        <section className="hero">

          <div className="hero_text">
            <h1>
              Connecting Volunteers
              <br />
              With Those Who Need Them
            </h1>

            <p>
              Connecting passionate volunteers with NGOs
              working to create meaningful change.
            </p>

            <button
              onClick={() => onAuthClick("signup")}
            >
              Get Started
            </button>
          </div>

          <div className="hero_image">
            {/* Your image */}
          </div>

        </section>

        <section
          id="about"
          className="home_section"
        >
          <h2>About Us</h2>
            <p><Star size={16} color="#171915" strokeWidth={2.50} />  VolunteerConnect helps volunteers find causes that actually fit what they can offer, and helps NGOs find volunteers suited to what the need not just a broad category tag.</p>
            <p><Star size={16} color="#171915" strokeWidth={2.50} />  Instead of scrolling through generic listings, volunteers get a short, ranked list of opportunities based on their skills and location. NGOs post what they need and get a shortlist of volunteers worth contacting.</p>
            <p><Star size={16} color="#171915" strokeWidth={2.50} />  The NGO still makes the final call.
            This is a full-stack project built to test whether simple AI matching can make it easier for volunteers and NGOs to find each other.</p>
        </section>

        <section
          id="how-it-works"
          className="home_section"
        >
          <h2>How We Work</h2>

          <p><StepForward size={16} color="#171915" strokeWidth={2.5} />  Create a profile. Volunteers list their interests, skills, and availability. NGOs post what they currently need.</p>
          <p><StepForward size={16} color="#171915" strokeWidth={2.5} />  Matching. The system compares these descriptions using semantic matching, not just keyword tags, and filters by location so results are actually nearby.</p>
          <p><StepForward size={16} color="#171915" strokeWidth={2.5} />  Review matches. Volunteers see a ranked list of opportunities. NGOs see a ranked list of applicants.</p>
          <p><StepForward size={16} color="#171915" strokeWidth={2.5} />  Apply. Volunteers apply to opportunities they like. NGOs review applications and decide who to accept.</p>
        </section>

        <section
          id="volunteer"
          className="home_section"
        >
          <h2>Role of Volunteer</h2>

          <p><CircleStar size={16} color="#171915" strokeWidth={2.5} />  Create a profile with your interests, skills, and availability. Get matched with nearby NGO opportunities, ranked by relevance. Apply to what fits, and keep track of what you've applied to and been accepted for.</p>
        </section>

        <section
          id="ngo"
          className="home_section"
        >
          <h2>Role of NGO</h2>

          <p><CircleStar size={16} color="#171915" strokeWidth={2.5} />  Create a profile and post what you currently need, in your own words. The system matches on meaning rather than a category tag, so you get a ranked list of volunteers suited to each requirement. You decide who to accept.</p>
        </section>

      </main>
    </>
  );
};

export default Home;