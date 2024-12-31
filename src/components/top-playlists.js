import React, { useState } from 'react';
import PlaylistCard from './playlist-card';
import PlaylistRow from './playlist-row';
import '../styles/top-playlists.css';

const TopPlaylists = ({ categoryTitle, topPlaylists, userPlaylists, SPUserID }) => {
  const [editTPVisible, setEditTPVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(userPlaylists);
  const [topPlaylistsState, setTopPlaylistsState] = useState([...topPlaylists]); // State for top playlists
  const [selectedSlot, setSelectedSlot] = useState(null); // Track which slot is being replaced

  const toggleEditTP = () => {
    setEditTPVisible(!editTPVisible);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase(); // Case-insensitive search
    setSearchQuery(query);

    // Filter userPlaylists based on the search query
    const filteredPlaylists = userPlaylists.filter((playlist) =>
      (playlist.name?.toLowerCase().includes(query) || // Safely check title
      playlist.owner.display_name?.toLowerCase().includes(query)) // Safely check curator
    );

    setSearchResults(filteredPlaylists);
  };

  const handleSlotSelection = (index) => {
    // Set the selected slot for replacement
    setSelectedSlot(index);
  };

  const handlePlaylistReplacement = (playlist) => {
    if (selectedSlot !== null) {
      // Find if the playlist already exists in the top playlists
      const duplicateIndex = topPlaylistsState.findIndex(
        (tp) => tp.id === playlist.id
      );
  
      const updatedPlaylists = [...topPlaylistsState];
  
      if (duplicateIndex !== -1) {
        // If the playlist is a duplicate, blank out the original slot
        updatedPlaylists[duplicateIndex] = {
          id: null,
          title: '',
          curator: '',
          imageUrl: '',
          url: '',
        };
      }
  
      // Replace the selected slot with the new playlist
      updatedPlaylists[selectedSlot] = {
        id: playlist.id,
        title: playlist.name,
        curator: playlist.owner.display_name,
        imageUrl: playlist.images[0]?.url || '', // Use playlist image or fallback to empty string
        url: playlist.external_urls.spotify,
      };
  
      setTopPlaylistsState(updatedPlaylists);
      setSelectedSlot(null); // Reset selection
    }
  };
  

  return (
    <div className="playlist-row">
      <div className='top-playlist-title'>
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
            onClick={() => editTPVisible && handleSlotSelection(index)} // Allow slot selection only when editing
          >
            <h1 className='playlist-rank'>{index + 1}</h1>
            {playlist.id ? (
            <PlaylistCard
              id={playlist.id}
              curator={playlist.curator}
              title={playlist.title}
              imageUrl={playlist.imageUrl}
              description={playlist.description}
              curatorID={playlist.owner.id}
              url={editTPVisible ? null : playlist.url} // Disable URL when editing
              SPUserID={SPUserID}
              userPlaylists={userPlaylists}
            />
            ) : (
            <div className='blank-card'>
              <PlaylistCard
                curator={null}
                title="+"
                imageUrl={null}
                url={null}
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
                onClick={() => handlePlaylistReplacement(playlist)} // Replace playlist on click
              >
                <PlaylistCard
                  curator={playlist.owner.display_name}
                  title={playlist.name}
                  imageUrl={playlist.images[0]?.url || ''}
                  url={null} // Disable URL in search results
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
