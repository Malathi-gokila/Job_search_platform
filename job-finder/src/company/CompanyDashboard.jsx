import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = ({ jobs, setJobs, applicants, setApplicants }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Company Dashboard</h2>
      <button className="btn" onClick={() => navigate("/add-job")}>Add Job</button>

      <h3>Job Listings</h3>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <strong>{job.title}</strong> at {job.company}
            <button className="btn" onClick={() => navigate(`/view-applicants/${index}`)}>View Applicants</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyDashboard;
