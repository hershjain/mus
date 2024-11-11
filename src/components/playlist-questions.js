import React, { useState } from 'react';
import ColorPicker from './color-picker';
import '../styles/playlist-questions.css'; // CSS for the overlay

const PlaylistQuestions = ({ onClose, playlistId, onSubmit }) => {
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#ff0000');
  const [secondaryColor, setSecondaryColor] = useState('#0000ff');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);


  const genres = ['Rock', 'Pop', 'Jazz', 'Hip-Hop', 'Classical'];
  const moods = ['Happy', 'Sad', 'Energetic', 'Calm', 'Romantic'];

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    setSelectedGenres((prev) =>
      checked ? [...prev, value] : prev.filter((genre) => genre !== value)
    );
  };

  const handleMoodChange = (event) => {
    const { value, checked } = event.target;
    setSelectedMoods((prev) =>
      checked ? [...prev, value] : prev.filter((mood) => mood !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // You can handle the submission of the form here
    const playlistData = {
      id: playlistId, // Include the playlist ID
      description: playlistDescription,
      primaryColor,
      secondaryColor,
      genres: selectedGenres,
      moods: selectedMoods,
    };

    console.log('Playlist Data:', playlistData);
    
    // Call the onSubmit prop function to handle the submission
    if (onSubmit) {
      onSubmit(playlistData);
    }

    onClose(); // Close the overlay after submission
  };

  return (
    <div className="playlist-overlay">
      <div className="overlay-content">
        <button className="close-overlay" onClick={onClose}>
          X
        </button>

        <h2>Import Playlist</h2>

        <form onSubmit={handleSubmit}> {/* Use form element to handle submission */}
          {/* Playlist Description Input */}
          <label>Playlist Description:</label>
          <input
            type="text"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            placeholder="Enter playlist description"
            required
          />

          {/* Color Picker for Primary and Secondary Colors */}
          <div className="color-picker">
            <div className='color-column'>
              <label>Primary Color:</label>
              <ColorPicker color={primaryColor} onChange={setPrimaryColor} />
            </div>
            <div className='color-column'>
              <label>Secondary Color:</label>
              <ColorPicker color={secondaryColor} onChange={setSecondaryColor} />
            </div>
          </div>

          {/* Genre Selection */}
          <div className="multiple-selection">
            <label>Genres:</label>
            <div className="checkbox-grid">
              {genres.map((genre) => (
                <div key={genre} className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id={genre}
                    value={genre}
                    onChange={handleGenreChange}
                    className="custom-checkbox"
                  />
                  <label htmlFor={genre} className="checkbox-label">
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Mood Selection */}
          <div className="multiple-selection">
            <label>Moods:</label>
            <div className="checkbox-grid">
              {moods.map((mood) => (
                <div key={mood} className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id={mood}
                    value={mood}
                    onChange={handleMoodChange}
                    className="custom-checkbox"
                  />
                  <label htmlFor={mood} className="checkbox-label">
                    {mood}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-playlist">
            Submit Playlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaylistQuestions;
