import React, {useState, useEffect} from "react";
import "../styles/Profile.css";
import testpic1 from "../assets/images/testpic1.png";
import placeholder from '../assets/images/playlist-test-cover.jpg';
import PlaylistRow from "../components/playlist-row";
import Logout from "../components/logout";
import SpotifyAuthButton from '../components/spotify-auth-button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from 'axios';

const Profile = () => {
  const user = {
    profilePic: testpic1, // Placeholder for profile picture URL
  //  username: "kartiscontacts",
  //  bio: "help it's stuck oh nooo",
    followers: 20000000,
    madePlaylists: 69,
  };

  const [profilePic, setProfilePic] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [followers, setFollowers] = useState([]);

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

      useEffect(() => {
        const fetchProfileData = async () => {
            try {

                const token = localStorage.getItem('access');

                // Replace '/api/profile/' with your actual endpoint for fetching user profile
                //const response = await axios.get('http://localhost:8000/spotify/profile/');
                const response = await axios.get('http://localhost:8000/spotify/profile/', {
                  headers: {
                      Authorization: `Bearer ${token}`, // Add the token to the request headers
                  },
              });
                
                // Assuming response.data has the profile data in the expected structure
                setProfilePic(response.data.profile_picture);
                setUsername(response.data.username); // Assuming user object is nested
                setBio(response.data.bio);
                setFollowers(response.data.followers); // Adjust if the structure is different

            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []); // Empty dependency array means this runs once when the component mounts

  
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
                  <h2 className="username">{username}</h2>
                    <div class="profile-settings">
                      <FontAwesomeIcon class="fas fa-cog" id="settings-icon" icon={faCog} color="#e7e7e7" onClick={toggleDropdown}/>
                      <div className={`dropdown ${isOpen ? 'open' : ''}`}>
                        <div className="dropdown-item">
                          <Link to="/app/profile/edit">
                            <p className="profile-link">Edit Profile</p>
                          </Link>
                        </div>
                        <div className="dropdown-item">
                            <p className="profile-link">Preferences</p>
                        </div>
                        <div className="dropdown-item">
                            <Logout />
                        </div>
                      </div>
                    </div>
                </div>
                <p className="bio">{bio}</p>
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
