"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pickaxe, Sparkles } from "lucide-react";
import { getVisibleNavGroups } from "@/lib/navigation";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useRole } from "@/components/providers/RoleProvider";
import { roleText } from "@/lib/roles";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { t, locale } = useLocale();
  const { roleDefinition } = useRole();
  const navGroups = getVisibleNavGroups(roleDefinition.modules);
  const workspaceLabel = locale === "pashto" ? "کاري چاپېریال" : "محیط کاری";

  return (
    <aside className="sticky top-0 hidden h-dvh w-80 shrink-0 flex-col border-l border-zinc-200/80 bg-white/88 px-4 py-6 backdrop-blur lg:flex">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,oklch(0.28_0.03_255),oklch(0.41_0.06_250))] text-white shadow-lg shadow-zinc-900/15">
          <Pickaxe className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-zinc-900">{t("app.title")}</div>
          <div className="truncate text-xs text-zinc-500">{t("app.tagline")}</div>
        </div>
      </div>

      <div className="mt-5 rounded-3xl border border-zinc-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(246,246,247,0.98))] p-4 shadow-sm shadow-zinc-900/5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
          <Sparkles className="h-3.5 w-3.5" />
          {workspaceLabel}
        </div>
        <div className="mt-3 text-base font-semibold text-zinc-950">
          {roleText(locale, roleDefinition.label)}
        </div>
        <div className="mt-1 text-sm leading-relaxed text-zinc-600">
          {roleText(locale, roleDefinition.description)}
        </div>
      </div>

      <nav className="mt-6 flex-1 space-y-4 overflow-auto pe-1">
        {navGroups.map((group) => (
          <div key={group.titleKey}>
            <div className="mb-1 px-2 text-xs font-semibold text-zinc-500">{t(group.titleKey)}</div>
            <div className="space-y-1">
              {group.items.map(({ href, labelKey, icon: Icon }) => {
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
                    <Icon className="h-4.5 w-4.5 opacity-90" />
                    {t(labelKey)}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50/90 px-4 py-3 text-xs leading-relaxed text-zinc-500">
        {roleText(locale, roleDefinition.chip)}
      </div>
    </aside>
  );
}
