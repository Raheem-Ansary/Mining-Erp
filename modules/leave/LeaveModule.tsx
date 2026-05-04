"use client";

import { useMemo, useState } from "react";
import { leaveRequestsSeed } from "@/data/leaves";
import type { LeaveRequestRow, LeaveStatus } from "@/types";
import dayConfigured from "@/lib/dayjs";
import { formatJalaliDateShort } from "@/lib/dayjs";
import { leaveStatusLabel } from "@/lib/labels";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

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
  const [rows, setRows] = useState<LeaveRequestRow[]>(() => [...leaveRequestsSeed]);

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

  return (
    <div className="grid gap-6 xl:grid-cols-5">
      <Card className="xl:col-span-2" title="ثبت درخواست مرخصی جدید">
        <div className="grid gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-700">نام کارمند</span>
            <input
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span className="text-zinc-700">از تاریخ (میلادی)</span>
              <input
                type="date"
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
                dir="ltr"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-zinc-700">تا تاریخ (میلادی)</span>
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
            <span className="text-zinc-700">دلیل</span>
            <textarea
              className="min-h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2 text-base outline-none ring-brand-950/25 focus-visible:ring"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>

          <div className="text-xs leading-relaxed text-zinc-500">
            تاریخ‌ها برای سبک ورود MVP به‌صورت میلندی ثبت می‌شوند؛ تاریخ شمسی در جدول زیر نشان داده
            خواهد شد.
          </div>

          <div className="flex justify-start">
            <Button onClick={submit}>ثبت درخواست</Button>
          </div>
        </div>
      </Card>

      <Card className="xl:col-span-3" title="فهرست درخواست‌ها">
        <div className="overflow-auto rounded-xl border border-zinc-200">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr className="text-right">
                <th className="px-4 py-3 font-medium">کارمند</th>
                <th className="px-4 py-3 font-medium">از تاریخ (ش)</th>
                <th className="px-4 py-3 font-medium">تا تاریخ (ش)</th>
                <th className="px-4 py-3 font-medium">وضعیت</th>
                <th className="px-4 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {sorted.map((r) => (
                <tr key={r.id} className="align-top">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-zinc-950">{r.employeeName}</div>
                    <div className="mt-2 text-xs leading-relaxed text-zinc-600">{r.reason}</div>
                  </td>
                  <td className="px-4 py-3 text-zinc-800">{formatJalaliDateShort(r.fromIso)}</td>
                  <td className="px-4 py-3 text-zinc-800">{formatJalaliDateShort(r.toIso)}</td>
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
                          تأیید
                        </Button>
                        <Button
                          variant="danger"
                          className="px-3 py-1.5 text-xs"
                          onClick={() => setStatus(r.id, "rejected")}
                        >
                          رد
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
  );
}
