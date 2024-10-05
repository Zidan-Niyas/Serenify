import { useEffect, useState } from "react";

const Playback = ({ token }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const setupSpotifyPlayer = () => {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const spotifyPlayer = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            cb(token);
          },
        });

        spotifyPlayer.connect();

        spotifyPlayer.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });

        spotifyPlayer.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        setPlayer(spotifyPlayer);
      };
    };

    if (token) {
      setupSpotifyPlayer();
    }
  }, [token]);

  const playSong = async (spotifyUri) => {
    if (player) {
      try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
          method: "PUT",
          body: JSON.stringify({ uris: [spotifyUri] }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error starting playback:", errorData.error.message);
        }
      } catch (error) {
        console.error("Error starting playback:", error);
      }
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





















