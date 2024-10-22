import React from "react";
import "../styles/song-item.css"; 

const SongItem = ({ picture, name, artist, runtime }) => {
  return (
    <div className="song-item">
      <img src={picture} alt={name} className="song-picture" />
      <div className="song-details">
        <h4 className="song-name">{name}</h4>
        <p className="song-artist">{artist}</p>
      </div>
      <p className="song-runtime">{runtime}</p>
    </div>
  );
};

export default SongItem;
