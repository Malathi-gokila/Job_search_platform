// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext"; // Ensure this import is correct
// import ApplicantNavbar from "./ApplicantNavbar";
// import "./AppHome.css";

// function AppHome() {
//   const navigate = useNavigate();
//   const { isAuthenticated ,userEmail} = useAuth(); 
//   const [jobs, setJobs] = useState([]); // Store job data

//   // ✅ Fetch jobs from backend when page loads
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Get token from local storage
//         const response = await fetch("http://localhost:5000/api/all-jobs", {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch jobs");
//         }

//         const data = await response.json();
//         console.log("Fetched jobs:", data);
//         setJobs(data); // Update state with fetched jobs
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // Function to handle job application
//   const handleApply = (jobId) => {
//     // Navigate to the application form or handle application logic
//     navigate(`/apply/${jobId}`); // Example: navigate to an application page
//   };

//   return (
//     <div >
//       <ApplicantNavbar />
//       <div className="app-home-container">
//         <h2 style={{color:'white'}}>Available Jobs</h2>

//         {/* ✅ Display job cards dynamically */}
//         <div className="job-list">
//           {jobs.length > 0 ? (
//             jobs.map((job) => (
//               <div key={job._id} className="job-card">
//                 <h3 style={{color:'white'}}>{job.title}</h3>
//                 <p style={{color:'white'}}><strong>Description:</strong> {job.description}</p>
//                 <p style={{color:'white'}}><strong>Location:</strong> {job.location}</p>
//                 <p style={{color:'white'}}><strong>Salary:</strong> {job.salary}</p>
//                 <button onClick={() => handleApply(job._id)}
//                   style={{backgroundColor:'DarkSlateGray'}}>Apply</button> {/* Apply button */}
//               </div>
//             ))
//           ) : (
//             <p>No jobs available at the moment.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AppHome;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import ApplicantNavbar from "./ApplicantNavbar";
import "./AppHome.css";

function AppHome() {
  const navigate = useNavigate();
  const { isAuthenticated, userEmail } = useAuth(); 
  const [jobs, setJobs] = useState([]); // All jobs
  const [searchTitle, setSearchTitle] = useState(""); // For dynamic search

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/all-jobs", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        console.log("Fetched jobs:", data);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Navigate to apply page
  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  // Filter jobs based on searchTitle while typing
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <div>
      <ApplicantNavbar />
      <div className="app-home-container">
        <h2 style={{ color: 'white' }}>Available Jobs</h2>

        {/* Search input for dynamic filtering */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            style={{
              padding: '8px',
              width: '300px',
              marginBottom: '20px',
              borderRadius: '8px',
              border: '1px solid gray',
              alignItems:'center',
            }}
          />
        </div>

        {/* Job List */}
        <div className="job-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job._id} className="job-card">
                <h3 style={{ color: 'white' }}>{job.title}</h3>
                <p style={{ color: 'white' }}><strong>Description:</strong> {job.description}</p>
                <p style={{ color: 'white' }}><strong>Location:</strong> {job.location}</p>
                <p style={{ color: 'white' }}><strong>Salary:</strong> {job.salary}</p>
                <button
                  onClick={() => handleApply(job._id)}
                  style={{ backgroundColor: 'DarkSlateGray' }}
                >
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: 'white' }}>No jobs found for "{searchTitle}"</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppHome;
