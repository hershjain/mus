import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/playlist-row.css';

const PlaylistRow = ({ categoryTitle, playlists, userPlaylists, SPUserID }) => {
  return (
    <div className="playlist-row">
      <h2 className="category-title">{categoryTitle}</h2>
      <div className="playlist-carousel">
        {playlists.map((playlist, index) => (
          <PlaylistCard key={playlist.spotify_playlist_id} id={playlist.spotify_playlist_id} title={playlist.title} curator={playlist.created_by} description={playlist.description} imageUrl={playlist.cover_img} url={playlist.sp_link} curatorID={playlist.spu_id} SPUserID={SPUserID} userPlaylists={userPlaylists}/>
        ))}
      </div>
    </div>
  );
};

export default PlaylistRow;