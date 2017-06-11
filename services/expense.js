// Expense class

class Expense {
  constructor(id, amount, date, description, userId) {
      if (id != null) {
        this.id = id;
      }
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

module.exports = Expense;
