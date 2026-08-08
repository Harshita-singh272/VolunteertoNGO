import React from "react";
import CauseCard from "./CauseCard.jsx";

const CauseGrid = ({
  causes,
  selectedCause,
  setSelectedCause
}) => {
  return (
    <section className="cause_section">

      <h2>
        Explore by Cause
      </h2>

      <div className="cause_cards">

        {causes.map((cause) => (
          <CauseCard
            key={cause}
            cause={cause}
            selectedCause={selectedCause}
            setSelectedCause={setSelectedCause}
          />
        ))}

      </div>

    </section>
  );
};

export default CauseGrid;