import React, { useState, useEffect } from 'react';
import PlaylistCard from './playlist-card';
import ProfileCard from './profile-card';
import placeholder from '../assets/images/pfimage.png'
import '../styles/search-bar.css';

const SearchBar = ({ searchVisible, userPlaylists, SPUserID }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const categories = ['Yours', 'Saved', 'Profiles'];
    const ownedPlaylists = userPlaylists.filter(playlist => playlist.owner.id === SPUserID);
    const savedPlaylists = userPlaylists.filter(playlist => playlist.owner.id !== SPUserID);

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Compute filtered playlists dynamically
    const filteredPlaylists = userPlaylists.filter((playlist) => {
        const matchesCategory =
            selectedCategories.length === 0 || // No filter applied
            (selectedCategories.includes('Yours') && playlist.owner.id === SPUserID) ||
            (selectedCategories.includes('Saved') && playlist.owner.id !== SPUserID);

        const matchesSearchQuery =
            !searchQuery || // No search query
            playlist.name?.toLowerCase().includes(searchQuery) || // Match playlist name
            playlist.owner.display_name?.toLowerCase().includes(searchQuery); // Match curator name

        return matchesCategory && matchesSearchQuery;
    });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    return (
        <div className={`search-bar-div ${searchVisible ? 'search-bar-visible' : 'search-bar-hidden'}`}>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for playlists or users..."
                />
            </div>
            <div className="search-filters">
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

            {searchQuery && filteredPlaylists.length > 0 ? (
                <div className="search-results-grid">
                    <ProfileCard name="Mhey" profilePic={placeholder} />
                    {filteredPlaylists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            id={playlist.id}
                            title={playlist.name}
                            curator={playlist.owner.display_name}
                            description={playlist.description}
                            imageUrl={playlist.images[0]?.url}
                            url={playlist.external_urls.spotify}
                            curatorID={playlist.owner.id}
                            SPUserID={SPUserID}
                            userPlaylists={userPlaylists}
                        />
                    ))}
                </div>
            ) : (
                searchQuery && <p className='no-results-message'>No results found.</p>
            )}
        </div>
    );
};

export default SearchBar;
