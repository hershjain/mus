import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMusic, faUser, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/discovery"> <FontAwesomeIcon icon={faHome} size="26px" color='black' /> <a href="/discovery">Discovery</a> </Link></li>
                <li><Link to="/library"> <FontAwesomeIcon icon={faMusic} size="26px" color='black'/> <a href="/library">Library</a> </Link></li>
                <li><Link to="/profile">  <FontAwesomeIcon icon={faUser} size="26px" color='black'/> <a href="/profile">Profile</a> </Link></li>
                <li><Link to="/create-playlist"> <FontAwesomeIcon icon={faPlusCircle} size="26px" color='black'/> <a href="/create-playlist">Create Playlist</a> </Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;