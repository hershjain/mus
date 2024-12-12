import React, { useState } from "react";
import { Link } from 'react-router-dom'; 
import '../styles/create-playlist.css';
import PlaylistCardHorizontal from "../components/playlist-card-horizontal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


const CreatePlaylist = ({ userPlaylists, SPUserID}) => {
    const ownedPlaylists = userPlaylists.filter(playlist => playlist.owner.id === SPUserID);
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);

    const handleToggleChange = (playlistId, isPublic) => {
        setSelectedPlaylists(prev => 
            isPublic ? [...prev, playlistId] : prev.filter(id => id !== playlistId)
        );
    };
//Connect to backend for importing public playlists
    const handleConfirm = async () => {
        try {
            const response = await fetch('/api/submit-playlists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ playlistIds: selectedPlaylists }),
            });

            if (response.ok) {
                console.log('Playlists submitted successfully');
                setSelectedPlaylists([]); // Reset after successful submission
            } else {
                console.error('Failed to submit playlists');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="playlist-page">
            <div className="import-header">
                <div className="import-title">
                    <Link to="/app/library">
                        <FontAwesomeIcon className="back-button" icon={faChevronLeft} size="xs" color="white" />
                    </Link>
                    <h2>Publish Playlists</h2>
                </div>
                <button onClick={handleConfirm}>Confirm</button>
            </div>
            <div className="list-div">
                <div className="playlist-list">
                    {ownedPlaylists.map((playlist) => (
                        <PlaylistCardHorizontal
                            key={playlist.id}
                            playlistId={playlist.id}
                            curator={playlist.owner.display_name}
                            title={playlist.name}
                            imageUrl={playlist.images[0].url}
                            onToggleChange={handleToggleChange}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatePlaylist;
