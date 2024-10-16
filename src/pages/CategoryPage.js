import React from 'react';
import { useParams } from 'react-router-dom';
import PlaylistCard from '../components/playlist-card';

const CategoryPage = ({ playlists }) => {
  const { categoryTitle } = useParams(); // Get category from URL parameters

  // Filter playlists based on the category
  const filteredPlaylists = playlists.filter(playlist => playlist.categoryTitle === categoryTitle);

  return (
    <div>
      <h1>{categoryTitle}</h1>
      <div className="playlist-grid">
        {filteredPlaylists.map((playlist, index) => (
          <PlaylistCard key={index} curator={playlist.curator} title={playlist.title} imageUrl={playlist.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;