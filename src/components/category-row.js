import React from 'react';
import PlaylistCard from './playlist-card';
import '../styles/playlist-row.css';

const CategoryRow = ({ category, index }) => {
  return (
    <div key={index} className="playlist-row">
      <h2 className="category-title">{category.message}</h2>
      <div className="playlist-carousel">
        {category.playlists.map((item, idx) => (
          <PlaylistCard key={idx} curator={item.owner.display_name} title={item.name} imageUrl={item.images[0].url} url={item.external_urls.spotify}/>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;