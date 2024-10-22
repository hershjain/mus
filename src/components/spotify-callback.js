import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the access token from the URL
    const hash = window.location.hash;
    let token = null;
    
    if (hash) {
      token = new URLSearchParams(hash.substring(1)).get('access_token');
      window.localStorage.setItem('spotifyToken', token); // Save the token to localStorage
    }

    // Redirect to homepage after authentication
    navigate.push('/profile');
  }, [navigate]);

  return <div>Loading...</div>;
};

export default SpotifyCallback;
