import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/playlist-grid.css';

const PlaylistGrid = ({ playlists }) => {
  for (let i = 0; i < playlists.length; i++){
    try {
      let a = playlists[i].name;
      let b = playlists[i].id;
      let c = playlists[i].owner.display_name;
      let d = playlists[i].images[0].url;
      let e = playlists[i].external_urls.spotify;
      if (a == null || b == null || c == null || d == null || e == null){
        console.log('${a} + ${i}');
      }
    } catch (error) {
      let n = playlists[i].name;
      console.error("An error occurred: ${n}" , error); 
      console.log(n);
      
    }
  }
  

  return (
    <div className="playlist-grid">
        {playlists.map((playlist) => (

          <PlaylistCard key={playlist.id} curator={playlist.owner.display_name} title={playlist.name} imageUrl={playlist.images[0].url} url={playlist.external_urls.spotify} description={playlist.description}/>
        ))}
    </div>
  );
};

export default PlaylistGrid;