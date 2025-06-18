import React, { useState, useEffect } from 'react';
import './ViewApplicants.css';

function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    // Fetch applicants from API (replace with actual API call)
    const fetchApplicants = async () => {
      const response = await fetch('/api/viewApplicants');
      const data = await response.json();
      setApplicants(data);
    };
    fetchApplicants();
  }, []);

  return (
    <div className="view-applicants-wrapper">
  <h2>View Applicants</h2>
  <div className="applicant-cards">
    {applicants.map((applicant) => (
      <div className="applicant-card" key={applicant.id}>
        <h3>{applicant.name}</h3>
        <p>Resume: {applicant.resume}</p>
      </div>
    ))}
  </div>
</div>
  );
}

export default ViewApplicants;
