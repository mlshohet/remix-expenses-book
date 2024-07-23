import { prisma } from "./database.server";
import mongoose from 'mongoose';
import Expense from "../model/ExpenseModel";

export async function addExpense(expenseData) {
    mongoose.connect("mongodb+srv://mike2:remix@cluster0.hbymvhn.mongodb.net/remix-project?retryWrites=true&w=majority");

    try {
        const expense = await Expense.create({
            title: expenseData.title,
            amount: +expenseData.amount,
            date: new Date(expenseData.date),
        });

        console.log("EXPENSE: ", expense);
        return expense;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getExpenses() {
    try {
        const expenses =  await prisma.expense.findMany({ orderBy: { date: 'desc' }});
        return expenses;
    } catch (error) {
        console.log(error);
        throw error;
    }
}