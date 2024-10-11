import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/discovery">Discovery</Link></li>
                <li><Link to="/library">Library</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/create-playlist">Create Playlist</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;