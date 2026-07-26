import React from "react";
import "../styles/StatCard.css";

const StatCard = (props) => {
  return (
    <div className="stat_card">

      <div className="stat_icon">
        {props.icon}
      </div>

      <div className="stat_content">

        <h2>{props.number}</h2>

        <h3>{props.title}</h3>

        <p>{props.caption}</p>

        <button
          type="button"
          onClick={props.onClick}
        >
          {props.buttonText} →
        </button>

      </div>

    </div>
  );
};

export default StatCard;