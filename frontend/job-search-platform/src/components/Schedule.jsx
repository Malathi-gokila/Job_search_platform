// import React, { useState, useEffect } from 'react';
// import RecruiterNavbar from './RecruiterNavbar';
// import axios from 'axios';

// function Schedule() {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState('');
//   const [interviewDate, setInterviewDate] = useState('');
//   const [interviewTime, setInterviewTime] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false); // To handle loading state

//   useEffect(() => {
//     const fetchJobs = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setMessage("No token found, please log in.");
//         return;
//       }

//       setLoading(true); // Set loading to true before the API call
//       try {
//         const response = await fetch("http://localhost:5000/api/jobs", {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch jobs");
//         }

//         const data = await response.json();
//         if (Array.isArray(data)) {
//           setJobs(data);
//         } else {
//           setJobs([]); // In case the response data is not an array
//         }
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//         setMessage("Error fetching jobs. Please try again later.");
//       } finally {
//         setLoading(false); // Set loading to false after the API call finishes
//       }
//     };

//     fetchJobs(); // Call the function to fetch jobs on mount
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedJob || !interviewDate || !interviewTime) {
//       setMessage('Please fill out all fields.');
//       return;
//     }

//     const interviewDetails = {
//       jobId: selectedJob,
//       interviewDate,
//       interviewTime,
//     };

//     const token = localStorage.getItem("token");

//     if (!token) {
//       setMessage("No token found, please log in.");
//       return;
//     }

//     setLoading(true); // Set loading to true before the API call
//     try {
//       const response = await axios.post(
//         'http://localhost:5000/api/schedule-interview',
//         interviewDetails,
//         {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         setMessage(response.data.message || 'Interview scheduled successfully!');
//       } else {
//         setMessage('Error scheduling interview: ' + (response.data.message || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error("Error scheduling interview:", error.response?.data || error.message);
//       setMessage('Error scheduling interview. Please try again later.');
//     } finally {
//       setLoading(false); // Set loading to false after the API call finishes
//     }
//   };

//   return (
//     <div>
//       <RecruiterNavbar />
//       <h1>Schedule Interview</h1>
      
//       {loading && <p>Loading...</p>} {/* Show loading indicator */}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="job">Select Job</label>
//           <select
//             id="job"
//             value={selectedJob}
//             onChange={(e) => setSelectedJob(e.target.value)}
//             required
//           >
//             <option value="">Select a Job</option>
//             {jobs.length > 0 ? (
//               jobs.map((job) => (
//                 <option key={job._id} value={job._id}>
//                   {job.title} {/* Display the job title */}
//                 </option>
//               ))
//             ) : (
//               <option disabled>No jobs available</option>
//             )}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="date">Interview Date</label>
//           <input
//             type="date"
//             id="date"
//             value={interviewDate}
//             onChange={(e) => setInterviewDate(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="time">Interview Time</label>
//           <input
//             type="time"
//             id="time"
//             value={interviewTime}
//             onChange={(e) => setInterviewTime(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Scheduling...' : 'Schedule Interview'}
//         </button>
//       </form>

//       {message && <p>{message}</p>} {/* Display the message */}
//     </div>
//   );
// }

// export default Schedule;




import React, { useState, useEffect } from 'react';
import RecruiterNavbar from './RecruiterNavbar';
import axios from 'axios';

function Schedule() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("No token found, please log in.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/jobs", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setMessage("Error fetching jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedJob || !interviewDate || !interviewTime) {
      setMessage('Please fill out all fields.');
      return;
    }

    const interviewDetails = {
      jobId: selectedJob,
      interviewDate,
      interviewTime,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("No token found, please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/schedule-interview',
        interviewDetails,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message || 'Interview scheduled successfully!');
      } else {
        setMessage('Error scheduling interview: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error("Error scheduling interview:", error.response?.data || error.message);
      setMessage('Error scheduling interview. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="pageContainer">
      <RecruiterNavbar />
      <h1 id="pageTitle">Schedule Interview</h1>

      {loading && <p id="loadingText">Loading...</p>}

      <form id="scheduleForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="job">Select Job</label>
          <select
            id="job"
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            required
          >
            <option value="">Select a Job</option>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))
            ) : (
              <option disabled>No jobs available</option>
            )}
          </select>
        </div>

        <div className="formGroup">
          <label htmlFor="date">Interview Date</label>
          <input
            type="date"
            id="date"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="time">Interview Time</label>
          <input
            type="time"
            id="time"
            value={interviewTime}
            onChange={(e) => setInterviewTime(e.target.value)}
            required
          />
        </div>

        <button id="submitButton" type="submit" disabled={loading}>
          {loading ? 'Scheduling...' : 'Schedule Interview'}
        </button>
      </form>

      {message && <p id="messageBox">{message}</p>}

      {/* Styling inside style tag */}
      <style>{`
        #pageContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          background:transparent;
          color:white;
          min-height: 100vh;
          padding: 20px;
        }

        #pageTitle {
          margin-top: 20px;
          font-family: Arial, sans-serif;
          color: white;
        }

        #loadingText {
          margin: 10px 0;
          color: #555;
          font-size: 16px;
        }

        #scheduleForm {
          background-color:black;
          padding: 30px 40px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 500px;
        }

        .formGroup {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-bottom: 20px;
        }

        .formGroup label {
          margin-bottom: 8px;
          font-weight: bold;
          text-align: left;
        }

        #job, #date, #time {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 16px;
          width: 100%;
        }

        #job:focus, #date:focus, #time:focus {
          outline: none;
          border-color: #007bff;
        }

        #submitButton {
          background-color: #007bff;
          color: white;
          padding: 12px 20px;
          font-size: 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.3s;
        }

        #submitButton:hover {
          background-color: #0056b3;
        }

        #submitButton:disabled {
          background-color: #999;
          cursor: not-allowed;
        }

        #messageBox {
          margin-top: 20px;
          font-size: 16px;
          color: red;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Schedule;
