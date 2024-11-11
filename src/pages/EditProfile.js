import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/EditProfile.css';

const EditProfile = ({ user, onSave }) => {
    const [formData, setFormData] = useState({
        username: user.username || '',
        profilePicture: user.profilePicture || '',
        bio: user.bio || '',
        email: user.email || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSave(formData); // Call parent function to save changes
    };

    return (
        <div className="edit-profile">
            <div className='edit-header'> 
                <Link to="/app/profile"> 
                    <FontAwesomeIcon className="back-button" icon={faChevronLeft} size="xs" color='white' />
                </Link>
                <h2>Edit Profile</h2>
            </div>
            <form className="edit-form" onSubmit={handleSave}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>

                {/* <label>
                    Profile Picture URL:
                    <input
                        type="text"
                        name="profilePicture"
                        value={formData.profilePicture}
                        onChange={handleChange}
                    />
                </label> */}

                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </label>

                {/* <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label> */}

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
