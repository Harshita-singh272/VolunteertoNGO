import React from "react";
import {
  Search,
  Building2,
  Handshake,
  ArrowRight
} from "lucide-react";

import "../styles/GettingStartedCard.css";

const GettingStartedCard = (props) => {
  return (
    <div className ="getting_card">
    <div className="getting_started_card">

      <h3 className="getting_started_title">
        Ready to make an impact?
      </h3>


      <div className="getting_started_content">

        {/* DISCOVER */}

        <div className="getting_started_step">

          <div className="getting_started_icon">
            <Search size={29} strokeWidth={2} />
          </div>

          <div className="getting_started_text">
            <h4>Discover</h4>

            <p>
              Find an NGO
              <br />
              near you
            </p>
          </div>

        </div>


        <ArrowRight
          className="getting_started_arrow"
          size={25} strokeWidth={2.25}
        />


        {/* EXPLORE */}

        <div className="getting_started_step">

          <div className="getting_started_icon">
            <Building2 size={29} strokeWidth={2} />
          </div>

          <div className="getting_started_text">
            <h4>Explore</h4>

            <p>
              Learn about
              <br />
              their work
            </p>
          </div>

        </div>


        <ArrowRight
          className="getting_started_arrow"
          size={25} strokeWidth={2.25}
        />


        {/* CONNECT */}

        <div className="getting_started_step">

          <div className="getting_started_icon">
            <Handshake size={29} strokeWidth={2} />
          </div>

          <div className="getting_started_text">
            <h4>Connect</h4>

            <p>
              Send a
              <br />
              request
            </p>
          </div>

        </div>


        {/* BUTTON */}

        <button
          className="getting_started_button"
          type="button"
          onClick={props.onClick}
        >
          Browse NGOs
          <ArrowRight size={16} />
        </button>

      </div>
</div>
    </div>
  );
};

export default GettingStartedCard;