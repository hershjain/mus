import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUser, faX, faClose, faCheckCircle, faLockOpen, faLock, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import Vibrant from "node-vibrant";
import "../styles/playlist-card.css";

const PlaylistCard = ({ 
    id, 
    title, 
    curator, 
    url, 
    imageUrl, 
    description, 
    curatorID, 
    SPUserID, 
    userPlaylists, 
    disableOverlay,
    genres,
    isPublic,
}) => {
    const [backgroundColor, setBackgroundColor] = useState("#ffffff10");
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPublicDisplay, setIsPublicDisplay] = useState(isPublic);

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
        if (!disableOverlay) {
            setIsExpanded(true);
        }
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("overlay")) {
            handleClose();
        }
    };

    const togglePublic = () => {
        setIsPublicDisplay(true);
    };

    const togglePrivate = () => {
        setIsPublicDisplay(false);
    };



    return (
        <>
            {/* Playlist Card */}
            <div 
                className="playlist-card" 
                style={{ backgroundColor }} 
                onClick={handleExpand} // Conditional overlay opening
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
            {isExpanded && !disableOverlay && (
                <div className="overlay" style={{ backgroundColor }} onClick={handleOverlayClick}>
                    <button className="close-button" onClick={handleClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                    <div className="overlay-content">
                        {isOwner ? (
                            <div className="overlay-actions">
                                {isPublicDisplay ? (
                                    <a 
                                    className="public-button"
                                    onClick={togglePrivate}
                                    >
                                        <FontAwesomeIcon icon={faGlobe} />
                                    </a>
                                ) : (
                                    <a 
                                    className="private-button"
                                    onClick={togglePublic}
                                    >
                                        <FontAwesomeIcon icon={faLock} />
                                    </a>
                                )}
                                
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
                                {/* <button className="save-button">
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </button> */}
                                <a 
                                    href={url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="spotify-button"
                                >
                                    <FontAwesomeIcon icon={faSpotify} />
                                </a>
                                <Link to={`/app/profile/${curator}`} className="profile-button">
                                    <FontAwesomeIcon icon={faUser} />
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
                            {isOwner ? (
                                <Link to={`/app/profile`} className="playlist-curator-enlarged">
                                    {curator}
                                </Link>
                            ) : (    
                                <Link to={`/app/profile/${curator}`} className="playlist-curator-enlarged">
                                    {curator}
                                </Link>
                            )}
                        </div>
                        
                        <p className="description">{description}</p>

                        
                        {genres && genres.length > 0 && (
                            <div className="tags">
                                {genres.map((genre, index) => (
                                    <a className="tag" key={index}>{genre}</a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default PlaylistCard;
