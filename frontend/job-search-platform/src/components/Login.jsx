import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('applicant');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, category }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token & category
        localStorage.setItem('token', data.token);
        localStorage.setItem('category', category);
        localStorage.setItem('userEmail', data.email);

        // Redirect based on category
        navigate(category === 'applicant' ? '/apphome' : '/rechome');
      } else if (response.status === 404) {
        alert('User not found! Redirecting to Register...');
        navigate('/register'); // Redirect to register if user is not found
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2 style={{ color: 'white' }}>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ width: '100px', color: 'white' }}>Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ flex: 1 }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ width: '100px', color: 'white' }}>Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ flex: 1 }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
        <span style={{ width: '100px', color: 'white' }}>Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ flex: 1, width:'200px' }}
            >
            <option value="applicant">Applicant</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
