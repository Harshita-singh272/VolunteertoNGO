import React, { useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

// =========================
// VOLUNTEER IMPORTS
// =========================

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

// =========================
// NGO IMPORTS
// =========================

import NgoDashboard from "../src4/pages/NgoDashboard.jsx";
import NgoProfile from "../src4/pages/NgoProfile.jsx";
import NgoProfileform from "../src4/pages/NgoProfileform.jsx";
import NgoProfilePublicNgo from "../src4/pages/NgoProfilePublicNgo.jsx";

// =========================
// CONSTANTS
// =========================

import { volunteerProfileData } from "./constants/volunteerProfileData.js";
import { nearbyNgos } from "../scr1/constants/ngoConstants.js";

// =========================
// PUBLIC NGO PROFILE
// VOLUNTEER VIEW
// =========================

const NgoProfileRoute = () => {
  const { id } = useParams();

  const ngo = nearbyNgos.find(
    (item) => String(item.id) === String(id)
  );

  return <NgoProfilePublicVol ngo={ngo} />;
};

// =========================
// NGO PROFILE PREVIEW
// =========================

const NgoProfileviewRoute = () => {
  const { id } = useParams();

  const ngo = nearbyNgos.find(
    (item) => String(item.id) === String(id)
  );

  return <NgoProfilePublicNgo ngo={ngo} />;
};

// =========================
// APP ROUTES
// =========================

const AppRoutes = () => {
  const navigate = useNavigate();

  // =========================
  // VOLUNTEER PROFILE STATE
  // =========================

  const [profileData, setProfileData] = useState(
    volunteerProfileData
  );

  const handleProfileSave = (updatedProfile) => {
    setProfileData(updatedProfile);
    navigate("/volunteer-profile");
  };

  // =========================
  // NGO PROFILE STATE
  // TEMPORARY FRONTEND DATA
  // =========================

  const [ngoData, setNgoData] = useState({
    id: 1,

    organizationName: "Helping Hands Foundation",

    contactPersonName: "Priya Sharma",

    contactPersonRole: "Founder & Director",

    contactEmail: "helpinghands@example.com",

    contactPhone: "+91 98765 43210",

    location: "Delhi",

    website: "www.helpinghands.org",

    socialLink: "@helpinghands",

    foundedYear: "2015",

    organizationSize: "11-50",

    logo: null,

    mission:
      "To create equal opportunities for children and communities through education, support, and meaningful community programs.",

    description:
      "Supporting children's education and providing le~arning resources to underserved communities.",

    programs:
      "Educational workshops, learning resource distribution, community development programs, and mentorship.",

    volunteerHelp:
      "Volunteers can help with teaching, mentoring, event organization, communication, and community activities.",

    currentNeeds:
      "Teaching volunteers, educational materials, community outreach support, and event volunteers.",

    causes: [
      "Education",
      "Child Welfare",
      "Animal Welfare",
      "Community Service",
    ],
  });

  // =========================
  // NGO PROFILE SAVE
  // =========================

  const handleNgoProfileSave = (updatedNgoData) => {
    setNgoData(updatedNgoData);

    navigate("/ngo/profile");
  };

  return (
    <Routes>

      {/* =================================
          VOLUNTEER DASHBOARD
      ================================= */}

      <Route
        path="/"
        element={<VolunteerDashboard />}
      />

      {/* =================================
          NGO DISCOVERY
      ================================= */}

      <Route
        path="/nearby-ngos"
        element={<NearbyNgoPage />}
      />

      <Route
        path="/browse-ngos"
        element={<BrowseAllNgos />}
      />

      {/* =================================
          VOLUNTEER PROFILE
      ================================= */}

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

      {/* =================================
          PUBLIC NGO PROFILE
          VOLUNTEER VIEW
      ================================= */}

      <Route
        path="/ngo/:id"
        element={<NgoProfileRoute />}
      />

      {/* =================================
          VOLUNTEER EXPERIENCE
      ================================= */}

      <Route
        path="/volunteer/experience"
        element={<MyExperience />}
      />

      {/* =================================
          VOLUNTEER REQUESTS
      ================================= */}

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

      {/* =================================
          VOLUNTEER NOTIFICATIONS
      ================================= */}

      <Route
        path="/volunteer/notifications"
        element={<Notifications />}
      />

      {/* =================================
          SAVED NGOS
      ================================= */}

      <Route
        path="/volunteer/saved-ngo"
        element={<SavedNgos />}
      />

      {/* =================================
          REQUEST TO VOLUNTEER
      ================================= */}

      <Route
        path="/volunteer/request/:ngoId"
        element={
          <RequestToVolunteer
            profileData={profileData}
          />
        }
      />

      {/* =================================
          NGO DASHBOARD
      ================================= */}

      <Route
        path="/ngo-dashboard"
        element={
          <NgoDashboard
            ngoData={ngoData}
          />
        }
      />

      {/* =================================
          NGO PROFILE
      ================================= */}

      <Route
        path="/ngo/profile"
        element={
          <NgoProfile
            ngoData={ngoData}
          />
        }
      />

      {/* =================================
          NGO PROFILE EDIT
      ================================= */}

      <Route
        path="/ngo/profile/edit"
        element={
          <NgoProfileform
            initialNgoData={ngoData}
            onSave={handleNgoProfileSave}
          />
        }
      />

      {/* =================================
          NGO PROFILE PREVIEW
      ================================= */}

      <Route
        path="/ngo/:id/preview"
        element={
          <NgoProfileviewRoute />
        }
      />

    </Routes>
  );
};

export default AppRoutes;