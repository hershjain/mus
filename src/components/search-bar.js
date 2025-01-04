import React, { useState, useEffect } from 'react';
import PlaylistCard from './playlist-card';
import ProfileCard from './profile-card';
import placeholder from '../assets/images/pfimage.png';
import '../styles/search-bar.css';

// Fisher-Yates Shuffle Algorithm for randomization
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Normalize playlist data to a consistent format
const normalizePlaylist = (playlist) => ({
    id: playlist.spotify_playlist_id || playlist.id,
    title: playlist.title || playlist.name,
    curator: playlist.created_by || playlist.owner?.display_name,
    description: playlist.description || '',
    imageUrl: playlist.cover_img || playlist.images?.[0]?.url || '',
    url: playlist.sp_link || playlist.external_urls?.spotify,
    curatorID: playlist.spu_id || playlist.owner?.id,
    genres: playlist.genres || [],
});

const SearchBar = ({ searchVisible, userPlaylists, SPUserID }) => {
    const [allpl, setAllpl] = useState([]);
    const [allpf, setAllpf] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const categories = ['Yours', 'Saved', 'Profiles'];

    useEffect(() => {
        const fetchAllPL = async () => {
            try {
                const token = localStorage.getItem("access");
                const response = await fetch('http://localhost:8000/spotify/pullall/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch all playlists');

                const data = await response.json();
                setAllpl(data);
            } catch (error) {
                console.error('Error fetching all playlists:', error);
            }
        };

        fetchAllPL();
    }, []);

    useEffect(() => {
        const fetchAllPfs = async () => {
            try {
                const token = localStorage.getItem("access");
                const response = await fetch('http://localhost:8000/spotify/pullpfs/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch all profiles');

                const data = await response.json();
                setAllpf(data);
            } catch (error) {
                console.error('Error fetching all profiles:', error);
            }
        };

        fetchAllPfs();
    }, []);

    const toggleCategory = (category) => {
        setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredData = () => {
        if (selectedCategory === 'Yours') {
            // Filter playlists owned by the user
            return userPlaylists.filter((playlist) => playlist.owner?.id === SPUserID);
        } else if (selectedCategory === 'Saved') {
            // Filter playlists not owned by the user
            return userPlaylists.filter((playlist) => playlist.owner?.id !== SPUserID);
        } else if (selectedCategory === 'Profiles') {
            // Only search profiles
            return allpf
                .filter((profile) => profile.username?.toLowerCase().includes(searchQuery))
                .map((profile) => ({ ...profile, type: 'profile' })); // Add type field
        } else {
            // No category selected, search across all playlists and profiles
            const combinedPlaylists = [
                ...allpl,
                ...userPlaylists.filter(
                    (playlist) => !allpl.some((all) => all.id === playlist.id)
                ), // Avoid duplicates
            ];

            const combinedData = [
                ...combinedPlaylists.map((playlist) => ({ ...playlist, type: 'playlist' })),
                ...allpf.map((profile) => ({ ...profile, type: 'profile' })),
            ];

            return combinedData.filter((item) =>
                (item.type === 'playlist' && 
                    (item.title?.toLowerCase().includes(searchQuery) ||
                    item.curator?.toLowerCase().includes(searchQuery))) ||
                (item.type === 'profile' &&
                    item.username?.toLowerCase().includes(searchQuery))
            );
        }
    };

    const randomizedData = shuffleArray(filteredData());

    return (
        <div className={`search-bar-div ${searchVisible ? 'search-bar-visible' : 'search-bar-hidden'}`}>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for playlists or users..."
                />
            </div>
            <div className="search-filters">
                <div className="filter-buttons">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={selectedCategory === category ? 'active' : ''}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {searchQuery && randomizedData.length > 0 ? (
                <div className="search-results-grid">
                    {randomizedData.map((item) => {
                        if (item.type === 'profile') {
                            return (
                                <ProfileCard
                                    key={item.id}
                                    name={item.username}
                                    profilePic={item.profile_picture || placeholder}
                                />
                            );
                        } else {
                            const normalizedPlaylist = normalizePlaylist(item);
                            return (
                                <PlaylistCard
                                    key={normalizedPlaylist.id}
                                    id={normalizedPlaylist.id}
                                    title={normalizedPlaylist.title}
                                    curator={normalizedPlaylist.curator}
                                    description={normalizedPlaylist.description}
                                    imageUrl={normalizedPlaylist.imageUrl}
                                    url={normalizedPlaylist.url}
                                    curatorID={normalizedPlaylist.curatorID}
                                    SPUserID={SPUserID}
                                    userPlaylists={userPlaylists}
                                    genres={normalizedPlaylist.genres}
                                />
                            );
                        }
                    })}
                </div>
            ) : (
                searchQuery && <p className='no-results-message'>No results found.</p>
            )}
        </div>
    );
};

export default SearchBar;
