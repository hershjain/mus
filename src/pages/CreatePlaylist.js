import React, {useState} from "react";
import '../styles/create-playlist.css';
import PlaylistTemplate from "../components/playlist-template";
import PlaylistList from "../components/playlist-list";
import PlaylistQuestions from '../components/playlist-questions';
import PlaylistCardHorizontal from "../components/playlist-card-horizontal";


const CreatePlaylist = ({userPlaylists}) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null); // State to hold the selected playlist ID

    const handleOpenOverlay = (playlistId) => {
        console.log(`Opening overlay for playlist ID: ${playlistId}`);
        setSelectedPlaylistId(playlistId); // Set the selected playlist ID
        setShowOverlay(true); // Show the overlay
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false); // Hide the overlay
        setSelectedPlaylistId(null); // Reset the selected playlist ID
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        // After successful submission, close the overlay
        handleCloseOverlay();
    };

    return (
        <div className="playlist-page">
            <h2>Import Playlist</h2>

            <div className="list-div">
                <div className="playlist-list">
                    {userPlaylists.map((playlist) => (
                        <PlaylistCardHorizontal
                            onClick={() => handleOpenOverlay(playlist.id)} // Pass the playlist ID
                            key={playlist.id}
                            curator={playlist.owner.display_name}
                            title={playlist.name}
                            imageUrl={playlist.images[0].url}
                        />
                    ))}
                </div>
                {showOverlay && (
                    <PlaylistQuestions 
                        onClose={handleCloseOverlay} 
                        playlistId={selectedPlaylistId} // Pass the selected playlist ID to the overlay
                        onSubmit={handleSubmit} // Pass the submit handler
                    />
                )}
            </div>
        </div>
    );
};

export default CreatePlaylist;