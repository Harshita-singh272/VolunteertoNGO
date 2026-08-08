import React from "react";
import "../styles/NearbyNgos.css";
import { Search, MapPin, Filter } from "lucide-react";
import NgoCard from "../components/NgoCard.jsx";
import { nearbyNgos } from "../constants/ngoConstants.js";
import Profilebar from "../components/Profilebar.jsx";
const NearbyNgos = () => {
  return (
    <div>
      <Profilebar/>
    
    <div className="nearby_page">
      {/* Heading */}

      <div className="nearby_header">

        <h1>NGOs Near You</h1>

        <p>
          Discover verified NGOs working close to your location.
        </p>

      </div>

      {/* Search */}

      <div className="nearby_search">

        <div className="search_box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search NGO..."
          />

        </div>

        <div className="location_box">

          <MapPin size={18} />

          <select>
            <option>Bangalore</option>
            <option>Delhi</option>
            <option>Mumbai</option>
          </select>

        </div>

        <button className="filter_button">

          <Filter size={18} />

          Filters

        </button>

      </div>

      {/* Filters */}

      <div className="cause_filters">

        <button>Education</button>
        <button>Environment</button>
        <button>Women</button>
        <button>Animals</button>
        <button>Healthcare</button>
        <button>Community</button>

      </div>

      {/* NGO Cards */}

      <div className="nearby_cards">

        {nearbyNgos.map((ngo) => (

          <NgoCard
            key={ngo.id}
            organizationName={ngo.organizationName}
            logo={ngo.logo}
            description={ngo.description}
            causes={ngo.causes}
            distance={`${ngo.distance} km`}
            onClick={() => console.log(ngo.id)}
          />

        ))}

      </div>
</div>
    </div>
  );
};

export default NearbyNgos;