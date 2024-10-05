import { useEffect, useState } from "react";
import {
  generateSpotifyLoginUrl,
  getAccessTokenFromUrl,
} from "./spotifyConfig";
import Playlist from "./components/Playlist";
import Playback from "./components/Playback";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromUrl = getAccessTokenFromUrl();
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      localStorage.setItem("spotifyToken", tokenFromUrl);
      window.location.hash = ""; // Clear the hash from the URL
    } else {
      const tokenFromStorage = localStorage.getItem("spotifyToken");
      if (tokenFromStorage) {
        setToken(tokenFromStorage);
      }
    }
  }, []);

  const loginToSpotify = () => {
    window.location.href = generateSpotifyLoginUrl();
  };

  return (
    <div>
      <h1>Spotify Integration</h1>
      {!token && <button onClick={loginToSpotify}>Login to Spotify</button>}
      {token && (
        <>
          <Playlist token={token} />
          <Playback token={token} />
        </>
      )}
    </div>
  );
};

export default App;
