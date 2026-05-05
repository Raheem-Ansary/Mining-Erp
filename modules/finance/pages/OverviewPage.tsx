"use client";
import { KpiCards } from "@/modules/shared/components/KpiCards";
import { WeeklyAttendanceChart } from "@/modules/dashboard/WeeklyAttendanceChart";
import { Card } from "@/components/ui/Card";
import { useLocale } from "@/components/providers/LocaleProvider";
import { StatusTable } from "@/modules/shared/components/StatusTable";

export function FinanceOverviewPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";
  const kpis = isPashto
    ? [
        { label: "د مياشتې ټول عوايد", value: 12850000, currency: true, note: "د مياشتې تر اوسه راجستر شوي عوايد", tone: "emerald" as const },
        { label: "د مياشتې ټول مصارف", value: 8420000, currency: true, note: "عملياتي او اداري مصارف", tone: "amber" as const },
        { label: "د بودجې مصرف", value: "67%", note: "د منظورې شوې بودجې مصرف", tone: "sky" as const },
        { label: "عملياتي ګټه", value: 4430000, currency: true, note: "د ټولو مصارفو وروسته پاتې ګټه", tone: "slate" as const },
      ]
    : [
        { label: "مجموع عواید این ماه", value: 12850000, currency: true, note: "عواید ثبت‌شده تا این لحظه ماه", tone: "emerald" as const },
        { label: "مجموع مصارف این ماه", value: 8420000, currency: true, note: "مصارف عملیاتی و اداری", tone: "amber" as const },
        { label: "بودجه مصرف‌شده", value: "67%", note: "میزان مصرف از بودجه مصوب", tone: "sky" as const },
        { label: "سود عملیاتی", value: 4430000, currency: true, note: "سود باقی‌مانده پس از همه مصارف", tone: "slate" as const },
      ];

  const rows = isPashto
    ? [
        { item: "د معاشاتو بسته", owner: "لیلا صابري", due: "نن", status: "pending" },
        { item: "د سوخت مصارف", owner: "زهرا احمدزي", due: "نن", status: "approved" },
        { item: "د پروسس عوايد", owner: "محمد کاظمي", due: "سبا", status: "pending" },
      ]
    : [
        { item: "بسته معاشات", owner: "لیلی صابری", due: "امروز", status: "pending" },
        { item: "مصارف سوخت", owner: "زهرا احمدزی", due: "امروز", status: "approved" },
        { item: "عواید پروسس", owner: "محمد کاظمی", due: "فردا", status: "pending" },
      ];

  const copy = isPashto
    ? {
        title: "د مالي کنټرول ډشبورډ",
        body: "د بودجې سوځېدنه، عوايد، مصارف او تصويب ته منتظر مالي فایلونه په يوه اجرايي نما کې وګورئ.",
      }
    : {
        title: "داشبورد کنترل مالی",
        body: "بودجه، عواید، مصارف و فایل‌های منتظر تایید را در یک نمای اجرایی و قابل ارائه دنبال کنید.",
      };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-zinc-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(239,246,255,0.82))] p-6 shadow-[0_24px_60px_-28px_rgba(24,24,27,0.22)]">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">FINANCE OVERVIEW</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">{copy.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">{copy.body}</p>
      </section>

      <KpiCards items={kpis} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title={isPashto ? "د نغدو جريان رجحان" : "روند جریان نقدی"}>
          <WeeklyAttendanceChart />
        </Card>
        <StatusTable
          title={isPashto ? "د تصويب لاندې فایلونه" : "فایل‌های زیر تایید"}
          description={isPashto ? "هغه مالي بسته ګانې چې د ورځې پرېکړې ته اړتیا لري." : "بسته‌های مالی که نیازمند تصمیم و امضای روز هستند."}
          columns={isPashto ? ["فایل", "مسئول", "مهلت", "حالت"] : ["فایل", "مسئول", "مهلت", "وضعیت"]}
          rows={rows}
        />
      </div>
    </div>
  );
}
