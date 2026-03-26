"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import {
  PlusCircleIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  CheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { properties } from "@/lib/data";
import {
  RecurringExpense,
  RecurringFrequency,
  RECURRING_FREQUENCIES,
  SavedVendor,
} from "@/lib/admin/types";
import { useCategories } from "@/lib/admin/useCategories";
import {
  getRecurringExpenses,
  saveRecurringExpense,
  updateRecurringExpense,
  deleteRecurringExpense,
  getSavedVendors,
  saveSavedVendor,
  deleteSavedVendor,
} from "@/lib/admin/recurring";
import { formatCents } from "@/lib/admin/storage";

const propertyMap = Object.fromEntries(
  properties.map((p) => [p.slug, p.name])
);

function toMonthly(amount: number, freq: RecurringFrequency): number {
  if (freq === "monthly") return amount;
  if (freq === "quarterly") return Math.round(amount / 3);
  return Math.round(amount / 12);
}

function toAnnual(amount: number, freq: RecurringFrequency): number {
  if (freq === "monthly") return amount * 12;
  if (freq === "quarterly") return amount * 4;
  return amount;
}

const inputClass = "border border-gray-300 rounded-lg px-4 py-2.5 text-sm";
const selectClass =
  "border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white";

interface FormState {
  propertySlug: string;
  category: string;
  amount: string;
  description: string;
  vendor: string;
  frequency: RecurringFrequency;
  active: boolean;
}

const emptyForm: FormState = {
  propertySlug: properties[0]?.slug ?? "",
  category: "other",
  amount: "",
  description: "",
  vendor: "",
  frequency: "monthly",
  active: true,
};

