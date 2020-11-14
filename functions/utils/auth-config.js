/*
 * Authorization configuration for Netlify functions
 * works for local development or with deployed site
 */

//enable reading from process.env
require("dotenv").config();

// Netlify sets process.env.URL on the deployed site, for local development it will be undefined
// the build step of netlify-lambda will set process.env.NODE_ENV="production" even on local development
const env = process.env.URL ? "production" : "development";
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
  redirectUri = `${siteUrl}/.netlify/functions/callback`;

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
