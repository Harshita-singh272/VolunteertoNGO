import React from 'react'
import VolunteerSidebar from '../../scr1/components/VolunteerSidebar'
import Profilebar from '../../scr1/components/Profilebar'
import NgoProfilePublicContent from '../components/NgoProfilePublicContent'
import "../styles/NgoProfilePublic.css"
const NgoProfilePublicVol = ({ngo}) => {
  return (
    <div className= "ngo_profile_layout">
      <VolunteerSidebar/>
      <main className="ngo_profile_main">
        <Profilebar/>
        <NgoProfilePublicContent ngo={ngo}/>
      </main>
      
    </div>
  )
}

export default NgoProfilePublicVol;
