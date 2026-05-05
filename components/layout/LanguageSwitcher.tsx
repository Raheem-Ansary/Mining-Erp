"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
      <Languages className="h-4 w-4 text-zinc-500" />
      <label className="sr-only" htmlFor="lang-switcher">
        {t("language.switch")}
      </label>
      <select
        id="lang-switcher"
        value={locale}
        onChange={(e) => setLocale(e.target.value as "dari" | "pashto")}
        className="bg-transparent text-sm outline-none"
      >
        <option value="dari">{t("language.dari")}</option>
        <option value="pashto">{t("language.pashto")}</option>
      </select>
    </div>
  );
}
