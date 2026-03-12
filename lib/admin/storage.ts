import { supabase } from "./supabase";
import { Expense } from "./types";
import { properties } from "@/lib/data";

// Map between camelCase (frontend) and snake_case (database)
function toExpense(row: Record<string, unknown>): Expense {
  return {
    id: row.id as string,
    propertySlug: row.property_slug as string,
    category: row.category as Expense["category"],
    amount: row.amount as number,
    description: row.description as string,
    date: row.date as string,
    vendor: (row.vendor as string) || undefined,
    receiptNote: (row.receipt_note as string) || undefined,
    receiptImage: (row.receipt_image as string) || undefined,
    taxDeductible: row.tax_deductible as boolean,
    createdAt: row.created_at as string,
  };
}

function toRow(data: Partial<Omit<Expense, "id" | "createdAt">>) {
  const row: Record<string, unknown> = {};
  if (data.propertySlug !== undefined) row.property_slug = data.propertySlug;
  if (data.category !== undefined) row.category = data.category;
  if (data.amount !== undefined) row.amount = data.amount;
  if (data.description !== undefined) row.description = data.description;
  if (data.date !== undefined) row.date = data.date;
  if (data.vendor !== undefined) row.vendor = data.vendor || null;
  if (data.receiptNote !== undefined)
    row.receipt_note = data.receiptNote || null;
  if (data.receiptImage !== undefined)
    row.receipt_image = data.receiptImage || null;
  if (data.taxDeductible !== undefined)
    row.tax_deductible = data.taxDeductible;
  return row;
}

export async function getExpenses(): Promise<Expense[]> {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return (data || []).map(toExpense);
}

export async function getExpenseById(
  id: string
): Promise<Expense | undefined> {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return undefined;
  return toExpense(data);
}

export async function saveExpense(
  data: Omit<Expense, "id" | "createdAt">
): Promise<Expense> {
  const { data: row, error } = await supabase
    .from("expenses")
    .insert(toRow(data))
    .select()
    .single();

  if (error) throw error;
  return toExpense(row);
}

export async function updateExpense(
  id: string,
  updates: Partial<Omit<Expense, "id" | "createdAt">>
): Promise<Expense | null> {
  const { data: row, error } = await supabase
    .from("expenses")
    .update(toRow(updates))
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return toExpense(row);
}

export async function deleteExpense(id: string): Promise<void> {
  const { error } = await supabase.from("expenses").delete().eq("id", id);
  if (error) throw error;
}

export function exportExpensesCSV(expenses: Expense[]): string {
  const propertyMap = Object.fromEntries(
    properties.map((p) => [p.slug, p.name])
  );

  const headers = [
    "Property",
    "Date",
    "Category",
    "Description",
    "Vendor",
    "Amount",
    "Tax Deductible",
  ];

  const rows = expenses.map((e) => [
    propertyMap[e.propertySlug] || e.propertySlug,
    e.date,
    e.category,
    `"${e.description.replace(/"/g, '""')}"`,
    e.vendor ? `"${e.vendor.replace(/"/g, '""')}"` : "",
    (e.amount / 100).toFixed(2),
    e.taxDeductible ? "Yes" : "No",
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
