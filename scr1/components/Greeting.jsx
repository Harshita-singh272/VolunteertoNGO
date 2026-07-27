import React from 'react'
import "../styles/Greeting.css"
const Greeting = (props) => {
    
const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};
  return (
    <div className="dashboard_greeting">
      <h1>{getGreeting()}, {props.volunteerName}! 👋</h1>
        <p>Small actions today, big change tomorrow.</p>
    </div>
  )
}

export default Greeting;
