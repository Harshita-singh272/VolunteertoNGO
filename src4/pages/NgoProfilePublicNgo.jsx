import React from 'react'
import NgoSidebar from '../components/NgoSidebar'
import "../../src2/styles/NgoProfilePublic.css"
import NgoProfilePublicStatic from '../components/NgoProfilePublicStatic'

const NgoProfilePublicNgo = ({ngo}) => {
  return (
    <div className= "ngo_profile_layout">
      <NgoSidebar/>
      <main className="ngo_profile_main">
        <NgoProfilePublicStatic ngo={ngo}/>
      </main>
      
    </div>
  )
}

export default NgoProfilePublicNgo;
