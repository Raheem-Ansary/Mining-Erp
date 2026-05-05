"use client";

import { Card } from "@/components/ui/Card";
import { useLocale } from "@/components/providers/LocaleProvider";
import { KpiCards } from "@/modules/shared/components/KpiCards";
import { StatusTable } from "@/modules/shared/components/StatusTable";

export function LogisticsOverviewPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";

  const kpis = isPashto
    ? [
        { label: "Fleet Availability", value: "84%", note: "۱۲ وسایط فعال، ۲ د سرویس لپاره", tone: "slate" as const },
        { label: "فعاله Dispatches", value: 12, note: "نن ثبت شوي انتقالات", tone: "sky" as const },
        { label: "د سوخت انضباط", value: "93%", note: "مصرف د پلان په چوکاټ کې", tone: "emerald" as const },
        { label: "ځنډېدلې لارې", value: 2, note: "د شپې شيفټ لاندې څارنه", tone: "amber" as const },
      ]
    : [
        { label: "Fleet Availability", value: "84%", note: "۱۲ وسیله فعال، ۲ مورد در سرویس", tone: "slate" as const },
        { label: "Dispatch فعال", value: 12, note: "انتقالات ثبت‌شده امروز", tone: "sky" as const },
        { label: "انضباط سوخت", value: "93%", note: "مصرف در محدوده پلان", tone: "emerald" as const },
        { label: "مسیرهای تاخیردار", value: 2, note: "شیفت شب زیر نظر ویژه", tone: "amber" as const },
      ];

  const rows = isPashto
    ? [
        { route: "مرکزي کان → پروسس", shift: "ورځنۍ", eta: "13:40", status: "approved" },
        { route: "کابل ګودام → ساحه", shift: "ورځنۍ", eta: "14:10", status: "pending" },
        { route: "فابریکه → صادرات", shift: "شپه", eta: "17:25", status: "approved" },
      ]
    : [
        { route: "معدن مرکزی → پروسس", shift: "روز", eta: "13:40", status: "approved" },
        { route: "انبار کابل → ساحه", shift: "روز", eta: "14:10", status: "pending" },
        { route: "فابریکه → صادرات", shift: "شب", eta: "17:25", status: "approved" },
      ];

  const copy = isPashto
    ? {
        title: "لوژستیک عملياتي نما",
        body: "وسایط، تيل، لارې او بار لېږد د ورځني عملياتو د تسلسل لپاره هممهاله وڅارئ.",
        alertsTitle: "د موټرو او بار خبرتياوې",
        alerts: [
          "KBL-1990 د 42٪ سوخت سره تر راتلونکې دورې مخکې ډکول غواړي",
          "د بامیان دويم انتقال د ۱۵ دقيقو ځنډ له امله نارنجي حالت لري",
          "د Pickup BLH-3201 هفتوار تخنيکي کتنه نن 16:00 ترسره کېږي",
        ],
      }
    : {
        title: "نمای عملیاتی لوجستیک",
        body: "وسایط، سوخت، مسیرها و بارگیری‌ها را هم‌زمان دنبال کنید تا جریان عملیات روزانه بدون وقفه بماند.",
        alertsTitle: "هشدارهای وسایط و بار",
        alerts: [
          "KBL-1990 با 42٪ سوخت پیش از دور بعدی نیازمند تکمیل است",
          "انتقال دوم بامیان به دلیل ۱۵ دقیقه تاخیر در وضعیت نارنجی است",
          "بازبینی تخنیکی هفتگی Pickup BLH-3201 امروز 16:00 انجام می‌شود",
        ],
      };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-zinc-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(224,242,254,0.82))] p-6 shadow-[0_24px_60px_-28px_rgba(24,24,27,0.22)]">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">LOGISTICS OVERVIEW</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">{copy.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">{copy.body}</p>
      </section>

      <KpiCards items={kpis} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <StatusTable
          title={isPashto ? "د لیږد بورډ" : "Dispatch Board"}
          description={isPashto ? "اوسني بارونه، ETA او شيفټ وضعيت." : "نمای بارهای جاری، ETA و وضعیت شیفت."}
          columns={isPashto ? ["مسير", "شيفټ", "ETA", "حالت"] : ["مسیر", "شیفت", "ETA", "وضعیت"]}
          rows={rows}
        />
        <Card title={copy.alertsTitle}>
          <div className="space-y-3">
            {copy.alerts.map((item) => (
              <div key={item} className="rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-3 text-sm leading-relaxed text-zinc-700">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
