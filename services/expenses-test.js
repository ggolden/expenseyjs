const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const expenses = require("./expenses");

describe("Expense",  function(){
  it("creates new Expense", function(){
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
  it("returns 0 when none defined", () => {
    const list = expenses.getExpenses(0);
    assert.lengthOf(list, 0);
  });

  it("returns what was defined", () => {
    const amount = 1.99;
    const date = new Date();
    const description = "an expense";
    const userId = 42;
    const userId2 = 22;

    const e = expenses.addExpense(amount, date, description, userId);
    const e2 = expenses.addExpense(amount, date, description, userId);
    const e3 = expenses.addExpense(amount, date, description, userId2);

    const list = expenses.getExpenses(userId);
    assert.lengthOf(list, 2);

    const list2 = expenses.getExpenses(userId2);
    assert.lengthOf(list2, 1);
  });
});

describe("addExpense", () => {
  it("creates new expense", () => {
    const amount = 1.99;
    const date = new Date();
    const description = "an expense";
    const userId = 42;

    const e = expenses.addExpense(amount, date, description, userId);

    assert.isAbove(e.id, 0);
    expect(e.amount).to.equal(amount);
    expect(e.date).to.equal(date);
    expect(e.description).to.equal(description);
    expect(e.userId).to.equals(userId);
  });

  it("creates a second expense", () => {
    const amount = 8.47;
    const date = new Date();
    const description = "another expense";
    const userId = 22;

    const e = expenses.addExpense(amount, date, description, userId);

    assert.isAbove(e.id, 0);
    expect(e.amount).to.equal(amount);
    expect(e.date).to.equal(date);
    expect(e.description).to.equal(description);
    expect(e.userId).to.equals(userId);
  });
});
