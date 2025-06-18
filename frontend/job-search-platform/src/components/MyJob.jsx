import React, { useState, useEffect } from 'react';
import RecruiterNavbar from "./RecruiterNavbar";
import './MyJob.css';

function MyJob() {
  const [jobs, setJobs] = useState([]);
  // const navigate = useNavigate();
  // const { isAuthenticated, token } = useAuth(); // Get authentication state and token

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/jobs", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
  
        const data = await response.json();
        console.log("Fetched recruiter's jobs:", data); // Debugging step
        setJobs(data); 
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
  
    fetchJobs();
  }, []);
  
  
  return (
    <div>
      <RecruiterNavbar /> 
      <h2 style={{color:'white'}}>My Jobs</h2>
      <div className="job-cards">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyJob;
