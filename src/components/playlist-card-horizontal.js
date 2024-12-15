import React from "react";
import '../styles/playlist-card-horizontal.css';

const PlaylistCardHorizontal = ({ title, imageUrl, curator, playlistId, onToggleChange }) => {
    const handleToggleChange = (e) => {
        onToggleChange(playlistId, e.target.checked); // Send the ID and checked status
    };

    return (
        <div className="playlist-card-horizontal" id={playlistId}>
            <div className="playlist-img-title">
                <img src={imageUrl} alt={title} className="playlist-image-small" />
                <div className="playlist-info">
                    <h3 className="playlist-title-h">{title}</h3>
                    <p className="playlist-curator-h">{curator}</p>
                </div>
            </div>
            <div className="import-functions">
                <label className="circle-toggle">
                    <input type="checkbox" onChange={handleToggleChange} />
                    <span className="slider">
                        <span className="status public"></span>
                        <span className="status private"></span>
                    </span>
                </label>
            </div>
        </div>
    );
};

export default PlaylistCardHorizontal;
