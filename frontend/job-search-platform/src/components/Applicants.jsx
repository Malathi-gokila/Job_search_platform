// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import RecruiterNavbar from './RecruiterNavbar';
// import './Applicants.css';

// const Applicants = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [applicants, setApplicants] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);

//   // Fetch all jobs posted by recruiter
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5000/api/jobs', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setJobs(response.data);
//       } catch (err) {
//         console.error('Error fetching jobs:', err);
//         setError('Failed to fetch jobs.');
//       }
//     };
//     fetchJobs();
//   }, []);

//   // Fetch ranked applicants for selected job
//   useEffect(() => {
//     if (!selectedJob) return;

//     const fetchRankedApplicants = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.post(
//           'http://localhost:5000/api/rank_resumes',
//           {
//             jobId: selectedJob._id,
//             jobTitle: selectedJob.title,
//             jobDescription: selectedJob.description,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const rankedApplicants = Array.isArray(res.data.rankedResumes)
//           ? res.data.rankedResumes
//           : [];

//         const detailedApplicants = await Promise.all(
//           rankedApplicants.map(async (applicant) => {
//             try {
//               const resumeRes = await axios.get(
//                 `http://localhost:5000/api/resumes/${applicant.resumeId}`,
//                 {
//                   headers: { Authorization: `Bearer ${token}` },
//                 }
//               );
//               return {
//                 resumeId: applicant.resumeId,
//                 score: applicant.similarity,
//                 fullName: resumeRes.data.fullName || 'Unknown',
//                 email: resumeRes.data.email || 'Unknown',
//                 jobId: resumeRes.data.jobId || {},
//                 resumePath: resumeRes.data.resumePath || '',
//               };
//             } catch (err) {
//               console.error(`Error fetching resume ${applicant.resumeId}`, err);
//               return null;
//             }
//           })
//         );

//         setApplicants(detailedApplicants.filter((app) => app !== null));
//         setError(null);
//       } catch (err) {
//         console.error('Error ranking applicants:', err);
//         setError('Failed to fetch ranked applicants.');
//         setApplicants([]);
//       }
//     };

//     fetchRankedApplicants();
//   }, [selectedJob]);

