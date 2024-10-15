import React from "react";
import PlaylistRow from '../components/playlist-row.js';
import '../styles/Discovery.css';
import placeholder from '../assets/images/playlist-test-cover.jpg';


const Discovery = () => {
    const samplePlaylists = [
        { title: 'Pop Hits', imageUrl: placeholder , curator: 'mheydude123' },
        { title: 'Hip Hop Vibes', imageUrl: placeholder , curator: 'hxrsh' },
        { title: 'Rock Classics', imageUrl: placeholder, curator: 'ptpampadam' },
        { title: 'Juicy Joints', imageUrl: placeholder, curator: 'mheydude123' },
        { title: 'Sundae Blues', imageUrl: placeholder, curator: 'hxrsh' },
        { title: 'Big Booms', imageUrl: placeholder, curator: 'ptpampadam' },      
    ];
    return (
        <body>
            <div className="discovery-page">
                <PlaylistRow categoryTitle="Top Picks for You" playlists={samplePlaylists} />
                <PlaylistRow categoryTitle="Trending Playlists" playlists={samplePlaylists} />
                <PlaylistRow categoryTitle="Chill Vibes" playlists={samplePlaylists} />
            </div>
        </body>
    );
};

export default Discovery;