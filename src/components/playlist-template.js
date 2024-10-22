import React, { useState } from "react";
import "../styles/playlist-template.css";
import placeholder from '../assets/images/playlist-test-cover.jpg';
import SongItem from "./song-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlay, faPause, faStepForward, faStepBackward } from "@fortawesome/free-solid-svg-icons";


const PlaylistTemplate = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.songs.length);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? playlist.songs.length - 1 : prevIndex - 1
    );
  };

  const handleSavePlaylist = () => {
    setIsSaved(true);
    alert("Playlist saved to your library!"); // Add a simple alert
  };

  const playlist = {
    name: "Chill Vibes",
    picture: placeholder,
    description: "Relaxing music to help you unwind.",
    creator: "User123",
    followers: 1200,
    tracks: 25,
    runtime: "1 hr 45 min",
    songs: [
      {
        name: "Song 1",
        artist: "Artist 1",
        runtime: "3:45",
        picture: placeholder,
      },
      {
        name: "Song 2",
        artist: "Artist 2",
        runtime: "4:05",
        picture: placeholder,
      },
      {
        name: "Song 3",
        artist: "Artist 3",
        runtime: "2:30",
        picture: placeholder,
      },
    ]
  };
  
  

  return (
    <div className="playlist-container">
      <div className="playlist-info">
        <img src={playlist.picture} alt={playlist.name} className="playlist-img" />
        <div className="playlist-details">
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
          <p>Creator: {playlist.creator}</p>
          <p>Followers: {playlist.followers}</p>
          <p>Tracks: {playlist.tracks}</p>
          <p>Runtime: {playlist.runtime}</p>
        </div>
      </div>

      <button
        className="save-playlist-button"
        onClick={handleSavePlaylist}
        disabled={isSaved} // Disable if already saved
      >
        <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
      </button>

      <SongList songs={playlist.songs} currentSongIndex={currentSongIndex} />

      <SongPlayer
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNextSong={handleNextSong}
        onPreviousSong={handlePreviousSong}
        currentSong={playlist.songs[currentSongIndex]}
      />
    </div>
  );
};

const SongList = ({ songs, currentSongIndex }) => {
  return (
    <div className="song-list">
      <h3>Song List</h3>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <SongItem
              picture={song.picture}
              name={song.name}
              artist={song.artist}
              runtime={song.runtime}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const SongPlayer = ({ isPlaying, onPlayPause, onNextSong, onPreviousSong, currentSong }) => {
  return (
    <div className="song-player">
      <h3>Now Playing: {currentSong.name} by {currentSong.artist}</h3>
      <div className="player-controls">
        <button onClick={onPreviousSong}>
            <FontAwesomeIcon icon={faStepBackward} />
        </button>
        <button onClick={onPlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button onClick={onNextSong}>
            <FontAwesomeIcon icon={faStepForward} />
        </button>
      </div>
    </div>
  );
};

export default PlaylistTemplate;
