class Authentication {
  constructor(id, date, userId) {
      this.id = id;
      this.date = date;
      this.userId = userId;
  }

  getId() {
    return this.id;
  }

  getDate() {
    return this.date;
  }

  getUserId() {
    return this.userId;
  }
}

module.exports = Authentication;
