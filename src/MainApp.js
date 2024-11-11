import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import Discovery from './pages/Discovery';
import Library from './pages/Library';
import Profile from './pages/Profile';
import CreatePlaylist from './pages/CreatePlaylist';
import Header from './components/header';
import Navbar from './components/navbar';
import SpotifyCallback from './components/spotify-callback';
import './styles/MainApp.css';
import EditProfile from './pages/EditProfile';
import SearchResultsPage from "./components/search-results-page";


function MainApp() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Perform a search fetch here and update searchResults with the response
    // For example:
    fetch(`/api/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results))
        .catch((error) => console.error('Error fetching search results:', error));
};


  const toggleSearch = () => {
      setSearchVisible(!searchVisible);
  };

  const [user, setUser] = useState({
    username: 'currentUsername', 
    profilePicture: 'currentProfilePicURL',
    bio: 'currentBio',
    email: 'currentEmail',
});

// Handle user data update on save
const handleSaveProfile = (updatedData) => {
    // Here, make an API call to update the profile in the backend
    fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(data => setUser(data)) // Update user state with new data
    .catch(error => console.error('Error updating profile:', error));
};


  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        // Get the JWT token from localStorage (or your preferred storage)
        const token = localStorage.getItem("access");
        console.log('this is the auth token being passed in the header: '+token)

        const response = await fetch('http://localhost:8000/spotify/playlists/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }

        const data = await response.json();git
        setUserPlaylists(data.items || []);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const [catTitle,setCategories] = useState([]);

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
        console.log(data[0].name)
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  return (
    <div className='App'>
      <Header 
        searchVisible={searchVisible} 
        searchQuery={searchQuery} 
        handleSearchChange={handleSearchChange} 
        toggleSearch={toggleSearch}
        searchResults={searchResults}
      />
      <Navbar />
      <div className='main-content'>
        <Routes>
          <Route path="discovery" element={<Discovery categories={catTitle} />} />
          <Route path="library" element={<Library userPlaylists={userPlaylists}/>} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile/edit' element={<EditProfile user={user} onSave={handleSaveProfile} />} />
          <Route path="callback" component={SpotifyCallback} />
          <Route path='create-playlist' element={<CreatePlaylist userPlaylists={userPlaylists}/>} />
          <Route path="/search-results/:query" element={<SearchResultsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainApp;
