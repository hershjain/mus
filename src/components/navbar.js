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
                        <FontAwesomeIcon icon={faHome} color='#e7e7e7' /> 
                        {/* <a> Discovery </a> */}
                    </Link>
                </li>
                <li>
                    <Link to="/app/library">
                        <FontAwesomeIcon icon={faMusic} color='#e7e7e7'/> 
                        {/* <a>Library</a> */}
                    </Link>
                </li>
                <li>
                    <Link to="/app/profile">
                        <FontAwesomeIcon icon={faUser} color='#e7e7e7'/> 
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