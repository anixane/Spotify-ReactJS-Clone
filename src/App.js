import { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

// create instance of Spotify in this app which will allow the communication with spotify API
const spotify = new SpotifyWebApi();

function App() {
  // dispatch is like a gun to shoot at data-layer for assigning tasks
  const [{ token }, dispatch] = useDataLayerValue();

  // Runs code block based on a condition.
  // Here we will use it to keep an eye on URL, if anything changes, this code block should fire up
  useEffect(() => {
    const hash = getTokenFromResponse();
    // cleaning the access token from URL for security reasons
    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then((currentUser) => {
        // dispatch this object to data-layer
        dispatch({
          type: "SET_USER",
          user: currentUser,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });

      spotify.getPlaylist("0iXZdTKIkA8RNVq7LfkafY").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
    }
  }, []);
  return <div className="app">{token ? <Player spotify={spotify}/> : <Login />}</div>;
}

export default App;
