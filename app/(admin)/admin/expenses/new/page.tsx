"use client";

import ExpenseForm from "@/components/admin/ExpenseForm";

export default function NewExpensePage() {
  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-primary-900 mb-6">
        Add Expense
      </h1>
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <ExpenseForm />
      </div>
    </div>
  );
}
