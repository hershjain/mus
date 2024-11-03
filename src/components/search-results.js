// Inside your search component (e.g., SearchDropdown.js)
import React from 'react';
import { Link } from "react-router-dom";

const SearchResults = ({ query, results }) => {
    return (
        <div className="search-dropdown">
            {results.slice(0, 5).map((result) => (
                <div key={result.id}>{result.name}</div>
            ))}
            <Link to={`/search-results/${query}`} className="see-all-results">
                See all results
            </Link>
        </div>
    );
};

export default SearchResults;