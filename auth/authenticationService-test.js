const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const authService = require("./authenticationService");
const Credentials = require("./credentials");
const Authentication = require("./authentication");

describe("Authentication", () => {
  if("hold all properties", () => {
    const id = 9;
    const date = new Date();
    const userId = "user Id";

    const auth = new Authentication(id, date, userId);

    assert.equal(auth.getId(), id);
    assert.equal(auth.getDate(), date);
    assert.equal(auth.getUserId(), userId);
  });
});

describe("Credentials", () => {
  it("holds all properties", () => {
    const password = "password";
    const userId = "user id";

    const creds = new Credentials(password, userId);

    assert.equal(creds.getPassword(), password);
    assert.equal(creds.getUserId(), userId);
  });
});
describe("authenticateByCredentials",  function(){
  it("fails to authenticate to an undefined user", function(){
    const creds = new Credentials("x", "y@z.com");
    const auth = authService.authenticateByCredentials(creds);

    assert.isUndefined(auth);
  });

  it("fails to authenticate to a defined user, bad password", function(){
    const creds = new Credentials("x", "user@mac.com");
    const auth = authService.authenticateByCredentials(creds);

    assert.isUndefined(auth);
  });

  it("authenticates to a built in user (1)", function(){
    const creds = new Credentials("Welcome123", "user@mac.com");
    const auth = authService.authenticateByCredentials(creds);

    assert.equal(auth.getUserId(), creds.getUserId());
    assert.isAbove(auth.getId(), 0);
  });

  it("authenticates to a built in user (2)", function(){
    const creds = new Credentials("Welcome123", "user@gmail.com");
    const auth = authService.authenticateByCredentials(creds);

    assert.equal(auth.getUserId(), creds.getUserId());
    assert.isAbove(auth.getId(), 0);
  });
});

describe("authenticateByToken", function(){
  it("fails with bad token", function(){
    const token = 0;

    const auth = authService.authenticateByToken(token);

    assert.isUndefined(auth);
  });

  it("authenticates with a good token", function(){
    const creds = new Credentials("Welcome123", "user@mac.com");
    const initialAuth = authService.authenticateByCredentials(creds);
    const token = initialAuth.getId();

    const auth = authService.authenticateByToken(token);
    assert.equal(auth.getUserId(), creds.getUserId());
  });

  it("authenticates with a string token", function(){
    const creds = new Credentials("Welcome123", "user@mac.com");
    const initialAuth = authService.authenticateByCredentials(creds);
    const token = initialAuth.getId().toString();

    const auth = authService.authenticateByToken(token);
    assert.equal(auth.getUserId(), creds.getUserId());
  });

  it("fails to authenticate if authentication removed", function(){
    const creds = new Credentials("Welcome123", "user@mac.com");
    const initialAuth = authService.authenticateByCredentials(creds);
    const token = initialAuth.getId();

    authService.removeAuthentication(initialAuth);

    const auth = authService.authenticateByToken(token);
    assert.isUndefined(auth);
  });
});

// TODO: need to test registerUser(), changePassword(), removeUser()
