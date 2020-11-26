/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */

const axios = require("axios");
const {
  clientId,
  clientSecret,
  redirectUri,
  tokenPath,
  siteUrl,
} = require("./utils/auth-config");

/* Function to handle Spotify auth callback */
exports.handler = async function (event, context) {
  const { code, state } = event.queryStringParameters || null;

  // retrieve the auth state set on the cookie
  const storedState = event.headers.cookie
    ? event.headers.cookie.split(";")[0].split("=")[1]
    : null;

  // first do state validation
  if (state === null || state !== storedState) {
    return {
      statusCode: 302, // must be a redirect status code or the client won't be redirected
      headers: {
        Location: `${siteUrl}/#/error/state%20mismatch`,
        "Cache-Control": "no-cache", // Disable caching of this response
      },
    };
    // if the state is valid, get the authorization code and pass it on to the client
  } else {
    const authOptions = {
      method: "post",
      url: tokenPath,
      params: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    // Retrieve an access token and a refresh token
    return axios(authOptions)
      .then((response) => {
        const { expires_in, access_token, refresh_token } = response.data;

        // pass the tokens to the browser to make requests from there
        return {
          statusCode: 302, // must be a redirect status code or the client won't be redirected
          headers: {
            Location: `${siteUrl}/#/user/${access_token}/${refresh_token}/${expires_in}`,
            "Cache-Control": "no-cache", // Disable caching of this response
          },
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          statusCode: 302, // must be a redirect status code or the client won't be redirected
          headers: {
            Location: `${siteUrl}/#/error/invalid token`,
            "Cache-Control": "no-cache", // Disable caching of this response
          },
        };
      });
  }
};
