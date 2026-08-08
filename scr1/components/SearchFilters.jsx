import React from "react";
import {
  Search,
  ChevronDown
} from "lucide-react";

const SearchFilters = ({
  search,
  setSearch,

  selectedCause,
  setSelectedCause,

  selectedLocation,
  setSelectedLocation,

  sortBy,
  setSortBy,

  causes
}) => {
  return (
    <div className="browse_filters">

      {/* =========================
          SEARCH
      ========================= */}

      <div className="browse_search">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search organizations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* =========================
          CAUSE
      ========================= */}

      <div className="browse_select">

        <select
          value={selectedCause}
          onChange={(e) =>
            setSelectedCause(e.target.value)
          }
        >

          <option value="All Causes">
            All Causes
          </option>

          {causes.map((cause) => (
            <option
              key={cause}
              value={cause}
            >
              {cause}
            </option>
          ))}

        </select>

        <ChevronDown size={18} />

      </div>


      {/* =========================
          LOCATION
      ========================= */}

      <div className="browse_select">

        <select
          value={selectedLocation}
          onChange={(e) =>
            setSelectedLocation(e.target.value)
          }
        >

          <option value="All Locations">
            All Locations
          </option>

          <option value="Delhi">
            Delhi
          </option>

          <option value="Gurugram">
            Gurugram
          </option>

          <option value="Noida">
            Noida
          </option>

          <option value="Bangalore">
            Bangalore
          </option>

          <option value="Mumbai">
            Mumbai
          </option>

        </select>

        <ChevronDown size={18} />

      </div>


      {/* =========================
          SORT
      ========================= */}

      <div className="browse_select">

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >

          <option value="A-Z">
            Sort by: A - Z
          </option>

          <option value="Z-A">
            Sort by: Z - A
          </option>

        </select>

        <ChevronDown size={18} />

      </div>

    </div>
  );
};

export default SearchFilters;