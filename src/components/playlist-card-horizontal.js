import React from "react";
import '../styles/playlist-card-horizontal.css';

const PlaylistCardHorizontal = ({ title, imageUrl, curator, onClick }) => {
    return (
        <div className = "playlist-card-horizontal" onClick={onClick}>
            <img src={imageUrl} alt={title} className="playlist-image-small" />
            <div className="playlist-info">
                <h3 className="playlist-title">{title}</h3>
                <p className="playlist-curator">{curator}</p>
            </div>
        </div>
    );
};

export default PlaylistCardHorizontal;