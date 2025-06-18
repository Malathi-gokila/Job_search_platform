// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import "./Form.css";
// import ApplicantNavbar from "./ApplicantNavbar";

// function Form() {
//   const { jobId } = useParams();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     resume: "",
//     coverLetter: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Send formData and jobId to backend here
//     console.log("Submitted:", { ...formData, jobId });
//   };

//   return (
//     <>
//       <ApplicantNavbar />
//       <div className="form-wrapper">
//         <form className="form-card" onSubmit={handleSubmit}>
//           <h2>Apply for Job</h2>
//           <label>Full Name:</label>
//           <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//           <label>Phone:</label>
//           <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//           <label>Resume (Paste URL):</label>
//           <input type="url" name="resume" value={formData.resume} onChange={handleChange} required />
//           <label>Cover Letter:</label>
//           <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows="6" />
//           <button type="submit">Submit Application</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Form;


import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Form.css";
import ApplicantNavbar from "./ApplicantNavbar";

function Form() {
  const { jobId } = useParams();
  console.log("Job ID from params:", jobId);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null, // Change resume to accept file input
    coverLetter: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      // Store the file object instead of the URL
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("resume", formData.resume);
    data.append("coverLetter", formData.coverLetter);
    data.append("jobId", jobId); 
  
    try {
      const response = await fetch("http://localhost:5000/submitApplication", {
        method: "POST",
        body: data,
      });
  
      if (response.ok) {
        alert("Application submitted successfully!");
      } else {
        alert("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <>
      <ApplicantNavbar />
      <div className="form-wrapper">
        <form id='form1' onSubmit={handleSubmit}>
          <h2>Apply for Job</h2>
          <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          </div>
          <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          </div>
          <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          </div>
          <div className="form-group">
          <label>Resume (PDF only):</label>
          <input
            type="file"
            name="resume"
            accept="application/pdf"
            onChange={handleChange}
            required
          />
          </div>
          <div className="form-group">
          <label>Cover Letter:</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows="6"
          />
          </div>
          <button type="submit" style={{width:'50%'}}>Submit Application</button>
        </form>
      </div>
    </>
  );
}

export default Form;
