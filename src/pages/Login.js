import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';
import MusLogo from '../assets/images/mus-logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/api/auth/jwt/create/', {
            username: username,
            password: password,
        });

        // Save tokens in local storage
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);

        // Redirect or do something after login
        alert("Login successful");

        setTimeout(() => {
          navigate('/app/discovery');
      }, 100);
        
    } catch (err) {
        setError('Invalid username or password');
    }
};

  return (
    <div className="login-container">
      <img src={MusLogo} alt="Mus Logo" id="musLogoLogin"/>
      <form className="login-form" onSubmit={handleLogin}>
            <input
                className='login-input'
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                className='login-input'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button className='login-button' type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
    </div>
  );
};

export default Login;