import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUser, faX, faClose, faCheckCircle, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import Vibrant from "node-vibrant";
import "../styles/playlist-card.css";

const PlaylistCard = ({ id, title, curator, url, imageUrl, description, curatorID, SPUserID, userPlaylists }) => {
    
    // const playlistID = playlist.id;
    // const title = playlist.name;
    // const imageUrl = playlist.images[0].url;
    // const curator = playlist.owner.display_name;
    // const url = playlist.external_urls.spotify;
    // const description = playlist.description;
    // const curatorID = playlist.owner.id
    
    const [backgroundColor, setBackgroundColor] = useState("#ffffff10");
    const [isExpanded, setIsExpanded] = useState(false);
    const tags = ["Hip Hop", "Pop", "RNB"]


    // const isInUserPlaylists = curatorID === SPUserID;
    // const isInUserPlaylists = userPlaylists.some(userPlaylist => userPlaylist.id === id);
    const isOwner = curatorID === SPUserID;

    useEffect(() => {
        if (imageUrl) {
            Vibrant.from(imageUrl)
                .getPalette()
                .then((palette) => {
                    const vibrantColor = (palette.Vibrant?.hex + 'b0') || "#ffffff10";
                    setBackgroundColor(vibrantColor);
                })
                .catch((error) => {
                    console.error("Error extracting colors with Vibrant.js:", error);
                });
        }
    }, [imageUrl]);

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    const handleOverlayClick = (e) => {
        // Close the overlay only if the click is outside the content
        if (e.target.classList.contains("overlay")) {
            handleClose();
        }
    };

    return (
        <>
            {/* Playlist Card */}
            <div 
                className="playlist-card" 
                style={{ backgroundColor }} 
                onClick={handleExpand} // Open expanded view on click
            >
                <h3 className="playlist-title">{title}</h3>
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="playlist-image" 
                />
                <Link to={`/app/profile/${curator}`} className="playlist-curator">
                    {curator}
                </Link>
            </div>

            {/* Expanded View Overlay */}
            {isExpanded && (
                <div className="overlay" style={{backgroundColor}} onClick={handleOverlayClick} >
                    <button className="close-button" onClick={handleClose}>
                                <FontAwesomeIcon icon={faClose}/>
                    </button>
                    <div className="overlay-content">
                            
                                
                                {isOwner ? (
                                    <div className="overlay-actions">
                                        <a 
                                        href={url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="spotify-button"
                                        >
                                            <FontAwesomeIcon icon={faSpotify} />
                                        </a>
                                    </div>
                                ) : (
                                    <div className="overlay-actions">
                                        <button className="save-button">
                                            <FontAwesomeIcon icon={faPlusCircle}/>
                                        </button>
                                        <a 
                                        href={url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="spotify-button"
                                        >
                                            <FontAwesomeIcon icon={faSpotify} />
                                        </a>
                                        <Link to={`/app/profile/${curator}`} className="profile-button">
                                            <FontAwesomeIcon icon={faUser}/>
                                        </Link>
                                    </div>
                                )}
                        
                        <img 
                            src={imageUrl} 
                            alt={title} 
                            className="enlarged-image" 
                        />
                        <div className="playlist-info-enlarged">
                            <h2>{title}</h2>
                            <Link to={`/app/profile/${curator}`} className="playlist-curator-enlarged">
                                {curator}
                            </Link>
                        </div>
                        
                        <p className="description">{description}</p>
                        {/* <div className="tags">
                            {tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div> */}
                        
                    </div>
                </div>
            )}
        </>
    );
};

export default PlaylistCard;
