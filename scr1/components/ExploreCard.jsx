import React from "react";
import "../styles/ExploreCard.css";

const ExploreCard = (props) => {
  return (
    <div
      className={`explore_card explore_card--${props.variant}`}
    >
      <div className="explore_card_content">

        <div className="explore_card_header">

          <div className="explore_card_icon">
            {props.icon}
          </div>

          <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
          </div>

        </div>

        <button
          className="explore_card_button"
          onClick={props.onClick}
        >
          {props.buttonText} →
        </button>

      </div>

      <img
        className="explore_card_image"
        src={props.image}
        alt=""
      />

    </div>
  );
};

export default ExploreCard;