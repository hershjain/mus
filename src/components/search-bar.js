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
const normalizePlaylist = (playlist) => {
    return {
        id: playlist.spotify_playlist_id || playlist.id,
        title: playlist.title || playlist.name,
        curator: playlist.created_by || playlist.owner?.display_name,
        description: playlist.description || '',
        imageUrl: playlist.cover_img || playlist.images?.[0]?.url || '',
        url: playlist.sp_link || playlist.external_urls?.spotify,
        curatorID: playlist.spu_id || playlist.owner?.id,
        genres: playlist.genres || [],
    };
};

const SearchBar = ({ searchVisible, userPlaylists, SPUserID }) => {
    const [allpl, setAllpl] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); // Only one category can be selected
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

                if (!response.ok) {
                    throw new Error('Failed to fetch all playlists');
                }

                const data = await response.json();
                console.log(data);
                setAllpl(data);
            } catch (error) {
                console.error('Error fetching all playlists:', error);
            }
        };

        fetchAllPL();
    }, []);

    const toggleCategory = (category) => {
        setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
    };

    // Compute filtered playlists dynamically
    const sourcePlaylists = selectedCategory ? userPlaylists : allpl;

    const filteredPlaylists = sourcePlaylists.filter((playlist) => {
        const matchesCategory =
            !selectedCategory || // No category selected, use allpl
            (selectedCategory === 'Yours' && playlist.owner?.id === SPUserID) ||
            (selectedCategory === 'Saved' && playlist.owner?.id !== SPUserID);

        const matchesSearchQuery =
            !searchQuery || // No search query
            playlist.name?.toLowerCase().includes(searchQuery) || // Match playlist name
            playlist.owner?.display_name?.toLowerCase().includes(searchQuery); // Match curator name

        return matchesCategory && matchesSearchQuery;
    });

    // Randomize the order of the filtered playlists
    const randomizedPlaylists = shuffleArray(filteredPlaylists);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

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

            {searchQuery && randomizedPlaylists.length > 0 ? (
                <div className="search-results-grid">
                    <ProfileCard name="Mhey" profilePic={placeholder} />
                    {randomizedPlaylists.map((playlist) => {
                        const normalizedPlaylist = normalizePlaylist(playlist);
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
                    })}
                </div>
            ) : (
                searchQuery && <p className='no-results-message'>No results found.</p>
            )}
        </div>
    );
};

export default SearchBar;
