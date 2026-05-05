"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useLocale } from "@/components/providers/LocaleProvider";
import { formatNumber } from "@/lib/format";

function tone(status: string) {
  if (status === "approved" || status=="present") return "success";
  if (status === "rejected" || status=="absent") return "danger";
  if (status === "pending" || status=="late") return "warning";
  return "info";
}

export function StatusTable({
  title,
  description,
  columns,
  rows,
}: {
  title: string;
  description?: string;
  columns: string[];
  rows: Record<string, string>[];
}) {
  const { t, locale } = useLocale();
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;
    return rows.filter((row) =>
      Object.values(row).some((value) => value.toLowerCase().includes(normalized)),
    );
  }, [query, rows]);

  const totals = useMemo(() => {
    return rows.reduce<Record<string, number>>((acc, row) => {
      const status = Object.values(row).find((v) =>
        ["pending", "approved", "rejected", "present", "late", "absent"].includes(v),
      );
      if (status) acc[status] = (acc[status] ?? 0) + 1;
      return acc;
    }, {});
  }, [rows]);

  return (
    <Card title={title}>
      <div className="mb-4 flex flex-col gap-4 border-b border-zinc-100 pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          {description ? <div className="text-sm leading-relaxed text-zinc-600">{description}</div> : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="info">
              {formatNumber(filteredRows.length, locale)} {locale === "pashto" ? "ریکارډونه" : "رکورد"}
            </Badge>
            {Object.entries(totals).map(([status, count]) => (
              <Badge key={status} tone={tone(status) as never}>
                {t(`common.${status}`)}: {formatNumber(count, locale)}
              </Badge>
            ))}
          </div>
        </div>
        <label className="relative block w-full max-w-xs">
          <Search className="pointer-events-none absolute inset-y-0 right-3 my-auto h-4 w-4 text-zinc-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("common.search")}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/80 py-2 pe-10 ps-4 text-sm text-zinc-900 outline-none ring-brand-950/10 transition focus:bg-white focus-visible:ring"
          />
        </label>
      </div>
      <div className="overflow-auto rounded-xl border border-zinc-200">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 text-zinc-600">
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-4 py-3 text-right font-medium">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white">
            {filteredRows.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((v, idx) => (
                  <td key={idx} className="px-4 py-3">
                    {v === "pending" || v === "approved" || v === "rejected" || v === "present" || v === "late" || v === "absent" ? (
                      <Badge tone={tone(v) as never}>{t(`common.${v}`)}</Badge>
                    ) : (
                      v
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-zinc-500">
                  {locale === "pashto"
                    ? "ستاسو د لټون لپاره هېڅ پايله ونه موندل شوه."
                    : "برای جستجوی شما نتیجه‌ای پیدا نشد."}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
