import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Ensure this import is correct
import RecruiterNavbar from "./RecruiterNavbar";
import "./RecHome.css";

function RecHome() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); 
  const [jobs, setJobs] = useState([]); // Store job data

  // ✅ Fetch jobs from backend when page loads
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await fetch("http://localhost:5000/api/all-jobs", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data); // Update state with fetched jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <RecruiterNavbar /> {/* Ensure only one navbar is displayed */}

      <div className="rec-home-container">
        <h2 id='rh1'>Posted Jobs</h2>

        {/* ✅ Display job cards dynamically */}
        <div className="job-list">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
              </div>
            ))
          ) : (
            <p>No jobs posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecHome;
