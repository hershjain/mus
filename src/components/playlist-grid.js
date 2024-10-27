import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/playlist-grid.css';

const PlaylistGrid = ({ playlists }) => {
  return (
    <div className="playlist-grid">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} curator={playlist.owner.display_name} title={playlist.name} imageUrl={playlist.images[0].url} />
        ))}
    </div>
  );
};

export default PlaylistGrid;