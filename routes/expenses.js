// expenses module

var express = require('express');
var router = express.Router();

/* GET expenses - return a JSON array of Expense objects. */
router.get('/', function(req, res, next) {

  // assure a fresh response, not cached in browser
  const now = new Date();
  console.log(`handling expenses route: ${now.toUTCString()}`);
  res.setHeader('Last-Modified', now.toUTCString());

  // get the expenses
  const expenses = getExpenses();

  // send the json
  res.json(expenses);
});

// return an array of expenses
// TODO: from a database or something?
function getExpenses() {
  return [
    new Expense(1, "Airline ticket", 900.00),
    new Expense(2, "Parking", 100.00),
    new Expense(3, "Airport Shuttle", 20.00)
  ];
}

class Expense {

  constructor(id, description, price) {
      this.id = id;
      this.description = description;
      this.price = price;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  getPrice() {
    return this.price;
  }
}

module.exports = router;
