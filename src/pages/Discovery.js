import PlaylistRow from '../components/playlist-row.js';
import '../styles/Discovery.css';
import placeholder from '../assets/images/playlist-test-cover.jpg';
import React, { useEffect, useState } from 'react';


const Discovery = () => {
    const samplePlaylists = [
        { title: 'Pop Hits', imageUrl: placeholder , curator: 'mheydude123' },
        { title: 'Hip Hop Vibes', imageUrl: placeholder , curator: 'hxrsh' },
        { title: 'Rock Classics', imageUrl: placeholder, curator: 'ptpampadam' },
        { title: 'Juicy Joints', imageUrl: placeholder, curator: 'mheydude123' },
        { title: 'Sundae Blues', imageUrl: placeholder, curator: 'hxrsh' },
        { title: 'Big Booms', imageUrl: placeholder, curator: 'ptpampadam' },      
    ];
    const [categories,setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            // Get the JWT token from localStorage (or your preferred storage)
            const token = localStorage.getItem("access");
    
            const response = await fetch('http://localhost:8000/spotify/categories/', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch categories');
            }
    
            const data = await response.json();
            setCategories(data.items || []);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        fetchCategories();
      }, []);


    return (
        <body>
            <div className="discovery-page">
                <PlaylistRow categoryTitle="Top Picks for You" playlists={samplePlaylists} />
                <PlaylistRow categoryTitle="Trending Playlists" playlists={samplePlaylists} />
                <PlaylistRow categoryTitle="Chill Vibes" playlists={samplePlaylists} />
                {categories.map((category) => (
                    
                    <p>{category.name}</p>

                ))}
            </div>
        </body>
    );
};

export default Discovery;