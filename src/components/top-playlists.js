import React, { useState } from 'react';
import PlaylistCard from './playlist-card';
import PlaylistRow from './playlist-row';
import '../styles/top-playlists.css';

const TopPlaylists = ({ categoryTitle, topPlaylists, userPlaylists }) => {
  
  const [editTPVisible, setEditTPVisible] = useState(false);
  const toggleEditTP = () => {
    setEditTPVisible(!editTPVisible);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(userPlaylists);

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
  
  return (
    <div className="playlist-row">
      <div className='top-playlist-title'>
        <h2 className="category-title">{categoryTitle}</h2>
        <button onClick={toggleEditTP} className="edit-btn">
          {editTPVisible ? (
          <h3>Done</h3>
          ) : (
          <h3>Edit</h3>
          )}
        </button>
      </div>
      
      <div className="top-playlist-carousel">
        {topPlaylists.map((playlist, index) => (
          <div className='top-playlist-row'>
            <h1 className='playlist-rank'>{index+1}</h1>
            <PlaylistCard key={index} curator={playlist.curator} title={playlist.title} imageUrl={playlist.imageUrl} url={playlist.url}/>
          </div>
        ))}
      </div>

      <div className={`edit-tp-selector ${editTPVisible ? "edit-tp-selector-visible" : "edit-tp-selector-hidden"}`}>
        <div className="search-bar edit-tp">
          <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search playlists..."
          />
          {/* <button type="submit">Search</button> */}
        </div>
        <div className="tp-selector-row">
          <PlaylistRow playlists={searchResults} categoryTitle={"Your Playlists"}/>
        </div>
      </div>
    </div>
  );
};

export default TopPlaylists;