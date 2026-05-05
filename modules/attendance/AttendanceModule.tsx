"use client";

import { useMemo, useState } from "react";
import { attendanceSeed } from "@/data/attendance";
import type { AttendanceRow, AttendanceStatus } from "@/types";
import dayConfigured, { formatTime } from "@/lib/dayjs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useLocale } from "@/components/providers/LocaleProvider";
import { formatAfghanDate, formatNumber } from "@/lib/format";

function badgeTone(status: AttendanceStatus) {
  if (status === "present") return "success" as const;
  if (status === "late") return "warning" as const;
  return "danger" as const;
}

function gregorianDayKeyFromIso(dateIso: string) {
  return dayConfigured(dateIso).format("YYYY-MM-DD");
}

export function AttendanceModule() {
  const { locale } = useLocale();
  const [rows, setRows] = useState<AttendanceRow[]>(() => [...attendanceSeed]);
  const isPashto = locale === "pashto";

  const todayKey = dayConfigured().format("YYYY-MM-DD");

  const demoToday = useMemo(() => {
    return rows.find(
      (r) => r.employeeId === "demo" && gregorianDayKeyFromIso(r.dateIso) === todayKey,
    );
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

  const presentCount = rows.filter((row) => row.status === "present").length;
  const lateCount = rows.filter((row) => row.status === "late").length;
  const absentCount = rows.filter((row) => row.status === "absent").length;
  const attendanceStatusLabel = {
    present: isPashto ? "حاضر" : "حاضر",
    absent: isPashto ? "غير حاضر" : "غایب",
    late: isPashto ? "ځنډ" : "تأخیر",
  } as const;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm shadow-zinc-900/5">
          <div className="text-sm text-zinc-500">{isPashto ? "حاضر" : "حاضر"}</div>
          <div className="mt-3 text-3xl font-semibold text-zinc-950">{formatNumber(presentCount, locale)}</div>
        </div>
        <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm shadow-zinc-900/5">
          <div className="text-sm text-zinc-500">{isPashto ? "ځنډ" : "تأخیر"}</div>
          <div className="mt-3 text-3xl font-semibold text-zinc-950">{formatNumber(lateCount, locale)}</div>
        </div>
        <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm shadow-zinc-900/5">
          <div className="text-sm text-zinc-500">{isPashto ? "غير حاضر" : "غایب"}</div>
          <div className="mt-3 text-3xl font-semibold text-zinc-950">{formatNumber(absentCount, locale)}</div>
        </div>
      </div>

      <Card title={isPashto ? "د حاضري ثبت" : "ثبت دستی حضور"}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm leading-relaxed text-zinc-600">
            {isPashto
              ? "دا برخه د ډیمو لپاره ده: د «ورود» په کلیک سره د نن ورځې حاضري ثبتېږي او د «خروج» په کلیک سره پای وخت ډکېږي."
              : "این بخش برای دمو طراحی شده است: با «ورود» یک ردیف برای امروز ثبت می‌شود و با «خروج» زمان پایان تکمیل می‌گردد."}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={checkIn}>{isPashto ? "ورود" : "ورود به کار"}</Button>
            <Button variant="secondary" disabled={!canCheckout} onClick={checkOut}>
              {isPashto ? "خروج" : "خروج از کار"}
            </Button>
          </div>
        </div>
      </Card>

      <Card title={isPashto ? "د حاضري راپور" : "گزارش حضور"}>
        <div className="overflow-auto rounded-xl border border-zinc-200">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-600">
              <tr className="text-right">
                <th className="px-4 py-3 font-medium">{isPashto ? "نوم" : "نام"}</th>
                <th className="px-4 py-3 font-medium">{isPashto ? "نېټه" : "تاریخ"}</th>
                <th className="px-4 py-3 font-medium">{isPashto ? "ورود" : "ورود"}</th>
                <th className="px-4 py-3 font-medium">{isPashto ? "خروج" : "خروج"}</th>
                <th className="px-4 py-3 font-medium">{isPashto ? "حالت" : "وضعیت"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {sortedRows.map((r) => (
                <tr key={r.id} className="text-right hover:bg-zinc-50">
                  <td className="px-4 py-3 font-semibold text-zinc-900">{r.employeeName}</td>
                  <td className="px-4 py-3 text-zinc-700">
                    {formatAfghanDate(r.dateIso, locale, { day: "numeric", month: "long" })}
                  </td>
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
