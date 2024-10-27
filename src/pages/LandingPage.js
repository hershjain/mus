import React from "react";
import "../styles/LandingPage.css";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header>
                <h1>PlaylistShare</h1>
                <nav>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="/login">Get Started</a> {/* Link to main app */}
                </nav>
            </header>
            
            <section className="hero">
                <div className="hero-content">
                    <h2>Discover, Share, and Create Playlists</h2>
                    <p>Find playlists curated by others or create your own and share with the world.</p>
                    <button onClick={() => window.location.href = "/login"}>Get Started</button>
                </div>
            </section>

            <section id="features">
                <h3>Features</h3>
                <ul>
                    <li>Explore thousands of user-curated playlists</li>
                    <li>Easy playlist creation and sharing</li>
                    <li>Personalized recommendations</li>
                </ul>
            </section>

            <section id="about">
                <h3>About PlaylistShare</h3>
                <p>PlaylistShare is a platform built for music lovers. Share your musical tastes, explore new genres, and connect with others who share your passion.</p>
            </section>

            <footer>
                <p>&copy; 2024 PlaylistShare. All rights reserved.</p>
                <a href="#signup">Sign Up</a> | <a href="#contact">Contact</a>
            </footer>
        </div>
    );
};

export default LandingPage;


