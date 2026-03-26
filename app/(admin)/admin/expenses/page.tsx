"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  PlusCircleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { properties } from "@/lib/data";
import { Expense } from "@/lib/admin/types";
import { useCategories } from "@/lib/admin/useCategories";
import { getExpenses, exportExpensesCSV, formatCents } from "@/lib/admin/storage";
import ExpenseTable from "@/components/admin/ExpenseTable";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [propertyFilter, setPropertyFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<number>(
    new Date().getFullYear()
  );
  const { allCategories } = useCategories();

  const loadExpenses = useCallback(() => {
    getExpenses()
      .then(setExpenses)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const years = useMemo(() => {
    const set = new Set(expenses.map((e) => new Date(e.date).getFullYear()));
    set.add(new Date().getFullYear());
    return Array.from(set).sort((a, b) => b - a);
  }, [expenses]);

  const filtered = useMemo(() => {
    return expenses
      .filter((e) => {
        if (propertyFilter !== "all" && e.propertySlug !== propertyFilter)
          return false;
        if (categoryFilter !== "all" && e.category !== categoryFilter)
          return false;
        if (new Date(e.date).getFullYear() !== yearFilter) return false;
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [expenses, propertyFilter, categoryFilter, yearFilter]);

  function handleExport() {
    const csv = exportExpensesCSV(filtered);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nvh-expenses-${yearFilter}${propertyFilter !== "all" ? `-${propertyFilter}` : ""}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const selectClass =
    "border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white";

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-primary-900">
          Expenses
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export CSV
          </button>
          <Link
            href="/admin/expenses/new"
            className="flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <PlusCircleIcon className="w-5 h-5" />
            Add Expense
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={propertyFilter}
          onChange={(e) => setPropertyFilter(e.target.value)}
          className={selectClass}
        >
          <option value="all">All Properties</option>
          {properties.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={selectClass}
        >
          <option value="all">All Categories</option>
          {Object.entries(allCategories).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(Number(e.target.value))}
          className={selectClass}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <span className="text-sm text-gray-400 ml-2">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} ·{" "}
          {formatCents(filtered.reduce((s, e) => s + e.amount, 0))}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <ExpenseTable expenses={filtered} onDelete={loadExpenses} />
      </div>
    </div>
  );
}
