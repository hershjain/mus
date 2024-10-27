import React from "react";
import "../styles/Profile.css";
import testpic1 from "../assets/images/testpic1.png";
import placeholder from '../assets/images/playlist-test-cover.jpg';
import PlaylistRow from "../components/playlist-row";
import SpotifyAuthButton from '../components/spotify-auth-button';
import PlaylistComponent from "../components/playlist-component";

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

  return (
    <div>
        <div className="profile-container">
        <div className="profile-header">
            <img src={user.profilePic} alt="Profile Pic" className="profile-pic" />
            <div className="profile-details">
                <h2 className="username">{user.username}</h2>
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
            <div className="test">
              <PlaylistComponent />
            </div>

        </div>
    </div>
  );
};

export default Profile;
