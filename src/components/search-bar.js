import React, {useState} from 'react';
import '../styles/search-bar.css';

const SearchBar = ({ searchVisible, searchQuery, handleSearchChange }) => {
    const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories

    const categories = [ 'Created', 'Saved', 'Profiles']; // List of all categories


    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter(c => c !== category)); // Remove category if it's already selected
        } else {
        setSelectedCategories([...selectedCategories, category]); // Add category if it's not selected
        }
    };

    
    return (
        <div className={`search-bar-div ${searchVisible ? 'search-bar-visible' : 'search-bar-hidden'}`}>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search playlists..."
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
        </div>
    );
};

export default SearchBar;
