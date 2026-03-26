"use client";

import { useState, useEffect, useCallback } from "react";
import { EXPENSE_CATEGORIES, SavedCategory } from "./types";
import { getSavedCategories, saveSavedCategory, deleteSavedCategory } from "./recurring";

export function useCategories() {
  const [customCategories, setCustomCategories] = useState<SavedCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    getSavedCategories()
      .then(setCustomCategories)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Merge built-in + custom into a single Record<string, string>
  const allCategories: Record<string, string> = { ...EXPENSE_CATEGORIES };
  for (const cat of customCategories) {
    allCategories[cat.key] = cat.label;
  }

  async function addCategory(label: string): Promise<SavedCategory | null> {
    const key = label
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");
    if (!key) return null;
    if (allCategories[key]) return null; // already exists
    try {
      const saved = await saveSavedCategory(key, label.trim());
      load();
      return saved;
    } catch {
      return null;
    }
  }

  async function removeCategory(id: string): Promise<void> {
    await deleteSavedCategory(id);
    load();
  }

  function getCategoryLabel(key: string): string {
    return allCategories[key] || key;
  }

  return {
    allCategories,
    customCategories,
    loading,
    addCategory,
    removeCategory,
    getCategoryLabel,
    reload: load,
  };
}
