// expenses service
//
// Provides the Expense class
//
// getExpenses(String userId) - returns a list of defined expenses for this user -> [Expense]
// addExpense(Float amount, Date date, String description, String userId) -> Expense

// return an array of expenses
// TODO: from a database or something?
const getExpenses = function(userId) {
  return [
    new Expense(1, 900.00, new Date(), "Airline ticket", 1),
    new Expense(2, 100.00, new Date(), "Parking", 1),
    new Expense(3, 20.00, new Date(), "Airport Shuttle", 1)
  ];
}

// TODO: how to synchronize this across multiple concurrent requests that might all be calling addExpense?
let nextId = 1;

// add a new expense
const addExpense = function(amount, date, description, userId) {
  const id = nextId;
  nextId += 1;

  const expense = new Expense(id, amount, date, description, userId)

  return expense
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
