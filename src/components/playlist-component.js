import React, { useState, useEffect } from 'react';

const PlaylistComponent = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/spotify/playlists', {
      credentials: 'include' // To include cookies for session handling
    })
      .then(response => response.json())
      .then(data => setPlaylists(data.items || []))
      .catch(error => console.error('Error fetching playlists:', error));
  }, []);

  return (
    <div>
      <h1>Your Spotify Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <img src={playlist.images[0].url} alt={playlist.name} width={100} />
            <p>{playlist.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistComponent;
