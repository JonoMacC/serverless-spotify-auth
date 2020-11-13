# Serverless Authorization Code Flow with Netlify and the Spotify API

This project demonstrates OAuth authentication via the Authorization Code Flow for the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) using Netlify serverless functions. In essence, the [Spotify Web API example](https://github.com/spotify/web-api-auth-examples) has been adapted to use Netlify functions on the backend and [Create React App](https://github.com/facebook/create-react-app) on the frontend.

## Spotify App Setup

Use your Spotify account on the [Spotify developer site](https://developer.spotify.com) to create an app and get a Client ID and Client Secret. You need to set up your redirect URI on the Spotify dashboard.

### Redirect URI for Local Development

http://localhost:3000/.netlify/functions/callback

## Local Development

Create a file called .env to store environment variables.

    REACT_APP_CLIENT_ID="your client id here"
    REACT_APP_CLIENT_SECRET="your client secret here"

Never share your Client ID in public such as in a git repository.

## Local Development

In the project directory, install the packages:

    yarn

Then start the app:

    yarn start

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deploy

<br />
<a href="https://app.netlify.com/start/deploy?repository=https://github.com/JonoMacC/fast-tracks">
<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />
</a>
