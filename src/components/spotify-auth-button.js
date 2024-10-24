import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import '../styles/spotify-auth-button.css';

const SpotifyAuthButton = () => {
  const CLIENT_ID = "c0be3547678d47819cec403407ef00f5"; // Replace with your actual client ID
  const REDIRECT_URI = "http://localhost:3000/api/auth/callback/"; // Replace with your redirect URI
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const handleSpotifyLogin = () => {
    // Build the Spotify authentication URL
    const authURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=user-read-private user-read-email`;
    
    // Redirect to Spotify login
    window.location.href = authURL;
  };

  return (
    <button className="spotify-auth-button" onClick={handleSpotifyLogin}>
      < FontAwesomeIcon icon={faSpotify} style={{ marginRight: "5px" }} />
      Connect to Spotify
    </button>
  );
};

export default SpotifyAuthButton;
