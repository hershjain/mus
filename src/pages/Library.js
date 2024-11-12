import React, {useState} from "react";
import {Link} from 'react-router-dom';
import PlaylistGrid from '../components/playlist-grid';
import placeholder from '../assets/images/playlist-test-cover.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Library.css';



const Library = ({userPlaylists, SPUserID}) => {
    const ownedPlaylists = userPlaylists.filter(playlist => playlist.owner.id === SPUserID);
    const savedPlaylists = userPlaylists.filter(playlist => playlist.owner.id !== SPUserID);

    const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
    const categories = ['Yours', 'Saved']; // List of all categories

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category)); // Remove category if already selected
        } else {
            setSelectedCategories([...selectedCategories, category]); // Add category if not selected
        }
    };

    // Filter playlists based on selected categories
    const filteredPlaylists = selectedCategories.length > 0
        ? selectedCategories.includes('Yours') && selectedCategories.includes('Saved')
            ? userPlaylists
            : selectedCategories.includes('Yours')
            ? ownedPlaylists
            : savedPlaylists
        : userPlaylists; // If no category selected, display all playlists

    return (
        <body>
            <div className="library-content">
                <div className="library-header">
                    <h1>Your Library</h1>
                    <Link to="/app/create-playlist"> 
                        <FontAwesomeIcon className="create-playlist-button" icon={faPlusCircle} size="50px" color='white' />
                    </Link>
                    
                </div>
                <div className="filter-buttons">
                    {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={selectedCategories.includes(category) ? 'active' : ''}
                    >
                        {category}
                    </button>
                    ))}
                </div>
            </div>
            <div className="library-grid">
                <PlaylistGrid playlists={filteredPlaylists} />
            </div>
        </body>
    );
};

export default Library;