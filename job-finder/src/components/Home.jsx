// import React, { useState } from "react";
// import "../styles.css";

// const allJobs = [
//   {
//     title: "Software Engineer",
//     company: "Google",
//     location: "Remote",
//     type: "Full-time",
//     salary: "$120,000 - $150,000 per year",
//     experience: "2+ years",
//     responsibilities:
//       "Develop scalable web applications, collaborate with teams, and maintain code quality.",
//     qualifications: "Bachelor's degree in Computer Science or equivalent experience.",
//     description: "Develop scalable web applications and collaborate with cross-functional teams."
//   },
//   {
//     title: "Data Scientist",
//     company: "Amazon",
//     location: "Seattle, WA",
//     type: "Part-time",
//     salary: "$80,000 - $110,000 per year",
//     experience: "3+ years",
//     responsibilities:
//       "Analyze large datasets, build predictive models, and improve data-driven decision-making.",
//     qualifications: "Master’s degree in Data Science, Statistics, or related field.",
//     description: "Analyze large datasets and build predictive models for e-commerce analytics."
//   },
//   {
//     title: "UI/UX Designer",
//     company: "Apple",
//     location: "Cupertino, CA",
//     type: "Full-time",
//     salary: "$90,000 - $120,000 per year",
//     experience: "2-4 years",
//     responsibilities:
//       "Design intuitive and visually appealing interfaces, conduct user research, and create wireframes.",
//     qualifications: "Bachelor’s degree in Design, Human-Computer Interaction, or related field.",
//     description: "Design intuitive and visually appealing interfaces for mobile applications."
//   }
// ];

// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredLocation, setFilteredLocation] = useState("All");
//   const [filteredType, setFilteredType] = useState("All");
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
//   const [showLoginModal, setShowLoginModal] = useState(false);

//   const filteredJobs = allJobs.filter((job) => {
//     return (
//       job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (filteredLocation === "All" || job.location === filteredLocation) &&
//       (filteredType === "All" || job.type === filteredType)
//     );
//   });

//   const handleApply = () => {
//     if (!isLoggedIn) {
//       setShowLoginModal(true); // Show login modal if not logged in
//     } else {
//       alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!`);
//     }
//   };

//   return (
//     <div className="main-container">
//       <div className="search-section">
//         <h2 className="heading">Find Your Dream Job</h2>
//         <input
//           type="text"
//           placeholder="Search jobs..."
//           className="search-box"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="filters">
//         <select value={filteredLocation} onChange={(e) => setFilteredLocation(e.target.value)}>
//           <option value="All">All Locations</option>
//           <option value="Remote">Remote</option>
//           <option value="Seattle, WA">Seattle, WA</option>
//           <option value="Cupertino, CA">Cupertino, CA</option>
//         </select>

//         <select value={filteredType} onChange={(e) => setFilteredType(e.target.value)}>
//           <option value="All">All Job Types</option>
//           <option value="Full-time">Full-time</option>
//           <option value="Part-time">Part-time</option>
//         </select>
//       </div>

//       <div className="job-list">
//         {filteredJobs.length > 0 ? (
//           filteredJobs.map((job, index) => (
//             <div key={index} className="job-card">
//               <h3>{job.title}</h3>
//               <p><strong>{job.company}</strong></p>
//               <p>{job.location} - {job.type}</p>
//               <button className="btn" onClick={() => setSelectedJob(job)}>View Details</button>
//             </div>
//           ))
//         ) : (
//           <p className="no-results">No jobs found</p>
//         )}
//       </div>

