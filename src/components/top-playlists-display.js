import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/top-playlists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const TopPlaylistsDisp = ({ categoryTitle, playlists }) => {
  return (
    <div className="playlist-row">
      <div className='top-playlist-title'>
        <h2 className="category-title">{categoryTitle}</h2>
        <FontAwesomeIcon icon={faEllipsis} color="#e7e7e7" size='l' />
      </div>
      
      <div className="top-playlist-carousel">
        {playlists.map((playlist, index) => (
          <div className='top-playlist-row'>
            <h1 className='playlist-rank'>{index+1}</h1>
            <PlaylistCard key={index} curator={playlist.curator} title={playlist.title} imageUrl={playlist.imageUrl} url={playlist.url}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlaylistsDisp;