import React, {useState} from 'react';
import SearchResults from './search-results';
import PlaylistCard from './playlist-card';
import '../styles/search-bar.css';

const SearchBar = ({ searchVisible, userPlaylists, SPUserID }) => {
    const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(userPlaylists);
    const categories = [ 'Yours', 'Saved', 'Profiles']; // List of all categories


    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter(c => c !== category)); // Remove category if it's already selected
        } else {
        setSelectedCategories([...selectedCategories, category]); // Add category if it's not selected
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase(); // Case-insensitive search
        setSearchQuery(query);
    
        // Filter userPlaylists based on the search query
        const filteredPlaylists = userPlaylists.filter((playlist) =>
          (playlist.name?.toLowerCase().includes(query) || // Safely check title
          playlist.owner.display_name?.toLowerCase().includes(query)) // Safely check curator
        );
    
        setSearchResults(filteredPlaylists);
      };
    
    return (
        <div className={`search-bar-div ${searchVisible ? 'search-bar-visible' : 'search-bar-hidden'}`}>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search playlists, profiles, genres..."
                />
                {/* <button type="submit">Search</button> */}
            </div>
            <div className='search-filters'>
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

            {/* {searchQuery && searchResults.length > 0 && (
                <SearchResults query={searchQuery} results={searchResults} />
            )} */}

            {searchQuery && searchResults.length > 0 && (
                <div className="search-results-grid">
                {searchResults.map((playlist) => (
                    <PlaylistCard key={playlist.id} id={playlist.id} title={playlist.name} curator={playlist.owner.display_name} description={playlist.description} imageUrl={playlist.images[0].url} url={playlist.external_urls.spotify} curatorID={playlist.owner.id} SPUserID={SPUserID} userPlaylists={userPlaylists}/>
                ))}
              </div>
            )}
        </div>
    );
};

export default SearchBar;
