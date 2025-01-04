import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SpotifyCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('calling callback')

    useEffect(() => {
        // Extract the authorization code from the URL
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");

        if (code) {
            // Retrieve the JWT access token from localStorage (or adjust as needed if using context)
            const token = localStorage.getItem("access");
            console.log("this is token: "+token)

            if (token) {
                // Make the axios call to your backend with JWT token in the header
                axios.get('http://localhost:8000/spotify/auth/callback/', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    params: { code }  // Pass the Spotify authorization code in query parameters
                })
                .then(response => {
                    console.log("Tokens saved successfully:", response.data);
                    // Navigate to the profile page or another route after success
                    //run the code for importing playlists
                    navigate("/app/profile");
                })
                .catch(error => {
                    console.error("Failed to authenticate with Spotify:", error.response?.data || error.message);
                    // Redirect to login or show error if authentication fails
                    navigate("/app/profile");  // Adjust as necessary
                });
            } else {
                console.error("No access token found. Redirecting to login.");
                navigate("/app/profile");  // Redirect to login if token is missing
            }
        } else {
            console.error("No authorization code found in URL");
            navigate("/app/profile");  // Redirect to login if Spotify code is missing
        }
    }, [location, navigate]);

    return (
        <div>
            <h2>Authenticating with Spotify...</h2>
        </div>
    );
};

export default SpotifyCallback;
