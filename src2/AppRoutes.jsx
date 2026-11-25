
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../src/pages/Home.jsx";
import AuthForm from "../src/components/Login_card.jsx";

import VolunteerDashboard from "../scr1/VolunteerDashboard.jsx";
import NearbyNgoPage from "../scr1/pages/NearbyNgoPage.jsx";
import BrowseAllNgos from "../scr1/pages/BrowseAllNgos.jsx";

import VolunteerForm from "./components/VolunteerProfileform.jsx";
import VolunteerProfile from "./pages/VolunteerProfile.jsx";
import NgoProfilePublicVol from "./pages/NgoProfilePublicVol.jsx";

import MyExperience from "../src3/pages/MyExperience.jsx";
import SavedNgos from "../src3/pages/SavedNgos.jsx";
import RequestToVolunteer from "../src3/pages/RequesttoVolunteer.jsx";
import VolunteerRequests from "../src3/pages/VolunteerRequests.jsx";
import VolunteerRequestView from "../src3/pages/VolunteerRequestView.jsx";
import Notifications from "../src3/pages/Notifications.jsx";

import NgoDashboard from "../src4/pages/NgoDashboard.jsx";
import NgoProfile from "../src4/pages/NgoProfile.jsx";
import NgoProfileform from "../src4/pages/NgoProfileform.jsx";
import NgoProfilePublicNgo from "../src4/pages/NgoProfilePublicNgo.jsx";
import NgoVolunteerRequests from "../src4/pages/VolunteerRequests.jsx";

import { volunteerProfileData } from "./constants/volunteerProfileData.js";
import { nearbyNgos } from "../scr1/constants/ngoConstants.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const HomeRoute = ({ openAuth }) => {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  if (token && user?.role === "volunteer") {
    return <Navigate to="/volunteer-dashboard" replace />;
  }

  if (token && user?.role === "ngo") {
    return <Navigate to="/ngo-dashboard" replace />;
  }

  return <Home onAuthClick={openAuth} />;
};

const NgoProfileRoute = () => {
  const { id } = useParams();
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchNgo = async () => {
      setLoading(true);
      setError("");
      setNgo(null);

      const staticNgo = nearbyNgos.find(
        (item) => String(item.id) === String(id)
      );

      if (staticNgo) {
        if (isMounted) {
          setNgo(staticNgo);
          setLoading(false);
        }
        return;
      }

      if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        if (isMounted) {
          setError("NGO profile not found.");
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/ngos/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load NGO profile.");
        }

        if (isMounted) {
          setNgo({
            ...data.ngo,
            id: data.ngo._id,
            logo: data.ngo.logoUrl || data.ngo.logo || "",
            description:
              data.ngo.description || data.ngo.mission || "",
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load NGO profile.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNgo();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <p>Loading organization profile...</p>;
  }

  if (error || !ngo) {
    return (
      <div>
        <p role="alert">{error || "NGO profile not found."}</p>
        <button
          type="button"
          onClick={() => window.location.assign("/browse-ngos")}
        >
          Back to Browse NGOs
        </button>
      </div>
    );
  }

  return <NgoProfilePublicVol ngo={ngo} />;
};

const NgoProfileviewRoute = () => {
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNgoProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please log in again.");
        }

        const response = await fetch(`${API_URL}/api/ngos/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load NGO profile.");
        }

        setNgo({
          ...data.profile,
          id: data.profile._id,
          logo: data.profile.logoUrl || data.profile.logo || "",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNgoProfile();
  }, []);

  if (loading) {
    return <p>Loading your public profile...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!ngo) {
    return <p>NGO profile not found.</p>;
  }

  return <NgoProfilePublicNgo ngo={ngo} />;
};

const NgoProfileEditRoute = ({ onSave }) => {
  const [ngoProfile, setNgoProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNgoProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please log in again.");
        }

        const response = await fetch(`${API_URL}/api/ngos/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.status === 404) {
          setNgoProfile(null);
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Unable to load NGO profile.");
        }

        setNgoProfile(data.profile);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNgoProfile();
  }, []);

  if (loading) {
    return <p>Loading NGO profile...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!ngoProfile) {
    return <Navigate to="/ngo/profile/setup" replace />;
  }

  return (
    <NgoProfileform
      initialNgoData={ngoProfile}
      onSave={onSave}
    />
  );
};

const AppRoutes = () => {
  const navigate = useNavigate();

  const [authType, setAuthType] = useState(null);
  const [profileData, setProfileData] = useState(volunteerProfileData);
  const [ngoData, setNgoData] = useState(null);

  const openAuth = (type) => {
    setAuthType(type);
  };

  const closeAuth = () => {
    setAuthType(null);
  };

  const handleProfileSave = async (updatedProfile) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Please log in again before saving your profile."
      );
    }

    const response = await fetch(`${API_URL}/api/volunteers/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProfile),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to save volunteer profile."
      );
    }

    setProfileData(data.profile);

    navigate("/volunteer-dashboard", {
      replace: true,
    });
  };

  const handleNgoProfileSave = async (updatedNgoData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Please log in again before saving your profile."
      );
    }

    const { id, ...ngoPayload } = updatedNgoData;

    const response = await fetch(`${API_URL}/api/ngos/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ngoPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to save NGO profile."
      );
    }

    setNgoData(data.profile);

    navigate("/ngo-dashboard", {
      replace: true,
    });
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomeRoute openAuth={openAuth} />}
        />

        <Route
          path="/volunteer-dashboard"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nearby-ngos"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <NearbyNgoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/browse-ngos"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <BrowseAllNgos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer-profile/setup"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <VolunteerForm
                initialProfile={null}
                onSave={handleProfileSave}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer-profile"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <VolunteerProfile profileData={profileData} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer-profile/edit"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <VolunteerForm
                initialProfile={profileData}
                onSave={handleProfileSave}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo/:id"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <NgoProfileRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer/experience"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <MyExperience />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer/requests"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <VolunteerRequests profileData={profileData} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer/request/view/:requestId"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <VolunteerRequestView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer/notifications"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer/saved-ngo"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <SavedNgos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer/request/:ngoId"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <RequestToVolunteer profileData={profileData} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo-dashboard"
          element={
            <ProtectedRoute allowedRole="ngo">
              <NgoDashboard ngoData={ngoData} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo/profile"
          element={
            <ProtectedRoute allowedRole="ngo">
              <NgoProfile ngoData={ngoData} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo/profile/setup"
          element={
            <ProtectedRoute allowedRole="ngo">
              <NgoProfileform
                initialNgoData={null}
                onSave={handleNgoProfileSave}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo/profile/edit"
          element={
            <ProtectedRoute allowedRole="ngo">
              <NgoProfileEditRoute
                onSave={handleNgoProfileSave}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo/:id/preview"
          element={
            <ProtectedRoute allowedRole="ngo">
              <NgoProfileviewRoute />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo/requests"
          element={
            <ProtectedRoute allowedRole="ngo">
              <NgoVolunteerRequests />
            </ProtectedRoute>
          }
        />
      </Routes>

      {authType && (
        <div
          className="auth-overlay"
          onClick={closeAuth}
        >
          <div
            className="auth-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="auth-close"
              type="button"
              onClick={closeAuth}
            >
              ×
            </button>

            <AuthForm
              type={authType}
              onSuccess={closeAuth}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AppRoutes;
