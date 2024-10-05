import { useEffect, useState } from "react";

const Playback = () => {
  const [player, setPlayer] = useState(undefined);
  const token = localStorage.getItem("spotifyToken");

  useEffect(() => {
    if (window.Spotify && token) {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
      });

      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);

      spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });
    }
  }, [token]);

  // Updated playSong function
  const playSong = (spotifyUri) => {
    if (player) {
      // Transfer playback to the web player
      fetch(`https://api.spotify.com/v1/me/player`, {
        method: "PUT",
        body: JSON.stringify({ device_ids: [player._options.id], play: true }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          // Play the song after transferring playback
          fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: "PUT",
            body: JSON.stringify({ uris: [spotifyUri] }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        })
        .catch((error) => {
          console.error("Error transferring playback:", error);
        });
    }
  };

  return (
    <div>
      <button onClick={() => playSong("spotify:track:7qiZ7B0S8a0QX6q5zXW8Bk")}>
        Play Song
      </button>
    </div>
  );
};

export default Playback;
