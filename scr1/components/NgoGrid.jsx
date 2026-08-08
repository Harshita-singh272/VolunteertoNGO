import React from "react";
import NgoListCard from "./NgoListCard.jsx";

const NgoGrid = ({
  ngos,
  onViewProfile
}) => {

  return (
    <section className="browse_organizations">

      {/* =========================
          HEADER
      ========================= */}

      <div className="organizations_header">

        <h2>
          All Organizations
        </h2>

        <span>
          {ngos.length} organizations found
        </span>

      </div>


      {/* =========================
          GRID
      ========================= */}

      <div className="browse_ngo_grid">

        {ngos.length > 0 ? (

          ngos.map((ngo) => (

            <NgoListCard
              key={ngo.id}
              ngo={ngo}
              onViewProfile={onViewProfile}
            />

          ))

        ) : (

          <div className="browse_empty">

            <h3>
              No NGOs found
            </h3>

            <p>
              Try changing your search or filters.
            </p>

          </div>

        )}

      </div>

    </section>
  );
};

export default NgoGrid;