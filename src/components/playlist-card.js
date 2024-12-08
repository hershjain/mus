import React from "react";
import { Link } from "react-router-dom";
import '../styles/playlist-card.css';

const PlaylistCard = ({ title, imageUrl, curator, url }) => {
    return (
        <div className="playlist-card">
            <a href={url} target="_blank" rel="noopener noreferrer" className="playlist-link">
                <img src={imageUrl} alt={title} className="playlist-image" />
                <h3 className="playlist-title">{title}</h3>
            </a>
            <Link to={`/app/profile/${curator}`} className="playlist-curator">
                {curator}
            </Link>
        </div>
    );
};

export default PlaylistCard;
