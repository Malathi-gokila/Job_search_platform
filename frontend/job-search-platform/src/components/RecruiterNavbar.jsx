import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../AuthContext";

function RecruiterNavbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav>
      <ul>
        <li><Link to="/rechome">Home</Link></li>
        <li><Link to="/addJob">Add Job</Link></li>
        <li><Link to="/MyJob">My Job</Link></li>
        <li><Link to="/Applicants">Applicants</Link></li>
        <li><Link to="/Schedule">Schedule</Link></li> {/* ✅ Added Schedule Link */}
        {isAuthenticated && <li><button onClick={handleLogout}>Logout</button></li>}
      </ul>
    </nav>
  );
}

export default RecruiterNavbar;