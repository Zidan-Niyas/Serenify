// src/components/Playlist.js
import { useEffect, useState } from "react";
import axios from "axios";

const Playlist = () => {
  const [songs, setSongs] = useState([]);
  const token = localStorage.getItem("spotifyToken");

  useEffect(() => {
    const fetchPlaylist = async () => {
      const playlistId = "YOUR_SPOTIFY_PLAYLIST_ID"; // Replace with your playlist ID
      const { data } = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSongs(data.items);
    };

    if (token) {
      fetchPlaylist();
    }
  }, [token]);

  return (
    <div>
      <h2>Your Playlist</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.track.id}>
            {song.track.name} by {song.track.artists[0].name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
