import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/EditProfile.css';

const EditProfile = ({ username, bio }) => {
    const [formData, setFormData] = useState({
        username: username || '',
        bio: bio || '',
    });

    const navigate = useNavigate();  // Initialize useNavigate

    // Populate form with user data when fetched
    useEffect(() => {
        setFormData({
            username: username || '',
            bio: bio || ''
        });
    }, [username, bio]);

    // Handle input changes for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSave = async (e) => {
        e.preventDefault();
        
        if (formData.username !== username) {
            await updateUsername(formData.username);
        }
        
        if (formData.bio !== bio) {
            await updateBio(formData.bio);
        }

        // Redirect to profile and refresh
        navigate('/app/profile', { replace: true });
        window.location.reload();
    };

    // Function to update username in the backend
    const updateUsername = async (newUsername) => {
        try {
            const token = localStorage.getItem("access");
            const response = await fetch('http://localhost:8000/spotify/set-username/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: newUsername }),
            });

            if (!response.ok) throw new Error('Failed to update username');
            const data = await response.json();
            console.log('Username update success:', data.message);
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    // Function to update bio in the backend
    const updateBio = async (newBio) => {
        try {
            const token = localStorage.getItem("access");
            const response = await fetch('http://localhost:8000/spotify/set-bio/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bio: newBio || '' }), // Send empty string if bio is blank
            });

            if (!response.ok) throw new Error('Failed to update bio');
            const data = await response.json();
            console.log('Bio update success:', data.message);
        } catch (error) {
            console.error('Error updating bio:', error);
        }
    };

    return (
        <div className="edit-profile">
            <div className="edit-header">
                <Link to="/app/profile">
                    <FontAwesomeIcon className="back-button" icon={faChevronLeft} size="xs" color="white" />
                </Link>
                <h2>Edit Profile</h2>
            </div>
            <form className="edit-form" onSubmit={handleSave}>
                {/* <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
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

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
