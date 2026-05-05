"use client";
import { Card } from "@/components/ui/Card";
import { formatCurrencyAFN, formatNumber } from "@/lib/format";
import { useLocale } from "@/components/providers/LocaleProvider";

type KpiItem = {
  label: string;
  value: number | string;
  currency?: boolean;
  note?: string;
  tone?: "slate" | "amber" | "emerald" | "sky";
};

const toneMap: Record<NonNullable<KpiItem["tone"]>, string> = {
  slate: "from-zinc-950/5 to-zinc-950/0",
  amber: "from-amber-500/10 to-amber-500/0",
  emerald: "from-emerald-500/10 to-emerald-500/0",
  sky: "from-sky-500/10 to-sky-500/0",
};

export function KpiCards({ items }: { items: KpiItem[] }) {
  const { locale } = useLocale();
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((it) => (
        <Card key={it.label} className={`overflow-hidden bg-linear-to-br ${toneMap[it.tone ?? "slate"]}`}>
          <div className="text-sm text-zinc-500">{it.label}</div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            {typeof it.value === "number"
              ? it.currency
                ? formatCurrencyAFN(it.value, locale)
                : formatNumber(it.value, locale)
              : it.value}
          </div>
          {it.note ? <div className="mt-3 text-xs leading-relaxed text-zinc-500">{it.note}</div> : null}
        </Card>
      ))}
    </div>
  );
}
