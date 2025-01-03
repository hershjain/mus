import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Profile.css";
import pfplh from '../assets/images/pfimage.png';
import TopPlaylistsDisp from "../components/top-playlists-display";

const ProfileTemplate = (SPUserID) => {
  const { curator } = useParams(); // Get the username (curator) from the URL

  const [user, setUser] = useState({
    profilePic: pfplh, // Placeholder image
    followers: 0,
    madePlaylists: 0,
    bio: "",
    isFollowing: false, // Track if the current user is following this profile
  });

  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  

  // Fetch user profile and playlists data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await fetch(`http://localhost:8000/spotify/profile/${curator}/`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
          body: JSON.stringify({ pf: SPUserID }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const profileData = await response.json();

        setUser({
          profilePic: profileData.profile_picture || pfplh,
          followers: profileData.followers_count || 0,
          madePlaylists: profileData.made_playlists_count || 0,
          bio: profileData.bio || "This user has no bio yet.",
          isFollowing: profileData.is_following || false, // Backend should provide this information
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

  // Handle follow/unfollow logic
  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(`http://localhost:8000/spotify/profile/${curator}/follow/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the request headers
        },
      });

      if (!response.ok) {
        throw new Error("Failed to follow/unfollow the user");
      }

      const data = await response.json();

      // Update the user state based on the response
      setUser((prevUser) => ({
        ...prevUser,
        isFollowing: !prevUser.isFollowing, // Toggle follow status
        followers: prevUser.isFollowing ? prevUser.followers - 1 : prevUser.followers + 1, // Update follower count
      }));
    } catch (err) {
      setError(err.message);
    }
  };

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
                <button onClick={handleFollow}>
                  {user.isFollowing ? "Unfollow" : "Follow"}
                </button>
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
