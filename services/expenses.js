// expenses service

// return an array of expenses
// TODO: from a database or something?
const getExpenses = function() {
  return [
    new Expense(1, "Airline ticket", 900.00),
    new Expense(2, "Parking", 100.00),
    new Expense(3, "Airport Shuttle", 20.00)
  ];
}

// The Expense class
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

  toString() {
    return `Expense: id: ${this.id}  description: ${this.description}  price: ${this.price}`
  }
}

module.exports = {Expense, getExpenses};
