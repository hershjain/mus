import CategoryRow from '../components/category-row.js';
import PlaylistRow from '../components/playlist-row.js';
import '../styles/Discovery.css';
import placeholder from '../assets/images/playlist-test-cover.jpg';
import React, { useEffect, useState } from 'react';
import sugi from '../assets/images/sugi.jpg';
import web3 from '../assets/images/web3.jpg';
import chocChip from '../assets/images/chochip.jpg';
import runclub from '../assets/images/runclub.jpg';
import boardwalk from '../assets/images/boardwalk.jpg';
import festival from '../assets/images/festival.jpg';
import dnb from '../assets/images/dnb.jpg';
import stopby from '../assets/images/stopby.jpg';
import rockabye from '../assets/images/rockabye.jpg';
import jacuzzi from '../assets/images/jacuzzi.jpg';
import smear from '../assets/images/smear.jpg';
import olipop from '../assets/images/olipop.jpg';
import steps from '../assets/images/steps.jpg';
import allgone from '../assets/images/allgone.jpg';
import bluemoon from '../assets/images/bluemoon.jpg';
import tamarind from '../assets/images/tamarind.jpg';
import privatesesh from '../assets/images/privatesesh.jpg';
import up from '../assets/images/up.jpg';

import nitelite from '../assets/images/nitelite.jpg';
import yourarms from '../assets/images/yourarms.jpg';
import sheep from '../assets/images/sheep.jpg';
import flux from '../assets/images/flux.jpg';
import seecolors from '../assets/images/seecolors.jpg';
import hey from '../assets/images/hey.jpg';

import cloudfall from '../assets/images/cloudfall.jpg';
import rip from '../assets/images/rip.jpg';
import refractive from '../assets/images/refractive.jpg';
import bigsteppa from '../assets/images/bigsteppa.jpg';
import heat from '../assets/images/heat.jpg';
import hotel from '../assets/images/hotel.jpg';

import woofer from '../assets/images/woofer.jpg';
import triptogram from '../assets/images/triptogram.jpg';
import moonnback from '../assets/images/moonnback.jpg';
import juicebox from '../assets/images/juicebox.jpg';
import vicecity from '../assets/images/vicecity.jpg';
import rose from '../assets/images/rose.jpg';


const Discovery = ({categories, userPlaylists}) => {
    const samplePlaylistsFriends = [
        { title: 'Kintsugi', imageUrl: sugi , curator: 'harsh', url:'' },
        { title: 'Web 3.0', imageUrl: web3 , curator: 'Kaushik', url:'' },
        { title: "don't ___ chocolate chip", imageUrl: chocChip, curator: 'Armine N.', url:'' },
        { title: 'Run Club', imageUrl: runclub, curator: 'khamneim', url:'' },
        { title: 'Boardwalk', imageUrl: boardwalk, curator: 'Karthik Ravikumar', url:'' },
        { title: 'Festival bops', imageUrl: festival, curator: 'udayt', url:'' },      
    ];

    const samplePlaylistsTrending = [
        { title: 'dream n bass', imageUrl: dnb , curator: 'madswami', url:'' },
        { title: 'Stop by Sometime', imageUrl: stopby , curator: 'third culture', url:'' },
        { title: 'Rockabye', imageUrl: rockabye, curator: 'ptpampadam', url:'' },
        { title: 'Jacuzzi Joints', imageUrl: jacuzzi, curator: 'mheydude', url:'' },
        { title: 'Smear Campaign', imageUrl: smear, curator: 'BoundToo', url:'' },
        { title: 'Olipop', imageUrl: olipop, curator: 'ChunkytownRadio', url:'' },      
    ];

    const samplePlaylistsLocation = [
        { title: 'Step by Step', imageUrl: steps , curator: 'mheydude', url:'' },
        { title: 'all good, all gone', imageUrl: allgone , curator: 'third culture', url:'' },
        { title: 'Blue Moon', imageUrl: bluemoon, curator: 'Club42', url:'' },
        { title: 'Tamarind', imageUrl: tamarind, curator: 'BasilGrill', url:'' },
        { title: 'private session', imageUrl: privatesesh, curator: 'shhdontspeak', url:'' },
        { title: 'Union Pool Set', imageUrl: up, curator: 'UPBK', url:'' },      
    ];

    const samplePlaylistsBPop = [
        { title: 'Nite Lite', imageUrl: nitelite , curator: 'Jawny J', url:'' },
        { title: 'in your arms', imageUrl: yourarms , curator: 'cindy', url:'' },
        { title: 'sheep dipping time', imageUrl: sheep, curator: 'Austin F', url:'' },
        { title: 'hey...', imageUrl: hey, curator: 'JANANI', url:'' },
        { title: 'To the Moon and Back', imageUrl: moonnback, curator: 'The Jin', url:'' },
        { title: 'juice box', imageUrl: juicebox, curator: 'ChunkytownRadio', url:'' },      
    ];

    const samplePlaylistsHipHop = [
        { title: 'Big steppa', imageUrl: bigsteppa , curator: 'Will Han', url:'' },
        { title: 'RIP we screw tonight', imageUrl: rip , curator: 'Mumu', url:'' },
        { title: 'Hotel Lobby', imageUrl: hotel, curator: 'ptppdm', url:'' },
        { title: 'Vice City', imageUrl: vicecity, curator: 'OK Sean', url:'' },
        { title: 'Woofer Blur', imageUrl: woofer, curator: 'Martin Man', url:'' },
        { title: 'drop the heat', imageUrl: heat, curator: 'Prince St.', url:'' },      
    ];

    const samplePlaylistsPsychRock = [
        { title: 'I see colors...', imageUrl: seecolors , curator: 'JL&GG', url:'' },
        { title: 'flux', imageUrl: flux , curator: 'The Jin', url:'' },
        { title: 'Refractive', imageUrl: refractive, curator: 'sanj', url:'' },
        { title: 'Rose Quartz', imageUrl: rose, curator: 'Jon B', url:'' },
        { title: 'Cloudfall', imageUrl: cloudfall, curator: 'khale', url:'' },
        { title: 'triptogram', imageUrl: triptogram, curator: 'Luke here', url:'' },      
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
                <PlaylistRow categoryTitle="Friend Activity" playlists={userPlaylists} />
                <PlaylistRow categoryTitle="Trending" playlists={userPlaylists} />
                <PlaylistRow categoryTitle="Popular in Williamsburg" playlists={userPlaylists} />
                <PlaylistRow categoryTitle="Bedroom Pop" playlists={userPlaylists} />
                <PlaylistRow categoryTitle="Hip Hop" playlists={userPlaylists} />
                <PlaylistRow categoryTitle="Psychedelic Rock" playlists={userPlaylists} />
                {/* {catPL.map((category, index) => (
                    // <p>{cat.message}</p>
                    <CategoryRow category={category} index={index}/>
                ))} */}
            </div>
        </body>
    );
};

export default Discovery;