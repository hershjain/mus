import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/top-playlists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const TopPlaylistsDisp = ({ categoryTitle, playlists, SPUserID, userPlaylists }) => {
  return (
    <div className="playlist-row">
      <div className='top-playlist-title'>
        {playlists == [] ? (
          <h2 className="category-title">{categoryTitle}</h2>
        ): (
          <>
          </>
        )}
        
      </div>
      
      <div className="top-playlist-carousel">
        {playlists.map((playlist, index) => (
          <div className='top-playlist-row'>
            <h1 className='playlist-rank'>{index+1}</h1>
            <PlaylistCard key={playlist.spotify_playlist_id} id={playlist.spotify_playlist_id} title={playlist.title} curator={playlist.created_by} description={playlist.description} imageUrl={playlist.cover_img} url={playlist.sp_link} curatorID={playlist.spi_id} SPUserID={SPUserID} userPlaylists={userPlaylists} isPublic={playlist.public} genres={playlist.genres}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlaylistsDisp;