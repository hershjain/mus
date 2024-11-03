// src/components/SearchResultsPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // assuming you're using React Router
import PlaylistCardHorizontal from "./playlist-card-horizontal"; // example component to display playlists
import "../styles/search-results-page.css";

const SearchResultsPage = () => {
    const { query } = useParams(); // retrieve search query from the URL
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/search?q=${query}`);
                const data = await response.json();
                setResults(data.results);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
            setLoading(false);
        };
        
        fetchResults();
    }, [query]); // fetch new results if the query changes

    return (
        <div className="search-results-page">
            <h2>Search Results for "{query}"</h2>
            {loading ? (
                <p>Loading...</p>
            ) : results.length > 0 ? (
                <div className="results-grid">
                    {results.map((result) => (
                        <PlaylistCardHorizontal key={result.id} {...result} />
                    ))}
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResultsPage;
