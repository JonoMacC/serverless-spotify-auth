/**
 * The /login endpoint
 * Redirect the client to the spotify authorize url, but first set that user's
 * state in the cookie.
 */

const querystring = require("querystring");
const stateKey = "spotify_auth_state";
const {
  clientId,
  redirectUri,
  authorizePath,
  devMode,
} = require("./utils/auth-config");

// requested application authorizations
const scopes = ["user-library-read", "user-top-read", "playlist-modify-public"];

//  Generates a random string containing numbers and letters
//  @param  {number} length The length of the string
//  @return {string} The generated string
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/* Do initial auth redirect */
exports.handler = async function (event, context) {
  const state = generateRandomString(16);

  // Note that for local development, Chrome will not set the cookie if the
  // "Secure" flag is set
  const cookieString = devMode ? "" : "; Secure; HttpOnly";
  const stateCookie = `${stateKey}=${state}${cookieString}`;

  /* Generate authorizationURI */
  const authorizationURI =
    authorizePath +
    querystring.stringify({
      response_type: "code",
      show_dialog: true,
      client_id: clientId,
      scope: scopes.join("%20"),
      redirect_uri: redirectUri,
      state: state,
    });

  /* Redirect user to authorizationURI */
  return {
    statusCode: 302, // must be a redirect status code or the client won't be redirected
    headers: {
      Location: authorizationURI,
      "Set-Cookie": stateCookie, // sets a cookie @ (key, value)
      "Cache-Control": "no-cache", // Disable caching of this response
    },
  };
};
