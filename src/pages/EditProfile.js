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

    const updateUsername = async (newUsername) => {
        try {
          const token = localStorage.getItem("access");
          console.log('this is the auth token being passed in the header:', token);
      
          const response = await fetch('http://localhost:8000/set-username/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername })
          });
      
          if (!response.ok) {
            throw new Error('Failed to update username');
          }
      
          const data = await response.json();
          console.log('Username update success:', data.message); // Handle success message
        } catch (error) {
          console.error('Error updating username:', error);
        }
      };
      
    const updateBio = async (newBio) => {
        try {
          const token = localStorage.getItem("access");
          console.log('this is the auth token being passed in the header:', token);
      
          const response = await fetch('http://localhost:8000/set-bio/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bio: newBio })
          });
      
          if (!response.ok) {
            throw new Error('Failed to update bio');
          }
      
          const data = await response.json();
          console.log('Bio update success:', data.message); // Handle success message
        } catch (error) {
          console.error('Error updating bio:', error);
        }
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
