"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  PencilSquareIcon,
  TrashIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { properties } from "@/lib/data";
import { Expense } from "@/lib/admin/types";
import { useCategories } from "@/lib/admin/useCategories";
import { deleteExpense, formatCents } from "@/lib/admin/storage";

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: () => void;
}

const propertyMap = Object.fromEntries(
  properties.map((p) => [p.slug, p.name])
);

export default function ExpenseTable({
  expenses,
  onDelete,
}: ExpenseTableProps) {
  const { getCategoryLabel } = useCategories();
  async function handleDelete(expense: Expense) {
    if (
      !confirm(
        `Delete "${expense.description}" (${formatCents(expense.amount)})?`
      )
    ) {
      return;
    }
    try {
      await deleteExpense(expense.id);
      toast.success("Expense deleted");
      onDelete();
    } catch {
      toast.error("Failed to delete expense");
    }
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No expenses found</p>
        <p className="text-sm mt-1">
          Add your first expense to start tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-500">
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium">Property</th>
            <th className="pb-3 font-medium">Category</th>
            <th className="pb-3 font-medium">Description</th>
            <th className="pb-3 font-medium">Vendor</th>
            <th className="pb-3 font-medium text-right">Amount</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 pr-4 whitespace-nowrap">{expense.date}</td>
              <td className="py-3 pr-4 whitespace-nowrap">
                {propertyMap[expense.propertySlug] || expense.propertySlug}
              </td>
              <td className="py-3 pr-4 whitespace-nowrap">
                <span className="bg-primary-50 text-primary-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  {getCategoryLabel(expense.category)}
                </span>
              </td>
              <td className="py-3 pr-4">
                <span className="flex items-center gap-1.5">
                  {expense.description}
                  {expense.receiptImage && (
                    <CameraIcon
                      className="w-4 h-4 text-primary-500 shrink-0"
                      title="Has receipt photo"
                    />
                  )}
                </span>
              </td>
              <td className="py-3 pr-4 text-gray-500">
                {expense.vendor || "—"}
              </td>
              <td className="py-3 pr-4 text-right font-medium whitespace-nowrap">
                {formatCents(expense.amount)}
              </td>
              <td className="py-3 text-right whitespace-nowrap">
                <Link
                  href={`/admin/expenses/${expense.id}/edit`}
                  className="text-gray-400 hover:text-primary-700 transition-colors inline-block p-1"
                >
                  <PencilSquareIcon className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(expense)}
                  className="text-gray-400 hover:text-red-600 transition-colors inline-block p-1 ml-1"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-gray-200">
            <td colSpan={5} className="py-3 font-semibold text-primary-900">
              Total ({expenses.length} expense
              {expenses.length !== 1 ? "s" : ""})
            </td>
            <td className="py-3 text-right font-bold text-primary-900">
              {formatCents(expenses.reduce((sum, e) => sum + e.amount, 0))}
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
