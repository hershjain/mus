import React, {useState} from "react";
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [notifications, setNotifications] = useState([
        "New playlist from user123",
        "Your playlist was liked by user456",
        "New follower: user789"
      ]);
  
    const toggleSearch = () => {
      setSearchVisible(!searchVisible);
    };
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

    const toggleNotifications = () => {
      setNotificationsVisible(!notificationsVisible);
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
                {/* <div className="header-icons"> */}
                <button onClick={toggleNotifications} className="notification-btn">
                <FontAwesomeIcon icon={faBell} size="25px" color="black" />
                </button>

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
    );
};

export default Header;