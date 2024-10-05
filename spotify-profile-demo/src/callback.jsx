// src/pages/Callback.js

import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Callback = () => {
  const history = useHistory();

  useEffect(() => {
    const hash = window.location.hash;
    let token = null;

    if (hash) {
      const params = new URLSearchParams(hash.substring(1)); // remove the `#`
      token = params.get("access_token");

      if (token) {
        localStorage.setItem("spotifyToken", token); // Save the token in localStorage
        history.push("/"); // Redirect to the main page
      }
    }
  }, [history]);

  return <div>Logging in...</div>;
};

export default Callback;
