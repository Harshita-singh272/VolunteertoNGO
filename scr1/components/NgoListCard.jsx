import React from "react";
import {
  MapPin
} from "lucide-react";

const NgoListCard = ({
  ngo,
  onViewProfile
}) => {

  return (
    <article className="browse_ngo_card">

      {/* =========================
          NGO ICON / LOGO
      ========================= */}

      <div className="browse_ngo_icon">

        {ngo.logo ? (

          <img
            src={ngo.logo}
            alt={`${ngo.organizationName} logo`}
          />

        ) : (

          <span>
            {ngo.organizationName
              ?.charAt(0)
              .toUpperCase()}
          </span>

        )}

      </div>


      {/* =========================
          NGO INFORMATION
      ========================= */}

      <div className="browse_ngo_content">

        <h3>
          {ngo.organizationName}
        </h3>

        <p className="browse_ngo_description">
          {ngo.description}
        </p>


        {/* TAGS */}

        <div className="browse_ngo_tags">

          {ngo.causes.map((cause) => (

            <span key={cause}>
              {cause}
            </span>

          ))}

        </div>

      </div>


      {/* =========================
          BOTTOM
      ========================= */}

      <div className="browse_ngo_bottom">

        <div className="browse_ngo_location">

          <MapPin size={15} />

          <span>
            {ngo.location}
          </span>

        </div>


        <button
          type="button"
          className="browse_profile_button"
          onClick={() =>
            onViewProfile(ngo)
          }
        >
          View Profile
        </button>

      </div>

    </article>
  );
};

export default NgoListCard;