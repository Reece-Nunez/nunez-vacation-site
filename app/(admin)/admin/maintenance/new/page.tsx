"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { properties } from "@/lib/data";
import {
  MaintenanceFrequency,
  MAINTENANCE_FREQUENCIES,
} from "@/lib/admin/types";
import { saveMaintenanceTask } from "@/lib/admin/maintenance";

export default function NewMaintenanceTaskPage() {
  const router = useRouter();

  const [propertySlug, setPropertySlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<MaintenanceFrequency | "">(
    ""
  );
  const [nextDue, setNextDue] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!propertySlug || !title || !frequency || !nextDue) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await saveMaintenanceTask({
        propertySlug,
        title,
        description: description || undefined,
        frequency: frequency as MaintenanceFrequency,
        nextDue,
        status: "upcoming",
      });
      toast.success("Task added");
      router.push("/admin/maintenance");
    } catch {
      toast.error("Failed to save task");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-primary-900 mb-6">
        Add Maintenance Task
      </h1>
      <div className="bg-white rounded-2xl shadow-soft p-6">
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
                Frequency <span className="text-red-500">*</span>
              </label>
              <select
                value={frequency}
                onChange={(e) =>
                  setFrequency(e.target.value as MaintenanceFrequency)
                }
                className={inputClass}
              >
                <option value="">Select frequency...</option>
                {Object.entries(MAINTENANCE_FREQUENCIES).map(
                  ([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Task Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., HVAC filter replacement"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details, vendor info, part numbers..."
              rows={3}
              className={inputClass}
            />
          </div>

          <div className="max-w-xs">
            <label className={labelClass}>
              Next Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={nextDue}
              onChange={(e) => setNextDue(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary-700 hover:bg-primary-800 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Add Task"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/maintenance")}
              className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2.5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
