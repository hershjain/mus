import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/logout.css';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access'); // Clear the auth token
        navigate('/'); // Redirect to landing page
    };

    return (
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    );
};

export default Logout;