# Serverless Spotify Auth

[![Netlify Status](https://api.netlify.com/api/v1/badges/d33b42c0-fb45-4221-b0b9-32c61dd6e711/deploy-status)](https://app.netlify.com/sites/serverless-spotify-auth/deploys)

This project demonstrates OAuth 2.0 authentication via the Authorization Code Flow for the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) using Netlify serverless functions. In essence, the [Spotify Web API example](https://github.com/spotify/web-api-auth-examples) has been adapted to use Netlify functions on the backend and [Create React App](https://github.com/facebook/create-react-app) on the frontend.

## Spotify App Setup

Use your Spotify account on the [Spotify developer site](https://developer.spotify.com) to create an app and get a Client ID and Client Secret. You need to set up your redirect URI on the Spotify dashboard.

### Redirect URI for Local Development

http://localhost:8888/.netlify/functions/callback

## Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JonoMacC/serverless-spotify-auth)

## Local Development

Create a file called .env to store environment variables.

    REACT_APP_CLIENT_ID="your client id here"
    REACT_APP_CLIENT_SECRET="your client secret here"

Never share your Client ID in public such as in a git repository.

## Local Development

In the project directory, install the packages:

    yarn

Set up Netlify CLI if you have not done so.

    npm install netlify-cli -g

Login to your Netlify account:

    ntl login

Start the app:

    ntl dev

Open [http://localhost:8888](http://localhost:8888) to view it in the browser.
