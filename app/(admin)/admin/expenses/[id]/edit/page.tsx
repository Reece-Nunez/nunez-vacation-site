"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Expense } from "@/lib/admin/types";
import { getExpenseById } from "@/lib/admin/storage";
import ExpenseForm from "@/components/admin/ExpenseForm";

export default function EditExpensePage() {
  const params = useParams();
  const router = useRouter();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExpenseById(params.id as string).then((found) => {
      if (found) {
        setExpense(found);
      } else {
        router.push("/admin/expenses");
      }
      setLoading(false);
    });
  }, [params.id, router]);

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  if (!expense) return null;

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-primary-900 mb-6">
        Edit Expense
      </h1>
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <ExpenseForm expense={expense} />
      </div>
    </div>
  );
}
