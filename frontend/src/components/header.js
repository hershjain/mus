import React, {useState} from "react";
import '../styles/header.css';
import SearchBar from "./search-bar";
import MusLogo from "../assets/images/mus-logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as faBellSolid, faSearch, faTimes, } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellRegular } from '@fortawesome/free-regular-svg-icons';

const Header = ({ searchVisible, searchQuery, handleSearchChange, toggleSearch, searchResults, userPlaylists, SPUserID }) => {
    // const [searchVisible, setSearchVisible] = useState(false);
    // const [searchQuery, setSearchQuery] = useState("");
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [notifications, setNotifications] = useState([
        "New playlist from user123",
        "Your playlist was liked by user456",
        "New follower: user789"
      ]);
  
    // const toggleSearch = () => {
    //   setSearchVisible(!searchVisible);
    // };
  
    // const handleSearchChange = (e) => {
    //   setSearchQuery(e.target.value);
    // };

    const toggleNotifications = () => {
      setNotificationsVisible(!notificationsVisible);
    };
    
    
    return (
        <div>
        <header className="app-header">
            <div>
                <button onClick={toggleSearch} className="search-btn">
                    {searchVisible ? (
                    <FontAwesomeIcon className="x-icon" icon={faTimes} color="white" />
                    ) : (
                    <FontAwesomeIcon icon={faSearch} color="white" />
                    )}
                </button>
                <img src={MusLogo} alt="Mus Logo" id="musLogo"/>
                {/* <div className="header-icons"> */}
                {/* <button onClick={toggleNotifications} className="notification-btn"> */}
                {/* {notificationsVisible ? (
                    <FontAwesomeIcon icon={faBellSolid} color="white" />
                    ) : (
                    <FontAwesomeIcon icon={faBellRegular} color="white" />
                    )} */}
                {/* </button> */}

                {notificationsVisible && (
                <div className="notifications-dropdown">
                    {/* <h3>Notifications</h3> */}
                    {notifications.length > 0 ? (
                    <ul>
                        {notifications.map((notification, index) => (
                        <li key={index}>{notification}</li>
                        ))}
                    </ul>
                    ) : (
                    <p>No new notifications</p>
                    )}
                </div>
                )}
                {/* </div>  */}
            </div>
        </header>
            <SearchBar 
                searchVisible={searchVisible} 
                userPlaylists={userPlaylists}
                SPUserID={SPUserID}
            />
        </div>
    );
};

export default Header;