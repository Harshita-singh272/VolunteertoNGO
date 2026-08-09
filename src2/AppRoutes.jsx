import React, { useState } from "react";

import {
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

import VolunteerDashboard from "../scr1/VolunteerDashboard.jsx";
import NearbyNgoPage from "../scr1/pages/NearbyNgoPage.jsx";
import BrowseAllNgos from "../scr1/pages/BrowseAllNgos.jsx";

import VolunteerForm from "./components/VolunteerProfileform.jsx";
import VolunteerProfile from "./pages/VolunteerProfile.jsx";
import NgoProfile from "./pages/NgoProfile.jsx";

import MyExperience from "../src3/pages/MyExperience.jsx";
import SavedNgos from "../src3/pages/SavedNgos.jsx";

import { volunteerProfileData } from "./constants/volunteerProfileData.js";
import { nearbyNgos } from "../scr1/constants/ngoConstants.js";


/* =========================================
   NGO PROFILE ROUTE
========================================= */

const NgoProfileRoute = () => {

  const { id } = useParams();

  const ngo = nearbyNgos.find(
    (item) =>
      String(item.id) === String(id)
  );

  return (
    <NgoProfile ngo={ngo} />
  );
};


const AppRoutes = () => {

  const navigate = useNavigate();


  /* =========================================
     VOLUNTEER PROFILE STATE
  ========================================= */

  const [profileData, setProfileData] =
    useState(volunteerProfileData);


  /* =========================================
     SAVE VOLUNTEER PROFILE
  ========================================= */

  const handleProfileSave = (updatedProfile) => {

    console.log(
      "Updated profile:",
      updatedProfile
    );

    setProfileData(updatedProfile);

    navigate("/volunteer-profile");

  };


  return (

    <Routes>


      {/* =====================================
          VOLUNTEER DASHBOARD
      ===================================== */}

      <Route
        path="/"
        element={
          <VolunteerDashboard />
        }
      />


      {/* =====================================
          NEARBY NGOs
      ===================================== */}

      <Route
        path="/nearby-ngos"
        element={
          <NearbyNgoPage />
        }
      />


      {/* =====================================
          BROWSE NGOs
      ===================================== */}

      <Route
        path="/browse-ngos"
        element={
          <BrowseAllNgos />
        }
      />


      {/* =====================================
          VOLUNTEER PROFILE
      ===================================== */}

      <Route
        path="/volunteer-profile"
        element={
          <VolunteerProfile
            profileData={profileData}
          />
        }
      />


      {/* =====================================
          EDIT VOLUNTEER PROFILE
      ===================================== */}

      <Route
        path="/volunteer-profile/edit"
        element={
          <VolunteerForm
            initialProfile={profileData}
            onSave={handleProfileSave}
          />
        }
      />


      {/* =====================================
          NGO PROFILE
      ===================================== */}

      <Route
        path="/ngo/:id"
        element={
          <NgoProfileRoute />
        }
      />
      <Route
      path="/volunteer/experience"
      element={
        <MyExperience/>
      }
      />

      <Route
      path="/volunteer/saved-ngo"
      element={<SavedNgos/>}
      />
      
    </Routes>

  );

};


export default AppRoutes;