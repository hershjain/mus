import React, {useState, useEffect} from "react";
import "../styles/Profile.css";
import testpic1 from "../assets/images/testpic1.png";
import placeholder from '../assets/images/playlist-test-cover.jpg';
import PlaylistRow from "../components/playlist-row";
import SpotifyAuthButton from '../components/spotify-auth-button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = {
    profilePic: testpic1, // Placeholder for profile picture URL
    username: "kartiscontacts",
    bio: "help it's stuck oh nooo",
    followers: 20000000,
    madePlaylists: 69,
  };

  const samplePlaylists = [
    { title: 'Pop Hits', imageUrl: placeholder , curator: 'mheydude123' },
    { title: 'Hip Hop Vibes', imageUrl: placeholder , curator: 'hxrsh' },
    { title: 'Rock Classics', imageUrl: placeholder, curator: 'ptpampadam' },     
    ];

      // State to manage dropdown visibility
      const [isOpen, setIsOpen] = useState(false);
  
      // Toggle the dropdown visibility
      const toggleDropdown = () => {
          setIsOpen(!isOpen);
      };
  
      // Close the dropdown when clicking outside
      const handleOutsideClick = (e) => {
          if (!e.target.closest('.profile-settings')) {
              setIsOpen(false);
          }
      };
  
      // Listen for clicks outside the dropdown
      React.useEffect(() => {
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
                  <h2 className="username">{user.username}</h2>
                    <div class="profile-settings">
                      <FontAwesomeIcon class="fas fa-cog" id="settings-icon" icon={faCog} color="black" onClick={toggleDropdown}/>
                      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
                        <div className="dropdown-item">
                          <Link to="/app/profile/edit">
                            <i className="fas fa-user"></i> Edit Profile
                          </Link>
                        </div>
                        <div className="dropdown-item">
                            <i className="fas fa-sliders-h"></i> Preferences
                        </div>
                        <div className="dropdown-item">
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </div>
                      </div>
                    </div>
                </div>
                <p className="bio">{user.bio}</p>
                <SpotifyAuthButton />
            </div>
            
        </div>
        <div className="followers">
            <span>{user.followers} Followers</span>
            <span>{user.madePlaylists} Playlists</span>
        </div>
        </div>
        <div className="profile-content">
            <div className="top-playlists">
                <PlaylistRow categoryTitle="Top Playlists" playlists={samplePlaylists} />
            </div>
            <div className="badges">

            </div>

        </div>
    </div>
  );
};

export default Profile;
