// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Register.css';

// function Register() {
//   const [category, setCategory] = useState('applicant'); 
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [bio, setBio] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [companyName , setCompany]=useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const userDetails = { email, password, category, bio, phoneNumber };
  
//     if (category === 'recruiter') {
//       userDetails.company = companyName;
//     }
  
//     try {
//       const response = await fetch('http://localhost:5000/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userDetails),
//       });
  
//       if (response.ok) {
//         alert('Registration successful!');
//         navigate('/login');
//       } else {
//         const errorMessage = await response.text();
//         alert(errorMessage);
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert('Error during registration');
//     }
//   };

//   return (
//     <div className='register-container'>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
//           <span style={{ width: '100px', color: 'white' }}>Email:</span> 
//           <input 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//           />
//         </label>
//         <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
//           <span style={{ width: '100px', color: 'white' }}>Password:</span>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//           />
//         </label>
//         <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
//         <span style={{ width: '100px', color: 'white' }}>Category:</span> 
//           <select value={category} onChange={(e) => setCategory(e.target.value)}
//             style={{width:'250px'}}>
//             <option value="applicant">Applicant</option>
//             <option value="recruiter">Recruiter</option>
//           </select>
//         </label>
        
//         {category === 'recruiter' && (
//         <div className="recruiter-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
//           <span style={{ width: '100px', color: 'white' }}>Bio:</span> 
//             <textarea 
//              value={bio} 
//               onChange={(e) => setBio(e.target.value)}
//               style={{width:'100%'}} 
//             />
//           </label>
//           <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
//           <span style={{ width: '100px', color: 'white' }}>Phone:</span> 
//             <input 
//               type="text" 
//               value={phoneNumber} 
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               style={{width:'100%'}}
//             />
//           </label>
//           <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
//           <span style={{ width: '100px', color: 'white' }}>Company Name:</span> 
//             <input
//               type="text"
//               value={companyName}
//               onChange={(e)=> setCompany(e.target.value)}
//               style={{width:'100%'}}
//             />
//           </label>
//         </div>
//       )}
//       <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [category, setCategory] = useState('applicant');  // 'applicant' or 'recruiter'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName , setCompany]=useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userDetails = { email, password, category, bio, phoneNumber };
  
    if (category === 'recruiter') {
      userDetails.company = companyName;  // Add companyName for recruiters
    }
  
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
  
      if (response.ok) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration');
    }
  };

  return (
    <div className='register-container'>
      <div className="parallax-bg"></div>  {/* Parallax Background */}
      <div className="register-form">
        <h2 style={{color:'white'}}>Register</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ width: '100px', color: 'white' }}>Email:</span> 
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ width: '100px', color: 'white' }}>Password:</span>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ width: '100px', color: 'white' }}>Category:</span> 
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              style={{width:'250px'}}>
              <option value="applicant">Applicant</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </label>
          
          {category === 'recruiter' && (
            <div className="recruiter-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '100px', color: 'white' }}>Bio:</span> 
                <textarea 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  style={{width:'100%'}} 
                />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '100px', color: 'white' }}>Phone:</span> 
                <input 
                  type="text" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{width:'100%'}}
                />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '100px', color: 'white' }}>Company Name:</span> 
                <input
                  type="text"
                  value={companyName}
                  onChange={(e)=> setCompany(e.target.value)}
                  style={{width:'100%'}}
                />
              </label>
            </div>
          )}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
