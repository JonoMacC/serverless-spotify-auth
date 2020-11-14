import React, { useState, useEffect } from "react";
import { getHashParams } from "./util/auth";
import logo from "./logo.svg";
import "./App.css";

/*
 * The app makes requests to the backend to get authorization for the Spotify Web API
 * Once authorization is granted, requests can be made to the Spotify API, e.g. retrieving the
 * user's top tracks
 */
function App() {
  const [params, setParams] = useState();

  // when the component mounts, check the URL for authentication
  // data, if it is present, update the parameters state
  useEffect(() => {
    const authData = getHashParams(window.location);
    if (authData) {
      if (authData.path === "error") {
        alert("There was an error during the authentication.");
      } else {
        setParams(authData);
      }
    }
  }, []);

  // get new parameters, using the current refresh token
  const refreshToken = () => {
    return fetch(
      `/.netlify/functions/refresh_token?refresh_token=${params.refresh_token}`
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        setParams(jsonResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // clear out the authentication parameters
  const clearTokens = () => {
    setParams(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Spotify Serverless Auth</h1>
      </header>
      <main>
        <div className="List-horiz">
          <a className="App-button" href="/.netlify/functions/login">
            Login with Spotify
          </a>
          <button
            className="App-button"
            onClick={refreshToken}
            disabled={!params}
          >
            Refresh Token
          </button>
          <button
            className="App-button"
            onClick={clearTokens}
            disabled={!params}
          >
            Clear Tokens
          </button>
        </div>
        {params && (
          <div className="Token-table">
            <div className="Token-row">
              <div className="Token-row-title-col">
                <h2>Access Token:</h2>
              </div>
              <div className="Token-row-body-col">
                <p>{params.access_token}</p>
              </div>
            </div>
            <div className="Token-row">
              <div className="Token-row-title-col">
                <h2>Refresh Token:</h2>
              </div>
              <div className="Token-row-body-col">
                <p>{params.refresh_token}</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="App-footer">
        <a
          href="https://github.com/JonoMacC/serverless-spotify-auth"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </footer>
    </div>
  );
}

export default App;
