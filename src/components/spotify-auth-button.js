import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import '../styles/spotify-auth-button.css';

const SpotifyAuthButton = () => {

  const handleSpotifyLogin = async () => {
    try {
      // Retrieve the JWT access token from local storage or context
      const token = localStorage.getItem("access"); // Adjust if using context or another storage
      const info = localStorage.length
      console.log("this is token: "+token)
      console.log("this is lenght?: "+info)
      // Make a GET request to your backend to retrieve the Spotify auth URL
      const response = await axios.get('https://mus-7du3.onrender.com/spotify/auth/login', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      // Redirect to the retrieved URL
      if (response.data.auth_url) {
        window.location.href = response.data.auth_url;
      } else {
        console.error("Failed to retrieve Spotify authorization URL.");
      }
    } catch (error) {
      console.error("Error fetching Spotify auth URL:", error);
    }
  };

  return (
    <button className="spotify-auth-button" onClick={handleSpotifyLogin}>
      <FontAwesomeIcon icon={faSpotify} style={{ marginRight: "5px" }} />
    </button>
  );
};

export default SpotifyAuthButton;
