// import React, { createContext, useContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [isAuthenticated, setIsAuthenticated] = useState(!!token);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     setToken(storedToken);
//     setIsAuthenticated(!!storedToken);
//   }, []);

//   const login = (newToken) => {
//     localStorage.setItem("token", newToken);
//     setToken(newToken);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // ✅ Export a custom hook for easier use
// export function useAuth() {
//   return useContext(AuthContext);
// }

import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || null);  // New state for email

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("userEmail");  // Check for stored email
    setToken(storedToken);
    setIsAuthenticated(!!storedToken);
    setUserEmail(storedEmail);  // Set email if available
  }, []);

  const login = (newToken, email) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userEmail", email);  // Store email on login
    setToken(newToken);
    setIsAuthenticated(true);
    setUserEmail(email);  // Update email in state
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");  // Remove email on logout
    setToken(null);
    setIsAuthenticated(false);
    setUserEmail(null);  // Reset email
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Export a custom hook for easier use
export function useAuth() {
  return useContext(AuthContext);
}
