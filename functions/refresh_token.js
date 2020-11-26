/*
 * The /refresh_token endpoint
 * Retrieve a refreshed access token
 */

const axios = require("axios");
const { clientId, clientSecret, tokenPath } = require("./utils/auth-config");

/* Function to handle refreshing an access token */
exports.handler = async function (event, context) {
  // requesting access token from refresh
  // get the refresh token from the query
  let refresh_token = event.queryStringParameters.refresh_token;
  console.log("refreshing token");
  const authOptions = {
    method: "post",
    url: tokenPath,
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    params: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
  };

  return axios(authOptions)
    .then((response) => {
      const { expires_in, access_token } = response.data;

      // the response could contain an updated refresh token
      // if it does, save the updated refresh token
      refresh_token = response.data.refresh_token
        ? response.data.refresh_token
        : refresh_token;

      // pass the tokens to the response body
      return {
        statusCode: 200,
        body: JSON.stringify({
          access_token: access_token,
          refresh_token: refresh_token,
          expires_in: expires_in,
        }),
      };
    })
    .catch((err) => {
      return {
        statusCode: 500,
        body: JSON.stringify({ err }),
      };
    });
};
