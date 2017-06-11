// expenses routes

var express = require("express");
var router = express.Router();

// use the Expenses and Authentication services
var expensesService = require("../services/expenses");
var authService = require("../auth/authenticationService");

// GET expenses - return a JSON array of Expense objects.  Cookie holds auth.
router.get("/", function(req, res, next) {
  const auth = authService.authenticateReqByToken(req);
  if (auth === undefined) {
    return;
  }

  // assure a fresh response, not cached in browser
  const now = new Date();
  res.setHeader("Last-Modified", now.toUTCString());

  // get the expenses
  const expenses = expensesService.getExpenses(auth.getUserId());

  // send the json
  res.json(expenses);
});

// POST a new expense - take the expense in the body json, return the new Expense
router.post("/", function(req, res, next) {
  const auth = authService.authenticateReqByToken(req);
  if (auth === undefined) {
    return;
  }

  // get the fields from the json body Expense TODO: if not quite there?
  const amount = req.body.amount;
  const date = new Date(req.body.date); // 2017-06-10T00:21:54.000Z
  const description = req.body.description;

  // user ID from the auth
  const userId = auth.getUserId();

  // create a new expense in the expenses service
  const expense = expensesService.addExpense(amount, date, description, userId);

  // return the new expense
  res.json(expense);
});

module.exports = router;
