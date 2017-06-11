// expenses storage provider - in memory

const Expense = require("./expense");

// store expenses in memory
let expenses = [];
let nextId = 1;

/**
 * Create a new expense
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
 */
const createExpense = function(amount, date, description, userId) {
  return new Promise((resolve, reject) => {
    const id = nextId;
    nextId += 1;

    const expense = new Expense(id, amount, date, description, userId)
    expenses.push(expense);

    resolve(expense);
  });
}

/**
 * Delete this expense.
 *
 * @param expense
 *            The expense.
 */
const deleteExpense = function(expense) {

}

/**
 * Read the expense with this id.
 *
 * @param id
 *            The expense id.
 * @return The expense, or not.
 */
const readExpense = function(id) {

}

/**
 * Read all the expenses for this user.
 *
 * @param userId
 *            The user ID.
 * @return a Promise for the list of expenses, possibly empty.
 */
const readExpensesForUser = function(userId) {
  return new Promise((resolve, reject) => {
    const list = expenses.filter(e => e.getUserId() === userId);
    resolve(list);
    // never fails, so we never call reject();
  });
}

/**
 * Update the expense.
 *
 * @param expense
 *            The expense.
 */
const updateExpense = function(expense) {

}

module.exports = {createExpense, deleteExpense, readExpense, readExpensesForUser, updateExpense};
