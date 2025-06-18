// import React from 'react';
// import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'; // Ensure BrowserRouter is imported
// import Login from './components/Login';
// import Register from './components/Register';
// import AppHome from './components/AppHome';
// import RecHome from './components/RecHome';
// import AddJob from './components/AddJob';
// import Home1 from './components/Home1';
// import './App.css';

// function App() {
//   return (
//     <BrowserRouter> {/* Wrapping App in BrowserRouter for routing */}
//       <div className="App">
//         <header>
//           <nav className="navbar">
//             <ul>
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/login">Login</Link></li>
//               <li><Link to="/register">Register</Link></li>
//             </ul>
//           </nav>
//         </header>

//         <main>
//           <Routes> {/* Defining routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/apphome" element={<AppHome />} /> {/* Applicant Homepage */}
//             <Route path="/rechome" element={<RecHome />} /> {/* Recruiter Homepage */}
//             <Route path="/addJob" element={<AddJob />} /> {/* Define AddJob route */}
//             <Route path="/home1" element={<Home1 />} />
//           </Routes>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }

// function Home() {
//   return (
//     <div>
//       <h1>Welcome to Job Search Platform</h1>
//       <p>Find your dream job with ease.</p>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import { Routes, Route, Link, BrowserRouter, useLocation } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import AppHome from "./components/AppHome";
// import RecHome from "./components/RecHome";
// import AddJob from "./components/AddJob";
// import Home1 from "./components/Home1";
// import { AuthProvider, useAuth } from "./AuthContext"; // Authentication context
// import "./App.css";

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <AppContent />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// function AppContent() {
//   const location = useLocation();
//   const { isAuthenticated } = useAuth(); // Get authentication state

//   // Routes where the default navbar should be hidden
//   const recruiterRoutes = ["/rechome", "/addJob","/apphome"];

//   return (
//     <div className="App">
//       {/* Show the recruiter navbar if authenticated & on recruiter pages */}
//       {isAuthenticated && recruiterRoutes.includes(location.pathname) ? (
//         null
//       ) : (
//         // Default navbar for non-recruiters
//         <header>
//           <nav className="navbar">
//             <ul>
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/login">Login</Link></li>
//               <li><Link to="/register">Register</Link></li>
//             </ul>
//           </nav>
//         </header>
//       )}

//       <main>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/apphome" element={<AppHome />} />
//           <Route path="/rechome" element={<RecHome />} />
//           <Route path="/addJob" element={<AddJob />} />
//           <Route path="/home1" element={<Home1 />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// function Home() {
//   return (
//     <div>
//       <h1>Welcome to Job Search Platform</h1>
//       <p>Find your dream job with ease.</p>
//     </div>
//   );
// }

// export default App;





import React from "react";
import { Routes, Route, Link, BrowserRouter, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AppHome from "./components/AppHome";
import RecHome from "./components/RecHome";
import AddJob from "./components/AddJob";
import MyJob from "./components/MyJob";
import Form from "./components/Form"
import AppliedJobs from "./components/AppliedJobs";
import Applicants from "./components/Applicants";
import Profile from "./components/Profile";
import Schedule from "./components/Schedule";
import { AuthProvider, useAuth } from "./AuthContext"; // Authentication context
import "./App.css";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); // Get authentication state
  const recruiterRoutes = [
    "/rechome",
    "/addJob",
    "/apphome",
    "/MyJob",
    "/applied-jobs",
    "/Applicants",
    "/Schedule",
    "/profile"
  ];

  // Convert to lowercase to avoid case mismatch
  const currentPath = location.pathname.toLowerCase();

  // Match static paths OR patterns like `/apply/:jobId`
  const hideNavbar =isAuthenticated && (recruiterRoutes.map(p => p.toLowerCase()).includes(currentPath) || currentPath.startsWith("/apply/"));

  return (
    <div className="App">
      {!hideNavbar && (
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apphome" element={<AppHome />} />
        <Route path="/rechome" element={<RecHome />} />
        <Route path="/addJob" element={<AddJob />} />
        <Route path="/MyJob" element={<MyJob />} />
        <Route path="/apply/:jobId" element={<Form />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:email?" element={<Profile />} />
      </Routes>
    </div>
  );
}


function Home() {
  return (
    <div className="fullscreen-container">
      <div className="content-card">
        <h1>Welcome to Job Search Platform</h1>
        <p>Find your dream job with ease.</p>
      </div>
    </div>
  );
}

export default App;