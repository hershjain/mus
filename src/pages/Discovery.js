import CategoryRow from '../components/category-row.js';
import PlaylistRow from '../components/playlist-row.js';
import '../styles/Discovery.css';
import placeholder from '../assets/images/playlist-test-cover.jpg';
import React, { useEffect, useState } from 'react';


const Discovery = ({categories}) => {
    const samplePlaylistsFriends = [
        { title: 'sugi', imageUrl: placeholder , curator: 'harsh', url:'' },
        { title: 'Web 3.0', imageUrl: placeholder , curator: 'Kaushik', url:'' },
        { title: "don't ___ chocolate chip", imageUrl: placeholder, curator: 'Armine N.', url:'' },
        { title: 'Run Club', imageUrl: placeholder, curator: 'khamneim', url:'' },
        { title: 'Boardwalk', imageUrl: placeholder, curator: 'Karthik Ravikumar', url:'' },
        { title: 'Festival bops', imageUrl: placeholder, curator: 'udayt', url:'' },      
    ];

    const samplePlaylistsTrending = [
        { title: 'dream n bass', imageUrl: placeholder , curator: 'madswami', url:'' },
        { title: 'Stop by Sometime', imageUrl: placeholder , curator: 'third culture', url:'' },
        { title: 'Rockabye', imageUrl: placeholder, curator: 'ptpampadam', url:'' },
        { title: 'Jacuzzi Joints', imageUrl: placeholder, curator: 'mheydude', url:'' },
        { title: 'Smear Campaign', imageUrl: placeholder, curator: 'BoundToo', url:'' },
        { title: 'Olipop', imageUrl: placeholder, curator: 'ChunkytownRadio', url:'' },      
    ];

    const samplePlaylistsLocation = [
        { title: 'Step by Step', imageUrl: placeholder , curator: 'mheydude', url:'' },
        { title: 'all good, all gone', imageUrl: placeholder , curator: 'third culture', url:'' },
        { title: 'Blue Moon', imageUrl: placeholder, curator: 'Club42', url:'' },
        { title: 'Tamarind', imageUrl: placeholder, curator: 'BasilGrill', url:'' },
        { title: 'private session', imageUrl: placeholder, curator: 'shhdontspeak', url:'' },
        { title: 'Union Pool Set', imageUrl: placeholder, curator: 'UPBK', url:'' },      
    ];

    const samplePlaylistsBPop = [
        { title: 'Nite Lite', imageUrl: placeholder , curator: 'Jawny J', url:'' },
        { title: 'in your arms', imageUrl: placeholder , curator: 'cindy', url:'' },
        { title: 'sheep dipping time', imageUrl: placeholder, curator: 'Austin F', url:'' },
        { title: 'hey...', imageUrl: placeholder, curator: 'JANANI', url:'' },
        { title: 'To the Moon and Back', imageUrl: placeholder, curator: 'The Jin', url:'' },
        { title: 'juice box', imageUrl: placeholder, curator: 'ChunkytownRadio', url:'' },      
    ];

    const samplePlaylistsHipHop = [
        { title: 'Big steppa', imageUrl: placeholder , curator: 'Will Han', url:'' },
        { title: 'RIP we screw tonight', imageUrl: placeholder , curator: 'Mumu', url:'' },
        { title: 'Hotel Lobby', imageUrl: placeholder, curator: 'ptppdm', url:'' },
        { title: 'Vice City', imageUrl: placeholder, curator: 'OK Sean', url:'' },
        { title: 'Woofer Blur', imageUrl: placeholder, curator: 'Martin Man', url:'' },
        { title: 'drop the heat', imageUrl: placeholder, curator: 'Prince St.', url:'' },      
    ];

    const samplePlaylistsPsychRock = [
        { title: 'I see colors...', imageUrl: placeholder , curator: 'JL&GG', url:'' },
        { title: 'flux', imageUrl: placeholder , curator: 'The Jin', url:'' },
        { title: 'Refractive', imageUrl: placeholder, curator: 'sanj', url:'' },
        { title: 'Rose Quartz', imageUrl: placeholder, curator: 'Jon B', url:'' },
        { title: 'Cloudfall', imageUrl: placeholder, curator: 'khale', url:'' },
        { title: 'triptogram', imageUrl: placeholder, curator: 'Luke here', url:'' },      
    ];
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

    return (
        <body>
            <div className="discovery-page">
                {/* <PlaylistRow categoryTitle="Top Picks for You" playlists={catPL} /> */}
                <PlaylistRow categoryTitle="Friend Activity" playlists={samplePlaylistsFriends} />
                <PlaylistRow categoryTitle="Trending" playlists={samplePlaylistsTrending} />
                <PlaylistRow categoryTitle="Popular in Williamsburg" playlists={samplePlaylistsLocation} />
                <PlaylistRow categoryTitle="Bedroom Pop" playlists={samplePlaylistsBPop} />
                <PlaylistRow categoryTitle="Hip Hop" playlists={samplePlaylistsHipHop} />
                <PlaylistRow categoryTitle="Psychedelic Rock" playlists={samplePlaylistsPsychRock} />
                {/* {catPL.map((category, index) => (
                    // <p>{cat.message}</p>
                    <CategoryRow category={category} index={index}/>
                ))} */}
            </div>
        </body>
    );
};

export default Discovery;