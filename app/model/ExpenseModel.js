import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const expenseSchema = new Schema({
    id: String,
    title: String,
    amount: Number,
    date: Date,
    dateAdded: Date
});

const Expense = model('Expense', expenseSchema);
export default Expense;
  