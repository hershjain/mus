import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!username.trim()) {
            setError("Username is required");
            return false;
        }
        if (!email || !emailRegex.test(email)) {
            setError("A valid email is required");
            return false;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) return;

        try {
            const response = await axios.post('https://mus-7du3.onrender.com/api/auth/users/', {
                username: username,
                email: email,
                password: password,
                re_password: confirmPassword,
            });

            setSuccess("Account created successfully. Please log in.");
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            if (err.response && err.response.data) {
                // Display specific error messages from the backend
                const serverErrors = err.response.data;
                if (serverErrors.username) {
                    setError("Username is already taken.");
                } else if (serverErrors.email) {
                    setError("Email is already registered.");
                } else if (serverErrors.password) {
                    setError("Password does not meet requirements.\n"+JSON.stringify(err.response.data));
                } else if (serverErrors.re_password) {
                    setError("Password confirmation does not match.");
                } else {
                    setError("Error creating account. Please try again.");
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Create Account</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Register;
