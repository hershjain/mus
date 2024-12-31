import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/playlist-row.css';

const PlaylistRow = ({ categoryTitle, playlists, userPlaylists, SPUserID }) => {
  return (
    <div className="playlist-row">
      <h2 className="category-title">{categoryTitle}</h2>
      <div className="playlist-carousel">
        {playlists.map((playlist, index) => (
          <PlaylistCard key={playlist.id} id={playlist.id} title={playlist.name} curator={playlist.owner.display_name} description={playlist.description} imageUrl={playlist.images[0].url} url={playlist.external_urls.spotify} curatorID={playlist.owner.id} SPUserID={SPUserID} userPlaylists={userPlaylists}/>
        ))}
      </div>
    </div>
  );
};

export default PlaylistRow;