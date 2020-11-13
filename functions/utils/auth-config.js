// enable reading from process.env
require("dotenv").config();

const routerBasePath = `/.netlify/functions`;
const env = process.env.NODE_ENV || "development";
const devMode = env === "development";
const spotifyURL = "https://accounts.spotify.com";
const devURL = "http://localhost:3000";

/* process.env.URL from netlify BUILD environment variables */
const siteUrl = process.env.URL || devURL;

const clientId = process.env.REACT_APP_CLIENT_ID,
  clientSecret = process.env.REACT_APP_CLIENT_SECRET,
  tokenHost = spotifyURL,
  authorizePath = `${spotifyURL}/authorize?`,
  tokenPath = `${spotifyURL}/api/token`,
  profilePath = `${spotifyURL}/v1/me/`,
  redirectUri = `${siteUrl}${routerBasePath}/callback`;

module.exports = {
  clientId,
  clientSecret,
  tokenHost,
  authorizePath,
  tokenPath,
  profilePath,
  redirectUri,
  devMode,
  siteUrl,
};
