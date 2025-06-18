import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApplicantsContext } from "../context/ApplicantsContext"; // Import the context

const ApplicationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addApplicant } = useContext(ApplicantsContext); // Access the addApplicant function from the context
  const job = location.state?.job || {}; // Get job details from location state

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    experience: "",
    coverLetter: "",
    picture: null,
    resume: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the applicant's data to the global state
    addApplicant(formData);

    alert(`Application submitted for ${job.title} at ${job.company}`);
    navigate("/"); // Redirect to home page after submission
  };

  return (
    <div className="form-container">
      <h2>Apply for {job.title} at {job.company}</h2>
      <form onSubmit={handleSubmit} className="application-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="experience"
          placeholder="Years of Experience"
          required
          onChange={handleChange}
        />
        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          required
          onChange={handleChange}
        ></textarea>
        <label>Upload Picture:</label>
        <input
          type="file"
          name="picture"
          accept="image/*"
          required
          onChange={handleFileChange}
        />
        <label>Upload Resume (PDF/DOCX):</label>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          required
          onChange={handleFileChange}
        />
        <button type="submit" className="btn">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
