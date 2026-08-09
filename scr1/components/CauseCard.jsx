import React from "react";

const CauseCard = ({
  cause,
  selectedCause,
  setSelectedCause
}) => {

  const isActive = selectedCause === cause;

  return (
    <button
      type="button"
      className={`cause_card ${
        isActive ? "cause_card_active" : ""
      }`}
      onClick={() =>
        setSelectedCause(
          isActive ? "All Causes" : cause
        )
      }
    >
      <div className="cause_content">

        <h3>
          {cause}
        </h3>

      </div>

    </button>
  );
};

export default CauseCard;