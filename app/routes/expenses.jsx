import { Link, Outlet, useLoaderData, json } from "@remix-run/react";
import ExpensesList from "../components/expenses/ExpensesList";

import expensesStyles from "../styles/expenses.css";
import { FaPlus, FaDownload } from "react-icons/fa";
import { getExpenses } from "../data/expenses.server";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "First Expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "Second Expense",
    amount: 16.99,
    date: new Date().toISOString(),
  },
];

export default function ExpensesLayout() {
  const expenses = useLoaderData();

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="/expenses/add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

export const links = () => {
  return [{ rel: "stylesheet", href: expensesStyles }];
};

export async function loader() {
  const expenses = await getExpenses();
  return json(expenses);
}
