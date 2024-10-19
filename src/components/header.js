import React, {useState} from "react";
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
  
    const toggleSearch = () => {
      setSearchVisible(!searchVisible);
    };
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
    
    return (
        <header>
            <div>
                <button onClick={toggleSearch} className="search-btn">
                    {searchVisible ? (
                    <FontAwesomeIcon icon={faTimes} size="25px" color="black" />
                    ) : (
                    <FontAwesomeIcon icon={faSearch} size="25px" color="black" />
                    )}
                </button>

                {searchVisible && (
                    <div className="search-bar">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search playlists..."
                    />
                    <button type="submit">Search</button>
                    </div>
                )}
                <h1>müs</h1>
                <FontAwesomeIcon icon={faBell} size="25px" color='black' /> 
            </div>
        </header>
    );
};

export default Header;