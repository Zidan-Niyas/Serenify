import axios from "axios";

export const clientId = "da10dcf924fa46f8b7d876d72f6a794b";
export const clientSecret = "bd17be48af834252929dc2a5f3fe7229";
export const redirectUri = "http://localhost:5173/callback";

export const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative",
];

export const generateSpotifyLoginUrl = () => {
  return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scopes.join("%20")}`;
};

export const getAccessTokenFromUrl = () => {
  const hash = window.location.hash;
  if (hash) {
    return new URLSearchParams(hash.substring(1)).get("access_token");
  }
  return null;
};
