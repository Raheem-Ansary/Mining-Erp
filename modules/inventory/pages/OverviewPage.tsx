"use client";

import { Card } from "@/components/ui/Card";
import { useLocale } from "@/components/providers/LocaleProvider";
import { KpiCards } from "@/modules/shared/components/KpiCards";
import { StatusTable } from "@/modules/shared/components/StatusTable";

export function InventoryOverviewPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";

  const kpis = isPashto
    ? [
        { label: "ټول SKU", value: 368, note: "مرکزي او ساحوي ګودامونه", tone: "slate" as const },
        { label: "بحراني کمبود", value: 4, note: "د بيا امر حد څخه ټيټ", tone: "amber" as const },
        { label: "نن داخلېدونکي", value: 7, note: "۳ بارونه په لاره کې دي", tone: "sky" as const },
        { label: "لېږد ته چمتو", value: 12, note: "عملياتي او HSE اقلام", tone: "emerald" as const },
      ]
    : [
        { label: "کل SKU", value: 368, note: "انبار مرکزی و ساحوی", tone: "slate" as const },
        { label: "کمبود بحرانی", value: 4, note: "پایین‌تر از حد سفارش مجدد", tone: "amber" as const },
        { label: "ورودی امروز", value: 7, note: "۳ بار در مسیر تحویل", tone: "sky" as const },
        { label: "آماده خروج", value: 12, note: "اقلام عملیاتی و HSE", tone: "emerald" as const },
      ];

  const rows = isPashto
    ? [
        { item: "د خوندیتوب بوټان", location: "مرکزي ګودام", balance: "9", status: "rejected" },
        { item: "فلټر لرونکی ماسک", location: "د HSE ساحه", balance: "45", status: "approved" },
        { item: "صنعتي غوړي", location: "د سوخت بلاک", balance: "210", status: "approved" },
        { item: "کنټرول شوی چاودېدونکي", location: "خوندي خونه", balance: "18", status: "pending" },
      ]
    : [
        { item: "کفش ایمنی", location: "انبار مرکزی", balance: "9", status: "rejected" },
        { item: "ماسک فیلتر دار", location: "زون HSE", balance: "45", status: "approved" },
        { item: "روغن صنعتی", location: "بلوک سوخت", balance: "210", status: "approved" },
        { item: "مواد انفجاری کنترول‌شده", location: "اتاق امن", balance: "18", status: "pending" },
      ];

  const copy = isPashto
    ? {
        title: "د ګودام څارنې ډشبورډ",
        body: "د مرکزي او ساحوي ګودامونو موجودي، داخلېدونکي توکي او بحراني کموالی له همدې ځایه تعقيب کړئ.",
        queueTitle: "د ترلاسه کولو او لېږد صف",
        queueItems: [
          "۶۰ هوايي فلټرونه د نن مازديګر تر 15:00 رسېږي",
          "د HSE ۲۴ خولۍ د شپې شيفټ ته ځانګړې شوې دي",
          "د پرزو د بلاک دوراني انوینتري سبا 09:00 پيلېږي",
        ],
      }
    : {
        title: "داشبورد پایش انبار",
        body: "موجودی انبار مرکزی و ساحوی، اقلام ورودی و کمبودهای بحرانی را از همین نما دنبال کنید.",
        queueTitle: "صف دریافت و ارسال",
        queueItems: [
          "۶۰ فیلتر هوا تا ساعت 15:00 امروز تحویل می‌شود",
          "۲۴ کلاه HSE برای شیفت شب رزرو شده است",
          "انبارگردانی دوره‌ای بلوک پرزه‌جات فردا 09:00 آغاز می‌شود",
        ],
      };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-zinc-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(220,252,231,0.78))] p-6 shadow-[0_24px_60px_-28px_rgba(24,24,27,0.22)]">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">INVENTORY OVERVIEW</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">{copy.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">{copy.body}</p>
      </section>

      <KpiCards items={kpis} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <StatusTable
          title={isPashto ? "د بحراني موجودۍ لید" : "دید موجودی بحرانی"}
          description={isPashto ? "هغه اقلام چې د عملياتو لپاره نږدې څارنې ته اړتیا لري." : "اقلامی که برای تداوم عملیات نیازمند پایش نزدیک هستند."}
          columns={isPashto ? ["قلم", "ځای", "موجودي", "حالت"] : ["قلم", "محل", "موجودی", "وضعیت"]}
          rows={rows}
        />
        <Card title={copy.queueTitle}>
          <div className="space-y-3">
            {copy.queueItems.map((item) => (
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