//       {/* Job Details Modal */}
//       {selectedJob && (
//         <div className="overlay">
//           <div className="job-details-modal">
//             <h3>{selectedJob.title}</h3>
//             <p><strong>Company:</strong> {selectedJob.company}</p>
//             <p><strong>Location:</strong> {selectedJob.location}</p>
//             <p><strong>Type:</strong> {selectedJob.type}</p>
//             <p><strong>Salary:</strong> {selectedJob.salary}</p>
//             <p><strong>Experience Required:</strong> {selectedJob.experience}</p>
//             <p><strong>Responsibilities:</strong> {selectedJob.responsibilities}</p>
//             <p><strong>Qualifications:</strong> {selectedJob.qualifications}</p>
//             <p>{selectedJob.description}</p>
//             <button className="btn apply-btn" onClick={handleApply}>Apply</button>
//             <button className="btn close-btn" onClick={() => setSelectedJob(null)}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="overlay">
//           <div className="login-modal">
//             <h3>Login to Apply</h3>
//             <input type="text" placeholder="Username" className="input-field"/>
//             <input type="password" placeholder="Password" className="input-field"/>
//             <button className="btn" onClick={() => { setIsLoggedIn(true); setShowLoginModal(false); }}>Login</button>
//             <button className="btn close-btn" onClick={() => setShowLoginModal(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles.css";

const allJobs = [
  {
    title: "Software Engineer",
    company: "Google",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $150,000 per year",
    experience: "2+ years",
    responsibilities:
      "Develop scalable web applications, collaborate with teams, and maintain code quality.",
    qualifications: "Bachelor's degree in Computer Science or equivalent experience.",
    description: "Develop scalable web applications and collaborate with cross-functional teams."
  },
  {
    title: "Data Scientist",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Part-time",
    salary: "$80,000 - $110,000 per year",
    experience: "3+ years",
    responsibilities:
      "Analyze large datasets, build predictive models, and improve data-driven decision-making.",
    qualifications: "Master’s degree in Data Science, Statistics, or related field.",
    description: "Analyze large datasets and build predictive models for e-commerce analytics."
  },
  {
    title: "UI/UX Designer",
    company: "Apple",
    location: "Cupertino, CA",
    type: "Full-time",
    salary: "$90,000 - $120,000 per year",
    experience: "2-4 years",
    responsibilities:
      "Design intuitive and visually appealing interfaces, conduct user research, and create wireframes.",
    qualifications: "Bachelor’s degree in Design, Human-Computer Interaction, or related field.",
    description: "Design intuitive and visually appealing interfaces for mobile applications."
  }
];

const Home = ({ isLoggedIn }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocation, setFilteredLocation] = useState("All");
  const [filteredType, setFilteredType] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  const navigate = useNavigate(); // Initialize navigation

  const filteredJobs = allJobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filteredLocation === "All" || job.location === filteredLocation) &&
      (filteredType === "All" || job.type === filteredType)
    );
  });

  const handleApply = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { job: selectedJob } });
    } else {
      navigate("/apply", { state: { job: selectedJob } });
    }
  };
  

  return (
    <div className="main-container">
      <div className="search-section">
        <h2 className="heading">Find Your Dream Job</h2>
        <input
          type="text"
          placeholder="Search jobs..."
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <select value={filteredLocation} onChange={(e) => setFilteredLocation(e.target.value)}>
          <option value="All">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="Seattle, WA">Seattle, WA</option>
          <option value="Cupertino, CA">Cupertino, CA</option>
        </select>

        <select value={filteredType} onChange={(e) => setFilteredType(e.target.value)}>
          <option value="All">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </div>

      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>{job.company}</strong></p>
              <p>{job.location} - {job.type}</p>
              <button className="btn" onClick={() => setSelectedJob(job)}>View Details</button>
            </div>
          ))
        ) : (
          <p className="no-results">No jobs found</p>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="overlay">
          <div className="job-details-modal">
            <h3>{selectedJob.title}</h3>
            <p><strong>Company:</strong> {selectedJob.company}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Type:</strong> {selectedJob.type}</p>
            <p><strong>Salary:</strong> {selectedJob.salary}</p>
            <p><strong>Experience Required:</strong> {selectedJob.experience}</p>
            <p><strong>Responsibilities:</strong> {selectedJob.responsibilities}</p>
            <p><strong>Qualifications:</strong> {selectedJob.qualifications}</p>
            <p>{selectedJob.description}</p>
            <button className="btn apply-btn" onClick={handleApply}>Apply</button>
            <button className="btn close-btn" onClick={() => setSelectedJob(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
