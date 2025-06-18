import React from "react";
import { useParams } from "react-router-dom";

const ViewApplicants = ({ applicants, setApplicants }) => {
  const { jobId } = useParams();
  const jobApplicants = applicants.filter(app => app.job.id === parseInt(jobId));

  const selectForInterview = (index) => {
    const updatedApplicants = [...applicants];
    updatedApplicants[index].selected = true;
    setApplicants(updatedApplicants);
  };

  return (
    <div className="form-container">
      <h2>Applicants</h2>
      {jobApplicants.length > 0 ? (
        jobApplicants.map((app, index) => (
          <div key={index} className="applicant-card">
            <p><strong>Name:</strong> {app.name}</p>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Experience:</strong> {app.experience} years</p>
            <button
              className="btn"
              onClick={() => selectForInterview(index)}
            >
              Select for Interview
            </button>
          </div>
        ))
      ) : (
        <p>No applicants yet.</p>
      )}
    </div>
  );
};

export default ViewApplicants;
