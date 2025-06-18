import React, { useState, useEffect } from 'react';
import './Home1.css';

function Home1() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from API (replace with actual API call)
    const fetchJobs = async () => {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>All Jobs</h2>
      <div className="job-cards">
        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home1;
