
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
  const { curator } = useParams(); // Get the curator name from the URL

  const [user, setUser] = useState({
      profilePic: placeholder, // Placeholder
      followers: 0,
      madePlaylists: 0,
      bio: "test",
  });

  useEffect(() => {
      // Replace this with an API call or data fetching logic
      const profileData = {
          shiva: {
              profilePic: 'path/to/shiva-pic.jpg',
              followers: 27,
              madePlaylists: 4,
          },
          harsh: {
              profilePic: 'path/to/harsh-pic.jpg',
              followers: 15,
              madePlaylists: 2,
          },
      };
      setUser(profileData[curator] || {});
  }, [curator]);

  

  
    const samplePlaylists = [
      { title: 'Connections', imageUrl: connections , curator: 'shiva', url: '' },
      { title: 'sugi', imageUrl: sugi , curator: 'harsh', url: '' },
      { title: 'Neon Nights', imageUrl: neon, curator: 'shiva', url: '' },     
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
                <h2 className="username">{curator}</h2>
                <div className="follow-button">
                  <button>Follow</button>
                </div>
                {/* <div className="profile-settings">
                  <FontAwesomeIcon id="settings-icon" icon={faCog} color="#e7e7e7" onClick={toggleDropdown} />
                  <div className={`dropdown ${isOpen ? 'open' : ''}`}>
                    <div className="dropdown-item">
                      <Link to="/app/profile/edit">
                        <p className="profile-link">Edit Profile</p>
                      </Link>
                    </div>
                  </div>
                </div> */}
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
            <TopPlaylistsDisp categoryTitle="Top Playlists" playlists={samplePlaylists} />
          </div>
          <div className="badges"></div>
        </div>
      </div>
    );
  };
  
export default ProfileTemplate;
