import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMusic, faUser, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link to="/app/discovery"> 
                        <FontAwesomeIcon icon={faHome} color='black' /> 
                        {/* <a> Discovery </a> */}
                    </Link>
                </li>
                <li>
                    <Link to="/app/library">
                        <FontAwesomeIcon icon={faMusic} color='black'/> 
                        {/* <a>Library</a> */}
                    </Link>
                </li>
                <li>
                    <Link to="/app/profile">
                        <FontAwesomeIcon icon={faUser} color='black'/> 
                        {/* <a>Profile </a> */}
                    </Link>
                </li>
                {/* <li>
                    <Link to="/create-playlist"> 
                        <FontAwesomeIcon icon={faPlusCircle} size="35px" color='black'/> 
                        <a>Create Playlist </a>
                    </Link>
                </li> */}
            </ul>
        </nav>
    );
};

export default Navbar;