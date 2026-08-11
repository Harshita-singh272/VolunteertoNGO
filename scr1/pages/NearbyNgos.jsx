import React, { useMemo, useState } from "react";
import { Search, MapPin, Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../styles/NearbyNgos.css";

import NgoCard from "../components/NgoCard.jsx";
import Profilebar from "../components/Profilebar.jsx";

import { nearbyNgos } from "../constants/ngoConstants.js";

const NearbyNgos = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCause, setSelectedCause] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const locations = useMemo(() => {
    const uniqueLocations = [
      ...new Set(
        nearbyNgos
          .map((ngo) => ngo.location)
          .filter(Boolean)
      ),
    ];

    return uniqueLocations;
  }, []);

  const causes = useMemo(() => {
    const allCauses = nearbyNgos.flatMap(
      (ngo) => ngo.causes || []
    );

    return [...new Set(allCauses)];
  }, []);

  const filteredNgos = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    return nearbyNgos.filter((ngo) => {
      const matchesSearch =
        !normalizedSearch ||
        ngo.organizationName
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        ngo.description
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        ngo.causes?.some((cause) =>
          cause.toLowerCase().includes(normalizedSearch)
        );

      const matchesLocation =
        selectedLocation === "All" ||
        ngo.location === selectedLocation;

      const matchesCause =
        selectedCause === "All" ||
        ngo.causes?.includes(selectedCause);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCause
      );
    });
  }, [
    searchTerm,
    selectedLocation,
    selectedCause,
  ]);

  const handleCauseFilter = (cause) => {
    setSelectedCause(cause);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("All");
    setSelectedCause("All");
  };

  return (
    <div>
      <Profilebar />

      <div className="nearby_page">
        <div className="nearby_header">
          <h1>NGOs Near You</h1>

          <p>
            Discover verified NGOs working close to
            your location.
          </p>
        </div>

        <div className="nearby_search">
          <div className="search_box">
            <Search size={18} />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search NGO..."
            />

            {searchTerm && (
              <button
                type="button"
                className="search_clear_button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="location_box">
            <MapPin size={18} />

            <select
              value={selectedLocation}
              onChange={(event) =>
                setSelectedLocation(event.target.value)
              }
            >
              <option value="All">
                All Locations
              </option>

              {locations.map((location) => (
                <option
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className={`filter_button ${
              showFilters
                ? "filter_button_active"
                : ""
            }`}
            onClick={() =>
              setShowFilters((previous) => !previous)
            }
          >
            <Filter size={18} />

            Filters
          </button>
        </div>

        {showFilters && (
          <div className="cause_filters">
            <button
              type="button"
              className={
                selectedCause === "All"
                  ? "cause_filter_active"
                  : ""
              }
              onClick={() =>
                handleCauseFilter("All")
              }
            >
              All Causes
            </button>

            {causes.map((cause) => (
              <button
                type="button"
                key={cause}
                className={
                  selectedCause === cause
                    ? "cause_filter_active"
                    : ""
                }
                onClick={() =>
                  handleCauseFilter(cause)
                }
              >
                {cause}
              </button>
            ))}

            {(searchTerm ||
              selectedLocation !== "All" ||
              selectedCause !== "All") && (
              <button
                type="button"
                className="clear_filters_button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        <div className="nearby_results_info">
          <p>
            {filteredNgos.length}{" "}
            {filteredNgos.length === 1
              ? "NGO"
              : "NGOs"}{" "}
            found
          </p>

          {(selectedLocation !== "All" ||
            selectedCause !== "All") && (
            <div className="active_filter_summary">
              {selectedLocation !== "All" && (
                <span>
                  {selectedLocation}
                </span>
              )}

              {selectedCause !== "All" && (
                <span>
                  {selectedCause}
                </span>
              )}
            </div>
          )}
        </div>

        {filteredNgos.length > 0 ? (
          <div className="nearby_cards">
            {filteredNgos.map((ngo) => (
              <NgoCard
                key={ngo.id}
                organizationName={
                  ngo.organizationName
                }
                logo={ngo.logo}
                description={ngo.description}
                causes={ngo.causes}
                distance={ngo.distance}
                location={ngo.location}
                onClick={() =>
                  navigate(`/ngo/${ngo.id}`)
                }
              />
            ))}
          </div>
        ) : (
          <div className="nearby_empty_state">
            <Search size={32} />

            <h2>No NGOs found</h2>

            <p>
              Try changing your search, location, or
              cause filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyNgos;