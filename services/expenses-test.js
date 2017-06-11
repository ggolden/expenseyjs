const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const expenses = require("./expenses");
const Expense = require("./expense");
const mongoStorage = require("./expensesStorageMongo");

// configure the expenses service with a storage
const expensesStorage = require("../services/expensesStorageMem");
expenses.init(expensesStorage);

describe("Expense",  function(){
  it("creates new Expense", function(){
    const id = 1;
    const amount = 1.99;
    const date = new Date();
    const description = "an expense";
    const userId = "user@mac.com";

    const e = new Expense(id, amount, date, description, userId);

    expect(e.id).to.equal(id);
    expect(e.amount).to.equal(amount);
    expect(e.date).to.equal(date);
    expect(e.description).to.equal(description);
    expect(e.userId).to.equal(userId);
  });
});

describe("getExpenses", () => {
  it("returns 0 when none defined", () => {
    expenses.getExpenses(0).then( (expenses) => {
      assert.lengthOf(expenses, 0);
    }, (err) => {
      assert.fail(err, "no err");
    });

    // const list = expenses.getExpenses(0);
    // assert.lengthOf(list, 0);
  });

  it("returns what was defined", () => {
    const amount = 1.99;
    const date = new Date();
    const description = "an expense";
    const userId = "user@mac.com";
    const userId2 = "user@gmail.com";

    expenses.addExpense(amount, date, description, userId);
    expenses.addExpense(amount, date, description, userId);
    expenses.addExpense(amount, date, description, userId2);

    expenses.getExpenses(userId).then((expenses) => {
      assert.lengthOf(expenses, 2);
    }, (err) => {
      assert.fail(err, "no err");
    });

    expenses.getExpenses(userId2).then((expenses) => {
      assert.lengthOf(expenses, 1);
    }, (err) => {
      assert.fail(err, "no err");
    });
  });
});

describe("addExpense", () => {
  it("creates new expense", () => {
    const amount = 1.99;
    const date = new Date();
    const description = "an expense";
    const userId = "user@mac.com";

    expenses.addExpense(amount, date, description, userId).then((e) => {
      assert.isAbove(e.id, 0);
      expect(e.amount).to.equal(amount);
      expect(e.date).to.equal(date);
      expect(e.description).to.equal(description);
      expect(e.userId).to.equal(userId);
    }, (err) => {
      assert.fail();
    });
  });

  it("creates a second expense", () => {
    const amount = 8.47;
    const date = new Date();
    const description = "another expense";
    const userId = "user@mac.com";

    expenses.addExpense(amount, date, description, userId).then((e) => {
      assert.isAbove(e.id, 0);
      expect(e.amount).to.equal(amount);
      expect(e.date).to.equal(date);
      expect(e.description).to.equal(description);
      expect(e.userId).to.equal(userId);
    }, (err) => {
      assert.fail();
    });
  });
});

// describe("Mongo Test", () => {
//   it("reads", () => {
//     mongoStorage.readExpensesForUser("user@mac.com").then((expenses) => {
//       console.log("read these from mongo: ", expenses);
//     }, (err) => {
//       assert.fail();
//     });
//   });
//
//   it("writes", () => {
//     const amount = 8.47;
//     const date = new Date();
//     const description = "another expense";
//     const userId = "user@mac.com";
//     mongoStorage.createExpense(amount, date, description, userId).then((e) => {
//       expect(e.amount).to.equal(amount);
//       assert.equal(e.date.getTime(), date.getTime());
//       expect(e.description).to.equal(description);
//       expect(e.userId).to.equal(userId);
//     }, (err) => {
//       assert.fail();
//     });
//   });
// });
