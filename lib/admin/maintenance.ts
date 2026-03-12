import { supabase } from "./supabase";
import { MaintenanceTask, MaintenanceFrequency } from "./types";

function toTask(row: Record<string, unknown>): MaintenanceTask {
  return {
    id: row.id as string,
    propertySlug: row.property_slug as string,
    title: row.title as string,
    description: (row.description as string) || undefined,
    frequency: row.frequency as MaintenanceFrequency,
    lastCompleted: (row.last_completed as string) || undefined,
    nextDue: row.next_due as string,
    status: row.status as MaintenanceTask["status"],
    createdAt: row.created_at as string,
  };
}

function toRow(data: Partial<Omit<MaintenanceTask, "id" | "createdAt">>) {
  const row: Record<string, unknown> = {};
  if (data.propertySlug !== undefined) row.property_slug = data.propertySlug;
  if (data.title !== undefined) row.title = data.title;
  if (data.description !== undefined)
    row.description = data.description || null;
  if (data.frequency !== undefined) row.frequency = data.frequency;
  if (data.lastCompleted !== undefined)
    row.last_completed = data.lastCompleted || null;
  if (data.nextDue !== undefined) row.next_due = data.nextDue;
  if (data.status !== undefined) row.status = data.status;
  return row;
}

export async function getMaintenanceTasks(): Promise<MaintenanceTask[]> {
  const { data, error } = await supabase
    .from("maintenance_tasks")
    .select("*")
    .order("next_due", { ascending: true });

  if (error) throw error;
  return (data || []).map(toTask);
}

export async function saveMaintenanceTask(
  data: Omit<MaintenanceTask, "id" | "createdAt">
): Promise<MaintenanceTask> {
  const { data: row, error } = await supabase
    .from("maintenance_tasks")
    .insert(toRow(data))
    .select()
    .single();

  if (error) throw error;
  return toTask(row);
}

export async function updateMaintenanceTask(
  id: string,
  updates: Partial<Omit<MaintenanceTask, "id" | "createdAt">>
): Promise<MaintenanceTask | null> {
  const { data: row, error } = await supabase
    .from("maintenance_tasks")
    .update(toRow(updates))
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return toTask(row);
}

export async function deleteMaintenanceTask(id: string): Promise<void> {
  const { error } = await supabase
    .from("maintenance_tasks")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export function calculateNextDue(
  frequency: MaintenanceFrequency,
  fromDate: string
): string {
  const d = new Date(fromDate + "T00:00:00");
  switch (frequency) {
    case "weekly":
      d.setDate(d.getDate() + 7);
      break;
    case "biweekly":
      d.setDate(d.getDate() + 14);
      break;
    case "monthly":
      d.setMonth(d.getMonth() + 1);
      break;
    case "quarterly":
      d.setMonth(d.getMonth() + 3);
      break;
    case "biannually":
      d.setMonth(d.getMonth() + 6);
      break;
    case "annually":
      d.setFullYear(d.getFullYear() + 1);
      break;
    case "one_time":
      break;
  }
  return d.toISOString().split("T")[0];
}
