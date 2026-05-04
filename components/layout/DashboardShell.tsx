"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";
import { JalaliClock } from "./JalaliClock";

const subtitles: Partial<Record<string, string>> = {
  "/dashboard": "خلاصه وضعیت نیروی انسانی و عملیات میدانی امروز",
  "/dashboard/employees": "فهرست، افزودن و ویرایش اطلاعات پایهٔ کارکنان",
  "/dashboard/attendance": "ثبت ورود/خروج و تاریخچهٔ حضور کارکنان",
  "/dashboard/leave": "ثبت درخواست‌ها و تأیید/رد برای مدیر",
};

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const titleForPath: Record<string, string> = {
    "/dashboard": "داشبورد",
    "/dashboard/employees": "کارکنان",
    "/dashboard/attendance": "حضور و غیاب",
    "/dashboard/leave": "مرخصی",
  };
  const title = titleForPath[pathname] ?? "داشبورد";
  const subtitle = subtitles[pathname] ?? "";

  return (
    <div className="sheet flex min-h-dvh">
      <DashboardSidebar />

      {/* mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 border-b border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          <details className="relative">
            <summary className="list-none [&::-webkit-details-marker]:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm"
                aria-label="بازکردن منو"
              >
                <Menu className="h-5 w-5" />
              </button>
            </summary>
            <div className="absolute start-0 z-50 mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl">
              <div className="space-y-1">
                <Link href="/dashboard" className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-100">
                  داشبورد
                </Link>
                <Link href="/dashboard/employees" className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-100">
                  کارکنان
                </Link>
                <Link href="/dashboard/attendance" className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-100">
                  حضور و غیاب
                </Link>
                <Link href="/dashboard/leave" className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-100">
                  مرخصی
                </Link>
              </div>
            </div>
          </details>
          <div className="truncate text-sm font-semibold">{title}</div>
        </div>
        <JalaliClock compact />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 hidden items-center justify-between gap-6 border-b border-zinc-200 bg-white/80 px-6 py-5 backdrop-blur lg:flex">
          <div className="min-w-0">
            <div className="text-2xl font-semibold tracking-tight text-zinc-950">{title}</div>
            {subtitle ? <div className="mt-1 text-sm text-zinc-600">{subtitle}</div> : null}
          </div>
          <JalaliClock />
        </header>

        <main className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-8">
          <div className="mx-auto max-w-7xl space-y-6 pt-14 lg:pt-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
