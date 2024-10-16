import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/playlist-grid.css';

const PlaylistGrid = ({ playlists }) => {
  return (
    <div className="playlist-grid">
        {playlists.map((playlist, index) => (
          <PlaylistCard key={index} curator={playlist.curator} title={playlist.title} imageUrl={playlist.imageUrl} />
        ))}
    </div>
  );
};

export default PlaylistGrid;