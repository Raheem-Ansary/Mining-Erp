"use client";

import { useMemo, useState } from "react";
import { attendanceSeed } from "@/data/attendance";
import type { AttendanceRow, AttendanceStatus } from "@/types";
import dayConfigured, { formatJalaliDateShort, formatTime } from "@/lib/dayjs";
import { attendanceStatusLabel } from "@/lib/labels";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

function badgeTone(status: AttendanceStatus) {
  if (status === "present") return "success" as const;
  if (status === "late") return "warning" as const;
  return "danger" as const;
}

function gregorianDayKeyFromIso(dateIso: string) {
  return dayConfigured(dateIso).format("YYYY-MM-DD");
}

export function AttendanceModule() {
  const [rows, setRows] = useState<AttendanceRow[]>(() => [...attendanceSeed]);

  const todayKey = dayConfigured().format("YYYY-MM-DD");

  const demoToday = useMemo(() => {
    return rows.find(
      (r) => r.employeeId === "demo" && gregorianDayKeyFromIso(r.dateIso) === todayKey,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, todayKey]);

  const canCheckout = Boolean(demoToday?.checkInIso && !demoToday?.checkOutIso);

  function checkIn() {
    const iso = dayConfigured().toISOString();

    /** قاعدهٔ ساده برای دمو: بعد از ساعت ۱۰ صبح محلی به‌عوان تأخیر */
    const status: AttendanceStatus = Number(dayConfigured().hour()) >= 10 ? "late" : "present";

    const id = `demo-${todayKey}-${Math.random().toString(36).slice(2)}`;

    const stableDateIso = `${todayKey}T12:00:00.000Z`;

    setRows((xs) => {
      const without = xs.filter(
        (x) =>
          !(x.employeeId === "demo" && gregorianDayKeyFromIso(x.dateIso) === todayKey),
      );
      const next: AttendanceRow = {
        id,
        employeeId: "demo",
        employeeName: "کاربر نشستگاه (دمو)",
        dateIso: stableDateIso,
        checkInIso: iso,
        checkOutIso: null,
        status,
      };
      return [next, ...without];
    });
  }

  function checkOut() {
    const iso = dayConfigured().toISOString();
    setRows((xs) =>
      xs.map((r) =>
        r.employeeId === "demo" && gregorianDayKeyFromIso(r.dateIso) === todayKey && r.checkInIso
          ? { ...r, checkOutIso: iso }
          : r,
      ),
    );
  }

  const sortedRows = useMemo(() => {
    const list = [...rows];
    list.sort((a, b) => dayConfigured(b.dateIso).valueOf() - dayConfigured(a.dateIso).valueOf());
    return list;
  }, [rows]);

  return (
    <div className="space-y-6">
      <Card title="ثبت دستی حضور (نمایش دمو)">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm leading-relaxed text-zinc-600">
            این بخش فقط برای دمو طراحی شده است: با «ورود» یک ردیف برای امروز اضافه می‌شود و با «خروج»
            زمان پایان پر می‌شود.
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={checkIn}>ورود به کار</Button>
            <Button variant="secondary" disabled={!canCheckout} onClick={checkOut}>
              خروج از کار
            </Button>
          </div>
        </div>
      </Card>

      <Card title="گزارش حضور">
        <div className="overflow-auto rounded-xl border border-zinc-200">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr className="text-right">
                <th className="px-4 py-3 font-medium">نام</th>
                <th className="px-4 py-3 font-medium">تاریخ (شمسی)</th>
                <th className="px-4 py-3 font-medium">ورود</th>
                <th className="px-4 py-3 font-medium">خروج</th>
                <th className="px-4 py-3 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {sortedRows.map((r) => (
                <tr key={r.id} className="text-right hover:bg-zinc-50">
                  <td className="px-4 py-3 font-semibold text-zinc-900">{r.employeeName}</td>
                  <td className="px-4 py-3 text-zinc-700">{formatJalaliDateShort(r.dateIso)}</td>
                  <td className="px-4 py-3 tabular-nums text-zinc-700">
                    {r.checkInIso ? formatTime(r.checkInIso) : "—"}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-zinc-700">
                    {r.checkOutIso ? formatTime(r.checkOutIso) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={badgeTone(r.status)}>{attendanceStatusLabel[r.status]}</Badge>
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
