import React, { useState, useEffect } from 'react';
import PlaylistCard from './playlist-card';
import '../styles/top-playlists.css';
import axios from 'axios';

// Normalize playlist data for consistency
const normalizePlaylist = (playlist) => ({
  id: playlist.spotify_playlist_id || playlist.id || '',
  title: playlist.title || playlist.name || '',
  curator: playlist.created_by || playlist.owner?.display_name || '',
  description: playlist.description || '',
  imageUrl: playlist.cover_img || playlist.images?.[0]?.url || '',
  url: playlist.sp_link || playlist.external_urls?.spotify || '',
  curatorID: playlist.spu_id || playlist.owner?.id || '',
  genres: playlist.genres || [],
  isPublic: playlist.public || false,
});

const TopPlaylists = ({ categoryTitle, userPlaylists, SPUserID }) => {
  const [editTPVisible, setEditTPVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userTopPlaylists, setUserTopPlaylists] = useState([null, null, null]);

  // Normalize user playlists on initialization
  const normalizedUserPlaylists = userPlaylists.map(normalizePlaylist);

  // Fetch top playlists when component mounts
  useEffect(() => {
    const fetchTopPlaylists = async () => {
      try {
        const token = localStorage.getItem('access');
        const response = await axios.get('http://localhost:8000/spotify/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const normalizedTopPlaylists = response.data.top_playlists.map(normalizePlaylist);
  
        // Ensure exactly 3 slots, filled with either playlists or null
        setUserTopPlaylists([
          normalizedTopPlaylists[0] || null,
          normalizedTopPlaylists[1] || null,
          normalizedTopPlaylists[2] || null,
        ]);
      } catch (error) {
        console.error('Error fetching top playlists:', error);
        setUserTopPlaylists([null, null, null]); // Default to blank slots on error
      }
    };
  
    fetchTopPlaylists();
  }, []);
  

  const toggleEditTP = async () => {
    if (editTPVisible) {
      try {
        const token = localStorage.getItem('access');
        const selectedPlaylists = userTopPlaylists.filter((playlist) => playlist?.id);
        await axios.post('http://localhost:8000/spotify/settoppl/', { playlists: selectedPlaylists }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Top playlists saved successfully');
      } catch (error) {
        console.error('Error saving top playlists:', error);
      }
    }

    setSelectedSlot(
      editTPVisible ? null : userTopPlaylists.findIndex((playlist) => !playlist?.id)
    );
    setEditTPVisible(!editTPVisible);
  };

  const toggleRemoveEditTP = async () => {
    if (!editTPVisible) {
      try {
        const token = localStorage.getItem('access');
        await axios.post('http://localhost:8000/spotify/remtoppl/', { user: SPUserID },{
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Top playlists removed successfully');
      } catch (error) {
        console.error('Error removing top playlists:', error);
      }
    }

    setSelectedSlot(
      editTPVisible ? null : userTopPlaylists.findIndex((playlist) => !playlist?.id)
    );
    setEditTPVisible(!editTPVisible);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const results = normalizedUserPlaylists.filter(
      (playlist) =>
        playlist.curatorID === SPUserID && // Ensure the playlist belongs to the user
        (playlist.title.toLowerCase().includes(query) ||
          playlist.curator.toLowerCase().includes(query))
    );
    setSearchResults(results);
  };

  const handlePlaylistReplacement = (playlist) => {
    if (selectedSlot !== null) {
      const updatedPlaylists = [...userTopPlaylists];

      // Prevent duplicates
      const duplicateIndex = updatedPlaylists.findIndex((tp) => tp?.id === playlist.id);
      if (duplicateIndex !== -1) updatedPlaylists[duplicateIndex] = null;

      // Replace selected slot with the chosen playlist
      updatedPlaylists[selectedSlot] = playlist;

      // Set next blank slot or deselect
      const nextBlankSlot = updatedPlaylists.findIndex((tp) => !tp?.id);
      setUserTopPlaylists(updatedPlaylists);
      setSelectedSlot(nextBlankSlot !== -1 ? nextBlankSlot : null);
    }
  };

  return (
    <div className="playlist-row">
      <div className="top-playlist-title">
        <h2 className="category-title">{categoryTitle}</h2>
        
        {editTPVisible ? (
          <button onClick={toggleEditTP} className="edit-btn">
            <h3>Done</h3>
          </button>
        ) : (
          <button onClick={toggleRemoveEditTP} className="edit-btn">
            <h3>Edit</h3>
          </button>
        )}
        
      </div>

      <div className="top-playlist-carousel">
        {userTopPlaylists.map((playlist, index) => (
          <div
            key={playlist?.id || index}
            className={`top-playlist-row ${selectedSlot === index ? 'selected' : ''}`}
            onClick={() => editTPVisible && setSelectedSlot(index)}
          >
            <h1 className="playlist-rank">{index + 1}</h1>
            {playlist ? (
              <PlaylistCard
                {...playlist}
                url={!editTPVisible ? playlist.url : null}
                disableOverlay={editTPVisible}
              />
            ) : (
              <div className="blank-card">
                <PlaylistCard title="+" imageUrl='' curator='' disableOverlay={true} />
              </div>
            )}
          </div>
        ))}
      </div>

      {editTPVisible && (
        <div className="edit-tp-selector edit-tp-selector-visible">
          <div className="search-bar edit-tp">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search playlists..."
            />
          </div>
          <div className="tp-selector-row">
            {searchResults.map((playlist) => (
              <div
                key={playlist.id}
                className="tp-selector-item"
                onClick={() => handlePlaylistReplacement(playlist)}
              >
                <PlaylistCard {...playlist} disableOverlay={true} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPlaylists;
