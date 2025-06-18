import React, { createContext, useState } from "react";

// Create Context
export const ApplicantsContext = createContext();

// Context Provider Component
export const ApplicantsProvider = ({ children }) => {
  const [applicants, setApplicants] = useState([]);

  const addApplicant = (applicant) => {
    setApplicants((prev) => [...prev, applicant]);
  };

  return (
    <ApplicantsContext.Provider value={{ applicants, addApplicant }}>
      {children}
    </ApplicantsContext.Provider>
  );
};
