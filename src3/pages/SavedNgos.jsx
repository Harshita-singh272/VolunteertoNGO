import React, { useEffect, useState } from "react";
import {
  Heart,
  MapPin,
  Search,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import VolunteerSidebar from "../../scr1/components/VolunteerSidebar.jsx";
import Profilebar from "../../scr1/components/Profilebar.jsx";

import { nearbyNgos } from "../../scr1/constants/ngoConstants.js";

import "../styles/SavedNgos.css";

const SavedNgos = () => {
  const navigate = useNavigate();

  const [savedNgos, setSavedNgos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /*
   * Load saved NGOs when the page opens.
   *
   * For now the saved NGO IDs are stored in localStorage.
   * Later this can be replaced with a backend request.
   */
  useEffect(() => {
    try {
      const savedIds =
        JSON.parse(localStorage.getItem("savedNgos")) || [];

      const savedOrganizations = nearbyNgos.filter((ngo) =>
        savedIds.includes(ngo.id)
      );

      setSavedNgos(savedOrganizations);
    } catch (error) {
      console.error("Unable to load saved NGOs:", error);
      setSavedNgos([]);
    }
  }, []);

  /*
   * Remove NGO from saved list.
   */
  const handleRemove = (ngoId) => {
    const updatedNgos = savedNgos.filter(
      (ngo) => ngo.id !== ngoId
    );

    setSavedNgos(updatedNgos);

    const updatedIds = updatedNgos.map(
      (ngo) => ngo.id
    );

    localStorage.setItem(
      "savedNgos",
      JSON.stringify(updatedIds)
    );
  };

  /*
   * Open the selected NGO profile.
   */
  const handleViewProfile = (ngo) => {
    navigate(
      `/volunteer/ngo-profile/${ngo.id}`,
      {
        state: {
          ngo,
        },
      }
    );
  };

  /*
   * Search saved NGOs.
   */
  const filteredNgos = savedNgos.filter((ngo) =>
    ngo.organizationName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="saved_ngos_layout">

      <VolunteerSidebar />

      <main className="saved_ngos_main">

        <Profilebar />

        <div className="saved_ngos_page">

          {/* PAGE HEADER */}

          <div className="saved_ngos_heading">

            <div>
              <h1>
                Saved NGOs
              </h1>

              <p>
                Organizations you have saved
                and want to support.
              </p>
            </div>

            {/* SEARCH */}

            <div className="saved_ngos_search">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search saved NGOs..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

            </div>

          </div>

          {/* COUNT */}

          <div className="saved_ngos_count">

            {savedNgos.length}{" "}
            {savedNgos.length === 1
              ? "NGO"
              : "NGOs"}{" "}
            saved

          </div>


          {/* SAVED NGO LIST */}

          {filteredNgos.length > 0 ? (

            <div className="saved_ngos_list">

              {filteredNgos.map((ngo) => (

                <div
                  className="saved_ngo_card"
                  key={ngo.id}
                >

                  {/* LOGO */}

                  <div className="saved_ngo_logo">

                    {ngo.logo ? (

                      <img
                        src={ngo.logo}
                        alt={`${ngo.organizationName} logo`}
                      />

                    ) : (

                      <div className="saved_ngo_logo_placeholder">

                        {ngo.organizationName
                          ?.charAt(0)
                          .toUpperCase() || "N"}

                      </div>

                    )}

                  </div>


                  {/* INFORMATION */}

                  <div className="saved_ngo_information">

                    <h2>
                      {ngo.organizationName}
                    </h2>

                    <div className="saved_ngo_location">

                      <MapPin size={16} />

                      <span>
                        {ngo.location}
                      </span>

                      {ngo.distance !== undefined &&
                        ngo.distance !== null && (

                          <span>
                            • {ngo.distance} km away
                          </span>

                        )}

                    </div>

                    <p>
                      {ngo.description}
                    </p>

                    <div className="saved_ngo_causes">

                      {(ngo.causes || []).map(
                        (cause) => (

                          <span
                            key={cause}
                            className="saved_ngo_cause"
                          >
                            {cause}
                          </span>

                        )
                      )}

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="saved_ngo_actions">

                    <button
                      type="button"
                      className="saved_ngo_button"
                      onClick={() =>
                        handleRemove(ngo.id)
                      }
                    >

                      <Heart
                        size={18}
                        fill="red"
                        color="red"
                      />

                      Saved

                    </button>


                    <button
                      type="button"
                      className="saved_ngo_view_button"
                      onClick={() =>
                        handleViewProfile(ngo)
                      }
                    >
                      View Profile
                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            /* EMPTY STATE */

            <div className="saved_ngo_empty">

              <div className="saved_empty_icon">

                <Heart size={30} />

              </div>

              <h2>
                {searchTerm
                  ? "No NGOs found"
                  : "No saved NGOs yet"}
              </h2>

              <p>
                {searchTerm
                  ? "Try searching for another organization."
                  : "Save organizations you are interested in and they will appear here."}
              </p>

              {!searchTerm && (
                <button
                  type="button"
                  onClick={() =>
                    navigate("/browse-ngos")
                  }
                >
                  Discover NGOs
                </button>
              )}

            </div>

          )}


          {/* EXPLORE MORE CARD */}

          <div className="saved_explore_card">

            <div className="saved_explore_icon">

              <Heart size={20} />

            </div>

            <div className="saved_explore_content">

              <h3>
                Want to explore more?
              </h3>

              <p>
                Discover more amazing organizations
                and make a greater impact.
              </p>

            </div>

            <button
              type="button"
              className="saved_explore_button"
              onClick={() =>
                navigate("/browse-ngos")
              }
            >

              <Search size={16} />

              Discover NGOs

              <ArrowRight size={16} />

            </button>

          </div>

        </div>

      </main>

    </div>
  );
};

export default SavedNgos;