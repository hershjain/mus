import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import Discovery from './pages/Discovery';
import Library from './pages/Library';
import Profile from './pages/Profile';
import ProfileTemplate from "./components/profile-template";
import CreatePlaylist from './pages/CreatePlaylist';
import Header from './components/header';
import Navbar from './components/navbar';
import SpotifyCallback from './components/spotify-callback';
import './styles/MainApp.css';
import EditProfile from './pages/EditProfile';
import SearchResultsPage from "./components/search-results-page";
import ConnectSpotifyPrompt from './components/connectSpotifyPrompt';
import axios from 'axios';


function MainApp() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const tokenTest = localStorage.getItem("access") === null;

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

  const [profilePic, setProfilePic] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [followers, setFollowers] = useState([]);
  const [spuserid, setSPuserid] = useState('');

useEffect(() => {
  const fetchProfileData = async () => {
      try {

          const token = localStorage.getItem('access');

          // Replace '/api/profile/' with your actual endpoint for fetching user profile
          //const response = await axios.get('http://localhost:8000/spotify/profile/');
          const response = await axios.get('http://localhost:8000/spotify/profile/', {
            headers: {
                Authorization: `Bearer ${token}`, // Add the token to the request headers
            },
        });
          
          // Assuming response.data has the profile data in the expected structure
          // setProfilePic(response.data.profilePic);
          setUsername(response.data.username); // Assuming user object is nested
          setBio(response.data.bio);
          setFollowers(response.data.followers); // Adjust if the structure is different

      } catch (error) {
          console.error("Error fetching profile data:", error);
      }
  };

  fetchProfileData();
}, []); // Empty dependency array means this runs once when the component mounts

useEffect(() => {
  const fetchSPF = async () => {
    try {
    // Get the JWT token from localStorage (or your preferred storage)
    const token = localStorage.getItem("access");
    console.log('this is the auth token being passed in the header: '+token)

    const response = await fetch('http://localhost:8000/spotify/getspf/', {
      method: 'GET',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    console.log(data);
    setProfilePic(data || []);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

fetchSPF();
}, []);

useEffect(() => {
  const fetchSPUser = async () => {
    try {
    // Get the JWT token from localStorage (or your preferred storage)
    const token = localStorage.getItem("access");
    console.log('this is the auth token being passed in the header: '+token)

    const response = await fetch('http://localhost:8000/spotify/getspuserid/', {
      method: 'GET',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    console.log(data);
    setSPuserid(data || []);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

fetchSPUser();
}, []);


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
        
        const data = await response.json();
        setUserPlaylists(Object.values(data) || []);
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
  
  useEffect(() => {
    const setImp = async () => {
        try {
  
            const token = localStorage.getItem('access');
  
            // Replace '/api/profile/' with your actual endpoint for fetching user profile
            //const response = await axios.get('http://localhost:8000/spotify/profile/');
            const response = await axios.get('http://localhost:8000/spotify/setimp/', {
              headers: {
                  Authorization: `Bearer ${token}`, // Add the token to the request headers
              },
          });
            
            // Assuming response.data has the profile data in the expected structure
            // setProfilePic(response.data.profilePic);
        } catch (error) {
            console.error("Error importing users playlists to db: ", error);
        }
    };
  
    setImp();
  }, []); // Empty dependency array means this runs once when the component mounts
  
  const [allpl,setallpl] = useState([]);

  useEffect(() => {
    const fetchAllPL = async () => {
        try {
          const token = localStorage.getItem("access");
          const response = await fetch('http://localhost:8000/spotify/pullall/', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetching all playlists');
          }

          const data = await response.json();
          //console.log(data);

          setallpl(data);
              } catch (error) {
                  console.error('Error fetching all playlists:', error);
              }
          };
      
          fetchAllPL();
        }, []); 

  return (
    <div className='App'>
      <Header 
        searchVisible={searchVisible} 
        searchQuery={searchQuery} 
        handleSearchChange={handleSearchChange} 
        toggleSearch={toggleSearch}
        searchResults={searchResults}
        userPlaylists={userPlaylists}
        SPUserID={spuserid}
      />
      <Navbar />
      {userPlaylists === "" ? (
        <ConnectSpotifyPrompt />
      ):(
        <div>
        </div>
      )}
      <div className='main-content'>
        <Routes>
          <Route path="discovery" element={<Discovery categories={catTitle} userPlaylists={userPlaylists} SPUserID={spuserid}/>} />
          <Route path="library" element={<Library userPlaylists={userPlaylists} SPUserID={spuserid}/>} />
          <Route path='profile' element={<Profile username={username} bio={bio} profilePic={profilePic} userPlaylists={userPlaylists} SPUserID={spuserid} />} />
          <Route path='profile/edit' element={<EditProfile username={username} bio={bio}/>} />
          <Route path='profile/:curator' element={<ProfileTemplate />} />
          <Route path="callback" component={SpotifyCallback} />
          <Route path='create-playlist' element={<CreatePlaylist userPlaylists={userPlaylists} SPUserID={spuserid}/>} />
          <Route path="search-results/:query" element={<SearchResultsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainApp;
