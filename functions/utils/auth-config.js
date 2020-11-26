/*
 * Authorization configuration for Netlify functions
 * works for local development or with deployed site
 */

require("dotenv").config();

// Netlify sets process.env.NETLIFY_DEV to true when using Netlify CLI
// in production it will be false
const env = process.env.NETLIFY_DEV ? "development" : "production";
const devMode = env === "development";
const spotifyURL = "https://accounts.spotify.com";

/* process.env.URL from netlify BUILD environment variables */
const siteUrl = process.env.URL;

/* If site is linked, env variables injected from site as set up on Netlify UI
 * Otherwise will read from local .env file
 */
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
