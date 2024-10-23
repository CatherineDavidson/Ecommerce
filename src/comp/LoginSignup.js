// import React, { useState } from 'react';
// import './LoginSignup.css';
// import logo from '../image/logo1.png';
// import ill from '../image/ill.png';
// import { useNavigate } from 'react-router-dom';

// const LoginSignup = ({ setIsAuthenticated }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const navigate = useNavigate();

//   const validateUsername = (username) => /^[a-zA-Z0-9]+$/.test(username);
//   const validatePassword = (password) =>
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/.test(password);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!validateUsername(username)) {
//       setError('Username should contain only letters and numbers.');
//       return;
//     }

//     if (!validatePassword(password)) {
//       setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
//       return;
//     }

//     if (isLogin) {
//       // Login logic
//       try {
//         const response = await fetch('http://localhost:3001/users');
//         const users = await response.json();
//         const user = users.find(u => u.username === username && u.password === password);
//         if (user) {
//           setSuccess('Logged in successfully!');
//           setIsAuthenticated(true); // Set authentication state to true
//           navigate('/home'); // Navigate to the home page
//         } else {
//           setError('Invalid username or password.');
//         }
//       } catch (error) {
//         setError('An error occurred. Please try again.');
//       }
//     } else {
//       // Signup logic
//       try {
//         const response = await fetch('http://localhost:3001/users');
//         const users = await response.json();
//         if (users.some(u => u.username === username)) {
//           setError('Username already exists.');
//           return;
//         }

//         const newUser = { username, password };
//         await fetch('http://localhost:3001/users', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newUser),
//         });

//         setSuccess('Signed up successfully! You can now log in.');
//         setIsLogin(true);
//       } catch (error) {
//         setError('An error occurred. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="welcome-section">
//         <div className="logo">
//           <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <img src={logo} alt='Logo' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//           </div>
//         </div>
//         <h1>Welcome back</h1>
//         <div className="illustration">
//           <div><img src={ill} alt='' /></div>
//         </div>
//       </div>
//       <div className='login-section'>
//         <div className="form-section">
//           <h2>{isLogin ? 'Log in' : 'Sign up'}</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Username</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter your username"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             {error && <p className="error">{error}</p>}
//             {success && <p className="success">{success}</p>}
//             <button type="submit">{isLogin ? 'Login' : 'Sign up'}</button>
//           </form>
//           <p className="switch-form">
//             {isLogin ? "Don't have an account?" : "Already have an account?"} &nbsp;
//             <span onClick={() => setIsLogin(!isLogin)}>
//               {isLogin ? ' Create New' : ' Log in'}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;

import React, { useState } from 'react';
import './LoginSignup.css';
import logo from '../image/logo1.png';
import ill from '../image/ill.png';
import { useNavigate } from 'react-router-dom';
import Nav from './nav';

const LoginSignup = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const validateUsername = (username) => /^[a-zA-Z0-9]+$/.test(username);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateUsername(username)) {
      setError('Username should contain only letters and numbers.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      return;
    }

    if (isLogin) {
      try {
        const response = await fetch('http://localhost:3001/users');
        const users = await response.json();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          setSuccess('Logged in successfully!');
          setIsAuthenticated(true); // Authentication successful
          setUsername(username); 
          navigate('/'); // Redirect to home page
        } else {
          setError('Invalid username or password.');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    } else {
      try {
        const response = await fetch('http://localhost:3001/users');
        const users = await response.json();
        if (users.some(u => u.username === username)) {
          setError('Username already exists.');
          return;
        }

        const newUser = { username, password };
        await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        setSuccess('Signed up successfully! You can now log in.');
        setIsLogin(true);
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-section">
        <div className="logo">
          <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={logo} alt='Logo' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        <h1>Welcome back</h1>
        <div className="illustration">
          <div><img src={ill} alt='' /></div>
        </div>
      </div>
      <div className='login-section'>
        <div className="form-section">
          <h2>{isLogin ? 'Log in' : 'Sign up'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <button type="submit">{isLogin ? 'Login' : 'Sign up'}</button>
          </form>
          <p className="switch-form">
            {isLogin ? "Don't have an account?" : "Already have an account?"} &nbsp;
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? ' Create New' : ' Log in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
