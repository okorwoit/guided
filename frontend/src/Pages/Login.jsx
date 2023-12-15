import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import Cookies from 'js-cookie';
import './Login.css';
import { API_URL } from './Signup';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

     // Clear previous errors
     setError('');

     // Validate inputs
     if (!email || !password) {
       setError('Email and password are required');
       return;
     }

      // Additional validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
 
     setLoading(true);

    try {
      // Make a request to the login endpoint
      const response = await axios.post(`http://localhost:3000/auth/login`, { email, password });
      // Store the JWT in a HttpOnly cookie
      // Cookies.set('token', response.data.token, { secure: true, httpOnly: true });
      
      // If the login was successful, store the JWT in local storage
      localStorage.setItem('guided__token', response.data.token);
      localStorage.setItem('guided__user', JSON.stringify(response.data.user));

      // Navigate user to the dashboard based on their role
      if (response?.data?.user?.role === 'admin') {
        // Navigate to the admin dashboard use the navigate hook
        navigate('/admin/dashboard');

      } else {
        // Navigate to the regular dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('Login failed', error.message);
      // Here you would typically show an error message to the user

    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-left">
        <img src="/path-to-your-logo.png" alt="Logo" className="login-logo" />
      </div>
      <div className="login-right">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={loading}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;




