import React from "react";
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header>
            <div>
                <FontAwesomeIcon icon={faSearch} size="35px" color='black' /> 
                <h1>müs</h1>
                <FontAwesomeIcon icon={faBell} size="35px" color='black' /> 
            </div>
        </header>
    );
};

export default Header;