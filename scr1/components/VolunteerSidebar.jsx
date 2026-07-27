// import React from "react";
// import {
//   LayoutDashboard,
//   User,
//   Building2,
//   Award,
//   LogOut
// } from "lucide-react";

// import "../styles/VolunteerSidebar.css";

// const VolunteerSidebar = () => {
//   return (
//     <aside className="volunteer_sidebar">

//       <div className="sidebar_brand">
//         <h2>Volunteer</h2>
//       </div>

//       <div className="sidebar_menu">

//         <button className="sidebar_link sidebar_active">
//           <LayoutDashboard size={20} />
//           <span>Dashboard</span>
//         </button>

//         <button className="sidebar_link">
//           <User size={20} />
//           <span>My Profile</span>
//         </button>

//         <button className="sidebar_link">
//           <Building2 size={20} />
//           <span>Explore NGOs</span>
//         </button>

//         <button className="sidebar_link">
//           <Award size={20} />
//           <span>Certificates</span>
//         </button>

//       </div>

//       <button className="sidebar_logout">
//         <LogOut size={25} />
//         <span>Logout</span>
//       </button>

//     </aside>
//   );
// };

// export default VolunteerSidebar;

import React, { useState } from "react";
import {
  LayoutDashboard,
  Search,
  MapPin,
  Building2,
  Award,
  Bookmark,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import "../styles/VolunteerSidebar.css";

const VolunteerSidebar = () => {

  const [discoverOpen, setDiscoverOpen] = useState(false);

  return (
    <aside className="volunteer_sidebar">

      {/* BRAND */}

      <div className="sidebar_brand">

        <div className="sidebar_brand_logo">
          🌱
        </div>

        <div>
          <h2>VolunteerConnect</h2>
          <p>Connect. Serve. Impact.</p>
        </div>

      </div>


      {/* NAVIGATION */}

      <nav className="sidebar_navigation">

        {/* DASHBOARD */}

        <button className="sidebar_link sidebar_active">

          <LayoutDashboard size={19} />

          <span>Dashboard</span>

        </button>


        {/* DISCOVER */}

        <button
          className="sidebar_link sidebar_discover"
          onClick={() => setDiscoverOpen(!discoverOpen)}
        >

          <div className="sidebar_link_left">

            <Search size={19} />

            <span>Discover</span>

          </div>

          {discoverOpen
            ? <ChevronUp size={15} />
            : <ChevronDown size={15} />
          }

        </button>


        {/* DISCOVER SUBMENU */}

        {discoverOpen && (

          <div className="sidebar_submenu">

            <button className="sidebar_submenu_link">

              <MapPin size={15} />

              <span>
                Find NGOs near me
              </span>

            </button>


            <button className="sidebar_submenu_link">

              <Building2 size={15} />

              <span>
                Browse all NGOs
              </span>

            </button>

          </div>

        )}


        {/* EXPERIENCE */}

        <button className="sidebar_link">

          <Award size={19} />

          <span>My Experience</span>

        </button>


        {/* SAVED */}

        <button className="sidebar_link">

          <Bookmark size={19} />

          <span>Saved</span>

        </button>


        {/* NOTIFICATIONS */}

        <button className="sidebar_link">

          <Bell size={19} />

          <span>Notifications</span>

          <span className="notification_badge">
            3
          </span>

        </button>


        <hr className="sidebar_divider" />


        {/* PROFILE */}

        <button className="sidebar_link">

          <User size={19} />

          <span>My Profile</span>

        </button>


        {/* SETTINGS */}

        <button className="sidebar_link">

          <Settings size={19} />

          <span>Settings</span>

        </button>

      </nav>


      {/* BOTTOM */}

      <div className="sidebar_bottom">

        <hr className="sidebar_divider" />

        <button className="sidebar_logout">

          <LogOut size={19} />

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
};

export default VolunteerSidebar;