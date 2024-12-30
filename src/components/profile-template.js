
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Profile.css";
import testpic1 from "../assets/images/testpic1.png";
import placeholder from '../assets/images/playlist-test-cover.jpg';
import PlaylistRow from "../components/playlist-row";
import TopPlaylistsDisp from "../components/top-playlists-display";
import Logout from "../components/logout";
import SpotifyAuthButton from '../components/spotify-auth-button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import sugi from '../assets/images/sugi.jpg';
import connections from '../assets/images/connections.jpg';
import neon from '../assets/images/neon.jpg';

const ProfileTemplate = () => {
  const { curator } = useParams(); // Get the username (curator) from the URL

  const [user, setUser] = useState({
    profilePic: placeholder, // Placeholder image
    followers: 0,
    madePlaylists: 0,
    bio: "",
  });

  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  // Fetch user profile and playlists data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
        const token = localStorage.getItem('access');

        const response = await fetch(`http://localhost:8000/spotify/profile/${curator}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const profileData = await response.json();

        setUser({
          profilePic: profileData.profile_picture || placeholder,
          followers: profileData.followers_count || 0,
          madePlaylists: profileData.made_playlists_count || 0,
          bio: profileData.bio || "This user has no bio yet.",
        });

        // Optionally fetch playlists associated with the user
        const playlistResponse = await fetch(`http://localhost:8000/spotify/profile/${curator}/playlists/`);
        if (playlistResponse.ok) {
          const playlistData = await playlistResponse.json();
          setPlaylists(playlistData || []);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, [curator]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.profilePic} alt="Profile Pic" className="profile-pic" />
          <div className="profile-details">
            <div className="profile-div">
              <h2 className="username">{curator}</h2>
              <div className="follow-button">
                <button>Follow</button>
              </div>
            </div>
            <p className="bio">{user.bio}</p>
          </div>
        </div>
        <div className="followers">
          <span>{user.followers} Followers</span>
          <span>{user.madePlaylists} Playlists</span>
        </div>
      </div>
      <div className="profile-content">
        <div className="top-playlists">
          <TopPlaylistsDisp categoryTitle="Top Playlists" playlists={playlists} />
        </div>
        <div className="badges"></div>
      </div>
    </div>
  );
};

export default ProfileTemplate;
