import React, {useState} from "react";
import PlaylistTemplate from "../components/playlist-template";
import PlaylistQuestions from '../components/playlist-questions';


const CreatePlaylist = () => {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleOpenOverlay = () => setShowOverlay(true);
    const handleCloseOverlay = () => setShowOverlay(false);

    return (
        <div className="playlist-page">
        <button className="import-playlist-button" onClick={handleOpenOverlay}>
            Import Playlist
        </button>

        {showOverlay && <PlaylistQuestions onClose={handleCloseOverlay} />}
        </div>
    );
};
  

export default CreatePlaylist;