// expenses storage provider - in Mongo

const Expense = require("./expense");
const mongo = require('mongodb').MongoClient;
//const mongoURL = "mongodb://localhost:27017/expensey";
const mongoURL =
    "mongodb://" +
    (process.env.MONGO_PORT_27017_TCP_ADDR === undefined ? "localhost" : process.env.MONGO_PORT_27017_TCP_ADDR) +
    ":" +
    (process.env.MONGO_PORT_27017_TCP_PORT === undefined ? "27017" : process.env.MONGO_PORT_27017_TCP_PORT) +
    "/expensey";

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
    mongo.connect(mongoURL, (err, db) => {
      if (err) {
        if (db) db.close();
        reject(err);
      } else {
        const newExpense = new Expense(null, amount, date, description, userId)

        const expenses = db.collection("expenses");
        expenses.insertMany([newExpense], (err, result) => {
          if (err) {
            if (db) db.close();
            reject(err);
          } else {
            db.close();
            // pull the expense data from the result
            const db_e = result.ops[0];
            // create one of our Expense classes from the data
            const expense = new Expense(db_e._id, db_e.amount, new Date(db_e.date),
                    db_e.description, db_e.userId);
            // resolve with the Expense
            resolve(expense);
          }
        });
      }
    });
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
    mongo.connect(mongoURL, (err, db) => {
      if (err) {
        if (db) db.close();
        reject(err);
      } else {
        const expenses = db.collection("expenses");

        expenses.find({userId: userId}).toArray((err, docs) => {
          if (err) {
            if (db) db.close();
            reject(err);
          } else {
            db.close();
            resolve(docs);
          }
        });
      }
    });
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
