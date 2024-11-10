import React, { useState, useEffect } from 'react';

import React, { useEffect, useState } from 'react';

const PlaylistComponent = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        // Get the JWT token from localStorage (or your preferred storage)
        const token = localStorage.getItem("access");

        const response = await fetch('http://localhost:8000/spotify/playlists/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }

        const data = await response.json();
        setPlaylists(data.items || []);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
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
