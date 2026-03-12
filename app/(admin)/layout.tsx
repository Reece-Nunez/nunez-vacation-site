"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: HomeIcon },
  {
    href: "/admin/expenses",
    label: "Expenses",
    icon: ClipboardDocumentListIcon,
  },
  { href: "/admin/expenses/new", label: "Add Expense", icon: PlusCircleIcon },
  {
    href: "/admin/tax-report",
    label: "Schedule E Report",
    icon: DocumentTextIcon,
  },
  {
    href: "/admin/maintenance",
    label: "Maintenance",
    icon: WrenchScrewdriverIcon,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-primary-700">
          <h1 className="text-lg font-serif font-bold">NVH Admin</h1>
          <p className="text-primary-300 text-xs mt-1">Property Manager</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-700 text-white"
                    : "text-primary-300 hover:bg-primary-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-700">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary-300 hover:text-white text-sm transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
