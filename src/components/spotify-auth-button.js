import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import '../styles/spotify-auth-button.css';

const SpotifyAuthButton = () => {
  const CLIENT_ID = "your_spotify_client_id"; // Replace with your actual client ID
  const REDIRECT_URI = "http://localhost:3000/callback"; // Replace with your redirect URI
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const handleSpotifyLogin = () => {
    // Build the Spotify authentication URL
    //const authURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=user-read-private user-read-email`;
    
    // Redirect to Spotify login
    window.location.href = 'http://localhost:8000/spotify/login/' ;
  };

  return (
    <button className="spotify-auth-button" onClick={handleSpotifyLogin}>
      <FontAwesomeIcon icon={faSpotify} style={{ marginRight: "5px" }} />
      Connect to Spotify
    </button>
  );
};

export default SpotifyAuthButton;
