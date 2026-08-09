import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BrowseHeader from "../components/BrowseHeader.jsx";
import SearchFilters from "../components/SearchFilters.jsx";
import CauseGrid from "../components/CauseGrid.jsx";
import NgoGrid from "../components/NgoGrid.jsx";
import Pagination from "../components/Pagination.jsx";

import Profilebar from "../components/Profilebar.jsx";
import VolunteerSidebar from "../components/VolunteerSidebar.jsx";

import { causes } from "../constants/causes.js";
import { nearbyNgos } from "../constants/ngoConstants.js";

import "../styles/BrowseAllNgos.css";


const BrowseAllNgos = () => {

  const navigate = useNavigate();


  /* =========================
     SEARCH / FILTER STATE
  ========================= */

  const [search, setSearch] = useState("");

  const [selectedCause, setSelectedCause] =
    useState("All Causes");

  const [selectedLocation, setSelectedLocation] =
    useState("All Locations");

  const [sortBy, setSortBy] =
    useState("A-Z");


  /* =========================
     PAGINATION STATE
  ========================= */

  const [currentPage, setCurrentPage] =
    useState(1);

  const ngosPerPage = 6;


  /* =========================
     FILTER NGO DATA
  ========================= */

  const filteredNgos = useMemo(() => {

    let result = nearbyNgos.filter(
      (ngo) => {

        const searchText =
          search.toLowerCase().trim();


        const matchesSearch =
          ngo.organizationName
            .toLowerCase()
            .includes(searchText) ||

          ngo.description
            .toLowerCase()
            .includes(searchText);


        const matchesCause =
          selectedCause === "All Causes" ||
          ngo.causes.includes(selectedCause);


        const matchesLocation =
          selectedLocation === "All Locations" ||
          ngo.location === selectedLocation;


        return (
          matchesSearch &&
          matchesCause &&
          matchesLocation
        );
      }
    );


    /* =========================
       SORT
    ========================= */

    result.sort((a, b) => {

      if (sortBy === "A-Z") {

        return a.organizationName.localeCompare(
          b.organizationName
        );

      }

      return b.organizationName.localeCompare(
        a.organizationName
      );

    });


    return result;

  }, [
    search,
    selectedCause,
    selectedLocation,
    sortBy
  ]);


  /* =========================
     PAGINATION
  ========================= */

  const totalPages =
    Math.ceil(
      filteredNgos.length / ngosPerPage
    );


  const startIndex =
    (currentPage - 1) * ngosPerPage;


  const paginatedNgos =
    filteredNgos.slice(
      startIndex,
      startIndex + ngosPerPage
    );


  /* =========================
     PROFILE
  ========================= */

  const handleViewProfile = (ngo) => {

    navigate(
                  `/ngo/${ngo.id}`
                )

  };


  /* =========================
     RESET PAGE WHEN FILTER
  ========================= */

  React.useEffect(() => {

    setCurrentPage(1);

  }, [
    search,
    selectedCause,
    selectedLocation,
    sortBy
  ]);


  return (

    <div className="browse_layout">


      {/* =========================
          SIDEBAR
      ========================= */}

      <VolunteerSidebar />


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="browse_content">


        {/* PROFILE BAR */}

        <Profilebar />


        <div className="browse_page">


          {/* =========================
              HEADER
          ========================= */}

          <BrowseHeader />


          {/* =========================
              SEARCH / FILTERS
          ========================= */}

          <SearchFilters

            search={search}
            setSearch={setSearch}

            selectedCause={
              selectedCause
            }

            setSelectedCause={
              setSelectedCause
            }

            selectedLocation={
              selectedLocation
            }

            setSelectedLocation={
              setSelectedLocation
            }

            sortBy={sortBy}
            setSortBy={setSortBy}

            causes={causes}

          />


          {/* =========================
              CAUSES
          ========================= */}

          <CauseGrid

            causes={causes}

            selectedCause={
              selectedCause
            }

            setSelectedCause={
              setSelectedCause
            }

          />


          {/* =========================
              NEARBY NGO GRID
          ========================= */}

          <NgoGrid

            ngos={paginatedNgos}

            onViewProfile={
              handleViewProfile
            }

          />


          {/* =========================
              PAGINATION
          ========================= */}

          {totalPages > 1 && (

            <Pagination

              currentPage={
                currentPage
              }

              setCurrentPage={
                setCurrentPage
              }

              totalPages={
                totalPages
              }

            />

          )}

        </div>

      </main>

    </div>

  );

};


export default BrowseAllNgos;