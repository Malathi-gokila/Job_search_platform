import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompanyLoggedIn, setIsCompanyLoggedIn] = useState(false);

  // Check for saved login status in localStorage on page load
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const companyLoggedIn = localStorage.getItem("isCompanyLoggedIn") === "true";

    setIsLoggedIn(loggedIn);
    setIsCompanyLoggedIn(companyLoggedIn);
  }, []);

  // Update login status in localStorage whenever login state changes
  const handleUserLogin = (loggedIn) => {
    localStorage.setItem("isLoggedIn", loggedIn ? "true" : "false");
    setIsLoggedIn(loggedIn);
  };

  const handleCompanyLogin = (loggedIn) => {
    localStorage.setItem("isCompanyLoggedIn", loggedIn ? "true" : "false");
    setIsCompanyLoggedIn(loggedIn);
  };

  // Logout function to clear login status from localStorage and reset state
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isCompanyLoggedIn");
    setIsLoggedIn(false);
    setIsCompanyLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isCompanyLoggedIn, handleUserLogin, handleCompanyLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
