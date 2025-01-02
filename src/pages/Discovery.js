import CategoryRow from '../components/category-row.js';
import PlaylistRow from '../components/playlist-row.js';
import '../styles/Discovery.css';
import React, { useEffect, useState } from 'react';
import ConnectSpotifyPrompt from '../components/connectSpotifyPrompt.js';


const Discovery = ({categories, userPlaylists, SPUserID}) => {
    // const [categories,setCategories] = useState([]);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //       try {
    //         // Get the JWT token from localStorage (or your preferred storage)
    //         const token = localStorage.getItem("access");
    
    //         const response = await fetch('http://localhost:8000/spotify/categories/', {
    //           method: 'GET',
    //           headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json'
    //           }
    //         });
    
    //         if (!response.ok) {
    //           throw new Error('Failed to fetch categories');
    //         }
    
    //         const data = await response.json();
    //         console.log(data[0].name)
    //         setCategories(data || []);
    //       } catch (error) {
    //         console.error('Error fetching categories:', error);
    //       }
    //     };
    
    //     fetchCategories();
    //   }, []);

    const [catPL,setCatPL] = useState([]);


    useEffect(() => {
        const fetchCatPL = async () => {
            try {
                const token = localStorage.getItem("access");
                const response = await fetch('http://localhost:8000/spotify/catPL/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch category playlists');
                }
    
                const data = await response.json();
                console.log(data);
    
                // Process each category to extract `message` and `playlists.items`
                const processedData = Object.values(data).map(category => ({
                    message: category.message,
                    playlists: category.playlists?.items || []
                }));
    
                setCatPL(processedData);
            } catch (error) {
                console.error('Error fetching category playlists:', error);
            }
        };
    
        fetchCatPL();
      }, []); 

      const [hhpl,setHHpl] = useState([]);


      useEffect(() => {
          const fetchHHPL = async () => {
              try {
                  const token = localStorage.getItem("access");
                  const response = await fetch('http://localhost:8000/spotify/pullhh/', {
                      method: 'GET',
                      headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                      }
                  });
      
                  if (!response.ok) {
                      throw new Error('Failed to fetch hip hop playlists');
                  }
      
                  const data = await response.json();
                  console.log(data);                  
      
                  setHHpl(data);
              } catch (error) {
                  console.error('Error fetching hip hop playlists:', error);
              }
          };
      
          fetchHHPL();
        }, []); 

    return (
        <body>
            {/* <ConnectSpotifyPrompt /> */}
            <div className="discovery-page">
                
                {/* <PlaylistRow categoryTitle="Top Picks for You" playlists={catPL} /> */}
                <PlaylistRow categoryTitle="Friend Activity" playlists={userPlaylists}  SPUserID={SPUserID}/>
                <PlaylistRow categoryTitle="Trending" playlists={userPlaylists} SPUserID={SPUserID} />
                <PlaylistRow categoryTitle="Popular in Williamsburg" playlists={userPlaylists} SPUserID={SPUserID}/>
                <PlaylistRow categoryTitle="Bedroom Pop" playlists={userPlaylists} SPUserID={SPUserID}/>
                <PlaylistRow categoryTitle="Hip-Hop" playlists={hhpl} SPUserID={SPUserID}/>
                <PlaylistRow categoryTitle="Psychedelic Rock" playlists={userPlaylists} SPUserID={SPUserID}/>
                {/* {catPL.map((category, index) => (
                    // <p>{cat.message}</p>
                    <CategoryRow category={category} index={index}/>
                ))} */}
            </div>
        </body>
    );
};

export default Discovery;