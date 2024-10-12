import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMusic, faUser, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/discovery"> 
                        <FontAwesomeIcon icon={faHome} size="35px" color='black' /> 
                        <a> Discovery </a>
                    </Link>
                </li>
                <li>
                    <Link to="/library">
                        <FontAwesomeIcon icon={faMusic} size="35px" color='black'/> 
                        <a>Library</a>
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <FontAwesomeIcon icon={faUser} size="35px" color='black'/> 
                        <a>Profile </a>
                    </Link>
                </li>
                <li>
                    <Link to="/create-playlist"> 
                        <FontAwesomeIcon icon={faPlusCircle} size="35px" color='black'/> 
                        <a>Create Playlist </a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;