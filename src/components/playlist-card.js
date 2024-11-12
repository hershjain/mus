import React from "react";
import '../styles/playlist-card.css';

const PlaylistCard = ({ title, imageUrl, curator, url }) => {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="playlist-card">
            <img src={imageUrl} alt={title} className="playlist-image" />
            <h3 className="playlist-title">{title}</h3>
            <p className="playlist-curator">{curator}</p>
        </a>
    );
};

export default PlaylistCard;
