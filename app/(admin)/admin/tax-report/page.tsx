"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { properties } from "@/lib/data";
import {
  Expense,
  SCHEDULE_E_LINES,
  EXPENSE_CATEGORIES,
} from "@/lib/admin/types";
import { getExpenses, formatCents } from "@/lib/admin/storage";

export default function TaxReportPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedProperty, setSelectedProperty] = useState(
    properties[0]?.slug || ""
  );

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

  const filtered = useMemo(
    () =>
      expenses.filter(
        (e) =>
          e.propertySlug === selectedProperty &&
          new Date(e.date).getFullYear() === selectedYear &&
          e.taxDeductible
      ),
    [expenses, selectedProperty, selectedYear]
  );

  const lineItems = useMemo(() => {
    return Object.entries(SCHEDULE_E_LINES)
      .map(([line, { label, categories }]) => {
        const lineExpenses = filtered.filter((e) =>
          (categories as string[]).includes(e.category)
        );
        const total = lineExpenses.reduce((sum, e) => sum + e.amount, 0);
        return {
          line: Number(line),
          label,
          total,
          expenses: lineExpenses,
          categories,
        };
      })
      .filter((item) => item.total > 0 || true); // show all lines
  }, [filtered]);

  const totalExpenses = lineItems.reduce((sum, item) => sum + item.total, 0);

  // Find categories not mapped to any Schedule E line
  const unmappedCategories = useMemo(() => {
    const mapped = new Set(
      Object.values(SCHEDULE_E_LINES).flatMap((l) => l.categories)
    );
    return filtered.filter((e) => !mapped.has(e.category as import("@/lib/admin/types").ExpenseCategory));
  }, [filtered]);

  function handlePrint() {
    window.print();
  }

  const propertyName =
    properties.find((p) => p.slug === selectedProperty)?.name || "";

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 print:hidden">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary-900">
            Schedule E Report
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            IRS Schedule E Part I — Rental Real Estate
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {properties.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
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
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Printable report */}
      <div className="bg-white rounded-2xl shadow-soft p-8 print:shadow-none print:p-0">
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-primary-900">
            Schedule E — Supplemental Income and Loss
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Part I: Income or Loss From Rental Real Estate
          </p>
          <div className="flex gap-8 mt-3 text-sm">
            <span>
              <span className="text-gray-500">Property:</span>{" "}
              <span className="font-semibold">{propertyName}</span>
            </span>
            <span>
              <span className="text-gray-500">Tax Year:</span>{" "}
              <span className="font-semibold">{selectedYear}</span>
            </span>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3 font-medium w-16">Line</th>
              <th className="pb-3 font-medium">Description</th>
              <th className="pb-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item) => (
              <tr
                key={item.line}
                className={`border-b border-gray-100 ${
                  item.total > 0 ? "" : "text-gray-300"
                }`}
              >
                <td className="py-3 pr-4">{item.line}</td>
                <td className="py-3 pr-4">
                  <div>{item.label}</div>
                  {item.total > 0 && (
                    <div className="text-xs text-gray-400 mt-0.5">
                      {item.categories
                        .filter((c) =>
                          filtered.some((e) => e.category === c)
                        )
                        .map((c) => EXPENSE_CATEGORIES[c])
                        .join(", ")}
                    </div>
                  )}
                </td>
                <td className="py-3 text-right font-medium">
                  {item.total > 0 ? formatCents(item.total) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300">
              <td className="py-4 font-bold">20</td>
              <td className="py-4 font-bold text-primary-900">
                Total expenses
              </td>
              <td className="py-4 text-right font-bold text-primary-900 text-base">
                {formatCents(totalExpenses)}
              </td>
            </tr>
          </tfoot>
        </table>

        {unmappedCategories.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-amber-600 mb-2">
              Note: {unmappedCategories.length} expense
              {unmappedCategories.length !== 1 ? "s" : ""} not mapped to a
              Schedule E line item (included in Line 19 — Other)
            </p>
          </div>
        )}

        {/* Detailed breakdown */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
            Detailed Breakdown by Category
          </h3>
          {lineItems
            .filter((item) => item.total > 0)
            .map((item) => (
              <div key={item.line} className="mb-6">
                <h4 className="text-sm font-semibold text-primary-900 mb-2">
                  Line {item.line}: {item.label} —{" "}
                  {formatCents(item.total)}
                </h4>
                <table className="w-full text-xs ml-4">
                  <thead>
                    <tr className="text-gray-400 text-left">
                      <th className="pb-1 font-medium">Date</th>
                      <th className="pb-1 font-medium">Description</th>
                      <th className="pb-1 font-medium">Vendor</th>
                      <th className="pb-1 font-medium text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.expenses
                      .sort((a, b) => a.date.localeCompare(b.date))
                      .map((expense) => (
                        <tr
                          key={expense.id}
                          className="border-b border-gray-50"
                        >
                          <td className="py-1.5 pr-3">{expense.date}</td>
                          <td className="py-1.5 pr-3">
                            {expense.description}
                          </td>
                          <td className="py-1.5 pr-3 text-gray-500">
                            {expense.vendor || "—"}
                          </td>
                          <td className="py-1.5 text-right">
                            {formatCents(expense.amount)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
