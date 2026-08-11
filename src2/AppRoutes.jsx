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
import NgoProfilePublicVol from "./pages/NgoProfilePublicVol.jsx";

import MyExperience from "../src3/pages/MyExperience.jsx";
import SavedNgos from "../src3/pages/SavedNgos.jsx";
import RequestToVolunteer from "../src3/pages/RequestToVolunteer.jsx";
import VolunteerRequests from "../src3/pages/VolunteerRequests.jsx";
import VolunteerRequestView from "../src3/pages/VolunteerRequestView.jsx";
import Notifications from "../src3/pages/Notifications.jsx";

import NgoDashboard from "../src4/pages/NgoDashboard.jsx";
import NgoProfile from "../src4/pages/NgoProfile.jsx";
import NgoProfilePublicNgo from "../src4/pages/NgoProfilePublicNgo.jsx";

import { volunteerProfileData } from "./constants/volunteerProfileData.js";
import { nearbyNgos } from "../scr1/constants/ngoConstants.js";

const NgoProfileRoute = () => {
  const { id } = useParams();

  const ngo = nearbyNgos.find(
    (item) => String(item.id) === String(id)
  );

  return <NgoProfilePublicVol ngo={ngo} />;
};

const NgoProfileviewRoute = () => {
  const { id } = useParams();

  const ngo = nearbyNgos.find(
    (item) => String(item.id) === String(id)
  );

  return <NgoProfilePublicNgo ngo={ngo} />;
};

const AppRoutes = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] =
    useState(volunteerProfileData);

  const handleProfileSave = (updatedProfile) => {
    setProfileData(updatedProfile);
    navigate("/volunteer-profile");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<VolunteerDashboard />}
      />

      <Route
        path="/nearby-ngos"
        element={<NearbyNgoPage />}
      />

      <Route
        path="/browse-ngos"
        element={<BrowseAllNgos />}
      />

      <Route
        path="/volunteer-profile"
        element={
          <VolunteerProfile
            profileData={profileData}
          />
        }
      />

      <Route
        path="/volunteer-profile/edit"
        element={
          <VolunteerForm
            initialProfile={profileData}
            onSave={handleProfileSave}
          />
        }
      />

      <Route
        path="/ngo/:id"
        element={<NgoProfileRoute />}
      />

      <Route
        path="/volunteer/experience"
        element={<MyExperience />}
      />

      <Route
        path="/volunteer/requests"
        element={
          <VolunteerRequests
            profileData={profileData}
          />
        }
      />

      <Route
        path="/volunteer/request/view/:requestId"
        element={<VolunteerRequestView />}
      />

      <Route
        path="/volunteer/notifications"
        element={<Notifications />}
      />

      <Route
        path="/volunteer/saved-ngo"
        element={<SavedNgos />}
      />

      <Route
        path="/volunteer/request/:ngoId"
        element={
          <RequestToVolunteer
            profileData={profileData}
          />
        }
      />

      <Route
        path="/ngo-dashboard"
        element={<NgoDashboard />}
      />

      <Route
        path="/ngo/profile"
        element={<NgoProfile />}
      />

      <Route
        path="/ngo/profile/edit"
        element={<NgoProfile />}
      />

      <Route
        path="/ngo/:id/preview"
        element={<NgoProfileviewRoute />}
      />
    </Routes>
  );
};

export default AppRoutes;