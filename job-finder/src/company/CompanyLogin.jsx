import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  // Import AuthContext

const CompanyLogin = () => {
  const navigate = useNavigate();
  const { isCompanyLoggedIn, handleCompanyLogin } = useContext(AuthContext);  // Access login state and handler from context
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add error state for login

  // Check if already logged in as a company
  useEffect(() => {
    if (isCompanyLoggedIn) {
      navigate("/company/CompanyDashboard"); // Redirect company to their dashboard
    }
  }, [isCompanyLoggedIn, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation (you can enhance this with an actual API call)
    if (companyName === "" || password === "") {
      setError("Please fill in all fields.");
      return;
    }

    // Assume successful login without credential validation
    handleCompanyLogin(true); // Set company logged-in state to true
    navigate("/company/CompanyDashboard"); // Redirect to dashboard
  };

  return (
    <div className="auth-container">
      <h2>Company Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Company Name"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}  {/* Display error message */}
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default CompanyLogin;
