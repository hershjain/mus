import React, { useState } from 'react';
import PlaylistCard from './playlist-card';
import '../styles/top-playlists.css';

const TopPlaylists = ({ categoryTitle, topPlaylists, userPlaylists, SPUserID }) => {
  const [editTPVisible, setEditTPVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(userPlaylists.filter((playlist) => playlist.owner?.id === SPUserID));
  const [topPlaylistsState, setTopPlaylistsState] = useState([...topPlaylists]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const toggleEditTP = async () => {
    if (editTPVisible) {
      // Send the selected playlists to the backend
      try {
        const token = localStorage.getItem('access');
        const selectedPlaylists = topPlaylistsState.filter((playlist) => playlist.id); // Only send non-blank playlists
  
        const response = await fetch('http://localhost:8000/spotify/settoppl/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ playlists: selectedPlaylists }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save top playlists');
        }
  
        console.log('Top playlists saved successfully');
      } catch (error) {
        console.error('Error saving top playlists:', error);
      }
    }
  
    // Toggle the edit mode
    if (!editTPVisible) {
      const firstBlankIndex = topPlaylistsState.findIndex((playlist) => !playlist.id);
      setSelectedSlot(firstBlankIndex !== -1 ? firstBlankIndex : null);
    } else {
      setSelectedSlot(null);
    }
  
    setEditTPVisible(!editTPVisible);
  };
  

  const yourPlaylists = userPlaylists.filter((playlist) => playlist.owner?.id === SPUserID);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredPlaylists = yourPlaylists.filter(
      (playlist) =>
        playlist.name?.toLowerCase().includes(query) ||
        playlist.owner.display_name?.toLowerCase().includes(query)
    );

    setSearchResults(filteredPlaylists);
  };

  const handleSlotSelection = (index) => {
    setSelectedSlot(index);
  };

  const handlePlaylistReplacement = (playlist) => {
    if (selectedSlot !== null) {
      const duplicateIndex = topPlaylistsState.findIndex((tp) => tp.id === playlist.id);
  
      const updatedPlaylists = [...topPlaylistsState];
  
      // Remove any existing occurrence of the playlist to prevent duplicates
      if (duplicateIndex !== -1) {
        updatedPlaylists[duplicateIndex] = {
          id: null,
          title: '',
          curator: '',
          imageUrl: '',
          url: '',
        };
      }
  
      // Replace the selected slot with the chosen playlist
      updatedPlaylists[selectedSlot] = {
        id: playlist.id,
        title: playlist.name,
        curator: playlist.owner.display_name,
        imageUrl: playlist.images[0]?.url || '',
        url: playlist.external_urls.spotify,
      };
  
      // Find the next blank slot index
      const nextBlankIndex = updatedPlaylists.findIndex((playlist) => !playlist.id);
  
      setTopPlaylistsState(updatedPlaylists);
  
      // Set the next blank slot as selected or deselect if no blanks remain
      setSelectedSlot(nextBlankIndex !== -1 ? nextBlankIndex : null);
    }
  };
  

  return (
    <div className="playlist-row">
      <div className="top-playlist-title">
        <h2 className="category-title">{categoryTitle}</h2>
        <button onClick={toggleEditTP} className="edit-btn">
          {editTPVisible ? <h3>Done</h3> : <h3>Edit</h3>}
        </button>
      </div>

      <div className="top-playlist-carousel">
        {topPlaylistsState.map((playlist, index) => (
          <div
            key={playlist.id || index}
            className={`top-playlist-row ${selectedSlot === index ? 'selected' : ''}`}
            onClick={() => editTPVisible && handleSlotSelection(index)}
          >
            <h1 className="playlist-rank">{index + 1}</h1>
            {playlist.id ? (
              <PlaylistCard
                id={playlist.id}
                curator={playlist.curator}
                title={playlist.title}
                imageUrl={playlist.imageUrl || ''}
                description={playlist.description}
                url={editTPVisible ? null : playlist.url} // Disable URL when editing
                disableOverlay={editTPVisible} // Disable overlay when editing
                SPUserID={SPUserID}
                userPlaylists={userPlaylists}
                isPublic={playlist.public}
              />
            ) : (
              <div className="blank-card">
                <PlaylistCard
                  curator={null}
                  title="+"
                  imageUrl={null}
                  url={null}
                  disableOverlay={true}
                />
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
                <PlaylistCard
                  curator={playlist.owner.display_name}
                  title={playlist.name}
                  imageUrl={playlist.images[0]?.url || ''}
                  id={playlist.id}
                  description={playlist.description}
                  url={playlist.external_urls.spotify}
                  disableOverlay={true} // Always disable overlay in this context
                  SPUserID={SPUserID}
                  userPlaylists={userPlaylists}
                  isPublic={playlist.public}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPlaylists;
