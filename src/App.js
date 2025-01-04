import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainApp from "./MainApp";
import ProtectedRoute from "./components/ProtectedRoute";
import SpotifyCallback from './components/spotify-callback';

function App() {
    //const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));

    // useEffect(() => {
    //     // Listen for changes to localStorage and update authentication state
    //     const handleStorageChange = () => {
    //         setIsAuthenticated(!!localStorage.getItem('access'));
    //     };

    //     window.addEventListener('storage', handleStorageChange);

    //     // Cleanup the event listener when the component unmounts
    //     return () => window.removeEventListener('storage', handleStorageChange);
    // }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/spotify/callback" element={<SpotifyCallback />} />

                {/* Protect routes by nesting them under ProtectedRoute */}
                <Route element={<ProtectedRoute/>}>
                    <Route path="/app/*" element={<MainApp />} />
                    {/* Add more protected routes as needed */}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
