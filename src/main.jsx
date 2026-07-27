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
//     {/* <NgoProfile /> */}
//     <VolunteerDashboard />
   
//   </StrictMode>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import "./index.css";

import VolunteerDashboard from "../scr1/VolunteerDashboard.jsx";
import NearbyNgos from "../scr1/pages/NearbyNgos.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<VolunteerDashboard />}
        />

        <Route
          path="/nearby-ngos"
          element={<NearbyNgos />}
        />

      </Routes>

    </BrowserRouter>

  </StrictMode>
);