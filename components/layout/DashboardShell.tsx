"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm"
            aria-label={mobileMenuOpen ? "بستن منو" : "بازکردن منو"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileMenuOpen((s) => !s)}
            onFocus={() => setMobileMenuOpen(true)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="truncate text-sm font-semibold">{title}</div>
        </div>
        <JalaliClock compact />
      </div>

      {mobileMenuOpen ? (
        <div
          className="fixed inset-0 z-50 bg-zinc-900/35 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          role="presentation"
        >
          <aside
            id="mobile-nav-drawer"
            className="h-full w-72 max-w-[85vw] bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-zinc-900">منوی ناوبری</div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm"
                aria-label="بستن منو"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                داشبورد
              </Link>
              <Link
                href="/dashboard/employees"
                className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                کارکنان
              </Link>
              <Link
                href="/dashboard/attendance"
                className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                حضور و غیاب
              </Link>
              <Link
                href="/dashboard/leave"
                className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                مرخصی
              </Link>
            </nav>
          </aside>
        </div>
      ) : null}

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
