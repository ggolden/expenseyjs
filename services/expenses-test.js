const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const expenses = require("./expenses");

describe("Expense",  function(){
  it('creates new Expense', function(){
    const id = 1;
    const amount = 1.99;
    const date = new Date();
    const description = "an expense";
    const userId = 42;

    const e = new expenses.Expense(id, amount, date, description, userId);

    expect(e.id).to.equal(id);
    expect(e.amount).to.equal(amount);
    expect(e.date).to.equal(date);
    expect(e.description).to.equal(description);
    expect(e.userId).to.equals(userId);
  });
});

describe("getExpenses", () => {
  it('returns 3 expenses', () => {
    const list = expenses.getExpenses();
    assert.lengthOf(list, 3);
  });
});

describe("addExpense", () => {
  it('creates new expense', () => {
    const amount = 1.99;
    const date = new Date();
    const description = "an expense";
    const userId = 42;

    const e = expenses.addExpense(amount, date, description, userId);

    expect(e.id).to.equal(1);
    expect(e.amount).to.equal(amount);
    expect(e.date).to.equal(date);
    expect(e.description).to.equal(description);
    expect(e.userId).to.equals(userId);
  });

  it('creates a second expense', () => {
    const amount = 8.47;
    const date = new Date();
    const description = "another expense";
    const userId = 22;

    const e = expenses.addExpense(amount, date, description, userId);

    expect(e.id).to.equal(2);
    expect(e.amount).to.equal(amount);
    expect(e.date).to.equal(date);
    expect(e.description).to.equal(description);
    expect(e.userId).to.equals(userId);
  });
});
