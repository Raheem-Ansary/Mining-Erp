"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronLeft } from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";
import { JalaliClock } from "./JalaliClock";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { RoleSwitcher } from "./RoleSwitcher";
import { getVisibleNavGroups, navGroups } from "@/lib/navigation";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useRole } from "@/components/providers/RoleProvider";
import { roleText } from "@/lib/roles";

export function DashboardShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, locale } = useLocale();
  const { roleDefinition } = useRole();
  const navItems = useMemo(
    () => getVisibleNavGroups(roleDefinition.modules),
    [roleDefinition.modules],
  );

  useEffect(() => {
    const allowedPaths = new Set(navItems.flatMap((group) => group.items.map((item) => item.href)));
    if (!allowedPaths.has(pathname)) {
      router.replace(roleDefinition.homePath);
    }
  }, [navItems, pathname, roleDefinition.homePath, router]);

  const title = useMemo(() => {
    for (const g of navGroups) {
      const found = g.items.find((i) => i.href === pathname);
      if (found) return t(found.labelKey);
    }
    return t("sidebar.overview");
  }, [pathname, t]);

  return (
    <div className="sheet flex min-h-dvh bg-[radial-gradient(circle_at_top_right,oklch(0.95_0.03_82),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,244,245,0.98))]">
      <DashboardSidebar />

      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 border-b border-zinc-200/80 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm"
            aria-label={mobileMenuOpen ? "بستن منو" : "بازکردن منو"}
            aria-expanded={mobileMenuOpen}
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
        <div className="fixed inset-0 z-50 bg-zinc-900/35 lg:hidden" onClick={() => setMobileMenuOpen(false)} role="presentation">
          <aside className="h-full w-72 max-w-[85vw] overflow-auto bg-white p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-zinc-900">{t("app.title")}</div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm"
                aria-label="بستن منو"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-3 space-y-3">
              <RoleSwitcher />
              <LanguageSwitcher />
            </div>
            <nav className="space-y-3">
              {navItems.map((group) => (
                <div key={group.titleKey}>
                  <div className="mb-1 px-2 text-xs font-semibold text-zinc-500">{t(group.titleKey)}</div>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3 py-2 text-sm hover:bg-zinc-100"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 hidden items-center justify-between gap-6 border-b border-zinc-200/70 bg-white/75 px-6 py-5 backdrop-blur lg:flex">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              <span>{roleText(locale, roleDefinition.chip)}</span>
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>{t("app.title")}</span>
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">{title}</div>
            <div className="mt-1 text-sm text-zinc-600">{roleText(locale, roleDefinition.description)}</div>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcher />
            <LanguageSwitcher />
            <JalaliClock />
          </div>
        </header>

        <main className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-10 lg:pb-12 lg:pt-8">
          <div className="mx-auto max-w-7xl space-y-6 pt-14 lg:pt-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
