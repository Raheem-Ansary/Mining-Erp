"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UsersRound,
  CalendarClock,
  Palmtree,
  Pickaxe,
} from "lucide-react";

const nav = [
  { href: "/dashboard", label: "داشبورد", Icon: LayoutDashboard },
  {
    href: "/dashboard/employees",
    label: "کارکنان",
    Icon: UsersRound,
  },
  {
    href: "/dashboard/attendance",
    label: "حضور و غیاب",
    Icon: CalendarClock,
  },
  { href: "/dashboard/leave", label: "مرخصی", Icon: Palmtree },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-l border-zinc-200/80 bg-white/90 px-4 py-6 backdrop-blur lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-950 text-white shadow-sm">
          <Pickaxe className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-zinc-900">
            سامانهٔ منابع انسانی
          </div>
          <div className="truncate text-xs text-zinc-500">پروژهٔ معدن (نمونه)</div>
        </div>
      </div>

      <nav className="mt-8 flex-1 space-y-1">
        {nav.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              <Icon className="h-5 w-5 opacity-90" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden pt-10 text-xs leading-relaxed text-zinc-400 lg:block">
        نمایش پیشنهادی برای معرفی؛ داده‌ها ساختگی هستند.
      </div>
    </aside>
  );
}
