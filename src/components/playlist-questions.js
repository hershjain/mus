import React, { useState } from 'react';
import { SketchPicker } from 'react-color'; // For color picking (you'll need to install react-color)
import '../styles/playlist-questions.css'; // CSS for the overlay

const PlaylistQuestions = ({ onClose }) => {
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#ffffff');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);

  const genres = ['Rock', 'Pop', 'Jazz', 'Hip-Hop', 'Classical'];
  const moods = ['Happy', 'Sad', 'Energetic', 'Calm', 'Romantic'];

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    }
  };

  const handleMoodChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedMoods([...selectedMoods, value]);
    } else {
      setSelectedMoods(selectedMoods.filter((mood) => mood !== value));
    }
  };

  const handleSubmit = () => {
    // You can handle the submission of the form here
    const playlistData = {
      description: playlistDescription,
      primaryColor,
      secondaryColor,
      genres: selectedGenres,
      moods: selectedMoods,
    };

    console.log('Playlist Data:', playlistData);
    onClose(); // Close the overlay after submission
  };

  return (
    <div className="playlist-overlay">
      <div className="overlay-content">
        <button className="close-overlay" onClick={onClose}>
          X
        </button>

        <h2>Import Playlist</h2>

        {/* Playlist Description Input */}
        <label>Playlist Description:</label>
        <input
          type="text"
          value={playlistDescription}
          onChange={(e) => setPlaylistDescription(e.target.value)}
          placeholder="Enter playlist description"
        />

        {/* Color Picker for Primary and Secondary Colors */}
        <div className="color-picker">
        <div className='color-column'>
          <label>Primary Color:</label>
          <SketchPicker
            color={primaryColor} 
            style={'width:150px;'}
            onChangeComplete={(color) => setPrimaryColor(color.hex)}
          />
        </div>
        <div className='color-column'>
          <label>Secondary Color:</label>
          <SketchPicker
            color={secondaryColor}
            style={'width:150px;'}
            onChangeComplete={(color) => setSecondaryColor(color.hex)}
          />
        </div>
        </div>

        {/* Genre Selection */}
        <div className="multiple-selection">
          <label>Genres:</label>
          <div className="checkbox-grid">
            {genres.map((genre) => (
                <div key={genre}>
                <input
                    type="checkbox"
                    value={genre}
                    onChange={handleGenreChange}
                />
                <label>{genre}</label>
                </div>
          ))}
          </div>
        </div>

        {/* Mood Selection */}
        <div className="multiple-selection">
          <label>Moods:</label>
          <div className='checkbox-grid'>
            {moods.map((mood) => (
                <div key={mood}>
                <input type="checkbox" value={mood} onChange={handleMoodChange} />
                <label>{mood}</label>
                </div>
            ))}
          </div>
        </div>

        <button className="submit-playlist" onClick={handleSubmit}>
          Submit Playlist
        </button>
      </div>
    </div>
  );
};

export default PlaylistQuestions;
