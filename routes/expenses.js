// expenses module

var express = require("express");
var router = express.Router();

// use the Expenses service
var expensesService = require("../services/expenses");

// GET expenses - return a JSON array of Expense objects.
router.get("/", function(req, res, next) {

  // assure a fresh response, not cached in browser
  const now = new Date();
  res.setHeader("Last-Modified", now.toUTCString());

  // get the expenses
  const expenses = expensesService.getExpenses();

  // send the json
  res.json(expenses);
});

// POST a new expense - take the expense in the body json, return the new Expense
router.post("/", function(req, res, next) {

  // get the fields from the json body Expense TODO: if not quite there?
  const amount = req.body.amount;
  const date = new Date(req.body.date); // 2017-06-10T00:21:54.000Z
  const description = req.body.description;
  const userId = req.body.userId;

  // create a new expense in the expenses service
  const expense = expensesService.addExpense(amount, date, description, userId);
  console.log(`added: ${expense}`);

  // return the new expense
  res.json(expense);
});

module.exports = router;
