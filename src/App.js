import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Discovery from './pages/Discovery';
import Library from './pages/Library';
import Profile from './pages/Profile';
import CreatePlaylist from './pages/CreatePlaylist';
import Header from './components/header';
import Navbar from './components/navbar';
import SpotifyCallback from './components/spotify-callback';
import './styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
  };

  const toggleSearch = () => {
      setSearchVisible(!searchVisible);
  };

  return (
    <div className='App'>
    <Router>
      <Header 
        searchVisible={searchVisible} 
        searchQuery={searchQuery} 
        handleSearchChange={handleSearchChange} 
        toggleSearch={toggleSearch}
      />
      <Navbar />
      <div className='main-content'>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/library" element={<Library />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/callback" component={SpotifyCallback} />
          <Route path='/create-playlist' element={<CreatePlaylist />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
