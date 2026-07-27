import React from "react";
import "../styles/NgoCard.css";

const NgoCard = (props) => {
  return (

    <div className="ngo_card">

      <div className="ngo_logo">

        {props.logo ? (
          <img
            src={props.logo}
            alt={props.organizationName}
          />
        ) : (
          <div className="ngo_placeholder_logo">
            NGO
          </div>
        )}

      </div>


      <div className="ngo_content">

        <h2>
          {props.organizationName}
        </h2>

        <p className="ngo_description">
          {props.description}
        </p>
      <div className="ngo_tags">
        {props.causes.map((cause) => (
          <span
            className="ngo_tag"
            key={cause}
          >
            {cause}
          </span>
        ))}
      </div>


      <div className="ngo_card_bottom">

        <p className="ngo_distance">
          📍 {props.distance} km away
        </p>

        <button
          type="button"
          className="ngo_button"
          onClick={props.onClick}
        >
          View Profile →
        </button>

      </div>
      </div>

    </div>

  );
};

export default NgoCard;