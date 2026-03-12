"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  PlusCircleIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { properties } from "@/lib/data";
import { MaintenanceTask, MAINTENANCE_FREQUENCIES } from "@/lib/admin/types";
import {
  getMaintenanceTasks,
  updateMaintenanceTask,
  deleteMaintenanceTask,
  calculateNextDue,
} from "@/lib/admin/maintenance";

const propertyMap = Object.fromEntries(
  properties.map((p) => [p.slug, p.name])
);

export default function MaintenancePage() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [propertyFilter, setPropertyFilter] = useState<string>("all");

  const loadTasks = useCallback(() => {
    getMaintenanceTasks()
      .then(setTasks)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const today = new Date().toISOString().split("T")[0];

  const filtered = useMemo(() => {
    return tasks
      .filter(
        (t) => propertyFilter === "all" || t.propertySlug === propertyFilter
      )
      .map((t) => ({
        ...t,
        computedStatus:
          t.status === "completed"
            ? ("completed" as const)
            : t.nextDue <= today
              ? ("overdue" as const)
              : ("upcoming" as const),
      }))
      .sort((a, b) => {
        // Overdue first, then upcoming, then completed
        const order = { overdue: 0, upcoming: 1, completed: 2 };
        const diff = order[a.computedStatus] - order[b.computedStatus];
        if (diff !== 0) return diff;
        return a.nextDue.localeCompare(b.nextDue);
      });
  }, [tasks, propertyFilter, today]);

  async function handleComplete(task: MaintenanceTask) {
    try {
      const completedDate = today;
      if (task.frequency === "one_time") {
        await updateMaintenanceTask(task.id, {
          status: "completed",
          lastCompleted: completedDate,
        });
      } else {
        const newNextDue = calculateNextDue(task.frequency, completedDate);
        await updateMaintenanceTask(task.id, {
          status: "upcoming",
          lastCompleted: completedDate,
          nextDue: newNextDue,
        });
      }
      toast.success(`"${task.title}" marked as done`);
      loadTasks();
    } catch {
      toast.error("Failed to update task");
    }
  }

  async function handleDelete(task: MaintenanceTask) {
    if (!confirm(`Delete "${task.title}"?`)) return;
    try {
      await deleteMaintenanceTask(task.id);
      toast.success("Task deleted");
      loadTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  }

  const statusBadge = {
    overdue: "bg-red-100 text-red-700",
    upcoming: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  const statusLabel = {
    overdue: "Overdue",
    upcoming: "Upcoming",
    completed: "Done",
  };

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-primary-900">
          Maintenance
        </h1>
        <Link
          href="/admin/maintenance/new"
          className="flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Add Task
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={propertyFilter}
          onChange={(e) => setPropertyFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
        >
          <option value="all">All Properties</option>
          {properties.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-400">
          {filtered.filter((t) => t.computedStatus === "overdue").length}{" "}
          overdue ·{" "}
          {filtered.filter((t) => t.computedStatus === "upcoming").length}{" "}
          upcoming
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-soft p-6 text-center text-gray-400">
          <p className="text-lg">No maintenance tasks</p>
          <p className="text-sm mt-1">Add a task to start tracking.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-soft p-5 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-primary-900 truncate">
                    {task.title}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadge[task.computedStatus]}`}
                  >
                    {statusLabel[task.computedStatus]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                  <span>
                    {propertyMap[task.propertySlug] || task.propertySlug}
                  </span>
                  <span>{MAINTENANCE_FREQUENCIES[task.frequency]}</span>
                  <span>
                    Due:{" "}
                    <span
                      className={
                        task.computedStatus === "overdue"
                          ? "text-red-600 font-medium"
                          : ""
                      }
                    >
                      {task.nextDue}
                    </span>
                  </span>
                  {task.lastCompleted && (
                    <span>Last done: {task.lastCompleted}</span>
                  )}
                </div>
                {task.description && (
                  <p className="text-sm text-gray-400 mt-1">
                    {task.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {task.computedStatus !== "completed" && (
                  <button
                    onClick={() => handleComplete(task)}
                    className="text-green-500 hover:text-green-700 transition-colors p-1.5"
                    title="Mark as done"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-1.5"
                  title="Delete"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
