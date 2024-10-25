import React, {useState} from "react";
import {Link} from 'react-router-dom';
import PlaylistGrid from '../components/playlist-grid';
import placeholder from '../assets/images/playlist-test-cover.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Library.css';



const Library = () => {
    const savedPlaylists = [
        { title: 'Pop Hits', imageUrl: placeholder , curator: 'mheydude123', category: 'Saved' },
        { title: 'Hip Hop Vibes', imageUrl: placeholder , curator: 'hxrsh', category: 'Yours' },
        { title: 'Rock Classics', imageUrl: placeholder, curator: 'ptpampadam', category: 'Saved' },
        { title: 'Juicy Joints', imageUrl: placeholder, curator: 'mheydude123', category: 'Saved' },
        { title: 'Sundae Blues', imageUrl: placeholder, curator: 'hxrsh', category: 'Yours' },
        { title: 'Big Booms', imageUrl: placeholder, curator: 'ptpampadam', category: 'Saved' },      
    ];

    const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories

    const categories = [ 'Yours', 'Saved']; // List of all categories


    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter(c => c !== category)); // Remove category if it's already selected
        } else {
        setSelectedCategories([...selectedCategories, category]); // Add category if it's not selected
        }
    };

    const filteredPlaylists = selectedCategories.length > 0
    ? savedPlaylists.filter(playlist => selectedCategories.includes(playlist.category))
    : savedPlaylists; // If no category is selected, display all playlists

    return (
        <body>
            <div className="library-content">
                <div className="library-header">
                    <h1>Your Library</h1>
                    <Link to="/create-playlist"> 
                        <FontAwesomeIcon className="create-playlist-button" icon={faPlusCircle} size="50px" color='black' />
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