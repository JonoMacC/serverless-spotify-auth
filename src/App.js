import React, { useState, useEffect } from "react";
import { getHashParams } from "./util/auth";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [params, setParams] = useState();

  // when the component mounts, check URL for authentication
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

  const clearTokens = () => {
    setParams(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Spotify Serverless Authorization Code Flow</h1>
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
      </header>
    </div>
  );
}

export default App;
