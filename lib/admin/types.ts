export type ExpenseCategory =
  | "cleaning"
  | "maintenance"
  | "supplies"
  | "utilities"
  | "insurance"
  | "mortgage_interest"
  | "property_tax"
  | "hoa"
  | "management"
  | "advertising"
  | "travel"
  | "landscaping"
  | "furnishing"
  | "professional"
  | "other";

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, string> = {
  cleaning: "Cleaning",
  maintenance: "Maintenance & Repairs",
  supplies: "Supplies",
  utilities: "Utilities",
  insurance: "Insurance",
  mortgage_interest: "Mortgage Interest",
  property_tax: "Property Tax",
  hoa: "HOA / Community Fees",
  management: "Property Management",
  advertising: "Advertising & Listing Fees",
  travel: "Travel to Property",
  landscaping: "Landscaping & Pool",
  furnishing: "Furnishing & Decor",
  professional: "Professional Services",
  other: "Other",
};

// IRS Schedule E Part I line item mappings
export const SCHEDULE_E_LINES: Record<
  number,
  { label: string; categories: ExpenseCategory[] }
> = {
  5: { label: "Advertising", categories: ["advertising"] },
  6: { label: "Auto and travel", categories: ["travel"] },
  7: {
    label: "Cleaning and maintenance",
    categories: ["cleaning", "maintenance", "landscaping"],
  },
  9: { label: "Insurance", categories: ["insurance"] },
  10: {
    label: "Legal and other professional fees",
    categories: ["professional"],
  },
  11: { label: "Management fees", categories: ["management"] },
  12: { label: "Mortgage interest paid", categories: ["mortgage_interest"] },
  15: { label: "Supplies", categories: ["supplies"] },
  16: { label: "Taxes", categories: ["property_tax", "hoa"] },
  17: { label: "Utilities", categories: ["utilities"] },
  19: { label: "Other", categories: ["furnishing", "other"] },
};

export interface Expense {
  id: string;
  propertySlug: string;
  category: ExpenseCategory;
  amount: number; // stored in cents
  description: string;
  date: string; // YYYY-MM-DD
  vendor?: string;
  receiptNote?: string;
  receiptImage?: string; // base64 data URL
  taxDeductible: boolean;
  createdAt: string;
}

export type MaintenanceFrequency =
  | "one_time"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "quarterly"
  | "biannually"
  | "annually";

export const MAINTENANCE_FREQUENCIES: Record<MaintenanceFrequency, string> = {
  one_time: "One Time",
  weekly: "Weekly",
  biweekly: "Every 2 Weeks",
  monthly: "Monthly",
  quarterly: "Quarterly",
  biannually: "Every 6 Months",
  annually: "Annually",
};

export type MaintenanceStatus = "upcoming" | "overdue" | "completed";

export interface MaintenanceTask {
  id: string;
  propertySlug: string;
  title: string;
  description?: string;
  frequency: MaintenanceFrequency;
  lastCompleted?: string; // YYYY-MM-DD
  nextDue: string; // YYYY-MM-DD
  status: MaintenanceStatus;
  createdAt: string;
}
