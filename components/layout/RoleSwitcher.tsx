"use client";

import { ShieldCheck } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useRole } from "@/components/providers/RoleProvider";
import { roleDefinitions, roleText, type UserRole } from "@/lib/roles";

export function RoleSwitcher() {
  const { locale } = useLocale();
  const { role, setRole, roleDefinition } = useRole();
  const roleTitle = locale === "pashto" ? "رول" : "نقش";

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white/90 px-3 py-2 shadow-sm shadow-zinc-900/5">
      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,oklch(0.94_0.04_85),oklch(0.88_0.07_80))] text-zinc-900">
          <ShieldCheck className="h-4.5 w-4.5" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {roleTitle}
          </div>
          <label className="sr-only" htmlFor="role-switcher">
            {roleTitle}
          </label>
          <select
            id="role-switcher"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="max-w-[190px] truncate bg-transparent text-sm font-semibold text-zinc-900 outline-none"
          >
            {roleDefinitions.map((item) => (
              <option key={item.id} value={item.id}>
                {roleText(locale, item.label)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-2 text-xs leading-relaxed text-zinc-500">
        {roleText(locale, roleDefinition.description)}
      </div>
    </div>
  );
}
