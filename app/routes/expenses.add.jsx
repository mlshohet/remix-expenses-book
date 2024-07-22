import { useNavigate } from "@remix-run/react";
import ExpenseForm from "../components/expenses/ExpenseForm";

import Modal from "../components/util/Modal";
import { addExpense } from "../data/expenses.server";

export default function AddExpensesPage() {
  const navigate = useNavigate();

  const onCloseHandler = () => {
    navigate("..");
  };

  return (
    <Modal onClose={onCloseHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  console.log("EXPENSE DATA: ", expenseData);
  console.log("FORM DATA: ", formData);

  await addExpense(expenseData);

  return redirect("/expenses");
}
