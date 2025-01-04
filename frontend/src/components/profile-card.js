import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Vibrant from "node-vibrant";
import "../styles/profile-card.css";

const ProfileCard = ({ name, profilePic}) => {

    
    const [backgroundColor, setBackgroundColor] = useState("#ffffff10");

    useEffect(() => {
        if (profilePic) {
            Vibrant.from(profilePic)
                .getPalette()
                .then((palette) => {
                    const vibrantColor = (palette.Vibrant?.hex + 'b0') || "#ffffff10";
                    setBackgroundColor(vibrantColor);
                })
                .catch((error) => {
                    console.error("Error extracting colors with Vibrant.js:", error);
                });
        }
    }, [profilePic]);

    return (
        <>
            {/* User Profile Card */}
            <Link to={`/app/profile/${name}`}>
                <div 
                    className="profile-card" 
                    style={{ backgroundColor }} 
                >
                    <img 
                        src={profilePic} 
                        alt={name} 
                        className="profile-image" 
                    />
                    <h3 className="profile-name">{name}</h3>
                </div>
            </Link>

        
        </>
    );
};

export default ProfileCard;
