
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BrowseHeader from "../components/BrowseHeader.jsx";
import SearchFilters from "../components/SearchFilters.jsx";
import CauseGrid from "../components/CauseGrid.jsx";
import NgoGrid from "../components/NgoGrid.jsx";
import Pagination from "../components/Pagination.jsx";

import Profilebar from "../components/Profilebar.jsx";
import VolunteerSidebar from "../components/VolunteerSidebar.jsx";

import { causes } from "../constants/causes.js";

import "../styles/BrowseAllNgos.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BrowseAllNgos = () => {
  const navigate = useNavigate();

  const [ngos, setNgos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCause, setSelectedCause] = useState("All Causes");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("A-Z");
  const [currentPage, setCurrentPage] = useState(1);

  const ngosPerPage = 6;

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const response = await fetch(`${API_URL}/api/ngos`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load NGOs.");
        }

        const records = Array.isArray(data.ngos) ? data.ngos : [];

        setNgos(
          records.map((ngo) => ({
            ...ngo,
            id: ngo._id,
            logo: ngo.logoUrl || ngo.logo || "",
            description: ngo.description || ngo.mission || "",
            causes: Array.isArray(ngo.causes) ? ngo.causes : [],
          }))
        );
      } catch (error) {
        setLoadError(error.message || "Unable to load NGOs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNgos();
  }, []);

  const locations = useMemo(
    () => [
      "All Locations",
      ...new Set(ngos.map((ngo) => ngo.location).filter(Boolean)),
    ],
    [ngos]
  );

  const filteredNgos = useMemo(() => {
    let result = ngos.filter((ngo) => {
      const searchText = search.toLowerCase().trim();
      const name = (ngo.organizationName || "").toLowerCase();
      const description = (ngo.description || "").toLowerCase();
      const location = (ngo.location || "").toLowerCase();

      const matchesSearch =
        !searchText ||
        name.includes(searchText) ||
        description.includes(searchText) ||
        location.includes(searchText);

      const matchesCause =
        selectedCause === "All Causes" ||
        ngo.causes.includes(selectedCause);

      const matchesLocation =
        selectedLocation === "All Locations" ||
        ngo.location === selectedLocation;

      return matchesSearch && matchesCause && matchesLocation;
    });

    result.sort((a, b) => {
      const nameA = a.organizationName || "";
      const nameB = b.organizationName || "";

      return sortBy === "A-Z"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    return result;
  }, [ngos, search, selectedCause, selectedLocation, sortBy]);

  const totalPages = Math.ceil(filteredNgos.length / ngosPerPage);
  const startIndex = (currentPage - 1) * ngosPerPage;
  const paginatedNgos = filteredNgos.slice(
    startIndex,
    startIndex + ngosPerPage
  );

  const handleViewProfile = (ngo) => {
    navigate(`/ngo/${ngo.id}`);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCause, selectedLocation, sortBy]);

  return (
    <div className="browse_layout">
      <VolunteerSidebar />

      <main className="browse_content">
        <Profilebar />

        <div className="browse_page">
          <BrowseHeader />

          <SearchFilters
            search={search}
            setSearch={setSearch}
            selectedCause={selectedCause}
            setSelectedCause={setSelectedCause}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            sortBy={sortBy}
            setSortBy={setSortBy}
            causes={causes}
            locations={locations}
          />

          <CauseGrid
            causes={causes}
            selectedCause={selectedCause}
            setSelectedCause={setSelectedCause}
          />

          {isLoading ? (
            <p>Loading organizations...</p>
          ) : loadError ? (
            <p role="alert">{loadError}</p>
          ) : filteredNgos.length === 0 ? (
            <p>No organizations found.</p>
          ) : (
            <>
              <NgoGrid
                ngos={paginatedNgos}
                onViewProfile={handleViewProfile}
              />

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BrowseAllNgos;
