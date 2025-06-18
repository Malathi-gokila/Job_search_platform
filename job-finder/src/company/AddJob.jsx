import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJob = ({ jobs, setJobs }) => {
  const navigate = useNavigate();
  const [job, setJob] = useState({ title: "", company: "", description: "" });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJobs([...jobs, job]);
    navigate("/company-dashboard");
  };

  return (
    <div className="form-container">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          required
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          required
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn">Post Job</button>
      </form>
    </div>
  );
};

export default AddJob;
