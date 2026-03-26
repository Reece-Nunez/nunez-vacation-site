"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { properties } from "@/lib/data";
import { Expense } from "@/lib/admin/types";
import { useCategories } from "@/lib/admin/useCategories";
import { getExpenses, formatCents } from "@/lib/admin/storage";

export default function AdminDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { allCategories } = useCategories();

  useEffect(() => {
    getExpenses()
      .then(setExpenses)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const years = useMemo(() => {
    const set = new Set(expenses.map((e) => new Date(e.date).getFullYear()));
    set.add(new Date().getFullYear());
    return Array.from(set).sort((a, b) => b - a);
  }, [expenses]);

  const yearExpenses = useMemo(
    () =>
      expenses.filter(
        (e) => new Date(e.date).getFullYear() === selectedYear
      ),
    [expenses, selectedYear]
  );

  function getPropertyStats(slug: string) {
    const propExpenses = yearExpenses.filter(
      (e) => e.propertySlug === slug
    );
    const total = propExpenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory = Object.entries(allCategories)
      .map(([key, label]) => {
        const catTotal = propExpenses
          .filter((e) => e.category === key)
          .reduce((sum, e) => sum + e.amount, 0);
        return { key, label, total: catTotal };
      })
      .filter((c) => c.total > 0);
    byCategory.sort((a, b) => b.total - a.total);
    return { total, count: propExpenses.length, byCategory };
  }

  const grandTotal = yearExpenses.reduce((sum, e) => sum + e.amount, 0);

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary-900">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Expense overview for tax year {selectedYear}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <Link
            href="/admin/expenses/new"
            className="flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <PlusCircleIcon className="w-5 h-5" />
            Add Expense
          </Link>
        </div>
      </div>

      {/* Grand total card */}
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
        <p className="text-sm text-gray-500">
          Total Expenses ({selectedYear})
        </p>
        <p className="text-3xl font-bold text-primary-900 mt-1">
          {formatCents(grandTotal)}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {yearExpenses.length} expense
          {yearExpenses.length !== 1 ? "s" : ""} across {properties.length}{" "}
          properties
        </p>
      </div>

      {/* Per-property breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {properties.map((property) => {
          const stats = getPropertyStats(property.slug);
          return (
            <div
              key={property.slug}
              className="bg-white rounded-2xl shadow-soft p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-serif font-bold text-primary-900">
                  {property.name}
                </h2>
                <span className="text-xl font-bold text-primary-700">
                  {formatCents(stats.total)}
                </span>
              </div>

              {stats.byCategory.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No expenses recorded for {selectedYear}
                </p>
              ) : (
                <div className="space-y-3">
                  {stats.byCategory.map((cat) => {
                    const pct =
                      stats.total > 0
                        ? (cat.total / stats.total) * 100
                        : 0;
                    return (
                      <div key={cat.key}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">{cat.label}</span>
                          <span className="font-medium text-gray-900">
                            {formatCents(cat.total)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <p className="text-xs text-gray-400 mt-4">
                {stats.count} expense{stats.count !== 1 ? "s" : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
