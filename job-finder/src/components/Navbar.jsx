import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const Navbar = () => {
  const { isLoggedIn, handleUserLogin } = useContext(AuthContext); // Access state and function from context

  const handleLogout = () => {
    handleUserLogin(false); // Update login state to false using the context
    localStorage.removeItem("isLoggedIn"); // Optionally clear localStorage (if needed)
  };

  return (
    <nav className="navbar">
      <h1 className="logo">JobFinder</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
