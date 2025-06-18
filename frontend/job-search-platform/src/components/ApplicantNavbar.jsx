import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Ensure this import is correct
import "./ApplicantNavbar.css";

function ApplicantNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="applicant-navbar">
      <ul>
        <li onClick={() => navigate("/apphome")}>Home</li>
        <li onClick={() => navigate("/applied-jobs")}>Applied Jobs</li>
        <button onClick={() => navigate('/profile')}>Profile</button>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
}

export default ApplicantNavbar;