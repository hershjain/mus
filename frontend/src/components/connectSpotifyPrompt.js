import React from 'react';
import SpotifyAuthButton from './spotify-auth-button';
import '../styles/connectSpotifyPrompt.css';

const ConnectSpotifyPrompt = () => {
    return (
        <div className='prompt-screen'>
            <div className='prompt-window'>
                <h3 className='prompt-header'>Connect your Spotify account to continue.</h3>
                <p className='prompt-text'>You can find this button under settings in your Profile page</p>
                <div className='prompt-buttons'>
                    <SpotifyAuthButton />
                </div>
            </div>
        </div>
    );
};

export default ConnectSpotifyPrompt;