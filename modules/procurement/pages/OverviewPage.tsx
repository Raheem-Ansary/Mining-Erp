"use client";

import { Card } from "@/components/ui/Card";
import { useLocale } from "@/components/providers/LocaleProvider";
import { KpiCards } from "@/modules/shared/components/KpiCards";
import { StatusTable } from "@/modules/shared/components/StatusTable";

export function ProcurementOverviewPage() {
  const { locale } = useLocale();
  const isPashto = locale === "pashto";

  const kpis = isPashto
    ? [
        { label: "خلاصې غوښتنې", value: 19, note: "۷ د عاجل تدارکاتو لپاره", tone: "amber" as const },
        { label: "فعال فرمایشونه", value: 11, note: "۴ عرضه کوونکي د بار لېږد په پړاو کې", tone: "slate" as const },
        { label: "عرضه کوونکی انطباق", value: "91%", note: "اسناد او مالیاتي دوسیې تازه دي", tone: "emerald" as const },
        { label: "اوسط Lead Time", value: "4.2", note: "ورځې له غوښتنې تر PO پورې", tone: "sky" as const },
      ]
    : [
        { label: "درخواست‌های باز", value: 19, note: "۷ مورد برای تدارک عاجل", tone: "amber" as const },
        { label: "سفارشات فعال", value: 11, note: "۴ تامین‌کننده در مرحله حمل", tone: "slate" as const },
        { label: "انطباق تامین‌کنندگان", value: "91%", note: "اسناد و پرونده‌های مالیاتی به‌روز است", tone: "emerald" as const },
        { label: "میانگین Lead Time", value: "4.2", note: "روز از درخواست تا PO", tone: "sky" as const },
      ];

  const rows = isPashto
    ? [
        { item: "هیدرولیک فلټر", requester: "عبدالرحمن", stage: "RFQ", status: "pending" },
        { item: "Dumper ټایر", requester: "زبير", stage: "PO", status: "approved" },
        { item: "صنعتي کیبل", requester: "فاطمه", stage: "بیاکتنه", status: "rejected" },
      ]
    : [
        { item: "فیلتر هیدرولیک", requester: "عبدالرحمن", stage: "RFQ", status: "pending" },
        { item: "لاستیک Dumper", requester: "زبیر", stage: "PO", status: "approved" },
        { item: "کابل صنعتی", requester: "فاطمه", stage: "بازبینی", status: "rejected" },
      ];

  const copy = isPashto
    ? {
        title: "د تدارکاتو کنټرول روم",
        body: "د پېرود غوښتنې، عرضه کوونکي او تاييد پړاوونه د ساحوي عملياتو د تم کېدو د مخنيوي لپاره يوځای وڅارئ.",
        watchTitle: "Supplier Watch",
        watchItems: [
          "افغان ماشین: بار د پنجشنبې په سهار رارسېږي",
          "لوژستیک هریرود: د تېرې اوونۍ SLA 97٪",
          "تجهیزات پامیر: اسناد د نوي کولو تر تعقيب لاندې دي",
        ],
      }
    : {
        title: "اتاق کنترل تدارکات",
        body: "درخواست‌های خرید، تامین‌کنندگان و مراحل تایید را طوری دنبال کنید که عملیات ساحه هیچ‌وقت متوقف نشود.",
        watchTitle: "Supplier Watch",
        watchItems: [
          "افغان ماشین: بار برای صبح پنجشنبه در راه است",
          "لوژستیک هریرود: SLA هفته گذشته 97٪",
          "تجهیزات پامیر: اسناد در حال پیگیری برای تمدید",
        ],
      };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-zinc-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(254,249,195,0.72))] p-6 shadow-[0_24px_60px_-28px_rgba(24,24,27,0.22)]">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">PROCUREMENT OVERVIEW</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">{copy.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">{copy.body}</p>
      </section>

      <KpiCards items={kpis} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <StatusTable
          title={isPashto ? "د غوښتنو بهير" : "جریان درخواست‌ها"}
          description={isPashto ? "اوسني RFQ، PO او بیاکتنې ته منتظر موارد." : "موارد جاری در RFQ، PO و بازبینی داخلی."}
          columns={isPashto ? ["قلم", "غوښتونکی", "پړاو", "حالت"] : ["قلم", "درخواست‌کننده", "مرحله", "وضعیت"]}
          rows={rows}
        />
        <Card title={copy.watchTitle}>
          <div className="space-y-3">
            {copy.watchItems.map((item) => (
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
