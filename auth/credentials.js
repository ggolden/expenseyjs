class Credentials {
  constructor(password, userId) {
    this.password = password;
    this.userID = userId;
  }

  getPassword() {
    return this.password;
  }

  getUserId() {
    return this.userId;
  }

  setPassword(newPassword) {
    this.password = newPassword;
  }
}

module.exports = Credentials;
