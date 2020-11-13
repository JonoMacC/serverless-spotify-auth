/**
 * Retrieve the access token and refresh token from the URL hash
 * and return an object with them stored in it
 * returns null if no hash substring
 */
export const getHashParams = (location = window.location) => {
  const q = location.hash.substring(2);

  // if the substring is non-empty, split it up based on hashes
  // return the parameters as an object
  if (q) {
    const qArray = q.split("/");
    const hashParams = {
      path: qArray[0],
      access_token: qArray[1],
      refresh_token: qArray[2],
      expires_in: qArray[3],
    };
    return hashParams;
  }
  return null;
};
