import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/playlist-row.css';

const PlaylistRow = ({ categoryTitle, playlists }) => {
  return (
    <div className="playlist-row">
      <h2 className="category-title">{categoryTitle}</h2>
      <div className="playlist-carousel">
        {playlists.map((playlist, index) => (
          <PlaylistCard key={playlist.id} curator={playlist.owner.display_name} title={playlist.name} imageUrl={playlist.images[0].url} url={playlist.external_urls.spotify}/>
        ))}
      </div>
    </div>
  );
};

export default PlaylistRow;