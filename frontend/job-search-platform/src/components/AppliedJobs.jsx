import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Ensure this import is correct
import ApplicantNavbar from "./ApplicantNavbar";
import "./AppliedJobs.css";

function AppliedJobs() {
  const navigate = useNavigate();
  const { isAuthenticated, userEmail } = useAuth();  // Assuming you have userEmail in context
  const [appliedJobs, setAppliedJobs] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch applied jobs for the user when page loads
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        if (!userEmail) {
          alert("User is not authenticated.");
          return;
        }

        // Fetch applied resumes for the logged-in user using the user's email
        const response = await fetch("http://localhost:5000/api/applied-jobs", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,  // Add the correct token here
          },
          credentials: "include", 
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch applied jobs");
        }
        
        const jobs = await response.json();
        setAppliedJobs(jobs);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchAppliedJobs();
  }, [userEmail]); // Re-run the effect if userEmail changes

  return (
    <div>
      <ApplicantNavbar />
      
      <div className="applied-jobs-container">
        <h2 style={{color:'white'}}>Your Applied Jobs</h2>

        {/* Display job cards dynamically */}
        <div className="job-list">
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.job?.title}</h3>
              <p><strong>Description:</strong> {job.job?.description}</p>
              <p><strong>Location:</strong> {job.job?.location}</p>
              <p><strong>Salary:</strong> {job.job?.salary}</p>
              <p><strong>Status:</strong> {job.status}</p> {/* 👈 Status from Resume */}
            </div>
          ))
        ) : (
        <p>You haven't applied for any jobs yet.</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default AppliedJobs;
