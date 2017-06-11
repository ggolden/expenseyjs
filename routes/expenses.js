// expenses routes

const express = require("express");
const router = express.Router();

// use the Expenses and Authentication services
const expensesService = require("../services/expenses");
const authService = require("../auth/authenticationService");

// configure the expenses service with a storage
// const expensesStorage = require("../services/expensesStorageMem");
const expensesStorage = require("../services/expensesStorageMongo");
expensesService.init(expensesStorage);

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
  expensesService.getExpenses(auth.getUserId()).then((expenses) => {
    res.json(expenses);
  }, (err) => {
    res.json({}); // TODO: ???
  });
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
  expensesService.addExpense(amount, date, description, userId).then((expense) => {
    res.json(expense);
  }, (err) => {
    res.json({}); // TODO: ???
  });
});

module.exports = router;
