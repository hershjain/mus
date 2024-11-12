import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import testpic1 from "../assets/images/testpic1.png";
import placeholder from '../assets/images/playlist-test-cover.jpg';
import PlaylistRow from "../components/playlist-row";
import TopPlaylists from "../components/top-playlists";
import Logout from "../components/logout";
import SpotifyAuthButton from '../components/spotify-auth-button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Profile = ({ username, bio, profilePic }) => {
  const user = {
    profilePic: profilePic || testpic1, // Placeholder for profile picture URL
    followers: 20000000,
    madePlaylists: 69,
  };

  const samplePlaylists = [
    { title: 'Connections', imageUrl: placeholder , curator: 'shiva', url: '' },
    { title: 'sugi', imageUrl: placeholder , curator: 'harsh', url: '' },
    { title: 'Neon Nights', imageUrl: placeholder, curator: 'shiva', url: '' },     
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.profile-settings')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.profilePic} alt="Profile Pic" className="profile-pic" />
          <div className="profile-details">
            <div className="profile-div">
              <h2 className="username">{username}</h2>
              <div className="profile-settings">
                <FontAwesomeIcon id="settings-icon" icon={faCog} color="#e7e7e7" onClick={toggleDropdown} />
                <div className={`dropdown ${isOpen ? 'open' : ''}`}>
                  <div className="dropdown-item">
                    <Link to="/app/profile/edit">
                      <p className="profile-link">Edit Profile</p>
                    </Link>
                  </div>
                  <div className="dropdown-item">
                    <SpotifyAuthButton />
                  </div>
                  <div className="dropdown-item">
                    <Logout />
                  </div>
                </div>
              </div>
            </div>
            <p className="bio">{bio}</p>
          </div>
        </div>
        <div className="followers">
          <span>{user.followers} Followers</span>
          <span>{user.madePlaylists} Playlists</span>
        </div>
      </div>
      <div className="profile-content">
        <div className="top-playlists">
          <TopPlaylists categoryTitle="Top Playlists" playlists={samplePlaylists} />
        </div>
        <div className="badges"></div>
      </div>
    </div>
  );
};

export default Profile;
