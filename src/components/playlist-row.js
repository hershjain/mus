import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/playlist-row.css';

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PlaylistRow = ({ categoryTitle, playlists, userPlaylists, SPUserID }) => {
  // Shuffle the playlists before rendering
  const randomizedPlaylists = shuffleArray(playlists);

  return (
    <div className="playlist-row">
      <h2 className="category-title">{categoryTitle}</h2>
      <div className="playlist-carousel">
        {randomizedPlaylists.map((playlist, index) => (
          <PlaylistCard 
            key={playlist.spotify_playlist_id} 
            id={playlist.spotify_playlist_id} 
            title={playlist.title} 
            curator={playlist.created_by} 
            description={playlist.description} 
            imageUrl={playlist.cover_img} 
            url={playlist.sp_link} 
            curatorID={playlist.spu_id} 
            SPUserID={SPUserID} 
            userPlaylists={userPlaylists}
            genres={playlist.genres}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistRow;
