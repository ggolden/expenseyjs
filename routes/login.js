// login routes

const express = require("express");
const router = express.Router();

// use the Authentication service
const authService = require("../auth/authenticationService");
const Credentials = require("../auth/credentials");

const TOKEN = "AUTH";

// POST a new login - post body JSON is Credentials
router.post("/", function(req, res, next) {

  // get the fields from the json body Credentials TODO: if not quite there?
  const password = req.body.password;
  const userId = req.body.userId;

  // create a Credentials
  const creds = new Credentials(password, userId);

  // authenticate
  const auth = authService.authenticateByCredentials(creds);

  // if failed, return a 403 FORBIDDEN
  if (auth === undefined) {
    res.status(403);
  }

  // otherwise set a session cookie
  else {
    res.status(200);
    res.cookie(TOKEN, auth.getId(), {maxAge : -1});
  }

  res.end();
});

module.exports = router;
