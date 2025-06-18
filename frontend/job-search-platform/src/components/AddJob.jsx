// import React, { useState } from 'react';
// import './AddJob.css';

// function AddJob() {
//   const [jobDetails, setJobDetails] = useState({
//     title: '',
//     description: '',
//     location: '',
//     salary: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setJobDetails({ ...jobDetails, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');

//     if (!token) {
//         alert('Please log in to add a job.');
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:5000/api/addJob', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify(jobDetails),
//         });

//         const text = await response.text(); // Read response as text first

//         try {
//             const responseData = JSON.parse(text); // Attempt to parse JSON

//             if (response.ok) {
//                 alert('Job added successfully');
//                 setJobDetails({ title: '', description: '', location: '', salary: '' });
//             } else {
//                 alert(`Error adding job: ${responseData.message || 'Unknown error'}`);
//             }
//         } catch {
//             console.error('Unexpected response format:', text);
//             alert('Unexpected server response. Please check the console for details.');
//         }

//     } catch (err) {
//         console.error('Error adding job:', err);
//         alert(`Error adding job: ${err.message}`);
//     }
// };


//   return (
//     <div>
//       <h2>Add Job</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Job Title"
//           value={jobDetails.title}
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Job Description"
//           value={jobDetails.description}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={jobDetails.location}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="salary"
//           placeholder="Salary"
//           value={jobDetails.salary}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Add Job</button>
//       </form>
//     </div>
//   );
// }

// export default AddJob;

import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import RecruiterNavbar from "./RecruiterNavbar"; // Import navbar
import { useAuth } from "../AuthContext"; // Import authentication context
import "./AddJob.css";

function AddJob() {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth(); // Get authentication state and token

  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token'); // Retrieve token from local storage
  
    try {
      const response = await fetch('http://localhost:5000/api/addJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ensure token is included correctly
        },
        body: JSON.stringify(jobDetails), // Send jobDetails directly
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Job added successfully');
      } else {
        alert(data.message); // Show error message from backend
      }
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };  

  return (
    <div>
      <RecruiterNavbar /> {/* Ensure recruiter navbar is visible */}
      <h2 id='ah1'>Add Job</h2>
      <form id='af1' onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobDetails.title}
          onChange={handleChange}
          required
          style={{width:'30%'}}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={jobDetails.description}
          onChange={handleChange}
          required
          style={{width:'30%'}}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={jobDetails.location}
          onChange={handleChange}
          required
          style={{width:'30%'}}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={jobDetails.salary}
          onChange={handleChange}
          required
          style={{width:'30%'}}
        />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default AddJob;
