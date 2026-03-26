"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CameraIcon, XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { properties } from "@/lib/data";
import {
  Expense,
  ExpenseCategory,
  EXPENSE_CATEGORIES,
  SavedVendor,
} from "@/lib/admin/types";
import { saveExpense, updateExpense } from "@/lib/admin/storage";
import { useCategories } from "@/lib/admin/useCategories";
import { getSavedVendors, saveSavedVendor, deleteSavedVendor } from "@/lib/admin/recurring";
import { compressImage } from "@/lib/admin/image";

interface ExpenseFormProps {
  expense?: Expense;
}

export default function ExpenseForm({ expense }: ExpenseFormProps) {
  const router = useRouter();
  const isEditing = !!expense;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [propertySlug, setPropertySlug] = useState(
    expense?.propertySlug || ""
  );
  const [category, setCategory] = useState<string>(
    expense?.category || ""
  );
  const [amount, setAmount] = useState(
    expense ? (expense.amount / 100).toFixed(2) : ""
  );
  const [description, setDescription] = useState(expense?.description || "");
  const [date, setDate] = useState(
    expense?.date || new Date().toISOString().split("T")[0]
  );
  const [vendor, setVendor] = useState(expense?.vendor || "");
  const [receiptNote, setReceiptNote] = useState(expense?.receiptNote || "");
  const [receiptImage, setReceiptImage] = useState<string | undefined>(
    expense?.receiptImage
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [taxDeductible, setTaxDeductible] = useState(
    expense?.taxDeductible ?? true
  );

  const { allCategories, customCategories, addCategory, removeCategory } = useCategories();
  const [vendors, setVendors] = useState<SavedVendor[]>([]);
  const [newCategoryLabel, setNewCategoryLabel] = useState("");

  useEffect(() => {
    getSavedVendors().then(setVendors).catch(() => {});
  }, []);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setImageLoading(true);
    try {
      const compressed = await compressImage(file);
      setReceiptImage(compressed);
    } catch {
      toast.error("Failed to process image");
    } finally {
      setImageLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!propertySlug || !category || !amount || !description || !date) {
      toast.error("Please fill in all required fields");
      return;
    }

    const amountCents = Math.round(parseFloat(amount) * 100);
    if (isNaN(amountCents) || amountCents <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const data = {
      propertySlug,
      category,
      amount: amountCents,
      description,
      date,
      vendor: vendor || undefined,
      receiptNote: receiptNote || undefined,
      receiptImage: receiptImage || undefined,
      taxDeductible,
    };

    setSubmitting(true);
    try {
      if (isEditing && expense) {
        await updateExpense(expense.id, data);
        toast.success("Expense updated");
      } else {
        await saveExpense(data);
        toast.success("Expense added");
      }
      router.push("/admin/expenses");
    } catch {
      toast.error("Failed to save expense. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            Property <span className="text-red-500">*</span>
          </label>
          <select
            value={propertySlug}
            onChange={(e) => setPropertySlug(e.target.value)}
            className={inputClass}
          >
            <option value="">Select property...</option>
            {properties.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            <option value="">Select category...</option>
            {Object.entries(allCategories).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={newCategoryLabel}
                  onChange={(e) => setNewCategoryLabel(e.target.value)}
                  placeholder="New category name"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs"
                />
                <button
                  type="button"
                  onClick={async () => {
                    if (!newCategoryLabel.trim()) return;
                    const saved = await addCategory(newCategoryLabel);
                    if (saved) {
                      toast.success(`Category "${saved.label}" added`);
                      setNewCategoryLabel("");
                    } else {
                      toast.error("Category already exists or invalid name");
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

        <div>
          <label className={labelClass}>
            Amount ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Description <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Turnover cleaning after guest checkout"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Vendor</label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              list="vendor-list"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="Select or type vendor"
              className={inputClass}
            />
            <datalist id="vendor-list">
              {vendors.map((v) => (
                <option key={v.id} value={v.name} />
              ))}
            </datalist>
          </div>
          <button
            type="button"
            onClick={async () => {
              const name = vendor.trim();
              if (!name) return;
              if (vendors.some((v) => v.name.toLowerCase() === name.toLowerCase())) {
                toast.error("Vendor already saved");
                return;
              }
              try {
                await saveSavedVendor(name);
                toast.success(`Vendor "${name}" saved`);
                const updated = await getSavedVendors();
                setVendors(updated);
              } catch {
                toast.error("Failed to save vendor");
              }
            }}
            disabled={!vendor.trim()}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2.5 rounded-lg whitespace-nowrap disabled:opacity-40"
          >
            Save Vendor
          </button>
        </div>
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
                  onClick={async () => {
                    try {
                      await deleteSavedVendor(v.id);
                      toast.success(`Vendor "${v.name}" removed`);
                      const updated = await getSavedVendors();
                      setVendors(updated);
                    } catch {
                      toast.error("Failed to remove vendor");
                    }
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

      {/* Receipt Photo */}
      <div>
        <label className={labelClass}>Receipt Photo</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
          className="hidden"
        />

        {receiptImage ? (
          <div className="relative inline-block">
            <img
              src={receiptImage}
              alt="Receipt"
              className="max-w-xs max-h-64 rounded-lg border border-gray-200 object-contain"
            />
            <button
              type="button"
              onClick={() => {
                setReceiptImage(undefined);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={imageLoading}
              className="flex items-center gap-2 border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-lg px-4 py-3 text-sm text-gray-500 hover:text-primary-700 transition-colors"
            >
              <CameraIcon className="w-5 h-5" />
              {imageLoading ? "Processing..." : "Take Photo"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.removeAttribute("capture");
                  fileInputRef.current.click();
                  fileInputRef.current.setAttribute("capture", "environment");
                }
              }}
              disabled={imageLoading}
              className="flex items-center gap-2 border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-lg px-4 py-3 text-sm text-gray-500 hover:text-primary-700 transition-colors"
            >
              <PhotoIcon className="w-5 h-5" />
              Upload Image
            </button>
          </div>
        )}
      </div>

      <div>
        <label className={labelClass}>Receipt / Notes</label>
        <textarea
          value={receiptNote}
          onChange={(e) => setReceiptNote(e.target.value)}
          placeholder="Any notes about this expense or receipt info..."
          rows={3}
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="taxDeductible"
          checked={taxDeductible}
          onChange={(e) => setTaxDeductible(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
        />
        <label htmlFor="taxDeductible" className="text-sm text-gray-700">
          Tax deductible
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary-700 hover:bg-primary-800 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
        >
          {submitting
            ? "Saving..."
            : isEditing
              ? "Update Expense"
              : "Add Expense"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/expenses")}
          className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2.5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
