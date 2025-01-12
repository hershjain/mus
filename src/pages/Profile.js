import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import testpic1 from "../assets/images/testpic1.png";
import placeholder from '../assets/images/playlist-test-cover.jpg';
import pfplh from '../assets/images/pfimage.png'
import PlaylistRow from "../components/playlist-row";
import TopPlaylists from "../components/top-playlists";
import Logout from "../components/logout";
import SpotifyAuthButton from '../components/spotify-auth-button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PlaylistCardHorizontal from "../components/playlist-card-horizontal";
import Library from "./Library";


const Profile = ({ username, bio, profilePic, userPlaylists, SPUserID, followers, topPlaylists }) => {

  const ownedPlaylists = userPlaylists.filter(playlist => playlist.owner.id === SPUserID);

  const user = {
    profilePic: profilePic, // Placeholder for profile picture URL
    followers: followers,
    madePlaylists: ownedPlaylists.length,
  };


  const [isOpen, setIsOpen] = useState(false);

  const [currentDropdown, setCurrentDropdown] = useState(null); // Track open dropdown for each slot

  const openDropdown = (index) => setCurrentDropdown(index);

  const closeDropdown = () => setCurrentDropdown(null);

  // const selectPlaylist = (index, playlist) => {
  //   const updatedTopPlaylists = [...topPlaylists];
  //   updatedTopPlaylists[index] = playlist; // Update the specific slot
  //   setTopPlaylists(updatedTopPlaylists);
  //   closeDropdown(); // Close the dropdown
  // };

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
      console.log(topPlaylists);
    };
  }, []);

  return (
    <div>
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.profilePic || pfplh } alt='PF' className="profile-pic" />
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
          
          <TopPlaylists categoryTitle="Top Playlists" topPlaylists={topPlaylists} userPlaylists={userPlaylists} SPUserID={SPUserID}/>
        </div>
        <div className="badges"></div>
      </div>
    </div>
  );
};

export default Profile;
