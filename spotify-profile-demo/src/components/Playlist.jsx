import { useEffect, useState } from "react";
import axios from "axios";

const Playlist = ({ token }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const playlistId = "4Sj8DVrpZ5kA3Ignqmw1tl"; // Corrected playlist ID
        const { data } = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSongs(data.items);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPlaylist();
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Playlist</h2>
      <ul>
        {songs && songs.length > 0 ? (
          songs.map((song) => (
            <li key={song.track.id}>
              {song.track.name} by {song.track.artists[0].name}
            </li>
          ))
        ) : (
          <li>No songs available.</li>
        )}
      </ul>
    </div>
  );
};

export default Playlist;



