import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        navigate('/app/discovery')
        alert("Login successful");
    } catch (err) {
        setError('Invalid username or password');
    }
};

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;