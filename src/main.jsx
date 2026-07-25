import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import VolunteerProfile from './pages/VolunteerProfile.jsx'
import NgoProfile from './pages/NgoProfile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <VolunteerProfile /> */}
    <NgoProfile />
  </StrictMode>
);