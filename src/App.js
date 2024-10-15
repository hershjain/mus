import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Discovery from './pages/Discovery';
import Library from './pages/Library';
import Profile from './pages/Profile';
import CreatePlaylist from './pages/CreatePlaylist';
import Header from './components/header';
import Navbar from './components/navbar';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <div className='main-content'>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/library" element={<Library />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-playlist' element={<CreatePlaylist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
