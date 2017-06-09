// expenses module

var express = require('express');
var router = express.Router();

// use the Expenses service
var expensesService = require('../services/expenses');

/* GET expenses - return a JSON array of Expense objects. */
router.get('/', function(req, res, next) {

  // assure a fresh response, not cached in browser
  const now = new Date();
  res.setHeader('Last-Modified', now.toUTCString());

  // get the expenses
  const expenses = expensesService.getExpenses();
  // const newExpense = new expensesService.Expense(9,"new",0.99);
  // console.log(`new expense = ${newExpense}`);

  // send the json
  res.json(expenses);
});

module.exports = router;
