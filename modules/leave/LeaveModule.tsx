"use client";

import { useMemo, useState } from "react";
import { leaveRequestsSeed } from "@/data/leaves";
import type { LeaveRequestRow, LeaveStatus } from "@/types";
import dayConfigured from "@/lib/dayjs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useLocale } from "@/components/providers/LocaleProvider";
import { formatAfghanDate, formatNumber } from "@/lib/format";

function badgeTone(status: LeaveStatus) {
  if (status === "approved") return "success" as const;
  if (status === "rejected") return "danger" as const;
  return "warning" as const;
}

function toIsoMidday(dateYYYYMMDD: string) {
  /** ورود تاریخ میلادی yyyy-mm-dd؛ برای جلوگیری از ابهام، وسط روز GMT نگه‌داری می‌کنیم */
  const d = dayConfigured(`${dateYYYYMMDD}T12:00:00.000Z`).toISOString();
  return d;
}

export function LeaveModule() {
  const { locale } = useLocale();
  const [rows, setRows] = useState<LeaveRequestRow[]>(() => [...leaveRequestsSeed]);
  const isPashto = locale === "pashto";

  const [employeeName, setEmployeeName] = useState("");
  const [reason, setReason] = useState("");
  const [from, setFrom] = useState("2026-06-05");
  const [to, setTo] = useState("2026-06-07");

  const sorted = useMemo(() => [...rows].sort((a, b) => String(b.fromIso).localeCompare(String(a.fromIso))), [rows]);

  function submit() {
    const nameTrim = employeeName.trim();
    if (!nameTrim || !reason.trim()) return;

    const id = `l-${Math.random().toString(36).slice(2)}`;
    const next: LeaveRequestRow = {
      id,
      employeeName: nameTrim,
      fromIso: toIsoMidday(from),
      toIso: toIsoMidday(to),
      reason: reason.trim(),
      status: "pending",
      submittedIso: dayConfigured().toISOString(),
    };
    setRows((xs) => [next, ...xs]);
    setEmployeeName("");
    setReason("");
  }

  function setStatus(id: string, status: Exclude<LeaveStatus, "pending">) {
    setRows((xs) => xs.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  const leaveStatusLabel = {
    pending: isPashto ? "په انتظار" : "در انتظار",
    approved: isPashto ? "تایید شوی" : "تایید شده",
    rejected: isPashto ? "رد شوی" : "رد شده",
  } as const;
  const pendingCount = rows.filter((row) => row.status === "pending").length;
  const approvedCount = rows.filter((row) => row.status === "approved").length;
  const rejectedCount = rows.filter((row) => row.status === "rejected").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm shadow-zinc-900/5">
          <div className="text-sm text-zinc-500">{isPashto ? "انتظار" : "در انتظار"}</div>
          <div className="mt-3 text-3xl font-semibold text-zinc-950">{formatNumber(pendingCount, locale)}</div>
        </div>
        <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm shadow-zinc-900/5">
          <div className="text-sm text-zinc-500">{isPashto ? "تایید شوي" : "تایید شده"}</div>
          <div className="mt-3 text-3xl font-semibold text-zinc-950">{formatNumber(approvedCount, locale)}</div>
        </div>
        <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm shadow-zinc-900/5">
          <div className="text-sm text-zinc-500">{isPashto ? "رد شوي" : "رد شده"}</div>
          <div className="mt-3 text-3xl font-semibold text-zinc-950">{formatNumber(rejectedCount, locale)}</div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
      <Card className="xl:col-span-2" title={isPashto ? "د نوې رخصتۍ غوښتنه" : "ثبت درخواست رخصتی جدید"}>
        <div className="grid gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-700">{isPashto ? "د کارکوونکي نوم" : "نام کارمند"}</span>
            <input
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span className="text-zinc-700">{isPashto ? "د پیل نېټه" : "از تاریخ"}</span>
              <input
                type="date"
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
                dir="ltr"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-zinc-700">{isPashto ? "تر نېټې" : "تا تاریخ"}</span>
              <input
                type="date"
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
                dir="ltr"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </label>
          </div>

          <label className="grid gap-1 text-sm">
            <span className="text-zinc-700">{isPashto ? "دلیل" : "دلیل"}</span>
            <textarea
              className="min-h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>

          <div className="text-xs leading-relaxed text-zinc-500">
            {isPashto
              ? "نېټې د فورم له لارې ټاکل کېږي، خو لاندې راپور کې په محلي بڼه ښکاري."
              : "تاریخ‌ها از طریق فرم ثبت می‌شوند اما در جدول پایین به شکل محلی نمایش داده خواهند شد."}
          </div>

          <div className="flex justify-start">
            <Button onClick={submit}>{isPashto ? "غوښتنه ثبت کړئ" : "ثبت درخواست"}</Button>
          </div>
        </div>
      </Card>

      <Card className="xl:col-span-3" title={isPashto ? "د غوښتنو فهرست" : "فهرست درخواست‌ها"}>
        <div className="overflow-auto rounded-xl border border-zinc-200">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr className="text-right">
                <th className="px-4 py-3 font-medium">{isPashto ? "کارکوونکی" : "کارمند"}</th>
                <th className="px-4 py-3 font-medium">{isPashto ? "له نېټې" : "از تاریخ"}</th>
                <th className="px-4 py-3 font-medium">{isPashto ? "تر نېټې" : "تا تاریخ"}</th>
                <th className="px-4 py-3 font-medium">{isPashto ? "حالت" : "وضعیت"}</th>
                <th className="px-4 py-3 font-medium">{isPashto ? "عملیات" : "عملیات"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {sorted.map((r) => (
                <tr key={r.id} className="align-top">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-zinc-950">{r.employeeName}</div>
                    <div className="mt-2 text-xs leading-relaxed text-zinc-600">{r.reason}</div>
                  </td>
                  <td className="px-4 py-3 text-zinc-800">
                    {formatAfghanDate(r.fromIso, locale, { day: "numeric", month: "long" })}
                  </td>
                  <td className="px-4 py-3 text-zinc-800">
                    {formatAfghanDate(r.toIso, locale, { day: "numeric", month: "long" })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={badgeTone(r.status)}>{leaveStatusLabel[r.status]}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    {r.status === "pending" ? (
                      <div className="flex flex-wrap gap-2">
                        <Button
                          className="px-3 py-1.5 text-xs"
                          onClick={() => setStatus(r.id, "approved")}
                        >
                          {isPashto ? "تایید" : "تأیید"}
                        </Button>
                        <Button
                          variant="danger"
                          className="px-3 py-1.5 text-xs"
                          onClick={() => setStatus(r.id, "rejected")}
                        >
                          {isPashto ? "رد" : "رد"}
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      </div>
    </div>
  );
}