export default function RecurringExpensesPage() {
  const [expenses, setExpenses] = useState<RecurringExpense[]>([]);
  const [vendors, setVendors] = useState<SavedVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { allCategories, customCategories, addCategory, removeCategory, getCategoryLabel } = useCategories();

  const loadData = useCallback(() => {
    Promise.all([getRecurringExpenses(), getSavedVendors()])
      .then(([exp, vnd]) => {
        setExpenses(exp);
        setVendors(vnd);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ── Form Handlers ──

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(exp: RecurringExpense) {
    setEditingId(exp.id);
    setForm({
      propertySlug: exp.propertySlug,
      category: exp.category,
      amount: (exp.amount / 100).toFixed(2),
      description: exp.description,
      vendor: exp.vendor ?? "",
      frequency: exp.frequency,
      active: exp.active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cents = Math.round(parseFloat(form.amount) * 100);
    if (!cents || cents <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        propertySlug: form.propertySlug,
        category: form.category,
        amount: cents,
        description: form.description.trim(),
        vendor: form.vendor.trim() || undefined,
        frequency: form.frequency,
        active: form.active,
      };
      if (editingId) {
        await updateRecurringExpense(editingId, payload);
        toast.success("Recurring expense updated");
      } else {
        await saveRecurringExpense(payload);
        toast.success("Recurring expense added");
      }
      resetForm();
      loadData();
    } catch {
      toast.error("Failed to save recurring expense");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(exp: RecurringExpense) {
    try {
      await updateRecurringExpense(exp.id, { active: !exp.active });
      toast.success(exp.active ? "Expense paused" : "Expense activated");
      loadData();
    } catch {
      toast.error("Failed to update");
    }
  }

  async function handleDelete(exp: RecurringExpense) {
    if (!confirm(`Delete "${exp.description || "this expense"}"?`)) return;
    try {
      await deleteRecurringExpense(exp.id);
      toast.success("Recurring expense deleted");
      loadData();
    } catch {
      toast.error("Failed to delete");
    }
  }

  async function handleSaveVendor() {
    const name = form.vendor.trim();
    if (!name) return;
    if (vendors.some((v) => v.name.toLowerCase() === name.toLowerCase())) {
      toast.error("Vendor already saved");
      return;
    }
    try {
      await saveSavedVendor(name);
      toast.success(`Vendor "${name}" saved`);
      loadData();
    } catch {
      toast.error("Failed to save vendor");
    }
  }

  async function handleDeleteVendor(v: SavedVendor) {
    try {
      await deleteSavedVendor(v.id);
      toast.success(`Vendor "${v.name}" removed`);
      loadData();
    } catch {
      toast.error("Failed to remove vendor");
    }
  }

  // ── Computed Values ──

  const activeExpenses = useMemo(
    () => expenses.filter((e) => e.active),
    [expenses]
  );

  const monthlyTotal = useMemo(
    () => activeExpenses.reduce((s, e) => s + toMonthly(e.amount, e.frequency), 0),
    [activeExpenses]
  );

  const annualByCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of activeExpenses) {
      const annual = toAnnual(e.amount, e.frequency);
      map.set(e.category, (map.get(e.category) ?? 0) + annual);
    }
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([cat, total]) => ({ category: cat, total }));
  }, [activeExpenses]);

  const grandAnnualTotal = useMemo(
    () => annualByCategory.reduce((s, c) => s + c.total, 0),
    [annualByCategory]
  );

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-primary-900">
          Recurring Expenses
        </h1>
        <span className="text-sm text-gray-400">
          {activeExpenses.length} active / {expenses.length} total
        </span>
      </div>

      {/* ── Section 1: Add / Edit Form ── */}
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
        <h2 className="text-lg font-semibold text-primary-900 mb-4">
          {editingId ? "Edit Recurring Expense" : "Add Recurring Expense"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Property */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property
              </label>
              <select
                value={form.propertySlug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, propertySlug: e.target.value }))
                }
                className={`${selectClass} w-full`}
                required
              >
                {properties.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    category: e.target.value,
                  }))
                }
                className={`${selectClass} w-full`}
                required
              >
                {Object.entries(allCategories).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  placeholder="New category name"
                  id="new-cat-input"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs"
                />
                <button
                  type="button"
                  onClick={async () => {
                    const input = document.getElementById("new-cat-input") as HTMLInputElement;
                    const label = input?.value?.trim();
                    if (!label) return;
                    const saved = await addCategory(label);
                    if (saved) {
                      toast.success(`Category "${saved.label}" added`);
                      input.value = "";
                    } else {
                      toast.error("Category already exists or invalid");
                    }
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-lg whitespace-nowrap"
                >
                  + Add
                </button>
              </div>
              {customCategories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {customCategories.map((c) => (
                    <span
                      key={c.id}
                      className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {c.label}
                      <button
                        type="button"
                        onClick={async () => {
                          await removeCategory(c.id);
                          toast.success(`Category "${c.label}" removed`);
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amount: e.target.value }))
                }
                className={`${inputClass} w-full`}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                placeholder="e.g. Monthly pool cleaning"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className={`${inputClass} w-full`}
                required
              />
            </div>

            {/* Vendor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    list="vendor-list"
                    placeholder="Select or type vendor"
                    value={form.vendor}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, vendor: e.target.value }))
                    }
                    className={`${inputClass} w-full`}
                  />
                  <datalist id="vendor-list">
                    {vendors.map((v) => (
                      <option key={v.id} value={v.name} />
                    ))}
                  </datalist>
                </div>
                <button
                  type="button"
                  onClick={handleSaveVendor}
                  disabled={!form.vendor.trim()}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2.5 rounded-lg transition-colors whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Save Vendor
                </button>
              </div>
              {/* Saved vendors chips */}
              {vendors.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {vendors.map((v) => (
                    <span
                      key={v.id}
                      className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {v.name}
                      <button
                        type="button"
                        onClick={() => handleDeleteVendor(v)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title={`Remove ${v.name}`}
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                value={form.frequency}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    frequency: e.target.value as RecurringFrequency,
                  }))
                }
                className={`${selectClass} w-full`}
                required
              >
                {Object.entries(RECURRING_FREQUENCIES).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active checkbox */}
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm((f) => ({ ...f, active: e.target.checked }))
              }
              className="w-4 h-4 rounded border-gray-300 text-primary-700 focus:ring-primary-500"
            />
            Active
          </label>

          {/* Submit */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm disabled:opacity-60"
            >
              {editingId ? (
                <>
                  <CheckIcon className="w-4 h-4" />
                  Update Expense
                </>
              ) : (
                <>
                  <PlusCircleIcon className="w-5 h-5" />
                  Add Expense
                </>
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── Section 2: Monthly Summary + Table ── */}

      {/* Monthly Total Summary */}
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Estimated Monthly Total
            </p>
            <p className="text-3xl font-bold text-primary-900 mt-1">
              {formatCents(monthlyTotal)}
            </p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>
              <span className="font-semibold text-primary-900">
                {activeExpenses.length}
              </span>{" "}
              active
            </p>
            <p>
              <span className="font-semibold text-gray-600">
                {expenses.length - activeExpenses.length}
              </span>{" "}
              paused
            </p>
          </div>
        </div>
      </div>

      {/* Recurring Expenses Table */}
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
        <h2 className="text-lg font-semibold text-primary-900 mb-4">
          All Recurring Expenses
        </h2>
        {expenses.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p className="text-lg">No recurring expenses yet</p>
            <p className="text-sm mt-1">
              Add one above to start tracking.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500 uppercase tracking-wide text-xs">
                  <th className="pb-3 pr-4">Property</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4">Description</th>
                  <th className="pb-3 pr-4">Vendor</th>
                  <th className="pb-3 pr-4">Frequency</th>
                  <th className="pb-3 pr-4 text-right">Amount</th>
                  <th className="pb-3 pr-4 text-center">Active</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expenses
                  .sort((a, b) => {
                    if (a.active !== b.active) return a.active ? -1 : 1;
                    return a.description.localeCompare(b.description);
                  })
                  .map((exp) => (
                    <tr
                      key={exp.id}
                      className={`${!exp.active ? "opacity-50" : ""} hover:bg-gray-50 transition-colors`}
                    >
                      <td className="py-3 pr-4 font-medium text-primary-900">
                        {propertyMap[exp.propertySlug] || exp.propertySlug}
                      </td>
                      <td className="py-3 pr-4 text-gray-600">
                        {getCategoryLabel(exp.category)}
                      </td>
                      <td className="py-3 pr-4 text-gray-700">
                        {exp.description}
                      </td>
                      <td className="py-3 pr-4 text-gray-500">
                        {exp.vendor || "—"}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                          {RECURRING_FREQUENCIES[exp.frequency]}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-right font-medium text-gray-900">
                        {formatCents(exp.amount)}
                      </td>
                      <td className="py-3 pr-4 text-center">
                        <button
                          onClick={() => handleToggleActive(exp)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            exp.active ? "bg-primary-600" : "bg-gray-300"
                          }`}
                          title={exp.active ? "Pause" : "Activate"}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                              exp.active ? "translate-x-4" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => startEdit(exp)}
                            className="text-gray-400 hover:text-primary-700 transition-colors p-1.5"
                            title="Edit"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(exp)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1.5"
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Section 3: Annual Category Summary ── */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h2 className="text-lg font-semibold text-primary-900 mb-4">
          Annual Totals by Category
        </h2>
        {annualByCategory.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No active recurring expenses to summarize.
          </p>
        ) : (
          <div>
            <div className="space-y-3">
              {annualByCategory.map(({ category, total }) => (
                <div
                  key={category}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm text-gray-700">
                    {getCategoryLabel(category)}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCents(total)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 mt-3 border-t-2 border-gray-200">
              <span className="text-base font-bold text-primary-900">
                Grand Annual Total
              </span>
              <span className="text-base font-bold text-primary-900">
                {formatCents(grandAnnualTotal)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
