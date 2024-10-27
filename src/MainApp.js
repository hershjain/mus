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


function MainApp() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
  };

  const toggleSearch = () => {
      setSearchVisible(!searchVisible);
  };

  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/spotify/playlists', {
      credentials: 'include' // To include cookies for session handling
    })
      .then(response => response.json())
      .then(data => setUserPlaylists(data.items || []))
      .catch(error => console.error('Error fetching playlists:', error));
  }, []);


  return (
    <div className='App'>
      <Header 
        searchVisible={searchVisible} 
        searchQuery={searchQuery} 
        handleSearchChange={handleSearchChange} 
        toggleSearch={toggleSearch}
      />
      <Navbar />
      <div className='main-content'>
        <Routes>
          <Route path="discovery" element={<Discovery />} />
          <Route path="library" element={<Library userPlaylists={userPlaylists}/>} />
          <Route path='profile' element={<Profile />} />
          <Route path="callback" component={SpotifyCallback} />
          <Route path='create-playlist' element={<CreatePlaylist />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainApp;
