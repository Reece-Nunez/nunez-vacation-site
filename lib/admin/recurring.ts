import { supabase } from "./supabase";
import { RecurringExpense, SavedCategory, SavedVendor } from "./types";

// ---------------------------------------------------------------------------
// RecurringExpense helpers
// ---------------------------------------------------------------------------

function toRecurringExpense(row: Record<string, unknown>): RecurringExpense {
  return {
    id: row.id as string,
    propertySlug: row.property_slug as string,
    category: row.category as RecurringExpense["category"],
    amount: row.amount as number,
    description: row.description as string,
    vendor: (row.vendor as string) || undefined,
    frequency: row.frequency as RecurringExpense["frequency"],
    active: row.active as boolean,
    createdAt: row.created_at as string,
  };
}

function toRecurringRow(
  data: Partial<Omit<RecurringExpense, "id" | "createdAt">>
) {
  const row: Record<string, unknown> = {};
  if (data.propertySlug !== undefined) row.property_slug = data.propertySlug;
  if (data.category !== undefined) row.category = data.category;
  if (data.amount !== undefined) row.amount = data.amount;
  if (data.description !== undefined) row.description = data.description;
  if (data.vendor !== undefined) row.vendor = data.vendor || null;
  if (data.frequency !== undefined) row.frequency = data.frequency;
  if (data.active !== undefined) row.active = data.active;
  return row;
}

export async function getRecurringExpenses(): Promise<RecurringExpense[]> {
  const { data, error } = await supabase
    .from("recurring_expenses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(toRecurringExpense);
}

export async function saveRecurringExpense(
  data: Omit<RecurringExpense, "id" | "createdAt">
): Promise<RecurringExpense> {
  const { data: row, error } = await supabase
    .from("recurring_expenses")
    .insert(toRecurringRow(data))
    .select()
    .single();

  if (error) throw error;
  return toRecurringExpense(row);
}

export async function updateRecurringExpense(
  id: string,
  updates: Partial<Omit<RecurringExpense, "id" | "createdAt">>
): Promise<RecurringExpense | null> {
  const { data: row, error } = await supabase
    .from("recurring_expenses")
    .update(toRecurringRow(updates))
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return toRecurringExpense(row);
}

export async function deleteRecurringExpense(id: string): Promise<void> {
  const { error } = await supabase
    .from("recurring_expenses")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// SavedVendor helpers
// ---------------------------------------------------------------------------

function toVendor(row: Record<string, unknown>): SavedVendor {
  return {
    id: row.id as string,
    name: row.name as string,
    createdAt: row.created_at as string,
  };
}

export async function getSavedVendors(): Promise<SavedVendor[]> {
  const { data, error } = await supabase
    .from("saved_vendors")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return (data || []).map(toVendor);
}

export async function saveSavedVendor(name: string): Promise<SavedVendor> {
  const { data: row, error } = await supabase
    .from("saved_vendors")
    .insert({ name })
    .select()
    .single();

  if (error) throw error;
  return toVendor(row);
}

export async function deleteSavedVendor(id: string): Promise<void> {
  const { error } = await supabase
    .from("saved_vendors")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// SavedCategory helpers
// ---------------------------------------------------------------------------

function toCategory(row: Record<string, unknown>): SavedCategory {
  return {
    id: row.id as string,
    key: row.key as string,
    label: row.label as string,
    createdAt: row.created_at as string,
  };
}

export async function getSavedCategories(): Promise<SavedCategory[]> {
  const { data, error } = await supabase
    .from("saved_categories")
    .select("*")
    .order("label", { ascending: true });

  if (error) throw error;
  return (data || []).map(toCategory);
}

export async function saveSavedCategory(
  key: string,
  label: string
): Promise<SavedCategory> {
  const { data: row, error } = await supabase
    .from("saved_categories")
    .insert({ key, label })
    .select()
    .single();

  if (error) throw error;
  return toCategory(row);
}

export async function deleteSavedCategory(id: string): Promise<void> {
  const { error } = await supabase
    .from("saved_categories")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
