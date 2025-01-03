import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/top-playlists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const TopPlaylistsDisp = ({ categoryTitle, playlists, SPUserID, userPlaylists }) => {
  return (
    <div className="playlist-row">
      <div className='top-playlist-title'>
        <h2 className="category-title">{categoryTitle}</h2>
      </div>
      
      <div className="top-playlist-carousel">
        {playlists.map((playlist, index) => (
          <div className='top-playlist-row'>
            <h1 className='playlist-rank'>{index+1}</h1>
            <PlaylistCard key={playlist.id} id={playlist.id} title={playlist.name} curator={playlist.owner.display_name} description={playlist.description} imageUrl={playlist.images[0].url} url={playlist.external_urls.spotify} curatorID={playlist.owner.id} SPUserID={SPUserID} userPlaylists={userPlaylists} isPublic={playlist.public}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlaylistsDisp;