// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import VolunteerProfile from './pages/VolunteerProfile.jsx'
// import NgoProfile from './pages/NgoProfile.jsx'
// import VolunteerDashboard from '../scr1/VolunteerDashboard.jsx'
// import loginsticker from "./assets/sticker.png";
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     {/* <App /> */}
//     {/* <VolunteerProfile /> */}
//     <NgoProfile />
//     {/* <VolunteerDashboard /> */}
   
//   </StrictMode>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./index.css";

import VolunteerDashboard from "../scr1/VolunteerDashboard.jsx";
import NearbyNgoPage from "../scr1/pages/NearbyNgoPage.jsx";
import BrowseAllNgos from "../scr1/pages/BrowseAllNgos.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>

    <BrowserRouter>

      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={<VolunteerDashboard />}
        />

        {/* NGOs Near Me */}
        <Route
          path="/nearby-ngos"
          element={<NearbyNgoPage />}
        />

        {/* Browse All NGOs */}
        <Route
          path="/browse-ngos"
          element={<BrowseAllNgos />}
        />

      </Routes>

    </BrowserRouter>

  </StrictMode>
);