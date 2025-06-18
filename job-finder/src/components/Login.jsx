import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  // Import AuthContext

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get previous location (if redirected)
  const { handleUserLogin } = useContext(AuthContext);  // Access the login handler from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Assume successful login, no validation of credentials
    handleUserLogin(true);  // Set logged-in state to true using context

    // Redirect to previous page if redirected from a protected page, else go to Home
    const previousPage = location.state?.from || "/home";  // Redirect to /home if no previous page
    navigate(previousPage, { replace: true });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
