// expenses service

const Expense = require("./expense");
// const storage = require("./expensesStorageMem");
// const storage = require("./expensesStorageMongo");
let storage = null;

// set the storage engine to use
const init = function(storageVarient) {
    storage = storageVarient;
}

/**
 * Record a new expense
 *
 * @param amount
 *            The expense amount.
 * @param date
 *            The expense date.
 * @param description
 *            The expense description.
 * @param userId
 *            The user ID of the user claiming the expense.
 * @return The recorded expense, or not if any fields are missing or invalid.
 * @return a Promise for the added expense.
 */
const addExpense = function(amount, date, description, userId) {
  return new Promise((resolve, reject) => {
    // TODO: validate the fields
    if ((amount == null) || (date == null) || (description == null) || (userId == null))
    {
      reject(); // TODO: what error?
    }

    storage.createExpense(amount, date, description, userId).then((expense) => {
      resolve(expense);
    }, (err) => {
      reject(err);
    });
  });
}

/**
 * Get all the expenses for this user.
 *
 * @param userId
 *            The user ID.
 * @return a Promise for the list of expenses, possibly empty.
 */
const getExpenses = function(userId) {
  return storage.readExpensesForUser(userId);
}

module.exports = {getExpenses, addExpense, init};
