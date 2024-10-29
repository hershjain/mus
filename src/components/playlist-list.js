import React from 'react';
import PlaylistCardHorizontal from './playlist-card-horizontal';
import '../styles/playlist-list.css';

const PlaylistList = ({ playlists }) => {
  return (
    <div className="playlist-list">
        {playlists.map((playlist) => (
          <PlaylistCardHorizontal key={playlist.id} curator={playlist.owner.display_name} title={playlist.name} imageUrl={playlist.images[0].url} />
        ))}
    </div>
  );
};

export default PlaylistList;