//   const handleSelectApplicant = async (applicant) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:5000/api/updateApplicantStatus',
//         {
//           resumeId: applicant.resumeId,
//           status: 'Selected',
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       if (response.data.success) {
//         setSelectedApplicant(applicant);
//         // Update local applicant status
//         setApplicants((prev) =>
//           prev.map((a) =>
//             a.resumeId === applicant.resumeId
//               ? { ...a, status: 'Selected' }
//               : a
//           )
//         );
//       }
//     } catch (err) {
//       console.error('Error selecting applicant:', err);
//       setError('Failed to select applicant.');
//     }
//   };
//   return (
//     <div className="applicant-background">
//       <div className="applicants-container">
//         <RecruiterNavbar />
//         <h2 style={{ color: 'white' }}>Select a Job to View Ranked Applicants</h2>

//         {/* Job Cards */}
//         <div className="job-cards">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className={`job-card ${selectedJob?._id === job._id ? 'selected' : ''}`}
//               onClick={() => setSelectedJob(job)}
//               style={{ cursor: 'pointer' }}
//             >
//               <h3>{job.title}</h3>
//               <p>{job.description}</p>
//               <p><strong>Location:</strong> {job.location}</p>
//               <p><strong>Salary:</strong> ${job.salary}</p>
//             </div>
//           ))}
//         </div>

//         {/* Ranked Applicants */}
//         {selectedJob && (
//           <>
//             <h3 style={{ marginTop: '20px', color: 'white' }}>
//               Ranked Applicants for: <span style={{ color: 'lightgreen' }}>{selectedJob.title}</span>
//             </h3>
//             {error && <p className="text-red-500">{error}</p>}
//             {applicants.length === 0 ? (
//               <p style={{ color: 'white' }}>No applicants ranked for this job yet.</p>
//             ) : (
//               <div className="applicants-grid">
//                 {applicants.map((app) => (
//                   <div key={app.resumeId} className="applicant-card">
//                     <h3 className="applicant-title">{app.fullName}</h3>
//                     <p className="applicant-details"><strong>Email:</strong> {app.email}</p>
//                     <p className="applicant-details">
//                       <strong>Job Title:</strong> {app.jobId?.title || 'Unknown'}
//                     </p>
//                     <p className="applicant-details">
//                       <strong>Score:</strong> {app.score.toFixed(4)}
//                     </p>
//                     <a
//                       href={`http://localhost:5000/${app.resumePath.replace(/^\/+/, '')}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="resume-link"
//                     >
//                       View Resume
//                     </a>
//                     <button
//                       className="select-button"
//                       onClick={() => handleSelectApplicant(app)}
//                       disabled={app.status === 'Selected'}
//                     >
//                       Select
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Applicants;









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import RecruiterNavbar from './RecruiterNavbar';
// import './Applicants.css';

// const Applicants = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [applicants, setApplicants] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5000/api/jobs', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setJobs(response.data);
//       } catch (err) {
//         console.error('Error fetching jobs:', err);
//         setError('Failed to fetch jobs.');
//       }
//     };
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     if (!selectedJob) return;

//     const fetchRankedApplicants = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.post(
//           'http://localhost:5000/api/rank_resumes',
//           {
//             jobId: selectedJob._id,
//             jobTitle: selectedJob.title,
//             jobDescription: selectedJob.description,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const rankedApplicants = Array.isArray(res.data.rankedResumes) ? res.data.rankedResumes : [];

//         const detailedApplicants = await Promise.all(
//           rankedApplicants.map(async (applicant) => {
//             try {
//               const resumeRes = await axios.get(
//                 `http://localhost:5000/api/resumes/${applicant.resumeId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//               );
//               return {
//                 resumeId: applicant.resumeId,
//                 score: applicant.similarity,
//                 fullName: resumeRes.data.fullName || 'Unknown',
//                 email: resumeRes.data.email || 'Unknown',
//                 jobId: resumeRes.data.jobId || {},
//                 resumePath: resumeRes.data.resumePath || '',
//                 status: resumeRes.data.status || 'Not Selected',
//               };
//             } catch (err) {
//               console.error(`Error fetching resume ${applicant.resumeId}`, err);
//               return null;
//             }
//           })
//         );

//         setApplicants(detailedApplicants.filter((app) => app !== null));
//         setError(null);
//       } catch (err) {
//         console.error('Error ranking applicants:', err);
//         setError('Failed to fetch ranked applicants.');
//         setApplicants([]);
//       }
//     };

//     fetchRankedApplicants();
//   }, [selectedJob]);

//   const handleSelectApplicant = async (applicant) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:5000/api/updateApplicantStatus',
//         {
//           resumeId: applicant.resumeId,
//           status: 'Selected',
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         setApplicants((prev) =>
//           prev.map((a) =>
//             a.resumeId === applicant.resumeId
//               ? { ...a, status: 'Selected' }
//               : a
//           )
//         );
//       }
//     } catch (err) {
//       console.error('Error selecting applicant:', err);
//       setError('Failed to select applicant.');
//     }
//   };

//   const handleRejectApplicant = async (resumeId) => {
//     try {
//       await axios.post('http://localhost:5000/api/updateApplicantStatus', {
//         resumeId: resumeId,
//         status: 'Rejected'
//       });
//       alert('Applicant rejected successfully!');
//       // Optional: Refresh the list or update UI here
//     } catch (error) {
//       console.error('Error rejecting applicant:', error);
//       alert('Failed to reject applicant');
//     }
//   };

//   return (
//     <div className="applicant-background">
//       <div className="applicants-container">
//         <RecruiterNavbar />
//         <h2 style={{ color: 'white' }}>Select a Job to View Ranked Applicants</h2>

//         <div className="job-cards">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className={`job-card ${selectedJob?._id === job._id ? 'selected' : ''}`}
//               onClick={() => setSelectedJob(job)}
//               style={{ cursor: 'pointer' }}
//             >
//               <h3>{job.title}</h3>
//               <p>{job.description}</p>
//               <p><strong>Location:</strong> {job.location}</p>
//               <p><strong>Salary:</strong> ${job.salary}</p>
//             </div>
//           ))}
//         </div>

//         {selectedJob && (
//           <>
//             <h3 style={{ marginTop: '20px', color: 'white' }}>
//               Ranked Applicants for: <span style={{ color: 'lightgreen' }}>{selectedJob.title}</span>
//             </h3>
//             {error && <p className="text-red-500">{error}</p>}
//             {applicants.length === 0 ? (
//               <p style={{ color: 'white' }}>No applicants ranked for this job yet.</p>
//             ) : (
//               <div className="applicants-grid">
//                 {applicants.map((app) => (
//                   <div key={app.resumeId} className="applicant-card">
//                     <h3 className="applicant-title">{app.fullName}</h3>
//                     <p className="applicant-details"><strong>Email:</strong> {app.email}</p>
//                     <p className="applicant-details">
//                       <strong>Job Title:</strong> {app.jobId?.title || 'Unknown'}
//                     </p>
//                     <p className="applicant-details">
//                       <strong>Score:</strong> {app.score.toFixed(4)}
//                     </p>
//                     <a
//                       href={`http://localhost:5000/${app.resumePath.replace(/^\/+/, '')}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="resume-link"
//                     >
//                       View Resume
//                     </a>
//                     <div className="button-group">
//                       <button
//                         className="select-button"
//                         onClick={() => handleSelectApplicant(app)}
//                         disabled={app.status === 'Selected'}
//                       >
//                         Select
//                       </button>
//                       <button
//                         className="reject-button"
//                         onClick={() => handleRejectApplicant(resume._id)}
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Applicants;







// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import RecruiterNavbar from './RecruiterNavbar';
// import ProfileView from './ProfileView'; // Import new component
// import './Applicants.css';

// const Applicants = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [applicants, setApplicants] = useState([]);
//   const [error, setError] = useState(null);
//   const [showProfileModal, setShowProfileModal] = useState(false); // Modal state
//   const [selectedProfileEmail, setSelectedProfileEmail] = useState(null); // Selected email
//   const navigate = useNavigate();

//   const makeAuthenticatedRequest = async (config) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('No authentication token found. Please log in.');
//       navigate('/login');
//       return null;
//     }

//     try {
//       const response = await axios({
//         ...config,
//         headers: {
//           ...config.headers,
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response;
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         setError('Session expired. Please log in again.');
//         localStorage.removeItem('token');
//         navigate('/login');
//         return null;
//       }
//       throw err;
//     }
//   };

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await makeAuthenticatedRequest({
//           method: 'get',
//           url: 'http://localhost:5000/api/jobs',
//         });
//         if (response) {
//           setJobs(response.data);
//           setError(null);
//         }
//       } catch (err) {
//         console.error('Error fetching jobs:', err);
//         setError('Failed to fetch jobs.');
//       }
//     };
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     if (!selectedJob) return;

//     const fetchRankedApplicants = async () => {
//       try {
//         const res = await makeAuthenticatedRequest({
//           method: 'post',
//           url: 'http://localhost:5000/api/rank_resumes',
//           data: {
//             jobId: selectedJob._id,
//             jobTitle: selectedJob.title,
//             jobDescription: selectedJob.description,
//           },
//         });

//         if (!res) return;

//         const rankedApplicants = Array.isArray(res.data.rankedResumes) ? res.data.rankedResumes : [];

//         const detailedApplicants = await Promise.all(
//           rankedApplicants.map(async (applicant) => {
//             try {
//               const resumeRes = await makeAuthenticatedRequest({
//                 method: 'get',
//                 url: `http://localhost:5000/api/resumes/${applicant.resumeId}`,
//               });
//               if (!resumeRes) return null;
//               return {
//                 resumeId: applicant.resumeId,
//                 score: applicant.similarity,
//                 fullName: resumeRes.data.fullName || 'Unknown',
//                 email: resumeRes.data.email || 'Unknown',
//                 jobId: resumeRes.data.jobId || {},
//                 resumePath: resumeRes.data.resumePath || '',
//                 status: resumeRes.data.status || 'Not Selected',
//               };
//             } catch (err) {
//               console.error(`Error fetching resume ${applicant.resumeId}:`, err);
//               return null;
//             }
//           })
//         );

//         setApplicants(detailedApplicants.filter((app) => app !== null));
//         setError(null);
//       } catch (err) {
//         console.error('Error ranking applicants:', err);
//         setError('Failed to fetch ranked applicants.');
//         setApplicants([]);
//       }
//     };

//     fetchRankedApplicants();
//   }, [selectedJob]);

  // const handleSelectApplicant = async (applicant) => {
  //   try {
  //     const response = await makeAuthenticatedRequest({
  //       method: 'post',
  //       url: 'http://localhost:5000/api/updateApplicantStatus',
  //       data: {
  //         resumeId: applicant.resumeId,
  //         status: 'Selected',
  //       },
  //     });

  //     if (response && response.data.success) {
  //       setApplicants((prev) =>
  //         prev.map((a) =>
  //           a.resumeId === applicant.resumeId
  //             ? { ...a, status: 'Selected' }
  //             : a
  //         )
  //       );
  //       setError(null);
  //     }
  //   } catch (err) {
  //     console.error('Error selecting applicant:', err);
  //     setError('Failed to select applicant.');
  //   }
  // };

  // const handleRejectApplicant = async (resumeId) => {
  //   try {
  //     const response = await makeAuthenticatedRequest({
  //       method: 'post',
  //       url: 'http://localhost:5000/api/updateApplicantStatus',
  //       data: {
  //         resumeId,
  //         status: 'Rejected',
  //       },
  //     });

  //     if (response) {
  //       alert('Applicant rejected successfully!');
  //       setApplicants((prev) =>
  //         prev.map((a) =>
  //           a.resumeId === resumeId ? { ...a, status: 'Rejected' } : a
  //         )
  //       );
  //       setError(null);
  //     }
  //   } catch (err) {
  //     console.error('Error rejecting applicant:', err);
  //     alert('Failed to reject applicant');
  //     setError('Failed to reject applicant.');
  //   }
  // };

//   const handleViewProfile = (email) => {
//     setSelectedProfileEmail(email);
//     setShowProfileModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowProfileModal(false);
//     setSelectedProfileEmail(null);
//   };

//   return (
//     <div className="applicant-background">
//       <div className="applicants-container">
//         <RecruiterNavbar />
//         <h2 style={{ color: 'white' }}>Select a Job to View Ranked Applicants</h2>

//         <div className="job-cards">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className={`job-card ${selectedJob?._id === job._id ? 'selected' : ''}`}
//               onClick={() => setSelectedJob(job)}
//               style={{ cursor: 'pointer' }}
//             >
//               <h3>{job.title}</h3>
//               <p>{job.description}</p>
//               <p><strong>Location:</strong> {job.location}</p>
//               <p><strong>Salary:</strong> ${job.salary}</p>
//             </div>
//           ))}
//         </div>

//         {selectedJob && (
//           <>
//             <h3 style={{ marginTop: '20px', color: 'white' }}>
//               Ranked Applicants for: <span style={{ color: 'lightgreen' }}>{selectedJob.title}</span>
//             </h3>
//             {error && <p className="text-red-500">{error}</p>}
//             {applicants.length === 0 ? (
//               <p style={{ color: 'white' }}>No applicants ranked for this job yet.</p>
//             ) : (
//               <div className="applicants-grid">
//                 {applicants.map((app) => (
//                   <div key={app.resumeId} className="applicant-card">
//                     <h3 className="applicant-title">{app.fullName}</h3>
//                     <p className="applicant-details"><strong>Email:</strong> {app.email}</p>
//                     <p className="applicant-details">
//                       <strong>Job Title:</strong> {app.jobId?.title || 'Unknown'}
//                     </p>
//                     <p className="applicant-details">
//                       <strong>Score:</strong> {app.score.toFixed(4)}
//                     </p>
//                     <a
//                       href={`http://localhost:5000/${app.resumePath.replace(/^\/+/, '')}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="resume-link"
//                     >
//                       View Resume
//                     </a>
//                     <button
//                       onClick={() => handleViewProfile(app.email)}
//                       className="profile-link"
//                       style={{ color: '#1e90ff', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
//                     >
//                     Profile
//                     </button>
//                     <div className="button-group">
//                       <button
//                         className="select-button"
//                         onClick={() => handleSelectApplicant(app)}
//                         disabled={app.status === 'Selected'}
//                       >
//                         Select
//                       </button>
//                       <button
//                         className="reject-button"
//                         onClick={() => handleRejectApplicant(app.resumeId)}
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}

//         {showProfileModal && (
//           <ProfileView email={selectedProfileEmail} onClose={handleCloseModal} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Applicants;











import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecruiterNavbar from './RecruiterNavbar';
import ProfileView from './ProfileView';
import './Applicants.css'; // Ensure this CSS file exists and styles .error-message

const Applicants = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null); // Used to display errors to the user
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfileEmail, setSelectedProfileEmail] = useState(null);
  const navigate = useNavigate();

  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  // Centralized function for making authenticated API requests
  const makeAuthenticatedRequest = useCallback(async (config) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      navigate('/login');
      return null; // Important to return null so callers can check
    }

    try {
      const response = await axios({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Session expired. Please log in again.');
        localStorage.removeItem('token'); // Clear token on auth failure
        navigate('/login');
        return null; // Important to return null
      }
      // Re-throw other errors to be handled by the specific calling function's catch block
      throw err;
    }
  }, [navigate]); // navigate is a stable dependency

  // Effect to fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      setLoadingJobs(true);
      setError(null); // Clear previous errors
      try {
        const response = await makeAuthenticatedRequest({
          method: 'get',
          url: 'http://localhost:5000/api/jobs',
        });
        if (response && response.data) { // Check if response and response.data exist
          setJobs(response.data);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err); // Log the full error for debugging
        // Try to get a meaningful error message from the response, or a generic one
        const message = err.response?.data?.message || err.message || 'Failed to fetch jobs.';
        setError(message);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, [makeAuthenticatedRequest]); // Dependency: makeAuthenticatedRequest

  // Effect to fetch ranked applicants when a job is selected
  useEffect(() => {
    if (!selectedJob) {
      setApplicants([]); // Clear applicants if no job is selected
      setError(null);   // Clear error when no job is selected
      return;
    }

    const fetchRankedApplicants = async () => {
      setLoadingApplicants(true);
      setError(null); // Clear previous errors specific to applicant fetching
      setApplicants([]); // Clear previous applicants before fetching new ones

      try {
        // Step 1: Get ranked resume IDs and scores
        const rankResponse = await makeAuthenticatedRequest({
          method: 'post',
          url: 'http://localhost:5000/api/rank_resumes',
          data: {
            jobId: selectedJob._id,
            jobTitle: selectedJob.title,
            jobDescription: selectedJob.description,
          },
        });

        // If rankResponse is null (e.g., auth error handled by makeAuthenticatedRequest) or no data
        if (!rankResponse || !rankResponse.data) {
            // Error might have been set by makeAuthenticatedRequest or it's an unexpected empty response
            if (!error) setError('Failed to get ranking data.'); // Set a generic error if none exists
            setLoadingApplicants(false); // Ensure loading is stopped
            return;
        }
        
        const rankedResumeIdsAndScores = Array.isArray(rankResponse.data.rankedResumes)
          ? rankResponse.data.rankedResumes
          : [];

        if (rankResponse.data.message && rankedResumeIdsAndScores.length === 0) {
          console.log('Info from server (rank_resumes):', rankResponse.data.message);
          // Optionally, display this message to the user if it's not an error
          // For example, if (setError) setError(rankResponse.data.message) but as info, not error.
        }

        if (rankedResumeIdsAndScores.length === 0) {
          setApplicants([]); // Ensure applicants are empty if none are ranked
          // Optionally, set a message like "No applicants to rank for this job."
          // if (!rankResponse.data.message) setError("No applicants found or ranked for this job.");
          setLoadingApplicants(false);
          return;
        }
        
        // Step 2: Fetch full details for each ranked applicant
        const detailedApplicantsPromises = rankedResumeIdsAndScores.map(async (rankedApp) => {
          try {
            const resumeDetailResponse = await makeAuthenticatedRequest({
              method: 'get',
              url: `http://localhost:5000/api/resumes/${rankedApp.resumeId}`,
            });

            if (!resumeDetailResponse || !resumeDetailResponse.data) {
              // Handle case where individual resume fetch fails or returns no data
              console.warn(`No details found for resumeId: ${rankedApp.resumeId}`);
              return { // Return a placeholder or minimal data
                resumeId: rankedApp.resumeId,
                score: rankedApp.similarity,
                fullName: 'Details not found',
                email: 'N/A',
                jobId: selectedJob._id, // Assuming it's for the current job
                resumePath: '',
                status: 'Error loading',
              };
            }
            return {
              ...resumeDetailResponse.data,   // Spread all data from resume endpoint (e.g., fullName, email, resumePath, status)
              resumeId: rankedApp.resumeId,   // Ensure this ID is consistent
              score: rankedApp.similarity,    // Use the similarity score from the ranking step
            };
          } catch (detailError) {
            console.error(`Error fetching resume details for ${rankedApp.resumeId}:`, detailError);
            return { // Return a placeholder on error
              resumeId: rankedApp.resumeId,
              score: rankedApp.similarity, // Still show score if available
              fullName: 'Error loading details',
              email: 'N/A',
              jobId: selectedJob._id,
              resumePath: '',
              status: 'Error', // Indicate an error state for this applicant
            };
          }
        });

        const resolvedDetailedApplicants = await Promise.all(detailedApplicantsPromises);
        setApplicants(resolvedDetailedApplicants.filter(app => app !== null));

      } catch (err) { // This catches errors from makeAuthenticatedRequest (e.g., 500 from rank_resumes)
        console.error('Error in fetchRankedApplicants process:', err); // This was the line 825 error.
        const message = err.response?.data?.message || err.message || 'Failed to fetch or process ranked applicants.';
        setError(message);
        setApplicants([]); // Ensure applicants are cleared on error
      } finally {
        setLoadingApplicants(false);
      }
    };

    fetchRankedApplicants();
  }, [selectedJob, makeAuthenticatedRequest, error]); // Added `error` to deps to potentially clear if it was set by auth

  // Handler to select an applicant
  // const handleSelectApplicant = async (applicant) => {
  //   setError(null); // Clear previous errors
  //   try {
  //     const response = await makeAuthenticatedRequest({
  //       method: 'post',
  //       url: 'http://localhost:5000/api/updateApplicantStatus',
  //       data: {
  //         resumeId: applicant.resumeId,
  //         status: 'Selected',
  //       },
  //     });

  //     if (response && response.data && response.data.success) {
  //       setApplicants((prevApplicants) =>
  //         prevApplicants.map((a) =>
  //           a.resumeId === applicant.resumeId ? { ...a, status: 'Selected' } : a
  //         )
  //       );
  //     } else {
  //       const message = response?.data?.message || 'Failed to update applicant status.';
  //       setError(message);
  //       console.error('Error selecting applicant (server response):', response?.data);
  //     }
  //   } catch (err) {
  //     console.error('Error selecting applicant (network/request):', err);
  //     const message = err.response?.data?.message || err.message || 'Failed to select applicant.';
  //     setError(message);
  //   }
  // };

  // // Handler to reject an applicant
  // const handleRejectApplicant = async (resumeId) => {
  //   setError(null); // Clear previous errors
  //   try {
  //     const response = await makeAuthenticatedRequest({
  //       method: 'post',
  //       url: 'http://localhost:5000/api/updateApplicantStatus',
  //       data: {
  //         resumeId,
  //         status: 'Rejected',
  //       },
  //     });

  //     if (response && response.data && response.data.success) {
  //       setApplicants((prevApplicants) =>
  //         prevApplicants.map((a) =>
  //           a.resumeId === resumeId ? { ...a, status: 'Rejected' } : a
  //         )
  //       );
  //     } else {
  //       const message = response?.data?.message || 'Failed to update applicant status.';
  //       setError(message);
  //       console.error('Error rejecting applicant (server response):', response?.data);
  //     }
  //   } catch (err) {
  //     console.error('Error rejecting applicant (network/request):', err);
  //     const message = err.response?.data?.message || err.message || 'Failed to reject applicant.';
  //     setError(message);
  //   }
  // };


  const handleSelectApplicant = async (applicant) => {
    try {
      const response = await makeAuthenticatedRequest({
        method: 'post',
        url: 'http://localhost:5000/api/updateApplicantStatus',
        data: {
          resumeId: applicant.resumeId,
          status: 'Selected',
        },
      });

      if (response && response.data.success) {
        setApplicants((prev) =>
          prev.map((a) =>
            a.resumeId === applicant.resumeId
              ? { ...a, status: 'Selected' }
              : a
          )
        );
        setError(null);
      }
    } catch (err) {
      console.error('Error selecting applicant:', err);
      setError('Failed to select applicant.');
    }
  };

  const handleRejectApplicant = async (resumeId) => {
    try {
      const response = await makeAuthenticatedRequest({
        method: 'post',
        url: 'http://localhost:5000/api/updateApplicantStatus',
        data: {
          resumeId,
          status: 'Rejected',
        },
      });

      if (response) {
        alert('Applicant rejected successfully!');
        setApplicants((prev) =>
          prev.map((a) =>
            a.resumeId === resumeId ? { ...a, status: 'Rejected' } : a
          )
        );
        setError(null);
      }
    } catch (err) {
      console.error('Error rejecting applicant:', err);
      alert('Failed to reject applicant');
      setError('Failed to reject applicant.');
    }
  };
  const handleViewProfile = (email) => {
    setSelectedProfileEmail(email);
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
    setSelectedProfileEmail(null);
  };

  return (
    <div className="applicant-background">
      <div className="applicants-container">
        <RecruiterNavbar />
        <h2 style={{ color: 'white' }}>Select a Job to View Ranked Applicants</h2>

        {loadingJobs && <p style={{ color: 'lightgray', textAlign: 'center' }}>Loading jobs...</p>}
        <div className="job-cards">
          {/* Render jobs only if not loading and jobs array is not empty */}
          {!loadingJobs && jobs.length > 0 && jobs.map((job) => (
            <div
              key={job._id}
              className={`job-card ${selectedJob?._id === job._id ? 'selected' : ''}`}
              onClick={() => setSelectedJob(job)}
              style={{ cursor: 'pointer' }}
            >
              <h3>{job.title}</h3>
              {/* Ensure job.description exists before calling substring */}
              <p>{job.description || 'No description available.'}</p>
              <p><strong>Location:</strong> {job.location || 'N/A'}</p>
              <p><strong>Salary:</strong> ${job.salary || 'N/A'}</p>
            </div>
          ))}
          {!loadingJobs && jobs.length === 0 && !error && (
            <p style={{ color: 'white', textAlign: 'center' }}>No jobs found.</p>
          )}
        </div>

        {/* Display general error for jobs if any */}
        {error && !selectedJob && <p className="error-message" style={{textAlign: 'center'}}>{error}</p>}

        {selectedJob && (
          <>
            <h3 style={{ marginTop: '20px', color: 'white' }}>
              Ranked Applicants for: <span style={{ color: 'lightgreen' }}>{selectedJob.title}</span>
            </h3>
            
            {loadingApplicants && <p style={{ color: 'lightgray', textAlign: 'center', fontSize: '1.2em' }}>Ranking and loading applicants with AI... Please wait.</p>}
            {/* Display error specific to applicant loading, only if not loading */}
            {error && !loadingApplicants && <p className="error-message">{error}</p>} 
            
            {!loadingApplicants && applicants.length === 0 && !error && (
              <p style={{ color: 'white', textAlign: 'center' }}>No applicants found or ranked for this job yet.</p>
            )}

            {!loadingApplicants && applicants.length > 0 && (
              <div className="applicants-grid">
                {applicants.map((app) => (
                  <div key={app.resumeId} className="applicant-card">
                    <h3 className="applicant-title">{app.fullName || 'N/A'}</h3>
                    <p className="applicant-details"><strong>Email:</strong> {app.email || 'N/A'}</p>
                    <p className="applicant-details">
                      <strong>Match Score:</strong> {typeof app.score === 'number' ? app.score.toFixed(4) : 'N/A'}
                    </p>
                    <p className="applicant-details">
                      <strong>Status:</strong> <span className={`status-${(app.status || 'Pending').toLowerCase().replace(/\s+/g, '-')}`}>{app.status || 'Pending'}</span>
                    </p>
                    {app.resumePath ? (
                      <a
                        href={`http://localhost:5000/${app.resumePath.replace(/^\/+/, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-link"
                      >
                        View Resume
                      </a>
                    ) : <p className="applicant-details resume-link-disabled">Resume not available</p>}
                    
                    {/* Conditionally render Profile button if email is available */}
                    {app.email && app.email !== 'N/A' ? (
                        <button
                        onClick={() => handleViewProfile(app.email)}
                        className="profile-link"
                        >
                        Profile
                        </button>
                    ): (
                        <button className="profile-link" disabled>Profile</button>
                    )}

                    <div className="button-group">
                      <button
                        className="select-button"
                        onClick={() => handleSelectApplicant(app)}
                        disabled={app.status === 'Selected' || app.status === 'Error' || app.status === 'Error loading' || app.status === 'Error loading details'}
                      >
                        {app.status === 'Selected' ? 'Selected' : 'Select'}
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => handleRejectApplicant(app.resumeId)}
                        disabled={app.status === 'Rejected' || app.status === 'Error' || app.status === 'Error loading' || app.status === 'Error loading details'}
                      >
                        {app.status === 'Rejected' ? 'Rejected' : 'Reject'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {showProfileModal && selectedProfileEmail && (
          <ProfileView email={selectedProfileEmail} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default Applicants;