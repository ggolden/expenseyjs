const Credentials = require("./credentials");
const Authentication = require("./authentication");
const equal = require('equals');

/** known users */
let credentials = [];
credentials.push(new Credentials("Welcome123", "user@mac.com"));
credentials.push(new Credentials("Welcome123", "user@gmail.com"));

/** To generate the next authentication id. TODO: usually this would be done by the database with an auto-increment column. */
let nextId = 1;

/** authentications: mapped by token to the Authentication */
let auths = new Map();

/**
 * Create an authentication based on credentials.
 *
 * @param credentials
 *            The authentication credentials (user id, password).
 * @return The Authentication if authenticated, or not.
 */
const authenticateByCredentials = function(creds) {
  // check credentials
  let found = credentials.find(c => equal(c,creds));
  if (found === undefined) {
    return undefined;
  }

  // generate a new ID
  const id = nextId;
  nextId++;

  // create and record the authentication
  const auth = new Authentication(id, new Date(), found.getUserId());
  auths.set(id, auth);

  // return the authentication
  return auth;
}

/**
 * Authenticate by token.
 *
 * @param token
 *            The authentication token.
 * @return The Authentication if found and valid, or not.
 */
const authenticateByToken = function(token) {
  // check that the token is to a valid authentication
  const auth = auths.get(token);
  if (auth === undefined)
  {
    return undefined;
  }

  // all is well
  return auth;
}

/**
 * Change a user's password. The user must already be authenticated.
 *
 * @param authentication
 *            The authentication, identifying a valid user.
 * @param newPassword
 *            The new password (clear text).
 * @return true if the change was accepted, false if not. May be rejected if the password is not sufficiently secure.
 */
const changePassword = function(authentication, newPassword) {
  // get the credentials for the authentication's userID
  const found = credentials.find(c => c.getUserId() === authentication.getUserId());
  if (found === undefined) {
    return false;
  }

  // validate the new password TODO:

  // update the password
  found.setPassword(newPassword);

  // we will also need the index of this so we can replace it later
  let foundAt = this.credentials.indexOf(found.get());
  if (foundAt == -1)
  {
    // this should not happen
    logger.warn("changePassword(): could not find index of found credentials: " + found.get().getUserId());
    return false;
  }

  return true;
}

/**
 * Register a new user, and create their first authentication.
 *
 * @param credentials
 *            The new user's credentials.
 * @return The authentication, or not. May fail if the user ID in the credentials is already known, or the PW is insufficiently secure.
 */
const registerUser = function(creds) {
  // validate that the user ID has not already been registered
  const found = credentials.find(c => c.getUserId() === creds.getUserId());
  if (found !== undefined) {
    return undefined;
  }

  // validate the new password TODO:

  // store the new credentials
  credentials.push(creds);

  // return the authentication
  return authenticateByCredentials(creds);
}

/**
 * End the validity of this authentication, so that it cannot be used to authentication (token).
 *
 * @param authentication
 *            The authentication to remove.
 */
const removeAuthentication = function(authentication) {
  // TODO: if storing authentications in the database, you might want to keep the record, but mark it closed.

  // remove the authentication
  auths.delete(authentication.getId());
}

/**
 * Remove a user. After removal, the user ID can no longer be used for authentication, unless a new user is registered with this ID.
 *
 * @param userID
 *            The user ID
 */
const removeUser = function(userID) {
  // find the existing credentials
  const found = credentials.find(c => c.getUserId() === userID);
  if (found === undefined) {
    return;
  }
  const foundIndex = credentials.indexOf(found);

  // remove
  credentials.splice(foundIndex, 1);

  // TODO: if we have records of authentications, we might want to clear them

  // TODO: if currently authenticated, end it
}

module.exports = {
  authenticateByCredentials,
  authenticateByToken,
  changePassword,
  registerUser,
  removeAuthentication,
  removeUser
};
