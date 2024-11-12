import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/top-playlists.css';

const TopPlaylists = ({ categoryTitle, playlists }) => {
  return (
    <div className="playlist-row">
      <h2 className="category-title">{categoryTitle}</h2>
      <div className="playlist-carousel">
        {playlists.map((playlist, index) => (
          <div className='top-playlist-row'>
            <h1 className='playlist-rank'>{index+1}</h1>
            <PlaylistCard key={index} curator={playlist.curator} title={playlist.title} imageUrl={playlist.imageUrl} url={playlist.external_urls}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlaylists;