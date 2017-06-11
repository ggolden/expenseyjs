// expenses service
//
// Provides the Expense class
//
// getExpenses(String userId) - returns a list of defined expenses for this user -> [Expense]
// addExpense(Float amount, Date date, String description, String userId) -> Expense

// TODO: from a database or something?
let expenses = [];
let nextId = 1;

// return an array of expenses for this user
const getExpenses = function(userId) {
  const list = expenses.filter(e => e.getUserId() === userId);
  return list;
}

// add a new expense
const addExpense = function(amount, date, description, userId) {
  const id = nextId;
  nextId += 1;

  const expense = new Expense(id, amount, date, description, userId)

  expenses.push(expense);

  return expense;
}

// The Expense class
class Expense {
  constructor(id, amount, date, description, userId) {
      this.id = id;
      this.amount = amount;
      this.date = date;
      this.description = description;
      this.userId = userId;
  }

  getId() {
    return this.id;
  }

  getAmount() {
    return this.amount;
  }

  getDate() {
    return this.date;
  }

  getDescription() {
    return this.description;
  }

  getUserId() {
    return this.userId;
  }

  toString() {
    return `Expense: id: ${this.id}  amount: ${this.amount}  date: ${this.date}  description: ${this.description}  userId: ${this.userId}`
  }
}

module.exports = {Expense, getExpenses, addExpense};
