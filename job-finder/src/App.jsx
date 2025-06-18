import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import ApplicationForm from "./components/ApplicationForm";
import { ApplicantsProvider } from "./context/ApplicantsContext";
import CompanyLogin from "./company/CompanyLogin";
import CompanyDashboard from "./company/CompanyDashboard";
import AddJob from "./company/AddJob";
import ViewApplicants from "./company/ViewApplicants";
import { AuthContext } from "./context/AuthContext";  // Import AuthContext

const App = () => {
  const { isLoggedIn, isCompanyLoggedIn, handleUserLogin, handleCompanyLogin, handleLogout } = useContext(AuthContext);  // Use AuthContext to manage login state

  return (
    <ApplicantsProvider>
      <Router>
        <Navbar
          isLoggedIn={isLoggedIn}
          isCompanyLoggedIn={isCompanyLoggedIn}
          setIsLoggedIn={handleUserLogin}  // Handle user login using context
          setIsCompanyLoggedIn={handleCompanyLogin}  // Handle company login using context
          handleLogout={handleLogout}  // Pass logout function to Navbar
        />
        <Routes>
          {/* Main landing page with login type selection */}
          <Route
            path="/"
            element={
              <div className="home">
                <h1>Welcome to the Job Portal</h1>
                <p>Please select your login type:</p>
                <div>
                  <button onClick={() => window.location.href = '/login'}>User Login</button>
                  <button onClick={() => window.location.href = '/company/login'}>Company Login</button>
                </div>
              </div>
            }
          />

          {/* User Routes */}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={handleUserLogin} />}
          />
          <Route
            path="/register"
            element={<Register setIsLoggedIn={handleUserLogin} />}
          />
          <Route
            path="/apply"
            element={isLoggedIn ? <ApplicationForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />

          {/* Company Routes */}
          <Route
          path="/company/login"
          element={isCompanyLoggedIn ? <Navigate to="/company/CompanyDashboard" /> : <CompanyLogin setIsCompanyLoggedIn={handleCompanyLogin} />}
          />
          <Route
            path="/company/CompanyDashboard"
            element={isCompanyLoggedIn ? <CompanyDashboard /> : <Navigate to="/company/login" />}
          />
          <Route
            path="/company/AddJob"
            element={isCompanyLoggedIn ? <AddJob /> : <Navigate to="/company/login" />}
          />
          <Route
            path="/company/ViewApplicants"
            element={isCompanyLoggedIn ? <ViewApplicants /> : <Navigate to="/company/login" />}
          />
        </Routes>
      </Router>
    </ApplicantsProvider>
  );
};

export default App;
