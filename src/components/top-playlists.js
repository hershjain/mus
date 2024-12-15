import React, {useState, useEffect} from 'react';
import PlaylistCard from './playlist-card';
import PlaylistRow from './playlist-row';
import '../styles/top-playlists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const TopPlaylists = ({ categoryTitle, topPlaylists, searchQuery, handleSearchChange, userPlaylists }) => {
  
  const [editTPVisible, setEditTPVisible] = useState(false);
  const toggleEditTP = () => {
    setEditTPVisible(!editTPVisible);
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
              placeholder="Search playlists, profiles, genres..."
          />
          {/* <button type="submit">Search</button> */}
        </div>
        <div className="tp-selector-row">
          <PlaylistRow playlists={userPlaylists} categoryTitle={"Typee"}/>
        </div>
      </div>
    </div>
  );
};

export default TopPlaylists;