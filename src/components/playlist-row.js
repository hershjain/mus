import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/playlist-row.css';

const PlaylistRow = ({ categoryTitle, playlists }) => {
  return (
    <div className="playlist-row">
      <h2 className="category-title">{categoryTitle}</h2>
      <div className="playlist-carousel">
        {playlists.map((playlist, index) => (
          <PlaylistCard key={index} curator={playlist.curator} title={playlist.title} imageUrl={playlist.imageUrl} url={playlist.url}/>
        ))}
      </div>
    </div>
  );
};

export default PlaylistRow;